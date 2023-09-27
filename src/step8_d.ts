import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const radius = 50;
const piArc = Math.PI * 2;
const speedX = 2;
const speedY = speedX * height / width;

const pos: { x: number; y: number; speedX: number; speedY: number; }[] = [];
for (let i = 0; i < 4; i++) {
    let x = i % 2 === 0 ? radius : width - radius;
    let y = i < 2 ? radius : height - radius;
    pos.push({ x: x, y: y, speedX: speedX, speedY: speedY });
}


// Array to store arc information
const arcs: any[] = [];
const arcsTrail = [];
const shapes: {
    type: string; x: number; y: number; width: number; height: number; color: string; randomColor: string; rotation: number; rotationSpeed: number; speedX: number; // Random speed in x
    speedY: number; // Random speed in y
    speedAlpha: number; alpha: number;
}[] = [];
const shapesTrail: { x: number; y: number; width: number; height: number; color: string; randomColor: string; rotation: number; alpha: number; }[] = [];
const stars: any[] = [];

// Event listener for a mouse move on the canvas
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Event listener for a click on the canvas
canvas.addEventListener('click', (event) => {
    // Generate a random number of arcs to create (between 5 and 10)
    const numForm = Math.floor(Math.random() * 10) + 5;
    const clickX = event.clientX;  // X coordinate of the click event
    const clickY = event.clientY;  // Y coordinate of the click event

    // Generate the specified number of form
    for (let i = 0; i < numForm; i++) {
        const randomNumber = Math.random();

        const speedAlpha = Math.random() / 100;
            // Generate a random color for the arc
            const Color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            const randomGradientColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

        if (randomNumber < 1 / 3) {
            // Determine if the shape is an arc or a rectangle

            // Generate random radius and angle for the current arc
            const randomRadius = Math.random() * 30 + 10;
            const randomAngle = Math.random() * Math.PI * 2;

            // Calculate the position of the arc based on click position and random values
            const arcX = clickX + randomRadius * Math.cos(randomAngle);
            const arcY = clickY + randomRadius * Math.sin(randomAngle);


            // Store arc information in the arcs array
            arcs.push({
                type: "arc",
                x: arcX,
                y: arcY,
                radius: randomRadius,
                color: Color,
                randomColor: randomGradientColor,
                speedX: speed(), // Random speed in x
                speedY: speed(), // Random speed in y
                speedAlpha: speedAlpha,
                alpha: 1
            });

        } else if (randomNumber < 2 / 3) {
            // Generate random properties for the rectangle
            const randomWidth = Math.random() * 20 + 10;
            const randomHeight = randomWidth * 16 / 9;
            const randomRotation = Math.random() * Math.PI * 2;
            const randomRadius = Math.random() * 30 + 10;
            const randomAngle = Math.random() * Math.PI * 2;

            // Calculate the position of the arc based on click position and random values
            const shapeX = clickX + randomRadius * Math.cos(randomAngle);
            const shapeY = clickY + randomRadius * Math.sin(randomAngle);
  

            // Generate speed rotation
            const rotationSpeed = (Math.random() - 0.5) * 0.1;  // Adjust the multiplier for desired rotation speed


            // Add the rectangle to the shapes array
            shapes.push({
                type: "shape",
                x: shapeX,
                y: shapeY,
                width: randomWidth,
                height: randomHeight,
                color: Color,
                randomColor: randomGradientColor,
                rotation: randomRotation,
                rotationSpeed: rotationSpeed,
                speedX: speed(), // Random speed in x
                speedY: speed(), // Random speed in y
                speedAlpha: speedAlpha,
                alpha: 1
            });
        } else {
            // Generate random properties for the rectangle
            const randomSize = Math.random() * 20 + 10;
            const randomSpikes = Math.random() * 9 + 3;
            const randomRadius = Math.random() * 10 + 10;
            const randomAngle = Math.random() * Math.PI * 2;

            // Calculate the position of the arc based on click position and random values
            const starX = clickX + randomRadius * Math.cos(randomAngle);
            const starY = clickY + randomRadius * Math.sin(randomAngle);


            stars.push({
                type: "star",
                x: starX,
                y: starY,
                size: randomSize,
                color: Color,
                spikes: randomSpikes,
                speedX: speed(), // Random speed in x
                speedY: speed(), // Random speed in y
                speedAlpha: speedAlpha,
                alpha: 1
            });
        }

    }
});


function speed(){
    return (Math.random() - 0.5) * 10;
}


