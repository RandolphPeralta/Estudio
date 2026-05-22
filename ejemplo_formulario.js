// Seleccionamos todos los botones y pasos
const btnSiguiente = document.querySelectorAll('.btn-siguiente');
const btnAtras = document.querySelectorAll('.btn-atras');
const pasosFormulario = document.querySelectorAll('.paso-formulario');
const indicadoresPasos = document.querySelectorAll('.menu-pasos li');

let pasoActual = 0;

// Evento para los botones Siguiente
btnSiguiente.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Ocultar el paso actual
        pasosFormulario[pasoActual].classList.remove('paso-activo');
        indicadoresPasos[pasoActual].classList.remove('paso-activo');
        
        // Avanzar al siguiente paso
        pasoActual++;
        
        // Mostrar el nuevo paso
        pasosFormulario[pasoActual].classList.add('paso-activo');
        indicadoresPasos[pasoActual].classList.add('paso-activo');
    });
});

// Evento para los botones Atrás
btnAtras.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Ocultar el paso actual
        pasosFormulario[pasoActual].classList.remove('paso-activo');
        indicadoresPasos[pasoActual].classList.remove('paso-activo');
        
        // Retroceder al paso anterior
        pasoActual--;
        
        // Mostrar el nuevo paso
        pasosFormulario[pasoActual].classList.add('paso-activo');
        indicadoresPasos[pasoActual].classList.add('paso-activo');
    });
});
