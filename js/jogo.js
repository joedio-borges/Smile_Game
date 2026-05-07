    //declaraçao das variaveis globais
  let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// sorteia número de 0 a 4 (5 cartas)
let sorteado = Math.floor(Math.random() * 5);

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;

  jogarNovamente();
  atualizaPlacar(0, 0);

  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

function jogarNovamente() {
  jogar = true;

  // novo sorteio
  sorteado = Math.floor(Math.random() * 5);

  let cartas = document.querySelectorAll("#linha1 div");

  cartas.forEach(carta => {
    carta.className = "inicial";
    carta.innerHTML = carta.id;
  });

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;

  document.getElementById("resposta").innerHTML =
    "Acertos: " + acertos +
    " | Tentativas: " + tentativas +
    " | Desempenho: " + Math.round(desempenho) + "%";
}

function acertou(obj) {
  obj.className = "acertou";

  const img = new Image(80);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";

  obj.appendChild(img);
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas === 3) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    if (parseInt(obj.id) === sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);  // Chama a função de erro na carta clicada
      acertou(document.getElementById(sorteado));  // Mostra a correta
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

function errou(obj) {
  obj.className = "errou";
  obj.innerHTML = "";

  const img = new Image(100);
  img.id = "imagem-erro";
  img.src = "https://img.a.transfermarkt.technology/portrait/big/68290-1692601435.jpg?lm=1";  // Foto do Vinícius Jr. de terno

  obj.appendChild(img);  // Corrigido: appendChild
}
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);