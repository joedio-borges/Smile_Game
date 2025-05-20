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
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (i = 0; i < divis.length; i++) {
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id ==5) {
      divis[i].className = "inicial";
      while (divis[i].firstChild) {
        divis[i].removeChild(divis[i].firstChild);
      }
    }
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
      //altera a classe CSS da <div> escolhida pelo jogador (className)
      obj.className = "acertou";
      //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
      const img = new Image(100);
      img.id = "imagem";
      //altera o atributo src (source) da imagem criada
      //troquei a imagem do smile para um lacinho rosa
      img.src = "https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/svg/1f380.svg";
      //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
      obj.appendChild(img);
    }

    //função errou
    function errou(obj) {
      obj.className = "errou";
      const emojiDark = document.createElement('span');
      emojiDark.id = "dark_emoji";
      emojiDark.innerHTML = '💀'; // Ou o emoji escolhido
      emojiDark.style.fontSize = '80px';
      emojiDark.style.display = 'block';
      obj.appendChild(emojiDark);
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
        //alterei de 3 tentativas para 6
        if (tentativas == 6) {
          //oculta o botao joganovamente alterando a classe css (getElementById e className)
          btnJogarNovamente.className = 'invisivel';
          //mostra o botao reiniciar alterando a classe css (getElementById e className)
          btnReiniciar.className = 'visivel';
        }
        //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
        //era 3, mudei para 6
        let sorteado = Math.floor(Math.random() * 6);
        //se o id da <div> escolhida pelo jogador for igual ao número sorteado
        if (obj.id == sorteado) {
          //chama a funçao acertou passando a div escolhida pelo jogador
          acertou(obj);
          //incrementa o contador de acertos
          acertos++;
        } else {//se errou a tentativa
          //altera a classe da <div> escolhida pelo jogador para a classe errou
          obj.className = "errou";
            errou(obj); // Chamando a nova função
            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
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