/**
 * This Script represents the main game loop
 */
// We want to achieve 60 fps a sec
const fps = 10;
const timeStep = 1000 / fps;
const canvas_h = canvas.height;
const canvas_w = canvas.width;
const char_w = 90;
const char_h = 70;
const backgroundSpeed = 10;
//TODO: Rework indexes of the sprites

class MainLoop {

    constructor() {
        this.lastUpdate = 0;
        this.repeat = false; // if the game loop should be repeated
        this.sc = document.getElementById("main_canvas").getContext("2d");

        // create character
        this.adventurer = new Adventurer(main_screen.middle-char_w, main_screen.floor,
            new Sprite("res/adventurer/adventurer-Sheet.png",
                50, 37, char_w, char_h,7,
                [ // 0: Running 1:Fighting
                    [8, 9, 10, 11, 12, 13], // index of the running sprites
                    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59] // index of the fighting sprites
                ], 0), 0, 1);
        this.enemy = new Zombie(canvas_w - 50, main_screen.floor-10,
            new Sprite("res/undead sprite pack/undead_walk_sheet_flipped.png",
                56, 48, char_w, char_h, 20,
                [// 0: Running 1:Fighting
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], // index of running sprites
                    [] // has no fighting sprites
                ], 0), 0 , 10);

        this.background = new Background("res/cyberpunk-street-files/cyberpunk-street.png", backgroundSpeed);
        this.background.start();
    };

    /**
     * Starts the game loop
     */
    start () {
        window.requestAnimationFrame((timestamp) => this.loop(timestamp));
        this.repeat = true;
    };

    end () {
        this.repeat = false;
    };

    /**
     * main loop
     * called every animation-frame -> call time can vary depending on the load of the browser
     * @param timestamp
     */
    loop(timestamp) {
        let timePast = timestamp - this.lastUpdate;

        if (timePast > timeStep) {
            this.lastUpdate = timestamp;
            timePast = timePast / timeStep;

            for (let i = 1; i <= timePast; i++) {
                this.update();
            }
            this.draw();
        }
        if (this.repeat) requestAnimationFrame((timestamp) => this.loop(timestamp));
    };

    /**
     * Updates the game-logic at the rate of the fps
     */
    update() {
        this.adventurer.update(100);
        this.enemy.update();
    };

    /**
     * Draws the game to the main canvas
     */
    draw() {
        this.background.draw();
        this.adventurer.draw();
        this.enemy.draw();
    };

}