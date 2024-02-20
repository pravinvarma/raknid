$(document).ready(function(){ 
 

    $('#flkr').val(window.localStorage.getItem('imageTag'));
    handleButtonClick();
/* var rgb1 = [{r:94,g:127,b:140},{r:242,g:234,b:126}];
var rgb2 = [{r:191,g:160,b:65},{r:242,g:153,b:75}];
var rgb3 = [{r:104,g:131,b:184},{r:234,g:184,b:230}];
var color=[rgb1,rgb2,rgb3]; */
  $('#save').attr('disabled');
$('#name').change(function(){
    if($(this).val().length < 30){
        $('#save').prop('disabled', false);
    } else {
        $('#save').prop('disabled', true);
    }
})



function jsonFlickrFeed(json) {
  console.log(json);
  
  $.each(json.items, function(i, item) {
    $("body").css("background", item.media.m);
  });
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function handleButtonClick() {

  $.ajax({
    url: 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
    dataType: 'jsonp',
    data: { "tags": window.localStorage.getItem('imageTag') ? window.localStorage.getItem('imageTag') : 'northern lights' , "format": "json" },
    success: function(result) {window.localStorage.setItem('author', result.items[0].author);   window.localStorage.setItem('backgroundImage', result.items[getRandomInt(0, result.items.length-1)].media.m);},
    error: function(){console.log("error")}
  });
}

    
$('#fav').click(function(e){
    var color =[];   
if(window.localStorage.getItem('color')){    
color = JSON.parse(window.localStorage.getItem('color'));  
    }
try{
var innercolor =[];    
innercolor.push(convertHex($('#colorwheel1').val()))
innercolor.push(convertHex($('#colorwheel2').val()));
color.push(innercolor);    
}
    catch(e){console.log(e)}
    window.localStorage.setItem('color',JSON.stringify(color)); 
    
    locolor = jQuery.parseJSON(window.localStorage.getItem('color'));  
var txt='';  
    console.log(typeof locolor)
if(locolor){    
$.each(locolor,function(key,value){    
   // var value = JSON.parse(value);
    txt+='<a href="" data-item='+key+' class="sample"><div style=float:left>';
$.each(locolor[key],function(key,value){
    txt+='<div style=width:40px;height:40px;margin-right:2px;background:rgb('+value.r+','+value.g+','+value.b+')'+'></div>';
});  
    txt+='</div></a>';
});    
    }
    
    $('#pallette').html('').append(txt);   
    e.preventDefault();
});    
    
locolor = jQuery.parseJSON(window.localStorage.getItem('color'));  
var txt='';  
    console.log(typeof locolor)
if(locolor){    
$.each(locolor,function(key,value){    
   // var value = JSON.parse(value);
    txt+='<a href="" data-item='+key+' class="sample"><div style=float:left;margin:5px 3px>';
$.each(locolor[key],function(key,value){
    txt+='<div style=border-radius:1000px;width:40px;height:40px;margin-right:2px;background:rgb('+value.r+','+value.g+','+value.b+')'+'></div>';
});  
    txt+='</div></a>';
});    
    }
  
    $('body').on('click','.sample',function(e){
          var arr=[];
        $.each(locolor[$(this).attr('data-item')],function(key,val){
           var obj = 'rgb('+val.r+','+val.g+','+val.b+')';
            arr.push(rgb2hex(obj));
            console.log(arr);
       
        });
         window.localStorage.setItem('bg1',arr[0]);
      window.localStorage.setItem('bg2',arr[1]);
        console.log(color[$(this).attr('data-item')]);
        e.preventDefault();
    });
    
    function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);
    var obj = new Object();
    obj['r']  = r;
    obj['g']  = g;
    obj['b']  = b;        
    //result = '{r:'+r+',g:'+g+',b:'+b+'}';
    return obj;
}

    
    function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

$('#pallette').append(txt);    
$('#colorwheel1').val(window.localStorage.getItem('bg1'));
$('#colorwheel2').val(window.localStorage.getItem('bg2'));
$('#name').val(window.localStorage.getItem('name',name));
  $('#save').click(function(){
       window.localStorage.setItem('imageTag',$('#flkr').val());
     handleButtonClick();
      if($('#name').val().length > 30){
        return
    } 

      var color1 = $('#colorwheel1').val();
      var color2 = $('#colorwheel2').val();
      var name = $('#name').val();
      window.localStorage.setItem('bg1',color1);
      window.localStorage.setItem('bg2',color2);
      window.localStorage.setItem('name',name);
      alert('Settings are saved!');
  })

})
