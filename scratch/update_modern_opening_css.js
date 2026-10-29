const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Desktop Floating Island Navigation (Replace lines 254-268)
const oldNavBlock = `.navigation {
  background: rgba(255, 255, 255, 0.88) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.85) !important;
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.03) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.navigation.nav-bg,
.sticky .navigation {
  background: rgba(255, 255, 255, 0.96) !important;
  box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.04) !important;
  border-bottom-color: rgba(203, 213, 225, 0.85) !important;
}`;

const newNavBlock = `/* Base Navigation */
.navigation {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ==========================================================================
   DESKTOP / LAPTOP FLOATING ISLAND CAPSULE NAVIGATION (>= 992px)
   Distinctive, modern floating pill dock centered at top
   ========================================================================== */
@media (min-width: 992px) {
  .header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 1040 !important;
    background: transparent !important;
    pointer-events: none;
  }

  .navigation {
    background: transparent !important;
    border-bottom: none !important;
    box-shadow: none !important;
    padding: 14px 0 0 !important;
  }

  .navigation .container {
    max-width: 1320px !important;
    padding: 0 16px !important;
    pointer-events: auto;
  }

  .navigation .navbar {
    background: rgba(255, 255, 255, 0.90) !important;
    backdrop-filter: blur(28px) saturate(200%) !important;
    -webkit-backdrop-filter: blur(28px) saturate(200%) !important;
    border: 1px solid rgba(226, 232, 240, 0.92) !important;
    border-radius: 9999px !important;
    padding: 6px 18px !important;
    box-shadow: 0 16px 36px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.85) !important;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  .navigation .navbar:hover {
    border-color: rgba(99, 102, 241, 0.35) !important;
    box-shadow: 0 20px 48px -10px rgba(15, 23, 42, 0.12), 0 0 22px rgba(99, 102, 241, 0.08) !important;
  }

  .sticky .navigation .navbar,
  .navigation.is-scrolled .navbar {
    background: rgba(255, 255, 255, 0.97) !important;
    box-shadow: 0 20px 48px -10px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(255, 255, 255, 0.95) !important;
    border-color: rgba(203, 213, 225, 0.95) !important;
    transform: translateY(-2px);
  }

  .navbar-nav {
    display: flex !important;
    align-items: center !important;
    gap: 3px !important;
  }

  /* Desktop Mega Dropdowns Floating Card */
  .navbar .dropdown-menu {
    margin-top: 14px !important;
    border-radius: 20px !important;
    box-shadow: 0 24px 60px -12px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(226, 232, 240, 0.85) !important;
  }

  /* Hide mobile bottom dock on laptop/desktop */
  .mobile-bottom-dock {
    display: none !important;
  }
}`;

css = css.replace(oldNavBlock, newNavBlock);

// 2. Mobile Responsive Adjustments (Replace lines 656-711)
const oldMobileBlock = `/* Mobile Responsive Adjustments */
@media (max-width: 991px) {
  .navigation {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9) !important;
  }

  .navbar-collapse {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(24px) !important;
    -webkit-backdrop-filter: blur(24px) !important;
    border: 1px solid rgba(226, 232, 240, 0.95) !important;
    border-radius: 20px !important;
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 16px 14px !important;
    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12) !important;
  }

  .navbar-nav {
    gap: 3px !important;
  }

  .nav-item {
    width: 100% !important;
    margin: 2px 0 !important;
  }

  .nav-item .nav-link {
    width: 100% !important;
    justify-content: flex-start !important;
    padding: 11px 16px !important;
    border-radius: 12px !important;
    font-size: 14.5px !important;
  }

  .navbar .dropdown-menu {
    position: static !important;
    visibility: visible !important;
    opacity: 1 !important;
    transform: none !important;
    box-shadow: none !important;
    background: #f8fafc !important;
    border: 1px solid #e2e8f0 !important;
    margin-top: 4px !important;
    padding: 8px !important;
  }

  .nav-item .btn-scanner-link {
    margin-left: 0 !important;
    margin-top: 8px !important;
    justify-content: center !important;
    width: 100% !important;
  }
}`;

