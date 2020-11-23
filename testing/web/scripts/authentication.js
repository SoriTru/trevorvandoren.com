function handleAuth() {
  // retrieve email/password data
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  document.getElementById("sign-in-toggle").innerText.trim() !== "Log in"
    ? this.handleLogIn(email, password)
    : this.handleSignUp(email, password);
}

function handleLogIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      // TODO: alert the user to these properly
      console.log(error.code);
      console.log(error.message);
    });
}

function handleSignUp(email, password) {
  //check that the passwords match
  if (password === document.getElementById("confirm-password").value) {
    // check that email and password is long enough
    //TODO: make good requirements for email/password
    if (email.length < 4) {
      alert("Email not valid!");
      return;
    } else if (password.length < 4) {
      alert("Password not valid");
      return;
    }

    // at this point email and password should be checked
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("quickstart-sign-in").disabled = false;
      });
  } else {
    // passwords don't match, so alert user and return
    // TODO: clear password fields if this happens
    alert("Passwords do not match!");
    return;
  }
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // navigate to school from log in page
    if (!window.location.href.includes("page")) {
      window.location.href = "./school-page/index.html";
    }
    // load appropriate page info
    if (window.location.href.includes("school-page")) {
      getSchoolInfo();
    } else if (window.location.href.includes("league-page")) {
      getLeagueInfo();
    }
  } else {
    // navigate to log in page on sign out
    if (window.location.href.includes("page")) {
      window.location.href = "../index.html";
    }
  }
});

function toggleLogIn() {
  let isLogIn =
    document.getElementById("sign-in-toggle").innerText === "Log in";

  document.getElementById("sign-in-toggle").innerText = isLogIn
    ? "Sign up"
    : "Log in";

  if (isLogIn) {
    // button is set to log in, so form should switch to user log in
    document.getElementById("auth-title-text").innerText = "Log in";
    document.getElementById("confirm-pw-field").hidden = true;
    document.getElementById("terms-field").hidden = true;
  } else {
    // button is set to sign up, so form should switch to user sign up
    document.getElementById("auth-title-text").innerText = "Sign up";
    document.getElementById("confirm-pw-field").hidden = false;
    document.getElementById("terms-field").hidden = false;
  }
}

function logOut() {
  firebase.auth().signOut();
}
