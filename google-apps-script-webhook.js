/**
 * SCG Mandate Platform - Google Drive Webhook Integration
 * 
 * Instructions:
 * 1. Go to script.google.com and create a new project.
 * 2. Delete the default code and paste this entire file into Code.gs.
 * 3. Update the TARGET_FOLDER_ID below with the ID of your Google Drive folder.
 *    (You can find the folder ID in the URL when viewing the folder in Google Drive: https://drive.google.com/drive/folders/YOUR_FOLDER_ID)
 * 4. Click Deploy > New deployment.
 * 5. Select type: "Web app".
 * 6. Execute as: "Me"
 * 7. Who has access: "Anyone" (since your platform needs to POST data to it, unless you implement a bearer token check).
 * 8. Copy the generated Web app URL and paste it into the Settings tab on the SCG platform.
 */

// Replace this with the ID of the folder where you want to store mandate JSON files.
const TARGET_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';

// Optional: Set a secret token to secure your endpoint
const SECRET_TOKEN = 'YOUR_OPTIONAL_SECRET_TOKEN'; 

function doPost(e) {
  try {
    // 1. Verify Authorization (Optional but recommended)
    if (SECRET_TOKEN && SECRET_TOKEN !== 'YOUR_OPTIONAL_SECRET_TOKEN') {
      const authHeader = e.headers ? e.headers['Authorization'] || e.headers['authorization'] : null;
      if (!authHeader || authHeader !== 'Bearer ' + SECRET_TOKEN) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unauthorized' }))
                             .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // 2. Parse the incoming JSON data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON format' }))
                           .setMimeType(ContentService.MimeType.JSON);
    }

    // If this is just a test ping
    if (data.test) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Webhook reachable' }))
                           .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Get the Target Folder
    const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    
    // 4. Generate a filename
    const ref = data.mandate && data.mandate.ref ? data.mandate.ref.replace(/\//g, '-') : 'Unknown';
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
    const fileName = `SCG_Mandate_${ref}_${timestamp}.json`;

    // 5. Create the file in Google Drive
    const blob = Utilities.newBlob(JSON.stringify(data, null, 2), "application/json", fileName);
    const file = folder.createFile(blob);

    // 6. Return a success response
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Mandate saved to Google Drive',
      fileId: file.getId(),
      fileName: fileName
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Handle unexpected errors
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (e.g. if someone accidentally visits the URL in their browser)
function doGet(e) {
  return ContentService.createTextOutput("SCG Mandate Webhook is active. Please use POST to submit data.");
}
