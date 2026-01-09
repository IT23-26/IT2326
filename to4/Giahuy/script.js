window.onload = () => {
    document.getElementById("posts").scrollIntoView({
        behavior: "smooth"
    });
};

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const close = document.querySelector(".close");

document.querySelectorAll(".post img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

close.addEventListener("click", () => {
    modal.style.display = "none";
});
