let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
const maxTentativas = 5;

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
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id >= 0 && divis[i].id <= 5) {
      divis[i].className = "inicial";
      // Remove imagem anterior, se houver
      const imagem = divis[i].querySelector("img");
      if (imagem) imagem.remove();
    }
  }
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} (${desempenho.toFixed(0)}%)`;

  // Verifica se o jogador errou todas
  if (tentativas === maxTentativas && acertos === 0) {
    mostrarDerrota();
  }
}

function acertou(obj) {
  obj.className = "acertou";
  removeImagem(obj);
  const img = new Image(100);
  img.id = "imagem-acerto";
  img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=2601&key=417d70fab29657fdeb2c50d97313138c";
  obj.appendChild(img);
}

function errou(obj) {
  obj.className = "errou";
  removeImagem(obj);
  const img = new Image(100);
  img.id = "imagem-erro";
  img.src = "https://sig.ifc.edu.br/shared/verFoto?idFoto=2607621&key=4a5f5a7b04dc46e836271a6e47c3ed4f"; // ícone triste
  obj.appendChild(img);
}

function removeImagem(obj) {
  const img = obj.querySelector("img");
  if (img) img.remove();
}

function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas === maxTentativas) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    let sorteado = Math.floor(Math.random() * 6); // IDs de 0 a 5
    if (parseInt(obj.id) === sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado);
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}


btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

function mostrarDerrota() {
  const body = document.querySelector("body");
  body.classList.add("derrota");

  // Cria e mostra uma imagem animada
  const img = document.createElement("img");
  img.src = "img/triste.jpg"; // Substitua pelo nome correto da sua imagem
  img.id = "imgDerrota";
  img.style.position = "fixed";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";
  img.style.zIndex = "1000";

  img.style.width = "350px";  // ou 100px, 200px, como preferir
  img.style.height = "auto";  // mantém a proporção

  document.body.appendChild(img);

  // Remove a imagem após 3 segundos
  setTimeout(() => {
    body.classList.remove("derrota");
    img.remove();
  }, 3000);
}
