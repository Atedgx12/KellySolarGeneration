// Kelly Solar Generation - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(248, 249, 250, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(27, 67, 50, 0.1)';
        } else {
            navbar.style.background = 'rgba(248, 249, 250, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            const requiredFields = ['schoolName', 'contactName', 'email', 'students'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field]) {
                    input.style.borderColor = '#FF6B6B';
                    isValid = false;
                } else {
                    input.style.borderColor = 'rgba(27, 67, 50, 0.1)';
                }
            });

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                document.getElementById('email').style.borderColor = '#FF6B6B';
                isValid = false;
            }

            if (isValid) {
                // Show success message
                showNotification('Thank you! We\'ll contact you soon to discuss your school\'s renewable energy journey.', 'success');
                contactForm.reset();
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }

    // Notification System
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="close-btn">&times;</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#74A892' : '#FF6B6B'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 8px 30px rgba(27, 67, 50, 0.15);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }

    // Interactive Greenhouse Diagram
    const greenhouseDiagram = document.querySelector('.greenhouse-diagram');
    if (greenhouseDiagram) {
        greenhouseDiagram.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 20px 60px rgba(27, 67, 50, 0.3)';
        });
        
        greenhouseDiagram.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 15px 50px rgba(27, 67, 50, 0.2)';
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('feature')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
                
                if (entry.target.classList.contains('solution-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, delay);
                }
                
                if (entry.target.classList.contains('chart-bar')) {
                    entry.target.style.animation = 'growUp 1.5s ease-out forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature, .solution-card, .stat-item, .curriculum-item, .chart-bar').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroStats = document.querySelector('.hero-stats');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroStats.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Floating Animation for Student Section Icons
    const curriculumSection = document.getElementById('curriculum');
    if (curriculumSection) {
        // Create floating icons
        const icons = ['🌱', '⚡', '🔬', '🤖', '🌞', '🌿', '💡', '🎨', '📊', '🧪'];
        
        for (let i = 0; i < 15; i++) {
            const icon = document.createElement('div');
            icon.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            icon.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 30 + 20}px;
                opacity: 0.1;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatAround ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            curriculumSection.appendChild(icon);
        }
    }

    // Chart Animation on Scroll
    const chartBars = document.querySelectorAll('.chart-bar');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const height = entry.target.style.height;
                entry.target.style.height = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'height 2s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.height = height;
                }, 200);
            }
        });
    });

    chartBars.forEach(bar => chartObserver.observe(bar));

    // Typewriter Effect for Hero Title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Easter Egg: Konami Code for Special Animation
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            // Special rainbow animation for student section
            const curriculum = document.getElementById('curriculum');
            if (curriculum) {
                curriculum.style.background = 'linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080)';
                curriculum.style.backgroundSize = '400% 400%';
                curriculum.style.animation = 'rainbow 3s ease infinite';
                
                showNotification('🎉 You found the secret rainbow mode! The students would love this!', 'success');
            }
        }
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes floatAround {
            0% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(0px) rotate(180deg); }
            75% { transform: translateY(-10px) rotate(270deg); }
            100% { transform: translateY(0px) rotate(360deg); }
        }
        
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-btn:hover {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(style);
});

// Tab Functionality for Curriculum Section
function showTab(tabName) {
    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');

    // Add playful bounce animation to curriculum items
    const curriculumItems = document.querySelectorAll(`#${tabName} .curriculum-item`);
    curriculumItems.forEach((item, index) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `bounceIn 0.8s ease ${index * 0.2}s both`;
        }, 50);
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization for scroll events
const optimizedScroll = debounce(function() {
    // Scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);