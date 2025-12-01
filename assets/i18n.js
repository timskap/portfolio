// Translation system
(function() {
    const translations = {
        en: {
            'nav.about': 'About',
            'nav.projects': 'Projects',
            'nav.skills': 'Skills',
            'nav.contact': 'Contact',
            'header.tagline': 'Building digital worlds, apps, and games',
            'about.title': 'About Me',
            'about.p1': 'I create interactive experiences where code, design, and world-building come together.',
            'about.p2': 'Over the past years, I\'ve released apps and games built with Unity, SwiftUI, RealityKit, and MAUI, shipped products to the App Store, showed projects at Tokyo Game Show, and worked across AR/VR with companies in the US, Europe, and Japan.',
            'about.p3': 'I\'m a developer, product thinker, and creator of digital worlds.',
            'about.p4': 'I love making things people can explore, touch, and experience.',
            'about.contactTitle': 'For collaborations, consulting, or hiring:',
            'about.email': 'Email',
            'about.telegram': 'Telegram',
            'about.linkedin': 'LinkedIn',
            'about.footer': 'Portfolio & social links available upon request.',
            'projects.title': 'Projects',
            'projects.browseText': 'Click the button below to browse my projects:',
            'projects.browseBtn': 'Browse Projects',
            'startup.message1': 'This is a portfolio of Timur Abdrakhimov.',
            'startup.message2': 'To proceed please press START button.',
            'startup.startBtn': 'START',
            'installer.title': 'Projects Installation Wizard',
            'installer.step': 'Step 1 of 7',
            'installer.back': '< Back',
            'installer.next': 'Next >',
            'installer.cancel': 'Cancel',
            'installer.reinstall': 'Reinstall',
            'installer.finish': 'Finish',
            'installer.website': 'Website',
            'installer.steam': 'Steam',
            'installer.community': 'Community',
            'installer.comic': 'Comic',
            'installer.feature': 'Feature',
            'installer.tgsPress': 'TGS Press',
            'installer.appStore': 'App Store',
            'installer.developerSite': 'Developer Site',
            'installer.productHunt': 'Product Hunt',
            'installer.article': 'Article',
            'installer.telegram': 'Telegram',
            'installer.twitter': 'Twitter',
            'installer.caseStudy': 'Case Study (Habr)',
            'installer.sobakistan.title': 'Sobakistan: The Land of Dogs',
            'installer.sobakistan.description': 'Dark satirical narrative adventure about a closed dog-state. Unity, PC, Narrative Adventure.',
            'installer.sobakistan.p1': 'A dark, satirical world created together with comic artist Vitalii Terletskii. Presented at Tokyo Game Show and supported by hundreds of players worldwide.',
            'installer.sobakistan.highlightsTitle': 'Highlights:',
            'installer.sobakistan.h1': 'Deep branching narrative with multiple endings',
            'installer.sobakistan.h2': 'Character-driven storytelling (Yagodovich, Sirius, Gamma, Buddy…)',
            'installer.sobakistan.h3': 'Fully custom lore, atmosphere, and grim humor',
            'installer.sobakistan.h4': 'Mini-games, choices, and consequence-driven scenarios',
            'installer.sobakistan.h5': 'Complete dialogue and event system with audio',
            'installer.sobakistan.p2': 'I\'m responsible for gameplay systems, UI/UX, architecture, save/load logic, dialogue tech, performance, and content integration.',
            'installer.gnomes.title': 'Gnomes And Knights',
            'installer.gnomes.description': 'Gloomy low-poly dark fantasy about a knight hunting gnomes. Unity, iOS/Android.',
            'installer.gnomes.p1': 'A collaboration with Vitalii Terletskii and Artem Bizyaev. A fantasy world where players follow one of three story arcs — Greed, Noble, or Revenge.',
            'installer.gnomes.featuresTitle': 'Features:',
            'installer.gnomes.f1': 'Procedurally generated worlds and biomes',
            'installer.gnomes.f2': 'Special tiles and unique required objects per level',
            'installer.gnomes.f3': 'In-depth dialogue system and Steam achievements',
            'installer.gnomes.f4': 'Player progress, save files, and seamless game continuation',
            'installer.minimap.title': 'Mini-Map Radar',
            'installer.minimap.description': 'Apple Watch game-styled minimap inspired by GTA / Fallout. SwiftUI, watchOS, MapKit.',
            'installer.minimap.p1': 'A fan-favorite Apple Watch app that transforms your real surroundings into a stylish mini-map inspired by classic games.',
            'installer.minimap.includesTitle': 'Includes:',
            'installer.minimap.i1': 'Rotating radar-style map synced with player orientation',
            'installer.minimap.i2': 'Location markers, navigation, and custom skins',
            'installer.minimap.i3': 'AR overlays and enhanced visual effects',
            'installer.minimap.i4': 'Viral content on TikTok and Reels, strong community interest',
            'installer.minimap.p2': 'One of my most recognizable projects.',
            'installer.gis.title': '2GIS Immersive',
            'installer.gis.description': '3D encyclopedia of landmarks for Apple Vision Pro. SwiftUI, RealityKit, Reality Composer Pro, VisionOS.',
            'installer.gis.p1': 'Created in just 8 days, this immersive app showcases 3D models of landmarks and destinations in spatial computing. Built for 2ГИС (2GIS), one of Russia\'s leading mapping and navigation companies.',
            'installer.gis.highlightsTitle': 'Highlights:',
            'installer.gis.h1': 'One of the first VisionOS apps worldwide (top 600) and the first VisionOS app from Russia',
            'installer.gis.h2': 'Built with SwiftUI and RealityKit for spatial 3D experiences',
            'installer.gis.h3': '3D models viewable in AR with detailed information panels',
            'installer.gis.h4': 'Featured by Apple for early Vision Pro support',
            'installer.gis.h5': 'Developed using VisionOS simulator before device launch',
            'installer.vr.title': 'AR & VR Projects',
            'installer.vr.description': 'Interactive VR/AR experiences and tools. Unity, RealityKit, Meta Quest, Vision Pro.',
            'installer.vr.p1': 'I\'ve built interactive VR/AR experiences and tools for:',
            'installer.vr.l1': 'US universities',
            'installer.vr.l2': 'Verizon',
            'installer.vr.l3': 'corporate clients',
            'installer.vr.l4': 'exhibitions and showcases',
            'installer.vr.skillsTitle': 'Skills used:',
            'installer.vr.s1': 'Meta Quest / Vision Pro optimization',
            'installer.vr.s2': 'Custom shaders (URP, Metal)',
            'installer.vr.s3': 'Spatial interactions, locomotion systems',
            'installer.vr.s4': 'VR launchers, content browsers, and simulators',
            'installer.installing.title': 'Installing Projects',
            'installer.installing.description': 'Please wait while projects are being installed...',
            'installer.complete.title': 'Project Installation Complete',
            'installer.complete.p1': 'All of Timur Abdrakhimov\'s projects have been successfully Viewed.',
            'installer.complete.p2': 'The following worlds are now available:',
            'installer.complete.l1': 'Sobakistan',
            'installer.complete.l1desc': 'dark satirical dog-state adventure',
            'installer.complete.l2': 'Gnomes & Knights',
            'installer.complete.l2desc': 'gloomy low-poly dark fantasy',
            'installer.complete.l3': 'Mini-Map Radar',
            'installer.complete.l3desc': 'game-styled Apple Watch minimap',
            'installer.complete.l4': '2GIS Immersive & AR/VR',
            'installer.complete.l4desc': 'spatial experiences in Vision Pro & VR',
            'installer.complete.p3': 'Click Finish to close the Projects Installation Wizard.',
            'skills.title': 'Technical Skills',
            'skills.unity.title': 'Unity 3D',
            'skills.unity.desc': 'VR/AR development, mobile games, PC builds, navigation, dialogue systems, performance optimization, editor tools, procedural generation.',
            'skills.swift.title': 'Swift / SwiftUI / RealityKit',
            'skills.swift.desc': 'watchOS/iOS apps, Vision Pro interactions, MapKit navigation, AR entities, smooth UI/UX animations.',
            'skills.csharp.title': 'C#, Java, .NET',
            'skills.csharp.desc': 'Gameplay architecture, asynchronous programming, MAUI cross-platform apps.',
            'skills.design.title': 'Design & Product Thinking',
            'skills.design.desc': 'User flow design, feature planning, rapid prototyping, analytics, and delivering polished experiences.',
            'highlights.title': 'Highlights',
            'highlights.h1': 'Tokyo Game Show (TGS) — Sobakistan showcase',
            'highlights.h2': 'Guest lectures and workshops at tech universities',
            'highlights.h3': 'Public playtests and demo showcases',
            'highlights.h4': 'Popular content around Mini-Map Radar across social platforms',
            'work.title': 'How I Work',
            'work.w1title': 'Product-first:',
            'work.w1desc': 'understand user value and purpose',
            'work.w2title': 'Engineering-driven:',
            'work.w2desc': 'clean architecture and stable builds',
            'work.w3title': 'Creative:',
            'work.w3desc': 'focus on mood, style, atmosphere, and world cohesion',
            'work.w4title': 'Fast iterations:',
            'work.w4desc': 'constant testing, polishing, improving',
            'work.w5title': 'Systematic:',
            'work.w5desc': 'roadmaps, UX details, content pipelines'
        },
        ru: {
            'nav.about': 'Обо мне',
            'nav.projects': 'Проекты',
            'nav.skills': 'Навыки',
            'nav.contact': 'Контакты',
            'header.tagline': 'Создаю цифровые миры, приложения и игры',
            'about.title': 'Обо мне',
            'about.p1': 'Я создаю интерактивные проекты, где код, дизайн и создание миров объединяются.',
            'about.p2': 'За последние годы я выпустил приложения и игры на Unity, SwiftUI, RealityKit и MAUI, публиковал продукты в App Store, показывал проекты на Tokyo Game Show и работал над AR/VR проектами с компаниями в США, Европе и Японии.',
            'about.p3': 'Я разработчик, продуктовый мыслитель и создатель цифровых миров.',
            'about.p4': 'Мне нравится создавать вещи, которые люди могут исследовать, трогать и переживать.',
            'about.contactTitle': 'Для сотрудничества, консультаций или найма:',
            'about.email': 'Email',
            'about.telegram': 'Telegram',
            'about.linkedin': 'LinkedIn',
            'about.footer': 'Портфолио и ссылки на соцсети доступны по запросу.',
            'projects.title': 'Проекты',
            'projects.browseText': 'Нажмите кнопку ниже, чтобы просмотреть мои проекты:',
            'projects.browseBtn': 'Просмотреть проекты',
            'startup.message1': 'Это портфолио Тимура Абдрахимова.',
            'startup.message2': 'Для продолжения нажмите кнопку START.',
            'startup.startBtn': 'START',
            'installer.title': 'Мастер установки проектов',
            'installer.step': 'Шаг 1 из 7',
            'installer.back': '< Назад',
            'installer.next': 'Далее >',
            'installer.cancel': 'Отмена',
            'installer.reinstall': 'Переустановить',
            'installer.finish': 'Завершить',
            'installer.website': 'Сайт',
            'installer.steam': 'Steam',
            'installer.community': 'Сообщество',
            'installer.comic': 'Комикс',
            'installer.feature': 'Статья',
            'installer.tgsPress': 'Пресса TGS',
            'installer.appStore': 'App Store',
            'installer.developerSite': 'Сайт разработчика',
            'installer.productHunt': 'Product Hunt',
            'installer.article': 'Статья',
            'installer.telegram': 'Telegram',
            'installer.twitter': 'Twitter',
            'installer.caseStudy': 'Кейс (Habr)',
            'installer.sobakistan.title': 'Собакистан: Земля собак',
            'installer.sobakistan.description': 'Мрачное сатирическое повествовательное приключение о закрытом собачьем государстве. Unity, PC, Narrative Adventure.',
            'installer.sobakistan.p1': 'Мрачный сатирический мир, созданный вместе с комикс-художником Виталием Терлецким. Представлен на Tokyo Game Show и поддержан сотнями игроков по всему миру.',
            'installer.sobakistan.highlightsTitle': 'Особенности:',
            'installer.sobakistan.h1': 'Глубокая разветвленная история с множественными концовками',
            'installer.sobakistan.h2': 'Повествование, основанное на персонажах (Ягодович, Сириус, Гамма, Бадди…)',
            'installer.sobakistan.h3': 'Полностью кастомный лор, атмосфера и мрачный юмор',
            'installer.sobakistan.h4': 'Мини-игры, выборы и сценарии с последствиями',
            'installer.sobakistan.h5': 'Полная система диалогов и событий с аудио',
            'installer.sobakistan.p2': 'Я отвечаю за игровые системы, UI/UX, архитектуру, логику сохранения/загрузки, технологию диалогов, производительность и интеграцию контента.',
            'installer.gnomes.title': 'Гномы и Рыцари',
            'installer.gnomes.description': 'Мрачная low-poly темная фэнтези о рыцаре, охотящемся на гномов. Unity, iOS/Android.',
            'installer.gnomes.p1': 'Коллаборация с Виталием Терлецким и Артемом Бизяевым. Фэнтезийный мир, где игроки следуют одной из трех сюжетных линий — Жадность, Благородство или Месть.',
            'installer.gnomes.featuresTitle': 'Особенности:',
            'installer.gnomes.f1': 'Процедурно генерируемые миры и биомы',
            'installer.gnomes.f2': 'Особые тайлы и уникальные необходимые объекты на уровень',
            'installer.gnomes.f3': 'Глубокая система диалогов и достижения Steam',
            'installer.gnomes.f4': 'Прогресс игрока, файлы сохранений и бесшовное продолжение игры',
            'installer.minimap.title': 'Mini-Map Radar',
            'installer.minimap.description': 'Мини-карта в стиле игр для Apple Watch, вдохновленная GTA / Fallout. SwiftUI, watchOS, MapKit.',
            'installer.minimap.p1': 'Популярное приложение для Apple Watch, которое превращает ваше окружение в стильную мини-карту, вдохновленную классическими играми.',
            'installer.minimap.includesTitle': 'Включает:',
            'installer.minimap.i1': 'Вращающаяся карта в стиле радара, синхронизированная с ориентацией игрока',
            'installer.minimap.i2': 'Маркеры местоположения, навигация и пользовательские скины',
            'installer.minimap.i3': 'AR-оверлеи и улучшенные визуальные эффекты',
            'installer.minimap.i4': 'Вирусный контент в TikTok и Reels, сильный интерес сообщества',
            'installer.minimap.p2': 'Один из моих самых узнаваемых проектов.',
            'installer.gis.title': '2ГИС Immersive',
            'installer.gis.description': '3D энциклопедия достопримечательностей для Apple Vision Pro. SwiftUI, RealityKit, Reality Composer Pro, VisionOS.',
            'installer.gis.p1': 'Созданное всего за 8 дней, это иммерсивное приложение демонстрирует 3D модели достопримечательностей и мест в пространственных вычислениях. Построено для 2ГИС, одной из ведущих российских компаний по картографии и навигации.',
            'installer.gis.highlightsTitle': 'Особенности:',
            'installer.gis.h1': 'Одно из первых приложений VisionOS в мире (топ 600) и первое приложение VisionOS из России',
            'installer.gis.h2': 'Построено на SwiftUI и RealityKit для пространственных 3D-впечатлений',
            'installer.gis.h3': '3D модели, просматриваемые в AR с детальными информационными панелями',
            'installer.gis.h4': 'Отмечено Apple за раннюю поддержку Vision Pro',
            'installer.gis.h5': 'Разработано с использованием симулятора VisionOS до запуска устройства',
            'installer.vr.title': 'AR & VR Проекты',
            'installer.vr.description': 'Интерактивные VR/AR впечатления и инструменты. Unity, RealityKit, Meta Quest, Vision Pro.',
            'installer.vr.p1': 'Я создал интерактивные VR/AR впечатления и инструменты для:',
            'installer.vr.l1': 'Университетов США',
            'installer.vr.l2': 'Verizon',
            'installer.vr.l3': 'корпоративных клиентов',
            'installer.vr.l4': 'выставок и презентаций',
            'installer.vr.skillsTitle': 'Используемые навыки:',
            'installer.vr.s1': 'Оптимизация Meta Quest / Vision Pro',
            'installer.vr.s2': 'Пользовательские шейдеры (URP, Metal)',
            'installer.vr.s3': 'Пространственные взаимодействия, системы передвижения',
            'installer.vr.s4': 'VR-лаунчеры, браузеры контента и симуляторы',
            'installer.installing.title': 'Установка проектов',
            'installer.installing.description': 'Пожалуйста, подождите, пока проекты устанавливаются...',
            'installer.complete.title': 'Установка проектов завершена',
            'installer.complete.p1': 'Все проекты Тимура Абдрахимова были успешно просмотрены.',
            'installer.complete.p2': 'Следующие миры теперь доступны:',
            'installer.complete.l1': 'Собакистан',
            'installer.complete.l1desc': 'мрачное сатирическое приключение о собачьем государстве',
            'installer.complete.l2': 'Гномы и Рыцари',
            'installer.complete.l2desc': 'мрачная low-poly темная фэнтези',
            'installer.complete.l3': 'Mini-Map Radar',
            'installer.complete.l3desc': 'мини-карта в стиле игр для Apple Watch',
            'installer.complete.l4': '2ГИС Immersive & AR/VR',
            'installer.complete.l4desc': 'пространственные впечатления в Vision Pro & VR',
            'installer.complete.p3': 'Нажмите Завершить, чтобы закрыть Мастер установки проектов.',
            'skills.title': 'Технические навыки',
            'skills.unity.title': 'Unity 3D',
            'skills.unity.desc': 'VR/AR разработка, мобильные игры, PC сборки, навигация, системы диалогов, оптимизация производительности, инструменты редактора, процедурная генерация.',
            'skills.swift.title': 'Swift / SwiftUI / RealityKit',
            'skills.swift.desc': 'watchOS/iOS приложения, взаимодействия Vision Pro, навигация MapKit, AR сущности, плавные UI/UX анимации.',
            'skills.csharp.title': 'C#, Java, .NET',
            'skills.csharp.desc': 'Игровая архитектура, асинхронное программирование, кроссплатформенные приложения MAUI.',
            'skills.design.title': 'Дизайн и продуктовое мышление',
            'skills.design.desc': 'Дизайн пользовательских потоков, планирование функций, быстрое прототипирование, аналитика и создание отполированных впечатлений.',
            'highlights.title': 'Достижения',
            'highlights.h1': 'Tokyo Game Show (TGS) — презентация Собакистана',
            'highlights.h2': 'Гостевые лекции и воркшопы в технических университетах',
            'highlights.h3': 'Публичные плейтесты и демо-презентации',
            'highlights.h4': 'Популярный контент вокруг Mini-Map Radar в социальных сетях',
            'work.title': 'Как я работаю',
            'work.w1title': 'Продуктовый подход:',
            'work.w1desc': 'понимание ценности и цели для пользователя',
            'work.w2title': 'Инженерный подход:',
            'work.w2desc': 'чистая архитектура и стабильные сборки',
            'work.w3title': 'Творческий подход:',
            'work.w3desc': 'фокус на настроении, стиле, атмосфере и целостности мира',
            'work.w4title': 'Быстрые итерации:',
            'work.w4desc': 'постоянное тестирование, полировка, улучшение',
            'work.w5title': 'Систематический подход:',
            'work.w5desc': 'дорожные карты, детали UX, контентные пайплайны'
        }
    };
    
    let currentLang = localStorage.getItem('language') || 'en';
    
    function translatePage(lang) {
        currentLang = lang;
        window.currentLang = lang; // Expose to installer.js
        localStorage.setItem('language', lang);
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const textContent = translations[lang][key];
                // Simple text replacement - preserve HTML if needed
                if (element.children.length > 0) {
                    // If element has children, try to replace text nodes
                    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
                    let node = walker.nextNode();
                    if (node) {
                        node.textContent = textContent;
                    } else {
                        element.textContent = textContent;
                    }
                } else {
                    element.textContent = textContent;
                }
            }
        });
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update step counter if installer is open
        updateStepCounter();
    }
    
    // Helper function to update step counter with translation
    function updateStepCounter() {
        const progressText = document.getElementById('installerProgress');
        if (progressText) {
            const stepMatch = progressText.textContent.match(/(\d+)/g);
            if (stepMatch && stepMatch.length >= 2) {
                const step = parseInt(stepMatch[0]);
                const total = parseInt(stepMatch[1]);
                const stepText = currentLang === 'ru' ? 'Шаг' : 'Step';
                const ofText = currentLang === 'ru' ? 'из' : 'of';
                progressText.textContent = `${stepText} ${step} ${ofText} ${total}`;
            }
        }
    }
    
    // Expose translation function and data globally for installer.js
    window.updateStepCounterTranslation = function(step, total) {
        const progressText = document.getElementById('installerProgress');
        if (progressText) {
            const stepText = currentLang === 'ru' ? 'Шаг' : 'Step';
            const ofText = currentLang === 'ru' ? 'из' : 'of';
            progressText.textContent = `${stepText} ${step} ${ofText} ${total}`;
        }
    };
    window.translations = translations;
    window.currentLang = currentLang;
    
    // Language button handlers
    document.getElementById('langEN')?.addEventListener('click', () => translatePage('en'));
    document.getElementById('langRU')?.addEventListener('click', () => translatePage('ru'));
    
    // Initialize with saved language when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => translatePage(currentLang));
    } else {
        translatePage(currentLang);
    }
})();

