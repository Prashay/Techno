const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'css', 'modern-opening.css');
const jsPath = path.join(__dirname, '..', 'js', 'online-compiler.js');

let css = fs.readFileSync(cssPath, 'utf8');
const isCrlf = css.includes('\r\n');

// Normalize to LF for editing
let normalizedCss = css.replace(/\r\n/g, '\n');

// 1. Ensure color-scheme: light on :root
if (!normalizedCss.includes('color-scheme: light;')) {
  normalizedCss = normalizedCss.replace(':root {', ':root {\n  color-scheme: light;');
  console.log('1. Added color-scheme: light to :root');
}

// 2. Add modern contrast overrides for legacy style.css classes if not present
const targetAnchor = '.section-divider-banner p {\n  color: #cbd5e1 !important;\n}';
const contrastBlock = `

/* ==========================================================================
   Modern Contrast Overrides for Legacy Style.css Utility Classes
   Ensures WCAG AA compliance across light theme pages
   ========================================================================== */
.text-muted {
  color: #64748b !important; /* Slate-500: 4.8:1 contrast on white */
}

.text-secondary {
  color: #475569 !important; /* Slate-600: 7.0:1 contrast on white */
}

.text-lighten {
  color: #475569 !important; /* Slate-600: replaces invisible #d6d6e0 */
}

.text-primary,
i.text-primary {
  color: #0284c7 !important; /* Deep Cyan-600: replaces low-contrast yellow */
}

.text-warning,
i.text-warning {
  color: #b45309 !important; /* Dark Amber: replaces bright yellow */
}

.text-color {
  color: #334155 !important; /* Slate-700: replaces dull purple-gray */
}`;

if (!normalizedCss.includes('Modern Contrast Overrides for Legacy Style.css Utility Classes')) {
  if (normalizedCss.includes(targetAnchor)) {
    normalizedCss = normalizedCss.replace(targetAnchor, targetAnchor + contrastBlock);
    console.log('2. Successfully injected legacy utility class contrast overrides');
  } else {
    console.log('2. Could not find targetAnchor for contrastBlock');
  }
} else {
  console.log('2. Contrast overrides already present.');
}

// Restore line endings
if (isCrlf) {
  normalizedCss = normalizedCss.replace(/\n/g, '\r\n');
}

fs.writeFileSync(cssPath, normalizedCss, 'utf8');
console.log('Finished updating css/modern-opening.css!');
