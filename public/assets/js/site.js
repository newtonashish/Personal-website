/*
 * PERSONAL WEBSITE SETTINGS
 * Replace the sample values below with your own verified details.
 * Do not publish private contact information unless you want it public.
 */
const SITE_CONFIG = {
  email: "", // e.g. "name@example.com"
  links: {
    orcid: "",       // e.g. "https://orcid.org/0000-0000-0000-0000"
    scholar: "",     // Google Scholar profile URL
    linkedin: ""     // LinkedIn profile URL
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");

  menuButton?.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("open", !expanded);
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-link]").forEach(anchor => {
    const key = anchor.dataset.link;
    const url = SITE_CONFIG.links[key];
    if (url) {
      anchor.href = url;
      anchor.hidden = false;
    } else {
      anchor.hidden = true;
    }
  });

  const emailText = document.getElementById("contact-email");
  const emailButton = document.getElementById("email-button");
  if (SITE_CONFIG.email) {
    emailText.textContent = SITE_CONFIG.email;
    emailButton.href = `mailto:${SITE_CONFIG.email}`;
  } else {
    emailButton.hidden = true;
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Render publication records if any have been entered in publications.js.
  const publicationList = document.getElementById("publication-list");
  const publicationNote = document.querySelector(".publication-note");
  const records = Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : [];
  if (publicationList && records.length) {
    publicationList.innerHTML = "";
    records.forEach(record => {
      const article = document.createElement("article");
      article.className = "publication-item";
      const year = document.createElement("span");
      year.className = "publication-year";
      year.textContent = record.year || "";
      const detail = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = record.title || "Untitled publication";
      const meta = document.createElement("p");
      meta.textContent = [record.authors, record.journal].filter(Boolean).join(" · ");
      detail.append(title, meta);
      if (record.doi) {
        const link = document.createElement("a");
        link.href = record.doi;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "↗";
        link.setAttribute("aria-label", "Open publication");
        article.append(year, detail, link);
      } else {
        article.append(year, detail, document.createElement("span"));
      }
      publicationList.append(article);
    });
    if (publicationNote) publicationNote.hidden = true;
  }
});
