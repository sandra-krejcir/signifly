import "./index.scss";
import "./animations";
import { games, types, areas, URL, headers } from "./settings.js";
import { moveLabel, removeGamertag } from "./random_functions.js";

const form = document.querySelector("#theForm");
let subscribed = "yes";
let arrayOfGames = [];
let arrayOfTypes = [];
let arrayOfAreas = [];

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks

  document
    .querySelectorAll(".typeOption")
    .forEach((selectType) => selectType.addEventListener("click", toggleType));
  document
    .querySelectorAll(".gameOption")
    .forEach((selectGame) => selectGame.addEventListener("click", toggleGame));
  document
    .querySelectorAll(".areaOption")
    .forEach((selectArea) => selectArea.addEventListener("click", toggleArea));
  document
    .querySelector("#League_of_Legends")
    .addEventListener("click", preselectAreas);

  document.querySelector("#area_but").addEventListener("click", pushData);

  document.querySelectorAll("input").forEach((e) => {
    e.addEventListener("focus", moveLabel);
  });

  document.querySelector("#subscribe").removeEventListener("focus", moveLabel);
  document.querySelector("#privacy").removeEventListener("focus", moveLabel);

  document
    .querySelector("#first_button")
    .addEventListener("click", removeGamertag);

  document.querySelector("#subscribe").addEventListener("click", (e) => {
    if (subscribed === "yes") {
      subscribed = "no";
    } else {
      subscribed = "yes";
    }
    console.log(subscribed);
  });
}

function toggleType(event) {
  const target = event.currentTarget;
  const selectedType = target.dataset.feature;

  if (types[selectedType] === false) {
    types[selectedType] = true;
  } else {
    types[selectedType] = false;
  }

  if (types[selectedType]) {
    arrayOfTypes.push(selectedType);
    target.classList.add("focus");
  } else {
    target.classList.remove("focus");
    const typeIndex = arrayOfTypes.indexOf(selectedType);
    arrayOfTypes.splice(typeIndex, 1);
  }

  console.log(arrayOfTypes);
}

function toggleGame(event) {
  const target = event.currentTarget;
  const selectedGame = target.dataset.feature;

  if (games[selectedGame] === false) {
    games[selectedGame] = true;
  } else {
    games[selectedGame] = false;
  }

  if (games[selectedGame]) {
    arrayOfGames.push(selectedGame);
    target.classList.add("focus");
  } else {
    target.classList.remove("focus");
    const gameIndex = arrayOfGames.indexOf(selectedGame);
    arrayOfGames.splice(gameIndex, 1);
  }

  console.log(arrayOfGames);
}

function toggleArea(event) {
  const target = event.currentTarget;
  const selectedArea = target.dataset.feature;

  if (areas[selectedArea] === false) {
    areas[selectedArea] = true;
  } else {
    areas[selectedArea] = false;
  }

  if (areas[selectedArea]) {
    arrayOfAreas.push(selectedArea);
    target.classList.add("focus");
  } else {
    target.classList.remove("focus");
    const areaIndex = arrayOfAreas.indexOf(selectedArea);
    arrayOfAreas.splice(areaIndex, 1);
  }

  console.log(arrayOfAreas);
}

function preselectAreas(event) {
  const target = event.currentTarget;
  const selectedGame = target.dataset.feature;

  if (games[selectedGame]) {
    areas["Strategy"] = true;
    document.querySelector("#Strategy").classList.add("focus");
    areas["Sleep"] = true;
    document.querySelector("#Sleep").classList.add("focus");
    areas["Tactical"] = true;
    document.querySelector("#Tactical").classList.add("focus");
    types["Moba"] = true;
    document.querySelector("#Moba").classList.add("focus");
    types["Tower_Defense"] = true;
    document.querySelector("#Tower_Defense").classList.add("focus");

    arrayOfAreas.push("Strategy", "Sleep", "Tactical");
    arrayOfTypes.push("Moba", "Tower_Defense");
  } else {
    areas["Strategy"] = false;
    document.querySelector("#Strategy").classList.remove("focus");
    areas["Sleep"] = false;
    document.querySelector("#Sleep").classList.remove("focus");
    areas["Tactical"] = false;
    document.querySelector("#Tactical").classList.remove("focus");
    types["Moba"] = false;
    document.querySelector("#Moba").classList.remove("focus");
    types["Tower_Defense"] = false;
    document.querySelector("#Tower_Defense").classList.remove("focus");
    const indexStrategy = arrayOfAreas.indexOf("Strategy");
    arrayOfAreas.splice(indexStrategy, 1);
    const indexSleep = arrayOfAreas.indexOf("Sleep");
    arrayOfAreas.splice(indexSleep, 1);
    const indexTactical = arrayOfAreas.indexOf("Tactical");
    arrayOfAreas.splice(indexTactical, 1);
    const indexMoba = arrayOfTypes.indexOf("Moba");
    arrayOfTypes.splice(indexMoba, 1);
    const indexTower = arrayOfTypes.indexOf("Tower_Defense");
    arrayOfTypes.splice(indexTower, 1);
  }

  console.log(arrayOfAreas);
  console.log(arrayOfTypes);
}

function pushData() {
  const payload = {
    email: form.elements.email.value,
    gamertag: form.elements.gamertag.value,
    subscribed: subscribed,
    types: arrayOfTypes,
    games: arrayOfGames,
    areas: arrayOfAreas,
  };

  console.log(payload);

  fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      form.elements.email.value = "";
      form.elements.sub.checked = "checked";
      arrayOfGames = [];
      arrayOfTypes = [];
      arrayOfAreas = [];
    })
    .catch((err) => {
      console.error(err);
    });
}
