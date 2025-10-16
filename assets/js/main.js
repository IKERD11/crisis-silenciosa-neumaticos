document.addEventListener('DOMContentLoaded', function () {
    // Manejo del menú hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Manejo de las pestañas en la sección de soluciones
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Desactivar todos los botones y paneles
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Activar el botón y panel seleccionados
                button.classList.add('active');
                const targetPanel = document.getElementById(button.dataset.tab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Animación de contador para las estadísticas
    const counters = document.querySelectorAll('.stat-number-modern');
    
    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        if (isNaN(target)) return;

        let currentCount = 0;
        const duration = 2000; // 2 segundos
        const stepTime = 20; // ms
        const steps = duration / stepTime;
        const increment = target / steps;

        const updateCount = () => {
            currentCount += increment;
            if (currentCount < target) {
                counter.innerText = `${Math.ceil(currentCount)}`;
                setTimeout(updateCount, stepTime);
            } else {
                counter.innerText = `${target}`;
            }
        };
        updateCount();
    };

    // Intersection Observer para animar elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stat-number-modern')) {
                    animateCounter(entry.target);
                }
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    const elementsToAnimate = document.querySelectorAll('.hidden');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    counters.forEach(counter => {
        // Añadir la clase hidden para que el observer lo detecte
        counter.classList.add('hidden');
        observer.observe(counter);
    });


    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Cierra el menú si está abierto en móvil
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });
});
