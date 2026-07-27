// =========================
// MOBILE MENU
// =========================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// =========================
// STICKY NAVBAR
// =========================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 80){

        header.style.background = "#111";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

    }else{

        header.style.background = "transparent";
        header.style.boxShadow = "none";

    }

});

// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});

// =========================
// SCROLL ANIMATION
// =========================

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{

section.classList.add("hidden");

observer.observe(section);

});

// =========================
// IMAGE LIGHTBOX
// =========================

const galleryImages=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.style.position="fixed";
lightbox.style.top="0";
lightbox.style.left="0";
lightbox.style.width="100%";
lightbox.style.height="100%";
lightbox.style.background="rgba(0,0,0,.9)";
lightbox.style.display="none";
lightbox.style.justifyContent="center";
lightbox.style.alignItems="center";
lightbox.style.zIndex="9999";

const img=document.createElement("img");

img.style.maxWidth="90%";
img.style.maxHeight="90%";
img.style.borderRadius="10px";

lightbox.appendChild(img);

document.body.appendChild(lightbox);

galleryImages.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.style.display="flex";

img.src=image.src;

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});

// =========================
// ACTIVE NAVIGATION
// =========================

const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-150;

if(pageYOffset>=top){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// =========================
// PRELOADER
// =========================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

console.log("Nahusenay Hotel Website Loaded Successfully");