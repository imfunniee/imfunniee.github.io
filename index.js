var circle = new ProgressBar.Circle('#outer1', {
color: '#282828',
strokeWidth: 8,
easing: 'easeInOut',
duration: 2000,
});
var circle2 = new ProgressBar.Circle('#outer2', {
color: '#282828',
strokeWidth: 8,
easing: 'easeInOut',
duration: 2000,
});
var circle3 = new ProgressBar.Circle('#outer3', {
color: '#282828',
strokeWidth: 8,
easing: 'easeInOut',
duration: 2000,
});
var circle4 = new ProgressBar.Circle('#outer4', {
color: '#282828',
strokeWidth: 8,
easing: 'easeInOut',
duration: 2000,
});
var circle5 = new ProgressBar.Circle('#outer5', {
color: '#282828',
strokeWidth: 8,
easing: 'easeInOut',
duration: 2000,
});
$(window).scroll(function() {
var hT = $('#tagline').offset().top,
hH = $('#tagline').outerHeight(),
wH = $(window).height(),
wS = $(this).scrollTop();
if (wS > (hT+hH-wH) && (hT < wS) && (wS+wH > hT+hH)){
circle.animate(0.94);  
circle2.animate(0.73); 
circle3.animate(0.60);  
circle4.animate(0.70); 
circle5.animate(0.50);
}
});
$(document).ready(function(){
$("a").on('click', function(event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('body,html').animate({
    scrollTop: $(hash).offset().top
    }, 1500, function(){
    window.location.hash = hash;
   });
   } 
  });
});
function showdes(){
    $("#web").css("display","none");
    $("#web-btn").css("border-bottom","4px solid transparent");
    $("#design").css("display","inherit");
    $("#des-btn").css("border-bottom","4px solid #000");
}
function showweb(){
    $("#web").css("display","inherit");
    $("#design").css("display","none");
    $("#web-btn").css("border-bottom","4px solid #000");
    $("#des-btn").css("border-bottom","4px solid transparent");
}

window.onscroll = function() {myFunction()};

function myFunction() {
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.style.backgroundSize = "100% 100%";
    }else{
        document.body.style.backgroundSize = "140% 140%";
    }
}