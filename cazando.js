// Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnarriba = document.getElementById("btnarriba");
let btnizquierda = document.getElementById("btnizquierda");
let btnabajo = document.getElementById("btnabajo");
let btnderecha = document.getElementById("btnderecha");

const VELOCIDAD = 10; // Cambiado a 10 

// Variables y constantes
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

// Función graficarRectangulo
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// Función limpiarCanva
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// graficarGato modificada
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#be1c1c");
}

// graficarComida modificada
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#061233");
}

// Función para dibujar todo (gato + comida)
function dibujarTodo() {
    graficarGato();
    graficarComida();
}

// Función moverIzquierda
function moverIzquierda() {
    // Restar 10 a la variable gatoX
    gatoX -= 10;
    
    // Validar límites (para que no salga del canvas)
    if (gatoX < 0) {
        gatoX = 0;
    }
    
    // Limpiar el canvas
    limpiarCanva();
    
    // Dibujar el gato en nueva posición
    graficarGato();
    
    // Dibujar la comida (porque se borró al limpiar)
    graficarComida();
}

// Función moverDerecha (complementaria para completar funcionalidad)
function moverDerecha() {
    gatoX += 10;
    
    // Validar límites
    if (gatoX > canvas.width - ANCHO_GATO) {
        gatoX = canvas.width - ANCHO_GATO;
    }
    
    limpiarCanva();
    graficarGato();
    graficarComida();
}

// Función moverArriba (complementaria)
function moverArriba() {
    gatoY -= 10;
    
    if (gatoY < 0) {
        gatoY = 0;
    }
    
    limpiarCanva();
    graficarGato();
    graficarComida();
}

// Función moverAbajo (complementaria)
function moverAbajo() {
    gatoY += 10;
    
    if (gatoY > canvas.height - ALTO_GATO) {
        gatoY = canvas.height - ALTO_GATO;
    }
    
    limpiarCanva();
    graficarGato();
    graficarComida();
}

// función iniciarJuego
function iniciarJuego() {
    // Punto 17: Asignar valores
    // Gato centrado
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    // Comida en esquina inferior derecha
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;
    
    // Limpiar canvas antes de dibujar
    limpiarCanva();
    
    // Dibujar
    graficarGato();
    graficarComida();
}

// Configuración de eventos de los botones
// Invocar moverIzquierda desde el botón correspondiente
btnarriba.onclick = () => moverArriba();
btnabajo.onclick = () => moverAbajo();
btnizquierda.onclick = () => moverIzquierda();  // ← Función solicitada
btnderecha.onclick = () => moverDerecha();

// Iniciar el juego cuando carga la página
iniciarJuego();