function getLeagueInfo() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  // get current league from user data
  db.collection("user_data")
    .doc(userID)
    .get()
    .then(function (doc) {
      let schoolName = doc.data().current_school;
      let leagueName = doc.data().selected_league;

      document.getElementById("league-title").innerText =
        leagueName + " at " + schoolName;

      // get league data
      db.collection("school")
        .where("official_name", "==", schoolName)
        .get()
        .then(function (querySnapshot) {
          // note: if multiple schools have the same official name this will
          // populate the page with data from the last school
          querySnapshot.forEach(function (doc) {
            let schoolID = doc.id;

            let leagueData = doc.data().leagues[leagueName];

            // set up league info
            document.getElementById("league-dates").innerText =
              "Dates: " + leagueData.activedates;
            document.getElementById("team-size").innerText =
              "Max team size: " + leagueData.teamsize;
            document.getElementById("registration-deadline").innerText =
              "Registration Deadline: " + leagueData.registrationdeadline;

            // set team buttons
            let createTeamClick = `onclick=\"toggleModal(true,\'create\', \'${doc.id}\', \'${leagueName}\', \'${userID}\')\"\n`;
            let joinTeamClick = `onclick=\"toggleModal(true,\'join\', \'${doc.id}\', \'${leagueName}\', \'${userID}\')\"\n`;

            document.getElementById("team-buttons").innerHTML =
              '<button class="button is-fullwidth"\n' +
              createTeamClick +
              ">" +
              "                    Create Team" +
              "                  </button>\n" +
              "                  <button\n" +
              '                    class="button is-fullwidth"\n' +
              joinTeamClick +
              "                  >\n" +
              "                    Join Team\n" +
              "                  </button>\n" +
              '                  <a id="rules-link" class="button is-fullwidth" target="_blank"\n' +
              "                    >Rules</a\n" +
              "                  >";

            // set rules link button
            let rulesAddress =
              leagueData.rules !== undefined
                ? leagueData.rules
                : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            document.getElementById("rules-link").href = rulesAddress;

            // defaul team elements to invisible
            document.getElementById("team-name").innerText = "";
            document.getElementById("edit-team-link").style.visibility =
              "hidden";

            // set up win/loss ratio dictionary
            let winLossDict = {};
            let keepVisible = false;
            for (let team in leagueData.teams) {
              // calculate win/loss ratio for each team
              winLossDict[team] =
                leagueData.teams[team].wins / leagueData.teams[team].losses;

              // get first team user is a part of and display the data
              if (
                Object.keys(leagueData.teams[team].members).includes(userID)
              ) {
                // make team button visible
                let teamButton = document.getElementById("edit-team-link");
                teamButton.style.visibility = "visible";
                keepVisible = true;

                if (leagueData.teams[team].teamCaptain === userID) {
                  // if user is admin, allow deletion of team
                  teamButton.innerText = "Delete Team";
                  teamButton.onclick = function () {
                    deleteTeam(schoolID, leagueName, team);
                  };
                } else {
                  // user is only member, so allow team to be left
                  teamButton.innerText = "Leave Team";
                  teamButton.onclick = function () {
                    leaveTeam(schoolID, leagueName, team, userID);
                  };
                }

                let nextMatch = leagueData.teams[team].nextMatchDate;
                let nextMatchTeam = Object.keys(nextMatch)[0];

                document.getElementById("team-name").innerText = team;
                document.getElementById("team-match").innerText =
                  "Next match against team " +
                  nextMatchTeam +
                  " on " +
                  nextMatch[nextMatchTeam];
              } else if (!keepVisible) {
                document.getElementById("team-name").innerText = "";
                document.getElementById("edit-team-link").style.visibility =
                  "hidden";
              }
            }

            let firstPlace = "";
            let secondPlace = "";
            let thirdPlace = "";

            let firstRatio = 0;
            let secondRatio = 0;
            let thirdRatio = 0;

            for (let team in winLossDict) {
              if (winLossDict[team] > firstRatio) {
                // move second place to third place
                thirdRatio = secondRatio;
                thirdPlace = secondPlace;
                // move first place to second place
                secondRatio = firstRatio;
                secondPlace = firstPlace;
                // put new highest team in first
                firstRatio = winLossDict[team];
                firstPlace = team;
              } else if (winLossDict[team] > secondRatio) {
                // move second place to third place
                thirdRatio = secondRatio;
                thirdPlace = secondPlace;
                // put new second highest team in second
                secondRatio = winLossDict[team];
                secondPlace = team;
              } else if (winLossDict[team] > thirdRatio) {
                // put new third highest team in third
                thirdRatio = winLossDict[team];
                thirdPlace = team;
              }
            }

            // update document with places
            document.getElementById("first-place").innerText = firstPlace;
            document.getElementById("second-place").innerText = secondPlace;
            document.getElementById("third-place").innerText = thirdPlace;
          });
        });
    });
}

