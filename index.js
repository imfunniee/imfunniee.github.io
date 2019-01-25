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

setTimeout(function(){
    $("#text").addClass("animated fadeOut");
    setTimeout(function(){
        $("#text").removeClass("animated fadeOut");
        $("#text").css("display", "none");
    },800);
},3000);

setTimeout(function(){
    $("#leftThingy").addClass("animated slideOutLeft");
    $("#RightThingy").addClass("animated slideOutRight");
    setTimeout(function(){
        $("#leftThingy").removeClass("animated slideOutLeft");
        $("#RightThingy").removeClass("animated slideOutRight");
        $("#leftThingy").css("display", "none");
        $("#RightThingy").css("display", "none");
        $("#loading").css("display", "none");
    },800);
},3800);

window.onscroll = function(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.style.backgroundSize = "150% auto";
    }else{
        document.body.style.backgroundSize = "100% auto";
    }
};
