// cazando.js
// Juego principal con sistema de tiempo y reinicio

// Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnArriba = document.getElementById("btnArriba");
let btnIzquierda = document.getElementById("btnIzquierda");
let btnAbajo = document.getElementById("btnAbajo");
let btnDerecha = document.getElementById("btnDerecha");
let btnReiniciar = document.getElementById("btnReiniciar");

const VELOCIDAD = 30;

// Constantes
const ALTO_GATO = 50;
const ANCHO_GATO = 50;
const ALTO_COMIDA = 30;
const ANCHO_COMIDA = 30;

// Variables del juego
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;
let puntaje = 0;
let tiempo = 40;
let intervalo = null;
let juegoActivo = true;

// Función graficarRectangulo
function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

// Función limpiarCanva
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// graficarGato
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#770b0b");
}

// graficarComida
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#aeb7ce");
}

// Generar posición aleatoria de la comida
function generarPosicionAleatoriaComida() {
    let maxX = canvas.width - ANCHO_COMIDA;
    let maxY = canvas.height - ALTO_COMIDA;
    
    comidaX = generarAleatorio(0, maxX);
    comidaY = generarAleatorio(0, maxY);
    
    console.log("Comida nueva posición: X=" + comidaX + ", Y=" + comidaY);
}

// Actualizar puntaje
function actualizarPuntaje() {
    mostrarEnSpan("puntos", puntaje);
    console.log("Puntaje: " + puntaje);
}

// Actualizar tiempo
function actualizarTiempo() {
    mostrarEnSpan("tiempo", tiempo);
}

// ============================================
// FUNCIONES DE FIN DEL JUEGO (CORREGIDAS)
// ============================================

function detenerJuego(mensaje) {
    juegoActivo = false;
    
    // Detener intervalo
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    
    // Deshabilitar SOLO botones de movimiento (NO el de reiniciar)
    btnArriba.disabled = true;
    btnIzquierda.disabled = true;
    btnAbajo.disabled = true;
    btnDerecha.disabled = true;
    
    // Mostrar mensaje
    let mensajeSpan = document.getElementById("mensaje");
    if (mensajeSpan) {
        mensajeSpan.textContent = mensaje;
        mensajeSpan.style.color = "#ff0000";
        mensajeSpan.style.fontSize = "24px";
    }
}

function gameOver() {
    if (!juegoActivo) return;
    alert("⏰ ¡TIEMPO AGOTADO! Game Over ⏰");
    detenerJuego("⏰ ¡GAME OVER! Presiona REINICIAR ⏰");
}

function victoria() {
    if (!juegoActivo) return;
    alert("🎉 ¡FELICIDADES! ¡GANASTE EL JUEGO! 🎉");
    detenerJuego("🎉 ¡VICTORIA! Presiona REINICIAR 🎉");
}

// ============================================
// FUNCIÓN RESTAR TIEMPO (CORREGIDA)
// ============================================

function restarTiempo() {
    if (!juegoActivo) return;
    
    if (tiempo > 0) {
        tiempo--;
        actualizarTiempo();
        
        if (tiempo <= 0) {
            gameOver();
        }
    }
}

// ============================================
// FUNCIÓN DETECTAR COLISIÓN
// ============================================

function detectarColision() {
    if (!juegoActivo) return false;
    
    // Verificar colisión
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        console.log("¡COLISIÓN DETECTADA!");
        
        // 1. Incrementar puntaje
        puntaje++;
        actualizarPuntaje();
        
        // 2. Generar NUEVA posición para la comida
        generarPosicionAleatoriaComida();
        
        // 3. Mostrar mensaje temporal
        let mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.textContent = "¡Comiste! +1 punto 🎉";
            mensaje.style.color = "#4CAF50";
            setTimeout(() => {
                if (juegoActivo && mensaje.textContent === "¡Comiste! +1 punto 🎉") {
                    mensaje.textContent = "";
                }
            }, 1000);
        }
        
        // 4. Verificar victoria
        if (puntaje >= 6) {
            victoria();
            return true;
        }
        
        // 5. Redibujar
        limpiarCanva();
        graficarGato();
        graficarComida();
        
        return true;
    }
    return false;
}

