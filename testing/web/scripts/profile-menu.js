function showUsernameChange() {
  let tempUsername = document.getElementById("new-username").value;
  document.getElementById("show-new-username").innerText =
    "New: " + tempUsername;
}

function setMenuView(menuChoice) {
  document.getElementById("chosen-menu-option").style.visibility = "visible";
  // set up user and database references
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  switch (menuChoice) {
    case "addschool":
      let schoolListHTML = "";

      db.collection("school")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            schoolListHTML +=
              "<option>" + doc.data().official_name + "</option>\n";
            document.getElementById("chosen-menu-option").innerHTML =
              '<h1 class="title is-5 has-text-centered">\n' +
              "Add School\n" +
              "</h1>" +
              '<div class="field">\n' +
              '  <div class="select">\n' +
              '    <select id="school-select">\n' +
              "      <option>Select School</option>\n" +
              schoolListHTML +
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
              '    <button class="button is-link" onclick="addSchool()">Request Access</button>\n' +
              "  </div>\n" +
              "</div>";
          });
        });

      break;

    case "switchschool":
      // get user id
      let userID = "";
      if (user != null) {
        userID = user.uid;
      }

      db.collection("user_data")
        .doc(userID)
        .get()
        .then(function (doc) {
          // set current school if already stored
          let currentSchool =
            doc.data().current_school !== undefined
              ? doc.data().current_school
              : "None";

          // get keys for school user is associated with
          let userSchoolNames = Object.keys(doc.data().school_list);

          // get official school names to populate list with, using a string
          let schoolListHTML = "";
          db.collection("school")
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (document) {
                if (userSchoolNames.includes(document.id)) {
                  schoolListHTML +=
                    "<option>" + document.data().official_name + "</option>\n";
                }
              });
            })
            .then(function () {
              // set up html for option input
              document.getElementById("chosen-menu-option").innerHTML =
                '<h1 class="title is-5 has-text-centered">\n' +
                "Switch School\n" +
                "</h1>" +
                "<h6>Current School: " +
                currentSchool +
                "</h6>\n" +
                '<div class="field">\n' +
                '  <div class="select">\n' +
                '    <select id="school-select">\n' +
                "      <option>Select School</option>\n" +
                schoolListHTML +
                "    </select>\n" +
                "  </div>\n" +
                "</div>\n" +
                '<div class="field">\n' +
                '  <div class="control">\n' +
                '    <button class="button is-link" onclick="switchSchool()">Switch</button>\n' +
                "  </div>\n" +
                "</div>";
            });
        });

      break;

    case "changeusername":
      let username;
      if (user != null) {
        username = user.displayName;
      }
      if (username == null) {
        username = "none";
      }

      document.getElementById("chosen-menu-option").innerHTML =
        '<h1 class="title is-5 has-text-centered">Change Username</h1>\n' +
        '<div class="field">\n' +
        '<label class="label">Enter New Username:</label>\n' +
        '<div class="control">\n' +
        "<input\n" +
        'id="new-username"\n' +
        'class="input"\n' +
        'type="text"\n' +
        'onchange="showUsernameChange()"\n' +
        "/>\n" +
        "</div>\n" +
        "</div>\n" +
        "<h6>Current: " +
        username +
        "</h6>\n" +
        '<h6 id="show-new-username" class="subtitle is-6">New:</h6>\n' +
        '<div class="field">\n' +
        '<div class="control">\n' +
        '<button class="button is-link" onclick="changeUsername()">\n' +
        "Change\n" +
        "</button>\n" +
        "</div>\n" +
        "</div>";
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
        '                      <button class="button is-link" onclick="changePassword()">Change</button>\n' +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "deleteaccount":
      document.getElementById("chosen-menu-option").innerHTML =
        '                  <h1 class="title is-5 has-text-centered">Delete Account</h1>\n' +
        '                  <div class="field">\n' +
        '                    <label class="label">Enter Password:</label>\n' +
        '                    <div class="control">\n' +
        '                      <input id="delete-password" class="input" type="password" />\n' +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <label class="checkbox">\n' +
        '                        <input id="delete-checkbox" type="checkbox" />\n' +
        "                        I choose to delete my account and understand that this\n" +
        "                        action cannot be undone.\n" +
        "                      </label>\n" +
        "                    </div>\n" +
        "                  </div>\n" +
        '                  <div class="field">\n' +
        '                    <div class="control">\n' +
        '                      <button class="button is-danger" onclick="deleteAccount()">\n' +
        "                        Delete\n" +
        "                      </button>\n" +
        "                    </div>\n" +
        "                  </div>";
      break;

    case "requestschoolaccount":
      // check to see if user already requested account
      let ref = db.collection("schoolAccountRequests").doc(user.uid);

      ref.get().then(function (doc) {
        if (doc.exists) {
          alert("Account already requested! We'll be in touch soon.");
        } else {
          document.getElementById("chosen-menu-option").innerHTML =
            '<h1 class="title is-5 has-text-centered">\n' +
            "                    Request School Account\n" +
            "                  </h1>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">School:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="school-name" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Name:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="personal-name" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Position at School:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="position" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <label class="label">Contact Email:</label>\n' +
            '                    <div class="control">\n' +
            '                      <input id="email" class="input" type="text" />\n' +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <div class="control">\n' +
            '                      <label class="checkbox">\n' +
            '                        <input id="term-agree" type="checkbox" />\n' +
            "                        <!-- TODO: create terms and conditions -->\n" +
            '                        I agree to the <a href="#">terms and conditions</a>\n' +
            "                      </label>\n" +
            "                    </div>\n" +
            "                  </div>\n" +
            '                  <div class="field">\n' +
            '                    <div class="control">\n' +
            '                      <button class="button is-link" onclick="requestSchoolAccount()">Request</button>\n' +
            "                    </div>\n" +
            "                  </div>";
        }
      });
  }
}

