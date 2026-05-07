
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Inicializa o placar na página
atualizaPlacar();

function atualizaPlacar() {
    let desempenho = tentativas === 0 ? 0 : (acertos / tentativas) * 100;
    document.getElementById("resposta").innerHTML =
        `Acertos: ${acertos} | Tentativas: ${tentativas} | ${Math.round(desempenho)}%`;
}

function jogarNovamente() {
    jogar = true;

    let cartas = document.querySelectorAll(".card-jogo");
    cartas.forEach(c => {
        c.className = "card-jogo";
        c.innerHTML = "?";
    });

    let imgs = document.querySelectorAll("img");
    imgs.forEach(img => img.remove());
}

function reiniciar() {
    tentativas = 0;
    acertos = 0;
    jogarNovamente();
    atualizaPlacar();

    btnReiniciar.classList.add("invisivel");
    btnJogarNovamente.classList.remove("invisivel");
}

function acertou(obj) {
    obj.classList.add("acertou");

    const img = new Image(80);
    img.id = "imagem";
    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";

    obj.innerHTML = "";
    obj.appendChild(img);
}

function errou(obj) {
    obj.classList.add("errou");

    const img = new Image(80);
    img.src = "https://em-content.zobj.net/source/apple/81/clown-face_1f921.png";

    obj.innerHTML = "";
    obj.appendChild(img);
}

function verifica(obj) {
    if (!jogar) {
        alert('Clique em "Jogar novamente"');
        return;
    }

    jogar = false;
    tentativas++;

    if (tentativas === 3) {
        btnJogarNovamente.classList.add("invisivel");
        btnReiniciar.classList.remove("invisivel");
    }

    let sorteado = Math.floor(Math.random() * 5);

    if (Number(obj.id) === sorteado) {
        acertou(obj);
        acertos++;
    } else {
        errou(obj);
        acertou(document.getElementById(sorteado));
    }

    atualizaPlacar();
}

btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
