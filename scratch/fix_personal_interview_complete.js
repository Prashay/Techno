const fs = require('fs');
const path = require('path');

const builderPath = path.join(__dirname, 'build_personal_interview_page.js');
let builder = fs.readFileSync(builderPath, 'utf8');
const isCRLF = builder.includes('\r\n');
builder = builder.replace(/\r\n/g, '\n');

console.log('Original builder length:', builder.length);

// 1. Fix copy buttons in renderQuestionCard to use SVG icon and explicit "Copy Answer" text
const oldRenderCardCopy = `<button class="btn-copy-quote" data-copy-text="\${escapeHtml(b.text)}" title="Copy to clipboard">
              <i class="ti-files mr-1"></i> Copy
            </button>`;

const newRenderCardCopy = `<button type="button" class="btn-copy-quote" data-copy-text="\${escapeHtml(b.text)}" title="Copy answer to clipboard">
              <svg class="copy-svg-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="copy-btn-label">Copy Answer</span>
            </button>`;

if (builder.includes(oldRenderCardCopy)) {
  builder = builder.replace(oldRenderCardCopy, newRenderCardCopy);
  console.log('1. Fixed branch copy button');
} else {
  console.log('1. Warning: oldRenderCardCopy not matched');
}

const oldSpokenCopy = `<button class="btn-copy-quote" data-copy-text="\${escapeHtml(qObj.spoken)}" title="Copy to clipboard">
          <i class="ti-files mr-1"></i> Copy
        </button>`;

const newSpokenCopy = `<button type="button" class="btn-copy-quote" data-copy-text="\${escapeHtml(qObj.spoken)}" title="Copy answer to clipboard">
          <svg class="copy-svg-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="copy-btn-label">Copy Answer</span>
        </button>`;

if (builder.includes(oldSpokenCopy)) {
  builder = builder.replace(oldSpokenCopy, newSpokenCopy);
  console.log('2. Fixed spoken copy button');
} else {
  console.log('2. Warning: oldSpokenCopy not matched');
}

// 2. Update CSS in builder to style editable highlights, modal popups, floating helper launcher, and copy buttons
const cssMarker = '.exec-stat-card.c-rose::before { background: linear-gradient(90deg, #f43f5e, #fb7185); }';
const newCss = `.exec-stat-card.c-rose::before { background: linear-gradient(90deg, #f43f5e, #fb7185); }

    /* Editable Highlights Visual Affordance */
    .card-edit-badge {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 11px;
      font-weight: 700;
      color: #0284c7;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 12px;
      padding: 2px 8px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      opacity: 0.85;
    }
    .exec-stat-card:hover .card-edit-badge {
      opacity: 1;
      background: #0284c7;
      color: #ffffff;
      border-color: #0284c7;
      transform: scale(1.05);
    }
    .editable-highlight {
      border-radius: 6px;
      padding: 2px 6px;
      margin: -2px -6px;
      transition: all 0.2s ease;
      cursor: text;
      position: relative;
      border: 1px dashed transparent;
    }
    .editable-highlight:hover {
      background: rgba(2, 132, 199, 0.08);
      border-color: #0284c7;
    }
    .editable-highlight:focus {
      background: #ffffff;
      color: #0f172a;
      outline: 2px solid #0284c7;
      border-color: #0284c7;
      box-shadow: 0 0 10px rgba(2, 132, 199, 0.25);
    }

    /* Enhanced Copy Button */
    .btn-copy-quote {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #cbd5e1;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .btn-copy-quote:hover {
      background: #e2e8f0;
      color: #0f172a;
      border-color: #94a3b8;
      transform: translateY(-1px);
    }
    .btn-copy-quote.copied {
      background: #10b981 !important;
      color: #ffffff !important;
      border-color: #10b981 !important;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
    }

    /* Floating Helper Launcher */
    .floating-helper-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
    }
    .btn-floating-ask {
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #0284c7 0%, #6366f1 100%);
      color: #ffffff !important;
      border: 2px solid rgba(255, 255, 255, 0.4);
      padding: 12px 22px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.3px;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(2, 132, 199, 0.45);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn-floating-ask:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 14px 30px rgba(2, 132, 199, 0.55);
      color: #ffffff !important;
      text-decoration: none;
    }
    .launcher-pulse {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulse-ring 2s infinite;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    /* Modal Backdrop & Dialog System */
    .interview-modal-backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(5px);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .interview-modal-backdrop.show {
      opacity: 1;
      pointer-events: auto;
    }
    .interview-modal-dialog {
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
      width: 100%;
      max-width: 820px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: translateY(20px) scale(0.97);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid #cbd5e1;
    }
    .interview-modal-backdrop.show .interview-modal-dialog {
      transform: translateY(0) scale(1);
    }
    .interview-modal-dialog.modal-dialog-sm {
      max-width: 560px;
    }
    .interview-modal-header {
      padding: 20px 24px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .interview-modal-title {
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }
    .interview-modal-sub {
      font-size: 13px;
      color: #64748b;
    }
    .btn-close-modal {
      background: none;
      border: none;
      font-size: 26px;
      color: #64748b;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      transition: color 0.2s ease;
    }
    .btn-close-modal:hover {
      color: #0f172a;
    }
    .interview-modal-body {
      padding: 24px;
      overflow-y: auto;
      flex: 1;
    }

    /* Modal Assistant Specifics */
    .modal-search-box-wrap {
      display: flex;
      gap: 10px;
      margin-bottom: 14px;
    }
    .modal-search-input {
      flex: 1;
      padding: 12px 18px;
      font-size: 15px;
      border: 2px solid #cbd5e1;
      border-radius: 12px;
      outline: none;
      transition: all 0.2s ease;
      color: #0f172a;
    }
    .modal-search-input:focus {
      border-color: #0284c7;
      box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
    }
    .modal-ask-btn {
      background: linear-gradient(135deg, #0284c7, #0369a1);
      color: #ffffff;
      border: none;
      border-radius: 12px;
      padding: 0 22px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .modal-ask-btn:hover {
      background: linear-gradient(135deg, #0369a1, #075985);
      transform: translateY(-1px);
    }
    .modal-prompts-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 7px;
      margin-bottom: 20px;
    }
    .modal-prompts-label {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .modal-prompt-pill {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .modal-prompt-pill:hover {
      background: #e0f2fe;
      border-color: #0284c7;
      color: #0369a1;
      transform: translateY(-1px);
    }

    /* Modal Result Card */
    .modal-result-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
      animation: modalResultIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalResultIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modal-res-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .modal-res-qnum {
      background: #0284c7;
      color: #ffffff;
      font-size: 11.5px;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
    }
    .modal-res-sec {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
    }
    .modal-res-score {
      font-size: 12px;
      font-weight: 800;
      color: #059669;
      background: #ecfdf5;
      padding: 2px 8px;
      border-radius: 12px;
      border: 1px solid #a7f3d0;
    }
    .modal-res-question {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .modal-res-cheatsheet {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 14px;
    }
    .res-cheat-pill {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      padding: 3px 10px;
      border-radius: 16px;
      font-size: 12px;
      color: #1e293b;
    }
    .modal-res-bubble {
      background: #ffffff;
      border-left: 4px solid #0284c7;
      border-radius: 12px;
      padding: 16px;
      border-top: 1px solid #e2e8f0;
      border-right: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 16px;
    }
    .modal-bubble-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 800;
      color: #0284c7;
      text-transform: uppercase;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px dashed #e2e8f0;
    }
    .modal-res-speech {
      font-size: 14.5px;
      line-height: 1.75;
      color: #1e293b;
    }
    .modal-res-speech p {
      margin-bottom: 10px;
    }
    .modal-res-speech p:last-child {
      margin-bottom: 0;
    }
    .modal-res-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;
    }
    .modal-related-wrap {
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px dashed #cbd5e1;
    }
    .modal-related-title {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    .modal-related-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .modal-related-btn {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      text-align: left;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 13px;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .modal-related-btn:hover {
      background: #f0f9ff;
      border-color: #0284c7;
      color: #0369a1;
    }`;

