
var xhttp = new XMLHttpRequest();
function load(){
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText);
          var content = "";
          for (var i in data.days)
          {
            var count_shop = data.days[i].shop.timings.length;
            var count_delivery = data.days[i].delivery.timings.length;
            

            content = content + '<div class="row border-bottom" id="'+i+'"><div class="col-2"><p class="day">'+i+'</p>';
            if( data.days[i].is_same == false)
            {
              content += '<div><input class="btn btn-sm" type="button" onclick="#" value="delivery"> </div></div>';
            }else{
              content += '</div>';
            }


            for (var j = 0 ; j < 2 ; j++)
            {
              // shop open time

              if(data.days[i].shop.availability == true && count_shop > j)
              {
                content += '<div class="col-1"><div class="border border-dark timing" onclick="#">' + data.days[i].shop.timings[j].open + '</div>';
              }else{
                content += '<div class="col-1"><div class="stiming"></div>';
              }
            
              // delivery open time
              if( data.days[i].is_same == false)
              {
                if(data.days[i].delivery.availability == true && count_delivery > j)
                {
                  content += '<div class="border border-dark timing" onclick="#">' + data.days[i].delivery.timings[j].open+ '</div></div>';
                }else{
                  content += '<div class="stiming"></div></div>';
                }
              }else{
                content += '<div class="stiming"></div></div>';
              }


              // shop close time 
              
              if(data.days[i].shop.availability == true && count_shop > j)
              {
                content += '<div class="col-1"><div class="border border-dark timing" onclick="#">' + data.days[i].shop.timings[j].close + '</div>';
              }else{
                content += '<div class="col-1"><div class="stiming"></div>';
              }
            
              // delivery open time
              if( data.days[i].is_same == false)
              {
                if(data.days[i].delivery.availability == true && count_delivery > j)
                {
                  content += '<div class="border border-dark timing" onclick="#">' + data.days[i].delivery.timings[j].close+ '</div></div>';
                }else{
                  content += '<div class="stiming"></div></div>';
                }
              }else{
                content += '<div class="stiming"></div></div>';
              }
            
            }
            
            content += "</div>";
          





          }
          document.getElementById("main-content").innerHTML = content;
      }
  };
}
xhttp.open("GET", "timings.json", true);
xhttp.send();
load();
