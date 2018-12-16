if(window.location.hash){
var id = window.location.hash.toString().slice(1);
$.getJSON("https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-coming-soon.json",function(data){
    if(!data[Number(id)-1] || data[Number(id)-1] == undefined){
        $("#inner_details").html(`<center><h1 style="margin-top:18vh">Sorry, this page isn't available.</h1><h3>The link may be broken, or the have been removed.</h3></center>`);
        return;
    }
    var url = data[Number(id)-1].posterurl;
    url = url.toString().split("_");
    url = url[0]+"_"+url[1]+"_"+url[2]+url[5];
    var urlBack = url.replace("SY500","SY1800");
    url = url.replace("SY500","SY800");
    $("#details").attr("style",`background:linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0)),url('${urlBack}') center top fixed !important; background-size:cover !important;`);
    $("#inner_details").append(`
       <table>
           <tr>
               <td id="img" style="background:url('${url}');"></td>
               <td id="text">
                   <h1>${data[Number(id)-1].title}</h1>
                   <h2 id="rating_in_points">0/5</h2>
                   <div id="rating_in_stars">
                   </div>
                   <h3>Storyline</h3>
                   ${data[Number(id)-1].storyline}
                   <h3>Cast</h3>
                   ${data[Number(id)-1].actors}
                   <h3>${data[Number(id)-1].year}</h3>
               </td>
           </tr>
       </table>
    <div id="rating">
    <h2 id="rating_num">0 Ratings</h2>
    <div id="comment_section">
    </div>
    <div id="users_comments">
    
    </div>
    </div>
    </div>
    `);
firebase.auth().onAuthStateChanged(function(user) {
if(user){
    $("#comment_section").html(`
        <h1>Rate this Movie</h1>
        <div id="group_of_stars_xD">
        <button class="star" id="star1${data[Number(id)-1].id}" onmouseover="showstar('1${data[Number(id)-1].id}')" value="0"><i class="far fa-star"></i></button>
        <button class="star" id="star2${data[Number(id)-1].id}" onmouseover="showstar('2${data[Number(id)-1].id}')" value="0"><i class="far fa-star"></i></button>
        <button class="star" id="star3${data[Number(id)-1].id}" onmouseover="showstar('3${data[Number(id)-1].id}')" value="0"><i class="far fa-star"></i></button>
        <button class="star" id="star4${data[Number(id)-1].id}" onmouseover="showstar('4${data[Number(id)-1].id}')" value="0"><i class="far fa-star"></i></button>
        <button class="star" id="star5${data[Number(id)-1].id}" onmouseover="showstar('5${data[Number(id)-1].id}')" value="0"><i class="far fa-star"></i></button>
        </div>
        <div id="value${data[Number(id)-1].id}"></div><br>
        <textarea placeholder="any comments..." id="comment" rows="6" maxlength="600"></textarea><br>
        <button id="send" onclick="send()">Send</button>
        <h3 id="error"></h3>
    `);
}else{
    $("#comment_section").html("<h1>Log In to rate this movie</h1>");
}
});
});
}else{
    window.location = "index.html"
}

function send(){
    var movieID = window.location.hash.toString().slice(1);
    var star = $(`#value${movieID}`).val();
    var comment = $('#comment').val();
    if(star == 0){
        $('#error').html("star rating can't be empty");
        $('#group_of_stars_xD').addClass("animated bounce");
        setTimeout(() => {
            $('#group_of_stars_xD').removeClass("animated bounce");
        },800);
        return;
    }
    $('#send').attr("disabled",true);
    $('#error').html("Please Wait...");
    var user = firebase.auth().currentUser;
    db.collection("movie").doc(user.uid+movieID).set({
        username: localStorage.getItem("username"),
        userid: user.uid,
        movieId: movieID,
        starRate: star,
        commentText: comment,
        time: new Date().getTime()
    })
    .then(() => {
        $("#comment").val("");
        $(`#star1${movieID}`).html('<i class="far fa-star"></i>');
        $(`#star2${movieID}`).html('<i class="far fa-star"></i>');
        $(`#star3${movieID}`).html('<i class="far fa-star"></i>');
        $(`#star4${movieID}`).html('<i class="far fa-star"></i>');
        $(`#star5${movieID}`).html('<i class="far fa-star"></i>');
        $(`#value${movieID}`).val("0");
        $('#error').html("Added That!!");
            setTimeout(() => {
            $("#error").addClass("animated fadeOut");
            setTimeout(() => {
                $('#error').html("");
                $("#error").removeClass("animated fadeOut");
            },800);
        },3000);
        $('#send').attr("disabled",false);
    })
    .catch((error) => {
        $('#error').html(error.message);
    });
}

