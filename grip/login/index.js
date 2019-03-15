firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.location.assign("grip/home");
    }else{
        setTimeout(function(){
            $("#text").addClass("animated fadeOut");
            setTimeout(function(){
                $("#text").removeClass("animated fadeOut");
                $("#text").css("display", "none");
            },800);
        },800);
        setTimeout(function(){
            $("#topThingy").addClass("animated slideOutUp");
            $("#bottomThingy").addClass("animated slideOutDown");
            setTimeout(function(){
                $("#topThingy").removeClass("animated slideOutUp");
                $("#bottomThingy").removeClass("animated slideOutDown");
                $("#topThingy").css("display", "none");
                $("#bottomThingy").css("display", "none");
                $("#loading").css("display", "none");
            },800);
        },1200);
    }
});

$("#login_btn").click(function(){
    var email = $("#email_login").val();
    var password = $("#password_login").val();
    if(!email || !password){
        $("#error").html("all fields required");
        $("#error").css("display","inherit");
        return;
    }
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
        $("#error").html(error.message);
        $("#error").css("display","inherit");
    });
});
