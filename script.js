/* ==========================================
   INITIALIZATION & PRELOADER
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Dismiss Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("fade-out");
            // Trigger scroll reveal on load
            revealOnScroll();
        }, 1200);
    }

    // Initialize all components
    initTheme();
    initMobileNav();
    initTypingEffect();
    initParticles();
    initCustomCursor();
    initScrollReveal();
    initProjectFilter();
    initVisitorCounter();
});

/* ==========================================
   THEME SWITCHER
   ========================================== */
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const activeTheme = savedTheme || systemPreference;
    
    // Apply initial theme
    htmlElement.setAttribute("data-theme", activeTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            // Set attribute and save
            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            // Re-render lucide icons if toggled to swap theme visual icon state
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }
}

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const typingSpan = document.getElementById("typing-text");
    if (!typingSpan) return;

    const words = ["Computer Engineer", "Web Developer", "Software Developer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletion is faster
        } else {
            // Add characters
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120;
        }

        // State changes
        if (!isDeleting && charIndex === currentWord.length) {
            // Finished typing, pause before deleting
            isDeleting = true;
            typingSpeed = 2200; // Large pause at full word
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Small pause before next word starts typing
        }

        setTimeout(type, typingSpeed);
    }

    // Start type loop
    setTimeout(type, 1000);
}

/* ==========================================
   CANVAS PARTICLES BACKGROUND
   ========================================== */
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let numberOfParticles = 80;

    // Responsive particle count
    if (window.innerWidth < 768) {
        numberOfParticles = 35;
    }

    // Canvas sizing
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", () => {
        setCanvasSize();
        // Adjust particle density on resize
        if (window.innerWidth < 768) {
            numberOfParticles = 35;
        } else {
            numberOfParticles = 80;
        }
    });

    // Mouse coordinates tracker
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Constructor
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6; // Subtle speed
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 2.5 + 1;
        }

        draw() {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            ctx.fillStyle = isDark ? "rgba(168, 85, 247, 0.4)" : "rgba(37, 99, 235, 0.3)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            // Collision with boundaries
            if (this.x > canvas.width || this.x < 0) {
                this.vx = -this.vx;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.vy = -this.vy;
            }

            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Mouse interact (repulsion)
            if (mouse.x != null && mouse.y != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = forceDirectionX * force * 1.5;
                    let directionY = forceDirectionY * force * 1.5;
                    
                    this.x += directionX;
                    this.y += directionY;
                }
            }

            this.draw();
        }
    }

    // Setup array
    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Connect particles with drawing lines
    function connect() {
        let opacityValue = 1;
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) {
                    opacityValue = 1 - (distance / 140);
                    
                    // Line color based on theme
                    if (isDark) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.12})`;
                    } else {
                        ctx.strokeStyle = `rgba(37, 99, 235, ${opacityValue * 0.08})`;
                    }
                    
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
    const cursorDot = document.querySelector(".custom-cursor");
    const cursorFollower = document.querySelector(".custom-cursor-follower");

    if (!cursorDot || !cursorFollower) return;

    let posX = 0, posY = 0; // Followers current positions
    let mouseX = 0, mouseY = 0; // Mouse raw coordinates

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant position for central dot
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
    });

    // Smooth physics follower loop using animation frame
    function updateFollower() {
        // Damping factor (0.1 means 10% movement per frame)
        const dx = mouseX - posX;
        const dy = mouseY - posY;
        posX += dx * 0.14;
        posY += dy * 0.14;

        cursorFollower.style.left = posX + "px";
        cursorFollower.style.top = posY + "px";

        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hover states list
    const hoverables = document.querySelectorAll("a, button, input, textarea, .filter-btn, .project-overlay-link");
    
    hoverables.forEach(item => {
        item.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        item.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}

/* ==========================================
   SCROLL REVEAL & NAVIGATION HIGHLIGHT
   ========================================== */
function revealOnScroll() {
    const reveals = document.querySelectorAll(".scroll-reveal");
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 120; // Trigger when element is 120px into viewport
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("revealed");
            
            // If the element revealed has skills progress bars, animate their fills
            const progressFills = element.querySelectorAll(".progress-fill");
            progressFills.forEach(fill => {
                const percent = fill.style.getPropertyValue("--percent");
                fill.style.width = percent;
            });
        }
    });
}

function highlightNav() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 180; // Buffer for header offset
        const sectionId = current.getAttribute("id");
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

function initScrollReveal() {
    // Initial run
    revealOnScroll();
    
    // Bind scroll listeners
    window.addEventListener("scroll", () => {
        revealOnScroll();
        highlightNav();
    });
}

/* ==========================================
   PROJECT FILTERING SYSTEM
   ========================================== */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active state and add to clicked
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                
                // Add fade effect during filter
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                
                setTimeout(() => {
                    if (filterValue === "all" || cardCategory === filterValue) {
                        card.classList.remove("filtered-out");
                        // Trigger small timeout before fading back in
                        setTimeout(() => {
                            card.style.opacity = "1";
                            card.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        card.classList.add("filtered-out");
                    }
                }, 200);
            });
        });
    });
}



/* ==========================================
   VISITOR COUNTER SYSTEM
   ========================================== */
function initVisitorCounter() {
    const footerCounterSpan = document.getElementById("visitor-count");
    if (!footerCounterSpan) return;

    const namespace = "aayushharal-portfolio";
    const counterKey = "hits";
    
    // Check if the user has already visited (one time only using localStorage)
    const hasVisited = localStorage.getItem("portfolio_visited");
    let url = `https://api.counterapi.dev/v1/${namespace}/${counterKey}/`; // Default read
    
    if (!hasVisited) {
        // Increment the count
        url = `https://api.counterapi.dev/v1/${namespace}/${counterKey}/up`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("CounterAPI network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data && typeof data.count === "number") {
                const count = data.count;
                
                // Save visit state in localStorage if it wasn't already set
                if (!hasVisited) {
                    localStorage.setItem("portfolio_visited", "true");
                }
                
                // Animate count up
                animateCountUp(footerCounterSpan, count);
            } else {
                footerCounterSpan.textContent = "---";
            }
        })
        .catch(error => {
            console.error("Error updating/fetching visitor counter:", error);
            // Fallback gracefully
            footerCounterSpan.textContent = "124";
        });
}

function animateCountUp(element, targetValue) {
    let startValue = 0;
    const duration = 1500; // Animation duration in ms
    const startTime = performance.now();

    function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentValue = Math.floor(easeProgress * targetValue);
        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    }

    requestAnimationFrame(updateCount);
}
