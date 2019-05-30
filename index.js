var db = firebase.firestore();

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
    $("#img_container").addClass("animated fadeIn");
    setTimeout(function(){
        $("#img_container").removeClass("animated fadeIn");
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

setTimeout(function(){
    $("#text").addClass("animated fadeOut");
    setTimeout(function(){
        $("#text").removeClass("animated fadeOut");
        $("#text").css("display", "none");
    },800);
    setTimeout(function(){
        $("#mailing").css("display", "inline-block");
        $("#mailing").addClass("animated fadeInRight");
        setTimeout(function(){
            $("#mailing").removeClass("animated fadeInRight");
        },800);
    },20000);
},3000);

setTimeout(function(){
    $("#leftThingy").addClass("animated fadeOut");
    $("#RightThingy").addClass("animated fadeOut");
    setTimeout(function(){
        $("#leftThingy").removeClass("animated fadeOut");
        $("#RightThingy").removeClass("animated fadeOut");
        $("#leftThingy").css("display", "none");
        $("#RightThingy").css("display", "none");
        $("#loading").css("display", "none");
    },800);
},3700);