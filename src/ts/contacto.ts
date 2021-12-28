function contacto() {    
    if(document.body.id !== "body-contacto") return;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get("s")) {
        const alerta = document.getElementById("form-sent-alert")
        alerta!.classList.remove("hidden")
        setTimeout(() =>alerta!.classList.add("hidden"), 4500);
    }
}