import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#particules-canvas")!;

const ctx = canvas.getContext("2d")!;
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

// Efface le contenu précédent du canvas
ctx.clearRect(0, 0, width, height);
ctx.beginPath();
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = "#ff0000"; // Couleur rouge pour tous les cercles


const radius = 20;

for (let i = 0; i < 4; i++) {
  let x = i % 2 === 0 ? radius : width - radius;
  let y = i < 2 ? radius : height - radius;
  ctx.beginPath(); // Commence un nouveau chemin pour chaque cercle
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}



