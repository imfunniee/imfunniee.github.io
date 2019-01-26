window.onscroll = function(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.style.backgroundSize = "150% auto";
    }else{
        document.body.style.backgroundSize = "100% auto";
    }
};