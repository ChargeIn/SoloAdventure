
// Animation of the adventurer running
const runningIndex = [8,9,10,11,12,13]; // Index of the sprites of running

let adventurer = new sprite("res/Adventurer/adventurer-Sheet.png", 50, 40, 7);


setInterval( function (){
    adventurer.drawAnimation(100, 100,  runningIndex)
}, 100);


