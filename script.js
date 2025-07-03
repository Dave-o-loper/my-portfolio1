document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 50, // Prevent navbar overlap
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations (Trigger on Scroll Down & Up)
    const elements = document.querySelectorAll(".my__skills, .about__me, .home, .services__section, .contact__form");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show"); // Hide when scrolling up
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(element => {
        element.classList.add("hidden"); // Initially hide elements
        observer.observe(element);
    });

    // Typing Effect for "I'm A Frontend Web Developer | Web Designer"
    const typingText = document.querySelector(".im-a h2 span");
    const words = ["Frontend Web Developer", "Web Designer"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        let currentWord = words[wordIndex];

        if (isDeleting) {
            letterIndex--;
        } else {
            letterIndex++;
        }

        typingText.textContent = currentWord.substring(0, letterIndex);

        let speed = isDeleting ? 100 : 150; // Faster deleting, slower typing

        if (!isDeleting && letterIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000); // Pause before deleting
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 1000); // Pause before typing new word
        } else {
            setTimeout(typeEffect, speed);
        }
    }

    setTimeout(typeEffect, 1500); // Initial delay before typing starts

    // Skill Bar Animation
    function animateSkillBars() {
        let skillBars = document.querySelectorAll(".skill-per");

        skillBars.forEach(bar => {
            let percentage = bar.getAttribute("data-percent");
            let tooltip = bar.querySelector(".tooltip");

            bar.style.width = percentage + "%";
            let count = 0;

            let updateTooltip = setInterval(() => {
                if (count >= percentage) {
                    clearInterval(updateTooltip);
                } else {
                    count++;
                    tooltip.textContent = count + "%";
                }
            }, 20);
        });
    }

    // Check when Skills section is in view and trigger animation
    function checkSkillsInView() {
        let skillsSection = document.getElementById("skills");
        let rect = skillsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            animateSkillBars();
            window.removeEventListener("scroll", checkSkillsInView); // Run only once
        }
    }

    window.addEventListener("scroll", checkSkillsInView);

});
