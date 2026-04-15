/* =========================================================================
   ROHAN MISHRA - PORTFOLIO INTERACTIONS
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       0. THEME TOGGLE (Light / Dark)
       ========================================================================= */
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    // Read saved preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        if (theme === 'light') {
            html.classList.remove('dark-theme');
            html.classList.add('light-theme');
            html.setAttribute('data-theme', 'light');
        } else {
            html.classList.remove('light-theme');
            html.classList.add('dark-theme');
            html.setAttribute('data-theme', 'dark');
        }
        // Update icons
        const iconClass = theme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
        if (themeIcon) themeIcon.className = iconClass;
        if (themeIconMobile) themeIconMobile.className = iconClass;
        localStorage.setItem('portfolio-theme', theme);
    }

    function toggleTheme() {
        const current = html.getAttribute('data-theme') || 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    /* =========================================================================
       1. CUSTOM CURSOR
       ========================================================================= */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const magneticElements = document.querySelectorAll('.hover-magnetic, a, button, input, textarea');

    // Update cursor position
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Using transform for better performance
        cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
        
        // Slight delay for the outline for a smooth trailing effect
        cursorOutline.animate({
            transform: `translate(${posX}px, ${posY}px)`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect for interactive elements
    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover-active');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover-active');
        });
    });

    /* =========================================================================
       2. NAVIGATION MENU (MOBILE)
       ========================================================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if(menuToggle && closeMenu && mobileMenuOverlay) {
        menuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('active');
            });
        });
    }

    /* =========================================================================
       3. TYPEWRITER EFFECT
       ========================================================================= */
    const typedTextSpan = document.getElementById("typewriter");
    const textArray = [
        "Full Stack Developer", 
        "Cloud & AI Enthusiast", 
        "Creative Problem Solver"
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if(!typedTextSpan) return;
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if(!typedTextSpan) return;
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    /* =========================================================================
       4. COMMAND PALETTE (Ctrl + K)
       ========================================================================= */
    const cmdOverlay = document.getElementById('cmd-palette-overlay');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
    
    // Available commands
    const commands = [
        { name: "Go to Home", icon: "bx-home", action: () => window.location.hash = "#home" },
        { name: "Go to About", icon: "bx-user", action: () => window.location.hash = "#about" },
        { name: "Go to Skills", icon: "bx-code-alt", action: () => window.location.hash = "#skills" },
        { name: "Go to Projects", icon: "bx-folder", action: () => window.location.hash = "#projects" },
        { name: "Go to Certifications", icon: "bx-certification", action: () => window.location.hash = "#certifications" },
        { name: "Contact Me", icon: "bx-envelope", action: () => window.location.hash = "#contact" },
        { name: "View Resume", icon: "bx-file", action: () => window.open("https://drive.google.com/file/d/1mZTFK3D_PKr-zVcu6x0IeoaDRMqlbcID/view?usp=drive_link", "_blank") },
        { name: "Visit GitHub", icon: "bxl-github", action: () => window.open("https://github.com/rohan1275", "_blank") },
        { name: "Visit LinkedIn", icon: "bxl-linkedin", action: () => window.open("https://www.linkedin.com/in/rohanmishra12", "_blank") }
    ];

    let selectedCmdIndex = 0;

    function renderCommands(filter = "") {
        if(!cmdResults) return;
        cmdResults.innerHTML = "";
        
        const filteredCmds = commands.filter(cmd => 
            cmd.name.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredCmds.length === 0) {
            cmdResults.innerHTML = `<div class="cmd-item" style="color:var(--text-muted)">No commands found</div>`;
            return;
        }

        filteredCmds.forEach((cmd, index) => {
            const cmdEl = document.createElement('div');
            cmdEl.className = `cmd-item ${index === selectedCmdIndex ? 'selected' : ''}`;
            cmdEl.innerHTML = `<i class='bx ${cmd.icon}'></i> <span>${cmd.name}</span>`;
            
            cmdEl.addEventListener('click', () => {
                cmd.action();
                closeCommandPalette();
            });
            
            cmdEl.addEventListener('mouseenter', () => {
                // Update selection visually
                document.querySelectorAll('.cmd-item').forEach(el => el.classList.remove('selected'));
                cmdEl.classList.add('selected');
                selectedCmdIndex = index;
            });

            cmdResults.appendChild(cmdEl);
        });
    }

    function openCommandPalette() {
        if(!cmdOverlay) return;
        cmdOverlay.classList.add('active');
        cmdInput.value = "";
        selectedCmdIndex = 0;
        renderCommands();
        cmdInput.focus();
        document.body.style.overflow = "hidden";
    }

    function closeCommandPalette() {
        if(!cmdOverlay) return;
        cmdOverlay.classList.remove('active');
        document.body.style.overflow = "";
    }

    if(cmdOverlay) {
        // Toggle via Ctrl+K or Cmd+K
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                cmdOverlay.classList.contains('active') ? closeCommandPalette() : openCommandPalette();
            }
            if (e.key === 'Escape' && cmdOverlay.classList.contains('active')) {
                closeCommandPalette();
            }
        });

        // Close on clicking overlay background
        cmdOverlay.addEventListener('click', (e) => {
            if (e.target === cmdOverlay) closeCommandPalette();
        });

        // Search filtering
        if(cmdInput) {
            cmdInput.addEventListener('input', (e) => {
                selectedCmdIndex = 0;
                renderCommands(e.target.value);
            });

            // Keyboard navigation
            cmdInput.addEventListener('keydown', (e) => {
                const currentFiltered = commands.filter(cmd => 
                    cmd.name.toLowerCase().includes(cmdInput.value.toLowerCase())
                );
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (selectedCmdIndex < currentFiltered.length - 1) selectedCmdIndex++;
                    renderCommands(cmdInput.value);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (selectedCmdIndex > 0) selectedCmdIndex--;
                    renderCommands(cmdInput.value);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (currentFiltered[selectedCmdIndex]) {
                        currentFiltered[selectedCmdIndex].action();
                        closeCommandPalette();
                    }
                }
            });
        }
    }


    /* =========================================================================
       5. 3D CARD TILT EFFECT
       ========================================================================= */
    const tiltElements = document.querySelectorAll('.tilt-element, .tilt-card');
    
    // Use requestAnimationFrame for smooth performance
    tiltElements.forEach(element => {
        let isHovering = false;
        
        element.addEventListener('mouseenter', () => {
            isHovering = true;
            element.style.transition = 'transform 0.1s ease';
        });

        element.addEventListener('mousemove', (e) => {
            if (!isHovering) return;
            
            const rect = element.getBoundingClientRect();
            // Calculate center of element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation amount (max 10 degrees)
            const rotateX = (mouseY / (rect.height / 2)) * -10;
            const rotateY = (mouseX / (rect.width / 2)) * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            isHovering = false;
            element.style.transition = 'transform 0.5s ease';
            element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });


    /* =========================================================================
       6. SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================= */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
    
    // Set stagger delays for list items
    document.querySelectorAll('.reveal-stagger').forEach(container => {
        const items = container.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a progress bar container, animate the bars
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Unobserve after revealing to prevent re-animation on scroll up
                // (Or keep it to animate every time)
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into full view
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* =========================================================================
       7. STATS COUNTER ANIMATION
       ========================================================================= */
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;
    
    if (statsSection && statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimatedStats) {
                    hasAnimatedStats = true;
                    
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60 FPS
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                stat.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                stat.innerText = target + (target > 10 ? '+' : '');
                            }
                        };
                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }


    /* =========================================================================
       8. BACKGROUND PARTICLE SYSTEM (CANVAS)
       ========================================================================= */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        
        // Colors from CSS root variables
        const colors = ['#00f0ff', '#7000ff', '#ff0055'];

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x > width) this.x = 0;
                else if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                else if (this.y < 0) this.y = height;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1.0; // reset
            }
        }

        function initParticles() {
            particles = [];
            // Responsive number of particles
            const numParticles = Math.min(Math.floor(window.innerWidth / 10), 100);
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }


    /* =========================================================================
       9. CONTACT FORM (EMAILJS)
       ========================================================================= */
    try {
        emailjs.init({ publicKey: 'cU4ImATK7r799K1cf' });
    } catch (err) {
        console.error('EmailJS init error:', err);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.form-submit');
            const btnText = btn.querySelector('span');
            const originalText = btnText.textContent;

            btn.disabled = true;
            btnText.textContent = 'Sending...';

            const nameVal = document.getElementById('name').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const messageVal = document.getElementById('message').value.trim();

            const emailParams = {
                from_name: nameVal,
                from_email: emailVal,
                subject: `Message from ${nameVal}`,
                message: messageVal,
            };

            emailjs.send('service_b2stsjq', 'template_ub2y1en', emailParams)
                .then(() => {
                    btnText.textContent = 'Message Sent!';
                    btn.style.background = '#00c853';
                    contactForm.reset();
                    setTimeout(() => {
                        btnText.textContent = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                    }, 3000);
                })
                .catch((error) => {
                    console.error('EmailJS error:', error);
                    btnText.textContent = 'Failed. Try again.';
                    btn.style.background = '#ff1744';
                    setTimeout(() => {
                        btnText.textContent = originalText;
                        btn.disabled = false;
                        btn.style.background = '';
                    }, 3000);
                });
        });
    }
});
