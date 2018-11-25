firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#checkUser").html("Sign Out @"+localStorage.getItem("username"));
        $("#checkUserBar").html("Sign Out @"+localStorage.getItem("username"));
        $("#checkUser").attr("onclick", "signout()");
        $("#checkUserBar").attr("onclick", "signout()");
    }else{
        $("#checkUser").html("Sign In");
        $("#checkUserBar").html("Sign In");
        $("#checkUser").attr("onclick", "signinbox()");
        $("#checkUserBar").attr("onclick", "signinbox()");
    }
});

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

function signinbox(){
    $("#signin").css("display","flex");
    $("#signin").addClass("animated fadeIn");
    setTimeout(() => {
        $("#signin").removeClass("animated fadeIn");
    },800);
}

function closebox(){
    $("#signin").addClass("animated fadeOut");
    setTimeout(() => {
        $("#signin").removeClass("animated fadeOut");
        $("#signin").css("display","none");
    },800);
}

function showSideBar(){
    $("#sidebar").css("display","flex");
    $("#sidebar").addClass("animated slideInRight");
    setTimeout(() => {
        $("#sidebar").removeClass("animated slideInRight");
    },800);
}

function closeBar(){
    $("#sidebar").addClass("animated slideOutRight");
    setTimeout(() => {
        $("#sidebar").removeClass("animated slideOutRight");
        $("#sidebar").css("display","none");
    },800);
}

function signin(){
    const username = $("#username").val();
    if(!username){
        $("#errorSignIn").html("empty field");
        return;
    }else{
        firebase.auth().signInAnonymously().then(() => {
            localStorage.setItem("username", username);
            $("#errorSignIn").html("Logged In As @"+username);
        }).catch((error) => {
            $("#errorSignIn").html("error.message");
        });
    }
}

function signout(){
    firebase.auth().signOut().then(function() {
        alert("Signed Out")
      }).catch(function(error) {
        alert(error.message);
      });
}