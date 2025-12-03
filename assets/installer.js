(function() {
    let currentStep = 0;
    const totalSteps = 7;
    
    const modal = document.getElementById('installerModal');
    const steps = document.querySelectorAll('.installer-step');
    const backBtn = document.getElementById('installerBackBtn');
    const nextBtn = document.getElementById('installerNextBtn');
    const cancelBtn = document.getElementById('installerCancelBtn');
    const closeBtn = document.getElementById('installerCloseBtn');
    const reinstallBtn = document.getElementById('installerReinstallBtn');
    const progressText = document.getElementById('installerProgress');
    const openBtn = document.getElementById('openInstallerBtn');
    const progressBar = document.getElementById('progressBar');
    const installationProgress = document.getElementById('installationProgress');
    const installationComplete = document.getElementById('installationComplete');
    const installerBody = document.querySelector('.installer-body');
    let isInstalling = false;
    let animationFrameId = null;
    let progressAudio = null;
    let audioPreloaded = false;
    
    // Preload audio on first user interaction to satisfy browser autoplay policy
    function preloadSuccessSound() {
        if (audioPreloaded) return;
        try {
            progressAudio = new Audio('assets/tada-meme.mp3');
            progressAudio.volume = 0.5;
            progressAudio.load(); // Preload the audio
            audioPreloaded = true;
        } catch (error) {
            console.log('Error preloading success sound:', error);
        }
    }
    
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
        // Кнопка Next/Finish всегда активна, чтобы можно было закрыть на последней странице
        if (nextBtn) nextBtn.disabled = false;
        
        // Обновляем текст кнопки Next (кроме страниц 6 и 7, где логика отдельная)
        if (nextBtn && step !== 5 && step !== 6) {
            if (step === totalSteps - 1) {
                // Use translation if available
                if (window.translations && window.currentLang && window.translations[window.currentLang] && window.translations[window.currentLang]['installer.finish']) {
                    nextBtn.textContent = window.translations[window.currentLang]['installer.finish'];
                } else {
                    nextBtn.textContent = 'Finish';
                }
            } else {
                // Use translation if available
                if (window.translations && window.currentLang && window.translations[window.currentLang] && window.translations[window.currentLang]['installer.next']) {
                    nextBtn.textContent = window.translations[window.currentLang]['installer.next'];
                } else {
                    nextBtn.textContent = 'Next >';
                }
            }
        }
        
        // Управление кнопками на разных страницах
        if (step === 5) {
            // Страница 6: Установка - только Cancel
            if (cancelBtn) cancelBtn.style.display = 'inline-block';
            if (backBtn) backBtn.disabled = true;
            if (nextBtn) nextBtn.disabled = true;
            if (reinstallBtn) reinstallBtn.style.display = 'none';
            
            // Запускаем установку, если еще не запущена
            if (!isInstalling) {
                startInstallation();
            }
        } else if (step === 6) {
            // Страница 7: Завершение - Finish и Reinstall
            if (cancelBtn) cancelBtn.style.display = 'none';
            if (backBtn) backBtn.disabled = true;
            if (nextBtn) {
                nextBtn.disabled = false;
                // Use translation if available
                if (window.translations && window.currentLang && window.translations[window.currentLang] && window.translations[window.currentLang]['installer.finish']) {
                    nextBtn.textContent = window.translations[window.currentLang]['installer.finish'];
                } else {
                    nextBtn.textContent = 'Finish';
                }
            }
            if (reinstallBtn) reinstallBtn.style.display = 'inline-block';
        } else {
            // Обычные страницы
            if (cancelBtn) cancelBtn.style.display = 'inline-block';
            if (reinstallBtn) reinstallBtn.style.display = 'none';
            
            // Сбрасываем состояние установки на других страницах
            if (installerBody) installerBody.classList.remove('installer-installing');
            isInstalling = false;
        }
        
        // Обновляем прогресс
        if (progressText) {
            // Use translation function if available, otherwise default to English
            if (window.updateStepCounterTranslation) {
                window.updateStepCounterTranslation(step + 1, totalSteps);
            } else {
                progressText.textContent = `Step ${step + 1} of ${totalSteps}`;
            }
        }
        
        currentStep = step;
    }
    
    function startInstallation() {
        if (isInstalling) return;
        isInstalling = true;
        
        // Блокируем интерфейс
        if (installerBody) installerBody.classList.add('installer-installing');
        if (backBtn) backBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        
        // Показываем прогресс-бар
        if (installationProgress) installationProgress.style.display = 'block';
    //    if (installationComplete) installationComplete.style.display = 'none';
        
        // Сбрасываем прогресс-бар
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', '0');
        }
        
        // Анимация прогресс-бара за 7 секунд
        const duration = 4500; // 7 секунд
        const startTime = Date.now();
        
        function updateProgress() {
            // Проверяем, не была ли установка отменена
            if (!isInstalling) {
                return;
            }
            
            const elapsed = Date.now() - startTime;
            const progress = Math.min(100, (elapsed / duration) * 100);
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
                progressBar.setAttribute('aria-valuenow', progress);
            }
            
            if (progress < 100 && isInstalling) {
                animationFrameId = requestAnimationFrame(updateProgress);
            } else if (isInstalling) {
                // Установка завершена
                finishInstallation();
            }
        }
        
        animationFrameId = requestAnimationFrame(updateProgress);
    }
    
    function cancelInstallation() {
        isInstalling = false;
        
        // Отменяем анимацию
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        // Разблокируем интерфейс
        if (installerBody) installerBody.classList.remove('installer-installing');
        
        // Сбрасываем прогресс-бар
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', '0');
        }
    }
    
    function finishInstallation() {
        isInstalling = false;
        
        // Разблокируем интерфейс
     //   if (installerBody) installerBody.classList.remove('installer-installing');
        
        // Воспроизводим звук успеха
        playSuccessSound();
        
        // Переходим на страницу 7 (завершение)
        updateStep(6);
    }
    
    function playSuccessSound() {
        try {
            // If audio wasn't preloaded, create it now
            if (!progressAudio) {
                progressAudio = new Audio('assets/tada-meme.mp3');
                progressAudio.volume = 0.5;
            }
            
            // Reset and play
            progressAudio.currentTime = 0;
            const playPromise = progressAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(err => {
                    console.log('Could not play success sound (autoplay blocked):', err);
                });
            }
        } catch (error) {
            console.log('Error playing success sound:', error);
        }
    }
    
    function reinstall() {
        // Сбрасываем состояние установки
        isInstalling = false;
        if (installerBody) installerBody.classList.remove('installer-installing');
        
        // Сбрасываем прогресс-бар
        if (progressBar) {
            progressBar.style.width = '0%';
            progressBar.setAttribute('aria-valuenow', '0');
        }
        
        // Возвращаемся на первую страницу
        updateStep(0);
    }
    
    function openInstaller(step = 0) {
        // Preload audio on user interaction (opening installer)
        preloadSuccessSound();
        modal.classList.add('show');
        updateStep(step);
    }
    
    function openInstallerWithStep(step) {
        openInstaller(step);
    }
    
    function closeInstaller() {
        // Отменяем установку, если она идет
        if (isInstalling) {
            cancelInstallation();
        }
        
        modal.classList.remove('show');
    }
    
    // Экспортируем функцию для использования в HTML
    window.openInstallerWithStep = openInstallerWithStep;
    
    function nextStep() {
        if (isInstalling) return; // Блокируем нажатия во время установки
        
        // Preload audio before installation step (step 4 -> 5)
        if (currentStep === 4) {
            preloadSuccessSound();
        }
        
        if (currentStep < totalSteps - 1) {
            updateStep(currentStep + 1);
        } else {
            // На последней странице (7) Finish закрывает окно
            closeInstaller();
        }
    }
    
    function prevStep() {
        if (isInstalling) return; // Блокируем нажатия во время установки
        
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
        cancelBtn.addEventListener('click', function() {
            // Если идет установка, отменяем её
            if (isInstalling) {
                cancelInstallation();
                // Возвращаемся на предыдущую страницу или закрываем
                if (currentStep > 0) {
                    updateStep(currentStep - 1);
                } else {
                    closeInstaller();
                }
            } else {
                closeInstaller();
            }
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeInstaller);
    }
    
    if (reinstallBtn) {
        reinstallBtn.addEventListener('click', reinstall);
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

