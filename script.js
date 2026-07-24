/* ==========================================================
   Irma Punzalan Portfolio
   script.js - Part 1
   Core Navigation & UI Interactions
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       MOBILE NAVIGATION
    =========================== */

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navButtons = document.querySelector(".nav-buttons");

    if (hamburger) {

        hamburger.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");
            navButtons.classList.toggle("mobile-open");

            hamburger.classList.toggle("active");

        });

    }

    /* ===========================
       CLOSE MENU WHEN LINK CLICKED
    =========================== */

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");
            navButtons.classList.remove("mobile-open");
            hamburger.classList.remove("active");

        });

    });

    /* ===========================
       SMOOTH SCROLL
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    /* ===========================
       ACTIVE NAVIGATION
    =========================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    function activateMenu() {

        let scrollPosition = window.scrollY + 150;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < bottom) {

                navItems.forEach(link => {

                    link.classList.remove("active");

                });

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );

                if (activeLink) {

                    activeLink.classList.add("active");

                }

            }

        });

    }

    window.addEventListener("scroll", activateMenu);

    /* ===========================
       BACK TO TOP
    =========================== */

    const backToTop = document.getElementById("backToTop");

    function toggleBackButton() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.style.display = "flex";

        } else {

            backToTop.style.display = "none";

        }

    }

    window.addEventListener("scroll", toggleBackButton);

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

    /* ===========================
       NAVBAR SHADOW
    =========================== */

    const navbar = document.querySelector(".navbar");

    function navbarShadow() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("navbar-shadow");

        } else {

            navbar.classList.remove("navbar-shadow");

        }

    }

    window.addEventListener("scroll", navbarShadow);

    /* ===========================
       SCROLL REVEAL
    =========================== */

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    document.querySelectorAll(".fade-up").forEach(element => {

        observer.observe(element);

    });

    /* ===========================
       SCROLL PROGRESS BAR
    =========================== */

    const progressBar = document.createElement("div");

    progressBar.id = "progressBar";

    document.body.appendChild(progressBar);

    function updateProgressBar() {

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = (window.scrollY / scrollHeight) * 100;

        progressBar.style.width = progress + "%";

    }

    window.addEventListener("scroll", updateProgressBar);

    /* ===========================
       DYNAMIC COPYRIGHT YEAR
    =========================== */

    const yearElement = document.querySelector(".copyright-year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

});

/* ==========================================================
   script.js - Part 2
   Premium Interactive Features
========================================================== */

/* ==========================================
   HERO TYPING EFFECT
========================================== */

const typingElement = document.querySelector(".hero h2");

if (typingElement) {

    const roles = [

        "Enterprise Service Engineer",

        "Application Support Specialist",

        "DevOps Engineer",

        "Cloud Engineer",

        "AI Solutions Engineer"

    ];

    let roleIndex = 0;
    let letterIndex = 0;
    let deleting = false;

    function typeEffect() {

        const current = roles[roleIndex];

        if (!deleting) {

            typingElement.textContent = current.substring(0, letterIndex++);

            if (letterIndex > current.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;

            }

        } else {

            typingElement.textContent = current.substring(0, letterIndex--);

            if (letterIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {

                    roleIndex = 0;

                }

            }

        }

        setTimeout(typeEffect, deleting ? 45 : 85);

    }

    typeEffect();

}

/* ==========================================
   ANIMATED COUNTERS
========================================== */

const counters = document.querySelectorAll(".stat-card h3");

const counterObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = parseInt(counter.innerText);

        if (isNaN(target)) return;

        let current = 0;

        const speed = target / 90;

        const update = () => {

            current += speed;

            if (current >= target) {

                counter.innerText = target + "+";

            }

            else {

                counter.innerText = Math.floor(current) + "+";

                requestAnimationFrame(update);

            }

        };

        update();

        counterObserver.unobserve(counter);

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* ==========================================
   DARK MODE
========================================== */

const darkButton = document.createElement("button");

darkButton.id = "themeToggle";

darkButton.innerHTML = "🌙";

document.body.appendChild(darkButton);

const storedTheme = localStorage.getItem("theme");

if (storedTheme === "dark") {

    document.body.classList.add("dark");

    darkButton.innerHTML = "☀️";

}

darkButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const dark = document.body.classList.contains("dark");

    darkButton.innerHTML = dark ? "☀️" : "🌙";

    localStorage.setItem("theme", dark ? "dark" : "light");

});

/* ==========================================
   VIDEO AUTO PLAY / PAUSE
========================================== */

const portfolioVideo = document.querySelector("video");

if (portfolioVideo) {

    const videoObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                portfolioVideo.play().catch(() => {});

            }

            else {

                portfolioVideo.pause();

            }

        });

    }, {

        threshold: .55

    });

    videoObserver.observe(portfolioVideo);

}

/* ==========================================
   HERO PARALLAX
========================================== */

const hero = document.querySelector(".hero");

if (hero) {

    hero.addEventListener("mousemove", e => {

        const x = (window.innerWidth / 2 - e.pageX) / 45;

        const y = (window.innerHeight / 2 - e.pageY) / 45;

        hero.style.transform = `translate(${x}px, ${y}px)`;

    });

    hero.addEventListener("mouseleave", () => {

        hero.style.transform = "translate(0,0)";

    });

}

/* ==========================================
   PROJECT CARD 3D EFFECT
========================================== */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - .5) * 10;

        const rotateY = ((x / rect.width) - .5) * -10;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ==========================================
   FLOATING PARTICLES
========================================== */

const background = document.querySelector(".gradient-bg");

if (background) {

    for (let i = 0; i < 20; i++) {

        const bubble = document.createElement("span");

        bubble.className = "particle";

        bubble.style.left = Math.random() * 100 + "%";

        bubble.style.animationDuration =
            (10 + Math.random() * 12) + "s";

        bubble.style.animationDelay =
            Math.random() * 8 + "s";

        background.appendChild(bubble);

    }

}

/* ==========================================
   RIPPLE EFFECT
========================================== */

document.querySelectorAll(".btn-primary,.btn-outline")

.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(

            this.clientWidth,

            this.clientHeight

        );

        circle.style.width = diameter + "px";

        circle.style.height = diameter + "px";

        circle.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        circle.style.left =

            e.clientX - rect.left - diameter / 2 + "px";

        circle.style.top =

            e.clientY - rect.top - diameter / 2 + "px";

        const ripple = this.querySelector(".ripple");

        if (ripple) ripple.remove();

        this.appendChild(circle);

    });

});

/* =========================================================
   script.js - Part 3
   UI/UX Portfolio Website Interactions
========================================================= */


/* =========================================================
   PROJECT FILTER FUNCTIONALITY
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filterValue = button.dataset.filter;

        // Remove active state
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        projectCards.forEach(card => {

            const category = card.dataset.category;


            if (filterValue === "all" || category === filterValue) {

                card.style.display = "block";

                setTimeout(() => {
                    card.classList.add("show");
                }, 100);

            } else {

                card.classList.remove("show");

                setTimeout(() => {
                    card.style.display = "none";
                }, 300);

            }

        });

    });

});



/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-title, .project-card, .timeline-item, .achievement-card, .skill-card"
);


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);



revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});



/* =========================================================
   EXPERIENCE TIMELINE ANIMATION
========================================================= */

const timelineItems = document.querySelectorAll(".timeline-item");


timelineItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        item.classList.add("timeline-active");

    });


    item.addEventListener("mouseleave", () => {

        item.classList.remove("timeline-active");

    });

});



/* =========================================================
   TECHNOLOGY BADGE INTERACTION
========================================================= */

const techBadges = document.querySelectorAll(".tech-badge");


techBadges.forEach(badge => {


    badge.addEventListener("mouseenter", () => {

        badge.style.transform = "translateY(-5px) scale(1.05)";

    });


    badge.addEventListener("mouseleave", () => {

        badge.style.transform = "translateY(0) scale(1)";

    });


});



/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

const contactForm = document.querySelector("#contactForm");


