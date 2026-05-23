# Google Form & Sheets Setup Guide

This guide will walk you through setting up a Google Form, adding input validations (including 10-digit mobile validation), and linking it to a Google Sheets spreadsheet named **Portfolio Contact Responses**.

---

## ⚡ Option A: Automatic Setup (Recommended & Easiest)

I have created an automated creation script inside your workspace folder: **[create_contact_form.gs](file:///c:/Users/aayus/OneDrive/Desktop/MP/create_contact_form.gs)**. You can use it to build everything in 15 seconds:

1. Go to [Google Apps Script](https://script.google.com) and log in.
2. Click the **New Project** button in the top left.
3. Replace the default placeholder code with the content from **[create_contact_form.gs](file:///c:/Users/aayus/OneDrive/Desktop/MP/create_contact_form.gs)**.
4. Click the **Run** button (the play icon) in the toolbar.
5. Review permissions and authorize the script when prompted by Google.
6. The execution log at the bottom will automatically print your **Google Form URL** and **Google Sheets URL**!
7. Copy the public form URL and paste it into **[index.html](file:///c:/Users/aayus/OneDrive/Desktop/MP/index.html#L843)** (replace `YOUR_GOOGLE_FORM_URL`).

---

## 🛠️ Option B: Manual Setup Steps
1. Go to [Google Forms](https://forms.google.com) and log in with your Google account.
2. Click **Blank Form** (or the **+** icon) to create a new form.
3. Title the form: `Portfolio Contact Form` (or any name you prefer).

---

## Step 2: Add and Configure Fields

Add the following four fields with their respective configurations and validations:

### 1. Name
- **Title**: `Name`
- **Type**: **Short answer**
- **Required**: **Yes** (Toggle on)

### 2. Email
- **Title**: `Email`
- **Type**: **Short answer**
- **Required**: **Yes** (Toggle on)
- **Validation**:
  1. Click the **three vertical dots** (bottom right of the Name block) and check **Response validation**.
  2. Select **Text** in the first dropdown, **Email** in the second.
  3. **Custom error text**: `Please enter a valid email address.`

### 3. Mobile Number (10-digit Validation)
- **Title**: `Mobile Number`
- **Type**: **Short answer**
- **Required**: **Yes** (Toggle on)
- **Validation**:
  1. Click the **three vertical dots** (bottom right) and check **Response validation**.
  2. Select **Regular expression** in the first dropdown, **Matches** in the second.
  3. In the **Pattern** field, paste: `^[0-9]{10}$`
  4. **Custom error text**: `Please enter a valid 10-digit mobile number.`

### 4. Message
- **Title**: `Message`
- **Type**: **Paragraph**
- **Required**: **Yes** (Toggle on)

---

## Step 3: Link Responses to a Google Sheet

1. Click on the **Responses** tab at the top of your Google Form editor.
2. Click **Link to Sheets** (the green spreadsheet icon in the top right of the Responses panel).
3. Select **Create a new spreadsheet**.
4. Change the name to exactly: `Portfolio Contact Responses`
5. Click **Create** in the top right.
   *A Google Sheet will automatically open in a new tab with Name, Email, Mobile Number, and Message columns pre-populated.*
6. You can export this Sheet anytime as an Excel (.xlsx) file by clicking **File > Download > Microsoft Excel (.xlsx)**.

---

## Step 4: Integrate the Form URL into your Portfolio

1. In the Google Form editor, click the **Send** button in the top right.
2. Select the **Link icon** (middle option).
3. Copy the URL (you can check **Shorten URL** for a cleaner link).
4. Open your portfolio code and find `index.html`.
5. Locate the contact CTA card (around line 835) and replace the placeholder URL inside the `href` attribute of the button:
   ```html
   <!-- Replace the href below with your copied Google Form URL -->
   <a href="YOUR_GOOGLE_FORM_URL" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-contact-form">
       <span>Contact Me</span>
       <i data-lucide="external-link"></i>
   </a>
   ```

🎉 **That's it!** All message submissions will now be securely saved directly into your `Portfolio Contact Responses` spreadsheet in real-time.
