// just querying the DOM...like a boss!
var links = document.querySelectorAll(".itemLinks");
var container = document.querySelector("#contentContainer");
var wrapper = document.querySelector("#contentWrapper");

// the activeLink provides a pointer to the currently displayed item
var activeLink = 0;
 
// setup the event listeners
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    link.addEventListener('click', setClickedItem, false);
 
    // identify the item for the activeLink
    link.itemID = i;
}
 
// set first item as active
links[activeLink].classList.add("active");
 
function setClickedItem(e) {

    removeActiveLinks();
    resetTimer();

    var clickedLink = e.target;
    activeLink = clickedLink.itemID;
 
    changePosition(clickedLink);
}
 
function removeActiveLinks() {
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
}
 
// Handle changing the slider position as well as ensure
// the correct link is highlighted as being active
function changePosition(link) {
    var index = link.getAttribute("data-pos");
    var containerWidth = container.offsetWidth;
    var position = (index*containerWidth)*-1;

    if( typeof wrapper.style.transform == 'string' ) {
        wrapper.style.transform = "translate3d(" + position + "px, 0px, 0)"; // a simple translate() does not work eg. on Android Stock Browser
    }
    else {
        wrapper.style.position = 'relative';
        wrapper.style.left = position + "px";    
    }
       
    link.classList.add("active");
}


//
// The code for sliding the content automatically
//
var timeoutID;
 
function startTimer() {
    // wait 3 seconds before calling goInactive
    timeoutID = window.setInterval(goToNextItem, 5000);
}
startTimer();
 
function resetTimer() {
    window.clearInterval(timeoutID);
    startTimer();
}
 
function goToNextItem() {
    removeActiveLinks();
 
    if (activeLink < links.length - 1) {
        activeLink++;
    } else {
        activeLink = 0;
    }
 
    var newLink = links[activeLink];
    changePosition(newLink);
}