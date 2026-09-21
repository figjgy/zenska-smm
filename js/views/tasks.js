/**
 * Zenska SMM Command Center - Tasks & Project Management View
 * Features:
 * - Kanban board (To Do, In Progress, Needs Review, Done) with HTML5 Drag-and-Drop
 * - List View toggle
 * - Calendar View toggle
 * - Category filters (Content Creation, Community Management, Influencer Outreach, Ads, Analytics, Livestream, Admin)
 * - Subtask checklists, recurring rules, priority badges
 */

window.TasksView = {
  currentMode: "kanban", // 'kanban' | 'list' | 'calendar'
  selectedCategory: "all",

  render(container) {
    const tasks = window.store.getTasks();
    const categories = window.store.state.metadata.taskCategories;

    // Filter tasks if category selected
    const filteredTasks = this.selectedCategory === "all"
      ? tasks
      : tasks.filter(t => t.category === this.selectedCategory);

    container.innerHTML = `
      <div class="tasks-control-bar">
        <!-- View Toggle & Category Filter -->
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <div class="view-mode-toggle">
            <button class="view-mode-btn ${this.currentMode === 'kanban' ? 'active' : ''}" 
              onclick="window.TasksView.setMode('kanban')">
              <i data-lucide="trello" style="width: 14px; height: 14px;"></i> Kanban
            </button>
            <button class="view-mode-btn ${this.currentMode === 'list' ? 'active' : ''}" 
              onclick="window.TasksView.setMode('list')">
              <i data-lucide="list" style="width: 14px; height: 14px;"></i> List
            </button>
            <button class="view-mode-btn ${this.currentMode === 'calendar' ? 'active' : ''}" 
              onclick="window.TasksView.setMode('calendar')">
              <i data-lucide="calendar" style="width: 14px; height: 14px;"></i> Calendar
            </button>
          </div>

          <!-- Category filter dropdown -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 12px; color: var(--text-muted);">Category:</span>
            <select style="height: 34px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-surface); padding: 0 10px; font-size: 12px; color: var(--text-main);"
              onchange="window.TasksView.setCategory(this.value)">
              <option value="all" ${this.selectedCategory === 'all' ? 'selected' : ''}>All Categories (${tasks.length})</option>
              ${categories.map(cat => `
                <option value="${cat}" ${this.selectedCategory === cat ? 'selected' : ''}>${cat}</option>
              `).join("")}
            </select>
          </div>
        </div>

        <!-- Action buttons -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn btn-primary" onclick="window.App.openQuickAddTaskModal()">
            <i data-lucide="plus" style="width: 16px; height: 16px;"></i> Add Task
          </button>
        </div>
      </div>

      <!-- Mode Display Area -->
      <div id="tasks-mode-content">
        ${this.renderModeContent(filteredTasks)}
      </div>
    `;

    if (this.currentMode === "kanban") {
      this.attachKanbanDragDrop();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  renderModeContent(tasks) {
    if (this.currentMode === "kanban") {
      return this.renderKanban(tasks);
    } else if (this.currentMode === "list") {
      return this.renderList(tasks);
    } else {
      return this.renderCalendar(tasks);
    }
  },

  renderKanban(tasks) {
    const columns = [
      { id: "todo", title: "To Do", color: "#6E5C68" },
      { id: "in_progress", title: "In Progress", color: "#2563EB" },
      { id: "needs_review", title: "Needs Review", color: "#D97706" },
      { id: "done", title: "Done", color: "#059669" }
    ];

    return `
      <div class="kanban-board-container">
        ${columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return `
            <div class="kanban-column" data-status="${col.id}" ondragover="window.TasksView.onDragOver(event)" ondrop="window.TasksView.onDrop(event, '${col.id}')">
              <div class="kanban-column-header">
                <div class="col-header-title">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: ${col.color};"></span>
                  <span>${col.title}</span>
                </div>
                <span class="col-card-count">${colTasks.length}</span>
              </div>

              <div class="kanban-cards-wrapper">
                ${colTasks.length === 0 ? `
                  <div style="text-align: center; padding: 40px 10px; color: var(--text-dim); font-size: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">
                    Drag tasks here
                  </div>
                ` : colTasks.map(t => this.renderKanbanCard(t)).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  },

  renderKanbanCard(task) {
    const completedSubs = task.checklist ? task.checklist.filter(c => c.completed).length : 0;
    const totalSubs = task.checklist ? task.checklist.length : 0;
    const pct = totalSubs ? Math.round((completedSubs / totalSubs) * 100) : 0;

    return `
      <div class="kanban-card" draggable="true" id="card-${task.id}" data-id="${task.id}"
        ondragstart="window.TasksView.onDragStart(event, '${task.id}')">
        
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
          <span class="badge badge-neutral" style="font-size: 10px;">${task.category}</span>
          <span class="badge ${task.priority === 'High' ? 'badge-danger' : task.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}">
            ${task.priority}
          </span>
        </div>

        <h4 class="kanban-card-title">${task.title}</h4>
        ${task.description ? `<p class="kanban-card-desc">${task.description}</p>` : ''}

        ${totalSubs > 0 ? `
          <div style="margin-top: 4px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 3px;">
              <span>Subtasks</span>
              <span>${completedSubs}/${totalSubs} (${pct}%)</span>
            </div>
            <div class="subtask-progress-bar">
              <div class="subtask-progress-fill" style="width: ${pct}%;"></div>
            </div>
          </div>
        ` : ''}

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; padding-top: 8px; border-top: 1px solid var(--border-light); font-size: 11px; color: var(--text-muted);">
          <div style="display: flex; align-items: center; gap: 4px;">
            <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
            <span>${task.due_date}</span>
          </div>
          ${task.recurrence_rule && task.recurrence_rule !== 'None' ? `
            <div style="display: flex; align-items: center; gap: 3px;" title="${task.recurrence_rule}">
              <i data-lucide="repeat" style="width: 12px; height: 12px; color: var(--color-primary);"></i>
            </div>
          ` : ''}
          ${task.linked_platform ? `
            <span class="badge tag-platform-${task.linked_platform}" style="padding: 1px 5px; font-size: 9px;">${task.linked_platform.toUpperCase()}</span>
          ` : ''}
        </div>

        <!-- Quick actions -->
        <div style="display: flex; justify-content: flex-end; gap: 4px; margin-top: 2px;">
          <button class="btn-icon" style="width: 24px; height: 24px;" onclick="window.App.openTaskDetail('${task.id}')" title="View details / Checklist">
            <i data-lucide="more-horizontal" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </div>
    `;
  },

  renderList(tasks) {
    return `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="background: var(--bg-subtle); border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
              <th style="padding: 12px 16px; width: 40px;"></th>
              <th style="padding: 12px 16px;">Task</th>
              <th style="padding: 12px 16px;">Category</th>
              <th style="padding: 12px 16px;">Status</th>
              <th style="padding: 12px 16px;">Priority</th>
              <th style="padding: 12px 16px;">Due Date</th>
              <th style="padding: 12px 16px; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${tasks.map(t => `
              <tr style="border-bottom: 1px solid var(--border-light); transition: background 0.12s ease;" onmouseover="this.style.background='var(--bg-subtle)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 12px 16px;">
                  <input type="checkbox" class="task-checkbox" ${t.status === 'done' ? 'checked' : ''}
                    onchange="window.store.moveTaskStatus('${t.id}', this.checked ? 'done' : 'in_progress')">
                </td>
                <td style="padding: 12px 16px;">
                  <div style="font-weight: 600; color: var(--text-main); ${t.status === 'done' ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
                    ${t.title}
                  </div>
                  <div style="font-size: 11px; color: var(--text-muted);">${t.description ? t.description.slice(0, 75) + '...' : ''}</div>
                </td>
                <td style="padding: 12px 16px;">
                  <span class="badge badge-neutral">${t.category}</span>
                </td>
                <td style="padding: 12px 16px;">
                  <span class="badge ${t.status === 'done' ? 'badge-verified' : t.status === 'in_progress' ? 'badge-primary' : 'badge-neutral'}">
                    ${t.status.replace("_", " ")}
                  </span>
                </td>
                <td style="padding: 12px 16px;">
                  <span class="badge ${t.priority === 'High' ? 'badge-danger' : t.priority === 'Medium' ? 'badge-warning' : 'badge-neutral'}">
                    ${t.priority}
                  </span>
                </td>
                <td style="padding: 12px 16px; color: var(--text-muted); font-size: 12px;">
                  ${t.due_date}
                  ${t.recurrence_rule && t.recurrence_rule !== 'None' ? `<span style="color: var(--color-primary); margin-left: 4px;" title="${t.recurrence_rule}">🔄</span>` : ''}
                </td>
                <td style="padding: 12px 16px; text-align: right;">
                  <button class="btn btn-secondary" style="font-size: 11px; padding: 4px 8px;" onclick="window.App.openTaskDetail('${t.id}')">
                    Inspect
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  renderCalendar(tasks) {
    return `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
        <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 16px; font-weight: 700;">Task Schedule Timeline</h3>
          <span style="font-size: 12px; color: var(--text-muted);">Grouped by target completion date</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${tasks.map(t => `
            <div style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); background: var(--bg-subtle);">
              <div style="min-width: 100px; text-align: center; border-right: 2px solid var(--color-primary); padding-right: 12px;">
                <div style="font-size: 14px; font-weight: 700; color: var(--color-primary);">${t.due_date}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${t.status.replace("_", " ")}</div>
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 600; font-size: 13px;">${t.title}</div>
                <div style="font-size: 12px; color: var(--text-muted);">${t.category} • Priority: ${t.priority}</div>
              </div>
              <button class="btn btn-secondary" style="font-size: 11px;" onclick="window.App.openTaskDetail('${t.id}')">
                Checklist (${t.checklist ? t.checklist.length : 0})
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  setMode(mode) {
    this.currentMode = mode;
    this.render(document.getElementById("view-root"));
  },

  setCategory(cat) {
    this.selectedCategory = cat;
    this.render(document.getElementById("view-root"));
  },

  /* HTML5 Drag & Drop */
  onDragStart(e, taskId) {
    e.dataTransfer.setData("text/plain", taskId);
    e.target.classList.add("dragging");
  },

  onDragOver(e) {
    e.preventDefault();
  },

  onDrop(e, targetStatus) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      window.store.moveTaskStatus(taskId, targetStatus);
    }
  },

  attachKanbanDragDrop() {
    // Extra touch listener handles for mobile/tablet fallback if needed
  }
};
