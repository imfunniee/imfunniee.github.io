var db = firebase.firestore();
var circle = new ProgressBar.Circle(`#days`, {
    color: "#900C3F",
    trailColor: "transparent",
    trailWidth: 0,
    duration: 1700,
    strokeWidth: 15,
});
var circle2 = new ProgressBar.Circle(`#hours`, {
    color: "#C70039",
    trailColor: "transparent",
    trailWidth: 0,
    duration: 1600,
    strokeWidth: 12,
});
var circle3 = new ProgressBar.Circle(`#minutes`, {
    color: "#FF5733",
    trailColor: "transparent",
    trailWidth: 0,
    duration: 1500,
    strokeWidth: 9,
});
var circle4 = new ProgressBar.Circle(`#seconds`, {
    color: "#FFC30F",
    trailColor: "transparent",
    trailWidth: 0,
    duration: 1400,
    strokeWidth: 6,
});
var countDownDate = new Date("Jan 1, 2020 00:00:00").getTime();
var start = new Date('Jan 1, 2019 00:00:00').getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    $("#time-container").html(`
    <table>
    <tr>
    <td><div id="colorD">${days}</div>Days</td>
    <td><div id="colorH">${hours}</div>Hours</td>
    <td><div id="colorM">${minutes}</div>Minutes</td>
    <td><div id="colorS">${seconds}</div>Seconds</td>
    </tr>
    </table>
    `);

if (distance < 0) {
  clearInterval(x);
  document.getElementById("demo").innerHTML = "EXPIRED";
}

var completed = ((now - start) / (countDownDate - start));
var percentage = 1 - Number(completed);
circle.animate(percentage);

var hourPerc = ((new Date().getHours() - 0) / (24 - 0));
var realHourPercentage = 1 - Number(hourPerc)
circle2.animate(realHourPercentage);

var minutePerc = ((new Date().getMinutes() - 0) / (60 - 0));
var realMinutePercentage = 1 - Number(minutePerc)
circle3.animate(realMinutePercentage);

var secondPerc = ((new Date().getSeconds() - 0) / (60 - 0));
var realSecondPercentage = 1 - Number(secondPerc)
circle4.animate(realSecondPercentage);

},1000);

window.addEventListener('load', function() {
  NProgress.done();
  $("#loading").addClass("animated fadeOut");
  setTimeout(function(){
      $("#loading").css("display","none");
      $("#loading").removeClass("animated fadeOut");
  },800);
  setTimeout(function(){
    $("#mailing").css("display", "inline-block");
    $("#mailing").addClass("animated fadeInRight");
    setTimeout(function(){
        $("#mailing").removeClass("animated fadeInRight");
      },800);
    },50000);
}, false);

$("#btn1").click(function(){
  $(this).attr("disable",true);
  var email = $("#email").val();
  if(!email){
      alert("Email can't be empty");
      return;
  }
  $(this).html("please wait...");
  db.collection("email").doc(email).set({
      email: email,
      time: new Date().getTime()
  }).then(function(){
      $("#mailing").html("<h2>Thank You for Joining 🎉</h2>");
      $("#mailing").css("padding-bottom","2.5vh");
      $("#mailing").css("background",'url("https://i.gifer.com/6k2.gif"),linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url("https://images.unsplash.com/photo-1550684656-96eda9e5c632?&w=1634") center center');
      $(this).attr("disable",false);
      setTimeout(function(){
          $("#mailing").addClass("animated fadeOutRight");
          setTimeout(function(){
              $("#mailing").css("display", "none");
              $("#mailing").removeClass("animated fadeOutRight");
          },800)
      },4000)
  }).catch((err) => {
      alert(err.message);
      $(this).attr("disable",false);
      $(this).html("Join");
  });
});

$("#btn2").click(function(){
  $("#mailing").addClass("animated fadeOutRight");
  setTimeout(function(){
      $("#mailing").css("display", "none");
      $("#mailing").removeClass("animated fadeOutRight");
  },800)
});

$("#btn2").mouseover(function(){
  $(this).html("Go away 😦")
});

$("#btn2").mouseout(function(){
  $(this).html("Go away")
});
