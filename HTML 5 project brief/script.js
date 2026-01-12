const { createElement } = require("react");

var xml = new XMLHttpRequest();

xml.onreadystatechange = function () {
  if (xml.readyState === 4 && xml.status === 200) {
    let list = JSON.parse(xml.responseText);
    console.log(list);
    list.forEach((song) => {
      console.log(song);
      let card = documdent.createElement("div");
      card.classList.add("songCard");
      let textData = "";
    });
  }
};

xml.open("GET", "songs.json", true);
xml.send();
