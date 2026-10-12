const fs = require('fs');
const path = require('path');

// 1. Update js/script.js
const scriptJsPath = path.join(__dirname, '..', 'js', 'script.js');
let scriptContent = fs.readFileSync(scriptJsPath, 'utf8');

if (!scriptContent.includes('js/jarvis-ai.js')) {
  scriptContent += `
// ==========================================================================
// TechnoInterview - Load J.A.R.V.I.S. AI Copilot & Anomaly Detector
// ==========================================================================
(function () {
  if (typeof window !== 'undefined' && !window.JarvisAI) {
    var jarvisScript = document.createElement('script');
    jarvisScript.src = 'js/jarvis-ai.js';
    jarvisScript.async = true;
    document.head.appendChild(jarvisScript);
  }
})();
`;
  fs.writeFileSync(scriptJsPath, scriptContent, 'utf8');
  console.log('Updated js/script.js with JARVIS loader.');
}

// 2. Update page_template_helper.js
const helperPath = path.join(__dirname, 'page_template_helper.js');
if (fs.existsSync(helperPath)) {
  let helperContent = fs.readFileSync(helperPath, 'utf8');
  if (!helperContent.includes('js/jarvis-ai.js')) {
    helperContent = helperContent.replace('<script src="js/online-compiler.js"></script>', '<script src="js/online-compiler.js"></script>\n<script src="js/jarvis-ai.js"></script>');
    fs.writeFileSync(helperPath, helperContent, 'utf8');
    console.log('Updated page_template_helper.js with direct JARVIS script tag.');
  }
}

// 3. Update all 35 HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('js/jarvis-ai.js')) {
    if (content.includes('<script src="js/online-compiler.js"></script>')) {
      content = content.replace('<script src="js/online-compiler.js"></script>', '<script src="js/online-compiler.js"></script>\n<script src="js/jarvis-ai.js"></script>');
      fs.writeFileSync(f, content, 'utf8');
      count++;
    } else if (content.includes('<script src="js/script.js"></script>')) {
      content = content.replace('<script src="js/script.js"></script>', '<script src="js/script.js"></script>\n<script src="js/jarvis-ai.js"></script>');
      fs.writeFileSync(f, content, 'utf8');
      count++;
    }
  }
});

console.log('Successfully injected direct jarvis-ai.js tag into ' + count + ' HTML files.');
