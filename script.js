/* =========================
   LOADING SCREEN WORDS
========================= */
const words = [
  "Loading.",
  "Loading..",
  "Loading...",
  "Chuyên",
  "Tin",
  "Nhớ",
  "Một",
  "Chữ",
  "Đồng"
];

let wordIndex = 0;
const wordEl = document.getElementById("word");
const loading = document.getElementById("loading");

// Lock scroll bar only
window.scrollTo(0, 0);
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

const loadingInterval = setInterval(() => {
  wordEl.style.opacity = 0;

  setTimeout(() => {
    wordEl.textContent = words[wordIndex];
    wordEl.style.opacity = 0.7;
    wordIndex++;

    if (wordIndex === words.length) {
      clearInterval(loadingInterval);

      setTimeout(() => {
        loading.style.opacity = 0;

        setTimeout(() => {
          loading.remove();

          // Unlock scroll bar
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          window.scrollTo(0, 0);
        }, 800);
      }, 800);
    }
  }, 250);
}, 500);




/* =========================
   SCROLL REVEAL SECTIONS
========================= */
(() => {
  const bg = document.querySelector(".animated-bg");
  if (!bg) return;

  let latestScroll = 0;

  window.addEventListener("scroll", () => {
    latestScroll = window.scrollY;
  });

  function animateBackground() {
    bg.style.transform = `translateY(${latestScroll * 0.15}px)`;
    requestAnimationFrame(animateBackground);
  }

  animateBackground();
})();


/* =========================
   PARALLAX BACKGROUND
========================= */
const bg = document.querySelector(".animated-bg");
let latestScroll = 0;

window.addEventListener("scroll", () => {
  latestScroll = window.scrollY;
});

function animateBackground() {
  bg.style.transform = `translateY(${latestScroll * 0.15}px)`;
  requestAnimationFrame(animateBackground);
}

animateBackground();



/* =========================
   RUBIK CUBE SETUP
========================= */
const CUBE_SIZE = 120;
const GAP = 6;
const SPACING = CUBE_SIZE + GAP;

const rubik = document.getElementById("rubik");
const cubies = [];

let count = 1;

for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {

      const cubie = document.createElement("div");
      cubie.className = "cubie";

      const baseX = x * SPACING;
      const baseY = y * SPACING;
      const baseZ = z * SPACING;

      cubie.dataset.x = baseX;
      cubie.dataset.y = baseY;
      cubie.dataset.z = baseZ;

      cubie.style.transform = `
          translate3d(${baseX}px, ${baseY}px, ${baseZ}px)
        `;

      ["front", "back", "right", "left", "top", "bottom"].forEach(faceName => {
        const face = document.createElement("div");
        face.className = `face ${faceName}`;
        face.textContent = String(count++).padStart(2, "0");
        cubie.appendChild(face);
      });

      rubik.appendChild(cubie);
      cubies.push(cubie);
    }
  }
}



/* =========================
   RUBIK SCROLL 
========================= */
window.addEventListener("scroll", () => {
  const s = window.scrollY;

  /* ===== ROTATION ===== */
  const rotX = 30 + s * 0.04;
  const rotY = 30 + s * 0.06;

  rubik.style.transform = `
    translate(-50%, -50%)
    rotateX(${rotX}deg)
    rotateY(${rotY}deg)
  `;

  /* ===== SEPARATION ===== */
  const separation = s * 0.25;

  cubies.forEach(cubie => {
    const x = parseFloat(cubie.dataset.x);
    const y = parseFloat(cubie.dataset.y);
    const z = parseFloat(cubie.dataset.z);

    const factor = separation / 120;

    cubie.style.transform = `
      translate3d(
        ${x + x * factor}px,
        ${y + y * factor}px,
        ${z + z * factor}px
      )
    `;

    /* ===== FADE (faces only) ===== */
    const opacity = Math.max(0, 1 - factor * 0.6);

    cubie.querySelectorAll(".face").forEach(face => {
      face.style.opacity = opacity;
    });
  });
});

gsap.registerPlugin(ScrollTrigger);

    // Split headline into lines
    const splitHeadline = new SplitType(".headline1", {
      types: "lines"
    });

    // Main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top 70%",
      }
    });

    tl.from(".eyebrow", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .from(splitHeadline.lines, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out"
    }, "-=0.2")
    .from(".description", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .from(".stat", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.2");


/* =========================
   GROUP MEMBER INTERACTION
========================= */

document.querySelectorAll(".group-card").forEach(group => {

  const previewImg = group.querySelector(".member-preview img");
  const buttons = group.querySelectorAll(".member-btn");

  buttons.forEach(btn => {

    // Hover → change image
    btn.addEventListener("mouseenter", () => {
      const img = btn.dataset.image;

      previewImg.style.opacity = 0;

      setTimeout(() => {
        previewImg.src = img;
        previewImg.style.opacity = 1;
      }, 120);
    });

    // Click → redirect
    btn.addEventListener("click", () => {
      window.location.href = btn.dataset.link;
    });

  });
});


// Member Image Preview on Hover
document.addEventListener('DOMContentLoaded', function() {
  // Create preview element
  const previewDiv = document.createElement('div');
  previewDiv.className = 'member-image-preview';
  previewDiv.id = 'memberImagePreview';
  previewDiv.innerHTML = `
      <img id="previewImage" src="" alt="Member Preview">
      <div class="preview-name" id="previewName"></div>
  `;
  document.body.appendChild(previewDiv);

  // Get all member buttons
  const memberButtons = document.querySelectorAll('.member-btn');
  const previewElement = document.getElementById('memberImagePreview');
  const previewImage = document.getElementById('previewImage');
  const previewName = document.getElementById('previewName');

  memberButtons.forEach(button => {
      // Show preview on hover
      button.addEventListener('mouseenter', function() {
          const imageSrc = this.getAttribute('data-image');
          const memberName = this.textContent.trim();

          if (imageSrc) {
              previewImage.src = imageSrc;
              previewName.textContent = memberName;
              previewElement.classList.add('active');
          }
      });

      // Hide preview when mouse leaves
      button.addEventListener('mouseleave', function() {
          previewElement.classList.remove('active');
      });

      // Keep functionality for clicks (navigation)
      button.addEventListener('click', function() {
          const link = this.getAttribute('data-link');
          if (link) {
              window.location.href = link;
          }
      });
  });

  // Also hide preview when hovering over preview itself and then leaving
  previewElement.addEventListener('mouseenter', function() {
      this.classList.add('active');
  });

  previewElement.addEventListener('mouseleave', function() {
      this.classList.remove('active');
  });
});