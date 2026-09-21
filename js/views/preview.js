/**
 * Zenska SMM Command Center - Multi-Platform Post Previewer
 * Realistic mobile device mockup for Instagram, TikTok, Facebook, X, Pinterest
 */

window.PreviewComponent = {
  activePlatform: "instagram",

  renderMockup(post, selectedPlatform = "instagram") {
    this.activePlatform = selectedPlatform || post.platforms[0] || "instagram";
    const mediaUrl = post.media && post.media.length > 0 ? post.media[0].url : "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80";

    return `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        
        <!-- Platform Switcher Tabs inside Preview -->
        <div style="display: flex; gap: 6px; background: var(--bg-subtle); padding: 4px; border-radius: var(--radius-pill); border: 1px solid var(--border-color);">
          ${post.platforms.map(pl => `
            <button class="sim-btn ${this.activePlatform === pl ? 'active' : ''}" 
              style="font-size: 12px; padding: 4px 12px; border-radius: 14px;"
              onclick="window.PreviewComponent.switchMockup('${post.id}', '${pl}')">
              ${pl.toUpperCase()}
            </button>
          `).join("")}
        </div>

        <!-- Phone Shell Container -->
        <div class="preview-phone-frame">
          <!-- Dynamic Island / Speaker Bar -->
          <div style="height: 24px; background: #000; display: flex; align-items: center; justify-content: center;">
            <div style="width: 70px; height: 12px; background: #1C191D; border-radius: 10px;"></div>
          </div>

          ${this.renderPlatformContent(this.activePlatform, post, mediaUrl)}
        </div>

      </div>
    `;
  },

  renderPlatformContent(platform, post, mediaUrl) {
    if (platform === "instagram") {
      return `
        <div class="ig-post-shell">
          <!-- IG Header -->
          <div class="ig-shell-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; border-radius: 50%; padding: 1.5px; background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF);">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" style="width: 100%; height: 100%; border-radius: 50%; border: 1.5px solid #000; object-fit: cover;">
              </div>
              <div>
                <div style="font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 4px;">
                  zenska.ph
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#3897F0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/></svg>
                </div>
                <div style="font-size: 10px; color: #9CA3AF;">Manila, Philippines • Sponsored</div>
              </div>
            </div>
            <i data-lucide="more-horizontal" style="width: 16px; height: 16px; color: #9CA3AF;"></i>
          </div>

          <!-- IG Media -->
          <div class="ig-shell-media">
            <img src="${mediaUrl}">
            <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.6); padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: 600;">
              1/2
            </div>
          </div>

          <!-- IG Actions -->
          <div class="ig-shell-actions">
            <div style="display: flex; gap: 12px;">
              <i data-lucide="heart" style="width: 20px; height: 20px;"></i>
              <i data-lucide="message-circle" style="width: 20px; height: 20px;"></i>
              <i data-lucide="send" style="width: 20px; height: 20px;"></i>
            </div>
            <i data-lucide="bookmark" style="width: 20px; height: 20px;"></i>
          </div>

          <!-- IG Likes & Caption -->
          <div style="padding: 0 12px 4px; font-size: 11px; font-weight: 700;">
            1,482 likes
          </div>
          <div class="ig-shell-caption">
            <strong>zenska.ph</strong> ${post.caption}
          </div>
          <div style="padding: 0 12px 14px; font-size: 10px; color: #9CA3AF; text-transform: uppercase;">
            2 HOURS AGO • VERIFIED PHILIPPINES
          </div>
        </div>
      `;
    } else if (platform === "tiktok") {
      return `
        <div style="position: relative; height: 500px; background: #111; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end;">
          <img src="${mediaUrl}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.85;">
          
          <!-- TikTok right sidebar icons -->
          <div style="position: absolute; right: 12px; bottom: 80px; display: flex; flex-direction: column; align-items: center; gap: 16px; z-index: 10;">
            <div style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #FFF; overflow: hidden;">
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; font-size: 11px;">
              <i data-lucide="heart" style="width: 26px; height: 26px; fill: #FE2C55; color: #FE2C55;"></i>
              <span>24.8K</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; font-size: 11px;">
              <i data-lucide="message-square" style="width: 26px; height: 26px; fill: #FFF;"></i>
              <span>482</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; font-size: 11px;">
              <i data-lucide="bookmark" style="width: 26px; height: 26px; fill: #FE2C55;"></i>
              <span>3.1K</span>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; font-size: 11px;">
              <i data-lucide="share-2" style="width: 26px; height: 26px;"></i>
              <span>1.2K</span>
            </div>
          </div>

          <!-- TikTok bottom info -->
          <div style="position: relative; z-index: 10; padding: 16px; background: linear-gradient(transparent, rgba(0,0,0,0.85));">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px;">@zenska_ph</div>
            <div style="font-size: 12px; line-height: 1.3; max-height: 70px; overflow: hidden; margin-bottom: 8px;">
              ${post.caption}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; opacity: 0.8;">
              <i data-lucide="music" style="width: 12px; height: 12px;"></i>
              <span>Zenska Audio • Ask Zena Official Scan Theme</span>
            </div>
          </div>
        </div>
      `;
    } else if (platform === "facebook") {
      return `
        <div style="background: #FFF; color: #1C1E21; display: flex; flex-direction: column;">
          <div style="padding: 12px; display: flex; align-items: center; gap: 8px;">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 700; font-size: 13px;">Zenska Philippines Authentic Beauty</div>
              <div style="font-size: 11px; color: #65676B;">Just now • 🌐 Public</div>
            </div>
          </div>
          <div style="padding: 0 12px 10px; font-size: 12px; line-height: 1.4;">
            ${post.caption}
          </div>
          <img src="${mediaUrl}" style="width: 100%; max-height: 300px; object-fit: cover;">
          <div style="padding: 10px 12px; display: flex; justify-content: space-around; border-top: 1px solid #CED0D4; color: #65676B; font-size: 12px; font-weight: 600;">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>↗️ Share</span>
          </div>
        </div>
      `;
    } else {
      // X / Twitter
      return `
        <div style="background: #000; color: #E7E9EA; padding: 16px; display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 10px;">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 700; font-size: 14px;">Zenska Philippines <span style="font-weight: 400; color: #71767B;">@ZenskaPH</span></div>
              <div style="font-size: 13px; line-height: 1.4; margin-top: 4px;">
                ${post.caption}
              </div>
            </div>
          </div>
          <div style="border-radius: 16px; overflow: hidden; border: 1px solid #2F3336; max-height: 240px;">
            <img src="${mediaUrl}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <div style="display: flex; justify-content: space-between; color: #71767B; font-size: 12px; padding: 6px 12px 0;">
            <span>💬 24</span>
            <span>🔁 142</span>
            <span>❤️ 890</span>
            <span>📊 12.4K</span>
          </div>
        </div>
      `;
    }
  },

  switchMockup(postId, platform) {
    this.activePlatform = platform;
    const post = window.store.getPosts().find(p => p.id === postId);
    if (post) {
      const container = document.getElementById("mockup-preview-container");
      if (container) {
        container.innerHTML = this.renderMockup(post, platform);
        if (window.lucide) window.lucide.createIcons();
      }
    }
  }
};
