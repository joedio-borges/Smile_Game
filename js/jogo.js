    // declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botoes pelos ids
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// função reiniciar tudo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();
  atualizaPlacar(0, 0);

  document.getElementById("mensagem").innerHTML = "";

  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;

  let divis = document.getElementsByTagName("div");

  for (let i = 0; i < divis.length; i++) {
    if (!isNaN(divis[i].id)) {
      divis[i].className = "carta";
      divis[i].innerHTML = "?";
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }

  document.getElementById("mensagem").innerHTML = "";
}

// função placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;

  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// função quando acerta
function acertou(obj) {
  obj.className = "acertou";

  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";

  obj.appendChild(img);
}

// função principal
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 3) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
      document.getElementById("mensagem").innerHTML = "ACERTOU! 🎉";
    } else {
  
    obj.className = "errou";

      // smile triste na carta errada
      obj.innerHTML = "😢";

      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);

      document.getElementById("mensagem").innerHTML = "ERROU! 😢";
    }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);