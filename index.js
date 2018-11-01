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