(function() {
    // MIDI Player using MIDI.js library
    let isPlaying = false;

    function initMIDIPlayer() {
        if (typeof MIDI === 'undefined') {
            console.error('MIDI.js library not loaded');
            return;
        }

        // Load soundfont from CDN
        MIDI.loadPlugin({
            soundfontUrl: "https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@gh-pages/FluidR3_GM/",
            instruments: ["acoustic_grand_piano", "electric_piano_1", "acoustic_guitar_nylon", "violin"],
            onsuccess: function() {
                console.log('MIDI soundfont loaded successfully');
                playMIDI();
            },
            onerror: function(err) {
                console.error('Failed to load MIDI soundfont:', err);
            }
        });
    }

    function playMIDI() {
        // Use encodeURI to handle spaces in filename
        const midiFile = encodeURI('assets/youre only lonely L.mid');
        
        try {
            // Check if MIDI.Player is available
            if (typeof MIDI.Player !== 'undefined' && MIDI.Player.loadFile) {
                MIDI.Player.loadFile(midiFile, function() {
                    MIDI.Player.start();
                    isPlaying = true;
                    console.log('MIDI file started playing:', midiFile);
                    
                    // Loop the song when it ends
                    MIDI.Player.onEndOfFile = function() {
                        MIDI.Player.start();
                    };
                });
            } else {
                console.error('MIDI.Player not available. Trying to load player extension...');
                // Try to load player extension if available
                loadPlayerExtension(midiFile);
            }
        } catch (error) {
            console.error('Error playing MIDI:', error);
        }
    }

    function loadPlayerExtension(midiFile) {
        // Try to load MIDI.js Player extension if available
        const playerScript = document.createElement('script');
        playerScript.src = 'https://sunebear.github.io/midi.js/midi.player.js';
        playerScript.onload = function() {
            setTimeout(function() {
                if (typeof MIDI.Player !== 'undefined') {
                    MIDI.Player.loadFile(midiFile, function() {
                        MIDI.Player.start();
                        isPlaying = true;
                        MIDI.Player.onEndOfFile = function() {
                            MIDI.Player.start();
                        };
                    });
                }
            }, 200);
        };
        playerScript.onerror = function() {
            console.error('MIDI.Player extension not available. Please check if the library supports file playback.');
        };
        document.head.appendChild(playerScript);
    }

    // Load MIDI.js library from sunebear.github.io
    function loadMIDILibrary() {
        // Load the MIDI.js library
        const script = document.createElement('script');
        script.src = 'https://sunebear.github.io/midi.js/midi.js';
        script.onload = function() {
            // Small delay to ensure everything is initialized
            setTimeout(initMIDIPlayer, 200);
        };
        script.onerror = function() {
            console.error('Failed to load MIDI.js library');
        };
        document.head.appendChild(script);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadMIDILibrary);
    } else {
        loadMIDILibrary();
    }
})();

