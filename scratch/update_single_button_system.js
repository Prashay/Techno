const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..');

// 1. Update css/modern-opening.css
const cssPath = path.join(repoRoot, 'css', 'modern-opening.css');
let css = fs.readFileSync(cssPath, 'utf8');

const targetCssMarker = '/* ==========================================================================\n   TechnoInterview - Single Master Floating Action Button (Expandable Speed-Dial)\n   ========================================================================== */';
const newCssBlock = `/* ==========================================================================
   TechnoInterview - Single Master Floating Action Button (Expandable Speed-Dial)
   ========================================================================== */
.techno-floating-fab-container {
  position: fixed;
  bottom: 96px;
  left: 28px;
  z-index: 99997;
  display: block;
}

@media (max-width: 850px) {
  .techno-floating-fab-container {
    bottom: 76px;
    left: 18px;
  }
}

/* Master Trigger Button (Icon Type Styled like JARVIS) */
.floating-mobile-hub-btn {
  position: relative !important;
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
  padding: 0 !important;
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

/* Actions Menu: Pops out ABOVE master button */
.fab-actions-menu {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
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
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: all 0.2s ease;
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

if (css.includes(targetCssMarker)) {
  const parts = css.split(targetCssMarker);
  css = parts[0] + newCssBlock;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully updated css/modern-opening.css');
} else {
  css += '\n\n' + newCssBlock;
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Appended to css/modern-opening.css');
}

// 2. Update js/mobile-download.js
const jsPath = path.join(repoRoot, 'js', 'mobile-download.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

// Ensure bindPageButtons handles .hero-speed-dial-wrap
const oldBindStr = `  // 8. BIND ON-PAGE BUTTONS
  function bindPageButtons() {`;

const newBindStr = `  // 8. BIND ON-PAGE BUTTONS
  function bindPageButtons() {
    // Bind Hero Speed-Dial Wrappers (Single button on click other buttons appear)
    var heroDials = document.querySelectorAll('.hero-speed-dial-wrap');
    heroDials.forEach(function (dial) {
      var trigger = dial.querySelector('.hero-speed-dial-trigger');
      if (trigger && !trigger._fabBound) {
        trigger._fabBound = true;
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = dial.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    });

    // Close any hero dials when clicking outside
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.hero-speed-dial-wrap.is-open').forEach(function (dial) {
        if (!dial.contains(e.target)) {
          dial.classList.remove('is-open');
          var trigger = dial.querySelector('.hero-speed-dial-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });`;

if (jsCode.includes(oldBindStr) && !jsCode.includes('hero-speed-dial-wrap')) {
  jsCode = jsCode.replace(oldBindStr, newBindStr);
}

// Also make action items in floating FAB clickable on either icon or label
const oldHubBtnStr = `    var hubBtn = container.querySelector('#floating-mobile-hub-btn');
    var btnDownload = container.querySelector('#fab-btn-download');
    var btnScanner = container.querySelector('#fab-btn-scanner');
    var btnPwa = container.querySelector('#fab-btn-pwa');`;

const newHubBtnStr = `    var hubBtn = container.querySelector('#floating-mobile-hub-btn');
    var btnDownload = container.querySelector('#fab-btn-download');
    var btnScanner = container.querySelector('#fab-btn-scanner');
    var btnPwa = container.querySelector('#fab-btn-pwa');

    // Make label clicks trigger button clicks
    container.querySelectorAll('.fab-action-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        var btn = item.querySelector('.fab-action-btn');
        if (btn && e.target !== btn && !btn.contains(e.target)) {
          btn.click();
        }
      });
    });`;

if (jsCode.includes(oldHubBtnStr) && !jsCode.includes('Make label clicks trigger button clicks')) {
  jsCode = jsCode.replace(oldHubBtnStr, newHubBtnStr);
}

fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('Successfully updated js/mobile-download.js');
