// Variáveis de estado do jogo
let rodadas = 0;
let acertos = 0;
let jogar = true;
let cardComSmile = null;

// Elementos da interface
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const resposta = document.getElementById('resposta');

// Inicializa o jogo
function iniciarJogo() {
    // Escolhe aleatoriamente um card para conter o smile (1-6)
    cardComSmile = Math.floor(Math.random() * 6) + 1;
    jogar = true;
    atualizarPlacar();
    atualizarBotoes(false, false);

    // Reseta todos os cards com animação
    document.querySelectorAll('.game-card').forEach((card, index) => {
        resetarCard(card);
        setTimeout(() => animarFlip(card), index * 100);
    });
}

// Atualiza o placar
function atualizarPlacar() {
    const porcentagem = rodadas > 0 ? Math.round((acertos / rodadas) * 100) : 0;
    resposta.textContent = `🎯 Acertos: ${acertos} | 🎲 Rodadas: ${rodadas}/5 | 📊 Desempenho: ${porcentagem}%`;
}

// Atualiza visibilidade dos botões
function atualizarBotoes(jogarNovamenteVisivel, reiniciarVisivel) {
    btnJogarNovamente.classList.toggle('invisivel', !jogarNovamenteVisivel);
    btnReiniciar.classList.toggle('invisivel', !reiniciarVisivel);
}

// Animação de flip
function animarFlip(elemento) {
    elemento.style.animation = 'flipIn 0.5s ease';
    setTimeout(() => {
        elemento.style.animation = '';
    }, 500);
}

// Reseta um card individualmente
function resetarCard(card) {
    card.className = 'game-card';
    const img = card.querySelector('img');
    if (img) img.remove();
    card.textContent = card.id;
}

// Mostra o smile no card
function mostrarSmile(card) {
    card.classList.add('acertou');
    const img = document.createElement('img');
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg';
    img.alt = 'Smile';
    img.style.width = '80%';
    img.style.height = '80%';
    card.textContent = '';
    card.appendChild(img);
    animarFlip(img);

    // Efeito de confete ao acertar
    if (parseInt(card.id) === cardComSmile) {
        criarConfete();
    }
}

// Cria efeito de confete
function criarConfete() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = '1';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        // Remove o confete após a animação
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Lógica principal do jogo
function verifica(cardClicado) {
    if (!jogar) {
        alert('Clique em "Jogar novamente" para continuar');
        return;
    }

    rodadas++;
    const idCardClicado = parseInt(cardClicado.id);

    if (idCardClicado === cardComSmile) {
        acertos++;
        mostrarSmile(cardClicado);
    } else {
        cardClicado.classList.add('errou');
        setTimeout(() => {
            const cardCorreto = document.getElementById(cardComSmile.toString());
            mostrarSmile(cardCorreto);
        }, 500);
    }

    jogar = false;
    atualizarPlacar();

    if (rodadas >= 5) {
        atualizarBotoes(false, true);
    } else {
        atualizarBotoes(true, false);
    }
}

// Event listeners
btnJogarNovamente.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', () => {
    rodadas = 0;
    acertos = 0;
    iniciarJogo();
});

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', iniciarJogo);
