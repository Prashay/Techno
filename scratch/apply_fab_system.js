const fs = require('fs');
const path = require('path');

// 1. Update css/modern-opening.css
const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const fabCss = `
/* ==========================================================================
   TechnoInterview - Single Master Floating Action Button (Expandable Speed-Dial)
   ========================================================================== */
.techno-floating-fab-container {
  position: fixed;
  bottom: 96px;
  left: 28px;
  z-index: 99997;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
}

@media (max-width: 850px) {
  .techno-floating-fab-container {
    bottom: 76px;
    left: 18px;
    gap: 10px;
  }
}

/* Master Trigger Button (Styled like JARVIS) */
.floating-mobile-hub-btn {
  position: relative !important;
  bottom: auto !important;
  left: auto !important;
  width: 54px;
  height: 54px;
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #0f172a 100%) !important;
  color: #34d399 !important;
  border: 1px solid rgba(16, 185, 129, 0.55) !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 10px 25px -3px rgba(6, 78, 59, 0.8), 0 0 22px rgba(16, 185, 129, 0.35) !important;
  cursor: pointer !important;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  outline: none !important;
  backdrop-filter: blur(10px) !important;
}

@media (max-width: 850px) {
  .floating-mobile-hub-btn {
    width: 48px;
    height: 48px;
  }
}

.floating-mobile-hub-btn:hover {
  transform: translateY(-4px) scale(1.08) !important;
  border-color: #34d399 !important;
  box-shadow: 0 16px 36px -3px rgba(6, 78, 59, 0.95), 0 0 35px rgba(16, 185, 129, 0.6) !important;
  color: #a7f3d0 !important;
}

.floating-mobile-hub-btn:active {
  transform: translateY(-1px) scale(0.96) !important;
}

.hub-icon-wrap {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hub-icon-main,
.hub-icon-close {
  position: absolute;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.hub-icon-close {
  opacity: 0;
  transform: rotate(-90deg) scale(0.4);
  color: #ef4444;
}

/* Master open state */
.techno-floating-fab-container.is-open .floating-mobile-hub-btn {
  background: radial-gradient(circle at 35% 35%, #450a0a 0%, #0f172a 100%) !important;
  border-color: rgba(239, 68, 68, 0.6) !important;
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4), 0 0 25px rgba(239, 68, 68, 0.3) !important;
}

.techno-floating-fab-container.is-open .hub-icon-main {
  opacity: 0;
  transform: rotate(90deg) scale(0.4);
}

.techno-floating-fab-container.is-open .hub-icon-close {
  opacity: 1;
  transform: rotate(0) scale(1);
}

.techno-floating-fab-container.is-open #hub-floating-tooltip {
  display: none !important;
}

/* Actions Menu */
.fab-actions-menu {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 2px;
}

.techno-floating-fab-container.is-open .fab-actions-menu {
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0);
}

/* Each Action Item */
.fab-action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateY(18px) scale(0.7);
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.techno-floating-fab-container.is-open .fab-action-item {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.techno-floating-fab-container.is-open .fab-action-item:nth-child(1) {
  transition-delay: 0.04s;
}
.techno-floating-fab-container.is-open .fab-action-item:nth-child(2) {
  transition-delay: 0.10s;
}
.techno-floating-fab-container.is-open .fab-action-item:nth-child(3) {
  transition-delay: 0.16s;
}

/* Action Button (Icon Type like JARVIS) */
.fab-action-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  backdrop-filter: blur(10px);
  transition: all 0.25s ease;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.45);
  position: relative;
}

.fab-action-btn:hover {
  transform: scale(1.12);
}

/* Action Specific Buttons */
.fab-btn-download {
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #022c22 100%);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 8px 22px rgba(6, 78, 59, 0.6), 0 0 15px rgba(16, 185, 129, 0.3);
}
.fab-btn-download:hover {
  color: #ffffff;
  border-color: #34d399;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.7);
}

.fab-btn-scanner {
  background: radial-gradient(circle at 35% 35%, #1e1b4b 0%, #0f172a 100%);
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.5);
  box-shadow: 0 8px 22px rgba(30, 27, 75, 0.6), 0 0 15px rgba(245, 158, 11, 0.3);
}
.fab-btn-scanner:hover {
  color: #ffffff;
  border-color: #f59e0b;
  box-shadow: 0 12px 28px rgba(245, 158, 11, 0.7);
}

.fab-btn-pwa {
  background: radial-gradient(circle at 35% 35%, #0369a1 0%, #082f49 100%);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 8px 22px rgba(3, 105, 161, 0.6), 0 0 15px rgba(56, 189, 248, 0.3);
}
.fab-btn-pwa:hover {
  color: #ffffff;
  border-color: #38bdf8;
  box-shadow: 0 12px 28px rgba(56, 189, 248, 0.7);
}

/* Action Labels */
.fab-action-label {
  background: rgba(15, 23, 42, 0.92);
  color: #f8fafc;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  pointer-events: none;
  letter-spacing: 0.2px;
}
`;

if (!cssContent.includes('Single Master Floating Action Button')) {
  cssContent += '\n' + fabCss;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Appended Speed-Dial FAB CSS to modern-opening.css');
}