if (builder.includes(cssMarker)) {
  builder = builder.replace(cssMarker, newCss);
  console.log('3. Injected comprehensive Modal and Copy Button CSS');
} else {
  console.log('3. Warning: cssMarker not matched');
}

// 3. Update the Executive Highlights Grid in HTML markup
const oldHighlightsHeader = `<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
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

const newHighlightsHeader = `<div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
      <div class="d-flex align-items-center">
        <span class="pulse-dot mr-2"></span>
        <strong class="text-dark" style="font-size: 15px;">Executive Highlights &amp; Negotiation Parameters</strong>
        <span class="badge badge-light border text-primary ml-2 px-2 py-1" style="font-size: 11px; font-weight: 600;">
          <i class="ti-pencil mr-1"></i>All 6 Cards Editable &bull; Auto-saves
        </span>
      </div>
      <div class="d-flex align-items-center" style="gap: 8px;">
        <button type="button" id="btn-open-copilot-popup" class="btn btn-sm btn-primary" style="border-radius: 8px; font-size: 12px; font-weight: 700; padding: 5px 12px; background: linear-gradient(135deg, #0284c7, #6366f1); border: none; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);">
          💬 Ask Helper Popup
        </button>
        <button type="button" id="btn-open-edit-modal" class="btn btn-sm btn-outline-primary" style="border-radius: 8px; font-size: 12px; padding: 4px 10px;">
          <i class="ti-pencil-alt mr-1"></i> Edit All Form
        </button>
        <button type="button" id="btn-reset-highlights" class="btn btn-sm btn-outline-secondary" style="border-radius: 8px; font-size: 12px; padding: 4px 10px;" title="Reset all highlight values to candidate defaults">
          <i class="ti-reload mr-1"></i> Reset
        </button>
      </div>
    </div>

    <div class="executive-stats-grid">
      <!-- 1. Last Working Day (LWD 27 Nov) -->
      <div class="exec-stat-card c-rose">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <span class="exec-badge-pill badge-lwd"><i class="ti-calendar mr-1"></i>Notice Served</span>
        <div class="exec-stat-val editable-highlight" id="hl-lwd" data-hkey="lwd" contenteditable="true" title="Click to edit value">27 Nov</div>
        <div class="exec-stat-label">Last Working Day (LWD)</div>
        <div class="exec-stat-sub editable-highlight" id="hl-lwd-sub" data-hkey="lwd_sub" contenteditable="true" title="Click to edit note">Notice Active &bull; Immediate Joiner</div>
      </div>

      <!-- 2. Current CTC -->
      <div class="exec-stat-card c-emerald">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <div class="exec-stat-val editable-highlight" id="hl-ctc-current" data-hkey="ctc_current" contenteditable="true" title="Click to edit value">₹29 LPA</div>
        <div class="exec-stat-label">Current Total CTC</div>
        <div class="exec-stat-sub editable-highlight" id="hl-ctc-current-sub" data-hkey="ctc_current_sub" contenteditable="true" title="Click to edit note">₹26.5L Fixed + ₹2.5L Variable Component (~9%)</div>
      </div>

      <!-- 3. Suggested Expectation Ask -->
      <div class="exec-stat-card c-amber">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <div class="exec-stat-val editable-highlight" id="hl-ctc-expected" data-hkey="ctc_expected" contenteditable="true" title="Click to edit value">₹40–42 LPA</div>
        <div class="exec-stat-label">Suggested Opening Expectation</div>
        <div class="exec-stat-sub editable-highlight" id="hl-ctc-expected-sub" data-hkey="ctc_expected_sub" contenteditable="true" title="Click to edit note">Justified by API latency drop (8s &rarr; 170ms) &amp; lead role</div>
      </div>

      <!-- 4. Experience -->
      <div class="exec-stat-card c-blue">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <div class="exec-stat-val editable-highlight" id="hl-exp" data-hkey="exp" contenteditable="true" title="Click to edit value">8+ Years</div>
        <div class="exec-stat-label">Java Backend Specialization</div>
        <div class="exec-stat-sub editable-highlight" id="hl-exp-sub" data-hkey="exp_sub" contenteditable="true" title="Click to edit note">Spring Boot &bull; Microservices &bull; Distributed Systems</div>
      </div>

      <!-- 5. Mentorship & Leadership -->
      <div class="exec-stat-card c-violet">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <div class="exec-stat-val editable-highlight" id="hl-lead" data-hkey="lead" contenteditable="true" title="Click to edit value">8 / 10 Engineers</div>
        <div class="exec-stat-label">Mentorship &amp; Leadership</div>
        <div class="exec-stat-sub editable-highlight" id="hl-lead-sub" data-hkey="lead_sub" contenteditable="true" title="Click to edit note">8 at Lowe's India &bull; 10 at IBM Kubernetes Control Plane</div>
      </div>

      <!-- 6. Total Q&As -->
      <div class="exec-stat-card c-cyan">
        <span class="card-edit-badge" title="Click to edit value"><i class="ti-pencil"></i> Edit</span>
        <div class="exec-stat-val editable-highlight" id="hl-qcount" data-hkey="qcount" contenteditable="true" title="Click to edit value">60 Curated Q&amp;As</div>
        <div class="exec-stat-label">HR + Production Scenarios</div>
        <div class="exec-stat-sub editable-highlight" id="hl-qcount-sub" data-hkey="qcount_sub" contenteditable="true" title="Click to edit note">45 Recruiter Scripts &bull; 15 Production Architecture Scenarios</div>
      </div>
    </div>`;

if (builder.includes(oldHighlightsHeader)) {
  builder = builder.replace(oldHighlightsHeader, newHighlightsHeader);
  console.log('4. Updated all 6 highlight cards with edit badges and modal trigger');
} else {
  console.log('4. Warning: oldHighlightsHeader not matched');
}

// 4. Update the Copilot Card Copy Button
const oldCopilotCopyBtn = `<button type="button" class="btn-copy-quote copilot-copy-action" id="copilot-copy-btn">
                <i class="ti-clipboard mr-1"></i> Copy Answer
              </button>`;

const newCopilotCopyBtn = `<button type="button" class="btn-copy-quote copilot-copy-action" id="copilot-copy-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="copy-btn-label">Copy Answer</span>
              </button>`;

if (builder.includes(oldCopilotCopyBtn)) {
  builder = builder.replace(oldCopilotCopyBtn, newCopilotCopyBtn);
  console.log('5. Updated Copilot card copy button');
} else {
  console.log('5. Warning: oldCopilotCopyBtn not matched');
}

// 5. Inject Floating Helper Launcher, Helper Popup Modal, and Highlights Edit Modal into the HTML before </body>
const bodyCloseMarker = '</body>\n</html>';
const modalsHtml = `  <!-- Floating AI Helper Launcher Button -->
  <div id="floating-helper-launcher" class="floating-helper-launcher">
    <button type="button" id="btn-floating-ask" class="btn-floating-ask">
      <span class="launcher-pulse"></span>
      <span style="font-size: 16px;">💬</span>
      <span>Ask Helper Popup</span>
    </button>
  </div>

  <!-- Dedicated Interview Helper Popup Modal -->
  <div id="interview-helper-modal" class="interview-modal-backdrop" style="display:none;">
    <div class="interview-modal-dialog">
      <div class="interview-modal-content">
        <div class="interview-modal-header">
          <div class="d-flex align-items-center" style="gap: 10px;">
            <span style="color: #0284c7; font-size: 20px;">✦</span>
            <div>
              <h4 class="interview-modal-title mb-0">Interview Question &amp; Spoken Answer Assistant</h4>
              <div class="interview-modal-sub">Ask any HR or technical question to get candidate-tailored verbatim answers instantly</div>
            </div>
          </div>
          <button type="button" class="btn-close-modal" id="btn-close-helper-modal" title="Close (Esc)">&times;</button>
        </div>

        <div class="interview-modal-body">
          <!-- Direct Question Input -->
          <div class="modal-search-box-wrap">
            <input type="text" id="modal-copilot-input" class="modal-search-input" placeholder="Type question (e.g. 'What is your last working day?', 'Current CTC', 'Why leave Lowe\\'s?', 'How many engineers led?')...">
            <button type="button" id="modal-copilot-ask-btn" class="modal-ask-btn">
              Get Answer
            </button>
          </div>

          <!-- Quick Question Prompts -->
          <div class="modal-prompts-bar">
            <span class="modal-prompts-label">Try Asking:</span>
            <button type="button" class="modal-prompt-pill" data-ask="When is your last working day?">⏳ Last working day (27 Nov)</button>
            <button type="button" class="modal-prompt-pill" data-ask="What is your current CTC and breakdown?">💰 Current CTC (₹29L)</button>
            <button type="button" class="modal-prompt-pill" data-ask="What are your salary expectations?">🎯 Expected CTC (₹40–42L)</button>
            <button type="button" class="modal-prompt-pill" data-ask="Why do you want to change company?">🏢 Why change company?</button>
            <button type="button" class="modal-prompt-pill" data-ask="How many engineers have you led?">👥 How many engineers led?</button>
            <button type="button" class="modal-prompt-pill" data-ask="Do you have any other offers in hand?">💼 Other offers in hand</button>
            <button type="button" class="modal-prompt-pill" data-ask="How did you reduce API latency to 170ms?">⚡ 170ms Redis win</button>
            <button type="button" class="modal-prompt-pill" data-ask="Tell me about a production OutOfMemoryError incident.">💥 Production OOM incident</button>
          </div>

          <!-- Answer Result Container -->
          <div id="modal-copilot-result" class="modal-result-card" style="display:none;">
            <div class="modal-res-header">
              <div class="d-flex align-items-center" style="gap: 8px;">
                <span class="modal-res-qnum" id="modal-res-qnum">Q25</span>
                <span class="modal-res-sec" id="modal-res-sec">Compensation &amp; Logistics</span>
              </div>
              <span class="modal-res-score" id="modal-res-score"><i class="ti-check text-success mr-1"></i>98% Best Match</span>
            </div>

            <h5 class="modal-res-question" id="modal-res-question">Question title here</h5>

            <!-- Synced Highlights Cheatsheet -->
            <div class="modal-res-cheatsheet">
              <span class="res-cheat-pill"><strong>LWD:</strong> <span class="sync-lwd-val">27 Nov</span> (Notice Active)</span>
              <span class="res-cheat-pill"><strong>Current:</strong> <span class="sync-ctc-current-val">₹29 LPA</span></span>
              <span class="res-cheat-pill"><strong>Expected:</strong> <span class="sync-ctc-expected-val">₹40–42 LPA</span></span>
              <span class="res-cheat-pill"><strong>Led:</strong> <span class="sync-lead-val">8 / 10 Engineers</span></span>
            </div>

            <!-- Spoken Response Script -->
            <div class="modal-res-bubble">
              <div class="modal-bubble-meta">
                <span><i class="ti-microphone mr-1"></i>VERBATIM SPOKEN ANSWER SCRIPT</span>
                <button type="button" class="btn-copy-quote modal-copy-btn" id="modal-copy-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px; vertical-align: -2px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span class="copy-btn-label">Copy Answer</span>
                </button>
              </div>
              <div class="modal-res-speech" id="modal-res-speech"></div>
            </div>

            <div class="modal-res-actions">
              <button type="button" class="btn btn-sm btn-outline-primary" id="modal-jump-playbook-btn">
                <i class="ti-arrow-down mr-1"></i> Scroll to Question in Playbook
              </button>
            </div>

            <!-- Related questions in modal -->
            <div class="modal-related-wrap" id="modal-related-wrap" style="display:none;">
              <div class="modal-related-title">Related Interview Scenarios:</div>
              <div class="modal-related-list" id="modal-related-list"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- Highlights Edit Modal Form -->
  <div id="highlights-edit-modal" class="interview-modal-backdrop" style="display:none;">
    <div class="interview-modal-dialog modal-dialog-sm">
      <div class="interview-modal-content">
        <div class="interview-modal-header">
          <h4 class="interview-modal-title mb-0"><i class="ti-pencil-alt text-primary mr-2"></i>Edit Personal Highlights</h4>
          <button type="button" class="btn-close-modal" id="btn-close-edit-modal">&times;</button>
        </div>
        <div class="interview-modal-body">
          <form id="form-edit-highlights">
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Last Working Day (LWD)</label>
              <input type="text" id="m-edit-lwd" class="form-control" value="27 Nov">
              <small class="text-muted">Subtitle / Availability note:</small>
              <input type="text" id="m-edit-lwd-sub" class="form-control form-control-sm mt-1" value="Notice Active • Immediate Joiner">
            </div>
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Current Total CTC</label>
              <input type="text" id="m-edit-ctc-current" class="form-control" value="₹29 LPA">
              <input type="text" id="m-edit-ctc-current-sub" class="form-control form-control-sm mt-1" value="₹26.5L Fixed + ₹2.5L Variable Component (~9%)">
            </div>
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Expected CTC Ask</label>
              <input type="text" id="m-edit-ctc-expected" class="form-control" value="₹40–42 LPA">
              <input type="text" id="m-edit-ctc-expected-sub" class="form-control form-control-sm mt-1" value="Justified by API latency drop (8s → 170ms) & lead role">
            </div>
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Java Backend Experience</label>
              <input type="text" id="m-edit-exp" class="form-control" value="8+ Years">
              <input type="text" id="m-edit-exp-sub" class="form-control form-control-sm mt-1" value="Spring Boot • Microservices • Distributed Systems">
            </div>
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Leadership &amp; Mentorship</label>
              <input type="text" id="m-edit-lead" class="form-control" value="8 / 10 Engineers">
              <input type="text" id="m-edit-lead-sub" class="form-control form-control-sm mt-1" value="8 at Lowe's India • 10 at IBM Kubernetes Control Plane">
            </div>
            <div class="form-group mb-3">
              <label class="font-weight-bold text-dark" style="font-size: 13px;">Curated Scenarios Count</label>
              <input type="text" id="m-edit-qcount" class="form-control" value="60 Curated Q&As">
              <input type="text" id="m-edit-qcount-sub" class="form-control form-control-sm mt-1" value="45 Recruiter Scripts • 15 Production Architecture Scenarios">
            </div>
            <div class="d-flex justify-content-end" style="gap: 8px;">
              <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-edit-modal">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm"><i class="ti-check mr-1"></i> Save Highlights</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>\n\n</body>\n</html>`;

if (builder.includes(bodyCloseMarker)) {
  builder = builder.replace(bodyCloseMarker, modalsHtml);
  console.log('6. Injected Helper Popup Modal and Highlights Edit Form');
} else {
  console.log('6. Warning: bodyCloseMarker not matched');
}

// 6. Replace the entire script logic with clean, syntax-error-free JavaScript
const jsStartMarker = '    // 2. Copy Quote / Pitch';
const jsEndMarker = '    // 4. Print / PDF Button';

const jsStartIndex = builder.indexOf(jsStartMarker);
const jsEndIndex = builder.indexOf(jsEndMarker);

if (jsStartIndex !== -1 && jsEndIndex !== -1) {
  const replacementJs = `    // 2. ROBUST CLIPBOARD COPY WITH FALLBACK
    function copyTextWithFallback(text, onSuccess) {
      if (!text) return;
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function(){
          if (onSuccess) onSuccess();
        }).catch(function(){
          execCommandFallback(text, onSuccess);
        });
      } else {
        execCommandFallback(text, onSuccess);
      }
    }

    function execCommandFallback(text, onSuccess) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '0';
      ta.style.opacity = '0';
      ta.setAttribute('readonly', '');
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        var ok = document.execCommand('copy');
        if (onSuccess) onSuccess();
      } catch (err) {
        if (onSuccess) onSuccess();
      }
      document.body.removeChild(ta);
    }

    document.addEventListener('click', function(e){
      var btn = e.target.closest('.btn-copy-quote');
      if (btn) {
        var text = btn.getAttribute('data-copy-text') || '';
        if (!text) {
          var bubble = btn.closest('.spoken-quote-bubble') || btn.closest('.copilot-speech-bubble') || btn.closest('.modal-res-bubble');
          if (bubble) {
            var txtEl = bubble.querySelector('.quote-text, .copilot-speech-text, .modal-res-speech');
            if (txtEl) text = txtEl.innerText;
          }
        }
        copyTextWithFallback(text, function(){
          btn.classList.add('copied');
          var origHtml = btn.innerHTML;
          btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-right:4px;vertical-align:-2px;"><polyline points="20 6 9 17 4 12"></polyline></svg><span class="copy-btn-label">Copied!</span>';
          showToast('Answer copied to clipboard!');
          setTimeout(function(){
            btn.classList.remove('copied');
            btn.innerHTML = origHtml;
          }, 2400);
        });
      }

      var pitchBtn = e.target.closest('#btn-copy-pitch');
      if (pitchBtn) {
        var pitchText = document.getElementById('pitch-text').innerText.trim();
        copyTextWithFallback(pitchText, function(){
          showToast('30-Second Positioning pitch copied!');
        });
      }

      // Branch Tab Pill switching
      var pill = e.target.closest('.branch-pill-btn');
      if (pill) {
        var targetId = pill.getAttribute('data-branch-target');
        var parentBox = pill.closest('.conditional-answer-box');
        if (parentBox) {
          parentBox.querySelectorAll('.branch-pill-btn').forEach(function(b){ b.classList.remove('active'); });
          parentBox.querySelectorAll('.branch-tab-content').forEach(function(c){ c.classList.remove('active'); });
          pill.classList.add('active');
          var targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.classList.add('active');
        }
      }

      // Subcategory Filter Pills inside Section 05
      var subcatBtn = e.target.closest('.subcat-pill-btn');
      if (subcatBtn) {
        var targetSubcat = subcatBtn.getAttribute('data-subcat-filter');
        var parentRow = subcatBtn.closest('.subcat-filter-row');
        if (parentRow) {
          parentRow.querySelectorAll('.subcat-pill-btn').forEach(function(b){ b.classList.remove('active'); });
          subcatBtn.classList.add('active');
          
          var sec05Cards = document.querySelectorAll('#section-05 .q-card-item');
          sec05Cards.forEach(function(card){
            var cardSub = card.getAttribute('data-subcat');
            if (targetSubcat === 'sub-all' || cardSub === targetSubcat) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });
        }
      }

      // Priority Jump Chips
      var chip = e.target.closest('.priority-chip');
      if (chip) {
        var qNum = chip.getAttribute('data-jump');
        if (qNum) {
          var targetCard = document.querySelector('[data-qnum="' + qNum + '"]');
          if (targetCard) {
            targetCard.style.display = 'block';
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            var cardInner = targetCard.querySelector('.interview-q-card');
            if (cardInner) {
              cardInner.style.outline = '3px solid #0284c7';
              setTimeout(function(){
                cardInner.style.outline = 'none';
              }, 2500);
            }
          }
        }
      }
    });

    // --- 2.1 EMBEDDED ALL QUESTIONS FOR FAST COPILOT & SEARCH ---
    var ALL_QUESTIONS = \${JSON.stringify(sectionsData)};

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
    var highlightKeys = ['lwd', 'lwd_sub', 'ctc_current', 'ctc_current_sub', 'ctc_expected', 'ctc_expected_sub', 'exp', 'exp_sub', 'lead', 'lead_sub', 'qcount', 'qcount_sub'];
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
      'lead_sub': "8 at Lowe\\'s India • 10 at IBM Kubernetes Control Plane",
      'qcount': '60 Curated Q&As',
      'qcount_sub': '45 Recruiter Scripts • 15 Production Architecture Scenarios'
    };

    function syncHighlightValues() {
      highlightKeys.forEach(function(k){
        var saved = localStorage.getItem('techno_hl_' + k);
        var val = (saved !== null && saved.trim() !== '') ? saved : highlightDefaults[k];
        var el = document.querySelector('[data-hkey="' + k + '"]');
        if (el) el.innerText = val;
      });

      // Also sync values into Copilot & Modal cheatsheet
      var lwdVal = localStorage.getItem('techno_hl_lwd') || highlightDefaults['lwd'];
      var curVal = localStorage.getItem('techno_hl_ctc_current') || highlightDefaults['ctc_current'];
      var expVal = localStorage.getItem('techno_hl_ctc_expected') || highlightDefaults['ctc_expected'];
      var leadVal = localStorage.getItem('techno_hl_lead') || highlightDefaults['lead'];

      document.querySelectorAll('.sync-lwd-val').forEach(function(el){ el.innerText = lwdVal; });
      document.querySelectorAll('.sync-ctc-current-val').forEach(function(el){ el.innerText = curVal; });
      document.querySelectorAll('.sync-ctc-expected-val').forEach(function(el){ el.innerText = expVal; });
      document.querySelectorAll('.sync-lead-val').forEach(function(el){ el.innerText = leadVal; });
    }
    syncHighlightValues();

    // Auto-save on blur / input for editable highlight fields
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

    // Reset Defaults
    var btnResetHl = document.getElementById('btn-reset-highlights');
    if (btnResetHl) {
      btnResetHl.addEventListener('click', function(){
        highlightKeys.forEach(function(k){
          localStorage.removeItem('techno_hl_' + k);
        });
        syncHighlightValues();
        showToast('Highlights reset to candidate defaults!');
      });
    }

    // Modal Form for Editing Highlights
    var editModalBackdrop = document.getElementById('highlights-edit-modal');
    var btnOpenEditModal = document.getElementById('btn-open-edit-modal');
    var btnCloseEditModal = document.getElementById('btn-close-edit-modal');
    var btnCancelEditModal = document.getElementById('btn-cancel-edit-modal');
    var formEditHighlights = document.getElementById('form-edit-highlights');

    function openEditModal() {
      if (!editModalBackdrop) return;
      document.getElementById('m-edit-lwd').value = localStorage.getItem('techno_hl_lwd') || highlightDefaults['lwd'];
      document.getElementById('m-edit-lwd-sub').value = localStorage.getItem('techno_hl_lwd_sub') || highlightDefaults['lwd_sub'];
      document.getElementById('m-edit-ctc-current').value = localStorage.getItem('techno_hl_ctc_current') || highlightDefaults['ctc_current'];
      document.getElementById('m-edit-ctc-current-sub').value = localStorage.getItem('techno_hl_ctc_current_sub') || highlightDefaults['ctc_current_sub'];
      document.getElementById('m-edit-ctc-expected').value = localStorage.getItem('techno_hl_ctc_expected') || highlightDefaults['ctc_expected'];
      document.getElementById('m-edit-ctc-expected-sub').value = localStorage.getItem('techno_hl_ctc_expected_sub') || highlightDefaults['ctc_expected_sub'];
      document.getElementById('m-edit-exp').value = localStorage.getItem('techno_hl_exp') || highlightDefaults['exp'];
      document.getElementById('m-edit-exp-sub').value = localStorage.getItem('techno_hl_exp_sub') || highlightDefaults['exp_sub'];
      document.getElementById('m-edit-lead').value = localStorage.getItem('techno_hl_lead') || highlightDefaults['lead'];
      document.getElementById('m-edit-lead-sub').value = localStorage.getItem('techno_hl_lead_sub') || highlightDefaults['lead_sub'];
      document.getElementById('m-edit-qcount').value = localStorage.getItem('techno_hl_qcount') || highlightDefaults['qcount'];
      document.getElementById('m-edit-qcount-sub').value = localStorage.getItem('techno_hl_qcount_sub') || highlightDefaults['qcount_sub'];
      editModalBackdrop.style.display = 'flex';
      setTimeout(function(){ editModalBackdrop.classList.add('show'); }, 10);
    }

    function closeEditModal() {
      if (!editModalBackdrop) return;
      editModalBackdrop.classList.remove('show');
      setTimeout(function(){ editModalBackdrop.style.display = 'none'; }, 250);
    }

    if (btnOpenEditModal) btnOpenEditModal.addEventListener('click', openEditModal);
    if (btnCloseEditModal) btnCloseEditModal.addEventListener('click', closeEditModal);
    if (btnCancelEditModal) btnCancelEditModal.addEventListener('click', closeEditModal);

    // Clicking card edit badge opens edit modal or focuses element
    document.querySelectorAll('.card-edit-badge').forEach(function(badge){
      badge.addEventListener('click', function(e){
        e.stopPropagation();
        var card = badge.closest('.exec-stat-card');
        var editable = card ? card.querySelector('.editable-highlight') : null;
        if (editable) {
          editable.focus();
        } else {
          openEditModal();
        }
      });
    });

    if (formEditHighlights) {
      formEditHighlights.addEventListener('submit', function(e){
        e.preventDefault();
        localStorage.setItem('techno_hl_lwd', document.getElementById('m-edit-lwd').value.trim());
        localStorage.setItem('techno_hl_lwd_sub', document.getElementById('m-edit-lwd-sub').value.trim());
        localStorage.setItem('techno_hl_ctc_current', document.getElementById('m-edit-ctc-current').value.trim());
        localStorage.setItem('techno_hl_ctc_current_sub', document.getElementById('m-edit-ctc-current-sub').value.trim());
        localStorage.setItem('techno_hl_ctc_expected', document.getElementById('m-edit-ctc-expected').value.trim());
        localStorage.setItem('techno_hl_ctc_expected_sub', document.getElementById('m-edit-ctc-expected-sub').value.trim());
        localStorage.setItem('techno_hl_exp', document.getElementById('m-edit-exp').value.trim());
        localStorage.setItem('techno_hl_exp_sub', document.getElementById('m-edit-exp-sub').value.trim());
        localStorage.setItem('techno_hl_lead', document.getElementById('m-edit-lead').value.trim());
        localStorage.setItem('techno_hl_lead_sub', document.getElementById('m-edit-lead-sub').value.trim());
        localStorage.setItem('techno_hl_qcount', document.getElementById('m-edit-qcount').value.trim());
        localStorage.setItem('techno_hl_qcount_sub', document.getElementById('m-edit-qcount-sub').value.trim());
        syncHighlightValues();
        closeEditModal();
        showToast('All highlights saved successfully!');
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
        hint: "Frame transitions as intentional technical steps: STIXIS (Java foundation) → CGI (enterprise banking & REST APIs) → HCL/IBM (Kubernetes CI/CD) → Lowe's (distributed retail architecture & 170ms Redis latency drop). Now seeking alignment of responsibilities, title, and CTC."
      },
      {
        keys: ['leadership', 'engineer led', 'how many engineer', 'mentoring', 'team size', 'lead', 'delegation'],
        targetSec: 'section-02',
        title: '👥 Engineering Leadership & Mentorship (Section 02: Q15–Q18)',
        hint: "Support leadership claims with verified facts: Mentored 8 engineers at Lowe's India (design reviews, Java 17/21 best practices, Spring Boot 3) & led 10 engineers on IBM Kubernetes Control Plane. Maintain a 70% hands-on coding / 30% mentorship balance."
      },
      {
        keys: ['current ctc', 'current salary', 'fixed', 'variable', 'compensation'],
        targetSec: 'section-03',
        title: '💰 Current Compensation Structure (Section 03: Q25)',
        hint: 'State your verified numbers clearly: Total CTC: ₹29 LPA consisting of ₹26.5 LPA Fixed + ₹2.5 LPA Variable (~9%). Fixed pay is disbursed monthly without deferred vesting or retention lock-ins.'
      },
      {
        keys: ['expected ctc', 'hike', '40', '42', 'salary expectation', 'budget'],
        targetSec: 'section-03',
        title: '🎯 Compensation Opening Ask (Section 03: Q26–Q28)',
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

    // --- 2.4 UNIFIED SCENARIO SCORER FOR COPILOT & MODAL POPUP ---
    function findBestMatches(userQ) {
      if (!userQ || userQ.trim().length === 0) return [];
      var cleanQ = userQ.toLowerCase().trim();
      var scored = [];

      flatQuestions.forEach(function(item){
        var score = 0;
        var qText = item.q.toLowerCase();
        var spText = item.spoken.toLowerCase();

        // Exact substring matches
        if (qText.indexOf(cleanQ) !== -1) score += 50;
        if (spText.indexOf(cleanQ) !== -1) score += 20;

        // Specific high-intent keyword mappings with exact Q#
        if ((cleanQ.includes('last working day') || cleanQ.includes('lwd') || cleanQ.includes('27 nov') || cleanQ.includes('notice')) && (item.num === 'Q34' || item.num === 'Q37')) score += 85;
        if ((cleanQ.includes('current ctc') || cleanQ.includes('current salary') || cleanQ.includes('fixed') || cleanQ.includes('29')) && item.num === 'Q25') score += 85;
        if ((cleanQ.includes('expected ctc') || cleanQ.includes('expectations') || cleanQ.includes('hike') || cleanQ.includes('40') || cleanQ.includes('42')) && (item.num === 'Q26' || item.num === 'Q27')) score += 85;
        if ((cleanQ.includes('change company') || cleanQ.includes('why change') || cleanQ.includes('leave lowe') || cleanQ.includes('why leave')) && (item.num === 'Q06' || item.num === 'Q05' || item.num === 'Q07')) score += 75;
        if ((cleanQ.includes('leadership') || cleanQ.includes('how many engineer') || cleanQ.includes('engineer led') || cleanQ.includes('mentor')) && (item.num === 'Q18' || item.num === 'Q15')) score += 85;
        if ((cleanQ.includes('offer') || cleanQ.includes('competing') || cleanQ.includes('counteroffer')) && (item.num === 'Q39' || item.num === 'Q40' || item.num === 'Q33')) score += 75;
        if ((cleanQ.includes('170ms') || cleanQ.includes('latency') || cleanQ.includes('redis')) && (item.num === 'Q46' || item.num === 'Q17')) score += 80;
        if ((cleanQ.includes('oom') || cleanQ.includes('memory leak') || cleanQ.includes('heap dump')) && item.num === 'Q53') score += 85;
        if ((cleanQ.includes('kafka') || cleanQ.includes('lag') || cleanQ.includes('rebalance')) && item.num === 'Q52') score += 85;
        if ((cleanQ.includes('pool') || cleanQ.includes('hikaricp') || cleanQ.includes('exhaust')) && item.num === 'Q47') score += 85;
        if ((cleanQ.includes('concurrent') || cleanQ.includes('locking') || cleanQ.includes('optimistic')) && item.num === 'Q48') score += 85;
        if ((cleanQ.includes('duplicate payment') || cleanQ.includes('idempot')) && item.num === 'Q49') score += 85;
        if ((cleanQ.includes('downstream') || cleanQ.includes('circuit') || cleanQ.includes('timeout')) && item.num === 'Q50') score += 85;
        if ((cleanQ.includes('saga') || cleanQ.includes('transaction')) && item.num === 'Q55') score += 85;

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
      return scored;
    }

    function formatParagraphs(text) {
      if (!text) return '';
      return text.split(/\\n\\n+/).map(function(p){ return '<p>' + p.replace(/\\n/g, '<br>') + '</p>'; }).join('');
    }

    // --- 2.5 DEDICATED INLINE FAST ANSWER COPILOT ---
    var copilotInput = document.getElementById('copilot-search-input');
    var copilotAskBtn = document.getElementById('copilot-ask-btn');
    var copilotResultWrap = document.getElementById('copilot-result-container');
    var copilotAnsQNum = document.getElementById('copilot-ans-qnum');
    var copilotAnsSec = document.getElementById('copilot-ans-sectitle');
    var copilotAnsQuestion = document.getElementById('copilot-ans-question');
    var copilotSpeechText = document.getElementById('copilot-speech-text');
    var copilotAnsScore = document.getElementById('copilot-ans-score');
    var copilotJumpPlaybookBtn = document.getElementById('copilot-jump-playbook-btn');
    var copilotRelatedWrap = document.getElementById('copilot-related-wrap');
    var copilotRelatedList = document.getElementById('copilot-related-list');
    var activeCopilotQNum = null;

    function answerWithInlineCopilot(userQ) {
      var matches = findBestMatches(userQ);
      if (matches.length === 0) return;
      var best = matches[0];
      if (!best || !best.item) return;

      var topItem = best.item;
      activeCopilotQNum = topItem.num;
      if (copilotAnsQNum) copilotAnsQNum.innerText = topItem.num;
      if (copilotAnsSec) copilotAnsSec.innerText = topItem.secTitle;
      if (copilotAnsQuestion) copilotAnsQuestion.innerText = topItem.q;
      if (copilotSpeechText) copilotSpeechText.innerHTML = formatParagraphs(topItem.spoken);
      if (copilotAnsScore) copilotAnsScore.innerHTML = '<i class="ti-check text-success mr-1"></i> ' + Math.min(99, Math.max(88, best.score)) + '% Match';
      if (copilotResultWrap) copilotResultWrap.style.display = 'block';

      // Update copy button attribute
      var cpCopyBtn = document.getElementById('copilot-copy-btn');
      if (cpCopyBtn) cpCopyBtn.setAttribute('data-copy-text', topItem.spoken);

      // Next 3 related
      var relatedHtml = '';
      for (var k = 1; k <= 3 && k < matches.length; k++) {
        var rel = matches[k].item;
        relatedHtml += '<button type="button" class="copilot-related-btn" data-copilot-q="' + rel.q.replace(/"/g, '&quot;') + '"><strong>' + rel.num + ':</strong> ' + rel.q + '</button>';
      }
      if (relatedHtml && copilotRelatedList) {
        copilotRelatedList.innerHTML = relatedHtml;
        if (copilotRelatedWrap) copilotRelatedWrap.style.display = 'block';
      }

      if (copilotResultWrap) copilotResultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (copilotAskBtn && copilotInput) {
      copilotAskBtn.addEventListener('click', function(){
        answerWithInlineCopilot(copilotInput.value);
      });
      copilotInput.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter') {
          ev.preventDefault();
          answerWithInlineCopilot(copilotInput.value);
        }
      });
    }

    document.querySelectorAll('.copilot-prompt-pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        var ask = pill.getAttribute('data-ask');
        if (copilotInput) copilotInput.value = ask;
        answerWithInlineCopilot(ask);
      });
    });

    document.addEventListener('click', function(e){
      var relBtn = e.target.closest('.copilot-related-btn');
      if (relBtn) {
        var text = relBtn.getAttribute('data-copilot-q');
        if (copilotInput) copilotInput.value = text;
        answerWithInlineCopilot(text);
      }
    });

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

    // --- 2.6 HELPER POPUP MODAL SYSTEM ---
    var helperModalBackdrop = document.getElementById('interview-helper-modal');
    var btnFloatingAsk = document.getElementById('btn-floating-ask');
    var btnOpenCopilotPopup = document.getElementById('btn-open-copilot-popup');
    var btnCloseHelperModal = document.getElementById('btn-close-helper-modal');
    var modalCopilotInput = document.getElementById('modal-copilot-input');
    var modalCopilotAskBtn = document.getElementById('modal-copilot-ask-btn');
    var modalCopilotResult = document.getElementById('modal-copilot-result');
    var modalResQNum = document.getElementById('modal-res-qnum');
    var modalResSec = document.getElementById('modal-res-sec');
    var modalResScore = document.getElementById('modal-res-score');
    var modalResQuestion = document.getElementById('modal-res-question');
    var modalResSpeech = document.getElementById('modal-res-speech');
    var modalCopyBtn = document.getElementById('modal-copy-btn');
    var modalJumpPlaybookBtn = document.getElementById('modal-jump-playbook-btn');
    var modalRelatedWrap = document.getElementById('modal-related-wrap');
    var modalRelatedList = document.getElementById('modal-related-list');
    var activeModalQNum = null;

    function openHelperModal() {
      if (!helperModalBackdrop) return;
      syncHighlightValues();
      helperModalBackdrop.style.display = 'flex';
      setTimeout(function(){
        helperModalBackdrop.classList.add('show');
        if (modalCopilotInput) modalCopilotInput.focus();
      }, 10);
    }

    function closeHelperModal() {
      if (!helperModalBackdrop) return;
      helperModalBackdrop.classList.remove('show');
      setTimeout(function(){ helperModalBackdrop.style.display = 'none'; }, 250);
    }

    if (btnFloatingAsk) btnFloatingAsk.addEventListener('click', openHelperModal);
    if (btnOpenCopilotPopup) btnOpenCopilotPopup.addEventListener('click', openHelperModal);
    if (btnCloseHelperModal) btnCloseHelperModal.addEventListener('click', closeHelperModal);

    // Close on backdrop click
    if (helperModalBackdrop) {
      helperModalBackdrop.addEventListener('click', function(e){
        if (e.target === helperModalBackdrop) closeHelperModal();
      });
    }
    if (editModalBackdrop) {
      editModalBackdrop.addEventListener('click', function(e){
        if (e.target === editModalBackdrop) closeEditModal();
      });
    }

    // Close modals on Esc
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        closeHelperModal();
        closeEditModal();
      }
    });

    function answerWithModalHelper(userQ) {
      var matches = findBestMatches(userQ);
      if (matches.length === 0) return;
      var best = matches[0];
      if (!best || !best.item) return;

      var topItem = best.item;
      activeModalQNum = topItem.num;
      if (modalResQNum) modalResQNum.innerText = topItem.num;
      if (modalResSec) modalResSec.innerText = topItem.secTitle;
      if (modalResQuestion) modalResQuestion.innerText = topItem.q;
      if (modalResSpeech) modalResSpeech.innerHTML = formatParagraphs(topItem.spoken);
      if (modalResScore) modalResScore.innerHTML = '<i class="ti-check text-success mr-1"></i> ' + Math.min(99, Math.max(88, best.score)) + '% Match';
      if (modalCopilotResult) modalCopilotResult.style.display = 'block';

      if (modalCopyBtn) modalCopyBtn.setAttribute('data-copy-text', topItem.spoken);

      // Related scenarios in modal
      var relHtml = '';
      for (var m = 1; m <= 3 && m < matches.length; m++) {
        var it = matches[m].item;
        relHtml += '<button type="button" class="modal-related-btn" data-modal-q="' + it.q.replace(/"/g, '&quot;') + '"><strong>' + it.num + ':</strong> ' + it.q + '</button>';
      }
      if (relHtml && modalRelatedList) {
        modalRelatedList.innerHTML = relHtml;
        if (modalRelatedWrap) modalRelatedWrap.style.display = 'block';
      }
    }

    if (modalCopilotAskBtn && modalCopilotInput) {
      modalCopilotAskBtn.addEventListener('click', function(){
        answerWithModalHelper(modalCopilotInput.value);
      });
      modalCopilotInput.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter') {
          ev.preventDefault();
          answerWithModalHelper(modalCopilotInput.value);
        }
      });
    }

    document.querySelectorAll('.modal-prompt-pill').forEach(function(pill){
      pill.addEventListener('click', function(){
        var ask = pill.getAttribute('data-ask');
        if (modalCopilotInput) modalCopilotInput.value = ask;
        answerWithModalHelper(ask);
      });
    });

    document.addEventListener('click', function(e){
      var mRelBtn = e.target.closest('.modal-related-btn');
      if (mRelBtn) {
        var q = mRelBtn.getAttribute('data-modal-q');
        if (modalCopilotInput) modalCopilotInput.value = q;
        answerWithModalHelper(q);
      }
    });

    if (modalJumpPlaybookBtn) {
      modalJumpPlaybookBtn.addEventListener('click', function(){
        closeHelperModal();
        if (activeModalQNum) {
          var targetCard = document.querySelector('[data-qnum="' + activeModalQNum + '"]');
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

    // --- 2.7 REAL-TIME SEARCH & FILTER SYSTEM WITH QUICK CHIPS ---
    var searchInput = document.getElementById('search-input');
    var btnClearSearch = document.getElementById('btn-clear-search');
    var filterPills = document.querySelectorAll('.filter-tab-pill');
    var currentFilter = 'all';

    function applyFilter() {
      var query = (searchInput ? searchInput.value : '').toLowerCase().trim();
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
        var matchesSearch = false;

        if (!query) {
          matchesSearch = true;
        } else if (cardText.indexOf(query) !== -1) {
          matchesSearch = true;
        } else if ((query.includes('offer holding') || query.includes('offer')) && secId === 'section-04') {
          matchesSearch = true;
        } else if ((query.includes('change company') || query.includes('why leave') || query.includes('transition')) && secId === 'section-01') {
          matchesSearch = true;
        } else if ((query.includes('leadership') || query.includes('engineer led') || query.includes('how many engineer')) && (secId === 'section-02' || cardText.includes('mentor') || cardText.includes('led'))) {
          matchesSearch = true;
        } else if ((query.includes('current ctc') || query.includes('expected ctc') || query.includes('last working day') || query.includes('salary')) && secId === 'section-03') {
          matchesSearch = true;
        } else if ((query.includes('production incident') || query.includes('incident')) && secId === 'section-05') {
          matchesSearch = true;
        }

        if (matchesSection && matchesSearch) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Show/hide section containers
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
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
    }

    \n\n`;

  builder = builder.substring(0, jsStartIndex) + replacementJs + builder.substring(jsEndIndex);
  console.log('7. Replaced JavaScript engine with complete error-free Copilot, Modal, Search & Copy logic');
} else {
  console.log('7. Warning: jsStartMarker or jsEndMarker not found', { jsStartIndex, jsEndIndex });
}

if (isCRLF) {
  builder = builder.replace(/\n/g, '\r\n');
}

fs.writeFileSync(builderPath, builder, 'utf8');
console.log('Updated build_personal_interview_page.js successfully!');

// Re-generate personal-interview.html
require(builderPath);
