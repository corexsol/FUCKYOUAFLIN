// Sarcastic birthday wishes with Uncle Ali references
const sarcasticWishes = [
    "🎮 I wish I become as good as my uncle Ali on Hearthstone... oh wait, that's impossible! 😏",
    "🎯 I wish I become like my uncle Ali... but let's be realistic here! 🤣",
    "😎 I wish I become as cool as my uncle Ali... in my dreams maybe! 😂",
    "💥 May your power level be over 9000... unlike your cooking skills! 🍳",
    "🐉 Hope you collect all 7 Dragon Balls... you'll need them to fix your life! 😈",
    "⚡ May you go Super Saiyan... because normal you needs an upgrade! 💪",
    "🍜 Wishing you Goku's appetite... oh wait, you already have that! 🐷",
    "👑 May you be as strong as Vegeta's ego... that's pretty strong! 💪",
    "🎮 Hope your birthday is better than your last gaming session! 🎯",
    "🥊 May you finally learn to dodge... in real life, not just anime! 🤺",
    "🎂 Another year older, another year closer to being as wise as Master Roshi... good luck! 👴",
    "🌟 May your birthday wishes come true... unlike your New Year's resolutions! 📅",
    "🎈 Hope you age like fine wine... not like milk left in the sun! 🧀",
    "🎊 May you have the determination of Goku... to finish your chores! 🧹",
    "✨ Wishing you the wisdom of Piccolo... to finally understand basic instructions! 📖"
];

// Dragon Ball collection tracking
let collectedBalls = new Set();
let kiEnergyInterval;

// Initialize ki energy particles
function initKiEnergy() {
    kiEnergyInterval = setInterval(createKiParticle, 300);
}

// Create floating ki energy particles
function createKiParticle() {
    const kiContainer = document.getElementById('kiEnergy');
    const particle = document.createElement('div');
    particle.className = 'ki-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    kiContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (kiContainer.contains(particle)) {
            kiContainer.removeChild(particle);
        }
    }, 6000);
}

// Collect Dragon Ball
function collectDragonBall(ball) {
    const stars = ball.getAttribute('data-stars');
    
    if (!collectedBalls.has(stars)) {
        collectedBalls.add(stars);
        ball.classList.add('collected');
        
        // Create collection effect
        createCollectionEffect(ball);
        
        // Update collection status
        updateCollectionStatus();
        
        // Check if all balls collected
        if (collectedBalls.size === 7) {
            summonShenron();
        }
        
        // Update power level
        updatePowerLevel();
    }
}

// Create collection effect
function createCollectionEffect(ball) {
    const rect = ball.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create energy burst
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.backgroundColor = '#FFD700';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        particle.style.boxShadow = '0 0 10px #FFD700';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80 + Math.random() * 40;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
}

// Update collection status
function updateCollectionStatus() {
    const collectedCount = document.getElementById('collectedCount');
    collectedCount.textContent = collectedBalls.size;
    
    if (collectedBalls.size > 0) {
        collectedCount.style.color = '#FFD700';
        collectedCount.style.textShadow = '0 0 10px #FFD700';
    }
}

// Update power level
function updatePowerLevel() {
    const powerLevel = document.getElementById('powerLevel');
    const newLevel = 9001 + (collectedBalls.size * 1000);
    powerLevel.textContent = newLevel.toLocaleString();
    
    // Animate power level increase
    powerLevel.style.animation = 'none';
    setTimeout(() => {
        powerLevel.style.animation = 'powerLevelFlicker 0.5s ease-in-out 3';
    }, 10);
}

// Summon Shenron
function summonShenron() {
    const shenronContainer = document.getElementById('shenronContainer');
    const shenron = shenronContainer.querySelector('.shenron');
    const shenronText = shenronContainer.querySelector('.shenron-text');
    
    // Show Shenron
    shenron.classList.remove('hidden');
    shenronText.classList.remove('hidden');
    
    // Create dramatic effect
    createShenronEffect();
    
    // Hide after 5 seconds and reset
    setTimeout(() => {
        shenron.classList.add('hidden');
        shenronText.classList.add('hidden');
        resetDragonBalls();
    }, 5000);
}

