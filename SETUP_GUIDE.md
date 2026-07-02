# 🔧 Google Sheets Integration Setup Guide

## ✅ What's Already Done
- API endpoint to save form data to Google Sheets is already created
- `googleapis` dependency is installed
- Email field is already optional
- All forms (home contact, standalone contact, enquiry modal) are already hooked up to the API

---

## 📝 Step-by-Step Setup Instructions

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Log in with your Google account
3. Click on the project dropdown in the top-left and click "New Project"
4. Name your project (e.g., "Vistaar Estate Forms") and click "Create"

### Step 2: Enable Google Sheets & Drive APIs
1. In the Google Cloud Console, make sure your new project is selected
2. Go to the [APIs & Services > Library](https://console.cloud.google.com/apis/library)
3. Search for **"Google Sheets API"** → click on it → click "Enable"
4. Go back to the Library, search for **"Google Drive API"** → click on it → click "Enable"

### Step 3: Create a Service Account
1. Go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click **"Create Service Account"** at the top
3. Fill in the details:
   - Service account name: `vistaar-estate-service`
   - Service account ID: (auto-generated, you can leave it)
   - Description: `Service account for Vistaar Estate form submissions`
4. Click **"Create and Continue"**
5. For roles, select **"Editor"** (or just "Sheets Editor" for limited access)
6. Click **"Continue"** → then **"Done"**

### Step 4: Generate & Download Private Key (JSON)
1. From the Service Accounts page, click on your newly created service account
2. Go to the **"Keys"** tab
3. Click **"Add Key"** → **"Create New Key"**
4. Select **"JSON"** as the key type and click "Create"
5. A JSON file will be downloaded automatically - **keep this file safe!**

### Step 5: Create a Google Sheet
1. Go to [Google Sheets](https://docs.google.com/spreadsheets) and create a new blank spreadsheet
2. Rename it to "Vistaar Estate Form Submissions" (or whatever you want)
3. In **Row 1** (headers), add the following column headers (EXACTLY in this order!):
   - **A1:** Timestamp
   - **B1:** Form Type
   - **C1:** Name
   - **D1:** Email
   - **E1:** Phone
   - **F1:** Message
   - **G1:** Property
4. Keep this spreadsheet open for the next step!

### Step 6: Share the Sheet with Your Service Account
1. In your Google Sheet, click on **Share** in the top-right
2. From the JSON file you downloaded earlier, copy the **client_email** value (looks like: `vistaar-estate-service@your-project-id.iam.gserviceaccount.com`)
3. Paste that email into the "Add people and groups" field
4. Change the access level from "Viewer" to **Editor**
5. **Uncheck** "Notify people" and click **Share**

### Step 7: Configure Environment Variables
1. Go to your project folder `vistaar-estate`
2. Copy the `.env.example` file and rename the copy to `.env`:
   - You can do this in File Explorer or via command line
3. Open the downloaded JSON key file (from Step 4) in a text editor like Notepad
4. Now open your new `.env` file and fill in the values:

#### How to fill your .env file:
```env
# Google Sheets API Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_client_email_here
GOOGLE_PRIVATE_KEY=your_private_key_here
```

- **GOOGLE_SHEET_ID:** Copy from your sheet's URL!
  - Example URL: `https://docs.google.com/spreadsheets/d/12345abcdefghijklmnopqrstuvwxyz/edit`
  - Copy the part between `/d/` and `/edit` → that's your Sheet ID!
- **GOOGLE_SERVICE_ACCOUNT_EMAIL:** Copy the `client_email` value from your JSON file
- **GOOGLE_PRIVATE_KEY:** Copy the ENTIRE `private_key` value from your JSON file!
  - Important: Leave all the `\n` characters as-is!

### Step 8: Restart Your Dev Server!
- If your dev server was running, stop it (Ctrl+C)
- Restart it with: `npm run dev`

---

## ✅ Testing the Integration

1. Go to your local site at [http://localhost:3000](http://localhost:3000)
2. Scroll to the **Contact Us** section and fill out the form (leave email blank if you want)
3. Click **Send Message**
4. You should see a success message!
5. Check your terminal - you'll see logs confirming the form submission
6. Open your Google Sheet - you should see a new row with the submitted data! 🎉

Also test:
- The enquiry form from the property modal
- The standalone contact page at [http://localhost:3000/contact](http://localhost:3000/contact)

---

## 🛟 Troubleshooting

- **Error 403 Access Denied:** Double-check that you shared the sheet with the service account email AND gave it Editor access!
- **Error 400 Invalid Credentials:** Check your private key - make sure you copied the entire thing and didn't miss any characters!
- **No data appearing?** Make sure your Sheet has the exact headers as listed in Step 5!
- **Still having issues?** Check your terminal logs - they will have helpful error messages!

---

## 🚀 For Production (Vercel/Hosting)

When deploying to Vercel or another host:
1. Don't commit your `.env` file (it's already in `.gitignore`)
2. Go to your hosting provider's dashboard
3. Add the same 3 environment variables to your hosting settings:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Redeploy your app!

---

That's it! You're all set up! 🎉
