const fs = require('fs');
const path = require('path');

const builderPath = path.join(__dirname, 'build_personal_interview_page.js');
let builder = fs.readFileSync(builderPath, 'utf8');
const isCRLF = builder.includes('\r\n');
builder = builder.replace(/\r\n/g, '\n');

// 1. Update Q34 in sectionsData (Notice period & LWD 27 Nov)
const oldQ34 = `      {
        num: "Q34",
        q: "What is your notice period?",
        spoken: "My official notice period is [insert the notice period stated in your employment agreement].\\n\\nIf selected, I'll ensure a professional transition and proper knowledge transfer. I'll also discuss the joining timeline with my current organization if an earlier release is needed.",
        note: "Confirm your official notice period before the interview."
      },`;

const newQ34 = `      {
        num: "Q34",
        q: "What is your notice period, and when is your last working day?",
        spoken: "My official notice period is currently being served, and my Last Working Day (LWD) is 27 November 2026.\\n\\nSince my notice is already active, I am available as an early / immediate joiner. I will ensure a thorough knowledge transfer and clean handover, and I can join your engineering team on or right after 28 November.",
        note: "Verified: Official notice served. Last Working Day is 27 Nov 2026. Use immediate-joiner status as a major advantage."
      },`;

if (builder.includes(oldQ34)) {
  builder = builder.replace(oldQ34, newQ34);
  console.log('1. Updated Q34 with LWD 27 Nov');
} else {
  console.log('1. Warning: oldQ34 not matched');
}

// 2. Update Q37 in sectionsData (When can you join?)
const oldQ37 = `      {
        num: "Q37",
        q: "When can you join?",
        spoken: "I would be able to join after completing my contractual notice period and handing over my current responsibilities professionally.\\n\\nOnce we reach the offer stage, I can discuss the joining timeline and explore whether any flexibility is possible."
      },`;

const newQ37 = `      {
        num: "Q37",
        q: "When can you join?",
        spoken: "I can join immediately after completing my active notice period—my official Last Working Day is 27 November 2026.\\n\\nBecause my notice is already active, there are no administrative delays or long notice lock-ins. I can join your team on or right after 28 November."
      },`;

if (builder.includes(oldQ37)) {
  builder = builder.replace(oldQ37, newQ37);
  console.log('2. Updated Q37 with LWD 27 Nov joining date');
} else {
  console.log('2. Warning: oldQ37 not matched');
}

// 3. Inject new CSS styles into <style> block
const styleMarker = '.exec-stat-card.c-cyan::before { background: linear-gradient(90deg, #06b6d4, #3b82f6); }';
const newStyles = `.exec-stat-card.c-cyan::before { background: linear-gradient(90deg, #06b6d4, #3b82f6); }
    .exec-stat-card.c-rose::before { background: linear-gradient(90deg, #f43f5e, #fb7185); }

    /* Editable Highlights Styling */
    .editable-highlight {
      border-radius: 6px;
      padding: 1px 4px;
      margin: -1px -4px;
      transition: all 0.2s ease;
      cursor: text;
    }
    .editable-highlight:hover,
    .editable-highlight:focus {
      outline: 2px dashed #0284c7 !important;
      background: rgba(2, 132, 199, 0.06);
    }
    .exec-badge-pill {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 10px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }
    .badge-lwd {
      background: #ffe4e6;
      color: #e11d48;
      border: 1px solid #fecdd3;
    }

    /* Smart Quick Chips Bar */
    .quick-chips-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 7px;
      width: 100%;
      padding-top: 10px;
      border-top: 1px dashed #e2e8f0;
      margin-top: 12px;
    }
    .quick-chip-label {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      margin-right: 4px;
    }
    .quick-filter-chip {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .quick-filter-chip:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.2);
    }
    .quick-filter-chip.active {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
    }
    .quick-filter-chip.chip-hot {
      border-color: #38bdf8;
      color: #0284c7;
    }
    .quick-filter-chip.chip-clear {
      background: #fee2e2;
      border-color: #fca5a5;
      color: #b91c1c;
    }

    /* Smart Topic Guidance Hint Banner */
    .smart-search-hint-card {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 14px;
      padding: 14px 18px;
      margin-bottom: 22px;
      box-shadow: 0 4px 14px rgba(22, 101, 52, 0.05);
      animation: fadeIn 0.25s ease;
    }
    .hint-icon-box {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: #dcfce7;
      color: #16a34a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }
    .hint-title {
      font-size: 14px;
      font-weight: 800;
      color: #15803d;
      margin-bottom: 2px;
    }
    .hint-body {
      font-size: 13px;
      color: #166534;
      line-height: 1.5;
    }
    .hint-jump-btn {
      background: #16a34a;
      border: none;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 8px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .hint-jump-btn:hover {
      background: #15803d;
      transform: translateY(-1px);
    }

    /* ==========================================================================
       Dedicated Interview Q&A Copilot Helper
       ========================================================================== */
    .interview-copilot-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      padding: 26px 30px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03);
      position: relative;
      overflow: hidden;
    }
    .interview-copilot-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0284c7, #6366f1, #10b981);
    }
    .copilot-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      color: #0369a1;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 3px 10px;
      border-radius: 20px;
      margin-bottom: 8px;
    }
    .copilot-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.3px;
      margin-bottom: 4px;
    }
    .copilot-sub {
      font-size: 13.5px;
      color: #64748b;
      margin-bottom: 18px;
      line-height: 1.55;
    }
    .copilot-search-box-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      margin-bottom: 12px;
    }
    .copilot-search-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 16px;
      pointer-events: none;
    }
    .copilot-search-input {
      flex: 1;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 12px 16px 12px 44px;
      font-size: 14.5px;
      font-family: inherit;
      color: #0f172a;
      transition: all 0.2s ease;
    }
    .copilot-search-input:focus {
      outline: none;
      background: #ffffff;
      border-color: #0284c7;
      box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
    }
    .copilot-ask-btn {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      color: #ffffff;
      border: none;
      border-radius: 14px;
      padding: 12px 22px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
    }
    .copilot-ask-btn:hover {
      background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(2, 132, 199, 0.4);
    }
    .copilot-prompts-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }
    .copilot-prompts-label {
      font-size: 11.5px;
      font-weight: 700;
      color: #64748b;
      margin-right: 4px;
    }
    .copilot-prompt-pill {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      color: #334155;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .copilot-prompt-pill:hover {
      background: #e2e8f0;
      color: #0f172a;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }

    /* Copilot Answer Display */
    .copilot-result-container {
      margin-top: 18px;
      animation: fadeIn 0.25s ease;
    }
    .copilot-answer-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 22px 24px;
    }
    .copilot-ans-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }
    .copilot-qnum-tag {
      background: #0284c7;
      color: #ffffff;
      font-weight: 800;
      font-size: 11px;
      padding: 2px 7px;
      border-radius: 6px;
    }
    .copilot-sec-tag {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .copilot-match-badge {
      font-size: 11.5px;
      font-weight: 700;
      color: #15803d;
      background: #dcfce7;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .copilot-ans-question {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.4;
      margin-bottom: 12px;
    }
    .copilot-cheatsheet-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 14px;
    }
    .cheat-pill {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 3px 10px;
      border-radius: 8px;
      font-size: 11.5px;
      color: #334155;
    }
    .copilot-speech-bubble {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #0284c7;
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 16px;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
    }
    .bubble-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .bubble-tag {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: #0284c7;
    }
    .copilot-speech-text {
      font-size: 14.5px;
      line-height: 1.7;
      color: #0f172a;
      white-space: pre-line;
      font-weight: 400;
    }
    .copilot-footer-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
    }
    .copilot-related-wrap {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px dashed #cbd5e1;
    }
    .copilot-related-title {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .copilot-related-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .copilot-related-btn {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 10px;
      font-size: 12.5px;
      color: #1e293b;
      cursor: pointer;
      text-align: left;
      transition: all 0.18s ease;
    }
    .copilot-related-btn:hover {
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
    }`;

