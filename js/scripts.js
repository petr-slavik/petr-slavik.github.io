document.addEventListener("DOMContentLoaded", function () {
    // Přepínání mezi světlým a tmavým režimem
    const themeToggle = document.createElement("button");
    themeToggle.classList.add("theme-toggle");
    themeToggle.textContent = "\u263E"; //Dark
    document.body.appendChild(themeToggle);

    // Zkontroluj, zda uživatel měl předtím nastaven tmavý režim
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "\u263C"; //Light
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            themeToggle.textContent = "\u263C"; //Light
        } else {
            localStorage.setItem("dark-mode", "disabled");
            themeToggle.textContent = "\u263E"; //Dark
        }
    }); 



    // Plynulé scrollování při kliknutí na menu
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offset = 70; // Posunutí dolů kvůli pevné navigaci
                    const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // **Přidání fade-in efektu při scrollování**
    const sections = document.querySelectorAll(".fade-in-section");

    function checkVisibility() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Spustí kontrolu ihned při načtení



    // **Lightbox galerie s možností listování mezi obrázky**
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    let currentImageIndex = 0;
    let modal = null;

    function openModal(index) {
        currentImageIndex = index;
        const imageUrl = galleryImages[currentImageIndex].src;
        const imageAlt = galleryImages[currentImageIndex].alt; // Načtení popisku

        // Pokud modal už existuje, odstraníme ho
        if (document.querySelector(".modal")) {
            document.querySelector(".modal").remove();
        }

        modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close" id="closeModal">&times;</button> <!-- Opraveno ID pro kliknutí -->
                <div class="modal-container">
                    <button class="prev">←</button>
                    <img src="${imageUrl}" alt="${imageAlt}" id="modalImage">
                    <button class="next">→</button>
                </div>
                <p class="modal-caption">${imageAlt}</p>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = "flex";

        // **Správné připojení event listeneru k tlačítku "X"**
        document.getElementById("closeModal").addEventListener("click", closeModal);

        // Zavření při kliknutí mimo obrázek
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Přepínání obrázků šipkami
        modal.querySelector(".prev").addEventListener("click", () => changeImage(-1));
        modal.querySelector(".next").addEventListener("click", () => changeImage(1));

        // Podpora šipek na klávesnici
        document.addEventListener("keydown", handleKeyPress);
    }

    function closeModal() {
        if (modal) {
            modal.remove();
            modal = null;
            document.removeEventListener("keydown", handleKeyPress);
        }
    }

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }

        const newImage = galleryImages[currentImageIndex];
        modal.querySelector("#modalImage").src = newImage.src;
        modal.querySelector(".modal-caption").textContent = newImage.alt; // Aktualizace popisku
    }

    function handleKeyPress(event) {
        if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "Escape") {
            closeModal();
        }
    }

    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => openModal(index));
    });



    // Kontakt formulář - validace a reset
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Děkujeme za zprávu! Brzy se vám ozveme.");
            contactForm.reset();
        });
    }

    // Google Kalendář
    window.openGoogleCalendar = function () {
        window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0hSOR-AJVVG_NQl0J2YmVfh8XX-jMj9GLzpSm0LUjQQdhrEg9ZqDh0ti8znwh3p6qI_vZJvkjh', '_blank');
    };
});


function toggleService(index) {
    const serviceCards = document.querySelectorAll(".service-card");

    // Zavřít všechny ostatní karty
    serviceCards.forEach((card, i) => {
        if (i !== index) {
            card.classList.remove("active");
        }
    });

    // Přepnout aktivní třídu na vybranou kartu
    serviceCards[index].classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const user = "honzabarton";
    const domain = "seznam.cz";
    const email = user + "@" + domain;

    const emailLink = document.getElementById("email-link");
    emailLink.innerHTML = `<a href="mailto:${email}">${email}</a>`;
});

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".fixed-nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled"); // Přidá stín při scrollování
        } else {
            navbar.classList.remove("scrolled"); // Odstraní stín, pokud je nahoře
        }
    });
});

// Skript pro zobrazovani a kryvani Hamburger Menu
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show"); // Přepne třídu "show", která zobrazuje menu
    });
});
document.querySelectorAll(".fixed-nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show"); // Po kliknutí na odkaz se menu zavře
    });
});

