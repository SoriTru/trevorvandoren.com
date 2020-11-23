function getLeagueInfo() {
  let user = firebase.auth().currentUser;
  let db = firebase.firestore();

  // get user id
  let userID = "";
  if (user != null) {
    userID = user.uid;
  }

  // get current league
  db.collection("user_data")
    .doc(userID)
    .get()
    .then(function (doc) {
      let schoolName = doc.data().current_school;
      let leagueName = doc.data().selected_league;

      document.getElementById("league-title").innerText =
        leagueName + " at " + schoolName;
    });
}
