import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// Clears previous canvas content
ctx.clearRect(0, 0, width, height);

ctx.beginPath();
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);

ctx.fillStyle = "#ff0000"; // Red color for all circles
const radius = 20;
const piArc = Math.PI * 2;


// Preparing the loops for movement
let x = 20;
let y = 20;
let speedX = 5;
// Adapt the speed from y to x according to the width and height
let speedY = (speedX * (height+radius) / (width));

function draw() {
    // Clears previous canvas content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000"; 

    // Updates coordinates for diagonal movement
    x += speedX;
    y += speedY;
    if (x >= width-radius){
        x = radius;
        y = radius
    } 

    const diagonalCircles = [
        { x: x, y: radius },
        { x: width - x, y: height - radius },
        { x: radius, y: height - y },
        { x: width - radius, y: y }
      ];
      for (const circle of diagonalCircles) {
        arcMove(circle.x, circle.y);
      }



    // Request a new animation
    requestAnimationFrame(draw);
}

function arcMove(x: number,y: number){
    ctx.beginPath(); 
    ctx.arc(x, y, radius, 0, piArc);
    ctx.fill(); 
}
// Launch the animation
draw();
