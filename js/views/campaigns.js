/**
 * Zenska SMM Command Center - Campaign & Promo Layer View
 * Features:
 * - Sales events (11.11, 12.12, Payday Sale)
 * - Brand-partner co-marketing tracker (Rhode, TONYMOLY, Cocobody)
 * - Linked scheduled posts counter
 * - Budget and target GMV milestones
 */

window.CampaignsView = {
  render(container) {
    const campaigns = window.store.getCampaigns();
    const posts = window.store.getPosts();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Campaign & Promo Co-Marketing Layer</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Major Philippine retail moments (11.11, Payday, Launch windows) & brand authorizations.
            </p>
          </div>
          <button class="btn btn-primary" onclick="window.CampaignsView.openNewCampaignModal()">
            <i data-lucide="plus" style="width: 14px; height: 14px;"></i> New Campaign
          </button>
        </div>

        <!-- Campaign Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
          ${campaigns.map(camp => {
            const linkedPosts = posts.filter(p => p.campaign_id === camp.id);
            const statusClass = camp.status === "Live" ? "badge-verified" : camp.status === "Confirmed" ? "badge-primary" : "badge-neutral";

            return `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 22px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-sm);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-size: 15px; font-weight: 700; color: var(--text-main);">${camp.name}</h3>
                    <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">
                      ${camp.start_date} to ${camp.end_date}
                    </div>
                  </div>
                  <span class="badge ${statusClass}">${camp.status}</span>
                </div>

                <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 12px; display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
                  <div>
                    <span style="color: var(--text-muted); font-size: 11px;">Brand Partner(s):</span>
                    <strong style="color: var(--color-primary); margin-left: 6px;">${camp.brand_partner || 'Platform-wide'}</strong>
                  </div>
                  <div>
                    <span style="color: var(--text-muted); font-size: 11px;">Marketing Goals:</span>
                    <div style="font-weight: 500; margin-top: 2px;">${camp.goals}</div>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; font-size: 12px;">
                  <div>
                    <span style="color: var(--text-muted); font-size: 11px;">Budget Allocation:</span>
                    <div style="font-weight: 700; color: var(--text-main);">${camp.budget}</div>
                  </div>
                  <div>
                    <span class="badge badge-primary">
                      ${linkedPosts.length} Linked Post(s)
                    </span>
                  </div>
                </div>

              </div>
            `;
          }).join("")}
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  openNewCampaignModal() {
    window.App.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Create Promotional Campaign Window</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 12px; font-weight: 600;">Campaign Title</label>
            <input type="text" id="camp-name" placeholder="e.g. 11.11 Single's Authenticity Bonanza" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-size: 12px; font-weight: 600;">Start Date</label>
              <input type="date" id="camp-start" value="2026-11-01" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 600;">End Date</label>
              <input type="date" id="camp-end" value="2026-11-12" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
            </div>
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Brand Partner / Co-Marketing Opportunity</label>
            <input type="text" id="camp-partner" placeholder="e.g. TONYMOLY Korea, Rhode Beauty" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Campaign Deliverables & Target GMV</label>
            <textarea id="camp-goals" rows="3" placeholder="SMM targets, Ask Zena vouchers..." style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 8px; margin-top: 4px;"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.CampaignsView.submitCampaign()">Save Campaign</button>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  },

  submitCampaign() {
    const name = document.getElementById("camp-name")?.value.trim();
    const start = document.getElementById("camp-start")?.value;
    const end = document.getElementById("camp-end")?.value;
    const partner = document.getElementById("camp-partner")?.value.trim();
    const goals = document.getElementById("camp-goals")?.value.trim();

    if (!name) {
      alert("Please provide a campaign name.");
      return;
    }

    window.store.state.campaigns.unshift({
      id: "camp-" + Date.now(),
      name,
      type: "sale",
      start_date: start,
      end_date: end,
      brand_partner: partner,
      status: "Confirmed",
      budget: "₱100,000",
      goals: goals || "Campaign promotion"
    });
    window.store.saveState();

    window.App.closeModal();
    this.render(document.getElementById("view-root"));
  }
};
