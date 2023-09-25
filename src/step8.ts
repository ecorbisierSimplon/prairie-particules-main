import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const mouse = { x: 0, y: 0 };

// Update mouse coordinates when it moves
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
// Array to store arc information
const arcs = [];
// Array to store shapes (arcs and rectangles)
const shapes = [];
// Array to star
const stars = [];

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

if (randomNumber < 1 / 3) {
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
        } else if (randomNumber < 2 / 3) {
            // Generate random properties for the rectangle
            const randomWidth = Math.random() * 20 + 10;
            const randomHeight = randomWidth*16/9;
            const randomRotation = Math.random() * Math.PI * 2;
            const randomRadius = Math.random() * 30 + 10;
            const randomAngle = Math.random() * Math.PI * 2;

            // Calculate the position of the arc based on click position and random values
            const shapeX = clickX + randomRadius * Math.cos(randomAngle);
            const shapeY = clickY + randomRadius * Math.sin(randomAngle);
            // Generate a random color for the arc
            const shapesColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            const randomGradientColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;

            // Generate speed rotation
            const rotationSpeed = (Math.random() - 0.5) * 0.1;  // Adjust the multiplier for desired rotation speed


            // Add the rectangle to the shapes array
            shapes.push({
                x: shapeX,
                y: shapeY,
                width: randomWidth,
                height: randomHeight,
                color: shapesColor,                
                randomColor: randomGradientColor,
                rotation: randomRotation, 
                rotationSpeed: rotationSpeed,               
                speedX: (Math.random() - 0.5) * 10, // Random speed in x
                speedY: (Math.random() - 0.5) * 10 // Random speed in y
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
            // Generate a random color for the arc
            const starColor = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
            

            stars.push({
                x: starX,
                y: starY,
                size: randomSize,               
                color: starColor,
                spikes: randomSpikes,                
                speedX: (Math.random() - 0.5) * 10, // Random speed in x
                speedY: (Math.random() - 0.5) * 10 // Random speed in y
            });
        } 
    }
});

const radius = 50;

let x = radius;
let y = radius;
let speedX = 2;
let speedY = speedX * height / width;

// Function to draw the animation
function draw() {
    // Clear the canvas by filling it with a black background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Create an instance of the ArcDrawer class to draw arcs
    const arcDrawer = new ArcDrawer(ctx);

    // Draw each arc and update its position
    for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        arc.x += arc.speedX;
        arc.y += arc.speedY;

        arcDrawer.arcMove(arc.x, arc.y, arc.radius, arc.color, arc.randomColor);

        // Remove arc from the array if it goes off-screen
        if (arc.x + arc.radius < 0 || arc.x - arc.radius > width || arc.y + arc.radius < 0 || arc.y - arc.radius > height) {
            arcs.splice(i, 1);
            i--;
        }
    }

    // Create an instance of the RandomRectDrawer class to draw rectangles
    const rectDrawer = new RandomRectDrawer(ctx);

    // Draw each rectangle and update its position
    for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += (Math.random()) * 0.1;  // Adjust the multiplier for desired rotation speed
                

        rectDrawer.drawRandomRect(shape.x, shape.y, shape.width, shape.height, shape.color, shape.randomColor, shape.rotation);

        // Restore the canvas rotation to its original state
        ctx.restore();

        // Remove rectangle from the array if it goes off-screen
        // (You may need to adjust the condition based on your requirements)
        if (shape.x + shape.width < 0 || shape.x > width || shape.y + shape.height < 0 || shape.y > height) {
            shapes.splice(i, 1);
            i--;
        }
    }


    // Create an instance of the RandomRectDrawer class to draw rectangles
    const starsDrawer = new RandomStarDrawer(ctx);

    // Draw each rectangle and update its position
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.speedX;
        star.y += star.speedY;


        starsDrawer.drawRandomStar(star.x, star.y, star.size, star.color, star.spikes);

        // Restore the canvas rotation to its original state
        ctx.restore();

        // Remove rectangle from the array if it goes off-screen
        // (You may need to adjust the condition based on your requirements)
        if (star.x + star.width < 0 || star.x > width || star.y + star.height < 0 || star.y > height) {
            stars.splice(i, 1);
            i--;
        }
    }


    // Update the main circle's position
    x += speedX;
    y += speedY;

    // Bounce off the walls when the main circle reaches the canvas boundaries
    if (x >= width - radius || x <= radius) {
        speedX = -speedX;
    }
    if (y >= height - radius || y <= radius) {
        speedY = -speedY;
    }

    // Calculate direction towards mouse and move the main circle
    const angle = Math.atan2(mouse.y - y, mouse.x - x);
    x += Math.cos(angle) * speedX;
    y += Math.sin(angle) * speedY;

    // Array of arc positions relative to the main circle
    const arcPositions = [
        [x, y],
        [width - x, height - y],
        [x, height - y],
        [width - x, y]
    ];

    // Draw arcs around the main circle using the positions array
    for (const position of arcPositions) {
        const [arcX, arcY] = position;
        arcDrawer.arcMove(arcX, arcY, radius, calculateColor(x, y), calculateColor(x, y));
    }

    // Request the next animation frame to continue the animation
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
    public arcMove(x: number, y: number, radius: number, color: string,  randomColor: string) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);  // Start color at the center
        gradient.addColorStop(1, randomColor);    // End color at the edge

        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, this.piArc);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
}

