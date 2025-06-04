document.addEventListener("DOMContentLoaded", function () {
  // Declaração das variáveis globais
  let desempenho = 0;
  let tentativas = 0;
  let acertos = 0;
  let jogar = true;

  // Captura os botões pelos IDs e adiciona um evento de clique
  const btnReiniciar = document.getElementById("reiniciar");
  const btnJogarNovamente = document.getElementById("jogarnovamente");
  const resposta = document.getElementById("resposta");

  const divIds = [0, 1, 2, 3];
  const imgConfig = {
    et: "et.png",
    confete: "confetes.gif"
  };

  function toggleBotao(botao, visivel) {
    botao.className = visivel ? "visivel" : "invisivel";
  }

  function resetDiv(div) {
    div.className = "inicial";

    const imagem = div.querySelector("#imagem");
    if (imagem) imagem.remove();

    div.querySelectorAll(`img[src="${imgConfig.confete}"]`).forEach(el => el.remove());
  }

  function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    // Mostra o botão "Jogar novamente" alterando a classe CSS
    btnJogarNovamente.className = "visivel";
    // Oculta o botão "Reiniciar" alterando a classe CSS
    btnReiniciar.className = "invisivel";
  }

  // Função "Jogar novamente"
  function jogarNovamente() {
    jogar = true;
    let divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].id == 0 || divs[i].id == 1 || divs[i].id == 2 || divs[i].id == 3) {
        divs[i].className = "inicial";

        let imagem = divs[i].querySelector("#imagem");
        if (imagem) imagem.remove();

        // Remover confetes, caso haja
        let confetes = divs[i].querySelectorAll('img[src="confetes.gif"]');
        confetes.forEach((c) => c.remove());
      }
    }
  }

  // Função que atualiza o placar
  function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
    resposta.innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
  }

  function adicionarImagem(div, src, id = "") {
    const img = new Image(100);
    if (id) img.id = id;
    img.src = src;
    img.classList.add("imagem-de-jogo");  // Se quiser personalizar no CSS

    div.appendChild(img);
  }

  function adicionarConfete(div) {
  if (!div.querySelector('.confete')) {
    const confete = new Image();
    confete.src = imgConfig.confete;
    confete.classList.add("confete");
    div.appendChild(confete);
  }
}

function acertou(div) {
  div.className = "acertou";

  if (!div.querySelector("#imagem")) {
    adicionarImagem(div, imgConfig.et, "imagem");
  }

  adicionarConfete(div);  // Agora separado e estilizado
}

  window.verifica = function (div) {
    if (!jogar) {
      alert('Clique em "Jogar novamente"');
      return;
    }

    jogar = false;
    tentativas++;

    if (tentativas === 3) {
      toggleBotao(btnJogarNovamente, false);
      toggleBotao(btnReiniciar, true);
    }

    const sorteado = Math.floor(Math.random() * divIds.length);

    if (parseInt(div.id) === sorteado) {
      acertou(div);
      acertos++;
    } else {
      div.className = "errou";
      acertou(document.getElementById(sorteado));
    }

    atualizaPlacar();
  };

  btnJogarNovamente.addEventListener("click", reiniciar);
  btnReiniciar.addEventListener("click", reiniciar);

  atualizaPlacar();
});