if (builder.includes(styleMarker)) {
  builder = builder.replace(styleMarker, newStyles);
  console.log('3. Injected Copilot and Smart Filter CSS styles');
} else {
  console.log('3. Warning: styleMarker not matched');
}

// 4. Update the Executive Highlights Grid HTML with Editable fields and LWD 27 Nov
const oldExecGrid = `    <!-- Executive Highlights Cards -->
    <div class="executive-stats-grid">
      <div class="exec-stat-card c-blue">
        <div class="exec-stat-val">8+ Years</div>
        <div class="exec-stat-label">Java Backend Experience</div>
        <div class="exec-stat-sub">Spring Boot &bull; Microservices &bull; Distributed Systems</div>
      </div>
      <div class="exec-stat-card c-violet">
        <div class="exec-stat-val">8 / 10 Engineers</div>
        <div class="exec-stat-label">Mentorship &amp; Leadership</div>
        <div class="exec-stat-sub">8 at Lowe's India &bull; 10 at IBM Kubernetes Control Plane</div>
      </div>
      <div class="exec-stat-card c-emerald">
        <div class="exec-stat-val">₹29 LPA</div>
        <div class="exec-stat-label">Current Total CTC</div>
        <div class="exec-stat-sub">₹26.5L Fixed + ₹2.5L Variable Component (~9%)</div>
      </div>
      <div class="exec-stat-card c-amber">
        <div class="exec-stat-val">₹40–42 LPA</div>
        <div class="exec-stat-label">Suggested Opening Expectation</div>
        <div class="exec-stat-sub">Justified by API optimization (8s &rarr; 170ms) &amp; leadership</div>
      </div>
      <div class="exec-stat-card c-cyan">
        <div class="exec-stat-val">60 Curated Q&amp;As</div>
        <div class="exec-stat-label">HR + Production Scenarios</div>
        <div class="exec-stat-sub">45 Recruiter Scripts &bull; 15 Production Architecture Scenarios</div>
      </div>
    </div>`;

