const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const businessTrack = document.getElementById("businessTrack");
const businessPrev = document.getElementById("businessPrev");
const businessNext = document.getElementById("businessNext");

let currentBusinessIndex = 0;

function getVisibleBusinessCards() {
  if (window.innerWidth <= 860) return 1;
  if (window.innerWidth <= 1120) return 2;
  return 3;
}

function updateBusinessCarousel() {
  if (!businessTrack || !businessPrev || !businessNext) return;

  const cards = Array.from(businessTrack.querySelectorAll(".business-card"));
  const visibleCards = getVisibleBusinessCards();
  const maxIndex = Math.max(0, cards.length - visibleCards);

  if (currentBusinessIndex > maxIndex) {
    currentBusinessIndex = maxIndex;
  }

  const firstCard = cards[0];
  if (!firstCard) return;

  const gap = parseFloat(window.getComputedStyle(businessTrack).gap || "0");
  const cardWidth = firstCard.getBoundingClientRect().width;
  const offset = currentBusinessIndex * (cardWidth + gap);

  businessTrack.style.transform = `translateX(-${offset}px)`;

  businessPrev.disabled = currentBusinessIndex === 0;
  businessNext.disabled = currentBusinessIndex >= maxIndex;
}

if (businessPrev && businessNext) {
  businessPrev.addEventListener("click", () => {
    currentBusinessIndex = Math.max(0, currentBusinessIndex - getVisibleBusinessCards());
    updateBusinessCarousel();
  });

  businessNext.addEventListener("click", () => {
    const cards = businessTrack.querySelectorAll(".business-card");
    const maxIndex = Math.max(0, cards.length - getVisibleBusinessCards());

    currentBusinessIndex = Math.min(
      maxIndex,
      currentBusinessIndex + getVisibleBusinessCards()
    );

    updateBusinessCarousel();
  });
}

window.addEventListener("resize", updateBusinessCarousel);
window.addEventListener("load", updateBusinessCarousel);

/* =========================================================
   CAREERS ROLE DETAIL LINKS
========================================================= */

(function () {
  const careersPage = document.querySelector(".careers-page");
  const roleCards = document.querySelectorAll(".career-role-card");

  if (!careersPage || !roleCards.length) return;

  const careerRoleLinks = [
    {
      slug: "asset-management",
      label: "Asset Management Analyst"
    },
    {
      slug: "strategy-consulting",
      label: "Financial Strategy Consulting Associate"
    },
    {
      slug: "market-research",
      label: "Market Research Associate"
    },
    {
      slug: "japanese-equity",
      label: "Japanese Equity Investment Analyst"
    },
    {
      slug: "global-trade",
      label: "Global Trade Intelligence Analyst"
    },
    {
      slug: "institutional-travel",
      label: "Institutional Travel Coordinator"
    }
  ];

  roleCards.forEach((card, index) => {
    const role = careerRoleLinks[index];
    const body = card.querySelector(".career-role-body");
    const applyButton = card.querySelector(".career-apply-btn");

    if (!role || !body || !applyButton) return;

    const detailHref = `./career-detail.html?role=${role.slug}`;

    let actionRow = body.querySelector(".career-action-row");

    if (!actionRow) {
      actionRow = document.createElement("div");
      actionRow.className = "career-action-row";

      const detailButton = document.createElement("a");
      detailButton.className = "career-detail-btn";
      detailButton.href = detailHref;
      detailButton.textContent = "View role details";

      applyButton.parentNode.insertBefore(actionRow, applyButton);
      actionRow.appendChild(detailButton);
      actionRow.appendChild(applyButton);
    }

    card.classList.add("career-card-clickable");

    card.addEventListener("click", function (event) {
      if (event.target.closest("a")) return;
      window.location.href = detailHref;
    });
  });
})();
