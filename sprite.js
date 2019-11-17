/**
 * Creates a new sprite with an integrated animation function
 * @param filename
 * @param block_w
 * @param block_h
 * @param indexes
 * @param mapWidth
 */
let sprite = function (filename, block_w, block_h, mapWidth) {

    let runAnimationIndex = 0;
    this.image = new Image();
    this.image.src = filename;
    this.runAnimationIndex = 0;
    this.sc = document.getElementById("main_canvas").getContext("2d");

    this.drawAnimation = function(x, y, indexes) {
        runAnimationIndex++;

        if(runAnimationIndex >= indexes.length)
            runAnimationIndex = 0;

        let [spriteX, spriteY] = i2xy(indexes[runAnimationIndex], mapWidth);
        this.sc.clearRect(0, 0, 1000, 1000);
        this.sc.drawImage(this.image, spriteX*block_w, spriteY*block_h, block_w, block_h, x, y, block_w, block_h)
    }
}

/**
 * Returns the x,y-position of the index in a sprite sheet
 * @param index the index of the tile
 * @param mapWidth the number of tiles in per row in the sprite sheet
 */
function i2xy(index, mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index/mapWidth);
    return [x,y];
}

/**
 * Gives the index of a x,y-postion of a tile in a sprite sheet
 * @param x column of the tile
 * @param y row of the tile
 * @param mapWidth the number of tiles in per row in the sprite sheet
 */
function xy2i(x, y, mapWidth){
    return y * mapWidth + x;
}