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