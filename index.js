const sticky = document.getElementById("sticky");
const hero = document.getElementById("hero");

function scrollHandler(e){
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollPos < 16) { // above hero bottom
        sticky.classList.remove(["translate-y-0"])
        sticky.classList.add(["-translate-y-full"])
    }
    else { // below hero bottom
        sticky.classList.remove(["-translate-y-full"])
    }
}

scrollHandler(); // Initial correction
window.onscroll = scrollHandler;