import "./style.css";  // Importe un fichier de style CSS

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;  // Sélectionne l'élément canvas dans le DOM
const ctx = canvas.getContext("2d")!;  // Obtient le contexte 2D du canvas
const width = window.innerWidth;  // Récupère la largeur de la fenêtre
const height = window.innerHeight;  // Récupère la hauteur de la fenêtre

canvas.width = width;  // Attribue la largeur du canvas
canvas.height = height;  // Attribue la hauteur du canvas

const mouse = { x: 0, y: 0 };  // Objet pour stocker les coordonnées de la souris

// Met à jour les coordonnées de la souris lorsqu'elle se déplace
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Efface le contenu précédent du canvas
ctx.clearRect(0, 0, width, height);

const radius = 20;  // Définit le rayon des cercles
const piArc = Math.PI * 2;  // Calcule la valeur de 2 * PI (une circonférence complète)
const speedX = 2;  // Vitesse horizontale
const speedY = speedX * height / width;  // Calcule la vitesse verticale proportionnelle à la largeur

const pos = [];  // Tableau pour stocker les positions et les vitesses des cercles
for (let i = 0; i < 4; i++) {
    let x = i % 2 === 0 ? radius : width - radius;
    let y = i < 2 ? radius : height - radius;
    pos.push({ x: x, y: y, speedX: speedX, speedY: speedY });  // Ajoute les positions et vitesses initiales des cercles au tableau
}

console.log(pos);  // Affiche les positions et vitesses initiales dans la console

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface le contenu précédent du canvas

    ctx.fillStyle = "#000000";  // Couleur de fond du canvas
    ctx.fillRect(0, 0, width, height);  // Remplit le canvas en noir

    ctx.fillStyle = "#ff0000";  // Couleur des cercles

    for (const val of pos) {
        val.x += val.speedX;  // Met à jour la position horizontale
        val.y += val.speedY;  // Met à jour la position verticale
        
        // Inverse la direction si le cercle atteint les bords horizontaux
        if (val.x >= width - radius || val.x <= radius) {
            val.speedX = -val.speedX;
        }
        // Inverse la direction si le cercle atteint les bords verticaux
        if (val.y >= height - radius || val.y <= radius) {
            val.speedY = -val.speedY;
        }

        // Calcul de la direction vers la souris
        let angle = Math.atan2(val.x - mouse.x, val.y - mouse.y);
        val.x += Math.cos(angle) * val.speedX + val.speedX;
        val.y += Math.sin(angle) * val.speedY + val.speedY;

        arcMove(val.x, val.y);  // Appel de la fonction pour dessiner les cercles
    }

    requestAnimationFrame(draw);  // Demande une nouvelle animation
}

function arcMove(x: number, y: number) {
    ctx.beginPath();  // Commence un nouveau chemin
    ctx.arc(x, y, radius, 0, piArc);  // Dessine un cercle
    ctx.fill();  // Remplit le cercle
}

// Lancement de l'animation
draw();
