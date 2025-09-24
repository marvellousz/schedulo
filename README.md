# schedulo

A modern web application that streamlines meeting scheduling and email communication in one unified workflow. Built as an open source project for productivity.

## Quick Start

### Prerequisites
- Node.js 18+ 
- Google account with Calendar API enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/Marvellousz/schedulo.git
cd schedulo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Setup

Create `.env.local` with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Service (Gmail SMTP)
EMAIL_SERVER_USER=your-gmail-address@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_FROM=your-gmail-address@gmail.com
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Get Google OAuth Credentials:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Calendar API and Gmail API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

**Get Gmail App Password:**
1. Enable 2-factor authentication on your Google account
2. Generate an app password for "Mail"
3. Use this password in `EMAIL_SERVER_PASSWORD`

### Run the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` to use the application.

## Features

- **Unified Workflow**: Create emails and schedule meetings in one process
- **Google Meet Integration**: Automatic meeting link generation
- **Interactive Calendar**: Month navigation for date selection
- **Timezone Support**: Schedule across different time zones
- **Rich Text Editor**: Professional email formatting with TipTap
- **Google OAuth**: Secure authentication with NextAuth v5
- **Responsive Design**: Clean UI built with Tailwind CSS v4

## Tech Stack

- **Framework**: Next.js 15.3 with App Router
- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui
- **Authentication**: NextAuth.js v5 (Beta) with Google OAuth
- **APIs**: Google Calendar, Gmail, Meet APIs
- **Email**: Nodemailer with Gmail SMTP
- **Forms**: React Hook Form v7 with Zod validation
- **Editor**: TipTap rich text editor
- **Language**: TypeScript

## Usage

1. **Sign In**: Use Google OAuth to authenticate
2. **Compose Email**: Write your message with the rich text editor
3. **Schedule Meeting**: Toggle "Create a Google Meet" if needed
4. **Select Date**: Use the interactive calendar to pick meeting date
5. **Configure Details**: Set time, duration, and timezone
6. **Send**: Email with meeting details is sent to all recipients
7. **Calendar Sync**: Meeting appears in Google Calendar automatically

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Main application
│   ├── login/            # Authentication
│   ├── privacy/          # Privacy policy
│   └── terms/            # Terms of service
├── components/           # Reusable components
├── lib/                 # Utilities and configurations
└── styles/              # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: pranavmurali024@gmail.com
- **GitHub**: [https://github.com/Marvellousz/schedulo](https://github.com/Marvellousz/schedulo)
- **Project**: Schedulo Open Source Project

---

Built with ❤️ for productivity