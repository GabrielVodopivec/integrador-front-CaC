import { handleSubmit, handleCategory, handleReset, f, g } from "./eventHandlers.js";

const form = document.getElementById("form");
const categoria = document.getElementById("categoria");
let cardContainer = document.getElementById("cards-container");

const k = (event) => {
    let { target: { value } } = event;
    let middle = cardContainer.getBoundingClientRect().width / 2 - 40;

    switch (value) {
        case "estudiante":
            cardContainer.scrollLeft = 0;
            break;
        case "trainee":
            cardContainer.scrollLeft = middle;
            break;
        case "junior":
            cardContainer.scrollLeft = 1000;
            break;
        default: return;
    }
}

form.oninput = f;
form.addEventListener("cardSelected", g);
form.onsubmit = handleSubmit;
form.addEventListener("reset", (event) => {
    handleReset(event);
    cardContainer.scrollLeft = 0;
})

categoria.addEventListener("change", (event) => {
    handleCategory(event);
    k(event);
})