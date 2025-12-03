(function() {
    const garlandsContainer = document.getElementById('garlandsContainer');
    if (!garlandsContainer) return;

    const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'white'];
    const garlands = [];
    let canvas, ctx;
    
    // Класс для гирлянды (статичная арка)
    class Garland {
        constructor(startX, startY, endX, endY, color) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.color = color;
            this.lights = [];
            
            // Вычисляем параметры арки
            const distance = Math.abs(endX - startX);
            const lightCount = Math.max(5, Math.floor(distance / 20));
            const sag = Math.min(30, distance * 0.1);
            
            this.lightCount = lightCount;
            this.sag = sag;
            
            this.createLights();
        }
        
        // Вычисляем позицию точки на параболической арке
        getArcPoint(t) {
            const x = this.startX + (this.endX - this.startX) * t;
            const sagFactor = 4 * t * (1 - t); // Максимум в середине (t=0.5)
            const y = this.startY + this.sag * sagFactor;
            return { x, y };
        }
        
        createLights() {
            for (let i = 0; i < this.lightCount; i++) {
                const t = i / (this.lightCount - 1);
                const point = this.getArcPoint(t);
                
                const light = document.createElement('div');
                light.className = `garland-light color-${this.color} on`;
                // Позиционируем через left/top и центрируем через transform
                light.style.left = `${point.x}px`;
                light.style.top = `${point.y}px`;
                light.style.animationDelay = (i * 0.1) + 's';
                
                garlandsContainer.appendChild(light);
                this.lights.push(light);
            }
        }
        
        drawLines() {
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            const steps = 30;
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                const point = this.getArcPoint(t);
                
                if (i === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            }
            
            ctx.stroke();
        }
        
        remove() {
            this.lights.forEach(light => {
                if (light.parentNode) {
                    light.parentNode.removeChild(light);
                }
            });
        }
    }
    
    // Получаем позиции заголовков секций
    function getSectionHeaders() {
        const headers = [];
        const cardHeaders = document.querySelectorAll('.card-header h4');
        
        cardHeaders.forEach(header => {
            const rect = header.getBoundingClientRect();
            const scrollY = window.scrollY;
            headers.push({
                startX: rect.left,
                endX: rect.right,
                y: rect.top + scrollY + rect.height / 2
            });
        });
        
        return headers;
    }
    
    // Создаём гирлянды для каждого заголовка
    function createGarlandsForHeaders() {
        const headers = getSectionHeaders();
        
        if (headers.length === 0) return;
        
        headers.forEach(header => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const garland = new Garland(header.startX, header.y, header.endX, header.y, color);
            garlands.push(garland);
        });
        
        drawAllLines();
    }
    
    // Рисуем все линии гирлянд
    function drawAllLines() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        garlands.forEach(garland => garland.drawLines());
    }
    
    // Canvas для отрисовки линий
    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.className = 'garlands-canvas';
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        garlandsContainer.appendChild(canvas);
    }
    
    // Пересоздаём гирлянды
    function recreateGarlands() {
        garlands.forEach(garland => garland.remove());
        garlands.length = 0;
        
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
            ctx.imageSmoothingEnabled = false;
        }
        
        createGarlandsForHeaders();
    }
    
    // Инициализация
    function init() {
        initCanvas();
        
        setTimeout(() => {
            createGarlandsForHeaders();
        }, 500);
        
        // Обновляем только при изменении размера окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(recreateGarlands, 300);
        }, { passive: true });
    }
    
    // Инициализация при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
