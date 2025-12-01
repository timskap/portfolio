(function() {
    const garlandsContainer = document.getElementById('garlandsContainer');
    if (!garlandsContainer) return;

    const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'white'];
    const garlands = [];
    let canvas, ctx;
    let animationId;
    let needsRedraw = false;
    let lastScrollY = window.scrollY;
    let lastUpdateTime = 0;
    const UPDATE_THROTTLE = 16; // ~60fps max
    
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
            this.lastRect = null;
            this.cachedPositions = [];
            
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
            // Предвычисляем все позиции
            for (let i = 0; i < this.lightCount; i++) {
                const t = i / (this.lightCount - 1);
                const point = this.getArcPoint(t);
                this.cachedPositions.push({ x: point.x, y: point.y });
                
                const light = document.createElement('div');
                light.className = `garland-light color-${this.color}`;
                // Используем transform для лучшей производительности
                light.style.transform = `translate(${point.x - 4}px, ${point.y - 4}px)`;
                light.style.animationDelay = (i * 0.1) + 's';
                light.classList.add('on');
                
                garlandsContainer.appendChild(light);
                this.lights.push({ element: light, x: point.x, y: point.y });
            }
        }
        
        update() {
            // Обновляем позиции на основе текущей позиции заголовка
            if (!this.headerElement) return false;
            
            const rect = this.headerElement.getBoundingClientRect();
            
            // Проверяем, изменилась ли позиция (с небольшой погрешностью для оптимизации)
            const threshold = 1;
            if (this.lastRect && 
                Math.abs(this.lastRect.left - rect.left) < threshold &&
                Math.abs(this.lastRect.right - rect.right) < threshold &&
                Math.abs(this.lastRect.top - rect.top) < threshold &&
                Math.abs(this.lastRect.height - rect.height) < threshold) {
                return false; // Позиция не изменилась
            }
            
            this.lastRect = {
                left: rect.left,
                right: rect.right,
                top: rect.top,
                height: rect.height
            };
            
            this.startX = rect.left;
            this.endX = rect.right;
            this.startY = rect.top + rect.height / 2;
            this.endY = this.startY;
            
            // Пересчитываем глубину провисания
            const distance = this.endX - this.startX;
            this.sag = Math.min(30, distance * 0.1);
            
            // Обновляем позиции лампочек только если они изменились
            let positionsChanged = false;
            this.lights.forEach((lightData, index) => {
                const t = index / (this.lightCount - 1);
                const point = this.getArcPoint(t);
                
                // Проверяем, изменилась ли позиция
                if (Math.abs(lightData.x - point.x) > threshold || Math.abs(lightData.y - point.y) > threshold) {
                    lightData.x = point.x;
                    lightData.y = point.y;
                    // Используем transform для лучшей производительности
                    lightData.element.style.transform = `translate(${point.x - 4}px, ${point.y - 4}px)`;
                    positionsChanged = true;
                }
            });
            
            return positionsChanged;
        }
        
        drawLines() {
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            // Рисуем параболическую кривую (уменьшаем количество точек для производительности)
            const steps = 30; // Уменьшено с 50 до 30
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
                y: rect.top + rect.height / 2
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
        
        needsRedraw = true;
    }
    
    // Canvas для отрисовки линий
    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.className = 'garlands-canvas';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        garlandsContainer.appendChild(canvas);
        
        // Обновляем размер canvas при изменении окна
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx.imageSmoothingEnabled = false;
                needsRedraw = true;
            }, 100);
        }, { passive: true });
    }
    
    // Основной цикл анимации (оптимизированный)
    function animate(currentTime) {
        if (!canvas || !ctx) return;
        
        // Throttle updates
        const timeDelta = currentTime - lastUpdateTime;
        if (timeDelta < UPDATE_THROTTLE) {
            animationId = requestAnimationFrame(animate);
            return;
        }
        lastUpdateTime = currentTime;
        
        // Обновляем позиции только если нужно
        let shouldRedraw = needsRedraw;
        garlands.forEach(garland => {
            if (garland.update()) {
                shouldRedraw = true;
            }
        });
        
        // Перерисовываем canvas только если позиции изменились
        if (shouldRedraw) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            garlands.forEach(garland => {
                garland.drawLines();
            });
            needsRedraw = false;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Throttled scroll handler
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Проверяем, действительно ли изменилась позиция скролла
        if (Math.abs(currentScrollY - lastScrollY) < 5) {
            return;
        }
        
        lastScrollY = currentScrollY;
        needsRedraw = true;
    }
    
    // Инициализация
    function init() {
        initCanvas();
        
        // Ждём загрузки страницы перед созданием гирлянд
        setTimeout(() => {
            createGarlandsForHeaders();
            animate(0);
        }, 500);
        
        // Throttled scroll handler
        window.addEventListener('scroll', handleScroll, { passive: true });
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
    }, { passive: true });
})();
