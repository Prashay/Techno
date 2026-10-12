/**
 * TechnoInterview - User Question Suggestion & Task Management System
 * Enables users to manually suggest theory or programming interview questions.
 * Submissions are tracked as actionable tasks under the "User Feedback & Suggestions" hub.
 * Users can filter, search, test in compiler, mark as addressed/completed, and remove addressed tasks.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'techno_suggested_questions_v1';

  // Seed default community suggestions if first time
  function getSuggestions() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}

    var initialData = [
      {
        id: 'task-1712001',
        title: 'Explain Java 21 Scoped Values vs ThreadLocal',
        type: 'theory',
        category: 'java',
        section: 'Core Java / Java 21',
        difficulty: 'Advanced',
        content: 'How do Scoped Values (JEP 446) provide a safer, faster alternative to ThreadLocal when working with millions of Virtual Threads? Explain immutability and memory footprint benefits.',
        codeSnippet: '',
        status: 'pending', // 'pending' | 'addressed'
        author: 'Lead Dev Community',
        createdAt: '2026-10-10'
      },
      {
        id: 'task-1712002',
        title: 'Find Longest Subarray with Sum K in O(N)',
        type: 'program',
        category: 'program',
        section: 'Array Programs',
        difficulty: 'Medium',
        content: 'Given an array of integers and target sum K, return the length of the longest subarray whose sum equals K. Use HashMap prefix-sum technique for O(N) time.',
        codeSnippet: `import java.util.*;

public class LongestSubarraySumK {
    public static int longestSubarray(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int maxLen = 0, sum = 0;
        
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            if (sum == k) maxLen = i + 1;
            if (map.containsKey(sum - k)) {
                maxLen = Math.max(maxLen, i - map.get(sum - k));
            }
            if (!map.containsKey(sum)) {
                map.put(sum, i);
            }
        }
        return maxLen;
    }

    public static void main(String[] args) {
        int[] arr = {10, 5, 2, 7, 1, 9};
        System.out.println("Longest Subarray with sum 15: " + longestSubarray(arr, 15));
    }
}`,
        status: 'pending',
        author: 'Interview Candidate',
        createdAt: '2026-10-11'
      },
      {
        id: 'task-1712003',
        title: 'Spring Boot 3.3 Virtual Threads + RestClient Configuration',
        type: 'theory',
        category: 'springboot',
        section: 'Spring Boot',
        difficulty: 'Lead',
        content: 'How to configure spring.threads.virtual.enabled=true with RestClient and ensure connection pool sizing prevents thread exhaustion when hitting downstream microservices.',
        codeSnippet: `@Configuration
public class ClientConfig {
    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder.baseUrl("https://api.internal.service")
            .requestFactory(new JdkClientHttpRequestFactory())
            .build();
    }
}`,
        status: 'pending',
        author: 'Arun K.',
        createdAt: '2026-10-12'
      }
    ];

    saveSuggestions(initialData);
    return initialData;
  }

  function saveSuggestions(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  // Generate unique task ID
  function generateId() {
    return 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  // Create suggestion modal
  var modalEl = null;

  function ensureModal() {
    if (modalEl) return modalEl;

    var html = `
      <div id="suggestion-feedback-modal" class="suggest-modal-overlay" style="display:none;">
        <div class="suggest-modal-window">
          
          <!-- Header -->
          <div class="suggest-modal-header">
            <div class="d-flex align-items-center" style="gap: 12px;">
              <div class="suggest-header-icon">
                <i class="ti-light-bulb"></i>
              </div>
              <div>
                <h4 class="mb-0 text-white font-weight-bold" style="font-size: 17px;">Suggest Interview Question &bull; Task Board</h4>
                <p class="mb-0 text-muted" style="font-size: 12px;">Add theory or programming questions &bull; Tracked as action tasks</p>
              </div>
            </div>
            <button id="suggest-modal-close" class="suggest-btn-close">&times;</button>
          </div>

          <!-- Top Tabs -->
          <div class="suggest-modal-tabs">
            <button class="suggest-tab-btn active" data-tab="list">
              <i class="ti-list-ol mr-1"></i> Suggested Tasks <span id="suggest-tasks-badge" class="badge badge-pill badge-primary ml-1">0</span>
            </button>
            <button class="suggest-tab-btn" data-tab="add">
              <i class="ti-plus mr-1"></i> Add New Question
            </button>
          </div>

          <!-- Body -->
          <div class="suggest-modal-body">
            
            <!-- Tab 1: Task Board / Feedback List -->
            <div id="suggest-tab-content-list" class="suggest-tab-content active">
              
              <!-- Filter Toolbar -->
              <div class="suggest-toolbar">
                <div class="suggest-search-box">
                  <i class="ti-search"></i>
                  <input type="text" id="suggest-filter-search" placeholder="Search tasks by title, category, or keyword...">
                </div>
                <div class="suggest-filter-chips">
                  <button class="filter-chip active" data-filter="all">All (<span id="count-all">0</span>)</button>
                  <button class="filter-chip" data-filter="pending">Pending Tasks (<span id="count-pending">0</span>)</button>
                  <button class="filter-chip" data-filter="theory">Theory (<span id="count-theory">0</span>)</button>
                  <button class="filter-chip" data-filter="program">Programs (<span id="count-program">0</span>)</button>
                  <button class="filter-chip" data-filter="addressed">Addressed (<span id="count-addressed">0</span>)</button>
                </div>
              </div>

              <!-- Task List Container -->
              <div id="suggest-tasks-container" class="suggest-cards-scroll">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <!-- Tab 2: Add New Question Form -->
            <div id="suggest-tab-content-add" class="suggest-tab-content">
              <form id="suggest-new-question-form" class="suggest-form">
                
                <div class="row">
                  <div class="col-md-7 mb-3">
                    <label class="suggest-label">Question Title *</label>
                    <input type="text" id="suggest-q-title" class="suggest-input" placeholder="e.g. Find First Non-Repeated Character in Java 8" required>
                  </div>
                  <div class="col-md-5 mb-3">
                    <label class="suggest-label">Question Type *</label>
                    <div class="suggest-type-toggle">
                      <label class="type-opt">
                        <input type="radio" name="suggest-q-type" value="theory">
                        <span><i class="ti-book mr-1"></i> Theory</span>
                      </label>
                      <label class="type-opt">
                        <input type="radio" name="suggest-q-type" value="program" checked>
                        <span><i class="ti-pencil-alt mr-1"></i> Program / Code</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 mb-3">
                    <label class="suggest-label">Target Section / Category *</label>
                    <select id="suggest-q-category" class="suggest-select" required>
                      <option value="java">Core Java &bull; java8theory.html / corejava.html</option>
                      <option value="java8programs">Java 8 Programs &bull; java8programs.html</option>
                      <option value="springboot">Spring Boot &bull; springboot.html</option>
                      <option value="microservices">Microservices &bull; microservice.html</option>
                      <option value="string">String Programs &bull; Stringprograms.html</option>
                      <option value="array">Array Programs &bull; ArrayPrograms.html</option>
                      <option value="number">Number Programs &bull; numberprograms.html</option>
                      <option value="topicwise">Topicwise (Tree/DP/LRU) &bull; topicwiseprogram.html</option>
                      <option value="sql">PostgreSQL / SQL &bull; postgresql.html</option>
                      <option value="elasticsearch">Elasticsearch &bull; elasticsearch.html</option>
                      <option value="frontend">Frontend (React/Angular) &bull; reactjs.html</option>
                      <option value="cloud">Cloud (AWS/GCP/Docker) &bull; cloud.html</option>
                      <option value="kafka">Kafka &bull; kafka.html</option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="suggest-label">Target Level</label>
                    <select id="suggest-q-level" class="suggest-select">
                      <option value="Intermediate">Mid-Level Developer</option>
                      <option value="Advanced">Senior Developer (2026)</option>
                      <option value="Lead">Lead / Architect</option>
                      <option value="Basic">Fresher / Basic</option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label class="suggest-label">Your Name / Handle (Optional)</label>
                    <input type="text" id="suggest-q-author" class="suggest-input" placeholder="e.g. Rahul S. (Lowes / Infosys)">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="suggest-label">Question Description &amp; Detailed Theory *</label>
                  <textarea id="suggest-q-content" class="suggest-textarea" rows="4" placeholder="Explain the problem statement, edge cases, interviewer expectations, or theoretical core concept..." required></textarea>
                </div>

                <div class="mb-3" id="suggest-code-block-wrapper">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <label class="suggest-label mb-0">Solution Code / Program Template (Optional for code questions)</label>
                    <span class="text-muted" style="font-size:11px;">Editable in Online Compiler</span>
                  </div>
                  <textarea id="suggest-q-code" class="suggest-textarea suggest-code-input" rows="6" placeholder="// Paste Java, React, SQL, or Python code here..."></textarea>
                </div>

                <div class="d-flex justify-content-between align-items-center pt-2">
                  <button type="button" class="btn btn-outline-secondary btn-sm" id="suggest-cancel-btn">Cancel</button>
                  <button type="submit" class="btn btn-primary font-weight-bold" style="padding: 10px 24px;">
                    <i class="ti-check mr-1"></i> Add to Task Board
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    `;

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);
    modalEl = document.getElementById('suggestion-feedback-modal');

    wireModalEvents();
    return modalEl;
  }

  function wireModalEvents() {
    var closeBtn = document.getElementById('suggest-modal-close');
    var cancelBtn = document.getElementById('suggest-cancel-btn');
    var tabs = modalEl.querySelectorAll('.suggest-tab-btn');
    var tabContents = modalEl.querySelectorAll('.suggest-tab-content');
    var form = document.getElementById('suggest-new-question-form');
    var searchInput = document.getElementById('suggest-filter-search');
    var filterChips = modalEl.querySelectorAll('.filter-chip');

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', function () {
      tabs[0].click();
    });

    // Tab switcher
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tabContents.forEach(function (tc) { tc.classList.remove('active'); });
        tab.classList.add('active');
        var target = document.getElementById('suggest-tab-content-' + tab.getAttribute('data-tab'));
        if (target) target.classList.add('active');
        if (tab.getAttribute('data-tab') === 'list') {
          renderTasks();
        }
      });
    });

    // Filter chips
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterChips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        renderTasks();
      });
    });

    // Search filter input
    searchInput.addEventListener('input', function () {
      renderTasks();
    });

    // Submit new question
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var title = document.getElementById('suggest-q-title').value.trim();
      var typeEl = form.querySelector('input[name="suggest-q-type"]:checked');
      var type = typeEl ? typeEl.value : 'program';
      var categorySelect = document.getElementById('suggest-q-category');
      var category = categorySelect.value;
      var sectionText = categorySelect.options[categorySelect.selectedIndex].text.split('•')[0].trim();
      var level = document.getElementById('suggest-q-level').value;
      var author = document.getElementById('suggest-q-author').value.trim() || 'Contributor';
      var content = document.getElementById('suggest-q-content').value.trim();
      var code = document.getElementById('suggest-q-code').value.trim();

      if (!title || !content) return;

      var newTask = {
        id: generateId(),
        title: title,
        type: type,
        category: category,
        section: sectionText,
        difficulty: level,
        content: content,
        codeSnippet: code,
        status: 'pending',
        author: author,
        createdAt: new Date().toISOString().split('T')[0]
      };

      var list = getSuggestions();
      list.unshift(newTask);
      saveSuggestions(list);

      form.reset();
      updateBadges();

      // Switch to list and highlight new card
      tabs[0].click();
      showToast('Question added to Task Board! Target: ' + sectionText);
    });

    // Delegate actions inside task container
    var container = document.getElementById('suggest-tasks-container');
    container.addEventListener('click', function (e) {
      var target = e.target;

      // 1. Mark as Addressed & Remove from active tasks
      var markBtn = target.closest('.btn-task-resolve');
      if (markBtn) {
        var taskId = markBtn.getAttribute('data-id');
        resolveTask(taskId);
        return;
      }

      // 2. Delete / Remove completely
      var deleteBtn = target.closest('.btn-task-delete');
      if (deleteBtn) {
        var delId = deleteBtn.getAttribute('data-id');
        deleteTask(delId);
        return;
      }

      // 3. Test in Online Compiler
      var runBtn = target.closest('.btn-task-compiler');
      if (runBtn) {
        var code = decodeURIComponent(runBtn.getAttribute('data-code') || '');
        if (window.TechnoIDE) {
          closeModal();
          window.TechnoIDE.open('java21', code);
        }
        return;
      }

      // 4. Ask JARVIS about this question
      var jarvisBtn = target.closest('.btn-task-jarvis');
      if (jarvisBtn) {
        var qTitle = decodeURIComponent(jarvisBtn.getAttribute('data-title') || '');
        if (window.JarvisAI) {
          closeModal();
          window.JarvisAI.open('qa', qTitle);
        }
        return;
      }
    });
  }

  function resolveTask(id) {
    var list = getSuggestions();
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list[i].status = (list[i].status === 'addressed') ? 'pending' : 'addressed';
        found = true;
        break;
      }
    }
    if (found) {
      saveSuggestions(list);
      renderTasks();
      updateBadges();
      showToast('Task status updated!');
    }
  }

  function deleteTask(id) {
    if (!confirm('Remove this question task from the board?')) return;
    var list = getSuggestions().filter(function (t) { return t.id !== id; });
    saveSuggestions(list);
    renderTasks();
    updateBadges();
    showToast('Task removed from board.');
  }

  function renderTasks() {
    var container = document.getElementById('suggest-tasks-container');
    if (!container) return;

    var list = getSuggestions();
    var activeFilter = (modalEl.querySelector('.filter-chip.active') || {}).getAttribute('data-filter') || 'all';
    var searchQuery = (document.getElementById('suggest-filter-search') || {}).value || '';
    searchQuery = searchQuery.toLowerCase().trim();

    // Filter logic
    var filtered = list.filter(function (t) {
      if (activeFilter === 'pending' && t.status !== 'pending') return false;
      if (activeFilter === 'addressed' && t.status !== 'addressed') return false;
      if (activeFilter === 'theory' && t.type !== 'theory') return false;
      if (activeFilter === 'program' && t.type !== 'program') return false;

      if (searchQuery) {
        var matchTitle = t.title.toLowerCase().indexOf(searchQuery) !== -1;
        var matchContent = t.content.toLowerCase().indexOf(searchQuery) !== -1;
        var matchSec = (t.section || '').toLowerCase().indexOf(searchQuery) !== -1;
        if (!matchTitle && !matchContent && !matchSec) return false;
      }
      return true;
    });

    updateCounters(list);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="suggest-empty-state">
          <div class="empty-icon">📂</div>
          <h5>No Tasks Matching Current Filter</h5>
          <p class="text-muted">No questions found. Click "Add New Question" above to suggest a theory or code question.</p>
        </div>
      `;
      return;
    }

    var html = filtered.map(function (task) {
      var isAddressed = task.status === 'addressed';
      var badgeClass = isAddressed ? 'badge-addressed' : 'badge-pending';
      var badgeText = isAddressed ? '✓ Addressed & Merged' : '⚡ Action Task (Pending Review)';
      var typeBadge = task.type === 'program' ? '<span class="type-pill program"><i class="ti-pencil-alt"></i> Program</span>' : '<span class="type-pill theory"><i class="ti-book"></i> Theory</span>';
      
      var codePreview = '';
      if (task.codeSnippet) {
        codePreview = `
          <div class="task-code-preview">
            <div class="task-code-header">
              <span><i class="ti-layout-tab-window mr-1"></i> Code Snippet</span>
              <button class="btn-task-compiler" data-code="${encodeURIComponent(task.codeSnippet)}" title="Open and execute code in Online Compiler">
                <i class="ti-control-play mr-1"></i> Test in IDE
              </button>
            </div>
            <pre><code>${escapeHtml(task.codeSnippet)}</code></pre>
          </div>
        `;
      }

      return `
        <div class="suggest-task-card ${isAddressed ? 'task-card-resolved' : ''}" id="${task.id}">
          <div class="task-card-top">
            <div class="d-flex align-items-center flex-wrap" style="gap: 8px;">
              ${typeBadge}
              <span class="task-section-pill"><i class="ti-tag mr-1"></i>${escapeHtml(task.section || 'General')}</span>
              <span class="task-level-pill">${escapeHtml(task.difficulty || 'Medium')}</span>
              <span class="task-status-pill ${badgeClass}">${badgeText}</span>
            </div>
            <div class="task-date-pill text-muted">
              ${escapeHtml(task.createdAt || 'Recent')} &bull; By ${escapeHtml(task.author || 'User')}
            </div>
          </div>

          <h5 class="task-title mt-2 mb-2">
            ${isAddressed ? '<s>' + escapeHtml(task.title) + '</s>' : escapeHtml(task.title)}
          </h5>

          <p class="task-content-desc mb-3">${escapeHtml(task.content)}</p>

          ${codePreview}

          <div class="task-card-actions">
            <div class="d-flex align-items-center" style="gap: 8px;">
              <button class="btn-task-resolve ${isAddressed ? 'resolved' : ''}" data-id="${task.id}">
                ${isAddressed ? '<i class="ti-reload mr-1"></i> Reopen Task' : '<i class="ti-check mr-1"></i> Mark as Addressed &amp; Merge'}
              </button>
              <button class="btn-task-jarvis" data-title="${encodeURIComponent(task.title)}" title="Ask JARVIS AI to answer or verify this question">
                <i class="ti-bolt mr-1"></i> Ask JARVIS
              </button>
            </div>
            <button class="btn-task-delete" data-id="${task.id}" title="Remove question task from board">
              <i class="ti-trash"></i> Remove
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  function updateCounters(list) {
    var pendingCount = list.filter(function (t) { return t.status === 'pending'; }).length;
    var addressedCount = list.filter(function (t) { return t.status === 'addressed'; }).length;
    var theoryCount = list.filter(function (t) { return t.type === 'theory'; }).length;
    var progCount = list.filter(function (t) { return t.type === 'program'; }).length;

    var elAll = document.getElementById('count-all');
    var elPending = document.getElementById('count-pending');
    var elTheory = document.getElementById('count-theory');
    var elProg = document.getElementById('count-program');
    var elAddressed = document.getElementById('count-addressed');

    if (elAll) elAll.innerText = list.length;
    if (elPending) elPending.innerText = pendingCount;
    if (elTheory) elTheory.innerText = theoryCount;
    if (elProg) elProg.innerText = progCount;
    if (elAddressed) elAddressed.innerText = addressedCount;

    var badge = document.getElementById('suggest-tasks-badge');
    if (badge) badge.innerText = pendingCount;
  }

  function updateBadges() {
    var list = getSuggestions();
    var pendingCount = list.filter(function (t) { return t.status === 'pending'; }).length;
    var badge = document.getElementById('suggest-tasks-badge');
    if (badge) badge.innerText = pendingCount;

    // Update floating trigger badge if present
    var floatBadge = document.getElementById('suggest-float-badge');
    if (floatBadge) floatBadge.innerText = pendingCount;
  }

  function openModal(tab) {
    var modal = ensureModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    var tabs = modal.querySelectorAll('.suggest-tab-btn');
    if (tab === 'add' && tabs[1]) {
      tabs[1].click();
    } else if (tabs[0]) {
      tabs[0].click();
    }
  }

  function closeModal() {
    if (modalEl) {
      modalEl.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  // Floating trigger button on bottom-left (next to JARVIS) or navbar
  function addFloatingSuggestTrigger() {
    if (document.getElementById('floating-suggest-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-suggest-btn';
    btn.className = 'floating-suggest-btn';
    btn.setAttribute('aria-label', 'Suggest Questions & Feedback Tasks');
    btn.innerHTML = `
      <svg class="suggest-launcher-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2a6 6 0 0 1 6 6c0 3-2 5-2 7H8c0-2-2-4-2-7a6 6 0 0 1 6-6z"/>
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
      </svg>
      <span class="suggest-pulse-ring"></span>
      <span id="suggest-float-badge" class="suggest-float-badge">0</span>
      <span class="floating-tooltip">Suggest Question / Tasks</span>
    `;
    btn.title = 'Suggest Interview Question & Community Tasks';

    btn.addEventListener('click', function () {
      openModal('list');
    });

    document.body.appendChild(btn);
    updateBadges();
  }

  function showToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'suggest-toast-notification';
    toast.innerHTML = '<i class="ti-check-box mr-2"></i>' + escapeHtml(msg);
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 50);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3200);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  // Global injection on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addFloatingSuggestTrigger();
    });
  } else {
    addFloatingSuggestTrigger();
  }

  // Expose Global API
  window.TechnoFeedback = {
    open: openModal,
    addQuestion: function (task) {
      var list = getSuggestions();
      task.id = generateId();
      task.status = 'pending';
      task.createdAt = new Date().toISOString().split('T')[0];
      list.unshift(task);
      saveSuggestions(list);
      updateBadges();
      return task;
    },
    getTasks: getSuggestions,
    resolveTask: resolveTask,
    deleteTask: deleteTask
  };
})();
