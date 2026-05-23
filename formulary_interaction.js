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

