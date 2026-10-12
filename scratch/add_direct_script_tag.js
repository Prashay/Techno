const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('js/script.js') && !content.includes('js/online-compiler.js')) {
    content = content.replace('js/script.js"></script>', 'js/script.js"></script>\n<script src="js/online-compiler.js"></script>');
    fs.writeFileSync(f, content, 'utf8');
    count++;
  }
});

console.log('Directly added online-compiler.js to', count, 'HTML files.');
