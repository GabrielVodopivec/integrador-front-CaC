import { handleStyles, handleFormState } from "./helpers.js";
import { errors } from "./comprar-tickets.js";

let data = {},
    total = document.getElementById("total-a-pagar"),
    cardContainer = document.getElementById("cards-container"),
    { children } = cardContainer;

export const handleCardSelected = () => {
    let { name, value } = document.getElementById("categoria")
    data = { ...data, [name]: value };
}

export const handleInput = (event) => {
    let { target: { name, value } } = event;
    data = { ...data, [name]: value };
}

const handleCards = (event, resetEvent) => {
    let { target: { id, parentNode } } = event;

    for (let i = 0; i < children.length; i++) {
        let c = children[i];

        (c.id === id || c.id === parentNode.id)
            ? handleStyles(c)
            : c.classList.remove("promoCard-selected");
    }

    (categoria.value === id || categoria.value === parentNode.id)
        ? categoria.value = "seleccionar"
        : categoria.value = id || parentNode.id;

    !resetEvent && document.getElementById("categoria").dispatchEvent(new Event("cardSelected"));
};

export const handleCategory = (event) => {
    let { target: { value } } = event;

    for (let i = 0; i < children.length; i++) {
        let c = children[i];

        (c.id === value)
            ? handleStyles(c)
            : c.classList.remove("promoCard-selected");
    }
}

export const handleReset = (event) => {
    data = {};
    handleCards(event, true);
}

export const handleSubmit = (event) => {
    event.preventDefault();

    let values = Object.values(errors);
    let check = Object.values(errors).some(e => e === true)

    if (!handleFormState(data) || values.length && check) {
        let el = document.getElementById("errorSubmit");
        el.style.display = "block"
        setTimeout(() => {
            el.style.display = "none"
        }, 3000)
        console.log("EL formulario no se envió")

    } else {
        document.getElementById("errorSubmit").style.display = "none"
        let cant = parseInt(data.cantidad),
            price = 200,
            studentDiscount = 1 - 0.8,
            traineeDiscount = 1 - 0.5,
            juniorDiscount = 1 - 0.15,
            calc = (t, c, p, d) => { t.value += `$ ${Math.round(c * p * d)}` }

        total.value = "Total a pagar: "

        switch (data.categoria) {
            case "estudiante":
                calc(total, cant, price, studentDiscount);
                break;
            case "trainee":
                calc(total, cant, price, traineeDiscount);
                break;
            case "junior":
                calc(total, cant, price, juniorDiscount);
                break;
            default:
                total.value = "Total a pagar: ";
        }

        console.log("Formulario Enviado!")
        console.log({ data })
    }

}

export const handleScroll = (event) => {
    let { target: { value } } = event;
    let middle =
        Math.round(cardContainer.scrollWidth - cardContainer.getBoundingClientRect().width) / 2;

    switch (value) {
        case "estudiante":
            cardContainer.scrollLeft = 0;
            break;
        case "trainee":
            cardContainer.scrollLeft = middle;
            break;
        case "junior":
            cardContainer.scrollLeft = cardContainer.scrollWidth;
            break;
        default: cardContainer.scrollLeft = 0;;
    }
}

for (let j = 0; j < children.length; j++) {
    children[j].onclick = handleCards;
}