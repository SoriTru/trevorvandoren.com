function getSchoolInfo() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  // get current school
  db.collection("user_data")
    .doc(userID)
    .get()
    .then(function (doc) {
      let schoolName = doc.data().current_school;

      let schoolSelected = schoolName !== undefined;

      // set school name
      document.getElementById("school-name").innerText = schoolSelected
        ? schoolName
        : "Choose school from the profile page!";

      // get school data
      if (schoolSelected) {
        db.collection("school")
          .where("official_name", "==", schoolName)
          .get()
          .then(function (querySnapshot) {
            // note: if multiple schools have the same official name this will
            // populate the page with data from the last school
            querySnapshot.forEach(function (doc) {
              // add announcements
              let announcements = doc.data().announcements;
              let announcementDates = Object.keys(announcements).sort();

              // get announcement list element
              let listOne = document.getElementById("announcement-list-one");
              let listTwo = document.getElementById("announcement-list-two");
              let currentListIsOne = true;

              // add announcements to lists
              for (let date of announcementDates) {
                let li = document.createElement("li");
                li.style.color = "#fff";
                li.appendChild(
                  document.createTextNode(`${date}: ${announcements[date]}`)
                );

                if (currentListIsOne) {
                  listOne.appendChild(li);
                  currentListIsOne = false;
                } else {
                  listTwo.appendChild(li);
                  currentListIsOne = true;
                }
              }

              // add league info
              let leagueInfo = doc.data().leagues;
              let leagueNames = Object.keys(leagueInfo);

              // tracker for background color
              let backgroundIsDark = true;

              for (let name of leagueNames) {
                let leagueDiv = document.createElement("div");

                let backgroundColor = backgroundIsDark
                  ? "alternating-color-one"
                  : "alternating-color-two";
                backgroundIsDark = !backgroundIsDark;

                leagueDiv.className = "container " + backgroundColor + " mb-5";

                // set up button for navigation to league
                let buttonClick = `onclick=\"navigateToLeague(\'${name}\')\"\n`;

                leagueDiv.innerHTML =
                  '<div class="columns">\n' +
                  '              <div class="column">\n' +
                  "                <div\n" +
                  '                  class="notification has-text-white content" style="background-color: inherit"\n' +
                  "                >\n" +
                  '                  <h1 class="has-text-white content">\n' +
                  name +
                  "                  </h1>\n" +
                  "                  <ul>\n" +
                  "                    <li>Active Dates: " +
                  leagueInfo[name].activedates +
                  "</li>\n" +
                  "                    <li>Team Size: " +
                  leagueInfo[name].teamsize +
                  "</li>\n" +
                  "                  </ul>\n" +
                  "                </div>\n" +
                  "              </div>\n" +
                  '              <div class="column">\n' +
                  "                <div\n" +
                  '                  class="notification has-text-white content" style="background-color: inherit"\n' +
                  "                >\n" +
                  '                  <nav class="buttons is-right">\n' +
                  "                    <button\n" +
                  '                      class="button is-rounded" style="background-color: #eadb68"\n' +
                  buttonClick +
                  "                    >\n" +
                  "                      League Page\n" +
                  "                    </button>\n" +
                  "                  </nav>\n" +
                  "                  <ul>\n" +
                  "                    <li>Registration Deadline: " +
                  leagueInfo[name].registrationdeadline +
                  "</li>\n" +
                  "                  </ul>\n" +
                  "                </div>\n" +
                  "              </div>";

                document.getElementById("league-space").appendChild(leagueDiv);
              }
            });
          });
      }
    });
}

function navigateToLeague(leagueName) {
  // set user current league to the chosen one
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  db.collection("user_data")
    .doc(userID)
    .update({ selected_league: leagueName })
    .then(function () {
      //navigate the user to the league page
      window.location.href = "../league-page/index.html";
    })
    .catch(function (error) {
      console.log(
        "Shouldn't be a real error here: most likely user just didn't have database entry"
      );
      console.error(error);
      // couldn't update since document wasn't set
      db.collection("user_data")
        .doc(userID)
        .set({ selected_league: leagueName })
        .then(function () {
          //navigate the user to the league page
          window.location.href = "../league-page/index.html";
        });
    });
}
