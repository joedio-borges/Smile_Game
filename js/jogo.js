document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const areaCartas = document.getElementById('area-cartas');
    const btnJogarNovamente = document.getElementById('jogar-novamente');
    const btnReiniciar = document.getElementById('reiniciar');
    const mensagem = document.getElementById('mensagem');
    const tentativasSpan = document.getElementById('tentativas');
    const recordeSpan = document.getElementById('recorde');
    const selectDificuldade = document.getElementById('dificuldade');

    // Variáveis do jogo
    let posicaoSmile;
    let tentativas = 0;
    let jogoAtivo = true;
    let numCartas = 4; // Padrão: normal (4 cartas)
    let sequenciaAtual = 0;
    let recordeSequencia = parseInt(localStorage.getItem('recordeSequencia')) || 0;
    recordeSpan.textContent = recordeSequencia;

    // Inicializa o jogo
    novoJogo();

    // Cria as cartas do jogo
    function criarCartas() {
        areaCartas.innerHTML = ''; // Limpa as cartas existentes
        
        for (let i = 0; i < numCartas; i++) {
            const carta = document.createElement('div');
            carta.className = 'caixa-jogo';
            carta.id = i;
            carta.textContent = '?';
            carta.onclick = function() { verifica(this); };
            areaCartas.appendChild(carta);
        }
    }

    function novoJogo() {
        jogoAtivo = true;
        tentativas = 0;
        tentativasSpan.textContent = tentativas;
        mensagem.style.display = 'none';

        // Define o número de cartas baseado na dificuldade selecionada
        numCartas = parseInt(selectDificuldade.value);
        criarCartas();

        // Escolhe uma posição aleatória para o smile
        posicaoSmile = Math.floor(Math.random() * numCartas);

        btnJogarNovamente.style.display = 'none';
        btnReiniciar.style.display = 'none';
    }

    window.verifica = function (elemento) {
        if (!jogoAtivo) return;

        tentativas++;
        tentativasSpan.textContent = tentativas;

        const id = parseInt(elemento.id);

        if (id === posicaoSmile) {
            // Acertou
            elemento.classList.add('correta', 'virada');
            elemento.innerHTML = '<i class="bi bi-emoji-smile-fill smile"></i>';

            mensagem.textContent = `Parabéns! Você encontrou o smile em ${tentativas} tentativa(s)!`;
            mensagem.className = 'alert alert-success fs-5';
            mensagem.style.display = 'block';

            if (tentativas === 1) {
                // Acertou de primeira
                confetti();
                sequenciaAtual++;

                if (sequenciaAtual > recordeSequencia) {
                    recordeSequencia = sequenciaAtual;
                    recordeSpan.textContent = recordeSequencia;
                    localStorage.setItem('recordeSequencia', recordeSequencia);
                }
            } else {
                // Interrompe sequência
                sequenciaAtual = 0;
            }

            jogoAtivo = false;
            btnJogarNovamente.style.display = 'inline-block';
            btnReiniciar.style.display = 'inline-block';
        } else {
            // Errou
            elemento.classList.add('errada', 'virada');
            elemento.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/179/179386.png" width="40" height="40" alt="Erro">';

            mensagem.textContent = 'Você errou! Tente novamente.';
            mensagem.className = 'alert alert-danger fs-5';
            mensagem.style.display = 'block';

            jogoAtivo = false;
            btnJogarNovamente.style.display = 'inline-block';
            btnReiniciar.style.display = 'inline-block';

            // Revela onde estava o smile
            const cartas = document.querySelectorAll('.caixa-jogo');
            cartas[posicaoSmile].innerHTML = '<i class="bi bi-emoji-smile-fill smile"></i>';
            cartas[posicaoSmile].classList.add('correta', 'virada');

            // Quebra sequência
            sequenciaAtual = 0;
        }
    };

    // Event Listeners
    btnJogarNovamente.addEventListener('click', novoJogo);
    btnReiniciar.addEventListener('click', function () {
        recordeSequencia = 0;
        sequenciaAtual = 0;
        recordeSpan.textContent = recordeSequencia;
        localStorage.setItem('recordeSequencia', recordeSequencia);
        novoJogo();
    });

    // Quando a dificuldade é alterada, reinicia o jogo
    selectDificuldade.addEventListener('change', function() {
        novoJogo();
    });

    // Função confete
    function confetti() {
        const duration = 1 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confettiLib({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            confettiLib({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }

    // Corrige confetti global
    const confettiLib = window.confetti || function () { };
});