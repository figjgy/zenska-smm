/**
 * Zenska SMM Command Center - Competitor & Industry Intelligence Watch
 * Features:
 * - Tracking competing beauty platforms in the Philippines (Shopee, Lazada, Watsons)
 * - Counterfeit alert logging & regulatory advisories (FDA Philippines)
 * - Content response opportunities
 */

window.CompetitorView = {
  render(container) {
    const notes = window.store.getCompetitorNotes();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Philippine Beauty Competitor & Sentiment Watch</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Market intelligence on grey-market counterfeit outbreaks, marketplace promo angles, and FDA notifications.
            </p>
          </div>
          <button class="btn btn-primary" onclick="window.CompetitorView.openAddModal()">
            <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Log Market Note
          </button>
        </div>

        <!-- Notes Feed -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
          ${notes.map(note => {
            const isCounterfeit = note.tag === "Counterfeit Watch" || note.tag === "Regulatory";
            return `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: var(--shadow-sm);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <h3 style="font-weight: 700; font-size: 14px; color: var(--text-main);">${note.competitor_name}</h3>
                    <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Logged on ${note.date_logged}</div>
                  </div>
                  <span class="badge ${isCounterfeit ? 'badge-danger' : 'badge-neutral'}">
                    ${note.tag}
                  </span>
                </div>

                <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; background: var(--bg-subtle); padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                  "${note.observation}"
                </p>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 10px; font-size: 11px;">
                  <a href="${note.source_url}" target="_blank" style="color: var(--color-primary); font-weight: 600; display: flex; align-items: center; gap: 4px;">
                    <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> View Evidence Link
                  </a>
                  <button class="btn btn-secondary" style="font-size: 11px; padding: 3px 8px;" 
                    onclick="window.App.openCreatePostModal(null, { caption: 'Responding to: ' + '${note.competitor_name}' + ' counterfeit concerns... At Zenska, all batches are verified genuine!' })">
                    Turn into Content Hook
                  </button>
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

  openAddModal() {
    window.App.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Log Philippine Beauty Competitor Intel</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="font-size: 12px; font-weight: 600;">Entity / Marketplace / Competitor</label>
            <input type="text" id="comp-name" placeholder="e.g. Shopee Grey-Market Reseller, Watsons, Lazada" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Intelligence Category</label>
            <select id="comp-tag" style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px; background: var(--bg-surface);">
              <option value="Counterfeit Watch">Counterfeit Watch (Fake product report/advisory)</option>
              <option value="Pricing/Promo">Pricing & Promo Campaign</option>
              <option value="Regulatory">FDA Advisory / Regulatory Warning</option>
              <option value="Campaign Angle">Campaign Creative Angle</option>
            </select>
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Observation & Strategic Content Takeaway</label>
            <textarea id="comp-obs" rows="3" placeholder="What are they posting? What is shopper reaction in PH? How should Zenska respond?" style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 8px; margin-top: 4px;"></textarea>
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600;">Evidence URL (TikTok link, Shopee listing, FDA advisory)</label>
            <input type="url" id="comp-url" placeholder="https://..." style="width: 100%; height: 36px; border-radius: var(--radius-md); border: 1px solid var(--border-color); padding: 0 10px; margin-top: 4px;">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.CompetitorView.submitEntry()">Save Intelligence</button>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  },

  submitEntry() {
    const name = document.getElementById("comp-name")?.value.trim();
    const tag = document.getElementById("comp-tag")?.value;
    const obs = document.getElementById("comp-obs")?.value.trim();
    const url = document.getElementById("comp-url")?.value.trim();

    if (!name || !obs) {
      alert("Please enter competitor name and observation.");
      return;
    }

    window.store.addCompetitorNote({
      competitor_name: name,
      tag,
      observation: obs,
      source_url: url
    });

    window.App.closeModal();
    this.render(document.getElementById("view-root"));
  }
};
