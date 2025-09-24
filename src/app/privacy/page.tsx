import Link from "next/link";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Privacy Policy</h1>
          
          <div className="prose prose-blue max-w-none text-gray-700">
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
              Our application uses Google API Services for authentication and to interact with Google Calendar and Google Meet. Our use and transfer of information received from Google APIs to any other app will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
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