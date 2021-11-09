import "./index.scss";
import "./animations";

const types = {
  FPS: false,
  MMORPG: false,
  Sports: false,
  Racing: false,
  Tower_Defense: false,
  RTS: false,
  Simulation: false,
  Role_Playing: false,
  Adventure: false,
  Survival: false,
  Fighting: false,
  Battle_Royale: false,
  Rhythm: false,
  Platform: false,
  Arcade: false,
  Moba: false,
};

const games = {
  CS_GO: false,
  Tekken: false,
  FIFA: false,
  Super_Mario: false,
  Fortnite: false,
  Call_of_Duty: false,
  The_Sims: false,
  Mortal_Combat: false,
  Guitar_Hero: false,
  World_of_Warcraft: false,
  Skyrim: false,
  Starcraft: false,
  Warcraft: false,
  League_of_Legends: false,
  Dota: false,
  Valorant: false,
  Left_for_Dead: false,
  Overwatch: false,
  PUBG: false,
  Diablo: false,
  Minecraft: false,
  Tetris: false,
  Pack_Man: false,
  Crash_Bandicoot: false,
  Rainbow_Six: false,
  Rocket_League: false,
  Heroes_of_the_Storm: false,
};

const areas = {
  Hand_eye_coordination: false,
  Reaction_time: false,
  Hearing: false,
  Vision: false,
  Communication: false,
  Multitasking: false,
  Mindset: false,
  Nutrition: false,
  Injuries: false,
  Technology: false,
  Physiology: false,
  Psychology: false,
  Sleep: false,
  Stress: false,
  Tactical: false,
  Strategy: false,
  Leadership: false,
  Teamwork: false,
};

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

  document.querySelector(".submit").addEventListener("click", pushData);
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
    types: arrayOfTypes,
    games: arrayOfGames,
    areas: arrayOfAreas,
  };

  fetch("https://kea21s-6eb0.restdb.io/rest/experiment", {
    method: "POST",
    headers: {
      "x-apikey": "606d606af55350043100752e",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log(response);
      arrayOfTypes = [];
    })
    .catch((err) => {
      console.error(err);
    });
}
