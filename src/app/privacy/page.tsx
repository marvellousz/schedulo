import Link from "next/link";
import { Calendar, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-offwhite font-sans selection:bg-brand-primary selection:text-white">
      <div className="fixed inset-0 z-0 grid-bg opacity-30 pointer-events-none"></div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-offwhite/80 backdrop-blur-md border-b border-brand-gray">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-brand-primary flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-xl font-mono uppercase tracking-[0.3em] font-bold">
              Schedulo
            </span>
          </Link>
        </div>
      </header>
      
      <main className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="cypher-heading text-4xl md:text-5xl mb-12">Privacy Policy</h1>
          
          <div className="prose prose-neutral max-w-none text-muted font-sans bg-white border border-brand-gray p-12 shadow-sm">
            <p className="text-sm text-gray-500">Last updated: May 16, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">1. Introduction</h2>
            <p>
              Welcome to Schedulo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy and the information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
            </p>
            <p>
              By accessing or using Schedulo, you consent to the practices described in this Privacy Policy. If you do not agree with the practices described here, please do not use our application.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 my-4">
              <li><strong>Account Information:</strong> When you create an account, we collect your email address, name, and password.</li>
              <li><strong>User Content:</strong> Information you provide when using our application, such as email content, meeting details, attendee lists, and calendar data.</li>
              <li><strong>Google Account Information:</strong> If you choose to sign in with Google, we access your Google profile information and the Google services necessary for our functionality (Google Calendar, Google Meet).</li>
              <li><strong>Usage Information:</strong> We collect information about how you use our application, including log data, device information, and analytics data.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 my-4">
              <li>Provide, maintain, and improve our service</li>
              <li>Process and complete transactions</li>
              <li>Create and manage Google Meet events</li>
              <li>Send email invitations to specified recipients</li>
              <li>Authenticate your access to our application</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send administrative emails and service updates</li>
              <li>Analyze usage patterns to improve our application</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">4. Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 my-4">
              <li><strong>Service Providers:</strong> Third-party companies that help us provide our services (such as email delivery, hosting services, analytics providers)</li>
              <li><strong>Google Services:</strong> To facilitate calendar events and meetings</li>
              <li><strong>Email Recipients:</strong> Information you include in emails will be shared with the recipients you specify</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">5. Google API Services</h2>
            <p>
              Our application uses Google API Services for authentication and to interact with Google Calendar and Google Meet. Our use and transfer of information received from Google APIs to any other app will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">6. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Objecting to our processing of your information</li>
              <li>Requesting portability of your information</li>
              <li>Withdrawing consent for future processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the &ldquo;Contact Us&rdquo; section.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">8. Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">10. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our practices, please contact us at:
            </p>
            <p className="my-4">
              Email: marvlock.dev@gmail.com<br />
              Website: <a href="https://www.marvlock.dev" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.marvlock.dev</a><br />
              Schedulo Open Source Project
            </p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-brand-gray bg-brand-offwhite relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted flex items-center justify-center space-x-1">
            <span>© {new Date().getFullYear()} Schedulo / Made with ❤️ by</span>
            <Link 
              href="https://www.marvlock.dev" 
              target="_blank" 
              className="font-bold italic hover:text-brand-primary transition-colors lowercase flex items-center"
            >
              <Globe className="w-3 h-3 mr-2" />
              marvlock
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}