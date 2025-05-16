    // Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos IDs
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores e reinicia o jogo
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel botao';
  btnReiniciar.className = 'invisivel';
}

// Função que limpa as imagens e classes das divs do jogo
function jogarNovamente() {
  jogar = true;

  // Percorre todas as divs
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    let div = divis[i];
    // Verifica se a div tem um ID numérico entre 0 e 3
    if (div.id == 0 || div.id == 1 || div.id == 2 || div.id == 3) {
      div.className = "inicial";

      // Remove imagens de acerto (Smile) ou erro (X) caso existam
      let imagem = div.querySelector("#imagem");
      if (imagem) {
        imagem.remove();
      }

      let imagemErro = div.querySelector("#imagemErro");
      if (imagemErro) {
        imagemErro.remove();
      }
    }
  }
}

// Atualiza o placar com acertos, tentativas e desempenho
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// Função chamada quando o jogador acerta
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem"; // cuidado para não repetir IDs
  img.src = "https://i.pinimg.com/736x/e5/8b/6d/e58b6dd2dc26a6614b54d534c11df759.jpg"; // smile
  obj.appendChild(img);
}

// Função chamada quando o jogador erra
function errou(obj) {
  obj.className = "errou";
  const imgErro = new Image(100);
  imgErro.id = "imagemErro"; // ID diferente do smile
  imgErro.src = "https://i.pinimg.com/736x/b0/e6/71/b0e671e6b2d8defe696771a3af6adc16.jpg"; // X vermelho
  obj.appendChild(imgErro);
}

// Função que sorteia a posição correta e verifica o clique do jogador
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    // Mostra os botões corretamente ao fim das tentativas
    if (tentativas == 4) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel botao';
    }

    // Sorteia um número de 0 a 3
    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado) {
      // Jogador acertou
      acertou(obj);
      acertos++;
    } else {
      // Jogador errou
      errou(obj);

      // Mostra onde estava o Smile
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona os eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