class RandomRectDrawer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    // Method to draw a randomly rotated rectangle with a gradient effect
    public drawRandomRect(x: number, y: number, width: number, height: number, color: string, gradientColor: string, angle: number) {
        // const angle = Math.random() * Math.PI * 2; // Random angle in radians

        this.ctx.save(); // Save the current state of the canvas
        this.ctx.translate(x, y); // Translate to the specified position
        this.ctx.rotate(angle); // Rotate by the random angle

        // Create a linear gradient from the top to the bottom of the rectangle
        const gradient = this.ctx.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2);
        gradient.addColorStop(0, color); // Start color (top of the rectangle)
        gradient.addColorStop(1, gradientColor); // End color (bottom of the rectangle)

        // Draw the rectangle filled with the gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-width / 2, -height / 2, width, height);

        this.ctx.restore(); // Restore the saved state to undo the translation and rotation
    }
}


class RandomStarDrawer {
    private ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    /**
     * Method to draw a randomly rotated star.
     * @param x - The x-coordinate of the center of the star.
     * @param y - The y-coordinate of the center of the star.
     * @param size - The size of the star.
     * @param color - The color of the star (in CSS color format).
     * @param spikes - The number of spikes the star will have.
     */
    public drawRandomStar(x: number, y: number, size: number, color: string, spikes: number) {
        // Calculate outer and inner radii for the star
        const outerRadius = size;
        const innerRadius = size / 2;

        this.ctx.save(); // Save the current state of the canvas
        this.ctx.translate(x, y); // Translate to the specified position

        this.ctx.beginPath();
        this.ctx.moveTo(0, -outerRadius); // Move to the starting point of the star

        // Loop to create the spikes of the star
        for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const xCoordinate = radius * Math.sin(angle);
            const yCoordinate = -radius * Math.cos(angle);
            this.ctx.lineTo(xCoordinate, yCoordinate); // Draw a line to the next point of the star
        }

        this.ctx.closePath(); // Close the path to complete the star shape
        this.ctx.fillStyle = color; // Set the fill color of the star
        this.ctx.fill(); // Fill the star shape with the specified color

        this.ctx.restore(); // Restore the saved state to undo the translation
    }
}


// Function to calculate the color based on position
function calculateColor(x: number, y: number): string {
    const red = Math.floor((x / width) * 255);  // Use x for the red component
    const green = Math.floor((y / height) * 255);  // Use y for the green component
    const blue = 0;  // Blue component remains fixed at 0

    return `rgb(${red},${green},${blue})`;
}

// Start the animation
draw();