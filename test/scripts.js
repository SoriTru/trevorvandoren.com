function updateTime() {
  setInterval(calculateTime, 1000);
}

function calculateTime() {
  let currentDate = new Date();
  // livestream is happening, so don't set timer
  if (
    currentDate.getDay() === 0 &&
    currentDate.getHours() >= 9 &&
    currentDate.getMinutes() >= 30 &&
    [9, 10, 11].includes(currentDate.getHours())
  ) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
  } else {
    // get number of days until Sunday
    let sunday = new Date();
    sunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    sunday.setHours(9);
    sunday.setMinutes(30);
    sunday.setSeconds(0);

    let timeDifference = sunday.getTime() - currentDate.getTime();

    let numDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    let remainder = timeDifference % (1000 * 3600 * 24);

    let numHours = Math.floor(remainder / (1000 * 3600));
    remainder = remainder % (1000 * 3600);

    let numMinutes = Math.floor(remainder / (1000 * 60));
    remainder = remainder % (1000 * 60);

    let numSeconds = Math.floor(remainder / 1000);

    numDays = "0" + String(numDays);
    numHours = String(numHours);
    numHours = numHours.length < 2 ? "0" + numHours : numHours;
    numMinutes = String(numMinutes);
    numMinutes = numMinutes.length < 2 ? "0" + numMinutes : numMinutes;
    numSeconds = String(numSeconds);
    numSeconds = numSeconds.length < 2 ? "0" + numSeconds : numSeconds;

    document.getElementById("days").innerText = numDays;
    document.getElementById("hours").innerText = numHours;
    document.getElementById("minutes").innerText = numMinutes;
    document.getElementById("seconds").innerText = numSeconds;
  }
}
