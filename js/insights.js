function buildInsightLink(slug) {
  return `./insight-detail.html?slug=${encodeURIComponent(slug)}`;
}

function renderInsightsLanding() {
  const featuredMount = document.getElementById("featuredInsight");
  const latestMount = document.getElementById("latestInsights");
  const gridMount = document.getElementById("allInsightsGrid");

  if (!featuredMount || !latestMount || !gridMount || !window.insightsData) return;

  const featured = window.insightsData[0];
  const latestItems = window.insightsData.slice(1, 4);
  const gridItems = window.insightsData.slice(4);

  featuredMount.innerHTML = `
    <article class="featured-insight-card">
      <a class="featured-insight-image" href="${buildInsightLink(featured.slug)}" aria-label="${featured.title}">
        <img src="${featured.image}" alt="${featured.alt}" />
      </a>
      <div class="featured-insight-body">
        <p class="insight-meta">${featured.category} <span>•</span> ${featured.date}</p>
        <h2>
          <a href="${buildInsightLink(featured.slug)}">${featured.title}</a>
        </h2>
        <p>${featured.summary}</p>
        <a href="${buildInsightLink(featured.slug)}" class="text-link">Read the brief <span>→</span></a>
      </div>
    </article>
  `;

  latestMount.innerHTML = latestItems
    .map(
      (item) => `
      <article class="latest-insight-item">
        <a class="latest-insight-thumb" href="${buildInsightLink(item.slug)}" aria-label="${item.title}">
          <img src="${item.image}" alt="${item.alt}" />
        </a>
        <div class="latest-insight-body">
          <p class="insight-meta">${item.category}</p>
          <h3><a href="${buildInsightLink(item.slug)}">${item.title}</a></h3>
          <p>${item.summary}</p>
          <p class="latest-date">${item.date}</p>
        </div>
      </article>
    `
    )
    .join("");

  gridMount.innerHTML = gridItems
    .map(
      (item) => `
      <article class="insight-grid-card">
        <a class="insight-grid-image" href="${buildInsightLink(item.slug)}" aria-label="${item.title}">
          <img src="${item.image}" alt="${item.alt}" />
        </a>
        <div class="insight-grid-body">
          <p class="insight-meta">${item.category} <span>•</span> ${item.date}</p>
          <h3><a href="${buildInsightLink(item.slug)}">${item.title}</a></h3>
          <p>${item.summary}</p>
          <a href="${buildInsightLink(item.slug)}" class="text-link">Read the brief <span>→</span></a>
        </div>
      </article>
    `
    )
    .join("");
}

function renderInsightDetail() {
  const detailMount = document.getElementById("insightDetailMount");
  if (!detailMount || !window.insightsData) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const article = window.insightsData.find((item) => item.slug === slug);

  if (!article) {
    detailMount.innerHTML = `
      <section class="insight-detail-shell">
        <div class="insight-detail-copy">
          <p class="insight-meta">Insight not found</p>
          <h1>We couldn’t find that report.</h1>
          <p>Please return to the Insights page and choose another article.</p>
          <a href="./insights.html" class="btn btn-primary">Back to Insights</a>
        </div>
      </section>
    `;
    return;
  }

  detailMount.innerHTML = `
    <article class="insight-detail-shell">
      <div class="insight-detail-header">
        <p class="insight-meta">${article.category} <span>•</span> ${article.date}</p>
        <h1>${article.title}</h1>
        <p class="insight-detail-summary">${article.summary}</p>
      </div>

      <div class="insight-detail-hero">
        <img src="${article.image}" alt="${article.alt}" />
      </div>

      <div class="insight-detail-body">
        <section class="insight-detail-section">
          <h2>Overview</h2>
          <p>${article.intro}</p>
          <p>
            This article page has now been created and linked successfully.
            In the next step, we can replace this overview with the full-length report,
            including executive summary, key takeaways, charts, and the full article body.
          </p>
        </section>

        <section class="insight-detail-section insight-placeholder-box">
          <h2>Full report status</h2>
          <p>
            Placeholder page created successfully. The full report writing module
            will be added after the full Insights section is finalized.
          </p>
        </section>
      </div>
    </article>
  `;
}

function bindSubscribeForm() {
  const subscribeForm = document.getElementById("subscribeForm");
  if (!subscribeForm) return;

  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    const value = emailInput.value.trim();

    if (!value) return;

    alert(`Thank you. ${value} has been added to the Wentworth Hedge Fund briefing list.`);
    subscribeForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderInsightsLanding();
  renderInsightDetail();
  bindSubscribeForm();
});
