import "./style.css";

// On initialise le canvas
// Initialize the canvas
const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;
const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// On initialise les arcs principaux
// Initializes main arcs
const radius = 50;
const piArc = Math.PI * 2;
const speedX = 2;
const speedY = speedX * height / width;

// on crée et positionne les cercles  principaux
// create and position the main circles
const pos: { x: number; y: number; speedX: number; speedY: number; }[] = [];
for (let i = 0; i < 4; i++) {
    let x = i % 2 === 0 ? radius : width - radius;
    let y = i < 2 ? radius : height - radius;
    pos.push({ x: x, y: y, speedX: speedX, speedY: speedY });
}


// On définit les tableaux pour les formes
// defined arrays for shapes
const arcs: any[] = []; // les cercles // the arcs
const arcsTrail: any[] = []; // la trainée des cercles // the trail of circles

const shapes: any[] = []; // les rectangles // the rectangles
const shapesTrail: any[] = []; // la trainées des rectangles // the trail of rectangles

const stars: any[] = []; // les étoiles // the stars
const starsTrail: any[] = []; // la trainées des étoiles // the trail of the stars

// On écoute la position de la souris sur le canvas
// We listen to the mouse position on the canvas
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Evénement qui écoute le clique sur le canvas 
// Event listening to canvas click
canvas.addEventListener('click', (event) => {

    const clickX = event.clientX;  // X coordinate of the click event
    const clickY = event.clientY;  // Y coordinate of the click event

    // Génère entre 5 et 10 objet à chaque clique
    // Generates between 5 and 10 objects with each click
    const numForm = Math.round(Math.floor(Math.random() * 5) + 5);

    // Génère les form
    // Generates the shapes
    for (let i = 0; i < numForm; i++) {
        // Génère un nombre aléatoire pour définir si se sera un cercle, une étoile ou un rectangle
        // Generates a random number to define whether it will be a circle, star or rectangle
        const randomNumber = Math.random();

        // Génère la durée d'affichage de chaque forme 
        // Generates display duration for each shape
        const speedAlpha = Math.random() / 100;

        const Color = color(); // Génère une couleur aléatoire // Generate a random color

        const GradientColor = color(); // Génère une couleur alétoire pour le dégradé  // Generate a random color for gradient

        if (randomNumber < 1 / 3) {
            // randomNumber inférieur à 1/3 alors c'est un cercle
            // randomNumber less than 1/3 then it's a circle

            const randomRadius = Math.round(Math.random() * 30 + 10); // Génère le rayon // Generate the radius
            const randomAngle = Math.random() * piArc; // génère l'angle // Générates the angle

            // Calcul de la position de l'élément
            // Calculate element position
            const arcX = Math.round(clickX + randomRadius * Math.cos(randomAngle));
            const arcY = Math.round(clickY + randomRadius * Math.sin(randomAngle));


            // Ajoute le cercle au tableaux arcs
            // Add the circle to the arcs array
            arcs.push({
                type: "arc",
                x: arcX,
                y: arcY,
                radius: randomRadius,
                color: Color,
                randomColor: GradientColor,
                speedX: speed(), // Random speed in x
                speedY: speed(), // Random speed in y
                speedAlpha: speedAlpha,
                alpha: 1
            });

        } else if (randomNumber < 2 / 3) {
            // Genere les propriété du rectangle
            // Generates the rectangles's propriety
            const randomWidth = Math.round(Math.random() * 20 + 10);
            const randomHeight = Math.round(randomWidth * 16 / 9);
            const randomRotation = Math.round(Math.random() * piArc);
            const randomRadius = Math.random() * 30 + 10;
            const randomAngle = Math.random() * piArc;

            // Calcul de la position de l'élément
            // Calculate element position
            const shapeX = Math.round(clickX + randomRadius * Math.cos(randomAngle));
            const shapeY = Math.round(clickY + randomRadius * Math.sin(randomAngle));


            // Génère une rotation de l'objet
            // Generates rectangle rotations
            const rotationSpeed = (Math.random() - 0.5) * 0.1;

            // Ajoute le rectangle au tableau shapes
            // Add the rectangle to the array shapes
            shapes.push({
                type: "shape",
                x: shapeX,
                y: shapeY,
                width: randomWidth,
                height: randomHeight,
                color: Color,
                randomColor: GradientColor,
                rotation: randomRotation,
                rotationSpeed: rotationSpeed,
                speedX: speed(), // Random speed in x
                speedY: speed(), // Random speed in y
                speedAlpha: speedAlpha,
                alpha: 1
            });
        } else {
            // Génère une étoile
            // Generates a star

            const randomSize = Math.round(Math.random() * 20 + 10); // Taille // Size of star
            const randomSpikes = Math.round(Math.random() * 9 + 3); // Nbr de pointes // Generates random spikes
            const randomRadius = Math.round(Math.random() * 10 + 10);
            const randomAngle = Math.random() * piArc;

            // Calcul de la position de l'élément
            // Calculate element position
            const starX = Math.round(clickX + randomRadius * Math.cos(randomAngle));
            const starY = Math.round(clickY + randomRadius * Math.sin(randomAngle));

            // ajoute l'étoile au tableau stars
            // Add the star of the array stars
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




// Loop to draw on Canvas
// Boucle pour dessiner sur le canevas
function draw() {

    // On initialise la class qui va afficher les formes
    // initialize the class that displays the shapes
    const formDrawer = new FormDrawer(ctx);

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Fonction qui gère la transparence de tous les objets du canvas
    // Function that manages the transparency of all objects on the canvas
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#000000"; // Define color of the rectangle to black
    ctx.fillRect(0, 0, width, height); // Dessine un rectangle  // Draw the rectagle of the canvas

    // Draw each arc and update its position
    // Dessine chaque arc et met à jour sa position
    const arcDrawer = new ArcDrawer(ctx);
    arcDrawer.drawArcs();

    // Draw each rectangle and update its position
    // Dessine chaque rectangle et met à jour sa position
    const shapeDrawer = new ShapeDrawer(ctx);
    shapeDrawer.drawShapes(); // Call this to draw shapes and trails


    // Draw each star and update its position
    // Dessine chaque etoile et met à jour sa position
    const starDrawer = new StarDrawer(ctx);
    starDrawer.drawStars(); // Call this to draw shapes and trails

    // We display and manage the position of the permanent arcs
    // On affiche et gère la position des arcs permanents
    let i: number = 0; // Initialyze colision
    let j: number = 0; // Initialyze colision
    for (const val of pos) {
        i++;
        j = 0;

        // calculates new postion based on speed
        // Calcul de la nouvelle position selon la vitesse
        val.x += val.speedX;
        val.y += val.speedY;

        // Navigateur' window edge detectio-n
        // Détection des bords de la fenetre du navigateur
        if (val.x >= width - radius || val.x <= radius) {
            val.speedX = -val.speedX;
        }
        if (val.y >= height - radius || val.y <= radius) {
            val.speedY = -val.speedY;
        }

        // Detection colision
        // We scan other objects to check their position relative to ours.
        // On parcoure les autres objets pour vérifie leur position par rapport à la notre
        for (const valObjet of pos) {
            j++;
            if (i != j) { // The object must not check with itself // L'objet ne doit pas s'auto-détecter
                // If dectection, change direction
                if (detectCollisionArcs(val.x, val.y, radius, valObjet.x, valObjet.y, radius)) {
                    val.speedX = -val.speedX;
                    val.speedY = -val.speedY;
                }

            }
        }

        // calculates new direction based on mouse position
        // Calcul nouvelle direction selon la position de la souris
        let angle = Math.atan2(val.x - mouse.x, val.y - mouse.y);
        val.x += Math.cos(angle) * val.speedX + val.speedX;
        val.y += Math.sin(angle) * val.speedY + val.speedY;

        // Once all the parameters have been taken into account, we draw the object
        // une fois tous la paramètres pris en compte, on dessine l'objet
        formDrawer.drawArc(val.x, val.y, radius, calculateColor(val.x, val.y), calculateColor(val.x, val.y), 1);
    }

    // looping the animation
    requestAnimationFrame(draw);
}


class FormDrawer {
    public ctx: CanvasRenderingContext2D; // Canvas rendering context

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    // Draw an arc 
    public drawArc(x: number, y: number, radius: number, color: string, randomColor: string, alpha: number) {
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, randomColor);

        this.ctx.beginPath();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = gradient;
        this.ctx.arc(x, y, radius, 0, piArc);
        this.ctx.fill();
    }

    // Draw a rectangle 
    public drawRect(x: number, y: number, width: number, height: number, color: string, gradientColor: string, rotation: number, alpha: number) {
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

    // Draw a star
    public drawStar(x: number, y: number, size: number, color: string, spikes: number, alpha: number) {
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



class ShapeDrawer extends FormDrawer {

    // Update the trail for a shape with the specified properties.
    // Met à jour la traînée pour une forme avec les propriétés spécifiées.
    updateTrailForShape(x: number, y: number, width: number, height: number, color: string, randomColor: string, rotation: number, alpha: number) {
        shapesTrail.push({ x, y, width, height, color, randomColor, rotation, alpha });
    }

    // Draw the shapes on the canvas, updating their properties and trails.
    // Dessine les formes sur le canevas, mettant à jour leurs propriétés et leurs traînées.
    drawShapes() {
        for (const shape of shapes) {
            // Update shape position and properties.
            // Met à jour la position et les propriétés de la forme.
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            shape.alpha -= shape.speedAlpha;

            if (shape.alpha <= 0) {
                shape.alpha = 0;
            }

            // Update trail for the shape and draw it.
            // Met à jour la traînée de la forme et la dessine.
            this.updateTrailForShape(shape.x, shape.y, shape.width, shape.height, shape.color, shape.randomColor, shape.rotation, shape.alpha);
            this.drawRect(shape.x, shape.y, shape.width, shape.height, shape.color, shape.randomColor, shape.rotation, shape.alpha);

            // Remove the shape if it's out of the canvas bounds.
            // Supprime la forme si elle est hors des limites du canevas.
            if (shape.x + shape.width < 0 || shape.x > width || shape.y + shape.height < 0 || shape.y > height) {
                shapes.splice(shapes.indexOf(shape), 1);
            }
        }

        for (const trailShape of shapesTrail) {
            // Draw the shape trail and update its alpha.
            // Dessine la traînée de la forme et met à jour son niveau d'opacité.
            this.drawRect(trailShape.x, trailShape.y, trailShape.width, trailShape.height, trailShape.color, trailShape.randomColor, trailShape.rotation, trailShape.alpha);
            trailShape.alpha -= 0.01;

            // Remove the trail shape if its alpha is less than or equal to 0.
            // Supprime la forme de traînée si son niveau d'opacité est inférieur ou égal à 0.
            if (trailShape.alpha <= 0) {
                shapesTrail.splice(shapesTrail.indexOf(trailShape), 1);
            }
        }
    }
}


class StarDrawer extends FormDrawer {

    // Update the trail for a star with the specified properties.
    // Met à jour la traînée pour une étoile avec les propriétés spécifiées.
    updateTrailForStar(x: number, y: number, size: number, spikes: number, color: string, alpha: number) {
        starsTrail.push({ x, y, size, spikes, color, alpha });
    }

    // Draw the stars on the canvas, updating their properties and trails.
    // Dessine les étoiles sur le canevas, mettant à jour leurs propriétés et leurs traînées.
    drawStars() {
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];

            // Update star position and properties.
            // Met à jour la position et les propriétés de l'étoile.
            star.x += star.speedX;
            star.y += star.speedY;
            star.alpha -= star.speedAlpha;
            // star.size += 1;

            if (star.alpha <= 0) {
                star.alpha = 0;
            }

            // Update trail for the star and draw it.
            // Met à jour la traînée de l'étoile et la dessine.
            this.updateTrailForStar(star.x, star.y, star.size, star.spikes, star.color, star.alpha);
            this.drawStar(star.x, star.y, star.size, star.color, star.spikes, star.alpha);

            // Remove the star if it's out of the canvas bounds.
            // Supprime l'étoile si elle est hors des limites du canevas.
            if (star.x + star.size < 0 || star.x - star.size > width || star.y + star.size < 0 || star.y - star.size > height) {
                stars.splice(i, 1);
                i--;
            }
        }

        for (let trailStar of starsTrail) {
            // Draw the star trail and update its alpha.
            // Dessine la traînée de l'étoile et met à jour son niveau d'opacité.
            this.drawStar(trailStar.x, trailStar.y, trailStar.size, trailStar.color, trailStar.spikes, trailStar.alpha);
            trailStar.alpha -= 0.01;
            trailStar.size -= 0.2;
            if (trailStar.size < 0 ) {
                trailStar.size = 0;
            }
            // Remove the trail star if its alpha is less than or equal to 0.
            // Supprime l'étoile de traînée si son niveau d'opacité est inférieur ou égal à 0.
            if (trailStar.alpha <= 0) {
                starsTrail.splice(starsTrail.indexOf(trailStar), 1);
            }
        }
    }
}




class ArcDrawer extends FormDrawer {

    // Update the trail for an arc with the specified properties.
    // Met à jour la traînée pour un arc avec les propriétés spécifiées.
    updateTrailForArc(x: number, y: number, radius: number, color: any, randomColor: any, alpha: number) {
        arcsTrail.push({ x, y, radius, color, randomColor, alpha });
    }

    // Draw the arcs on the canvas, updating their properties and trails.
    // Dessine les arcs sur le canevas, mettant à jour leurs propriétés et leurs traînées.
    drawArcs() {
        for (const arc of arcs) {
            // Update arc position and properties.
            // Met à jour la position et les propriétés de l'arc.
            arc.x += arc.speedX;
            arc.y += arc.speedY;
            arc.alpha -= arc.speedAlpha;

            if (arc.alpha <= 0) {
                arc.alpha = 0;
            }

            // Update trail for the arc and draw it.
            // Met à jour la traînée de l'arc et la dessine.
            this.updateTrailForArc(arc.x, arc.y, arc.radius, arc.color, arc.randomColor, arc.alpha);
            this.drawArc(arc.x, arc.y, arc.radius, arc.color, arc.randomColor, arc.alpha);

            // Remove the arc if it's out of the canvas bounds.
            // Supprime l'arc s'il est hors des limites du canevas.
            if (arc.x - arc.radius > width || arc.x + arc.radius < 0 || arc.y - arc.radius > height || arc.y + arc.radius < 0) {
                arcs.splice(arcs.indexOf(arc), 1);
            }
        }

        for (const trailArc of arcsTrail) {
            // Draw the arc trail and update its alpha.
            // Dessine la traînée de l'arc et met à jour son niveau d'opacité.
            this.drawArc(trailArc.x, trailArc.y, trailArc.radius, trailArc.color, trailArc.randomColor, trailArc.alpha);
            trailArc.alpha -= 0.01;
            trailArc.radius -= 0.2;
            if (trailArc.radius < 0) {
                trailArc.radius = 0 ;
            }
            // Remove the trail arc if its alpha is less than or equal to 0.
            // Supprime l'arc de traînée si son niveau d'opacité est inférieur ou égal à 0.
            if (trailArc.alpha <= 0) {
                arcsTrail.splice(arcsTrail.indexOf(trailArc), 1);
            }
        }
    }
}





function detectCollisionArcs(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) {
    // Calculate the distance between the centers of the arcs
    // Calculer la distance entre les centres des arcs
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    // If the distance between the centers is less than the sum of the radius, then the arcs overlap
    // Si la distance entre les centres est inférieure à la somme des rayons, alors les arcs se chevauchent
    if (distance < r1 + r2) {
        return true;
    }
    return false;
}



// Function to calculate the color based on position
// Fonction pour calculer la couleur en fonction de la position
function calculateColor(x: number, y: number): string {
    const red = Math.floor((x / width) * 255);  // Use x for the red component
    const green = Math.floor((y / height) * 255);  // Use y for the green component
    const blue = Math.floor(((x + y) / (width + height)) * 255);  // Blue component remains fixed at 0
    return `rgb(${red},${green},${blue})`;
}

// Generates a random speed value between -5 and 5.
// Génère une valeur de vitesse aléatoire entre -5 et 5.
function speed() {
    return Math.round((Math.random() - 0.5) * 10);
}

// Generates a random RGB color value.
// Génère une valeur de couleur RGB aléatoire.
function color() {
    // Generate random red, green, and blue components between 0 and 255.
    // Génère des composantes de rouge, vert et bleu aléatoires entre 0 et 255.
    return `rgb(${Math.round(Math.random()) * 255},${Math.round(Math.random()) * 255},${Math.round(Math.random()) * 255})`;
}


// Lancer l'animation
draw();
