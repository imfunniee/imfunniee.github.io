AOS.init();
$(window).on('beforeunload', function(){
    localStorage.removeItem("cart");
});
window.onscroll = function(){
    if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#header").css("background","#fff");
        $("#header").css("color","#000");
        var dark = localStorage.getItem("darkMode");
        dark = JSON.parse(dark);
        if(dark[0].dark == true){
            $("#header").css("background","#000");
            $("#header").css("color","#fff");
        }
        $("#header").css("box-shadow","0px 10px 30px rgba(0,0,0,0.06)");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid rgb(255, 44, 90)");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }else{
        $("#header").css("background","transparent");
        $("#header").css("color","#fff");
        $("#header").css("box-shadow","0px 0px 0px rgba(0,0,0,0)");
        $("#navigation a").hover(function(){
            $(this).css("border-bottom","2px solid #fff");
        },function(){
            $(this).css("border-bottom","2px solid transparent");
        });
    }
}

function dark(){
    var dark = localStorage.getItem("darkMode");
    dark = JSON.parse(dark);
    if(dark[0].dark == true){
        var item = [{"dark":false}];
        localStorage.setItem("darkMode", JSON.stringify(item));
    }else{
        var item = [{"dark":true}];
        localStorage.setItem("darkMode", JSON.stringify(item));
    }
    $(".cog").html('<i class="far fa-moon"></i>');
    darkmode();
}

setTimeout(function(){
    $("#text").addClass("animated fadeOut");
    setTimeout(function(){
        $("#text").removeClass("animated fadeOut");
        $("#text").css("display", "none");
    },800);
},3000);

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
},3700);