// Loop to draw on Canvas
function draw() {
    const formDrawer = new FormDrawer(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000";


    // Draw each arc and update its position
    for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        arc.x += arc.speedX;
        arc.y += arc.speedY;
        arc.alpha -= arc.speedAlpha;
        if (arc.alpha <= 0) {
            arc.alpha = 0;
        }

        formDrawer.drawArc(arc.x, arc.y, arc.radius, arc.color, arc.randomColor, arc.alpha);

        // Remove arc from the array if it goes off-screen
        if (arc.x + arc.radius < 0 || arc.x - arc.radius > width || arc.y + arc.radius < 0 || arc.y - arc.radius > height || arc.alpha <= 0) {
            arcs.splice(i, 1);
            i--;
        }
    }


    // Draw each rectangle and update its position
    const shapeDrawer = new ShapeDrawer(ctx);
    shapeDrawer.drawShapes(); // Call this to draw shapes and trails


    // Draw each star and update its position
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;
        star.alpha -= star.speedAlpha;
        if (star.alpha <= 0) {
            star.alpha = 0;
        }

        formDrawer.drawRandomStar(star.x, star.y, star.size, star.color, star.spikes, star.alpha);

        // Restore the canvas rotation to its original state
        ctx.restore();

        // Remove rectangle from the array if it goes off-screen
        // (You may need to adjust the condition based on your requirements)
        if (star.x + star.width < 0 || star.x > width || star.y + star.height < 0 || star.y > height) {
            stars.splice(i, 1);
            i--;
        }
    }


    let i: number = 0;
    let j: number = 0;
    for (const val of pos) {
        i++;
        j=0;
        val.x += val.speedX;
        val.y += val.speedY;

        if (val.x >= width - radius || val.x <= radius) {
            val.speedX = -val.speedX;
        }
        if (val.y >= height - radius || val.y <= radius) {
            val.speedY = -val.speedY;
        }
        for (const valObjet of pos) {
            j++;
            if (i != j) {
                if (detectCollisionArcs(val.x, val.y, radius, valObjet.x, valObjet.y, radius)){
                // console.log(i + ' == ' + j);
                val.speedX = -val.speedX;
                val.speedY = -val.speedY;
                }

            }
        }

        // Calculer la direction vers la souris
        let angle = Math.atan2(val.x - mouse.x, val.y - mouse.y);
        val.x += Math.cos(angle) * val.speedX + val.speedX;
        val.y += Math.sin(angle) * val.speedY + val.speedY;

        formDrawer.drawArc(val.x, val.y, radius, calculateColor(val.x, val.y), calculateColor(val.x, val.y), 1);
    }

    requestAnimationFrame(draw);
}
class FormDrawer {
    public ctx: CanvasRenderingContext2D; // Canvas rendering context
    private piArc: number; // Constant to store 2 * PI (full circle)

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.piArc = Math.PI * 2;
    }

    // Draw an arc with a color gradient
    public drawArc(x: number, y: number, radius: number, color: string, randomColor: string, alpha: number) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, randomColor);

        this.ctx.beginPath();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = gradient;
        this.ctx.arc(x, y, radius, 0, this.piArc);
        this.ctx.fill();
    }

    // Draw a rectangle with a color gradient and rotation
    public drawRandomRect(x: number, y: number, width: number, height: number, color: string, gradientColor: string, rotation: number, alpha: number) {
        this.ctx.save(); // Save the current transformation state
        this.ctx.translate(x, y); // Translate to the specified position
        this.ctx.rotate(rotation); // Rotate by the specified angle
        this.ctx.globalAlpha = alpha;
        const gradient = this.ctx.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, gradientColor);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-width / 2, -height / 2, width, height); // Draw the rectangle

        this.ctx.restore(); // Restore the previous transformation state
    }

    // Draw a star with a given number of spikes
    public drawRandomStar(x: number, y: number, size: number, color: string, spikes: number, alpha: number) {
        const outerRadius = size;
        const innerRadius = size / 2;

        this.ctx.save(); // Save the current transformation state
        this.ctx.translate(x, y); // Translate to the specified position
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -outerRadius);

        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const xCoordinate = radius * Math.sin(angle);
            const yCoordinate = -radius * Math.cos(angle);
            this.ctx.lineTo(xCoordinate, yCoordinate);
        }

        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill(); // Fill the star shape

        this.ctx.restore(); // Restore the previous transformation state
    }
}



class ShapeDrawer extends FormDrawer{
    
    updateTrailForShape(x: number, y: number, width: number, height: number, color: string, randomColor: string, rotation: number, alpha: number) {
        shapesTrail.push({ x, y, width, height, color, randomColor, rotation, alpha });
    }

    drawTrailForShape(x: number, y: number, width: number, height: number, color: string, randomColor: string, rotation: number, alpha: number) {
        this.drawRandomRect(x, y, width, height, color, randomColor, rotation, alpha);
    }

    drawShapes() {
        for (const shape of shapes) {
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            shape.alpha -= shape.speedAlpha;

            if (shape.alpha <= 0) {
                shape.alpha = 0;
            }

            this.updateTrailForShape(shape.x, shape.y, shape.width, shape.height, shape.color, shape.randomColor, shape.rotation, shape.alpha);
            
            this.drawRandomRect(shape.x, shape.y, shape.width, shape.height, shape.color, shape.randomColor, shape.rotation, shape.alpha);

            this.ctx.restore();

            if (shape.x + shape.width < 0 || shape.x > width || shape.y + shape.height < 0 || shape.y > height) {
                shapes.splice(shapes.indexOf(shape), 1);
            }
        }

        for (const trailShape of shapesTrail) {
            this.drawTrailForShape(trailShape.x, trailShape.y, trailShape.width, trailShape.height, trailShape.color, trailShape.randomColor, trailShape.rotation, trailShape.alpha);
            trailShape.alpha -= 0.01;

            if (trailShape.alpha <= 0) {
                shapesTrail.splice(shapesTrail.indexOf(trailShape), 1);
            }
        }
    }
}










function detectCollisionArcs(x1:number, y1:number, r1:number, x2:number, y2:number, r2:number) {
    // Calculez la distance entre les deux centres des arcs
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // Si la distance entre les centres est inférieure à la somme des rayons,
    // alors les arcs se chevauchent
    if (distance < r1 + r2) {
        return true; // Collision détectée
    }

    return false; // Pas de collision détectée
}


// Function to calculate the color based on position
function calculateColor(x: number, y: number): string {
    const red = Math.floor((x / width) * 255);  // Use x for the red component
    const green = Math.floor((y / height) * 255);  // Use y for the green component
    const blue = Math.floor(((x + y) / (width + height)) * 255);  // Blue component remains fixed at 0
    // console.log(`rgb(${red},${green},${blue})`);
    return `rgb(${red},${green},${blue})`;
}

// Lancer l'animation
draw();
