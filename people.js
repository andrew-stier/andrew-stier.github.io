/* ============================================================================
   PEOPLE RENDER — turns window.PEOPLE (from people-data.js) into markup.
   Edit the data in people-data.js (or use edit.html), not this file.
   ========================================================================== */
(function () {
  const STRIPES =
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<pattern id="stripes-a" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
    '<rect width="6" height="6" fill="#E5DECC"/><line x1="0" y1="0" x2="0" y2="6" stroke="#D8CFBE" stroke-width="3"/>' +
    "</pattern></defs></svg>";

  function memberPhoto(p) {
    if (p.photo) return '<img src="' + p.photo + '" alt="' + (p.name || "").replace(/"/g, "&quot;") + '" />';
    return '<svg viewBox="0 0 80 100" preserveAspectRatio="xMidYMid slice" role="presentation"><rect width="80" height="100" fill="url(#stripes-a)"/></svg>' +
           '<span class="photo-label">photo</span>';
  }

  function memberCard(p) {
    return (
      '<li class="person">' +
        '<figure class="person-photo" aria-hidden="true">' + memberPhoto(p) + "</figure>" +
        '<p class="person-name-sm">' + (p.name || "") + "</p>" +
        (p.role ? '<p class="person-role-sm">' + p.role + "</p>" : "") +
        (p.blurb ? '<p class="person-blurb">' + p.blurb + "</p>" : "") +
      "</li>"
    );
  }

  // The "." in the PI name is a hidden door to the editor.
  function nameWithLoginDot(name) {
    return name.replace(".", '<span class="login-dot" role="button" tabindex="0" aria-label="Edit site" title="">.</span>');
  }

  window.renderPeople = function (id) {
    const el = document.getElementById(id);
    if (!el || !window.PEOPLE) return;
    const D = window.PEOPLE;
    let h = STRIPES;

    h += '<div class="people-pi">' +
      '<figure class="person-photo person-photo-lg">' +
        (D.pi.photo ? '<img src="' + D.pi.photo + '" alt="' + D.pi.name + '" />' : "") +
      "</figure>" +
      '<div class="person-body">' +
        '<h3 class="person-name">' + nameWithLoginDot(D.pi.name) + "</h3>" +
        '<p class="person-role">' + D.pi.role + "</p>" +
        '<p class="person-bio">' + D.pi.bio + "</p>" +
        '<p class="person-links">' +
          (D.pi.links || []).map((l, i) =>
            (i ? '<span class="sep">·</span>' : "") + '<a href="' + l.href + '">' + l.label + "</a>"
          ).join("") +
        "</p>" +
      "</div>" +
    "</div>";

    if (D.members && D.members.length) {
      h += '<div class="people-group"><p class="people-grouph">' + (D.membersHeading || "Lab members") + "</p>" +
        '<ul class="people-grid">' + D.members.map(memberCard).join("") + "</ul></div>";
    }

    if (D.undergrads && D.undergrads.length) {
      h += '<div class="people-group"><p class="people-grouph">' + (D.undergradsHeading || "Undergraduate researchers") + "</p>" +
        '<ul class="people-inline">' + D.undergrads.map(s => "<li>" + s + "</li>").join("") + "</ul></div>";
    }

    if ((D.alumni && D.alumni.length)) {
      h += '<div class="people-group"><p class="people-grouph">' + (D.alumniHeading || "Alumni") + "</p>";
      h += '<ul class="people-inline">' + D.alumni.map(s => "<li>" + s + "</li>").join("") + "</ul>";
      if (D.alumniNote) h += '<p class="people-empty">' + D.alumniNote + "</p>";
      h += "</div>";
    }

    el.innerHTML = h;
  };
})();
