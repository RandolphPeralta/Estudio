// Capturar todos los steps
const steps = document.querySelectorAll(".step");

// Capturar circulos
const numeros = document.querySelectorAll(".numero");

// Botones next
const nextBtns = document.querySelectorAll(".next");

// Botones back
const backBtns = document.querySelectorAll(".back");

// Paso actual
let currentStep = 0;

// =========================
// FUNCION MOSTRAR STEP
// =========================

function showStep(index) {

    // Ocultar todos
    steps.forEach(step => {
        step.classList.remove("active");
    });

    // Quitar active sidebar
    numeros.forEach(numero => {
        numero.classList.remove("activo");
    });

    // Mostrar actual
    steps[index].classList.add("active");

    // Activar numero
    numeros[index].classList.add("activo");

}

// =========================
// NEXT
// =========================

nextBtns.forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep < steps.length - 1) {

            currentStep++;

            showStep(currentStep);
        }

    });

});

// =========================
// BACK
// =========================

backBtns.forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep > 0) {

            currentStep--;

            showStep(currentStep);
        }

    });

});

//----------------------------

// =========================
// TOGGLE SWITCH STEP 2
// =========================

// Capturar switch
const switchBtn = document.getElementById("switch");

// Precios
const arcadePrecio = document.querySelector(".arcade-precio");

const advancedPrecio = document.querySelector(".advanced-precio");

const proPrecio = document.querySelector(".pro-precio");

// Textos gratis
const gratis = document.querySelectorAll(".gratis");

// Textos Monthly y Yearly
const toggleTextos = document.querySelectorAll(".toggle span");

// Estado
let yearly = false;

// Evento click
switchBtn.addEventListener("click", () => {

    // Cambiar estado
    yearly = !yearly;

    // Activar animacion
    switchBtn.classList.toggle("activo");

    // =========================
    // YEARLY
    // =========================

    if(yearly){

        // Cambiar precios
        arcadePrecio.textContent = "$90/yr";

        advancedPrecio.textContent = "$120/yr";

        proPrecio.textContent = "$150/yr";

        // Mostrar textos gratis
        gratis.forEach(item => {

            item.classList.remove("oculto");

        });

        // Cambiar color texto
        toggleTextos[0].classList.remove("activo-texto");

        toggleTextos[1].classList.add("activo-texto");

    }

    // =========================
    // MONTHLY
    // =========================

    else{

        // Cambiar precios
        arcadePrecio.textContent = "$9/mo";

        advancedPrecio.textContent = "$12/mo";

        proPrecio.textContent = "$15/mo";

        // Ocultar textos gratis
        gratis.forEach(item => {

            item.classList.add("oculto");

        });

        // Cambiar color texto
        toggleTextos[1].classList.remove("activo-texto");

        toggleTextos[0].classList.add("activo-texto");

    }

});