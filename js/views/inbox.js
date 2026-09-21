/**
 * Zenska SMM Command Center - Unified Community Inbox & Authenticity Flagged Desk
 * Features:
 * - Unified comments & DMs across platforms
 * - Needs Response / Resolved / Escalated status management
 * - Dedicated "Flagged Authenticity" queue for counterfeit complaints
 * - Canned response auto-completion
 * - Trust & Safety verified resolution slip
 */

window.InboxView = {
  activeFilter: "all", // 'all' | 'flagged' | 'needs_response' | 'resolved' | 'escalated'
  selectedItemId: "inbox-301",

  render(container) {
    const items = window.store.getInbox(this.activeFilter);
    const selectedItem = window.store.state.inboxItems.find(i => i.id === this.selectedItemId) || items[0];
    const canned = window.store.state.cannedResponses;

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Trust Banner for Customer Inquiries -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: #FFF1F2; color: #E11D48; display: flex; align-items: center; justify-content: center;">
              <i data-lucide="shield-alert" style="width: 20px; height: 20px;"></i>
            </div>
            <div>
              <strong style="font-size: 13px; color: var(--text-main);">Trust-First Customer Care Protocol:</strong>
              <div style="font-size: 11.5px; color: var(--text-muted);">
                Never dismiss fake product concerns. Provide batch codes, FDA CPR certificates, and 100% money-back guarantee terms.
              </div>
            </div>
          </div>
          <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;" onclick="window.InboxView.setFilter('flagged')">
            <i data-lucide="flag" style="width: 12px; height: 12px; color: var(--color-danger);"></i>
            View Flagged Authenticity Queue (${window.store.state.inboxItems.filter(i => i.is_flagged).length})
          </button>
        </div>

        <!-- 2-Pane Inbox Container -->
        <div class="inbox-container">
          
          <!-- Left Column: Messages List -->
          <div class="inbox-list-pane">
            
            <div class="inbox-filters-bar">
              <button class="btn ${this.activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 11px; padding: 4px 10px; border-radius: 14px;"
                onclick="window.InboxView.setFilter('all')">
                All
              </button>
              <button class="btn ${this.activeFilter === 'flagged' ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 11px; padding: 4px 10px; border-radius: 14px;"
                onclick="window.InboxView.setFilter('flagged')">
                🚩 Flagged Authenticity
              </button>
              <button class="btn ${this.activeFilter === 'needs_response' ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 11px; padding: 4px 10px; border-radius: 14px;"
                onclick="window.InboxView.setFilter('needs_response')">
                Needs Reply
              </button>
              <button class="btn ${this.activeFilter === 'resolved' ? 'btn-primary' : 'btn-secondary'}" 
                style="font-size: 11px; padding: 4px 10px; border-radius: 14px;"
                onclick="window.InboxView.setFilter('resolved')">
                Resolved
              </button>
            </div>

            <div class="inbox-items-scroll">
              ${items.length === 0 ? `
                <div style="padding: 40px 20px; text-align: center; color: var(--text-muted); font-size: 12px;">
                  No messages found for this filter.
                </div>
              ` : items.map(item => `
                <div class="inbox-item-row ${this.selectedItemId === item.id ? 'active' : ''} ${item.is_flagged ? 'flagged-row' : ''}"
                  onclick="window.InboxView.selectItem('${item.id}')">
                  <img src="${item.author_avatar}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
                      <span style="font-weight: 700; font-size: 12px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.author_name}
                      </span>
                      <span style="font-size: 10px; color: var(--text-dim);">${item.received_at}</span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
                      <span class="badge tag-platform-${item.platform}" style="padding: 1px 4px; font-size: 9px;">${item.platform.toUpperCase()}</span>
                      <span class="badge badge-neutral" style="font-size: 9px; padding: 1px 4px;">${item.type.toUpperCase()}</span>
                      ${item.is_flagged ? `
                        <span class="badge badge-danger" style="font-size: 9px; padding: 1px 4px;">FLAGGED AUTH</span>
                      ` : ''}
                    </div>

                    <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                      ${item.content}
                    </p>
                  </div>
                </div>
              `).join("")}
            </div>

          </div>

          <!-- Right Column: Detail & Canned Response Editor -->
          <div class="inbox-detail-pane">
            ${selectedItem ? this.renderDetailPane(selectedItem, canned) : `
              <div style="padding: 60px; text-align: center; color: var(--text-muted);">
                Select a message to view conversation and reply.
              </div>
            `}
          </div>

        </div>

      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  renderDetailPane(item, canned) {
    const isFlagged = item.is_flagged;

    return `
      <div style="display: flex; flex-direction: column; height: 100%; gap: 16px;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid var(--border-light);">
          <div style="display: flex; gap: 12px; align-items: center;">
            <img src="${item.author_avatar}" style="width: 46px; height: 46px; border-radius: 50%; object-fit: cover;">
            <div>
              <div style="font-weight: 700; font-size: 15px; color: var(--text-main);">${item.author_name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${item.author_handle} • Received ${item.received_at} via ${item.platform}</div>
            </div>
          </div>

          <!-- Status Controls -->
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary" style="font-size: 11px;" onclick="window.store.updateInboxStatus('${item.id}', 'needs_response')">
              Needs Reply
            </button>
            <button class="btn btn-secondary" style="font-size: 11px;" onclick="window.store.updateInboxStatus('${item.id}', 'escalated')">
              Escalate to Gaurav
            </button>
            <button class="btn btn-primary" style="font-size: 11px;" onclick="window.store.updateInboxStatus('${item.id}', 'resolved')">
              Mark Resolved
            </button>
          </div>
        </div>

        <!-- Authenticity / Counterfeit Alert Card if Flagged -->
        ${isFlagged ? `
          <div class="authenticity-alert-card">
            <i data-lucide="shield-alert" class="auth-alert-icon" style="width: 24px; height: 24px;"></i>
            <div style="font-size: 12px; line-height: 1.4;">
              <strong style="color: #9F1239;">Authenticity Verification Escalation:</strong>
              <div style="color: #BE123C; margin-top: 2px;">
                User is questioning pricing vs. fake Shopee/Lazada unverified listings (${item.flag_reason || 'Counterfeit check'}). 
                Direct verification protocol requires linking brand authorization proof.
              </div>
            </div>
          </div>
        ` : ''}

        <!-- Message Body -->
        <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 18px; font-size: 13px; line-height: 1.5; color: var(--text-main); border: 1px solid var(--border-color);">
          "${item.content}"
        </div>

        <!-- Canned Response Picker -->
        <div style="margin-top: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">
              Canned Response Templates:
            </span>
            <span style="font-size: 11px; color: var(--color-primary); cursor: pointer;" onclick="window.store.setView('library')">
              Manage in Library →
            </span>
          </div>

          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${canned.map(c => `
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 10px;" 
                onclick="window.InboxView.insertCanned('${c.id}', '${item.author_name}')">
                <i data-lucide="file-text" style="width: 12px; height: 12px;"></i> ${c.title}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Reply Composer -->
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: 8px;">
          <textarea id="inbox-reply-text" rows="4" 
            placeholder="Type your authentic Zenska response..."
            style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); padding: 12px; font-size: 13px; color: var(--text-main); resize: vertical;"></textarea>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 8px;" title="Attach Certificate of Authenticity">
                <i data-lucide="paperclip" style="width: 12px; height: 12px;"></i> Attach FDA Certificate
              </button>
              <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 8px;" title="Attach Ask Zena Link">
                <i data-lucide="link" style="width: 12px; height: 12px;"></i> Add Ask Zena Link
              </button>
            </div>

            <button class="btn btn-primary" onclick="window.InboxView.sendReply('${item.id}')">
              <i data-lucide="send" style="width: 14px; height: 14px;"></i> Send Reply & Resolve
            </button>
          </div>
        </div>

      </div>
    `;
  },

  setFilter(f) {
    this.activeFilter = f;
    this.render(document.getElementById("view-root"));
  },

  selectItem(id) {
    this.selectedItemId = id;
    this.render(document.getElementById("view-root"));
  },

  insertCanned(cannedId, authorName) {
    const canned = window.store.state.cannedResponses.find(c => c.id === cannedId);
    const textarea = document.getElementById("inbox-reply-text");
    if (canned && textarea) {
      const formatted = canned.text.replace(/{{name}}/g, authorName.split(" ")[0]);
      textarea.value = formatted;
    }
  },

  sendReply(itemId) {
    const textarea = document.getElementById("inbox-reply-text");
    const text = textarea ? textarea.value.trim() : "";
    if (!text) {
      alert("Please enter a reply before sending.");
      return;
    }
    window.store.sendInboxReply(itemId, text);
    this.render(document.getElementById("view-root"));
  }
};
