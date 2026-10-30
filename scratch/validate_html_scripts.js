const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('personal-interview.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
let hasErrors = false;

while ((match = scriptRegex.exec(html)) !== null) {
  const code = match[1].trim();
  if (!code) {
    scriptIndex++;
    continue;
  }
  try {
    new vm.Script(code);
    console.log(`Script ${scriptIndex}: OK (${code.length} chars)`);
  } catch (err) {
    console.error(`Script ${scriptIndex} ERROR:`, err.message);
    // Find approximate line number
    const lines = code.split('\n');
    console.error('Stack:', err.stack);
    hasErrors = true;
  }
  scriptIndex++;
}

if (!hasErrors) {
  console.log('ALL SCRIPTS IN personal-interview.html PASSED SYNTAX CHECK!');
} else {
  console.log('THERE ARE SYNTAX ERRORS IN personal-interview.html');
}
