const translations = {
    'pt-BR': {
        'welcome': 'Bem-vindo ao mundo mágico da Hatsune Miku!',
        'nav.home': 'INÍCIO',
        'nav.gallery': 'GALERIA',
        'nav.music': 'MÚSICAS',
        'nav.login': 'ENTRAR',
        'header.title': 'Bem-vindo ao MikuFan',
        'header.subtitle': 'Seu portal definitivo sobre Hatsune Miku',
        'about.title': 'Sobre Hatsune Miku',
        'about.vocaloid.title': 'Primeira Cantora Virtual',
        'about.vocaloid.desc': 'Criada pela Crypton Future Media, Hatsune Miku revolucionou a música com sua tecnologia Vocaloid.',
        'about.music.title': 'Ícone Musical',
        'about.music.desc': 'Com mais de 100.000 músicas criadas por fãs em todo o mundo, Miku se tornou um fenômeno musical global.',
        'about.culture.title': 'Impacto Cultural',
        'about.culture.desc': 'De shows holográficos a colaborações com grandes artistas, Miku influenciou a cultura pop mundialmente.',
        'about.stats.songs': 'Músicas',
        'about.stats.year': 'Ano de Lançamento',
        'about.stats.views': 'Visualizações no YouTube',
        'history.title': 'História',
        'history.subtitle': 'A evolução de um ícone digital',
        'history.2007.title': 'O Nascimento',
        'history.2007.desc': 'Lançamento do Vocaloid2 Hatsune Miku',
        'history.2009.title': 'Primeiros Shows',
        'history.2009.desc': 'Início dos concertos holográficos',
        'history.2014.title': 'Reconhecimento Global',
        'history.2014.desc': 'Turnê mundial e colaborações internacionais',
        'history.2020.title': 'Revolução Virtual',
        'history.2020.desc': 'Durante o isolamento global, os concertos virtuais de Miku trouxeram música e alegria para milhões.',
        'history.quote': '"O futuro da música está na harmonia entre a criatividade humana e a inovação digital."',
        'history.quote.author': '- Hiroyuki Itoh, CEO Crypton Future Media',
        'footer.rights': 'Todos os direitos reservados',
        'footer.contact': 'Contato',
        'footer.social': 'Redes Sociais',
        'footer.terms': 'Termos de Uso',
        'footer.privacy': 'Política de Privacidade'
    },
    'en': {
        'welcome': 'Welcome to the magical world of Hatsune Miku!',
        'nav.home': 'HOME',
        'nav.gallery': 'GALLERY',
        'nav.music': 'MUSIC',
        'nav.login': 'LOGIN',
        'header.title': 'Welcome to MikuFan',
        'header.subtitle': 'Your ultimate Hatsune Miku portal',
        'about.title': 'About Hatsune Miku',
        'about.vocaloid.title': 'First Virtual Singer',
        'about.vocaloid.desc': 'Created by Crypton Future Media, Hatsune Miku revolutionized music with her Vocaloid technology.',
        'about.music.title': 'Musical Icon',
        'about.music.desc': 'With over 100,000 songs created by fans worldwide, Miku has become a global music phenomenon.',
        'about.culture.title': 'Cultural Impact',
        'about.culture.desc': 'From hologram concerts to collaborations with major artists, Miku has influenced pop culture worldwide.',
        'about.stats.songs': 'Songs',
        'about.stats.year': 'Release Year',
        'about.stats.views': 'YouTube Views',
        'history.title': 'History',
        'history.subtitle': 'The evolution of a digital icon',
        'history.2007.title': 'The Beginning',
        'history.2007.desc': 'Launch of Vocaloid2 Hatsune Miku',
        'history.2009.title': 'First Shows',
        'history.2009.desc': 'Beginning of holographic concerts',
        'history.2014.title': 'Global Recognition',
        'history.2014.desc': 'World tour and international collaborations',
        'history.2020.title': 'Virtual Revolution',
        'history.2020.desc': 'During global lockdowns, Miku\'s virtual concerts brought music and joy to millions.',
        'history.quote': '"The future of music lies in the harmony between human creativity and digital innovation."',
        'history.quote.author': '- Hiroyuki Itoh, CEO Crypton Future Media',
        'footer.rights': 'All rights reserved',
        'footer.contact': 'Contact',
        'footer.social': 'Social Media',
        'footer.terms': 'Terms of Use',
        'footer.privacy': 'Privacy Policy'
    }
};

// Variável para armazenar o idioma atual
let currentLanguage = 'pt-BR';

// Função para mudar o idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    translatePage();
    updateActiveButton();
    
    // Salvar preferência do usuário
    localStorage.setItem('preferredLanguage', lang);

    // Fechar o dropdown após a mudança de idioma
    const langDropdown = document.querySelector('.lang-dropdown');
    if (langDropdown) {
        langDropdown.classList.remove('show');
    }
}

// Função para traduzir a página
function translatePage() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });

    // Atualizar o texto do botão de idioma
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = currentLanguage === 'pt-BR' ? 'PT' : 'EN';
    }
}

// Função para atualizar o botão ativo
function updateActiveButton() {
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const langCode = option.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (langCode === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se há uma preferência salva
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Configurar o dropdown de idiomas
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langSwitcher = document.querySelector('.lang-switcher');

    if (langBtn && langDropdown) {
        // Toggle do dropdown ao clicar no botão
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
        });

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!langSwitcher.contains(e.target)) {
                langDropdown.classList.remove('show');
            }
        });
    }
    
    translatePage();
    updateActiveButton();
}); 