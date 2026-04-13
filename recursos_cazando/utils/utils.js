function generarAleatorio(min, max) {
    let random = Math.random();
    let numero = random * (max - min + 1);
    let numeroEntero = Math.ceil(numero);
    numeroEntero = numeroEntero + min - 1;
    return numeroEntero;
}

function mostrarEnSpan(idSpan, valor) {
    let componente = document.getElementById(idSpan);
    if (componente) {
        componente.textContent = valor;
    }
}

// NUEVA FUNCIÓN: Obtener valor de un span
function obtenerValorSpan(idSpan) {
    let componente = document.getElementById(idSpan);
    if (componente) {
        return parseInt(componente.textContent);
    }
    return 0;
}