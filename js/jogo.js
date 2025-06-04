// Quantidade de cartas
const TOTAL_CARTAS = 5;

// Variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Estilos da página
document.body.style.background = "linear-gradient(to right, #a1c4fd, #c2e9fb)";
document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
document.body.style.textAlign = "center";
document.body.style.padding = "30px";

// Botões
const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("jogarnovamente");

// Estilo dos botões
[btnReiniciar, btnJogarNovamente].forEach((btn) => {
  btn.style.padding = "12px 25px";
  btn.style.margin = "15px";
  btn.style.border = "none";
  btn.style.borderRadius = "12px";
  btn.style.background = "linear-gradient(135deg, #00bcd4, #008c9e)";
  btn.style.color = "#fff";
  btn.style.fontWeight = "bold";
  btn.style.fontSize = "1rem";
  btn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  btn.style.cursor = "pointer";
  btn.style.transition = "transform 0.2s ease-in-out";
  btn.onmouseover = () => (btn.style.transform = "scale(1.05)");
  btn.onmouseout = () => (btn.style.transform = "scale(1)");
});

// Reinicia o jogo completamente
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.style.display = "inline-block";
  btnReiniciar.style.display = "none";

  const canvasConfete = document.getElementById("confeteCanvas");
  if (canvasConfete) canvasConfete.remove();
}

// Prepara nova rodada
function jogarNovamente() {
  jogar = true;
  for (let i = 0; i < TOTAL_CARTAS; i++) {
    const carta = document.getElementById(i.toString());
    if (carta) {
      carta.className = "inicial"
      carta.style.backgroundColor = "#d3d3d3";
      carta.style.textAlign = "center";
      carta.style.fontsize = "50px";
      carta.style.width = "150px";
      carta.style.height = "200px";
      carta.style.border = "15px solid green";
      carta.style.padding = "10px";
      carta.style.margin = "20px";
      carta.style.transition = "all 0.3s ease";
      carta.innerHTML = i; // carta "vazia"
    }
  }

  const imagem = document.getElementById("imagem");
  if (imagem) imagem.remove();
}

// Atualiza placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML =
    `🎯 <strong>${acertos}</strong> acertos | <strong>${tentativas}</strong> tentativas | Desempenho: <strong>${Math.round(desempenho)}%</strong>`;
}

// Marca acerto
function acertou(obj) {
  obj.className = "acertou";
  obj.style.backgroundColor = "#b2fef7";
  obj.innerHTML = "";
  const img = new Image(60);
  img.id = "imagem";
  img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
  obj.appendChild(img);
}

// Lógica principal
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;

    if (tentativas === TOTAL_CARTAS) {
      btnJogarNovamente.style.display = "none";
      btnReiniciar.style.display = "inline-block";
    }

    acertou(obj);
    acertos++;

    atualizaPlacar(acertos, tentativas);

    if (acertos === TOTAL_CARTAS) {
      const som = document.getElementById("somVitoria");
      if (som) som.play();
      animarConfete();
    }
  } else {
    alert('Clique em "Jogar novamente" para continuar.');
  }
}

// Eventos
btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);

// Confetes animados
function animarConfete() {
  let canvas = document.createElement("canvas");
  canvas.id = "confeteCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  let confetes = [];
  for (let i = 0; i < 150; i++) {
    confetes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 30 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confetes.length; i++) {
      const c = confetes[i];
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt, c.y);
      ctx.lineTo(c.x, c.y + c.tilt + c.d);
      ctx.stroke();
    }
    update();
  }

  function update() {
    for (let i = 0; i < confetes.length; i++) {
      const c = confetes[i];
      c.tiltAngle += 0.1;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) * 0.5;
      c.x += Math.sin(c.tiltAngle) * 2;
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  loop();

  setTimeout(() => {
    canvas.remove();
  }, 5000);
}


