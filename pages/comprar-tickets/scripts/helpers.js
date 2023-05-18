const btnResumen = document.getElementById("resumen");

export const handleStyles = (element) => {
    element.classList.contains("promoCard-selected")
        ? element.classList.remove("promoCard-selected")
        : element.classList.add("promoCard-selected");
}

export const handleSubmitBtn = (data) => {
    if (data.nombre && data.apellido && data.email && data.cantidad && data.categoria) {
        btnResumen.disabled = null;
        btnResumen.title = "";
    } else {
        btnResumen.disabled = true;
        btnResumen.title = "Hay campos vacios o con errores";
    }
}

let pc = document.getElementsByClassName("promoCard");

console.log(pc)