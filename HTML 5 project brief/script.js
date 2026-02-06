if (document.querySelector("#addSongButton")) {
  let addSongButton = document.querySelector("#addSongButton");
  addSongButton.addEventListener("click", function () {
    window.location.replace("form.html");
  });
}
var filter;
var data = [];
var filteredData = [];
let filterTypeInput = document.querySelector("#filterType");
let filterInput = document.querySelector("#filterInput");

if (localStorage.getItem("songData")) {
  data = JSON.parse(localStorage.getItem("songData"));

  if (document.querySelector("#songlist")) {
    loadCards(data);
  }
} else {
  var xml = new XMLHttpRequest();

  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status === 200) {
      data = JSON.parse(xml.responseText);
      localStorage.setItem("songData", JSON.stringify(data));
      if (document.querySelector("#songlist")) {
        loadCards(data);
      }
    }
  };

  xml.open("GET", "songs.json", true);
  xml.send();
}

function loadCards(songs, filteredSongs) {
  document.querySelector("#songlist").innerHTML = "";
  if (!filteredSongs == []) {
    songs = filteredSongs;
  }
  songs.forEach((song) => {
    console.log(song);
    let card = document.createElement("div");
    card.id = "songCard";
    card.style.backgroundColor = song.cardColor;
    console.log(song.name + ":" + song.duration);
    let seconds = song.duration % 60;
    seconds = String(seconds).padStart(2, "0");
    console.log(song.name + " seconds:" + seconds);
    let minutes = (song.duration - (song.duration % 60)) / 60;
    console.log(song.name + " minutes:" + minutes);
    //start of innerHTML data
    let textData =
      "<img id='img' src='" +
      song.songImg +
      "' /><div id='songInfo' style='color:" +
      song.textColor +
      "'><p id='songName'>" +
      song.name +
      "</p><div id='songDetails'><p id='artistName'>Artist: " +
      song.artist +
      "</p><p id='genre'>Genre: " +
      song.genre +
      "</p><p id='duration'>Duration: " +
      minutes +
      ":" +
      seconds +
      "</p></div><svgid='play'xmlns='http://www.w3.org/2000/svg'width='2em'height='2em'viewBox='0 0 24 24'id='_24x24_On_Light_Play'data-name='24x24/On Light/Play'><rect id='view-box' width='24' height='24' fill='none' /><pathid='Shape'd='M0,9.75A9.75,9.75,0,1,1,9.75,19.5,9.761,9.761,0,0,1,0,9.75Zm1.5,0A8.25,8.25,0,1,0,9.75,1.5,8.259,8.259,0,0,0,1.5,9.75Zm5.75-3.8,7,3.8-7,3.8Z'transform='translate(2.25 2.25)'fill='#141124'/></svg></div>";
    card.innerHTML = textData;
    console.log(textData);
    console.log(card.innerHTML);
    document.querySelector("#songlist").appendChild(card);
  });
}
//domo

filterInput.addEventListener("input", function () {
  let filter = filterInput.value;
  let filterType = filterTypeInput.value;
  console.log(filter);
  console.log(filterType);
  filteredData = [];
  if (filterType === "name") {
    filteredData = data.filter((item) => item.name.includes(filter));
    console.log(filteredData);
    loadCards("", filteredData);
  } else if (filterType === "artist") {
    filteredData = data.filter((item) => item.artist.includes(filter));
    console.log(filteredData);
    loadCards("", filteredData);
  } else if (filterType === "genre") {
    filteredData = data.filter((item) => item.genre.includes(filter));
    console.log(filteredData);
    loadCards("", filteredData);
  }
  //FIX capitalized letters not filtering properly
});
