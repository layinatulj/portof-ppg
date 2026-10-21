document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const storedTheme = localStorage.getItem("ppg-portfolio-theme");
  if (storedTheme === "dark") root.dataset.theme = "dark";

  function updateThemeButtons() {
    const dark = root.dataset.theme === "dark";
    themeButtons.forEach(button => {
      const icon = button.querySelector(".theme-icon");
      if (icon) icon.textContent = dark ? "☀" : "☾";
      button.setAttribute("aria-label", dark ? "Aktifkan mode terang" : "Aktifkan mode gelap");
    });
  }
  updateThemeButtons();
  themeButtons.forEach(button => button.addEventListener("click", () => {
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    localStorage.setItem("ppg-portfolio-theme", dark ? "dark" : "light");
    updateThemeButtons();
  }));

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const opened = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(opened));
      navToggle.setAttribute("aria-label", opened ? "Tutup menu navigasi" : "Buka menu navigasi");
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add("is-visible"));

  // Lightbox: click image to enlarge.
  const lightbox = document.querySelector(".lightbox") || createLightbox();
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  function openLightbox(img) {
    if (!img) return;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt || "Foto dokumentasi";
    lightboxCaption.textContent = img.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-lightbox]").forEach(button => {
    button.addEventListener("click", () => openLightbox(button.querySelector("img") || button));
  });
  document.querySelectorAll("[data-lightbox-trigger]").forEach(button => {
    button.addEventListener("click", () => openLightbox(button.closest(".activity-card")?.querySelector("img")));
  });
  lightbox.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  // Per-class photo sliders. Each gallery navigates independently.
  document.querySelectorAll("[data-photo-gallery]").forEach(gallery => {
    const slides = [...gallery.querySelectorAll(".photo-slide")];
    const dots = [...gallery.querySelectorAll("[data-slide-dot]")];
    const current = gallery.querySelector("[data-slide-current]");
    let index = Math.max(0, slides.findIndex(slide => slide.classList.contains("is-active")));
    function showSlide(nextIndex) {
      if (!slides.length) return;
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
        slide.hidden = i !== index;
        slide.setAttribute("aria-hidden", String(i !== index));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", String(i === index));
      });
      if (current) current.textContent = String(index + 1);
    }
    gallery.querySelector("[data-slide-prev]")?.addEventListener("click", () => showSlide(index - 1));
    gallery.querySelector("[data-slide-next]")?.addEventListener("click", () => showSlide(index + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
    showSlide(index);
  });

  // Filter teaching activities and innovation cards.
  document.querySelectorAll("[data-filter]").forEach(select => {
    select.addEventListener("change", () => {
      const type = select.dataset.filter;
      const value = select.value;
      const cards = type === "teaching"
        ? document.querySelectorAll(".activity-card[data-category]")
        : document.querySelectorAll(".innovation-card[data-category]");
      cards.forEach(card => {
        card.hidden = value !== "all" && card.dataset.category !== value;
        if (!card.hidden) card.classList.add("is-visible");
      });
    });
  });

  // Search media cards.
  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    const cards = [...document.querySelectorAll("[data-search-container] .media-card")];
    const empty = document.querySelector("[data-empty-state]");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach(card => {
        const match = (card.dataset.search || card.textContent).toLowerCase().includes(query);
        card.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  }

  // Inline demo iframe. Replace placeholder URLs in HTML with actual public deployment URLs.
  document.querySelectorAll("[data-demo-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".media-card");
      const wrap = card?.querySelector(".demo-frame-wrap");
      const frame = card?.querySelector("[data-demo-frame]");
      if (!wrap || !frame) return;
      const isHidden = wrap.hidden;
      wrap.hidden = !isHidden;
      if (isHidden && !frame.src) frame.src = frame.dataset.src;
      button.textContent = isHidden ? "Tutup Live Demo" : "▶ Live Demo";
      if (isHidden) wrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
  document.querySelectorAll("[data-demo-close]").forEach(button => {
    button.addEventListener("click", () => {
      const wrap = button.closest(".demo-frame-wrap");
      if (wrap) {
        wrap.hidden = true;
        const card = wrap.closest(".media-card");
        const toggle = card?.querySelector("[data-demo-toggle]");
        if (toggle) toggle.textContent = "▶ Live Demo";
      }
    });
  });
});

function createLightbox() {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("aria-hidden", "true");
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Pratinjau gambar");
  box.innerHTML = '<button class="lightbox-close" aria-label="Tutup pratinjau">&times;</button><img src="" alt=""><p class="lightbox-caption"></p>';
  document.body.appendChild(box);
  return box;
}
