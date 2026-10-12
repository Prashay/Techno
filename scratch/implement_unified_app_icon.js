const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');

// 1. UPDATE js/jarvis-ai.js
const jarvisJsPath = path.join(repoRoot, 'js', 'jarvis-ai.js');
let jarvisJs = fs.readFileSync(jarvisJsPath, 'utf8');
const oldJarvisTrigger = `  function addFloatingJarvisTrigger() {
    if (document.getElementById('floating-jarvis-btn')) return;`;
const newJarvisTrigger = `  function addFloatingJarvisTrigger() {
    // Unified in Techno App Hub: retire standalone button
    var existing = document.getElementById('floating-jarvis-btn');
    if (existing) existing.remove();
    return;
    if (document.getElementById('floating-jarvis-btn')) return;`;

if (jarvisJs.includes(oldJarvisTrigger)) {
  jarvisJs = jarvisJs.replace(oldJarvisTrigger, newJarvisTrigger);
  fs.writeFileSync(jarvisJsPath, jarvisJs, 'utf8');
  console.log('Disabled standalone trigger in js/jarvis-ai.js');
}

// 2. UPDATE js/online-compiler.js
const compilerJsPath = path.join(repoRoot, 'js', 'online-compiler.js');
let compilerJs = fs.readFileSync(compilerJsPath, 'utf8');
const oldCompilerTrigger = `  function addFloatingIdeTrigger() {
    if (document.getElementById('floating-compiler-btn')) return;`;
const newCompilerTrigger = `  function addFloatingIdeTrigger() {
    // Unified in Techno App Hub: retire standalone button
    var existing = document.getElementById('floating-compiler-btn');
    if (existing) existing.remove();
    return;
    if (document.getElementById('floating-compiler-btn')) return;`;

if (compilerJs.includes(oldCompilerTrigger)) {
  compilerJs = compilerJs.replace(oldCompilerTrigger, newCompilerTrigger);
  fs.writeFileSync(compilerJsPath, compilerJs, 'utf8');
  console.log('Disabled standalone trigger in js/online-compiler.js');
}

// 3. UPDATE js/suggest-questions.js
const suggestJsPath = path.join(repoRoot, 'js', 'suggest-questions.js');
let suggestJs = fs.readFileSync(suggestJsPath, 'utf8');
const oldSuggestTrigger = `  function addFloatingSuggestTrigger() {
    if (document.getElementById('floating-suggest-btn')) return;`;
const newSuggestTrigger = `  function addFloatingSuggestTrigger() {
    // Unified in Techno App Hub: retire standalone button
    var existing = document.getElementById('floating-suggest-btn');
    if (existing) existing.remove();
    return;
    if (document.getElementById('floating-suggest-btn')) return;`;

if (suggestJs.includes(oldSuggestTrigger)) {
  suggestJs = suggestJs.replace(oldSuggestTrigger, newSuggestTrigger);
  fs.writeFileSync(suggestJsPath, suggestJs, 'utf8');
  console.log('Disabled standalone trigger in js/suggest-questions.js');
}

// 4. UPDATE js/mobile-download.js with UNIFIED APP HUB (Jarvis + Compiler + Suggest + Mobile)
const mobileJsPath = path.join(repoRoot, 'js', 'mobile-download.js');
let mobileJs = fs.readFileSync(mobileJsPath, 'utf8');

// Replace addFloatingFabLauncher in js/mobile-download.js
const fabLauncherStart = '  // 7. FLOATING EXPANDABLE SPEED-DIAL HUB LAUNCHER (ICON TYPE AS JARVIS)';
const fabLauncherEnd = '  // 8. BIND ON-PAGE BUTTONS';

