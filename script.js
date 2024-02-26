import Game_Object from './game_objs.js'

const canvas = document.querySelector("canvas");
// @ts-ignore
const ctx = canvas.getContext("2d");

// @ts-ignore
canvas.height = window.innerHeight;
// @ts-ignore
canvas.width = window.innerWidth;

window.addEventListener("resize", () => {
  // @ts-ignore
  canvas.height = window.innerHeight;
  // @ts-ignore
  canvas.width = window.innerWidth;
});

// Load Images
const images = {};
images.Player = new Image(); // Should be the disc Image
images.Player.src = "./assets/shooting_disc.png"; // Put the path for the disc image

// Create disc object
let disc = new Game_Object(ctx, 0, 0, 360, 360, images.Player)

const animate = () => {
  // @ts-ignore
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  disc.drawDisc(images.Player, 0, 0, 350, 350, 0, 0, 350, 350);
};

// @ts-ignore
window.onload = setInterval(animate, 1000 / 30);
