import "./style.css";  // Importe un fichier de style CSS

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;  // Sélectionne l'élément canvas dans le DOM

const ctx = canvas.getContext("2d")!;  // Obtient le contexte 2D du canvas
const width = window.innerWidth;  // Récupère la largeur de la fenêtre
const height = window.innerHeight;  // Récupère la hauteur de la fenêtre

canvas.width = width;  // Attribue la largeur du canvas
canvas.height = height;  // Attribue la hauteur du canvas

// Efface le contenu précédent du canvas
ctx.clearRect(0, 0, width, height);

ctx.beginPath();
ctx.fillStyle = "#000000";  // Définit la couleur de remplissage en noir
ctx.fillRect(0, 0, width, height);  // Remplit le canvas en noir

ctx.fillStyle = "#ff0000";  // Change la couleur de remplissage en rouge pour tous les cercles
const radius = 20;  // Définit le rayon des cercles
const piArc = Math.PI * 2;  // Calcule la valeur de 2 * PI (une circonférence complète)

// Variables pour le mouvement diagonal
let x = 20;
let y = 20;
let speedX = 5;
let speedY = (speedX * (height + radius) / width);  // Adapte la vitesse de y à x en fonction de la largeur et de la hauteur

function draw() {
    // Efface le contenu précédent du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#ff0000"; 

    // Met à jour les coordonnées pour le mouvement diagonal
    x += speedX;
    y += speedY;
    if (x >= width - radius) {
        x = radius;
        y = radius;
    } 

    // Définit les cercles pour le mouvement diagonal
    const diagonalCircles = [
        { x: x, y: radius },
        { x: width - x, y: height - radius },
        { x: radius, y: height - y },
        { x: width - radius, y: y }
    ];

    // Dessine les cercles en mouvement diagonal
    for (const circle of diagonalCircles) {
        arcMove(circle.x, circle.y);
    }

    // Demande une nouvelle animation
    requestAnimationFrame(draw);
}

function arcMove(x: number, y: number) {
    ctx.beginPath(); 
    ctx.arc(x, y, radius, 0, piArc);
    ctx.fill(); 
}

// Lance l'animation
draw();
