const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let content = fs.readFileSync(cssPath, 'utf8');

const jarvisCss = `
/* ==========================================================================
   TechnoInterview - J.A.R.V.I.S. Autonomous AI & Anomaly Detector HUD
   Futuristic Glassmorphic Interface with Neural Orb & Scanning Laser
   ========================================================================== */

/* Floating JARVIS Launcher (Bottom Left) */
.floating-jarvis-btn {
  position: fixed;
  bottom: 28px;
  left: 28px;
  z-index: 99998;
  background: linear-gradient(135deg, #0f172a 0%, #030712 100%);
  color: #f8fafc;
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 13.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px -3px rgba(15, 23, 42, 0.7), 0 0 20px rgba(56, 189, 248, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.floating-jarvis-btn:hover {
  transform: translateY(-3px) scale(1.04);
  border-color: #38bdf8;
  box-shadow: 0 14px 30px -3px rgba(15, 23, 42, 0.9), 0 0 30px rgba(56, 189, 248, 0.45);
}

.floating-jarvis-btn:active {
  transform: translateY(-1px) scale(0.98);
}

/* Pulsating Holographic Orb */
.jarvis-launcher-orb {
  position: relative;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.launcher-core {
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 10px #38bdf8;
}

.launcher-pulse {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1.5px solid #38bdf8;
  border-radius: 50%;
  animation: orbPulse 2s infinite ease-out;
}

@keyframes orbPulse {
  0% { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.8); opacity: 0; }
}

.jarvis-launcher-text {
  letter-spacing: 0.5px;
  font-family: var(--ti-font-code), monospace;
}

.jarvis-launcher-badge {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 12px;
}

/* --------------------------------------------------------------------------
   JARVIS Modal HUD Window
   -------------------------------------------------------------------------- */
.jarvis-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(14px);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
}

.jarvis-window {
  width: 100%;
  max-width: 1100px;
  height: 88vh;
  background: #0a0e17;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 18px;
  box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.18);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: jarvisPopIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes jarvisPopIn {
  from { opacity: 0; transform: scale(0.95) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Header */
.jarvis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 14px 22px;
  border-bottom: 1px solid #1e293b;
}

.jarvis-header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.jarvis-core-orb {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.jarvis-core-center {
  width: 12px;
  height: 12px;
  background: #38bdf8;
  border-radius: 50%;
  box-shadow: 0 0 15px #38bdf8;
}

.jarvis-core-pulse {
  position: absolute;
  width: 26px;
  height: 26px;
  border: 2px solid #38bdf8;
  border-radius: 50%;
  animation: orbPulse 1.8s infinite ease-out;
}

.jarvis-name {
  color: #f8fafc;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.5px;
  font-family: var(--ti-font-code), monospace;
}

.jarvis-version {
  color: #38bdf8;
  font-size: 11px;
  font-weight: 600;
}

.jarvis-subtitle {
  color: #94a3b8;
  font-size: 11.5px;
}

.jarvis-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.jarvis-status-badge {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.status-live-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10b981;
}

.jarvis-btn-close {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 6px;
  transition: all 0.15s;
}

.jarvis-btn-close:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

/* Tab bar */
.jarvis-tabbar {
  display: flex;
  background: #090d16;
  border-bottom: 1px solid #1e293b;
  padding: 0 16px;
  gap: 6px;
}

.jarvis-tab-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  outline: none;
}

.jarvis-tab-btn:hover {
  color: #f8fafc;
}

.jarvis-tab-btn.active {
  color: #38bdf8;
}

.jarvis-tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
}

/* Body & Content */
.jarvis-body {
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
}

.jarvis-tab-content {
  display: none;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.jarvis-tab-content.active {
  display: flex;
}

/* Chat QA Stream */
.jarvis-chat-stream {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.jarvis-msg {
  display: flex;
  gap: 12px;
  max-width: 85%;
}

.jarvis-msg-ai {
  align-self: flex-start;
}

.jarvis-msg-user {
  align-self: flex-end;
}

.jarvis-msg-avatar {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
}

.jarvis-msg-bubble {
  background: #111827;
  border: 1px solid #1f2937;
  color: #f1f5f9;
  padding: 14px 18px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
}

.jarvis-msg-user .jarvis-msg-bubble {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border: 1px solid #3b82f6;
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.jarvis-msg-ai .jarvis-msg-bubble {
  border-bottom-left-radius: 4px;
}

.jarvis-quick-prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.jarvis-prompt-chip {
  background: #1e293b;
  border: 1px solid #334155;
  color: #38bdf8;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.jarvis-prompt-chip:hover {
  background: #334155;
  border-color: #38bdf8;
  transform: translateY(-1px);
}

.jarvis-code-snippet {
  background: #030712 !important;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 10px 0;
  font-family: var(--ti-font-code), monospace;
  font-size: 13px;
  color: #38bdf8;
  overflow-x: auto;
}

.jarvis-action-bar {
  display: flex;
  gap: 8px;
  align-items: center;
}

.jarvis-pill-link {
  background: #0284c7;
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.jarvis-pill-link:hover {
  background: #0369a1;
  color: #ffffff;
}

.jarvis-send-to-ide-btn {
  background: #059669;
  color: #ffffff;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.jarvis-send-to-ide-btn:hover {
  background: #047857;
}

.jarvis-callout-warning {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  border-radius: 8px;
  padding: 12px 14px;
  color: #fca5a5;
  font-size: 13px;
}

/* Chat Input Bar */
.jarvis-input-container {
  padding: 14px 20px;
  background: #090d16;
  border-top: 1px solid #1e293b;
}

.jarvis-input-box {
  display: flex;
  align-items: center;
  background: #111827;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 4px 6px 4px 16px;
  transition: all 0.2s;
}

.jarvis-input-box:focus-within {
  border-color: #38bdf8;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

.jarvis-input-box input {
  flex: 1;
  background: transparent;
  border: none;
  color: #f8fafc;
  font-size: 14px;
  outline: none;
  padding: 8px 0;
}

.jarvis-input-box input::placeholder {
  color: #64748b;
}

.jarvis-send-btn {
  background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
  color: #ffffff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.jarvis-send-btn:hover {
  transform: scale(1.05);
}

/* --------------------------------------------------------------------------
   Anomaly Detector Tab
   -------------------------------------------------------------------------- */
.jarvis-anomaly-container {
  display: flex;
  flex: 1;
  min-height: 0;
}

.jarvis-anomaly-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #1e293b;
  padding: 16px;
  background: #0a0e17;
}

.anomaly-input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-size: 12.5px;
  font-weight: 600;
  margin-bottom: 10px;
}

.jarvis-pill-btn {
  background: #1e293b;
  color: #38bdf8;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 11px;
  cursor: pointer;
}

.jarvis-pill-btn:hover {
  background: #334155;
}

#jarvis-anomaly-code {
  flex: 1;
  background: #030712;
  color: #f8fafc;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 14px;
  font-family: var(--ti-font-code), monospace;
  font-size: 13px;
  line-height: 1.6;
  resize: none;
  outline: none;
  caret-color: #38bdf8;
  tab-size: 4;
}

#jarvis-anomaly-code:focus {
  border-color: #38bdf8;
}

.jarvis-scan-action-btn {
  margin-top: 12px;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
}

.jarvis-scan-action-btn:hover {
  background: linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%);
  transform: translateY(-1px);
}

.jarvis-anomaly-right {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #030712;
  display: flex;
  flex-direction: column;
}

/* Radar & Scanning visuals */
.anomaly-radar-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #94a3b8;
}

.radar-scan-text {
  font-size: 15px;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.6;
}

.scanning-laser {
  height: 2px;
  width: 100%;
  background: linear-gradient(90deg, transparent, #38bdf8, transparent);
  animation: laserScan 1.2s infinite ease-in-out;
  margin-bottom: 20px;
}

@keyframes laserScan {
  0% { transform: translateY(-30px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(40px); opacity: 0; }
}

.anomaly-result-card {
  background: #0b0f19;
  border: 1px solid #1e293b;
  border-radius: 12px;
  padding: 18px;
}

.clean-card {
  border-color: rgba(16, 185, 129, 0.4);
}

.risk-card {
  border-color: rgba(239, 68, 68, 0.4);
}

.risk-gauge {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  padding: 6px 14px;
  border-radius: 8px;
  text-align: center;
}

.clean-gauge {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
  display: inline-block;
  margin-bottom: 14px;
}

.risk-number {
  font-size: 22px;
  font-weight: 900;
  display: block;
  line-height: 1;
  color: #ef4444;
}

.clean-gauge .risk-number {
  color: #10b981;
}

.risk-sub {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #94a3b8;
}

.anomaly-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.anomaly-item {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
}

.anomaly-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.anomaly-item-title {
  color: #f8fafc;
  font-weight: 700;
}

/* Promo Sandbox */
.jarvis-compiler-promo {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.promo-card {
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
}

.promo-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.promo-card h3 {
  color: #f8fafc !important;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.promo-card p {
  color: #94a3b8 !important;
  font-size: 13.5px;
  line-height: 1.6;
  margin-bottom: 22px;
}

.jarvis-launch-ide-btn {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
  color: #ffffff;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

@media (max-width: 850px) {
  .floating-jarvis-btn {
    bottom: 20px;
    left: 20px;
    padding: 8px 14px;
    font-size: 12px;
  }
  .jarvis-anomaly-container {
    flex-direction: column;
  }
  .jarvis-anomaly-left {
    border-right: none;
    border-bottom: 1px solid #1e293b;
  }
}
`;

fs.writeFileSync(cssPath, content.trimEnd() + '\n' + jarvisCss.trim());
console.log('Appended JARVIS CSS successfully! New length:', fs.statSync(cssPath).size);
