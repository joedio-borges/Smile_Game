    let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

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

  let cartas = document.querySelectorAll(".inicial, .acertou, .errou");

  cartas.forEach(carta => {
    carta.className = "inicial";
    carta.innerHTML = "💙";
  });

  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = tentativas ? (acertos / tentativas) * 100 : 0;

  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

function acertou(obj) {
  obj.className = "acertou";

  const img = new Image(80);
  img.id = "imagem";
  img.src = "https://cdn-icons-png.flaticon.com/512/742/742751.png";

  obj.innerHTML = "";
  obj.appendChild(img);
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    let cartas = document.querySelectorAll(".inicial, .acertou, .errou");
    let sorteado = Math.floor(Math.random() * cartas.length);

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    }
     else {
  obj.className = "errou";

  obj.innerHTML = '<span style="font-size:70px;">🤡</span>';

  const objSorteado = document.getElementById(sorteado);
  acertou(objSorteado);
    }

    if (tentativas == 3) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    atualizaPlacar(acertos, tentativas);

  } else {
    alert('Clique em "Jogar novamente"');
  }
}

btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);