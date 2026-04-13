/// Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnArriba = document.getElementById("btnArriba");
let btnIzquierda = document.getElementById("btnIzquierda");
let btnAbajo = document.getElementById("btnAbajo");
let btnDerecha = document.getElementById("btnDerecha");

const VELOCIDAD = 10;

// Punto 16: Variables y constantes
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

// Variable para controlar puntuación
let puntos = 0;

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

// NUEVA FUNCIÓN: detectarColision (sin parámetros)
function detectarColision() {
    // Verificar si el gato toca la comida
    // Colisión en eje X: gatoX < comidaX+anchoComida Y gatoX+anchoGato > comidaX
    // Colisión en eje Y: gatoY < comidaY+altoComida Y gatoY+altoGato > comidaY
    
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        // Mostrar alert cuando hay colisión
        alert("¡El gato atrapó la comida! 🎉");
        
        // Opcional: Actualizar puntuación
        puntos += 10;
        let puntosSpan = document.getElementById("puntos");
        if (puntosSpan) {
            puntosSpan.textContent = puntos;
        }
        
        // Opcional: Mover la comida a una posición aleatoria
        comidaX = Math.random() * (canvas.width - ANCHO_COMIDA);
        comidaY = Math.random() * (canvas.height - ALTO_COMIDA);
        
        // Opcional: Mostrar mensaje en el panel
        let mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.textContent = "¡Atrapaste la comida! +10 puntos";
            setTimeout(() => {
                mensaje.textContent = "";
            }, 1500);
        }
        
        // Redibujar la comida en nueva posición
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
    
    // Dibujar la comida
    graficarComida();
    
    // LLAMAR A detectarColision después de cada movimiento
    detectarColision();
}

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
    
    // LLAMAR A detectarColision después de cada movimiento
    detectarColision();
}

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
    
    // LLAMAR A detectarColision después de cada movimiento
    detectarColision();
}

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
    
    // LLAMAR A detectarColision después de cada movimiento
    detectarColision();
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
    
    // Reiniciar puntuación
    puntos = 0;
    let puntosSpan = document.getElementById("puntos");
    if (puntosSpan) {
        puntosSpan.textContent = puntos;
    }
    
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