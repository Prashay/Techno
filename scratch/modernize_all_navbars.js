const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

function getActiveKey(filename) {
  if (filename === 'index.html') return 'home';
  if (filename === 'frontend.html' || filename === 'angular.html' || filename === 'reactjs.html') return 'frontend';
  if (filename === 'cloud.html' || filename === 'aws.html' || filename === 'gcp.html') return 'cloud';
  if (filename === 'database.html' || filename === 'postgresql.html' || filename === 'mongodb.html' || filename === 'elasticsearch.html' || filename === 'sql.html') return 'database';
  if (filename === 'ai.html') return 'ai';
  if (filename === 'programmin.html' || filename === 'ArrayPrograms.html' || filename === 'numberprograms.html' || filename === 'Stringprograms.html' || filename === 'java8programs.html' || filename === 'topicwiseprogram.html') return 'programs';
  if (filename === 'personal-interview.html') return 'personal';
  if (filename === 'about.html') return 'about';
  return 'backend';
}

function generateModernNav(activeKey) {
  return `      <nav class="navbar navbar-expand-lg navbar-dark p-0">
        <a class="navbar-brand" href="index.html">
          <img class="site-logo" src="images/logo.svg" alt="Techno">
        </a>
        
        <!-- Mobile Right Controls (Quick App Pill + Animated Hamburger) -->
        <div class="mobile-nav-right d-lg-none">
          <button class="btn-mobile-quick-pwa btn-scanner-link" aria-label="Open Mobile App QR Scanner">
            <span class="pulse-dot"></span> App
          </button>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
            aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <!-- Desktop Navigation Pill Dock Links -->
        <div class="collapse navbar-collapse" id="navigation">
          <ul class="navbar-nav ml-auto align-items-center">
            <li class="nav-item ${activeKey === 'home' ? 'active' : ''}">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item ${activeKey === 'backend' ? 'active' : ''}">
              <a class="nav-link" href="backend.html">Backend</a>
            </li>
            <li class="nav-item ${activeKey === 'frontend' ? 'active' : ''}">
              <a class="nav-link" href="frontend.html">Frontend</a>
            </li>
            <li class="nav-item ${activeKey === 'cloud' ? 'active' : ''}">
              <a class="nav-link" href="cloud.html">Cloud</a>
            </li>
            <li class="nav-item ${activeKey === 'database' ? 'active' : ''}">
              <a class="nav-link" href="database.html">Database</a>
            </li>
            <li class="nav-item ${activeKey === 'ai' ? 'active' : ''}">
              <a class="nav-link nav-link-ai" href="ai.html">
                <span class="nav-ai-sparkle">✦</span> AI
              </a>
            </li>
            <li class="nav-item dropdown view ${activeKey === 'programs' ? 'active' : ''}">
              <a class="nav-link dropdown-toggle" href="programmin.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Interview Programs
              </a>
              <ul class="dropdown-menu modern-dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="dropdown-header-label">CODING MASTERY TRACKS</li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="ArrayPrograms.html">
                    <span class="dd-icon-box"><i class="ti-layout-grid2"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Array Programs</span>
                      <span class="dd-desc">Two Pointers &bull; Sliding Window</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="numberprograms.html">
                    <span class="dd-icon-box"><i class="ti-stats-up"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Number Programs</span>
                      <span class="dd-desc">Bitwise, Primes &amp; Math Logic</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="Stringprograms.html">
                    <span class="dd-icon-box"><i class="ti-text"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">String Programs</span>
                      <span class="dd-desc">Anagrams, Palindromes &amp; Trie</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="java8programs.html">
                    <span class="dd-icon-box dd-icon-accent"><i class="ti-bolt"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Java 8 Programs</span>
                      <span class="dd-desc">Streams, Lambdas &amp; GroupingBy</span>
                    </div>
                    <span class="dd-badge-hot">Hot</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="topicwiseprogram.html">
                    <span class="dd-icon-box"><i class="ti-view-list-alt"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Topicwise DSA</span>
                      <span class="dd-desc">Trees, Graphs, DP &amp; LeetCode</span>
                    </div>
                  </a>
                </li>
                <li class="dropdown-divider-line"></li>
                <li>
                  <a class="dropdown-item modern-dd-item dd-highlight" href="personal-interview.html">
                    <span class="dd-icon-box dd-icon-hr"><i class="ti-user"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Personal Interview</span>
                      <span class="dd-desc">HR &amp; Tech Lead Playbook</span>
                    </div>
                    <span class="dd-badge-new">New</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown view ${activeKey === 'personal' ? 'active' : ''}">
              <a class="nav-link dropdown-toggle nav-link-personal" href="personal-interview.html" id="navbarDropdownPersonal" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Personal Interview <span class="nav-pill-badge">60 Qs</span>
              </a>
              <ul class="dropdown-menu modern-dropdown-menu" aria-labelledby="navbarDropdownPersonal">
                <li class="dropdown-header-label">HR &amp; TECHNICAL PLAYBOOK (60 Qs)</li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html">
                    <span class="dd-icon-box dd-icon-hr"><i class="ti-book"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">Full Playbook (60 Qs)</span>
                      <span class="dd-desc">45 HR + 15 Production Scenarios</span>
                    </div>
                    <span class="dd-badge-hot">60 Qs</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html#section-01">
                    <span class="dd-icon-box"><i class="ti-direction"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">01. Career Story &amp; Transitions</span>
                      <span class="dd-desc">STIXIS, CGI &amp; Lowe\'s Narrative</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html#section-02">
                    <span class="dd-icon-box"><i class="ti-medall"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">02. Java &amp; Leadership</span>
                      <span class="dd-desc">Mentoring 8-10 Eng &bull; Redis 170ms</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html#section-03">
                    <span class="dd-icon-box"><i class="ti-wallet"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">03. Salary &amp; Logistics</span>
                      <span class="dd-desc">₹29L to ₹40-42L CTC Scripts</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html#section-04">
                    <span class="dd-icon-box"><i class="ti-layers-alt"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">04. Competing Offers</span>
                      <span class="dd-desc">Counteroffers &amp; Multi-Offer Strategy</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item dd-highlight" href="personal-interview.html#section-05">
                    <span class="dd-icon-box dd-icon-accent"><i class="ti-bolt"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">05. 15 Production Scenarios</span>
                      <span class="dd-desc">Bottlenecks, Kafka, OOM &amp; Sagas</span>
                    </div>
                    <span class="dd-badge-hot">Hot</span>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item modern-dd-item" href="personal-interview.html#section-06">
                    <span class="dd-icon-box"><i class="ti-check-box"></i></span>
                    <div class="dd-text-wrap">
                      <span class="dd-title">06. Quick Revision &amp; Checklist</span>
                      <span class="dd-desc">30s Pitch &bull; Facts &bull; What to Avoid</span>
                    </div>
                    <span class="dd-badge-checklist">Checklist</span>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item ${activeKey === 'about' ? 'active' : ''}">
              <a class="nav-link" href="about.html">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn-scanner-link" href="javascript:void(0)">
                <span class="pulse-dot"></span><i class="ti-mobile mr-1"></i>Mobile App
              </a>
            </li>
          </ul>
        </div>
      </nav>`;
}

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(rootDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Match the <nav class="navbar ..."> ... </nav> block
  const navRegex = /<nav\s+class="navbar\s+navbar-expand-lg\s+navbar-dark\s+p-0">[\s\S]*?<\/nav>/i;
  
  if (navRegex.test(html)) {
    const activeKey = getActiveKey(file);
    const newNav = generateModernNav(activeKey);
    html = html.replace(navRegex, newNav);
    fs.writeFileSync(filePath, html, 'utf8');
    modifiedCount++;
    console.log(`Updated nav in ${file} (Active: ${activeKey})`);
  } else {
    console.warn(`Could not find nav in ${file}`);
  }
}

console.log(`Finished updating navbars across ${modifiedCount} files.`);