if(contactForm){

    contactForm.addEventListener("submit", function(event){

        event.preventDefault();


        const name =
            document.querySelector("#name").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const message =
            document.querySelector("#message").value.trim();



        if(!name || !email || !message){

            showNotification(
                "Please complete all required fields.",
                "error"
            );

            return;

        }



        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if(!emailPattern.test(email)){

            showNotification(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }



        showNotification(
            "Thank you! Your message has been sent.",
            "success"
        );


        contactForm.reset();


    });

}



/* =========================================================
   NOTIFICATION COMPONENT
========================================================= */

function showNotification(message, type){


    const notification =
        document.createElement("div");


    notification.className =
        `notification ${type}`;


    notification.textContent = message;


    document.body.appendChild(notification);



    setTimeout(() => {

        notification.classList.add("visible");

    },100);



    setTimeout(() => {

        notification.classList.remove("visible");


        setTimeout(() => {

            notification.remove();

        },300);


    },3000);


}




/* =========================================================
   CURRENT YEAR FOOTER
========================================================= */

const currentYear =
    document.querySelector("#currentYear");


if(currentYear){

    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


internalLinks.forEach(link => {


    link.addEventListener("click", function(event){


        const target =
            document.querySelector(
                this.getAttribute("href")
            );


        if(target){

            event.preventDefault();


            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }


    });


});



/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


const navLinks =
    document.querySelectorAll(".nav-link");



window.addEventListener("scroll",()=>{


    let currentSection = "";


    sections.forEach(section=>{


        const sectionTop =
            section.offsetTop - 120;


        const sectionHeight =
            section.clientHeight;



        if(
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ){

            currentSection =
                section.getAttribute("id");

        }


    });



    navLinks.forEach(link=>{


        link.classList.remove("active");



        if(
            link.getAttribute("href") ===
            "#" + currentSection
        ){

            link.classList.add("active");

        }


    });


});



/* =========================================================
   PERFORMANCE OPTIMIZATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/* =========================================================
   END OF SCRIPT.JS PART 3
========================================================= */

/* =========================================================
   script.js - Part 4
   Advanced Portfolio Website Features
========================================================= */


/* =========================================================
   AI ASSISTANT CHAT WIDGET
========================================================= */

const aiButton =
    document.querySelector("#aiAssistantBtn");

const aiChat =
    document.querySelector("#aiChatBox");

const aiClose =
    document.querySelector("#aiCloseBtn");


if(aiButton && aiChat){

    aiButton.addEventListener(
        "click",
        () => {

            aiChat.classList.toggle(
                "open"
            );

        }
    );

}



if(aiClose && aiChat){

    aiClose.addEventListener(
        "click",
        () => {

            aiChat.classList.remove(
                "open"
            );

        }
    );

}



const aiInput =
    document.querySelector("#aiInput");

const aiSend =
    document.querySelector("#aiSendBtn");

const aiMessages =
    document.querySelector("#aiMessages");



function sendAIMessage(){


    if(!aiInput) return;


    const userMessage =
        aiInput.value.trim();


    if(userMessage === "")
        return;



    addAIMessage(
        userMessage,
        "user"
    );


    aiInput.value = "";



    setTimeout(()=>{


        let response =
            generateAIResponse(
                userMessage
            );


        addAIMessage(
            response,
            "bot"
        );


    },700);


}



if(aiSend){

    aiSend.addEventListener(
        "click",
        sendAIMessage
    );

}



if(aiInput){

    aiInput.addEventListener(
        "keypress",
        event=>{

            if(event.key === "Enter"){

                sendAIMessage();

            }

        }
    );

}



function addAIMessage(
    message,
    sender
){


    const messageElement =
        document.createElement(
            "div"
        );


    messageElement.className =
        `ai-message ${sender}`;


    messageElement.textContent =
        message;



    aiMessages.appendChild(
        messageElement
    );



    aiMessages.scrollTop =
        aiMessages.scrollHeight;


}



function generateAIResponse(
    input
){


    input =
        input.toLowerCase();



    if(input.includes("skill")){

        return "I specialize in application support, Java, Oracle SQL, DevOps, CI/CD, cloud monitoring, and AI technologies.";

    }


    if(input.includes("experience")){

        return "I have experience supporting enterprise applications, troubleshooting production issues, and collaborating with development and cloud teams.";

    }


    if(input.includes("ai")){

        return "I am continuously improving my AI skills, including LLM concepts, Azure OpenAI, automation, and AI-powered solutions.";

    }



    return "Thank you for your message. I can help you learn more about my technical background and projects.";

}





/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingElement =
    document.querySelector(
        ".typing-text"
    );


if(typingElement){


    const words = [

        "Application Support Engineer",

        "Cloud & DevOps Professional",

        "AI Technology Enthusiast",

        "Problem Solver"

    ];


    let wordIndex = 0;

    let charIndex = 0;

    let deleting = false;



    function typeEffect(){


        const currentWord =
            words[wordIndex];



        if(!deleting){

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex++
                );


            if(charIndex >
                currentWord.length
            ){

                deleting = true;

                setTimeout(
                    typeEffect,
                    1200
                );

                return;

            }


        }
        else{


            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex--
                );


            if(charIndex < 0){

                deleting = false;

                wordIndex =
                    (wordIndex + 1)
                    % words.length;

            }


        }


        setTimeout(
            typeEffect,
            deleting ? 60 : 100
        );


    }


    typeEffect();

}



