
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnArriba = document.getElementById("btnArriba");
let btnIzquierda = document.getElementById("btnIzquierda");
let btnAbajo = document.getElementById("btnAbajo");
let btnDerecha = document.getElementById("btnDerecha");

const VELOCIDAD = 10;

// Variables y constantes
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

// Variable para el puntaje
let puntaje = 0;

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

// NUEVA FUNCIÓN: generarPosicionAleatoriaComida()
function generarPosicionAleatoriaComida() {
    // Usar la función generarAleatorio de utilitarios.js
    // Los límites: desde 0 hasta (canvas.width - ANCHO_COMIDA)
    let maxX = canvas.width - ANCHO_COMIDA;
    let maxY = canvas.height - ALTO_COMIDA;
    
    comidaX = generarAleatorio(0, maxX);
    comidaY = generarAleatorio(0, maxY);
}

// NUEVA FUNCIÓN: actualizarPuntaje()
function actualizarPuntaje() {
    // Usar la función mostrarEnSpan de utilitarios.js
    mostrarEnSpan("puntos", puntaje);
}

// NUEVA FUNCIÓN: detectarColision (sin parámetros)
function detectarColision() {
    // Verificar si el gato toca la comida
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        // La comida reaparece en posición aleatoria
        generarPosicionAleatoriaComida();
        
        // Incrementar puntaje (1 punto por cada comida)
        puntaje++;
        
        //  Mostrar el puntaje actualizado en pantalla
        actualizarPuntaje();
        
        // Mostrar mensaje opcional
        let mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.textContent = "¡Comiste! +1 punto 🎉";
            setTimeout(() => {
                mensaje.textContent = "";
            }, 1000);
        }
        
        // Redibujar todo con la nueva posición de la comida
        limpiarCanva();
        graficarGato();
        graficarComida();
    }
}

// Función para dibujar todo (gato + comida)
function dibujarTodo() {
    graficarGato();
    graficarComida();
}

// ============================================
// FUNCIONES DE MOVIMIENTO
// ============================================

function moverIzquierda() {
    gatoX -= VELOCIDAD;
    if (gatoX < 0) {
        gatoX = 0;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    gatoX += VELOCIDAD;
    if (gatoX > canvas.width - ANCHO_GATO) {
        gatoX = canvas.width - ANCHO_GATO;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba() {
    gatoY -= VELOCIDAD;
    if (gatoY < 0) {
        gatoY = 0;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo() {
    gatoY += VELOCIDAD;
    if (gatoY > canvas.height - ALTO_GATO) {
        gatoY = canvas.height - ALTO_GATO;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

//  función iniciarJuego
function iniciarJuego() {
    // Gato centrado
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    // Comida en posición aleatoria usando utilitarios.js
    generarPosicionAleatoriaComida();
    
    // Reiniciar puntaje
    puntaje = 0;
    actualizarPuntaje();
    
    // Limpiar mensaje
    let mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = "";
    }
    
    // Limpiar canvas antes de dibujar
    limpiarCanva();
    
    // Dibujar
    graficarGato();
    graficarComida();
}

// ============================================
// CONFIGURACIÓN DE EVENTOS DE BOTONES
// ============================================

btnIzquierda.onclick = () => moverIzquierda();
btnDerecha.onclick = () => moverDerecha();
btnArriba.onclick = () => moverArriba();
btnAbajo.onclick = () => moverAbajo();

// Iniciar el juego cuando carga la página
iniciarJuego();