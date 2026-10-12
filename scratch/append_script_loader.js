const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, '..', 'js', 'script.js');
let content = fs.readFileSync(scriptPath, 'utf8');

const loaderCode = `
// ==========================================================================
// TechnoInterview - Load Online Compiler & Interactive Playground
// ==========================================================================
(function () {
  if (typeof window !== 'undefined' && !window.TechnoIDE) {
    var compilerScript = document.createElement('script');
    compilerScript.src = 'js/online-compiler.js';
    compilerScript.async = true;
    document.head.appendChild(compilerScript);
  }
})();
`;

if (!content.includes('js/online-compiler.js')) {
  fs.writeFileSync(scriptPath, content.trimEnd() + '\n' + loaderCode);
  console.log('Appended compiler loader to js/script.js successfully!');
} else {
  console.log('Loader already present in js/script.js.');
}
