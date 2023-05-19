import { handleSubmit, handleCategory, handleReset, handleScroll, f, g, data } from "./eventHandlers.js";
import { handleFormState } from "./helpers.js";
const form = document.getElementById("form");
export let errors = {};
let options;
let handleErrorMessage = (type, { id, condition }) => {
    let element = form[id];
    let { name } = element;
    switch (type) {
        case "blur":
            if (condition) {
                element.nextElementSibling.style.display = "block";
                element.classList.add("inputError");
                errors = { ...errors, [name]: true }
            } else {
                element.nextElementSibling.style.display = "none";
                element.classList.remove("inputError");
                errors = { ...errors, [name]: false }
            }
            break;
        case "change":
            element.nextElementSibling.style.display = "none";
            element.classList.remove("inputError");
            errors = { ...errors, [name]: false }
            break;
        case "cardSelected":
            element.nextElementSibling.style.display = "none";
            element.classList.remove("inputError");
            errors = { ...errors, [name]: false }
            break;
        case "focus":
            element.nextElementSibling.style.display = "none";
            element.classList.remove("inputError");
            errors = { ...errors, [name]: false }
            break;
        case "reset":
            for (let i = 0; i < form.elements.length; i++) {
                let o = { nombre, apellido, email, cantidad, categoria };
                element = form.elements[i];
                if (element?.id in o) {
                    element.nextElementSibling.style.display = "none";
                    element.classList.remove("inputError");
                    errors = { ...errors, [name]: false }
                }
            }
            break;
        case "input":
            if (!condition) {
                element.nextElementSibling.style.display = "none";
                element.classList.remove("inputError");
                errors = { ...errors, [name]: false }
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

let handleErrorReset = ({ type, target: { id } }) => {
    options = { id };
    handleErrorMessage(type, options);
}

let checkError = (event) => {
    let { target: { name } } = event;

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
        default: handleErrorReset(event);
    }
}



for (let i = 0; i < form.elements.length; i++) {
    let { type, id } = form.elements[i],
        element = document.getElementById(id);

    if (type === "text" || type === "number") {

        element.onblur = checkError;
        element.oninput = checkError;

    } else if (type === "select-one") {

        element.onblur = checkError;
        element.onfocus = checkError;
        element.addEventListener("cardSelected", (event) => {
            g(event);
            checkError(event);
        })
        element.addEventListener("change", (event) => {
            checkError(event);
            handleCategory(event);
            handleScroll(event);
        })
    } else if (type === "submit") {
        element.addEventListener("click", () => {
            console.log(errors)
            let values = Object.values(errors);
            let check = Object.values(errors).some(e => e === true)

            if (!handleFormState(data) || values.length && check) {
                let el = document.getElementById("errorSubmit");
                el.style.display = "block"
                setTimeout(() => {
                    el.style.display = "none"
                }, 3000)

            }
        })
    }
}


form.oninput = f;
form.onsubmit = handleSubmit;
form.addEventListener("reset", (event) => {
    checkError(event);
    handleReset(event);
    handleScroll(event);
})

