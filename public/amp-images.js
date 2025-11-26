// Enhanced Amplifier Image Animations
// Adds interactive visual effects to amp placeholders

document.addEventListener('DOMContentLoaded', function() {
    // Add interactive glow effect to guitar amps
    const guitarAmps = document.querySelectorAll('.guitar-amp');
    guitarAmps.forEach(amp => {
        amp.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.5)';
            this.style.transition = 'box-shadow 0.3s ease';
        });

        amp.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add pulse effect to bass amps LED
    const bassAmps = document.querySelectorAll('.bass-amp');
    bassAmps.forEach(amp => {
        amp.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(0, 191, 255, 0.5)';
            this.style.transition = 'box-shadow 0.3s ease';
        });

        amp.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add speaker movement simulation to combo amps
    const comboAmps = document.querySelectorAll('.combo-amp');
    comboAmps.forEach(amp => {
        amp.addEventListener('mouseenter', function() {
            const speaker = this.querySelector('::before');
            this.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.6)';
            this.style.transition = 'box-shadow 0.3s ease';
        });

        amp.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add subtle vibration effect to cabinets
    const cabinets = document.querySelectorAll('.cabinet');
    cabinets.forEach(cabinet => {
        cabinet.addEventListener('mouseenter', function() {
            this.style.animation = 'subtle-shake 0.5s ease';
        });

        cabinet.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Create dynamic reflections
    createReflections();

    // Add knob rotation on hover (visual only)
    addKnobInteraction();
});

function createReflections() {
    const allAmps = document.querySelectorAll('.placeholder-image');

    allAmps.forEach(amp => {
        // Create subtle light reflection effect
        const reflection = document.createElement('div');
        reflection.style.position = 'absolute';
        reflection.style.top = '0';
        reflection.style.left = '-100%';
        reflection.style.width = '50%';
        reflection.style.height = '100%';
        reflection.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)';
        reflection.style.transform = 'skewX(-20deg)';
        reflection.style.transition = 'left 0.6s ease';
        reflection.style.pointerEvents = 'none';
        reflection.style.zIndex = '10';

        amp.appendChild(reflection);

        amp.addEventListener('mouseenter', function() {
            reflection.style.left = '150%';
        });

        amp.addEventListener('mouseleave', function() {
            setTimeout(() => {
                reflection.style.transition = 'none';
                reflection.style.left = '-100%';
                setTimeout(() => {
                    reflection.style.transition = 'left 0.6s ease';
                }, 50);
            }, 600);
        });
    });
}

function addKnobInteraction() {
    // This would add visual feedback to knobs if they were separate elements
    // For now, adds a subtle highlight effect

    const productCards = document.querySelectorAll('.product-card, .product-card-detailed');

    productCards.forEach(card => {
        const image = card.querySelector('.placeholder-image');

        if (image && image.classList.contains('guitar-amp')) {
            card.addEventListener('click', function() {
                // Add a brief flash effect
                image.style.filter = 'brightness(1.2)';
                setTimeout(() => {
                    image.style.filter = 'brightness(1)';
                }, 200);
            });
        }
    });
}

// Add CSS animation for cabinet shake
const style = document.createElement('style');
style.textContent = `
    @keyframes subtle-shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }

    /* Additional realistic details */
    .guitar-amp {
        box-shadow: inset 0 -5px 15px rgba(0, 0, 0, 0.3);
    }

    .bass-amp {
        box-shadow: inset 0 -3px 10px rgba(0, 0, 0, 0.4);
    }

    .combo-amp {
        box-shadow:
            inset 0 5px 15px rgba(255, 255, 255, 0.1),
            inset 0 -5px 15px rgba(0, 0, 0, 0.5);
    }

    .cabinet {
        box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.5),
            inset 0 -8px 20px rgba(0, 0, 0, 0.6);
    }

    /* Add wood grain texture to combo amps */
    .combo-amp::before {
        background-image:
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.05) 2px,
                rgba(0, 0, 0, 0.05) 4px
            ),
            radial-gradient(circle at center, #D4AF37 0%, #8B7355 30%, #5D4A3A 100%);
    }

    /* Add chrome trim to guitar amps */
    .guitar-amp::after {
        text-shadow:
            0 0 10px rgba(255, 107, 53, 0.8),
            0 0 20px rgba(255, 107, 53, 0.5),
            1px 1px 2px rgba(0, 0, 0, 0.8);
    }

    /* Rack ears for bass amp */
    .bass-amp::before {
        border-left: 15px solid #333;
        border-right: 15px solid #333;
    }

    /* Speaker dust cap detail */
    .combo-amp::after {
        border: 2px solid rgba(0, 0, 0, 0.4);
    }
`;

document.head.appendChild(style);

console.log('Amplifier image enhancements loaded');
