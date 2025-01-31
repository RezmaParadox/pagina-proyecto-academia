import { conection } from "../api/conection.js";

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

async function mostrarPartidos( dataPartidos ) {
  const partidos = document.getElementById("juegos-table");
  const partidosLimitados = Object.values(dataPartidos).slice(0, 5);
  partidos.innerHTML = `
    <thead>
      <th>Fecha</th>
      <th>Liga</th>
      <th>País</th>
      <th>Equipo Local</th>
      <th>Goles</th>
      <th>Equipo Visitante</th>
      <th>Goles</th>
    </thead>
    <tbody>
    ${partidosLimitados.map((partido) => {
      let date = new Date(partido.fixture.date).toLocaleDateString('es-ES');
      return `
        <tr>
          <td>${date}</td>
          <td>${partido.league.name}</td>
          <td>${partido.league.country}</td>
          <td>
            <div class="team-info">
              <img src="${partido.teams.home.logo}" alt="${partido.teams.home.name}">  
              ${partido.teams.home.name}
            </div>
          </td>
          <td>${partido.goals.home}</td>
          <td>
            <div class="team-info">
              <img src="${partido.teams.away.logo}" alt="${partido.teams.away.name}">
              ${partido.teams.away.name} 
            </div>

          </td>
          <td>${partido.goals.away}</td>
        </tr>
      `;
    }).join('')}
    </tbody>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Verificar si los datos ya están en sesionStorage
    let dataPartidos = JSON.parse(sessionStorage.getItem("partidos")) || {};

    if(Object.keys(dataPartidos).length === 0){
      dataPartidos = await conection();
      sessionStorage.setItem("partidos",JSON.stringify(dataPartidos.response));
    }

    mostrarPartidos(dataPartidos);  // Usar el array de resultados
    console.log(dataPartidos);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
  // Obtener los botones por ID
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const prevBtnJugadores = document.getElementById("prev-btn-jugadores");
  const nextBtnJugadores = document.getElementById("next-btn-jugadores");

  // Asignar los manejadores de clic
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", function() {
      moveSlider(-1); // Mover el slider hacia atrás
    });
    nextBtn.addEventListener("click", function() {
      moveSlider(1); // Mover el slider hacia adelante
    });
  }

  if (prevBtnJugadores && nextBtnJugadores) {
    prevBtnJugadores.addEventListener("click", function() {
      moveSliderJugadores(-1); // Mover el slider de jugadores hacia atrás
    });
    nextBtnJugadores.addEventListener("click", function() {
      moveSliderJugadores(1); // Mover el slider de jugadores hacia adelante
    });
  }
});

