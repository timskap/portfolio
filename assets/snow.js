(function() {
    const snowContainer = document.getElementById('snowContainer');
    const snowAccumulation = document.getElementById('snowAccumulation');
    const snowflakes = [];
    let accumulationHeight = 0;
    const maxAccumulationHeight = 50; // Maximum height in pixels

    const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼', '✽', '✾', '✿'];
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        const size = Math.random();
        let sizeClass = 'snowflake-small';
        let animationType = 'snowfall';
        let duration = Math.random() * 3 + 3; // 3-6 seconds
        
        if (size > 0.6) {
            sizeClass = 'snowflake-large';
            duration = Math.random() * 2 + 4; // 4-6 seconds (slower)
        } else if (size > 0.3) {
            sizeClass = 'snowflake-medium';
            duration = Math.random() * 2 + 3; // 3-5 seconds
        } else {
            duration = Math.random() * 2 + 2; // 2-4 seconds (faster)
        }

        // Randomly choose animation type
        const animType = Math.random();
        if (animType > 0.66) {
            animationType = 'snowfall-fast';
        } else if (animType > 0.33) {
            animationType = 'snowfall-slow';
        }

        snowflake.className = `snowflake ${sizeClass}`;
        snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animation = `${animationType} ${duration}s linear forwards`;
        snowflake.style.animationDelay = Math.random() * 0.5 + 's';
        
        snowContainer.appendChild(snowflake);
        
        const snowflakeData = {
            element: snowflake,
            startTime: Date.now(),
            duration: duration * 1000,
            left: parseFloat(snowflake.style.left)
        };
        
        snowflakes.push(snowflakeData);

        // Remove snowflake after animation
        setTimeout(() => {
            // Check if snowflake reached bottom (accumulate)
            const rect = snowflake.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top + rect.height >= viewportHeight - 5) {
                // Snowflake reached bottom - accumulate
                accumulateSnow();
            }
            
            snowflake.remove();
            const index = snowflakes.indexOf(snowflakeData);
            if (index > -1) {
                snowflakes.splice(index, 1);
            }
        }, duration * 1000 + 100);
    }

    function accumulateSnow() {
        if (accumulationHeight < maxAccumulationHeight) {
            accumulationHeight += 0.1; // Gradually increase accumulation
            snowAccumulation.style.height = accumulationHeight + 'px';
        }
    }

    // Initialize snow effect when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnow);
    } else {
        initSnow();
    }

    function initSnow() {
        // Create snowflakes periodically
        setInterval(createSnowflake, 200);

        // Gradually reduce accumulation over time (melting effect)
        setInterval(() => {
            if (accumulationHeight > 0) {
                accumulationHeight = Math.max(0, accumulationHeight - 0.05);
                snowAccumulation.style.height = accumulationHeight + 'px';
            }
        }, 1000);
    }
})();

