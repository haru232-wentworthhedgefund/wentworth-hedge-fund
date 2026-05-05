const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

handleHeaderScroll();
window.addEventListener("scroll", handleHeaderScroll);

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (siteNav && siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960 && siteNav) {
    siteNav.classList.remove("is-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
});