$.getJSON("menu.json", function( data ) {
    for(i=0; i < data[0].appetizers[0].item.length; i++){
        $("#appetizers").append(`
        <div class="details">
        <table>
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_appetizers_${i}" style="background:url('${data[0].appetizers[0].item[i].img}') center center;">
        </td>
        <td style="width:70%;vertical-align:top;">
        <div class="info">
                <h3>${data[0].appetizers[0].item[i].name} <span>${data[0].appetizers[0].item[i].price}</span></h3>
                <h5>${data[0].appetizers[0].item[i].description}</h5>
                <button class="button" id="cart_appetizers_${i}" onclick="cart('appetizers','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_appetizers_${i}" onclick="like('appetizers','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_appetizers_${i}" onclick="dislike('appetizers','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].appetizers[0].item[i].img == ""){
            $(`#img_appetizers_${i}`).html("no image");
            $(`#img_appetizers_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_appetizers_${i}`).css("color","#FF2525");
            $(`#img_appetizers_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].soup.custom_menu.length;i++){
        $("#customize").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].soup.custom_menu[i].item}</h3>
                <h4>${data[0].soup.custom_menu[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0; i < data[0].soup.item.length; i++){
        $("#soup").append(`
        <div class="details">
        <table>
        <tr>
        <td style="width:30%">
        <div class="img" id="img_soup_${i}" style="background:url('${data[0].soup.item[i].img}') center center;">
        </td>
        <td style="width:70%;vertical-align: top;">
        <div class="info">
                <h3>${data[0].soup.item[i].name}</h3>
                <h5>${data[0].soup.item[i].description}</h5>
                <button class="button" id="cart_soup_${i}" onclick="cart('soup','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_soup_${i}" onclick="like('soup','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_soup_${i}" onclick="dislike('soup','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].soup.item[i].img == ""){
            $(`#img_soup_${i}`).html("no image");
            $(`#img_soup_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_soup_${i}`).css("color","#FF2525");
            $(`#img_soup_${i}`).css("text-align","center");
        }
    }
    for(i=0; i < data[0].salad.item.length; i++){
        $("#salad").append(`
        <div class="details">
        <table>
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_salad_${i}" style="background:url('${data[0].salad.item[i].img}') center center;">
        </td>
        <td style="width:70%;vertical-align: top;">
        <div class="info">
                <h3>${data[0].salad.item[i].name}<span>${data[0].salad.item[i].price}</span></h3>
                <h5>${data[0].salad.item[i].description}</h5>
                <button class="button" id="cart_salad_${i}" onclick="cart('salad','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_salad_${i}" onclick="like('salad','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_salad_${i}" onclick="dislike('salad','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].salad.item[i].img == ""){
            $(`#img_salad_${i}`).html("no image");
            $(`#img_salad_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_salad_${i}`).css("color","#FF2525");
            $(`#img_salad_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].stir_fried.custom_menu.length;i++){
        $("#customize-stir").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].stir_fried.custom_menu[i].item}</h3>
                <h4>${data[0].stir_fried.custom_menu[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0; i < data[0].stir_fried.item.length; i++){
        $("#stir_fried").append(`
        <div class="details">
        <table>
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_stir_fried_${i}" style="background:url('${data[0].stir_fried.item[i].img}') center center;">
        </td>
        <td style="width:70%;vertical-align: top;">
        <div class="info">
                <h3>${data[0].stir_fried.item[i].name}</h3>
                <h5>${data[0].stir_fried.item[i].description}</h5>
                <button class="button" id="cart_stir_fried_${i}" onclick="cart('stir_fried','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_stir_fried_${i}" onclick="like('stir_fried','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_stir_fried_${i}" onclick="dislike('stir_fried','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].stir_fried.item[i].img == ""){
            $(`#img_stir_fried_${i}`).html("no image");
            $(`#img_stir_fried_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_stir_fried_${i}`).css("color","#FF2525");
            $(`#img_stir_fried_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].noodles.custom_menu.length;i++){
        $("#customize-noodles").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].noodles.custom_menu[i].item}</h3>
                <h4>${data[0].noodles.custom_menu[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0; i < data[0].noodles.item.length; i++){
        $("#noodles").append(`
        <div class="details">
        <table>
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_noodles_${i}" style="background:url('${data[0].noodles.item[i].img}') center center;">
        </td>
        <td style="width:70%;vertical-align: top;">
        <div class="info">
                <h3>${data[0].noodles.item[i].name}</h3>
                <h5>${data[0].noodles.item[i].description}</h5>
                <button class="button" id="cart_noodles_${i}" onclick="cart('noodles','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_noodles_${i}" onclick="like('noodles','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_noodles_${i}" onclick="dislike('noodles','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].noodles.item[i].img == ""){
            $(`#img_noodles_${i}`).html("no image");
            $(`#img_noodles_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_noodles_${i}`).css("color","#FF2525");
            $(`#img_noodles_${i}`).css("text-align","center");
        }
    }
    for(i=0; i < data[0].noodles_soup.item.length; i++){
        $("#noodles_soup").append(`
        <div class="details">
        <table style="vertical-align:top;">
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_noodles_soup_${i}" style="background:url('${data[0].noodles_soup.item[i].img}') center center;">
        </td>
        <td style="width:70%;">
        <div class="info">
                <h3>${data[0].noodles_soup.item[i].name}</h3>
                <h5>${data[0].noodles_soup.item[i].description}</h5>
                <button class="button" id="cart_noodles_soup_${i}" onclick="cart('noodles_soup','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_noodles_soup_${i}" onclick="like('noodles_soup','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_noodles_soup_${i}" onclick="dislike('noodles_soup','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].noodles_soup.item[i].img == ""){
            $(`#img_noodles_soup_${i}`).html("no image");
            $(`#img_noodles_soup_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_noodles_soup_${i}`).css("color","#FF2525");
            $(`#img_noodles_soup_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].curries.custom_menu.length;i++){
        $("#customize-curries").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].curries.custom_menu[i].item}</h3>
                <h4>${data[0].curries.custom_menu[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0; i < data[0].curries.item.length; i++){
        $("#curries").append(`
        <div class="details">
        <table style="vertical-align:top;">
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_curries_${i}" style="background:url('${data[0].curries.item[i].img}') center center;">
        </td>
        <td style="width:70%;">
        <div class="info">
                <h3>${data[0].curries.item[i].name}</h3>
                <h5>${data[0].curries.item[i].description}</h5>
                <button class="button" id="cart_curries_${i}" onclick="cart('curries','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_curries_${i}" onclick="like('curries','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_curries_${i}" onclick="dislike('curries','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].curries.item[i].img == ""){
            $(`#img_curries_${i}`).html("no image");
            $(`#img_curries_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_curries_${i}`).css("color","#FF2525");
            $(`#img_curries_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].fried_rice.custom_menu.length;i++){
        $("#customize_fried_rice").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].fried_rice.custom_menu[i].item}</h3>
                <h4>${data[0].fried_rice.custom_menu[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0; i < data[0].fried_rice.item.length; i++){
        $("#fried_rice").append(`
        <div class="details">
        <table style="vertical-align:top;">
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_fried_rice_${i}" style="background:url('${data[0].fried_rice.item[i].img}') center center;">
        </td>
        <td style="width:70%;">
        <div class="info">
                <h3>${data[0].fried_rice.item[i].name}</h3>
                <h5>${data[0].fried_rice.item[i].description}</h5>
                <button class="button" id="cart_fried_rice_${i}" onclick="cart('fried_rice','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_fried_rice_${i}" onclick="like('fried_rice','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_fried_rice_${i}" onclick="dislike('fried_rice','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].fried_rice.item[i].img == ""){
            $(`#img_fried_rice_${i}`).html("no image");
            $(`#img_fried_rice_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_fried_rice_${i}`).css("color","#FF2525");
            $(`#img_fried_rice_${i}`).css("text-align","center");
        }
    }
     for(i=0; i < data[0].specials.item.length; i++){
        $("#specials").append(`
        <div class="details">
        <table style="vertical-align:top;">
        <tr>
        <td style="width:30%;">
        <div class="img" id="img_specials_${i}" style="background:url('${data[0].specials.item[i].img}') center center;">
        </td>
        <td style="width:70%;">
        <div class="info">
                <h3>${data[0].specials.item[i].name}<span>${data[0].specials.item[i].price}</span></h3>
                <h5>${data[0].specials.item[i].description}</h5>
                <button class="button" id="cart_specials_${i}" onclick="cart('specials','${i}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                <button class="heart" id="like_specials_${i}" onclick="like('specials','${i}')"><i class="far fa-heart"></i></button>
                <button class="unheart" id="dislike_specials_${i}" onclick="dislike('specials','${i}')"><i class="fas fa-heart"></i></button>
            </div>
        </td>
        </tr>
        </table>
        </div>`);
        if(data[0].specials.item[i].img == ""){
            $(`#img_specials_${i}`).html("no image");
            $(`#img_specials_${i}`).css("background","rgb(250, 250, 250)");
            $(`#img_specials_${i}`).css("color","#FF2525");
            $(`#img_specials_${i}`).css("text-align","center");
        }
    }
    for(i=0;i < data[0].side.item.length;i++){
        if(i%2 == 0){
            $("#side2").append(`
            <td style="width:25%">
                <div class="info">
                    <h3>${data[0].side.item[i].name}</h3>
                    <h4>${data[0].side.item[i].price}</h4>
                </div>
            </td>
            `);
        }else{
        $("#side1").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].side.item[i].name}</h3>
                <h4>${data[0].side.item[i].price}</h4>
            </div>
        </td>
        `);
        }
    }
    for(i=0;i < data[0].desserts.item.length;i++){
        $("#desserts").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].desserts.item[i].name}</h3>
                <h4>${data[0].desserts.item[i].price}</h4>
            </div>
        </td>
        `);
    }
    for(i=0;i < data[0].drinks.item.length;i++){
        if(i < 4){
            $("#drinks1").append(`
            <td style="width:25%">
                <div class="info">
                    <h3>${data[0].drinks.item[i].name}</h3>
                    <h4>${data[0].drinks.item[i].price}</h4>
                </div>
            </td>
            `);
        }else if(i > 4 && i <= 8){
        $("#drinks2").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].drinks.item[i].name}</h3>
                <h4>${data[0].drinks.item[i].price}</h4>
            </div>
        </td>
        `);
        }else{
        $("#drinks3").append(`
        <td style="width:25%">
            <div class="info">
                <h3>${data[0].drinks.item[i].name}</h3>
                <h4>${data[0].drinks.item[i].price}</h4>
            </div>
        </td>
        `);
        }
    }
});

function like(category,id) {
    var data = [];
    data.push({
      food_id: id,
      category_of_food: category,
      time: new Date().getTime()
    });
    var old = localStorage.getItem("likes");
    var oldData = JSON.parse(old);
    if (oldData) {
      for (var i = 0; i < oldData.length; i++) {
        data.push(oldData[i]);
      }
    }
    localStorage.setItem("likes", JSON.stringify(data));
    $(`#like_${category}_${id}`).css("display","none");
    $(`#dislike_${category}_${id}`).css("display","inline");
    $(`#dislike_${category}_${id}`).addClass("animated bounceIn");
    setTimeout(function(){
        $(`#dislike_${category}_${id}`).removeClass("animated bounceIn");
    },800);
    showlike();
}

function cart(category,id) {
    var data = [];
    data.push({
      food_id: id,
      category_of_food: category,
      time: new Date().getTime()
    });
    var old = localStorage.getItem("cart");
    var oldData = JSON.parse(old);
    if (oldData) {
      for (var i = 0; i < oldData.length; i++) {
        data.push(oldData[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(data));
    var count = $('.cart').html();
    $('.cart').html(Number(count)+1);
    $(`#cart_${category}_${id}`).addClass("animated pulse");
    $(`#cart_${category}_${id}`).html("Added That &nbsp;<i class='fas fa-cart-plus'></i>");
    $(`#cart_${category}_${id}`).attr("onclick","");
    $(`#fav_cart_${category}_${id}`).addClass("animated pulse");
    $(`#fav_cart_${category}_${id}`).html("Added That &nbsp;<i class='fas fa-cart-plus'></i>");
    $(`#fav_cart_${category}_${id}`).attr("onclick","");
    setTimeout(function(){
        $(`#cart_${category}_${id}`).removeClass("animated pulse");
        $(`#fav_cart_${category}_${id}`).removeClass("animated pulse");
    },800);
}

function dislike(category,id) {
    var item = JSON.parse(localStorage.getItem("likes"));
    for (var i = 0; i < item.length; i++) {
      if (item[i].food_id == id && item[i].category_of_food == category) {
        item.splice(i, 1);
        break;
      }
    }
    var item = JSON.stringify(item);
    localStorage.setItem("likes", item);
    $(`#dislike_${category}_${id}`).css("display","none");
    $(`#like_${category}_${id}`).css("display","inline");
    $(`#like_${category}_${id}`).addClass("animated bounceIn");
    setTimeout(function(){
        $(`#like_${category}_${id}`).removeClass("animated bounceIn");
    },800)
    showlike();
}

function showcart(){
    $("#cart_items").css("display","inline");
    $("#cart_items").addClass("animated fadeIn");
    setTimeout(function(){
        $("#cart_items").removeClass("animated fadeIn");
    },900);
    var data = localStorage.getItem("cart");
    data = JSON.parse(data);
    if(data && data != null){
        if(data.length == 0){
            $("#cart_table").html("<h3>nothing to see here :)</h3>");
            return;
        }
    $.getJSON("menu.json", function(menu) {
        $("#cart_table").html(`
            <tr>
                <th style="width:5% !important;"></th>
                <th style="width:10% !important;"></th>
                <th style="width:30% !important;">Name</th>
                <th style="width:10% !important;">Price</th>
                <th style="width:30% !important;">Quantity</th>
                <th style="width:15% !important;">Total</th>
            </tr>
        `);
        $("#hide_when_alone").css("display","inline");
      for (var i = 0; i < data.length; i++) {
          $.each(menu, function(z, v){
              if(data[i].category_of_food == "appetizers"){
                  var price = v[data[i].category_of_food][0].item[data[i].food_id].price;
                    if(!v[data[i].category_of_food][0].item[data[i].food_id].price){
                        price = "$0";
                    }
                    var initial_total = $("#total_for_everything").html();
                    initial_total = initial_total.substr(1);
                    var fake_price = price.substr(1);
                    var actual_total = parseFloat(initial_total) + parseFloat(fake_price);
                    $("#total_for_everything").html("$"+actual_total);
                    $("#cart_table").append(`
                    <tr id="tr_${data[i].category_of_food}_${data[i].food_id}">
                    <td style="width:5%;" onclick="deletefromcart('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="far fa-trash-alt"></i></td>
                        <td style="width:10%;">
                            <div class="cartimg" id="img_${data[i].category_of_food}_${data[i].food_id}" style="background:url('${v[data[i].category_of_food][0].item[data[i].food_id].img}') center center;">
                        </td>
                        <td style="width:30%;">
                            <h3>${v[data[i].category_of_food][0].item[data[i].food_id].name}</h3>
                        </td>
                        <td style="width:20%;">
                            ${price}
                        </td>
                        <td style="width:30%;">
                        <button class="button" onclick="minus('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="fas fa-minus"></i></button>
                        <span id="quantity_${data[i].category_of_food}_${data[i].food_id}">1</span>
                        <button class="button" onclick="add('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="fas fa-plus"></i></button>
                        </td>
                        <td style="width:15%;" id="total_${data[i].category_of_food}_${data[i].food_id}">
                            ${price}
                        </td>
                    </tr>
                    `);
                    if(!v[data[i].category_of_food][0].item[data[i].food_id].img){
                        $(`#img_${data[i].category_of_food}_${data[i].food_id}`).html("no image");
                        $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("background","rgb(250, 250, 250)");
                        $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("color","#FF2525");
                        $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("text-align","center");
                    }
              }else{
                var price = v[data[i].category_of_food].item[data[i].food_id].price;
                if(!v[data[i].category_of_food].item[data[i].food_id].price){
                    price = "$0";
                }
                var initial_total = $("#total_for_everything").html();
                initial_total = initial_total.substr(1);
                var fake_price = price.substr(1);
                var actual_total = parseFloat(initial_total) + parseFloat(fake_price);
                $("#total_for_everything").html("$"+actual_total);
                $("#cart_table").append(`
                <tr id="tr_${data[i].category_of_food}_${data[i].food_id}">
                <td style="width:5%;" onclick="deletefromcart('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="far fa-trash-alt"></i></td>
                    <td style="width:10%;">
                        <div class="cartimg" id="img_${data[i].category_of_food}_${data[i].food_id}" style="background:url('${v[data[i].category_of_food].item[data[i].food_id].img}') center center;">
                    </td>
                    <td style="width:30%;">
                        <h3>${v[data[i].category_of_food].item[data[i].food_id].name}</h3>
                    </td>
                    <td style="width:10%;">
                        ${price}
                    </td>
                    <td style="width:30%;">
                    <button class="button" onclick="minus('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="fas fa-minus"></i></button>
                    <span id="quantity_${data[i].category_of_food}_${data[i].food_id}">1</span>
                    <button class="button" onclick="add('${data[i].category_of_food}','${data[i].food_id}','${price}')"><i class="fas fa-plus"></i></button>
                    </td>
                    <td style="width:15%;" id="total_${data[i].category_of_food}_${data[i].food_id}">
                        ${price}
                    </td>
                </tr>
                `);
                if(!v[data[i].category_of_food].item[data[i].food_id].img){
                    $(`#img_${data[i].category_of_food}_${data[i].food_id}`).html("no image");
                    $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("background","rgb(250, 250, 250)");
                    $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("color","#FF2525");
                    $(`#img_${data[i].category_of_food}_${data[i].food_id}`).css("text-align","center");
                }
              }
            });
      }
     });
    }else{
        $("#cart_table").html("<h3>nothing to see here :)</h3>");
        $("#hide_when_alone").css("display","none");
    }
}

function hidecart() {
    $("#cart_items").addClass("animated fadeOut");
    $("#ok").html("")
    setTimeout(function(){
        $("#cart_items").removeClass("animated fadeOut");
        $("#cart_items").css("display","none");
        $("#cart_table").html("<h3>nothing to see here :)</h3>");
        $("#hide_when_alone").css("display","none");
        $("#total_for_everything").html("$0");
        $("#cart_table").css("display","table");
    },900);
}

function deletefromcart(category,id,price){
    if(!price){
        price = "$0";
    }
    var quantity = $(`#quantity_${category}_${id}`).html();
    var actual_total = $("#total_for_everything").html();
    var not_total = Number(quantity) * parseFloat(price.substr(1));
    var deleted_total = parseFloat(actual_total.substr(1)) - parseFloat(not_total);
    $("#total_for_everything").html("$"+deleted_total);
    var data = JSON.parse(localStorage.getItem("cart"));
    for (var i = 0; i < data.length; i++) {
      if (data[i].food_id == id && data[i].category_of_food == category) {
        data.splice(i, 1);
        break;
      }
    }
    var newdata = JSON.stringify(data);
    localStorage.setItem("cart", newdata);
    $(`#tr_${category}_${id}`).addClass("animated fadeOut");
    setTimeout(function(){
        $(`#tr_${category}_${id}`).removeClass("animated fadeOut");
        $(`#tr_${category}_${id}`).css("display", "none");
    },800);
    $(`#cart_${category}_${id}`).attr("onclick",`cart('${category}','${id}')`);
    $(`#cart_${category}_${id}`).html('Add to Cart &nbsp;<i class="fas fa-cart-plus"></i>');
    var count = $('.cart').html();
    $('.cart').html(Number(count)-1);
    if(data && data != null){
        if(data.length == 0){
            $("#cart_table").html("<h3>nothing to see here :)</h3>");
            $("#hide_when_alone").css("display","none");
            $("#total_for_everything").html("$0");
            return;
        }
    }
}

function add(category,id,price){
    var never_changing_price = price.substr(1);
    var initial_value = $(`#quantity_${category}_${id}`).html();
    var added_value = Number(initial_value) + 1;
    $(`#quantity_${category}_${id}`).html(added_value);
    price = price.substr(1);
    var initial_total = $("#total_for_everything").html();
    initial_total = parseFloat(initial_total.substr(1));
    price = Number(price)*added_value;
    var actual_total = parseFloat(initial_total + price) - Number(never_changing_price*initial_value);
    $("#total_for_everything").html("$"+actual_total);
    $(`#total_${category}_${id}`).html("$"+price);
}

function minus(category,id,price){
    var never_changing_price = price.substr(1);
    var initial_value = $(`#quantity_${category}_${id}`).html();
    var minus_value = Number(initial_value) - 1;
    if(minus_value <= 0) {
        return;
    }
    var initial_total = $("#total_for_everything").html();
    initial_total = parseFloat(initial_total.substr(1));
    $(`#quantity_${category}_${id}`).html(minus_value);
    price = price.substr(1);
    price = Number(price)*minus_value;
    var actual_total = parseFloat(initial_total + price) - Number(never_changing_price*initial_value);
    $("#total_for_everything").html("$"+actual_total);
    $(`#total_${category}_${id}`).html("$"+price);
}

function showlike() {
    $("#favourite").html("");
    var data = localStorage.getItem("likes");
    data = JSON.parse(data);
    if(data && data != null){
        if(data.length == 0){
            $("#likes").css("display","none");
            return;
        }
    $.getJSON("menu.json", function(menu) {
      for (var i = 0; i < data.length; i++) {
          $.each(menu, function(z, v){
              if(data[i].category_of_food == "appetizers"){
                  var price = v[data[i].category_of_food][0].item[data[i].food_id].price;
                    if(!v[data[i].category_of_food][0].item[data[i].food_id].price){
                        price = "$0";
                    }
                    $("#favourite").append(`
                    <div class="details">
                    <table>
                    <tr>
                    <td style="width:30%;">
                    <div class="img" id="fav_img_${data[i].category_of_food}_${data[i].food_id}" style="background:url('${v[data[i].category_of_food][0].item[data[i].food_id].img}') center center;">
                    </td>
                    <td style="width:70%;vertical-align:top;">
                    <div class="info">
                            <h3>${v[data[i].category_of_food][0].item[data[i].food_id].name} <span>${price}</span></h3>
                            <h5>${v[data[i].category_of_food][0].item[data[i].food_id].description}</h5>
                            <button class="button" id="fav_cart_${data[i].category_of_food}_${data[i].food_id}" onclick="cart('${data[i].category_of_food}','${data[i].food_id}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                        </div>
                    </td>
                    </tr>
                    </table>
                    </div>`);
                    if(!v[data[i].category_of_food][0].item[data[i].food_id].img){
                        $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).html("no image");
                        $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("background","rgb(250, 250, 250)");
                        $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("color","#FF2525");
                        $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("text-align","center");
                    }
              }else{
                var price = v[fav[i].category_of_food].item[fav[i].food_id].price;
                if(!v[fav[i].category_of_food].item[fav[i].food_id].price){
                    price = "$0";
                }
                $("#favourite").append(`
                <div class="details">
                <table>
                <tr>
                <td style="width:30%;">
                <div class="img" id="fav_img_${data[i].category_of_food}_${data[i].food_id}" style="background:url('${!v[fav[i].category_of_food].item[fav[i].food_id].img}') center center;">
                </td>
                <td style="width:70%;vertical-align:top;">
                <div class="info">
                        <h3>${!v[fav[i].category_of_food].item[fav[i].food_id].name} <span>${price}</span></h3>
                        <h5>${!v[fav[i].category_of_food].item[fav[i].food_id].description}</h5>
                        <button class="button" id="fav_cart_${data[i].category_of_food}_${data[i].food_id}" onclick="cart('${data[i].category_of_food}','${data[i].food_id}')">Add to Cart &nbsp;<i class="fas fa-cart-plus"></i></button>
                    </div>
                </td>
                </tr>
                </table>
                </div>`);
                if(!v[data[i].category_of_food].item[data[i].food_id].img){
                    $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).html("no image");
                    $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("background","rgb(250, 250, 250)");
                    $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("color","#FF2525");
                    $(`#fav_img_${data[i].category_of_food}_${data[i].food_id}`).css("text-align","center");
                }
              }
            });
      }
     });
     $("#likes").css("display","inherit");
    }else{
        $("#likes").css("display","none");
    }
}

function darkmode(){
    var dark = localStorage.getItem("darkMode");
    dark = JSON.parse(dark);
        if(dark[0].dark == true){
            $(".cog").html('<i class="fas fa-sun"></i>');
            $('body').css("color","#fff");
            $('body').css("background","#0f0f0f");
            $('#reserve').css("background","#141414");
            $('#topThingy').css("background","#0f0f0f");
            $('#bottomThingy').css("background","#0f0f0f");
            $('#reserve input').css("border","2px solid #fff");
            $('#reserve select').css("border","2px solid #fff");
            $('#reserve select').css("color","#fff");
            $('#spinner').css("border-bottom","14px solid #0f0f0f");
    }else {
        $(".cog").html('<i class="far fa-moon"></i>');
        $('body').css("color","#000");
        $('body').css("background","#fff");
        $('#reserve').css("background","#fff");
        $('#topThingy').css("background","#fff");
        $('#bottomThingy').css("background","#fff");
        $('#reserve input').css("border","2px solid #000");
        $('#reserve select').css("border","2px solid #000");
        $('#reserve select').css("color","#000");
        $('#spinner').css("border-bottom","14px solid #fff");
    }
}

function disappear(){
    localStorage.setItem("tip","disappear");
    $("#changetheme").addClass("animated fadeOut");
    setTimeout(function(){
        $("#changetheme").removeClass("animated fadeOut");
        $("#changetheme").css("display","none");
    },800);
}

$(document).ready(function(){
    if(localStorage.getItem("tip")){
        $("#changetheme").css("display","none");
    }
    if(!localStorage.getItem("darkMode")){
    localStorage.setItem("darkMode",JSON.stringify([{"dark":false}]));
    }
    if(!localStorage.getItem("username")){
        $("#reserve_container").css("display","flex");
        $("#for_username").css("display","inline-block");
        $("#for_res").css("display","none");
    }
    var data = localStorage.getItem("likes");
    data = JSON.parse(data);
    if(data){
      for (var i = 0; i < data.length; i++) {
        $(`#like_${data[i].category_of_food}_${data[i].food_id}`).css("display","none");
        $(`#dislike_${data[i].category_of_food}_${data[i].food_id}`).css("display","inline");
      }
    }
    darkmode();
    showlike();
    $("a").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          var scrollTo = $(hash).offset().top;
          $('body,html').animate({
          scrollTop: scrollTo
          }, 1500, function(){
          window.scrollTo(0,$(hash).offset().top-140);
          window.location.hash = hash;
         });
        } 
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if(user){

    }else{
        firebase.auth().signInAnonymously();
    }
});

var db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

function reserve(){
    var user = firebase.auth().currentUser;
    var date_hmm = $("#date_reserve").val();
    var time_hmm = $("#time_reserve").val();
    var people_hmm = $("#people_reserve").val();
    if(!date_hmm || !time_hmm || !people_hmm) {
        $("#reserve").removeClass("animated zoomIn");
        $("#reserve").css("animation-delay","0s");
        $("#reserve").addClass("animated shake");
        return;
    }
    $("#reserve_container").css("display", "flex");
    $("#reserve_container").addClass("animated fadeIn");
    setTimeout(function(){
        $("#reserve_container").removeClass("animated fadeIn");
            db.collection("reserve").doc().set({
                uid: user.uid,
                username: localStorage.getItem("username"),
                date_for_reserve: date_hmm,
                time_for_reserve: time_hmm,
                people_for_reserve: people_hmm,
                time: new Date().getTime()
            }).then(function(){
                $("#check").css("display","none");
                $("#yes").css("display","inline-block");
                $("#done").html(`Booked one table for ${people_hmm} people for ${date_hmm} @ ${time_hmm}`);
            }).catch(function(err){
                console.log(err);
            });
    },800);
}

function close_reserve(){
    $("#reserve_container").addClass("animated fadeOut");
    setTimeout(function(){
        $("#reserve_container").removeClass("animated fadeOut");
        $("#reserve_container").css("display", "none");
        $("#yes").css("display", "none");
        $("#check").css("display", "inherit");
    },800);
}

$("#continue").click(function(){
    const username = $("#username").val();
    const address = $("#address").val();
    if(!username || !address){
        $("#errorSignIn").html("empty field");
        return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("address", address);
    $("#reserve_container").addClass("animated fadeOut");
    setTimeout(function(){
        $("#for_username").css("display","none");
        $("#for_res").css("display","inline-block");
        $("#reserve_container").css("display","none");
        $("#reserve_container").removeClass("animated fadeOut");
    },800);
})

function checkOUT(){
    var foodJSON = [];
    var data = localStorage.getItem("cart");
    data = JSON.parse(data);
        $.getJSON("menu.json", function(menu) {
            for (var i = 0; i < data.length; i++) {
                $.each(menu, function(z, v){
                    if(data[i].category_of_food == "appetizers"){
                        var price = v[data[i].category_of_food][0].item[data[i].food_id].price;
                        if(!v[data[i].category_of_food][0].item[data[i].food_id].price){
                        price = "$0";
                        }
                        foodJSON.push({name:v[data[i].category_of_food][0].item[data[i].food_id].name,quantity:$(`#quantity_${data[i].category_of_food}_${data[i].food_id}`).html()});
                        deletefromcart(data[i].category_of_food,data[i].food_id,price);
                    }else{
                        var price = v[data[i].category_of_food].item[data[i].food_id].price;
                        if(!v[data[i].category_of_food].item[data[i].food_id].price){
                        price = "$0";
                        }
                        foodJSON.push({name:v[data[i].category_of_food].item[data[i].food_id].name,quantity:$(`#quantity_${data[i].category_of_food}_${data[i].food_id}`).html()});
                        deletefromcart(data[i].category_of_food,data[i].food_id,price);
                    }
                });
            }
    var user = firebase.auth().currentUser;
    db.collection("order").doc().set({
        uid: user.uid,
        username: localStorage.getItem("username"),
        address: localStorage.getItem("address"),
        food: foodJSON,
        payment: "cash on delivery",
        time: new Date().getTime()
    }).then(function(){
        $(".cart").html("0");
        $("#cart_table").css("display","none");
        $("#hide_when_alone").css("display","none");
        localStorage.removeItem("cart");
        $("#ok").html(`<i class="far fa-smile"></i>&nbsp; Thank You for ordering food from Wild Tiger, Your Food will be delivered soon to ${localStorage.getItem("address")}`);
    }).catch(function(err){
        console.log(err);
    });
    });
}

$("#menu_a a").click(function(){
    hideMenu();
});

function showmemenu(){
    $("#menu_a").css("display","flex");
    $("#menu_a").addClass("animated slideInLeft");
    setTimeout(function(){
        $("#menu_a").removeClass("animated slideInLeft");
    },800);
}
function hideMenu(){
    $("#menu_a").addClass("animated slideOutLeft");
    setTimeout(function(){
        $("#menu_a").css("display","none");
        $("#menu_a").removeClass("animated slideOutLeft");
    },800);
}