// Obtener canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Elementos de control
let btnArriba = document.getElementById("btnArriba");
let btnIzquierda = document.getElementById("btnIzquierda");
let btnAbajo = document.getElementById("btnAbajo");
let btnDerecha = document.getElementById("btnDerecha");
let btnReiniciar = document.getElementById("btnReiniciar");

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

// Variables del juego
let puntaje = 0;
let tiempo = 10;  // Punto 1: Variable tiempo con valor inicial 10
let intervalo = null;  // Variable para almacenar el setInterval
let juegoActivo = true;  // Controla si el juego está activo

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

// Función para generar posición aleatoria de la comida
function generarPosicionAleatoriaComida() {
    let maxX = canvas.width - ANCHO_COMIDA;
    let maxY = canvas.height - ALTO_COMIDA;
    
    comidaX = generarAleatorio(0, maxX);
    comidaY = generarAleatorio(0, maxY);
}

// Función para actualizar el puntaje en pantalla
function actualizarPuntaje() {
    mostrarEnSpan("puntos", puntaje);
}

// Función para actualizar el tiempo en pantalla
function actualizarTiempo() {
    mostrarEnSpan("tiempo", tiempo);
}

// Función restarTiempo
function restarTiempo() {
    // Solo restar tiempo si el juego está activo
    if (!juegoActivo) return;
    
    // Restar 1 a la variable tiempo
    tiempo--;
    
    // Actualizar el valor en pantalla usando utilitarios.js
    actualizarTiempo();
    
    // Verificar si tiempo llega a 0
    if (tiempo <= 0) {
        tiempo = 0;
        actualizarTiempo();
        gameOver("⏰ ¡TIEMPO AGOTADO! Game Over ⏰");
    }
}

// Función para detener el juego (ganador o game over)
function detenerJuego(mensaje) {
    juegoActivo = false;
    
    // Detener el setInterval
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    
    // Deshabilitar botones de movimiento
    btnArriba.disabled = true;
    btnIzquierda.disabled = true;
    btnAbajo.disabled = true;
    btnDerecha.disabled = true;
    
    // Mostrar mensaje en el panel
    let mensajeSpan = document.getElementById("mensaje");
    if (mensajeSpan) {
        mensajeSpan.textContent = mensaje;
        mensajeSpan.style.color = "#ff0000";
        mensajeSpan.style.fontSize = "24px";
    }
}

// Función para Game Over
function gameOver(mensaje) {
    if (!juegoActivo) return;
    alert(mensaje);
    detenerJuego(mensaje);
}

// Función para Victoria
function victoria() {
    if (!juegoActivo) return;
    alert("🎉 ¡FELICIDADES! ¡GANASTE EL JUEGO! 🎉");
    detenerJuego("🎉 ¡VICTORIA! Llegaste a 6 puntos 🎉");
}

// Función para habilitar botones de movimiento
function habilitarBotonesMovimiento(habilitar) {
    btnArriba.disabled = !habilitar;
    btnIzquierda.disabled = !habilitar;
    btnAbajo.disabled = !habilitar;
    btnDerecha.disabled = !habilitar;
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Detener el intervalo actual si existe
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    
    // Reiniciar variables
    puntaje = 0;
    tiempo = 10;
    juegoActivo = true;
    
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
    habilitarBotonesMovimiento(true);
    
    // Posicionar gato centrado
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    
    // Posicionar comida aleatoriamente
    generarPosicionAleatoriaComida();
    
    // Limpiar y dibujar
    limpiarCanva();
    graficarGato();
    graficarComida();
    
    // Iniciar nuevo intervalo
    intervalo = setInterval(restarTiempo, 1000);
}

// Función para detectar colisión
function detectarColision() {
    // Solo detectar colisión si el juego está activo
    if (!juegoActivo) return false;
    
    // Verificar si el gato toca la comida
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {
        
        // La comida reaparece en posición aleatoria
        generarPosicionAleatoriaComida();
        
        // Incrementar puntaje (1 punto por cada comida)
        puntaje++;
        
        // Mostrar el puntaje actualizado en pantalla
        actualizarPuntaje();
        
        // Mostrar mensaje temporal
        let mensaje = document.getElementById("mensaje");
        if (mensaje) {
            mensaje.textContent = "¡Comiste! +1 punto 🎉";
            mensaje.style.color = "#4CAF50";
            setTimeout(() => {
                if (juegoActivo) {
                    mensaje.textContent = "";
                    mensaje.style.color = "";
                }
            }, 1000);
        }
        
        // Verificar si el puntaje llega a 6
        if (puntaje >= 6) {
            victoria();
            return true;
        }
        
        // Redibujar todo con la nueva posición de la comida
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
    if (gatoX < 0) {
        gatoX = 0;
    }
    limpiarCanva();
    graficarGato();
    graficarComida();
    detectarColision();
}

function moverDerecha() {
    if (!juegoActivo) return;
    
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
    if (!juegoActivo) return;
    
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
    if (!juegoActivo) return;
    
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
    
    // Comida en posición aleatoria
    generarPosicionAleatoriaComida();
    
    // Reiniciar variables
    puntaje = 0;
    tiempo = 10;
    juegoActivo = true;
    
    // Actualizar pantalla
    actualizarPuntaje();
    actualizarTiempo();
    
    // Limpiar mensaje
    let mensaje = document.getElementById("mensaje");
    if (mensaje) {
        mensaje.textContent = "";
        mensaje.style.color = "";
    }
    
    // Habilitar botones
    habilitarBotonesMovimiento(true);
    
    // Limpiar canvas antes de dibujar
    limpiarCanva();
    
    // Dibujar
    graficarGato();
    graficarComida();
    
    // Detener intervalo anterior si existe
    if (intervalo) {
        clearInterval(intervalo);
    }
    
    // Usar setInterval para ejecutar restarTiempo cada segundo
    intervalo = setInterval(restarTiempo, 1000);
}

// ============================================
// CONFIGURACIÓN DE EVENTOS DE BOTONES
// ============================================

btnIzquierda.onclick = () => moverIzquierda();
btnDerecha.onclick = () => moverDerecha();
btnArriba.onclick = () => moverArriba();
btnAbajo.onclick = () => moverAbajo();
btnReiniciar.onclick = () => reiniciarJuego();

// Iniciar el juego cuando carga la página
iniciarJuego();