document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Mobile Navigation Toggle
    const navToggle = document.createElement("div");
    navToggle.innerHTML = "☰";
    navToggle.classList.add("nav-toggle");
    document.querySelector("header").appendChild(navToggle);

    const nav = document.querySelector("nav ul");
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
});
