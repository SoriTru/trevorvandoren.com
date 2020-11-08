function showUsernameChange() {
  let tempUsername = document.getElementById("new-username").value;
  document.getElementById("show-new-username").innerText =
    "New: " + tempUsername;
}

function setMenuView(menuChoice) {
  document.getElementById("chosen-menu-option").style.visibility = "visible";
  switch (menuChoice) {
    case "addschool":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">\n' +
        "Add School\n" +
        "</h1>" +
        '<div class="field">\n' +
        '  <div class="select">\n' +
        "    <select>\n" +
        "      <option>Select School</option>\n" +
        "      <option>Temporary for testing</option>\n" +
        "    </select>\n" +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <label class="label">Enter your student email:</label>\n' +
        '  <div class="control">\n' +
        '    <input id="student-email" class="input" type="text" />\n' +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <div class="control">\n' +
        '    <button class="button is-link" onclick="">Request Access</button>\n' +
        "  </div>\n" +
        "</div>";
      break;

    case "switchschool":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">\n' +
        "Switch School\n" +
        "</h1>" +
        '<div class="field">\n' +
        '  <div class="select">\n' +
        "    <select>\n" +
        "      <option>Select School</option>\n" +
        "      <option>Temporary for testing</option>\n" +
        "    </select>\n" +
        "  </div>\n" +
        "</div>\n" +
        '<div class="field">\n' +
        '  <div class="control">\n' +
        '    <button class="button is-link" onclick="">Switch</button>\n' +
        "  </div>\n" +
        "</div>";
      break;

    case "changeusername":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">Change Username</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter New Username:</label>\n' +
        '                    <div class="control">\n' +
        "                      <input\n" +
        '                        id="new-username"\n' +
        '                        class="input"\n' +
        '                        type="text"\n' +
        '                        onchange="showUsernameChange()"\n' +
        "                      />\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        "                  <!-- TODO: get username from firebase -->\n" +
        "                  <h6>Current: [insert username]</h6>\n" +
        '                  <h6 id="show-new-username" class="subtitle is-6">New:</h6>\n' +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-link" onclick="">\n' +
        "                        Change\n" +
        "                      </button>\n" +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "changepassword":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">Change Password</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Old Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="old-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter New Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="new-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Confirm New Password:</label>\n' +
        '                    <div class="control">\n' +
        "                      <input\n" +
        '                        id="confirm-new-password"\n' +
        '                        class="input"\n' +
        '                        type="password"\n' +
        "                      />\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-link" onclick="">Change</button>\n' +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "deleteaccount":
      document.getElementById("chosen-menu-option").innerHTML =
        '                  <h1 class="title is-5 has-text-centered">Delete Account</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Username:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="username" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <label class="checkbox">\n' +
        '                        <input type="checkbox" />\n' +
        "                        I choose to delete my account and understand that this\n" +
        "                        action cannot be undone.\n" +
        "                      </label>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-danger" onclick="">\n' +
        "                        Delete\n" +
        "                      </button>\n" +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "requestschoolaccount":
      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">\n' +
        "                    Request School Account\n" +
        "                  </h1>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">School:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="school-name" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Name:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="personal-name" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Position at School:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="position" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <label class="label">Contact Email:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="email" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <label class="checkbox">\n' +
        '                        <input type="checkbox" />\n' +
        "                        <!-- TODO: create terms and conditions -->\n" +
        '                        I agree to the <a href="#">terms and conditions</a>\n' +
        "                      </label>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-link" onclick="">Request</button>\n' +
        "                    </div>\n" +
        "                  </div>";
  }
}
