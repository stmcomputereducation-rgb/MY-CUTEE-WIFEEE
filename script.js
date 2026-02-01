let pages = document.querySelectorAll(".page");
let index = 0;

function nextPage() {
  pages[index].classList.remove("active");
  index++;
  pages[index].classList.add("active");
}

// NO button funny movement
const noBtn = document.querySelector(".no");
noBtn.addEventListener("mouseover", () => {
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";
});

// 🎆 Firecracker animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function celebrate() {
  canvas.style.display = "block";
  document.getElementById("finalText").style.display = "block";

  setInterval(() => {
    fireworks.push(new Firework());
  }, 300);

  animate();
}

class Firework {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.radius = Math.random() * 3 + 2;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
    this.speed = Math.random() * 3 + 4;
    this.exploded = false;
    this.particles = [];
  }

  explode() {
    for (let i = 0; i < 40; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y < canvas.height / 2) {
        this.exploded = true;
        this.explode();
      }
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((fw, i) => {
    fw.update();
    fw.draw();

    if (fw.exploded) {
      fw.particles.forEach((p, j) => {
        p.update();
        p.draw();
        if (p.life <= 0) fw.particles.splice(j, 1);
      });
    }
  });

  requestAnimationFrame(animate);
}
