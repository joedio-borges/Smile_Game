//declaraçao das variaveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let moedas = 0;
let jogar = true;

//captura os botoes pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');
const btnComprar = document.getElementById('comprar');

//funçao que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  moedas = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  //mostra o botao jogarnovamente alterando a classe css (className)
  btnJogarNovamente.className = 'visivel';
  //oculta o botao reiniciar alterando a classe css (className)
  btnReiniciar.className = 'invisivel';
  //oculta o comprar pinguim
  btnComprar.className = "invisivel"
}

//funçao jogar novamente
function jogarNovamente() {
  jogar = true;//variável jogar volta a ser verdadeira
  //armazenamos todas as div na variável divis (getElementsByTagName)
  let divis = document.getElementsByTagName("div");
  //percorremos todas as divs armazenadas
  for (i = 0; i < divis.length; i++) {
    //verificamos se sao as divs com ids 0 ou 1 ou 2
    if (divis[i].id == 0 || divis[i].id == 1 || divis[i].id == 2 || divis[i].id == 3 || divis[i].id == 4 || divis[i].id == 5 || divis[i].id == 6 || divis[i].id == 7 || divis[i].id == 8 || divis[i].id == 9) {
      //alteramos a classe css das divs 0, 1 e 2 (className)
      divis[i].className = "inicial";
    }
  }


  //remove todas as imagens
  let imagem = document.getElementById("imagem");
  if (imagem != null) {
    imagem.remove();
  }
  
  let imagemErro = document.getElementById("imagem-erro");
  if (imagemErro != null) {
    imagemErro.remove();
  }
}

//funçao que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  //calcula o desempenho em porcentagem
  desempenho = (acertos / tentativas) * 100;
  //escreve o placar com os valores atualizados (innerHTML)
  document.getElementById("resposta").innerHTML = "Placar - Acertos: " + acertos + " Tentativas: " + tentativas + " Desempenho: " + Math.round(desempenho) + "%" + " Moedas: " + moedas;
  if (moedas >= 2){
    btnComprar.className = "visivel"
  } else{
    btnComprar.className = "invisivel"
  }
}

//funçao executada quando o jogador acertou
function acertou(obj) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "acertou";
  //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem";
  //altera o atributo src (source) da imagem criada
  img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACUCAMAAADhypYgAAABAlBMVEX///8AAAD+2C/+/v7+8gD/8AD///p4eHh/f3+5ubn83SVIPRb/2y368ib+7Qn77qrryjtfUiL/3kD++8H84R/96RD//yOtra3/2CH96pqjo6NycnLX19e+oy90YyftyzaRfCT/4jiciC2Kdyj998uamppbW1uNjY0RERHKysodHRotLS26shwXFgb//+j8+J+xphX+9EZUSi789HP883xGQRPc0hTo3wibloH/96iKdA+VhTPq6upwYh399tX/6oD/8JW0rY3w5a/6+JPCuzaymDqIdDEABRA+NBZWSQ65qWHq4Wial47+0Tc2OAzo6RRJSUmHflbPrTB4cVRIQC4AABf7vFHHAAAF1UlEQVR4nO2djX+UNhjH6YVce+yu1DvQXtfOnT1tuxe3bnOzq7Nus7qp3dyL//+/YnhJCJcEEkgkYH4f7wMeAfLllzwPoSX1PJ0C3tmWpJLC9koJxGY5ENvkQGzTYEC8foIAVt6hNAhv7440+ZSjO5J6wO66fdgRyB3Ohf5SdmeeSxOTta1QCxDAA/mihyBcRxyIQNLBwwhIF6HLbkcUroghEJBmqGxVaQlw5QEo1oWi0hYfhJPoeLmPs+/ppHwWAMqnrF1Se8uAEB1wQcZS8rZON4Uc0Zfl60G8w/tYJxw9vlhK6eLne4wuH5MjP2nJUY2R+V34cMIps96X1IrV3i/k0M1uVigflUB2Ntposvt6fySnKfvV3mctQei61vcRFoRorADCQburC0Sus4tBgAPRA6IYfh2IcZAyVJvOrhK1jIPUbRSAjFFGT/7RIGzyMAzSNo943tNwuQzRZxlexXGUKI5Wz9h8foU2xMknjuxsWuE8TXDoM/V9H0If+rvnD9k7rPUMJtvRxzcJ0ryzh1lNEEjg54LnD5ldvfUMb7YUZDEf5TcdGQhMQTbv3BHIOTQIojgeETtSgCQorCPolvIcbzUDglcMgwDDIOVzDQakaqPoNl4EwgxFDYO0Ho80AIESIG3Gu6KmRX0ryCOZbvZRFknyiKCzk/B7+4YF4Q+sGtCIOzvwzg7yp+gHxfj81zD8LUx1FQVpPo+C+Hui37/JdRFiLZ9/hRURFY5cH794cZno+E1ypuR09580IKkC2SZPPbbxg5RxSIar0S5JdOQpymIGYeZOPCXX/NHXubZu4x12A8qUvOTq1kv8aGUiDyIVfneI69v4q3FIRt4RzFu+P8uPBMAC4n4dk2rufUIOQ0AgBYI1v0XKKTx9bA5C2nkCkt1FzfAhwZokccoRDsguCzJtBlKGUnOkAIFZvXMQNMSiHOGCQA4ILqgDRCAaBPBAqKaVPYdd1DjCA2nXtKTySAkE1ICk2zsAoZkaN61SZ+8YpEHUciAmQNrkEQfiQMQYgAYRSiX8dgiSPRqouj1TSYhGQOp+gEhAqGcddSBeFyDSjjgQm0AIwlBATDiidBtvM0h3fYSvfjiiCGJ3QhxE1HIgtoEMJmq5PGKbIy6PWO3IYJqWA7EAZDBRi3jh8ogljrg84hwxDNL7pyguj3xMIC6PuKjl8oh9jnguj9gCMpio5fKIbY4MLWpJ5xEVEOdIa5DB9JE+g+iPWugwi/Q3y2EnIPpuUcbIEX8QjozHi+zXzJEpfY5a6Hqsp0GqKIpsBZEYj6ASa7Z+toHkqgF52jWIpqjVvSN9BjGRRzoF0ZdHnCPtQIxErR6AfGR5pHOQwfSRPoMMJmo5ENtAzIxHBgLSZ0d8W8Yj4p+PJK+BMyAeF6SYzGW+mpe0mq72/mBBqLenk/nb0pLzPykQ0bUVg4g7O/AmZH7bkx2sVwyI789+wHr9OUffEsXkxXzyVvzdI1LuDT7bgfSL+ZJRqyAtpko45jiSL1F3+XGL1V9/4wI+O1XCiJ7zoa6pNwYpylMg802QlAFRJC+r80Ae/ZQ/s/N9MptA0YPazcKhGQRPj1AFAhNHSPXn5C32jckr5M0gdfNwV8ds5aUkSOFKGogFILgJcmKahgleyiDVRWuaFkHpAASQ2NV/EM6qKgjUDgLy+sgu6Zdb24BA7SB55JFderiPSEmyafGjFsojuCRnEhFO09q8wHXL3JbGfSSIikQd5ZPpBfcumXlwr4vNcn1EFaStI5xaIbopK/EO2hyRlRyIsMYVKDr6iHaQEXsHog4i4YBpR6bVVTYF0j78atFwQZQToomopQNE2RFiS+M8Yg1IQ0dQaAooof9VZwpaAasPHLUmbx/k+ueI0fW/kiQ37L5H1//hI7/9EHmkWOX9bYX/V3LNaMXZ990ZcxqTjhT78EC+kwMZ8UBOJ8nM86WzGAy/lHSDJH+2A5SvVX9Bxp5632g2HjEMwr3SRvKI3SADcOQ9hBNMifmoyQAAAAAASUVORK5CYII=";
  //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);
}

