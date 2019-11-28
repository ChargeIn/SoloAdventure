
const run = 0;
const fight = 1;

/**
 * Object representing all information about the adventurer
 */
const adventurerObj = {
    x: 50, // size of the sprite
    y: 37,
    mode: [ // 0: Running 1:Fighting
        [8,9,10,11,12,13], // index of the running sprites
        [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59] // index of the fighting sprites
    ],
    mapWidth: 7 // number of sprites per row
};

const zombieObj = {
    x: 50,
    y: 37
};

const main_screen = {
  floor:  canvas.height -10 -adventurerObj.x,
  middle: canvas.width/2
};

let adventurer = new sprite("res/adventurer/adventurer-Sheet.png", adventurerObj.x, adventurerObj.y, adventurerObj.mapWidth);

window.requestAnimationFrame(step);
let lastCall = null;

function step(timestamp){
    let progress = timestamp -lastCall;
    if (progress > 100 ) {
        adventurer.drawAnimation(main_screen.middle, main_screen.floor, adventurerObj.mode[run]);
        lastCall = timestamp;
    }
    window.requestAnimationFrame(step);
}

function go2google() {
    window.location.href="https://www.google.de"
}

// setInterval( function (){
//     adventurer.drawAnimation(100, 100,  runningIndex)
// }, 100);


/**
 *  Running animation
 */


/**
 * Cookie Section
 */

/**
 * Sets a cookie to save the current game-information
 */
function saveGame(exdays) {
    let d = new Date();
    d.setTime(d.currentTime + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = "cookie=save-game;" + expires+ ";path=/";
}

/**
 * Loads the right cookie
 * @param cname Name of the cookie
 * @returns {string}
 */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}