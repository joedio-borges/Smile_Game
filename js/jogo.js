    //declaraçao das variaveis globais
   //declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

//captura os botoes
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

//funçao reiniciar
function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;

    jogarNovamente();
    atualizaPlacar(0, 0);

    btnJogarNovamente.className = 'btn btn-info m-2 visivel';
    btnReiniciar.className = 'btn btn-dark invisivel m-2';
}

//funçao jogar novamente
function jogarNovamente() {

    jogar = true;

    let divis = document.getElementsByTagName("div");

    for (i = 0; i < divis.length; i++) {

        if (
            divis[i].id == 0 ||
            divis[i].id == 1 ||
            divis[i].id == 2 ||
            divis[i].id == 3 ||
            divis[i].id == 4
        ) {

            divis[i].className = "inicial";
        }
    }

    let imagem = document.getElementById("imagem");

    if (imagem != null) {
        imagem.remove();
    }
}

//placar
function atualizaPlacar(acertos, tentativas) {

    desempenho = (acertos / tentativas) * 100;

    if (tentativas == 0) {
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

//acertou
function acertou(obj) {
    obj.className = "acertou";

    // Se já houver uma imagem, não adiciona outra
    if (!document.getElementById("imagem")) {
        const img = new Image();
        img.id = "imagem";
        img.src = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg";
        obj.appendChild(img);
    }
}

//verifica
function verifica(obj) {

    if (jogar) {

        jogar = false;

        tentativas++;

        if (tentativas == 3) {

            btnJogarNovamente.className = 'btn btn-info m-2 invisivel';
            btnReiniciar.className = 'btn btn-dark visivel m-2';
        }

        // AGORA SORTEIA DE 0 A 4
        let sorteado = Math.floor(Math.random() * 5);

        if (obj.id == sorteado) {

            acertou(obj);

            acertos++;

        } else {

            obj.className = "errou";

            const objSorteado = document.getElementById(sorteado);

            acertou(objSorteado);
        }

        atualizaPlacar(acertos, tentativas);

    } else {

        alert('Clique em "Jogar novamente"');
    }
}

//eventos
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);