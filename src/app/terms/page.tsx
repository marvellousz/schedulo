import Link from "next/link";
import { Calendar } from "lucide-react";

export default function TermsOfService() {
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
          <h1 className="cypher-heading text-4xl md:text-5xl mb-12">Terms of Service</h1>
          
          <div className="prose prose-neutral max-w-none text-muted font-sans bg-white border border-brand-gray p-12 shadow-sm">
            <p className="text-sm text-gray-500">Last updated: May 16, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Schedulo (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our Service.
            </p>
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of the Service following the posting of changes constitutes your acceptance of such changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">2. Description of Service</h2>
            <p>
              Schedulo provides tools to create, schedule, and manage meetings along with email communications in one integrated platform. Our Service utilizes Google API services to connect with Google Calendar and Google Meet for scheduling functionality.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">3. User Accounts</h2>
            <p>
              To use certain features of our Service, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Providing accurate and complete information during registration</li>
              <li>Maintaining the security of your password and account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              We reserve the right to terminate accounts, remove or edit content, or cancel services at our sole discretion.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">4. User Content</h2>
            <p>
              You retain all ownership rights to content you submit, post, or display using our Service (&ldquo;User Content&rdquo;). By providing User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, and distribute such content for the purpose of providing and improving our Service.
            </p>
            <p>
              You agree not to submit User Content that:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Infringes on any third party&apos;s intellectual property or other rights</li>
              <li>Contains unlawful, defamatory, abusive, or objectionable material</li>
              <li>Contains viruses, malware, or other harmful code</li>
              <li>Violates or encourages violation of any applicable laws or regulations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">5. Google API Services</h2>
            <p>
              Our Service integrates with Google API services to provide core functionality. By using these integrations, you agree to:
            </p>
            <ul className="list-disc pl-6 my-4">
              <li>Google&apos;s Terms of Service</li>
              <li>Google&apos;s Privacy Policy</li>
            </ul>
            <p>
              Our use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">6. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SCHEDULO, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p>
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICE OR SERVERS THAT MAKE IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Schedulo, its affiliates, officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to your use of the Service or violation of these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Schedulo is established, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-800">11. Contact</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at:
            </p>
            <p className="my-4">
              Email: marvlock.dev@gmail.com<br />
              GitHub: <a href="https://github.com/marvlock/schedulo" className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/marvlock/schedulo</a><br />
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
              href="https://github.com/marvlock" 
              target="_blank" 
              className="font-bold italic hover:text-brand-primary transition-colors lowercase"
            >
              marvlock
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}