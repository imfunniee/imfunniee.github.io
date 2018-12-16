$.getJSON("https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-coming-soon.json",function(data){
for(i = 0; i < data.length; i++){
    var url = data[i].posterurl;
    url = url.toString().split("_");
    url = url[0]+"_"+url[1]+"_"+url[2]+url[5];
    url = url.replace("SY500","SY760");
    $(".scrolling-wrapper").append(`
    <a href="movie.html#${data[i].id}">
    <div class="movie" id="movie${i}" onclick="showDetails('${data[i].id}')">
    <div id="movie-background" style="background:url('${url}') center top;"></div>
    <div id="content">
    <b>${data[i].title}</b><br>
    <span>${data[i].year}</span>
    </div>
    </div>
    </a>
    `);
}
});

var doneids = [];

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

db.collection("movie").orderBy("starRate","desc")
.onSnapshot(function(querySnapshot){
    if(querySnapshot.empty == false){
        $("#ratedMovies").html("<h1>Top Rated Movies</h1>");
    }
    var iDs = [];
    querySnapshot.docChanges().forEach(function(change){
        iDs = [];
        $("#ratedMovies").html("<h1>Top Rated Movies</h1>");        
    });
    querySnapshot.forEach(function(doc){
        iDs.push(doc.data().movieId);
    });

    $.getJSON("https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/movies-coming-soon.json",function(data){
        for(i = 0; i < iDs.length; i++){
        var result = findObjectByKey(doneids, 'done', iDs[i]) === null;
        if(result == true){
            var id = Number(iDs[i])-1;
            var url = data[id].posterurl;
            url = url.toString().split("_");
            url = url[0]+"_"+url[1]+"_"+url[2]+url[5];
            url = url.replace("SY500","SY760");
            $("#ratedMovies").append(`
            <a href="movie.html#${data[id].id}">
            <div class="movie" id="movie${id}" onclick="showDetails('${data[id].id}')">
            <div id="movie-background" style="background:url('${url}') center top;"></div>
            <div id="content">
            <b>${data[id].title}</b><br>
            <span>${data[id].year}</span>
            </div>
            </div>
            </a>
            `);
        }
        doneids.push({done:iDs[i]});
    }
    });
});

$(document).ready(() => {
    setTimeout(() => {
        $("#loading").addClass("animated fadeOut");
        setTimeout(() => {
        $("#loading").css("display","none");
        $("#loading").removeClass("animated fadeOut");
        },800);
    },3000)
});
