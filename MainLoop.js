/**
 * This Script represents the main game loop
 */


// We want to achieve 60 fps a sec
const fps = 60;
const timeStep = 1000/fps;
let lastFPSUpdate = 0;
let lastUpdate = 0;


window.requestAnimationFrame(loop);

/**
 * loop is called every animation frame
 * @param timestamp
 */
function loop(timestamp) {
    let timePastFPS = timestamp - lastFPSUpdate;
    let timePast = timestamp - lastUpdate;

    //update the game based on the past time


    //update the animation
    if(timePastFPS > timeStep){
        //draw animation
    }

    requestAnimationFrame(loop);
};