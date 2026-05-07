// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//  Captura os botões pelos IDs
const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

// Função que zera o jogo completamente
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente(); // Reseta visualmente as cartas
  atualizaPlacar(0, 0); // Zera o texto do placar

  // Ajusta a visibilidade dos botões
  btnJogarNovamente.className = "visivel";
  btnReiniciar.className = "invisivel";
}

// Função para preparar uma nova rodada
function jogarNovamente() {
  jogar = true;

  // Seleciona todas as divs para resetar as cartas (0 a 4)
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    // Verifica se o ID é um número entre 0 e 4
    if (divis[i].id >= "0" && divis[i].id <= "4" && divis[i].id !== "") {
      divis[i].className = "inicial";
    }
  }

  // Remove a ilustração do coração da rodada anterior, se existir
  let imagemExistente = document.getElementById("imagem");
  if (imagemExistente) {
    imagemExistente.remove();
  }
}

// Função que atualiza o placar na tela
function atualizaPlacar(acertos, tentativas) {
  if (tentativas > 0) {
    desempenho = (acertos / tentativas) * 100;
  } else {
    desempenho = 0;
  }

  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

//  Função executada quando o coração deve ser mostrado
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  // Nova URL para um coração rosa/vermelho:
  img.src =
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_corazón.svg";
  obj.appendChild(img);
}

//  Função principal de verificação do clique
function verifica(obj) {
  if (jogar) {
    jogar = false; // Bloqueia novos cliques até "Jogar Novamente"
    tentativas++;

    // Se chegar a 3 tentativas, troca os botões para "Reiniciar"
    if (tentativas == 3) {
      btnJogarNovamente.className = "invisivel";
      btnReiniciar.className = "visivel";
    }

    // Sorteia um número aleatório entre 0 e 4
    let sorteado = Math.floor(Math.random() * 5);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      // Se errou, mostra onde você clicou (vermelho/rosa erro)
      // e onde o smile estava
      obj.className = "errou";
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente" para continuar!');
  }
}

// Adiciona os eventos de clique aos botões
btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);
