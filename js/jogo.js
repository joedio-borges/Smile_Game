// Variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Botões
const btnReiniciar = document.getElementById("reiniciar");

const btnJogarNovamente = document.getElementById("joganovamente");

// Reiniciar tudo
function reiniciar(){

    desempenho = 0;

    tentativas = 0;

    acertos = 0;

    jogar = true;

    jogarNovamente();

    atualizaPlacar(0, 0);

    btnJogarNovamente.className = "visivel";

    btnReiniciar.className = "invisivel";
}

// Jogar novamente
function jogarNovamente(){

    jogar = true;

    for(let i = 0; i < 3; i++){

        const carta = document.getElementById(String(i));

        carta.className = "inicial";

        carta.innerHTML = "?";
    }
}

// Atualiza placar
function atualizaPlacar(acertos, tentativas){

    if(tentativas > 0){

        desempenho = (acertos / tentativas) * 100;

    } else {

        desempenho = 0;
    }

    document.getElementById("resposta").innerHTML =
    "Placar - Acertos: " +
    acertos +
    " | Tentativas: " +
    tentativas +
    " | Desempenho: " +
    Math.round(desempenho) +
    "%";
}

// Mostrar smile
function acertou(obj){

    obj.className = "acertou";

    obj.innerHTML = "";

    const img = new Image();

    img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";

    obj.appendChild(img);
}

// Verifica jogada
function verifica(obj){

    if(jogar){

        jogar = false;

        tentativas++;

        if(tentativas == 3){

            btnJogarNovamente.className = "invisivel";

            btnReiniciar.className = "visivel";
        }

        const sorteado = Math.floor(Math.random() * 3);

        if(obj.id == sorteado){

            acertou(obj);

            acertos++;

        } else {

            obj.className = "errou";

            obj.innerHTML = "X";

            const objSorteado = document.getElementById(String(sorteado));

            acertou(objSorteado);
        }

        atualizaPlacar(acertos, tentativas);

    } else {

        alert('Clique em "Jogar novamente"');
    }
}

// Eventos
btnJogarNovamente.addEventListener("click", jogarNovamente);

btnReiniciar.addEventListener("click", reiniciar);