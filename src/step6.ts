import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const mouse = { x: 0, y: 0 };

// Mettez à jour les coordonnées de la souris lorsqu'elle se déplace
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Clears previous canvas content
ctx.clearRect(0, 0, width, height);

const radius = 20;
const piArc = Math.PI * 2;

let x = 20;
let y = 20;
let speedX = 2;
let speedY = speedX * height / width;
// let color = "#ff0000";

// RANDOM NUMBER OF COLORS (16 million) THEN CONVERT INTO HEXA
   

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    
    // color = "#" + Math.floor(Math.random()*numberColors).toString(16);
    x += speedX;
    y += speedY;
    
    if (x >= width - radius || x <= radius) {
        speedX = -speedX;
     }
    if (y >= height - radius || y <= radius) {
        speedY = -speedY;
    }

    ctx.fillStyle = "#ff0000";
    // Calculer la direction vers la souris
    const angle = Math.atan2(mouse.y - y, mouse.x - x);
    x += Math.cos(angle) * speedX;
    y += Math.sin(angle) * speedY;

    arcMove(x, y);
    arcMove(width - x, height - y);
    arcMove(x, height - y);
    arcMove(width - x, y);

    requestAnimationFrame(draw);
}

function arcMove(x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, piArc);
    ctx.fill();
}

// Lancer l'animation
draw();
