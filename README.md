# schedulo

A modern web application that streamlines meeting scheduling and email communication in one unified workflow.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Schedulo solves the problem of juggling multiple apps for meeting scheduling and email communication. Instead of switching between calendar apps, email clients, and video conferencing tools, users can create professional emails with embedded meeting details in one seamless workflow.

**Who it's for:** Professionals, teams, and anyone who regularly schedules meetings and sends email invitations.

## Tech Stack

- **Frontend**: Next.js 15.3, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Authentication**: NextAuth.js v5 with Google OAuth
- **APIs**: Google Calendar, Gmail, Meet APIs
- **Email**: Nodemailer with Gmail SMTP
- **Forms**: React Hook Form v7 with Zod validation
- **Editor**: TipTap rich text editor

## Features

- **Unified Workflow**: Create emails and schedule meetings in one process
- **Google Meet Integration**: Automatic meeting link generation
- **Interactive Calendar**: Month navigation for date selection
- **Timezone Support**: Schedule across different time zones
- **Rich Text Editor**: Professional email formatting
- **Google OAuth**: Secure authentication
- **Responsive Design**: Clean UI for all devices

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marvellousz/schedulo.git
   cd schedulo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Create `.env.local` with:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   EMAIL_SERVER_USER=your-gmail-address@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_FROM=your-gmail-address@gmail.com
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to use the application.

## Usage

1. **Sign in** with your Google account
2. **Compose your email** using the rich text editor
3. **Toggle "Create a Google Meet"** if you need a meeting
4. **Select meeting date** from the interactive calendar
5. **Configure details** (time, duration, timezone)
6. **Send** - email with meeting details goes to all recipients
7. **Calendar sync** - meeting appears in Google Calendar automatically

## Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy** - Vercel handles the build automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production domain)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- Email service credentials

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

---

Built with ❤️ for productivity