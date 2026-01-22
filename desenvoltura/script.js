// === PALCO DIGITAL - JAVASCRIPT COMPLETO ===

document.addEventListener('DOMContentLoaded', function() {
    // === NAVEGAÇÃO SUAVE ===
    initSmoothScrolling();
    
    // === NAVBAR TRANSPARENTE ===
    initNavbarTransparency();
    
    // === ANIMAÇÕES DE SCROLL ===
    initScrollAnimations();
    
    // === CONTADOR ANIMADO ===
    initCounterAnimation();
    
    // === EFEITOS INTERATIVOS ===
    initInteractiveEffects();
    
    // === LOADING ANIMATIONS ===
    initLoadingAnimations();
});

// === NAVEGAÇÃO SUAVE ===
function initSmoothScrolling() {
    // Smooth scroll para links da navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === NAVBAR TRANSPARENTE ===
function initNavbarTransparency() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Executar uma vez no carregamento
}

// === ANIMAÇÕES DE SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Adicionar classe fade-in aos elementos que devem animar
    const elementsToAnimate = [
        '.service-card',
        '.team-card',
        '.feature-item',
        '.stat-item',
        '.hero-content'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });
}

// === CONTADOR ANIMADO ===
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (counter.textContent.includes('%') ? '%' : '+');
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// === EFEITOS INTERATIVOS ===
function initInteractiveEffects() {
    // Efeito parallax suave nos elementos hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    // Efeito hover nos cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de ripple nos botões
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // CSS para animação de ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// === ANIMAÇÕES DE CARREGAMENTO ===
function initLoadingAnimations() {
    // Adicionar animação de entrada para elementos principais
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 1s ease-out';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// === UTILITY FUNCTIONS ===

// Função para detectar se o usuário está em dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para throttle de eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Aplicar throttle no scroll para melhor performance
window.addEventListener('scroll', throttle(() => {
    // Código de scroll aqui já é otimizado
}, 16));

// === EASTER EGGS E EFEITOS ESPECIAIS ===

// Efeito de partículas no background (sutil)
function createParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero || isMobile()) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(254, 199, 47, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
}

// Inicializar partículas após um delay
setTimeout(createParticles, 2000);

// === ANALYTICS E TRACKING ===
function trackUserInteraction(action, element) {
    // Placeholder para analytics
    console.log(`User interaction: ${action} on ${element}`);
    
    // Aqui você pode adicionar Google Analytics, Facebook Pixel, etc.
    // gtag('event', action, {
    //     'event_category': 'engagement',
    //     'event_label': element
    // });
}

// Rastrear cliques em elementos importantes
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackUserInteraction('cta_click', 'primary_button');
    }
    
    if (e.target.matches('.service-card')) {
        trackUserInteraction('service_click', e.target.querySelector('h4')?.textContent || 'service_card');
    }
});

// === PERFORMANCE MONITORING ===
window.addEventListener('load', function() {
    // Medir tempo de carregamento
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
    
    // Otimizar imagens lazy loading se necessário
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', function(e) {
    // Esc para fechar modais (se houver)
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            // Bootstrap modal close
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
});

// === ACCESSIBILITY IMPROVEMENTS ===
document.addEventListener('focus', function(e) {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = '2px solid #fec72f';
        e.target.style.outlineOffset = '2px';
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
}, true);