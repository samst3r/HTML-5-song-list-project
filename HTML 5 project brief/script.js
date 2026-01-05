var xml = new XMLHttpRequest();

xml.onreadystatechange = function () {
  if (xml.readyState === 4 && xml.status === 200) {
    let list = JSON.parse(xml.responseText);
    console.log(list);
    list.forEach((song) => {
      console.log(song);
      document.querySelector("#test").innerHTML = list[0].name;
    });
  }
};

xml.open("GET", "songs.json", true);
xml.send();
