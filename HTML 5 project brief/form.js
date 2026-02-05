let form = document.querySelector("#form");
let songTitleInput = document.querySelector("#songName");
let artistInput = document.querySelector("#artist");
let durationInput = document.querySelector("#duration");
let genreInput = document.querySelector("#genre");
let imageInput = document.querySelector("#image");
let cardColorInput = document.querySelector("#cardColor");
let textColorInput = document.querySelector("#textColor");
let contrastDisplay = document.querySelector("#contrastDisplay");

let contrast = 21;

let returnButton = document.querySelector("#returnButton");
returnButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.assign("index.html");
  console.log("clicked");
});

if (localStorage.getItem("songData")) {
  data = JSON.parse(localStorage.getItem("songData"));
} else {
  data = [];
}

form.addEventListener("submit", function (e) {
  let image = "images/meowl.jpeg";
  e.preventDefault();
  if (imageInput.value != "") {
    image = imageInput.value;
  }
  if (contrast >= 7) {
    let newSong = {
      name: songTitleInput.value,
      artist: artistInput.value,
      duration: durationInput.value,
      genre: genreInput.value,
      songImg: image,
      songFile: "",
      cardColor: cardColorInput.value,
      textColor: textColorInput.value,
    };
    data.push(newSong);
    localStorage.setItem("songData", JSON.stringify(data));
    form.reset();
    window.location.assign("index.html");
  } else {
    //put a popup or something stating the contrast must be fixed
  }
});

cardColorInput.addEventListener("input", function () {
  checkForAccessibility();
});
textColorInput.addEventListener("input", function () {
  checkForAccessibility();
});

function checkForAccessibility() {
  checkColors(textColorInput.value, cardColorInput.value);
  contrast = colorData.contrast;
  console.log(contrast);
  if (contrast >= 7) {
    contrastDisplay.innerHTML = "Contrast is Acceptable ✅";
  } else {
    contrastDisplay.innerHTML = "Contrast is not sufficient ❌";
  }
}
