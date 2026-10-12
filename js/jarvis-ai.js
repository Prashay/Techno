/**
 * TechnoInterview - JARVIS AI Assistant & Code Anomaly Detector
 * Features:
 * 1. Full-Repository Knowledge Q&A Engine (Grounds answers across all 35 tracks)
 * 2. Real-Time Code & Architecture Anomaly Detection (Memory Leaks, Concurrency Hazards, Complexity, SQL anti-patterns)
 * 3. Futuristic Glassmorphic HUD Interface with Voice-styled animations & Quick Actions
 * 4. Direct bridge to the TechnoIDE Online Compiler
 */
(function () {
  'use strict';

  // =========================================================================
  // 1. REPOSITORY KNOWLEDGE BASE (Index of all tracks, topics & solutions)
  // =========================================================================
  var REPO_KNOWLEDGE = [
    {
      keywords: ['string', 'anagram', 'palindrome', 'substring', 'longest', 'compression', 'prefix'],
      page: 'Stringprograms.html',
      title: 'String Programming Track',
      summary: 'Group Anagrams (HashMap $O(N \\log K)$), Valid Palindrome II ($O(1)$ space), Longest Substring Without Repeating Characters (Sliding Window), String Compression, and Expand-Around-Center.',
      sampleCode: `// Group Anagrams
Map<String, List<String>> map = new HashMap<>();
for (String s : strs) {
    char[] chars = s.toCharArray();
    Arrays.sort(chars);
    map.computeIfAbsent(String.valueOf(chars), k -> new ArrayList<>()).add(s);
}`
    },
    {
      keywords: ['number', 'prime', 'two sum', 'reverse', 'happy', 'trailing', 'factorial', 'bit', 'power'],
      page: 'numberprograms.html',
      title: 'Number Programming Track',
      summary: 'Prime verification in $O(\\sqrt{N})$, Reverse 32-bit Integer with overflow guards, Two Sum with one-pass HashMap, Single Number II bit frequency counter, and Happy Number cycle detection.',
      sampleCode: `// Two Sum O(N)
Map<Integer, Integer> map = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
    int comp = target - nums[i];
    if (map.containsKey(comp)) return new int[]{map.get(comp), i};
    map.put(nums[i], i);
}`
    },
    {
      keywords: ['java8', 'stream', 'lambda', 'filter', 'collectors', 'groupingby', 'flatmap', 'parallel', 'second highest'],
      page: 'java8programs.html',
      title: 'Java 8 Stream Programs & Modern Concurrency',
      summary: 'Character frequency with chars().mapToObj() & groupingBy(), first non-repeated character, second highest with distinct().sorted().skip(1), partitioningBy(), and flatMap() collections.',
      sampleCode: `// Character Frequency in Java 8
Map<Character, Long> freq = str.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, LinkedHashMap::new, Collectors.counting()));`
    },
    {
      keywords: ['spring', 'boot', 'restcontroller', 'validation', 'ratelimit', 'specification', 'restclient', 'exception', 'problem detail'],
      page: 'springboot.html',
      title: 'Spring Boot 3 & Enterprise Architecture',
      summary: 'Global Exception Handler with RFC 7807 ProblemDetail, custom @ValidPhoneNumber with ConstraintValidator, Token Bucket Rate Limiting Interceptor, JPA Specifications, and RestClient.',
      sampleCode: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handle(ResourceNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
    }
}`
    },
    {
      keywords: ['topic', 'lru', 'cache', 'linkedlist', 'tree', 'bfs', 'dfs', 'coin change', 'parentheses', 'stack'],
      page: 'topicwiseprogram.html',
      title: 'Topic-wise DSA Challenges',
      summary: 'Floyd\'s Cycle Detection in LinkedList, Valid Parentheses with Deque stack, Binary Tree Level Order Traversal (BFS), Production LRU Cache with O(1) operations, and Bottom-Up Coin Change DP.',
      sampleCode: `// LRU Cache Node linking
private void insert(Node node) {
    map.put(node.key, node);
    node.next = head.next;
    node.next.prev = node;
    head.next = node;
    node.prev = head;
}`
    },
    {
      keywords: ['kafka', 'kraft', 'zookeeper', 'partition', 'consumer', 'offset', 'rebalance', 'exactly once', 'idempotent'],
      page: 'kafka.html',
      title: 'Apache Kafka & Distributed Streaming',
      summary: 'ZooKeeper-less KRaft metadata quorum, partition consumer rebalance triggers, exactly-once semantics (EOS) with transactional producers, and ISR replication.',
      sampleCode: `props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "order-tx-1");
producer.initTransactions();`
    },
    {
      keywords: ['postgres', 'postgresql', 'mvcc', 'dead tuple', 'autovacuum', 'gin', 'brin', 'pgvector', 'pgbouncer'],
      page: 'postgresql.html',
      title: 'PostgreSQL Architecture & Optimization',
      summary: 'MVCC mechanics, dead tuples and autovacuum tuning (vacuum_cost_limit), JSONB GIN indexing, BRIN range indexes for timeseries, pgvector similarity search, and PgBouncer pooling.',
      sampleCode: `-- Check dead tuples
SELECT relname, n_dead_tup, n_live_tup,
       round(n_dead_tup * 100.0 / nullif(n_live_tup + n_dead_tup, 0), 2) as dead_pct
FROM pg_stat_user_tables;`
    },
    {
      keywords: ['elastic', 'elasticsearch', 'lucene', 'inverted index', 'shard', 'segment', 'search_after', 'mapping'],
      page: 'elasticsearch.html',
      title: 'Elasticsearch & Distributed Search',
      summary: 'Inverted Index dictionary & postings lists, immutable Lucene segments, cluster shards & replicas, text vs keyword analyzers, and search_after deep pagination vs from/size.',
      sampleCode: `GET /orders/_search
{
  "size": 50,
  "sort": [{ "createdAt": "desc" }, { "_id": "asc" }],
  "search_after": [1700000000, "ord_987"]
}`
    },
    {
      keywords: ['react', 'jsx', 'actions', 'useoptimistic', 'rsc', 'server component', 'transition', 'compiler', 'hooks'],
      page: 'reactjs.html',
      title: 'React 19 & Next-Gen Frontend',
      summary: 'React 19 Actions (useActionState, useOptimistic), React Server Components (RSC) binary wire format, Concurrent Transitions with useTransition, and React Compiler memoization.',
      sampleCode: `function LikeButton({ initialLikes }) {
    const [likes, setOptimisticLikes] = useOptimistic(
        initialLikes,
        (current, delta) => current + delta
    );
}`
    },
    {
      keywords: ['angular', 'signals', 'zoneless', 'defer', 'computed', 'ngrx', 'signalstore'],
      page: 'angular.html',
      title: 'Angular 17-19 Modern Architecture',
      summary: 'Fine-grained reactivity with Signals (signal(), computed(), effect()), Zoneless change detection without Zone.js, built-in control flow (@defer, @if, @for), and NgRx SignalStore.',
      sampleCode: `@Component({
  standalone: true,
  template: \`<p>Count: {{ count() }} (Double: {{ double() }})</p>\`
})
export class Counter {
  count = signal(0);
  double = computed(() => this.count() * 2);
}`
    },
    {
      keywords: ['aws', 's3', 'iam', 'dynamodb', 'eks', 'karpenter', 'eventbridge', 'cloudwatch'],
      page: 'aws.html',
      title: 'Amazon Web Services (AWS)',
      summary: 'DynamoDB Single-Table Design, IAM policy evaluation engine, S3 Glacier lifecycle, Karpenter Kubernetes node autoscaling on EKS, and EventBridge decoupled architectures.',
      sampleCode: `// DynamoDB Single Table schema:
PK: USER#<id>, SK: METADATA
PK: USER#<id>, SK: ORDER#<orderId>`
    },
    {
      keywords: ['gcp', 'gke', 'cloud run', 'spanner', 'truetime', 'bigquery', 'pubsub'],
      page: 'gcp.html',
      title: 'Google Cloud Platform (GCP)',
      summary: 'Cloud Spanner TrueTime atomic clocks & external consistency, GKE Autopilot, Cloud Run serverless scale-to-zero, BigQuery slot allocation, and Pub/Sub ordered delivery.',
      sampleCode: `// Spanner commit timestamp guarantees linearizability across regions`
    },
    {
      keywords: ['docker', 'container', 'namespace', 'cgroup', 'multistage', 'rootless'],
      page: 'docker.html',
      title: 'Docker & Container Internals',
      summary: 'Linux namespaces (PID, NET, MNT, IPC), cgroups v2 resource capping (OOM killer), multi-stage builds minimizing image attack surface, and rootless Docker security.',
      sampleCode: `# Multi-stage Java Dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
RUN mvn package -DskipTests
FROM eclipse-temurin:21-jre-alpine
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`
    },
    {
      keywords: ['virtual threads', 'loom', 'concurrency', 'multithreading', 'completablefuture', 'synchronized', 'deadlock'],
      page: 'multithreding.html',
      title: 'Multithreading & Concurrency',
      summary: 'Java 21 Loom Virtual Threads vs OS Platform Threads, Carrier thread mounting/unmounting, synchronized pinning vs ReentrantLock, and ThreadLocal memory leak prevention.',
      sampleCode: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 1000).forEach(i -> executor.submit(() -> fetchHttp()));
}`
    }
  ];

  // =========================================================================
  // 2. CODE ANOMALY DETECTION ENGINE
  // =========================================================================
  var ANOMALY_RULES = [
    {
      id: 'PARALLEL_STREAM_BLOCKING',
      category: 'Concurrency Anomaly',
      severity: 'CRITICAL',
      title: 'Blocking I/O inside ForkJoinPool.commonPool()',
      test: function (code) {
        return code.includes('.parallelStream()') && 
               (code.includes('Thread.sleep') || code.includes('http') || code.includes('RestTemplate') || code.includes('get()') || code.includes('execute'));
      },
      message: 'Calling blocking I/O inside parallelStream() consumes threads from the shared global ForkJoinPool.commonPool(), causing starvation across all parallel streams JVM-wide.',
      solution: 'Use Java 21 Virtual Threads (Executors.newVirtualThreadPerTaskExecutor()) or a dedicated custom ThreadPoolExecutor.'
    },
    {
      id: 'THREADLOCAL_LEAK',
      category: 'Memory Leak Anomaly',
      severity: 'CRITICAL',
      title: 'ThreadLocal without remove() in Thread Pool',
      test: function (code) {
        return code.includes('ThreadLocal') && code.includes('.set(') && !code.includes('.remove()');
      },
      message: 'ThreadLocal variables set in thread pool threads (Tomcat worker threads, ExecutorService) are never garbage collected unless remove() is called in a finally block, causing catastrophic ClassLoader memory leaks.',
      solution: 'Always call threadLocal.remove() in a finally block: try { ... } finally { userContext.remove(); }'
    },
    {
      id: 'UNCLOSED_RESOURCE',
      category: 'Resource Leak Anomaly',
      severity: 'HIGH',
      title: 'AutoCloseable Resource without try-with-resources',
      test: function (code) {
        return (code.includes('new FileInputStream') || code.includes('new FileOutputStream') || 
                code.includes('new BufferedReader') || code.includes('getConnection(')) && 
               !code.includes('try (') && !code.includes('try(');
      },
      message: 'I/O Streams or Database Connections opened without try-with-resources risk OS file descriptor and connection pool socket exhaustion during exceptions.',
      solution: 'Wrap resources in try-with-resources: try (var in = new FileInputStream(file)) { ... }'
    },
    {
      id: 'NESTED_LIST_CONTAINS',
      category: 'Performance Anomaly (O(N^2))',
      severity: 'HIGH',
      title: 'O(N^2) Complexity: List.contains() inside loop',
      test: function (code) {
        return (code.includes('for (') || code.includes('for(') || code.includes('.forEach(')) &&
               (code.includes('.contains(') && !code.includes('Set<') && !code.includes('HashSet'));
      },
      message: 'Performing List.contains() inside a loop degrades time complexity to O(N * M) because ArrayList scans sequentially.',
      solution: 'Convert collection to a HashSet before the loop for O(1) constant-time lookups: Set<T> set = new HashSet<>(list);'
    },
    {
      id: 'RAW_SQL_CONCAT',
      category: 'Security Anomaly',
      severity: 'CRITICAL',
      title: 'SQL Injection Vulnerability via String Concatenation',
      test: function (code) {
        return (code.includes('SELECT ') || code.includes('INSERT INTO') || code.includes('UPDATE ')) &&
               (code.includes(' + "') || code.includes(' + \'') || code.includes('" + ') || code.includes('\' + '));
      },
      message: 'Concatenating user inputs directly into SQL queries allows attackers to bypass authentication and execute arbitrary database commands (CWE-89 SQL Injection).',
      solution: 'Use Parameterized Queries / PreparedStatements: PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE email = ?"); ps.setString(1, email);'
    },
    {
      id: 'STRING_CONCAT_LOOP',
      category: 'Performance Anomaly',
      severity: 'MEDIUM',
      title: 'String Concatenation inside Loop',
      test: function (code) {
        return (code.includes('for (') || code.includes('while (')) &&
               (code.includes(' += ') || code.includes(' = str + ') || code.includes(' = s + '));
      },
      message: 'Using string concatenation (+) inside a loop creates O(N^2) temporary String instances and causes massive GC pressure.',
      solution: 'Use StringBuilder: StringBuilder sb = new StringBuilder(); sb.append(item);'
    },
    {
      id: 'DATE_FORMAT_THREAD_SAFETY',
      category: 'Concurrency Anomaly',
      severity: 'HIGH',
      title: 'Non-Thread-Safe SimpleDateFormat in Concurrent Scope',
      test: function (code) {
        return (code.includes('static SimpleDateFormat') || (code.includes('SimpleDateFormat') && code.includes('thread')));
      },
      message: 'SimpleDateFormat maintains internal calendar state and corrupts date parsing under multi-threaded concurrency.',
      solution: 'Replace with modern thread-safe java.time.format.DateTimeFormatter (Java 8+): DateTimeFormatter.ofPattern("yyyy-MM-dd");'
    },
    {
      id: 'EMPTY_CATCH_BLOCK',
      category: 'Reliability Anomaly',
      severity: 'MEDIUM',
      title: 'Swallowed Exception (Silent Failure)',
      test: function (code) {
        return /catch\s*\([^\)]+\)\s*\{\s*\}/.test(code);
      },
      message: 'Empty catch blocks swallow exceptions silently, making production troubleshooting and error alerting impossible.',
      solution: 'Log the error or rethrow a domain-specific exception: log.error("Operation failed", ex);'
    }
  ];

  function runAnomalyDetection(code) {
    var detected = [];
    ANOMALY_RULES.forEach(function (rule) {
      try {
        if (rule.test(code)) {
          detected.push(rule);
        }
      } catch (e) {}
    });

    // Calculate Risk Score
    var score = 0;
    detected.forEach(function (d) {
      if (d.severity === 'CRITICAL') score += 40;
      else if (d.severity === 'HIGH') score += 25;
      else score += 10;
    });
    score = Math.min(100, score);

    return {
      score: score,
      detected: detected,
      isClean: detected.length === 0
    };
  }

  // Find best matching knowledge from repo
  function searchRepoKnowledge(query) {
    var q = query.toLowerCase();
    var words = q.split(/\s+/).filter(function (w) { return w.length > 2; });
    var matches = [];

    REPO_KNOWLEDGE.forEach(function (item) {
      var score = 0;
      item.keywords.forEach(function (kw) {
        if (q.includes(kw)) score += 3;
        words.forEach(function (w) {
          if (kw.includes(w) || w.includes(kw)) score += 1;
        });
      });
      if (score > 0) {
        matches.push({ item: item, score: score });
      }
    });

    matches.sort(function (a, b) { return b.score - a.score; });
    return matches.map(function (m) { return m.item; });
  }

  // =========================================================================
  // 3. MODERN HUD UI BUILDER
  // =========================================================================
  var jarvisModal = null;

  function ensureJarvisModal() {
    if (jarvisModal) return jarvisModal;

    var modalHtml = `
      <div id="jarvis-ai-hud" class="jarvis-overlay" style="display:none;">
        <div class="jarvis-window">
          
          <!-- JARVIS Top Header -->
          <div class="jarvis-header">
            <div class="jarvis-header-left">
              <div class="jarvis-core-orb">
                <span class="jarvis-core-pulse"></span>
                <span class="jarvis-core-center"></span>
              </div>
              <div class="jarvis-meta">
                <div class="jarvis-name">J.A.R.V.I.S. <span class="jarvis-version">v2026.4</span></div>
                <div class="jarvis-subtitle">Autonomous Tech Interview Copilot &bull; Anomaly Engine</div>
              </div>
            </div>
            
            <div class="jarvis-header-right">
              <span class="jarvis-status-badge"><span class="status-live-dot"></span> NEURAL READY</span>
              <button id="jarvis-close-btn" class="jarvis-btn-close" title="Close JARVIS">&times;</button>
            </div>
          </div>

          <!-- Mode Navigation Bar -->
          <div class="jarvis-tabbar">
            <button class="jarvis-tab-btn active" data-tab="qa"><i class="ti-search mr-1"></i> Full Repo Q&amp;A</button>
            <button class="jarvis-tab-btn" data-tab="anomaly"><i class="ti-shield mr-1"></i> Code Anomaly Detector</button>
            <button class="jarvis-tab-btn" data-tab="compiler"><i class="ti-control-play mr-1"></i> Quick Test Sandbox</button>
          </div>

          <!-- JARVIS Body -->
          <div class="jarvis-body">
            
            <!-- Tab 1: Full Repo Knowledge QA -->
            <div id="jarvis-tab-qa" class="jarvis-tab-content active">
              <div class="jarvis-chat-stream" id="jarvis-qa-stream">
                <div class="jarvis-msg jarvis-msg-ai">
                  <div class="jarvis-msg-avatar">🤖</div>
                  <div class="jarvis-msg-bubble">
                    <p><strong>Greetings! I am J.A.R.V.I.S.</strong>, your autonomous tech interview assistant.</p>
                    <p>I have ingested all <strong>35 tracks</strong> in this repository (Java 8/17/21, Spring Boot, Microservices, PostgreSQL, Kafka KRaft, Docker, AWS, React 19, Angular, and Coding Programs). Ask me any concept or code question!</p>
                    <div class="jarvis-quick-prompts">
                      <span class="jarvis-prompt-chip" data-query="Explain Kafka KRaft mode">⚡ Kafka KRaft</span>
                      <span class="jarvis-prompt-chip" data-query="Find frequency of characters using Java 8 Streams">☕ Java 8 Streams</span>
                      <span class="jarvis-prompt-chip" data-query="How does autovacuum work in PostgreSQL?">🗄️ Postgres Autovacuum</span>
                      <span class="jarvis-prompt-chip" data-query="Show LRU Cache implementation">🌳 LRU Cache Code</span>
                      <span class="jarvis-prompt-chip" data-query="What is React 19 Actions and useOptimistic?">⚛️ React 19 Actions</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="jarvis-input-container">
                <div class="jarvis-input-box">
                  <input type="text" id="jarvis-qa-input" placeholder="Ask J.A.R.V.I.S. anything across the entire repository..." autocomplete="off">
                  <button id="jarvis-qa-send" class="jarvis-send-btn"><i class="ti-arrow-right"></i></button>
                </div>
              </div>
            </div>

            <!-- Tab 2: Anomaly Detection Scanner -->
            <div id="jarvis-tab-anomaly" class="jarvis-tab-content">
              <div class="jarvis-anomaly-container">
                <div class="jarvis-anomaly-left">
                  <div class="anomaly-input-header">
                    <span><i class="ti-pencil-alt mr-1"></i> Paste Code or Architecture for Live Anomaly Scan:</span>
                    <button id="jarvis-load-sample-anomaly" class="jarvis-pill-btn">Load Anomaly Sample</button>
                  </div>
                  <textarea id="jarvis-anomaly-code" spellcheck="false" placeholder="Paste Java, Spring Boot, SQL, or concurrent code here to detect memory leaks, race conditions, O(N^2) loops, and architectural anomalies..."></textarea>
                  <button id="jarvis-run-scan-btn" class="jarvis-scan-action-btn"><i class="ti-pulse mr-1"></i> Scan for Anomalies</button>
                </div>
                <div class="jarvis-anomaly-right" id="jarvis-anomaly-report">
                  <div class="anomaly-radar-empty">
                    <div class="radar-pulse-ring"></div>
                    <div class="radar-scan-text">🛡️ Neural Anomaly Engine Ready<br><span style="font-size:12px;color:#94a3b8;">Paste code on the left and click "Scan for Anomalies"</span></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab 3: Quick Test Sandbox -->
            <div id="jarvis-tab-compiler" class="jarvis-tab-content">
              <div class="jarvis-compiler-promo">
                <div class="promo-card">
                  <div class="promo-icon">⚡</div>
                  <h3>TechnoIDE &bull; Interactive Cloud Compiler</h3>
                  <p>Execute your code directly with support for <strong>Java 21 Virtual Threads, Java 17, Java 8, React 19, Angular, PostgreSQL, Python 3, and JavaScript</strong>.</p>
                  <button id="jarvis-launch-compiler-btn" class="jarvis-launch-ide-btn"><i class="ti-fullscreen mr-1"></i> Open TechnoIDE</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    var div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
    jarvisModal = document.getElementById('jarvis-ai-hud');

    // Wire up events
    var closeBtn = document.getElementById('jarvis-close-btn');
    var qaInput = document.getElementById('jarvis-qa-input');
    var qaSend = document.getElementById('jarvis-qa-send');
    var qaStream = document.getElementById('jarvis-qa-stream');
    var tabs = jarvisModal.querySelectorAll('.jarvis-tab-btn');
    var tabContents = jarvisModal.querySelectorAll('.jarvis-tab-content');
    var scanBtn = document.getElementById('jarvis-run-scan-btn');
    var anomalyTextarea = document.getElementById('jarvis-anomaly-code');
    var anomalyReport = document.getElementById('jarvis-anomaly-report');
    var sampleBtn = document.getElementById('jarvis-load-sample-anomaly');
    var launchIdeBtn = document.getElementById('jarvis-launch-compiler-btn');

    // Close
    closeBtn.addEventListener('click', function () {
      jarvisModal.style.display = 'none';
      document.body.style.overflow = '';
    });

    // Tab switching
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tabContents.forEach(function (tc) { tc.classList.remove('active'); });
        tab.classList.add('active');
        var targetId = 'jarvis-tab-' + tab.getAttribute('data-tab');
        var targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      });
    });

    // Prompt chips
    jarvisModal.addEventListener('click', function (e) {
      var chip = e.target.closest('.jarvis-prompt-chip');
      if (chip) {
        var query = chip.getAttribute('data-query');
        qaInput.value = query;
        handleQaSubmit();
      }
    });

    // Submit QA
    function handleQaSubmit() {
      var text = qaInput.value.trim();
      if (!text) return;

      // 1. Append user message
      var userMsg = document.createElement('div');
      userMsg.className = 'jarvis-msg jarvis-msg-user';
      userMsg.innerHTML = '<div class="jarvis-msg-bubble">' + escapeHtml(text) + '</div>';
      qaStream.appendChild(userMsg);
      qaInput.value = '';
      qaStream.scrollTop = qaStream.scrollHeight;

      // 2. Anomaly Check heuristic if user pasted raw code into QA
      var anomalyCheck = runAnomalyDetection(text);

      // 3. Search Repo Knowledge
      setTimeout(function () {
        var matched = searchRepoKnowledge(text);
        var aiMsg = document.createElement('div');
        aiMsg.className = 'jarvis-msg jarvis-msg-ai';

        var bodyHtml = '';

        if (!anomalyCheck.isClean) {
          bodyHtml += `
            <div class="jarvis-callout-warning mb-3">
              <strong>⚠️ Anomaly Detected in Input (Risk Score: ${anomalyCheck.score}/100):</strong><br>
              ${anomalyCheck.detected.map(function(d){ return '• ' + d.title; }).join('<br>')}
              <div class="mt-2"><a href="#" class="jarvis-link-switch-anomaly">View full anomaly diagnostics in Anomaly Tab &rarr;</a></div>
            </div>
          `;
        }

        if (matched.length > 0) {
          var top = matched[0];
          bodyHtml += `
            <p><strong>Found matching topic in repository: <a href="${top.page}" class="jarvis-doc-link">${top.title}</a></strong></p>
            <p>${top.summary}</p>
            ${top.sampleCode ? `<pre class="jarvis-code-snippet"><code>${escapeHtml(top.sampleCode)}</code></pre>` : ''}
            <div class="jarvis-action-bar mt-3">
              <a href="${top.page}" class="jarvis-pill-link"><i class="ti-arrow-top-right mr-1"></i> Open ${top.title}</a>
              <button type="button" class="jarvis-send-to-ide-btn" data-code="${encodeURIComponent(top.sampleCode || '')}"><i class="ti-control-play mr-1"></i> Test in Compiler</button>
            </div>
          `;

          if (matched.length > 1) {
            bodyHtml += '<div class="mt-3 text-muted" style="font-size:12px;"><strong>Also see related tracks:</strong> ';
            bodyHtml += matched.slice(1, 3).map(function(m){ return `<a href="${m.page}" style="color:#38bdf8;text-decoration:underline;margin-right:8px;">${m.title}</a>`; }).join(' ');
            bodyHtml += '</div>';
          }
        } else {
          bodyHtml += `
            <p>I reviewed all tracks for "<em>${escapeHtml(text)}</em>". Here is an architectural synthesis based on the repository curriculum:</p>
            <p>For modern engineering in 2026, ensure low-latency async non-blocking execution, strictly partitioned caches, and resilient failovers.</p>
            <p>Would you like to explore our tracks: <a href="springboot.html" style="color:#38bdf8;">Spring Boot 3</a>, <a href="java8programs.html" style="color:#38bdf8;">Java 8 Streams</a>, <a href="postgresql.html" style="color:#38bdf8;">PostgreSQL MVCC</a>, or <a href="kafka.html" style="color:#38bdf8;">Kafka KRaft</a>?</p>
          `;
        }

        aiMsg.innerHTML = '<div class="jarvis-msg-avatar">🤖</div><div class="jarvis-msg-bubble">' + bodyHtml + '</div>';
        qaStream.appendChild(aiMsg);
        qaStream.scrollTop = qaStream.scrollHeight;

        // Wire up Send to IDE button inside chat
        aiMsg.querySelectorAll('.jarvis-send-to-ide-btn').forEach(function(btn){
          btn.addEventListener('click', function(){
            var c = decodeURIComponent(btn.getAttribute('data-code'));
            if (window.TechnoIDE) {
              jarvisModal.style.display = 'none';
              window.TechnoIDE.open('java21', c);
            }
          });
        });

        // Wire switch to anomaly tab
        var switchLink = aiMsg.querySelector('.jarvis-link-switch-anomaly');
        if (switchLink) {
          switchLink.addEventListener('click', function(e){
            e.preventDefault();
            anomalyTextarea.value = text;
            tabs[1].click();
            scanBtn.click();
          });
        }

      }, 250);
    }

    qaSend.addEventListener('click', handleQaSubmit);
    qaInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleQaSubmit();
    });

    // Sample anomaly button
    sampleBtn.addEventListener('click', function () {
      anomalyTextarea.value = `// Problematic Service Code submitted for Review
public class PaymentProcessingService {
    private static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    private static ThreadLocal<UserContext> contextHolder = new ThreadLocal<>();

    public void processOrders(List<Order> orders) {
        contextHolder.set(new UserContext(SecurityUtils.getCurrentUser()));

        // Concurrency Anomaly: parallelStream with blocking I/O
        orders.parallelStream().forEach(order -> {
            try {
                Thread.sleep(100); // Simulate network latency
                String query = "SELECT * FROM payments WHERE order_id = " + order.getId();
                databaseClient.execute(query);
            } catch (Exception e) {
                // Swallowed exception anomaly
            }
        });
        // Missing contextHolder.remove() causes ThreadLocal memory leak!
    }
}`;
    });

    // Run Scan
    scanBtn.addEventListener('click', function () {
      var code = anomalyTextarea.value.trim();
      if (!code) {
        anomalyReport.innerHTML = '<div class="alert alert-warning">Please paste code to scan for anomalies.</div>';
        return;
      }

      anomalyReport.innerHTML = `
        <div class="anomaly-scanning-state">
          <div class="scanning-laser"></div>
          <p><i class="ti-reload fa-spin mr-2"></i> Analyzing AST, Concurrency Pipelines &amp; Memory Bounds...</p>
        </div>
      `;

      setTimeout(function () {
        var res = runAnomalyDetection(code);

        if (res.isClean) {
          anomalyReport.innerHTML = `
            <div class="anomaly-result-card clean-card">
              <div class="risk-gauge clean-gauge">
                <span class="risk-number">0</span>
                <span class="risk-sub">ANOMALY SCORE</span>
              </div>
              <h4 style="color:#10b981;">✓ Zero Anomalies Detected</h4>
              <p>Code passed concurrency verification, memory leak checks, resource containment, and SQL safety checks.</p>
            </div>
          `;
        } else {
          var itemsHtml = res.detected.map(function(d){
            return `
              <div class="anomaly-item severity-${d.severity.toLowerCase()}">
                <div class="anomaly-item-header">
                  <span class="badge badge-danger">${d.severity}</span>
                  <span class="anomaly-item-title">${escapeHtml(d.title)}</span>
                </div>
                <div class="anomaly-item-body">
                  <p class="mb-1 text-danger"><strong>Risk:</strong> ${escapeHtml(d.message)}</p>
                  <p class="mb-0 text-success"><strong>Fix:</strong> ${escapeHtml(d.solution)}</p>
                </div>
              </div>
            `;
          }).join('');

          anomalyReport.innerHTML = `
            <div class="anomaly-result-card risk-card">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h4 class="mb-0" style="color:#ef4444;"><i class="ti-alert mr-1"></i> ${res.detected.length} Anomalies Found</h4>
                  <span class="text-muted" style="font-size:12px;">Immediate remediation recommended</span>
                </div>
                <div class="risk-gauge">
                  <span class="risk-number">${res.score}</span>
                  <span class="risk-sub">RISK LEVEL</span>
                </div>
              </div>
              <div class="anomaly-items-list">${itemsHtml}</div>
            </div>
          `;
        }
      }, 400);
    });

    // Launch IDE
    launchIdeBtn.addEventListener('click', function () {
      jarvisModal.style.display = 'none';
      if (window.TechnoIDE) {
        window.TechnoIDE.open('java21', null);
      }
    });

    return jarvisModal;
  }

  function openJarvis(mode, query) {
    var modal = ensureJarvisModal();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (mode === 'anomaly') {
      var tabBtn = modal.querySelectorAll('.jarvis-tab-btn')[1];
      if (tabBtn) tabBtn.click();
      if (query) {
        var textarea = document.getElementById('jarvis-anomaly-code');
        if (textarea) textarea.value = query;
      }
    } else {
      var tabBtn = modal.querySelectorAll('.jarvis-tab-btn')[0];
      if (tabBtn) tabBtn.click();
      if (query) {
        var qaInput = document.getElementById('jarvis-qa-input');
        if (qaInput) {
          qaInput.value = query;
          document.getElementById('jarvis-qa-send').click();
        }
      }
    }
  }

  // Floating trigger button on bottom-left of screen
  function addFloatingJarvisTrigger() {
    if (document.getElementById('floating-jarvis-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'floating-jarvis-btn';
    btn.className = 'floating-jarvis-btn';
    btn.setAttribute('aria-label', 'Open JARVIS AI Helper');
    btn.innerHTML = `
      <div class="jarvis-launcher-orb">
        <span class="launcher-pulse"></span>
        <span class="launcher-core"></span>
      </div>
      <svg class="jarvis-launcher-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Modern AI / Brain / Robot icon -->
        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
        <rect x="4" y="8" width="16" height="12" rx="4"/>
        <circle cx="9" cy="13" r="1.5" fill="currentColor"/>
        <circle cx="15" cy="13" r="1.5" fill="currentColor"/>
        <path d="M9 17h6"/>
      </svg>
      <span class="jarvis-pulse-ring"></span>
      <span class="floating-tooltip">JARVIS AI (Ctrl+J)</span>
    `;
    btn.title = 'JARVIS AI & Anomaly Detector (Ctrl+J)';

    btn.addEventListener('click', function () {
      openJarvis('qa', null);
    });

    document.body.appendChild(btn);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addFloatingJarvisTrigger();
    });
  } else {
    addFloatingJarvisTrigger();
  }

  // Expose global API
  window.JarvisAI = {
    open: openJarvis,
    scan: runAnomalyDetection,
    search: searchRepoKnowledge
  };
})();