const newExecGrid = `    <!-- Executive Career Highlights (Editable & Auto-saved) -->
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div class="d-flex align-items-center">
        <span class="pulse-dot mr-2"></span>
        <strong class="text-dark" style="font-size: 15px;">Executive Highlights &amp; Negotiation Parameters</strong>
        <span class="badge badge-light border text-primary ml-2 px-2 py-1" style="font-size: 11px; font-weight: 600;">
          <i class="ti-pencil-alt mr-1"></i>Click any value to edit &bull; Auto-saves
        </span>
      </div>
      <div class="d-flex align-items-center" style="gap: 8px;">
        <button type="button" id="btn-edit-highlights" class="btn btn-sm btn-outline-primary" style="border-radius: 8px; font-size: 12px; padding: 4px 10px;">
          <i class="ti-pencil mr-1"></i> Quick Edit
        </button>
        <button type="button" id="btn-reset-highlights" class="btn btn-sm btn-outline-secondary" style="border-radius: 8px; font-size: 12px; padding: 4px 10px;" title="Reset all highlight values to candidate defaults">
          <i class="ti-reload mr-1"></i> Reset Defaults
        </button>
      </div>
    </div>

    <div class="executive-stats-grid">
      <!-- 1. Last Working Day (LWD 27 Nov) -->
      <div class="exec-stat-card c-rose">
        <span class="exec-badge-pill badge-lwd"><i class="ti-calendar mr-1"></i>Notice Served</span>
        <div class="exec-stat-val editable-highlight" id="hl-lwd" data-hkey="lwd" contenteditable="true" title="Click to edit value">27 Nov</div>
        <div class="exec-stat-label">Last Working Day (LWD)</div>
        <div class="exec-stat-sub editable-highlight" id="hl-lwd-sub" data-hkey="lwd_sub" contenteditable="true" title="Click to edit note">Notice Active &bull; Immediate Joiner</div>
      </div>

      <!-- 2. Current CTC -->
      <div class="exec-stat-card c-emerald">
        <div class="exec-stat-val editable-highlight" id="hl-ctc-current" data-hkey="ctc_current" contenteditable="true" title="Click to edit value">₹29 LPA</div>
        <div class="exec-stat-label">Current Total CTC</div>
        <div class="exec-stat-sub editable-highlight" id="hl-ctc-current-sub" data-hkey="ctc_current_sub" contenteditable="true" title="Click to edit note">₹26.5L Fixed + ₹2.5L Variable Component (~9%)</div>
      </div>

      <!-- 3. Suggested Expectation Ask -->
      <div class="exec-stat-card c-amber">
        <div class="exec-stat-val editable-highlight" id="hl-ctc-expected" data-hkey="ctc_expected" contenteditable="true" title="Click to edit value">₹40–42 LPA</div>
        <div class="exec-stat-label">Suggested Opening Expectation</div>
        <div class="exec-stat-sub editable-highlight" id="hl-ctc-expected-sub" data-hkey="ctc_expected_sub" contenteditable="true" title="Click to edit note">Justified by API latency drop (8s &rarr; 170ms) &amp; lead role</div>
      </div>

      <!-- 4. Experience -->
      <div class="exec-stat-card c-blue">
        <div class="exec-stat-val editable-highlight" id="hl-exp" data-hkey="exp" contenteditable="true" title="Click to edit value">8+ Years</div>
        <div class="exec-stat-label">Java Backend Specialization</div>
        <div class="exec-stat-sub editable-highlight" id="hl-exp-sub" data-hkey="exp_sub" contenteditable="true" title="Click to edit note">Spring Boot &bull; Microservices &bull; Distributed Systems</div>
      </div>

      <!-- 5. Mentorship & Leadership -->
      <div class="exec-stat-card c-violet">
        <div class="exec-stat-val editable-highlight" id="hl-lead" data-hkey="lead" contenteditable="true" title="Click to edit value">8 / 10 Engineers</div>
        <div class="exec-stat-label">Mentorship &amp; Leadership</div>
        <div class="exec-stat-sub editable-highlight" id="hl-lead-sub" data-hkey="lead_sub" contenteditable="true" title="Click to edit note">8 at Lowe's India &bull; 10 at IBM Kubernetes Control Plane</div>
      </div>

      <!-- 6. Total Q&As -->
      <div class="exec-stat-card c-cyan">
        <div class="exec-stat-val">60 Curated Q&amp;As</div>
        <div class="exec-stat-label">HR + Production Scenarios</div>
        <div class="exec-stat-sub">45 Recruiter Scripts &bull; 15 Production Architecture Scenarios</div>
      </div>
    </div>`;

if (builder.includes(oldExecGrid)) {
  builder = builder.replace(oldExecGrid, newExecGrid);
  console.log('4. Replaced Executive Highlights Grid with 6 editable cards including LWD 27 Nov');
} else {
  console.log('4. Warning: oldExecGrid not matched');
}

// 5. Update Playbook Control Bar with Smart Quick Chips & Dynamic Hint, and inject Copilot Card
const oldControlBar = `    <!-- Interactive Control Bar -->
    <div class="playbook-control-bar">
      <div class="search-input-wrap">
        <i class="ti-search"></i>
        <input type="text" class="playbook-search-input" id="search-input" placeholder="Search questions &amp; scenarios (e.g. bottleneck, HikariCP, Kafka lag, idempotency, Lowe's, salary)...">
      </div>
      <div class="filter-pills-wrap">
        <button class="filter-tab-pill active" data-filter="all">
          All Questions <span class="filter-count-badge" id="count-all">60</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-01">
          01 Career Story <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-02">
          02 Java &amp; Leadership <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-03">
          03 Salary &amp; Logistics <span class="filter-count-badge">14</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-04">
          04 Competing Offers <span class="filter-count-badge">7</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-05" style="border-color: #38bdf8; font-weight: 700;">
          <i class="ti-bolt text-warning mr-1"></i> 05 Production Scenarios <span class="filter-count-badge" style="background: #0284c7; color: #fff;">15</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-06">
          06 Revision &amp; Facts
        </button>
      </div>
      <div>
        <button class="btn btn-outline-primary btn-sm" id="btn-print-playbook" style="border-radius: 20px; font-weight: 600;">
          <i class="ti-printer mr-1"></i> Print / PDF
        </button>
      </div>
    </div>`;

