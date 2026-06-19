/* ============================================================================
   JOIN DATA — the recruiting page. Edit here or via edit.html.
   ----------------------------------------------------------------------------
   eyebrow / heading / lede : top of the page
   cards : the three recruiting cards (title + HTML body)
   faqs  : expandable Q&A (q = summary, a = HTML answer)
   Rendering lives in join.js and never needs editing.
   ========================================================================== */

window.JOIN = {
  "eyebrow": "Working with me",
  "heading": "I'm actively recruiting students.",
  "lede": "If you're excited about cities, cognition, complex systems — or any two of the three — I'd like to hear from you. The strongest projects in the group sit at intersections most departments don't have a name for. That's the whole point.",
  "cards": [
    {
      "title": "Prospective PhD students",
      "body": "I take students through the <a href=\"https://example.edu/phd\">[Home Program]</a> PhD program. Apply by the December deadline. Mention me in your statement and email me a short note before you apply — it's not required, but it helps me read your file with context."
    },
    {
      "title": "Undergraduate researchers",
      "body": "I take on 1–2 undergrads each year. Time commitment is ~10 hrs/week; first semester is paid via the [REU/program name] or course credit. Coursework in stats, programming, or cognitive science helps but isn't strictly required."
    },
    {
      "title": "Postdocs &amp; visitors",
      "body": "Funded postdoc positions through NSF rotate — check back, or reach out if you have your own fellowship and our interests overlap. Visiting researchers are welcome at Chicago Booth for stays of a few weeks to a few months."
    }
  ],
  "faqs": [
    {
      "q": "How to email me so I read it carefully",
      "a": "<p>Put <code>[Prospective student]</code> in the subject line. In the email, please tell me:</p><ol><li>Which of the three research threads you want to work on, and which paper of mine you'd extend or push back on.</li><li>What you've built or analyzed before (code, datasets, experiments — whatever counts as \"made something\") — a link is fine.</li><li>Your CV, including coursework in stats / programming / neuroscience / urban studies as relevant.</li></ol><p>I read every message. I try to reply within two weeks; if I haven't, a polite nudge is welcome.</p>"
    },
    {
      "q": "What kind of student thrives here",
      "a": "<p>People who like sitting between fields and aren't allergic to math <em>or</em> to talking with humans about their experience of a place. You don't need to walk in fluent in all three of cognitive neuroscience, social psychology, and complex systems — but you should be willing to become functional in the two you didn't start with.</p>"
    },
    {
      "q": "How I mentor",
      "a": "<p>My first question to any mentee is what you're looking to get out of your research experience. If you want to improve your writing or learn a new paradigm such as fMRI, I'll look for projects that focus on those skills. For graduate students I take a more holistic approach with the aim of developing independent researchers quickly &mdash; that may require guidance tailored to each student (e.g., suggesting you pursue an industry internship one summer, or connecting you with a collaborator who knows something I don't). I strive to create an atmosphere where students feel comfortable discussing challenges in research and life outside of it.</p>"
    },
    {
      "q": "What about funding",
      "a": "<p>PhD students are funded through the home program plus my NSF grant. Summer support and conference travel are available. Undergraduates: see above. Postdocs: depends on the year — ask.</p>"
    }
  ]
};