//funçao executada quando o jogador errou
function errou(obj) {
  //altera a classe CSS da <div> escolhida pelo jogador (className)
  obj.className = "errou";
  //Criar uma constante img que armazena um novo objeto imagem com largura de 100px
  const img = new Image(100);
  img.id = "imagem-erro";
  //altera o atributo src (source) da imagem criada (usando uma imagem de "erro")
  img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdhShcKDdmFIKBAvqwob_3LGZdkwRApt4Z9bLGXhSe82sJuRRRm55ccIKz5JtJ91rSxk&usqp=CAU";
  //adiciona a imagem criada na div (obj) escolhida pelo jogador (appendChild)
  obj.appendChild(img);
}

//Função que sorteia um número aleatório entre 0 e 2 e verifica se o jogador acertou
function verifica(obj) {
  //se jogar é verdadeiro
  if (jogar) {
    //jogar passa a ser false
    jogar = false;
    //incrementa as tentativas
    tentativas++;
    //verifica se jogou 3 vezes
    if (tentativas == 5) {
      //oculta o botao joganovamente alterando a classe css (getElementById e className)
      btnJogarNovamente.className = 'invisivel';
      //mostra o botao reiniciar alterando a classe css (getElementById e className)
      btnReiniciar.className = 'visivel';
    }
    //a variável sorteado recebe um valor inteiro (Math.floor) aleatório (Math.random)
    let sorteado = Math.floor(Math.random() * 0);
    //se o id da <div> escolhida pelo jogador for igual ao número sorteado
    if (obj.id == sorteado) {
      //chama a funçao acertou passando a div escolhida pelo jogador
      acertou(obj);
      //incrementa o contador de acertos
      acertos++;
      moedas++;
    } else {//se errou a tentativa
      //chama a função errou para a carta que o jogador clicou
      errou(obj);
      //armazena a div aonde Smile está escondido (getElementById)
      const objSorteado = document.getElementById(sorteado);
      //chama a funçao acertou para mostrar a div aonde está o Smile
      acertou(objSorteado);
    }
    //chama a funçao que atualiza o placar
    atualizaPlacar(acertos, tentativas);
  } else {//se o jogador clicar em outra carta sem reiniciar o jogo, recebe um alerta
    alert('Clique em "Jogar novamente"');
  }
}
function comprarPengim(){
  if(moedas >= 2){
    moedas -= 2;
    alert("parabens")
    atualizaPlacar(acertos, tentativas)
  }
}



//adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
btnComprar.addEventListener('click', comprar);