// Configurações do jogo
const NUM_CARDS = 9;
const MAX_ATTEMPTS = 3;
const HAPPY_ASCII = "(^ヮ^)";
const SAD_ASCII = "(╥_╥)";

// Estado do jogo
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
let cartaVencedoraId = null; // Adicione esta variável global

// Elementos do DOM
const btnProximaTentativa = document.getElementById('proxima-tentativa');
const btnReiniciarJogo = document.getElementById('reiniciar-jogo');
const placar = document.getElementById("resposta");
const cards = document.querySelectorAll('.card-item');
const effectContainer = document.getElementById('effect-container');

// Inicializa o jogo
function init() {
    // Adiciona event listeners
    cards.forEach(card => {
        card.addEventListener('click', () => verificarEscolha(card));
        card.innerHTML = card.id;
    });
    
    btnProximaTentativa.addEventListener('click', prepararNovaTentativa);
    btnReiniciarJogo.addEventListener('click', iniciarNovoJogo);
    
    prepararNovaTentativa(); // Sorteia a primeira carta vencedora

    // Atualiza o placar inicial
    atualizarPlacar();
}

// Exibe o resultado (ASCII) no card
function mostrarResultadoNoCard(cardElement, isHappy) {
    cardElement.innerHTML = '';
    const asciiDiv = document.createElement('div');
    asciiDiv.textContent = isHappy ? HAPPY_ASCII : SAD_ASCII;
    asciiDiv.style.fontSize = "40px";
    asciiDiv.style.fontFamily = "monospace";
    cardElement.appendChild(asciiDiv);
}

// Efeito de explosão
function dispararExplosao() {
    effectContainer.innerHTML = '<h1>💥 BOOM! 💥</h1><p>0% de acertos...</p>';
    effectContainer.className = 'explosion-effect';
    setTimeout(() => {
        effectContainer.innerHTML = '';
        effectContainer.className = '';
    }, 3000);
}

// Efeito de confetes
function dispararConfetes() {
    effectContainer.innerHTML = '<h1>🎉 PARABÉNS! 🎉</h1><p>100% de acertos!</p>';
    effectContainer.className = 'confetti-effect';
    setTimeout(() => {
        effectContainer.innerHTML = '';
        effectContainer.className = '';
    }, 3000);
}

// Verifica a escolha do jogador
function verificarEscolha(cardSelecionado) {
    if (!jogar) return;
    
    jogar = false;
    tentativas++;
    
    // Verifica se o jogo terminou
    if (tentativas >= MAX_ATTEMPTS) {
        btnProximaTentativa.classList.add('invisivel');
        btnReiniciarJogo.classList.remove('invisivel');
    }
    
    // NÃO sorteie aqui! Use a cartaVencedoraId já sorteada
    const cartaVencedora = document.getElementById(cartaVencedoraId);
    
    // Verifica se acertou
    if (cardSelecionado.id === cartaVencedoraId) {
        cardSelecionado.className = "acertou card-item";
        mostrarResultadoNoCard(cardSelecionado, true);
        acertos++;
    } else {
        cardSelecionado.className = "errou card-item";
        mostrarResultadoNoCard(cardSelecionado, false);
        cartaVencedora.className = "acertou card-item";
        mostrarResultadoNoCard(cartaVencedora, true);
    }
    
    atualizarPlacar();

    if (tentativas >= MAX_ATTEMPTS) {
        if (desempenho === 0) {
            dispararExplosao();
        } else if (desempenho === 100) {
            dispararConfetes();
        }
    }
}

// Prepara uma nova tentativa
function prepararNovaTentativa() {
    jogar = true;
    // Sorteia a carta vencedora para a nova rodada
    cartaVencedoraId = Math.floor(Math.random() * NUM_CARDS).toString();
    // Reseta todas as cartas
    cards.forEach(card => {
        card.className = "inicial card-item";
        card.innerHTML = card.id;
    });
    effectContainer.innerHTML = '';
    effectContainer.className = '';
}

// Inicia um novo jogo completo
function iniciarNovoJogo() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    prepararNovaTentativa();
    btnProximaTentativa.classList.remove('invisivel');
    btnReiniciarJogo.classList.add('invisivel');
    atualizarPlacar();
}

// Atualiza o placar
function atualizarPlacar() {
    desempenho = tentativas > 0 ? Math.round((acertos / tentativas) * 100) : 0;
    placar.innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${desempenho}%`;
}

// Inicia o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', init);