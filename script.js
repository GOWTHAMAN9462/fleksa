var data;
var content = "";


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      
    data = JSON.parse(this.responseText);
    load();
  }
}

xhttp.open("GET", "timings.json", true);
xhttp.send();

function load(){
  console.log(data.days);
  content = "";
  for (var i in data.days)
  {
    var count_shop = data.days[i].shop.timings.length;
    var count_delivery = data.days[i].delivery.timings.length;
    
    
    
    // day name

    content += '<div class="row border-bottom " id="'+i+'"><div class="col-2"><p class="day">'+i+'</p>';

    // same or different status

    if( data.days[i].is_same == true)
    {
      content += '<div>Same</div><div><input class="btn btn-sm s_d" type="button" onclick="diff('+"'"+i+"'"+')" value="C"> </div></div>';
    }else{
      content += '<div>Different</div><div><input class="btn btn-sm s_d" type="button" onclick="same('+"'"+i+"'"+')" value="C"></div> </div>';
    }


    // shop timings starts


    content += '<div class="col">';
    for (var j = 0 ; j < 2 ; j++)
    {
      // shop open time

      if(data.days[i].shop.availability == true && count_shop > j)
      {
        content += '<div class="row"><span class="border border-dark timing" onclick="TimeEditShop('+"'"+i+"'"+','+j+','+"'open'"+')" id="shopopen'+i+j+'">' + data.days[i].shop.timings[j].open + '</span>';
      }else{
        content += '<div class="row"><span class="stiming"></span>';
      }

      // shop close time 
      
      if(data.days[i].shop.availability == true && count_shop > j)
      {
        content += '<span class="border border-dark timing" onclick="TimeEditShop('+"'"+i+"'"+','+j+','+"'close'"+')" id="shopclose'+i+j+'">' + data.days[i].shop.timings[j].close + '</span></div>';
      }else{
        content += '<span class="stiming"></span></div>';
      }

      // empty time

      if(data.days[i].shop.availability == false)
      {
        content += '<div class="row"><span class="stiming"></span></div>';
      }
    }

    // shop timing ends 

    // delivery timing starts

    content += '</div><div class="col">';

    for (var j = 0 ; j < 2 ; j++)
    {
      // delivery open time
      if( data.days[i].is_same == false)
      {
        if(data.days[i].delivery.availability == true && count_delivery > j)
        {
          content += '<div class="row"><span class="border border-dark timing" onclick="TimeEditDelivery('+"'"+i+"'"+','+j+','+"'close'"+')" id="deliveryopen'+i+j+'">' + data.days[i].delivery.timings[j].open+ '</span>';
        }else{
          content += '<div class="row"><span class="stiming"></span>';
        }
      }else{
        content += '<div class="row"><span class="stiming"></span>';
      }
    
      // delivery close time

      if( data.days[i].is_same == false)
      {
        if(data.days[i].delivery.availability == true && count_delivery > j)
        {
          content += '<span class="border border-dark timing" onclick="TimeEditDelivery('+"'"+i+"'"+','+j+','+"'close'"+')" id="deliveryclose'+i+j+'">' + data.days[i].delivery.timings[j].close+ '</span></div>';
        }else{
          content += '<span class="stiming"></span></div>';
        }
      }else{
        content += '<span class="stiming"></span></div>';
      }
    
    }
    content += '</div>';

    // delivery timing ends

    // break buttons

    if(data.days[i].shop.availability)
    {
      if(count_shop == 0)
      {
        
        content += '<div class="col-1"><input class="btn-sm btn-shp" type ="button" onclick="addbreak('+"'"+i+"',"+count_shop+')" value="+Break"></div>';
        
      }else if( count_shop == 1){
        content += '<div class="col-1"><div><input class="btn-sm btn-shp" type ="button" onclick="addbreak('+"'"+i+"','"+count_shop+"'"+')" value="+Break"></div>';
        content += '<div><input class="btn-sm btn-shp" type ="button" onclick="delbreak('+"'"+i+"',"+count_shop+')" value="-Break"></div></div>';
      }
      else{
        content += '<div class="col-1"><input class="btn-sm btn-shp" type ="button" onclick="delbreak('+"'"+i+"',"+count_shop+')" value="-Break"></div>';
      }
    }else{
      content += '<div class="col-1"></div>';
    }
    
    // delivery buttons
    if(data.days[i].is_same == false)
    {
      if(data.days[i].delivery.availability)
      {
        if(count_delivery == 0)
        {
          content += '<div class="col-1"><input class="btn-sm btn-del" type ="button" onclick="adddelivery('+"'"+i+"',"+count_delivery+')" value="+Delivery"></div>';
        }else if(count_delivery == 1)
        {
          content += '<div class="col-1"><input class="btn-sm btn-del" type ="button" onclick="adddelivery('+"'"+i+"',"+count_delivery+')" value="+Delivery"><input class="btn-sm" type ="button" onclick="deldelivery('+"'"+i+"',"+count_delivery+')" value="-Delivery"></div>';
        }
        else{
          content += '<div class="col-1"><input class="btn-sm btn-del" type ="button" onclick="deldelivery('+"'"+i+"',"+count_delivery+')" value="-Delivery"></div>';
        }
      }else{
        content += '<div class="col-1"></div>';
      }
    }else{
      content += '<div class="col-1"></div>';
    }

    // switchs for shop and delivery availability

    if(data.days[i].is_same)
    {
      if(data.days[i].shop.availability && data.days[i].delivery.availability)
      {
        content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchb('+"'"+i+"'"+')"></div></div>';
      }else{
        content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchb('+"'"+i+"'"+')"></div></div>';
      }

    }else{

      if(data.days[i].shop.availability)
      {
        content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchs('+"'"+i+"'"+')"></div>';
      }else{
        content += '<div class="col-1"><div class="form-check form-switch text-center"><input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchs('+"'"+i+"'"+')"></div>';
      }

      
      if(data.days[i].delivery.availability)
      {
        content += '<div class="form-check form-switch text-center"> <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" checked onclick="switchd('+"'"+i+"'"+')"> </div></div>';
      }else{
        content += '<div class="form-check form-switch text-center"> <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault switchd'+i+'" onclick="switchd('+"'"+i+"'"+')"> </div></div>';
      }
    }
    
    content += "</div>";
  }
  document.getElementById("main-content").innerHTML = content;
};


