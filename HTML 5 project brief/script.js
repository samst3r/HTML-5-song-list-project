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

/*
let sortAZButton=document.querySelector("#sortAZ");
let sortZAButton=document.querySelector("#sortZA");

*/
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
filterInput.addEventListener("input", function () {
  filterList();
});
filterTypeInput.addEventListener("change", function () {
  filterList();
});
/*
sortAZButton.addEventListener("click",function(){
  sort("forward");
});
sortAZButton.addEventListener("click",function(){
 sort("reverse");
});
*/
function loadCards(songs, filteredSongs) {
  document.querySelector("#songlist").innerHTML = "";
  if (!filteredSongs == []) {
    songs = filteredSongs;
  }
  songs.forEach((song) => {
    console.log(song);
    let card = document.createElement("div");
    card.className = "songCard";
    card.style.backgroundColor = song.cardColor;
    console.log(song.name + ":" + song.duration);
    let seconds = song.duration % 60;
    seconds = String(seconds).padStart(2, "0");
    console.log(song.name + " seconds:" + seconds);
    let minutes = (song.duration - (song.duration % 60)) / 60;
    console.log(song.name + " minutes:" + minutes);
    //start of innerHTML data
    let textData =
      "<img class='songImg' src='" +
      song.songImg +
      "' /><div class='songInfo' style='color:" +
      song.textColor +
      "'><p class='songName'>" +
      song.name +
      "</p><div class='songDetails'><p class='artistName'>Artist: " +
      song.artist +
      "</p><p class='genre'>Genre: " +
      song.genre +
      "</p><p class='duration'>Duration: " +
      minutes +
      ":" +
      seconds +
      "</p></div></div>";
    card.innerHTML = textData;
    console.log(textData);
    console.log(card.innerHTML);
    document.querySelector("#songlist").appendChild(card);
  });
}
//domo

function filterList() {
  let filter = filterInput.value.toLowerCase();
  let filterType = filterTypeInput.value;
  console.log(filter);
  console.log(filterType);
  filteredData = [];
  if (filterType === "name") {
    filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(filter)
    );
    console.log(filteredData);
    loadCards("", filteredData);
  } else if (filterType === "artist") {
    filteredData = data.filter((item) =>
      item.artist.toLowerCase().includes(filter)
    );
    console.log(filteredData);
    loadCards("", filteredData);
  } else if (filterType === "genre") {
    filteredData = data.filter((item) =>
      item.genre.toLowerCase().includes(filter)
    );
    console.log(filteredData);
    loadCards("", filteredData);
  }
}

/*
function sort(direction){

if(!filteredData == []&&(direction="forward")){
filteredData.toSorted((a, b) => a.name - a.name);
loadCards("",filteredData);
}
else if(!filteredData == []&&(direction="reverse")){
filteredData.toSorted((a, b) => a.name - a.name);
filteredData.reverse();
loadCards("",filteredData);
}
else if((direction="forward")){
data.toSorted((a, b) => a.name - a.name);
loadCards(data);
}else if((direction="reverse")){
data.toSorted((a, b) => a.name - a.name);
data.reverse();
loadCards(data);
}
}
*/

var sortAZBtn = document.querySelector("#sortAZ");
var sortZABtn = document.querySelector("#sortZA");

// sort click handlers for buttons, add two buttons to your html and give them the same IDs as below
sortAZBtn.addEventListener("click", function () {
  sortByTitle("az");
});
sortZABtn.addEventListener("click", function () {
  sortByTitle("za");
});

// sort function
function sortByTitle(direction) {
  // data should be the variable that stores the list of data, make sure the name matches what you have
  let localdata = data;

  localdata.sort(function (a, b) {
    let filterType = filterTypeInput.value;
    var titleA;
    var titleB;
    if (filterType === "name") {
      titleA = String(a.name).toLowerCase();
      titleB = String(b.name).toLowerCase();
    } else if (filterType === "artist") {
      titleA = String(a.artist).toLowerCase();
      titleB = String(b.artist).toLowerCase();
    } else if (filterType === "genre") {
      titleA = String(a.genre).toLowerCase();
      titleB = String(b.genre).toLowerCase();
    }

    if (titleA < titleB) {
      if (direction == "az") {
        return -1;
      } else {
        return 1;
      }
    }

    if (titleA > titleB) {
      if (direction == "az") {
        return 1;
      } else {
        return -1;
      }
    }

    return 0;
  });

  loadCards("", localdata);
}
