var data;
var content = "";


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      
    data = JSON.parse(this.responseText);
    load();
    switchb("monday");



    function load(){
              content = ""
              for (var i in data.days)
              {
                var count_shop = data.days[i].shop.timings.length;
                var count_delivery = data.days[i].delivery.timings.length;
                

                content = content + '<div class="row border-bottom" id="'+i+'"><div class="col-1"><p class="day">'+i+'</p>';
                if( data.days[i].is_same == false)
                {
                  content += '<div><input class="btn btn-sm" type="button" onclick="simple()" value="delivery"> </div></div>';
                }else{
                  content += '</div>';
                }


                for (var j = 0 ; j < 2 ; j++)
                {
                  // shop open time

                  if(data.days[i].shop.availability == true && count_shop > j)
                  {
                    content += '<div class="col-2"><div class="border border-dark timing" onclick="time_editso('+i+','+j+')" id="shopopen'+i+j+'">' + data.days[i].shop.timings[j].open + '</div>';
                  }else{
                    content += '<div class="col-2"><div class="stiming"></div>';
                  }
                
                  // delivery open time
                  if( data.days[i].is_same == false)
                  {
                    if(data.days[i].delivery.availability == true && count_delivery > j)
                    {
                      content += '<div class="border border-dark timing" onclick="time_editdo('+i+','+j+')" id="deliveryopen'+i+j+'">' + data.days[i].delivery.timings[j].open+ '</div></div>';
                    }else{
                      content += '<div class="stiming"></div></div>';
                    }
                  }else{
                    content += '<div class="stiming"></div></div>';
                  }


                  // shop close time 
                  
                  if(data.days[i].shop.availability == true && count_shop > j)
                  {
                    content += '<div class="col-2"><div class="border border-dark timing" onclick="time_editsc('+i+','+j+')" id="shopclose'+i+j+'">' + data.days[i].shop.timings[j].close + '</div>';
                  }else{
                    content += '<div class="col-2"><div class="stiming"></div>';
                  }
                
                  // delivery close time

                  if( data.days[i].is_same == false)
                  {
                    if(data.days[i].delivery.availability == true && count_delivery > j)
                    {
                      content += '<div class="border border-dark timing" onclick="time_editdc('+i+','+j+')" id="deliveryclose'+i+j+'">' + data.days[i].delivery.timings[j].close+ '</div></div>';
                    }else{
                      content += '<div class="stiming"></div></div>';
                    }
                  }else{
                    content += '<div class="stiming"></div></div>';
                  }
                
                }
                


                // break buttons

                if(data.days[i].shop.availability)
                {
                  if(count_shop < 2)
                  {
                    if(data.days[i].is_same)
                    {
                      content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="addbreak('+i+')" value="+Break"></div>';

                    }
                    else{
                      content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="addbreak('+i+')" value="+Break"></div>';
                    }
                  }
                  else{
                    if(data.days[i].is_same)
                    {
                      content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="delbreak('+i+')" value="-Break"></div>';

                    }
                    else{
                      content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="delbreak('+i+')" value="-Break"></div>';
                    }
                  }
                }else{
                  content += '<div class="col-1"></div>';
                }
                
                // delivery buttons

                if(data.days[i].delivery.availability)
                {
                  if(count_delivery < 2)
                  {
                    btn_delivery_plus(i);
                  }
                  else{
                    btn_delivery_minus(i);
                  }
                }else{
                  if(count_delivery < 2)
                  {
                    btn_delivery_plus(i);
                  }
                  else{
                    btn_delivery_minus(i);
                  }
                }

                // switchs

                if(data.days[i].is_same)
                {
                  if(data.days[i].shop.availability && data.days[i].delivery.availability)
                  {
                    content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchb('+i+')"></div></div>';
                  }else{
                    content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchb('+i+')"></div></div>';
                  }

                }else{

                  if(data.days[i].shop.availability)
                  {
                    content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchs('+i+')"></div>';
                  }else{
                    content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchs('+i+')"></div>';
                  }

                  
                  if(data.days[i].delivery.availability)
                  {
                    content += '<div class="form-check form-switch text-center"> <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchd('+i+')"> </div></div>';
                  }else{
                    content += '<div class="form-check form-switch text-center"> <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchd('+i+')"> </div></div>';
                  }
                }
                
                content += "</div>";
              }
              document.getElementById("main-content").innerHTML = content;
      };


    function switchd(day){
      console.log(data);
      if(data.days[day].delivery.availability){
        data.days[day].delivery.availability = false;
      }else{
        data.days[day].shop.availability = true;
      }
      load();
    }

    function switchb(day){
      console.log(day);
    }


    function switchs(day){
      console.log(data);
      if(data.days[day].shop.availability){
        console.log(data.days[day].shop.availability);
      }else{
        console.log(data.days[day].shop.availability);
      }
      load();
    }

    // delivery btn code

    function btn_delivery_minus(day){
      if(data.days[day].is_same)
      {
        content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="simple()" value="-Delivery"></div>';

      }
      else{
        content += '<div class="col-1"><div class="sbtn"></div><input class="btn-sm" type ="button" onclick="simple()" value="-Delivery"></div>';
      }
    }


    // delivery btn code
    function btn_delivery_plus(day){
      if(data.days[day].is_same)
      {
        content += '<div class="col-1"><input class="btn-sm" type ="button" onclick="simple()" value="+Delivery"></div>';

      }
      else{
        content += '<div class="col-1"><div class="sbtn"></div><input class="btn-sm" type ="button" onclick="simple()" value="+Delivery"></div>';
      }
    }
  }
}

xhttp.open("GET", "timings.json", true);
xhttp.send();