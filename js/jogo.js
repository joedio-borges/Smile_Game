let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
const maxTentativas = 5;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();
  atualizaPlacar(0, 0);

  btnJogarNovamente.classList.replace('invisivel', 'visivel');
  btnReiniciar.classList.replace('visivel', 'invisivel');
}

function jogarNovamente() {
  jogar = true;
  const divs = document.querySelectorAll('.game-box');
  divs.forEach(div => {
    div.className = "game-box inicial";
    removeImagem(div);
  });
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;

  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} | Tentativas: ${tentativas} (${desempenho.toFixed(0)}%)`;

  if (tentativas === maxTentativas && acertos === 0) {
    mostrarDerrota();
  }
}

function aplicarResultado(elemento, tipo) {
  const imagens = {
    acerto: "https://sig.ifc.edu.br/shared/verFoto?idFoto=2601&key=417d70fab29657fdeb2c50d97313138c",
    erro: "https://sig.ifc.edu.br/shared/verFoto?idFoto=2607621&key=4a5f5a7b04dc46e836271a6e47c3ed4f"
  };

  elemento.className = tipo === "acerto" ? "game-box acertou" : "game-box errou";
  removeImagem(elemento);

  const img = new Image(100);
  img.src = imagens[tipo];
  img.alt = tipo;
  img.id = `imagem-${tipo}`;

  elemento.appendChild(img);
}

function removeImagem(elemento) {
  const img = elemento.querySelector("img");
  if (img) img.remove();
}

function verifica(campo) {
  if (!jogar) {
    alert('Clique em "Jogar novamente" para continuar.');
    return;
  }

  jogar = false;
  tentativas++;

  if (tentativas === maxTentativas) {
    btnJogarNovamente.classList.replace('visivel', 'invisivel');
    btnReiniciar.classList.replace('invisivel', 'visivel');
  }

  const sorteado = Math.floor(Math.random() * 6);
  const idSelecionado = parseInt(campo.id);

  if (idSelecionado === sorteado) {
    aplicarResultado(campo, "acerto");
    acertos++;
  } else {
    aplicarResultado(campo, "erro");
    const campoSorteado = document.getElementById(sorteado);
    aplicarResultado(campoSorteado, "acerto");
  }

  atualizaPlacar(acertos, tentativas);
}

function mostrarDerrota() {
  const body = document.body;
  body.classList.add("derrota");

  const img = document.createElement("img");
  img.src = "img/triste.jpg";
  img.id = "imgDerrota";
  img.alt = "Derrota";
  img.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 350px;
    height: auto;
  `;

  body.appendChild(img);

  setTimeout(() => {
    body.classList.remove("derrota");
    img.remove();
  }, 3000);
}

btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
