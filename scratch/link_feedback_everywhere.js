const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

let count = 0;
files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('js/suggest-questions.js')) {
    if (content.includes('<script src="js/jarvis-ai.js"></script>')) {
      content = content.replace(
        '<script src="js/jarvis-ai.js"></script>',
        '<script src="js/jarvis-ai.js"></script>\n<script src="js/suggest-questions.js"></script>'
      );
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
    } else if (content.includes('<script src="js/script.js"></script>')) {
      content = content.replace(
        '<script src="js/script.js"></script>',
        '<script src="js/script.js"></script>\n<script src="js/suggest-questions.js"></script>'
      );
      fs.writeFileSync(filePath, content, 'utf8');
      count++;
    }
  }
});

console.log('Injected suggest-questions.js into ' + count + ' HTML files.');