// ============================================
// FUNCIONES DE MOVIMIENTO
// ============================================

function moverIzquierda() {
    if (!juegoActivo) return;
    
    gatoX -= VELOCIDAD;
    if (gatoX < 0) gatoX = 0;
    
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    if (!juegoActivo) return;
    
    gatoX += VELOCIDAD;
    if (gatoX > canvas.width - ANCHO_GATO) gatoX = canvas.width - ANCHO_GATO;
    
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverArriba() {
    if (!juegoActivo) return;
    
    gatoY -= VELOCIDAD;
    if (gatoY < 0) gatoY = 0;
    
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverAbajo() {
    if (!juegoActivo) return;
    
    gatoY += VELOCIDAD;
    if (gatoY > canvas.height - ALTO_GATO) gatoY = canvas.height - ALTO_GATO;
    
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

// ============================================
// FUNCIÓN REINICIAR (CORREGIDA)
// ============================================

function reiniciarJuego() {
    console.log("=== REINICIANDO JUEGO ===");
    
    // Detener intervalo actual
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    
    // Reiniciar variables
    puntaje = 0;
    tiempo = 40;
    juegoActivo = true;
    
    // Posicionar gato en centro
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    // Posicionar comida aleatoriamente
    generarPosicionAleatoriaComida();
    
    // Actualizar pantalla
    actualizarPuntaje();
    actualizarTiempo();
    
    // Limpiar mensaje
    let mensajeSpan = document.getElementById("mensaje");
    if (mensajeSpan) {
        mensajeSpan.textContent = "";
        mensajeSpan.style.color = "";
        mensajeSpan.style.fontSize = "";
    }
    
    // Habilitar botones de movimiento
    btnArriba.disabled = false;
    btnIzquierda.disabled = false;
    btnAbajo.disabled = false;
    btnDerecha.disabled = false;
    
    // Redibujar
    limpiarCanva();
    graficarGato();
    graficarComida();
    
    // Iniciar nuevo intervalo
    intervalo = setInterval(restarTiempo, 1000);
    
    console.log("Gato en: X=" + gatoX + ", Y=" + gatoY);
    console.log("Comida en: X=" + comidaX + ", Y=" + comidaY);
    console.log("Puntaje: " + puntaje);
    console.log("Tiempo: " + tiempo);
}

// ============================================
// FUNCIÓN INICIAR JUEGO
// ============================================

function iniciarJuego() {
    console.log("=== INICIANDO JUEGO ===");
    
    // Posicionar gato en centro
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    // Posicionar comida aleatoriamente
    generarPosicionAleatoriaComida();
    
    // Reiniciar variables
    puntaje = 0;
    tiempo = 40;
    juegoActivo = true;
    
    // Actualizar pantalla
    actualizarPuntaje();
    actualizarTiempo();
    
    // Limpiar mensaje
    let mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = "";
    }
    
    // Habilitar botones
    btnArriba.disabled = false;
    btnIzquierda.disabled = false;
    btnAbajo.disabled = false;
    btnDerecha.disabled = false;
    
    // Dibujar
    limpiarCanva();
    graficarGato();
    graficarComida();
    
    // Iniciar intervalo
    if (intervalo) {
        clearInterval(intervalo);
    }
    intervalo = setInterval(restarTiempo, 1000);
    
    console.log("Gato en: X=" + gatoX + ", Y=" + gatoY);
    console.log("Comida en: X=" + comidaX + ", Y=" + comidaY);
}

// ============================================
// CONFIGURACIÓN DE EVENTOS
// ============================================

btnIzquierda.onclick = () => moverIzquierda();
btnDerecha.onclick = () => moverDerecha();
btnArriba.onclick = () => moverArriba();
btnAbajo.onclick = () => moverAbajo();
btnReiniciar.onclick = () => reiniciarJuego();

// Iniciar el juego
iniciarJuego();