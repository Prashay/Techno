const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let content = fs.readFileSync(cssPath, 'utf8');

const targetSection = `/* ==========================================================================
   Footer & Newsletter (Modern Light Theme)
   ========================================================================== */
.newsletter-modern {
  margin-bottom: -90px;
  position: relative;
  z-index: 10;
}

.newsletter-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 38px 44px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.newsletter-card h3 {
  color: #0f172a !important;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
}

.newsletter-input-group {
  display: flex;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  padding: 6px;
  transition: border-color 0.2s ease;
}

.newsletter-input-group:focus-within {
  border-color: var(--ti-amber);
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.2);
}

.newsletter-input-group input {
  background: transparent !important;
  border: none !important;
  color: #0f172a !important;
  padding: 10px 16px;
  font-size: 14px;
  flex-grow: 1;
  outline: none !important;
}

.newsletter-input-group input::placeholder {
  color: #94a3b8;
}

.newsletter-input-group button {
  background: var(--ti-amber) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 10px 26px !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: all 0.2s ease;
}

.newsletter-input-group button:hover {
  background: var(--ti-amber-dark) !important;
  transform: translateY(-1px);
}

.footer-modern, .bg-footer {
  background-color: #f1f5f9 !important;
  padding-top: 170px !important;
  border-top: 1px solid #e2e8f0 !important;
}`;

const replacementCss = `/* ==========================================================================
   Compact Modern Newsletter (Small Size & Elegant Floating Look)
   ========================================================================== */
.newsletter-compact-section,
.newsletter-modern,
.newsletter {
  background: transparent !important;
  margin-bottom: -45px !important;
  position: relative !important;
  z-index: 10 !important;
}

.newsletter-compact-card,
.newsletter-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 16px !important;
  padding: 16px 28px !important;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04) !important;
  transition: all 0.25s ease !important;
}

.newsletter-compact-card:hover,
.newsletter-card:hover {
  box-shadow: 0 14px 35px -5px rgba(15, 23, 42, 0.12), 0 0 15px rgba(37, 99, 235, 0.08) !important;
  border-color: #cbd5e1 !important;
}

.newsletter-brand-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.newsletter-sparkle {
  color: #2563eb;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  animation: sparkleRotate 3s infinite linear;
}

.newsletter-title,
.newsletter-card h3 {
  color: #0f172a !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  margin: 0 0 2px 0 !important;
  letter-spacing: -0.2px;
}

.newsletter-sub {
  color: #64748b !important;
  font-size: 12.5px !important;
  margin: 0 !important;
}

.newsletter-compact-form,
.newsletter form {
  margin: 0 !important;
}

.newsletter-compact-input-group,
.newsletter-input-group,
.input-wrapper {
  display: flex !important;
  align-items: center !important;
  background: #f8fafc !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 50px !important;
  padding: 4px 6px 4px 14px !important;
  transition: all 0.2s ease !important;
  position: relative !important;
}

.newsletter-compact-input-group:focus-within,
.newsletter-input-group:focus-within,
.input-wrapper:focus-within {
  border-color: #2563eb !important;
  background: #ffffff !important;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
}

.newsletter-mail-icon {
  color: #94a3b8;
  font-size: 14px;
}

.newsletter-compact-input,
.newsletter-input-group input,
.form-control#newsletter {
  background: transparent !important;
  border: none !important;
  color: #0f172a !important;
  font-size: 13.5px !important;
  padding: 6px 10px !important;
  height: 38px !important;
  flex: 1 !important;
  outline: none !important;
  min-width: 0 !important;
  box-shadow: none !important;
}

.newsletter-compact-input::placeholder,
.newsletter-input-group input::placeholder,
.form-control#newsletter::placeholder {
  color: #94a3b8 !important;
}

.newsletter-compact-btn,
.newsletter-input-group button,
.input-wrapper button {
  position: static !important;
  transform: none !important;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 50px !important;
  padding: 8px 20px !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  transition: all 0.2s ease !important;
  white-space: nowrap !important;
  outline: none !important;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25) !important;
  height: 36px !important;
}

.newsletter-compact-btn:hover,
.newsletter-input-group button:hover,
.input-wrapper button:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%) !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35) !important;
  transform: translateY(-1px) !important;
}

.newsletter-compact-btn:active,
.newsletter-input-group button:active,
.input-wrapper button:active {
  transform: translateY(0) !important;
}

.newsletter-block {
  padding: 0 !important;
  background: transparent !important;
}

.newsletter-block h3 {
  display: none !important;
}

.footer,
.footer-modern,
.bg-footer {
  background-color: #f1f5f9 !important;
  padding-top: 85px !important;
  border-top: 1px solid #e2e8f0 !important;
}`;

// Normalize line endings before replacing
content = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetSection.replace(/\r\n/g, '\n');

if (content.includes(normalizedTarget)) {
  content = content.replace(normalizedTarget, replacementCss.replace(/\r\n/g, '\n'));
  fs.writeFileSync(cssPath, content, 'utf8');
  console.log('Replaced newsletter CSS successfully! Size:', fs.statSync(cssPath).size);
} else {
  // Try finding by header comment
  const idx = content.indexOf('Footer & Newsletter (Modern Light Theme)');
  if (idx !== -1) {
    const endIdx = content.indexOf('.footer-modern h4', idx);
    if (endIdx !== -1) {
      content = content.slice(0, idx - 80) + replacementCss + '\n\n' + content.slice(endIdx);
      fs.writeFileSync(cssPath, content, 'utf8');
      console.log('Replaced by index successfully! Size:', fs.statSync(cssPath).size);
    }
  } else {
    console.log('Target section not found');
  }
}