const newFabLauncherCode = `  // 7. UNIFIED TECHNO MULTI-TOOL APP HUB (Jarvis, Compiler, Questions, APK, Scanner)
  function addFloatingFabLauncher() {
    if (document.getElementById('techno-floating-fab-container')) return;

    // Clean up any old standalone buttons from the DOM
    ['floating-jarvis-btn', 'floating-compiler-btn', 'floating-suggest-btn', 'floating-mobile-download-btn', 'floating-scanner-download-btn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });

    var container = document.createElement('div');
    container.id = 'techno-floating-fab-container';
    container.className = 'techno-floating-fab-container';

    container.innerHTML = \`
      <!-- Child Action Buttons (appear on click) -->
      <div class="fab-actions-menu" id="fab-actions-menu" role="menu" aria-label="Techno Apps and Tools Menu">

        <!-- Action 1: JARVIS AI Copilot -->
        <div class="fab-action-item" data-action="jarvis">
          <button class="fab-action-btn fab-btn-jarvis" id="fab-btn-jarvis" aria-label="Open JARVIS AI Helper (Ctrl+J)" title="Open JARVIS AI Helper (Ctrl+J)">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <rect x="4" y="8" width="16" height="12" rx="4"/>
              <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
              <path d="M9 17h6"/>
            </svg>
          </button>
          <span class="fab-action-label">JARVIS AI Copilot <span class="fab-badge-kbd">Ctrl+J</span></span>
        </div>

        <!-- Action 2: Online Compiler IDE -->
        <div class="fab-action-item" data-action="compiler">
          <button class="fab-action-btn fab-btn-compiler" id="fab-btn-compiler" aria-label="Open Online Compiler" title="Open Interactive Online Compiler">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fill-opacity="0.3"/>
            </svg>
          </button>
          <span class="fab-action-label">Online Compiler</span>
        </div>

        <!-- Action 3: Suggest Question & Community Tasks -->
        <div class="fab-action-item" data-action="suggest">
          <button class="fab-action-btn fab-btn-suggest" id="fab-btn-suggest" aria-label="Suggest Questions &amp; Feedback" title="Suggest Questions &amp; Feedback">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a6 6 0 0 1 6 6c0 3-2 5-2 7H8c0-2-2-4-2-7a6 6 0 0 1 6-6z"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </button>
          <span class="fab-action-label">Suggest Question</span>
        </div>

        <!-- Action 4: Mobile APK Download -->
        <div class="fab-action-item" data-action="download">
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

        <!-- Action 5: Scanner to Download -->
        <div class="fab-action-item" data-action="scanner">
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

      </div>

      <!-- Single Master App Hub Button -->
      <button id="floating-mobile-hub-btn" class="floating-jarvis-btn floating-mobile-hub-btn" aria-haspopup="true" aria-expanded="false" aria-label="Open Techno App Hub (Jarvis, Compiler, Questions, APK)" title="Techno App Hub (Click to Open)">
        <div class="jarvis-launcher-orb hub-launcher-orb">
          <span class="launcher-pulse" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
          <span class="launcher-core" style="background:#34d399;"></span>
        </div>
        <div class="hub-icon-wrap">
          <!-- Main Icon: High-tech 4-Grid App Launcher -->
          <svg class="hub-icon-main" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2"></rect>
            <rect x="14" y="3" width="7" height="7" rx="2"></rect>
            <rect x="14" y="14" width="7" height="7" rx="2"></rect>
            <rect x="3" y="14" width="7" height="7" rx="2"></rect>
          </svg>
          <!-- Close Icon (when open) -->
          <svg class="hub-icon-close" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <span class="jarvis-pulse-ring hub-pulse-ring"></span>
        <span class="floating-tooltip" id="hub-floating-tooltip">Techno App Hub</span>
      </button>
    \`;

    document.body.appendChild(container);

    var hubBtn = container.querySelector('#floating-mobile-hub-btn');
    var btnJarvis = container.querySelector('#fab-btn-jarvis');
    var btnCompiler = container.querySelector('#fab-btn-compiler');
    var btnSuggest = container.querySelector('#fab-btn-suggest');
    var btnDownload = container.querySelector('#fab-btn-download');
    var btnScanner = container.querySelector('#fab-btn-scanner');

    // Toggle expansion on click of single master button
    hubBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = container.classList.toggle('is-open');
      hubBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Action 1: JARVIS AI Copilot
    if (btnJarvis) {
      btnJarvis.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.JarvisAI && typeof window.JarvisAI.open === 'function') {
          window.JarvisAI.open('qa', null);
        } else {
          var modal = document.getElementById('jarvis-qa-modal');
          if (modal) modal.style.display = 'flex';
        }
      });
    }

    // Action 2: Online Compiler
    if (btnCompiler) {
      btnCompiler.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.TechnoIDE && typeof window.TechnoIDE.open === 'function') {
          window.TechnoIDE.open('java21', null);
        }
      });
    }

    // Action 3: Suggest Question & Tasks
    if (btnSuggest) {
      btnSuggest.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.TechnoFeedback && typeof window.TechnoFeedback.open === 'function') {
          window.TechnoFeedback.open('list');
        }
      });
    }

    // Action 4: Download APK
    if (btnDownload) {
      btnDownload.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        triggerApkDownload();
        openModal('download');
      });
    }

    // Action 5: Scanner to Download
    if (btnScanner) {
      btnScanner.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        openModal('scan');
      });
    }

    // Make clicking anywhere on the action item (label or button) trigger the button
    container.querySelectorAll('.fab-action-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        var btn = item.querySelector('.fab-action-btn');
        if (btn && e.target !== btn && !btn.contains(e.target)) {
          btn.click();
        }
      });
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

`;

