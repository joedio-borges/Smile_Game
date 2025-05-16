// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  removerTrofeu();
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (["0", "1", "2", "3", "4", "5"].includes(divis[i].id)) {
      divis[i].className = "inicial";
      const erroSpan = divis[i].querySelector(".mensagem-erro");
      if (erroSpan) {
        erroSpan.remove();
      }
    }
  }

  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }

  removerTrofeu();
}

// Atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

  // Tremor se desempenho for 0 e houver pelo menos uma tentativa
  if (desempenho === 0 && tentativas > 0) {
    let cartas = document.querySelectorAll("div[id]");
    cartas.forEach(carta => {
      if (["0", "1", "2", "3", "4", "5"].includes(carta.id)) {
        carta.classList.add("tremer");
        setTimeout(() => {
          carta.classList.remove("tremer");
        }, 500);
      }
    });
  }

  // Mostra o troféu apenas se acertar todas as 6 tentativas
  if (acertos === 6 && tentativas === 6) {
    mostrarTrofeu();
  } else {
    removerTrofeu();
  }
}

// Mostra o Smile (sem confetes)
function mostrarSmile(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// Jogador acertou: mostra Smile + confetes
function acertou(obj) {
  mostrarSmile(obj);
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Exibe a mensagem de "ERROU" na carta errada
function mostrarErro(obj) {
  const erroSpan = document.createElement("span");
  erroSpan.textContent = "ERROU";
  erroSpan.className = "mensagem-erro";
  obj.appendChild(erroSpan);
}

// Sorteia um número aleatório e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 6) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6);
    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const objSorteado = document.getElementById(sorteado);
      mostrarSmile(objSorteado);
      mostrarErro(obj);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Mostra troféu se 6 acertos em 6 tentativas
function mostrarTrofeu() {
  if (!document.getElementById("trofeu")) {
    const img = new Image(100);
    img.id = "trofeu";
    img.src = "https://cdn-icons-png.flaticon.com/512/2278/2278992.png";
    document.getElementById("resposta").appendChild(img);
  }
}

// Remove troféu se desempenho não for 100% com 6 acertos
function removerTrofeu() {
  const trofeu = document.getElementById("trofeu");
  if (trofeu) {
    trofeu.remove();
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
