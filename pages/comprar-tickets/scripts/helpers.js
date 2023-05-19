const btnResumen = document.getElementById("resumen");

export const handleStyles = (element) => {
    element.classList.contains("promoCard-selected")
        ? element.classList.remove("promoCard-selected")
        : element.classList.add("promoCard-selected");
}

export const handleFormState = (data) => {
    if (data.nombre && data.apellido && data.email && data.cantidad && data.categoria) {
        return true;
    } else {
        return false;
    }
}