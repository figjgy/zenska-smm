/**
 * Zenska SMM Command Center - Influencer & KOL CRM View
 * Features:
 * - Creator database: Dermatologists, Skinfluencers, General Beauty
 * - Pipeline status: Identified → Outreached → Negotiating → Product Seeded → Content Received → Posted
 * - Product seeding log & received UGC content tracking
 * - Relationship history notes
 */

window.InfluencersView = {
  activePipelineFilter: "all",

  render(container) {
    const influencers = window.store.getInfluencers();
    const stages = ["Identified", "Outreached", "Negotiating", "Product Seeded", "Content Received", "Posted"];

    const filtered = this.activePipelineFilter === "all"
      ? influencers
      : influencers.filter(i => i.pipeline_status === this.activePipelineFilter);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Header & Action -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Influencer & KOL Relationship CRM</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Partnering with board-certified dermatologists, skinfluencers, and authentic beauty creators in the Philippines.
            </p>
          </div>
          <button class="btn btn-primary" onclick="window.InfluencersView.openAddCreatorModal()">
            <i data-lucide="user-plus" style="width: 14px; height: 14px;"></i> Add Creator
          </button>
        </div>

        <!-- Pipeline Stage Chips -->
        <div style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 0;">
          <button class="btn ${this.activePipelineFilter === 'all' ? 'btn-primary' : 'btn-secondary'}" 
            style="font-size: 12px; padding: 5px 14px; border-radius: 16px;"
            onclick="window.InfluencersView.setFilter('all')">
            All Pipeline (${influencers.length})
          </button>
          ${stages.map(stage => {
            const count = influencers.filter(i => i.pipeline_status === stage).length;
            return `
              <button class="btn ${this.activePipelineFilter === stage ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 12px; padding: 5px 14px; border-radius: 16px; white-space: nowrap;"
                onclick="window.InfluencersView.setFilter('${stage}')">
                ${stage} (${count})
              </button>
            `;
          }).join("")}
        </div>

        <!-- Creator Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px;">
          ${filtered.map(inf => `
            <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-sm); transition: all 0.15s ease;">
              
              <!-- Creator Header -->
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <div style="font-weight: 700; font-size: 15px; color: var(--text-main);">${inf.name}</div>
                  <div style="font-size: 12px; color: var(--text-muted);">${inf.handle} • ${inf.platform}</div>
                </div>
                <span class="badge ${inf.niche === 'Dermatologist' ? 'badge-primary' : 'badge-neutral'}">
                  ${inf.niche}
                </span>
              </div>

              <!-- Pipeline Stage Selector -->
              <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 10px 12px; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Status Pipeline:</span>
                <select style="border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-surface); font-size: 11.5px; font-weight: 600; padding: 2px 6px; color: var(--color-primary);"
                  onchange="window.store.updateInfluencerStatus('${inf.id}', this.value)">
                  ${stages.map(s => `
                    <option value="${s}" ${inf.pipeline_status === s ? 'selected' : ''}>${s}</option>
                  `).join("")}
                </select>
              </div>

              <!-- Seeding & Content Stats -->
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
                <div>
                  <span style="color: var(--text-muted); font-size: 11px; font-weight: 600;">Seeded Products:</span>
                  <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 2px;">
                    ${inf.seeded_products && inf.seeded_products.length ? inf.seeded_products.map(p => `
                      <span class="badge badge-neutral" style="font-size: 10px;">${p}</span>
                    `).join("") : '<span style="color: var(--text-dim); font-size: 11px;">None seeded yet</span>'}
                  </div>
                </div>

                ${inf.received_content && inf.received_content.length ? `
                  <div style="margin-top: 4px;">
                    <span style="color: var(--text-muted); font-size: 11px; font-weight: 600;">Received Content:</span>
                    <div style="font-size: 11.5px; color: var(--color-verified); font-weight: 600; margin-top: 2px;">
                      ✓ ${inf.received_content.join(", ")}
                    </div>
                  </div>
                ` : ''}
              </div>

              <!-- Notes -->
              <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 8px 10px; font-size: 11.5px; color: var(--text-muted); line-height: 1.4;">
                <strong>Relationship Log:</strong> ${inf.notes}
              </div>

              <!-- Contact Footer -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 10px; font-size: 11px; color: var(--text-dim);">
                <span>${inf.follower_count} followers</span>
                <span style="color: var(--color-primary); font-weight: 500;">${inf.contact_info.email || inf.contact_info.phone}</span>
              </div>

            </div>
          `).join("")}
        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  setFilter(stage) {
    this.activePipelineFilter = stage;
    this.render(document.getElementById("view-root"));
  },

  openAddCreatorModal() {
    window.App.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Add Creator to Influencer CRM</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 12px; font-weight: 600;">Creator Name</label>
            <input type="text" id="creator-name" placeholder="e.g. Dr. Maria Santos, MD" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div>
              <label style="font-size: 12px; font-weight: 600;">Handle</label>
              <input type="text" id="creator-handle" placeholder="@drmaria_skin" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
            </div>
            <div>
              <label style="font-size: 12px; font-weight: 600;">Niche</label>
              <select id="creator-niche" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
                <option value="Dermatologist">Dermatologist</option>
                <option value="Skinfluencer">Skinfluencer</option>
                <option value="General Beauty">General Beauty</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Initial Notes / Collaboration Angle</label>
            <textarea id="creator-notes" rows="3" placeholder="Seeding target, rate expectations, campaign fit..." style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 8px; margin-top: 4px;"></textarea>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.InfluencersView.submitNewCreator()">Save Creator</button>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  },

  submitNewCreator() {
    const name = document.getElementById("creator-name")?.value.trim();
    const handle = document.getElementById("creator-handle")?.value.trim();
    const niche = document.getElementById("creator-niche")?.value;
    const notes = document.getElementById("creator-notes")?.value.trim();

    if (!name) {
      alert("Please specify creator name.");
      return;
    }

    window.store.addInfluencer({
      name,
      handle,
      niche,
      notes,
      pipeline_status: "Identified"
    });

    window.App.closeModal();
    this.render(document.getElementById("view-root"));
  }
};
