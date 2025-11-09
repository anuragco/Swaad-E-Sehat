# EmailJS Setup Guide

This guide will help you configure EmailJS to receive customer contact form submissions via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template:

**Template Name:** Contact Form Submission

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
New contact form submission received:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
You can reply directly to this email to respond to {{from_name}}.
Reply-To: {{reply_to}}
```

4. Note down your **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)
3. Copy this key

## Step 5: Configure Environment Variables

1. In the project root directory (`Swaad-E-Sehat`), create a file named `.env`
2. Add the following variables with your actual values:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_RECIPIENT_EMAIL=your-email@example.com
```

**Example:**
```env
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
REACT_APP_RECIPIENT_EMAIL=info@swaad-e-sehat.com
```

## Step 6: Restart Development Server

After creating/updating the `.env` file:

1. Stop your development server (Ctrl+C)
2. Restart it with `npm start`
3. The form will now send emails to your configured email address

## Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the submission
4. You should receive an email with all the customer details

## Important Notes

- The `.env` file should NOT be committed to Git (it's already in `.gitignore`)
- For production deployment, you'll need to set these environment variables in your hosting platform
- The free tier of EmailJS allows 200 emails per month
- Make sure your email service is properly connected in EmailJS dashboard

## Troubleshooting

If emails are not being received:

1. Check the browser console for any error messages
2. Verify all environment variables are set correctly
3. Check your EmailJS dashboard for any service issues
4. Ensure your email service is connected and active in EmailJS
5. Check your spam folder

## Alternative: Direct Configuration

If you prefer not to use environment variables, you can directly edit `src/components/ContactForm.jsx` and replace the placeholder values:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';
const RECIPIENT_EMAIL = 'your-email@example.com';
```

However, using environment variables is recommended for security and flexibility.