const launcherRegex = new RegExp(
  '\\s*\\/\\/ 7\\.[\\s\\S]*?\\n\\s*\\/\\/ 8\\. BIND ON-PAGE BUTTONS',
  'm'
);

if (launcherRegex.test(mobileJs)) {
  mobileJs = mobileJs.replace(launcherRegex, '\n' + newFabLauncherCode + '  // 8. BIND ON-PAGE BUTTONS');
  fs.writeFileSync(mobileJsPath, mobileJs, 'utf8');
  console.log('Successfully updated addFloatingFabLauncher in js/mobile-download.js');
} else {
  console.log('Could not find launcherRegex in js/mobile-download.js');
}

// 5. UPDATE css/modern-opening.css for UNIFIED APP HUB
const cssPath = path.join(repoRoot, 'css', 'modern-opening.css');
let css = fs.readFileSync(cssPath, 'utf8');

const marker = '/* ==========================================================================\n   TechnoInterview - Single Master Floating Action Button (Expandable Speed-Dial)\n   ========================================================================== */';

const unifiedCss = `/* ==========================================================================
   TechnoInterview - Unified Master Floating App Hub (Jarvis, Compiler, Questions, APK)
   ========================================================================== */
/* Hide old standalone floating buttons so ONLY the unified master app icon is visible */
#floating-jarvis-btn,
#floating-compiler-btn,
#floating-suggest-btn,
.floating-jarvis-btn:not(.floating-mobile-hub-btn),
.floating-compiler-btn,
.floating-suggest-btn,
.floating-mobile-app-btn,
.floating-mobile-download-btn,
.floating-scanner-download-btn {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Unified Floating App Container (Anchored at Bottom-Left) */
.techno-floating-fab-container {
  position: fixed;
  bottom: 28px;
  left: 28px;
  z-index: 99999;
  display: block;
}

@media (max-width: 850px) {
  .techno-floating-fab-container {
    bottom: 20px;
    left: 18px;
  }
}

/* Master Trigger Button: Iconic Glassmorphic App Launcher */
.floating-mobile-hub-btn {
  position: relative !important;
  width: 56px;
  height: 56px;
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #0f172a 100%) !important;
  color: #34d399 !important;
  border: 1.5px solid rgba(16, 185, 129, 0.55) !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 10px 25px -3px rgba(6, 78, 59, 0.8), 0 0 25px rgba(16, 185, 129, 0.35) !important;
  cursor: pointer !important;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  outline: none !important;
  backdrop-filter: blur(12px) !important;
  padding: 0 !important;
}

@media (max-width: 850px) {
  .floating-mobile-hub-btn {
    width: 50px;
    height: 50px;
  }
}

.floating-mobile-hub-btn:hover {
  transform: translateY(-4px) scale(1.08) !important;
  border-color: #34d399 !important;
  box-shadow: 0 16px 36px -3px rgba(6, 78, 59, 0.95), 0 0 38px rgba(16, 185, 129, 0.6) !important;
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

/* Actions Menu: Pops out ABOVE master button */
.fab-actions-menu {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 11px;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(16px) scale(0.95);
  transform-origin: bottom left;
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s ease;
  margin-bottom: 0;
}

.techno-floating-fab-container.is-open .fab-actions-menu {
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

/* Each Action Item */
.fab-action-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(18px) scale(0.7);
  transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.techno-floating-fab-container.is-open .fab-action-item {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.techno-floating-fab-container.is-open .fab-action-item:nth-child(1) { transition-delay: 0.03s; }
.techno-floating-fab-container.is-open .fab-action-item:nth-child(2) { transition-delay: 0.07s; }
.techno-floating-fab-container.is-open .fab-action-item:nth-child(3) { transition-delay: 0.11s; }
.techno-floating-fab-container.is-open .fab-action-item:nth-child(4) { transition-delay: 0.15s; }
.techno-floating-fab-container.is-open .fab-action-item:nth-child(5) { transition-delay: 0.19s; }

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

/* Action 1: JARVIS AI */
.fab-btn-jarvis {
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #022c22 100%);
  color: #34d399;
  border-color: rgba(16, 185, 129, 0.55);
  box-shadow: 0 8px 22px rgba(6, 78, 59, 0.6), 0 0 16px rgba(16, 185, 129, 0.35);
}
.fab-btn-jarvis:hover {
  color: #ffffff;
  border-color: #34d399;
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.7);
}

/* Action 2: Online Compiler */
.fab-btn-compiler {
  background: radial-gradient(circle at 35% 35%, #78350f 0%, #1e1b4b 100%);
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.55);
  box-shadow: 0 8px 22px rgba(120, 53, 15, 0.6), 0 0 16px rgba(245, 158, 11, 0.35);
}
.fab-btn-compiler:hover {
  color: #ffffff;
  border-color: #f59e0b;
  box-shadow: 0 12px 28px rgba(245, 158, 11, 0.7);
}

/* Action 3: Suggest Question */
.fab-btn-suggest {
  background: radial-gradient(circle at 35% 35%, #581c87 0%, #0f172a 100%);
  color: #c084fc;
  border-color: rgba(168, 85, 247, 0.55);
  box-shadow: 0 8px 22px rgba(88, 28, 135, 0.6), 0 0 16px rgba(168, 85, 247, 0.35);
}
.fab-btn-suggest:hover {
  color: #ffffff;
  border-color: #c084fc;
  box-shadow: 0 12px 28px rgba(168, 85, 247, 0.7);
}

/* Action 4: Download APK */
.fab-btn-download {
  background: radial-gradient(circle at 35% 35%, #0369a1 0%, #082f49 100%);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.55);
  box-shadow: 0 8px 22px rgba(3, 105, 161, 0.6), 0 0 16px rgba(56, 189, 248, 0.35);
}
.fab-btn-download:hover {
  color: #ffffff;
  border-color: #38bdf8;
  box-shadow: 0 12px 28px rgba(56, 189, 248, 0.7);
}

/* Action 5: Scanner */
.fab-btn-scanner {
  background: radial-gradient(circle at 35% 35%, #1e1b4b 0%, #030712 100%);
  color: #fb923c;
  border-color: rgba(251, 146, 60, 0.55);
  box-shadow: 0 8px 22px rgba(30, 27, 75, 0.6), 0 0 16px rgba(251, 146, 60, 0.35);
}
.fab-btn-scanner:hover {
  color: #ffffff;
  border-color: #fb923c;
  box-shadow: 0 12px 28px rgba(251, 146, 60, 0.7);
}

/* Action Labels */
.fab-action-label {
  background: rgba(15, 23, 42, 0.94);
  color: #f8fafc;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(10px);
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.fab-badge-kbd {
  background: rgba(255, 255, 255, 0.12);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
  margin-left: 6px;
  color: #34d399;
}

.fab-action-item:hover .fab-action-label {
  background: rgba(30, 41, 59, 0.98);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(4px);
}

/* Inline Hero Speed-Dial: Single Button on click other buttons appear */
.hero-speed-dial-wrap {
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 10px;
}

.hero-speed-dial-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero-speed-dial-wrap .hero-chevron {
  font-size: 11px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}

.hero-speed-dial-wrap.is-open .hero-chevron {
  transform: rotate(180deg);
}

.hero-speed-dial-children {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transform: translateX(-12px) scale(0.92);
  transform-origin: left center;
  transition: max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.hero-speed-dial-wrap.is-open .hero-speed-dial-children {
  max-width: 520px;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0) scale(1);
}

@media (max-width: 768px) {
  .hero-speed-dial-wrap {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .hero-speed-dial-children {
    flex-wrap: wrap;
    max-height: 0;
    max-width: 100% !important;
    transform: translateY(-8px) scale(0.95);
    transition: max-height 0.35s ease, opacity 0.3s ease, transform 0.3s ease;
  }
  .hero-speed-dial-wrap.is-open .hero-speed-dial-children {
    max-height: 200px;
    transform: translateY(0) scale(1);
  }
}
`;

