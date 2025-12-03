(function() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    
    const snowflakeSymbols = ['❄', '❅', '❆'];
    const SNOWFLAKE_COUNT = 50; // Фиксированное количество снежинок
    
    function createSnowflakes() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
            
            // Случайные параметры
            const size = 0.5 + Math.random() * 1; // 0.5em - 1.5em
            const left = Math.random() * 100;
            const duration = 5 + Math.random() * 10; // 5-15 секунд
            const delay = Math.random() * -15; // Отрицательная задержка для старта в разных позициях
            const drift = -30 + Math.random() * 60; // Отклонение по X: -30px до +30px
            
            snowflake.style.cssText = `
                left: ${left}%;
                font-size: ${size}em;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
                opacity: ${0.5 + Math.random() * 0.5};
            `;
            
            fragment.appendChild(snowflake);
        }
        
        snowContainer.appendChild(fragment);
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSnowflakes);
    } else {
        createSnowflakes();
    }
})();
