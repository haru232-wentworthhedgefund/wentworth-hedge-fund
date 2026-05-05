document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("[data-slider-track]");
  const prevBtn = document.querySelector("[data-slider-prev]");
  const nextBtn = document.querySelector("[data-slider-next]");

  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.children);
  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 860) return 1;
    if (window.innerWidth <= 1180) return 2;
    return 3;
  }

  function updateSlider() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    const firstCard = cards[0];
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  prevBtn.addEventListener("click", () => {
    const step = getVisibleCards();
    currentIndex = Math.max(0, currentIndex - step);
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    const step = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - getVisibleCards());
    currentIndex = Math.min(maxIndex, currentIndex + step);
    updateSlider();
  });

  window.addEventListener("resize", updateSlider);

  updateSlider();
});
