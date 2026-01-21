// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (!name || !email || !projectType || !message) {
        alert('Please fill out all fields');
        return;
    }

    // In a real application, you would send this data to your server
    console.log({
        name,
        email,
        projectType,
        message,
        submittedAt: new Date()
    });

    // Show success message
    alert('Thank you for your inquiry! We will get back to you soon.');

    // Reset form
    contactForm.reset();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and case studies
document.querySelectorAll('.service-card, .case-study, .reason').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Liquid Gradient Effect - Simplified Canvas Animation
class LiquidGradient {
    constructor() {
        this.canvas = document.getElementById('gradient-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) return;
        
        this.time = 0;
        this.parseAttributes();
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Watch for attribute changes
        this.observer = new MutationObserver(() => this.parseAttributes());
        this.observer.observe(this.canvas, { attributes: true, attributeFilter: ['data-gradient-colors', 'data-animation-speed', 'data-hue-variation', 'data-wave-opacity', 'data-wave-layers', 'data-wave-movement-speed', 'data-wave-movement-size', 'data-blob-radius', 'data-blob-radius-variation'] });
        
        this.animate();
    }
    
    parseAttributes() {
        const colorData = this.canvas.getAttribute('data-gradient-colors');
        this.gradientColors = colorData ? colorData.split('|').map(c => c.split(',').map(Number)) : [[160, 55, 70], [165, 50, 75], [170, 55, 80]];
        
        this.animationSpeed = parseFloat(this.canvas.getAttribute('data-animation-speed')) || 0.015;
        this.hueVariation = parseFloat(this.canvas.getAttribute('data-hue-variation')) || 30;
        this.waveOpacity = parseFloat(this.canvas.getAttribute('data-wave-opacity')) || 0.25;
        this.waveLayers = parseInt(this.canvas.getAttribute('data-wave-layers'), 10) || 5;
        this.waveMovementSpeed = parseFloat(this.canvas.getAttribute('data-wave-movement-speed')) || 0.8;
        this.waveMovementSize = parseFloat(this.canvas.getAttribute('data-wave-movement-size')) || 150;
        this.blobRadius = parseFloat(this.canvas.getAttribute('data-blob-radius')) || 200;
        this.blobRadiusVariation = parseFloat(this.canvas.getAttribute('data-blob-radius-variation')) || 50;
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }

    animate() {
        this.render();
        requestAnimationFrame(() => this.animate());
    }

    render() {
        const { ctx, canvas } = this;
        this.time += this.animationSpeed;
        
        // Create gradient with colors from data attribute
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        const hue1 = (Math.sin(this.time) * 0.5 + 0.5) * this.hueVariation;
        const hue2 = (Math.sin(this.time * 0.7) * 0.5 + 0.5) * this.hueVariation;
        const hue3 = (Math.sin(this.time * 0.5) * 0.5 + 0.5) * this.hueVariation;
        
        const [hue1Base, sat1, light1] = this.gradientColors[0];
        const [hue2Base, sat2, light2] = this.gradientColors[1];
        const [hue3Base, sat3, light3] = this.gradientColors[2];
        
        gradient.addColorStop(0, `hsl(${hue1Base + hue1}, ${sat1}%, ${light1}%)`);
        gradient.addColorStop(0.5, `hsl(${hue2Base + hue2}, ${sat2}%, ${light2}%)`);
        gradient.addColorStop(1, `hsl(${hue3Base + hue3}, ${sat3}%, ${light3}%)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add wave effect with circular blobs
        ctx.globalAlpha = this.waveOpacity;
        for (let i = 0; i < this.waveLayers; i++) {
            const angle = (this.time + i * 2) * this.waveMovementSpeed;
            const blobX = canvas.width / 2 + Math.sin(angle) * this.waveMovementSize;
            const blobY = canvas.height / 2 + Math.cos(angle) * this.waveMovementSize;
            const blobRadius = this.blobRadius + Math.sin(this.time * 0.5 + i) * this.blobRadiusVariation;
            
            const blobGradient = ctx.createRadialGradient(blobX, blobY, 0, blobX, blobY, blobRadius);
            blobGradient.addColorStop(0, `rgba(255, 255, 255, 0.3)`);
            blobGradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.fillStyle = blobGradient;
            ctx.beginPath();
            ctx.arc(blobX, blobY, blobRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}

window.addEventListener('load', () => {
    new LiquidGradient();
});
