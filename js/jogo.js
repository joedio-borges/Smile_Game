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
        //verificamos se sao as divs com ids 0 a 4
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
          //alteramos a classe css das divs 0 a 4 (className)
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

    function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  let emoji = "😐";
  if (desempenho >= 80) emoji = "😎";
  else if (desempenho >= 50) emoji = "🙂";
  else if (desempenho > 0) emoji = "😕";
  
  document.getElementById("resposta").innerHTML = 
    `Placar - Acertos: ${acertos} ✅ | Tentativas: ${tentativas} 🔄 | Desempenho: ${Math.round(desempenho)}% ${emoji}`;
}

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    } 

    function verifica(obj) {
    if (jogar) {
        jogar = false;
        tentativas++;
        
        if (tentativas == 5) {
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }
        
        let sorteado = Math.floor(Math.random() * 5);
        
        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
            document.getElementById("resposta").textContent = "Acertou! 😊";
        } else {
            obj.innerHTML = "😢";
            obj.className = "errou";
            document.getElementById("resposta").textContent = "Errou! 😢";
            
            setTimeout(() => {
                const objSorteado = document.getElementById(sorteado);
                acertou(objSorteado);
            }, 800);
        }
        
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar novamente" para continuar');
    }
}

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
    //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
    let sorteado = Math.floor(Math.random() * 5);
    //se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (obj.id == sorteado) {
      //chama a funçao acertou passando a div escolhida pelo jogador
      acertou(obj);
      //incrementa o contador de acertos
      acertos++;
      // Adiciona feedback de acerto
      document.getElementById("resposta").textContent = "Acertou! 😊";
    } else {//se errou a tentativa
      //altera a classe da <div> escolhida pelo jogador para a classe errou
      obj.className = "errou";
      // Adiciona feedback de erro
      document.getElementById("resposta").textContent = "Errou! 😢";
      
      // Adiciona um pequeno atraso antes de revelar a carta certa
      setTimeout(() => {
        //armazena a div aonde Smile está escondido (getElementById)
        const objSorteado = document.getElementById(sorteado);
        //chama a funçao acertou para mostrar a div aonde está o Smile
        acertou(objSorteado);
      }, 500);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);