/**
 * ==========================================================================
 * AAYUSH HARAL — PERSONAL PORTFOLIO INTERACTION ENGINE
 * Premium Developer Portfolio UI/UX Behaviors
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    initIcons();

    // 2. Initialize Theme Engine (Dark / Light with storage & auto system check)
    initThemeEngine();

    // 3. Initialize Mobile Navigation Drawer
    initMobileNav();

    // 4. Initialize Hero Dynamic Role Typewriter
    initRoleTypewriter();

    // 5. Initialize Project Filter System
    initProjectFilters();

    // 6. Initialize Scroll Reveal & Navigation Spy
    initScrollEngine();

    // 7. Initialize Interactive Contact Form
    initContactForm();

    // 8. Dynamic Copyright Year
    initCopyrightYear();
});

/* ==========================================================================
   1. LUCIDE ICONS INITIALIZATION
   ========================================================================== */
function initIcons() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
        lucide.createIcons();
    }
}

/* ==========================================================================
   2. THEME ENGINE (Dark / Light Mode)
   ========================================================================== */
function initThemeEngine() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const htmlRoot = document.documentElement;

    // Retrieve saved theme or evaluate system preference
    const savedTheme = localStorage.getItem("ah_portfolio_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    // Apply theme
    applyTheme(initialTheme);

    // Listen for theme toggle click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("ah_portfolio_theme", newTheme);
        });
    }

    // Listen to OS system theme changes if user hasn't explicitly set one
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("ah_portfolio_theme")) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });

    function applyTheme(theme) {
        htmlRoot.setAttribute("data-theme", theme);
        
        // Update meta theme-color for mobile browser frames
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute("content", theme === "dark" ? "#080B12" : "#F8FAFC");
        }

        // Re-render icons if needed
        initIcons();
    }
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (!mobileToggle || !mobileDrawer) return;

    // Toggle drawer on hamburger click
    mobileToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = mobileDrawer.classList.contains("open");
        setMobileNavState(!isOpen);
    });

    // Close on link click
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setMobileNavState(false);
        });
    });

    // Close when clicking outside of drawer
    document.addEventListener("click", (e) => {
        if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
            if (mobileDrawer.classList.contains("open")) {
                setMobileNavState(false);
            }
        }
    });

    // Close on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
            setMobileNavState(false);
        }
    });

    function setMobileNavState(open) {
        if (open) {
            mobileDrawer.classList.add("open");
            mobileToggle.classList.add("active");
            mobileToggle.setAttribute("aria-expanded", "true");
            mobileDrawer.setAttribute("aria-hidden", "false");
        } else {
            mobileDrawer.classList.remove("open");
            mobileToggle.classList.remove("active");
            mobileToggle.setAttribute("aria-expanded", "false");
            mobileDrawer.setAttribute("aria-hidden", "true");
        }
    }
}

/* ==========================================================================
   4. HERO DYNAMIC ROLE TYPEWRITER
   ========================================================================== */
function initRoleTypewriter() {
    const roleElement = document.getElementById("role-text");
    if (!roleElement) return;

    const roles = [
        "Full-Stack Developer",
        "Software Developer",
        "Web Developer",
        "Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function tick() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 45; // Faster deletion
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 95; // Natural typing speed
        }

        // Check completion
        if (!isDeleting && charIndex === currentRole.length) {
            // Full role typed: pause before backspacing
            isDeleting = true;
            typeDelay = 2200;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted: transition to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 450;
        }

        setTimeout(tick, typeDelay);
    }

    // Start with short initial delay
    setTimeout(tick, 800);
}

/* ==========================================================================
   5. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-pill");
    const projectCards = document.querySelectorAll(".project-card");

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active from all
            filterButtons.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });

            // Set active on clicked
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(12px)";
                    setTimeout(() => {
                        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 30);
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

/* ==========================================================================
   6. SCROLL REVEAL & NAVIGATION SPY
   ========================================================================== */
function initScrollEngine() {
    // 6.1 Intersection Observer for Section Reveal
    const revealElements = document.querySelectorAll(
        ".section-header, .about-grid, .skill-category-card, .project-card, .timeline-card, .cert-card, .acm-card, .contact-grid"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach((el) => {
            el.classList.add("reveal-on-scroll");
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach((el) => el.classList.add("revealed"));
    }

    // 6.2 Active Navigation Spy on Scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 140;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
}

/* ==========================================================================
   7. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById("portfolio-contact-form");
    if (!contactForm) return;

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const subjectInput = document.getElementById("contact-subject");
    const messageInput = document.getElementById("contact-message");
    const submitBtn = document.getElementById("contact-submit-btn");
    const feedbackBox = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Reset previous errors
        clearErrors();

        let isValid = true;

        // 1. Validate Name
        const nameVal = nameInput.value.trim();
        if (!nameVal || nameVal.length < 2) {
            setError(nameInput, "Please enter your full name (at least 2 characters).");
            isValid = false;
        }

        // 2. Validate Email
        const emailVal = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
            setError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        // 3. Validate Subject
        const subjectVal = subjectInput.value.trim();
        if (!subjectVal || subjectVal.length < 3) {
            setError(subjectInput, "Please enter a message subject.");
            isValid = false;
        }

        // 4. Validate Message
        const messageVal = messageInput.value.trim();
        if (!messageVal || messageVal.length < 10) {
            setError(messageInput, "Please write a message with at least 10 characters.");
            isValid = false;
        }

        if (!isValid) return;

        // Button Loading State
        submitBtn.classList.add("loading");
        submitBtn.disabled = true;

        // Prepare mailto URI
        const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectVal}`);
        const mailtoBody = encodeURIComponent(
            `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`
        );
        const mailtoUrl = `mailto:aayushharal05@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

        setTimeout(() => {
            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;

            // Trigger mail client
            window.location.href = mailtoUrl;

            // Show friendly notification
            feedbackBox.className = "form-feedback-box success";
            feedbackBox.innerHTML = `
                <strong>Message client launched!</strong><br>
                Your default email app has been opened with your message ready to send to <strong>aayushharal05@gmail.com</strong>.<br>
                You can also submit directly via my <a href="https://docs.google.com/forms/d/e/1FAIpQLSf7WiZ4MOBbvs5s03Rz0jcBsyBY4v3qU4b_tzBFPcyPezikZg/viewform" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: inherit; font-weight: bold;">Google Form</a>.
            `;

            // Reset form
            contactForm.reset();
        }, 800);
    });

    function setError(inputElement, message) {
        const group = inputElement.closest(".form-group");
        if (group) {
            group.classList.add("has-error");
            const errSpan = group.querySelector(".form-error-msg");
            if (errSpan) {
                errSpan.textContent = message;
            }
        }
    }

    function clearErrors() {
        const errorGroups = contactForm.querySelectorAll(".form-group.has-error");
        errorGroups.forEach((group) => group.classList.remove("has-error"));
        feedbackBox.className = "form-feedback-box";
        feedbackBox.innerHTML = "";
    }

    // Clear error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
        if (input) {
            input.addEventListener("input", () => {
                const group = input.closest(".form-group");
                if (group && group.classList.contains("has-error")) {
                    group.classList.remove("has-error");
                }
            });
        }
    });
}

/* ==========================================================================
   8. DYNAMIC COPYRIGHT YEAR
   ========================================================================== */
function initCopyrightYear() {
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
