let form = document.querySelector("#form");
let songTitleInput=document.querySelector("#songName");
let artistInput=document.querySelector("#artist");
let durationInput=document.querySelector("#duration");
let genreInput=document.querySelector("#genre");
let imageInput=document.querySelector("#image");

let returnButton = document.querySelector("#returnButton");
returnButton.addEventListener("click", function(e) {
e.preventDefault();
  window.location.replace("index.html");
  console.log("clicked")
});

if (localStorage.getItem("songData")) {
  data = JSON.parse(localStorage.getItem("songData"));
} else {
  data = [];
}

form.addEventListener("submit", function (e) {
  let image="images/meowl.jpeg";
  e.preventDefault();
  if(imageInput.value!=""){
image=imageInput.value;
  }
  let newSong = {
"name": songTitleInput.value,
"artist": artistInput.value,
"duration": durationInput.value,
"genre": genreInput.value,
"songImg": image,
"songFile": "",
"cardColor": "#FFFFFF",
"textColor": "#000000"
  };
data.push(newSong);
localStorage.setItem("songData",JSON.stringify(data))
  form.reset();
});
