import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "Schedulo",
  description: "Schedule meetings and send emails in one simple workflow",
  icons: {
    icon: {
      url: '/schedulo-icon.svg',
      type: 'image/svg+xml',
    },
    shortcut: { url: '/schedulo-icon.svg', type: 'image/svg+xml' },
    apple: { url: '/schedulo-icon.svg', type: 'image/svg+xml' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