/* =========================================================
   SKILL PROGRESS ANIMATION
========================================================= */


const progressBars =
    document.querySelectorAll(
        ".skill-progress"
    );



const progressObserver =
    new IntersectionObserver(
        entries=>{


            entries.forEach(entry=>{


                if(entry.isIntersecting){


                    const value =
                        entry.target.dataset.progress;



                    entry.target.style.width =
                        value + "%";



                    progressObserver.unobserve(
                        entry.target
                    );


                }


            });


        },
        {
            threshold:0.5
        }
    );



progressBars.forEach(bar=>{

    progressObserver.observe(bar);

});





/* =========================================================
   BACK TO TOP BUTTON
========================================================= */


const backTop =
    document.querySelector(
        "#backToTop"
    );



if(backTop){


    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 500){

                backTop.classList.add(
                    "show"
                );

            }
            else{

                backTop.classList.remove(
                    "show"
                );

            }


        }
    );



    backTop.addEventListener(
        "click",
        ()=>{


            window.scrollTo({

                top:0,

                behavior:"smooth"

            });


        }
    );


}





/* =========================================================
   THEME SWITCHER
========================================================= */


const themeButton =
    document.querySelector(
        "#themeToggle"
    );



if(themeButton){


    themeButton.addEventListener(
        "click",
        ()=>{


            document.body.classList.toggle(
                "dark-theme"
            );


            localStorage.setItem(

                "theme",

                document.body.classList.contains(
                    "dark-theme"
                )
                ? "dark"
                : "light"

            );


        }
    );


}



const savedTheme =
    localStorage.getItem(
        "theme"
    );


if(savedTheme === "dark"){

    document.body.classList.add(
        "dark-theme"
    );

}





/* =========================================================
   PROJECT MODAL PREVIEW
========================================================= */


const projectButtons =
    document.querySelectorAll(
        ".project-view"
    );


const projectModal =
    document.querySelector(
        "#projectModal"
    );


const modalClose =
    document.querySelector(
        "#modalClose"
    );



projectButtons.forEach(button=>{


    button.addEventListener(
        "click",
        ()=>{


            const title =
                button.dataset.title;


            const description =
                button.dataset.description;



            document.querySelector(
                "#modalTitle"
            ).textContent =
                title;



            document.querySelector(
                "#modalDescription"
            ).textContent =
                description;



            projectModal.classList.add(
                "active"
            );


        }
    );


});



if(modalClose){

    modalClose.addEventListener(
        "click",
        ()=>{

            projectModal.classList.remove(
                "active"
            );

        }
    );

}





/* =========================================================
   CUSTOM CURSOR EFFECT
========================================================= */


const cursor =
    document.querySelector(
        ".custom-cursor"
    );



if(cursor){


    document.addEventListener(
        "mousemove",
        event=>{


            cursor.style.left =
                event.clientX + "px";


            cursor.style.top =
                event.clientY + "px";


        }
    );



}





/* =========================================================
   INITIAL PAGE SETUP
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        console.log(
            "Portfolio website initialized successfully."
        );


    }
);



/* =========================================================
   END OF SCRIPT.JS PART 4
========================================================= */
