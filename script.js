/* ==========================================================
   RAYYAN.DEV — COMPLETE WEBSITE JAVASCRIPT
   Mobile Navigation | Social Links | Contact Form | Footer
========================================================== */


/* PERSONAL INFORMATION
   اپنی اصل معلومات صرف یہاں شامل کرنی ہیں۔
*/

const CONFIG = {
    email: "rayyan.dev01@gmail.com",

    github: "https://github.com/rayyandev-1/portfolio/upload",

    linkedin: "https://www.linkedin.com/in/rana-rayyan-4535b3451/",

    whatsapp: "923XXXXXXXXX"
};


/* ==========================================================
   1. MOBILE NAVIGATION
========================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}

function openMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
}

function toggleMenu() {
    if (!navLinks) return;

    if (navLinks.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (menuToggle && navLinks) {

    menuToggle.type = "button";
    menuToggle.setAttribute("aria-controls", "navLinks");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function(event) {

        const clickedMenu = navLinks.contains(event.target);
        const clickedButton = menuToggle.contains(event.target);

        if (!clickedMenu && !clickedButton) {
            closeMenu();
        }

    });

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", function() {

        if (window.innerWidth > 700) {
            closeMenu();
        }

    });
}


/* ==========================================================
   2. AUTOMATIC FOOTER YEAR
========================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ==========================================================
   3. SOCIAL MEDIA ICON LINKS
========================================================== */

const socialLinks = document.querySelectorAll("[data-social]");

socialLinks.forEach(function(icon) {

    const platform = icon.getAttribute("data-social");

    let profileLink = "";

    if (platform === "github") {
        profileLink = CONFIG.github;
    }

    if (platform === "linkedin") {
        profileLink = CONFIG.linkedin;
    }

    if (platform === "whatsapp") {

        const phoneNumber = CONFIG.whatsapp.replace(/\D/g, "");

        if (phoneNumber && !phoneNumber.includes("X")) {
            profileLink = "https://wa.me/" + phoneNumber;
        }
    }

    if (
        profileLink &&
        !profileLink.includes("YOUR_") &&
        profileLink !== "#"
    ) {

        icon.href = profileLink;
        icon.target = "_blank";
        icon.rel = "noopener noreferrer";
        icon.removeAttribute("aria-disabled");

    } else {

        icon.href = "#";
        icon.removeAttribute("target");
        icon.setAttribute("aria-disabled", "true");

        icon.addEventListener("click", function(event) {

            event.preventDefault();

            showFormMessage(
                "This social media link has not been added yet.",
                "warning"
            );

        });

    }

});


/* ==========================================================
   4. CONTACT EMAIL LINK
========================================================== */

const emailDirect = document.querySelector(".email-direct");

if (emailDirect) {

    if (
        CONFIG.email &&
        CONFIG.email !== "YOUR_EMAIL_HERE"
    ) {

        emailDirect.href = "mailto:" + CONFIG.email;
        emailDirect.textContent = CONFIG.email + " ↗";

    } else {

        emailDirect.href = "#contact";
        emailDirect.textContent = "Add your email address";

    }

}


/* ==========================================================
   5. CONTACT FORM
========================================================== */

const contactForm = document.getElementById("contactForm");

const formNote = document.getElementById("formNote");


function showFormMessage(message, type) {

    if (!formNote) return;

    formNote.textContent = message;

    if (type === "success") {
        formNote.style.color = "#82B99A";
    } else if (type === "warning") {
        formNote.style.color = "#D6A85F";
    } else {
        formNote.style.color = "#AAB7BD";
    }

}


if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nameField = document.getElementById("visitorName");
        const emailField = document.getElementById("visitorEmail");
        const messageField = document.getElementById("visitorMessage");


        if (!nameField || !emailField || !messageField) {
            showFormMessage(
                "The contact form fields could not be found.",
                "warning"
            );
            return;
        }


        const name = nameField.value.trim();
        const senderEmail = emailField.value.trim();
        const message = messageField.value.trim();


        if (!name || !senderEmail || !message) {
            showFormMessage(
                "Please complete all fields before submitting.",
                "warning"
            );
            return;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(senderEmail)) {
            showFormMessage(
                "Please enter a valid email address.",
                "warning"
            );
            emailField.focus();
            return;
        }


        if (
            !CONFIG.email ||
            CONFIG.email === "YOUR_EMAIL_HERE"
        ) {
            showFormMessage(
                "Please add your real email address in script.js first.",
                "warning"
            );
            return;
        }


        const subject = encodeURIComponent(
            "Portfolio Enquiry from " + name
        );

        const body = encodeURIComponent(
            "Hello Rayyan,\n\n" +
            "Name: " + name + "\n" +
            "Email: " + senderEmail + "\n\n" +
            "Message:\n" + message + "\n\n" +
            "Sent from RAYYAN.DEV Portfolio."
        );


        const mailtoLink =
            "mailto:" + CONFIG.email +
            "?subject=" + subject +
            "&body=" + body;


        showFormMessage(
            "Opening your email application...",
            "success"
        );


        window.location.href = mailtoLink;

    });

}


/* ==========================================================
   6. SMOOTH SCROLL FOR INTERNAL LINKS
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetID = link.getAttribute("href");

        if (!targetID || targetID === "#") return;

        const targetElement = document.querySelector(targetID);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* ==========================================================
   7. CONTACT FORM INPUT FEEDBACK
========================================================== */

const formInputs = document.querySelectorAll(
    ".contact-form input, .contact-form textarea"
);

formInputs.forEach(function(input) {

    input.addEventListener("input", function() {

        input.style.borderColor = "";

        if (formNote) {
            formNote.textContent =
                "Complete the form to prepare your email.";
            formNote.style.color = "#91A0A7";
        }

    });

});


/* ==========================================================
   8. WEBSITE INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", function() {

    console.log(
        "%cRAYYAN.DEV",
        "color: #D6A85F; font-size: 22px; font-weight: bold;"
    );

    console.log(
        "Website JavaScript loaded successfully."
    );

});
