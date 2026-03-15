// padala.law — Application logic (v2 — unit-aware)

// Audio map: property law English — keyed as "paperId:ui:ti"
const AUDIO_MAP = {
  // Unit 1: Concept of Property and General Principles
  "property:0:0": { en: "The_Invisible_Architecture_of_Property_Rights.m4a",    title: "The Invisible Architecture of Property Rights" },
  "property:0:1": { en: "Why_you_cannot_sell_a_ghost.m4a",                      title: "Why You Cannot Sell a Ghost" },
  "property:0:2": { en: "Can_Sellers_Legally_Control_Your_Property_.m4a",       title: "Can Sellers Legally Control Your Property?" },
  "property:0:3": { en: "Vested_interests_and_the_lis_pendens_trap.m4a",        title: "Vested Interests and the Lis Pendens Trap" },
  "property:0:4": { en: "Losing_your_home_to_hidden_lawsuits.m4a",              title: "Losing Your Home to Hidden Lawsuits" },
  "property:0:5": { en: "Section_35_and_the_Doctrine_of_Election.m4a",          title: "Section 35 and the Doctrine of Election" },
  // Unit 2: Doctrines, Covenants, and Sale
  "property:1:0": { en: "When_Property_Ownership_Lies_Become_Binding.m4a",      title: "When Property Ownership Lies Become Binding" },
  "property:1:1": { en: "How_restrictive_covenants_run_with_land.m4a",          title: "How Restrictive Covenants Run with Land" },
  "property:1:2": { en: "Section_54_Survival_Guide_for_Property_Buyers.m4a",    title: "Section 54 Survival Guide for Property Buyers" },
  // Unit 3: Mortgage, Lease, and Gift
  "property:2:0": { en: "Six_Legal_Types_of_Property_Mortgages.m4a",            title: "Six Legal Types of Property Mortgages" },
  "property:2:1": { en: "Why_Indian_Law_Rejects_Revocable_Gifts.m4a",           title: "Why Indian Law Rejects Revocable Gifts" },
  "property:2:2": { en: "The_Law_of_Leases_and_Licenses.m4a",                   title: "The Law of Leases and Licenses" },
  // Unit 4: Easements, Exchange, and Actionable Claims
  "property:3:0": { en: "Legal_rights_to_land_you_don_t_own.m4a",               title: "Legal Rights to Land You Don't Own" },
  "property:3:1": { en: "Selling_Actionable_Claims_Under_Section_130.m4a",      title: "Selling Actionable Claims Under Section 130" },
  "property:3:2": { en: "Section_118_Property_Exchanges_and_Restitution.m4a",   title: "Section 118 Property Exchanges and Restitution" },
  // Part C: Problem Questions
  "property:4:0": { en: "Can_you_sell_your_future_inheritance.m4a",             title: "Can You Sell Your Future Inheritance?" },
  "property:4:1": { en: "Legal_Limits_on_Restraining_Property_Sales.m4a",       title: "Legal Limits on Restraining Property Sales" },
  "property:4:2": { en: "Can_your_lender_claim_your_new_house.m4a",             title: "Can Your Lender Claim Your New House?" },
  "property:4:3": { en: "Why_Deathbed_Property_Gifts_Fail.m4a",                 title: "Why Deathbed Property Gifts Fail" },
  "property:4:4": { en: "How_a_hidden_lawsuit_takes_your_home.m4a",             title: "How a Hidden Lawsuit Takes Your Home" },
  "property:4:5": { en: "Invisible_Architecture_of_Indian_Property_Law.m4a",    title: "Invisible Architecture of Indian Property Law" },
};

const AUDIO_BASE = "https://github.com/krishnareddypadala/padala-law/releases/download/audio-property-en/";

// Infographic image map — keyed as "paperId:ui:ti"
const IMAGE_MAP = {
  // Unit 1: Concept of Property and General Principles
  "property:0:0": "q1_property_definition.png",
  "property:0:1": "q2_general_principles.png",
  "property:0:2": "q3_restraints_alienation.png",
  "property:0:3": "q4_vested_contingent.png",
  "property:0:4": "q5_lis_pendens.png",
  "property:0:5": "q6_election.png",
  // Unit 2: Doctrines, Covenants, and Sale
  "property:1:0": "q7_feeding_grant.png",
  "property:1:1": "q8_covenants.png",
  "property:1:2": "q9_sale.png",
  // Unit 3: Mortgage, Lease, and Gift
  "property:2:0": "q10_mortgage.png",
  "property:2:1": "q11_gift.png",
  "property:2:2": "q12_lease.png",
  // Unit 4: Easements, Exchange, and Actionable Claims
  "property:3:0": "q13_easements.png",
  "property:3:1": "q14_actionable_claims.png",
  "property:3:2": "q15_exchange.png",
  // Part C: Problem Questions
  "property:4:1": "p2_restraints_alienation.png",
  "property:4:2": "p3_mortgage_accession.png",
  "property:4:3": "p4_revocable_gifts.png",
  "property:4:4": "p5_lis_pendens.png",
  "property:4:5": "p6_easement_prescription.png",
};

