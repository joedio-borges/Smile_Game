// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true; // Esta variável controla se o jogo pode ser jogado

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;  // Garantir que o jogo seja reiniciado
  jogarNovamente();
  atualizaPlacar(0, 0);
  // Mostra o botão "Jogar novamente" alterando a classe CSS (className)
  btnJogarNovamente.className = 'visivel';
  // Oculta o botão "Reiniciar" alterando a classe CSS (className)
  btnReiniciar.className = 'invisivel';
}

// Função "Jogar novamente"
function jogarNovamente() {
  jogar = true; // A variável jogar volta a ser verdadeira
  //armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  //percorremos todas as divs armazenadas
  for (let i = 0; i < divis.length; i++) {
  //verificamos se sao as divs com ids 0 ou 1 ou 2
  if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
  //alteramos a classe css das divs 0, 1 e 2 (className)
      divis[i].className = "inicial"; // Reseta a classe CSS das divs
    }
  }

  //armazenamos a imagem do Smile na variável imagem (getElementById)
  let imagem = document.getElementById("imagem");
  //se a imagem nao for vazia (se ela existir)
  if (imagem != "") {
    //removemos a imagem do Smile
    imagem.remove();
  }

  // Limpa a imagem de erro, se houver
  let imagemErro = document.getElementById("imagem2");
  if (imagemErro) {
    imagemErro.remove();
  }
}

//funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }

// Função que aplica a animação de tremor nas cartas
function aplicarTremorNasCartas() {
  let cartas = document.getElementsByClassName("inicial");  // Procurando pelas cartas com a classe 'inicial'

  for (let i = 0; i < cartas.length; i++) {
    cartas[i].classList.add("tremor");  // Adiciona a classe 'tremor' às cartas
  }

  // Remove a classe de tremor após o tempo da animação
  setTimeout(function() {
    for (let i = 0; i < cartas.length; i++) {
      cartas[i].classList.remove("tremor");  // Remove a classe 'tremor' após a animação
    }
  }, 500);  // Tempo da animação (em ms)
}

// Função que exibe mensagens no final do jogo
function exibirMensagem(mensagem) {
  let divMensagem = document.createElement("div");
  divMensagem.id = "mensagemFinal";
  divMensagem.className = "mensagemFinal";
  divMensagem.innerHTML = mensagem;
  document.body.appendChild(divMensagem);
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://artpoin.com/wp-content/uploads/2023/10/artpoin-sonic-the-hedgehog8.png";
  obj.appendChild(img);
}

//Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
function verifica(obj) {
  //se jogar é verdadeiro
  if (jogar) {
    //jogar passa a ser false
    jogar = false;
    //incrementa as tentativas
    tentativas++;
    //verifica se jogou 3 vezes
    if (tentativas == 5) {
      //oculta o botao joganovamente alterando a classe css (getElementById e className)
      btnJogarNovamente.className = 'invisivel';
      //mostra o botao reiniciar alterando a classe css (getElementById e className)
      btnReiniciar.className = 'visivel';
    }

    // Limpar qualquer imagem de erro anterior
    let imagemErro = obj.querySelector("#imagem2");
    if (imagemErro) {
      obj.removeChild(imagemErro);
    }

    // Verifica se a carta clicada é a certa
    if (obj.id === "certa") {  // Verifica se a carta clicada é a carta correta
      acertou(obj);
      acertos++;
    } else {
      obj.className = "errou";
      const img = new Image(100);
      img.id = "imagem2"; // Identificando a imagem de erro
      img.src = "https://compras.wiki.ufsc.br/images/5/56/Erro.png";
      obj.appendChild(img);

      // Se o jogador errar, mostra a carta certa
      const cartaCerta = document.getElementById("certa");
      acertou(cartaCerta);
    }

    // Verifica se o jogador acertou todas as tentativas
    if (acertos === tentativas) {
      exibirMensagem("Parabéns! Você acertou todas as respostas!");
      mudarCorDasCartas();  // Função para mudar a cor das cartas
    } else if (tentativas == 5) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    
      // Verifica se o jogador errou todas as tentativas
      if (acertos === 0) {
        exibirMensagem("Que pena! Você errou todas as respostas. Tente novamente!");
        aplicarTremorNasCartas();  // Aplica a animação de tremor
      }
    }

  // Função para mudar a cor de todas as cartas quando o jogador acertar todas as tentativas
if (acertos ===5) {
  function mudarCorDasCartas() {
    let cartas = document.getElementsByClassName("inicial");  // Procurando todas as cartas com a classe 'inicial'
    
    // Itera sobre todas as cartas e altera a cor
    for (let i = 0; i < cartas.length; i++) {
      cartas[i].style.backgroundColor = "green";  // Altera a cor de fundo da carta para verde
      cartas[i].style.color = "white";  // Altera a cor do texto para branco
      cartas[i].style.borderColor = "darkgreen";  // Altera a cor da borda para verde escuro
    }

     //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
   let sorteado = Math.floor(Math.random() * 5);
   //se o id da <div> escolhida pelo jogador for igual ao número sorteado
   if (obj.id == sorteado) {
     //chama a funçao acertou passando a div escolhida pelo jogador
     acertou(obj);
     //incrementa o contador de acertos
     acertos++;
   } else {//se errou a tentativa
     //altera a classe da <div> escolhida pelo jogador para a classe errou
     obj.className = "errou";
     //armazena a div aonde Smile está escondido (getElementById)
     const objSorteado = document.getElementById(sorteado);
     //chama a funçao acertou para mostrar a div aonde está o Smile
     acertou(objSorteado);
   }

   // Atualiza o placar
   atualizaPlacar(acertos, tentativas);

  } }
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

   // Atualiza o placar
   atualizaPlacar(acertos, tentativas);

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

