firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        $("#userImg").attr("src","https://i.imgur.com/cntrc8m.png");
        $("#userImg").attr("title","imfunny");
    }else{
        window.location.assign("/login");
         setTimeout(function(){
         $("#loading").addClass("animated fadeOut");
         setTimeout(function(){
           $("#loading").removeClass("animated fadeOut");
           $("#loading").css("display","none");
          },800);
        },1000);
     }
});

$("#orders_btn").click(function(){
    $(this).addClass("active");
    $("#reservations_btn").removeClass("active");
    $("#for_table").css("display","none");
    $("#for_orders").css("display","table");
    $("#for_orders").addClass("animated fadeIn");
    setTimeout(function(){
        $("#for_orders").removeClass("animated fadeIn");
    },800);
});

$("#reservations_btn").click(function(){
    $(this).addClass("active");
    $("#orders_btn").removeClass("active");
    $("#for_orders").css("display","none");
    $("#for_table").css("display","table");
    $("#for_table").addClass("animated fadeIn");
    setTimeout(function(){
        $("#for_table").removeClass("animated fadeIn");
    },800);
});

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

db.collection("reserve").get()
.then(function(querySnapshot) {
    $("#num_reserve").html(querySnapshot.size);
    if(querySnapshot.size == "0"){
        $("#for_table").html("nothing to see here");
        return;
    }
    querySnapshot.forEach(function(doc) {
        $("#show_table").append(`
            <tr id="reserve_tr_${doc.id}">
                <td style="width:5% !important;" class="delete" onclick="deleteShit('reserve','${doc.id}')"><i class="far fa-trash-alt"></i></td>
                <td>${doc.data().username}</td>
                <td>${doc.data().date_for_reserve}</td>
                <td>${doc.data().time_for_reserve}</td>
                <td>${doc.data().people_for_reserve}</td>
            </tr>
        `);
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});

db.collection("order").get()
.then(function(querySnapshot) {
    $("#num_orders").html(querySnapshot.size);
    if(querySnapshot.size == "0"){
        $("#for_orders").html("nothing to see here");
        return;
    }
    querySnapshot.forEach(function(doc) {
        $("#show_order").append(`
            <tr id="order_tr_${doc.id}">
                <td style="width:5% !important;" class="delete" onclick="deleteShit('order','${doc.id}')"><i class="far fa-trash-alt"></i></td>
                <td>${doc.data().username}</td>
                <td>${doc.data().address}</td>
                <td><details id="food_${doc.id}"><summary>Food Ordered</summary></details></td>
                <td>${doc.data().payment}</td>
            </tr>
        `);
        for(i=0;i<doc.data().food.length;i++){
            $(`#food_${doc.id}`).append(`
            <p>${doc.data().food[i].name} - ${doc.data().food[i].quantity}</p>
            `)
        }
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});

function deleteShit(which,deleteid){
    db.collection(which).doc(deleteid).delete().then(function() {
        $(`#${which}_tr_${deleteid}`).addClass("animated fadeOut");
        setTimeout(function(){
            $(`#${which}_tr_${deleteid}`).css("display","none");
            $(`#${which}_tr_${deleteid}`).removeClass("animated fadeOut");
        },800);
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function signout(){
    firebase.auth().signOut().then(function() {
        alert("Logged Out")
      }).catch(function(error) {
        alert(error.message);
      });
}