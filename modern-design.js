// ========================================
// MODERN DESIGN JS - NEUMÁTICOS CRISIS
// Interactividad y Animaciones
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Calcular offset dinámicamente basado en el navbar actual y el ancho de pantalla
                const navbarHeight = navbar.offsetHeight;
                let extraOffset = 0;
                
                // Ajustar offset según el tamaño de pantalla para mantener mejor visibilidad
                if (window.innerWidth <= 640) {
                    extraOffset = 10; // Móviles pequeños
                } else if (window.innerWidth <= 968) {
                    extraOffset = 15; // Tablets
                } else {
                    extraOffset = 20; // Desktop
                }
                
                const offsetTop = target.offsetTop - navbarHeight - extraOffset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== UPDATE ACTIVE NAV LINK =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        // Calcular offset dinámicamente para mejor detección de secciones activas
        const navbarHeight = navbar.offsetHeight;
        const buffer = window.innerWidth <= 640 ? 100 : 120;
        const scrollPosition = window.scrollY + navbarHeight + buffer;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ===== ANIMATED COUNTER =====
    const statValues = document.querySelectorAll('.stat-value');
    let countersAnimated = false;
    
    function animateCounters() {
        if (countersAnimated) return;
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
        
        countersAnimated = true;
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Fade in animation
    const fadeElements = document.querySelectorAll('.stat-card, .impact-card, .solution-card, .project-card');
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Animate counters when stats section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statsObserver.observe(statsSection);
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show success message (you can implement actual form submission here)
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.25rem;
        }
    `;
    document.head.appendChild(style);
    
    // ===== LAZY LOADING IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ===== PARALLAX EFFECT =====
    const heroImage = document.querySelector('.floating-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            
            // Ajustar la tasa de desplazamiento según el tamaño de pantalla
            let rate;
            if (window.innerWidth <= 640) {
                rate = scrolled * 0.08; // Móviles: efecto muy sutil
            } else if (window.innerWidth <= 968) {
                rate = scrolled * 0.12; // Tablets: efecto moderado
            } else {
                rate = scrolled * 0.15; // Desktop: efecto suave
            }
            
            // Limitar el desplazamiento máximo para evitar que se salga del contenedor
            const maxScroll = window.innerHeight * 0.8;
            const maxDisplacement = window.innerWidth <= 640 ? 30 : 50;
            
            if (scrolled < maxScroll) {
                const displacement = Math.min(rate, maxDisplacement);
                heroImage.style.transform = `translateY(${displacement}px)`;
            } else {
                heroImage.style.transform = `translateY(${maxDisplacement}px)`;
            }
        });
    }
    
    // ===== GRADIENT ORBS ANIMATION =====
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        setInterval(() => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            
            orb.style.transition = 'transform 10s ease-in-out';
            orb.style.transform = `translate(${randomX}px, ${randomY}px) scale(${0.9 + Math.random() * 0.2})`;
        }, 10000 + index * 2000);
    });
    
    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('¡Suscripción exitosa! Gracias por unirte.', 'success');
            newsletterForm.reset();
        });
    }
    
    // ===== MOUSE CURSOR EFFECT (Optional - Modern Touch) =====
    let cursor = null;
    let cursorFollower = null;
    
    if (window.innerWidth > 768) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
            transition: transform 0.1s ease;
        `;
        
        cursorFollower = document.createElement('div');
        cursorFollower.className = 'custom-cursor-follower';
        cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(16, 185, 129, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            transition: all 0.15s ease;
        `;
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 5 + 'px';
            cursor.style.top = e.clientY - 5 + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX - 20 + 'px';
                cursorFollower.style.top = e.clientY - 20 + 'px';
            }, 50);
        });
        
        // Scale cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
    
    // ===== INITIAL PAGE LOAD ANIMATION =====
    document.body.style.opacity = '0';
    
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    console.log('🌿 Crisis Silenciosa - Página cargada correctamente');
});
