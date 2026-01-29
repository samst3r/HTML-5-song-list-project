let form = document.querySelector("#form");
let returnButton = document.querySelector("#returnButton");
returnButton.addEventListener("click", function (e) {
  window.location.replace("index.html");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let;
  let newSong = {};
  form.reset();
});
