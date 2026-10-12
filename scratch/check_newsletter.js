const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let oldNewsletter = [];
let modernNewsletter = [];
let other = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('class="newsletter"') || content.includes("class='newsletter'")) {
    oldNewsletter.push(f);
  } else if (content.includes('newsletter-modern')) {
    modernNewsletter.push(f);
  } else {
    other.push(f);
  }
});

console.log('Files with old .newsletter (' + oldNewsletter.length + '):', oldNewsletter);
console.log('Files with .newsletter-modern (' + modernNewsletter.length + '):', modernNewsletter);
console.log('Other (' + other.length + '):', other);