const newControlBar = `    <!-- Dedicated HR & Technical Answer Copilot Helper -->
    <div class="interview-copilot-card mb-4" id="interview-copilot">
      <div class="copilot-header">
        <div class="copilot-badge"><span class="ai-sparkle">✦</span> INSTANT INTERVIEW COPILOT</div>
        <h3 class="copilot-title">Direct Question &amp; Spoken Answer Assistant</h3>
        <p class="copilot-sub">Type any question as an interviewer or HR would ask you. The assistant searches all 60 scenarios and generates your verbatim winning spoken response with candidate facts.</p>
      </div>

      <div class="copilot-search-box-wrap">
        <i class="ti-comment-alt copilot-search-icon"></i>
        <input type="text" id="copilot-search-input" class="copilot-search-input" placeholder="Type direct question (e.g. 'What is your last working day?', 'Current CTC', 'Why leave Lowe\\'s?', 'How many engineers did you lead?')...">
        <button type="button" id="copilot-ask-btn" class="copilot-ask-btn">
          <i class="ti-bolt mr-1"></i> Get Spoken Answer
        </button>
      </div>

      <div class="copilot-prompts-bar">
        <span class="copilot-prompts-label">Try Asking:</span>
        <button type="button" class="copilot-prompt-pill" data-ask="When is your last working day?">⏳ Last working day (27 Nov)</button>
        <button type="button" class="copilot-prompt-pill" data-ask="What is your current CTC and breakdown?">💰 Current CTC (₹29L)</button>
        <button type="button" class="copilot-prompt-pill" data-ask="What are your salary expectations?">🎯 Expected CTC (₹40–42L)</button>
        <button type="button" class="copilot-prompt-pill" data-ask="Why do you want to change company?">🏢 Why change company?</button>
        <button type="button" class="copilot-prompt-pill" data-ask="How many engineers do you mentor or lead?">👥 How many engineers led?</button>
        <button type="button" class="copilot-prompt-pill" data-ask="Do you have any other offers in hand?">💼 Do you have other offers?</button>
        <button type="button" class="copilot-prompt-pill" data-ask="How did you reduce API latency to 170ms?">⚡ 170ms Redis Latency Win</button>
        <button type="button" class="copilot-prompt-pill" data-ask="Tell me about a production OutOfMemoryError incident.">💥 Production OOM Incident</button>
      </div>

      <!-- Dynamic Copilot Result Panel -->
      <div id="copilot-result-container" class="copilot-result-container" style="display:none;">
        <div class="copilot-answer-card">
          <div class="copilot-ans-meta">
            <div class="d-flex align-items-center" style="gap: 8px;">
              <span class="copilot-qnum-tag" id="copilot-ans-qnum">Q25</span>
              <span class="copilot-sec-tag" id="copilot-ans-sectitle">Section 03: Salary &amp; Logistics</span>
            </div>
            <span class="copilot-match-badge" id="copilot-ans-score"><i class="ti-check text-success mr-1"></i>98% Best Match</span>
          </div>

          <h4 class="copilot-ans-question" id="copilot-ans-question">What is your notice period, and when is your last working day?</h4>

          <!-- Candidate Key Highlights Bar -->
          <div class="copilot-cheatsheet-bar" id="copilot-cheatsheet-bar">
            <span class="cheat-pill"><i class="ti-calendar text-danger mr-1"></i><strong>LWD:</strong> <span class="sync-lwd-val">27 Nov</span> (Notice Active)</span>
            <span class="cheat-pill"><i class="ti-wallet text-success mr-1"></i><strong>Current:</strong> <span class="sync-ctc-current-val">₹29 LPA</span></span>
            <span class="cheat-pill"><i class="ti-target text-primary mr-1"></i><strong>Expected:</strong> <span class="sync-ctc-expected-val">₹40–42 LPA</span></span>
            <span class="cheat-pill"><i class="ti-user text-info mr-1"></i><strong>Leadership:</strong> <span class="sync-lead-val">8 / 10 Eng</span></span>
          </div>

          <!-- Spoken Speech Bubble -->
          <div class="copilot-speech-bubble">
            <div class="bubble-header">
              <span class="bubble-tag"><i class="ti-microphone mr-1"></i>VERBATIM SPOKEN RESPONSE SCRIPT</span>
              <button type="button" class="btn-copy-quote copilot-copy-action" id="copilot-copy-btn">
                <i class="ti-clipboard mr-1"></i> Copy Answer
              </button>
            </div>
            <div class="copilot-speech-text" id="copilot-speech-text"></div>
          </div>

          <!-- Action buttons -->
          <div class="copilot-footer-actions">
            <button type="button" class="btn btn-sm btn-outline-primary" id="copilot-jump-playbook-btn">
              <i class="ti-arrow-down mr-1"></i> Open Full Question &amp; Notes in Playbook
            </button>
            <span class="text-muted" style="font-size: 12px;"><i class="ti-shield text-success mr-1"></i> Verified profile narrative &bull; Lowe's India &amp; IBM</span>
          </div>

          <!-- Related Questions Row -->
          <div class="copilot-related-wrap" id="copilot-related-wrap" style="display:none;">
            <div class="copilot-related-title">Related Interview Questions:</div>
            <div class="copilot-related-list" id="copilot-related-list"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Control Bar & Search -->
    <div class="playbook-control-bar">
      <div class="search-input-wrap">
        <i class="ti-search"></i>
        <input type="text" class="playbook-search-input" id="search-input" placeholder="Search questions &amp; scenarios (e.g. 'offer holding', 'change company', 'leadership', 'current ctc', 'last working day', 'OOM')...">
      </div>
      <div class="filter-pills-wrap">
        <button class="filter-tab-pill active" data-filter="all">
          All Questions <span class="filter-count-badge" id="count-all">60</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-01">
          01 Career Story <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-02">
          02 Java &amp; Leadership <span class="filter-count-badge">12</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-03">
          03 Salary &amp; Logistics <span class="filter-count-badge">14</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-04">
          04 Competing Offers <span class="filter-count-badge">7</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-05" style="border-color: #38bdf8; font-weight: 700;">
          <i class="ti-bolt text-warning mr-1"></i> 05 Production Scenarios <span class="filter-count-badge" style="background: #0284c7; color: #fff;">15</span>
        </button>
        <button class="filter-tab-pill" data-filter="section-06">
          06 Revision &amp; Facts
        </button>
      </div>
      <div>
        <button class="btn btn-outline-primary btn-sm" id="btn-print-playbook" style="border-radius: 20px; font-weight: 600;">
          <i class="ti-printer mr-1"></i> Print / PDF
        </button>
      </div>

      <!-- Quick Topic Jump Chips -->
      <div class="quick-chips-bar">
        <span class="quick-chip-label"><i class="ti-bolt text-warning mr-1"></i>Quick Topics:</span>
        <button type="button" class="quick-filter-chip" data-keyword="offer holding" data-target="section-04">
          💼 Offer Holding (Q39–Q45)
        </button>
        <button type="button" class="quick-filter-chip" data-keyword="change company" data-target="section-01">
          🏢 Why Change Company? (Q01–Q12)
        </button>
        <button type="button" class="quick-filter-chip" data-keyword="leadership" data-target="section-02">
          👥 Leadership (8-10 Eng)
        </button>
        <button type="button" class="quick-filter-chip" data-keyword="current ctc" data-target="section-03">
          💰 Current CTC (₹29L)
        </button>
        <button type="button" class="quick-filter-chip" data-keyword="expected ctc" data-target="section-03">
          🎯 Expected CTC (₹40–42L)
        </button>
        <button type="button" class="quick-filter-chip" data-keyword="last working day" data-target="section-03">
          ⏳ LWD: 27 Nov (Notice Served)
        </button>
        <button type="button" class="quick-filter-chip chip-hot" data-keyword="production incident" data-target="section-05">
          ⚡ 15 Production Incidents (Q46–Q60)
        </button>
        <button type="button" class="quick-filter-chip chip-clear" id="btn-clear-search" style="display:none;">
          ✕ Clear
        </button>
      </div>
    </div>

    <!-- Smart Guidance Hint & Direct Section Jump Banner -->
    <div id="smart-search-hint" class="smart-search-hint-card" style="display:none;">
      <div class="d-flex align-items-start justify-content-between flex-wrap gap-2">
        <div class="d-flex align-items-start" style="gap: 12px;">
          <span class="hint-icon-box"><i class="ti-light-bulb"></i></span>
          <div>
            <div class="hint-title" id="hint-title">Smart Topic Hint</div>
            <div class="hint-body" id="hint-body">Guidance context...</div>
          </div>
        </div>
        <button type="button" class="hint-jump-btn" id="hint-jump-btn">
          <i class="ti-arrow-down mr-1"></i> Jump to Section
        </button>
      </div>
    </div>`;

