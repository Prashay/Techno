const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const heroDialCss = `
/* Inline Hero Speed-Dial: Single Button on click other buttons appear */
.hero-speed-dial-wrap {
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 8px;
}

.hero-speed-dial-wrap .hero-chevron {
  font-size: 11px;
  transition: transform 0.3s ease;
}

.hero-speed-dial-wrap.is-open .hero-chevron {
  transform: rotate(180deg);
}

.hero-speed-dial-children {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transform: translateX(-10px) scale(0.9);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
}

.hero-speed-dial-wrap.is-open .hero-speed-dial-children {
  max-width: 500px;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0) scale(1);
}
`;

if (!cssContent.includes('.hero-speed-dial-wrap')) {
  cssContent += '\n' + heroDialCss;
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log('Appended hero-speed-dial-wrap to modern-opening.css');
}
