setTimeout(function(){
document.getElementById("loading").className = "animated fadeOut";
setTimeout(function(){
document.getElementById("loading").style.display = "none";
},1000);
},1400);
function showSearch(){
document.getElementById("back").style.display = "flex";
document.getElementById("back").className = "pulse animated"
document.getElementById("links").style.display = "none";
document.getElementById("content").style.filter = "blur(4px)";
document.getElementById("header").style.filter = "blur(4px)";
}
function hideSearch(){
document.getElementById("back").className = "animated fadeOut";    
document.getElementById("links").style.display = "inline";
document.getElementById("content").style.filter = "none";
document.getElementById("header").style.filter = "none";
setTimeout(function(){
document.getElementById("back").style.display = "none";
document.getElementById("back").className = "";
},800);
document.getElementById("search").value = "";
document.getElementById("results").innerHTML = "";
}
function hideThis(){
alert("first allow camera \nthen move your hand left to show search box and right to hide it.\nnote : your hand should be infront of the camera (15 or 20 cm)");
document.getElementById("sta").style.display = "none";
document.getElementById("st").style.display = "inline-block";
document.getElementById("st").className = "animated fadeIn";
}
function unhideThis(){
document.getElementById("st").style.display = "none";
document.getElementById("sta").style.display = "inline-block";
document.getElementById("sta").className = "animated fadeIn";
}
function convertCode(text){
switch(text){
case "32":
text = "wi-day-sunny";
break;
case "33":
text = "wi-night-clear";
break;
case "34":
text = "wi-day-sunny"
break;
case "0":
text = "wi-tornado";
break;
case "3":
text = "wi-hurricane";
break;
case "4":
text = "wi-thunderstorm";
break;
case "5":
text = "wi-rain-mix";
break;
case "6": case "7": 
text = "wi-sleet";
break;
case "12": case "11":
text = "wi-showers";
break;
case "13": case "14": case "15": case "16":
text = "wi-snow";
break;
case "17":
text = "wi-hail";
break;
case "18":
text = "wi-sleet";
break;
case "19":
text = "wi-dust";
break;
case "20":
text = "wi-fog";
break;
case "21":
text = "wi-day-haze";
break;
case "22":
text = "wi-smoke";
break;
case "23":
text = "wi-strong-wind";
break;
case "24":
text = "wi-windy";
break;
case "25":
text = "wi-snowflake-cold";
break;
case "26": case "44":
text = "wi-cloudy";
break;
case "27":
text = "wi-night-cloudy";
break;
case "29":
text = "wi-night-partly-cloudy";
break;
case "28":
text = "wi-day-cloudy";
break;
case "30":
text = "wi-day-sunny-overcast";
break;
case "31":
text = "wi-night-clear"
break;
case "35":
text = "wi-rain-mix";
break;
case "36":
text = "wi-hot";
break;
case "37": case "47": case "45": case "39": case "38":
text = "wi-thunderstorm";
break;
case "40":
text = "wi-showers";
break;
case "41": case "43":
text = "wi-snow";
break;
case "42": case "46":
text = "wi-snow-wind";
break;
default:
text = "wi-na";
}
return text;
}