// Create Shenron summoning effect
function createShenronEffect() {
    // Screen flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = '#FFD700';
    flash.style.opacity = '0';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '999';
    
    document.body.appendChild(flash);
    
    flash.animate([
        { opacity: 0 },
        { opacity: 0.8 },
        { opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-in-out'
    }).onfinish = () => {
        document.body.removeChild(flash);
    };
}

// Reset Dragon Balls
function resetDragonBalls() {
    collectedBalls.clear();
    const balls = document.querySelectorAll('.dragon-ball');
    balls.forEach(ball => {
        ball.classList.remove('collected');
    });
    updateCollectionStatus();
    updatePowerLevel();
}

// Generate sarcastic wish
function generateSarcasticWish() {
    const wishDisplay = document.getElementById('wishDisplay');
    const randomWish = sarcasticWishes[Math.floor(Math.random() * sarcasticWishes.length)];
    
    // Animate text change
    wishDisplay.style.opacity = '0';
    wishDisplay.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        wishDisplay.textContent = randomWish;
        wishDisplay.style.opacity = '1';
        wishDisplay.style.transform = 'translateY(0)';
        
        // Add glow effect
        wishDisplay.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
        setTimeout(() => {
            wishDisplay.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.2)';
        }, 1000);
    }, 200);
}

// Trigger Kamehameha wave
function triggerKamehameha() {
    const wave = document.createElement('div');
    wave.className = 'kamehameha-wave';
    document.body.appendChild(wave);
    
    // Create multiple energy rings
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createEnergyRing();
        }, i * 200);
    }
    
    // Remove wave after animation
    setTimeout(() => {
        document.body.removeChild(wave);
    }, 2000);
}

// Create energy ring effect
function createEnergyRing() {
    const ring = document.createElement('div');
    ring.style.position = 'fixed';
    ring.style.top = '50%';
    ring.style.left = '50%';
    ring.style.width = '50px';
    ring.style.height = '50px';
    ring.style.border = '3px solid #4169E1';
    ring.style.borderRadius = '50%';
    ring.style.transform = 'translate(-50%, -50%)';
    ring.style.pointerEvents = 'none';
    ring.style.zIndex = '1001';
    ring.style.boxShadow = '0 0 20px #4169E1';
    
    document.body.appendChild(ring);
    
    ring.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(10)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => {
        document.body.removeChild(ring);
    };
}

// Trigger Ki blast
function triggerKiBlast() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createKiBlast();
        }, i * 100);
    }
}

// Create Ki blast effect
function createKiBlast() {
    const blast = document.createElement('div');
    blast.className = 'ki-blast';
    blast.style.left = (Math.random() * window.innerWidth) + 'px';
    blast.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(blast);
    
    // Remove blast after animation
    setTimeout(() => {
        if (document.body.contains(blast)) {
            document.body.removeChild(blast);
        }
    }, 1000);
}

// Auto-trigger effects on page load
window.addEventListener('load', () => {
    // Start ki energy particles
    initKiEnergy();
    
    // Auto-trigger initial effects
    setTimeout(() => {
        triggerKiBlast();
    }, 2000);
    
    // Update power level display
    updatePowerLevel();
});

// Add sparkle effect to title on hover
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.main-title');
    title.addEventListener('mouseenter', () => {
        createTitleSparkles(title);
    });
});

// Create sparkle effect for title
function createTitleSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.backgroundColor = '#FFD700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.boxShadow = '0 0 10px #FFD700';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1) rotate(180deg)', opacity: 1 },
            { transform: 'scale(0) rotate(360deg)', opacity: 0 }
        ], {
            duration: 1200,
            delay: i * 80,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(sparkle);
        };
    }
}

