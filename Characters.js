const run = 0;
const fight = 1;
const baseLife = 100;
const baseAttack = 1;
const baseSpeed = (canvas_w/2)/10; // with the base speed the adventurer should reach the enemy in 10 sec
const baseCrit = 0.1; // Base critical chance
const baseCritDMG = 1.5;
const baseAttackSpeed = 1;
const baseNumberOfEnemies = 1;
const critDMGMultiplier = 0.005;
const attackMultiplier = 1;
const attackSpeedMultiplier = 0.05;
const lifeMultiplier = 10;
const speedMultiplier = canvas_w/200;
const numberOfEnemiesMultiplier = 1;
const baseAnimationSpeed = 8; // how often the sprite should change each second
const animationSpeedMultiplier = 1;
const nCrit = 100; //Modifier for diminishing returns of the critical chance
const maxCrit = 0.5; // Max critical chance


//TODO magic
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
        this.animationSpeed = [baseAnimationSpeed, baseAnimationSpeed]; // one for each mode;
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
        if(this.animationCount >= this.animationSpeed[this.mode]){
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

    setAnimationSpeed(value, mode){
        this.animationSpeed[mode] = value;
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
        this.crit = 0.1; // critical strike chance
        this.critDMG = 1.5; // critical strike damage multiplier
        this.magic = 0;
        this.attackSpeed = 1;
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

    /**
     * Modifies a attribute of the adventurer
     * @param attr The attribute as string
     * @param value The value to add
     */
    modifyAttribute(attr, value) {
        switch (attr) {
            case "attack":
                this.attack = baseAttack +  attackMultiplier*value;
                break;
            case "critDMG":
                this.critDMG = baseCritDMG + critDMGMultiplier*value;
                break;
            case "crit":
                this.crit = baseCrit +  value/(value+ nCrit)*maxCrit;
                break;
            case "magic":
                this.magic = value;
                break;
            case "attackSpeed":
                this.attackSpeed = baseAttackSpeed + attackSpeedMultiplier*value;
                //increase animation speed as well
                this.sprite.setAnimationSpeed(baseAnimationSpeed/this.attackSpeed, fight);
                break;
            case "speed":
                this.sprite.setAnimationSpeed(baseAnimationSpeed - value*animationSpeedMultiplier);
                break;
            default:
                break;
        }
    }

    /**
     * Calculates the damage of the next attack
     */
    getAttack() {
        if (Math.random() > this.crit) return this.attack*this.attackSpeed*this.critDMG;
        return this.attack*this.attackSpeed;
    }

    /**
     * Calculates the dps of the adventurer
     */
    getDPS(){
        return (this.attack + this.crit*this.attack*this.critDMG)*this.attackSpeed;
    }
}

/**
 * Starter Enemy of the game
 * Walks till the adventurer is reached
 */
class Enemy extends Character{
    constructor(x,y, sprite, mode) {
        super(x,y, sprite, mode);
        this.hp = baseLife;
        this.maxHp = baseLife;
        this.speed = baseSpeed;
        this.numberOfEnemies = baseNumberOfEnemies;
    }

    update(damage) {
        if(damage === 0)  {
            this.x -= this.speed/fps;
        } else {
            this.hp -= damage/fps;
        }
    }

    /**
     * Resets the enemy
     */
    reset(){
        this.x = canvas_w + spawnOffset;
        this.hp = this.maxHp*this.numberOfEnemies;
    }


    /**
     * Modifies the max health of the enemy
     * @param attr the
     * @param value
     */
    modifyAttribute(attr, value) {
        switch (attr) {
            case "health":
                this.maxHp = baseLife + lifeMultiplier*value;
                break;
            case "speed":
                this.speed = baseSpeed +  speedMultiplier*value;
                break;
            case "numberOfEnemies":
                this.numberOfEnemies = baseNumberOfEnemies + numberOfEnemiesMultiplier*value;
                break;
            default:
                break;
        }
    }

    /**
     * Returns if the hitpoints of an enemy are less than zero
     * @returns {boolean} True is this.hp < 0
     */
    isDead() {
        return this.hp <= 0;
    }

    getLife() {
        return this.hp;
    }

    getSpeed(){
        return this.speed;
    }

    getMaxLife(){
        return this.maxHp*this.numberOfEnemies;
    }

    /**
     * Overwrite to draw the sprite as ofter as numberOfEnemies
     * Also varies the x coordinate each time
     */
    draw() {
        for (let i = 0; i < this.numberOfEnemies; i++){
            this.sprite.drawAnimation(this.x +i*Math.random()*this.numberOfEnemies, this.y+Math.random())
        }
    }

}



