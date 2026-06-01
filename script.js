const canvas = document.getElementById("particles");

if (!canvas) {
    console.error("Canvas element with id 'particles' not found");
} else {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function initCanvas() {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initCanvas();

    let particles = [];

    class Particle{
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 1 + 0.2;
            this.opacity = Math.random() * 0.8 + 0.2;
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
            ctx.fillStyle = `rgba(255,215,0,${this.opacity})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for(let i = 0; i < 250; i++){
        particles.push(new Particle());
    }

    function animate(){
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
        initCanvas();
    });
}

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
const card = document.querySelector(".flip-card");
const birthdayAudio = document.getElementById("birthday-audio");

if (card && slider) {
    card.addEventListener("click", () => {
        if (birthdayAudio) {
            birthdayAudio.play().catch((error) => {
                console.warn("Unable to play audio on click:", error);
            });
        }

        card.classList.add("flipped");

        setTimeout(() => {
            currentImage++;

            if(currentImage >= images.length){
                currentImage = 0;
            }

            slider.src = images[currentImage];
        }, 400);

        setTimeout(() => {
            card.classList.remove("flipped");
        }, 800);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const birthdaySpan = document.querySelector(".birthday span");
    const texts = [
        "JOYEUX ANNIVERSAIRE",
        "Je te souhaite joie, bonheur aujourd'hui et toujours. ✨"
    ];
    let currentTextIndex = 0;
    let charIndex = 0;

    function typeText() {
        if (!birthdaySpan) return;
        const text = texts[currentTextIndex];

        if (charIndex < text.length) {
            birthdaySpan.textContent = text.slice(0, charIndex + 1);
            charIndex += 1;
            setTimeout(typeText, 90);
        } else {
            setTimeout(() => {
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                charIndex = 0;
                birthdaySpan.textContent = "";
                setTimeout(typeText, 300);
            }, 1800);
        }
    }

    typeText();
});
