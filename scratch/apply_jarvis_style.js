const fs = require('fs');
const path = require('path');

// 1. Update css/modern-opening.css
const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const jarvisIconBtnStyles = `
/* ==========================================================================
   TechnoInterview - JARVIS-Style Icon Type Buttons for Mobile & Scanner
   ========================================================================== */

/* 1. Floating Mobile Download Button (Icon Type like JARVIS) */
.floating-mobile-download-btn {
  position: fixed;
  bottom: 96px;
  left: 28px;
  z-index: 99997;
  width: 54px;
  height: 54px;
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #022c22 100%);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -3px rgba(6, 78, 59, 0.8), 0 0 22px rgba(16, 185, 129, 0.35);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  backdrop-filter: blur(10px);
}

.floating-mobile-download-btn:hover {
  transform: translateY(-4px) scale(1.08);
  border-color: #34d399;
  box-shadow: 0 16px 36px -3px rgba(6, 78, 59, 0.95), 0 0 35px rgba(16, 185, 129, 0.6);
  color: #a7f3d0;
}

.floating-mobile-download-btn:active {
  transform: translateY(-1px) scale(0.96);
}

.floating-mobile-download-btn .mobile-pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(16, 185, 129, 0.55);
  animation: jarvisRingPulse 2.8s infinite ease-out;
  pointer-events: none;
}

.floating-mobile-download-btn .floating-tooltip {
  position: absolute;
  left: 66px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px) scale(0.9);
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
  border: 1px solid rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.floating-mobile-download-btn:hover .floating-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0) scale(1);
}

/* 2. Floating Scanner to Download Button (Icon Type like JARVIS) */
.floating-scanner-download-btn {
  position: fixed;
  bottom: 164px;
  left: 28px;
  z-index: 99996;
  width: 54px;
  height: 54px;
  background: radial-gradient(circle at 35% 35%, #1e1b4b 0%, #030712 100%);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.5);
  border-radius: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px -3px rgba(30, 27, 75, 0.8), 0 0 22px rgba(245, 158, 11, 0.35);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  backdrop-filter: blur(10px);
}

.floating-scanner-download-btn:hover {
  transform: translateY(-4px) scale(1.08);
  border-color: #f59e0b;
  box-shadow: 0 16px 36px -3px rgba(30, 27, 75, 0.95), 0 0 35px rgba(245, 158, 11, 0.6);
  color: #fde68a;
}

.floating-scanner-download-btn:active {
  transform: translateY(-1px) scale(0.96);
}

.floating-scanner-download-btn .scanner-pulse-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(245, 158, 11, 0.55);
  animation: jarvisRingPulse 2.8s infinite ease-out;
  pointer-events: none;
}

.floating-scanner-download-btn .floating-tooltip {
  position: absolute;
  left: 66px;
  top: 50%;
  transform: translateY(-50%) translateX(-6px) scale(0.9);
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
  border: 1px solid rgba(245, 158, 11, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.floating-scanner-download-btn:hover .floating-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(0) scale(1);
}

/* 3. In-Page & Hero JARVIS-Style Icon Buttons */
.hero-icon-btn-jarvis {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: radial-gradient(circle at 35% 35%, #1e293b 0%, #030712 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 9px 20px;
  color: #f8fafc;
  font-size: 13.5px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none !important;
  outline: none;
}

.hero-icon-btn-jarvis:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.hero-icon-btn-jarvis.mobile-btn {
  border-color: rgba(16, 185, 129, 0.45);
  color: #34d399;
}
.hero-icon-btn-jarvis.mobile-btn:hover {
  border-color: #10b981;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.35);
  color: #a7f3d0;
}

.hero-icon-btn-jarvis.scanner-btn {
  border-color: rgba(245, 158, 11, 0.45);
  color: #fbbf24;
}
.hero-icon-btn-jarvis.scanner-btn:hover {
  border-color: #f59e0b;
  box-shadow: 0 10px 25px rgba(245, 158, 11, 0.35);
  color: #fde68a;
}

/* Responsive adjustments for 850px screens */
@media (max-width: 850px) {
  .floating-mobile-download-btn {
    bottom: 74px;
    left: 18px;
    width: 48px;
    height: 48px;
  }
  .floating-mobile-download-btn svg {
    width: 19px;
    height: 19px;
  }
  .floating-scanner-download-btn {
    bottom: 130px;
    left: 18px;
    width: 48px;
    height: 48px;
  }
  .floating-scanner-download-btn svg {
    width: 19px;
    height: 19px;
  }
}
`;

