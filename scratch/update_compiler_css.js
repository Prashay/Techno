const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Find start of compiler CSS section
const marker = '/* ==========================================================================\n   TechnoInterview - Interactive Online Compiler';
let splitIdx = content.indexOf(marker);
if (splitIdx === -1) {
  // Try alternative line ending
  splitIdx = content.indexOf('/* ==========================================================================\r\n   TechnoInterview - Interactive Online Compiler');
}
if (splitIdx === -1) {
  splitIdx = content.indexOf('.interactive-compiler-widget');
}

const baseCss = splitIdx !== -1 ? content.substring(0, splitIdx).trimEnd() : content;

const modernCompilerCss = `
/* ==========================================================================
   TechnoInterview - Ultra-Modern Online Compiler & Code Playground
   Includes: Dark & Light Mode Themes, Mac Window Controls, Live Terminals
   ========================================================================== */

/* --------------------------------------------------------------------------
   In-Place Compiler Widget (Wraps Question Code Blocks)
   -------------------------------------------------------------------------- */
.interactive-compiler-widget {
  border-radius: 14px;
  margin: 22px 0 28px;
  overflow: hidden;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dark Mode Theme (Default) */
.interactive-compiler-widget.theme-dark {
  background: #0b0f19;
  border: 1px solid #1e293b;
  box-shadow: 0 12px 32px -4px rgba(3, 7, 18, 0.45), 0 4px 12px rgba(0, 0, 0, 0.25);
}

.interactive-compiler-widget.theme-dark:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 16px 40px -4px rgba(56, 189, 248, 0.15), 0 0 0 1px #38bdf8;
}

.interactive-compiler-widget.theme-dark .compiler-mac-header {
  background: #111827;
  border-bottom: 1px solid #1f2937;
  color: #94a3b8;
}

.interactive-compiler-widget.theme-dark .compiler-editable-pre {
  background: #070a12 !important;
  color: #f1f5f9 !important;
  caret-color: #38bdf8;
}

.interactive-compiler-widget.theme-dark .compiler-editable-pre:focus {
  background: #040711 !important;
}

.interactive-compiler-widget.theme-dark .compiler-terminal {
  background: #030712;
  border-top: 1px solid #1f2937;
}

.interactive-compiler-widget.theme-dark .compiler-terminal-header {
  background: #0b0f19;
  border-bottom: 1px solid #1f2937;
  color: #94a3b8;
}

.interactive-compiler-widget.theme-dark .compiler-terminal-body {
  color: #38bdf8 !important;
}

/* Light Mode Theme */
.interactive-compiler-widget.theme-light {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
}

.interactive-compiler-widget.theme-light:focus-within {
  border-color: #2563eb;
  box-shadow: 0 14px 30px -4px rgba(37, 99, 235, 0.12), 0 0 0 1px #2563eb;
}

.interactive-compiler-widget.theme-light .compiler-mac-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
}

.interactive-compiler-widget.theme-light .compiler-editable-pre {
  background: #f8fafc !important;
  color: #0f172a !important;
  caret-color: #2563eb;
}

.interactive-compiler-widget.theme-light .compiler-editable-pre:focus {
  background: #ffffff !important;
}

.interactive-compiler-widget.theme-light .compiler-terminal {
  background: #f1f5f9;
  border-top: 1px solid #e2e8f0;
}

.interactive-compiler-widget.theme-light .compiler-terminal-header {
  background: #e2e8f0;
  border-bottom: 1px solid #cbd5e1;
  color: #334155;
}

.interactive-compiler-widget.theme-light .compiler-terminal-body {
  color: #0369a1 !important;
}

.interactive-compiler-widget.theme-light .compiler-file-tab {
  background: #ffffff;
  border-color: #cbd5e1;
  color: #1e293b;
}

.interactive-compiler-widget.theme-light .compiler-lang-dropdown {
  background: #ffffff;
  color: #0f172a;
  border-color: #cbd5e1;
}

.interactive-compiler-widget.theme-light .compiler-icon-btn {
  background: #ffffff;
  color: #475569;
  border-color: #cbd5e1;
}

.interactive-compiler-widget.theme-light .compiler-icon-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #94a3b8;
}

/* --------------------------------------------------------------------------
   Mac Window Top Header & Controls
   -------------------------------------------------------------------------- */
.compiler-mac-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px 16px;
  user-select: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.compiler-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.compiler-mac-dots {
  display: flex;
  align-items: center;
  gap: 6px;
}

.mac-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.mac-dot:hover {
  transform: scale(1.15);
  opacity: 0.85;
}

.mac-dot-red {
  background: #ff5f56;
  box-shadow: 0 0 6px rgba(255, 95, 86, 0.45);
}

.mac-dot-yellow {
  background: #ffbd2e;
  box-shadow: 0 0 6px rgba(255, 189, 46, 0.45);
}

.mac-dot-green {
  background: #27c93f;
  box-shadow: 0 0 6px rgba(39, 201, 63, 0.45);
}

.compiler-file-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 3px 10px;
  border-radius: 6px;
  font-family: var(--ti-font-code), monospace;
  font-size: 11.5px;
  font-weight: 600;
  color: #cbd5e1;
}

.compiler-file-icon {
  font-size: 11px;
  color: #38bdf8;
}

.compiler-file-name {
  letter-spacing: 0.2px;
}

.compiler-badge-live {
  font-size: 9.5px;
  color: #10b981;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-left: 4px;
}

.compiler-header-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

/* Language Dropdown Pill */
.compiler-lang-dropdown {
  background: #1e293b;
  color: #f1f5f9;
  border: 1px solid #334155;
  border-radius: 7px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.compiler-lang-dropdown:focus {
  border-color: #38bdf8;
}

/* Action & Icon Buttons */
.compiler-icon-btn {
  background: #1e293b;
  color: #cbd5e1;
  border: 1px solid #334155;
  border-radius: 7px;
  padding: 5px 9px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.2s ease;
  outline: none;
  line-height: 1;
}

.compiler-icon-btn:hover {
  background: #334155;
  color: #ffffff;
  border-color: #475569;
  transform: translateY(-1px);
}

.compiler-icon-btn:active {
  transform: translateY(0);
}

.compiler-theme-toggle {
  font-size: 11px;
  padding: 5px 10px;
}

.compiler-theme-toggle .theme-text {
  font-size: 11px;
  font-weight: 600;
}

/* Glowing Run Code Button */
.compiler-action-btn.compiler-run-btn {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  border: none;
  border-radius: 7px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.compiler-action-btn.compiler-run-btn:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
}

.compiler-action-btn.compiler-run-btn:active {
  transform: translateY(0) scale(0.99);
}

/* Spin animation on reset button click */
.spin-anim i {
  animation: spinIcon 0.5s ease-in-out;
}

@keyframes spinIcon {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* --------------------------------------------------------------------------
   Editable Pre / Code Editor Box
   -------------------------------------------------------------------------- */
.compiler-editor-container {
  position: relative;
}

.compiler-editable-pre {
  margin: 0 !important;
  padding: 18px 22px !important;
  font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Menlo, monospace !important;
  font-size: 13.5px !important;
  line-height: 1.65 !important;
  outline: none;
  overflow-x: auto;
  white-space: pre !important;
  word-break: normal !important;
  tab-size: 4;
  min-height: 80px;
  transition: background 0.2s ease, color 0.2s ease;
}

.compiler-editable-pre[contenteditable="true"] {
  cursor: text;
}

/* --------------------------------------------------------------------------
   Terminal Console Output Drawer
   -------------------------------------------------------------------------- */
.compiler-terminal {
  animation: termSlideDown 0.22s ease-out;
}

@keyframes termSlideDown {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

.compiler-terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px;
  font-family: var(--ti-font-code), monospace;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.term-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.term-status-dot {
  color: #10b981;
  font-size: 12px;
}

.term-latency-chip {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  padding: 1px 7px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
}

.term-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.term-clear-btn,
.term-close-btn {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 13px;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.term-clear-btn:hover {
  color: #f59e0b;
}

.term-close-btn:hover {
  color: #ef4444;
}

.compiler-terminal-body {
  margin: 0;
  padding: 14px 20px;
  background: transparent !important;
  font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
  font-size: 12.5px;
  line-height: 1.55;
  max-height: 240px;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

/* --------------------------------------------------------------------------
   Floating Online Compiler Trigger Button
   -------------------------------------------------------------------------- */
.floating-compiler-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99998;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 9px;
  box-shadow: 0 10px 25px -3px rgba(37, 99, 235, 0.5), 0 0 18px rgba(124, 58, 237, 0.35);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.floating-compiler-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 14px 32px -3px rgba(37, 99, 235, 0.65), 0 0 25px rgba(124, 58, 237, 0.5);
}

.floating-compiler-btn:active {
  transform: translateY(-1px) scale(0.98);
}

.compiler-sparkle {
  display: inline-block;
  animation: sparkleRotate 2.5s infinite linear;
}

@keyframes sparkleRotate {
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.25) rotate(15deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* --------------------------------------------------------------------------
   Fullscreen TechnoIDE Modal (Dark & Light Mode Themes)
   -------------------------------------------------------------------------- */
.techno-ide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(12px);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.techno-ide-window {
  width: 100%;
  max-width: 1260px;
  height: 88vh;
  border-radius: 16px;
  box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: idePopIn 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  transition: background 0.25s ease, border-color 0.25s ease;
}

@keyframes idePopIn {
  from { opacity: 0; transform: scale(0.96) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* IDE Dark Mode (Default) */
.techno-ide-overlay .techno-ide-window {
  background: #0a0e17;
  border: 1px solid #1e293b;
}

.techno-ide-overlay .techno-ide-header {
  background: #111827;
  border-bottom: 1px solid #1f2937;
  color: #f8fafc;
}

.techno-ide-overlay .techno-ide-editor-pane {
  background: #0b0f19;
  border-right: 1px solid #1f2937;
}

.techno-ide-overlay #ide-editor-textarea {
  background: #0b0f19;
  color: #f8fafc;
  caret-color: #38bdf8;
}

.techno-ide-overlay .techno-ide-output-pane {
  background: #030712;
}

.techno-ide-overlay .ide-console {
  background: #030712;
  color: #38bdf8;
}

.techno-ide-overlay .ide-pane-tabbar {
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
  color: #94a3b8;
}

.techno-ide-overlay .ide-editor-statusbar,
.techno-ide-overlay .ide-console-statusbar {
  background: #090d16;
  border-top: 1px solid #1e293b;
  color: #64748b;
}

/* IDE Light Mode */
.techno-ide-overlay.theme-light .techno-ide-window {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.18);
}

.techno-ide-overlay.theme-light .techno-ide-header {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}

.techno-ide-overlay.theme-light .ide-brand-text {
  color: #0f172a;
}

.techno-ide-overlay.theme-light .techno-ide-editor-pane {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
}

.techno-ide-overlay.theme-light #ide-editor-textarea {
  background: #ffffff;
  color: #0f172a;
  caret-color: #2563eb;
}

.techno-ide-overlay.theme-light .techno-ide-output-pane {
  background: #f8fafc;
}

.techno-ide-overlay.theme-light .ide-console {
  background: #f8fafc;
  color: #0369a1;
}

.techno-ide-overlay.theme-light .ide-pane-tabbar {
  background: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
}

.techno-ide-overlay.theme-light .ide-editor-statusbar,
.techno-ide-overlay.theme-light .ide-console-statusbar {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
}

.techno-ide-overlay.theme-light .ide-lang-select {
  background: #ffffff;
  color: #0f172a;
  border-color: #cbd5e1;
}

.techno-ide-overlay.theme-light .ide-header-btn,
.techno-ide-overlay.theme-light .ide-header-icon-btn {
  background: #ffffff;
  color: #475569;
  border-color: #cbd5e1;
}

.techno-ide-overlay.theme-light .ide-header-btn:hover,
.techno-ide-overlay.theme-light .ide-header-icon-btn:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.techno-ide-overlay.theme-light .ide-tab.active {
  background: #ffffff;
  color: #2563eb;
  border-color: #e2e8f0;
}

/* --------------------------------------------------------------------------
   IDE Header Bar Controls
   -------------------------------------------------------------------------- */
.techno-ide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.techno-ide-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.techno-ide-branding {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ide-brand-text {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.ide-brand-pill {
  background: linear-gradient(135deg, #0284c7 0%, #6366f1 100%);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}

.techno-ide-header-right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.ide-header-btn {
  background: #1e293b;
  color: #cbd5e1;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  outline: none;
}

.ide-header-btn:hover {
  background: #334155;
  color: #ffffff;
  border-color: #475569;
}

.ide-theme-btn {
  font-size: 12px;
}

.ide-header-icon-btn {
  background: #1e293b;
  color: #cbd5e1;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  outline: none;
}

.ide-header-icon-btn:hover {
  background: #334155;
  color: #ffffff;
  border-color: #475569;
}

.ide-btn-close:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

.ide-lang-select {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.ide-lang-select:focus {
  border-color: #38bdf8;
}

.ide-btn-run {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.ide-btn-run:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
  transform: translateY(-1px);
}

.ide-btn-run:active {
  transform: translateY(0);
}

/* --------------------------------------------------------------------------
   IDE Dual Pane Body
   -------------------------------------------------------------------------- */
.techno-ide-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.techno-ide-editor-pane {
  flex: 3;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.techno-ide-output-pane {
  flex: 2;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.ide-pane-tabbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--ti-font-code), monospace;
}

.ide-tab.active {
  background: rgba(30, 41, 59, 0.5);
  padding: 3px 10px;
  border-radius: 6px;
  color: #38bdf8;
  display: inline-flex;
  align-items: center;
}

.ide-tabbar-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ide-keyhint kbd {
  background: #1e293b;
  color: #94a3b8;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 10.5px;
  border: 1px solid #334155;
}

.ide-timer-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}

.ide-mini-btn {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 12px;
  transition: color 0.15s;
}

.ide-mini-btn:hover {
  color: #f59e0b;
}

.ide-editor-wrapper,
.ide-console-wrapper {
  flex: 1;
  display: flex;
  min-height: 0;
}

#ide-editor-textarea {
  flex: 1;
  border: none;
  padding: 18px 22px;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 13.5px;
  line-height: 1.65;
  resize: none;
  outline: none;
  white-space: pre;
  tab-size: 4;
}

.ide-console {
  flex: 1;
  margin: 0;
  padding: 18px 22px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.55;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.ide-editor-statusbar,
.ide-console-statusbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 16px;
  font-size: 11px;
  font-family: var(--ti-font-code), monospace;
}

@media (max-width: 900px) {
  .techno-ide-body {
    flex-direction: column;
  }
  .techno-ide-editor-pane {
    border-right: none;
    border-bottom: 1px solid #1e293b;
    flex: 1;
  }
  .techno-ide-output-pane {
    flex: 1;
  }
  .floating-compiler-btn {
    bottom: 18px;
    right: 18px;
    padding: 10px 18px;
    font-size: 13px;
  }
}
`;

fs.writeFileSync(cssPath, baseCss + '\n' + modernCompilerCss.trim());
console.log('Updated compiler CSS successfully! File size:', fs.statSync(cssPath).size);
