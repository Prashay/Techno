const fs = require('fs');
const path = require('path');

const compactNewsletterHtml = `  <!-- newsletter (compact modern design) -->
  <div class="newsletter-compact-section">
    <div class="container">
      <div class="newsletter-compact-card">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-5 mb-3 mb-md-0">
            <div class="newsletter-brand-wrap">
              <span class="newsletter-sparkle">✦</span>
              <div>
                <h4 class="newsletter-title mb-1">Subscribe to Tech Digests</h4>
                <p class="newsletter-sub mb-0">Get weekly 2026 tech interview questions &amp; system designs</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-7">
            <form class="newsletter-compact-form" action="#" onsubmit="event.preventDefault(); var btn=this.querySelector('button'); btn.innerHTML='<i class=\\'ti-check mr-1\\'></i> Joined!'; setTimeout(function(){ btn.innerHTML='<span>Join</span> <i class=\\'ti-arrow-right ml-1\\'></i>'; }, 3000);">
              <div class="newsletter-compact-input-group">
                <i class="ti-email newsletter-mail-icon"></i>
                <input type="email" required placeholder="Enter work email..." class="newsletter-compact-input" aria-label="Email Address">
                <button type="submit" class="newsletter-compact-btn">
                  <span>Join</span> <i class="ti-arrow-right ml-1"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`;

// 1. Update page_template_helper.js
const helperPath = path.join(__dirname, 'page_template_helper.js');
if (fs.existsSync(helperPath)) {
  let helperContent = fs.readFileSync(helperPath, 'utf8');
  helperContent = helperContent.replace(/<div class="newsletter">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, compactNewsletterHtml.trim());
  fs.writeFileSync(helperPath, helperContent, 'utf8');
  console.log('Updated page_template_helper.js');
}

// 2. Update all 35 HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let updatedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Regex to match old or modern newsletter block inside footer before the main footer content
  // Pattern 1: <div class="newsletter"> ... </div></div></div></div>
  // Pattern 2: <div class="newsletter-modern"> ... </div></div></div></div></div>
  const regex = /(<!--\s*newsletter\s*-->\s*)?<div class="newsletter(-modern)?">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>(\s*<\/div>)?/i;

  if (regex.test(content)) {
    content = content.replace(regex, compactNewsletterHtml);
    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      updatedCount++;
    }
  } else {
    console.log('Regex did not match for:', f);
  }
});

console.log('Successfully updated compact newsletter in ' + updatedCount + ' HTML files.');
