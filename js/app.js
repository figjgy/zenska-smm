/**
 * Zenska SMM Command Center - Main Application Controller
 * Handles routing, modals, device simulation switcher, keyboard shortcuts, and report generation.
 */

window.App = {
  activeModal: null,

  init() {
    this.setupEventListeners();
    this.setupKeyboardShortcuts();
    this.applyDeviceMode(window.store.deviceMode);
    
    // Check dark mode
    if (window.store.darkMode) {
      document.documentElement.classList.add("dark-theme");
    }

    // Subscribe to store events
    window.store.on("view_changed", (view) => this.renderView(view));
    window.store.on("device_mode_changed", (mode) => this.applyDeviceMode(mode));
    window.store.on("notification", (notif) => this.toast(notif.message, notif.type));
    window.store.on("dark_mode_changed", (isDark) => {
      document.querySelectorAll(".dark-mode-icon").forEach(el => {
        el.setAttribute("data-lucide", isDark ? "sun" : "moon");
      });
      if (window.lucide) window.lucide.createIcons();
    });

    // Initial View
    this.renderView(window.store.currentView);
  },

  renderView(viewName) {
    const root = document.getElementById("view-root");
    if (!root) return;

    // Update active nav button
    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });
    document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-view") === viewName);
    });

    // Update View Title in Top Bar
    const titles = {
      home: { title: "Command Center", subtitle: "Zenska.ph Social Operations & Trust Radar" },
      tasks: { title: "Task & Project Board", subtitle: "Kanban workflow, subtasks & recurring reminders" },
      calendar: { title: "Content Calendar & Scheduling", subtitle: "Visual multi-platform publishing schedule" },
      analytics: { title: "Analytics & Executive Insights", subtitle: "Reach, engagement, and content pillar benchmarks" },
      inbox: { title: "Community & Authenticity Desk", subtitle: "Unified feedback, DMs & counterfeit inquiry response" },
      influencers: { title: "Influencer & KOL CRM", subtitle: "Dermatologists, creators & product seeding pipeline" },
      media: { title: "Media Asset Library", subtitle: "Reusable visual assets, packaging macros & reels" },
      accounts: { title: "Connected Channels", subtitle: "OAuth credentials, token health & permissions" },
      library: { title: "Hashtag & Caption Library", subtitle: "Saved hashtag bundles & high-converting templates" },
      campaigns: { title: "Campaign & Promo Calendar", subtitle: "Sales events, launches & brand co-marketing" },
      competitor: { title: "Competitor & Market Watch", subtitle: "Philippine beauty landscape & regulatory intelligence" }
    };

    const info = titles[viewName] || { title: "Command Center", subtitle: "Zenska.ph" };
    const titleEl = document.getElementById("header-view-title");
    const subEl = document.getElementById("header-view-subtitle");
    if (titleEl) titleEl.textContent = info.title;
    if (subEl) subEl.textContent = info.subtitle;

    // Render corresponding view
    switch (viewName) {
      case "home":
        window.HomeView.render(root);
        break;
      case "tasks":
        window.TasksView.render(root);
        break;
      case "calendar":
        window.CalendarView.render(root);
        break;
      case "analytics":
        window.AnalyticsView.render(root);
        break;
      case "inbox":
        window.InboxView.render(root);
        break;
      case "influencers":
        window.InfluencersView.render(root);
        break;
      case "media":
        window.MediaView.render(root);
        break;
      case "accounts":
        window.AccountsView.render(root);
        break;
      case "library":
        window.LibraryView.render(root);
        break;
      case "campaigns":
        window.CampaignsView.render(root);
        break;
      case "competitor":
        window.CompetitorView.render(root);
        break;
      default:
        window.HomeView.render(root);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  /* --- Device Simulator Control --- */
  setDeviceMode(mode) {
    window.store.setDeviceMode(mode);
  },

  applyDeviceMode(mode) {
    const frame = document.getElementById("simulator-frame");
    const container = document.getElementById("app-shell-container");
    if (!frame || !container) return;

    frame.className = `simulator-outer-frame mode-${mode}`;
    container.classList.remove("device-desktop", "device-tablet", "device-phone");

    if (mode === "desktop") {
      container.classList.add("device-desktop");
    } else if (mode === "tablet") {
      container.classList.add("device-tablet");
    } else if (mode === "phone") {
      container.classList.add("device-phone");
    }

    // Update buttons in simulator toolbar
    document.querySelectorAll(".sim-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });

    // Re-render current view to adapt charts/grid
    this.renderView(window.store.currentView);
  },

  /* --- Modals System --- */
  openModal(htmlContent, isWide = false) {
    this.closeModal();
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.id = "app-active-modal";
    backdrop.innerHTML = `
      <div class="modal-window ${isWide ? 'modal-wide' : ''}">
        ${htmlContent}
      </div>
    `;

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) this.closeModal();
    });

    document.body.appendChild(backdrop);
    this.activeModal = backdrop;
    if (window.lucide) window.lucide.createIcons();
  },

  closeModal() {
    if (this.activeModal) {
      this.activeModal.remove();
      this.activeModal = null;
    }
  },

  /* --- Quick Add Dialog --- */
  openQuickAddModal() {
    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Quick Add to Command Center</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; text-align: center; cursor: pointer; transition: all 0.15s ease;"
          onclick="window.App.closeModal(); window.App.openQuickAddTaskModal();"
          onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='var(--border-color)'">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-accent); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
            <i data-lucide="check-square" style="width: 20px; height: 20px;"></i>
          </div>
          <h4 style="font-weight: 700; font-size: 14px;">New Task</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Subtasks, priority, recurrence & category tag (Key: N)</p>
        </div>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 20px; text-align: center; cursor: pointer; transition: all 0.15s ease;"
          onclick="window.App.closeModal(); window.App.openCreatePostModal();"
          onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='var(--border-color)'">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-accent); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
            <i data-lucide="send" style="width: 20px; height: 20px;"></i>
          </div>
          <h4 style="font-weight: 700; font-size: 14px;">Schedule Content Post</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Multi-platform publishing with live mockup preview (Key: C)</p>
        </div>
      </div>
    `);
  },

  /* --- Create Task Modal --- */
  openQuickAddTaskModal() {
    const categories = window.store.state.metadata.taskCategories;
    const todayStr = new Date().toISOString().split("T")[0];

    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Create New Task</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div>
            <label style="font-size: 12px; font-weight: 600;">Task Title</label>
            <input type="text" id="task-title-input" placeholder="e.g. Schedule TikTok Live for TONYMOLY Ceramide"
              style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Description</label>
            <textarea id="task-desc-input" rows="2" placeholder="Provide operational context or requirements..."
              style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 8px; margin-top: 4px;"></textarea>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-size: 12px; font-weight: 600;">Category</label>
              <select id="task-cat-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                ${categories.map(c => `<option value="${c}">${c}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 600;">Priority</label>
              <select id="task-priority-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                <option value="High">High</option>
                <option value="Medium" selected>Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-size: 12px; font-weight: 600;">Due Date</label>
              <input type="date" id="task-due-input" value="${todayStr}" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 600;">Recurrence</label>
              <select id="task-recur-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                <option value="None">None</option>
                <option value="Weekly (Mondays)">Weekly (Mondays)</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.App.submitNewTask()">Save Task</button>
      </div>
    `);
  },

  submitNewTask() {
    const title = document.getElementById("task-title-input")?.value.trim();
    const desc = document.getElementById("task-desc-input")?.value.trim();
    const category = document.getElementById("task-cat-select")?.value;
    const priority = document.getElementById("task-priority-select")?.value;
    const due_date = document.getElementById("task-due-input")?.value;
    const recurrence_rule = document.getElementById("task-recur-select")?.value;

    if (!title) {
      alert("Please specify a task title.");
      return;
    }

    window.store.addTask({
      title,
      description: desc,
      category,
      priority,
      due_date,
      recurrence_rule,
      checklist: [
        { id: "c_" + Date.now(), text: "Draft initial deliverable", completed: false }
      ]
    });

    this.closeModal();
    this.renderView(window.store.currentView);
  },

  /* --- Task Details / Subtasks Checklist --- */
  openTaskDetail(taskId) {
    const task = window.store.getTasks().find(t => t.id === taskId);
    if (!task) return;

    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Task Inspector</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700;">${task.title}</h3>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                Category: <strong>${task.category}</strong> • Due: <strong>${task.due_date}</strong>
              </div>
            </div>
            <span class="badge ${task.priority === 'High' ? 'badge-danger' : 'badge-neutral'}">${task.priority}</span>
          </div>

          <div style="background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); font-size: 13px; color: var(--text-main);">
            ${task.description || 'No additional notes provided.'}
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
                Subtasks Checklist
              </label>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;" id="subtask-list-${task.id}">
              ${(task.checklist || []).map(item => `
                <div style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-sm);">
                  <input type="checkbox" class="task-checkbox" ${item.completed ? 'checked' : ''}
                    onchange="window.store.toggleSubtask('${task.id}', '${item.id}'); window.App.openTaskDetail('${task.id}')">
                  <span style="font-size: 13px; ${item.completed ? 'text-decoration: line-through; color: var(--text-dim);' : ''}">${item.text}</span>
                </div>
              `).join("")}
            </div>

            <!-- Add subtask line -->
            <div style="display: flex; gap: 6px; margin-top: 8px;">
              <input type="text" id="new-subtask-input" placeholder="Add checklist item..." style="flex: 1; height: 34px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; font-size: 12px;">
              <button class="btn btn-secondary" style="font-size: 12px;" onclick="window.App.addSubtask('${task.id}')">Add</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" style="color: var(--color-danger);" onclick="window.store.deleteTask('${task.id}'); window.App.closeModal(); window.App.renderView(window.store.currentView);">
          Delete Task
        </button>
        <button class="btn btn-primary" onclick="window.App.closeModal()">Done</button>
      </div>
    `);
  },

  addSubtask(taskId) {
    const input = document.getElementById("new-subtask-input");
    const text = input ? input.value.trim() : "";
    if (text) {
      const task = window.store.getTasks().find(t => t.id === taskId);
      if (task) {
        if (!task.checklist) task.checklist = [];
        task.checklist.push({ id: "c_" + Date.now(), text, completed: false });
        window.store.saveState();
        this.openTaskDetail(taskId);
      }
    }
  },

  /* --- Create Post Modal --- */
  openCreatePostModal(defaultDate = null, prefill = {}) {
    const pillars = window.store.state.metadata.contentPillars;
    const campaigns = window.store.getCampaigns();
    const media = window.store.getMedia();

    const dateVal = defaultDate || new Date().toISOString().slice(0, 16);

    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Schedule Content Post</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Platforms selector -->
          <div>
            <label style="font-size: 12px; font-weight: 600; margin-bottom: 6px; display: block;">Publishing Platforms</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="post-platform-checkboxes">
              ${["instagram", "tiktok", "facebook", "youtube", "x", "linkedin", "pinterest"].map(p => `
                <label style="display: flex; align-items: center; gap: 5px; font-size: 12px; padding: 4px 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); cursor: pointer;">
                  <input type="checkbox" value="${p}" ${p === 'instagram' || p === 'tiktok' ? 'checked' : ''}>
                  ${p.toUpperCase()}
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Content Pillar -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-size: 12px; font-weight: 600;">Content Pillar</label>
              <select id="post-pillar-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                ${pillars.map(pill => `<option value="${pill}" ${prefill.content_pillar === pill ? 'selected' : ''}>${pill}</option>`).join("")}
              </select>
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 600;">Linked Campaign</label>
              <select id="post-campaign-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                <option value="">None (Evergreen)</option>
                ${campaigns.map(c => `<option value="${c.id}">${c.name}</option>`).join("")}
              </select>
            </div>
          </div>

          <!-- Scheduled Date Time -->
          <div>
            <label style="font-size: 12px; font-weight: 600;">Scheduled Date & Time (Philippine Standard Time)</label>
            <input type="datetime-local" id="post-datetime-input" value="${dateVal.length === 10 ? dateVal + 'T18:00' : dateVal}"
              style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>

          <!-- Caption Copy -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label style="font-size: 12px; font-weight: 600;">Caption Copy & Hashtags</label>
              <span style="font-size: 11px; color: var(--color-primary); cursor: pointer;" onclick="window.store.setView('library'); window.App.closeModal();">
                Browse Caption Templates →
              </span>
            </div>
            <textarea id="post-caption-input" rows="4" placeholder="Write genuine, ingredient-literate copy or paste from library..."
              style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 10px; font-size: 13px; margin-top: 4px;">${prefill.caption || ''}</textarea>
          </div>

          <!-- Media Attachment -->
          <div>
            <label style="font-size: 12px; font-weight: 600;">Media Asset (Photo / Carousel / Reel)</label>
            <select id="post-media-select" style="width: 100%; height: 38px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
              ${media.map(m => `<option value="${m.id}" ${prefill.media_id === m.id ? 'selected' : ''}>${m.title} (${m.type})</option>`).join("")}
            </select>
          </div>

        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.App.submitNewPost()">Schedule Post</button>
      </div>
    `);
  },

  openCreatePostWithMedia(mediaId) {
    this.openCreatePostModal(null, { media_id: mediaId });
  },

  submitNewPost() {
    const caption = document.getElementById("post-caption-input")?.value.trim();
    const pillar = document.getElementById("post-pillar-select")?.value;
    const campaign_id = document.getElementById("post-campaign-select")?.value || null;
    const datetime = document.getElementById("post-datetime-input")?.value;
    const mediaId = document.getElementById("post-media-select")?.value;

    const checkedPlatforms = [];
    document.querySelectorAll("#post-platform-checkboxes input:checked").forEach(cb => {
      checkedPlatforms.push(cb.value);
    });

    if (!caption) {
      alert("Please provide post copy.");
      return;
    }

    const selectedMediaAsset = window.store.getMedia().find(m => m.id === mediaId);
    const mediaArray = selectedMediaAsset ? [{
      id: selectedMediaAsset.id,
      url: selectedMediaAsset.file_url,
      type: selectedMediaAsset.type,
      name: selectedMediaAsset.title
    }] : [];

    window.store.addPost({
      caption,
      platforms: checkedPlatforms.length ? checkedPlatforms : ["instagram"],
      content_pillar: pillar,
      campaign_id,
      scheduled_at: datetime ? `${datetime}:00+08:00` : new Date().toISOString(),
      media: mediaArray
    });

    this.closeModal();
    this.renderView(window.store.currentView);
  },

  /* --- Platform Mockup Preview Modal --- */
  openPlatformPreviewModal(postId) {
    const post = window.store.getPosts().find(p => p.id === postId);
    if (!post) return;

    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Multi-Platform Post Preview</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body" id="mockup-preview-container">
        ${window.PreviewComponent.renderMockup(post, post.platforms[0])}
      </div>
    `, true);
  },

  inspectPost(postId) {
    this.openPlatformPreviewModal(postId);
  },

  /* --- Executive Report Generation for Gaurav Shukla --- */
  openReportModal() {
    const metadata = window.store.state.metadata;
    const analytics = window.store.state.analytics;
    const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Executive Performance Report</h3>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary" onclick="window.print()">
            <i data-lucide="printer" style="width: 14px; height: 14px;"></i> Print / Save PDF
          </button>
          <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
        </div>
      </div>
      <div class="modal-body" style="background: #F3F4F6; padding: 24px;">
        
        <div class="report-paper-view" id="printable-report">
          
          <div class="report-header-banner">
            <div>
              <div class="report-brand-title">ZENSKA.PH</div>
              <div style="font-size: 13px; font-weight: 600; color: #4B5563; margin-top: 2px;">
                Social Media Marketing & Brand Trust Digest
              </div>
            </div>
            <div class="report-stakeholder-tag">
              <div><strong>Prepared for:</strong> ${metadata.stakeholder.name}</div>
              <div>${metadata.stakeholder.title}</div>
              <div>Report Date: ${currentDate}</div>
            </div>
          </div>

          <!-- Section 1: Executive Summary -->
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--color-primary); border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 10px;">
              1. EXECUTIVE SUMMARY & MARKET IMPACT
            </h4>
            <p style="font-size: 13px; line-height: 1.6; color: #374151;">
              In H1 2023, 91% of cosmetic counterfeit complaints in the Philippines involved unverified online sellers. Zenska's social channels this period achieved <strong>${analytics.summary.periodReach} impressions</strong> and <strong>${analytics.summary.totalFollowers} total community followers</strong> (+${analytics.summary.followerGrowthDelta} growth). High-saving educational content around <em>Molecule of the Month</em> and <em>Ask Zena</em> AI scans continues to position Zenska as the unquestioned authority on 100% genuine beauty.
            </p>
          </div>

          <!-- Section 2: Core KPI Matrix -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Total Followers</div>
              <div style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 2px;">${analytics.summary.totalFollowers}</div>
              <div style="font-size: 10px; color: #059669; font-weight: 600;">${analytics.summary.followerGrowthDelta} MoM</div>
            </div>
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Cross-Platform Reach</div>
              <div style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 2px;">${analytics.summary.periodReach}</div>
              <div style="font-size: 10px; color: #059669; font-weight: 600;">${analytics.summary.reachGrowthDelta}</div>
            </div>
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Avg. Engagement</div>
              <div style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 2px;">${analytics.summary.engagementRate}</div>
              <div style="font-size: 10px; color: #059669; font-weight: 600;">Benchmark: 2.1%</div>
            </div>
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; color: #6B7280; font-weight: 600;">Saves & Bookmarks</div>
              <div style="font-size: 18px; font-weight: 800; color: #111827; margin-top: 2px;">${analytics.summary.savesAndShares}</div>
              <div style="font-size: 10px; color: #059669; font-weight: 600;">Trust intent indicator</div>
            </div>
          </div>

          <!-- Section 3: Content Pillar Rankings -->
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--color-primary); border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 10px;">
              2. CONTENT PILLAR PERFORMANCE BREAKDOWN
            </h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: #F3F4F6; text-align: left; color: #4B5563;">
                  <th style="padding: 8px 10px;">Pillar</th>
                  <th style="padding: 8px 10px;">Avg. Eng. Rate</th>
                  <th style="padding: 8px 10px;">Saves</th>
                  <th style="padding: 8px 10px;">Strategic Driver</th>
                </tr>
              </thead>
              <tbody>
                ${analytics.pillarPerformance.map(p => `
                  <tr style="border-bottom: 1px solid #E5E7EB;">
                    <td style="padding: 8px 10px; font-weight: 700;">${p.pillar}</td>
                    <td style="padding: 8px 10px; color: #059669; font-weight: 600;">${p.avgEngagementRate}</td>
                    <td style="padding: 8px 10px;">${p.saves.toLocaleString()}</td>
                    <td style="padding: 8px 10px; color: #6B7280;">${p.notes}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Section 4: Authenticity & Trust Safety Actions -->
          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 14px; font-weight: 700; color: var(--color-primary); border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 10px;">
              3. COUNTERFEIT DEFENSE & SEEDING PROGRESS
            </h4>
            <div style="font-size: 12.5px; color: #374151; line-height: 1.5;">
              • <strong>Flagged Authenticity Turnaround:</strong> 100% of customer inquiries comparing Shopee/Lazada fake pricing were answered within 45 minutes using verified FDA CPR certificates.<br>
              • <strong>KOL Collaborations:</strong> Dr. Camille Valero, MD, approved clinical claims for Molecule series. Rhode Lip Tints seeded to Sofia Alcantara with 0 incident rate.<br>
              • <strong>Upcoming Retail Window:</strong> 10.10 Double Date Authentic Festival budget allocated (₱120k).
            </div>
          </div>

          <!-- Footer Signature Signoff -->
          <div style="border-top: 2px solid #E5E7EB; padding-top: 16px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #6B7280;">
            <div>Zenska.ph SMM Operations • Confidentially Prepared for Internal Review</div>
            <div>Authorized Signoff: ________________________</div>
          </div>

        </div>

      </div>
    `, true);
  },

  /* --- Keyboard Shortcuts --- */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Don't trigger when inside inputs or textareas
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        return;
      }

      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        this.openQuickAddTaskModal();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        this.openCreatePostModal();
      } else if (e.key === "?") {
        e.preventDefault();
        this.openShortcutsModal();
      } else if (e.key === "Escape") {
        this.closeModal();
      } else if (e.key === "/") {
        e.preventDefault();
        const searchInput = document.querySelector(".search-input-wrap input");
        if (searchInput) searchInput.focus();
      }
    });
  },

  openShortcutsModal() {
    this.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Power-User Keyboard Shortcuts</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-subtle); border-radius: 6px;">
            <span>Create New Task</span>
            <kbd style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">N</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-subtle); border-radius: 6px;">
            <span>Schedule New Content Post</span>
            <kbd style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">C</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-subtle); border-radius: 6px;">
            <span>Focus Global Search</span>
            <kbd style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">/</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-subtle); border-radius: 6px;">
            <span>Close Modal or Inspector</span>
            <kbd style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">Esc</kbd>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-subtle); border-radius: 6px;">
            <span>Show Shortcuts Cheat Sheet</span>
            <kbd style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px; font-weight: 700;">?</kbd>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="window.App.closeModal()">Got it</button>
      </div>
    `);
  },

  /* --- Toast Notifications --- */
  toast(message, type = "info") {
    let container = document.getElementById("app-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "app-toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    toast.innerHTML = `
      <i data-lucide="${type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-circle' : 'info'}" style="width: 18px; height: 18px; flex-shrink: 0;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-20px)";
      toast.style.transition = "all 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 4000);
  },

  setupEventListeners() {
    // Navigation items click handling
    document.querySelectorAll("[data-view]").forEach(el => {
      el.addEventListener("click", () => {
        const view = el.getAttribute("data-view");
        if (view) window.store.setView(view);
      });
    });

    // Dark mode button
    const darkBtn = document.getElementById("toggle-dark-mode-btn");
    if (darkBtn) {
      darkBtn.addEventListener("click", () => window.store.toggleDarkMode());
    }

    // Offline simulation button
    const offlineBtn = document.getElementById("toggle-offline-btn");
    if (offlineBtn) {
      offlineBtn.addEventListener("click", () => {
        window.store.toggleOffline();
        offlineBtn.style.color = window.store.isOffline ? "var(--color-warning)" : "#CBB4C4";
      });
    }

    // Reset data button
    const resetBtn = document.getElementById("reset-data-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset all Zenska demo tasks, posts, and metrics back to defaults?")) {
          window.store.resetToDefault();
          window.App.renderView(window.store.currentView);
        }
      });
    }
  }
};

// Bootstrap when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.App.init();
});
