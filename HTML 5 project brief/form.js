let form = document.querySelector("#form");
let returnButton = document.querySelector("#returnButton");
returnButton.addEventListener("click", function (e) {
  window.location.replace("index.html");
});

if (localStorage.getItem("songData")) {
  data = JSON.parse(localStorage.getItem("songData"));
} else {
  data = [];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let newSong = {};

  form.reset();
});