if (css.includes(marker)) {
  const parts = css.split(marker);
  css = parts[0] + unifiedCss;
} else {
  css += '\n\n' + unifiedCss;
}
fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/modern-opening.css with Unified App Hub styles');

// 6. UPDATE about.html HERO SECTION
const aboutHtmlPath = path.join(repoRoot, 'about.html');
let aboutHtml = fs.readFileSync(aboutHtmlPath, 'utf8');

const oldAboutHeroButtons = `          <button class="hero-icon-btn-jarvis mobile-btn btn-mobile-download" data-action="mobile-download" title="Download Mobile App (APK)">
            <div class="jarvis-launcher-orb">
              <span class="launcher-pulse" style="background:#10b981;"></span>
              <span class="launcher-core" style="background:#34d399;"></span>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
              <polyline points="9 10 12 13 15 10"></polyline>
              <line x1="12" y1="6" x2="12" y2="13"></line>
            </svg>
            <span>Mobile App</span>
          </button>
          <button class="hero-icon-btn-jarvis scanner-btn btn-scanner-download" data-action="scan-download" title="Scan to Download & QR Scanner">
            <div class="jarvis-launcher-orb">
              <span class="launcher-pulse" style="background:#f59e0b;"></span>
              <span class="launcher-core" style="background:#fbbf24;"></span>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              <path d="M14 14h3v3h-3z"></path>
              <path d="M20 14v3h-3"></path>
              <path d="M14 20h6"></path>
              <line x1="2" y1="12" x2="22" y2="12" stroke="#f59e0b" stroke-width="2" opacity="0.85"></line>
            </svg>
            <span>Scan to Download</span>
          </button>`;

