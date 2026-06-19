/* ============================================================================
   PUBLICATIONS RENDER — turns window.PUBLICATIONS (from publications-data.js)
   into the page markup. You normally never edit this file; edit the data in
   publications-data.js (or use edit.html).
   ========================================================================== */
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/&(?![a-z#0-9]+;)/gi, "&amp;");
  }

  function pubItem(p) {
    const titleHtml = p.link
      ? '<a href="' + esc(p.link) + '">' + esc(p.title) + "</a>"
      : esc(p.title);

    const actions = [];
    if (p.pdf)  actions.push('<a class="chip" href="' + esc(p.pdf) + '">PDF</a>');
    if (p.link) actions.push('<a class="chip" href="' + esc(p.link) + '">' + esc(p.linkLabel || "Link") + "</a>");

    return (
      '<li class="pub">' +
        '<div class="pub-year">' + (p.year != null ? esc(p.year) : "") + "</div>" +
        '<div class="pub-body">' +
          '<p class="pub-title">' + titleHtml + "</p>" +
          (p.authors || p.venue
            ? '<p class="pub-meta">' + (p.authors || "") +
                (p.authors && p.venue ? " &middot; " : "") + (p.venue || "") + "</p>"
            : "") +
          (actions.length ? '<p class="pub-actions">' + actions.join("") + "</p>" : "") +
        "</div>" +
      "</li>"
    );
  }

  const byYearDesc = (a, b) => (b.year || 0) - (a.year || 0);

  function render(id, filter, limit) {
    const el = document.getElementById(id);
    if (!el) return;
    let list = (window.PUBLICATIONS || []).filter(filter).sort(byYearDesc);
    if (limit) list = list.slice(0, limit);
    el.innerHTML = list.map(pubItem).join("");
  }

  window.renderPublications = function (opts) {
    opts = opts || {};
    if (opts.selected)  render(opts.selected,  p => p.selected, opts.selectedLimit);
    if (opts.journal)   render(opts.journal,   p => (p.type || "journal") === "journal");
    if (opts.preprint)  render(opts.preprint,  p => p.type === "preprint");
    if (opts.all)       render(opts.all,       () => true);
  };
})();
