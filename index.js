/**
 * Object representing all information about the adventurer
 * @type {{w: number, x: number, h: number, runningIndex: number[], y: number, mapWidth: number}}
 */
const adventurerObj = {
    x: 50, // size of the sprite
    y: 37,
    runningIndex: [8,9,10,11,12,13], // index of the running sprites
    mapWidth: 7 // number of sprites per row
};

const zombieObj = {
    x: 50,
    y: 37
};

const main_screen = {
  floor:  canvas.height -10,
  middle: canvas.width/2
};

let adventurer = new sprite("res/adventurer/adventurer-Sheet.png", adventurerObj.x, adventurerObj.y, adventurerObj.mapWidth);

window.requestAnimationFrame(step);
let lastCall = null;

function step(timestamp){
    let progress = timestamp -lastCall;
    if (progress > 100 ) {
        adventurer.drawAnimation(main_screen.middle, main_screen.floor, adventurerObj.runningIndex);
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

