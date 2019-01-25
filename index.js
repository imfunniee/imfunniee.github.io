function showdes(){
    $("#web").css("display","none");
    $("#web-btn").css("border-bottom","3px solid transparent");
    $("#design").css("display","inherit");
    $("#des-btn").css("border-bottom","3px solid #000");
}
function showweb(){
    $("#web").css("display","inherit");
    $("#design").css("display","none");
    $("#web-btn").css("border-bottom","3px solid #000");
    $("#des-btn").css("border-bottom","3px solid transparent");
}

function inlarge(url){
    $("#thischangesxD").attr("src",url);
    $("#inlarge").css("display","flex");
    $("#img_container").addClass("animated bounceIn");
    setTimeout(function(){
        $("#img_container").removeClass("animated bounceIn");
    },800);
}

function takeitback(){
    $("#inlarge").addClass("animated fadeOut");
    setTimeout(function(){
        $("#inlarge").css("display","none");
        $("#inlarge").removeClass("animated fadeOut");
        $("#thischangesxD").attr("src","");
    },800);
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
},3700);

window.onscroll = function(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.style.backgroundSize = "150% auto";
    }else{
        document.body.style.backgroundSize = "100% auto";
    }
};
