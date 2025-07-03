document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const layers = document.querySelectorAll('.parallax-layer');
    const sectionArrows = document.querySelectorAll('.section-arrow');
    
    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let beatPhase = 0;
    let lastBeatTime = 0;
    let driftX = 0;
    const BPM = 128; // Batidas por minuto
    const beatInterval = (60 * 1000) / BPM; // Intervalo entre batidas em ms
    const beatAmplitude = 2.5; // Reduzida a intensidade da vibração
    const driftSpeed = 0.001; // Velocidade do movimento lateral
    const driftAmount = 15; // Quantidade de movimento lateral
    
    // Controle de visibilidade das setas
    let lastScrollPosition = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const scrollingDown = currentScroll > lastScrollPosition;
        
        sectionArrows.forEach(arrow => {
            const section = arrow.closest('section');
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;
                
                // Mostra a seta apenas quando:
                // 1. Estamos rolando para baixo
                // 2. A seção está visível
                // 3. Não chegamos ao final da seção
                if (scrollingDown && 
                    currentScroll >= sectionTop && 
                    currentScroll < (sectionBottom - windowHeight)) {
                    arrow.classList.add('visible');
                } else {
                    arrow.classList.remove('visible');
                }
            }
        });
        
        lastScrollPosition = currentScroll;
    });
    
    // Atualiza as dimensões da janela quando redimensionada
    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });
    
    // Captura movimento do mouse/touch
    const handleMovement = (e) => {
        mouseX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        mouseY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    };
    
    // Função para calcular a vibração baseada na batida
    const calculateBeatEffect = (timestamp) => {
        const timeSinceLastBeat = timestamp - lastBeatTime;
        
        if (timeSinceLastBeat >= beatInterval) {
            lastBeatTime = timestamp - (timeSinceLastBeat % beatInterval);
            beatPhase = Math.PI; // Reseta a fase da vibração
        }
        
        // Decay exponencial da vibração mais suave
        const decay = Math.exp(-6 * (timeSinceLastBeat / beatInterval));
        const beatEffect = Math.sin(beatPhase) * beatAmplitude * decay;
        beatPhase += 0.15; // Velocidade da vibração reduzida
        
        return beatEffect;
    };
    
    // Função para calcular o movimento de drift lateral
    const calculateDrift = (timestamp) => {
        driftX = Math.sin(timestamp * driftSpeed) * driftAmount;
        return driftX;
    };
    
    // Atualiza a posição das camadas
    const updateParallax = (timestamp) => {
        const percentX = (mouseX / windowWidth - 0.5) * 2;
        const percentY = (mouseY / windowHeight - 0.5) * 2;
        const beatEffect = calculateBeatEffect(timestamp);
        const drift = calculateDrift(timestamp);
        
        layers.forEach((layer, index) => {
            const depth = index + 1;
            const layerDrift = drift * (depth * 0.8); // Drift aumenta com a profundidade
            const translateX = percentX * (10 * depth) + layerDrift + (beatEffect * (index + 1) * Math.cos(timestamp * 0.001));
            const translateY = percentY * (10 * depth) + (beatEffect * (index + 1) * Math.sin(timestamp * 0.002));
            const scale = layer.classList.contains('layer-1') ? 1.1 + (beatEffect * 0.005) : 1 + (beatEffect * 0.003);
            const rotate = beatEffect * (index + 1) * 0.1; // Reduzida a rotação
            
            layer.style.transform = `
                translate3d(${translateX}px, ${translateY}px, 0)
                scale(${scale})
                rotate(${rotate}deg)
            `;
        });
        
        requestAnimationFrame(updateParallax);
    };
    
    // Adiciona event listeners para mouse e touch
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', handleMovement);
    }
    document.addEventListener('touchmove', handleMovement);
    
    // Inicia a animação
    requestAnimationFrame(updateParallax);
    
    // Efeito suave de entrada
    setTimeout(() => {
        parallaxContainer.style.opacity = '1';
        parallaxContainer.style.transform = 'translateY(0)';
    }, 100);

    // Controle do botão Voltar ao Topo
    const topButton = document.getElementById('topButton');
    const scrollThreshold = 300; // Altura em pixels para mostrar o botão

    // Função para verificar a posição do scroll
    function checkScroll() {
        if (window.scrollY > scrollThreshold) {
            topButton.classList.add('visible');
        } else {
            topButton.classList.remove('visible');
        }
    }

    // Adiciona o listener para o scroll
    window.addEventListener('scroll', checkScroll);

    // Função para rolar suavemente ao topo
    topButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 