    //declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let erros = 0;
    let jogar = true;
    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      erros = 0;
      jogar = true;
      jogarNovamente();
      atualizaPlacar(0, 0);
      //mostra o botao jogarnovamente alterando a classe css (className)
      btnJogarNovamente.className = 'visivel';
      //oculta o botao reiniciar alterando a classe css (className)
      btnReiniciar.className = 'invisivel';
      document.getElementById("resposta").className = 'invisivel';
    }

    //funçao jogar novamente
    function jogarNovamente() {
      jogar = true;//variável jogar volta a ser verdadeira
      //armazenamos todas as div na variável divis (getElementsByTagName)
      let divis = document.getElementsByTagName("div");
      //percorremos todas as divs armazenadas
      for (i = 0; i < divis.length; i++) {
        //verificamos se sao as divs com ids 0 ou 1 ou 2
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3) {
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
        }
      }
      let imagem = document.querySelector('.imagem')
      //armazenamos a imagem do Smile na variável imagem (getElementById)
      if (imagem != "") {
      //removemos a imagem do Smile
        imagem.remove();
      }
    }

    //funçao que atualiza o placar
    function atualizaPlacar(acertos,tentativas) {
      //calcula o desempenho em porcentagem
      desempenho = (acertos / tentativas) * 100;
      //escreve o placar com os valores atualizados (innerHTML)
      document.getElementById("resposta").innerHTML = "<b class='pla'>Placar</b> - <i>Acertos</i>: <s>" + acertos + "</s> <i>Erros</i>: <s>" + erros + "</s> <i>Tentativas</i>: <s>" + tentativas + " / 5</s> <i>Desempenho</i>: <s>" + Math.round(desempenho) + "%</s>";
      document.getElementById("resposta").className = 'visivel'
    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img1 = new Image(100);
      img1.className = "imagem";
      //altera o atributo src (source) da imagem criada
      img1.src = "imagens/sorriso.png";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      img1.style.width = "160px";
      obj.appendChild(img1);
    }
    function errou(obj) {
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "errou";
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
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 4);
        let sorteado2 = Math.floor(Math.random() * 4);
        while ((sorteado2 != sorteado) == false) {
           sorteado2 = Math.floor(Math.random() * 4);
        }
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          //incrementa o contador de acertos
          acertos++;
        } 
          if (obj.id == sorteado2) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          //incrementa o contador de acertos
          erros++;
        } //se errou a tentativa
          //altera a classe da <div> escolhida pelo jogador para a classe errou
          //armazena a div aonde Smile está escondido (getElementById)
          const objSorteado = document.getElementById(sorteado);
          const objSorteado2 = document.getElementById(sorteado2);
          //chama a funçao acertou para mostrar a div aonde está o Smile
          acertou(objSorteado)
          errou(objSorteado2)
        
        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
      }
        else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar novamente"');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);