const newMobileBlock = `/* ==========================================================================
   MOBILE UNIQUE NAVIGATION & DOCK (< 992px)
   Native app-style experience with fixed bottom dock & slide-up drawer
   ========================================================================== */
@media (max-width: 991px) {
  body {
    padding-bottom: 74px !important;
  }

  .header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 1030 !important;
  }

  .navigation {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9) !important;
    padding: 6px 0 !important;
    box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04) !important;
  }

  .navbar {
    padding: 0 !important;
  }

  .site-logo, .navbar-brand img {
    height: 36px !important;
  }

  /* Hide default clunky bootstrap collapse on mobile in favor of our native slide-up sheet */
  .navbar-collapse {
    display: none !important;
  }

  /* Floating FAB Launcher repositioned comfortably above mobile bottom dock */
  .techno-floating-fab-container {
    bottom: 80px !important;
    right: 16px !important;
  }
}

/* 1. Mobile Bottom Thumb Dock */
.mobile-bottom-dock {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(11, 15, 25, 0.95);
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1045;
  box-shadow: 0 -8px 28px rgba(0, 0, 0, 0.4);
  padding: 0 6px env(safe-area-inset-bottom, 0px);
}

.dock-btn {
  background: transparent;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  flex: 1;
  height: 100%;
  color: #94a3b8;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: all 0.22s ease;
  user-select: none;
}

.dock-btn:hover,
.dock-btn:focus {
  text-decoration: none;
  color: #38bdf8;
}

.dock-btn.active {
  color: #38bdf8;
}

.dock-icon-wrap {
  position: relative;
  font-size: 19px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dock-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1;
}

.dock-btn.active .dock-label {
  color: #ffffff;
}

.dock-badge-pulse {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 7px;
  height: 7px;
  background: #f59e0b;
  border-radius: 50%;
  box-shadow: 0 0 8px #f59e0b;
  animation: pulseDotAnim 2s infinite ease-in-out;
}

/* Center Glowing Elevated AI Orb */
.dock-btn-ai-center {
  position: relative;
  overflow: visible;
}

.dock-ai-orb {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #064e3b 0%, #022c22 100%);
  border: 2px solid #34d399;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.5), 0 0 16px rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-14px);
  transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dock-btn-ai-center:hover .dock-ai-orb,
.dock-btn-ai-center:active .dock-ai-orb {
  transform: translateY(-18px) scale(1.1);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.7);
}

.dock-ai-sparkle {
  color: #34d399;
  font-size: 20px;
  animation: aiSparklePulse 2.5s infinite ease-in-out;
}

.dock-btn-ai-center .dock-label {
  margin-top: -10px;
  color: #34d399;
  font-weight: 800;
}

/* 2. Mobile Fullscreen Slide-Up Sheet / Drawer */
.mobile-drawer-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 15, 25, 0.65);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 1060;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.mobile-drawer-sheet-overlay.is-active {
  opacity: 1;
  pointer-events: auto;
}

.mobile-drawer-sheet {
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px 28px 0 0;
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.6);
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.mobile-drawer-sheet-overlay.is-active .mobile-drawer-sheet {
  transform: translateY(0);
}

.drawer-drag-pill {
  width: 44px;
  height: 4px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.25);
  margin: 12px auto 6px;
  cursor: pointer;
}

.drawer-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.drawer-brand-col {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-app-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}

.drawer-app-title {
  color: #f8fafc;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.5px;
  line-height: 1.1;
}

.drawer-app-tagline {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
  margin-top: 2px;
}

.drawer-dismiss-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f1f5f9;
  font-size: 20px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s ease;
}

.drawer-dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* Drawer Search Box */
.drawer-search-wrap {
  position: relative;
  padding: 14px 20px 10px;
}

.drawer-search-icon {
  position: absolute;
  left: 34px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  font-size: 14px;
}

.drawer-search-input {
  width: 100%;
  background: rgba(30, 41, 59, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 10px 38px 10px 42px;
  color: #f8fafc;
  font-size: 13.5px;
  outline: none;
  transition: all 0.2s ease;
}

.drawer-search-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
  background: rgba(30, 41, 59, 1);
}

.drawer-search-clear {
  position: absolute;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 18px;
  cursor: pointer;
}

/* Fast Action Chips Grid */
.drawer-fast-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 4px 20px 14px;
}

.drawer-fast-card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
  color: #f1f5f9;
  cursor: pointer;
  transition: all 0.2s ease;
}

.drawer-fast-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.25);
}

.drawer-fast-card i,
.drawer-fast-card span:first-child {
  font-size: 16px;
}

.drawer-fast-card.apk i { color: #38bdf8; }
.drawer-fast-card.scanner i { color: #f59e0b; }
.drawer-fast-card.jarvis span:first-child { color: #34d399; }
.drawer-fast-card.compiler i { color: #fbbf24; }

.drawer-fast-card .fast-text strong {
  display: block;
  font-size: 11px;
  color: #f8fafc;
  line-height: 1.2;
}

.drawer-fast-card .fast-text span {
  display: block;
  font-size: 9px;
  color: #94a3b8;
}

/* Drawer Tracks Body Scroll */
.drawer-tracks-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  -webkit-overflow-scrolling: touch;
}

.drawer-category-card {
  background: rgba(30, 41, 59, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 14px;
  transition: all 0.2s ease;
}

.drawer-category-card.flagship {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(15, 23, 42, 0.7));
  border: 1px solid rgba(245, 158, 11, 0.35);
  box-shadow: 0 4px 18px rgba(245, 158, 11, 0.08);
}

.cat-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cat-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-icon-badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
}

.cat-icon-badge.gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
.cat-icon-badge.cyan { background: rgba(6, 182, 212, 0.2); color: #22d3ee; }
.cat-icon-badge.blue { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
.cat-icon-badge.purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
.cat-icon-badge.amber { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.cat-icon-badge.green { background: rgba(16, 185, 129, 0.2); color: #34d399; }

.cat-pill-badge {
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 2px;
}

.cat-pill-badge.gold { color: #fbbf24; }
.cat-pill-badge.cyan { color: #38bdf8; }
.cat-pill-badge.blue { color: #60a5fa; }
.cat-pill-badge.purple { color: #c084fc; }
.cat-pill-badge.amber { color: #f59e0b; }
.cat-pill-badge.green { color: #34d399; }

.cat-card-title {
  color: #f1f5f9;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
}

.cat-open-link {
  font-size: 11px;
  font-weight: 700;
  color: #38bdf8;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.cat-pills-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.drawer-pill-link {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.drawer-pill-link:hover,
.drawer-pill-link:focus {
  background: rgba(56, 189, 248, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
  color: #38bdf8;
  text-decoration: none;
}

.drawer-pill-link.hot {
  border-color: rgba(239, 68, 68, 0.35);
  color: #fca5a5;
}

.drawer-pill-link.active-gold {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(245, 158, 11, 0.4);
  color: #fde047;
}

.badge-mini {
  background: #ef4444;
  color: #ffffff;
  font-size: 9px;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 4px;
  margin-left: 5px;
}`;

css = css.replace(oldMobileBlock, newMobileBlock);

// 3. Update QR Scanner styling for center badge and chip
const qrOverlayCss = `
/* QR Display Center Logo Badge & Modern Chip */
.qr-code-graphic {
  position: relative !important;
  display: inline-block !important;
}

.qr-center-logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: #ffffff;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.25);
  border: 2px solid #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
}

.qr-center-logo-overlay img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: contain;
}

.qr-brand-chip {
  margin-top: 12px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(15, 23, 42, 0.06) !important;
  border: 1px solid rgba(2, 132, 199, 0.25) !important;
  padding: 5px 12px !important;
  border-radius: 20px !important;
  font-size: 11.5px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

.qr-chip-logo {
  width: 18px !important;
  height: 18px !important;
  border-radius: 5px !important;
  object-fit: contain !important;
}
`;

css += '\n' + qrOverlayCss;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated css/modern-opening.css with desktop floating island & mobile dock/drawer styles!');
