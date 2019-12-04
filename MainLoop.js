/**
 * This Script represents the main game loop
 */
// We want to achieve 60 fps a sec
const fps = 60;
const timeStep = 1000 / fps;
const canvas_h = canvas.height;
const canvas_w = canvas.width;
const char_w = 90;
const char_h = 70;
const spawnOffset = char_w - 20;
const fightOffset = 50;
//TODO: Rework indexes of the sprites

class MainLoop {

    constructor() {
        this.lastUpdate = 0;
        this.repeat = false; // if the game loop should be repeated
        this.inFight = false;

        // create character
        this.adventurer = new Adventurer(main_screen.middle-char_w, main_screen.floor,
            new Sprite("res/adventurer/adventurer-Sheet.png",
                50, 37, char_w, char_h,7,
                [ // 0: Running 1:Fighting
                    [8, 9, 10, 11, 12, 13], // index of the running sprites
                    [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59] // index of the fighting sprites
                ], 0), 0);
        this.enemy = new Enemy(canvas_w - spawnOffset, main_screen.floor+10,
            new Sprite("res/undead sprite pack/undead_walk_sheet_flipped.png",
                56, 48, char_w, char_h, 20,
                [// 0: Running 1:Fighting
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], // index of running sprites
                    [] // has no fighting sprites
                ], 0), 0);

        this.background = new Background("res/cyberpunk-street-files/cyberpunk-street.png");
        this.background.start();

        // Setting up upgrades
        // TODO: Save and Load Upgrades form cookies


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
        if(this.inFight){
            this.adventurer.update(this.enemy.life);
            this.enemy.update(this.adventurer.attack);

            if(this.enemy.life < 0) {
                this.enemy.reset();
                this.inFight = false;
                this.background.start();
            }
        } else { // Not fighting

            //Test if adventurer is close enough to start a fight
            if (this.adventurer.x >= this.enemy.x - fightOffset) {
                this.background.stop();

                this.adventurer.update(this.enemy.getLife());
                this.enemy.update(this.adventurer.getAttack());

                if(this.enemy.isDead()) {
                    this.enemy.reset();
                    this.inFight = false;
                    this.background.start();
                }
            // Running
            } else {
                this.adventurer.update(0);
                this.enemy.update(0);
            }
        }
    };

    /**
     * Draws the game to the main canvas
     */
    draw() {
        this.background.draw();
        this.adventurer.draw();
        this.enemy.draw();
    };

    /**
     * Changes the attributes of the characters based on the given value
     * @param attribute The attribute which should be modified
     * @param value The value used for the increase/decrease of the attributes
     */
    modifyAttributes(attribute, value){
        switch (attribute) {
            case "speed":
                this.enemy.modifySpeed(value);
                this.background.increaseSpeed(value);
                break;
            case "health":
                this.enemy.modifyMaxHealth(value);
                break;
            default: //Attack
                this.adventurer.modifyAttack(value);
                break;
        }
    }

}