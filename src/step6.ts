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
const speedX = 2;
const speedY = speedX * height / width;

const pos = [];
for (let i = 0; i < 4; i++) {
    let x = i % 2 === 0 ? radius : width - radius;
    let y = i < 2 ? radius : height - radius;
    pos.push({x: x, y:y,speedX: speedX, speedY: speedY});
  }

console.log(pos);


// let color = "#ff0000";

// RANDOM NUMBER OF COLORS (16 million) THEN CONVERT INTO HEXA
   

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000";

    for (const val of pos){
    val.x += val.speedX;
    val.y += val.speedY;
    
    if (val.x >= width - radius || val.x <= radius) {
        val.speedX = -val.speedX;
     }
    if (val.y >= height - radius || val.y <= radius) {
        val.speedY = -val.speedY;
    }

    // Calculer la direction vers la souris
    let angle = Math.atan2(val.x - mouse.x, val.y - mouse.y );
    val.x += Math.cos(angle) * val.speedX + val.speedX;
    val.y += Math.sin(angle) * val.speedY + val.speedY;

    arcMove(val.x, val.y);
    }

    requestAnimationFrame(draw);
}

function arcMove(x: number, y: number) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, piArc);
    ctx.fill();
}

// Lancer l'animation
draw();
