export function moveLabel(event) {
  event.currentTarget.nextElementSibling.classList.remove("theTags");
  event.currentTarget.nextElementSibling.classList.add("tagMove");
  /*document.querySelectorAll("input").forEach((e) => {
      e.removeEventListener("focus", moveLabel);
      e.addEventListener("blur", moveBackLabel);
    });*/
}

/*function moveBackLabel(event) {
    event.currentTarget.nextElementSibling.classList.add("theTags");
    event.currentTarget.nextElementSibling.classList.remove("tagMove");
    document.querySelectorAll("input").forEach((e) => {
      e.addEventListener("focus", moveLabel);
      e.removeEventListener("blur", moveBackLabel);
    });
  }*/

export function removeGamertag() {
  document.querySelector("#gamertag").value = "";
}
