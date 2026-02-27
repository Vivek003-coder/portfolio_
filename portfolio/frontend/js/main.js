document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // TYPING EFFECT
    // =========================
    const texts = [
        "Full Stack Java Developer",
        "DSA Enthusiast"
    ];

    let speed = 100;
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector(".typing");

    function typeEffect() {
        if (!typingElement) return;

        const currentText = texts[index];

        if (!isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex++);
            if (charIndex > currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                index = (index + 1) % texts.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 50 : speed);
    }

    typeEffect();


    // =========================
    // HIRE ME SCROLL
    // =========================
    const hireBtn = document.getElementById("hireBtn");

    hireBtn?.addEventListener("click", () => {
        document.querySelector("#contact")
            ?.scrollIntoView({ behavior: "smooth" });
    });


    // =========================
    // NAVBAR SMOOTH SCROLL
    // =========================
    document.querySelectorAll(".nav-links a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            target?.scrollIntoView({
                behavior: "smooth"
            });
        });
    });


    // =========================
    // GLASS NAVBAR SCROLL STATE
    // =========================
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // =========================
    // ACTIVE NAV HIGHLIGHT
    // =========================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    window.addEventListener("load", updateActiveNav);


    // =========================
    // SCROLL REVEAL
    // =========================
    function revealOnScroll() {
        document.querySelectorAll(".reveal").forEach((element, i) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 120) {
                if (element.classList.contains("project-card")) {
                    element.style.transitionDelay = `${i * 0.12}s`;
                }
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("load", revealOnScroll);


    // =========================
    // PROJECT MODAL
    // =========================
    const modal = document.querySelector(".project-modal");
    const closeModal = document.querySelector(".close-modal");

    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {

            const card = this.closest(".project-card");
            if (!card || !modal) return;

            document.getElementById("modal-title").textContent =
                card.dataset.title;

            document.getElementById("modal-description").textContent =
                card.dataset.description;

            document.getElementById("modal-tech").textContent =
                card.dataset.tech;

            document.getElementById("modal-github").href =
                card.dataset.github;

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    closeModal?.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    });


    // =========================
    // STATS COUNTER
    // =========================
    const counters = document.querySelectorAll(".counter");
    let counterStarted = false;

    function runCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const speed = 200;
            const increment = target / speed;

            function updateCounter() {
                const current = +counter.innerText;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }

            updateCounter();
        });
    }

    window.addEventListener("scroll", () => {
        const aboutSection = document.querySelector("#about");
        if (!aboutSection || counterStarted) return;

        const sectionTop = aboutSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if (sectionTop < triggerPoint) {
            runCounter();
            counterStarted = true;
        }
    });


    // =========================
    // MAGNETIC CURSOR GLOW
    // =========================
    const cursor = document.querySelector(".cursor-glow");

    if (cursor && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = "1";
        });

        function animateCursor() {
            glowX += (mouseX - glowX) * 0.15;
            glowY += (mouseY - glowY) * 0.15;

            cursor.style.left = glowX + "px";
            cursor.style.top = glowY + "px";

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // magnetic buttons
        document.querySelectorAll(".magnetic").forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform =
                    `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
            });

            el.addEventListener("mouseleave", () => {
                el.style.transform = "translate(0,0) scale(1)";
            });
        });
    }
    // =========================
    // PROJECT CARD SPOTLIGHT
    // =========================
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
    // =========================
    // ULTRA PRO MOBILE NAV
    // =========================
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-links");

    menuToggle?.addEventListener("click", (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle("active");
        navMenu.classList.toggle("open");
    });

    // close on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("open");
        });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("open");
        }
    });

    // skills spotlight follow
    document.querySelectorAll(".skill-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

});