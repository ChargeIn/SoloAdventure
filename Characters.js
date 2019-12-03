const run = 0;
const fight = 1;
const baseLife = 100;
const baseAttack = 100;
const baseSpeed = (canvas_w/2)/10; // with the base speed the adventurer should reach the enemy in 10 sec
const animationSpeed = 8; // Change sprites 10 time each second


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
        this.animationIndex = 0;
        this.animationCount = 0;
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
        if(this.animationCount >= animationSpeed){
            this.animationIndex++;
            this.animationCount=0;
        }
        this.animationCount++;

        if (this.animationIndex >= this.indexes[this.mode].length)
            this.animationIndex = 0;

        let [spriteX, spriteY] = this.i2xy(this.indexes[this.mode][this.animationIndex], this.mapWidth);
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
    }

    switchMode(mode){
        this.mode = mode;
        this.sprite.switchMode(mode);
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
    constructor(x,y, sprite, mode) {
        super(x,y, sprite, mode);
        this.attack = baseAttack;
    }

    /**
     * Updates the position of the character
     * Called once a frame
     * @param enemyHealth Health of the enemy, if 0 the character will run to the other side
     */
    update(enemyHealth) {
        if(this.mode === run) {
            if(enemyHealth > 0) this.switchMode(fight);
        } else {
            if (enemyHealth <= 0) this.switchMode(run);
        }
    }
}

/**
 * Starter Enemy of the game
 * Walks till the adventurer is reached
 */
class Enemy extends Character{
    constructor(x,y, sprite, mode) {
        super(x,y, sprite, mode);
        this.life = baseLife;
        this.speed = baseSpeed;
    }

    update(damage) {
        if(damage === 0)  {
            this.x -= this.speed/fps;
        } else {
            this.life -= damage/fps;
        }
    }

    /**
     * Resets the enemy
     */
    reset(){
        this.x = canvas_w + spawnOffset;
        this.life = baseLife;
    }


}



