

let dpi = 1.1;//window.devicePixelRatio;
//get canvas
let canvas = document.getElementById('main_canvas');
//get context
let ctx = canvas.getContext('2d');
fix_dpi();

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//get CSS width
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//scale the canvas
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

/**
 * Creates an endless looped background
 */
class Background{
    constructor(imgFile) {
        this.img = new Image();
        this.img.src = imgFile;
        this.running = false;
        this.speed = baseSpeed;
        this.scroll = 0; // represents how far the background has scrolled
        this.sc = document.getElementById("main_canvas").getContext("2d");
    }

    /**
     * Starts the animation of the background
     */
    start(){
        this.running = true;
    }

    /**
     * Stops the animation of the background
     */
    stop(){
        this.running = false;
    }

    /**
     * Draws a repeating background
     */
    draw(){
        //image is not perfectly mirrored
        const offset = -570;
        const offset2 = -780;
        this.sc.drawImage(this.img, this.scroll, 0, canvas_w, canvas_h);
        this.sc.drawImage(this.img,canvas_w + offset + this.scroll,0, canvas_w, canvas_h);

        if (this.running){
            this.scroll -= this.speed/fps;
            if (this.scroll <= offset2) this.scroll = 0;
        }
    }
}