const newAboutHeroButtons = `          <!-- Hero Speed-Dial: Single Button on click other buttons appear -->
          <div class="hero-speed-dial-wrap">
            <button type="button" class="hero-icon-btn-jarvis mobile-btn hero-speed-dial-trigger" aria-expanded="false" title="Get Mobile App & QR Scanner (Click to expand)">
              <div class="jarvis-launcher-orb">
                <span class="launcher-pulse" style="background:#10b981;"></span>
                <span class="launcher-core" style="background:#34d399;"></span>
              </div>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
                <path d="M9 7h6M9 11h6"></path>
              </svg>
              <span>Get App &amp; Scanner</span>
              <i class="ti-angle-down hero-chevron ml-1"></i>
            </button>
            <div class="hero-speed-dial-children">
              <button type="button" class="hero-icon-btn-jarvis mobile-btn btn-mobile-download" data-action="mobile-download" title="Download Mobile App (APK)">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download APK</span>
              </button>
              <button type="button" class="hero-icon-btn-jarvis scanner-btn btn-scanner-download" data-action="scan-download" title="Scan to Download & QR Scanner">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  <path d="M14 14h3v3h-3z"></path>
                  <path d="M20 14v3h-3"></path>
                  <path d="M14 20h6"></path>
                </svg>
                <span>Scan to Download</span>
              </button>
            </div>
          </div>`;

