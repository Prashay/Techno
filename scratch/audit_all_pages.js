const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let errors = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('undefined')) {
    errors.push(f + ' contains undefined text');
  }
  if (!content.includes('</html>')) {
    errors.push(f + ' missing </html>');
  }
  if (fs.statSync(f).size === 0) {
    errors.push(f + ' is 0 bytes');
  }
});

if (errors.length === 0) {
  console.log('PERFECT! All ' + files.length + ' HTML files passed audit with 0 errors.');
} else {
  console.log('Errors found:', errors);
}
