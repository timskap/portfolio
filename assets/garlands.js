(function() {
    const garlandsContainer = document.getElementById('garlandsContainer');
    if (!garlandsContainer) return;

    const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'white'];
    const garlands = [];
    let canvas, ctx;
    let animationId;
    
    // Класс для гирлянды (статичная арка)
    class Garland {
        constructor(startX, startY, endX, endY, color, headerElement) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.color = color;
            this.headerElement = headerElement;
            this.lights = [];
            
            // Вычисляем параметры арки
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const lightCount = Math.max(5, Math.floor(distance / 20)); // Примерно одна лампочка каждые 20px
            const sag = Math.min(30, distance * 0.1); // Глубина провисания (максимум 30px или 10% от длины)
            
            // Сохраняем параметры для пересчёта
            this.lightCount = lightCount;
            this.sag = sag;
            
            // Создаём DOM элементы для лампочек
            this.createLights();
        }
        
        // Вычисляем позицию точки на параболической арке
        getArcPoint(t) {
            // t от 0 до 1
            const x = this.startX + (this.endX - this.startX) * t;
            // Параболическая формула для провисания
            const sagFactor = 4 * t * (1 - t); // Максимум в середине (t=0.5)
            const y = this.startY + this.sag * sagFactor;
            return { x, y };
        }
        
        createLights() {
            for (let i = 0; i < this.lightCount; i++) {
                const t = i / (this.lightCount - 1); // От 0 до 1
                const point = this.getArcPoint(t);
                
                const light = document.createElement('div');
                light.className = `garland-light color-${this.color}`;
                light.style.left = (point.x - 4) + 'px';
                light.style.top = (point.y - 4) + 'px';
                light.style.animationDelay = (i * 0.1) + 's';
                light.classList.add('on');
                
                garlandsContainer.appendChild(light);
                this.lights.push({ element: light });
            }
        }
        
        update() {
            // Обновляем позиции на основе текущей позиции заголовка
            if (!this.headerElement) return;
            
            const rect = this.headerElement.getBoundingClientRect();
            this.startX = rect.left;
            this.endX = rect.right;
            this.startY = rect.top + rect.height / 2;
            this.endY = this.startY;
            
            // Пересчитываем глубину провисания
            const distance = Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
            this.sag = Math.min(30, distance * 0.1);
            
            // Обновляем позиции лампочек
            this.lights.forEach(({ element }, index) => {
                const t = index / (this.lightCount - 1);
                const point = this.getArcPoint(t);
                element.style.left = (point.x - 4) + 'px';
                element.style.top = (point.y - 4) + 'px';
            });
        }
        
        drawLines() {
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            // Рисуем параболическую кривую
            const steps = 50; // Количество точек для плавной кривой
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
            this.lights.forEach(({ element }) => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
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
            headers.push({
                element: header,
                startX: rect.left,
                endX: rect.right,
                y: rect.top + rect.height / 2 // Центр по вертикали
            });
        });
        
        return headers;
    }
    
    // Создаём гирлянды для каждого заголовка (от начала до конца заголовка)
    function createGarlandsForHeaders() {
        const headers = getSectionHeaders();
        
        if (headers.length === 0) return;
        
        headers.forEach(header => {
            // Соединяем начало и конец одного заголовка
            const startX = header.startX;
            const startY = header.y;
            const endX = header.endX;
            const endY = header.y;
            
            // Выбираем случайный цвет
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const garland = new Garland(startX, startY, endX, endY, color, header.element);
            garlands.push(garland);
        });
    }
    
    // Canvas для отрисовки линий
    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.className = 'garlands-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false; // Пиксельный стиль
        garlandsContainer.appendChild(canvas);
        
        // Обновляем размер canvas при изменении окна
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.imageSmoothingEnabled = false;
        });
    }
    
    // Анимация мигания лампочек
    function animateLights() {
        garlands.forEach(garland => {
            garland.lights.forEach(({ element }, index) => {
                const wavePosition = (Date.now() / 200) % garland.lights.length;
                const distanceFromWave = Math.abs(index - wavePosition);
                
                if (distanceFromWave < 2) {
                    element.classList.add('on');
                    element.classList.remove('off');
                } else if (Math.random() > 0.9) {
                    if (Math.random() > 0.5) {
                        element.classList.add('on');
                        element.classList.remove('off');
                    } else {
                        element.classList.remove('on');
                        element.classList.add('off');
                    }
                }
            });
        });
    }
    
    // Основной цикл анимации
    function animate() {
        if (!canvas || !ctx) return;
        
        // Очищаем canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Обновляем все гирлянды
        garlands.forEach(garland => {
            garland.update();
            garland.drawLines();
        });
        
        // Анимация мигания
        animateLights();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Инициализация
    function init() {
        initCanvas();
        
        // Ждём загрузки страницы перед созданием гирлянд
        setTimeout(() => {
            createGarlandsForHeaders();
            animate();
        }, 500);
        
        // Обновляем позиции при скролле
        window.addEventListener('scroll', () => {
            garlands.forEach(garland => {
                garland.update();
            });
        }, { passive: true });
    }
    
    // Инициализация при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Пересоздаём гирлянды при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Удаляем старые гирлянды
            garlands.forEach(garland => garland.remove());
            garlands.length = 0;
            
            // Обновляем canvas
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx.imageSmoothingEnabled = false;
            }
            
            // Пересоздаём гирлянды
            setTimeout(() => {
                createGarlandsForHeaders();
            }, 100);
        }, 300);
    });
})();
