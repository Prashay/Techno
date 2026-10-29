const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'personal-interview.html');

console.log(`Processing ${files.length} HTML files...`);

const personalDropdownNav = `            <li class="nav-item dropdown view">
              <a class="nav-link dropdown-toggle" href="personal-interview.html" id="navbarDropdownPersonal" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Personal Interview
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownPersonal">
                <li><a class="dropdown-item" href="personal-interview.html">📋 Full HR Playbook</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-01">01. Career Story &amp; Transitions</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-02">02. Java &amp; Leadership</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-03">03. Salary &amp; Logistics</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-04">04. Competing Offers</a></li>
                <li><a class="dropdown-item" href="personal-interview.html#section-05">05. Quick Revision &amp; Checklist</a></li>
              </ul>
            </li>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // 1. Title updates
  html = html.replace(/<title>([^<]*?)\s*-\s*Techno Interview<\/title>/gi, '<title>$1 - Techno</title>');
  html = html.replace(/<title>\s*Techno Interview\s*<\/title>/gi, '<title>Techno</title>');

  // 2. Meta updates
  html = html.replace(/<meta name="generator" content="\s*Techno Interview\s*">/gi, '<meta name="generator" content="Techno">');
  html = html.replace(/<meta name="theme-name" content="\s*Techno Interview\s*" \/>/gi, '<meta name="theme-name" content="Techno" />');

  // 3. Preloader updates
  html = html.replace(/TechnoInterview\s*<span class="ai-badge">/gi, 'Techno <span class="ai-badge">');

  // 4. Logo alt updates
  html = html.replace(/alt="Techno Interview"/gi, 'alt="Techno"');

  // 5. Add Personal Interview to navbar if not already present
  if (!html.includes('personal-interview.html')) {
    // Insert before <li class="nav-item... href="about.html"
    const aboutRegex = /(<li class="nav-item[^"]*"[^>]*>\s*<a class="nav-link" href="about\.html">About<\/a>\s*<\/li>)/i;
    if (aboutRegex.test(html)) {
      html = html.replace(aboutRegex, `${personalDropdownNav}\n$1`);
    }

    // Also add to Interview program dropdown menu if present
    const topicwiseProgRegex = /(<li><a class="dropdown-item" href="topicwiseprogram\.html">Topicwise Programs<\/a><\/li>)/i;
    if (topicwiseProgRegex.test(html)) {
      html = html.replace(topicwiseProgRegex, `$1\n                <li><a class="dropdown-item" href="personal-interview.html" style="color: #f59e0b; font-weight: 600;"><i class="ti-user mr-1"></i>Personal Interview</a></li>`);
    }

    // Also add to footer INTERVIEW PROGRAMS list if present
    const footerTopicwiseRegex = /(<li class="mb-3"><a class="text-color" href="topicwiseprogram\.html">Topicwise Programs<\/a><\/li>)/i;
    if (footerTopicwiseRegex.test(html)) {
      html = html.replace(footerTopicwiseRegex, `$1\n            <li class="mb-3"><a class="text-color" href="personal-interview.html">Personal Interview (HR)</a></li>`);
    }
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Successfully processed all files. Total updated: ${updatedCount}`);
