import { handleSubmit, handleCategory, handleReset, handleScroll, f, g } from "./eventHandlers.js";

const form = document.getElementById("form");
const categoria = document.getElementById("categoria");

// const name = document.getElementById("nombre");

// const checkErrorInput = (event) => {
//     let { target: { value } } = event;
//     if (value.length >= 5) {
//         name.nextElementSibling.style.display = "none";
//     }
// }

// const err = (event) => {
//     let { target: { value } } = event;
//     console.log(value)
//     if (value.length < 5) {
//         name.nextElementSibling.style.display = "block";
//         name.classList.add("inputError");
//     } else {
//         name.nextElementSibling.style.display = "none";
//         name.classList.remove("inputError");
//     }
// }

// const cleanError = (event) => {
//     let { target: { value } } = event;

//     if (value.lenght >= 5) {
//         name.nextElementSibling.style.display = "none";
//         name.classList.remove("inputError");
//     }
// }

// name.onblur = err;
// name.onfocus = cleanError;
// name.oninput = checkErrorInput;

let options;
let handleErrorMessage = (type, { id, condition }) => {
    let element = document.getElementById(id);
    switch (type) {
        case "blur":
            if (condition) {
                element.nextElementSibling.style.display = "block";
                element.classList.add("inputError");
            } else {
                element.nextElementSibling.style.display = "none";
                element.classList.remove("inputError");
            }
            break;
    }
}

let handleErrorName = ({ type, target: { id, value: { length } } }) => {
    options = { id, condition: length < 5 };
    handleErrorMessage(type, options);
}
let handleErrorEmail = ({ type, target: { id, value } }) => {
    let emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isValidEmail = !emailRegExp.test(value),
        options = { id, condition: isValidEmail };

    handleErrorMessage(type, options);
}

let handleErrorQuantity = ({ type, target: { id, value } }) => {
    options = { id, condition: Number(value) <= 0 };
    handleErrorMessage(type, options);
}

let handleErrorSelect = ({ type, target: { id, value } }) => {
    options = { id, condition: value === "seleccionar" };
    handleErrorMessage(type, options);
}

let checkError = (event) => {
    let { type, target: { name } } = event;
    // console.log(event)
    // console.log("hola desde checkError")
    console.log(type);
    switch (name) {
        case "nombre": handleErrorName(event)
            break;
        case "apellido": handleErrorName(event);
            break;
        case "email": handleErrorEmail(event)
            break;
        case "cantidad": handleErrorQuantity(event);
            break;
        case "categoria": handleErrorSelect(event);
            break;
    }
}



for (let i = 0; i < form.elements.length; i++) {
    let { type, id } = form.elements[i],
        element = document.getElementById(id);

    // console.log(type)
    if (type === "text" || type === "number") {

        element.onblur = checkError;
        element.oninput = checkError;

    } else if (type === "select-one") {

        element.addEventListener("cardSelected", (event) => {
            g(event);
            checkError(event);
        })
        element.addEventListener("change", (event) => {
            checkError(event);
            handleCategory(event);
            handleScroll(event);
        })
    }
}


form.oninput = f;
form.onsubmit = handleSubmit;
form.addEventListener("reset", (event) => {
    handleReset(event);
    handleScroll(event);
})