var movieID = window.location.hash.toString().slice(1);
db.collection("movie").where("movieId", "==", movieID).orderBy("time","desc")
.onSnapshot(function(querySnapshot) {
    $("#rating_num").html(`${querySnapshot.size} Ratings`);
    querySnapshot.docChanges().forEach(function(change) {
        if (change.type === "added" || "modified" || "removed") {
            $("#users_comments").html("");
            $(`#rating_in_stars`).html("");
        }
    });
    if(querySnapshot.empty == true){
        $("#users_comments").append("<h3>Be the first to rate this movie</h3>");
    }
    var ratings = [];
    querySnapshot.forEach(function(doc){
        ratings.push(doc.data().starRate);
        $("#users_comments").append(`
        <div class="comment_data">
        <div id="userName">@${doc.data().username}</div>
        <div id="realComment">${doc.data().commentText}</div>
        <div id="stars_rating${doc.id}">${doc.data().starRate}/5 &nbsp;
        </div>
        <br>
        <span>${new Date(doc.data().time).toDateString()} @ ${new Date(doc.data().time).toLocaleTimeString()}</span>
        </div>
        `);
        for(i = 1; i <= 5; i++){
            if(i <= doc.data().starRate){
                $(`#stars_rating${doc.id}`).append(`<i class="fas fa-star rating_star"></i>`);
            }else{
                $(`#stars_rating${doc.id}`).append(`<i class="far fa-star rating_star"></i>`);
            }
        }
    });
    var sumofRatings = 0;
    for(z = 0; z < ratings.length; z++){
        sumofRatings += Number(ratings[z], 5);
    }
    var rounded_value;
    if(!ratings.length || ratings.length == 0){
        rounded_value = 0;
    }else{
        rounded_value = Math.round(sumofRatings/ratings.length);
    }
    $("#rating_in_points").html(`${rounded_value}/5`);
    for(i = 1; i <= 5; i++){
        if(i <= rounded_value){
            $(`#rating_in_stars`).append(`<i class="fas fa-star top-star"></i>`);
        }else{
            $(`#rating_in_stars`).append(`<i class="far fa-star top-star"></i>`);
        }
    }
});


$(document).ready(() => {
    setTimeout(() => {
        $("#loading").addClass("animated fadeOut");
        setTimeout(() => {
        $("#loading").css("display","none");
        $("#loading").removeClass("animated fadeOut");
        },800);
    },2800)
});

function showstar(starid){
    var onStar = starid.substr('0','1');
    var whichStar = starid.slice('1');
    switch(onStar){
        case "1" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star1${whichStar}`).addClass('animated rubberBand');
          setTimeout(() => {
        $(`#star1${whichStar}`).removeClass('animated rubberBand');
        },800);
        $(`#star2${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star3${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("1");
        break;
        case "2" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).addClass('animated rubberBand');
          setTimeout(() => {
        $(`#star2${whichStar}`).removeClass('animated rubberBand');
        },800);
        $(`#star3${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("2");
        break;
        case "3" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).addClass('animated rubberBand');
          setTimeout(() => {
        $(`#star3${whichStar}`).removeClass('animated rubberBand');
        },800);
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("3");
        break;
        case "4" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).addClass('animated rubberBand');
        setTimeout(() => {
        $(`#star4${whichStar}`).removeClass('animated rubberBand');
        },800);
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("4");
        break;
        case "5" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star5${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star5${whichStar}`).addClass('animated rubberBand');
        setTimeout(() => {
        $(`#star5${whichStar}`).removeClass('animated rubberBand');
        },800);
        $(`#value${whichStar}`).val("5");
        break;
        default : 
        $(`#star1${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star2${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star3${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("0");
        break;
    }
}
