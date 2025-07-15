
    let primeiroClique = true;
    let animacaoAtual = 0;
    const animacoes = [
        'animation-fade-zoom',
        'animation-slide-in',
        'animation-rotate-in',
        'animation-bounce-in',
        'animation-swing'
    ];
    
    async function buscarCachorro() {
        if (primeiroClique) {
            document.getElementById('botao-cachorro').textContent = "Mostrar Outro Cachorro";
            primeiroClique = false;
        }
        
        const status = document.getElementById('status');
        status.textContent = 'Carregando...';
        status.className = 'status-loading';
        
        // Alternar para próxima animação
        animacaoAtual = (animacaoAtual + 1) % animacoes.length;
        const animacaoEscolhida = animacoes[animacaoAtual];
        
        try {
            const containerDiv = document.querySelector('.dog-image-container');
            
            // Adicionar spinner durante o carregamento
            containerDiv.innerHTML = '<div class="loading-spinner"></div>';
            
            const resposta = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!resposta.ok) {
                throw new Error('Erro ao buscar a imagem');
            }
            
            const dados = await resposta.json();
            
            // Criar elemento de imagem para pré-carregamento
            const preloadImg = new Image();
            preloadImg.src = dados.message;
            
            preloadImg.onload = () => {
                // Limpar o container
                containerDiv.innerHTML = '';
                
                // Criar wrapper para polaroid e adicionar cantos decorativos
                const polaroidDiv = document.createElement('div');
                polaroidDiv.className = 'polaroid';
                
                const imageWrapper = document.createElement('div');
                imageWrapper.className = 'dog-image-wrapper';
                
                // Criar elemento de imagem com a classe de animação escolhida
                const img = document.createElement('img');
                img.src = dados.message;
                img.alt = "Imagem aleatória de um cachorro adorável";
                img.className = `dog-image ${animacaoEscolhida}`;
                
                // Adicionar imagem à estrutura
                imageWrapper.appendChild(img);
                polaroidDiv.appendChild(imageWrapper);
                containerDiv.appendChild(polaroidDiv);
                
                // Adicionar cantos decorativos
                const corners = [
                    'corner-top-left',
                    'corner-top-right',
                    'corner-bottom-left',
                    'corner-bottom-right'
                ];
                
                corners.forEach(corner => {
                    const cornerElement = document.createElement('div');
                    cornerElement.className = `photo-corner ${corner}`;
                    containerDiv.appendChild(cornerElement);
                });
                
                // Atualizar status
                status.textContent = 'Cachorro carregado com sucesso!';
                status.className = 'status-success';
                
                // Adicionar um leve efeito de balançar à polaroid após um breve atraso
                setTimeout(() => {
                    // Adicionar um leve efeito de balançar à polaroid
                    const rotacao = (Math.random() - 0.5) * 5; // Rotação entre -2.5 e 2.5 graus
                    polaroidDiv.style.transform = `rotate(${rotacao}deg)`;
                }, 300);
            };
            
            preloadImg.onerror = () => {
                throw new Error('Erro ao carregar a imagem');
            };
        } catch (erro) {
            console.error('Erro:', erro);
            status.textContent = 'Ops! Não conseguimos buscar um cachorro. Tente novamente.';
            status.className = 'status-error';
            document.querySelector('.dog-image-container').innerHTML = '';
        }
    }

    // Adicionar evento de clique ao botão
    const botao = document.getElementById('botao-cachorro');
    botao.addEventListener('click', buscarCachorro);
    botao.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter' || evento.key === ' ') {
            buscarCachorro();
        }
    });
  