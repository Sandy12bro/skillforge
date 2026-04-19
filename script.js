// Modern Signup Page with Automatic Panel Exchange Animations

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('signupContainer');
    const welcomePanel = document.getElementById('welcomePanel');
    const signupPanel = document.getElementById('signupPanel');
    const signupForm = document.getElementById('signupForm');
    
    let isExchanged = false;
    let animationInterval;
    let isPaused = false;
    
    // Auto exchange panels every 4 seconds
    function startAutoExchange() {
        animationInterval = setInterval(() => {
            if (!isPaused) {
                exchangePanels();
            }
        }, 4000);
    }
    
    // Exchange panels function
    function exchangePanels() {
        isExchanged = !isExchanged;
        
        if (isExchanged) {
            container.classList.add('exchanged');
            welcomePanel.classList.add('exchange');
            signupPanel.classList.add('exchange');
        } else {
            container.classList.remove('exchanged');
            welcomePanel.classList.remove('exchange');
            signupPanel.classList.remove('exchange');
        }
    }
    
    // Pause animation on hover
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    container.addEventListener('mouseleave', () => {
        isPaused = false;
    });
    
    // Handle form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                age: document.getElementById('age').value,
                year: document.getElementById('year').value,
                email: document.getElementById('email').value,
                goal: document.getElementById('goal').value,
                phone: document.getElementById('phone').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                signupForm.reset();
                
                // Pause animation temporarily
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                }, 3000);
            }
        });
    }
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (!data.fullName || data.fullName.trim().length < 2) {
            errorMessage += 'Please enter a valid full name.\n';
            isValid = false;
        }
        
        if (!data.age || data.age < 16 || data.age > 100) {
            errorMessage += 'Please enter a valid age (16-100).\n';
            isValid = false;
        }
        
        if (!data.year || data.year.trim().length < 1) {
            errorMessage += 'Please enter your academic year.\n';
            isValid = false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errorMessage += 'Please enter a valid email address.\n';
            isValid = false;
        }
        
        if (!data.goal || data.goal.trim().length < 3) {
            errorMessage += 'Please enter your learning goal.\n';
            isValid = false;
        }
        
        if (!data.phone || !isValidPhone(data.phone)) {
            errorMessage += 'Please enter a valid phone number.\n';
            isValid = false;
        }
        
        if (!isValid) {
            showErrorMessage(errorMessage);
        }
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone.replace(/\s/g, '')) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // Show success message
    function showSuccessMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-check-circle"></i>
                <h3>Account Created Successfully!</h3>
                <p>Welcome to SkillForge! Your learning journey begins now.</p>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInUp 0.5s ease-out;
            backdrop-filter: blur(10px);
            text-align: center;
            max-width: 400px;
        `;
        
        const messageContent = messageDiv.querySelector('.message-content');
        messageContent.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        `;
        
        const icon = messageDiv.querySelector('i');
        icon.style.cssText = `
            font-size: 3rem;
            color: #fff;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        const heading = messageDiv.querySelector('h3');
        heading.style.cssText = `
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        `;
        
        const text = messageDiv.querySelector('p');
        text.style.cssText = `
            margin: 0;
            font-size: 1rem;
            opacity: 0.9;
        `;
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'fadeOutUp 0.5s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }, 3000);
    }
    
    // Show error message
    function showErrorMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Please fix the following:</h3>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Style the message
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95));
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInUp 0.5s ease-out;
            backdrop-filter: blur(10px);
            text-align: center;
            max-width: 400px;
        `;
        
        const messageContent = messageDiv.querySelector('.message-content');
        messageContent.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        `;
        
        const icon = messageDiv.querySelector('i');
        icon.style.cssText = `
            font-size: 3rem;
            color: #fff;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        `;
        
        const heading = messageDiv.querySelector('h3');
        heading.style.cssText = `
            margin: 0;
            font-size: 1.5rem;
            font-weight: 700;
        `;
        
        const text = messageDiv.querySelector('p');
        text.style.cssText = `
            margin: 0;
            font-size: 0.9rem;
            opacity: 0.9;
            white-space: pre-line;
        `;
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'fadeOutUp 0.5s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 500);
        }, 5000);
    }
    
    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translate(-50%, -40%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
        
        @keyframes fadeOutUp {
            from {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Start the automatic animation
    startAutoExchange();
    
    // Initial animation
    setTimeout(() => {
        exchangePanels();
    }, 1000);
});
