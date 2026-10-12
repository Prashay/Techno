const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const feedbackCss = `
/* ==========================================================================
   TechnoInterview - User Suggestion & Community Task Board System
   ========================================================================== */

/* Floating Suggestion Button (Bottom Left, adjacent to JARVIS) */
.floating-suggest-btn {
  position: fixed;
  bottom: 28px;
  left: 92px;
  z-index: 99998;
  width: 54px;
  height: 54px;
  background: radial-gradient(circle at 35% 35%, #78350f 0%, #1c1917 100%);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.45);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -3px rgba(28, 25, 23, 0.8), 0 0 22px rgba(245, 158, 11, 0.35);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  backdrop-filter: blur(10px);
}

.floating-suggest-btn:hover {
  transform: translateY(-4px) scale(1.08);
  border-color: #fbbf24;
  box-shadow: 0 16px 36px -3px rgba(28, 25, 23, 0.95), 0 0 35px rgba(245, 158, 11, 0.6);
  color: #fef08a;
}

.floating-suggest-btn:active {
  transform: translateY(-1px) scale(0.96);
}

.suggest-launcher-icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6));
}

.floating-suggest-btn:hover .suggest-launcher-icon {
  transform: scale(1.15) rotate(8deg);
}

.suggest-pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(245, 158, 11, 0.55);
  animation: suggestRingPulse 3.2s infinite ease-out;
  pointer-events: none;
}

@keyframes suggestRingPulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  50% { transform: scale(1.22); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
}

.suggest-float-badge {
  position: absolute;
  top: -3px;
  right: -3px;
  background: #ef4444;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 10px;
  border: 2px solid #0f172a;
  z-index: 4;
}

.floating-suggest-btn .floating-tooltip {
  left: 66px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px) scale(0.9);
}

.floating-suggest-btn:hover .floating-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0) scale(1);
}

@media (max-width: 850px) {
  .floating-suggest-btn {
    bottom: 18px;
    left: 74px;
    width: 48px;
    height: 48px;
  }
  .floating-suggest-btn .suggest-launcher-icon {
    width: 19px;
    height: 19px;
  }
}

/* --------------------------------------------------------------------------
   Suggestion Modal Dialog & Task Board Window
   -------------------------------------------------------------------------- */
.suggest-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(14px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: suggestFadeIn 0.25s ease-out;
}

@keyframes suggestFadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.suggest-modal-window {
  width: 95vw;
  max-width: 980px;
  height: 88vh;
  max-height: 840px;
  background: #0b1120;
  border: 1px solid rgba(245, 158, 11, 0.35);
  border-radius: 16px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.suggest-modal-header {
  padding: 16px 24px;
  background: linear-gradient(135deg, #18181b 0%, #090d16 100%);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.suggest-header-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fbbf24;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.suggest-btn-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s;
}

.suggest-btn-close:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

/* Tabs */
.suggest-modal-tabs {
  display: flex;
  background: #070b14;
  border-bottom: 1px solid #1e293b;
  padding: 0 20px;
  gap: 8px;
}

.suggest-tab-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 13.5px;
  font-weight: 700;
  padding: 12px 20px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  outline: none;
}

.suggest-tab-btn:hover {
  color: #f8fafc;
}

.suggest-tab-btn.active {
  color: #fbbf24;
}

.suggest-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #fbbf24;
  box-shadow: 0 0 10px #fbbf24;
}

/* Body */
.suggest-modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #090e1a;
}

.suggest-tab-content {
  display: none;
  flex: 1;
  overflow: hidden;
}

.suggest-tab-content.active {
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.suggest-toolbar {
  padding: 14px 24px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggest-search-box {
  display: flex;
  align-items: center;
  background: #0b1120;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0 14px;
  gap: 10px;
  color: #94a3b8;
}

.suggest-search-box input {
  flex: 1;
  background: transparent;
  border: none;
  color: #f8fafc;
  padding: 10px 0;
  font-size: 13.5px;
  outline: none;
}

.suggest-filter-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-chip {
  background: #1e293b;
  border: 1px solid #334155;
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-chip:hover {
  background: #334155;
  color: #ffffff;
}

.filter-chip.active {
  background: rgba(245, 158, 11, 0.2);
  border-color: #f59e0b;
  color: #fbbf24;
}

/* Cards scroll */
.suggest-cards-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggest-task-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 18px 20px;
  transition: all 0.25s ease;
  position: relative;
}

.suggest-task-card:hover {
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.suggest-task-card.task-card-resolved {
  background: #090e17;
  opacity: 0.75;
  border-left: 4px solid #10b981;
}

.suggest-task-card:not(.task-card-resolved) {
  border-left: 4px solid #f59e0b;
}

.task-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.type-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: uppercase;
}

.type-pill.program {
  background: rgba(14, 165, 233, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(14, 165, 233, 0.3);
}

.type-pill.theory {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.task-section-pill {
  background: #1e293b;
  color: #94a3b8;
  font-size: 11.5px;
  padding: 2px 8px;
  border-radius: 6px;
}

.task-level-pill {
  background: rgba(245, 158, 11, 0.12);
  color: #fbbf24;
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 6px;
  font-weight: 600;
}

.task-status-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
}

.task-status-pill.badge-pending {
  background: rgba(245, 158, 11, 0.18);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.task-status-pill.badge-addressed {
  background: rgba(16, 185, 129, 0.18);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.task-title {
  color: #f8fafc;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
}

.task-content-desc {
  color: #94a3b8;
  font-size: 13.5px;
  line-height: 1.6;
}

.task-code-preview {
  background: #020617;
  border: 1px solid #1e293b;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 14px;
}

.task-code-header {
  background: #0b1120;
  padding: 6px 12px;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
}

.task-code-preview pre {
  margin: 0;
  padding: 12px 14px;
  color: #38bdf8;
  font-family: var(--ti-font-code), monospace;
  font-size: 12.5px;
  line-height: 1.5;
  max-height: 150px;
  overflow-y: auto;
}

.btn-task-compiler {
  background: #2563eb;
  border: none;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-task-compiler:hover {
  background: #1d4ed8;
}

.task-card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid #1e293b;
}

.btn-task-resolve {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  border: none;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-task-resolve:hover {
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-task-resolve.resolved {
  background: #334155;
  color: #cbd5e1;
}

.btn-task-jarvis {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.35);
  color: #38bdf8;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-task-jarvis:hover {
  background: rgba(56, 189, 248, 0.25);
  color: #7dd3fc;
}

.btn-task-delete {
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-task-delete:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Empty state */
.suggest-empty-state {
  text-align: center;
  padding: 50px 20px;
  color: #94a3b8;
}

.suggest-empty-state .empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

/* Form */
.suggest-form {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.suggest-label {
  color: #f8fafc;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
  display: block;
}

.suggest-input,
.suggest-select,
.suggest-textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  color: #f8fafc;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s;
}

.suggest-input:focus,
.suggest-select:focus,
.suggest-textarea:focus {
  border-color: #f59e0b;
}

.suggest-code-input {
  font-family: var(--ti-font-code), monospace;
  font-size: 13px;
  background: #020617;
  color: #38bdf8;
  tab-size: 4;
}

.suggest-type-toggle {
  display: flex;
  gap: 12px;
  padding-top: 4px;
}

.type-opt {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #cbd5e1;
  font-size: 13px;
  font-weight: 600;
}

.type-opt input {
  cursor: pointer;
}

/* Toast */
.suggest-toast-notification {
  position: fixed;
  bottom: 95px;
  left: 28px;
  z-index: 100005;
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid #10b981;
  box-shadow: 0 10px 25px rgba(0,0,0,0.6);
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.suggest-toast-notification.show {
  opacity: 1;
  transform: translateY(0);
}
`;

if (!cssContent.includes('TechnoInterview - User Suggestion & Community Task Board System')) {
  cssContent += '\n' + feedbackCss;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Appended Suggestion and Task Board styles to modern-opening.css');
} else {
  console.log('Styles already present in modern-opening.css');
}
