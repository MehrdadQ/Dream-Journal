const dreamList = document.getElementById("dream-list");
const btn = document.getElementById("submit-btn");
const addBtn = document.getElementById("add");
const addDreamSection = document.getElementById("add-dream");
const dreamInput = document.getElementById("dream-input");
const dateInput = document.getElementById("date-input");

var weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

// Set default date value to today's date
document.getElementById("date-input").valueAsDate = new Date();

// Add new dream
function addDream() {
  const dreamDiv = document.createElement("div");
  dreamDiv.classList.add("dream");

  const newDream = document.createElement("p");
  newDream.classList.add("dream-text");
  newDream.innerHTML = dreamInput.value;

  const newDreamDate = document.createElement("p");
  newDreamDate.classList.add("date");
  newDreamDate.innerHTML =
    weekday[dateInput.valueAsDate.getDay()] + " - " + dateInput.value;

  const trashBtn = document.createElement("i");
  trashBtn.classList.add("trash-btn");
  trashBtn.classList.add("fas");
  trashBtn.classList.add("fa-trash-alt");

  if (document.getElementById("no-dreams")) {
    document.getElementById("no-dreams").remove();
  }

  // Add to local storage
  saveLocalDreams(dreamInput.value, dateInput.valueAsDate);

  dreamDiv.appendChild(newDreamDate);
  dreamDiv.appendChild(trashBtn);
  dreamDiv.appendChild(newDream);

  dreamList.insertBefore(dreamDiv, dreamList.firstChild);
  // dreamList.appendChild(dreamDiv);
}

// Toggle button for add new dream section
function expandAddSmall() {
  addDreamSection.classList.toggle("hidden");
  document.getElementById("add").style.height = "0px";
  document.getElementById("add").style.border = "0px";
}

function expandAddBig() {
  addDreamSection.classList.toggle("hidden");
  document.getElementById("add").style.height = "40px";
  document.getElementById("add").style.border = "solid 2px white";
}

function saveLocalDreams(dream, date) {
  let dreams;
  if (localStorage.getItem("dreams") === null) {
    dreams = [];
  } else {
    dreams = JSON.parse(localStorage.getItem("dreams"));
  }
  dreams.push(dream);
  localStorage.setItem("dreams", JSON.stringify(dreams));

  let dates;
  if (localStorage.getItem("dates") === null) {
    dates = [];
  } else {
    dates = JSON.parse(localStorage.getItem("dates"));
  }
  dates.push(date);
  localStorage.setItem("dates", JSON.stringify(dates));
}

function getDreams() {
  let dreams;
  if (localStorage.getItem("dreams") === null) {
    dreams = [];
  } else {
    dreams = JSON.parse(localStorage.getItem("dreams"));
    if (dreams.length === 0) {
      setTimeout(function () {
        const noDreams = document.createElement("h4");
        noDreams.id = "no-dreams";
        noDreams.innerHTML = "Your dream entries will show up here";
        document.body.insertBefore(
          noDreams,
          document.getElementById("dream-container")
        );
      }, 600);
    }
  }

  let dates;
  if (localStorage.getItem("dates") === null) {
    dates = [];
  } else {
    dates = JSON.parse(localStorage.getItem("dates"));
  }

  dreams.forEach(function (dream) {
    const dreamDiv = document.createElement("div");
    dreamDiv.classList.add("dream");

    const newDream = document.createElement("p");
    newDream.classList.add("dream-text");
    newDream.innerHTML = dream;

    const trashBtn = document.createElement("i");
    trashBtn.classList.add("trash-btn");
    trashBtn.classList.add("fas");
    trashBtn.classList.add("fa-trash-alt");

    dreamDiv.appendChild(trashBtn);
    dreamDiv.appendChild(newDream);

    dreamList.insertBefore(dreamDiv, dreamList.firstChild);
  });

  let dreamDivs = document.getElementsByClassName("dream");
  for (i = dreamDivs.length - 1; i >= 0; i--) {
    console.log(i);
    let dreamDiv = dreamDivs[i];
    const newDreamDate = document.createElement("p");
    newDreamDate.classList.add("date");
    newDreamDate.innerHTML =
      weekday[
        new Date(
          JSON.parse(localStorage.getItem("dates"))[dreamDivs.length - i - 1]
        ).getDay()
      ] +
      " - " +
      JSON.parse(localStorage.getItem("dates"))[dreamDivs.length - i - 1].slice(
        0,
        10
      );
    dreamDiv.prepend(newDreamDate);
  }
}

function deleteDream(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const dream = item.parentElement;
    removeLocalDreams(dream);
    dream.style["max-height"] = "0px";
    dream.style.opacity = 0;
    setTimeout(function () {
      dream.remove();
    }, 500);
  }
}

function removeLocalDreams(dream) {
  let dreams;
  if (localStorage.getItem("dreams") === null) {
    dreams = [];
  } else {
    dreams = JSON.parse(localStorage.getItem("dreams"));
  }

  let dates;
  if (localStorage.getItem("dates") === null) {
    dates = [];
  } else {
    dates = JSON.parse(localStorage.getItem("dates"));
  }

  var theIndex = dream.children[2].innerHTML;
  var realIndex = dreams.indexOf(theIndex);
  console.log(theIndex);
  console.log(realIndex);
  dreams.splice(realIndex, 1);
  dates.splice(realIndex, 1);
  localStorage.setItem("dreams", JSON.stringify(dreams));
  localStorage.setItem("dates", JSON.stringify(dates));

  if (dreams.length === 0) {
    setTimeout(function () {
      const noDreams = document.createElement("h4");
      noDreams.id = "no-dreams";
      noDreams.innerHTML = "Your dream entries will show up here";
      document.body.insertBefore(
        noDreams,
        document.getElementById("dream-container")
      );
    }, 600);
  }
}

function darkMode() {
  var switchBtn = document.getElementById("switch");

  if (switchBtn.classList.contains("dark")) {
    switchBtn.classList.remove("dark");
    switchBtn.classList.add("light");
    switchBtn.src = "images/light.png";
    document.documentElement.style.setProperty("--text-color", "black");
    document.documentElement.style.setProperty("--bg-color", "white");
    document.documentElement.style.setProperty("--box-bg-color", "white");
    document.documentElement.style.setProperty(
      "--add-btn-bg-color",
      "rgb(90, 90, 140)"
    );
    document.documentElement.style.setProperty("--add-btn-color", "white");
  } else {
    switchBtn.classList.remove("light");
    switchBtn.classList.add("dark");
    switchBtn.src = "images/dark.png";
    document.documentElement.style.setProperty(
      "--text-color",
      "rgb(200,200,200)"
    );
    document.documentElement.style.setProperty("--bg-color", "rgb(20,20,50)");
    document.documentElement.style.setProperty(
      "--box-bg-color",
      "rgb(20, 20, 50)"
    );
    document.documentElement.style.setProperty(
      "--add-btn-bg-color",
      "rgb(60,60,100)"
    );
    document.documentElement.style.setProperty(
      "--add-btn-color",
      "rgb(230,230,255)"
    );
  }
}

// event listeners
btn.addEventListener("click", addDream);
addBtn.addEventListener("click", expandAddSmall);
document.getElementById("close-btn").addEventListener("click", expandAddBig);
dreamList.addEventListener("click", deleteDream);
document.addEventListener("DOMContentLoaded", getDreams);

document.getElementById("switch").addEventListener("click", darkMode);
