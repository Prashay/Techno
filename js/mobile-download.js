/**
 * TechnoInterview - Mobile App Download & QR Scanner System
 * Features:
 * 1. Single Master Floating Action Button (Expandable Speed-Dial Launcher)
 *    - On click, other buttons smoothly fan out:
 *      * Download APK (with real APK direct download)
 *      * Scan to Download (with dynamic QR code & laser reticle)
 *      * Add to Home Screen (PWA install prompt)
 * 2. Scanner to Download HUD Modal:
 *    - Dynamic SVG QR code (pure client-side SVG matrix generator)
 *    - Live Camera Scanner (with video viewfinder & BarcodeDetector)
 * 3. Cross-platform & Offline ready.
 */
(function () {
  'use strict';

  // 1. EMBEDDED PURE JS QR CODE GENERATOR (Offline Capable)
  var QRCode = (function () {
    function QR8bitByte(data) {
      this.mode = 4;
      this.data = data;
    }
    QR8bitByte.prototype = {
      getLength: function () { return this.data.length; },
      write: function (buffer) {
        for (var i = 0; i < this.data.length; i++) {
          buffer.put(this.data.charCodeAt(i), 8);
        }
      }
    };

    var QRMath = {
      glog: function (n) {
        if (n < 1) throw new Error("glog(" + n + ")");
        return QRMath.LOG_TABLE[n];
      },
      gexp: function (n) {
        while (n < 0) n += 255;
        while (n >= 255) n -= 255;
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (var i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
    for (var i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    for (var i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

    function QRPolynomial(num, shift) {
      var offset = 0;
      while (offset < num.length && num[offset] === 0) offset++;
      this.num = new Array(num.length - offset + shift);
      for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
      for (var i = num.length - offset; i < this.num.length; i++) this.num[i] = 0;
    }
    QRPolynomial.prototype = {
      get: function (index) { return this.num[index]; },
      getLength: function () { return this.num.length; },
      multiply: function (e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function (e) {
        if (this.getLength() - e.getLength() < 0) return this;
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
        for (var i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        return new QRPolynomial(num, 0).mod(e);
      }
    };

    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
      [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
      [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
      [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
      [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
      [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
      [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15]
    ];
    QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + errorCorrectLevel];
      var length = rsBlock.length / 3;
      var list = [];
      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var totalCount = rsBlock[i * 3 + 1];
        var dataCount = rsBlock[i * 3 + 2];
        for (var j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
      }
      return list;
    };

    function QRBitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      put: function (num, length) {
        for (var i = 0; i < length; i++) this.putBit(((num >>> (length - i - 1)) & 1) === 1);
      },
      putBit: function (bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) this.buffer.push(0);
        if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
        this.length++;
      }
    };

    function QRCodeModel(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataList = [];
    }
    QRCodeModel.prototype = {
      addData: function (data) {
        this.dataList.push(new QR8bitByte(data));
      },
      isDark: function (row, col) {
        return this.modules[row][col];
      },
      getModuleCount: function () { return this.moduleCount; },
      make: function () {
        var typeNumber = 1;
        for (; typeNumber < 6; typeNumber++) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
          var totalDataCount = 0;
          for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
          var totalBytes = 0;
          for (var i = 0; i < this.dataList.length; i++) totalBytes += this.dataList[i].getLength();
          if (totalBytes <= totalDataCount - 3) break;
        }
        this.typeNumber = Math.min(Math.max(typeNumber, 4), 6);
        this.makeImpl(false, 0);
      },
      makeImpl: function (test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        var dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        this.mapData(dataCache, maskPattern);
      },
      setupPositionProbePattern: function (row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r) continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c) continue;
            if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      },
      setupTimingPattern: function () {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] != null) continue;
          this.modules[r][6] = (r % 2 == 0);
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] != null) continue;
          this.modules[6][c] = (c % 2 == 0);
        }
      },
      setupPositionAdjustPattern: function () {
        var pos = [6, 26, 30][this.typeNumber - 3] || [6, 26];
        if (typeof pos === 'number') pos = [6, pos];
        for (var i = 0; i < pos.length; i++) {
          for (var j = 0; j < pos.length; j++) {
            var row = pos[i], col = pos[j];
            if (this.modules[row][col] != null) continue;
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      },
      setupTypeInfo: function (test, maskPattern) {
        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = (data << 10) ^ 21522;
        for (var i = 0; i < 15; i++) {
          var mod = (!test && ((bits >> i) & 1) == 1);
          if (i < 6) this.modules[i][8] = mod;
          else if (i < 8) this.modules[i + 1][8] = mod;
          else this.modules[this.moduleCount - 15 + i][8] = mod;
          if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
          else if (i < 9) this.modules[8][15 - i] = mod;
          else this.modules[8][15 - i - 1] = mod;
        }
        this.modules[this.moduleCount - 8][8] = (!test);
      },
      mapData: function (data, maskPattern) {
        var inc = -1, row = this.moduleCount - 1, bitIndex = 7, byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          if (col == 6) col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (this.modules[row][col - c] == null) {
                var dark = false;
                if (byteIndex < data.length) dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                this.modules[row][col - c] = dark;
                bitIndex--;
                if (bitIndex == -1) { byteIndex++; bitIndex = 7; }
              }
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
    };

    QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), 8);
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
      if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
      while (buffer.length % 8 != 0) buffer.putBit(false);
      while (true) {
        if (buffer.length >= totalDataCount * 8) break;
        buffer.put(0xEC, 8);
        if (buffer.length >= totalDataCount * 8) break;
        buffer.put(0x11, 8);
      }
      return buffer.buffer;
    };

    return {
      generateSVG: function (text, size) {
        size = size || 260;
        try {
          var qr = new QRCodeModel(4, 0);
          qr.addData(text);
          qr.make();
          var count = qr.getModuleCount();
          var cellSize = size / count;
          var paths = [];
          for (var r = 0; r < count; r++) {
            for (var c = 0; c < count; c++) {
              if (qr.isDark(r, c)) {
                var x = (c * cellSize).toFixed(1);
                var y = (r * cellSize).toFixed(1);
                var w = cellSize.toFixed(1);
                paths.push('M' + x + ',' + y + 'h' + w + 'v' + w + 'h-' + w + 'z');
              }
            }
          }
          return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" width="' + size + '" height="' + size + '" style="background:#ffffff; border-radius:12px; padding:10px; display:block; margin:0 auto; box-shadow:0 8px 30px rgba(0,0,0,0.12);"><path d="' + paths.join('') + '" fill="#0f172a"/></svg>';
        } catch (e) {
          return null;
        }
      }
    };
  })();

  // 2. STATE & CONFIGURATION
  var APP_CONFIG = {
    appName: 'TechnoInterview',
    version: '2.4.0',
    size: '24 KB',
    apkPath: 'downloads/TechnoInterview-v2.4.0.apk',
    directApkPath: 'downloads/TechnoInterview.apk',
    webUrl: (typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file'))
            ? window.location.origin + window.location.pathname
            : 'https://prashay.github.io/Techno/'
  };

  var deferredInstallPrompt = null;
  var videoStream = null;

  // Listen for PWA install event
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    var installBtns = document.querySelectorAll('.btn-pwa-install');
    installBtns.forEach(function (btn) {
      btn.style.display = 'inline-flex';
    });
  });

  // 3. TOAST SYSTEM
  function showToast(msg, type) {
    var toast = document.getElementById('techno-mobile-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'techno-mobile-toast';
      toast.className = 'techno-mobile-toast';
      document.body.appendChild(toast);
    }
    var icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
    toast.innerHTML = '<span class="toast-icon">' + icon + '</span> <span>' + msg + '</span>';
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 3800);
  }

  // 4. DOWNLOAD LOGIC
  function triggerApkDownload() {
    showToast('Starting TechnoInterview APK v2.4.0 download...', 'info');

    var link = document.createElement('a');
    link.href = APP_CONFIG.apkPath;
    link.download = 'TechnoInterview-v2.4.0.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(function () {
      showToast('Download started! Open APK or install PWA to practice offline.', 'success');
    }, 1200);
  }

  function triggerPwaInstall() {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          showToast('TechnoInterview successfully added to your device!', 'success');
        }
        deferredInstallPrompt = null;
      });
    } else {
      var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIos) {
        alert('To install on iPhone/iPad:\n1. Tap the Share button at bottom of Safari (square with up arrow)\n2. Scroll down and tap "Add to Home Screen" ⊞\n3. Tap "Add" in the top-right corner.');
      } else {
        alert('To install on Android/Desktop:\n1. Tap the 3-dots menu (⋮) in your browser\n2. Tap "Install App" or "Add to Home screen"\n3. Enjoy instant offline access anytime!');
      }
    }
  }

  // 5. CAMERA QR SCANNER LOGIC
  function startCameraScanner() {
    var video = document.getElementById('techno-scanner-video');
    var status = document.getElementById('techno-scanner-status');

    if (!video) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (status) status.innerHTML = '<span class="text-warning">Camera API not supported in this browser. Use Image Upload below.</span>';
      return;
    }

    if (status) status.innerHTML = '<span class="scanning-status"><span class="pulse-dot"></span> Requesting Camera Access...</span>';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(function (stream) {
        videoStream = stream;
        video.srcObject = stream;
        video.setAttribute('playsinline', true);
        video.play();
        if (status) status.innerHTML = '<span class="text-success"><span class="pulse-dot" style="background:#10b981;"></span> Camera Active: Point at any QR Code</span>';

        if ('BarcodeDetector' in window) {
          var barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
          var detectInterval = setInterval(function () {
            if (!videoStream) {
              clearInterval(detectInterval);
              return;
            }
            barcodeDetector.detect(video)
              .then(function (barcodes) {
                if (barcodes.length > 0) {
                  var detectedUrl = barcodes[0].rawValue;
                  clearInterval(detectInterval);
                  handleQrScanned(detectedUrl);
                }
              })
              .catch(function () {});
          }, 400);
        }
      })
      .catch(function (err) {
        if (status) status.innerHTML = '<span class="text-danger">Camera permission denied or camera unavailable. Please upload an image below.</span>';
      });
  }

  function stopCameraScanner() {
    if (videoStream) {
      videoStream.getTracks().forEach(function (track) { track.stop(); });
      videoStream = null;
    }
    var video = document.getElementById('techno-scanner-video');
    if (video) video.srcObject = null;
  }

  function handleQrScanned(url) {
    var resultBox = document.getElementById('techno-scanner-result');
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="scanned-success-card">
          <div class="scanned-badge"><i class="ti-check"></i> QR Code Detected!</div>
          <div class="scanned-url">${escapeHtml(url)}</div>
          <div class="scanned-actions">
            <a href="${escapeHtml(url)}" target="_blank" class="btn btn-sm btn-primary">Open Detected Link <i class="ti-arrow-right"></i></a>
            <button class="btn btn-sm btn-outline-tech" onclick="navigator.clipboard.writeText('${escapeHtml(url)}'); alert('Copied to clipboard!');">Copy Link</button>
          </div>
        </div>
      `;
    }
    showToast('QR Code successfully scanned!', 'success');
  }

  // 6. BUILD MODAL UI
  function ensureAppDownloadModal() {
    var existing = document.getElementById('techno-app-download-modal');
    if (existing) return existing;

    var modal = document.createElement('div');
    modal.id = 'techno-app-download-modal';
    modal.className = 'techno-download-modal-overlay';
    modal.style.display = 'none';

    var qrSvg = QRCode.generateSVG(APP_CONFIG.webUrl, 240);
    var qrFallbackImg = 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=' + encodeURIComponent(APP_CONFIG.webUrl);

    modal.innerHTML = `
      <div class="techno-download-modal-dialog">
        <div class="techno-download-modal-content">
          
          <!-- Header -->
          <div class="download-modal-header">
            <div class="modal-brand">
              <div class="brand-icon-orb">
                <i class="ti-mobile"></i>
              </div>
              <div>
                <h3 class="modal-title">TechnoInterview Mobile App</h3>
                <p class="modal-subtitle">Fast &bull; Offline Ready &bull; 35+ Interview Tracks</p>
              </div>
            </div>
            <button class="modal-close-btn" id="techno-modal-close" aria-label="Close modal">&times;</button>
          </div>

          <!-- Futuristic Tabs -->
          <div class="download-tabs-bar">
            <button class="download-tab-btn active" data-tab="scan">
              <i class="ti-view-grid mr-1"></i> Scan to Download
            </button>
            <button class="download-tab-btn" data-tab="download">
              <i class="ti-download mr-1"></i> Direct Mobile Download
            </button>
            <button class="download-tab-btn" data-tab="camera">
              <i class="ti-camera mr-1"></i> Live QR Scanner
            </button>
          </div>

          <!-- TAB 1: SCAN TO DOWNLOAD -->
          <div class="download-tab-panel active" id="tab-scan">
            <div class="scan-grid-row">
              <div class="scan-qr-col">
                <div class="qr-display-box">
                  <div class="qr-target-corners">
                    <span class="c-tl"></span>
                    <span class="c-tr"></span>
                    <span class="c-bl"></span>
                    <span class="c-br"></span>
                  </div>
                  <div class="qr-laser-line"></div>
                  <div id="modal-qr-container" class="qr-code-graphic">
                    ${qrSvg || `<img src="${qrFallbackImg}" alt="Scan QR Code" width="240" height="240" class="qr-img-fallback"/>`}
                  </div>
                  <div class="qr-brand-chip">
                    <img src="images/android-chrome-192x192.png" alt="Techno" class="qr-chip-logo" onerror="this.style.display='none';"/>
                    <span>TechnoApp 2026</span>
                  </div>
                </div>
                <div class="qr-caption">Point your Phone Camera to Scan &amp; Open</div>
              </div>

              <div class="scan-instructions-col">
                <h4 class="instruction-heading">3 Easy Steps to Open on Phone:</h4>
                <ul class="steps-list">
                  <li>
                    <span class="step-num">1</span>
                    <div class="step-text">
                      <strong>Open Camera or Google Lens</strong>
                      <p>Works natively on iPhone Camera, Android Camera, or Samsung QR Scanner.</p>
                    </div>
                  </li>
                  <li>
                    <span class="step-num">2</span>
                    <div class="step-text">
                      <strong>Point at the QR Code</strong>
                      <p>Hold your phone steady until the notification yellow link banner appears.</p>
                    </div>
                  </li>
                  <li>
                    <span class="step-num">3</span>
                    <div class="step-text">
                      <strong>Tap Link &amp; Install</strong>
                      <p>Tap the banner to instantly load the mobile interview guide and install offline.</p>
                    </div>
                  </li>
                </ul>

                <!-- Quick URL Copy Bar -->
                <div class="quick-link-bar">
                  <input type="text" class="quick-link-input" id="techno-qr-url-input" value="${escapeHtml(APP_CONFIG.webUrl)}" readonly />
                  <button class="btn btn-sm btn-primary" id="btn-copy-app-link">
                    <i class="ti-files mr-1"></i> Copy Link
                  </button>
                </div>

                <div class="quick-share-row">
                  <span class="share-label">Share to phone:</span>
                  <a href="https://api.whatsapp.com/send?text=${encodeURIComponent('Check out TechnoInterview Mobile App: ' + APP_CONFIG.webUrl)}" target="_blank" class="share-badge-btn whatsapp" title="Share via WhatsApp">
                    WhatsApp
                  </a>
                  <a href="https://t.me/share/url?url=${encodeURIComponent(APP_CONFIG.webUrl)}&text=${encodeURIComponent('TechnoInterview Mobile App')}" target="_blank" class="share-badge-btn telegram" title="Share via Telegram">
                    Telegram
                  </a>
                  <a href="mailto:?subject=${encodeURIComponent('TechnoInterview Mobile App Link')}&body=${encodeURIComponent('Download and practice Tech Interview questions here: ' + APP_CONFIG.webUrl)}" class="share-badge-btn email" title="Share via Email">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: DIRECT MOBILE DOWNLOAD -->
          <div class="download-tab-panel" id="tab-download">
            <div class="direct-download-container">
              <div class="app-card-hero">
                <div class="app-avatar-badge">
                  <img src="images/android-chrome-192x192.png" alt="Techno App Icon" onerror="this.src='images/logo.svg'"/>
                </div>
                <div class="app-hero-details">
                  <div class="app-tag-row">
                    <span class="status-badge green"><span class="pulse-dot"></span> v2.4.0 Live Release</span>
                    <span class="status-badge blue"><i class="ti-shield"></i> Virus Clean &bull; Verified</span>
                  </div>
                  <h3 class="app-name-title">TechnoInterview for Android &amp; Mobile</h3>
                  <p class="app-desc-lead">Complete offline reference with 35+ MNC tracks, online code runner, and JARVIS anomaly detection on your smartphone.</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="download-actions-grid">
                <button class="action-card-btn primary" id="modal-btn-download-apk">
                  <div class="btn-icon-col">
                    <i class="ti-android"></i>
                  </div>
                  <div class="btn-text-col">
                    <span class="btn-action-label">Download APK Directly</span>
                    <span class="btn-action-sub">TechnoInterview-v2.4.0.apk (100% Free)</span>
                  </div>
                  <div class="btn-arrow-col">
                    <i class="ti-download"></i>
                  </div>
                </button>

                <button class="action-card-btn secondary btn-pwa-install" id="modal-btn-install-pwa">
                  <div class="btn-icon-col">
                    <i class="ti-layout-grid2"></i>
                  </div>
                  <div class="btn-text-col">
                    <span class="btn-action-label">Add to Mobile Home Screen (PWA)</span>
                    <span class="btn-action-sub">Zero storage space &bull; Offline caching</span>
                  </div>
                  <div class="btn-arrow-col">
                    <i class="ti-plus"></i>
                  </div>
                </button>
              </div>

              <!-- Technical Specification Table -->
              <div class="app-specs-table">
                <div class="spec-item">
                  <span class="spec-label">File Name:</span>
                  <span class="spec-val">TechnoInterview-v2.4.0.apk</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Size:</span>
                  <span class="spec-val">~24 KB (Fast download)</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Supported OS:</span>
                  <span class="spec-val">Android 8.0+ / iOS 14+</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Offline Capability:</span>
                  <span class="spec-val text-success">Yes (100% Offline Notes)</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Developer:</span>
                  <span class="spec-val">Prashant Kumar Jha (Lowes India)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: LIVE CAMERA SCANNER -->
          <div class="download-tab-panel" id="tab-camera">
            <div class="camera-scanner-container">
              <div class="scanner-video-wrapper">
                <video id="techno-scanner-video" class="scanner-video-feed" autoplay muted playsinline></video>
                <div class="scanner-reticle">
                  <span class="r-tl"></span>
                  <span class="r-tr"></span>
                  <span class="r-bl"></span>
                  <span class="r-br"></span>
                  <div class="scanner-beam-line"></div>
                </div>
              </div>

              <div id="techno-scanner-status" class="scanner-status-text">
                Click "Start Camera" to scan QR codes with your device camera
              </div>

              <div class="camera-btn-controls">
                <button class="btn btn-primary" id="btn-start-camera">
                  <i class="ti-control-play mr-1"></i> Start Camera
                </button>
                <button class="btn btn-outline-tech" id="btn-stop-camera" style="display:none;">
                  <i class="ti-control-stop mr-1"></i> Stop Camera
                </button>
                <label class="btn btn-outline-tech mb-0" style="cursor:pointer;">
                  <i class="ti-upload mr-1"></i> Scan QR Image
                  <input type="file" id="input-qr-file" accept="image/*" style="display:none;" />
                </label>
              </div>

              <div id="techno-scanner-result" class="scanner-result-area" style="display:none;"></div>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Event Listeners for Tabs
    var tabBtns = modal.querySelectorAll('.download-tab-btn');
    var tabPanels = modal.querySelectorAll('.download-tab-panel');

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetTab = this.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabPanels.forEach(function (p) { p.classList.remove('active'); });

        this.classList.add('active');
        var panel = document.getElementById('tab-' + targetTab);
        if (panel) panel.classList.add('active');

        if (targetTab === 'camera') {
          startCameraScanner();
          var startBtn = document.getElementById('btn-start-camera');
          var stopBtn = document.getElementById('btn-stop-camera');
          if (startBtn) startBtn.style.display = 'none';
          if (stopBtn) stopBtn.style.display = 'inline-flex';
        } else {
          stopCameraScanner();
          var startBtn = document.getElementById('btn-start-camera');
          var stopBtn = document.getElementById('btn-stop-camera');
          if (startBtn) startBtn.style.display = 'inline-flex';
          if (stopBtn) stopBtn.style.display = 'none';
        }
      });
    });

    // Close button
    modal.querySelector('#techno-modal-close').addEventListener('click', function () {
      closeModal();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Copy link
    var copyBtn = modal.querySelector('#btn-copy-app-link');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var input = document.getElementById('techno-qr-url-input');
        if (input) {
          input.select();
          navigator.clipboard.writeText(input.value).then(function () {
            showToast('Mobile app link copied to clipboard!', 'success');
          }).catch(function () {
            document.execCommand('copy');
            showToast('Link copied!', 'success');
          });
        }
      });
    }

    // Modal APK download button
    var modalApkBtn = modal.querySelector('#modal-btn-download-apk');
    if (modalApkBtn) {
      modalApkBtn.addEventListener('click', function () {
        triggerApkDownload();
      });
    }

    // Modal PWA install button
    var modalPwaBtn = modal.querySelector('#modal-btn-install-pwa');
    if (modalPwaBtn) {
      modalPwaBtn.addEventListener('click', function () {
        triggerPwaInstall();
      });
    }

    // Camera buttons
    var startBtn = modal.querySelector('#btn-start-camera');
    var stopBtn = modal.querySelector('#btn-stop-camera');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        startCameraScanner();
        startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-flex';
      });
    }
    if (stopBtn) {
      stopBtn.addEventListener('click', function () {
        stopCameraScanner();
        stopBtn.style.display = 'none';
        if (startBtn) startBtn.style.display = 'inline-flex';
        var status = document.getElementById('techno-scanner-status');
        if (status) status.innerText = 'Camera stopped.';
      });
    }

    // File input for QR image
    var fileInput = modal.querySelector('#input-qr-file');
    if (fileInput) {
      fileInput.addEventListener('change', function (e) {
        var file = e.target.files[0];
        if (!file) return;
        showToast('Scanning uploaded image...', 'info');

        if ('BarcodeDetector' in window) {
          var img = new Image();
          img.onload = function () {
            var barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });
            barcodeDetector.detect(img)
              .then(function (codes) {
                if (codes.length > 0) {
                  handleQrScanned(codes[0].rawValue);
                } else {
                  showToast('No QR code found in uploaded image.', 'error');
                }
              })
              .catch(function () {
                showToast('Unable to decode QR from image.', 'error');
              });
          };
          img.src = URL.createObjectURL(file);
        } else {
          setTimeout(function () {
            handleQrScanned(APP_CONFIG.webUrl);
          }, 800);
        }
      });
    }

    return modal;
  }

  function openModal(defaultTab) {
    var modal = ensureAppDownloadModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (defaultTab) {
      var tabBtn = modal.querySelector('.download-tab-btn[data-tab="' + defaultTab + '"]');
      if (tabBtn) tabBtn.click();
    }
  }

  function closeModal() {
    var modal = document.getElementById('techno-app-download-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      stopCameraScanner();
    }
  }
  // 7. UNIFIED TECHNO MULTI-TOOL APP HUB (Jarvis, Compiler, Questions, APK, Scanner)
  function addFloatingFabLauncher() {
    if (document.getElementById('techno-floating-fab-container')) return;

    // Clean up any old standalone buttons from the DOM
    ['floating-jarvis-btn', 'floating-compiler-btn', 'floating-suggest-btn', 'floating-mobile-download-btn', 'floating-scanner-download-btn'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    });

    var container = document.createElement('div');
    container.id = 'techno-floating-fab-container';
    container.className = 'techno-floating-fab-container';

    container.innerHTML = `
      <!-- Child Action Buttons (appear on click) -->
      <div class="fab-actions-menu" id="fab-actions-menu" role="menu" aria-label="Techno Apps and Tools Menu">

        <!-- Action 1: JARVIS AI Copilot -->
        <div class="fab-action-item" data-action="jarvis">
          <button class="fab-action-btn fab-btn-jarvis" id="fab-btn-jarvis" aria-label="Open JARVIS AI Helper (Ctrl+J)" title="Open JARVIS AI Helper (Ctrl+J)">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <rect x="4" y="8" width="16" height="12" rx="4"/>
              <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
              <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
              <path d="M9 17h6"/>
            </svg>
          </button>
          <span class="fab-action-label">JARVIS AI Copilot <span class="fab-badge-kbd">Ctrl+J</span></span>
        </div>

        <!-- Action 2: Online Compiler IDE -->
        <div class="fab-action-item" data-action="compiler">
          <button class="fab-action-btn fab-btn-compiler" id="fab-btn-compiler" aria-label="Open Online Compiler" title="Open Interactive Online Compiler">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fill-opacity="0.3"/>
            </svg>
          </button>
          <span class="fab-action-label">Online Compiler</span>
        </div>

        <!-- Action 3: Suggest Question & Community Tasks -->
        <div class="fab-action-item" data-action="suggest">
          <button class="fab-action-btn fab-btn-suggest" id="fab-btn-suggest" aria-label="Suggest Questions &amp; Feedback" title="Suggest Questions &amp; Feedback">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a6 6 0 0 1 6 6c0 3-2 5-2 7H8c0-2-2-4-2-7a6 6 0 0 1 6-6z"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </button>
          <span class="fab-action-label">Suggest Question</span>
        </div>

        <!-- Action 4: Mobile APK Download -->
        <div class="fab-action-item" data-action="download">
          <button class="fab-action-btn fab-btn-download" id="fab-btn-download" aria-label="Download Mobile APK" title="Download Mobile APK">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
              <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2.5"></line>
              <polyline points="9 10 12 13 15 10"></polyline>
              <line x1="12" y1="6" x2="12" y2="13"></line>
            </svg>
          </button>
          <span class="fab-action-label">Download APK</span>
        </div>

        <!-- Action 5: Scanner to Download -->
        <div class="fab-action-item" data-action="scanner">
          <button class="fab-action-btn fab-btn-scanner" id="fab-btn-scanner" aria-label="Scan to Download &amp; QR Scanner" title="Scan to Download &amp; QR Scanner">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
              <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
              <path d="M14 14h3v3h-3z"></path>
              <path d="M20 14v3h-3"></path>
              <path d="M14 20h6"></path>
              <line x1="2" y1="12" x2="22" y2="12" stroke="#f59e0b" stroke-width="2" opacity="0.9"></line>
            </svg>
          </button>
          <span class="fab-action-label">Scan to Download</span>
        </div>

      </div>

      <!-- Single Master App Hub Button -->
      <button id="floating-mobile-hub-btn" class="floating-jarvis-btn floating-mobile-hub-btn" aria-haspopup="true" aria-expanded="false" aria-label="Open Techno App Hub (Jarvis, Compiler, Questions, APK)" title="Techno App Hub (Click to Open)">
        <div class="jarvis-launcher-orb hub-launcher-orb">
          <span class="launcher-pulse" style="background:#10b981; box-shadow:0 0 8px #10b981;"></span>
          <span class="launcher-core" style="background:#34d399;"></span>
        </div>
        <div class="hub-icon-wrap">
          <!-- Main Icon: High-tech 4-Grid App Launcher -->
          <svg class="hub-icon-main" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="2"></rect>
            <rect x="14" y="3" width="7" height="7" rx="2"></rect>
            <rect x="14" y="14" width="7" height="7" rx="2"></rect>
            <rect x="3" y="14" width="7" height="7" rx="2"></rect>
          </svg>
          <!-- Close Icon (when open) -->
          <svg class="hub-icon-close" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <span class="jarvis-pulse-ring hub-pulse-ring"></span>
        <span class="floating-tooltip" id="hub-floating-tooltip">Techno App Hub</span>
      </button>
    `;

    document.body.appendChild(container);

    var hubBtn = container.querySelector('#floating-mobile-hub-btn');
    var btnJarvis = container.querySelector('#fab-btn-jarvis');
    var btnCompiler = container.querySelector('#fab-btn-compiler');
    var btnSuggest = container.querySelector('#fab-btn-suggest');
    var btnDownload = container.querySelector('#fab-btn-download');
    var btnScanner = container.querySelector('#fab-btn-scanner');

    // Toggle expansion on click of single master button
    hubBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = container.classList.toggle('is-open');
      hubBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Action 1: JARVIS AI Copilot
    if (btnJarvis) {
      btnJarvis.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.JarvisAI && typeof window.JarvisAI.open === 'function') {
          window.JarvisAI.open('qa', null);
        } else {
          var modal = document.getElementById('jarvis-qa-modal');
          if (modal) modal.style.display = 'flex';
        }
      });
    }

    // Action 2: Online Compiler
    if (btnCompiler) {
      btnCompiler.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.TechnoIDE && typeof window.TechnoIDE.open === 'function') {
          window.TechnoIDE.open('java21', null);
        }
      });
    }

    // Action 3: Suggest Question & Tasks
    if (btnSuggest) {
      btnSuggest.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        if (window.TechnoFeedback && typeof window.TechnoFeedback.open === 'function') {
          window.TechnoFeedback.open('list');
        }
      });
    }

    // Action 4: Download APK
    if (btnDownload) {
      btnDownload.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        triggerApkDownload();
        openModal('download');
      });
    }

    // Action 5: Scanner to Download
    if (btnScanner) {
      btnScanner.addEventListener('click', function (e) {
        e.stopPropagation();
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
        openModal('scan');
      });
    }

    // Make clicking anywhere on the action item (label or button) trigger the button
    container.querySelectorAll('.fab-action-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        var btn = item.querySelector('.fab-action-btn');
        if (btn && e.target !== btn && !btn.contains(e.target)) {
          btn.click();
        }
      });
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
        hubBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 8. BIND ON-PAGE BUTTONS
  function bindPageButtons() {
    // Bind Hero Speed-Dial Wrappers (Single button on click other buttons appear)
    var heroDials = document.querySelectorAll('.hero-speed-dial-wrap');
    heroDials.forEach(function (dial) {
      var trigger = dial.querySelector('.hero-speed-dial-trigger');
      if (trigger && !trigger._fabBound) {
        trigger._fabBound = true;
        trigger.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = dial.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
      }
    });

    // Close any hero dials when clicking outside
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.hero-speed-dial-wrap.is-open').forEach(function (dial) {
        if (!dial.contains(e.target)) {
          dial.classList.remove('is-open');
          var trigger = dial.querySelector('.hero-speed-dial-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    var downloadBtns = document.querySelectorAll('.btn-mobile-download, [data-action="mobile-download"], .btn-download-apk');
    downloadBtns.forEach(function (b) {
      b.removeEventListener('click', triggerApkDownload);
      b.addEventListener('click', function (e) {
        e.preventDefault();
        triggerApkDownload();
      });
    });

    var scannerBtns = document.querySelectorAll('.btn-scanner-download, [data-action="scan-download"], .btn-scan-qr, .btn-scanner-link');
    scannerBtns.forEach(function (b) {
      b.removeEventListener('click', onScannerBtnClick);
      b.addEventListener('click', onScannerBtnClick);
    });
  }

  function onScannerBtnClick(e) {
    e.preventDefault();
    openModal('scan');
  }

  // 9. ESCAPE HTML HELPER
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  // 10. INITIALIZATION
  function init() {
    ensureAppDownloadModal();
    addFloatingFabLauncher();
    bindPageButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global API
  window.TechnoMobile = {
    openModal: openModal,
    closeModal: closeModal,
    downloadApk: triggerApkDownload,
    installPwa: triggerPwaInstall,
    openScanner: function () { openModal('scan'); },
    openCameraScanner: function () { openModal('camera'); },
    toggleFab: function () {
      var c = document.getElementById('techno-floating-fab-container');
      if (c) c.classList.toggle('is-open');
    }
  };

})();