// 2. Update js/mobile-download.js
const jsPath = path.join(__dirname, '..', 'js', 'mobile-download.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const newFabLauncherCode = `  // 7. SINGLE MASTER FLOATING ACTION BUTTON (Speed-Dial Launcher)
  // On click of the single master button, the other buttons appear!
  function addFloatingFabLauncher() {
    if (document.getElementById('techno-floating-fab-container')) return;

    var container = document.createElement('div');
    container.id = 'techno-floating-fab-container';
    container.className = 'techno-floating-fab-container';

    container.innerHTML = \`
      <!-- Child Action Buttons (appear on click) -->
      <div class="fab-actions-menu" id="fab-actions-menu">
        
        <!-- Action 1: Mobile APK Download -->
        <div class="fab-action-item">
          <button class="fab-action-btn fab-btn-download" id="fab-btn-download" aria-label="Download Mobile APK" title="Download Mobile APK">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
              <polyline points="9 10 12 13 15 10"></polyline>
              <line x1="12" y1="6" x2="12" y2="13"></line>
            </svg>
          </button>
          <span class="fab-action-label">Download APK</span>
        </div>

        <!-- Action 2: Scanner to Download -->
        <div class="fab-action-item">
          <button class="fab-action-btn fab-btn-scanner" id="fab-btn-scanner" aria-label="Scan to Download &amp; QR Scanner" title="Scan to Download &amp; QR Scanner">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              <path d="M14 14h3v3h-3z"></path>
              <path d="M20 14v3h-3"></path>
              <path d="M14 20h6"></path>
              <line x1="2" y1="12" x2="22" y2="12" stroke="#f59e0b" stroke-width="2" opacity="0.9"></line>
            </svg>
          </button>
          <span class="fab-action-label">Scan to Download</span>
        </div>

        <!-- Action 3: Install PWA -->
        <div class="fab-action-item">
          <button class="fab-action-btn fab-btn-pwa" id="fab-btn-pwa" aria-label="Add PWA / Install on Device" title="Add PWA / Install on Device">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83z"></path>
              <path d="M15.97 4.12c.61-.75 1.04-1.8 0.92-2.85-.92.04-2.02.62-2.67 1.38-.56.65-1.05 1.71-.92 2.73 1.03.08 2.06-.51 2.67-1.26z"></path>
            </svg>
          </button>
          <span class="fab-action-label">Add PWA</span>
        </div>

      </div>

      <!-- Single Master Button (Icon Type as JARVIS) -->
      <button id="floating-mobile-hub-btn" class="floating-jarvis-btn floating-mobile-hub-btn" aria-label="Open Mobile Download &amp; Scanner Hub" title="Mobile App &amp; Scanner (Click to Open)">
        <div class="jarvis-launcher-orb hub-launcher-orb">
          <span class="launcher-pulse" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
          <span class="launcher-core" style="background:#34d399;"></span>
        </div>
        <div class="hub-icon-wrap">
          <!-- Main Icon: Smartphone with scan grid -->
          <svg class="hub-icon-main" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
            <path d="M9 7h6M9 11h6"></path>
          </svg>
          <!-- Close Icon (when open) -->
          <svg class="hub-icon-close" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <span class="jarvis-pulse-ring hub-pulse-ring"></span>
        <span class="floating-tooltip" id="hub-floating-tooltip">App &amp; Scanner Hub</span>
      </button>
    \`;

    document.body.appendChild(container);

    var hubBtn = container.querySelector('#floating-mobile-hub-btn');
    var btnDownload = container.querySelector('#fab-btn-download');
    var btnScanner = container.querySelector('#fab-btn-scanner');
    var btnPwa = container.querySelector('#fab-btn-pwa');

    // Toggle expansion on click of master button
    hubBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.toggle('is-open');
    });

    // Action 1: Download APK
    btnDownload.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.remove('is-open');
      triggerApkDownload();
      openModal('download');
    });

    // Action 2: Scanner to Download
    btnScanner.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.remove('is-open');
      openModal('scan');
    });

    // Action 3: PWA
    btnPwa.addEventListener('click', function (e) {
      e.stopPropagation();
      container.classList.remove('is-open');
      triggerPwaInstall();
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
      }
    });
  }`;

// Remove separate floating buttons and replace with single FAB launcher
const oldButtonsFunc = /function addFloatingMobileDownloadButton\(\)[\s\S]*?addFloatingScannerDownloadButton\(\);\s*}/m;
if (oldButtonsFunc.test(jsContent)) {
  jsContent = jsContent.replace(oldButtonsFunc, newFabLauncherCode);
  jsContent = jsContent.replace(
    'addFloatingMobileDownloadButton();\n    addFloatingScannerDownloadButton();',
    'addFloatingFabLauncher();'
  );
  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log('Successfully updated js/mobile-download.js to single master button on click!');
} else {
  // Fallback search
  console.log('Replacing floating button init...');
  const initRegex = /addFloatingMobileDownloadButton\(\);\s*addFloatingScannerDownloadButton\(\);/;
  if (initRegex.test(jsContent)) {
    jsContent = jsContent.replace(initRegex, 'addFloatingFabLauncher();');
  }
  // Append newFabLauncherCode
  jsContent += '\n' + newFabLauncherCode;
  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log('Appended addFloatingFabLauncher to js/mobile-download.js');
}
