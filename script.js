const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 3 + 1;

        this.speedY = Math.random() * 1 + 0.2;

        this.opacity = Math.random();
    }

    update(){
        this.y -= this.speedY;

        if(this.y < 0){
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }

    draw(){
        ctx.beginPath();

        ctx.fillStyle =
        `rgba(255,215,0,${this.opacity})`;

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}

for(let i=0;i<250;i++){
    particles.push(new Particle());
}

function animate(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle=>{
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg"
];

let currentImage = 0;

const slider = document.getElementById("slider");
const card =
document.querySelector(".flip-card");

card.addEventListener("click", () => {

    card.classList.add("flipped");

    setTimeout(() => {

        currentImage++;

        if(currentImage >= images.length){
            currentImage = 0;
        }

        slider.src =
            images[currentImage];

    },400);

    setTimeout(() => {

        card.classList.remove("flipped");

    },800);

});

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
