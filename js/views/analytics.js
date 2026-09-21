/**
 * Zenska SMM Command Center - Analytics Dashboard View
 * Features:
 * - Cross-platform overview (Reach, Followers, Eng. Rate, Saves/Shares)
 * - 7d / 30d time range toggle
 * - Content Pillar comparative performance breakdown
 * - Platform-specific comparative table
 * - Executive Report generation & export for Gaurav Shukla
 * - Interactive trend charts (Chart.js / SVG)
 */

window.AnalyticsView = {
  timeRange: "7d", // '7d' | '30d'

  render(container) {
    const data = window.store.state.analytics;
    const currentRangeData = data.timeRanges[this.timeRange];
    const pillars = data.pillarPerformance;
    const platforms = data.platformBreakdown;

    container.innerHTML = `
      <div class="analytics-grid">
        
        <!-- Header & Time Filter -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Performance & Growth Intelligence</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Measuring shopper trust, educational content saves, and Ask Zena scan conversion.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <div class="view-mode-toggle">
              <button class="view-mode-btn ${this.timeRange === '7d' ? 'active' : ''}" onclick="window.AnalyticsView.setTimeRange('7d')">Last 7 Days</button>
              <button class="view-mode-btn ${this.timeRange === '30d' ? 'active' : ''}" onclick="window.AnalyticsView.setTimeRange('30d')">Last 30 Days</button>
            </div>
            <button class="btn btn-primary" onclick="window.App.openReportModal()">
              <i data-lucide="download" style="width: 14px; height: 14px;"></i> Export Report
            </button>
          </div>
        </div>

        <!-- 30-Second Scannable Daily KPI Cards -->
        <div class="kpi-scannable-strip">
          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Total Period Reach</span>
              <div class="kpi-icon-box"><i data-lucide="eye" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${currentRangeData.totalReach}</span>
              <span class="kpi-trend positive"><i data-lucide="trending-up" style="width: 14px; height: 14px;"></i> +14.2%</span>
            </div>
            <span class="kpi-subtext">${currentRangeData.totalImpressions} total impressions</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Avg. Engagement Rate</span>
              <div class="kpi-icon-box"><i data-lucide="activity" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${currentRangeData.avgEngagementRate}</span>
              <span class="kpi-trend positive"><i data-lucide="check" style="width: 14px; height: 14px;"></i> Top Tier</span>
            </div>
            <span class="kpi-subtext">PH E-Commerce industry avg: 2.1%</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Follower Net Gain</span>
              <div class="kpi-icon-box"><i data-lucide="user-plus" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${currentRangeData.newFollowers}</span>
              <span class="kpi-trend positive"><i data-lucide="arrow-up" style="width: 14px; height: 14px;"></i> Active</span>
            </div>
            <span class="kpi-subtext">Organic discovery via Reels & TikTok</span>
          </div>

          <div class="kpi-card">
            <div class="kpi-card-header">
              <span class="kpi-label">Content Saves (Trust Proof)</span>
              <div class="kpi-icon-box"><i data-lucide="bookmark" style="width: 18px; height: 18px;"></i></div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${currentRangeData.saves}</span>
              <span class="kpi-trend positive"><i data-lucide="share-2" style="width: 14px; height: 14px;"></i> ${currentRangeData.shares} shares</span>
            </div>
            <span class="kpi-subtext">Bookmarked for routine reference</span>
          </div>
        </div>

        <!-- 2-Column Split: Reach Trend Chart & Content Pillar Performance -->
        <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 20px;">
          
          <!-- Left: Trend Chart -->
          <div class="chart-card">
            <div class="chart-header">
              <div>
                <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Daily Reach & Interaction Trajectory</h3>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Cross-platform views per day</p>
              </div>
              <span class="badge badge-primary">${this.timeRange.toUpperCase()} View</span>
            </div>
            
            <div style="height: 240px; position: relative;" id="analytics-chart-container">
              <canvas id="reachChartCanvas"></canvas>
            </div>
          </div>

          <!-- Right: Content Pillar Performance Comparison -->
          <div class="chart-card">
            <div class="chart-header">
              <div>
                <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Content Pillar Comparison</h3>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Ranked by average engagement & save propensity</p>
              </div>
            </div>

            <div class="pillar-bars-container">
              ${pillars.map(p => `
                <div class="pillar-bar-item">
                  <div class="pillar-bar-meta">
                    <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">${p.pillar}</span>
                    <span style="color: var(--color-primary); font-size: 12px;">${p.avgEngagementRate} Eng. (${p.saves.toLocaleString()} saves)</span>
                  </div>
                  <div class="pillar-bar-track">
                    <div class="pillar-bar-fill" style="width: ${p.engagementScore}%;"></div>
                  </div>
                  <span style="font-size: 10.5px; color: var(--text-muted);">${p.notes}</span>
                </div>
              `).join("")}
            </div>
          </div>

        </div>

        <!-- Platform Breakdown Table -->
        <div class="chart-card">
          <div class="chart-header">
            <div>
              <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">Channel Breakdown & Growth Matrix</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Aggregated metrics by social channel</p>
            </div>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
              <thead>
                <tr style="background: var(--bg-subtle); border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                  <th style="padding: 10px 14px;">Platform</th>
                  <th style="padding: 10px 14px;">Followers</th>
                  <th style="padding: 10px 14px;">Period Reach</th>
                  <th style="padding: 10px 14px;">Engagement Rate</th>
                  <th style="padding: 10px 14px;">Growth Delta</th>
                  <th style="padding: 10px 14px;">Primary Value Prop</th>
                </tr>
              </thead>
              <tbody>
                ${platforms.map(pl => `
                  <tr style="border-bottom: 1px solid var(--border-light);">
                    <td style="padding: 12px 14px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                      <span style="width: 10px; height: 10px; border-radius: 50%; background: ${pl.color};"></span>
                      ${pl.platform}
                    </td>
                    <td style="padding: 12px 14px; font-weight: 700;">${pl.followers}</td>
                    <td style="padding: 12px 14px;">${pl.reach}</td>
                    <td style="padding: 12px 14px; color: var(--color-primary); font-weight: 600;">${pl.engRate}</td>
                    <td style="padding: 12px 14px; color: var(--color-verified); font-weight: 600;">${pl.growth}</td>
                    <td style="padding: 12px 14px; font-size: 12px; color: var(--text-muted);">
                      ${pl.platform === 'TikTok' ? 'Viral Ask Zena demos & livestream shopping' : pl.platform === 'Instagram' ? 'Ingredient carousels & aesthetic unboxings' : pl.platform === 'Facebook' ? 'Community trust reviews & older demographic reach' : 'B2B seller authority & SEO discoverability'}
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    `;

    this.renderChart(currentRangeData);

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  setTimeRange(r) {
    this.timeRange = r;
    this.render(document.getElementById("view-root"));
  },

  renderChart(rangeData) {
    const ctx = document.getElementById("reachChartCanvas");
    if (!ctx) return;

    const labels = rangeData.dailyData.map(d => d.day);
    const reachData = rangeData.dailyData.map(d => d.reach);

    if (window.Chart) {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new window.Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Reach Impressions",
            data: reachData,
            borderColor: "#5C0A3F",
            backgroundColor: "rgba(92, 10, 63, 0.08)",
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: "#5C0A3F",
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (c) => `Reach: ${c.parsed.y.toLocaleString()} users`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: { color: "rgba(0,0,0,0.05)" }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    } else {
      // SVG Fallback if Chart.js not loaded
      const maxReach = Math.max(...reachData);
      const points = reachData.map((val, idx) => {
        const x = (idx / (reachData.length - 1)) * 400;
        const y = 200 - (val / maxReach) * 160;
        return `${x},${y}`;
      }).join(" ");

      ctx.parentNode.innerHTML = `
        <svg viewBox="0 0 400 220" style="width: 100%; height: 100%;">
          <polyline fill="none" stroke="#5C0A3F" stroke-width="3" points="${points}" />
          ${reachData.map((val, idx) => {
            const x = (idx / (reachData.length - 1)) * 400;
            const y = 200 - (val / maxReach) * 160;
            return `<circle cx="${x}" cy="${y}" r="4" fill="#5C0A3F" />`;
          }).join("")}
        </svg>
      `;
    }
  }
};