if (!cssContent.includes('JARVIS-Style Icon Type Buttons for Mobile & Scanner')) {
  cssContent += '\n' + jarvisIconBtnStyles;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Appended jarvisIconBtnStyles to modern-opening.css');
}

// 2. Update js/mobile-download.js
const jsPath = path.join(__dirname, '..', 'js', 'mobile-download.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Replace addFloatingMobileAppButton implementation with two icon buttons as jarvis
const oldFloatingCode = `  // 7. FLOATING QUICK ACCESS LAUNCHER BUTTON
  function addFloatingMobileAppButton() {
    if (document.getElementById('floating-mobile-app-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-mobile-app-btn';
    btn.className = 'floating-mobile-app-btn';
    btn.setAttribute('aria-label', 'Mobile Download & Scan QR');
    btn.title = 'Download Mobile App & Scan QR Code';
    btn.innerHTML = \`
      <div class="mobile-launcher-icon-wrap">
        <i class="ti-mobile mobile-main-icon"></i>
        <i class="ti-view-grid mobile-sub-icon"></i>
      </div>
      <span class="mobile-launcher-pulse"></span>
      <span class="mobile-launcher-label">Mobile App</span>
      <span class="floating-tooltip">Get Mobile App &bull; Scan QR</span>
    \`;

    btn.addEventListener('click', function () {
      openModal('scan');
    });

    document.body.appendChild(btn);
  }`;

const newFloatingCode = `  // 7. FLOATING QUICK ACCESS LAUNCHER BUTTONS (Icon Type, Styled Exactly as JARVIS)
  function addFloatingMobileDownloadButton() {
    if (document.getElementById('floating-mobile-download-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-mobile-download-btn';
    btn.className = 'floating-jarvis-btn floating-mobile-download-btn';
    btn.setAttribute('aria-label', 'Download Mobile App');
    btn.title = 'Download Mobile App (APK)';
    btn.innerHTML = \`
      <div class="jarvis-launcher-orb mobile-launcher-orb">
        <span class="launcher-pulse" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
        <span class="launcher-core" style="background:#34d399;"></span>
      </div>
      <svg class="jarvis-launcher-icon mobile-launcher-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
        <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
        <polyline points="9 10 12 13 15 10"></polyline>
        <line x1="12" y1="6" x2="12" y2="13"></line>
      </svg>
      <span class="mobile-pulse-ring"></span>
      <span class="floating-tooltip">Download Mobile App</span>
    \`;

    btn.addEventListener('click', function () {
      triggerApkDownload();
      openModal('download');
    });

    document.body.appendChild(btn);
  }

  function addFloatingScannerDownloadButton() {
    if (document.getElementById('floating-scanner-download-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-scanner-download-btn';
    btn.className = 'floating-jarvis-btn floating-scanner-download-btn';
    btn.setAttribute('aria-label', 'Scan to Download & QR Scanner');
    btn.title = 'Scan to Download & QR Scanner';
    btn.innerHTML = \`
      <div class="jarvis-launcher-orb scanner-launcher-orb">
        <span class="launcher-pulse" style="background:#f59e0b; box-shadow:0 0 8px #f59e0b;"></span>
        <span class="launcher-core" style="background:#fbbf24;"></span>
      </div>
      <svg class="jarvis-launcher-icon scanner-launcher-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        <path d="M14 14h3v3h-3z"></path>
        <path d="M20 14v3h-3"></path>
        <path d="M14 20h6"></path>
        <line x1="2" y1="12" x2="22" y2="12" stroke="#f59e0b" stroke-width="2" opacity="0.85"></line>
      </svg>
      <span class="scanner-pulse-ring"></span>
      <span class="floating-tooltip">Scan to Download</span>
    \`;

    btn.addEventListener('click', function () {
      openModal('scan');
    });

    document.body.appendChild(btn);
  }`;

if (jsContent.includes(oldFloatingCode)) {
  jsContent = jsContent.replace(oldFloatingCode, newFloatingCode);
  jsContent = jsContent.replace(
    'addFloatingMobileAppButton();',
    'addFloatingMobileDownloadButton();\n    addFloatingScannerDownloadButton();'
  );
  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log('Updated js/mobile-download.js with separate JARVIS-style icon buttons.');
} else {
  console.log('Could not find oldFloatingCode block in js/mobile-download.js');
}
