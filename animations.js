"use strict";

window.addEventListener("DOMContentLoaded", formStart);

function formStart() {
  console.log("My Start");
  const form = document.querySelector("#theForm");
  document.querySelector("#start_but").addEventListener("click", (e) => {
    document.querySelector(".container").classList.remove("form--no");
    if (form.checkValidity()) {
      formGames();
      document.querySelector(".theGamerOne").textContent =
        document.querySelector("#gamertag").value;
    } else {
      form.reportValidity();
      document.querySelector(".container").classList.add("form--no");
    }
  });

  document.querySelector("#started").classList.remove("hidden");

  document.querySelector("#games").classList.add("hidden");
  document.querySelector("#type").classList.add("hidden");
  document.querySelector("#area").classList.add("hidden");
  document.querySelector("#password").classList.add("hidden");
  document.querySelector("#end").classList.add("hidden");
}

function formGames() {
  console.log("fomrGames");

  document.querySelector("#start_but").removeEventListener("click", formGames);

  document.querySelector("#games").classList.remove("hidden");
  document.querySelector("#started").classList.add("hidden");
  document.querySelector("#type").classList.add("hidden");
  document.querySelector(".theGamerTwo").textContent =
    document.querySelector("#gamertag").value;

  document.querySelector("#games_but").addEventListener("click", formTypes);
  document.querySelector("#games_back").addEventListener("click", formStart);
  //document.querySelector("#games_back").addEventListener("click", formTypes);
}

function formTypes() {
  console.log("types");

  document.querySelector("#games_but").removeEventListener("click", formTypes);

  document.querySelector("#games").classList.add("hidden");
  document.querySelector("#type").classList.remove("hidden");
  document.querySelector("#area").classList.add("hidden");
  document.querySelector(".theGamerThree").textContent =
    document.querySelector("#gamertag").value;

  document.querySelector("#type_but").addEventListener("click", formArea);
  document.querySelector("#type_back").addEventListener("click", formGames);
  //document.querySelector("#type_back").addEventListener("click", formArea);
}

function formArea() {
  console.log("area");

  document.querySelector("#type_back").removeEventListener("click", formArea);

  document.querySelector("#type").classList.add("hidden");
  document.querySelector("#area").classList.remove("hidden");

  document.querySelector("#area_but").addEventListener("click", formPassword);
  document.querySelector("#area_back").addEventListener("click", formTypes);
  //document.querySelector("#area_back").addEventListener("click", formPassword);
}

function formPassword() {
  console.log("password");

  document
    .querySelector("#area_back")
    .removeEventListener("click", formPassword);

  document.querySelector("#area").classList.add("hidden");
  document.querySelector("#password").classList.remove("hidden");

  document.querySelector("#password_but").addEventListener("click", formEnd);
  document.querySelector("#password_back").addEventListener("click", formStart);
}

function formEnd() {
  console.log("end");

  document.querySelector("#password_but").removeEventListener("click", formEnd);

  document.querySelector("#password").classList.add("hidden");
  document.querySelector("#end").classList.remove("hidden");
  document.querySelector(".theGamerFour").textContent =
    document.querySelector("#gamertag").value;

  document.querySelector("#first_button").addEventListener("click", formStart);
}