// switch key function for delivery while is_same is false

function switchd(day){
  if(data.days[day].delivery.availability){
    data.days[day].delivery.availability = false;
  }else{
    data.days[day].delivery.availability = true;
  }
  load();
}

// switch key function for both while is_same is true

function switchb(day){
  if(data.days[day].delivery.availability && data.days[day].shop.availability){
    data.days[day].delivery.availability = false;
    data.days[day].shop.availability = false;
  }else{
    data.days[day].shop.availability = true;
    data.days[day].delivery.availability = true;
  }
  load();
}

// switch key function for shop while is_same is false

function switchs(day){

  if(data.days[day].shop.availability){
    data.days[day].shop.availability = false;
  }else{
    data.days[day].shop.availability = true;
  }
  load();
}

// changing different to same

function diff(day){
  data.days[day].is_same = false;
  load();
}

// changing same to different

function same(day){
  data.days[day].is_same = true;
  load();
}

// deleting shop section

function delbreak(day,count){
  data.days[day].shop.timings.splice(count-1,1);
  load();
}

// adding shop section

function addbreak(day,count){
  data.days[day].shop.timings.splice(count,1,{'close':'edit','open':'edit'});
  load();
} 

// adding delivery section

function adddelivery(day,count){
  data.days[day].delivery.timings.splice(count,1,{'close':'edit','open':'edit'});
  load();
}

// deleting the delivery section 

function deldelivery(day,count){
  data.days[day].delivery.timings.splice(count-1,1);
  load();
}

// updating data while clicking enter

document.onkeydown = function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.querySelectorAll("span[contenteditable]").forEach(function(time){
      time.removeAttribute("contenteditable");
    save();
    })
  }
}

//function to edit timing in shop section

function TimeEditShop(day,count,status){
  document.getElementById("shop"+status+day+count).setAttribute('contenteditable', true)
  document.getElementById("shop"+status+day+count).focus()
}

// function to edit timing in delivery section

function TimeEditDelivery(day,count,status){
  document.getElementById("delivery"+status+day+count).setAttribute('contenteditable', true)
  document.getElementById("delivery"+status+day+count).focus()
}


//saving the updated data to the javascript object

function save(){
  for(i in data.days){
    var count_shop = data.days[i].shop.timings.length;
    var count_delivery = data.days[i].delivery.timings.length;

    for (var j = 0 ; j < 2 ; j++)
    {

      if(j < count_delivery){
        data.days[i].delivery.timings[j]['open'] = document.getElementById("shopopen"+i+j).innerText;
        data.days[i].delivery.timings[j]['close'] = document.getElementById("shopclose"+i+j).innerText;
      }

      if( j < count_shop){
        data.days[i].shop.timings[j]['open'] = document.getElementById("shopopen"+i+j).innerText;
        data.days[i].shop.timings[j]['close'] = document.getElementById("shopclose"+i+j).innerText;
      }

    }
  }

  load();
}