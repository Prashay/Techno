const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let content = fs.readFileSync(cssPath, 'utf8');

const compilerCss = `
/* ==========================================================================
   TechnoInterview - Interactive Online Compiler & Code Editor Styles
   Supports Java 8/17/21, React 19, Angular, SQL, Python, JavaScript
   ========================================================================== */

/* In-place Editable Code Block Widget */
.interactive-compiler-widget {
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  margin: 18px 0 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.25);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.interactive-compiler-widget:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 12px 35px -5px rgba(56, 189, 248, 0.2);
}

.compiler-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  background: #1e293b;
  padding: 8px 16px;
  border-bottom: 1px solid #334155;
}

.compiler-toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.compiler-lang-tag {
  background: #0284c7;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 6px;
}

.compiler-lang-badge {
  color: #94a3b8;
  font-size: 11px;
  font-family: var(--ti-font-code);
}

.compiler-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.compiler-btn {
  background: #334155;
  color: #e2e8f0;
  border: 1px solid #475569;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  outline: none;
}

.compiler-btn:hover {
  background: #475569;
  color: #ffffff;
  border-color: #64748b;
  transform: translateY(-1px);
}

.compiler-btn:active {
  transform: translateY(0);
}

.compiler-run-btn {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 2px 10px rgba(16, 185, 129, 0.35);
}

.compiler-run-btn:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.45);
}

.compiler-ide-btn {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
}

.compiler-ide-btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
  color: #ffffff;
}

/* Pre / Code Editor Section */
.compiler-editable-pre {
  margin: 0 !important;
  padding: 16px 20px !important;
  background: #0f172a !important;
  color: #f8fafc !important;
  font-family: var(--ti-font-code), 'Fira Code', 'Cascadia Code', monospace !important;
  font-size: 13.5px !important;
  line-height: 1.6 !important;
  overflow-x: auto;
  outline: none;
  min-height: 70px;
  caret-color: #38bdf8;
  white-space: pre !important;
  word-break: normal !important;
  tab-size: 4;
}

.compiler-editable-pre[contenteditable="true"] {
  cursor: text;
}

.compiler-editable-pre[contenteditable="true"]:focus {
  background: #0b1120 !important;
}

/* Terminal Drawer */
.compiler-terminal {
  background: #020617;
  border-top: 1px solid #1e293b;
  animation: compilerFadeIn 0.2s ease-out;
}

@keyframes compilerFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.compiler-terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0b1120;
  padding: 6px 16px;
  border-bottom: 1px solid #1e293b;
  color: #94a3b8;
  font-size: 11.5px;
  font-weight: 600;
  font-family: var(--ti-font-code);
}

.compiler-terminal-close {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 13px;
  padding: 2px 6px;
  transition: color 0.2s;
}

.compiler-terminal-close:hover {
  color: #ef4444;
}

.compiler-terminal-body {
  padding: 12px 18px;
  max-height: 220px;
  overflow-y: auto;
}

.compiler-terminal-stdout {
  margin: 0;
  padding: 0;
  background: transparent !important;
  color: #38bdf8 !important;
  font-family: var(--ti-font-code), monospace !important;
  font-size: 12.5px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

/* Floating Online Compiler Trigger */
.floating-compiler-btn {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99998;
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 13px 22px;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 25px -3px rgba(37, 99, 235, 0.5), 0 0 15px rgba(124, 58, 237, 0.4);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

.floating-compiler-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 14px 30px -3px rgba(37, 99, 235, 0.65), 0 0 25px rgba(124, 58, 237, 0.55);
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

/* Fullscreen Online Compiler IDE Modal */
.techno-ide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.techno-ide-window {
  width: 100%;
  max-width: 1200px;
  height: 88vh;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 16px;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: idePopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes idePopIn {
  from { opacity: 0; transform: scale(0.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.ide-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 12px 20px;
  border-bottom: 1px solid #334155;
}

.ide-title {
  color: #f8fafc;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ide-badge {
  background: #0284c7;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
}

.ide-timer-badge {
  background: #10b981;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  font-family: var(--ti-font-code);
}

.ide-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.ide-close-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.ide-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  background: #0b1120;
  padding: 10px 20px;
  border-bottom: 1px solid #1e293b;
}

.ide-select {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
}

.ide-select:focus {
  border-color: #38bdf8;
}

.ide-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ide-btn {
  background: #1e293b;
  color: #e2e8f0;
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  outline: none;
}

.ide-btn:hover {
  background: #334155;
  color: #ffffff;
}

.ide-btn-primary {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  border: none;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

.ide-btn-primary:hover {
  background: linear-gradient(135deg, #047857 0%, #059669 100%);
  box-shadow: 0 6px 18px rgba(16, 185, 129, 0.45);
}

.ide-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.ide-editor-pane {
  flex: 3;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1e293b;
  background: #0f172a;
}

.ide-terminal-pane {
  flex: 2;
  display: flex;
  flex-direction: column;
  background: #020617;
}

.ide-pane-header {
  background: #111827;
  color: #94a3b8;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--ti-font-code);
  border-bottom: 1px solid #1f2937;
  display: flex;
  justify-content: space-between;
}

.ide-textarea {
  flex: 1;
  background: #0f172a;
  color: #f8fafc;
  border: none;
  padding: 18px 20px;
  font-family: var(--ti-font-code), 'Fira Code', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
  caret-color: #38bdf8;
  white-space: pre;
  tab-size: 4;
}

.ide-console {
  flex: 1;
  margin: 0;
  padding: 16px 20px;
  background: #020617;
  color: #38bdf8;
  font-family: var(--ti-font-code), monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 900px) {
  .ide-body {
    flex-direction: column;
  }
  .ide-editor-pane {
    border-right: none;
    border-bottom: 1px solid #1e293b;
    flex: 1;
  }
  .ide-terminal-pane {
    flex: 1;
  }
  .floating-compiler-btn {
    bottom: 20px;
    right: 20px;
    padding: 10px 18px;
    font-size: 13px;
  }
}
`;

if (!content.includes('.interactive-compiler-widget')) {
  fs.writeFileSync(cssPath, content.trimEnd() + '\n' + compilerCss);
  console.log('Appended compiler CSS successfully! New length:', fs.statSync(cssPath).size);
} else {
  console.log('Compiler CSS already present.');
}
