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

for (let i = 0; i < 4; i++) {
  let x = i % 2 === 0 ? radius : width - radius;  // Calcul des coordonnées x pour les cercles
  let y = i < 2 ? radius : height - radius;  // Calcul des coordonnées y pour les cercles
  ctx.beginPath();  // Commence un nouveau chemin pour chaque cercle
  ctx.arc(x, y, radius, 0, Math.PI * 2);  // Dessine un cercle
  ctx.fill();  // Remplit le cercle
}
