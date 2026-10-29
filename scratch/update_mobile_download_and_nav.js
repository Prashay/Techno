const fs = require('fs');
const path = require('path');

const targetJs = path.join(__dirname, '..', 'js', 'mobile-download.js');
let content = fs.readFileSync(targetJs, 'utf8');

// 1. Update QR box to include .qr-center-logo-overlay and images/app-icon.svg
content = content.replace(
  `<div id="modal-qr-container" class="qr-code-graphic">\n                    \${qrSvg || \`<img src="\${qrFallbackImg}" alt="Scan QR Code" width="240" height="240" class="qr-img-fallback"/>\`}\n                  </div>\n                  <div class="qr-brand-chip">\n                    <img src="images/android-chrome-192x192.png" alt="Techno" class="qr-chip-logo" onerror="this.style.display=\'none\';"/>\n                    <span>TechnoApp 2026</span>\n                  </div>`,
  `<div id="modal-qr-container" class="qr-code-graphic">
                    \${qrSvg || \`<img src="\${qrFallbackImg}" alt="Scan QR Code" width="240" height="240" class="qr-img-fallback"/>\`}
                    <div class="qr-center-logo-overlay">
                      <img src="images/app-icon.svg" alt="Techno" onerror="this.src=\'images/android-chrome-192x192.png\';"/>
                    </div>
                  </div>
                  <div class="qr-brand-chip">
                    <img src="images/app-icon.svg" alt="Techno" class="qr-chip-logo" onerror="this.src=\'images/android-chrome-192x192.png\';"/>
                    <span>Techno Mobile PWA</span>
                  </div>`
);

// 2. Update Direct Download avatar badge
content = content.replace(
  `<div class="app-avatar-badge">\n                  <img src="images/android-chrome-192x192.png" alt="Techno App Icon" onerror="this.src=\'images/logo.svg\'"/>\n                </div>`,
  `<div class="app-avatar-badge">
                  <img src="images/app-icon.svg" alt="Techno App Icon" onerror="this.src=\'images/android-chrome-192x192.png\'"/>
                </div>`
);

// 3. Update Modal Header brand icon orb
content = content.replace(
  `<div class="brand-icon-orb">\n                <i class="ti-mobile"></i>\n              </div>`,
  `<div class="brand-icon-orb">
                <img src="images/app-icon.svg" alt="Techno" style="width:28px;height:28px;border-radius:8px;" onerror="this.src=\'images/android-chrome-192x192.png\'"/>
              </div>`
);

