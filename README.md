# Touchup Building Maintenance Website

A modern, localized (English/Arabic) website for Touchup Building Maintenance in Dubai. Built with Next.js, Tailwind CSS, ShadCN UI, and integrated with Resend for automated booking and contact notifications.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS & ShadCN UI
- **Localization**: next-intl
- **Email**: Resend
- **AI**: Genkit (Ready for expansion)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Fakharalimirza/touchup-website.git
   cd touchup-website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM_ADDRESS=no-reply@touchup.ae
   ADMIN_EMAIL_BOOKING=a.galal@touchup.ae
   ADMIN_EMAIL_CONTACT=a.galal@touchup.ae
   NEXT_PUBLIC_SITE_URL=https://touchup.ae
   GOOGLE_API_KEY=your_google_ai_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Deployment

This project is optimized for deployment on Firebase App Hosting or Vercel. Ensure you add the environment variables to your deployment platform's dashboard.