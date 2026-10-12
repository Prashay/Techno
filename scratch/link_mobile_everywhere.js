const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('js/mobile-download.js')) {
    if (content.includes('<script src="js/suggest-questions.js"></script>')) {
      content = content.replace(
        '<script src="js/suggest-questions.js"></script>',
        '<script src="js/suggest-questions.js"></script>\n<script src="js/mobile-download.js"></script>'
      );
      fs.writeFileSync(f, content, 'utf8');
      count++;
    } else if (content.includes('<script src="js/jarvis-ai.js"></script>')) {
      content = content.replace(
        '<script src="js/jarvis-ai.js"></script>',
        '<script src="js/jarvis-ai.js"></script>\n<script src="js/mobile-download.js"></script>'
      );
      fs.writeFileSync(f, content, 'utf8');
      count++;
    } else if (content.includes('<script src="js/script.js"></script>')) {
      content = content.replace(
        '<script src="js/script.js"></script>',
        '<script src="js/script.js"></script>\n<script src="js/mobile-download.js"></script>'
      );
      fs.writeFileSync(f, content, 'utf8');
      count++;
    }
  }
});

console.log('Successfully injected direct mobile-download.js tag into ' + count + ' HTML files.');
