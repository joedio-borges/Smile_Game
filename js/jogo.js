//declaraçao das variaveis globais
    let desempenho = 0;
    let tentativas = 0;
    let acertos = 0;
    let jogar = true;
    let specialEffectTriggeredThisRound = false; // Flag to trigger effects once per "end game" state

    //captura os botoes pelos ids e adiciona um evento de clique
    const btnReiniciar = document.getElementById('reiniciar');
    const btnJogarNovamente = document.getElementById('joganovamente');
    const explosaoOverlay = document.getElementById('explosao-overlay');
    const respostaText = document.getElementById('resposta'); // Cache placar element

    const CARD_BASE_CLASS = 'game-card';
    const CARD_INITIAL_CLASS = 'inicial';
    const CARD_ACERTOU_CLASS = 'acertou';
    const CARD_ERROU_CLASS = 'errou';

    //funçao que zera os valores das variáveis controladoras
    function reiniciar() {
      desempenho = 0;
      tentativas = 0;
      acertos = 0;
      jogar = true;
      specialEffectTriggeredThisRound = false;
      explosaoOverlay.classList.remove('visible'); // Hide explosion with fade
      jogarNovamente(); // Resets board
      atualizaPlacar(0, 0);
      btnJogarNovamente.classList.remove('invisivel');
      btnJogarNovamente.classList.add('visivel');
      btnReiniciar.classList.add('invisivel');
      btnReiniciar.classList.remove('visivel');
    }

    //funçao jogar novamente (resets board for next pick, not full game stats)
    function jogarNovamente() {
      jogar = true;
      // More specific selection of game cards
      const gameCards = document.querySelectorAll('#linha1 .game-card');
      gameCards.forEach(card => {
        card.className = `${CARD_BASE_CLASS} ${CARD_INITIAL_CLASS}`; // Reset classes
        card.innerHTML = card.id; // Show number
      });

      // Manage button visibility based on game progression
      if (tentativas < MIN_TENTATIVAS_FIM_JOGO) {
          btnJogarNovamente.classList.remove('invisivel');
          btnJogarNovamente.classList.add('visivel');
          btnReiniciar.classList.add('invisivel');
          btnReiniciar.classList.remove('visivel');
      } else {
        // If MIN_TENTATIVAS_FIM_JOGO is met, "Reiniciar" should be visible
        // This logic might be slightly redundant if `verifica` handles it, but good for explicit state
        btnJogarNovamente.classList.add('invisivel');
        btnJogarNovamente.classList.remove('visivel');
        btnReiniciar.classList.remove('invisivel');
        btnReiniciar.classList.add('visivel');
      }
      respostaText.textContent = "Escolha um quadrado!"; // Prompt user for next turn
      if (tentativas > 0) { // Keep showing score if game has started
          atualizaPlacar(acertos, tentativas);
      }
    }

    //funçao que atualiza o placar
    function atualizaPlacar(currentAcertos, currentTentativas) {
      desempenho = (currentTentativas > 0) ? (currentAcertos / currentTentativas) * 100 : 0;
      respostaText.innerHTML = `Placar - Acertos: ${currentAcertos} | Tentativas: ${currentTentativas} | Desempenho: ${Math.round(desempenho)}%`;
    }

    //funçao executada quando o jogador acertou
    function acertou(obj) {
      obj.className = `${CARD_BASE_CLASS} ${CARD_ACERTOU_CLASS}`;
      obj.innerHTML = '<i class="fas fa-check-circle"></i>'; // Modern icon for correct
    }

    // Função para exibir a imagem/ícone de erro
    function errouMostraIcone(obj) {
        obj.className = `${CARD_BASE_CLASS} ${CARD_ERROU_CLASS}`;
        obj.innerHTML = '<i class="fas fa-times-circle"></i>'; // Modern icon for incorrect
    }

    // --- EFEITOS ESPECIAIS ---
    function triggerExplosao() {
        if (!explosaoOverlay) return;
        explosaoOverlay.classList.add('visible'); // Show with fade
        // const audio = new Audio('som_explosao.mp3'); // Optional sound
        // audio.play();
    }

    function triggerConfetti() {
        confetti({ particleCount: 150, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
        confetti({ particleCount: 150, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });
        confetti({ particleCount: 100, angle: 90, spread: 80, origin: { y: 0.5 }});
    }
    // --- FIM DOS EFEITOS ESPECIAIS ---

    const MIN_TENTATIVAS_FIM_JOGO = 3;

    //Função que sorteia um número aleatório e verifica se o jogador acertou
    function verifica(obj) {
      if (!jogar) {
        // Provide more styled feedback instead of alert if possible, or make alert more informative
        respostaText.textContent = 'Clique em "Jogar novamente" ou "Reiniciar Jogo" para continuar.';
        // Simple alert is fine for now based on original behavior
        // alert('Clique em "Jogar novamente" ou "Reiniciar Jogo" para continuar.');
        return;
      }

      jogar = false; // Prevent multiple clicks per turn
      tentativas++;

      let sorteado = Math.floor(Math.random() * 4).toString(); // Ensure sorteado is a string like obj.id

      if (obj.id === sorteado) {
        acertou(obj);
        acertos++;
        respostaText.textContent = "Você Acertou! Mandou bem!";
      } else {
        errouMostraIcone(obj);
        const objSorteado = document.getElementById(sorteado);
        if(objSorteado) acertou(objSorteado); // Reveal the correct one
        respostaText.textContent = "Ops, não foi dessa vez. O sorriso estava no " + sorteado + ".";
      }

      atualizaPlacar(acertos, tentativas);

      // Logic for buttons and special effects
      if (tentativas >= MIN_TENTATIVAS_FIM_JOGO) {
        btnJogarNovamente.classList.add('invisivel');
        btnJogarNovamente.classList.remove('visivel');
        btnReiniciar.classList.remove('invisivel');
        btnReiniciar.classList.add('visivel');

        if (!specialEffectTriggeredThisRound) {
          if (desempenho === 0) { // 0% after min attempts
              triggerExplosao();
              specialEffectTriggeredThisRound = true;
          } else if (desempenho === 100) { // 100% after min attempts
              triggerConfetti();
              specialEffectTriggeredThisRound = true;
          }
        }
      } else {
        // Still playing, "Jogar novamente" should be visible
        btnJogarNovamente.classList.remove('invisivel');
        btnJogarNovamente.classList.add('visivel');
        btnReiniciar.classList.add('invisivel');
        btnReiniciar.classList.remove('visivel');
      }
    }

//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

// Initialize placar on load
document.addEventListener('DOMContentLoaded', () => {
    atualizaPlacar(0,0);
    respostaText.textContent = "Bem-vindo! Tente a sorte.";
});