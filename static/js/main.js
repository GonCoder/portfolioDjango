// JavaScript principal para Portfolio Django

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Añadir/remover clase para background del navbar
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Auto-hide navbar en scroll down (opcional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animaciones de entrada cuando elementos entran al viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const animateElements = document.querySelectorAll('.card, .timeline-item, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Validación del formulario de contacto
    const contactForm = document.querySelector('#contactForm, form[method="post"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const nameField = this.querySelector('input[name="name"]');
            const emailField = this.querySelector('input[name="email"]');
            const subjectField = this.querySelector('input[name="subject"]');
            const messageField = this.querySelector('textarea[name="message"]');

            let isValid = true;

            // Validar nombre
            if (nameField && nameField.value.trim().length < 2) {
                showFieldError(nameField, 'El nombre debe tener al menos 2 caracteres.');
                isValid = false;
            } else if (nameField) {
                clearFieldError(nameField);
            }

            // Validar email
            if (emailField && !isValidEmail(emailField.value)) {
                showFieldError(emailField, 'Por favor, introduce un email válido.');
                isValid = false;
            } else if (emailField) {
                clearFieldError(emailField);
            }

            // Validar asunto
            if (subjectField && subjectField.value.trim().length < 3) {
                showFieldError(subjectField, 'El asunto debe tener al menos 3 caracteres.');
                isValid = false;
            } else if (subjectField) {
                clearFieldError(subjectField);
            }

            // Validar mensaje
            if (messageField && messageField.value.trim().length < 10) {
                showFieldError(messageField, 'El mensaje debe tener al menos 10 caracteres.');
                isValid = false;
            } else if (messageField) {
                clearFieldError(messageField);
            }

            if (!isValid) {
                e.preventDefault();
            } else {
                // Mostrar loading en el botón
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    submitBtn.disabled = true;
                }
            }
        });
    }

    // Función para mostrar errores de campo
    function showFieldError(field, message) {
        clearFieldError(field);
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    // Función para limpiar errores de campo
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Typing animation para el hero text (opcional)
    const heroTitle = document.querySelector('.hero-section h1 .typing-text');
    if (heroTitle) {
        const texts = ['Gonzalo', 'Junior Dev', 'Gamer', 'Aprendiz'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pausa al final
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pausa antes de empezar nueva palabra
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Iniciar la animación después de 1 segundo
        setTimeout(typeWriter, 1000);
    }

    // Contador animado para estadísticas
    function animateNumbers() {
        const numberElements = document.querySelectorAll('[data-count]');
        
        numberElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    // Lazy loading para imágenes
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary position-fixed rounded-circle';
    backToTopBtn.style.cssText = `
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTopBtn);

    // Mostrar/ocultar botón back to top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Preloader (opcional)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        });
    }

    // Dark mode toggle (opcional)
    const darkModeToggle = document.querySelector('#darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });

        // Cargar preferencia guardada
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Filtrado de proyectos (si existe la página de proyectos)
    const projectFilters = document.querySelectorAll('.project-filter');
    if (projectFilters.length > 0) {
        projectFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const category = filter.getAttribute('data-category');
                
                // Actualizar filtros activos
                projectFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Filtrar proyectos
                const projects = document.querySelectorAll('.project-card');
                projects.forEach(project => {
                    if (category === 'all' || project.getAttribute('data-category') === category) {
                        project.style.display = 'block';
                        project.classList.add('fade-in-up');
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // Formulario de newsletter (opcional)
    const newsletterForm = document.querySelector('#newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (isValidEmail(email)) {
                // Aquí podrías enviar el email a tu backend
                showNotification('¡Gracias por suscribirte!', 'success');
                newsletterForm.reset();
            } else {
                showNotification('Por favor, introduce un email válido.', 'error');
            }
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 100px; right: 20px; z-index: 1050; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
});

// CSS adicional para navbar-scrolled
const additionalCSS = `
.navbar-scrolled {
    background-color: rgba(33, 37, 41, 0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar {
    transition: all 0.3s ease;
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}
`;

// Inyectar CSS adicional
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);