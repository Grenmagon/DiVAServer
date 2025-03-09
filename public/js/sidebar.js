 function loadWeather()
 {
     //console.log("loadWEATHER");
     var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
             console.log("fülle div");
              document.getElementById("WEATHER").innerHTML = this.responseText;
             }
           };
           xhttp.open("GET", "weatherHP.html", true);
           xhttp.send();
 }

  function loadTODO()
  {
      //console.log("loadTODO");
      var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
              console.log("fülle div");
               document.getElementById("TODO").innerHTML = this.responseText;
              }
            };
            xhttp.open("GET", "todoHP.html", true);
            xhttp.send();
  }

    function loadNews()
    {
        console.log("loadNews");
        var xhttp = new XMLHttpRequest();
              xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                console.log("fülle div");
                 document.getElementById("NEWS").innerHTML = this.responseText;
                }
              };
              xhttp.open("GET", "newsHP.html", true);
              xhttp.send();
    }






