$(document).ready(function() {
    var b,backgroundImg;
   
    if(localStorage.getItem('author')){
        $('#author').text('Picture credit: ' + localStorage.getItem('author'));
    }
//      var geocoder;
// initialize();
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
// } 
// //Get the latitude and the longitude;
// function successFunction(position) {
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;
//     codeLatLng(lat, lng)
// }

// function errorFunction(){
//     alert("Geocoder failed");
// }

//   function initialize() {
//     geocoder = new google.maps.Geocoder();
//   }

//   function codeLatLng(lat, lng) {

//     var latlng = new google.maps.LatLng(lat, lng);
//     geocoder.geocode({'latLng': latlng}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//       console.log(results)
//         if (results[1]) {
//          //formatted address
//          alert(results[0].formatted_address)
//         //find country name
//              for (var i=0; i<results[0].address_components.length; i++) {
//             for (var b=0;b<results[0].address_components[i].types.length;b++) {

//             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
//                 if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
//                     //this is the object you are looking for
//                     city= results[0].address_components[i];
//                     break;
//                 }
//             }
//         }
//         //city data
//         alert(city.short_name + " " + city.long_name)


//         } else {
//           alert("No results found");
//         }
//       } else {
//         alert("Geocoder failed due to: " + status);
//       }
//     });
//   }

    $('#optionsId').click(function(){
       chrome.tabs.create({'url': "/options.html" } ) 
        
    });
    
    
        $('body').on('click', '.close-icon', function() {
            var numId = $(this).attr('id');
            var temp2 = JSON.parse(localStorage.getItem('notedata'));
            var temp3 = temp2.map(function(temp){ return  temp.id;  });
            var temp4 = temp3.indexOf(Number(numId))
            var temp = temp2.splice(temp4, 1);
            localStorage.setItem('notedata', JSON.stringify(temp2));
            $('#chip').html('');
            for (i = 0; i < JSON.parse(localStorage.getItem('notedata')).length; i++) { //then iterate over localstorage items
                var temp = JSON.parse(localStorage.getItem('notedata'));
                $('#chip').append('<div class="note"><div style="width:98%">' + temp[i].note + '</div><i class="close-icon" id=' + temp[i].id + '></i> </div>');

            }

        });

        arr = JSON.parse(localStorage.getItem('notedata'));
        $('#chip').html('');
        if (localStorage.getItem('notedata')) //if data exist in localstorage
        {
            for (i = 0; i < JSON.parse(localStorage.getItem('notedata')).length; i++) { //then iterate over localstorage items
                var temp = JSON.parse(localStorage.getItem('notedata'))[i];
                $('#chip').append('<div class="note"><div style="width:98%">' + temp.note + '</div><i class="close-icon" id=' + temp.id + '></i> </div>');

            }
        }
        var arr = [];
        $('#add').click(function() {
            var i = 0;
            if ($('#rememberInput').val().length < 200) { // if there is input
                 $('#error').text('');
                 $('#add').prop('disabled', true);
                if (JSON.parse(localStorage.getItem('notedata'))) {
                    if (JSON.parse(localStorage.getItem('notedata')).length > 0) // if local storage already exist
                    {
                        var stringnote = localStorage.getItem('notedata'); //get that items and get number of items add one to it
                        var jsonnote = JSON.parse(stringnote);
                        var i = jsonnote[jsonnote.length - 1].id + 1;
                    }
                } else {
                    var i = i + 1;

                }
                var rem = $('#rememberInput').val();
                var item = {
                    'id': i,
                    'note': $('#rememberInput').val()
                };
                arr = JSON.parse(localStorage.getItem('notedata'));
                if(!arr)
                {
                    arr = [];
                }
                arr.push(item);
                
                localStorage.setItem('notedata', JSON.stringify(arr));
            
            $('#chip').html('');
            for (i = 0; i < JSON.parse(localStorage.getItem('notedata')).length; i++) {
                var temp = JSON.parse(localStorage.getItem('notedata'));


                $('#chip').append('<div class="note">' + temp[i].note + '<i class="close-icon" id=' + temp[i].id + '></i> </div>');

            }
            $('#rememberInput').val('');
            } else {
                $('#add').attr('disabled', true);
                $('#error').text('Character limit is 200')
            }
        });

        //exp

        $('#bodyId').css('background', 'linear-gradient(#0080c0,#ff0080)');
        $('#name').text(localStorage.getItem('name'));
        var color1 = localStorage.getItem('bg1');
        var color2 = localStorage.getItem('bg2');
    setTimeout(function(){backgroundImg = localStorage.getItem('backgroundImage');   $('#cover').css('background-image', 'url(' + backgroundImg + ')');},3000);
        
        $('#bodyId').css('background', 'linear-gradient(' + color1 + ',' + color2 + ')');
        window.addEventListener("storage", function() {
            $('#bodyId').css('background', 'linear-gradient(' + localStorage.getItem('bg1') + ',' + localStorage.getItem('bg2') + ')');
            $('#name').text(localStorage.getItem('name'));
        }, false);
     
         $('#cover').css('background-repeat', 'no-repeat');
          $('#cover').css('width', '100%');
           $('#cover').css('background-size','cover');
            $('#cover').height('100vh');
        startTime();
        var val;
        var data;

        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('txt').innerHTML =
                h + ":" + m + ":" + s;
            var t = setTimeout(startTime, 500);
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i
            }; // add zero in front of numbers < 10
            return i;
        }
        navigator.getBattery().then(getBattery);
        setInterval(function(){
             navigator.getBattery().then(getBattery);
        },2000);    
    
        function getBattery(b) {
            val = Math.round(b.level * 100);
            isCharging = b.charging;
            if (isCharging) {
                $('#status').html('Charging');
            }
            $('#battery').html(val);
            b.addEventListener("chargingchange", function(e) {
                isCharging = b.charging;
                if (isCharging) {
                    $('#status').html('Charging');
                } else {
                    $('#status').html('');
                }
            });


            var batteryUpdate = function(e) {
                isCharging = b.charging;
                if (isCharging) {
                    $('#status').html('Charging');
                } else {
                    $('#status').html('');
                }
            };


            data = [{
                value: val,
                color: "#0089EC",
                label: "Label 1"
            }, {
                value: 100 - val,
                color: "#fff",
                label: "Label 2"
            }];
            var options = {
                segmentShowStroke: false,
                animateRotate: false,
                animateScale: false,
                percentageInnerCutout: 80,
                tooltipTemplate: "<%= value %>%"
            }

//            var ctx = document.getElementById("myChart").getContext("2d");
//            var myChart = new Chart(ctx).Doughnut(data, options);
        }




});
 chrome.bookmarks.getRecent(5,function(itemTree){
    itemTree.forEach(function(item){
        processNode(item);
    });
});

function processNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) { processNode(child); });
    }

    // print leaf nodes URLs to console
  //  if(node.url) { console.log(node.url); }
}