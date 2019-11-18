//let canvas = document.getElementById("main_canvas");
//canvas.width = window.innerWidth*0.75;
//canvas.height = window.innerHeight/3;

let dpi = window.devicePixelRatio;
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
    console.log(dpi);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}