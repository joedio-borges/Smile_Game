// declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// captura os botões pelos ids
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (!isNaN(divis[i].id)) {
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id; // mostra número da carta
    }
  }
}

// função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

// função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  obj.innerHTML = obj.id; // mostra número da carta
  const img = new Image(60);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// função principal que verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 5); // sorteia entre 0 e 4

    if (obj.id == sorteado.toString()) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      obj.innerHTML = obj.id; // mostra número da carta

      // emoji triste na carta errada
      const imgErro = new Image(60);
      imgErro.id = "imagemErro";
      imgErro.src = "https://em-content.zobj.net/thumbs/160/apple/354/crying-face_1f622.png";
      obj.appendChild(imgErro);

      // mostra a carta correta com o emoji feliz
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);