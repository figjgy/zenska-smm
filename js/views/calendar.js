/**
 * Zenska SMM Command Center - Content Calendar & Scheduling View
 * Features:
 * - Month, Week, Day visual calendar with platform color coding
 * - Campaign & Promo Layer overlay (11.11, Payday, Rhode launch, co-marketing)
 * - HTML5 Drag & Drop post rescheduling to new dates
 * - Multi-platform filter
 * - Split-view support (Calendar + Preview / Inspector panel)
 * - Bulk Post Scheduler queue
 */

window.CalendarView = {
  currentViewType: "month", // 'month' | 'week' | 'day'
  selectedPlatform: "all",
  activeYear: 2026,
  activeMonth: 8, // September (0-indexed)
  selectedPostId: null,

  render(container) {
    const posts = window.store.getPosts();
    const campaigns = window.store.getCampaigns();

    // Filter by platform if set
    const filteredPosts = this.selectedPlatform === "all"
      ? posts
      : posts.filter(p => p.platforms.includes(this.selectedPlatform));

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    container.innerHTML = `
      <div class="calendar-layout-container">
        
        <!-- Top Calendar Controls -->
        <div class="calendar-header-controls">
          <div class="cal-nav-group">
            <h2>${monthNames[this.activeMonth]} ${this.activeYear}</h2>
            <div style="display: flex; gap: 4px;">
              <button class="btn btn-secondary btn-icon" onclick="window.CalendarView.prevMonth()" title="Previous Month">
                <i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i>
              </button>
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.CalendarView.resetToToday()">
                Today
              </button>
              <button class="btn btn-secondary btn-icon" onclick="window.CalendarView.nextMonth()" title="Next Month">
                <i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i>
              </button>
            </div>
          </div>

          <!-- Platform Filter & View Switcher -->
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 12px; color: var(--text-muted);">Platform:</span>
              <select style="height: 34px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); padding: 0 10px; font-size: 12px; color: var(--text-main);"
                onchange="window.CalendarView.setPlatformFilter(this.value)">
                <option value="all" ${this.selectedPlatform === 'all' ? 'selected' : ''}>All Platforms</option>
                <option value="instagram" ${this.selectedPlatform === 'instagram' ? 'selected' : ''}>Instagram</option>
                <option value="tiktok" ${this.selectedPlatform === 'tiktok' ? 'selected' : ''}>TikTok</option>
                <option value="facebook" ${this.selectedPlatform === 'facebook' ? 'selected' : ''}>Facebook</option>
                <option value="youtube" ${this.selectedPlatform === 'youtube' ? 'selected' : ''}>YouTube</option>
                <option value="x" ${this.selectedPlatform === 'x' ? 'selected' : ''}>X (Twitter)</option>
                <option value="linkedin" ${this.selectedPlatform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                <option value="pinterest" ${this.selectedPlatform === 'pinterest' ? 'selected' : ''}>Pinterest</option>
              </select>
            </div>

            <div class="view-mode-toggle">
              <button class="view-mode-btn ${this.currentViewType === 'month' ? 'active' : ''}" onclick="window.CalendarView.setViewType('month')">Month</button>
              <button class="view-mode-btn ${this.currentViewType === 'week' ? 'active' : ''}" onclick="window.CalendarView.setViewType('week')">Week</button>
              <button class="view-mode-btn ${this.currentViewType === 'day' ? 'active' : ''}" onclick="window.CalendarView.setViewType('day')">Day</button>
            </div>

            <button class="btn btn-secondary" onclick="window.CalendarView.openBulkScheduleModal()">
              <i data-lucide="layers" style="width: 14px; height: 14px;"></i> Bulk Schedule
            </button>

            <button class="btn btn-primary" onclick="window.App.openCreatePostModal()">
              <i data-lucide="plus" style="width: 14px; height: 14px;"></i> New Post
            </button>
          </div>
        </div>

        <!-- Campaign & Promo Overlay Strip -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 11px; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">
              Active Campaign Windows:
            </span>
            ${campaigns.filter(c => c.status === 'Live' || c.status === 'Confirmed').map(c => `
              <span class="campaign-overlay-badge" title="${c.goals}">
                <i data-lucide="sparkles" style="width: 10px; height: 10px;"></i>
                ${c.name} (${c.start_date.slice(5)} to ${c.end_date.slice(5)})
              </span>
            `).join("")}
          </div>
          <button class="btn btn-secondary" style="font-size: 11px; padding: 3px 8px;" onclick="window.store.setView('campaigns')">
            Manage Campaigns
          </button>
        </div>

        <!-- Split View Layout: Calendar on Left, Post Preview / Inspector on Right -->
        <div class="tablet-split-layout" style="display: grid; grid-template-columns: ${this.selectedPostId ? '1fr 360px' : '1fr'}; gap: 16px;">
          
          <!-- Calendar Grid Area -->
          <div id="calendar-grid-wrapper">
            ${this.renderCalendarGrid(filteredPosts, campaigns)}
          </div>

          <!-- Inspector / Preview Drawer (shown when post selected) -->
          ${this.selectedPostId ? `
            <div id="calendar-inspector-pane">
              ${this.renderInspectorPane()}
            </div>
          ` : ''}

        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  renderCalendarGrid(posts, campaigns) {
    if (this.currentViewType === "month") {
      return this.renderMonthGrid(posts, campaigns);
    } else if (this.currentViewType === "week") {
      return this.renderWeekGrid(posts);
    } else {
      return this.renderDayGrid(posts);
    }
  },

  renderMonthGrid(posts, campaigns) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const firstDay = new Date(this.activeYear, this.activeMonth, 1).getDay();
    const daysInMonth = new Date(this.activeYear, this.activeMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.activeYear, this.activeMonth, 0).getDate();

    let cellsHtml = "";

    // Day headers
    days.forEach(d => {
      cellsHtml += `<div class="cal-day-header-cell">${d}</div>`;
    });

    // Previous month filler days
    for (let i = firstDay - 1; i >= 0; i--) {
      cellsHtml += `<div class="cal-cell other-month"><div class="cal-cell-date-num">${prevMonthDays - i}</div></div>`;
    }

    // Days in current month
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === this.activeYear && today.getMonth() === this.activeMonth;

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && today.getDate() === day;
      const dateStr = `${this.activeYear}-${String(this.activeMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const dayPosts = posts.filter(p => p.scheduled_at.startsWith(dateStr));
      
      cellsHtml += `
        <div class="cal-cell ${isToday ? 'today' : ''}" data-date="${dateStr}"
          ondragover="window.CalendarView.onDragOver(event)"
          ondrop="window.CalendarView.onDrop(event, '${dateStr}')"
          onclick="window.CalendarView.onCellClick('${dateStr}')">
          <div class="cal-cell-date-num">${day}</div>
          
          <div style="display: flex; flex-direction: column; gap: 4px; overflow-y: auto; max-height: 110px;">
            ${dayPosts.map(p => `
              <div class="cal-post-card" draggable="true" id="cal-post-${p.id}"
                ondragstart="window.CalendarView.onDragStart(event, '${p.id}')"
                onclick="event.stopPropagation(); window.CalendarView.selectPost('${p.id}')">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
                  <span class="badge tag-platform-${p.platforms[0]}" style="font-size: 8.5px; padding: 1px 4px;">
                    ${p.platforms[0].toUpperCase()}
                  </span>
                  <span style="font-size: 9px; color: var(--text-dim);">
                    ${new Date(p.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span class="cal-post-card-title">${p.caption.slice(0, 30)}...</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Trailing days to fill 7x5 or 7x6
    const totalCellsSoFar = firstDay + daysInMonth;
    const remaining = (7 - (totalCellsSoFar % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      cellsHtml += `<div class="cal-cell other-month"><div class="cal-cell-date-num">${j}</div></div>`;
    }

    return `<div class="calendar-grid-month">${cellsHtml}</div>`;
  },

  renderWeekGrid(posts) {
    return `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="margin-bottom: 12px; font-size: 15px; font-weight: 700;">Week View (7 Days)</h3>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;">
          ${[0,1,2,3,4,5,6].map(offset => {
            const d = new Date(this.activeYear, this.activeMonth, 20 + offset);
            const dateStr = d.toISOString().split("T")[0];
            const dayPosts = posts.filter(p => p.scheduled_at.startsWith(dateStr));
            return `
              <div style="border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 10px; min-height: 380px; background: var(--bg-subtle);">
                <div style="font-weight: 700; font-size: 12px; margin-bottom: 8px;">${d.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' })}</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${dayPosts.map(p => `
                    <div class="cal-post-card" onclick="window.CalendarView.selectPost('${p.id}')">
                      <span class="badge tag-platform-${p.platforms[0]}">${p.platforms[0]}</span>
                      <div style="font-size: 11px; margin-top: 4px;">${p.caption.slice(0, 45)}...</div>
                    </div>
                  `).join("")}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  },

  renderDayGrid(posts) {
    const todayStr = "2026-09-21";
    const dayPosts = posts.filter(p => p.scheduled_at.startsWith(todayStr));
    return `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="margin-bottom: 8px; font-size: 16px; font-weight: 700;">Day View: September 21, 2026</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 20px;">Hourly Publishing Schedule</p>
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${dayPosts.map(p => `
            <div style="display: flex; gap: 16px; padding: 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-subtle);">
              <div style="font-weight: 700; color: var(--color-primary); min-width: 80px;">
                ${new Date(p.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style="flex: 1;">
                <div style="display: flex; gap: 6px; margin-bottom: 6px;">
                  ${p.platforms.map(pl => `<span class="badge tag-platform-${pl}">${pl}</span>`).join("")}
                  <span class="badge badge-primary">${p.content_pillar}</span>
                </div>
                <div style="font-size: 13px; font-weight: 500;">${p.caption}</div>
              </div>
              <button class="btn btn-secondary" style="font-size: 11px;" onclick="window.CalendarView.selectPost('${p.id}')">
                Preview
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  renderInspectorPane() {
    const post = window.store.getPosts().find(p => p.id === this.selectedPostId);
    if (!post) return "";

    return `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-sm); position: sticky; top: 88px;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
          <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main);">Post Inspector</h4>
          <button class="btn-icon" style="width: 24px; height: 24px;" onclick="window.CalendarView.closeInspector()">
            <i data-lucide="x" style="width: 14px; height: 14px;"></i>
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${post.platforms.map(pl => `<span class="badge tag-platform-${pl}">${pl.toUpperCase()}</span>`).join("")}
            <span class="badge badge-primary">${post.content_pillar}</span>
            <span class="badge badge-verified">${post.status.toUpperCase()}</span>
          </div>

          <div style="font-size: 11px; color: var(--text-muted);">
            Scheduled for: <strong>${new Date(post.scheduled_at).toLocaleString()}</strong>
          </div>

          ${post.media && post.media.length > 0 ? `
            <div style="border-radius: var(--radius-md); overflow: hidden; height: 160px; background: #000; position: relative;">
              <img src="${post.media[0].url}" style="width: 100%; height: 100%; object-fit: cover;">
              <span class="badge" style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #FFF;">
                ${post.media.length} media item(s)
              </span>
            </div>
          ` : ''}

          <div style="background: var(--bg-subtle); padding: 10px; border-radius: var(--radius-sm); font-size: 12px; line-height: 1.4; max-height: 150px; overflow-y: auto;">
            ${post.caption}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 6px;">
          <button class="btn btn-primary" style="flex: 1; font-size: 12px;" onclick="window.App.openPlatformPreviewModal('${post.id}')">
            <i data-lucide="smartphone" style="width: 14px; height: 14px;"></i> Mockup Preview
          </button>
          <button class="btn btn-secondary" style="font-size: 12px;" onclick="window.CalendarView.deletePost('${post.id}')" title="Delete post">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: var(--color-danger);"></i>
          </button>
        </div>
      </div>
    `;
  },

  selectPost(postId) {
    this.selectedPostId = postId;
    this.render(document.getElementById("view-root"));
  },

  closeInspector() {
    this.selectedPostId = null;
    this.render(document.getElementById("view-root"));
  },

  deletePost(postId) {
    if (confirm("Remove this post from publishing calendar?")) {
      window.store.deletePost(postId);
      this.selectedPostId = null;
      this.render(document.getElementById("view-root"));
    }
  },

  prevMonth() {
    this.activeMonth--;
    if (this.activeMonth < 0) {
      this.activeMonth = 11;
      this.activeYear--;
    }
    this.render(document.getElementById("view-root"));
  },

  nextMonth() {
    this.activeMonth++;
    if (this.activeMonth > 11) {
      this.activeMonth = 0;
      this.activeYear++;
    }
    this.render(document.getElementById("view-root"));
  },

  resetToToday() {
    this.activeYear = 2026;
    this.activeMonth = 8;
    this.render(document.getElementById("view-root"));
  },

  setViewType(type) {
    this.currentViewType = type;
    this.render(document.getElementById("view-root"));
  },

  setPlatformFilter(p) {
    this.selectedPlatform = p;
    this.render(document.getElementById("view-root"));
  },

  onCellClick(dateStr) {
    window.App.openCreatePostModal(dateStr);
  },

  /* Drag & Drop */
  onDragStart(e, postId) {
    e.dataTransfer.setData("text/plain", postId);
  },

  onDragOver(e) {
    e.preventDefault();
  },

  onDrop(e, newDateStr) {
    e.preventDefault();
    const postId = e.dataTransfer.getData("text/plain");
    if (postId) {
      const newDateTimeIso = `${newDateStr}T12:00:00+08:00`;
      window.store.reschedulePost(postId, newDateTimeIso);
      this.render(document.getElementById("view-root"));
    }
  },

  openBulkScheduleModal() {
    window.App.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Bulk Post Scheduler Queue</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
          Batch-queue posts across multiple platforms (e.g. for upcoming 10.10 or Molecule of the Month campaign drops).
        </p>
        <div style="border: 2px dashed var(--border-color); border-radius: var(--radius-md); padding: 24px; text-align: center; margin-bottom: 16px; background: var(--bg-subtle);">
          <i data-lucide="upload-cloud" style="width: 32px; height: 32px; color: var(--color-primary); margin-bottom: 8px;"></i>
          <div style="font-weight: 600; font-size: 13px;">Drag CSV / Media bundle here</div>
          <div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">Supports ZIP archives, CSV post manifests, or batch image drops</div>
          <input type="file" multiple style="display: none;" id="bulk-file-input" onchange="window.CalendarView.handleBulkUploadSim()">
          <button class="btn btn-secondary" style="margin-top: 12px; font-size: 12px;" onclick="document.getElementById('bulk-file-input').click()">
            Browse Files
          </button>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px;">
          <div style="font-weight: 700; font-size: 12px; margin-bottom: 6px;">Pre-set Campaign Distribution:</div>
          <div style="font-size: 12px; color: var(--text-muted);">
            • 4x Weekly Niacinamide Education Carousels (IG & Pinterest)<br>
            • 6x Ask Zena 60-Sec Skin Scan Reels (TikTok & IG)<br>
            • 2x Watch & Buy Live Event Announcements (All Platforms)
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.CalendarView.queueSampleBatch()">
          Queue Sample Batch (3 Posts)
        </button>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  },

  handleBulkUploadSim() {
    this.queueSampleBatch();
  },

  queueSampleBatch() {
    window.store.addPost({
      caption: "Batch Drop 1: How to layer Soul Apothecary Niacinamide with Centella Soothing Gel. Dermatologist tips for glowing PH skin! #MoleculeOfTheMonth #Zenska",
      platforms: ["instagram", "tiktok"],
      content_pillar: "Ingredient Education",
      scheduled_at: "2026-09-27T14:00:00+08:00",
      media: [{ id: "m-03", url: "https://images.unsplash.com/photo-1608248597359-05244510b65a?auto=format&fit=crop&w=900&q=80", type: "photo", name: "niacinamide.jpg" }]
    });
    window.store.addPost({
      caption: "Batch Drop 2: Real unboxing of Rhode Peptide Tint in Toast! Watch the tamper-proof purple hologram seal pop. 100% genuine guaranteed on Zenska.ph. #RhodePH #ZenskaAuthentic",
      platforms: ["tiktok"],
      content_pillar: "Authenticity & Trust",
      scheduled_at: "2026-09-28T18:00:00+08:00",
      media: [{ id: "m-05", url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80", type: "photo", name: "rhode.jpg" }]
    });
    window.App.closeModal();
    this.render(document.getElementById("view-root"));
  }
};
