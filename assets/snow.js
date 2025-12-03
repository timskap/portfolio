(function() {
    const snowContainer = document.getElementById('snowContainer');
    if (!snowContainer) return;
    
    // Уменьшаем количество для лучшей производительности
    const SNOWFLAKE_COUNT = 35;
    
    function createSnowflakes() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < SNOWFLAKE_COUNT; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            // Используем простой символ вместо emoji для производительности
            snowflake.textContent = '•';
            
            const size = 20 + Math.random() * 4; // 4-12px
            const left = Math.random() * 100;
            const duration = 8 + Math.random() * 12; // 8-20 секунд
            const delay = Math.random() * -20;
            const drift = -20 + Math.random() * 40;
            const opacity = 0.4 + Math.random() * 0.6;
            
            snowflake.style.cssText = `
                left:${left}%;
                font-size:${size}px;
                animation-duration:${duration}s;
                animation-delay:${delay}s;
                --drift:${drift}px;
                opacity:${opacity};
            `;
            
            fragment.appendChild(snowflake);
        }
        
        snowContainer.appendChild(fragment);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSnowflakes);
    } else {
        createSnowflakes();
    }
})();
