
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");


let btnarriba = document.getElementById("btnarriba");
let btnizquierda = document.getElementById("btnizquierda");
let btnabajo = document.getElementById("btnabajo");
let btnderecha = document.getElementById("btnderecha");

const VELOCIDAD = 15;


let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;


function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}


function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#be1c1c");
}


function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#061233");
}


function iniciarJuego() {
    
    // Gato centrado
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
  
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;
    
    // Limpiar canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar
    graficarGato();
    graficarComida();
}

// Función para mover (opcional, para interactividad)
function mover(direccion) {
    if (direccion === "arriba") gatoY -= VELOCIDAD;
    if (direccion === "abajo") gatoY += VELOCIDAD;
    if (direccion === "izquierda") gatoX -= VELOCIDAD;
    if (direccion === "derecha") gatoX += VELOCIDAD;
    
    // Limitar dentro del canvas
    gatoX = Math.max(0, Math.min(gatoX, canvas.width - ANCHO_GATO));
    gatoY = Math.max(0, Math.min(gatoY, canvas.height - ALTO_GATO));
    
    iniciarJuego(); // Redibujar
}

// Eventos de los botones
btnarriba.onclick = () => mover("arriba");
btnabajo.onclick = () => mover("abajo");
btnizquierda.onclick = () => mover("izquierda");
btnderecha.onclick = () => mover("derecha");

