// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Mostra o botão jogar novamente
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão reiniciar
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true; // Variável jogar volta a ser verdadeira
  // Armazenamos todas as divs na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  // Percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
    // Verificamos se são as divs com ids 0, 1, 2 ou 3
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
      // Alteramos a classe CSS das divs para 'inicial'
      divis[i].className = "inicial";
      divis[i].innerHTML = divis[i].id; // Adiciona o número de volta
    }
  }

  // Armazenamos a imagem do Smile na variável imagem (getElementById)
  let imagem = document.getElementById("imagem");
  // Se a imagem não for vazia (se ela existir)
  if (imagem != "") {
    // Removemos a imagem do Smile
    imagem.remove();
  }

  // Imagem de erro
  let imagemErro = document.getElementById("imagemErro");
  // Se a imagem de erro existir, removemos ela também
  if (imagemErro != "") {
    imagemErro.remove();
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " + acertos +
    " Tentativas: " + tentativas +
    " Desempenho: " + Math.round(desempenho) + "%";
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100); // Cria a imagem com largura de 100px
  img.id = "imagem";
  img.src = "https://i1.sndcdn.com/avatars-000040422234-su9tw5-t1080x1080.jpg"; // Imagem do acerto
  obj.appendChild(img); // Adiciona a imagem à div
}

// Função executada quando o jogador errou
function errou(obj) {
  obj.innerHTML = ""; // Remove o conteúdo da div
  obj.className = "errou";
  const img = new Image(100); // Cria a imagem com largura de 100px
  img.id = "imagemErro";
  img.src = "https://www.nicelembrancinhas.com.br/image/cache/catalog/DIVERTIDAMENTE/TRISTEZA-650x650.jpg"; // Imagem de erro
  obj.appendChild(img); // Adiciona a imagem de erro à div

  // Esconde o número que estava dentro da div quando errou
 
}

// Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    let sorteado = Math.floor(Math.random() * 4);

    if (obj.id == sorteado) {
      acertou(obj); // Se acertou, chama a função de acerto
      acertos++;
    } else {
      errou(obj); // Se errou, chama a função de erro

      // Armazena a div onde o Smile está escondido (getElementById)
      const objSorteado = document.getElementById(sorteado);
      // Chama a função acertou para mostrar a div onde está o Smile
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);

    if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);