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
        if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id==3 || divis[i].id==4 || divis[i].id==5 || divis[i].id==6 || divis[i].id==7 || divis[i].id==8 || divis[i].id==9 || divis[i].id==10 || divis[i].id==11) {
          //alteramos a classe css das divs 0, 1 e 2 (className)
          divis[i].className = "inicial";
        }
      }

      //armazenamos a imagem do Smile na variável imagem (getElementById)
      let imagens = document.querySelectorAll("img");
        imagens.forEach(img => img.remove());
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
  obj.className = "acertou";

  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Flogodetimes.com%2Ftimes%2Fgremio%2Flogo-gremio-4096.png&sp=1747745656Tda3c99696d23b2635341818992a9a7429414662326be41cc50d01a738470dac3";
  obj.appendChild(img);

  // Toca som de torcida
  const som = document.getElementById("som-gremio");
  som.currentTime = 0;
  som.play();

  // Confetes!
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}


    function errou(obj) {
  obj.className = "errou";

  const imgerro = new Image(100);
  imgerro.id = "errado";
  imgerro.src = "https://logodetimes.com/times/internacional/logo-internacional-4096.png";
  obj.appendChild(imgerro);

  // Toca som de erro
  const som = document.getElementById("som-erro");
  som.currentTime = 0;
  som.play();

  // Chuva de tomates
  for (let i = 0; i < 12; i++) {
    const tomate = document.createElement("img");
    tomate.src = "https://cdn-icons-png.flaticon.com/512/590/590685.png";
    tomate.className = "tomate";
    tomate.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(tomate);
    setTimeout(() => tomate.remove(), 2000);
  }
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
        if (tentativas == 10) {
          //oculta o botao joganovamente alterando a classe css (getElementById e className)
          btnJogarNovamente.className = 'invisivel';
          //mostra o botao reiniciar alterando a classe css (getElementById e className)
          btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        let sorteado = Math.floor(Math.random() * 11);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          acertou(obj);
          //incrementa o contador de acertos
          acertos++;
        } else {//se errou a tentativa
          //altera a classe da <div> escolhida pelo jogador para a classe errou
          errou(obj);
          //armazena a div aonde Smile está escondido (getElementById)
          const objSorteado = document.getElementById(sorteado);
          //chama a funçao acertou para mostrar a div aonde está o Smile
          acertou(objSorteado);
        }
        //chama a funçao que atualiza o placar
        atualizaPlacar(acertos, tentativas);
      } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
        alert('Clique em "Jogar Novamente"');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);