if (builder.includes(oldControlBar)) {
  builder = builder.replace(oldControlBar, newControlBar);
  console.log('5. Injected Copilot Card, Smart Quick Chips, and Hint Banner');
} else {
  console.log('5. Warning: oldControlBar not matched');
}

// 6. Update the interactive JavaScript at the bottom of the page
const vm = require('vm');
const idxSecStart = builder.indexOf('const sectionsData = [');
const idxSecEnd = builder.indexOf('function escapeHtml', idxSecStart);
const sectionsDataCode = builder.substring(idxSecStart, idxSecEnd).trim().replace(/;\s*$/, '');
const vmSandbox = {};
vm.runInNewContext(sectionsDataCode, vmSandbox);
const extractedSections = vmSandbox.sectionsData || [];

const jsMarker = builder.includes('    // 3. Search & Filter\r\n    var searchInput = document.getElementById(\'search-input\');')
  ? '    // 3. Search & Filter\r\n    var searchInput = document.getElementById(\'search-input\');'
  : '    // 3. Search & Filter\n    var searchInput = document.getElementById(\'search-input\');';

const newJs = `    // --- 2.1 EMBEDDED ALL QUESTIONS FOR FAST COPILOT & SEARCH ---
    var ALL_QUESTIONS = \${JSON.stringify(extractedSections)};

    var flatQuestions = [];
    ALL_QUESTIONS.forEach(function(sec){
      (sec.questions || []).forEach(function(qObj){
        var spokenText = qObj.spoken || '';
        if (!spokenText && qObj.conditional && qObj.conditional.branches) {
          spokenText = qObj.conditional.branches.map(function(b){ return b.tag + ':\\n' + b.text; }).join('\\n\\n');
        }
        flatQuestions.push({
          num: qObj.num,
          q: qObj.q,
          spoken: spokenText,
          secId: sec.id,
          secTitle: sec.title,
          subcat: qObj.subcat || '',
          note: qObj.note || ''
        });
      });
    });

    // --- 2.2 EDITABLE HIGHLIGHTS PERSISTENCE ---
    var highlightKeys = ['lwd', 'lwd_sub', 'ctc_current', 'ctc_current_sub', 'ctc_expected', 'ctc_expected_sub', 'exp', 'exp_sub', 'lead', 'lead_sub'];
    var highlightDefaults = {
      'lwd': '27 Nov',
      'lwd_sub': 'Notice Active • Immediate Joiner',
      'ctc_current': '₹29 LPA',
      'ctc_current_sub': '₹26.5L Fixed + ₹2.5L Variable Component (~9%)',
      'ctc_expected': '₹40–42 LPA',
      'ctc_expected_sub': 'Justified by API latency drop (8s → 170ms) & lead role',
      'exp': '8+ Years',
      'exp_sub': 'Spring Boot • Microservices • Distributed Systems',
      'lead': '8 / 10 Engineers',
      'lead_sub': "8 at Lowe's India • 10 at IBM Kubernetes Control Plane"
    };

    function syncHighlightValues() {
      highlightKeys.forEach(function(k){
        var saved = localStorage.getItem('techno_hl_' + k);
        var val = (saved !== null && saved.trim() !== '') ? saved : highlightDefaults[k];
        var el = document.querySelector('[data-hkey="' + k + '"]');
        if (el) el.innerText = val;
      });

      // Also sync values into Copilot mini cheatsheet
      var elLwd = document.querySelector('.sync-lwd-val');
      if (elLwd) elLwd.innerText = localStorage.getItem('techno_hl_lwd') || highlightDefaults['lwd'];
      var elCur = document.querySelector('.sync-ctc-current-val');
      if (elCur) elCur.innerText = localStorage.getItem('techno_hl_ctc_current') || highlightDefaults['ctc_current'];
      var elExp = document.querySelector('.sync-ctc-expected-val');
      if (elExp) elExp.innerText = localStorage.getItem('techno_hl_ctc_expected') || highlightDefaults['ctc_expected'];
      var elLead = document.querySelector('.sync-lead-val');
      if (elLead) elLead.innerText = localStorage.getItem('techno_hl_lead') || highlightDefaults['lead'];
    }
    syncHighlightValues();

    // Auto-save on blur / input
    document.querySelectorAll('.editable-highlight').forEach(function(el){
      el.addEventListener('blur', function(){
        var key = el.getAttribute('data-hkey');
        if (key) {
          localStorage.setItem('techno_hl_' + key, el.innerText.trim());
          syncHighlightValues();
          showToast('Highlight updated: ' + el.innerText.trim());
        }
      });
      el.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter') {
          ev.preventDefault();
          el.blur();
        }
      });
    });

    var btnEditHl = document.getElementById('btn-edit-highlights');
    if (btnEditHl) {
      btnEditHl.addEventListener('click', function(){
        var first = document.querySelector('.editable-highlight');
        if (first) {
          first.focus();
          showToast('Click any number or title above to edit. Press Enter or click away to save!');
        }
      });
    }

    var btnResetHl = document.getElementById('btn-reset-highlights');
    if (btnResetHl) {
      btnResetHl.addEventListener('click', function(){
        highlightKeys.forEach(function(k){
          localStorage.removeItem('techno_hl_' + k);
        });
        syncHighlightValues();
        showToast('Executive highlights reset to candidate defaults!');
      });
    }

    // --- 2.3 SMART KEYWORD HINTS DICTIONARY ---
    var TOPIC_HINTS = [
      {
        keys: ['offer holding', 'offer', 'competing', 'counteroffer', 'buyout', 'multiple offers'],
        targetSec: 'section-04',
        title: '💼 Competing Offers Strategy (Section 04: Q39–Q45)',
        hint: 'Be transparent and truthful: acknowledge existing offers with confidence. Frame conversations around architectural scope, long-term technical ownership, and engineering impact rather than playing bidding wars.'
      },
      {
        keys: ['change company', 'why change', 'why leave', 'stixis', 'cgi', 'gap', 'switch', 'career story', 'transition'],
        targetSec: 'section-01',
        title: '🏢 Career Progression Narrative (Section 01: Q01–Q12)',
        hint: 'Frame transitions as intentional technical steps: STIXIS (Java foundation) → CGI (enterprise banking & REST APIs) → HCL/IBM (Kubernetes CI/CD) → Lowe\\'s (distributed retail architecture & 170ms Redis latency drop). Now seeking alignment of responsibilities, title, and CTC.'
      },
      {
        keys: ['leadership', 'engineer led', 'how many engineer', 'mentoring', 'team size', 'lead', 'delegation'],
        targetSec: 'section-02',
        title: '👥 Engineering Leadership & Mentorship (Section 02: Q14–Q17)',
        hint: 'Support leadership claims with verified facts: Mentored 8 engineers at Lowe\\'s India (design reviews, Java 17/21 best practices, Spring Boot 3) & led 10 engineers on IBM Kubernetes Control Plane. Maintain a 70% hands-on coding / 30% mentorship balance.'
      },
      {
        keys: ['current ctc', 'ctc', 'salary', 'fixed', 'variable', 'compensation'],
        targetSec: 'section-03',
        title: '💰 Current Compensation Structure (Section 03: Q18–Q24)',
        hint: 'State your verified numbers clearly: Total CTC: ₹29 LPA consisting of ₹26.5 LPA Fixed + ₹2.5 LPA Variable (~9%). Fixed pay is disbursed monthly without deferred vesting or retention lock-ins.'
      },
      {
        keys: ['expected ctc', 'hike', '40', '42', 'salary expectation', 'budget'],
        targetSec: 'section-03',
        title: '🎯 Compensation Opening Ask (Section 03: Q19–Q20)',
        hint: 'Open negotiation confidently at ₹40–42 LPA (40–45% hike). Justify with end-to-end architecture ownership, API p99 latency reduction from 8s to 170ms, and mentoring 8-10 engineers.'
      },
      {
        keys: ['last working day', 'lwd', '27 nov', 'notice period', 'immediate joiner', 'joining date'],
        targetSec: 'section-03',
        title: '⏳ Official Notice Period & LWD: 27 Nov (Section 03: Q34, Q37)',
        hint: 'Official notice period is actively served; Last Working Day is 27 November 2026. This qualifies you as an Immediate Joiner, providing a major competitive edge for year-end and Q4 hiring cycles!'
      },
      {
        keys: ['production', 'incident', 'oom', 'bottleneck', 'hikaricp', 'kafka', 'redis', 'deadlock', '170ms', 'saga'],
        targetSec: 'section-05',
        title: '⚡ 15 Production Architecture Incidents (Section 05: Q46–Q60)',
        hint: 'Structure incident answers using STAR: High-scale metric (8s p99 / thread dump) → Root Cause (HikariCP starvation, partition skew) → Architectural Solution (Redis distributed caching, Resilience4j bulkheads) → Verified outcome (170ms p99).'
      }
    ];

    var hintBanner = document.getElementById('smart-search-hint');
    var hintTitle = document.getElementById('hint-title');
    var hintBody = document.getElementById('hint-body');
    var hintJumpBtn = document.getElementById('hint-jump-btn');
    var activeHintTarget = null;

    function checkTopicHints(query) {
      if (!query || query.length < 2) {
        if (hintBanner) hintBanner.style.display = 'none';
        return;
      }
      var matched = null;
      for (var i = 0; i < TOPIC_HINTS.length; i++) {
        var h = TOPIC_HINTS[i];
        for (var j = 0; j < h.keys.length; j++) {
          if (query.indexOf(h.keys[j]) !== -1) {
            matched = h;
            break;
          }
        }
        if (matched) break;
      }

      if (matched && hintBanner) {
        hintTitle.innerText = matched.title;
        hintBody.innerText = matched.hint;
        activeHintTarget = matched.targetSec;
        hintBanner.style.display = 'block';
      } else if (hintBanner) {
        hintBanner.style.display = 'none';
      }
    }

    if (hintJumpBtn) {
      hintJumpBtn.addEventListener('click', function(){
        if (activeHintTarget) {
          var targetEl = document.getElementById(activeHintTarget);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // --- 2.4 DEDICATED FAST ANSWER COPILOT HELPER LOGIC ---
    var copilotInput = document.getElementById('copilot-search-input');
    var copilotAskBtn = document.getElementById('copilot-ask-btn');
    var copilotResultWrap = document.getElementById('copilot-result-container');
    var copilotAnsQNum = document.getElementById('copilot-ans-qnum');
    var copilotAnsSec = document.getElementById('copilot-ans-sectitle');
    var copilotAnsQuestion = document.getElementById('copilot-ans-question');
    var copilotSpeechText = document.getElementById('copilot-speech-text');
    var copilotAnsScore = document.getElementById('copilot-ans-score');
    var copilotCopyBtn = document.getElementById('copilot-copy-btn');
    var copilotJumpPlaybookBtn = document.getElementById('copilot-jump-playbook-btn');
    var copilotRelatedWrap = document.getElementById('copilot-related-wrap');
    var copilotRelatedList = document.getElementById('copilot-related-list');
    var activeCopilotQNum = null;

    function answerWithCopilot(userQ) {
      if (!userQ || userQ.trim().length === 0) return;
      var cleanQ = userQ.toLowerCase().trim();

      // Score every question in flatQuestions
      var scored = [];
      flatQuestions.forEach(function(item){
        var score = 0;
        var qText = item.q.toLowerCase();
        var spText = item.spoken.toLowerCase();

        // Exact substring
        if (qText.indexOf(cleanQ) !== -1) score += 40;
        if (spText.indexOf(cleanQ) !== -1) score += 20;

        // Specific high-value keyword matches
        if ((cleanQ.includes('last working day') || cleanQ.includes('lwd') || cleanQ.includes('27 nov') || cleanQ.includes('notice')) && (item.num === 'Q34' || item.num === 'Q37')) score += 80;
        if ((cleanQ.includes('current ctc') || cleanQ.includes('current salary') || cleanQ.includes('fixed') || cleanQ.includes('29')) && item.num === 'Q18') score += 80;
        if ((cleanQ.includes('expected ctc') || cleanQ.includes('expectations') || cleanQ.includes('hike') || cleanQ.includes('40')) && (item.num === 'Q19' || item.num === 'Q20')) score += 80;
        if ((cleanQ.includes('change') || cleanQ.includes('leave lowe') || cleanQ.includes('why leave')) && (item.num === 'Q06' || item.num === 'Q05' || item.num === 'Q07')) score += 65;
        if ((cleanQ.includes('leadership') || cleanQ.includes('how many engineer') || cleanQ.includes('mentor')) && item.num === 'Q14') score += 75;
        if ((cleanQ.includes('offer') || cleanQ.includes('competing') || cleanQ.includes('counteroffer')) && (item.num === 'Q39' || item.num === 'Q40' || item.num === 'Q33')) score += 65;
        if ((cleanQ.includes('170ms') || cleanQ.includes('latency') || cleanQ.includes('redis')) && (item.num === 'Q46' || item.num === 'Q01')) score += 70;
        if ((cleanQ.includes('oom') || cleanQ.includes('memory leak') || cleanQ.includes('heap dump')) && item.num === 'Q47') score += 80;
        if ((cleanQ.includes('kafka') || cleanQ.includes('lag') || cleanQ.includes('rebalance')) && item.num === 'Q48') score += 80;
        if ((cleanQ.includes('deadlock') || cleanQ.includes('lock')) && item.num === 'Q49') score += 80;
        if ((cleanQ.includes('circuit') || cleanQ.includes('cascading')) && item.num === 'Q50') score += 80;
        if ((cleanQ.includes('idempot') || cleanQ.includes('duplicate payment')) && item.num === 'Q51') score += 80;
        if ((cleanQ.includes('saga') || cleanQ.includes('transaction')) && item.num === 'Q53') score += 80;

        // Word overlap
        var words = cleanQ.split(/\\s+/);
        words.forEach(function(w){
          if (w.length > 2) {
            if (qText.indexOf(w) !== -1) score += 6;
            if (spText.indexOf(w) !== -1) score += 2;
          }
        });

        scored.push({ item: item, score: score });
      });

      scored.sort(function(a, b){ return b.score - a.score; });

      var best = scored[0];
      if (best && best.item) {
        var topItem = best.item;
        activeCopilotQNum = topItem.num;
        copilotAnsQNum.innerText = topItem.num;
        copilotAnsSec.innerText = topItem.secTitle;
        copilotAnsQuestion.innerText = topItem.q;
        copilotSpeechText.innerText = topItem.spoken;
        copilotAnsScore.innerHTML = '<i class="ti-check text-success mr-1"></i> ' + Math.min(99, Math.max(88, best.score)) + '% Match';
        copilotResultWrap.style.display = 'block';

        // Render next 3 related questions
        var relatedHtml = '';
        for (var k = 1; k <= 3 && k < scored.length; k++) {
          var rel = scored[k].item;
          relatedHtml += '<button type="button" class="copilot-related-btn" data-copilot-q="' + rel.q.replace(/"/g, '&quot;') + '"><strong>' + rel.num + ':</strong> ' + rel.q + '</button>';
        }
        if (relatedHtml && copilotRelatedList) {
          copilotRelatedList.innerHTML = relatedHtml;
          copilotRelatedWrap.style.display = 'block';
        }

        copilotResultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    if (copilotAskBtn && copilotInput) {
      copilotAskBtn.addEventListener('click', function(){
        answerWithCopilot(copilotInput.value);
      });
      copilotInput.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter') {
          ev.preventDefault();
          answerWithCopilot(copilotInput.value);
        }
      });
    }

    // Copilot quick prompt pills
    document.querySelectorAll('.copilot-prompt-pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        var ask = pill.getAttribute('data-ask');
        if (copilotInput) copilotInput.value = ask;
        answerWithCopilot(ask);
      });
    });

    // Copilot related question clicks
    document.addEventListener('click', function(e){
      var relBtn = e.target.closest('.copilot-related-btn');
      if (relBtn) {
        var text = relBtn.getAttribute('data-copilot-q');
        if (copilotInput) copilotInput.value = text;
        answerWithCopilot(text);
      }
    });

    // Copy Copilot speech text
    if (copilotCopyBtn && copilotSpeechText) {
      copilotCopyBtn.addEventListener('click', function(){
        navigator.clipboard.writeText(copilotSpeechText.innerText).then(function(){
          showToast('Spoken response copied to clipboard!');
        });
      });
    }

    // Jump from Copilot to full card in playbook
    if (copilotJumpPlaybookBtn) {
      copilotJumpPlaybookBtn.addEventListener('click', function(){
        if (activeCopilotQNum) {
          var targetCard = document.querySelector('[data-qnum="' + activeCopilotQNum + '"]');
          if (targetCard) {
            targetCard.style.display = 'block';
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            var cardInner = targetCard.querySelector('.interview-q-card');
            if (cardInner) {
              cardInner.style.outline = '3px solid #0284c7';
              cardInner.style.boxShadow = '0 0 25px rgba(2, 132, 199, 0.4)';
              setTimeout(function(){
                cardInner.style.outline = 'none';
                cardInner.style.boxShadow = '';
              }, 3000);
            }
          }
        }
      });
    }

    // --- 2.5 SEARCH & FILTER WITH QUICK CHIPS ---
    var searchInput = document.getElementById('search-input');
    var btnClearSearch = document.getElementById('btn-clear-search');`;

