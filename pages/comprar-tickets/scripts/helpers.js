const btnResumen = document.getElementById("resumen");

export const handleStyles = (element) => {
    element.classList.contains("promoCard-selected")
        ? element.classList.remove("promoCard-selected")
        : element.classList.add("promoCard-selected");
}

export const handleFormState = (data) => {

    return (data.nombre &&
        data.apellido &&
        data.email &&
        data.cantidad &&
        data.categoria &&
        data.categoria !== "seleccionar") ? true : false;

}