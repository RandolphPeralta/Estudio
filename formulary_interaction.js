const steps = document.querySelectorAll(".step");

const numeros = document.querySelectorAll(".number");

const nextBtns = document.querySelectorAll(".next");

const backBtns = document.querySelectorAll(".back");

let currentStep = 0;

function showStep(index) {

    steps.forEach(step => {
        step.classList.remove("active");
    });

    numeros.forEach(numero => {
        numero.classList.remove("on");
    });

    steps[index].classList.add("active");

    numeros[index].classList.add("on");

}

nextBtns.forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep < steps.length - 1) {

            currentStep++;

            showStep(currentStep);
        }

    });

});

backBtns.forEach(button => {

    button.addEventListener("click", () => {

        if (currentStep > 0) {

            currentStep--;

            showStep(currentStep);
        }

    });

});

//----------------------------

const switchBtn = document.getElementById("switch");

const arcadePrecio = document.querySelector(".arcade-precio");

const advancedPrecio = document.querySelector(".advanced-precio");

const proPrecio = document.querySelector(".pro-precio");

const planTitle = document.querySelector(".plan-title");

const planPrice = document.querySelector(".plan-price");

const onlinePrice = document.querySelector(".online-price");

const storagePrice = document.querySelector(".storage-price");

const totalPrice = document.querySelector(".total-price");

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
    switchBtn.classList.toggle("on");

    // =========================
    // YEARLY
    // =========================

    if (yearly) {

        // Cambiar precios
        arcadePrecio.textContent = "$90/yr";

        advancedPrecio.textContent = "$120/yr";

        proPrecio.textContent = "$150/yr";

        planTitle.textContent = "Arcade (Yearly)";

        planPrice.textContent = "$90/yr";

        onlinePrice.textContent = "+$10/yr";

        storagePrice.textContent = "+$20/yr";

        totalPrice.textContent = "+$120/yr";

        gratis.forEach(item => {

            item.classList.remove("oculto");

        });

        // Cambiar color texto
        toggleTextos[0].classList.remove("on-texto");

        toggleTextos[1].classList.add("on-texto");

    }

    // =========================
    // MONTHLY
    // =========================

    else {

        // Cambiar precios
        arcadePrecio.textContent = "$9/mo";

        advancedPrecio.textContent = "$12/mo";

        proPrecio.textContent = "$15/mo";

        planTitle.textContent = "Arcade (Monthly)";

        planPrice.textContent = "$9/mo";

        onlinePrice.textContent = "+$1/mo";

        storagePrice.textContent = "+$2/mo";

        totalPrice.textContent = "+$12/mo";

        gratis.forEach(item => {

            item.classList.add("oculto");

        });

        // Cambiar color texto
        toggleTextos[1].classList.remove("on-texto");

        toggleTextos[0].classList.add("on-texto");

    }

});

const changeBtn = document.querySelector(".change-btn");

changeBtn.addEventListener("click", (e) => {

    e.preventDefault();

    // Ocultar step 4
    step4.style.display = "none";

    // Mostrar step 2
    step2.style.display = "block";

});