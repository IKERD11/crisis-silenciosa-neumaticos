// Responsive Mobile Menu Handler
document.addEventListener('DOMContentLoaded', function() {
    // Crear elementos del menú móvil si no existen
    const navbar = document.querySelector('.navbar');
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar || !navContainer) return;
    
    // Crear botón hamburguesa si no existe
    let hamburger = document.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        navContainer.appendChild(hamburger);
    }
    
    // Manejar clic en hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.classList.toggle('menu-open');
    });
    
    // Cerrar menú al hacer clic en enlaces
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContainer.contains(event.target);
        if (!isClickInsideNav && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Cerrar menú al cambiar el tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1199) {
            hamburger.classList.remove('active');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            document.body.classList.remove('menu-open');
        }
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
            document.body.classList.remove('menu-open');
        }
    }
    
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
    
    // Lazy loading para imágenes en dispositivos móviles
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
    
    // Detección de orientación para optimizar la experiencia
    function handleOrientationChange() {
        // Forzar repaint después de cambio de orientación
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
});

// CSS adicional para prevenir scroll cuando el menú está abierto
const style = document.createElement('style');
style.textContent = `
    body.menu-open {
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