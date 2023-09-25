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
    pos.push({ x: x, y: y, speedX: speedX, speedY: speedY });
}


// Array to store arc information
const arcs = [];

// Event listener for a click on the canvas
canvas.addEventListener('click', (event) => {
    // Generate a random number of arcs to create (between 5 and 10)
    const numForm = Math.floor(Math.random() * 10) + 5;
    const clickX = event.clientX;  // X coordinate of the click event
    const clickY = event.clientY;  // Y coordinate of the click event

    // Generate the specified number of arcs
    for (let i = 0; i < numForm; i++) {
        const randomNumber = Math.random();




        // Determine if the shape is an arc or a rectangle

        // Generate random radius and angle for the current arc
        const randomRadius = Math.random() * 30 + 10;
        const randomAngle = Math.random() * Math.PI * 2;

        // Calculate the position of the arc based on click position and random values
        const arcX = clickX + randomRadius * Math.cos(randomAngle);
        const arcY = clickY + randomRadius * Math.sin(randomAngle);

        // Generate a random color for the arc
        const arcColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        const randomGradientColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        // Store arc information in the arcs array
        arcs.push({
            x: arcX,
            y: arcY,
            radius: randomRadius,
            color: arcColor,
            randomColor: randomGradientColor,
            speedX: (Math.random() - 0.5) * 10, // Random speed in x
            speedY: (Math.random() - 0.5) * 10 // Random speed in y
        });

    }
});



function draw() {
    const arcDrawer = new ArcDrawer(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000";


    // Draw each arc and update its position
    for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        arc.x += arc.speedX;
        arc.y += arc.speedY;

        arcDrawer.arcMove(arc.x, arc.y, arc.radius, arc.color);

        // Remove arc from the array if it goes off-screen
        if (arc.x + arc.radius < 0 || arc.x - arc.radius > width || arc.y + arc.radius < 0 || arc.y - arc.radius > height) {
            arcs.splice(i, 1);
            i--;
        }
    }
















    for (const val of pos) {
        val.x += val.speedX;
        val.y += val.speedY;

        if (val.x >= width - radius || val.x <= radius) {
            val.speedX = -val.speedX;
        }
        if (val.y >= height - radius || val.y <= radius) {
            val.speedY = -val.speedY;
        }

        // Calculer la direction vers la souris
        let angle = Math.atan2(val.x - mouse.x, val.y - mouse.y);
        val.x += Math.cos(angle) * val.speedX + val.speedX;
        val.y += Math.sin(angle) * val.speedY + val.speedY;

        arcDrawer.arcMove(val.x, val.y, radius, "#ff0000");
    }

    requestAnimationFrame(draw);
}


// Class to draw arcs
class ArcDrawer {
    private ctx: CanvasRenderingContext2D;
    private piArc: number = Math.PI * 2;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    // Method to draw an arc
    public arcMove(x: number, y: number, radius: number, color: string) {

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, this.piArc);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
}


// Lancer l'animation
draw();