if (builder.includes(jsMarker)) {
  builder = builder.replace(jsMarker, newJs);
  console.log('6. Injected Copilot, Highlights and Smart Search JavaScript logic');
} else {
  console.log('6. Warning: jsMarker not matched');
}

// 7. Update applyFilter and quick filter chip handlers
const oldApplyFilter = `    function applyFilter() {
      var query = (searchInput.value || '').toLowerCase().trim();
      var qCards = document.querySelectorAll('.q-card-item');
      var visibleCount = 0;

      qCards.forEach(function(card){
        var secId = card.getAttribute('data-secid');
        var cardText = card.innerText.toLowerCase();

        var matchesSection = (currentFilter === 'all') || (secId === currentFilter);
        var matchesSearch = !query || cardText.indexOf(query) !== -1;

        if (matchesSection && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide section banners
      document.querySelectorAll('.section-anchor-wrap').forEach(function(secWrap){
        var secId = secWrap.id;
        if (secId === 'section-06') {
          secWrap.style.display = (currentFilter === 'all' || currentFilter === 'section-06') ? 'block' : 'none';
        } else {
          var anyVisible = secWrap.querySelectorAll('.q-card-item:not([style*="display: none"])').length > 0;
          secWrap.style.display = anyVisible ? 'block' : 'none';
        }
      });

      var countEl = document.getElementById('count-all');
      if (countEl) countEl.innerText = visibleCount;
    }`;

