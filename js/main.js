const html = document.querySelector("html");
const focusBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const img = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const imgStartPause = document.querySelector("#start-pause img");
const spanStartPause = document.querySelector("#start-pause span");
const timer = document.querySelector("#timer");

const audioInicio = new Audio("sons/play.wav");
const audioPausar = new Audio("sons/pause.mp3");
const audioFim = new Audio("sons/beep.mp3");

const musica = new Audio("sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

imgStartPause.setAttribute("src", "imagens/play_arrow.png");

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focusBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  focusBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  img.setAttribute("src", `imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?  
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.  
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioFim.play();
    alert("tempo finalizado");
    imgStartPause.setAttribute("src", "imagens/play_arrow.png");
    spanStartPause.textContent = "Começar";
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

function iniciarPausar() {
  if (intervaloId) {
    zerar();
    audioPausar.play();
    spanStartPause.textContent = "Começar";
    imgStartPause.setAttribute("src", "imagens/play_arrow.png");
    return;
  } else if (tempoDecorridoEmSegundos <= 0) {
    tempoDecorridoEmSegundos = 5;
  }
  audioInicio.play();
  spanStartPause.textContent = "Pausar";
  imgStartPause.setAttribute("src", "imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.textContent = `${tempoFormatado}`;
}

mostrarTempo();
startPauseBt.addEventListener("click", iniciarPausar);
