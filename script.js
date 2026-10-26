document.addEventListener("DOMContentLoaded", () => {
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

(() => {
  const storageKey = "emmanuel-portfolio-theme";
  const getTheme = () => {
    try { return localStorage.getItem(storageKey) || "dark"; }
    catch (_) { return "dark"; }
  };
  const applyTheme = (theme) => {
    document.body.classList.toggle("light-theme", theme === "light");
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      const label = button.querySelector(".theme-label");
      if (label) label.textContent = theme === "light" ? "Dark mode" : "Light mode";
      button.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
      button.title = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
    });
  };
  applyTheme(getTheme());
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".theme-toggle")) return;
    const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(nextTheme);
    try { localStorage.setItem(storageKey, nextTheme); } catch (_) {}
  });
})();
