function changeText() {
    document.getElementById("text").innerText = "Der Text wurde geändert!";

    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         document.getElementById("div1").innerHTML = this.responseText;
        }
      };
      xhttp.open("GET", "cal.html", true);
      xhttp.send();
      console.log("Hallo Kathi");
}

function testdata()
{
//Essen gehen
}
