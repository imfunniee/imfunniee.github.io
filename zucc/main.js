var ai = document.getElementById("zucc");
const PREFIX = "mark";
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.start();

recognition.onresult = function(event) {
for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (!event.results[i][0].transcript.trim().startsWith(PREFIX)) return;
      $('#listen').html(event.results[i][0].transcript.toLowerCase());
      $('#zucc').css("animation","listen 1s infinite");
      if (event.results[i].isFinal) {
      $('#zucc').css("animation","none");
      var command = event.results[i][0].transcript.substring(PREFIX.length).split(" ");
      if(!command[1]){ $('#everything').html("How may I help you?"); return;}
      var ytString = event.results[i][0].transcript.substring(PREFIX.length).slice("9");
      var googleString = event.results[i][0].transcript.substring(PREFIX.length).slice("8");

      switch(command[1].toLowerCase()){

      case "youtube" :
      if(!ytString){ $('#everything').html("oppsie!! no search text provided"); return;}
      $('#everything').html("redirecting to youtube...");
      setTimeout(function(){
        $('#website').attr("href","https://youtube.com/results?search_query="+ytString);
        document.getElementById("website").click();
      },400);
      break;

      case "google" :
      if(!ytString){ $('#everything').html("oppsie!! no search text provided"); return;}
      $('#everything').html("seaching on google...");
      setTimeout(function(){
        $('#website').attr("href","https://www.google.com/search?q="+googleString);
        document.getElementById("website").click();
      },400);
      break;

      default :
      $('#everything').html("sorry i didn't get it, try agian");
      break;
      }
    }
}
};