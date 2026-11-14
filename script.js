document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector(".background-shark")) {
    const shark = document.createElement("div");
    shark.className = "background-shark";
    shark.setAttribute("aria-hidden", "true");
    document.body.append(shark);
  }

  const nav = document.querySelector(".nav-links");
  const menuButton = document.querySelector(".menu-toggle");

  if (nav && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
  }

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }
});
