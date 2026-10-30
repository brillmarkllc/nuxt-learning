// Nuxt Course Notes — static docs shell. Reads markdown straight out of /topics
// (via fetch) and renders it client-side. No build step, no bundler, no server.
(function () {
  "use strict";

  var SITE_NAME = "Nuxt Course Notes";
  var LANG_ALIASES = { vue: "xml" }; // highlight.js has no "vue" grammar; xml
                                      // highlights SFC templates reasonably and
                                      // auto-injects embedded <script>/<style>.

  var home = window.SITE_HOME;
  var topics = window.SITE_TOPICS || [];
  var pages = [home].concat(topics); // flat reading order, used for prev/next

  var byId = {};
  pages.forEach(function (p) { byId[p.id] = p; });

  var sections = []; // [{num, title, items: [topic,...]}]
  var sectionByNum = {};
  topics.forEach(function (t) {
    var sec = sectionByNum[t.sectionNum];
    if (!sec) {
      sec = { num: t.sectionNum, title: t.sectionTitle, items: [] };
      sectionByNum[t.sectionNum] = sec;
      sections.push(sec);
    }
    sec.items.push(t);
  });

  var contentEl = document.getElementById("content");
  var pageNavEl = document.getElementById("page-nav");
  var sidebarSectionsEl = document.getElementById("sidebar-sections");
  var mainEl = document.getElementById("main");

  // ---------------------------------------------------------------- markdown

  marked.setOptions({ gfm: true, breaks: false });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderMarkdown(markdown) {
    contentEl.innerHTML = marked.parse(markdown);
    rewriteLinks(contentEl);
    highlightCode(contentEl);
  }

  function rewriteLinks(root) {
    root.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      var mdMatch = /^([^:/?#]+)\.md(#.*)?$/i.exec(href);
      if (mdMatch) {
        a.setAttribute("href", "#/" + mdMatch[1]);
      } else if (/^https?:\/\//i.test(href)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  function highlightCode(root) {
    root.querySelectorAll("pre code").forEach(function (block) {
      var langMatch = /language-([\w-]+)/.exec(block.className || "");
      var lang = langMatch && langMatch[1];
      if (lang && LANG_ALIASES[lang]) {
        block.classList.remove("language-" + lang);
        block.classList.add("language-" + LANG_ALIASES[lang]);
      }
      if (lang) block.closest("pre").setAttribute("data-lang", lang);
      hljs.highlightElement(block);
    });
  }

  // ------------------------------------------------------------------- nav

  function buildSidebar() {
    sidebarSectionsEl.innerHTML = "";
    sections.forEach(function (sec) {
      var wrap = document.createElement("div");
      wrap.className = "nav-section";
      wrap.dataset.section = sec.num;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "nav-section-btn";
      btn.setAttribute("aria-expanded", "true");
      btn.innerHTML =
        '<svg class="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">' +
        '<path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "<span>Section " + sec.num + ": " + escapeHtml(sec.title) + "</span>";
      btn.addEventListener("click", function () {
        var collapsed = wrap.classList.toggle("collapsed");
        btn.setAttribute("aria-expanded", String(!collapsed));
      });

      var list = document.createElement("ul");
      list.className = "nav-section-list";
      sec.items.forEach(function (t) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#/" + t.id;
        a.dataset.id = t.id;
        a.dataset.navLink = "true";
        a.textContent = t.title;
        li.appendChild(a);
        list.appendChild(li);
      });

      wrap.appendChild(btn);
      wrap.appendChild(list);
      sidebarSectionsEl.appendChild(wrap);
    });
  }

  function setActiveNav(id) {
    document.querySelectorAll(".sidebar a").forEach(function (a) {
      a.classList.toggle("active", a.dataset.id === id || (id === home.id && a.classList.contains("sidebar-home")));
    });
    var activeLink = sidebarSectionsEl.querySelector('a[data-id="' + id + '"]');
    if (activeLink) {
      var section = activeLink.closest(".nav-section");
      if (section) section.classList.remove("collapsed");
      activeLink.scrollIntoView({ block: "nearest" });
    }
  }

  function buildPageNav(id) {
    var idx = pages.findIndex(function (p) { return p.id === id; });
    pageNavEl.innerHTML = "";
    if (idx === -1) return;

    if (idx > 0) {
      pageNavEl.appendChild(navCard(pages[idx - 1], "prev", "Previous"));
    } else {
      pageNavEl.appendChild(document.createElement("span"));
    }
    if (idx < pages.length - 1) {
      pageNavEl.appendChild(navCard(pages[idx + 1], "next", "Next"));
    }
  }

  function navCard(page, cls, label) {
    var a = document.createElement("a");
    a.href = "#/" + page.id;
    a.className = cls;
    a.innerHTML =
      '<span class="nav-label">' + label + "</span>" +
      '<span class="nav-title">' + escapeHtml(page.title) + "</span>";
    return a;
  }

  // ---------------------------------------------------------------- router

  function currentId() {
    var hash = location.hash.replace(/^#\/?/, "");
    return hash || home.id;
  }

  function render() {
    var id = currentId();
    var page = byId[id];

    if (!page) {
      contentEl.innerHTML =
        "<h1>Page not found</h1><p>That lesson doesn't exist. " +
        '<a href="#/' + home.id + '">Back to the course index</a>.</p>';
      pageNavEl.innerHTML = "";
      document.title = "Not found · " + SITE_NAME;
      return;
    }

    document.title = page.title + " · " + SITE_NAME;
    contentEl.innerHTML = "<p>Loading…</p>";

    fetch("topics/" + page.file)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (text) {
        renderMarkdown(text);
        buildPageNav(id);
        setActiveNav(id);
        mainEl.scrollTop = 0;
        window.scrollTo(0, 0);
        closeMobileSidebar();
      })
      .catch(function (err) {
        contentEl.innerHTML =
          "<h1>Couldn't load this lesson</h1><p>" + escapeHtml(err.message) + "</p>";
      });
  }

  // --------------------------------------------------------------- sidebar

  function closeMobileSidebar() {
    document.body.classList.remove("sidebar-open");
    document.getElementById("sidebar-toggle").setAttribute("aria-expanded", "false");
  }

  document.getElementById("sidebar-toggle").addEventListener("click", function () {
    var open = document.body.classList.toggle("sidebar-open");
    this.setAttribute("aria-expanded", String(open));
  });
  document.getElementById("sidebar-backdrop").addEventListener("click", closeMobileSidebar);

  // ----------------------------------------------------------------- theme

  var themeToggle = document.getElementById("theme-toggle");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("markdown-light-css").disabled = theme === "dark";
    document.getElementById("markdown-dark-css").disabled = theme !== "dark";
    document.getElementById("hljs-light-css").disabled = theme === "dark";
    document.getElementById("hljs-dark-css").disabled = theme !== "dark";
    localStorage.setItem("theme", theme);
  }
  themeToggle.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // ---------------------------------------------------------------- search

  var searchInput = document.getElementById("search-input");
  var searchTimer = null;

  function clearSearch() {
    sidebarSectionsEl.querySelectorAll(".nav-section").forEach(function (sec) {
      sec.style.display = "";
    });
    sidebarSectionsEl.querySelectorAll("li").forEach(function (li) {
      li.style.display = "";
    });
    sidebarSectionsEl.querySelectorAll("a[data-id]").forEach(function (a) {
      a.innerHTML = escapeHtml(byId[a.dataset.id].title);
    });
    var empty = sidebarSectionsEl.querySelector(".nav-empty");
    if (empty) empty.remove();
  }

  function highlightMatch(text, query) {
    var safe = escapeHtml(text);
    var idx = safe.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return safe;
    return (
      safe.slice(0, idx) +
      "<mark class=\"search-hit\">" + safe.slice(idx, idx + query.length) + "</mark>" +
      safe.slice(idx + query.length)
    );
  }

  function runSearch(query) {
    if (!query) {
      clearSearch();
      return;
    }
    var q = query.toLowerCase();
    var anyVisible = false;

    sections.forEach(function (sec) {
      var secEl = sidebarSectionsEl.querySelector('.nav-section[data-section="' + sec.num + '"]');
      var sectionHasMatch = false;

      sec.items.forEach(function (t) {
        var link = secEl.querySelector('a[data-id="' + t.id + '"]');
        var li = link.closest("li");
        var hit = t.title.toLowerCase().indexOf(q) !== -1;
        li.style.display = hit ? "" : "none";
        link.innerHTML = hit ? highlightMatch(t.title, query) : escapeHtml(t.title);
        if (hit) sectionHasMatch = true;
      });

      secEl.style.display = sectionHasMatch ? "" : "none";
      if (sectionHasMatch) {
        secEl.classList.remove("collapsed");
        anyVisible = true;
      }
    });

    var empty = sidebarSectionsEl.querySelector(".nav-empty");
    if (!anyVisible) {
      if (!empty) {
        empty = document.createElement("div");
        empty.className = "nav-empty";
        empty.textContent = "No lessons match your search.";
        sidebarSectionsEl.appendChild(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  }

  searchInput.addEventListener("input", function () {
    var value = this.value.trim();
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { runSearch(value); }, 100);
  });

  // ------------------------------------------------------------------ boot

  buildSidebar();
  window.addEventListener("hashchange", render);
  render();
})();
