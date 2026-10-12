const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const mobileStyles = `
/* ==========================================================================
   TechnoInterview - Mobile Download & Scanner System Styles
   ========================================================================== */

/* Buttons */
.btn-mobile-download {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35) !important;
  transition: all 0.25s ease !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  cursor: pointer !important;
  text-decoration: none !important;
}

.btn-mobile-download:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5) !important;
  background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
  color: #ffffff !important;
}

.btn-scanner-download {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  padding: 12px 24px !important;
  border-radius: 8px !important;
  box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35) !important;
  transition: all 0.25s ease !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  cursor: pointer !important;
  text-decoration: none !important;
}

.btn-scanner-download:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(2, 132, 199, 0.5) !important;
  background: linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%) !important;
  color: #ffffff !important;
}

/* Floating Mobile App Launcher Button (Stacked cleanly above compiler button) */
.floating-mobile-app-btn {
  position: fixed;
  bottom: 92px;
  right: 28px;
  z-index: 99997;
  display: flex;
  align-items: center;
  gap: 8px;
  background: radial-gradient(circle at 35% 35%, #0f172a 0%, #020617 100%);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.4);
  border-radius: 30px;
  padding: 8px 16px;
  box-shadow: 0 8px 24px -2px rgba(15, 23, 42, 0.8), 0 0 18px rgba(56, 189, 248, 0.25);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(12px);
}

.floating-mobile-app-btn:hover {
  transform: translateY(-3px) scale(1.05);
  border-color: #38bdf8;
  box-shadow: 0 14px 30px -2px rgba(15, 23, 42, 0.9), 0 0 28px rgba(56, 189, 248, 0.5);
  color: #7dd3fc;
}

.mobile-launcher-icon-wrap {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 17px;
}

.mobile-sub-icon {
  font-size: 11px;
  margin-left: -4px;
  color: #f59e0b;
}

.mobile-launcher-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: mobilePulse 1.8s infinite;
}

@keyframes mobilePulse {
  0% { transform: scale(0.9); opacity: 0.8; }
  50% { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(0.9); opacity: 0.8; }
}

.floating-mobile-app-btn .floating-tooltip {
  position: absolute;
  right: calc(100% + 14px);
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  background: #0f172a;
  color: #f8fafc;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.25s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.floating-mobile-app-btn:hover .floating-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* Modal Overlay & Dialog */
.techno-download-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeInModal 0.25s ease;
}

@keyframes fadeInModal {
  from { opacity: 0; }
  to { opacity: 1; }
}

.techno-download-modal-dialog {
  width: 100%;
  max-width: 820px;
  max-height: 90vh;
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: popUpModal 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popUpModal {
  from { transform: scale(0.95) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.techno-download-modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

/* Modal Header */
.download-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.6) 100%);
}

.modal-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon-orb {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #0284c7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 22px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.35);
}

.modal-title {
  color: #f8fafc !important;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.modal-subtitle {
  color: #94a3b8 !important;
  font-size: 13px;
  margin: 3px 0 0;
}

.modal-close-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-color: #ef4444;
}

/* Tabs Bar */
.download-tabs-bar {
  display: flex;
  background: rgba(15, 23, 42, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 6px 20px 0;
  gap: 8px;
}

.download-tab-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.download-tab-btn:hover {
  color: #f8fafc;
}

.download-tab-btn.active {
  color: #38bdf8;
  border-bottom-color: #38bdf8;
  background: rgba(56, 189, 248, 0.06);
  border-radius: 6px 6px 0 0;
}

/* Tab Panels */
.download-tab-panel {
  display: none;
  padding: 28px;
  flex: 1;
}

.download-tab-panel.active {
  display: block;
}

/* Tab 1: QR Grid */
.scan-grid-row {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  align-items: center;
}

@media (max-width: 768px) {
  .scan-grid-row {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.qr-display-box {
  position: relative;
  background: #ffffff;
  padding: 14px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.qr-target-corners .c-tl,
.qr-target-corners .c-tr,
.qr-target-corners .c-bl,
.qr-target-corners .c-br {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 3px solid #0284c7;
  pointer-events: none;
}
.qr-target-corners .c-tl { top: 6px; left: 6px; border-right: none; border-bottom: none; border-radius: 4px 0 0 0; }
.qr-target-corners .c-tr { top: 6px; right: 6px; border-left: none; border-bottom: none; border-radius: 0 4px 0 0; }
.qr-target-corners .c-bl { bottom: 6px; left: 6px; border-right: none; border-top: none; border-radius: 0 0 0 4px; }
.qr-target-corners .c-br { bottom: 6px; right: 6px; border-left: none; border-top: none; border-radius: 0 0 4px 0; }

.qr-laser-line {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #0284c7 50%, transparent 100%);
  box-shadow: 0 0 10px #0284c7;
  animation: laserScan 2.4s ease-in-out infinite alternate;
  pointer-events: none;
  z-index: 5;
}

@keyframes laserScan {
  0% { top: 14px; opacity: 0.3; }
  50% { opacity: 1; }
  100% { top: calc(100% - 14px); opacity: 0.3; }
}

.qr-brand-chip {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #334155;
}

.qr-chip-logo {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.qr-caption {
  margin-top: 10px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
  font-weight: 500;
}

/* Instructions */
.instruction-heading {
  color: #f8fafc !important;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 18px;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
}

.steps-list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
}

.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border: 1px solid rgba(56, 189, 248, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.step-text strong {
  color: #f1f5f9;
  font-size: 14px;
  display: block;
}

.step-text p {
  color: #94a3b8 !important;
  font-size: 13px;
  margin: 2px 0 0;
  line-height: 1.4;
}

.quick-link-bar {
  display: flex;
  gap: 8px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 6px 8px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.quick-link-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #38bdf8;
  font-family: var(--ti-font-code), monospace;
  font-size: 12px;
  padding-left: 8px;
  outline: none;
}

.quick-share-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.share-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.share-badge-btn {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.share-badge-btn.whatsapp { background: rgba(37, 211, 102, 0.15); color: #25d366; border: 1px solid rgba(37, 211, 102, 0.3); }
.share-badge-btn.whatsapp:hover { background: #25d366; color: #ffffff; }

.share-badge-btn.telegram { background: rgba(0, 136, 204, 0.15); color: #0088cc; border: 1px solid rgba(0, 136, 204, 0.3); }
.share-badge-btn.telegram:hover { background: #0088cc; color: #ffffff; }

.share-badge-btn.email { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
.share-badge-btn.email:hover { background: #f59e0b; color: #ffffff; }

/* Tab 2: Direct Download Cards */
.direct-download-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.app-card-hero {
  display: flex;
  gap: 20px;
  align-items: center;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 20px;
}

.app-avatar-badge img {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.app-tag-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.status-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.status-badge.green { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }
.status-badge.blue { background: rgba(2, 132, 199, 0.15); color: #38bdf8; border: 1px solid rgba(2, 132, 199, 0.3); }

.app-name-title {
  color: #f8fafc !important;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
}

.app-desc-lead {
  color: #94a3b8 !important;
  font-size: 13px;
  margin: 0;
  line-height: 1.5;
}

.download-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 640px) {
  .download-actions-grid {
    grid-template-columns: 1fr;
  }
}

.action-card-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
}

.action-card-btn.primary {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.25) 100%);
  border-color: rgba(16, 185, 129, 0.4);
}

.action-card-btn.primary:hover {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.action-card-btn.secondary {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(37, 99, 235, 0.25) 100%);
  border-color: rgba(2, 132, 199, 0.4);
}

.action-card-btn.secondary:hover {
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
}

.action-card-btn:hover .btn-action-label,
.action-card-btn:hover .btn-action-sub,
.action-card-btn:hover .btn-icon-col i,
.action-card-btn:hover .btn-arrow-col i {
  color: #ffffff !important;
}

.btn-icon-col i {
  font-size: 26px;
  color: #38bdf8;
}

.btn-action-label {
  display: block;
  font-weight: 700;
  font-size: 14px;
  color: #f8fafc;
}

.btn-action-sub {
  display: block;
  font-size: 12px;
  color: #94a3b8;
}

.btn-arrow-col {
  margin-left: auto;
  font-size: 18px;
  color: #cbd5e1;
}

.app-specs-table {
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px 20px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 13px;
}

.spec-item:last-child {
  border-bottom: none;
}

.spec-label {
  color: #94a3b8;
}

.spec-val {
  color: #f1f5f9;
  font-weight: 600;
}

/* Tab 3: Camera Scanner */
.camera-scanner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.scanner-video-wrapper {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 280px;
  background: #020617;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(56, 189, 248, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scanner-video-feed {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanner-reticle {
  position: absolute;
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.scanner-reticle .r-tl,
.scanner-reticle .r-tr,
.scanner-reticle .r-bl,
.scanner-reticle .r-br {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 3px solid #38bdf8;
}
.scanner-reticle .r-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.scanner-reticle .r-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.scanner-reticle .r-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.scanner-reticle .r-br { bottom: 0; right: 0; border-left: none; border-top: none; }

.scanner-beam-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: laserScan 2s ease-in-out infinite alternate;
}

.scanner-status-text {
  font-size: 13px;
  color: #94a3b8;
  text-align: center;
  font-weight: 500;
}

.camera-btn-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.scanned-success-card {
  margin-top: 14px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.4);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  animation: fadeInModal 0.25s ease;
}

.scanned-badge {
  color: #10b981;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 6px;
}

.scanned-url {
  color: #38bdf8;
  font-family: var(--ti-font-code), monospace;
  font-size: 13px;
  word-break: break-all;
  margin-bottom: 12px;
}

.scanned-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* Toast */
.techno-mobile-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #0f172a;
  color: #f8fafc;
  border: 1px solid #10b981;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7);
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100010;
  display: flex;
  align-items: center;
  gap: 10px;
}

.techno-mobile-toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.techno-mobile-toast .toast-icon {
  color: #10b981;
  font-weight: 700;
  font-size: 16px;
}

/* Dedicated Mobile App Showcase Section in About/Index */
.mobile-app-showcase-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);
  border-top: 1px solid var(--ti-border-subtle);
  border-bottom: 1px solid var(--ti-border-subtle);
  position: relative;
  overflow: hidden;
}

.showcase-glass-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 20px 45px -5px rgba(15, 23, 42, 0.08);
  padding: 40px;
}

@media (max-width: 768px) {
  .showcase-glass-card {
    padding: 24px 20px;
  }
}

.app-device-preview {
  position: relative;
  max-width: 290px;
  margin: 0 auto;
  border-radius: 32px;
  padding: 10px;
  background: #0f172a;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 30px rgba(56, 189, 248, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.device-screen-mockup {
  background: #020617;
  border-radius: 24px;
  overflow: hidden;
  padding: 18px 14px;
  color: #ffffff;
}

.mockup-notch {
  width: 90px;
  height: 12px;
  background: #0f172a;
  border-radius: 10px;
  margin: 0 auto 12px;
}

.mockup-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
  margin-bottom: 12px;
}

.mockup-logo-text {
  font-weight: 700;
  font-size: 13px;
  color: #f59e0b;
}

.mockup-item-chip {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 10px;
  margin-bottom: 8px;
  font-size: 11px;
}
`;

if (!cssContent.includes('TechnoInterview - Mobile Download & Scanner System Styles')) {
  cssContent += '\n' + mobileStyles;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Successfully appended mobile download and scanner styles to modern-opening.css');
} else {
  console.log('Mobile styles already present in modern-opening.css');
}
