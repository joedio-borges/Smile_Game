
        const respElement = document.getElementById('resposta');
        const botoes = document.querySelectorAll('.inicial');
        
        // Variáveis de estatísticas
        let v_tentativas = 0;
        let v_acertos = 0;
        let v_erros = 0;

        let smilePosicao = Math.floor(Math.random() * 3) + 1;
        let jogoAtivo = true;

        function atualizarPlacar() {
            document.getElementById('tentativas').innerText = v_tentativas;
            document.getElementById('acertos').innerText = v_acertos;
            document.getElementById('erros').innerText = v_erros;
            
            let precisao = v_tentativas === 0 ? 0 : Math.round((v_acertos / v_tentativas) * 100);
            document.getElementById('precisao').innerText = precisao + "%";
        }

        function jogar(escolha) {
            if (!jogoAtivo) return;

            const elementoClicado = document.getElementById(`btn-${escolha}`);
            v_tentativas++;

            if (escolha === smilePosicao) {
                v_acertos++;
                elementoClicado.classList.add('acerto');
                elementoClicado.innerHTML = '<i class="bi bi-emoji-smile-fill"></i>';
                respElement.innerHTML = "<span style='color: #f39c12'>😊 VOCÊ ACHOU!</span>";
                jogoAtivo = false;
                
                // Desativa os outros botões para não contar erro após ganhar
                botoes.forEach(b => b.style.pointerEvents = 'none');
            } else {
                v_erros++;
                elementoClicado.classList.add('erro');
                respElement.innerHTML = "<span style='color: #ff8b94'>Não está aqui...</span>";
            }
            
            atualizarPlacar();
        }

        document.getElementById('joganovamente').addEventListener('click', () => {
            smilePosicao = Math.floor(Math.random() * 3) + 1;
            jogoAtivo = true;
            
            botoes.forEach((el, index) => {
                el.classList.remove('erro', 'acerto');
                el.style.pointerEvents = 'auto';
                el.innerHTML = index + 1;
            });
            
            respElement.innerHTML = "";
        });
