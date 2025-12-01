(function() {
    let currentStep = 0;
    const totalSteps = 5;
    
    const modal = document.getElementById('installerModal');
    const steps = document.querySelectorAll('.installer-step');
    const backBtn = document.getElementById('installerBackBtn');
    const nextBtn = document.getElementById('installerNextBtn');
    const cancelBtn = document.getElementById('installerCancelBtn');
    const closeBtn = document.getElementById('installerCloseBtn');
    const progressText = document.getElementById('installerProgress');
    const openBtn = document.getElementById('openInstallerBtn');
    
    function updateStep(step) {
        // Убеждаемся, что step - это число
        step = parseInt(step, 10);
        if (isNaN(step) || step < 0) {
            step = 0;
        }
        if (step >= totalSteps) {
            step = totalSteps - 1;
        }
        
        // Скрываем все шаги
        steps.forEach(s => s.classList.remove('active'));
        
        // Показываем текущий шаг
        if (steps[step]) {
            steps[step].classList.add('active');
        }
        
        // Обновляем кнопки
        if (backBtn) backBtn.disabled = (step === 0);
        if (nextBtn) nextBtn.disabled = (step === totalSteps - 1);
        
        // Обновляем текст кнопки Next
        if (nextBtn) {
            if (step === totalSteps - 1) {
                nextBtn.textContent = 'Finish';
            } else {
                nextBtn.textContent = 'Next >';
            }
        }
        
        // Обновляем прогресс
        if (progressText) {
            progressText.textContent = `Step ${step + 1} of ${totalSteps}`;
        }
        
        currentStep = step;
    }
    
    function openInstaller(step = 0) {
        modal.classList.add('show');
        updateStep(step);
    }
    
    function openInstallerWithStep(step) {
        openInstaller(step);
    }
    
    function closeInstaller() {
        modal.classList.remove('show');
    }
    
    // Экспортируем функцию для использования в HTML
    window.openInstallerWithStep = openInstallerWithStep;
    
    function nextStep() {
        if (currentStep < totalSteps - 1) {
            updateStep(currentStep + 1);
        } else {
            closeInstaller();
        }
    }
    
    function prevStep() {
        if (currentStep > 0) {
            updateStep(currentStep - 1);
        }
    }
    
    // Event listeners
    if (openBtn) {
        openBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openInstaller(0);
        });
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', prevStep);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeInstaller);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeInstaller);
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeInstaller();
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeInstaller();
        }
    });
})();

