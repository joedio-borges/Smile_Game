const baralho = [
  'imagem/card_king.png',
  'imagem/card_queen.png',
  'imagem/card_king.png',
  'imagem/card_queen.png'
];

const cartaCoringa = 'imagem/card_joker.png';

let coringaIndex = Math.floor(Math.random() * 3);
let totalCartas = 3;

function criarCartas() {
  const linha = document.getElementById('linha1');
  linha.innerHTML = '';
  for (let i = 0; i < totalCartas; i++) {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.id = i;
    carta.onclick = () => verifica(carta);

    const conteudo = document.createElement('div');
    conteudo.className = 'conteudo-carta';

    const frente = document.createElement('div');
    frente.className = 'face frente';
    frente.innerText = '🂠';

    const verso = document.createElement('img');
    verso.className = 'face verso';
    verso.src = i === coringaIndex ? cartaCoringa : baralho[i % baralho.length];
    verso.alt = "Carta revelada";

    conteudo.appendChild(frente);
    conteudo.appendChild(verso);
    carta.appendChild(conteudo);

    linha.appendChild(carta);
  }
}

function verifica(elemento) {
  if (elemento.classList.contains('virada')) return;
  elemento.classList.add('virada');
  const id = parseInt(elemento.id);
  const resposta = document.getElementById('resposta');
  if (id === coringaIndex) {
    resposta.textContent = 'Você encontrou o Coringa! Uma nova carta foi adicionada.';
    resposta.className = 'text-success fw-bold';
    setTimeout(() => {
      totalCartas++;
      coringaIndex = Math.floor(Math.random() * totalCartas);
      resposta.textContent = '';
      criarCartas();
    }, 1500);
  } else {
    resposta.textContent = 'Não foi dessa vez. Tente novamente!';
    resposta.className = 'text-danger fw-bold';
  }
}

function jogarNovamente() {
  totalCartas = 3;
  coringaIndex = Math.floor(Math.random() * totalCartas);
  document.getElementById('resposta').textContent = '';
  criarCartas();
}

function adicionarCarta() {
  totalCartas++;
  coringaIndex = Math.floor(Math.random() * totalCartas);
  document.getElementById('resposta').textContent = '';
  criarCartas();
}

criarCartas();
