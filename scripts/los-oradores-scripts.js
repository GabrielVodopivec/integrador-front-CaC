let cardsContainer = document.getElementById("cards-container");
let isDragging = false;
let startX, startY;

const handleMouseDown = (event) => {
    cardsContainer.style.scrollBehavior = "auto";
    isDragging = true;
    startX = event.clientX;
}

const handleMouseMove = (event) => {
    if (isDragging) {
        cardsContainer.scrollLeft -= event.clientX - startX;
        startX = event.clientX;
    }
}

const handleMouseUp = () => {
    cardsContainer.style.scrollBehavior = "smooth";
    isDragging = false;
}

cardsContainer.addEventListener("mousedown", handleMouseDown)
cardsContainer.addEventListener("mousemove", handleMouseMove);
cardsContainer.addEventListener("mouseup", handleMouseUp);