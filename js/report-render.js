const REPORT_FALLBACK_IMAGE =
  "https://images.pexels.com/photos/33165659/pexels-photo-33165659.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1000&q=85";

function safeImage(src) {
  return src || REPORT_FALLBACK_IMAGE;
}

function renderReportPage() {
  const reportId = document.body.dataset.reportId;
  const report = window.reportPages && window.reportPages[reportId];

  const hero = document.getElementById("reportHero");
  const heroContent = document.getElementById("reportHeroContent");
  const articleMount = document.getElementById("reportArticleMount");

  if (!hero || !heroContent || !articleMount) return;

  if (!report) {
    articleMount.innerHTML = `
      <div class="report-container">
        <div class="report-missing">
          <h1>Report not found.</h1>
          <p>Please return to the Insights page and select another report.</p>
          <a href="./insights.html" class="report-back-link">← Back to Insights</a>
        </div>
      </div>
    `;
    return;
  }

  document.title = `${report.title} | Wentworth Hedge Fund`;

  hero.style.backgroundImage = `
    linear-gradient(90deg, rgba(9,24,52,0.78) 0%, rgba(9,24,52,0.62) 42%, rgba(9,24,52,0.20) 100%),
    url("${safeImage(report.image)}")
  `;

  heroContent.innerHTML = `
    <p class="report-eyebrow">${report.eyebrow}</p>
    <h1>${report.title}</h1>
    <p class="report-summary">${report.summary}</p>
    <div class="report-meta-row">
      <span>${report.date}</span>
      <span>${report.readTime}</span>
      <span>Wentworth Hedge Fund Research</span>
    </div>
  `;

  const takeawaysHTML = report.takeaways
    .map((item) => `<li>${item}</li>`)
    .join("");

  const sectionsHTML = report.sections
    .map((section) => {
      const paragraphs = section.paragraphs
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("");

      return `
        <section class="report-section-block">
          <h2>${section.heading}</h2>
          ${paragraphs}
        </section>
      `;
    })
    .join("");

  articleMount.innerHTML = `
    <div class="report-container">
      <aside class="report-side-panel">
        <div class="report-side-card">
          <h3>Key Takeaways</h3>
          <ul>${takeawaysHTML}</ul>
        </div>

        <div class="report-side-card">
          <h3>Coverage</h3>
          <p>${report.eyebrow}</p>
          <p>${report.date}</p>
          <p>${report.readTime}</p>
        </div>

        <div class="report-side-card">
          <h3>Important Notice</h3>
          <p>
            This report is provided for informational purposes only and does not
            constitute investment advice, an offer to sell, or a solicitation to buy
            any security or financial product.
          </p>
        </div>
      </aside>

      <article class="report-article">
        ${sectionsHTML}

        <section class="report-section-block report-disclaimer">
          <h2>Research Disclaimer</h2>
          <p>
            The views expressed in this report are based on publicly available information,
            market observations, and scenario analysis at the time of publication. They are
            subject to change without notice. No representation is made that any forecast,
            scenario, or market view will be realized.
          </p>
        </section>

        <div class="report-bottom-nav">
          <a href="./insights.html">← Back to Insights</a>
          <a href="../index.html">Back to Home →</a>
        </div>
      </article>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderReportPage);
