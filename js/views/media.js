/**
 * Zenska SMM Command Center - Media Asset Library View
 * Features:
 * - Searchable & filterable gallery of beauty assets
 * - Tag filters (TONYMOLY, Rhode, Authenticity, Packaging, Ask Zena, UGC)
 * - Drag-and-drop upload simulator + file picker
 * - Multi-column responsive grid
 * - Instant "Create Post with Asset" button
 */

window.MediaView = {
  selectedTag: "all",
  searchQuery: "",

  render(container) {
    const assets = window.store.getMedia();
    
    // Collect unique tags
    const allTags = new Set();
    assets.forEach(a => a.tags.forEach(t => allTags.add(t)));

    // Filter
    let filtered = assets;
    if (this.selectedTag !== "all") {
      filtered = filtered.filter(a => a.tags.includes(this.selectedTag));
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
    }

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Controls & Upload Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px;">
          
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <!-- Search -->
            <div class="search-input-wrap">
              <i data-lucide="search" class="search-input-icon" style="width: 14px; height: 14px;"></i>
              <input type="text" placeholder="Search assets or tags..." value="${this.searchQuery}"
                oninput="window.MediaView.onSearch(this.value)">
            </div>

            <!-- Tag Filter -->
            <div style="display: flex; gap: 6px; overflow-x: auto; max-width: 550px; padding: 2px;">
              <button class="btn ${this.selectedTag === 'all' ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 11px; padding: 4px 10px; border-radius: 14px;"
                onclick="window.MediaView.setTag('all')">
                All (${assets.length})
              </button>
              ${Array.from(allTags).map(tag => `
                <button class="btn ${this.selectedTag === tag ? 'btn-primary' : 'btn-secondary'}" 
                  style="font-size: 11px; padding: 4px 10px; border-radius: 14px; white-space: nowrap;"
                  onclick="window.MediaView.setTag('${tag}')">
                  ${tag}
                </button>
              `).join("")}
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="file" id="media-upload-input" multiple accept="image/*,video/*" style="display: none;" 
              onchange="window.MediaView.handleFileUpload(event)">
            <button class="btn btn-primary" onclick="document.getElementById('media-upload-input').click()">
              <i data-lucide="upload" style="width: 14px; height: 14px;"></i> Upload Media
            </button>
          </div>

        </div>

        <!-- Drag & Drop Upload Zone -->
        <div id="media-drop-zone"
          style="border: 2px dashed var(--border-color); border-radius: var(--radius-lg); padding: 24px; text-align: center; background: var(--bg-surface); transition: all 0.2s ease; cursor: pointer;"
          ondragover="event.preventDefault(); this.style.borderColor='var(--color-primary)'; this.style.background='var(--color-accent-subtle)';"
          ondragleave="this.style.borderColor='var(--border-color)'; this.style.background='var(--bg-surface)';"
          ondrop="window.MediaView.onDropFiles(event)"
          onclick="document.getElementById('media-upload-input').click()">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--color-accent); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px;">
            <i data-lucide="cloud-upload" style="width: 22px; height: 22px;"></i>
          </div>
          <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">Drag & Drop photos or high-res reels here</div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Tap or click to select from iPad Photo Library or Desktop files</div>
        </div>

        <!-- Media Grid -->
        <div class="media-grid-container">
          ${filtered.length === 0 ? `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
              <i data-lucide="image" style="width: 48px; height: 48px; margin-bottom: 12px; color: var(--text-dim);"></i>
              <h3>No media assets found</h3>
              <p style="font-size: 12px; margin-top: 4px;">Try a different tag filter or upload new creative assets.</p>
            </div>
          ` : filtered.map(item => `
            <div class="media-asset-card">
              <div class="media-thumb-wrap">
                <img src="${item.file_url}" alt="${item.title}" loading="lazy">
                <span class="media-type-badge">${item.type.toUpperCase()}</span>
                ${item.used_in_posts.length > 0 ? `
                  <span class="badge" style="position: absolute; bottom: 8px; right: 8px; background: rgba(5,150,105,0.85); color: #FFF; font-size: 9px;">
                    In ${item.used_in_posts.length} Post(s)
                  </span>
                ` : ''}
              </div>
              <div class="media-card-body">
                <div class="media-card-title" title="${item.title}">${item.title}</div>
                <div style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
                  <span>${item.dimensions}</span>
                  <span>${item.size_kb} KB</span>
                </div>
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 4px;">
                  ${item.tags.slice(0, 2).map(t => `<span class="badge badge-neutral" style="font-size: 9.5px; padding: 1px 5px;">${t}</span>`).join("")}
                </div>
                <button class="btn btn-secondary" style="width: 100%; margin-top: 6px; font-size: 11px; padding: 5px;" 
                  onclick="window.App.openCreatePostWithMedia('${item.id}')">
                  <i data-lucide="calendar-plus" style="width: 12px; height: 12px;"></i> Use in Post
                </button>
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

  setTag(tag) {
    this.selectedTag = tag;
    this.render(document.getElementById("view-root"));
  },

  onSearch(q) {
    this.searchQuery = q;
    this.render(document.getElementById("view-root"));
  },

  handleFileUpload(e) {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        window.store.addMediaAsset({
          title: file.name.replace(/\.[^/.]+$/, ""),
          file_url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "photo",
          tags: ["User Upload", "Recent"],
          dimensions: "1080x1350",
          size_kb: Math.round(file.size / 1024)
        });
      }
      this.render(document.getElementById("view-root"));
    }
  },

  onDropFiles(e) {
    e.preventDefault();
    const dropZone = document.getElementById("media-drop-zone");
    if (dropZone) {
      dropZone.style.borderColor = "var(--border-color)";
      dropZone.style.background = "var(--bg-surface)";
    }
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        window.store.addMediaAsset({
          title: file.name.replace(/\.[^/.]+$/, ""),
          file_url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "photo",
          tags: ["Drop Upload", "Philippines Beauty"],
          dimensions: "1080x1080",
          size_kb: Math.round(file.size / 1024)
        });
      }
      this.render(document.getElementById("view-root"));
    }
  }
};
