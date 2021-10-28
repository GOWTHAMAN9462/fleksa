var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  console.log
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var content = "";
        for (var i in data.days)
        {
          content = content + '<div class="row border-bottom" id="'+i+'"><div class="col-1"><p class="text-center">'+i+'</p>';
          if(data.days.i.is_same == false)
          {
            content += '<div><input type="button" onclick="#" </div></div>';
          };
          /*if(data.days.i.shop.availability = true)
          {
            content += '<div><input type="button" onclick="#" </div></div>'
          }*/
        };
    };
    console.log(content);
};
xhttp.open("GET", "timings.json", true);
xhttp.send();
