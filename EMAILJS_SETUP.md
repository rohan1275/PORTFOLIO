# EmailJS Setup Guide

To enable the contact form to send emails directly to your Gmail, you need to set up EmailJS. Follow these steps:

## Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" as your email service
4. Connect your Gmail account (mishrarohan1275@gmail.com)
5. Copy the **Service ID** (you'll need this later)

## Step 3: Create Email Template
1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template structure:
   - **Subject**: `{{subject}}`
   - **Content**: 
     ```
     From: {{from_name}}
     
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
4. Set "To Email" to: `mishrarohan1275@gmail.com`
5. Copy the **Template ID** (you'll need this later)

## Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

## Step 5: Update script.js
Open `script.js` and replace these placeholders:
- Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
- Replace `YOUR_SERVICE_ID` with your Gmail Service ID
- Replace `YOUR_TEMPLATE_ID` with your Email Template ID

The code should look like this:
```javascript
emailjs.init("your-actual-public-key-here");
// ...
emailjs.send('your-service-id', 'your-template-id', emailParams)
```

## Alternative: Quick Setup Script
If you prefer, you can also set these values directly in the HTML by adding data attributes to the form and reading them in JavaScript.

---

**Note**: The free tier of EmailJS allows 200 emails per month, which should be sufficient for a portfolio website.

