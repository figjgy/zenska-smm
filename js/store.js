/**
 * Zenska SMM Command Center - Centralized Reactive State Store
 * Features:
 * - LocalStorage persistence
 * - Reactive pub/sub event system
 * - Full CRUD for all modules
 * - Offline queue management
 * - Viewport device simulation state
 */

class ZenskaStore {
  constructor() {
    this.storageKey = "zenska_smm_state_v2";
    this.listeners = new Map();
    this.deviceMode = localStorage.getItem("zenska_device_mode") || "auto"; // 'auto' | 'desktop' | 'tablet' | 'phone'
    this.currentView = "home";
    this.searchQuery = "";
    this.isOffline = false;
    this.offlineQueue = [];
    this.darkMode = localStorage.getItem("zenska_dark_mode") === "true";

    this.state = this.loadInitialState();
  }

  loadInitialState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure metadata exists
        if (parsed && parsed.tasks && parsed.posts) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not load from localStorage, falling back to defaults", e);
    }
    return JSON.parse(JSON.stringify(window.ZENSKA_INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Failed to save state to localStorage", e);
    }
    this.emit("state_changed", this.state);
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(window.ZENSKA_INITIAL_DATA));
    this.saveState();
    this.emit("notification", { type: "info", message: "Reset to default Zenska demo data." });
  }

  /* --- Event Bus --- */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in listener for ${event}:`, err);
        }
      });
    }
  }

  /* --- View & Device Management --- */
  setView(viewName) {
    this.currentView = viewName;
    this.emit("view_changed", viewName);
  }

  setDeviceMode(mode) {
    this.deviceMode = mode;
    localStorage.setItem("zenska_device_mode", mode);
    this.emit("device_mode_changed", mode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem("zenska_dark_mode", this.darkMode ? "true" : "false");
    document.documentElement.classList.toggle("dark-theme", this.darkMode);
    this.emit("dark_mode_changed", this.darkMode);
  }

  setSearchQuery(q) {
    this.searchQuery = q.trim().toLowerCase();
    this.emit("search_changed", this.searchQuery);
  }

  /* --- Offline Tolerance Simulation --- */
  toggleOffline(forceStatus) {
    this.isOffline = typeof forceStatus === "boolean" ? forceStatus : !this.isOffline;
    if (!this.isOffline && this.offlineQueue.length > 0) {
      this.syncOfflineQueue();
    }
    this.emit("offline_status_changed", this.isOffline);
    this.emit("notification", {
      type: this.isOffline ? "warning" : "success",
      message: this.isOffline
        ? "Network offline: Post scheduling will queue locally."
        : `Online restored: ${this.offlineQueue.length} queued items synced.`
    });
  }

  syncOfflineQueue() {
    const count = this.offlineQueue.length;
    this.offlineQueue.forEach(item => {
      if (item.action === "add_post") {
        this.state.posts.unshift(item.data);
      }
    });
    this.offlineQueue = [];
    this.saveState();
    this.emit("offline_synced", count);
  }

  /* --- Tasks Management --- */
  getTasks() {
    return this.state.tasks;
  }

  getTodayTasks() {
    return this.state.tasks.slice(0, 4);
  }

  addTask(taskData) {
    const newTask = {
      id: "task-" + Date.now(),
      title: taskData.title || "Untitled Task",
      description: taskData.description || "",
      category: taskData.category || "Content Creation",
      status: taskData.status || "todo",
      priority: taskData.priority || "Medium",
      due_date: taskData.due_date || new Date().toISOString().split("T")[0],
      linked_platform: taskData.linked_platform || null,
      recurrence_rule: taskData.recurrence_rule || "None",
      checklist: taskData.checklist || []
    };
    this.state.tasks.unshift(newTask);
    this.saveState();
    this.emit("tasks_updated", this.state.tasks);
    this.emit("notification", { type: "success", message: `Task "${newTask.title}" created.` });
    return newTask;
  }

  updateTask(taskId, updates) {
    const idx = this.state.tasks.findIndex(t => t.id === taskId);
    if (idx !== -1) {
      this.state.tasks[idx] = { ...this.state.tasks[idx], ...updates };
      this.saveState();
      this.emit("tasks_updated", this.state.tasks);
    }
  }

  deleteTask(taskId) {
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    this.saveState();
    this.emit("tasks_updated", this.state.tasks);
    this.emit("notification", { type: "info", message: "Task deleted." });
  }

  moveTaskStatus(taskId, newStatus) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      this.saveState();
      this.emit("tasks_updated", this.state.tasks);
      this.emit("notification", {
        type: "success",
        message: `Task moved to ${newStatus.replace("_", " ").toUpperCase()}`
      });
    }
  }

  toggleSubtask(taskId, subtaskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task && task.checklist) {
      const item = task.checklist.find(c => c.id === subtaskId);
      if (item) {
        item.completed = !item.completed;
        this.saveState();
        this.emit("tasks_updated", this.state.tasks);
      }
    }
  }

  /* --- Posts & Content Calendar Management --- */
  getPosts() {
    return this.state.posts;
  }

  addPost(postData) {
    const newPost = {
      id: "post-" + Date.now(),
      caption: postData.caption || "",
      platforms: postData.platforms && postData.platforms.length ? postData.platforms : ["instagram"],
      content_pillar: postData.content_pillar || "Authenticity & Trust",
      scheduled_at: postData.scheduled_at || new Date().toISOString(),
      status: postData.status || "scheduled",
      campaign_id: postData.campaign_id || null,
      media: postData.media || [],
      published_urls: {}
    };

    if (this.isOffline) {
      this.offlineQueue.push({ action: "add_post", data: newPost });
      this.emit("notification", {
        type: "warning",
        message: "Saved to Offline Queue. Will sync when back online."
      });
      return newPost;
    }

    this.state.posts.unshift(newPost);
    this.saveState();
    this.emit("posts_updated", this.state.posts);
    this.emit("notification", {
      type: "success",
      message: `Post scheduled for ${new Date(newPost.scheduled_at).toLocaleDateString()}`
    });
    return newPost;
  }

  reschedulePost(postId, newDateIso) {
    const post = this.state.posts.find(p => p.id === postId);
    if (post) {
      post.scheduled_at = newDateIso;
      this.saveState();
      this.emit("posts_updated", this.state.posts);
      this.emit("notification", {
        type: "success",
        message: `Post rescheduled to ${new Date(newDateIso).toLocaleDateString()}`
      });
    }
  }

  deletePost(postId) {
    this.state.posts = this.state.posts.filter(p => p.id !== postId);
    this.saveState();
    this.emit("posts_updated", this.state.posts);
    this.emit("notification", { type: "info", message: "Post removed from schedule." });
  }

  /* --- Accounts Management --- */
  getAccounts() {
    return this.state.connectedAccounts;
  }

  reconnectAccount(accountId) {
    const acc = this.state.connectedAccounts.find(a => a.id === accountId);
    if (acc) {
      acc.token_status = "healthy";
      acc.token_health_color = "green";
      acc.token_expires_days = 90;
      acc.status_badge = "Active";
      this.saveState();
      this.emit("accounts_updated", this.state.connectedAccounts);
      this.emit("notification", {
        type: "success",
        message: `Successfully refreshed OAuth token for ${acc.platform_label}`
      });
    }
  }

  toggleAccountStatus(accountId) {
    const acc = this.state.connectedAccounts.find(a => a.id === accountId);
    if (acc) {
      if (acc.token_status === "expired") {
        this.reconnectAccount(accountId);
      } else {
        acc.token_status = "expired";
        acc.token_health_color = "red";
        acc.token_expires_days = 0;
        acc.status_badge = "Disconnected";
        this.saveState();
        this.emit("accounts_updated", this.state.connectedAccounts);
        this.emit("notification", {
          type: "warning",
          message: `${acc.platform_label} disconnected.`
        });
      }
    }
  }

  /* --- Media Assets Management --- */
  getMedia() {
    return this.state.mediaAssets;
  }

  addMediaAsset(asset) {
    const newAsset = {
      id: "m-" + Date.now(),
      title: asset.title || "Uploaded Asset",
      file_url: asset.file_url || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      type: asset.type || "photo",
      tags: asset.tags || ["General"],
      uploaded_at: new Date().toISOString().split("T")[0],
      dimensions: asset.dimensions || "1080x1080",
      size_kb: asset.size_kb || 512,
      used_in_posts: []
    };
    this.state.mediaAssets.unshift(newAsset);
    this.saveState();
    this.emit("media_updated", this.state.mediaAssets);
    this.emit("notification", { type: "success", message: `Asset "${newAsset.title}" added to Media Library.` });
    return newAsset;
  }

  /* --- Inbox & Flagged Management --- */
  getInbox(statusFilter = "all") {
    let list = this.state.inboxItems;
    if (statusFilter === "flagged") {
      return list.filter(i => i.is_flagged);
    }
    if (statusFilter === "needs_response") {
      return list.filter(i => i.status === "needs_response");
    }
    if (statusFilter === "resolved") {
      return list.filter(i => i.status === "resolved");
    }
    if (statusFilter === "escalated") {
      return list.filter(i => i.status === "escalated");
    }
    return list;
  }

  updateInboxStatus(itemId, status) {
    const item = this.state.inboxItems.find(i => i.id === itemId);
    if (item) {
      item.status = status;
      this.saveState();
      this.emit("inbox_updated", this.state.inboxItems);
      this.emit("notification", {
        type: "info",
        message: `Message marked as ${status.replace("_", " ")}.`
      });
    }
  }

  sendInboxReply(itemId, replyText) {
    const item = this.state.inboxItems.find(i => i.id === itemId);
    if (item) {
      item.reply_text = replyText;
      item.status = "resolved";
      this.saveState();
      this.emit("inbox_updated", this.state.inboxItems);
      this.emit("notification", {
        type: "success",
        message: `Reply sent to ${item.author_name}. Marked resolved.`
      });
    }
  }

  /* --- Influencers Management --- */
  getInfluencers() {
    return this.state.influencers;
  }

  updateInfluencerStatus(infId, newStatus) {
    const inf = this.state.influencers.find(i => i.id === infId);
    if (inf) {
      inf.pipeline_status = newStatus;
      this.saveState();
      this.emit("influencers_updated", this.state.influencers);
      this.emit("notification", {
        type: "success",
        message: `${inf.name} pipeline updated to: ${newStatus}`
      });
    }
  }

  addInfluencer(data) {
    const newInf = {
      id: "inf-" + Date.now(),
      name: data.name,
      handle: data.handle || "@creator",
      platform: data.platform || "Instagram",
      follower_count: data.follower_count || "10,000",
      niche: data.niche || "Skinfluencer",
      contact_info: {
        email: data.email || "",
        phone: data.phone || ""
      },
      pipeline_status: data.pipeline_status || "Identified",
      notes: data.notes || "",
      seeded_products: data.seeded_products || [],
      received_content: []
    };
    this.state.influencers.unshift(newInf);
    this.saveState();
    this.emit("influencers_updated", this.state.influencers);
    this.emit("notification", { type: "success", message: `Added ${newInf.name} to Influencer CRM.` });
    return newInf;
  }

  /* --- Hashtags & Captions --- */
  getHashtags() {
    return this.state.hashtagSets;
  }

  getCaptionTemplates() {
    return this.state.captionTemplates;
  }

  /* --- Campaigns & Competitor Watch --- */
  getCampaigns() {
    return this.state.campaigns;
  }

  getCompetitorNotes() {
    return this.state.competitorNotes;
  }

  addCompetitorNote(noteData) {
    const newNote = {
      id: "comp-" + Date.now(),
      competitor_name: noteData.competitor_name,
      observation: noteData.observation,
      date_logged: new Date().toISOString().split("T")[0],
      source_url: noteData.source_url || "",
      tag: noteData.tag || "Counterfeit Watch"
    };
    this.state.competitorNotes.unshift(newNote);
    this.saveState();
    this.emit("competitors_updated", this.state.competitorNotes);
    this.emit("notification", { type: "success", message: "Intelligence entry logged." });
    return newNote;
  }
}

// Instantiate global store
window.store = new ZenskaStore();
