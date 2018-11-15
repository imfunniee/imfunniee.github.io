$.getJSON("https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-in-theaters.json", function(response){
for(i = 0; i < response.length; i++){
    var actors = [];
    for(x=0;x<response[i].actors.length;x++){
        actors.push(response[i].actors[x]+' &nbsp;');
    }
    var genres = [];
    for(x=0;x<response[i].genres.length;x++){
        genres.push(response[i].genres[x]+' &nbsp;');
    }
   $('#movie').append(`
   <div class="movie-detail">
   <table>
        <tr>
            <td class="movie-poster">
                    <img src="${response[i].posterurl}">
            </td>
            <td class="movie-about">
                <h1>${response[i].title}</h1>
                <h3>${response[i].year}</h3>
                <p>${response[i].storyline}</p>
                <p id="actors${response[i].id}">
                    Actors: 
                </p>
                <p id="genres${response[i].id}" class="genres">
                    Genres: 
                </p>
                <div id="review-section">
                <h2 id="value${response[i].id}" value="0">Rate this Movie</h2>
                <button class="star" id="star1${response[i].id}" onmouseover="showstar('1${response[i].id}')" value="0"><i class="far fa-star"></i></button>
                <button class="star" id="star2${response[i].id}" onmouseover="showstar('2${response[i].id}')" value="0"><i class="far fa-star"></i></button>
                <button class="star" id="star3${response[i].id}" onmouseover="showstar('3${response[i].id}')" value="0"><i class="far fa-star"></i></button>
                <button class="star" id="star4${response[i].id}" onmouseover="showstar('4${response[i].id}')" value="0"><i class="far fa-star"></i></button>
                <button class="star" id="star5${response[i].id}" onmouseover="showstar('5${response[i].id}')" value="0"><i class="far fa-star"></i></button><br>
                <input type="text" placeholder="comment" id="review-comment${response[i].id}"><br>
                <button class="submit" id="submit${response[i].id}" onclick="submit('${response[i].id}')">Submit</button>
                <h4 id="error${response[i].id}"></h4>
                </div>
            </td>
        </tr>
    </table>
    <div id="reviews">
    <h2>Reviews</h2>
    No Reviews Yet :(
    </div>
    </div>
   `);
   for(x=0;x<response[i].actors.length;x++){
    $(`#actors${response[i].id}`).append(actors[x]);
    }
   for(x=0;x<response[i].genres.length;x++){
    $(`#genres${response[i].id}`).append(genres[x]);
    }
}
});

function showstar(starid){
    var onStar = starid.substr('0','1');
    var whichStar = starid.slice('1');
    switch(onStar){
        case "1" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star3${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("1");
        break;
        case "2" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("2");
        break;
        case "3" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("3");
        break;
        case "4" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star5${whichStar}`).html('<i class="far fa-star"></i>');
        $(`#value${whichStar}`).val("4");
        break;
        case "5" : 
        $(`#star1${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star2${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star3${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star4${whichStar}`).html('<i class="fas fa-star glow"></i>');
        $(`#star5${whichStar}`).html('<i class="fas fa-star glow"></i>');
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

$.getJSON("https://api.spotify.com/v1/albums/0ZHyvPke0EcVt6rYA8Ins3?market=US",function(data){
console.log(data);
});

function submit(movieID){
    var star = $(`#value${movieID}`).val();
    var comment = $(`#review-comment${movieID}`).val();
    if(star == 0){
        $(`#error${movieID}`).html("star rating can't be empty");
        return;
    }
    $(`#submit${movieID}`).attr("disabled",true);
    $(`#error${movieID}`).html("please wait...");
    console.log("ok");
}