const IMAGE_BASE = "https://github.com/krishnareddypadala/padala-law/releases/download/images-property-en/";

(function () {
  const $ = s => document.querySelector(s);

  // ── State ────────────────────────────────────────────────────────────────
  let state = {
    paper: "property",
    unitIdx: 0,
    topicIdx: 0,
    sidebar: true,
    search: "",
    searchResults: [],
    searchMode: false,
    completed: JSON.parse(localStorage.getItem("padala_done2") || "{}")
  };

  function save() { localStorage.setItem("padala_done2", JSON.stringify(state.completed)); }
  function getPaper() { return PAPERS.find(p => p.id === state.paper); }

  function getUnit() {
    const p = getPaper();
    return p && p.units[state.unitIdx];
  }
  function getTopic() {
    const u = getUnit();
    return u && u.topics[state.topicIdx];
  }
  function doneKey() { return state.paper + ":" + state.unitIdx + ":" + state.topicIdx; }

  function totalTopics(paperId) {
    const p = PAPERS.find(x => x.id === paperId);
    return p.units.reduce((n, u) => n + u.topics.length, 0);
  }
  function doneTopics(paperId) {
    return Object.keys(state.completed).filter(k => k.startsWith(paperId + ":") && state.completed[k]).length;
  }
  function pct(paperId) {
    const t = totalTopics(paperId); return t ? Math.round((doneTopics(paperId) / t) * 100) : 0;
  }

  // ── Formatting ───────────────────────────────────────────────────────────
  function fmt(raw) {
    if (!raw) return "";
    const paragraphs = raw.split("\n\n");
    return paragraphs.map(para => {
      // CASE LAW block
      if (para.startsWith("CASE LAW:")) {
        const body = para.slice("CASE LAW:".length).trim();
        return `<div class="case-block"><span class="case-label">Case Law</span>${esc(body)}</div>`;
      }
      // EXAM TIP block
      if (para.startsWith("EXAM TIP:")) {
        const body = para.slice("EXAM TIP:".length).trim();
        return `<div class="tip-block"><span class="tip-label">Exam Tip</span>${esc(body)}</div>`;
      }
      // Section sub-heading (short line, no period, likely a heading)
      if (para.length < 80 && !para.includes(".") && para === para.trimEnd() && para.match(/^[A-Z]/)) {
        return `<h3 class="content-subhead">${esc(para)}</h3>`;
      }
      // Numbered list items like "1. something"
      if (/^\d+\.\s/.test(para)) {
        const items = para.split(/\n(?=\d+\.\s)/);
        const lis = items.map(it => `<li>${esc(it.replace(/^\d+\.\s/, ""))}</li>`).join("");
        return `<ol class="content-list">${lis}</ol>`;
      }
      // Inline bold (**text**)
      let p = esc(para).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      return `<p>${p}</p>`;
    }).join("");
  }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ── Search ───────────────────────────────────────────────────────────────
  function doSearch(q) {
    state.search = q;
    if (!q || q.length < 2) {
      state.searchMode = false;
      state.searchResults = [];
      render(); return;
    }
    const ql = q.toLowerCase();
    const results = [];
    PAPERS.forEach(p => {
      p.units.forEach((u, ui) => {
        u.topics.forEach((t, ti) => {
          if (t.title.toLowerCase().includes(ql) || t.content.toLowerCase().includes(ql)) {
            results.push({ paperId: p.id, paperTitle: p.title, paperColor: p.color, unitIdx: ui, topicIdx: ti, topicTitle: t.title, snippet: getSnippet(t.content, ql) });
          }
        });
      });
    });
    state.searchMode = true;
    state.searchResults = results;
    render();
  }

  function getSnippet(content, q) {
    const idx = content.toLowerCase().indexOf(q);
    if (idx < 0) return content.slice(0, 120) + "…";
    const start = Math.max(0, idx - 60);
    const end = Math.min(content.length, idx + q.length + 80);
    return (start > 0 ? "…" : "") + content.slice(start, end) + (end < content.length ? "…" : "");
  }

  // ── Render ───────────────────────────────────────────────────────────────
  function render() {
    const paper = getPaper();
    const unit = getUnit();
    const topic = getTopic();
    const key = doneKey();
    const isDone = state.completed[key];

    let html = `<div class="app">`;

    // Mobile backdrop — closes sidebar when tapping outside
    if (state.sidebar) {
      html += `<div class="sidebar-backdrop" onclick="app.toggleSidebar()"></div>`;
    }

    // ── Sidebar ──────────────────────────────────────────────────────────
    html += `<div class="sidebar ${state.sidebar ? "" : "collapsed"}">`;
    html += `<div class="sidebar-header">
      <h1>padala.law</h1>
      <p>LLB Exam Study Guide</p>
    </div>`;
    html += `<div class="sidebar-nav">`;

    PAPERS.forEach(p => {
      const isActivePaper = p.id === state.paper;
      const prog = pct(p.id);
      html += `<button class="paper-btn ${isActivePaper ? "active" : ""}" style="border-left-color:${isActivePaper ? p.color : "transparent"}" onclick="app.selectPaper('${p.id}')">
        <div class="paper-icon" style="background:${p.color}">${p.icon}</div>
        <div style="flex:1;min-width:0">
          <div class="paper-title">${p.title}</div>
          <div class="paper-progress-bar"><div class="paper-progress-fill" style="width:${prog}%;background:${p.color}"></div></div>
        </div>
        <span class="pct-label">${prog}%</span>
      </button>`;

      if (isActivePaper) {
        p.units.forEach((u, ui) => {
          const isActiveUnit = ui === state.unitIdx;
          html += `<div class="unit-header ${isActiveUnit ? "active" : ""}" onclick="app.toggleUnit(${ui})" style="${isActiveUnit ? "color:" + p.color : ""}">
            <span class="unit-chevron">${isActiveUnit ? "▾" : "▸"}</span>
            ${u.title.replace(/^UNIT \d+:\s*/i, "").replace(/^PAPER [^:]+:\s*/i, "").slice(0, 50)}
          </div>`;
          if (isActiveUnit) {
            u.topics.forEach((t, ti) => {
              const doneT = state.completed[p.id + ":" + ui + ":" + ti];
              const tActive = ti === state.topicIdx;
              const label = t.title.replace(/^(Q\d+\.\s*|Problem \d+:\s*)/i, "");
              html += `<button class="topic-btn ${tActive ? "active" : ""}" style="${tActive ? "color:" + p.color : ""}" onclick="app.selectTopic(${ui},${ti})">
                <span class="check ${doneT ? "done" : ""}">${doneT ? "✓" : "○"}</span>
                <span class="topic-label">${label}</span>
              </button>`;
            });
          }
        });
      }
    });

    html += `</div>`;
    html += `<div class="sidebar-footer">
      <div>${doneTopics(paper.id)} / ${totalTopics(paper.id)} topics completed</div>
    </div>`;
    html += `</div>`;

    // ── Main ─────────────────────────────────────────────────────────────
    html += `<div class="main">`;

    // Topbar
    const allTopics = paper.units.flatMap((u, ui) => u.topics.map((t, ti) => ({ ui, ti })));
    const flatIdx = allTopics.findIndex(x => x.ui === state.unitIdx && x.ti === state.topicIdx);
    const prevFlat = allTopics[flatIdx - 1];
    const nextFlat = allTopics[flatIdx + 1];

    html += `<div class="topbar">
      <button class="menu-btn" onclick="app.toggleSidebar()">☰</button>
      <div class="search-box">
        <input type="text" placeholder="Search all topics, case laws, doctrines..." value="${state.search.replace(/"/g, "&quot;")}" oninput="app.search(this.value)" id="searchInput">
        ${state.searchMode ? `<button class="search-clear" onclick="app.clearSearch()">✕</button>` : ""}
      </div>
      <div class="nav-btns">
        ${prevFlat ? `<button class="nav-btn" onclick="app.selectTopic(${prevFlat.ui},${prevFlat.ti})">← Prev</button>` : ""}
        ${nextFlat ? `<button class="nav-btn" onclick="app.selectTopic(${nextFlat.ui},${nextFlat.ti})">Next →</button>` : ""}
      </div>
    </div>`;

    html += `<div class="content-scroll" id="contentScroll"><div class="content">`;

    if (state.searchMode) {
      // ── Search results view ─────────────────────────────────────────
      html += `<div class="search-header">
        <h2>Search results for <em>"${esc(state.search)}"</em></h2>
        <p>${state.searchResults.length} topic${state.searchResults.length !== 1 ? "s" : ""} found</p>
      </div>`;
      if (state.searchResults.length === 0) {
        html += `<div class="no-results">No topics matched your search. Try different keywords.</div>`;
      } else {
        state.searchResults.forEach(r => {
          html += `<div class="search-result-card" onclick="app.goToResult('${r.paperId}',${r.unitIdx},${r.topicIdx})">
            <div class="result-paper" style="color:${r.paperColor}">${r.paperTitle}</div>
            <div class="result-title">${esc(r.topicTitle)}</div>
            <div class="result-snippet">${esc(r.snippet)}</div>
          </div>`;
        });
      }
    } else if (!topic) {
      html += `<p>Select a topic from the sidebar.</p>`;
    } else {
      // ── Topic content view ──────────────────────────────────────────
      html += `<div class="content-tags">
        <span class="tag" style="background:${paper.color}18;color:${paper.color}">${paper.title}</span>
        <span class="tag unit-tag">${unit.title.replace(/^PAPER [^:]+:\s*/i, "")}</span>
      </div>`;

      html += `<h1>${esc(topic.title)}</h1>`;

      html += `<div class="content-body">${fmt(topic.content)}</div>`;

      // Infographic section
      const imageKey = state.paper + ":" + state.unitIdx + ":" + state.topicIdx;
      const imageFile = IMAGE_MAP[imageKey];
      if (imageFile) {
        const imageUrl = IMAGE_BASE + imageFile;
        html += `<div class="infographic-section">
          <div class="cases-label">🖼 Visual Summary — NotebookLM Infographic</div>
          <div class="infographic-card">
            <img src="${imageUrl}" alt="Infographic: ${esc(topic.title)}" class="infographic-img" loading="lazy" onclick="this.classList.toggle('infographic-fullscreen')">
            <p class="infographic-hint">Tap image to enlarge</p>
            <a class="download-btn" href="${imageUrl}" download="${imageFile}">⬇ Download Infographic</a>
          </div>
        </div>`;
      }

      // Audio section
      const audioKey = state.paper + ":" + state.unitIdx + ":" + state.topicIdx;
      const audioEntry = AUDIO_MAP[audioKey];
      if (audioEntry) {
        const audioUrl = AUDIO_BASE + audioEntry.en;
        html += `<div class="audio-section">
          <div class="cases-label">🎧 Audio Overview — English</div>
          <div class="audio-card-full">
            <div class="audio-title">${audioEntry.title}</div>
            <audio controls preload="none" src="${audioUrl}" style="width:100%;margin:8px 0 10px"></audio>
            <a class="download-btn" href="${audioUrl}" download="${audioEntry.en}">
              ⬇ Download MP3
            </a>
          </div>
        </div>`;
      } else {
        html += `<div class="media-placeholder">
          <div class="title">🎧 Audio coming soon</div>
          <div class="sub">Audio for this topic will be added shortly</div>
        </div>`;
      }

      // Video placeholder
      html += `<div class="media-placeholder" id="video-area">
        <div class="title">🎬 Video lecture</div>
        <div class="sub">Place .mp4 in /video/${paper.id}/ to enable</div>
      </div>`;

      // Footer
      html += `<div class="content-footer">
        <button class="done-btn ${isDone ? "completed" : ""}" onclick="app.toggleDone()">
          ${isDone ? "✓ Completed" : "Mark as done"}
        </button>
        <span class="topic-counter">Topic ${flatIdx + 1} of ${allTopics.length}</span>
      </div>`;
    }

    html += `</div></div>`; // content, content-scroll
    html += `</div>`; // main
    html += `</div>`; // app

    document.getElementById("app").innerHTML = html;
  }

  // ── Public API ────────────────────────────────────────────────────────────
  window.app = {
    selectPaper(id) {
      state.paper = id; state.unitIdx = 0; state.topicIdx = 0;
      state.searchMode = false; state.search = "";
      render();
    },
    toggleUnit(ui) {
      state.unitIdx = ui; state.topicIdx = 0; render();
    },
    selectTopic(ui, ti) {
      state.unitIdx = ui; state.topicIdx = ti;
      // Auto-close sidebar on mobile after selecting a topic
      if (window.innerWidth <= 768) state.sidebar = false;
      render();
      const el = document.getElementById("contentScroll");
      if (el) el.scrollTop = 0;
    },
    toggleSidebar() { state.sidebar = !state.sidebar; render(); },
    toggleDone() {
      const key = doneKey();
      state.completed[key] = !state.completed[key];
      save(); render();
    },
    search(q) { doSearch(q); },
    clearSearch() {
      state.search = ""; state.searchMode = false; state.searchResults = [];
      render();
    },
    goToResult(paperId, ui, ti) {
      state.paper = paperId; state.unitIdx = ui; state.topicIdx = ti;
      state.searchMode = false; state.search = "";
      render();
      const el = document.getElementById("contentScroll");
      if (el) el.scrollTop = 0;
    }
  };

  render();
})();
