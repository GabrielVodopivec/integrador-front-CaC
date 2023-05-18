import { handleStyles, handleSubmitBtn } from "./helpers.js";

const btnResumen = document.getElementById("resumen");
const total = document.getElementById("total-a-pagar");
const { children } = document.getElementById("cards-container");

let data = {};

export const g = () => {
    let { name, value } = document.getElementById("categoria")
    data = { ...data, [name]: value };
    handleSubmitBtn(data);
}

export const f = (event) => {
    data = { ...data, [event.target.name]: event.target.value }
    handleSubmitBtn(data);
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

    !resetEvent && document.getElementById("form").dispatchEvent(new Event("cardSelected"));
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
    btnResumen.disabled = true;
}

export const handleSubmit = (event) => {
    event.preventDefault();

    let cant = parseInt(data.cantidad)
    let price = 200;
    total.value = "Total a pagar: "

    switch (data.categoria) {
        case "estudiante":
            total.value += `$ ${Math.round(cant * price * (1 - 0.8))}`;
            break;
        case "trainee":
            total.value += `$ ${Math.round(cant * price * (1 - 0.5))}`;
            break;
        case "junior":
            total.value += `$ ${Math.round(cant * price * (1 - 0.15))}`;
            break;
        default:
            total.value = "Total a pagar: ";
    }

    console.log("Formulario Enviado!")
    console.log({ "Datos: ": data })
}

for (let j = 0; j < children.length; j++) {
    children[j].onclick = handleCards;
}