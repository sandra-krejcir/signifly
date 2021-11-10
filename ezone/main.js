import "./index.scss";
import "./animations";
import { games, types, areas, URL, headers } from "./settings.js";

const form = document.querySelector("#theForm");
let subscribed;
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

  if (document.querySelector("#subscribe").checked) {
    subscribed = "yes";
  } else {
    subscribed = "no";
  }

  console.log(subscribed);
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
  } else {
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
  } else {
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
  } else {
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
    areas["Sleep"] = true;
    arrayOfAreas.push("Strategy", "Sleep");
  } else {
    areas["Strategy"] = false;
    areas["Sleep"] = false;
    const indexStrategy = arrayOfAreas.indexOf("Strategy");
    arrayOfAreas.splice(indexStrategy, 1);
    const indexSleep = arrayOfAreas.indexOf("Sleep");
    arrayOfAreas.splice(indexSleep, 1);
  }

  console.log(arrayOfAreas);
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
      form.elements.gamertag.value = "";
      form.elements.email.value = "";
      arrayOfGames = [];
      arrayOfTypes = [];
      arrayOfAreas = [];
    })
    .catch((err) => {
      console.error(err);
    });
}
