const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'js', 'mobile-download.js');
let content = fs.readFileSync(jsPath, 'utf8');

// Cut off everything after the first "})();"
const iifeCloseIdx = content.indexOf('})();');
if (iifeCloseIdx !== -1) {
  content = content.substring(0, iifeCloseIdx + 5);
}

// Replace addFloatingMobileDownloadButton & addFloatingScannerDownloadButton with addFloatingFabLauncher
const oldButtonsRegex = /\/\/ 7\. FLOATING QUICK ACCESS LAUNCHER BUTTONS[\s\S]*?document\.body\.appendChild\(btn\);\s*\}/;

const fabFunc = `// 7. SINGLE MASTER FLOATING ACTION BUTTON (Expandable Speed-Dial Launcher)
  // On click of the single button, other buttons appear!
  function addFloatingFabLauncher() {
    if (document.getElementById('techno-floating-fab-container')) return;

    var container = document.createElement('div');
    container.id = 'techno-floating-fab-container';
    container.className = 'techno-floating-fab-container';

    container.innerHTML = \`
      <!-- Child Action Buttons (appear smoothly on click) -->
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
      <button id="floating-mobile-hub-btn" class="floating-jarvis-btn floating-mobile-hub-btn" aria-label="Open Mobile Download &amp; Scanner Hub" title="Mobile App &amp; Scanner (Click to Expand)">
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
          <!-- Close Icon (shown when open) -->
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

content = content.replace(oldButtonsRegex, fabFunc);
fs.writeFileSync(jsPath, content, 'utf8');
console.log('Cleaned up mobile-download.js successfully.');
