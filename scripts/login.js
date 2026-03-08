document.getElementById('login-btn').addEventListener('click', ()=> {
    // get the username
    const userInputField = document.getElementById('username-input');
    const userInputValue = userInputField.value;
    // get the user password
    const userPasswordField = document.getElementById('password-input');
    const userPasswordValue = userPasswordField.value;
    
    // Credential check
    if(userInputValue === "admin" && userPasswordValue === "admin123") {
        window.location.assign('/home.html');
    } else {
        alert('Please provide the correct information');
        return;
    }
})