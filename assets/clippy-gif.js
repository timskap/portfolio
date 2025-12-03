/**
 * Clippy GIF Controller
 * Shows a GIF after a delay, pauses it at a specific time, then fades it out
 */
(function() {
    'use strict';
    
    /**
     * Initialize and show the Clippy GIF
     * @param {number} showDelay - Delay in milliseconds before showing the GIF (default: 10000)
     * @param {number} pauseDelay - Delay in milliseconds before pausing the GIF (default: 7000)
     * @param {number} fadeDelay - Delay in milliseconds after pausing before fading out (default: 3000)
     */
    function initClippyGif(showDelay, pauseDelay, fadeDelay) {
        showDelay = 9500; // Default 10 seconds
        pauseDelay =  6500; // Default 7 seconds
        fadeDelay = 1500; // Default 3 seconds
        
        setTimeout(function() {
            const clippyGif = document.getElementById('clippyGif');
            const clippyImg = clippyGif ? clippyGif.querySelector('img') : null;
            
            if (clippyGif && clippyImg) {
                clippyGif.classList.add('show');
                
                let gifPaused = false;
                let lastCapturedFrame = null;
                let frameCaptureInterval = null;
                
                // Continuously capture frames to get the current frame at pause time
                function startFrameCapture() {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        // Use natural dimensions if available, otherwise use displayed size
                        const width = clippyImg.naturalWidth || clippyImg.width || 450;
                        const height = clippyImg.naturalHeight || clippyImg.height || (width * 0.75);
                        
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Capture frames continuously
                        frameCaptureInterval = setInterval(function() {
                            if (gifPaused) {
                                clearInterval(frameCaptureInterval);
                                return;
                            }
                            
                            try {
                                // Draw the current frame
                                ctx.clearRect(0, 0, width, height);
                                ctx.drawImage(clippyImg, 0, 0, width, height);
                                
                                // Store the current frame
                                lastCapturedFrame = canvas.toDataURL('image/png');
                            } catch (e) {
                                // Error capturing frame
                                console.log('Error capturing frame:', e);
                            }
                        }, 100); // Capture every 100ms
                    } catch (e) {
                        console.log('Could not start frame capture:', e);
                    }
                }
                
                // Function to pause GIF animation at current frame
                function pauseGifAnimation() {
                    if (gifPaused) return;
                    gifPaused = true;
                    
                    // Stop capturing frames
                    if (frameCaptureInterval) {
                        clearInterval(frameCaptureInterval);
                    }
                    
                    // Use the last captured frame to pause the GIF
                    if (lastCapturedFrame) {
                        try {
                            // Replace GIF src with the captured frame to pause animation
                            clippyImg.src = lastCapturedFrame;
                            // Prevent further loading/looping
                            clippyImg.onload = null;
                        } catch (e) {
                            console.log('Could not pause GIF:', e);
                        }
                    } else {
                        // Fallback: capture frame now if we don't have one
                        try {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            const width = clippyImg.naturalWidth || clippyImg.width || 450;
                            const height = clippyImg.naturalHeight || clippyImg.height || (width * 0.75);
                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(clippyImg, 0, 0, width, height);
                            clippyImg.src = canvas.toDataURL('image/png');
                            clippyImg.onload = null;
                        } catch (e) {
                            console.log('Fallback frame capture failed:', e);
                        }
                    }
                }
                
                function fadeOutGif() {
                    if (clippyGif) {
                        clippyGif.classList.add('fade-out');
                        // Remove element after fade out completes
                        setTimeout(function() {
                            if (clippyGif) {
                                clippyGif.remove();
                            }
                        }, 1000); // Match fade-out animation duration
                    }
                }
                
                // Wait for image to load, then start capturing frames
                if (clippyImg.complete) {
                    setTimeout(startFrameCapture, 100);
                } else {
                    clippyImg.addEventListener('load', function() {
                        setTimeout(startFrameCapture, 100);
                    }, { once: true });
                }
                
                // Wait for pauseDelay, then pause the GIF animation at current frame
                setTimeout(function() {
                    pauseGifAnimation();
                    
                    // Wait fadeDelay after pausing, then fade out
                    setTimeout(fadeOutGif, fadeDelay);
                }, pauseDelay);
            }
        }, showDelay);
    }
    
    // Export function to global scope
    window.initClippyGif = initClippyGif;
})();

