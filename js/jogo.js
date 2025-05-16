    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2) {
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
        }
      }

      //armazenamos a imagem do Smile na variável imagem (getElementById)
      let imagem = document.getElementById("imagem");
      //se a imagem nao for vazia (se ela existir)
      if (imagem != "") {
        //removemos a imagem do Smile
        imagem.remove();
      }
    }

    //funçao que atualiza o placar
    function atualizaPlacar(acertos, tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";

    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      // Altera a classe para "acertou"
      obj.className = "acertou";
      
      // Adiciona a animação de acerto
      obj.classList.add('acertouAnimacao');
      
      // Cria a imagem do Slime
      const img = new Image(100);
      img.id = "imagem";
      img.src = "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/163A6/production/_104764019_gettyimages-873395522.jpg.webp";
      obj.appendChild(img);
    
      // Remove a animação de acerto após 0.5 segundos (tempo da animação)
      setTimeout(() => {
        obj.classList.remove('acertouAnimacao');
      }, 500);
    }
    

    //Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
   // Função executada quando o jogador erra
// Função que executa quando o jogador erra ou acerta
// Função executada quando o jogador erra
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas == 10) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 3);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      obj.className = "erro"; // Altera a classe para erro
      obj.classList.add('erroAnimado'); // Adiciona a animação de erro

      // Cria a imagem de erro e a posiciona dentro da carta de erro
      const imgErro = new Image(50); // Tamanho ajustado para caber na carta
      imgErro.src = "https://images.icon-icons.com/3413/PNG/512/sad_emoji_icon_217677.png"; // Link da imagem de erro
      imgErro.alt = "Erro!";
      obj.appendChild(imgErro); // Adiciona a imagem dentro da div

      setTimeout(() => {
        obj.classList.remove('erroAnimado'); // Remove a animação de erro
        imgErro.remove(); // Remove a imagem de erro após a animação
      }, 1000); // O tempo aqui deve coincidir com a duração da animação

      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);

      const mensagemErro = document.getElementById('mensagemErro');
      if (mensagemErro) {
        mensagemErro.innerHTML = "Você errou! Tente novamente!";
        mensagemErro.style.color = 'red';
        mensagemErro.classList.add('mensagemErroAnimada'); // Aplica animação à mensagem de erro
        
        // Remove a animação após a duração
        setTimeout(() => {
          mensagemErro.classList.remove('mensagemErroAnimada');
        }, 500);
      }
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Função que exibe a mensagem de resultado (quando acerta ou erra todas as alternativas)


    
    
//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);