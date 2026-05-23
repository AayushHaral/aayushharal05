/**
 * Google Apps Script to automatically create the Portfolio Contact Form,
 * configure validation rules (including 10-digit mobile validation),
 * create a Google Sheet named "Portfolio Contact Responses", and link them.
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Click "New Project" in the top left.
 * 3. Delete any default code and paste this entire script.
 * 4. Click the "Run" button (the play icon) in the toolbar.
 * 5. Review permissions and authorize the script when prompted by Google.
 * 6. The console logs at the bottom will print your Form URL and Sheet URL!
 */

function setupPortfolioFormAndSheet() {
  try {
    // 1. Create a new Google Form
    var form = FormApp.create('Portfolio Contact Form');
    form.setDescription('Contact submissions from my developer portfolio website.');
    
    // 2. Add Name field (Required)
    var nameField = form.addTextItem();
    nameField.setTitle('Name')
             .setRequired(true);
             
    // 3. Add Email field with built-in email validation (Required)
    var emailField = form.addTextItem();
    var emailValidation = FormApp.createTextValidation()
      .requireTextIsEmail()
      .setHelpText('Please enter a valid email address.')
      .build();
    emailField.setTitle('Email')
              .setValidation(emailValidation)
              .setRequired(true);
              
    // 4. Add Mobile Number field with 10-digit validation (Required)
    var mobileField = form.addTextItem();
    var mobileValidation = FormApp.createTextValidation()
      .requireTextMatchesPattern('^[0-9]{10}$')
      .setHelpText('Please enter a valid 10-digit mobile number.')
      .build();
    mobileField.setTitle('Mobile Number')
               .setValidation(mobileValidation)
               .setRequired(true);
               
    // 5. Add Message field (Required, Paragraph style)
    var messageField = form.addParagraphTextItem();
    messageField.setTitle('Message')
                .setRequired(true);
                
    // 6. Create the linked Google Sheet named 'Portfolio Contact Responses'
    var ss = SpreadsheetApp.create('Portfolio Contact Responses');
    
    // 7. Connect the form to the spreadsheet
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    
    // 8. Log the URLs for the user
    Logger.log('\n====================================================\n');
    Logger.log('SUCCESS! Your Google Form and Sheet have been created.');
    Logger.log('👉 Google Form (Link for your Portfolio): ' + form.getPublishedUrl());
    Logger.log('👉 Google Sheets (Responses spreadsheet): ' + ss.getUrl());
    Logger.log('\n====================================================\n');
    
  } catch (error) {
    Logger.log('Error creating form or sheet: ' + error.toString());
  }
}
