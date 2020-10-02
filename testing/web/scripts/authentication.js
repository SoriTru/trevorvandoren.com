function validatePassword() {
    let password = document.getElementById("password").value;
    if (password === document.getElementById("confirm-password").value) {
        // passwords match, so create user
        let username = document.getElementById("username").value
        // TODO: implement more logical checks on username/password
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
    }
}

function
