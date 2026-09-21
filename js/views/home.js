/**
 * Zenska SMM Command Center - Luxury Editorial Home View
 * High-End Beauty House Aesthetic
 */

window.HomeView = {
  render(container) {
    const tasks = window.store.getTasks().slice(0, 5);
    const posts = window.store.getPosts();
    const accounts = window.store.getAccounts();
    const expiringAccounts = accounts.filter(a => a.token_status !== "healthy");
    const analytics = window.store.state.analytics;
    const metadata = window.store.state.metadata;

    // Mini calendar strip for current week (Mon-Sun)
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

    container.innerHTML = `
      <div class="home-grid-layout">
        
        <!-- Luxury Editorial Silk Hero Banner -->
        <div class="luxury-hero-banner">
          <div style="position: relative; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(255,255,255,0.18); backdrop-filter: blur(10px); color: #FFF; border: 1px solid rgba(255,255,255,0.3); font-size: 11px;">
                ✦ PHILIPPINES TRUST-FIRST BEAUTY
              </span>
              <span class="badge" style="background: rgba(5, 150, 105, 0.25); color: #6EE7B7; border: 1px solid rgba(110, 231, 183, 0.35); font-size: 11px;">
                ● 2-5 Day Vendor Vetting Active
              </span>
            </div>

            <h1 class="hero-editorial-title">
              Certainty Over Hype.<br>
              <span style="font-family: var(--font-serif); font-style: italic; font-weight: 400; color: #FCEEF5;">Daily SMM Command Center</span>
            </h1>

            <p class="hero-editorial-desc">
              91% of online cosmetic complaints in the Philippines involve unverified counterfeit listings. 
              Zenska guarantees 100% genuine certainty across <strong>320+ verified sellers</strong> and <strong>12,000+ products</strong>.
            </p>

            <!-- Key Trust Metric Badges -->
            <div style="display: flex; gap: 16px; margin-top: 20px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 16px;">🛡️</span>
                <div style="font-size: 11px;">
                  <strong style="color: #FFF;">320+ Verified</strong><br>
                  <span style="opacity: 0.75;">Direct Authorizations</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 16px;">✨</span>
                <div style="font-size: 11px;">
                  <strong style="color: #FFF;">Ask Zena AI</strong><br>
                  <span style="opacity: 0.75;">60-Sec Skin Scan</span>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 16px;">⭐</span>
                <div style="font-size: 11px;">
                  <strong style="color: #FFF;">4.9★ Rating</strong><br>
                  <span style="opacity: 0.75;">Zero Fake Tolerance</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 2; min-width: 200px;">
            <button class="btn btn-accent" style="padding: 12px 20px; font-size: 13.5px;" onclick="window.App.openCreatePostModal()">
              <i data-lucide="calendar-plus" style="width: 17px; height: 17px;"></i> Schedule Content
            </button>
            <button class="btn btn-secondary" style="background: rgba(255,255,255,0.12); color: #FFF; border-color: rgba(255,255,255,0.25); padding: 12px 20px; font-size: 13.5px;" onclick="window.App.openQuickAddTaskModal()">
              <i data-lucide="check-square" style="width: 17px; height: 17px;"></i> Add Priority Task
            </button>
          </div>
        </div>

        <!-- 30-Second Scannable Daily KPI Cards -->
        <div class="kpi-scannable-strip">
          
          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Audience Community</span>
              <div class="kpi-icon-box">
                <i data-lucide="users" style="width: 20px; height: 20px;"></i>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.totalFollowers}</span>
              <span class="kpi-trend positive">
                <i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> ${analytics.summary.followerGrowthDelta}
              </span>
            </div>
            <span class="kpi-subtext">
              <strong>${analytics.summary.followerGrowthAbsolute}</strong> new verified shoppers this month
            </span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Cross-Platform Reach</span>
              <div class="kpi-icon-box">
                <i data-lucide="eye" style="width: 20px; height: 20px;"></i>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.periodReach}</span>
              <span class="kpi-trend positive">
                <i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> ${analytics.summary.reachGrowthDelta}
              </span>
            </div>
            <span class="kpi-subtext">Highest viral surge on TikTok Ask Zena scans</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Avg. Engagement</span>
              <div class="kpi-icon-box">
                <i data-lucide="heart" style="width: 20px; height: 20px;"></i>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.engagementRate}</span>
              <span class="kpi-trend positive">
                <i data-lucide="check" style="width: 14px; height: 14px;"></i> +0.65%
              </span>
            </div>
            <span class="kpi-subtext">PH E-Commerce beauty benchmark: <strong>2.1%</strong></span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Saves (Trust Proof)</span>
              <div class="kpi-icon-box">
                <i data-lucide="bookmark" style="width: 20px; height: 20px;"></i>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.savesAndShares}</span>
              <span class="kpi-trend positive">
                <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i> Top
              </span>
            </div>
            <span class="kpi-subtext">Saved ingredient routines & counterfeit teardowns</span>
          </div>

        </div>

        <!-- Account Health Attention Strip (if any) -->
        ${expiringAccounts.length > 0 ? `
          <div style="background: linear-gradient(90deg, #FFFBEB 0%, #FEF3C7 100%); border: 1px solid rgba(217,119,6,0.3); border-radius: var(--radius-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; box-shadow: 0 4px 12px rgba(217,119,6,0.08);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #FDE68A; color: #B45309; display: flex; align-items: center; justify-content: center;">
                <i data-lucide="alert-triangle" style="width: 18px; height: 18px;"></i>
              </div>
              <div>
                <strong style="color: #92400E; font-size: 13.5px;">Channel OAuth Attention Required</strong>
                <div style="color: #B45309; font-size: 12px; margin-top: 2px;">
                  ${expiringAccounts.map(a => `<strong>${a.platform_label}</strong> (${a.token_expires_days} days left)`).join(" • ")}
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" style="font-size: 12px; border-color: rgba(217,119,6,0.4);" onclick="window.store.setView('accounts')">
              Reconnect Channels →
            </button>
          </div>
        ` : ''}

        <!-- 2-Column Split: Scheduled Strip & Priority Queue -->
        <div class="home-columns-split">
          
          <!-- Left: Scheduled Content Mini Strip -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <div class="panel-title">
                <i data-lucide="calendar" style="width: 18px; height: 18px; color: var(--plum-600);"></i>
                <span>Weekly Content Publishing Strip</span>
              </div>
              <button class="btn btn-secondary" style="font-size: 12px; padding: 5px 12px;" onclick="window.store.setView('calendar')">
                Full Calendar <i data-lucide="arrow-up-right" style="width: 13px; height: 13px;"></i>
              </button>
            </div>

            <div class="panel-content">
              <div class="week-strip-container">
                ${days.map((d, idx) => {
                  const isToday = idx === todayIndex;
                  const dayDate = new Date();
                  dayDate.setDate(dayDate.getDate() - todayIndex + idx);
                  const dateStr = dayDate.toISOString().split("T")[0];
                  
                  const dayPosts = posts.filter(p => p.scheduled_at.startsWith(dateStr));

                  return `
                    <div class="week-strip-day ${isToday ? 'today' : ''}">
                      <div class="week-strip-day-header">
                        <span>${d}</span>
                        <span style="font-size: 11px; opacity: 0.9;">${dayDate.getDate()}</span>
                      </div>
                      <div style="display: flex; flex-direction: column; gap: 6px; flex: 1;">
                        ${dayPosts.length === 0 ? `
                          <div style="font-size: 10.5px; color: var(--text-light); text-align: center; margin-top: 24px;">No drops</div>
                        ` : dayPosts.map(p => `
                          <div class="mini-post-pill" onclick="window.App.inspectPost('${p.id}')" title="${p.caption}">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                              <span class="badge tag-platform-${p.platforms[0]}" style="padding: 1px 5px; font-size: 9px; font-weight: 700;">
                                ${p.platforms[0].toUpperCase()}
                              </span>
                              <span style="font-size: 9.5px; color: var(--text-muted);">
                                ${new Date(p.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <span style="font-weight: 700; font-size: 11px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">
                              ${p.content_pillar}
                            </span>
                          </div>
                        `).join("")}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>

              <!-- Editorial Pillar Badges -->
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border-subtle); font-size: 11.5px;">
                <span style="font-weight: 700; color: var(--text-muted); margin-right: 4px;">Pillars:</span>
                <span class="badge badge-primary">Authenticity & Trust</span>
                <span class="badge badge-neutral">Ingredient Education</span>
                <span class="badge badge-neutral">Ask Zena Demos</span>
                <span class="badge badge-neutral">Watch & Buy</span>
                <span class="badge badge-neutral">Product Spotlights</span>
              </div>
            </div>
          </div>

          <!-- Right: Today's Tasks with Quick Complete -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <div class="panel-title">
                <i data-lucide="check-circle-2" style="width: 18px; height: 18px; color: var(--status-verified);"></i>
                <span>Today's Priority Agenda (${tasks.length})</span>
              </div>
              <button class="btn btn-secondary" style="font-size: 12px; padding: 5px 12px;" onclick="window.store.setView('tasks')">
                Kanban Board <i data-lucide="arrow-up-right" style="width: 13px; height: 13px;"></i>
              </button>
            </div>

            <div class="panel-content">
              ${tasks.map(task => `
                <div class="task-item-row ${task.status === 'done' ? 'task-completed' : ''}" id="task-row-${task.id}">
                  <input type="checkbox" class="task-checkbox" ${task.status === 'done' ? 'checked' : ''} 
                    onchange="window.HomeView.toggleTaskDone('${task.id}', this.checked)">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                      <span class="task-title-line">${task.title}</span>
                      <span class="badge ${task.priority === 'High' ? 'badge-danger' : 'badge-neutral'}" style="flex-shrink: 0;">
                        ${task.priority}
                      </span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px; font-size: 11px; color: var(--text-muted);">
                      <span class="badge badge-neutral" style="font-size: 9.5px; padding: 1px 6px;">${task.category}</span>
                      <span>Due ${task.due_date}</span>
                      ${task.checklist && task.checklist.length ? `
                        <span>•</span>
                        <span>${task.checklist.filter(c => c.completed).length}/${task.checklist.length} subtasks</span>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join("")}

              <button class="btn btn-secondary" style="width: 100%; margin-top: 10px; font-size: 12.5px; padding: 10px;" onclick="window.App.openQuickAddTaskModal()">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Add Agenda Task
              </button>
            </div>
          </div>

        </div>

        <!-- Luxury Executive Report Banner for Gaurav Shukla -->
        <div style="background: linear-gradient(135deg, #FFFFFF 0%, #FCF5F9 100%); border: 1.5px solid var(--plum-100); border-radius: var(--radius-xl); padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; box-shadow: var(--shadow-card);">
          <div style="display: flex; align-items: center; gap: 18px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, var(--plum-700) 0%, var(--plum-500) 100%); color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(92, 10, 63, 0.25);">
              <i data-lucide="file-text" style="width: 24px; height: 24px;"></i>
            </div>
            <div>
              <div style="font-family: var(--font-serif); font-size: 17px; font-weight: 700; color: var(--plum-700);">
                Executive Social Performance Digest Ready
              </div>
              <div style="font-size: 12.5px; color: var(--text-body); margin-top: 3px;">
                Direct Stakeholder: <strong>${metadata.stakeholder.name}</strong> (${metadata.stakeholder.title}) • Ready for PDF or Print export.
              </div>
            </div>
          </div>

          <button class="btn btn-primary" style="padding: 12px 22px; font-size: 13.5px;" onclick="window.App.openReportModal()">
            <i data-lucide="printer" style="width: 16px; height: 16px;"></i> Review & Export Report
          </button>
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  toggleTaskDone(taskId, isChecked) {
    window.store.moveTaskStatus(taskId, isChecked ? "done" : "in_progress");
    const row = document.getElementById(`task-row-${taskId}`);
    if (row) {
      row.classList.toggle("task-completed", isChecked);
    }
  }
};
