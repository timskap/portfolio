(function() {
    const garlandsContainer = document.getElementById('garlandsContainer');
    if (!garlandsContainer) return;

    const colors = ['red', 'green', 'blue', 'yellow', 'cyan', 'magenta', 'orange', 'white'];
    const garlands = [];
    let canvas, ctx;
    
    class Garland {
        constructor(startX, startY, endX, endY, color) {
            this.startX = startX;
            this.startY = startY;
            this.endX = endX;
            this.endY = endY;
            this.color = color;
            this.lights = [];
            
            const distance = Math.abs(endX - startX);
            // Увеличиваем расстояние между лампочками: 20 -> 30
            this.lightCount = Math.max(4, Math.floor(distance / 30));
            this.sag = Math.min(25, distance * 0.08);
            
            this.createLights();
        }
        
        getArcPoint(t) {
            const x = this.startX + (this.endX - this.startX) * t;
            const y = this.startY + this.sag * 4 * t * (1 - t);
            return { x, y };
        }
        
        createLights() {
            const fragment = document.createDocumentFragment();
            const count = this.lightCount;
            
            for (let i = 0; i < count; i++) {
                const t = i / (count - 1);
                const point = this.getArcPoint(t);
                
                const light = document.createElement('div');
                light.className = `garland-light color-${this.color} on`;
                light.style.cssText = `left:${point.x}px;top:${point.y}px;animation-delay:${i * 0.15}s`;
                
                fragment.appendChild(light);
                this.lights.push(light);
            }
            
            garlandsContainer.appendChild(fragment);
        }
        
        drawLine() {
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            
            // Меньше точек для отрисовки: 30 -> 20
            for (let i = 0; i <= 20; i++) {
                const point = this.getArcPoint(i / 20);
                if (i === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            }
            
            ctx.stroke();
        }
        
        remove() {
            this.lights.forEach(l => l.remove());
            this.lights.length = 0;
        }
    }
    
    function getSectionHeaders() {
        const headers = [];
        const scrollY = window.scrollY;
        
        document.querySelectorAll('.card-header h4').forEach(header => {
            const rect = header.getBoundingClientRect();
            headers.push({
                startX: rect.left,
                endX: rect.right,
                y: rect.top + scrollY + rect.height / 2
            });
        });
        
        return headers;
    }
    
    function createGarlands() {
        const headers = getSectionHeaders();
        if (!headers.length) return;
        
        headers.forEach(h => {
            const color = colors[Math.floor(Math.random() * colors.length)];
            garlands.push(new Garland(h.startX, h.y, h.endX, h.y, color));
        });
        
        if (ctx && canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            garlands.forEach(g => g.drawLine());
        }
    }
    
    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.className = 'garlands-canvas';
        canvas.width = window.innerWidth;
        canvas.height = document.documentElement.scrollHeight;
        ctx = canvas.getContext('2d');
        garlandsContainer.appendChild(canvas);
    }
    
    function recreate() {
        garlands.forEach(g => g.remove());
        garlands.length = 0;
        
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = document.documentElement.scrollHeight;
        }
        
        createGarlands();
    }
    
    function init() {
        initCanvas();
        setTimeout(createGarlands, 500);
        
        let timeout;
        window.addEventListener('resize', () => {
            clearTimeout(timeout);
            timeout = setTimeout(recreate, 300);
        }, { passive: true });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
