//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  //mostra o botao jogarnovamente alterando a classe css (className)
  btnJogarNovamente.className = "visivel";
  //oculta o botao reiniciar alterando a classe css (className)
  btnReiniciar.className = "invisivel";
}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;
  for (let i = 0; i <= 4; i++) {
    let div = document.getElementById(i);
    div.className = "inicial";
    div.innerHTML = i; // Garante que só o número aparece
  }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " +
    acertos +
    " Tentativas: " +
    tentativas +
    " Desempenho: " +
    Math.round(desempenho) +
    "%";
}

//funçao executada quando o jogador acertou
function acertou(obj) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "acertou";
  //limpa o conteúdo antigo antes de adicionar a imagem
  obj.innerHTML = "";
  //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  //altera o atributo src (source) da imagem criada
  img.src =
    "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);
}

//funçao executada quando o jogador errou
function errou(obj) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "errou";
  //limpa o conteúdo antigo antes de adicionar a imagem
  obj.innerHTML = "";
  //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem-erro";
  //altera o atributo src (source) da imagem criada para uma cara triste
  img.src =
    "https://ufsb.edu.br/residenciapedagogica/imagens/1-galeria-de-imagens-01/detail/3-imagem-3-titulo-com-ate-45-caracteres?tmpl=component&phocadownload=1";
  //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
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
      btnJogarNovamente.className = "invisivel";
      //mostra o botao reiniciar alterando a classe css (getElementById e className)
      btnReiniciar.className = "visivel";
    }
    //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
    let sorteado = Math.floor(Math.random() * 5);
    //se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (obj.id == sorteado) {
      //chama a funçao acertou passando a div escolhida pelo jogador
      acertou(obj);
      //incrementa o contador de acertos
      acertos++;
    } else {
      //se errou a tentativa
      //chama a função errou para mostrar a imagem de erro na div escolhida
      errou(obj);
      //armazena a div aonde Smile está escondido (getElementById)
      const objSorteado = document.getElementById(sorteado);
      //chama a funçao acertou para mostrar a div aonde está o Smile
      acertou(objSorteado);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {
    //se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}

//adiciona eventos aos botões
btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);
