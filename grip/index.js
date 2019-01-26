window.onscroll = function(){
    if(document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        document.body.style.backgroundSize = "150% auto";
        $("#header").css("background","#000");
        $("#header").css("padding","4vh 5vw");
    }else{
        document.body.style.backgroundSize = "100% auto";
        $("#header").css("background","transparent");
        $("#header").css("padding","4vh 5vw");
    }
};