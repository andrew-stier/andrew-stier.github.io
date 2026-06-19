/* ============================================================================
   JOIN RENDER — turns window.JOIN (from join-data.js) into markup.
   Edit the data in join-data.js (or use edit.html), not this file.
   ========================================================================== */
window.renderJoin = function (id) {
  const el = document.getElementById(id);
  if (!el || !window.JOIN) return;
  const D = window.JOIN;
  let h = "";
  h += '<p class="section-tag tag-on-dark">' + (D.eyebrow || "") + "</p>";
  h += '<h2 class="section-h" id="students-h">' + (D.heading || "") + "</h2>";
  h += '<p class="recruit-lede">' + (D.lede || "") + "</p>";
  if (D.cards && D.cards.length) {
    h += '<div class="recruit-grid">' + D.cards.map(c =>
      '<div class="recruit-card"><h4>' + (c.title || "") + "</h4><p>" + (c.body || "") + "</p></div>"
    ).join("") + "</div>";
  }
  if (D.faqs && D.faqs.length) {
    h += D.faqs.map(f =>
      '<details class="recruit-faq"><summary>' + (f.q || "") + "</summary>" +
      '<div class="faq-body">' + (f.a || "") + "</div></details>"
    ).join("");
  }
  el.innerHTML = h;
};
