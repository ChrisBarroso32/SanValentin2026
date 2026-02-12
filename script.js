const intro = document.getElementById("intro");
const countdown = document.getElementById("countdown");
const main = document.getElementById("mainContent");
const envelope = document.getElementById("envelope");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const spotify = document.getElementById("spotifyContainer");

const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* COUNTDOWN */
let count = 5;
let timer = setInterval(()=>{
    count--;
    countdown.textContent = count;

    if(count === 0){
        clearInterval(timer);

        intro.classList.add("hide");
        main.classList.remove("hidden");
        main.style.opacity = "1";


        setTimeout(()=>{
        intro.style.display="none";
        },1000);
    }
},1000);

/* Abrir carta */
envelope.addEventListener("click", ()=>{
    envelope.classList.toggle("open");
    spotify.style.display="block";
});

/* Botón No huye */
noBtn.addEventListener("mouseover", ()=>{
    const x = Math.random()*(window.innerWidth-100);
    const y = Math.random()*(window.innerHeight-50);
    noBtn.style.position="absolute";
    noBtn.style.left=x+"px";
    noBtn.style.top=y+"px";
});

/* FUEGOS ARTIFICIALES */
let particles=[];

function createFirework(){
    for(let i=0;i<100;i++){
        particles.push({
            x:canvas.width/2,
            y:canvas.height/2,
            angle:Math.random()*2*Math.PI,
            speed:Math.random()*5+2,
            radius:2,
            alpha:1
        });
    }
}

function animate(){
    ctx.fillStyle="rgba(0,0,0,0.2)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,i)=>{
        p.x += Math.cos(p.angle)*p.speed;
        p.y += Math.sin(p.angle)*p.speed;
        p.alpha -= 0.01;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,105,180,${p.alpha})`;
        ctx.fill();

        if(p.alpha<=0) particles.splice(i,1);
    });

    requestAnimationFrame(animate);
}
animate();

yesBtn.addEventListener("click", ()=>{
    createFirework();
    alert("Sabía que dirías que sí 💍❤️");
});
