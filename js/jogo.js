 // Declaração das variáveis globais
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
  
  // Remove os estilos das cartas
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (!isNaN(parseInt(divis[i].id))) {
      divis[i].className = "inicial";
    }
  }

  // Remove imagem de acerto
  let imagem = document.getElementById("imagem");
  if (imagem) {
    imagem.remove();
  }

  // Remove emoji de erro
  const emoji = document.getElementById("emojiErro");
  if (emoji) {
    emoji.remove();
  }

  // Remove o resultado final (troféu e texto)
  const resultadoFinal = document.getElementById("resultadoFinal");
  if (resultadoFinal) {
    resultadoFinal.remove();
  }
}

  function atualizaPlacar(acertos, tentativas) {
    desempenho = (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML =
      "Placar - Acertos: " + acertos +
      " Tentativas: " + tentativas +
      " Desempenho: " + Math.round(desempenho) + "%";
  }

  function acertou(obj) {
    obj.className = "acertou";
  
    const img = new Image(100);
    img.id = "imagem";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
    obj.appendChild(img);

    // Toca som de acerto
const somAcertoAudio = document.getElementById("somAcerto");
if (somAcertoAudio) {
  somAcertoAudio.currentTime = 0; // Garante que o áudio comece do início
  somAcertoAudio.play().catch(e => {
    console.warn("Som de acerto bloqueado pelo navegador:", e);
  });
}

    // 🎉 Confete só quando acertar
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
    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
    obj.appendChild(img);
  }

  function verifica(obj) {
    if (jogar) {
      jogar = false;
      tentativas++;
  
      if (tentativas == 6) {
        btnJogarNovamente.className = 'invisivel';
        btnReiniciar.className = 'visivel';
      mostrarResultadoFinal()
      }
  
      let sorteado = Math.floor(Math.random() * 6);
  
      if (obj.id == sorteado.toString()) {
        acertou(obj);
        acertos++;
      } else {
        obj.className = "errou";

        // Efeito de tremor nas cartas a cada erro
      const cartas = document.querySelectorAll("div");
      cartas.forEach(div => {
        if (!isNaN(parseInt(div.id))) {
          div.classList.add("tremor");
        }
      });

      // Remove o tremor após 500ms
      setTimeout(() => {
        cartas.forEach(div => div.classList.remove("tremor"));
      }, 500);

  
      // Adiciona o emoji no centro da carta errada
      const emoji = document.createElement("div");
      emoji.id = "emojiErro";
      emoji.innerText = "😢";
      emoji.style.position = "absolute"; // Faz o emoji ficar dentro da carta
      emoji.style.top = "50%";  // Centraliza verticalmente
      emoji.style.left = "50%"; // Centraliza horizontalmente
      emoji.style.transform = "translate(-50%, -50%)"; // Garante que o emoji fique exatamente no centro
      emoji.style.fontSize = "80px"; // Ajuste do tamanho do emoji
      emoji.style.zIndex = "999"; // Garante que o emoji fique acima da carta
      obj.style.position = "relative"; // Adiciona um position relativo à carta para o emoji ser posicionado corretamente
      obj.appendChild(emoji); // Adiciona o emoji dentro da carta

        // Toca som de erro
        const somErroAudio = document.getElementById("somErro");
        if (somErroAudio) {
          somErroAudio.currentTime = 0;
          somErroAudio.play().catch(e => {
            console.warn("Som de erro bloqueado pelo navegador:", e);
          });
        }
  
        const objSorteado = document.getElementById(sorteado);
        mostrarSmile(objSorteado);
      }
  
      atualizaPlacar(acertos, tentativas);
    } else {
      alert('Clique em "Jogar novamente"');
    }
  }
function mostrarResultadoFinal() {
  console.log('Exibindo resultado final...');
  console.log("Desempenho final:", desempenho);

  const container = document.createElement("div");
  container.id = "resultadoFinal";
  container.style.position = "fixed";
  container.style.top = "80%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "10000";
  container.style.textAlign = "center";

  const imagem = document.createElement("img");
  imagem.style.width = "150px";
  imagem.style.transition = "transform 1s ease-in-out";

  const texto = document.createElement("div");
  texto.style.fontSize = "32px";
  texto.style.marginTop = "50px";
  texto.style.color = "#333";

  if (desempenho === 100) {
    imagem.src = "imagens/trofeu.png";
    texto.innerText = "Você arrasou!";
  } else if (desempenho >= 20 && desempenho < 90) {
    imagem.src = "trevo1.jpg";
    texto.innerText = "Tente a sorte novamente!";
 
  container.appendChild(imagem);
  container.appendChild(texto);
  document.body.appendChild(container);

  setTimeout(() => {
    imagem.style.transform = "rotate(20deg)";
  }, 100);
}
}
  btnJogarNovamente.addEventListener('click', jogarNovamente);
  btnReiniciar.addEventListener('click', reiniciar);