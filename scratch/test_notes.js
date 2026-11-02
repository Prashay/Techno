const fs = require('fs');
const content = fs.readFileSync('personal-notes.html', 'utf8');

console.log('File size:', content.length);
console.log('Has doctype:', content.startsWith('<!doctype html>'));
console.log('Has <style>:', content.includes('<style>'));
console.log('Has </style></head><body>:', content.includes('</style></head><body>'));
console.log('Has <header>:', content.includes('<header><div><strong>Interview Notes</strong>'));
console.log('Has search input:', content.includes('id="search"'));
console.log('Has <div class="layout"><aside id="nav"></aside>:', content.includes('<div class="layout"><aside id="nav"></aside>'));
console.log('Has results div:', content.includes('<div id="results"></div>'));
console.log('Ends with </script></body></html>:', content.endsWith('</script></body></html>'));

// Extract data count
const scriptStart = content.indexOf('<script>');
const scriptEnd = content.lastIndexOf('</script>');
const script = content.substring(scriptStart + 8, scriptEnd);
const dataEnd = script.indexOf('let selected=');
const dataJsonStr = script.substring(0, dataEnd).replace(/^\s*const\s+data\s*=\s*/, '').replace(/;\s*$/, '');
try {
  const data = JSON.parse(dataJsonStr);
  console.log('Parsed data array items successfully! Count:', data.length);
  const categories = [...new Set(data.map(x => x.cat))];
  console.log('Categories:', categories);
  const titles = [...new Set(data.map(x => x.title))];
  console.log('Titles:', titles);
} catch (e) {
  console.error('Data JSON parse error:', e.message);
}