function addSchool() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  let userID = user !== null ? user.uid : "";

  let schoolNameDict = {};
  let schoolEmailDict = {};

  db.collection("school")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // map offical names to keys for school
        schoolNameDict[doc.data().official_name] = doc.id;
        schoolEmailDict[doc.data().official_name] = doc.data().email_domain;
      });
    })
    .then(function () {
      let email = document.getElementById("student-email").value;
      let chosenSchool = document.getElementById("school-select").value;

      if (email.includes(schoolEmailDict[chosenSchool])) {
        // get current school list
        db.collection("user_data")
          .doc(userID)
          .get()
          .then(function (doc) {
            let currentList = doc.data().school_list;
            currentList[schoolNameDict[chosenSchool]] = email;

            console.log(currentList);

            // record school key in user schools
            db.collection("user_data")
              .doc(userID)
              .update({ school_list: currentList });
            alert("School Added!");
            this.setMenuView("addschool");
          })
          .catch(function (error) {
            if (error instanceof TypeError) {
              console.log("Creating user database record");
              let currentList = {};
              currentList[schoolNameDict[chosenSchool]] = email;

              db.collection("user_data")
                .doc(userID)
                .update({ school_list: currentList })
                .then(function () {
                  alert("School added!");
                })
                .catch(function (error) {
                  // no document to update, so document must first be set
                  db.collection("user_data")
                    .doc(userID)
                    .set({ school_list: currentList });
                });
            } else {
              console.error(error);
            }
          });
      } else {
        alert("Email for school not appropriate!");
      }
    });
}

function switchSchool() {
  // set up user and database
  let db = firebase.firestore();
  let user = firebase.auth().currentUser;

  let userID = "";

  if (user != null) {
    userID = user.uid;
  }

  // set current school for user to what is chosen
  let chosenSchool = document.getElementById("school-select").value;

  if (chosenSchool !== "Select School") {
    db.collection("user_data")
      .doc(userID)
      .update({
        current_school: chosenSchool,
      })
      .then(function () {
        alert("School set!");
        this.setMenuView("switchschool");
      })
      .catch(function (error) {
        alert("Error setting school");
        console.error(error);
      });
  } else {
    alert("Must select school");
  }
}

function changeUsername() {
  let newUsername = document.getElementById("new-username").value;
  let user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: newUsername,
    })
    .then(function () {
      alert("Username updated!");
      this.setMenuView("changeusername");
    })
    .catch(function (error) {
      console.error(error);
      alert("Error updating username!");
    });
}

function changePassword() {
  let oldPassword = document.getElementById("old-password").value;
  let newPassword = document.getElementById("new-password").value;
  let confirmPassword = document.getElementById("confirm-new-password").value;
  let email = "";

  let user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
  }

  let cred = firebase.auth.EmailAuthProvider.credential(email, oldPassword);

  user
    .reauthenticateWithCredential(cred)
    .then(function () {
      if (newPassword === confirmPassword) {
        user
          .updatePassword(newPassword)
          .then(function () {
            alert("Password updated successfully!");
          })
          .catch(function (error) {
            console.error(error);
            alert("Error in updating password!");
          });
      } else {
        alert("New password confirmation error!");
      }
    })
    .catch(function (error) {
      console.error(error);
      alert("Error in validating credentials!");
    });
}

function deleteAccount() {
  // TODO: delete database records associated with user
  let password = document.getElementById("delete-password").value;
  let email = "";
  let isConfirmed = document.getElementById("delete-checkbox").checked;

  let user = firebase.auth().currentUser;

  if (user != null) {
    email = user.email;
  }

  let cred = firebase.auth.EmailAuthProvider.credential(email, password);

  user
    .reauthenticateWithCredential(cred)
    .then(function () {
      if (isConfirmed) {
        user
          .delete()
          .then(function () {
            firebase.auth().signOut();
          })
          .catch(function (error) {
            alert("Error in deleting account!");
            console.error(error);
          });
      } else {
        alert("Must confirm account deletion!");
      }
    })
    .catch(function (error) {
      console.error(error);
      alert("Error in validating credentials!");
    });
}

function requestSchoolAccount() {
  let accountRequestInfo = {
    school: document.getElementById("school-name").value,
    name: document.getElementById("personal-name").value,
    position: document.getElementById("position").value,
    email: document.getElementById("email").value,
  };

  let user = firebase.auth().currentUser;

  let didAgree = document.getElementById("term-agree").checked;

  let didComplete = true;

  for (let key in accountRequestInfo) {
    if (accountRequestInfo[key] == null) {
      didComplete = false;
    }
  }

  if (didAgree && didComplete && user != null) {
    let db = firebase.firestore();

    db.collection("schoolAccountRequests")
      .doc(user.uid)
      .set(accountRequestInfo);

    alert("School account requested! We'll get back to you soon.");
    document.getElementById("chosen-menu-option").style.visibility = "hidden";
  } else if (!didAgree) {
    alert("Must agree to the terms and conditions!");
  } else {
    alert("Must complete all fields!");
  }

  // check to make sure data is included
}
