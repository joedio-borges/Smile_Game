
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;
let cartas

const body = document.getElementById('linha1')

const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

function jogarNovamente() {
  jogar = true

  cartas = document.getElementById('cartas').value
  
  if (cartas < 3) {
    cartas = 3
  }

  body.innerHTML = ''
  
  for (let i = 0 ; i < cartas ; i++) {
    const div = document.createElement('div')
    div.innerText = i + 1
    div.id = i
    div.className = 'inicial'
    
    body.appendChild(div)
  }
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%";
}

function imagem(obj, classs, src) {
  console.log('dddddd', obj)
  obj.className = classs;
  const img = new Image(100);
  img.id = "imagem";
  img.src = src;
  img.style.height = '85%'
  obj.appendChild(img);
}

function tudo(element) {
  document.getElementById(element).className = ''
}

function verifica(obj) {
  if (jogar) {
    jogar = false;

    tentativas++;
    if (tentativas == cartas) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }
    let sorteado = Math.floor(Math.random() * cartas);
    if (obj.id == sorteado) {
      imagem(obj, "acertou", "./gigachad/machoAlfa.jpg");
      acertos++;
    } else {
      const objSorteado = document.getElementById(sorteado);
      imagem(objSorteado, "acertou", "./gigachad/machoAlfa.jpg");
      imagem(obj, "errou", "./amalgamadecarne/betinha.jpg");
    }
    atualizaPlacar(acertos, tentativas);

    if (acertos == cartas) {
      tudo("acertoutudo")
    } else if (acertos == 0 && tentativas == cartas) {
      tudo("erroutudo")
    }

  } else {
    alert('Clique em "Jogar novamente"');
  }

}


function reiniciar() {
  document.getElementById('acertoutudo').className = 'invisivel'
  document.getElementById('erroutudo').className = 'invisivel'
  
  
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;


  jogarNovamente()
  atualizaPlacar(0, 0);


  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}


function comecar() {
  cartas = document.getElementById('cartas').value
  jogar = true
  
  reiniciar()

  body.innerHTML = ''
  
  
  if (cartas < 3) {
    cartas = 3
  }

  for (let i = 0 ; i < cartas ; i++) {

    const div = document.createElement('div')
    div.innerText = i + 1
    div.id = i
    div.className = 'inicial'
    
    body.appendChild(div)
  }

}

btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);





document.addEventListener('click', (event) => {
  if (event.target.className == 'inicial') {
    verifica(event.target)
  }
})