const newApplyFilter = `    function applyFilter() {
      var query = (searchInput.value || '').toLowerCase().trim();
      var qCards = document.querySelectorAll('.q-card-item');
      var visibleCount = 0;

      // Show/hide clear button
      if (btnClearSearch) {
        btnClearSearch.style.display = query.length > 0 ? 'inline-flex' : 'none';
      }

      // Check smart hints
      checkTopicHints(query);

      qCards.forEach(function(card){
        var secId = card.getAttribute('data-secid');
        var cardText = card.innerText.toLowerCase();

        var matchesSection = (currentFilter === 'all') || (secId === currentFilter);
        
        // Smart matching: query in text OR synonym mapping
        var matchesSearch = false;
        if (!query) {
          matchesSearch = true;
        } else if (cardText.indexOf(query) !== -1) {
          matchesSearch = true;
        } else if (query.includes('offer holding') && secId === 'section-04') {
          matchesSearch = true;
        } else if ((query.includes('change company') || query.includes('why leave')) && secId === 'section-01') {
          matchesSearch = true;
        } else if ((query.includes('leadership') || query.includes('engineer led')) && (secId === 'section-02' || cardText.includes('mentor'))) {
          matchesSearch = true;
        } else if ((query.includes('current ctc') || query.includes('expected ctc') || query.includes('last working day')) && secId === 'section-03') {
          matchesSearch = true;
        } else if (query.includes('production incident') && secId === 'section-05') {
          matchesSearch = true;
        }

        if (matchesSection && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide section banners
      document.querySelectorAll('.section-anchor-wrap').forEach(function(secWrap){
        var secId = secWrap.id;
        if (secId === 'section-06') {
          secWrap.style.display = (currentFilter === 'all' || currentFilter === 'section-06') ? 'block' : 'none';
        } else {
          var anyVisible = secWrap.querySelectorAll('.q-card-item:not([style*="display: none"])').length > 0;
          secWrap.style.display = anyVisible ? 'block' : 'none';
        }
      });

      var countEl = document.getElementById('count-all');
      if (countEl) countEl.innerText = visibleCount;
    }

    // Quick filter chips event listeners
    document.querySelectorAll('.quick-filter-chip[data-keyword]').forEach(function(chip){
      chip.addEventListener('click', function(){
        document.querySelectorAll('.quick-filter-chip').forEach(function(c){ c.classList.remove('active'); });
        chip.classList.add('active');
        var kw = chip.getAttribute('data-keyword');
        var targetSec = chip.getAttribute('data-target');
        if (searchInput) searchInput.value = kw;
        applyFilter();
        if (targetSec) {
          var secEl = document.getElementById(targetSec);
          if (secEl) {
            secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', function(){
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.quick-filter-chip').forEach(function(c){ c.classList.remove('active'); });
        if (hintBanner) hintBanner.style.display = 'none';
        applyFilter();
      });
    }`;

if (builder.includes(oldApplyFilter)) {
  builder = builder.replace(oldApplyFilter, newApplyFilter);
  console.log('7. Replaced applyFilter with smart keyword mapping and quick chips support');
} else {
  console.log('7. Warning: oldApplyFilter not matched');
}

if (isCRLF) {
  builder = builder.replace(/\n/g, '\r\n');
}
fs.writeFileSync(builderPath, builder, 'utf8');
console.log('Updated scratch/build_personal_interview_page.js successfully!');

// Re-execute builder to produce updated personal-interview.html
require(builderPath);
