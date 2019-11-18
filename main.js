
// Object representing all information about the adventurer
const advObject = {
    x: 50, // size of the sprite
    y: 37,
    w: 20, // size of the draw
    h: 15,
    runningIndex: [8,9,10,11,12,13], // index of the running sprites
    mapWidth: 7 // number of sprites per row
};

const main_screen = {
  floor:  110,
  middle: 100
};

let adventurer = new sprite("res/Adventurer/adventurer-Sheet.png", advObject.x, advObject.y, advObject.mapWidth);

window.requestAnimationFrame(step);
let lastCall = null;

function step(timestamp){
    let progress = timestamp -lastCall;
    if (progress > 100 ) {
        adventurer.drawAnimation(main_screen.middle, main_screen.floor, advObject.runningIndex);
        lastCall = timestamp;
    }
    window.requestAnimationFrame(step);
}


// setInterval( function (){
//     adventurer.drawAnimation(100, 100,  runningIndex)
// }, 100);


