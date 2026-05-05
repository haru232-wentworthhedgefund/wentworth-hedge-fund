const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function updateHeaderOnScroll() {
  if (!header) return;

  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

updateHeaderOnScroll();
window.addEventListener("scroll", updateHeaderOnScroll);

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 980 && siteNav) {
    siteNav.classList.remove("is-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }

  updateBusinessCarousel();
});

/* Business carousel */
const businessTrack = document.getElementById("businessTrack");
const businessPrev = document.getElementById("businessPrev");
const businessNext = document.getElementById("businessNext");

let currentBusinessIndex = 0;

function getVisibleSlides() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function updateBusinessCarousel() {
  if (!businessTrack) return;

  const slides = businessTrack.querySelectorAll(".business-card");
  const visibleSlides = getVisibleSlides();
  const maxIndex = Math.max(0, slides.length - visibleSlides);

  if (currentBusinessIndex > maxIndex) {
    currentBusinessIndex = maxIndex;
  }

  const firstSlide = slides[0];
  if (!firstSlide) return;

  const slideStyle = window.getComputedStyle(firstSlide);
  const trackStyle = window.getComputedStyle(businessTrack);
  const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || 24);
  const slideWidth = firstSlide.getBoundingClientRect().width + gap;

  businessTrack.style.transform = `translateX(-${currentBusinessIndex * slideWidth}px)`;

  if (businessPrev) {
    businessPrev.disabled = currentBusinessIndex === 0;
  }

  if (businessNext) {
    businessNext.disabled = currentBusinessIndex >= maxIndex;
  }
}

if (businessPrev && businessNext && businessTrack) {
  businessPrev.addEventListener("click", () => {
    currentBusinessIndex -= 1;
    updateBusinessCarousel();
  });

  businessNext.addEventListener("click", () => {
    currentBusinessIndex += 1;
    updateBusinessCarousel();
  });

  window.addEventListener("load", updateBusinessCarousel);
}
