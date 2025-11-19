
        // Menu mobile
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Carrousel principal
        let currentSlide = 0;
        const slides = document.querySelectorAll('#carousel > div');
        const indicators = document.querySelectorAll('.carousel-indicator');
        const totalSlides = slides.length;

        function showSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            const carousel = document.getElementById('carousel');
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Mettre à jour les indicateurs
            indicators.forEach((indicator, i) => {
                if (i === currentSlide) {
                    indicator.classList.remove('bg-opacity-50');
                    indicator.classList.add('bg-opacity-100');
                } else {
                    indicator.classList.remove('bg-opacity-100');
                    indicator.classList.add('bg-opacity-50');
                }
            });
        }

        document.getElementById('prev').addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        document.getElementById('next').addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Ajouter des écouteurs d'événements aux indicateurs
        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                showSlide(i);
            });
        });

        // Carrousel automatique
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);

        // Carrousel des témoignages
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('#testimonials > div');
        const totalTestimonials = testimonials.length;

        function showTestimonial(index) {
            if (index < 0) {
                currentTestimonial = totalTestimonials - 1;
            } else if (index >= totalTestimonials) {
                currentTestimonial = 0;
            } else {
                currentTestimonial = index;
            }
            
            const testimonialCarousel = document.getElementById('testimonials');
            testimonialCarousel.style.transform = `translateX(-${currentTestimonial * 100}%)`;
        }

        document.getElementById('testimonial-prev').addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });

        document.getElementById('testimonial-next').addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });

        // Navigation fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile si ouvert
                    const mobileMenu = document.getElementById('mobile-menu');
                    mobileMenu.classList.add('hidden');
                }
            });
        });

          let isChatbotOpen = false;

        function toggleChatbot() {
            const chatbotWindow = document.getElementById('chatbotWindow');
            isChatbotOpen = !isChatbotOpen;
            chatbotWindow.style.display = isChatbotOpen ? 'flex' : 'none';
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function sendMessage() {
            const userInput = document.getElementById('userInput');
            const messagesContainer = document.getElementById('chatbotMessages');
            const message = userInput.value.trim();

            if (message === '') return;

            // Ajouter le message de l'utilisateur
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.textContent = message;
            messagesContainer.appendChild(userMessage);

            // Réponse automatique simple (à améliorer)
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.className = 'message bot-message';
                
                // Réponses prédéfinies basiques
                const responses = {
                    'bonjour': 'Bonjour ! Comment puis-je vous aider ?',
                    'prix': 'Pour connaître nos tarifs, veuillez nous contacter par téléphone ou email.',
                    'service': 'Nous proposons des services de maintenance préventive pour supermarchés.',
                    'contact': 'Vous pouvez nous joindre au +243 858 444 000 ou par email.',
                    'default': 'Je comprends votre demande. Un de nos conseillers vous répondra rapidement.'
                };

                const lowerMessage = message.toLowerCase();
                let response = responses.default;

                for (const [key, value] of Object.entries(responses)) {
                    if (lowerMessage.includes(key)) {
                        response = value;
                        break;
                    }
                }

                botMessage.textContent = response;
                messagesContainer.appendChild(botMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);

            userInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    