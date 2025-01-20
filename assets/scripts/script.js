/*Variables para animacion del baloon*/
const containerBalon = document.getElementsByClassName("balon-animation")[0];
const ball = document.getElementsByClassName("balon")[0];

//Variables para menu hamburguesa
const listItems = document.querySelectorAll(".mymenu-items li");
const input = document.getElementById('menu-btn'); 

//Variables para slider
let currentSlide = 0;
const cards = document.querySelectorAll(" #banner-slider .card");
const totalCards = cards.length;

let currentSlideJugadores = 0;
const cardsJugadores = document.querySelectorAll(" #jugadores-slider .card");
const totalCardsJugadores = cardsJugadores.length;


//Función para redireccionar al hacer clic en un enlace
listItems.forEach((li) => {
    li.addEventListener("click", () => {
      const link = li.querySelector("a"); 
      if (link) {
        window.location.href = link.href; 
        input.checked = false;
      }
    });
  });



//Función para mover el slider
function moveSlider(direction) {
  const slider = document.querySelector(".slider");

  if (direction === 1 && currentSlide < totalCards - 1) {
    currentSlide++; 
  } else if (direction === -1 && currentSlide > 0) {
    currentSlide--; 
  }
  const offset = -currentSlide * 100;
  slider.style.transform = `translateX(${offset}%)`;
  console.log("currentSlide:", currentSlide);

}

//Función para mover el slider automático
function moveSliderJugadores(direction) {
  const slider = document.querySelector("#jugadores-slider .slider");

  if (direction === 1 && currentSlideJugadores < totalCardsJugadores - 1) {
    currentSlideJugadores++; 
  } else if (direction === -1 && currentSlideJugadores > 0) {
    currentSlideJugadores--; 
  }
  const offset = -currentSlideJugadores * 100;
  slider.style.transform = `translateX(${offset}%)`;

}



// Función de animación
function animate({ duration, timing, draw }) {
  const start = performance.now();

  function frame(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);

    draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

// Función para suavizar la animación
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction);
  };
}

// Función de rebote
function bounce(timeFraction) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

if (containerBalon && ball) {
  const to = containerBalon.clientHeight - ball.clientHeight;

  // Evento al hacer clic en el balón
  ball.addEventListener("click", function () {
    animate({
      duration: 2000,
      timing: makeEaseOut(bounce),
      draw(progress) {
        ball.style.top = to * progress + "px";
      },
    });
  });
} else {
  console.error("No se encontró el contenedor o el balón.");
}

document.getElementById("formulario").addEventListener("submit",function (event) {
  event.preventDefault();

  if(validateForm(this)) {
    alert("Formulario enviado correctamente");
    this.submit();
  }
});

//Función para validar el formulario
function validateForm(form) {
  let isValid = true;

  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const message = form.querySelector("#message").value.trim();

  const labeLError = form.querySelector("#name-error");
  const labelEmailError = form.querySelector("#email-error");
  const labelMessageError = form.querySelector("#message-error");

  labeLError.textContent = "";
  labelEmailError.textContent = "";
  labelMessageError.textContent = "";

  if(name === "") {
    isValid = false;
    labeLError.textContent = "El nombre es requerido";
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    isValid = false;
    labelEmailError.textContent = "El email no es valido";
  }

  if (message === "") {
    isValid = false;
    labelMessageError.textContent = "El mensaje es requerido";
  }

  return isValid;
}

