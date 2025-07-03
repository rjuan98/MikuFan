// Carregar o idioma imediatamente antes de qualquer coisa
const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt-BR';
document.documentElement.lang = savedLanguage;

const translations = {
    'pt-BR': {
        'welcome': 'Bem-vindo ao mundo mágico da Hatsune Miku!',
        'nav.home': 'Início',
        'nav.gallery': 'GALERIA',
        'nav.music': 'MÚSICAS',
        'nav.login': 'LOGIN',
        'nav.news': 'NOTÍCIAS',
        'nav.community': 'COMUNIDADE',
        'nav.downloads': 'DOWNLOADS',
        'nav.events': 'EVENTOS',
        'language': 'Idioma',
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
        'footer.privacy': 'Política de Privacidade',
        'footer.about': 'Sobre o MikuFan',
        'footer.about_desc': 'Seu destino número um para tudo relacionado à Hatsune Miku! Junte-se à nossa comunidade vibrante de fãs e explore o mundo mágico da diva virtual mais amada do mundo.',
        'footer.quick_links': 'Links Rápidos',
        'footer.community': 'Comunidade',
        'footer.copyright': '© 2025 MikuFan. Todos os direitos reservados.',
        'footer.powered_by': 'Desenvolvido com',
        'nav.forum': 'Fórum',
        'nav.fanart': 'Fan Art',
        'login.title': 'Login',
        'login.submit': 'Entrar',
        'login.no_account': 'Não tem uma conta?',
        'login.register_link': 'Registre-se',
        'login.google': 'Entrar com Google',
        'login.or': 'ou',
        'register.title': 'Registro',
        'register.submit': 'Registrar',
        'register.has_account': 'Já tem uma conta?',
        'register.login_link': 'Faça login',
        'register.google': 'Registrar com Google',
        'error.passwords_dont_match': 'As senhas não coincidem',
        'error.invalid_email': 'Email inválido',
        'error.weak_password': 'Senha muito fraca',
        'error.email_in_use': 'Este email já está em uso',
        'error.invalid_credentials': 'Email ou senha incorretos'
    },
    'en': {
        'welcome': 'Welcome to the magical world of Hatsune Miku!',
        'nav.home': 'Home',
        'nav.gallery': 'GALLERY',
        'nav.music': 'MUSIC',
        'nav.login': 'LOGIN',
        'nav.news': 'NEWS',
        'nav.community': 'COMMUNITY',
        'nav.downloads': 'DOWNLOADS',
        'nav.events': 'EVENTS',
        'language': 'Language',
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
        'footer.privacy': 'Privacy Policy',
        'footer.about': 'About MikuFan',
        'footer.about_desc': 'Your number one destination for all things Hatsune Miku! Join our vibrant fan community and explore the magical world of the most beloved virtual diva.',
        'footer.quick_links': 'Quick Links',
        'footer.community': 'Community',
        'footer.copyright': '© 2025 MikuFan. All rights reserved.',
        'footer.powered_by': 'Powered by',
        'nav.forum': 'Forum',
        'nav.fanart': 'Fan Art',
        'login.title': 'Login',
        'login.submit': 'Sign In',
        'login.no_account': "Don't have an account?",
        'login.register_link': 'Sign Up',
        'login.google': 'Sign in with Google',
        'login.or': 'or',
        'register.title': 'Register',
        'register.submit': 'Sign Up',
        'register.has_account': 'Already have an account?',
        'register.login_link': 'Sign In',
        'register.google': 'Sign up with Google',
        'error.passwords_dont_match': 'Passwords do not match',
        'error.invalid_email': 'Invalid email',
        'error.weak_password': 'Password is too weak',
        'error.email_in_use': 'This email is already in use',
        'error.invalid_credentials': 'Invalid email or password'
    }
};

// Função para traduzir a página
function translatePage(language) {
    // Validar se o idioma existe
    if (!translations[language]) {
        language = 'pt-BR'; // Fallback para português se o idioma não existir
    }

    // Traduzir todos os elementos com data-translate
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language] && translations[language][key]) {
            if (element.classList.contains('nav-link')) {
                // Para links de navegação, atualizar apenas o texto dentro do span
                const span = element.querySelector('.nav-text');
                if (span) {
                    span.textContent = translations[language][key];
                }
            } else {
                element.textContent = translations[language][key];
            }
        }
    });

    // Atualizar o idioma do documento
    document.documentElement.lang = language;

    // Salvar o idioma escolhido
    localStorage.setItem('selectedLanguage', language);

    // Atualizar o texto do botão de idioma
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) {
        currentLangSpan.textContent = language === 'pt-BR' ? 'PT' : 'EN';
    }

    // Atualizar a classe ativa nas opções de idioma
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const langCode = option.getAttribute('data-lang');
        if (langCode === language) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Função para obter o idioma atual
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'pt-BR';
}

// Função para fechar o dropdown
function closeLanguageDropdown() {
    const dropdown = document.querySelector('.lang-dropdown');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// Função para alternar o dropdown
function toggleLanguageDropdown(event) {
    if (event) {
        event.stopPropagation();
    }
    const dropdown = document.querySelector('.lang-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Traduzir a página imediatamente ao carregar o script
translatePage(savedLanguage);

// Inicializar a tradução quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Configurar o dropdown de idiomas
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguageDropdown);
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-switcher')) {
            closeLanguageDropdown();
        }
    });

    // Adicionar listeners para as opções de idioma
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const newLanguage = option.getAttribute('data-lang');
            translatePage(newLanguage);
            closeLanguageDropdown(); // Fecha o dropdown após selecionar
        });
    });
});

// Expor funções necessárias globalmente
window.translatePage = translatePage;
window.getCurrentLanguage = getCurrentLanguage;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.closeLanguageDropdown = closeLanguageDropdown; 