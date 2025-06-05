document.addEventListener('DOMContentLoaded', function() {
    // Inicializar elementos de revelação no scroll
    initScrollReveal();
    
    // Inicializar slider de depoimentos
    initTestimonialSlider();
    
    // Inicializar formulário de newsletter
    initNewsletterForm();
    
    // Inicializar navegação suave
    initSmoothScroll();
    
    // Inicializar animações do banner
    initBannerAnimations();
});

// Função para revelar elementos durante o scroll
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    // Função para verificar se elemento está visível na tela
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar elementos ao carregar a página
    checkReveal();
    
    // Verificar elementos ao rolar a página
    window.addEventListener('scroll', checkReveal);
}

// Função para inicializar o slider de depoimentos
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let interval;
    
    // Função para mostrar um depoimento específico
    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Função para avançar para o próximo depoimento
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }
    
    // Adicionar eventos de clique aos pontos de navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetInterval();
        });
    });
    
    // Iniciar rotação automática
    function startInterval() {
        interval = setInterval(nextTestimonial, 5000);
    }
    
    // Resetar intervalo quando o usuário interagir
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }
    
    // Mostrar o primeiro depoimento e iniciar rotação
    showTestimonial(0);
    startInterval();
}

// Função para inicializar o formulário de newsletter com validação aprimorada
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os valores dos campos
            const name = document.getElementById('name').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const interest = document.getElementById('interest').value.trim();
            
            // Validação aprimorada
            let isValid = true;
            
            if (name === '') {
                showError('name-error', 'Por favor, informe seu nome');
                isValid = false;
            } else if (name.length < 3) {
                showError('name-error', 'O nome deve ter pelo menos 3 caracteres');
                isValid = false;
            } else {
                hideError('name-error');
            }
            
            if (whatsapp === '') {
                showError('whatsapp-error', 'Por favor, informe seu WhatsApp');
                isValid = false;
            } else if (!validatePhone(whatsapp)) {
                showError('whatsapp-error', 'Por favor, informe um número de WhatsApp válido');
                isValid = false;
            } else {
                hideError('whatsapp-error');
            }
            
            if (!isValid) {
                return;
            }
            
            // Montar a mensagem para o WhatsApp
            let message = `Olá! Meu nome é ${name}. `;
            message += `Gostaria de receber novidades da Esterllu. `;
            
            if (interest) {
                message += `Tenho interesse em: ${interest}. `;
            }
            
            message += `Meu WhatsApp para contato: ${whatsapp}`;
            
            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(message);
            
            // Mostrar mensagem de sucesso com animação
            const successMessage = document.getElementById('form-success');
            successMessage.style.display = 'block';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(10px)';
            
            // Animar a mensagem de sucesso
            setTimeout(() => {
                successMessage.style.transition = 'all 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 10);
            
            // Limpar o formulário
            form.reset();
            
            // Esconder a mensagem após 3 segundos e redirecionar para o WhatsApp
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    // Redirecionar para o WhatsApp com a mensagem
                    window.open(`https://wa.me/5511954999483?text=${encodedMessage}`, '_blank');
                }, 500);
            }, 2000);
        });
        
        // Adicionar eventos de foco e desfoco para efeitos visuais
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // Função para validar número de telefone
    function validatePhone(phone) {
        // Remove caracteres não numéricos
        const numericPhone = phone.replace(/\D/g, '');
        // Verifica se tem entre 10 e 11 dígitos (com ou sem DDD)
        return numericPhone.length >= 10 && numericPhone.length <= 11;
    }
    
    // Função para mostrar mensagem de erro
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Adicionar classe de erro ao campo
        const inputElement = errorElement.previousElementSibling;
        inputElement.classList.add('error');
    }
    
    // Função para esconder mensagem de erro
    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = 'none';
        
        // Remover classe de erro do campo
        const inputElement = errorElement.previousElementSibling;
        inputElement.classList.remove('error');
    }
}

// Função para navegação suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
    return false;
}

// Expor a função para uso global
window.scrollToSection = scrollToSection;

// Função para inicializar navegação suave em todos os links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para inicializar animações do banner
function initBannerAnimations() {
    // Animar o destaque da marca
    const brandHighlight = document.querySelector('.brand-highlight');
    if (brandHighlight) {
        // Adicionar efeito de brilho sutil
        setInterval(() => {
            brandHighlight.classList.add('glow');
            setTimeout(() => {
                brandHighlight.classList.remove('glow');
            }, 1500);
        }, 5000);
    }
    
    // Animar elementos decorativos
    const luxuryElements = document.querySelectorAll('.luxury-element');
    luxuryElements.forEach((element, index) => {
        // Adicionar delay para cada elemento
        setTimeout(() => {
            element.style.opacity = '0.4';
        }, index * 300);
    });
}
