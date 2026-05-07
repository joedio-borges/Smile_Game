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
    let divis = document.getElementsByTagName("div");
    for (let i = 0; i < divis.length; i++) {
        // Verifica IDs de 0 a 3
        if (["0", "1", "2", "3"].includes(divis[i].id)) {
            divis[i].className = "inicial";
            divis[i].innerHTML = divis[i].id; // Isso remove a imagem e volta o número
        }
    }
}

function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
    document.getElementById("resposta").innerHTML = 
        `Placar - Acertos: ${acertos} | Tentativas: ${tentativas} | Desempenho: ${Math.round(desempenho)}%`;
}

// Função para colocar imagem de ACERTO
function acertou(obj) {
    obj.className = "acertou";
    obj.innerHTML = ""; // Limpa o número
    const img = new Image(100);
    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
    obj.appendChild(img);
}

// Função para colocar imagem de ERRO (A NOVIDADE AQUI)
function errou(obj) {
    obj.className = "errou";
    obj.innerHTML = ""; // Limpa o número ou o "X"
    const img = new Image(100);
    img.src = "../img/pngegg.png"; 
    obj.appendChild(img);
}

function verifica(obj) {
    // Só deixa clicar se a rodada não tiver terminado
    if (jogar) {
        jogar = false;
        tentativas++;

        if (tentativas >= 4) {
            btnJogarNovamente.className = 'invisivel';
            btnReiniciar.className = 'visivel';
        }

        let sorteado = Math.floor(Math.random() * 4);

        if (obj.id == sorteado) {
            acertou(obj);
            acertos++;
        } else {
            // Se errou, coloca a imagem de erro na carta clicada
            errou(obj); 
            
            // E mostra onde estava a carta certa
            const objSorteado = document.getElementById(sorteado);
            acertou(objSorteado);
        }
        atualizaPlacar(acertos, tentativas);
    } else {
        alert('Clique em "Jogar de novamente"');
    }
}

btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);

window.onload = () => atualizaPlacar(0,0);