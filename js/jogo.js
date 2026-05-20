let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar =
  document.getElementById("reiniciar");

const btnJogarNovamente =
  document.getElementById("joganovamente");

/* verifica clique */
function verifica(obj) {

  if (!jogar) {

    alert("Clique em Próximo Duelo");

    return;
  }

  jogar = false;

  tentativas++;

  let sorteado =
    Math.floor(Math.random() * 6);

  /* ACERTOU */
  if (parseInt(obj.id) === sorteado) {

    acertou(obj);

    acertos++;

  } else {

    /* ERROU */
    errou(obj);

    /* mostra carta certa */
    let certo =
      document.getElementById(sorteado);

    acertou(certo);
  }

  atualizaPlacar();

  /* limite de rodadas */
  if (tentativas >= 3) {

    btnJogarNovamente
      .classList.add("invisivel");

    btnReiniciar
      .classList.remove("invisivel");
  }
}

/* ACERTOU */
function acertou(obj) {

  obj.classList.add("acertou");

  /* impede espelhamento */
  obj.style.transform = "rotateY(0deg)";

  obj.innerHTML = `
  
    <img 
      src="./img/darkmagician.png"

      style="
        width: 140px;
        height: 200px;

        object-fit: cover;

        border-radius: 8px;
      "
    >
    
  `;
}

/* ERROU */
function errou(obj) {

  obj.classList.add("errou");

  /* impede espelhamento */
  obj.style.transform = "rotateY(0deg)";

  obj.innerHTML = `
  
    <img 
      src="./img/kuriboh.png"

      style="
        width: 140px;
        height: 200px;

        object-fit: cover;

        border-radius: 8px;
      "
    >
    
  `;
}

/* atualiza placar */
function atualizaPlacar() {

  let desempenho =
    tentativas === 0
    ? 0
    : (acertos / tentativas) * 100;

  document.getElementById("resposta")
    .innerHTML = `
  
      Vitórias: ${acertos}
      |
      Duelos: ${tentativas}
      |
      Desempenho:
      ${Math.round(desempenho)}%
      
    `;
}

/* próxima rodada */
function jogarNovamente() {

  jogar = true;

  document
    .querySelectorAll(".carta")
    .forEach(c => {

      c.className = "carta";

      c.style.transform = "";

      c.innerHTML =
        "<span>?</span>";
    });
}

/* reiniciar */
function reiniciar() {

  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();

  atualizaPlacar();

  btnJogarNovamente
    .classList.remove("invisivel");

  btnReiniciar
    .classList.add("invisivel");
}

/* eventos */
btnJogarNovamente.addEventListener(
  "click",
  jogarNovamente
);

btnReiniciar.addEventListener(
  "click",
  reiniciar
);