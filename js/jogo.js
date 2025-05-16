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
    //verificamos se sao as divs com ids 0 ou 1 ou 2 ou 3 ou 4
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4) {
      //alteramos a classe css das divs 0, 1, 2, 3 e 4 (className)
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
  let imagemErro = document.getElementById("ImagemErro");
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

//funçao executada quando o jogador acertou
function mostrarAcerto(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://i.pinimg.com/736x/71/c0/31/71c031b63d6a9380258c4bd815fd285c.jpg";
  obj.appendChild(img);
  obj.classList.add("efeito-acerto", "giro");

  setTimeout(() => obj.classList.remove("efeito-acerto"), 3000);
  setTimeout(() => obj.classList.remove("giro"), 600);

  const som = document.getElementById("somAcerto");
  if (som) {
    som.pause();
    som.currentTime = 0;
    somAcerto.volume = 1.0; 
    som.play().catch((err) => console.warn("Erro ao tocar som:", err));
  }

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function mostrarSmile(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "https://i.pinimg.com/736x/71/c0/31/71c031b63d6a9380258c4bd815fd285c.jpg";
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
    //verifica se jogou 5 vezes
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
      mostrarAcerto(obj); // confete e som
      acertos++;
    } else {
      obj.className = "errou";

      // Toca o som de erro
      const somErro = document.getElementById("somErro");
      if (somErro) {
        somErro.pause();
        somErro.currentTime = 0; // Reinicia o som
        somErro.volume = 0.7; 
        somErro.play().catch((error) => {
          console.warn("Erro ao tocar som de erro:", error);
        });
      }

      const objSorteado = document.getElementById(sorteado);
      mostrarSmile(objSorteado); // sem confete
      const img = new Image(100);
      img.src = "https://i.pinimg.com/736x/a1/9c/b9/a19cb9604c82eb85b51fca32315433d7.jpg";
      img.id = "ImagemErro";
      obj.appendChild(img);
      obj.classList.add("efeito-erro", "sacudir");
      setTimeout(() => {
        obj.classList.remove("efeito-erro", "sacudir");
      }, 1000);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente" AGORA');
  }
}



//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);