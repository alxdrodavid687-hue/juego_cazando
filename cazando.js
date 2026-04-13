//  Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnarriba = document.getElementById("btnarriba");
let btnizquierda = document.getElementById("btnizquierda");
let btnabajo = document.getElementById("btnabajo");
let btnderecha = document.getElementById("btnderecha");

const VELOCIDAD = 10;

//  Variables y constantes
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

//  Función graficarRectangulo
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

//  Función limpiarCanva
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//  graficarGato modificada
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#be1c1c");
}

// GraficarComida modificada
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#061233");
}

// Función para dibujar todo (gato + comida)
function dibujarTodo() {
    graficarGato();
    graficarComida();
}

// ============================================
// FUNCIONES DE MOVIMIENTO 
// ============================================

// Punto : Función moverIzquierda
function moverIzquierda() {
    // Restar 10 a la variable gatoX
    gatoX -= VELOCIDAD;
    
    // Validar límites (borde izquierdo)
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

// Punto : Función moverDerecha
function moverDerecha() {
    // Sumar 10 a la variable gatoX
    gatoX += VELOCIDAD;
    
    // Validar límites (borde derecho)
    if (gatoX > canvas.width - ANCHO_GATO) {
        gatoX = canvas.width - ANCHO_GATO;
    }
    
    // Limpiar el canvas
    limpiarCanva();
    
    // Dibujar el gato en nueva posición
    graficarGato();
    
    // Dibujar la comida
    graficarComida();
}

// Punto : Función moverArriba
function moverArriba() {
    // Restar 10 a la variable gatoY
    gatoY -= VELOCIDAD;
    
    // Validar límites (borde superior)
    if (gatoY < 0) {
        gatoY = 0;
    }
    
    // Limpiar el canvas
    limpiarCanva();
    
    // Dibujar el gato en nueva posición
    graficarGato();
    
    // Dibujar la comida
    graficarComida();
}

// Punto: Función moverAbajo
function moverAbajo() {
    // Sumar 10 a la variable gatoY
    gatoY += VELOCIDAD;
    
    // Validar límites (borde inferior)
    if (gatoY > canvas.height - ALTO_GATO) {
        gatoY = canvas.height - ALTO_GATO;
    }
    
    // Limpiar el canvas
    limpiarCanva();
    
    // Dibujar el gato en nueva posición
    graficarGato();
    
    // Dibujar la comida
    graficarComida();
}

// Punto  función iniciarJuego
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


btnizquierda.onclick = () => moverIzquierda();  // Botón izquierda
btnDerecha.onclick = () => moverDerecha();      // Botón derecha
btnArriba.onclick = () => moverArriba();        // Botón arriba
btnAbajo.onclick = () => moverAbajo();          // Botón abajo

// Iniciar el juego cuando carga la página
iniciarJuego();