// 4. Add Mobile Bottom Dock & Fullscreen Drawer Implementation before window.TechnoMobile
const mobileNavCode = `
  // 11. MOBILE BOTTOM DOCK & FULLSCREEN DRAWER SHEET SYSTEM
  function initMobileNavigation() {
    var path = window.location.pathname.toLowerCase();
    var currentFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    var isHome = currentFile === 'index.html' || currentFile === '';
    var isPersonal = currentFile === 'personal-interview.html';
    var isTracks = !isHome && !isPersonal && currentFile.endsWith('.html') && currentFile !== 'about.html';

    // 1. Create Mobile Bottom Dock if not present
    if (!document.getElementById('techno-mobile-bottom-dock')) {
      var dock = document.createElement('nav');
      dock.id = 'techno-mobile-bottom-dock';
      dock.className = 'mobile-bottom-dock';
      dock.setAttribute('aria-label', 'Mobile Navigation Bar');

      dock.innerHTML = \`
        <a href="index.html" class="dock-btn \${isHome ? 'active' : ''}" id="dock-btn-home">
          <div class="dock-icon-wrap"><i class="ti-home"></i></div>
          <span class="dock-label">Home</span>
        </a>
        <button type="button" class="dock-btn \${isTracks ? 'active' : ''}" id="dock-btn-tracks" aria-label="Explore Interview Tracks">
          <div class="dock-icon-wrap"><i class="ti-view-grid"></i></div>
          <span class="dock-label">Tracks</span>
        </button>
        <button type="button" class="dock-btn dock-btn-ai-center" id="dock-btn-ai" aria-label="Open JARVIS AI Copilot">
          <div class="dock-ai-orb">
            <span class="dock-ai-sparkle">✦</span>
          </div>
          <span class="dock-label">JARVIS</span>
        </button>
        <a href="personal-interview.html" class="dock-btn \${isPersonal ? 'active' : ''}" id="dock-btn-hr">
          <div class="dock-icon-wrap">
            <i class="ti-user"></i>
            <span class="dock-badge-pulse"></span>
          </div>
          <span class="dock-label">HR 45 Qs</span>
        </a>
        <button type="button" class="dock-btn" id="dock-btn-menu" aria-label="Open Full Menu">
          <div class="dock-icon-wrap"><i class="ti-menu"></i></div>
          <span class="dock-label">Menu</span>
        </button>
      \`;
      document.body.appendChild(dock);

      // Event handlers for bottom dock
      var btnTracks = dock.querySelector('#dock-btn-tracks');
      if (btnTracks) {
        btnTracks.addEventListener('click', function (e) {
          e.preventDefault();
          openMobileDrawer('tracks');
        });
      }

      var btnAi = dock.querySelector('#dock-btn-ai');
      if (btnAi) {
        btnAi.addEventListener('click', function (e) {
          e.preventDefault();
          if (window.JarvisAI && typeof window.JarvisAI.open === 'function') {
            window.JarvisAI.open('qa', null);
          } else {
            var modal = document.getElementById('jarvis-qa-modal');
            if (modal) modal.style.display = 'flex';
          }
        });
      }

      var btnMenu = dock.querySelector('#dock-btn-menu');
      if (btnMenu) {
        btnMenu.addEventListener('click', function (e) {
          e.preventDefault();
          toggleMobileDrawer();
        });
      }
    }

    // 2. Ensure Mobile Slide-up Drawer exists
    ensureMobileDrawer();

    // 3. Connect top navbar hamburger toggler to Mobile Drawer
    var topTogglers = document.querySelectorAll('.navbar-toggler');
    topTogglers.forEach(function (tog) {
      if (!tog._drawerBound) {
        tog._drawerBound = true;
        tog.addEventListener('click', function (e) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileDrawer();
          }
        });
      }
    });

    // 4. Desktop scroll detection for floating dock
    function handleScroll() {
      var nav = document.querySelector('.navigation');
      if (nav) {
        if (window.scrollY > 30) {
          nav.classList.add('is-scrolled');
        } else {
          nav.classList.remove('is-scrolled');
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function ensureMobileDrawer() {
    var existing = document.getElementById('techno-mobile-drawer-sheet-overlay');
    if (existing) return existing;

    var overlay = document.createElement('div');
    overlay.id = 'techno-mobile-drawer-sheet-overlay';
    overlay.className = 'mobile-drawer-sheet-overlay';
    overlay.style.display = 'none';

    overlay.innerHTML = \`
      <div class="mobile-drawer-sheet" id="techno-mobile-drawer-sheet">
        <div class="drawer-drag-pill" title="Tap to close"></div>

        <div class="drawer-header-bar">
          <div class="drawer-brand-col">
            <img src="images/app-icon.svg" alt="Techno" class="drawer-app-icon" onerror="this.src=\'images/android-chrome-192x192.png\'"/>
            <div>
              <div class="drawer-app-title">TECHNO<span class="text-amber">.</span></div>
              <div class="drawer-app-tagline">35+ Interview Tracks &bull; MNC Notes</div>
            </div>
          </div>
          <button class="drawer-dismiss-btn" id="drawer-dismiss-btn" aria-label="Close menu">&times;</button>
        </div>

        <!-- Quick Live Filter -->
        <div class="drawer-search-wrap">
          <i class="ti-search drawer-search-icon"></i>
          <input type="text" id="drawer-search-box" class="drawer-search-input" placeholder="Quick search tracks (e.g. Java, SQL, HR, AWS)..." autocomplete="off" />
          <button id="drawer-search-clear-btn" class="drawer-search-clear" style="display:none;" aria-label="Clear">&times;</button>
        </div>

        <!-- One-Tap Action Pills -->
        <div class="drawer-fast-actions-grid">
          <button type="button" class="drawer-fast-card apk" id="drawer-fast-apk">
            <i class="ti-android"></i>
            <div class="fast-text">
              <strong>Download APK</strong>
              <span>100% Free &bull; v2.4</span>
            </div>
          </button>
          <button type="button" class="drawer-fast-card scanner" id="drawer-fast-scanner">
            <i class="ti-view-grid"></i>
            <div class="fast-text">
              <strong>Scan to Phone</strong>
              <span>Instant QR &bull; PWA</span>
            </div>
          </button>
          <button type="button" class="drawer-fast-card jarvis" id="drawer-fast-jarvis">
            <span>✦</span>
            <div class="fast-text">
              <strong>JARVIS AI</strong>
              <span>AI Copilot Helper</span>
            </div>
          </button>
          <button type="button" class="drawer-fast-card compiler" id="drawer-fast-compiler">
            <i class="ti-bolt"></i>
            <div class="fast-text">
              <strong>Compiler IDE</strong>
              <span>Run Java 21 &bull; Code</span>
            </div>
          </button>
        </div>

        <!-- Categorized Interview Tracks List -->
        <div class="drawer-tracks-scroll" id="drawer-tracks-scroll">
          
          <!-- Flagship Track: Personal Interview -->
          <div class="drawer-category-card flagship" data-cat="hr personal behavioral recruiter narrative salary stixis lowes">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge gold"><i class="ti-medall"></i></span>
                <div>
                  <span class="cat-pill-badge gold">FLAGSHIP PLAYBOOK</span>
                  <h4 class="cat-card-title">Personal Interview &amp; HR (45 Qs)</h4>
                </div>
              </div>
              <a href="personal-interview.html" class="cat-open-link">Open <i class="ti-arrow-right"></i></a>
            </div>
            <div class="cat-pills-wrap">
              <a href="personal-interview.html" class="drawer-pill-link hot"><i class="ti-book mr-1"></i> Full 45 Qs Playbook</a>
              <a href="personal-interview.html#section-01" class="drawer-pill-link">01. Career Narrative (STIXIS &bull; Lowe\'s)</a>
              <a href="personal-interview.html#section-02" class="drawer-pill-link">02. Java &amp; Leadership (8-10 Eng)</a>
              <a href="personal-interview.html#section-03" class="drawer-pill-link">03. ₹29L to ₹42L CTC</a>
              <a href="personal-interview.html#section-04" class="drawer-pill-link">04. Competing Offers</a>
              <a href="personal-interview.html#section-05" class="drawer-pill-link">05. 30s Pitch &amp; Checklist</a>
            </div>
          </div>

          <!-- Category 1: Coding & Programs -->
          <div class="drawer-category-card" data-cat="programs coding dsa java8 arrays strings numbers topicwise">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge cyan"><i class="ti-layout-grid2"></i></span>
                <div>
                  <span class="cat-pill-badge cyan">DSA &amp; LOGIC</span>
                  <h4 class="cat-card-title">Coding Programs Mastery</h4>
                </div>
              </div>
              <a href="programmin.html" class="cat-open-link">All <i class="ti-arrow-right"></i></a>
            </div>
            <div class="cat-pills-wrap">
              <a href="ArrayPrograms.html" class="drawer-pill-link">Array Programs</a>
              <a href="Stringprograms.html" class="drawer-pill-link">String Programs</a>
              <a href="numberprograms.html" class="drawer-pill-link">Number Programs</a>
              <a href="java8programs.html" class="drawer-pill-link hot">Java 8 Programs <span class="badge-mini">Hot</span></a>
              <a href="topicwiseprogram.html" class="drawer-pill-link">Topicwise DSA</a>
              <a href="programmin.html" class="drawer-pill-link">All 300+ Programs</a>
            </div>
          </div>

          <!-- Category 2: Backend Mastery -->
          <div class="drawer-category-card" data-cat="backend java spring boot microservices hibernate rest api junit multithreading">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge blue"><i class="ti-server"></i></span>
                <div>
                  <span class="cat-pill-badge blue">ENTERPRISE JAVA</span>
                  <h4 class="cat-card-title">Backend &amp; Microservices</h4>
                </div>
              </div>
              <a href="backend.html" class="cat-open-link">Hub <i class="ti-arrow-right"></i></a>
            </div>
            <div class="cat-pills-wrap">
              <a href="backend.html" class="drawer-pill-link">Backend Hub</a>
              <a href="java8theory.html" class="drawer-pill-link hot">Java 8 Core &amp; Streams</a>
              <a href="springboot.html" class="drawer-pill-link">Spring Boot 3</a>
              <a href="microservice.html" class="drawer-pill-link">Microservices</a>
              <a href="hibernate.html" class="drawer-pill-link">Hibernate &amp; JPA</a>
              <a href="multithreding.html" class="drawer-pill-link">Multithreading</a>
              <a href="collection.html" class="drawer-pill-link">Collections</a>
              <a href="designp.html" class="drawer-pill-link">Design Patterns</a>
              <a href="junit.html" class="drawer-pill-link">JUnit 5 &amp; Mockito</a>
              <a href="exception.html" class="drawer-pill-link">Exception Handling</a>
            </div>
          </div>

          <!-- Category 3: Frontend Tracks -->
          <div class="drawer-category-card" data-cat="frontend angular react javascript web typescript rxjs redux">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge purple"><i class="ti-layout"></i></span>
                <div>
                  <span class="cat-pill-badge purple">UI &amp; SPA</span>
                  <h4 class="cat-card-title">Frontend Frameworks</h4>
                </div>
              </div>
              <a href="frontend.html" class="cat-open-link">Hub <i class="ti-arrow-right"></i></a>
            </div>
            <div class="cat-pills-wrap">
              <a href="frontend.html" class="drawer-pill-link">Frontend Hub</a>
              <a href="angular.html" class="drawer-pill-link">Angular (RxJS &bull; NgRx)</a>
              <a href="reactjs.html" class="drawer-pill-link">React.js (Hooks &bull; Redux)</a>
            </div>
          </div>

          <!-- Category 4: Cloud & Database -->
          <div class="drawer-category-card" data-cat="cloud aws gcp docker database sql postgresql mongodb kafka elasticsearch">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge amber"><i class="ti-cloud"></i></span>
                <div>
                  <span class="cat-pill-badge amber">DISTRIBUTED SYSTEMS</span>
                  <h4 class="cat-card-title">Cloud, DevOps &amp; Databases</h4>
                </div>
              </div>
              <a href="cloud.html" class="cat-open-link">Hub <i class="ti-arrow-right"></i></a>
            </div>
            <div class="cat-pills-wrap">
              <a href="cloud.html" class="drawer-pill-link">Cloud Hub</a>
              <a href="aws.html" class="drawer-pill-link">AWS Cloud</a>
              <a href="gcp.html" class="drawer-pill-link">Google Cloud (GCP)</a>
              <a href="docker.html" class="drawer-pill-link">Docker &amp; Containers</a>
              <a href="kafka.html" class="drawer-pill-link">Apache Kafka</a>
              <a href="database.html" class="drawer-pill-link">Database Hub</a>
              <a href="sql.html" class="drawer-pill-link">SQL Queries</a>
              <a href="postgresql.html" class="drawer-pill-link">PostgreSQL</a>
              <a href="mongodb.html" class="drawer-pill-link">MongoDB NoSQL</a>
              <a href="elasticsearch.html" class="drawer-pill-link">Elasticsearch</a>
            </div>
          </div>

          <!-- Category 5: AI & About -->
          <div class="drawer-category-card" data-cat="ai jarvis about developer guide">
            <div class="cat-card-header">
              <div class="cat-header-left">
                <span class="cat-icon-badge green"><i class="ti-light-bulb"></i></span>
                <div>
                  <span class="cat-pill-badge green">INTELLIGENCE</span>
                  <h4 class="cat-card-title">AI &amp; Developer Bio</h4>
                </div>
              </div>
            </div>
            <div class="cat-pills-wrap">
              <a href="ai.html" class="drawer-pill-link hot"><span>✦</span> AI &amp; GenAI Guides</a>
              <a href="about.html" class="drawer-pill-link">About Developer (Prashant Jha)</a>
            </div>
          </div>

        </div>
      </div>
    \`;

    document.body.appendChild(overlay);

    overlay.querySelector('#drawer-dismiss-btn').addEventListener('click', closeMobileDrawer);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMobileDrawer();
    });

    var dragPill = overlay.querySelector('.drawer-drag-pill');
    if (dragPill) {
      dragPill.addEventListener('click', closeMobileDrawer);
    }

    overlay.querySelector('#drawer-fast-apk').addEventListener('click', function () {
      closeMobileDrawer();
      triggerApkDownload();
    });

    overlay.querySelector('#drawer-fast-scanner').addEventListener('click', function () {
      closeMobileDrawer();
      openModal('scan');
    });

    overlay.querySelector('#drawer-fast-jarvis').addEventListener('click', function () {
      closeMobileDrawer();
      if (window.JarvisAI && typeof window.JarvisAI.open === 'function') {
        window.JarvisAI.open('qa', null);
      } else {
        var modal = document.getElementById('jarvis-qa-modal');
        if (modal) modal.style.display = 'flex';
      }
    });

    overlay.querySelector('#drawer-fast-compiler').addEventListener('click', function () {
      closeMobileDrawer();
      if (window.TechnoIDE && typeof window.TechnoIDE.open === 'function') {
        window.TechnoIDE.open('java21', null);
      }
    });

    var searchBox = overlay.querySelector('#drawer-search-box');
    var clearBtn = overlay.querySelector('#drawer-search-clear-btn');
    var cards = overlay.querySelectorAll('.drawer-category-card');

    if (searchBox) {
      searchBox.addEventListener('input', function () {
        var query = this.value.trim().toLowerCase();
        if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

        cards.forEach(function (card) {
          var catText = (card.getAttribute('data-cat') || '') + ' ' + card.innerText.toLowerCase();
          if (!query || catText.includes(query)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          searchBox.value = '';
          searchBox.dispatchEvent(new Event('input'));
          searchBox.focus();
        });
      }
    }

    return overlay;
  }

  function openMobileDrawer(focusSection) {
    var overlay = ensureMobileDrawer();
    overlay.style.display = 'flex';
    requestAnimationFrame(function () {
      overlay.classList.add('is-active');
    });
    document.body.style.overflow = 'hidden';

    if (focusSection === 'tracks') {
      var search = overlay.querySelector('#drawer-search-box');
      if (search) search.focus();
    }
  }

  function closeMobileDrawer() {
    var overlay = document.getElementById('techno-mobile-drawer-sheet-overlay');
    if (overlay) {
      overlay.classList.remove('is-active');
      setTimeout(function () {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  }

  function toggleMobileDrawer() {
    var overlay = document.getElementById('techno-mobile-drawer-sheet-overlay');
    if (overlay && overlay.classList.contains('is-active')) {
      closeMobileDrawer();
    } else {
      openMobileDrawer();
    }
  }
`;

// Insert initMobileNavigation into init()
content = content.replace(
  `  function init() {\n    ensureAppDownloadModal();\n    addFloatingFabLauncher();\n    bindPageButtons();\n  }`,
  `  function init() {\n    ensureAppDownloadModal();\n    addFloatingFabLauncher();\n    bindPageButtons();\n    initMobileNavigation();\n  }`
);

// Insert mobileNavCode before window.TechnoMobile
content = content.replace(
  `  // Global API\n  window.TechnoMobile = {`,
  `${mobileNavCode}\n  // Global API\n  window.TechnoMobile = {\n    openDrawer: openMobileDrawer,\n    closeDrawer: closeMobileDrawer,\n    toggleDrawer: toggleMobileDrawer,`
);

fs.writeFileSync(targetJs, content, 'utf8');
console.log('Successfully updated js/mobile-download.js');
