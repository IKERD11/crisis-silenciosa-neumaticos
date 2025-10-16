/* ====================================================
   RESPONSIVE MOBILE NAVIGATION SCRIPT - MEJORADO
   ==================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    const navContainer = document.querySelector('.nav-container');
    
    // Toggle del menú hamburguesa mejorado
    function toggleMenu() {
        if (hamburger && navMenu) {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('nav-open');
            
            // Mejorar accesibilidad
            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
        }
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        
        // Inicializar atributos de accesibilidad
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-controls', 'nav-menu');
    }
    
    if (navMenu) {
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('nav-open');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', (e) => {
        if (navContainer && !navContainer.contains(e.target) && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            hamburger.focus();
        }
    });
    
    // Manejo de resize de ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
                navMenu.setAttribute('aria-hidden', 'true');
            }
            body.classList.remove('nav-open');
        }
    });
    
    // Optimización para scroll suave en dispositivos móviles
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mejorar experiencia touch
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartY - touchEndY;
        
        // Swipe up para cerrar menú
        if (difference > swipeThreshold && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    }
    
    // Lazy loading para imágenes en dispositivos móviles
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Detección de orientación para optimizar la experiencia
    function handleOrientationChange() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Optimización de rendimiento para scroll
    let ticking = false;
    
    function updateOnScroll() {
        const header = document.querySelector('.header');
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Función para detectar el tipo de dispositivo
    function getDeviceType() {
        const width = window.innerWidth;
        if (width < 480) return 'mobile-small';
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        if (width < 1200) return 'desktop';
        return 'desktop-large';
    }
    
    // Añadir clase al body según el tipo de dispositivo
    function updateDeviceClass() {
        const deviceType = getDeviceType();
        body.className = body.className.replace(/device-\w+/g, '');
        body.classList.add(`device-${deviceType}`);
    }
    
    // Ejecutar al cargar y redimensionar
    updateDeviceClass();
    window.addEventListener('resize', updateDeviceClass);
    
    // CSS adicional para prevenir scroll cuando el menú está abierto
    const style = document.createElement('style');
    style.textContent = `
        body.nav-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
        }
        
        .header.scrolled {
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Mejoras para dispositivos táctiles */
        @media (pointer: coarse) {
            .nav-link,
            .btn,
            .hamburger {
                -webkit-tap-highlight-color: rgba(16, 185, 129, 0.3);
            }
            
            .hamburger {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                user-select: none;
            }
        }
        
        /* Mejoras para pantallas de alta densidad */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .logo,
            .logo-secondary {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        }
    `;
    document.head.appendChild(style);
});