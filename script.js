import { Game_Object_Image, Game_Object } from './game_objs.js'

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
// @ts-ignore
let disc = new Game_Object(ctx, 0, canvas.height, 360, 360, images.Player.src)

let curve_plus = true
let rand = Math.random() * (15 - 5) + 5;
let vertical = Math.random() * (0.09 - 0.04) + 0.04;
function animate() {
  disc.pos_x += rand
  disc.pos_y += 0.05 * disc.pos_x - disc.pos_y*vertical
  console.log(disc.pos_x, disc.pos_y)
  // @ts-ignore
  if (disc.pos_x > canvas.width || disc.pos_y > canvas.height) {
    disc.pos_x = 0
    // @ts-ignore
    disc.pos_y = canvas.height
    rand = Math.random() * (15 - 5) + 5;
    vertical = Math.random() * (0.09 - 0.04) + 0.04;
  }
  // @ts-ignore
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  disc.drawObject(0, 0, 350, 350, 100, 100);
};

// @ts-ignore
window.onload = setInterval(animate, 1000 / 60);