if (aboutHtml.includes(oldAboutHeroButtons)) {
  aboutHtml = aboutHtml.replace(oldAboutHeroButtons, newAboutHeroButtons);
  fs.writeFileSync(aboutHtmlPath, aboutHtml, 'utf8');
  console.log('Updated hero buttons in about.html to speed dial');
}

// 7. UPDATE index.html HERO SECTIONS (Slide 1 and Slide 2)
const indexHtmlPath = path.join(repoRoot, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const oldIndexSlideButtons1 = `              <button class="hero-icon-btn-jarvis mobile-btn btn-mobile-download" data-action="mobile-download" data-animation-out="fadeOutRight" data-delay-out="5" data-duration-in=".3" data-animation-in="fadeInLeft" data-delay-in=".75" title="Download Mobile App (APK)">
                <div class="jarvis-launcher-orb">
                  <span class="launcher-pulse" style="background:#10b981;"></span>
                  <span class="launcher-core" style="background:#34d399;"></span>
                </div>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
                  <polyline points="9 10 12 13 15 10"></polyline>
                  <line x1="12" y1="6" x2="12" y2="13"></line>
                </svg>
                <span>Mobile App</span>
              </button>
              <button class="hero-icon-btn-jarvis scanner-btn btn-scanner-download" data-action="scan-download" data-animation-out="fadeOutRight" data-delay-out="5" data-duration-in=".3" data-animation-in="fadeInLeft" data-delay-in=".8" title="Scan to Download & QR Scanner">
                <div class="jarvis-launcher-orb">
                  <span class="launcher-pulse" style="background:#f59e0b;"></span>
                  <span class="launcher-core" style="background:#fbbf24;"></span>
                </div>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                  <path d="M14 14h3v3h-3z"></path>
                  <path d="M20 14v3h-3"></path>
                  <path d="M14 20h6"></path>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="#f59e0b" stroke-width="2" opacity="0.85"></line>
                </svg>
                <span>Scan to Download</span>
              </button>`;

const newIndexSlideButtons1 = `              <!-- Hero Speed-Dial: Single Button on click other buttons appear -->
              <div class="hero-speed-dial-wrap" data-animation-out="fadeOutRight" data-delay-out="5" data-duration-in=".3" data-animation-in="fadeInLeft" data-delay-in=".75">
                <button type="button" class="hero-icon-btn-jarvis mobile-btn hero-speed-dial-trigger" aria-expanded="false" title="Get Mobile App & QR Scanner (Click to expand)">
                  <div class="jarvis-launcher-orb">
                    <span class="launcher-pulse" style="background:#10b981;"></span>
                    <span class="launcher-core" style="background:#34d399;"></span>
                  </div>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
                    <path d="M9 7h6M9 11h6"></path>
                  </svg>
                  <span>Get App &amp; Scanner</span>
                  <i class="ti-angle-down hero-chevron ml-1"></i>
                </button>
                <div class="hero-speed-dial-children">
                  <button type="button" class="hero-icon-btn-jarvis mobile-btn btn-mobile-download" data-action="mobile-download" title="Download Mobile App (APK)">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download APK</span>
                  </button>
                  <button type="button" class="hero-icon-btn-jarvis scanner-btn btn-scanner-download" data-action="scan-download" title="Scan to Download & QR Scanner">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                      <path d="M14 14h3v3h-3z"></path>
                      <path d="M20 14v3h-3"></path>
                      <path d="M14 20h6"></path>
                    </svg>
                    <span>Scan to Download</span>
                  </button>
                </div>
              </div>`;

if (indexHtml.includes(oldIndexSlideButtons1)) {
  indexHtml = indexHtml.split(oldIndexSlideButtons1).join(newIndexSlideButtons1);
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  console.log('Updated hero buttons in index.html to speed dial');
}
