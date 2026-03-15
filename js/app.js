// padala.law — Application logic
(function() {
  let state = {
    paper: "property",
    topic: 0,
    sidebar: true,
    search: "",
    completed: JSON.parse(localStorage.getItem("padala_done") || "{}")
  };

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  function save() { localStorage.setItem("padala_done", JSON.stringify(state.completed)); }

  function getPaper() { return PAPERS.find(p => p.id === state.paper); }

  function getProgress(pid) {
    const p = PAPERS.find(x => x.id === pid);
    const done = p.topics.filter((_, i) => state.completed[pid + "-" + i]).length;
    return Math.round((done / p.topics.length) * 100);
  }

  function fmt(text) {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  function render() {
    const paper = getPaper();
    const topic = paper.topics[state.topic];
    const key = state.paper + "-" + state.topic;

    let html = `<div class="app">`;

    // Sidebar
    html += `<div class="sidebar ${state.sidebar ? '' : 'collapsed'}">`;
    html += `<div class="sidebar-header"><h1>padala.law</h1><p>LLB Exam Study Guide</p></div>`;
    html += `<div class="sidebar-nav">`;

    PAPERS.forEach(p => {
      const active = p.id === state.paper;
      const prog = getProgress(p.id);
      html += `<button class="paper-btn ${active ? 'active' : ''}" style="border-left-color:${active ? p.color : 'transparent'}" onclick="app.selectPaper('${p.id}')">
        <div class="paper-icon" style="background:${p.color}">${p.icon}</div>
        <div style="flex:1;min-width:0">
          <div class="paper-title">${p.title}</div>
          <div class="paper-progress-bar"><div class="paper-progress-fill" style="width:${prog}%;background:${p.color}"></div></div>
        </div>
      </button>`;

      if (active) {
        p.topics.forEach((t, i) => {
          const done = state.completed[p.id + "-" + i];
          const tActive = state.topic === i;
          html += `<button class="topic-btn ${tActive ? 'active' : ''}" style="${tActive ? 'color:'+p.color : ''}" onclick="app.selectTopic(${i})">
            <span class="check ${done ? 'done' : ''}">${done ? '✓' : '○'}</span>
            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.title}</span>
          </button>`;
        });
      }
    });

    html += `</div>`;
    html += `<div class="sidebar-footer">Audio & video sections — upload materials to /audio and /video directories</div>`;
    html += `</div>`;

    // Main
    html += `<div class="main">`;

    // Topbar
    html += `<div class="topbar">
      <button class="menu-btn" onclick="app.toggleSidebar()">☰</button>
      <div class="search-box"><input type="text" placeholder="Search topics, case laws..." value="${state.search}" oninput="app.search(this.value)"></div>
      <div class="nav-btns">
        ${state.topic > 0 ? `<button class="nav-btn" onclick="app.selectTopic(${state.topic-1})">← Prev</button>` : ''}
        ${state.topic < paper.topics.length - 1 ? `<button class="nav-btn" onclick="app.selectTopic(${state.topic+1})">Next →</button>` : ''}
      </div>
    </div>`;

    // Content
    html += `<div class="content-scroll"><div class="content">`;

    // Tags
    html += `<div class="content-tags">
      <span class="tag" style="background:${paper.color}15;color:${paper.color}">${paper.title}</span>
      <span class="tag" style="background:#f0e6d2;color:#8b6914">${topic.type}</span>
    </div>`;

    // Title
    html += `<h1>${topic.title}</h1>`;

    // Body
    html += `<div class="content-body"><p>${fmt(topic.content)}</p></div>`;

    // Cases
    if (topic.cases && topic.cases.length > 0) {
      html += `<div class="cases-section"><div class="cases-label">Case laws</div>`;
      topic.cases.forEach(c => {
        html += `<div class="case-card" style="border-left-color:${paper.color}">
          <div class="case-name" style="color:${paper.color}">${c.name}</div>
          <div class="case-point">${c.point}</div>
        </div>`;
      });
      html += `</div>`;
    }

    // Audio placeholder
    html += `<div class="media-placeholder" id="audio-area">
      <div class="title">🎧 Audio study materials</div>
      <div class="sub">Place .mp3 files in /audio/${paper.id}/ directory</div>
    </div>`;

    // Video placeholder
    html += `<div class="media-placeholder" id="video-area">
      <div class="title">🎬 Video lectures</div>
      <div class="sub">Place .mp4 files in /video/${paper.id}/ directory</div>
    </div>`;

    // Footer
    const isDone = state.completed[key];
    html += `<div class="content-footer">
      <button class="done-btn ${isDone ? 'completed' : ''}" onclick="app.toggleDone()">
        ${isDone ? '✓ Completed' : 'Mark as done'}
      </button>
      <span class="topic-counter">${state.topic + 1} of ${paper.topics.length} topics</span>
    </div>`;

    html += `</div></div>`; // content, content-scroll
    html += `</div>`; // main
    html += `</div>`; // app

    document.getElementById("app").innerHTML = html;

    // Check for audio/video files (they'll 404 if not present, which is fine)
    loadMedia(paper.id, state.topic);
  }

  function loadMedia(paperId, topicIdx) {
    // Audio: look for /audio/{paperId}/topic_{topicIdx}.mp3
    const audioArea = document.getElementById("audio-area");
    const audioPath = `audio/${paperId}/topic_${topicIdx}.mp3`;
    
    fetch(audioPath, { method: 'HEAD' }).then(r => {
      if (r.ok) {
        audioArea.innerHTML = `<div class="audio-section">
          <div class="cases-label">🎧 Audio</div>
          <div class="audio-card">
            <span class="audio-label">Listen</span>
            <audio controls preload="none" src="${audioPath}" style="flex:1;height:36px"></audio>
          </div>
        </div>`;
      }
    }).catch(() => {});

    // Video: look for /video/{paperId}/topic_{topicIdx}.mp4
    const videoArea = document.getElementById("video-area");
    const videoPath = `video/${paperId}/topic_${topicIdx}.mp4`;
    
    fetch(videoPath, { method: 'HEAD' }).then(r => {
      if (r.ok) {
        videoArea.innerHTML = `<div class="video-section">
          <div class="cases-label">🎬 Video</div>
          <div class="video-card">
            <video controls preload="none" src="${videoPath}"></video>
          </div>
        </div>`;
      }
    }).catch(() => {});
  }

  // Public API
  window.app = {
    selectPaper(id) { state.paper = id; state.topic = 0; render(); },
    selectTopic(i) { state.topic = i; render(); $(".content-scroll").scrollTop = 0; },
    toggleSidebar() { state.sidebar = !state.sidebar; render(); },
    toggleDone() {
      const key = state.paper + "-" + state.topic;
      state.completed[key] = !state.completed[key];
      save(); render();
    },
    search(q) {
      state.search = q;
      // Simple search — highlight or filter could be added
    }
  };

  render();
})();
