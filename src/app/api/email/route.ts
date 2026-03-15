import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"; 
import { Resend } from "resend";
import { z } from "zod";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email request schema validation
const emailSchema = z.object({
  to: z.union([
    z.string().email(),
    z.array(z.string().email()),
    z.string().refine((val) => {
      const emails = val.split(',').map(email => email.trim());
      return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }, {
      message: "Invalid email format. Please provide valid email addresses separated by commas."
    })
  ]),
  cc: z.union([
    z.string().email(),
    z.array(z.string().email()),
    z.string().refine((val) => {
      const emails = val.split(',').map(email => email.trim());
      return emails.length === 0 || emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    })
  ]).optional().or(z.literal("")),
  subject: z.string(),
  body: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { error: "You must be signed in to send emails" },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json();
    
    // Validate request data
    const validationResult = emailSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const { to, cc, subject, body: emailBody } = validationResult.data;

    // Process recipients
    const processRecipients = (recipients: string | string[]): string[] => {
      if (Array.isArray(recipients)) {
        return recipients;
      }
      if (typeof recipients === 'string' && recipients.includes(',')) {
        return recipients.split(',').map(email => email.trim());
      }
      return [recipients as string];
    };

    // Verify email configuration
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          error: "Email server not configured properly", 
          details: "RESEND_API_KEY is missing from environment variables."
        },
        { status: 500 }
      );
    }

    const senderEmail = process.env.EMAIL_FROM || "Marvlock <noreply@marvlock.dev>";

    // Cypher-themed Email Template Wrapper
    const cypherTemplate = (content: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F2F2F2; color: #1A1A1A; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E5E5E5; box-shadow: 0 4px 0 #E5E5E5; }
    .header { background-color: #121215; padding: 30px; border-bottom: 4px solid #EE5336; }
    .logo { color: #FFFFFF; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 20px; font-weight: bold; letter-spacing: 0.3em; text-transform: uppercase; text-decoration: none; display: flex; align-items: center; }
    .logo-box { width: 24px; height: 24px; background-color: #EE5336; margin-right: 12px; display: inline-block; vertical-align: middle; }
    .content { padding: 40px; line-height: 1.6; }
    .footer { padding: 30px; background-color: #F8F9FA; border-top: 1px solid #E5E5E5; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 0.1em; }
    .cta-button { display: inline-block; background-color: #EE5336; color: #FFFFFF !important; padding: 16px 32px; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; font-weight: bold; text-decoration: none; letter-spacing: 0.2em; text-transform: uppercase; margin: 30px 0; }
    .divider { height: 1px; background-color: #E5E5E5; margin: 30px 0; position: relative; }
    .divider::after { content: '+'; position: absolute; top: -7px; right: 0; font-size: 10px; color: #E5E5E5; }
    .text-muted { color: #666666; font-size: 14px; }
    h1 { font-family: ui-monospace, SFMono-Regular, monospace; font-size: 18px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; border-left: 3px solid #EE5336; padding-left: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="https://schedulo.marvlock.dev" class="logo">
        <span class="logo-box"></span> SCHEDULO
      </a>
    </div>
    <div class="content">
      <h1>${subject}</h1>
      <div style="font-size: 15px; color: #333333;">
        ${content}
      </div>
      <div class="divider"></div>
      <p class="text-muted">
        Sent via Schedulo. For more information, visit <a href="https://schedulo.marvlock.dev" style="color: #EE5336; text-decoration: none;">schedulo.marvlock.dev</a>.
      </p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} / <a href="https://schedulo.marvlock.dev" style="color: #666666; text-decoration: none;">Schedulo</a>
    </div>
  </div>
</body>
</html>
`;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: processRecipients(to),
      cc: cc ? processRecipients(cc) : undefined,
      subject: subject,
      html: cypherTemplate(emailBody, subject),
      text: emailBody
        .replace(/<[^>]*>/g, '') 
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ')
        .trim(),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email via Resend", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully",
      messageId: data?.id,
    });

  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: (error as Error).message },
      { status: 500 }
    );
  }
}