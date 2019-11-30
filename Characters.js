const run = 0;
const fight = 1;


/**
 * Creates a new sprite with an integrated animation function
 * @param filename
 * @param block_w
 * @param block_h
 * @param mapWidth
 */
class Sprite {

    constructor(filename, block_w, block_h, width, height, mapWidth, indexes, mode) {

        this.image = new Image();
        this.image.src = filename;
        this.runAnimationIndex = 0;
        this.mapWidth = mapWidth;
        this.block_w = block_w;
        this.block_h = block_h;
        this.height = height;
        this.width = width;
        this.indexes = indexes; // Array of array containing the indexes for the animations
        this.mode = mode; // The index of the array which to use for the animation
        this.sc = document.getElementById("main_canvas").getContext("2d");
    }

    /**
     * Changes the animation of the sprite
     * @param mode
     */
    switchMode(mode){
        this.mode = mode;
    }

    /**
     * Draws the sprite to the main_canvas
     * @param x-Position where to draw the sprite at the canvas
     * @param y-Position on the canvas
     */
    drawAnimation(x, y) {
        this.runAnimationIndex++;

        if (this.runAnimationIndex >= this.indexes[this.mode].length)
            this.runAnimationIndex = 0;

        let [spriteX, spriteY] = this.i2xy(this.indexes[this.mode][this.runAnimationIndex], this.mapWidth);
        this.sc.drawImage(this.image, spriteX * this.block_w, spriteY * this.block_h,
            this.block_w, this.block_h, x, y-this.width, this.width, this.height)
    }


    /**
     * Returns the x,y-position of the index in a sprite sheet
     * @param index the index of the tile
     * @param mapWidth the number of tiles in per row in the sprite sheet
     */
    i2xy(index, mapWidth) {
        let x = index % mapWidth;
        let y = Math.floor(index / mapWidth);
        return [x, y];
    }

    /**
     * Gives the index of a x,y-postion of a tile in a sprite sheet
     * @param x column of the tile
     * @param y row of the tile
     * @param mapWidth the number of tiles in per row in the sprite sheet
     */
    xy2i(x, y, mapWidth) {
        return y * mapWidth + x;
    }
}

/**
 * Represents the character
 */
class Character{
    /**
     * @param x-Postion of the character
     * @param y-Position of the character
     * @param sprite sprite-class of the character
     * @param mode The current animation mode
     * @param speed How fast the character can run
     */
    constructor(x,y, sprite, mode, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.mode = mode;
        this.speed = speed;
    }

    /**
     * draws the sprite
     */
    draw(){
        this.sprite.drawAnimation(this.x, this.y)
    }

    /**
     * Update the position of the character based on his animation
     */
    update(){}
}

/**
 * Main character of the game
 * Animation: Runs till the cap is reached and starts attacking
 */
class Adventurer extends Character{
    constructor(x,y, sprite, mode, speed) {
        super(x,y, sprite, mode, speed);
        this.run = true;
        this.stop = 0;
        this.end = 100;
    }

    /**
     * Updates the position of the character
     * Called once a frame
     * @param enemyHealth Health of the enemy, if 0 the character will run to the other side
     */
    update(enemyHealth) {
        if(this.run) {
            this.stop += this.speed;
            if(this.stop > this.end){
                this.run = false;
                this.sprite.switchMode(fight);
                this.stop = 0;
            }
        } else {
            if (enemyHealth <= 0) {
                this.run = true;
                this.sprite.switchMode(run);
            }
        }
    }
}

/**
 * Starter Enemy of the game
 * Stands still till the adventurer is reached
 */
class Zombie extends Character{
    constructor(x,y, sprite, mode, speed) {
        super(x,y, sprite, mode, speed);
    }

    update(speed) {
        this.x -= speed;
    }
}



