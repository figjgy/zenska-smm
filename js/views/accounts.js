/**
 * Zenska SMM Command Center - Connected Accounts View
 * Features:
 * - OAuth integration overview for Instagram, TikTok, Facebook, YouTube, X, LinkedIn, Pinterest
 * - Follower metrics, token health indicators (green/yellow/red)
 * - 1-Click Reconnect / Token Renewal
 * - Individual Disconnect without side effects
 */

window.AccountsView = {
  render(container) {
    const accounts = window.store.getAccounts();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        
        <!-- Header & Explanation -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main);">Connected Social Channels</h2>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px; max-width: 680px;">
              Manage OAuth permissions and API health for all connected publishing endpoints. Tokens are refreshed securely to guarantee automated scheduling for Zenska campaigns.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="window.AccountsView.refreshAllTokens()">
              <i data-lucide="refresh-cw" style="width: 14px; height: 14px;"></i> Refresh All Heartbeats
            </button>
            <button class="btn btn-primary" onclick="window.AccountsView.openConnectModal()">
              <i data-lucide="plus" style="width: 14px; height: 14px;"></i> Connect New Channel
            </button>
          </div>
        </div>

        <!-- Accounts Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
          ${accounts.map(acc => {
            const isHealthy = acc.token_status === "healthy";
            const isExpiring = acc.token_status === "expiring_soon";
            const isExpired = acc.token_status === "expired";

            const statusClass = isHealthy ? "badge-verified" : isExpiring ? "badge-warning" : "badge-danger";
            const statusText = isHealthy ? "Token Healthy" : isExpiring ? "Expiring Soon" : "Disconnected";

            return `
              <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px; box-shadow: var(--shadow-sm); transition: all 0.15s ease;">
                
                <!-- Card Header -->
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${acc.avatar_url}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--border-color);">
                    <div>
                      <div style="font-weight: 700; font-size: 14px; color: var(--text-main);">${acc.profile_name}</div>
                      <div style="font-size: 11px; color: var(--text-muted);">${acc.platform_label}</div>
                    </div>
                  </div>
                  <span class="badge ${statusClass}">
                    <span style="width: 6px; height: 6px; border-radius: 50%; background: currentColor;"></span>
                    ${statusText}
                  </span>
                </div>

                <!-- Metrics & Health Strip -->
                <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                  <div>
                    <span style="color: var(--text-muted); font-size: 11px;">Followers:</span>
                    <div style="font-weight: 700; font-size: 15px; color: var(--text-main);">${acc.follower_count}</div>
                  </div>
                  <div>
                    <span style="color: var(--text-muted); font-size: 11px;">Token Health:</span>
                    <div style="font-weight: 600; font-size: 13px; color: ${isHealthy ? 'var(--color-verified)' : isExpiring ? 'var(--color-warning)' : 'var(--color-danger)'};">
                      ${isExpired ? 'Needs OAuth Re-auth' : `${acc.token_expires_days} days valid`}
                    </div>
                  </div>
                </div>

                <!-- Action row -->
                <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--border-light); font-size: 11px; color: var(--text-dim);">
                  <span>Connected since ${acc.connected_at}</span>
                  
                  <div style="display: flex; gap: 6px;">
                    ${!isHealthy ? `
                      <button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="window.AccountsView.reconnect('${acc.id}')">
                        <i data-lucide="key" style="width: 12px; height: 12px;"></i> Reconnect
                      </button>
                    ` : `
                      <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 8px;" onclick="window.AccountsView.reconnect('${acc.id}')" title="Test handshake">
                        <i data-lucide="check" style="width: 12px; height: 12px;"></i> Ping API
                      </button>
                    `}
                    <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 8px;" onclick="window.AccountsView.toggleDisconnect('${acc.id}')">
                      ${isExpired ? 'Remove' : 'Disconnect'}
                    </button>
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

  reconnect(accId) {
    window.store.reconnectAccount(accId);
    this.render(document.getElementById("view-root"));
  },

  toggleDisconnect(accId) {
    window.store.toggleAccountStatus(accId);
    this.render(document.getElementById("view-root"));
  },

  refreshAllTokens() {
    const accounts = window.store.getAccounts();
    accounts.forEach(a => window.store.reconnectAccount(a.id));
    window.store.emit("notification", { type: "success", message: "All OAuth tokens re-authenticated successfully." });
    this.render(document.getElementById("view-root"));
  },

  openConnectModal() {
    window.App.openModal(`
      <div class="modal-header">
        <h3 class="modal-title">Connect Brand Channel</h3>
        <button class="btn-icon" onclick="window.App.closeModal()"><i data-lucide="x"></i></button>
      </div>
      <div class="modal-body">
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 16px;">
          Authenticate official Zenska.ph social channels with token encryption and automated webhook listeners.
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${[
            { name: "Viber Community PH", desc: "Zenska Flash Deals & VIP Shoppers (25k members)", icon: "message-circle" },
            { name: "Telegram Authenticity Bot", desc: "Batch verification lookup channel", icon: "send" },
            { name: "Threads (@zenska.ph)", desc: "Conversational beauty & ingredient banter", icon: "at-sign" }
          ].map(opt => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-subtle);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 34px; height: 34px; border-radius: 8px; background: var(--color-accent); color: var(--color-primary); display: flex; align-items: center; justify-content: center;">
                  <i data-lucide="${opt.icon}" style="width: 18px; height: 18px;"></i>
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 13px;">${opt.name}</div>
                  <div style="font-size: 11px; color: var(--text-muted);">${opt.desc}</div>
                </div>
              </div>
              <button class="btn btn-primary" style="font-size: 11px; padding: 4px 10px;" onclick="window.AccountsView.connectNewChannel('${opt.name}')">
                Connect
              </button>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="window.App.closeModal()">Close</button>
      </div>
    `);
    if (window.lucide) window.lucide.createIcons();
  },

  connectNewChannel(name) {
    window.App.closeModal();
    window.store.emit("notification", { type: "success", message: `OAuth connection established for ${name}.` });
  }
};
