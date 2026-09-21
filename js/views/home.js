/**
 * Zenska SMM Command Center - Dribbble Bento Editorial Home View
 * Inspired by Intelly pastel bento cards with Zenska.ph authentic beauty palette
 */

window.HomeView = {
  render(container) {
    const tasks = window.store.getTasks().slice(0, 4);
    const posts = window.store.getPosts();
    const analytics = window.store.state.analytics;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; width: 100%;">
        
        <!-- Top Search Pill Bar & User Actions -->
        <div class="center-top-bar">
          <div class="search-pill-container">
            <i data-lucide="search" style="width: 16px; height: 16px; color: var(--text-muted);"></i>
            <input type="text" placeholder="Search tasks, campaigns, creators..." oninput="window.store.setSearchQuery(this.value)">
            <span style="font-size: 11px; color: var(--text-light); font-weight: 600;">In:</span>
            <div class="filter-pills-row">
              <span class="pill-filter-chip active" onclick="window.store.setView('home')">All</span>
              <span class="pill-filter-chip" onclick="window.store.setView('inbox')">Authenticity</span>
              <span class="pill-filter-chip" onclick="window.store.setView('calendar')">Ingredient Ed</span>
              <span class="pill-filter-chip" onclick="window.store.setView('media')">Ask Zena</span>
              <span class="pill-filter-chip" onclick="window.store.setView('campaigns')">Watch & Buy</span>
            </div>
          </div>

          <div class="top-user-actions">
            <button class="circle-action-btn" onclick="window.App.openQuickAddModal()" title="Quick Add Task or Post">
              <i data-lucide="plus" style="width: 16px; height: 16px;"></i>
            </button>
            <button class="circle-action-btn" onclick="window.store.setView('inbox')" title="Notifications / Flagged Complaints">
              <i data-lucide="bell" style="width: 16px; height: 16px;"></i>
              <span class="notification-dot"></span>
            </button>
            <button class="circle-action-btn" onclick="window.store.toggleDarkMode()" title="Toggle Theme">
              <i data-lucide="moon" style="width: 16px; height: 16px;"></i>
            </button>
            <div style="width: 38px; height: 38px; border-radius: 50%; overflow: hidden; border: 2px solid var(--zenska-plum); margin-left: 4px;">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        </div>

        <!-- Greeting Headline -->
        <div class="dashboard-greeting-block">
          <div style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="background: rgba(92,10,63,0.1); color: var(--deep-magenta); font-size: 11px; font-weight: 700; padding: 2px 9px; border-radius: var(--radius-pill); border: 1px solid rgba(92,10,63,0.15);">
                  CURATED · AUTHENTIC · FAST SHIP
                </span>
                <span style="font-size: 11px; color: var(--text-muted);">Philippine Beauty & Wellness Hub</span>
              </div>
              <h1 class="greeting-title">Good morning, SMM Lead</h1>
              <p class="greeting-subtitle">
                Zenska wishes you an authentic and productive day. Protecting <strong>320+ verified sellers</strong> and <strong>12,000+ authenticated products</strong> with zero fake tolerance. You have 4 priority tasks and 2 scheduled drops today.
              </p>
            </div>
            <a href="javascript:void(0)" onclick="window.store.setView('analytics')" style="font-size: 12px; font-weight: 700; color: var(--deep-magenta); text-decoration: underline; white-space: nowrap; margin-bottom: 4px;">
              Show all metrics ...
            </a>
          </div>
        </div>

        <!-- THE 4 BENTO METRIC CARDS (2x2) -->
        <div class="bento-grid-container">
          
          <!-- Bento 1: Warm Sand (Community & Shoppers) -->
          <div class="bento-card bento-sand">
            <!-- Decorative Floating Plus/Cross Shape -->
            <svg class="bento-shape-bg" width="90" height="90" viewBox="0 0 100 100" fill="#E5C77A">
              <rect x="35" y="0" width="30" height="100" rx="15" />
              <rect x="0" y="35" width="100" height="30" rx="15" />
            </svg>

            <div class="bento-card-title">Community & Followers:</div>
            
            <div class="bento-metric-row">
              <div class="bento-metric-item">
                <span class="bento-metric-num">84.5K</span>
                <span class="bento-metric-lbl">INSTAGRAM</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">142K</span>
                <span class="bento-metric-lbl">TIKTOK</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">${analytics.summary.totalFollowers}</span>
                <span class="bento-metric-lbl">TOTAL COMMUNITY</span>
              </div>
            </div>

            <!-- Mini Bar Chart -->
            <div class="mini-bar-chart">
              <div class="bar-col" style="height: 35%;"></div>
              <div class="bar-col" style="height: 50%;"></div>
              <div class="bar-col" style="height: 42%;"></div>
              <div class="bar-col peak" style="height: 90%;" title="Peak traffic: 12:00 PM"></div>
              <div class="bar-col" style="height: 60%;"></div>
              <div class="bar-col" style="height: 75%;"></div>
              <div class="bar-col" style="height: 45%;"></div>
              <div style="margin-left: auto; font-size: 10px; font-weight: 700; opacity: 0.7;">
                07:30 p.m — 12:00 p.m
              </div>
            </div>
          </div>

          <!-- Bento 2: Soft Rose (Engagement Summary Sparkline) -->
          <div class="bento-card bento-rose">
            <!-- Decorative Floating Heart Shape -->
            <svg class="bento-shape-bg" width="90" height="90" viewBox="0 0 100 100" fill="#EDA4C7">
              <path d="M50 85 C20 60 5 40 5 25 A20 20 0 0 1 45 15 L50 20 L55 15 A20 20 0 0 1 95 25 C95 40 80 60 50 85 Z" />
            </svg>

            <div class="bento-card-title">Engagement summary:</div>
            
            <div class="bento-metric-row">
              <div class="bento-metric-item">
                <span class="bento-metric-num">${analytics.summary.engagementRate}</span>
                <span class="bento-metric-lbl">AVERAGE</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">2.1%</span>
                <span class="bento-metric-lbl">PH BENCHMARK</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">11.4%</span>
                <span class="bento-metric-lbl">PEAK (TONYMOLY)</span>
              </div>
            </div>

            <!-- Smooth Wavy SVG Sparkline -->
            <div class="wavy-sparkline-wrap">
              <svg viewBox="0 0 300 60" style="width: 100%; height: 100%; overflow: visible;">
                <path d="M 0,40 Q 30,30 60,45 T 120,35 T 180,12 T 220,40 T 260,35 T 300,42" fill="none" stroke="var(--bento-rose-line)" stroke-width="2.5" />
                <!-- Highlight Peak Dot -->
                <circle cx="180" cy="12" r="4.5" fill="var(--bento-rose-text)" />
                <line x1="180" y1="12" x2="180" y2="58" stroke="var(--bento-rose-text)" stroke-width="1.5" stroke-dasharray="3,3" />
                <!-- Time Labels -->
                <text x="10" y="58" font-size="8.5" fill="var(--bento-rose-text)" font-weight="600">10:30</text>
                <text x="80" y="58" font-size="8.5" fill="var(--bento-rose-text)" font-weight="600">11:00</text>
                <text x="165" y="58" font-size="8.5" fill="var(--bento-rose-text)" font-weight="800">12:00</text>
                <text x="240" y="58" font-size="8.5" fill="var(--bento-rose-text)" font-weight="600">13:30</text>
              </svg>
            </div>
          </div>

          <!-- Bento 3: Sage Green (Authenticity & Trust Defense) -->
          <div class="bento-card bento-sage">
            <!-- Decorative Floating Geometric Polygon Shape -->
            <svg class="bento-shape-bg" width="90" height="90" viewBox="0 0 100 100" fill="#99D6B3">
              <polygon points="50,10 90,90 10,90" />
            </svg>

            <div class="bento-card-title">Authenticity & Vetting:</div>
            
            <div class="bento-metric-row">
              <div class="bento-metric-item">
                <span class="bento-metric-num">320 sellers</span>
                <span class="bento-metric-lbl">VERIFIED DTI/SEC</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">12,000</span>
                <span class="bento-metric-lbl">GENUINE PRODUCTS</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">91%</span>
                <span class="bento-metric-lbl">PH FAKES DEFENDED</span>
              </div>
            </div>

            <div style="margin-top: auto; display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; z-index: 2; position: relative;">
              <span style="background: #1E5E3A; color: #FFF; padding: 2px 8px; border-radius: var(--radius-pill);">0 Fake Tolerance</span>
              <span>2-5 Day Vendor Approval Cycle</span>
            </div>
          </div>

          <!-- Bento 4: Lavender Blue (Ask Zena AI & Watch & Buy) -->
          <div class="bento-card bento-lavender">
            <!-- Decorative Floating Starburst Shape -->
            <svg class="bento-shape-bg" width="90" height="90" viewBox="0 0 100 100" fill="#A8BDFC">
              <path d="M50 0 L60 35 L95 25 L70 50 L95 75 L60 65 L50 100 L40 65 L5 75 L30 50 L5 25 L40 35 Z" />
            </svg>

            <div class="bento-card-title">Signature Innovations:</div>
            
            <div class="bento-metric-row">
              <div class="bento-metric-item">
                <span class="bento-metric-num">2,400</span>
                <span class="bento-metric-lbl">ASK ZENA SCANS</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">03:45 h</span>
                <span class="bento-metric-lbl">WATCH & BUY LIVE</span>
              </div>
              <div class="bento-metric-item">
                <span class="bento-metric-num">8.5%</span>
                <span class="bento-metric-lbl">ROUTINE CTR</span>
              </div>
            </div>

            <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; z-index: 2; position: relative;">
              <span style="background: #2E3E85; color: #FFF; padding: 2px 8px; border-radius: var(--radius-pill);">AI Skin-Scan</span>
              <span>Personalized Routine Conversion Active</span>
            </div>
          </div>

        </div>

        <!-- LOWER SECTION SPLIT (Task List on Left, Active Case Details on Right) -->
        <div class="lower-split-grid">
          
          <!-- Left: Priority Agenda List (Intelly Patient's List style) -->
          <div class="lower-panel-card">
            <div class="panel-header-row">
              <div class="panel-section-title">Priority Tasks</div>
              <button class="pill-filter-chip active" style="font-size: 11px;" onclick="window.store.setView('tasks')">
                Today ⌄
              </button>
            </div>

            <div style="display: flex; flex-direction: column;">
              ${tasks.map((t, idx) => {
                const iconClasses = ["icon-pink", "icon-blue", "icon-purple", "icon-green"];
                const icons = ["sparkles", "bar-chart-2", "shield-alert", "users"];
                const times = ["09:15 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

                return `
                  <div class="task-row-intelly" onclick="window.App.openTaskDetail('${t.id}')">
                    <div class="task-icon-circle ${iconClasses[idx % 4]}">
                      <i data-lucide="${icons[idx % 4]}" style="width: 16px; height: 16px;"></i>
                    </div>

                    <div class="task-main-info">
                      <div class="task-title-text">${t.title}</div>
                      <div class="task-cat-subtext">${t.category} • Due today</div>
                    </div>

                    <div class="time-pill-badge">
                      ${times[idx % 4]}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Right: Active Case Detail Card (Intelly Visit Details style) -->
          <div class="lower-panel-card">
            <div class="panel-header-row">
              <div class="panel-section-title">Active Case & Authenticity Desk</div>
              <span style="font-size: 11px; color: var(--zenska-plum); font-weight: 700; cursor: pointer;" onclick="window.store.setView('inbox')">
                Flagged queue (2) →
              </span>
            </div>

            <!-- Soft Pink Intelly-style Case Detail Card -->
            <div class="case-detail-card">
              <div class="case-card-header">
                <div>
                  <div class="case-author-name">Mariel Santos</div>
                  <div style="font-size: 11px; opacity: 0.85;">Instagram DM • 10 mins ago</div>
                </div>
                <span class="case-case-id-pill">CASE #RH-2026B</span>
              </div>

              <div class="case-pill-tags">
                <span class="case-tag">Counterfeit Check</span>
                <span class="case-tag">Rhode Lip Tint</span>
                <span class="case-tag">Shopee Price Gap</span>
              </div>

              <div class="case-info-line">
                <strong>Customer Query:</strong> "Saw unverified Shopee seller selling Rhode for ₱650 while yours is ₱1,450. How can I be 100% sure your stocks are original US batches?"
              </div>

              <div class="case-info-line" style="background: rgba(255,255,255,0.6); padding: 8px 10px; border-radius: 8px;">
                <strong>Verified Lab Manifest:</strong> Batch #RH-2026B matched with official distributor certificate of origin & 100% money-back guarantee seal.
              </div>

              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="btn btn-primary" style="flex: 1; font-size: 11.5px; padding: 7px 12px; background: #5C0A3F; color: #FFF;" 
                  onclick="window.store.setView('inbox')">
                  Send Verified Proof & Resolve
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    // Render Right Calendar & Content Timeline Sidebar
    this.renderRightSidebar();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  renderRightSidebar() {
    const sidebarEl = document.getElementById("intelly-right-sidebar");
    if (!sidebarEl) return;

    sidebarEl.innerHTML = `
      <!-- Mini Calendar Header -->
      <div class="cal-month-header">
        <button class="btn-icon" style="width: 26px; height: 26px; border: none;" onclick="window.store.setView('calendar')">
          <i data-lucide="chevron-left" style="width: 14px; height: 14px;"></i>
        </button>
        <span class="cal-month-pill">September 2026</span>
        <button class="btn-icon" style="width: 26px; height: 26px; border: none;" onclick="window.store.setView('calendar')">
          <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>

      <!-- Mini Days Grid -->
      <table class="mini-cal-table">
        <thead>
          <tr>
            <th>MO</th><th>TU</th><th>WE</th><th>TH</th><th>FR</th><th>SA</th><th>SU</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="cal-day-num">1</span></td>
            <td><span class="cal-day-num">2</span></td>
            <td><span class="cal-day-num">3</span></td>
            <td><span class="cal-day-num">4</span></td>
            <td><span class="cal-day-num">5</span></td>
            <td><span class="cal-day-num">6</span></td>
            <td><span class="cal-day-num">7</span></td>
            <td class="cal-week-num">W36</td>
          </tr>
          <tr>
            <td><span class="cal-day-num">8</span></td>
            <td><span class="cal-day-num">9</span></td>
            <td><span class="cal-day-num">10</span></td>
            <td><span class="cal-day-num">11</span></td>
            <td><span class="cal-day-num">12</span></td>
            <td><span class="cal-day-num">13</span></td>
            <td><span class="cal-day-num">14</span></td>
            <td class="cal-week-num">W37</td>
          </tr>
          <tr>
            <td><span class="cal-day-num active">21</span></td>
            <td><span class="cal-day-num">22</span></td>
            <td><span class="cal-day-num">23</span></td>
            <td><span class="cal-day-num">24</span></td>
            <td><span class="cal-day-num">25</span></td>
            <td><span class="cal-day-num">26</span></td>
            <td><span class="cal-day-num">27</span></td>
            <td class="cal-week-num">W38</td>
          </tr>
          <tr>
            <td><span class="cal-day-num">28</span></td>
            <td><span class="cal-day-num">29</span></td>
            <td><span class="cal-day-num">30</span></td>
            <td style="opacity: 0.3;">1</td>
            <td style="opacity: 0.3;">2</td>
            <td style="opacity: 0.3;">3</td>
            <td style="opacity: 0.3;">4</td>
            <td class="cal-week-num">W39</td>
          </tr>
        </tbody>
      </table>

      <!-- Black Pill Schedule Post Button -->
      <button class="btn-black-pill" onclick="window.App.openCreatePostModal()">
        <i data-lucide="plus" style="width: 15px; height: 15px;"></i>
        <span>Schedule Post</span>
      </button>

      <!-- Today's Publishing Timeline -->
      <div class="timeline-section-header">
        <div>
          <div style="font-size: 14px; font-weight: 800;">September 21</div>
          <div style="font-size: 10.5px; color: var(--text-muted);">Today's publishing timeline</div>
        </div>
        <span class="pill-filter-chip active" style="font-size: 10px;">All ⌄</span>
      </div>

      <div class="timeline-items-flow">
        
        <div class="timeline-event-card">
          <div style="font-size: 11px; font-weight: 800; color: var(--deep-magenta); min-width: 44px;">09:00</div>
          <div style="flex: 1;">
            <div style="display: flex; gap: 4px; margin-bottom: 2px;">
              <span class="badge tag-platform-instagram" style="font-size: 8.5px; padding: 1px 4px;">IG REEL</span>
              <span style="font-size: 8.5px; background: rgba(92,10,63,0.1); color: var(--deep-magenta); font-weight: 700; padding: 1px 4px; border-radius: 4px;">AUTHENTICITY</span>
            </div>
            <div style="font-weight: 700; font-size: 11.5px;">Soul Apothecary 24.6% Peptide Teardown</div>
            <div style="font-size: 10px; color: var(--text-muted);">Batch certificate & anti-aging lab manifest</div>
          </div>
        </div>

        <div class="timeline-event-card">
          <div style="font-size: 11px; font-weight: 800; color: var(--deep-magenta); min-width: 44px;">11:30</div>
          <div style="flex: 1;">
            <div style="display: flex; gap: 4px; margin-bottom: 2px;">
              <span class="badge tag-platform-tiktok" style="font-size: 8.5px; padding: 1px 4px;">TIKTOK</span>
              <span class="badge badge-primary" style="font-size: 8.5px; padding: 1px 4px; background: var(--deep-magenta);">ASK ZENA</span>
            </div>
            <div style="font-weight: 700; font-size: 11.5px;">60-Sec Skin Scan & Match Demo</div>
            <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <span style="font-size: 9.5px; color: var(--text-muted);">Creator:</span>
              <span style="font-size: 9px; background: rgba(99,102,241,0.15); color: #3730A3; padding: 1px 6px; border-radius: 4px; font-weight: 700;">@sofia.skinglow</span>
            </div>
          </div>
        </div>

        <div class="timeline-event-card">
          <div style="font-size: 11px; font-weight: 800; color: var(--deep-magenta); min-width: 44px;">18:00</div>
          <div style="flex: 1;">
            <div style="display: flex; gap: 4px; margin-bottom: 2px;">
              <span class="badge tag-platform-tiktok" style="font-size: 8.5px; padding: 1px 4px; background: #000; color: #FFF;">LIVE</span>
              <span style="font-size: 8.5px; background: rgba(236,30,121,0.12); color: var(--neon-accent); font-weight: 700; padding: 1px 4px; border-radius: 4px;">WATCH & BUY</span>
            </div>
            <div style="font-weight: 700; font-size: 11.5px;">APERIRE Bouncing Root Origin Flash Drop</div>
            <div style="font-size: 10px; color: var(--text-muted);">Host: Danica • Flat 10% WELCOME10 voucher</div>
          </div>
        </div>

      </div>

      <button class="btn btn-secondary" style="width: 100%; margin-top: auto; font-size: 11px; padding: 8px; border-radius: var(--radius-pill); font-weight: 700; border-color: rgba(92,10,63,0.2);" onclick="window.store.setView('calendar')">
        View all scheduled drops
      </button>
    `;
  }
};
