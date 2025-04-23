import * as Widgets from "../Widgets/js/widgets.js";
import * as Helper from "../../js/helper.js";

// ---- LOAD ----
document.addEventListener("DOMContentLoaded", () => {
    loadWidgetsStyle();
    loadWidgets();
});
    function loadWidgets()
    {
        loadCalendar();
        loadWeather();
        loadNews();
    /*
        loadTODO();
        */
    }

function loadWidgetsStyle() {
    Helper.loadCSS("/Widgets/css/widgets.css");
}

 function loadWeather()
 {
     //console.log("loadWEATHER");
     var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
             console.log("fülle div");
              document.getElementById("WEATHER").innerHTML = this.responseText;
              Widgets.loadWeatherJSON();

             }
           };
           //xhttp.open("GET", "weatherHP.html", true);
           xhttp.open("GET", "/WIDGETS/weatherWidget.html", true);
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
                 Widgets.loadNewsJSON();
                }
              };
              //xhttp.open("GET", "newsHP.html", true);
              xhttp.open("GET", "/WIDGETS/newsWidget.html", true);
              xhttp.send();
    }

    function loadCalendar()
    {
        console.log("loadCalendar");
                var xhttp = new XMLHttpRequest();
                      xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                        console.log("fülle div");
                         document.getElementById("CALENDAR").innerHTML = this.responseText;
                         Widgets.loadCalendarJSON();
                        }
                      };
                      xhttp.open("GET", "/WIDGETS/calendarWidget.html", true);
                      xhttp.send();
    }



// ---- HELPER ----







