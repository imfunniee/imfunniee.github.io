var getinfofor = window.location.hash.substr(1);
var items = [];
var starred = [];
var language;
var user;
var languageishere = [];
var userishere = [];

function count(givedata){
    var y = 1;
    var x = 0;
    for (var i=0;i < givedata.length;i++)
    {
            for (var z=i; z < givedata.length; z++)
            {
                    if (givedata[i] == givedata[z])
                     x++;
                    if (y<x)
                    {
                      y=x; 
                      language = givedata[i];
                    }
            }
            x=0;
    }
    languageishere.push(language);
    like();
}

function count4user(givedata){
    var y = 1;
    var x = 0;
    for (var i=0;i < givedata.length;i++)
    {
            for (var z=i; z < givedata.length; z++)
            {
                    if (givedata[i] == givedata[z])
                     x++;
                    if (y<x)
                    {
                      y=x; 
                      user = givedata[i];
                    }
            }
            x=0;
    }
    userishere.push(user);
    like();
}

function like(){
    if(languageishere.length > 0 && userishere.length > 0){
        if (languageishere[0] == undefined && userishere[0] == undefined){
            $("#container").html(`<h1>nothing to show here</h1>`);
            return;
        }
        if (languageishere[0] == undefined){
            var username = userishere[0];
            $.getJSON(`https://api.github.com/users/${username}`, function(userdata) {
                $("#container").html(`<h1>I <i class="fas fa-heart heart animated infinite heartBeat"></i><a href="https://github.com/${username}"><section style="background:url('${userdata.avatar_url}') center center;"></section></a></h1>`);
            });
            return;
        }
        if (userishere[0] == undefined){
            var username = userishere[0];
            $.getJSON(`https://api.github.com/users/${username}`, function(userdata) {
                $("#container").html(`<h1>I <i class="fas fa-heart heart animated infinite heartBeat"></i>  ${languageishere[0]} </h1>`);
            });
            return;
        }
    var username = userishere[0];
    $.getJSON(`https://api.github.com/users/${username}`, function(userdata) {
        $("#container").html(`<h1 style="margin-left:-100px;">I <i class="fas fa-heart heart animated infinite heartBeat"></i> ${languageishere[0]} & <a href="https://github.com/${username}"><section style="background:url('${userdata.avatar_url}') center center;"></section></a></h1>`);
    });
    }
}

function runthings(){
if(!getinfofor){
    alert("provide a user using # in url");
    return;
}else{
    $.getJSON(`https://api.github.com/users/${getinfofor}`, function(userdata) {
        if(userdata.bio == null){
            $("#about").css("display","none");
        }
        $("#profile").html(`
        <table style="width:100%">
                <tr>
                    <td style="width:25%;vertical-align:top;">
                        <div id="profile-image" style="background:url('${userdata.avatar_url}') center center"></div>
                    </td>
                    <td id="userdata">
                        <div id="username">@${userdata.login} <a href="https://github.com/${userdata.login}"><button><i class="fab fa-github"></i> GitHub</button></a></div>
                        <div id="about">
                        ${userdata.bio}
                        </div>
                        <div id="f-data">
                         <table>
                                <tr>
                                    <td>${userdata.public_repos}<br><b>repositories</b></td>
                                    <td>${userdata.followers}<br><b>followers</b></td>
                                    <td>${userdata.following}<br><b>following</b></td>
                                </tr>
                         </table>
                        </div>
                    </td>
                </tr>
            </table>
        `);
}).fail(function(){
    $("#profile").html('<center style="margin-top:14vh;"><h1>provide a user using # in url</h1></center>');
});

$.getJSON(`https://api.github.com/users/${getinfofor}/repos`, function(data) {
    for(var i=0;i < data.length;i++){
        items.push(data[i].language);
    }
    count(items);
});

$.getJSON(`https://api.github.com/users/${getinfofor}/starred`, function(data) {
    for(var i=0;i < data.length;i++){
        starred.push(data[i].owner.login);
    }
    count4user(starred);
});
}
}

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},2000);

runthings();
