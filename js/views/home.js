/**
 * Zenska SMM Command Center - Home View Component
 * 1. Today's tasks (top 3-5 with quick complete action)
 * 2. This week's scheduled content (mini calendar strip)
 * 3. Quick analytics snapshot (follower growth arrow, engagement rate, top post this week)
 * 4. Account health indicators (accounts needing renewal)
 * 5. Trust-first marketplace stats
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
        
        <!-- Trust-first Mission Banner -->
        <div style="background: linear-gradient(135deg, #5C0A3F 0%, #3B0427 100%); color: #FFF; border-radius: var(--radius-lg); padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; box-shadow: var(--shadow-md);">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span class="badge" style="background: rgba(255,255,255,0.18); color: #FFF;">Philippines Authenticity Guarantee</span>
              <span style="font-size: 11px; opacity: 0.85;">2-5 Day Vendor Verification Active</span>
            </div>
            <h1 style="font-size: 20px; font-weight: 700; margin-bottom: 4px; letter-spacing: -0.01em;">Good morning, SMM Lead 👋</h1>
            <p style="font-size: 13px; opacity: 0.9; max-width: 650px;">
              Protecting 320+ verified sellers and 12,000+ authentic beauty products. 91% of online cosmetic complaints in PH stem from fake listings — here is today's certainty agenda.
            </p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-accent" onclick="window.App.openCreatePostModal()">
              <i data-lucide="plus-circle" style="width: 16px; height: 16px;"></i> Schedule Post
            </button>
            <button class="btn btn-secondary" style="background: rgba(255,255,255,0.12); color: #FFF; border-color: rgba(255,255,255,0.2);" onclick="window.App.openQuickAddModal()">
              <i data-lucide="check-square" style="width: 16px; height: 16px;"></i> New Task
            </button>
          </div>
        </div>

        <!-- 30-Second Scannable Daily KPI Cards -->
        <div class="kpi-scannable-strip">
          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Audience Community</span>
              <div class="kpi-icon-box"><i data-lucide="users" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.totalFollowers}</span>
              <span class="kpi-trend positive">
                <i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> ${analytics.summary.followerGrowthDelta}
              </span>
            </div>
            <span class="kpi-subtext">${analytics.summary.followerGrowthAbsolute} new shoppers this month</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Weekly Cross-Platform Reach</span>
              <div class="kpi-icon-box"><i data-lucide="eye" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.periodReach}</span>
              <span class="kpi-trend positive">
                <i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> ${analytics.summary.reachGrowthDelta}
              </span>
            </div>
            <span class="kpi-subtext">Highest growth on TikTok Ask Zena scans</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Avg. Engagement Rate</span>
              <div class="kpi-icon-box"><i data-lucide="heart" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.engagementRate}</span>
              <span class="kpi-trend positive">
                <i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> ${analytics.summary.engagementDelta}
              </span>
            </div>
            <span class="kpi-subtext">Benchmark: 2.1% in PH beauty sector</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Saves & Shares (Trust Intent)</span>
              <div class="kpi-icon-box"><i data-lucide="bookmark" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${analytics.summary.savesAndShares}</span>
              <span class="kpi-trend positive"><i data-lucide="check" style="width: 14px; height: 14px;"></i> Top Pillar</span>
            </div>
            <span class="kpi-subtext">Molecule & Authenticity teardowns</span>
          </div>
        </div>

        <!-- Account Health Warnings (if any) -->
        ${expiringAccounts.length > 0 ? `
          <div style="background: var(--color-warning-bg); border: 1px solid rgba(217,119,6,0.3); border-radius: var(--radius-md); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <i data-lucide="alert-triangle" style="width: 20px; height: 20px; color: var(--color-warning);"></i>
              <div>
                <strong style="color: #92400E; font-size: 13px;">OAuth Token Attention Needed:</strong>
                <span style="color: #B45309; font-size: 12px; margin-left: 6px;">
                  ${expiringAccounts.map(a => `${a.platform_label} (${a.token_expires_days}d left)`).join(", ")}
                </span>
              </div>
            </div>
            <button class="btn btn-secondary" style="font-size: 12px; padding: 4px 12px;" onclick="window.store.setView('accounts')">
              Manage Accounts & Reconnect
            </button>
          </div>
        ` : ''}

        <!-- 2-Column Split: Scheduled Mini Strip & Today's Tasks -->
        <div class="home-columns-split">
          
          <!-- Left: Scheduled Content Mini Strip -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <div class="panel-title">
                <i data-lucide="calendar" style="width: 16px; height: 16px; color: var(--color-primary);"></i>
                <span>This Week's Publishing Strip</span>
              </div>
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.store.setView('calendar')">
                Full Calendar <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
              </button>
            </div>
            <div class="panel-content">
              <div class="week-strip-container">
                ${days.map((d, idx) => {
                  const isToday = idx === todayIndex;
                  const dayDate = new Date();
                  dayDate.setDate(dayDate.getDate() - todayIndex + idx);
                  const dateStr = dayDate.toISOString().split("T")[0];
                  
                  // find posts scheduled on this date
                  const dayPosts = posts.filter(p => p.scheduled_at.startsWith(dateStr));

                  return `
                    <div class="week-strip-day ${isToday ? 'today' : ''}">
                      <div class="week-strip-day-header">
                        <span>${d}</span>
                        <span style="font-size: 10px;">${dayDate.getDate()}</span>
                      </div>
                      <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
                        ${dayPosts.length === 0 ? `
                          <div style="font-size: 10px; color: var(--text-dim); text-align: center; margin-top: 18px;">No drops</div>
                        ` : dayPosts.map(p => `
                          <div class="mini-post-pill" onclick="window.App.inspectPost('${p.id}')" title="${p.caption}">
                            <div style="display: flex; align-items: center; justify-content: space-between;">
                              <span class="badge tag-platform-${p.platforms[0]}" style="padding: 1px 4px; font-size: 9px;">${p.platforms[0].toUpperCase()}</span>
                              <span style="font-size: 9px; color: var(--text-dim);">${new Date(p.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <span style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                              ${p.content_pillar}
                            </span>
                          </div>
                        `).join("")}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>

              <!-- Content Pillar Legend -->
              <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-light); font-size: 11px; color: var(--text-muted);">
                <span style="font-weight: 600;">Active Pillars:</span>
                <span class="badge badge-primary">Authenticity & Trust</span>
                <span class="badge badge-neutral">Ingredient Education</span>
                <span class="badge badge-neutral">Ask Zena Demos</span>
                <span class="badge badge-neutral">Watch & Buy</span>
              </div>
            </div>
          </div>

          <!-- Right: Today's Tasks with Quick Complete -->
          <div class="dashboard-panel">
            <div class="panel-header">
              <div class="panel-title">
                <i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--color-primary);"></i>
                <span>Today's Priority Queue (${tasks.length})</span>
              </div>
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.store.setView('tasks')">
                Kanban Board <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
              </button>
            </div>
            <div class="panel-content">
              ${tasks.length === 0 ? `
                <div style="text-align: center; padding: 30px 10px; color: var(--text-muted);">
                  <i data-lucide="check-check" style="width: 36px; height: 36px; color: var(--color-verified); margin-bottom: 8px;"></i>
                  <p>All clear! No pending tasks for today.</p>
                </div>
              ` : tasks.map(task => `
                <div class="task-item-row ${task.status === 'done' ? 'task-completed' : ''}" id="task-row-${task.id}">
                  <input type="checkbox" class="task-checkbox" ${task.status === 'done' ? 'checked' : ''} 
                    onchange="window.HomeView.toggleTaskDone('${task.id}', this.checked)">
                  <div class="task-content-block">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
                      <span class="task-title-line">${task.title}</span>
                      <span class="badge ${task.priority === 'High' ? 'badge-danger' : 'badge-neutral'}">${task.priority}</span>
                    </div>
                    <div class="task-meta-row">
                      <span><i data-lucide="tag" style="width: 10px; height: 10px; display: inline;"></i> ${task.category}</span>
                      <span>•</span>
                      <span>Due ${task.due_date}</span>
                      ${task.checklist && task.checklist.length ? `
                        <span>•</span>
                        <span>${task.checklist.filter(c => c.completed).length}/${task.checklist.length} subtasks</span>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join("")}

              <button class="btn btn-secondary" style="width: 100%; margin-top: 8px; font-size: 12px;" onclick="window.App.openQuickAddTaskModal()">
                <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Quick-Add Priority Task
              </button>
            </div>
          </div>

        </div>

        <!-- Weekly Report Stakeholder Quick Card -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px 22px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: var(--color-accent); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="file-text" style="width: 22px; height: 22px;"></i>
            </div>
            <div>
              <div style="font-size: 14px; font-weight: 700; color: var(--text-main);">
                Weekly Executive Digest: Ready for ${metadata.stakeholder.name}
              </div>
              <div style="font-size: 12px; color: var(--text-muted);">
                ${metadata.stakeholder.title} • Consolidated follower growth, counterfeit inquiries turnaround & TikTok live metrics.
              </div>
            </div>
          </div>
          <button class="btn btn-primary" onclick="window.App.openReportModal()">
            <i data-lucide="printer" style="width: 14px; height: 14px;"></i> Preview & Export Report
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
