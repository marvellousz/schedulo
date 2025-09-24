import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header matching homepage */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-start h-16 items-center">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold tracking-tight">Schedulo</span>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow bg-white">
        <div className="container mx-auto py-10 px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Terms of Service</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700">
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
              Our use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
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
              Email: pranavmurali024@gmail.com<br />
              GitHub: <a href="https://github.com/Marvellousz/schedulo" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/Marvellousz/schedulo</a><br />
              Schedulo Open Source Project
            </p>
          </div>
        </div>
      </main>

      {/* Compact Footer matching sign-in page */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/Marvellousz/schedulo" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </Link>
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Schedulo. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}