function deleteTeam(school, league, team) {
  let db = firebase.firestore();

  db.collection("school")
    .doc(school)
    .update({
      [`leagues.${league}.teams.${team}`]: firebase.firestore.FieldValue.delete(),
    })
    .then(function () {
      alert("Team Deleted!");
      this.getLeagueInfo();
    });
}

function leaveTeam(school, league, team, uid) {
  let db = firebase.firestore();

  db.collection("school")
    .doc(school)
    .update({
      [`leagues.${league}.teams.${team}.members.${uid}`]: firebase.firestore.FieldValue.delete(),
    })
    .then(function () {
      this.getLeagueInfo();
    });
}

function toggleModal(isVisible, option, school, league, uid) {
  if (isVisible) {
    if (option === "create") {
      let buttonClick = `onclick=\"createTeam(\'${school}\', \'${league}\', \'${uid}\')\"\n`;

      document.getElementById("modal-content").innerHTML =
        '<div class="box">\n' +
        '              <h1 class="title is-5 has-text-centered">Create Team</h1>\n' +
        '              <div class="field">\n' +
        '                <label class="label">Enter Team Name:</label>\n' +
        '                <div class="control">\n' +
        '                  <input id="create-name" class="input" type="text" />\n' +
        "                </div>\n" +
        "              </div>\n" +
        '              <div class="field">\n' +
        '                <div class="control">\n' +
        '                  <button class="button is-link" ' +
        buttonClick +
        " >\n" +
        "                    Create\n" +
        "                  </button>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>";
    } else if (option === "join") {
      let db = firebase.firestore();

      let teamListHTML = "";
      let buttonClick = `onclick=\"joinTeam(\'${school}\', \'${league}\', \'${uid}\')\"\n`;

      db.collection("school")
        .doc(school)
        .get()
        .then(function (doc) {
          // add all teams to the element
          Object.keys(doc.data().leagues[league].teams).forEach(function (
            name
          ) {
            teamListHTML += "<option>" + name + "</option>";
          });
        })
        .then(function () {
          document.getElementById("modal-content").innerHTML =
            '            <div class="box">\n' +
            '              <h1 class="title is-5 has-text-centered">Join Team</h1>\n' +
            '              <div class="field">\n' +
            '                <div class="select">\n' +
            '                  <select id="team-select">\n' +
            "                    <option>Select Team</option>\n" +
            teamListHTML +
            "                  </select>\n" +
            "                </div>\n" +
            "              </div>\n" +
            '              <div class="field">\n' +
            '                <div class="control">\n' +
            '                  <button class="button is-link" ' +
            buttonClick +
            ">\n" +
            "                    Join\n" +
            "                  </button>\n" +
            "                </div>\n" +
            "              </div>\n" +
            "            </div>";
        });
    }

    // display modal
    document.getElementById("modal").classList.add("is-active");
  } else {
    // hide model
    document.getElementById("modal").classList.remove("is-active");
  }
}

function createTeam(school, league, uid) {
  // get team name
  let teamName = document.getElementById("create-name").value;

  let db = firebase.firestore();

  db.collection("school")
    .doc(school)
    .get()
    .then(function (doc) {
      let teamDict = doc.data().leagues[league].teams;
      teamDict[teamName] = {
        members: {
          [uid]: "captain",
        },
        teamCaptain: uid,
        nextMatchDate: {
          SetMe: "10/10/10",
        },
        wins: 0,
        losses: 0,
      };

      db.collection("school")
        .doc(school)
        .update({
          [`leagues.${league}.teams`]: teamDict,
        })
        .then(function () {
          this.toggleModal(false, "", "", "", "");
          alert("Team Created!");
          this.getLeagueInfo();
        });
    });
}

function joinTeam(school, league, uid) {
  let chosenTeam = document.getElementById("team-select").value;
  if (chosenTeam !== "Select Team") {
    let db = firebase.firestore();

    db.collection("school")
      .doc(school)
      .get()
      .then(function (doc) {
        let memberList = doc.data().leagues[league].teams[chosenTeam].members;
        memberList[uid] = "member";

        db.collection("school")
          .doc(school)
          .update({
            [`leagues.${league}.teams.${chosenTeam}.members`]: memberList,
          })
          .then(function () {
            this.toggleModal(false, "", "", "", "");
            alert("Team Added!");
            this.getLeagueInfo();
          });
      });
  } else {
    alert("Invalid team choice!");
    this.toggleModal(false, "", "", "", "");
  }
}
