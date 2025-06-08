// Lấy chuột
let bNum = 2;
let bSize = 8;
let bSpeed = 3;
let bDep = 0.01;
let bDist = 40;

const vanvas_mouse = document.getElementById("canvas_mouse");
const ctx_mouse = vanvas_mouse.getContext("2d");
canvas_mouse.width = window.innerWidth;
canvas_mouse.height = window.innerHeight;

let spots = [];
let hue = 0;
const mouse = {
  x: undefined,
  y: undefined,
};

canvas_mouse.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < bNum; i++) {
    spots.push(new Particle());
  }
});
window.addEventListenter("resize", () => {
  canvas_mouse.width = window.innerWidth;
  canvas_mouse.height = window.innerHeight;
  init();
});
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = bSize;
    this.speedX = (Math.random() - 0.5) * bSpeed;
    this.speedY = (Math.random() - 0.5) * bSpeed;
    this.hue = hue;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= bDep;
  }

  draw() {
    ctx_mouse.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
    ctx_mouse.beginPath();
    ctx_mouse.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx_mouse.fill();
  }
}
function handleParticles() {
  for (let i = 0; i < spots.length; i++) {
    spots[i].update();
    spots[i].draw();
    for (let j = i; j < spots.length; j++) {
      const dx = spots[i].x - spots[j].x;
      const dy = spots[i].y - spots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bDist) {
        ctx_mouse.beginPath();
        ctx_mouse.strokeStyle = `hsl(${spots[i].hue}, 100%, 50%)`;
        ctx_mouse.lineWidth = 0.2;
        ctx_mouse.moveTo(spots[i].x, spots[i].y);
        ctx_mouse.lineTo(spots[j].x, spots[j].y);
        ctx_mouse.stroke();
      }
    }
    if (spots[i].size <= 0.2) {
      spots.splice(i, 1);
      i--;
    }
  }
}
function animate() {
  ctx_mouse.clearRect(0, 0, canvas_mouse.width, canvas_mouse.height);
  handleParticles();
  hue++;
  requestAnimationFrame(animate);
}
animate();
