// padala.law — Application logic (v2 — unit-aware)
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

      // Audio placeholder
      html += `<div class="media-placeholder" id="audio-area">
        <div class="title">🎧 Audio study material</div>
        <div class="sub">Place .mp3 in /audio/${paper.id}/ to enable</div>
      </div>`;

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

    if (!state.searchMode) loadMedia(paper.id, state.unitIdx, state.topicIdx);
  }

  function loadMedia(pid, ui, ti) {
    const audioPath = `audio/${pid}/u${ui}_t${ti}.mp3`;
    fetch(audioPath, { method: "HEAD" }).then(r => {
      if (r.ok && document.getElementById("audio-area")) {
        document.getElementById("audio-area").innerHTML = `
          <div class="audio-section">
            <div class="cases-label">🎧 Audio</div>
            <div class="audio-card">
              <audio controls preload="none" src="${audioPath}" style="width:100%"></audio>
            </div>
          </div>`;
      }
    }).catch(() => {});

    const videoPath = `video/${pid}/u${ui}_t${ti}.mp4`;
    fetch(videoPath, { method: "HEAD" }).then(r => {
      if (r.ok && document.getElementById("video-area")) {
        document.getElementById("video-area").innerHTML = `
          <div class="video-section">
            <div class="cases-label">🎬 Video</div>
            <div class="video-card">
              <video controls preload="none" src="${videoPath}" style="width:100%"></video>
            </div>
          </div>`;
      }
    }).catch(() => {});
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
