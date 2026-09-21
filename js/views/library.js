/**
 * Zenska SMM Command Center - Hashtag & Caption Template Library
 * Features:
 * - Saved hashtag sets by platform & content pillar
 * - Caption templates by funnel stage (Awareness, Consideration, Conversion, Loyalty)
 * - 1-Click copy to clipboard
 * - Instant "Use Template in Post" button
 */

window.LibraryView = {
  activeTab: "captions", // 'captions' | 'hashtags'
  searchQuery: "",

  render(container) {
    const hashtags = window.store.getHashtags();
    const captions = window.store.getCaptionTemplates();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Header & Tabs -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Content Snippet & Hashtag Bank</h2>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
              Standardized Philippine beauty copy formulas, clinical ingredient disclosures, and hashtag sets.
            </p>
          </div>

          <div class="view-mode-toggle">
            <button class="view-mode-btn ${this.activeTab === 'captions' ? 'active' : ''}" 
              onclick="window.LibraryView.setTab('captions')">
              <i data-lucide="file-text" style="width: 14px; height: 14px;"></i> Caption Templates
            </button>
            <button class="view-mode-btn ${this.activeTab === 'hashtags' ? 'active' : ''}" 
              onclick="window.LibraryView.setTab('hashtags')">
              <i data-lucide="hash" style="width: 14px; height: 14px;"></i> Hashtag Sets
            </button>
          </div>
        </div>

        <!-- Content rendering -->
        ${this.activeTab === 'captions' ? this.renderCaptions(captions) : this.renderHashtags(hashtags)}

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  renderCaptions(captions) {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
        ${captions.map(cap => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: var(--shadow-sm);">
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h4 style="font-weight: 700; font-size: 14px; color: var(--text-main);">${cap.title}</h4>
                <div style="display: flex; gap: 6px; margin-top: 4px;">
                  <span class="badge badge-primary">${cap.content_pillar}</span>
                  <span class="badge badge-neutral">${cap.funnel_stage}</span>
                </div>
              </div>
            </div>

            <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 14px; font-size: 12.5px; line-height: 1.5; color: var(--text-main); white-space: pre-line; max-height: 180px; overflow-y: auto; border: 1px solid var(--border-light);">
              ${cap.text}
            </div>

            <div style="font-size: 11px; color: var(--color-verified); font-weight: 500;">
              ✓ Performance metric: ${cap.performance_notes}
            </div>

            <div style="display: flex; gap: 8px; margin-top: 4px; border-top: 1px solid var(--border-light); padding-top: 12px;">
              <button class="btn btn-secondary" style="flex: 1; font-size: 12px;" onclick="window.LibraryView.copyText('${cap.id}', true)">
                <i data-lucide="copy" style="width: 14px; height: 14px;"></i> Copy Copy
              </button>
              <button class="btn btn-primary" style="flex: 1; font-size: 12px;" onclick="window.LibraryView.useTemplateInPost('${cap.id}')">
                <i data-lucide="calendar-plus" style="width: 14px; height: 14px;"></i> Draft Post
              </button>
            </div>

          </div>
        `).join("")}
      </div>
    `;
  },

  renderHashtags(hashtags) {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
        ${hashtags.map(h => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 12px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-weight: 700; font-size: 14px;">${h.name}</h4>
              <span class="badge tag-platform-${h.platform.toLowerCase()}">${h.platform}</span>
            </div>

            <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
              ${h.tags.map(t => `
                <span class="badge badge-neutral" style="font-size: 11px; padding: 3px 8px; color: var(--color-primary);">${t}</span>
              `).join("")}
            </div>

            <button class="btn btn-secondary" style="width: 100%; font-size: 12px;" onclick="window.LibraryView.copyHashtags('${h.id}')">
              <i data-lucide="copy" style="width: 14px; height: 14px;"></i> Copy All ${h.tags.length} Tags
            </button>
          </div>
        `).join("")}
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render(document.getElementById("view-root"));
  },

  copyText(capId, isCaption) {
    const cap = window.store.getCaptionTemplates().find(c => c.id === capId);
    if (cap) {
      navigator.clipboard.writeText(cap.text);
      window.store.emit("notification", { type: "success", message: `Caption "${cap.title}" copied to clipboard.` });
    }
  },

  copyHashtags(hashId) {
    const h = window.store.getHashtags().find(item => item.id === hashId);
    if (h) {
      navigator.clipboard.writeText(h.tags.join(" "));
      window.store.emit("notification", { type: "success", message: `Hashtag bundle "${h.name}" copied.` });
    }
  },

  useTemplateInPost(capId) {
    const cap = window.store.getCaptionTemplates().find(c => c.id === capId);
    if (cap) {
      window.App.openCreatePostModal(null, {
        caption: cap.text,
        content_pillar: cap.content_pillar
      });
    }
  }
};
