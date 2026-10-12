const fs = require('fs');

function updatePage(filename, part1Title, part1Desc, part2Title, part2Desc, advanceQuestions) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. Part 1 Header
  const part1Header = `        <!-- SECTION 1: BASIC & CORE -->
        <div class="col-12 mb-4">
          <div class="level-badge basic"><i class="ti-bookmark mr-1"></i> PART 1: CORE &amp; FOUNDATIONAL QUESTIONS</div>
          <h2 class="level-heading">${part1Title} <span class="badge badge-primary font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Basic &bull; Developer</span></h2>
          <p class="text-secondary">${part1Desc}</p>
          <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
        </div>
`;

  if (!content.includes('PART 1: CORE &amp; FOUNDATIONAL QUESTIONS')) {
    const marker = '<!-- course details -->';
    const markerIdx = content.indexOf(marker);
    if (markerIdx !== -1) {
      const rowIdx = content.indexOf('<div class="row">', markerIdx);
      if (rowIdx !== -1) {
        const insertPos = content.indexOf('>', rowIdx) + 1;
        content = content.slice(0, insertPos) + '\n' + part1Header + content.slice(insertPos);
      }
    }
  }

  // 2. Part 2 Header & Questions
  if (!content.includes('PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS')) {
    const part2Header = `
        <!-- ========================================================================== -->
        <!-- SECTION 2: ADVANCED & TECH LEAD (2026 EDITION) -->
        <!-- ========================================================================== -->
        <div class="col-12 my-5 pt-4">
          <div class="level-badge advance mb-2"><i class="ti-star mr-1"></i> PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS</div>
          <h2 class="level-heading">${part2Title} <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Senior &bull; Tech Lead &bull; 2026</span></h2>
          <p class="text-secondary">${part2Desc}</p>
          <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
        </div>
` + advanceQuestions;

    const regex = /(<\/div>\s*<\/div>\s*<\/section>\s*<!-- \/section -->)/;
    if (regex.test(content)) {
      content = content.replace(regex, part2Header + '\n    $1');
      fs.writeFileSync(filename, content, 'utf8');
      console.log(`[SUCCESS] Updated ${filename}`);
    } else {
      console.error(`[ERROR] End of section marker not found in ${filename}`);
    }
  } else {
    console.log(`[SKIP] ${filename} already has Part 2.`);
  }
}

// ============================================================================
// 2. microservice.html
// ============================================================================
const msQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Distributed Transactions &bull; Architecture</span>
            <h3 class="text-dark font-weight-bold mb-3">1. How do you handle distributed transactions across microservices? Compare Orchestration Saga vs Choreography Saga.</h3>
            <p>In distributed microservices with independent databases, traditional <strong>Two-Phase Commit (2PC)</strong> is an anti-pattern because it locks distributed resources across network boundaries, introducing single points of failure and catastrophic latency under high concurrency. Modern architectures use the <strong>Saga Pattern</strong> (eventual consistency):</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Choreography Saga</th>
                    <th>Orchestration Saga</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Control Model</strong></td>
                    <td>Decentralized: Each service publishes events (e.g. OrderCreated &rarr; PaymentCharged &rarr; StockDeducted)</td>
                    <td>Centralized: Dedicated Orchestrator orchestrates calls and handles state transitions</td>
                  </tr>
                  <tr>
                    <td><strong>Coupling</strong></td>
                    <td>Loose coupling; services only know domain events</td>
                    <td>Services are coupled to the orchestrator interface</td>
                  </tr>
                  <tr>
                    <td><strong>Failure &amp; Compensation</strong></td>
                    <td>Harder to trace; cascading compensating events across many Kafka topics</td>
                    <td><strong>Clear compensating workflow</strong>: orchestrator explicitly executes rollback actions on failure</td>
                  </tr>
                  <tr>
                    <td><strong>Ideal For</strong></td>
                    <td>Simple workflows with 2-4 services</td>
                    <td><strong>Complex, mission-critical workflows (e-commerce checkout, payment processing)</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-3"><strong>Key Tech Lead Insight:</strong> Every compensating transaction <em>must be strictly idempotent</em>. If a compensation fails midway due to network timeout, the saga manager must safely retry without corrupting state.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Dual-Write Problem &bull; CDC</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Explain the Dual-Write Problem and how the Transactional Outbox Pattern with Debezium CDC solves it.</h3>
            <p><strong>The Dual-Write Problem:</strong> When a service updates its database (e.g., saves an Order) and publishes an event to Apache Kafka within the same method, failure can happen at step 2 (Kafka broker down, network partition). This creates an irreconcilable distributed inconsistency: the DB committed, but downstream services never received the event.</p>
            <h5 class="font-weight-bold text-dark mt-3">The Transactional Outbox Solution:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Local Atomic Commit:</strong> Within the <em>same local database transaction</em>, write the business entity to <code>orders</code> table AND write the event payload to an <code>outbox</code> table.</li>
              <li><strong>Change Data Capture (CDC):</strong> <strong>Debezium</strong> (via Kafka Connect) tails the database transaction log (PostgreSQL WAL, MySQL binlog). It reads committed outbox entries asynchronously and writes them to the target Kafka topic with at-least-once guarantee.</li>
              <li><strong>Zero Dual-Write Hazard:</strong> The business write and event capture succeed or fail together atomically, eliminating two-phase distributed locks.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Zero Trust &bull; API Security</span>
            <h3 class="text-dark font-weight-bold mb-3">3. How do you architect Zero-Trust Security across microservices? Compare JWTs vs Reference Tokens and mTLS.</h3>
            <p>In modern 2026 enterprise microservices, perimeter-only firewall security is obsolete. A <strong>Zero-Trust Architecture</strong> enforces security inside and between services:</p>
            <ul class="list-styled pl-4">
              <li><strong>Edge Authentication:</strong> Public clients present opaque reference tokens to the API Gateway. The Gateway exchanges them with Keycloak/Auth0 or validates short-lived signed JWTs.</li>
              <li><strong>Context Propagation:</strong> The API Gateway down-scopes permissions and passes user claims (tenantId, userId, roles) downstream in cryptographically signed, short-lived JWT headers or gRPC metadata.</li>
              <li><strong>Service-to-Service mTLS (Mutual TLS):</strong> Service Mesh (Istio / Envoy) injects sidecar proxies that automatically authenticate inter-service connections using SPIFFE/SPIRE x509 certificates with automated cryptographic rotation every 24 hours.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Gateway &bull; Distributed Rate Limiting</span>
            <h3 class="text-dark font-weight-bold mb-3">4. How do you design high-throughput Distributed Rate Limiting using the Token Bucket algorithm and Redis?</h3>
            <p>To defend against DDoS and noisy neighbors without creating in-memory synchronization bottlenecks across multiple API Gateway instances, use a <strong>Distributed Token Bucket</strong> implemented with Redis Lua scripts:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>-- Redis Lua Script: Atomic Token Bucket Rate Limiter
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local current = tonumber(redis.call('get', key) or "0")

if current + 1 &gt; limit then
    return 0 -- Rate limit exceeded (HTTP 429)
else
    redis.call("INCRBY", key, 1)
    if current == 0 then
        redis.call("EXPIRE", key, tonumber(ARGV[2])) -- TTL window in seconds
    end
    return 1 -- Request allowed
end</pre>
            <p class="mt-2"><strong>Tech Lead Best Practice:</strong> Return standard IETF headers: <code>RateLimit-Limit</code>, <code>RateLimit-Remaining</code>, and <code>Retry-After</code> on HTTP 429 to enable intelligent client exponential backoff with jitter.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Data Architecture &bull; CQRS</span>
            <h3 class="text-dark font-weight-bold mb-3">5. With Database-per-Service, how do you handle complex Cross-Service Joins and Distributed Reporting?</h3>
            <p>Under Database-per-Service, joining tables across databases over HTTP (distributed in-memory join) causes $O(N)$ network roundtrips, cascading latency, and tight operational coupling.</p>
            <h5 class="font-weight-bold text-dark mt-3">Architectural Solutions:</h5>
            <ul class="list-styled pl-4">
              <li><strong>CQRS (Command Query Responsibility Segregation):</strong> The write services emit domain events (OrderPlaced, CustomerAddressUpdated). A dedicated Read Model service consumes these events and updates a denormalized, read-optimized data store (PostgreSQL materialized view, Elasticsearch, or MongoDB). Queries execute against the materialized view with $O(1)$ single-table lookups.</li>
              <li><strong>GraphQL Federation (Apollo Router):</strong> Clients query a unified schema; the federation router executes sub-queries in parallel and merges JSON fragments.</li>
              <li><strong>Enterprise Analytics:</strong> CDC pipes event streams directly into BigQuery / Snowflake data lakes for analytical batch processing.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Zero Downtime &bull; SRE / DevOps</span>
            <h3 class="text-dark font-weight-bold mb-3">6. As a Tech Lead, how do you execute Zero-Downtime Canary Deployments with Istio and automated rollback?</h3>
            <p>Canary releases minimize blast radius by exposing a new version to a controlled slice of production traffic before global rollout:</p>
            <ul class="list-styled pl-4">
              <li><strong>Traffic Splitting (Istio VirtualService):</strong> Route 95% of traffic to <code>v1</code> (baseline) and 5% to <code>v2</code> (canary) based on percentage weights or specific HTTP request headers (internal testers / beta users).</li>
              <li><strong>Automated Metric Analysis:</strong> Prometheus and Argo Rollouts evaluate Golden Signals (HTTP 5xx rate, P99 response latency, error budget burn rate).</li>
              <li><strong>Automated Rollback:</strong> If the 5xx error rate on canary exceeds 1% during a 10-minute observation window, the traffic split instantly reverts to 100% baseline with zero manual human intervention.</li>
              <li><strong>Database Schema Migration (Expand &amp; Contract):</strong> Never rename or drop DB columns in a single release. <em>Step 1 (Expand):</em> Add new nullable column, deploy code writing to both. <em>Step 2:</em> Backfill data. <em>Step 3 (Contract):</em> Deploy code reading only from new column, then drop old column.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'microservice.html',
  'Microservice Fundamentals',
  'Core architectural tenets, service discovery, API gateway patterns, and base communication mechanisms.',
  'Advanced Microservice Architecture &amp; Lead Systems',
  'Distributed transactions (Saga), outbox CDC patterns, zero-trust security, distributed rate limiting, and zero-downtime canary rollouts.',
  msQuestions
);

// ============================================================================
// 3. basicjava.html
// ============================================================================
const basicJavaQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">JVM Internals &bull; Java 21 Loom</span>
            <h3 class="text-dark font-weight-bold mb-3">1. Java 21 Virtual Threads vs Platform Threads: Deep dive into heap memory, stack frames, and scheduling.</h3>
            <p>Virtual Threads (Project Loom, Java 21) revolutionize Java concurrency by decoupling user-mode threads from operating system kernel threads:</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>OS Platform Thread</th>
                    <th>Virtual Thread (Java 21+)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Memory Footprint</strong></td>
                    <td>~1MB to 2MB fixed OS stack memory</td>
                    <td><strong>~few hundred bytes</strong> initially; dynamically grows on JVM heap</td>
                  </tr>
                  <tr>
                    <td><strong>Creation Cost</strong></td>
                    <td>Expensive system call to OS kernel</td>
                    <td>Cheap Java object allocation on heap ($O(1)$)</td>
                  </tr>
                  <tr>
                    <td><strong>Thread Capacity</strong></td>
                    <td>Few thousands max before crashing with <code>OutOfMemoryError</code></td>
                    <td><strong>Millions of concurrent threads</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Scheduling</strong></td>
                    <td>Preemptive OS kernel scheduler</td>
                    <td>Cooperative user-mode scheduler running on a <code>ForkJoinPool</code> carrier pool</td>
                  </tr>
                  <tr>
                    <td><strong>Blocking I/O</strong></td>
                    <td>Blocks OS kernel thread in waiting state</td>
                    <td>Unmounts virtual thread from carrier thread; carrier runs other tasks</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-3"><strong>When NOT to use Virtual Threads:</strong> CPU-bound tasks (cryptographic hashing, video transcoding, in-memory ML matrix operations). Virtual threads do not make CPU calculations faster; they only scale I/O-bound concurrency.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Memory Model &bull; Concurrency</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Explain the Java Memory Model (JMM), the Happens-Before relationship, and hardware cache coherency.</h3>
            <p>Modern multi-core CPUs maintain L1/L2/L3 hardware caches. Without memory synchronization, writes to a variable by CPU Core 1 reside in its local store buffer/cache and may never be seen by Core 2.</p>
            <ul class="list-styled pl-4">
              <li><strong>The <code>volatile</code> Keyword:</strong> Instructs the compiler and CPU to generate <strong>Memory Barriers</strong> (LoadLoad, StoreStore, StoreLoad). Ensures that all reads read directly from main memory and writes flush immediately to main memory.</li>
              <li><strong>Instruction Reordering:</strong> Compilers and CPU out-of-order execution engines reorder instructions for performance. <code>volatile</code> forbids reordering across the memory barrier.</li>
              <li><strong>Happens-Before Rules:</strong>
                <br/>1. <em>Program Order Rule:</em> Each action in a thread happens-before every subsequent action in that thread.
                <br/>2. <em>Volatile Variable Rule:</em> A write to a volatile field happens-before every subsequent read of that same field.
                <br/>3. <em>Monitor Lock Rule:</em> An unlock on a monitor happens-before every subsequent lock on the same monitor.
                <br/>4. <em>Transitivity Rule:</em> If A happens-before B, and B happens-before C, then A happens-before C.
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Language Evolution &bull; Java 17-21</span>
            <h3 class="text-dark font-weight-bold mb-3">3. How do Records, Sealed Classes, and Pattern Matching enable Algebraic Data Types (ADT) in modern Java?</h3>
            <p>Modern Java allows developers to build robust, compiler-enforced domain models using <strong>Algebraic Data Types</strong>:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'><span style='color: #38bdf8;'>public sealed interface</span> PaymentMethod permits CreditCard, Upi, BankTransfer {}

<span style='color: #38bdf8;'>public record</span> CreditCard(String cardNumber, String cvv, YearMonth expiry) implements PaymentMethod {}
<span style='color: #38bdf8;'>public record</span> Upi(String vpa) implements PaymentMethod {}
<span style='color: #38bdf8;'>public record</span> BankTransfer(String accountNumber, String ifsc) implements PaymentMethod {}

<span style='color: #38bdf8;'>public String</span> processPayment(PaymentMethod method) {
    return switch (method) {
        case CreditCard c -&gt; "Charging CC ending in " + c.cardNumber().substring(12);
        case Upi u        -&gt; "Sending UPI collect request to " + u.vpa();
        case BankTransfer b -&gt; "Initiating NEFT transfer to " + b.accountNumber();
    }; // NO 'default' branch needed! Compiler guarantees exhaustiveness!
}</pre>
            <p class="mt-2">If a new payment type is added to the <code>sealed interface</code>, the compiler immediately flags errors on all unhandled switch expressions across the entire codebase!</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Garbage Collection &bull; Performance</span>
            <h3 class="text-dark font-weight-bold mb-3">4. Modern Garbage Collectors: G1GC vs Generational ZGC vs Shenandoah on multi-terabyte heaps.</h3>
            <p>In high-scale enterprise Java, choosing and tuning the Garbage Collector is critical for meeting P99 latency Service Level Objectives (SLOs):</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>G1GC (Default)</th>
                    <th>Generational ZGC (Java 21+)</th>
                    <th>Shenandoah GC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Pause Times</strong></td>
                    <td>10ms - 200ms (configurable target)</td>
                    <td><strong>Sub-millisecond (&lt; 1ms) guaranteed</strong></td>
                    <td>&lt; 10ms</td>
                  </tr>
                  <tr>
                    <td><strong>Heap Size Range</strong></td>
                    <td>4GB - 64GB</td>
                    <td><strong>16MB up to 16 Terabytes</strong></td>
                    <td>4GB - 100GB+</td>
                  </tr>
                  <tr>
                    <td><strong>Core Mechanism</strong></td>
                    <td>Region-based, incremental, Stop-The-World copying pauses</td>
                    <td><strong>Colored Pointers + Load Barriers</strong>; concurrent marking, evacuation &amp; relocation</td>
                    <td>Brooks Pointers / Load-Reference Barriers</td>
                  </tr>
                  <tr>
                    <td><strong>Generational Support</strong></td>
                    <td>Yes (Young vs Old regions)</td>
                    <td><strong>Yes in Java 21+ (JEP 439)</strong>: massive throughput boost over ZGC single-gen</td>
                    <td>Generational Shenandoah (Java 21 experimental)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Memory Management &bull; String Internals</span>
            <h3 class="text-dark font-weight-bold mb-3">5. How does the JVM optimize String memory via Compact Strings, and what are the dangers of <code>String.intern()</code>?</h3>
            <ul class="list-styled pl-4">
              <li><strong>Compact Strings (Java 9+):</strong> Strings historically stored <code>char[]</code> (2 bytes per character). Compact Strings store <code>byte[]</code> + a <code>coder</code> byte flag. If all characters fit into ISO-8859-1 (Latin-1), only 1 byte per character is allocated, slashing heap consumption by ~45% in typical web applications.</li>
              <li><strong>G1 String Deduplication:</strong> G1 GC identifies distinct <code>String</code> objects that share identical character arrays and points them to the same underlying <code>byte[]</code> without changing object identity. Enabled via <code>-XX:+UseStringDeduplication</code>.</li>
              <li><strong>Dangers of <code>String.intern()</code>:</strong> The String Pool is a native JVM hash table located in native memory. Calling <code>intern()</code> on user-supplied strings (e.g., incoming request IDs or tokens) causes severe hash collision bucket degradation, Metaspace/native memory bloat, and Stop-The-World GC latency spikes. Never intern unbounded dynamic input!</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">ClassLoading &bull; Metaspace Leakage</span>
            <h3 class="text-dark font-weight-bold mb-3">6. Explain the ClassLoader Delegation Hierarchy and how custom ClassLoaders cause Metaspace OutOfMemoryError.</h3>
            <p><strong>Delegation Hierarchy:</strong> Bootstrap ClassLoader (C++ native JVM core) &rarr; Platform/Extension ClassLoader &rarr; Application (System) ClassLoader &rarr; Custom / WebApp ClassLoader. Class loading follows parent-first delegation.</p>
            <h5 class="font-weight-bold text-dark mt-3">The Hot-Deploy Metaspace Memory Leak:</h5>
            <p>A loaded class can only be garbage-collected if its <code>ClassLoader</code> is garbage-collected. A ClassLoader can only be garbage-collected if:</p>
            <ol class="pl-4 text-secondary">
              <li>No instances of any class loaded by that ClassLoader exist.</li>
              <li>No static references point to those classes.</li>
              <li>No threads are currently executing code loaded by that ClassLoader.</li>
            </ol>
            <p>If an application registers a <code>ThreadLocal</code>, an unclosed JDBC driver, or a static logger that retains an object reference during undeployment, the entire <code>WebAppClassLoader</code> and hundreds of metadata classes remain pinned in memory, leading inevitably to <code>java.lang.OutOfMemoryError: Metaspace</code> after 3-4 hot reloads.</p>
          </div>
        </div>
`;

updatePage(
  'basicjava.html',
  'Core Java Fundamentals',
  'Platform independence, JVM/JRE/JDK differences, primitive types, loops, and marker interfaces.',
  'Advanced Java Core &amp; JVM Internals (2026)',
  'Virtual threads vs platform threads, Java Memory Model (JMM), modern Algebraic Data Types, Generational ZGC, and Metaspace classloader dynamics.',
  basicJavaQuestions
);

// ============================================================================
// 4. oopsconcept.html
// ============================================================================
const oopsQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Design Principles &bull; Architecture</span>
            <h3 class="text-dark font-weight-bold mb-3">1. Why do senior architects advocate "Composition over Inheritance"? Explain the Fragile Base Class problem.</h3>
            <p>While inheritance represents an <em>IS-A</em> relationship, it violates encapsulation because subclasses depend on the internal implementation details of the parent class (tight coupling).</p>
            <h5 class="font-weight-bold text-dark mt-3">The Fragile Base Class Problem:</h5>
            <p>Consider a subclass <code>CustomCountingSet</code> inheriting from <code>HashSet</code> that overrides <code>add()</code> and <code>addAll()</code> to count inserted items. If the superclass's <code>addAll()</code> internally calls <code>add()</code>, every item gets counted twice! A benign internal refactor in the parent library silently breaks subclass invariants.</p>
            <p><strong>The Composition Solution:</strong> Use composition and interface forwarding (Delegator/Decorator pattern). Wrap the instance in a private field and delegate calls cleanly. This allows replacing behavior at runtime, enforces clear boundaries, and prevents unwanted methods from leaking into the public API.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">SOLID in Distributed Systems</span>
            <h3 class="text-dark font-weight-bold mb-3">2. How do the SOLID principles apply to modern Microservices and Distributed Architecture?</h3>
            <ul class="list-styled pl-4">
              <li><strong>Single Responsibility Principle (SRP):</strong> A microservice should map to a single Domain-Driven Design (DDD) Bounded Context. If an order service also handles invoice PDF generation and SMS sending, it violates distributed SRP.</li>
              <li><strong>Open/Closed Principle (OCP):</strong> APIs and event schemas must be open for extension, closed for modification. Use protobuf/Avro schema registries with backward-compatible field additions; never introduce breaking REST payload changes without URL/header versioning.</li>
              <li><strong>Liskov Substitution Principle (LSP):</strong> Microservice contract testing (Pact / Spring Cloud Contract). Any replacement service or provider version must fulfill consumer contracts without altering business preconditions or postconditions.</li>
              <li><strong>Interface Segregation Principle (ISP):</strong> Instead of giant monolithic REST endpoints returning 50-field JSON payloads, provide granular, client-specific BFF endpoints or GraphQL schemas tailored strictly to client needs.</li>
              <li><strong>Dependency Inversion Principle (DIP):</strong> Hexagonal Architecture (Ports and Adapters). Core business domain logic must never depend directly on databases, Kafka, or third-party SDKs; it defines interfaces (Ports) that infrastructure adapters implement.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Language Internals &bull; Diamond Problem</span>
            <h3 class="text-dark font-weight-bold mb-3">3. How does Java resolve the Diamond Problem with multiple interface default methods?</h3>
            <p>Since Java 8 introduced <code>default</code> methods in interfaces, a class can inherit conflicting method implementations from multiple interfaces. The Java compiler resolves conflicts using 3 strict rules:</p>
            <ol class="pl-4 text-secondary">
              <li><strong>1. Classes beat Interfaces:</strong> A method declaration in a superclass or abstract class always takes precedence over any default method in an interface.</li>
              <li><strong>2. Sub-interfaces beat Super-interfaces:</strong> If interface B extends interface A and both provide a default method, B's method takes precedence (most specific wins).</li>
              <li><strong>3. Explicit Disambiguation:</strong> If two unrelated interfaces (e.g. <code>InterfaceA</code> and <code>InterfaceB</code>) declare identical default method signatures, the compiler throws a compile-time error: <em>"class inherits unrelated defaults"</em>. The developer must override the method explicitly:
                <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>public void print() {
    InterfaceA.super.print(); // Explicit disambiguation
}</pre>
              </li>
            </ol>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">JVM Bytecode &bull; Covariant Returns</span>
            <h3 class="text-dark font-weight-bold mb-3">4. What are Covariant Return Types, and why does the JVM compiler generate synthetic Bridge Methods?</h3>
            <p><strong>Covariant Return:</strong> When an overriding method in a child class returns a narrower subtype of the type declared in the parent class:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>class Producer { public Number get() { return 1; } }
class IntegerProducer extends Producer { @Override public Integer get() { return 1; } }</pre>
            <p><strong>Synthetic Bridge Methods:</strong> In Java bytecode, method descriptors include the return type (<code>()Ljava/lang/Number;</code> vs <code>()Ljava/lang/Integer;</code>). To maintain polymorphic binary compatibility with callers compiled against the superclass, the Java compiler automatically synthesizes a hidden <strong>bridge method</strong> with the superclass signature that delegates to the specialized child method:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>// Generated by compiler:
public synthetic bridge Number get() {
    return this.get(); // calls Integer get()
}</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Domain-Driven Design &bull; Value Objects</span>
            <h3 class="text-dark font-weight-bold mb-3">5. Entities vs Value Objects in DDD: Designing immutable Domain Value Objects with Java Records.</h3>
            <p>In Domain-Driven Design (DDD), clean domain separation between Entities and Value Objects prevents bugs and race conditions:</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Characteristic</th>
                    <th>Domain Entity</th>
                    <th>Domain Value Object</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Identity</strong></td>
                    <td>Has unique identity (UUID / ID) that persists across state mutations</td>
                    <td><strong>No identity</strong>; defined entirely by the combination of its attributes</td>
                  </tr>
                  <tr>
                    <td><strong>Mutability</strong></td>
                    <td>State transitions over time (e.g. Order: PENDING &rarr; SHIPPED)</td>
                    <td><strong>Strictly Immutable</strong>; replacing a value means creating a new instance</td>
                  </tr>
                  <tr>
                    <td><strong>Equality</strong></td>
                    <td>Based on ID equality (<code>e1.id == e2.id</code>)</td>
                    <td>Based on structural attribute equality (<code>Money(10, "USD") == Money(10, "USD")</code>)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-3"><strong>Implementation with Java Records:</strong> Use compact constructors to enforce invariant validation upfront:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>public record Money(BigDecimal amount, Currency currency) {
    public Money { // Compact constructor
        Objects.requireNonNull(currency, "Currency cannot be null");
        if (amount == null || amount.compareTo(BigDecimal.ZERO) &lt; 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
    }
}</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Architecture Metrics &bull; Coupling</span>
            <h3 class="text-dark font-weight-bold mb-3">6. As a Tech Lead, how do you measure and govern Loose Coupling and High Cohesion? (Afferent vs Efferent Metrics).</h3>
            <p>Architectural modularity is measured mathematically using Robert C. Martin's Package Coupling Metrics:</p>
            <ul class="list-styled pl-4">
              <li><strong>Afferent Coupling ($C_a$):</strong> Number of classes/modules outside this package that depend on classes inside it (incoming dependencies / responsibility).</li>
              <li><strong>Efferent Coupling ($C_e$):</strong> Number of classes inside this package that depend on classes outside it (outgoing dependencies).</li>
              <li><strong>Instability ($I$):</strong> Calculated as $I = \\frac{C_e}{C_a + C_e}$. A value of $I = 0$ means maximally stable (core domain / shared libraries); $I = 1$ means maximally volatile (UI / controllers).</li>
              <li><strong>Stable Abstractions Principle:</strong> Highly stable packages ($I \\approx 0$) must be abstract (interfaces), so they can be extended without requiring frequent re-compilations. Tools like ArchUnit automate these architecture rules in CI/CD pipelines.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'oopsconcept.html',
  'OOP Fundamentals',
  'Inheritance, Polymorphism, Abstraction, Encapsulation, Classes, and Objects.',
  'Advanced OOP, Architecture &amp; System Modeling',
  'Composition over inheritance, SOLID in microservices, Diamond problem resolution, synthetic bridge methods, and DDD Value Objects.',
  oopsQuestions
);

// ============================================================================
// 5. collection.html
// ============================================================================
const collectionQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Concurrent Collections &bull; Internals</span>
            <h3 class="text-dark font-weight-bold mb-3">1. ConcurrentHashMap Deep Dive: CAS, synchronizing on bucket head nodes, and concurrent resizing.</h3>
            <p><code>ConcurrentHashMap</code> in modern Java abandons the legacy Java 7 Segment locks (which had fixed concurrency level) in favor of fine-grained bucket-level concurrency:</p>
            <ul class="list-styled pl-4">
              <li><strong>Lock-Free CAS on Empty Buckets:</strong> When inserting into an empty bucket, it uses lock-free hardware <code>Compare-And-Swap</code> (<code>Unsafe / VarHandle.compareAndSetReference</code>). If multiple threads compete to insert into the same empty slot, only one CAS succeeds; the loser retries or acquires the bucket lock.</li>
              <li><strong>Bucket-Head Synchronization:</strong> When a bucket already contains nodes (linked list or Red-Black tree), <code>put()</code> synchronizes <em>only on the first node (head) of that specific bin</em> using <code>synchronized(firstNode)</code>. Reads (<code>get()</code>) remain 100% lock-free via volatile field reads.</li>
              <li><strong>Treeification Thresholds:</strong> When a single bin reaches 8 nodes and table capacity $\ge 64$, the bucket is converted to a <code>TreeBin</code> (Red-Black tree) reducing worst-case search from $O(N)$ to $O(\\log N)$.</li>
              <li><strong>Concurrent Resizing:</strong> Multiple threads assist in resizing simultaneously! When a resizing is underway, transferring threads insert special <code>ForwardingNode</code> markers into completed buckets so readers forward transparently to the new table.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Concurrency &bull; Trade-offs</span>
            <h3 class="text-dark font-weight-bold mb-3">2. <code>CopyOnWriteArrayList</code> vs <code>Collections.synchronizedList()</code> vs <code>ConcurrentLinkedQueue</code>: Performance &amp; GC impact.</h3>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Collection</th>
                    <th>Concurrency Mechanism</th>
                    <th>Read Performance</th>
                    <th>Write Performance</th>
                    <th>Ideal Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong><code>CopyOnWriteArrayList</code></strong></td>
                    <td>Clones entire backing array on write; reads are lock-free on volatile snapshot</td>
                    <td><strong>Extremely fast $O(1)$ lock-free</strong></td>
                    <td>Very expensive $O(N)$ copy + high GC churn</td>
                    <td>Read-heavy listener registries (e.g. 99% reads, 1% writes)</td>
                  </tr>
                  <tr>
                    <td><strong><code>Collections.synchronizedList</code></strong></td>
                    <td>Coarse-grained mutex lock on the entire collection object</td>
                    <td>Slow under contention (readers block readers)</td>
                    <td>Slow under contention</td>
                    <td>Legacy collections; generally avoided in modern high-concurrency systems</td>
                  </tr>
                  <tr>
                    <td><strong><code>ConcurrentLinkedQueue</code></strong></td>
                    <td>Unbounded, lock-free queue using CAS (Michael-Scott algorithm)</td>
                    <td>High throughput non-blocking</td>
                    <td>High throughput non-blocking</td>
                    <td>High-performance producer-consumer pipelines without backpressure blocking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Java 21 Feature &bull; JEP 431</span>
            <h3 class="text-dark font-weight-bold mb-3">3. Java 21 Sequenced Collections: Unifying encounter order across List, Set, and Map.</h3>
            <p>Prior to Java 21, collections with a defined encounter order lacked a common super-interface. Accessing the first or last element required inconsistent idioms (<code>list.get(list.size() - 1)</code> vs <code>deque.getLast()</code> vs <code>set.iterator().next()</code>). <strong>JEP 431</strong> introduced unified interfaces:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'><span style='color: #38bdf8;'>SequencedCollection&lt;String&gt;</span> seq = new ArrayList&lt;&gt;();
seq.addFirst(<span style='color: #fde047;'>"Alpha"</span>);
seq.addLast(<span style='color: #fde047;'>"Omega"</span>);
String first = seq.getFirst(); // "Alpha"
String last = seq.getLast();   // "Omega"

// Reverse-order view without creating expensive copies or streams!
SequencedCollection&lt;String&gt; reversed = seq.reversed();</pre>
            <p class="mt-2">This hierarchy spans <code>SequencedCollection</code>, <code>SequencedSet</code> (LinkedHashSet, SortedSet), and <code>SequencedMap</code> (LinkedHashMap, SortedMap) with <code>firstEntry()</code>, <code>lastEntry()</code>, and <code>reversed()</code>.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Security &bull; Hash Flooding DoS</span>
            <h3 class="text-dark font-weight-bold mb-3">4. How HashMap defends against Hash-Flooding Denial-of-Service attacks: Treeification &amp; Hysteresis.</h3>
            <p><strong>Hash Flooding Attack:</strong> Attackers crafted millions of malicious HTTP form parameter keys with identical hash codes. In Java 7, this collapsed <code>HashMap</code> into a single linked list, degrading lookup from $O(1)$ to $O(N)$ and causing 100% CPU lockup.</p>
            <h5 class="font-weight-bold text-dark mt-3">The Java 8+ Treeification Defense:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Mathematical Probability:</strong> Under a well-distributed hash function, the probability of a single bin receiving 8 collisions follows a Poisson distribution and is less than 1 in 10 million ($P(8) &lt; 10^{-7}$).</li>
              <li><strong>Tree Conversion:</strong> If a bucket receives $\ge 8$ entries, the bucket automatically transforms into a Red-Black tree (<code>TreeNode</code>), capping worst-case search at $O(\\log N)$.</li>
              <li><strong>Hysteresis Gap:</strong> When entries are deleted, the tree reverts to a linked list only when the count drops to <strong>6</strong> (<code>UNTREEIFY_THRESHOLD</code>). This 2-node gap prevents rapid, expensive thrashing between list and tree structures during alternating add/remove operations.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">High-Throughput Queues &bull; Hardware Cache</span>
            <h3 class="text-dark font-weight-bold mb-3">5. <code>ArrayBlockingQueue</code> vs <code>LinkedBlockingQueue</code>: False sharing, lock contention, and memory allocation.</h3>
            <p>Choosing between blocking queues in high-throughput microservices requires understanding CPU cache lines and memory allocation:</p>
            <ul class="list-styled pl-4">
              <li><strong><code>ArrayBlockingQueue</code>:</strong> Backed by a single contiguous array. Uses a <strong>single <code>ReentrantLock</code></strong> shared by both producers and consumers (put and take lock each other out). However, it pre-allocates memory upfront, creating <strong>zero GC allocation churn</strong> during runtime enqueue/dequeue operations.</li>
              <li><strong><code>LinkedBlockingQueue</code>:</strong> Uses <strong>two separate locks</strong> (<code>takeLock</code> and <code>putLock</code>), allowing producers and consumers to operate concurrently without blocking each other. However, every <code>put()</code> allocates a new <code>Node</code> object on the heap, generating massive Garbage Collection overhead and CPU cache-line misses under millions of operations/sec.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Caching &bull; Modern Algorithms</span>
            <h3 class="text-dark font-weight-bold mb-3">6. Building high-performance In-Memory Caches: Why Caffeine Cache outperforms <code>LinkedHashMap(accessOrder=true)</code>.</h3>
            <p><code>LinkedHashMap</code> with <code>accessOrder=true</code> and <code>removeEldestEntry()</code> is the traditional textbook LRU cache. However, in concurrent production systems, it suffers from a fatal flaw:</p>
            <p><strong>The Mutex Bottleneck:</strong> Because LRU ordering updates the internal doubly-linked list on every cache hit, <em>reading from the cache requires mutating the list</em>. Wrapping it in <code>Collections.synchronizedMap()</code> means concurrent readers block each other completely, destroying throughput on multi-core servers.</p>
            <h5 class="font-weight-bold text-dark mt-3">Why Caffeine Cache Dominates in 2026:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Window TinyLFU (W-TinyLFU):</strong> Achieves higher hit rates than plain LRU/LFU by combining a small admission window with a frequency sketch (CountMinSketch).</li>
              <li><strong>Lock-Free Reads:</strong> Reads execute lock-free using volatile memory reads and record cache access asynchronously into thread-local ring buffers.</li>
              <li><strong>Asynchronous Maintenance:</strong> Eviction and buffer draining occur on background worker threads without stalling client request threads.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'collection.html',
  'Java Collection Fundamentals',
  'List, Set, Map hierarchies, ArrayList vs LinkedList, HashMap vs Hashtable, and basic iterators.',
  'Advanced Collections, Concurrency &amp; Memory (2026)',
  'ConcurrentHashMap CAS internals, CopyOnWrite performance, Java 21 Sequenced Collections, hash-flooding DoS defenses, and modern Caffeine caching.',
  collectionQuestions
);

// ============================================================================
// 6. multithreding.html
// ============================================================================
const threadingQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Java 21 Loom &bull; Concurrency</span>
            <h3 class="text-dark font-weight-bold mb-3">1. Structured Concurrency (JEP 453): Eliminating orphan thread leaks and resource hazards.</h3>
            <p>In traditional unstructured concurrency (using <code>ExecutorService</code> or <code>CompletableFuture</code>), tasks run as independent, disconnected units. If Task A fails or times out, Task B continues running aimlessly in the background, consuming CPU, memory, and database connections.</p>
            <h5 class="font-weight-bold text-dark mt-3">Structured Concurrency with <code>StructuredTaskScope</code>:</h5>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Supplier&lt;User&gt; userSubtask = scope.fork(() -&gt; fetchUser(userId));
    Supplier&lt;Orders&gt; orderSubtask = scope.fork(() -&gt; fetchOrders(userId));

    scope.join();           // Wait for both subtasks concurrently
    scope.throwIfFailed();  // If ANY subtask fails, cancel siblings and rethrow!

    return new DashboardResponse(userSubtask.get(), orderSubtask.get());
}</pre>
            <p class="mt-2"><strong>Tech Lead Advantage:</strong> The lexical code block enforces thread lifetime boundaries. If <code>fetchUser()</code> throws an exception, <code>fetchOrders()</code> is immediately cancelled via thread interruption. Stack traces preserve the complete hierarchical parent-child context.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Java 21 Feature &bull; Memory Optimization</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Scoped Values (JEP 446) vs <code>ThreadLocal</code>: Eliminating memory leaks in Virtual Thread architectures.</h3>
            <p><code>ThreadLocal</code> was designed for a world with hundreds of long-lived platform threads. In modern architectures with <strong>millions of Virtual Threads</strong>, <code>ThreadLocal</code> introduces severe architectural problems:</p>
            <ul class="list-styled pl-4">
              <li><strong>Unbounded Mutability:</strong> Any method in a call chain can mutate <code>ThreadLocal.set()</code>, making data flow unpredictable and hard to test.</li>
              <li><strong>Memory Retention &amp; Leaks:</strong> Failing to call <code>remove()</code> keeps references alive indefinitely in thread pool carrier threads.</li>
              <li><strong>Inheritance Overhead:</strong> <code>InheritableThreadLocal</code> copies the entire hash map on thread creation, creating massive memory overhead when spawning 50,000 virtual threads.</li>
            </ul>
            <p class="mt-2"><strong>Scoped Values Solution:</strong> Scoped Values are <em>immutable</em> and strictly bounded to a lexical scope. Child threads inherit scoped values via direct shared pointer references without map copying:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>private static final ScopedValue&lt;SecurityContext&gt; CONTEXT = ScopedValue.newInstance();

ScopedValue.where(CONTEXT, userSecurityContext).run(() -&gt; {
    paymentService.process(); // Safely reads CONTEXT.get()
}); // Automatically cleaned up when block exits!</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Locking Internals &bull; High Performance</span>
            <h3 class="text-dark font-weight-bold mb-3">3. <code>StampedLock</code> vs <code>ReentrantReadWriteLock</code>: Optimistic Read Locks &amp; Writer Starvation.</h3>
            <p><code>ReentrantReadWriteLock</code> (RRWL) allows multiple concurrent readers, but has two performance drawbacks under heavy load: 1) readers write to a shared internal state counter, causing CPU cache-line bouncing; 2) continuous read traffic can starve writers indefinitely.</p>
            <h5 class="font-weight-bold text-dark mt-3">The StampedLock Optimistic Read Pattern:</h5>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>private final StampedLock lock = new StampedLock();
private double x, y;

public double distanceFromOrigin() {
    long stamp = lock.tryOptimisticRead(); // Non-blocking! Acquires NO lock!
    double currentX = x, currentY = y;
    if (!lock.validate(stamp)) { // Check if a writer intervened during read
        stamp = lock.readLock(); // Fallback to pessimistic read lock
        try {
            currentX = x; currentY = y;
        } finally {
            lock.unlockRead(stamp);
        }
    }
    return Math.sqrt(currentX * currentX + currentY * currentY);
}</pre>
            <p class="mt-2"><strong>Trade-off:</strong> <code>StampedLock</code> is <em>not reentrant</em> (acquiring the same lock on the same thread causes deadlock) and does not support <code>Condition</code> objects.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">AQS &bull; Core Synchronization</span>
            <h3 class="text-dark font-weight-bold mb-3">4. AQS (AbstractQueuedSynchronizer) Deep Dive: State variable, CLH queue, and LockSupport.</h3>
            <p><strong>AQS</strong> is the backbone of Java's <code>java.util.concurrent</code> synchronizers (<code>ReentrantLock</code>, <code>Semaphore</code>, <code>CountDownLatch</code>, <code>CyclicBarrier</code>):</p>
            <ul class="list-styled pl-4">
              <li><strong>Volatile State:</strong> An atomic 32-bit integer (<code>state</code>) manipulated via CAS (<code>compareAndSetState</code>). In <code>ReentrantLock</code>, <code>state = 0</code> is unlocked; <code>state &gt; 0</code> represents the reentrancy hold count. In <code>Semaphore</code>, it represents available permits.</li>
              <li><strong>CLH Waiting Queue:</strong> A doubly linked FIFO queue of <code>Node</code> objects. Threads that fail to acquire the lock are enqueued at the tail using CAS.</li>
              <li><strong>LockSupport.park() &amp; unpark():</strong> Threads wait inside <code>LockSupport.park()</code> (a native OS thread suspension call). When the owner unlocks, it unparks the head node's thread, transferring execution smoothly without busy-waiting CPU spins.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Hardware Concurrency &bull; Low Latency</span>
            <h3 class="text-dark font-weight-bold mb-3">5. False Sharing and CPU Cache Line Padding: How <code>@Contended</code> prevents cache ping-pong.</h3>
            <p>Modern CPUs transfer data between main memory and CPU caches in <strong>64-byte chunks called Cache Lines</strong>:</p>
            <ul class="list-styled pl-4">
              <li><strong>The Problem:</strong> If Thread 1 on Core A modifies variable <code>x</code> and Thread 2 on Core B modifies independent variable <code>y</code>, but both variables happen to reside within the <em>same 64-byte cache line</em>, modifying <code>x</code> invalidates the entire cache line on Core B. The cores waste hundreds of cycles invalidating and reloading data over the interconnect bus (Cache Line Bouncing / False Sharing).</li>
              <li><strong>The Solution (<code>@Contended</code>):</strong> Introduced in JEP 142 and used by <code>LongAdder</code> and the LMAX Disruptor. Injects 128 bytes of padding before and after critical volatile fields, guaranteeing that independent variables occupy distinct hardware cache lines.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Thread Pool Tuning &bull; Production</span>
            <h3 class="text-dark font-weight-bold mb-3">6. ThreadPoolExecutor Sizing Formula, Queue Sizing, and Rejection Policy Selection.</h3>
            <p>Sizing thread pools blindly in production leads to either thread starvation or memory exhaustion:</p>
            <h5 class="font-weight-bold text-dark mt-3">The Goetz Formula:</h5>
            <p>$$N_{\\text{threads}} = N_{\\text{CPU}} \\times U_{\\text{CPU}} \\times \\left(1 + \\frac{W}{C}\\right)$$</p>
            <p>where $N_{\\text{CPU}}$ is CPU cores, $U_{\\text{CPU}}$ is target CPU utilization (0.0 to 1.0), and $\\frac{W}{C}$ is the ratio of Wait time (I/O) to Compute time (CPU). For CPU-bound tasks, $N_{\\text{threads}} = N_{\\text{CPU}} + 1$. For I/O-bound tasks with 90% wait time, sizing is substantially higher.</p>
            <h5 class="font-weight-bold text-dark mt-3">Rejection Policies:</h5>
            <ul class="list-styled pl-4">
              <li><strong><code>AbortPolicy</code> (Default):</strong> Throws <code>RejectedExecutionException</code>. Good for fail-fast APIs.</li>
              <li><strong><code>CallerRunsPolicy</code>:</strong> Forces the submitting thread (e.g. Tomcat worker) to execute the task directly. <strong>Provides automatic backpressure</strong> by slowing down incoming request intake!</li>
              <li><strong><code>DiscardOldestPolicy</code>:</strong> Drops the oldest queued task to make room for newer requests. Useful in real-time telemetry tracking.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'multithreding.html',
  'Multithreading Fundamentals',
  'Thread life cycle, Runnable vs Thread, synchronization, wait/notify, join, and thread priorities.',
  'Advanced Concurrency, Threading Models &amp; Hardware (2026)',
  'Structured Concurrency (Loom), Scoped Values, StampedLock optimistic reads, AQS internal mechanics, False Sharing, and production thread pool tuning.',
  threadingQuestions
);

// ============================================================================
// 7. exception.html
// ============================================================================
const exceptionQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">RFC 7807 &bull; Modern API Standards</span>
            <h3 class="text-dark font-weight-bold mb-3">1. RFC 7807 Problem Details in Spring Boot 3 &amp; Modern Microservices Error Contracts.</h3>
            <p>In modern REST APIs, returning non-standard JSON error responses (e.g., <code>{"status": "error", "msg": "failed"}</code>) makes cross-service client error parsing brittle. <strong>RFC 7807 (Problem Details for HTTP APIs)</strong> standardizes error reporting across the industry and is supported natively in Spring Boot 3 via <code>ProblemDetail</code>:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>{
  "type": "https://api.technointerview.com/errors/insufficient-balance",
  "title": "Insufficient Account Balance",
  "status": 400,
  "detail": "Account balance of $25.00 is insufficient for transaction of $50.00",
  "instance": "/accounts/acc_12345/transactions",
  "timestamp": "2026-10-12T10:30:00Z",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736"
}</pre>
            <p class="mt-2">Spring Boot 3 enables this globally with <code>spring.mvc.problemdetails.enabled=true</code>, automatically mapping validation failures (<code>MethodArgumentNotValidException</code>) and framework exceptions to standardized Problem Details.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Async Pipelines &bull; Reactive</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Exception Handling in Asynchronous &amp; Reactive Pipelines (CompletableFuture &amp; Project Reactor).</h3>
            <p>Standard <code>try-catch</code> blocks cannot catch exceptions in asynchronous or reactive code because execution occurs on worker threads outside the caller's call stack frame.</p>
            <h5 class="font-weight-bold text-dark mt-3">CompletableFuture Error Handling:</h5>
            <ul class="list-styled pl-4">
              <li><code>exceptionally(fn)</code>: Recovers from errors by returning a fallback value if the stage throws an exception.</li>
              <li><code>handle(BiFunction)</code>: Receives both the result and throwable, allowing unified handling whether the stage succeeded or failed.</li>
              <li><code>whenComplete(BiConsumer)</code>: Executes side-effects (e.g. logging/metrics) without altering the downstream result or exception.</li>
            </ul>
            <h5 class="font-weight-bold text-dark mt-3">Project Reactor / WebFlux:</h5>
            <ul class="list-styled pl-4">
              <li><code>onErrorResume(fallbackPublisher)</code>: Switches to a secondary reactive stream on error.</li>
              <li><code>retryWhen(Retry.backoff(3, Duration.ofSeconds(1)).jitter(0.5))</code>: Production-grade exponential backoff with randomized jitter to prevent thundering herd problems.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Language Mechanics &bull; AutoCloseable</span>
            <h3 class="text-dark font-weight-bold mb-3">3. Suppressed Exceptions in Try-With-Resources: Preserving root cause diagnostic traces.</h3>
            <p>In legacy Java, if a <code>try</code> block threw an exception and the corresponding <code>finally</code> block's <code>close()</code> also threw an exception, the <code>finally</code> exception <strong>masked and erased</strong> the original business exception!</p>
            <h5 class="font-weight-bold text-dark mt-3">How Try-With-Resources Solves This:</h5>
            <p>The original exception thrown inside the <code>try</code> block is preserved as the primary exception. Any secondary exceptions thrown while closing <code>AutoCloseable</code> resources are attached to the primary exception as <strong>Suppressed Exceptions</strong>:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>try (var connection = dataSource.getConnection()) {
    throw new BusinessException("Payment failed");
} catch (Exception ex) {
    // Primary exception is BusinessException
    for (Throwable suppressed : ex.getSuppressed()) {
        log.error("Suppressed resource closure failure: ", suppressed);
    }
}</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Resilience &bull; Failure Classification</span>
            <h3 class="text-dark font-weight-bold mb-3">4. Exception Classification in Distributed Systems: Transient Retriable vs Fatal Domain Errors.</h3>
            <p>A major cause of cascading failure in microservices is retrying the wrong errors. Microservices must strictly classify exceptions into two categories:</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Examples</th>
                    <th>Handling Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Transient / Retriable</strong></td>
                    <td><code>ConnectTimeoutException</code>, <code>SocketTimeoutException</code>, HTTP 503 Service Unavailable, database deadlock</td>
                    <td><strong>Retry with Exponential Backoff + Jitter</strong>. Tripped in Circuit Breaker if failure rate persists.</td>
                  </tr>
                  <tr>
                    <td><strong>Fatal / Non-Retriable</strong></td>
                    <td><code>ConstraintViolationException</code>, <code>BadCredentialsException</code>, HTTP 400 Bad Request, HTTP 404 Not Found</td>
                    <td><strong>Fail Immediately (Fast-fail)</strong>. Must be excluded from Circuit Breaker error counts using <code>ignoreExceptions</code>!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Modern Consensus &bull; Clean Architecture</span>
            <h3 class="text-dark font-weight-bold mb-3">5. Checked vs Unchecked Exceptions: Why modern Java frameworks abandoned Checked Exceptions.</h3>
            <p>Java is the only mainstream programming language with checked exceptions (C#, Kotlin, TypeScript, Go, and Python have none). In modern enterprise architecture, checked exceptions are widely considered an anti-pattern:</p>
            <ul class="list-styled pl-4">
              <li><strong>Violation of Open/Closed Principle:</strong> Declaring <code>throws SQLException</code> on a repository leaks storage details into business service interfaces. Changing an implementation to MongoDB forces signature changes across 10 layers.</li>
              <li><strong>Incompatibility with Functional Programming:</strong> Java 8+ functional interfaces (<code>Function&lt;T, R&gt;</code>, <code>Consumer&lt;T&gt;</code>, <code>Predicate&lt;T&gt;</code>) do not declare checked exceptions, requiring clumsy try-catch wrappers inside Lambdas.</li>
              <li><strong>Modern Best Practice:</strong> Use unchecked (runtime) exceptions for technical/infrastructure faults, and return explicit Result types or <code>Optional</code> for expected domain alternatives.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Observability &bull; SRE Troubleshooting</span>
            <h3 class="text-dark font-weight-bold mb-3">6. Correlating Distributed Exceptions using OpenTelemetry, MDC, and Automated Alerts.</h3>
            <p>When an unhandled exception occurs in production across a chain of 6 microservices, finding the root cause manually through SSH logs is impossible. Senior engineering teams implement <strong>Unified Trace Correlation</strong>:</p>
            <ul class="list-styled pl-4">
              <li><strong>Automatic MDC Injection:</strong> Spring Boot 3 Observation extracts the OpenTelemetry <code>traceId</code> and injects it into SLF4J MDC before any controller or listener executes.</li>
              <li><strong>Global ControllerAdvice Capture:</strong> When an unhandled exception reaches the controller, the exception handler extracts <code>tracer.currentSpan().context().traceId()</code> and includes it in both the log entry and the RFC 7807 response body.</li>
              <li><strong>Instant Troubleshooting:</strong> On-call engineers copy the <code>traceId</code> from customer tickets directly into Grafana Tempo / Jaeger, displaying the exact microservice, class, method, and database query that failed in under 15 seconds.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'exception.html',
  'Exception Handling Fundamentals',
  'Try, catch, finally blocks, throw vs throws, Exception hierarchy, and Custom Exceptions.',
  'Advanced Exception Handling &amp; Distributed Fault Contracts (2026)',
  'RFC 7807 Problem Details, asynchronous/reactive error handling, suppressed exceptions, retriable vs fatal failure classification, and distributed trace correlation.',
  exceptionQuestions
);

// ============================================================================
// 8. java8theory.html
// ============================================================================
const java8Questions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Streams Internals &bull; Pipeline Execution</span>
            <h3 class="text-dark font-weight-bold mb-3">1. Java Streams Internals: Spliterators, Sink chains, Loop Fusion, and Lazy Evaluation.</h3>
            <p>Java Streams do NOT store data. A Stream is an on-demand computational pipeline that executes via <strong>Loop Fusion</strong>:</p>
            <ul class="list-styled pl-4">
              <li><strong>Sink Pipeline Stages:</strong> Intermediate operations (<code>filter()</code>, <code>map()</code>, <code>sorted()</code>) create a doubly-linked list of <code>Sink</code> objects wrapping each other.</li>
              <li><strong>Lazy Evaluation:</strong> No data processing occurs when intermediate operations are declared. Processing begins <em>only when a terminal operation</em> (e.g. <code>collect()</code>, <code>findFirst()</code>, <code>count()</code>) is invoked.</li>
              <li><strong>Loop Fusion:</strong> Instead of making multiple passes over the collection (one pass for filter, one for map), elements are pushed through the entire Sink chain <em>one element at a time in a single pass</em>.</li>
              <li><strong>Spliterator:</strong> The parallel engine of streams. Provides <code>trySplit()</code> to partition data chunks recursively across worker threads, and <code>characteristics()</code> (e.g. <code>ORDERED</code>, <code>SIZED</code>, <code>DISTINCT</code>) to skip redundant operations (e.g., skipping sort if source is already sorted).</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Concurrency Hazards &bull; ForkJoinPool</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Why using <code>parallelStream()</code> in Enterprise Web Services is dangerous: CommonPool Starvation.</h3>
            <p>Calling <code>list.parallelStream()</code> executes tasks on the shared, JVM-wide <strong><code>ForkJoinPool.commonPool()</code></strong>, which has a thread count equal to CPU cores minus 1.</p>
            <h5 class="font-weight-bold text-dark mt-3">The Production Starvation Trap:</h5>
            <p>If an HTTP request thread triggers a parallel stream that executes blocking I/O (e.g., calling an external REST API or database), those worker threads block inside the common pool. Because the common pool is JVM-wide, this starvates unrelated parallel streams across the entire application, causing widespread request timeouts and latency spikes.</p>
            <p><strong>Senior Engineer Rule:</strong> Reserve <code>parallelStream()</code> strictly for CPU-intensive, in-memory computations. For concurrent I/O operations, use <strong>Java 21 Virtual Threads</strong> or dedicated <code>ExecutorService</code> instances.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Advanced Collectors &bull; Modern Java</span>
            <h3 class="text-dark font-weight-bold mb-3">3. Advanced Collectors: <code>Collectors.teeing()</code>, multi-level <code>groupingBy()</code>, and downstream aggregation.</h3>
            <p>Introduced in Java 12, <code>Collectors.teeing()</code> merges the results of two independent downstream collectors in a <strong>single pass over the stream</strong>:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'><span style='color: #38bdf8;'>record</span> Summary(double average, long totalCount) {}

<span style='color: #38bdf8;'>Summary</span> summary = transactions.stream()
    .collect(Collectors.teeing(
        Collectors.averagingDouble(Transaction::amount),
        Collectors.counting(),
        Summary::new // Merges the two results together in 1 pass!
    ));</pre>
            <p class="mt-2"><strong>Multi-Level Grouping:</strong> Grouping employees by department and calculating the highest salary in each department using downstream reduction:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>Map&lt;Department, Optional&lt;Employee&gt;&gt; topEarners = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::department,
        Collectors.maxBy(Comparator.comparing(Employee::salary))
    ));</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">JVM Bytecode &bull; invokedynamic</span>
            <h3 class="text-dark font-weight-bold mb-3">4. Lambdas vs Anonymous Inner Classes at the Bytecode Level: <code>invokedynamic</code> &amp; LambdaMetafactory.</h3>
            <p>Lambda expressions are NOT syntax sugar for Anonymous Inner Classes. The architectural differences at runtime and bytecode level are significant:</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Anonymous Inner Class</th>
                    <th>Lambda Expression</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Generated Class Files</strong></td>
                    <td>Generates a separate disk class file (<code>MyClass$1.class</code>) for every occurrence</td>
                    <td><strong>Zero extra class files generated on disk</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Bytecode Instruction</strong></td>
                    <td>Compiles to <code>new MyClass$1()</code> + <code>invokespecial</code></td>
                    <td>Compiles to an <strong><code>invokedynamic</code> (indy)</strong> instruction</td>
                  </tr>
                  <tr>
                    <td><strong>Memory Allocation</strong></td>
                    <td>Allocates a new object on heap on every invocation unless manually cached</td>
                    <td>Translates to a private method via <code>LambdaMetafactory</code>; non-capturing lambdas are cached as singletons!</td>
                  </tr>
                  <tr>
                    <td><strong><code>this</code> Scope</strong></td>
                    <td>Refers to the inner class instance</td>
                    <td>Refers to the enclosing outer class instance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Clean Code &bull; Anti-Patterns</span>
            <h3 class="text-dark font-weight-bold mb-3">5. <code>java.util.Optional</code>: Production Best Practices &amp; High-Frequency Anti-Patterns.</h3>
            <ul class="list-styled pl-4">
              <li><strong>Intended Purpose:</strong> <code>Optional</code> was designed strictly as a <strong>method return type</strong> to indicate that a result might be absent without returning <code>null</code>.</li>
              <li><strong>Anti-Pattern 1: <code>Optional</code> as Field or Parameter:</strong> <code>Optional</code> is NOT <code>Serializable</code>. Using it as a class field breaks serialization frameworks (Jackson, Java serialization) and adds an extra 16-24 byte pointer overhead on the heap.</li>
              <li><strong>Anti-Pattern 2: <code>Optional.get()</code> without <code>isPresent()</code>:</strong> Defeats the purpose of <code>Optional</code> and throws <code>NoSuchElementException</code>. Use <code>orElseThrow()</code> with descriptive custom exceptions or <code>map().orElse()</code>.</li>
              <li><strong>Anti-Pattern 3: <code>orElse()</code> vs <code>orElseGet()</code>:</strong> <code>orElse(expensiveCalculation())</code> executes the fallback method <em>every time</em>, even if the Optional contains a value! Always use <code>orElseGet(() -&gt; expensiveCalculation())</code> to defer evaluation lazily.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Asynchronous Composition &bull; Futures</span>
            <h3 class="text-dark font-weight-bold mb-3">6. Complex <code>CompletableFuture</code> Orchestration: Chaining, Timeouts, and Error Recovery.</h3>
            <p>Senior engineers construct non-blocking asynchronous pipelines using monadic composition:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>CompletableFuture&lt;OrderSummary&gt; pipeline = CompletableFuture
    .supplyAsync(() -&gt; orderClient.getOrder(orderId), customExecutor)
    .thenCompose(order -&gt; 
        CompletableFuture.supplyAsync(() -&gt; inventoryClient.reserve(order))
            .thenCombine(
                CompletableFuture.supplyAsync(() -&gt; paymentClient.charge(order)),
                (inv, pay) -&gt; new OrderSummary(order, inv, pay)
            )
    )
    .orTimeout(3, TimeUnit.SECONDS) // Java 9+ timeout support!
    .exceptionallyCompose(ex -&gt; {
        log.error("Pipeline failed: {}", ex.getMessage());
        return CompletableFuture.completedFuture(OrderSummary.failed(orderId));
    });</pre>
            <p class="mt-2"><strong>Key Insight:</strong> <code>thenApply</code> is for synchronous value transformation ($T \\to U$), while <code>thenCompose</code> is monadic flatMap ($T \\to \\text{CompletableFuture}\\langle U\\rangle$), preventing nested <code>CompletableFuture&lt;CompletableFuture&lt;T&gt;&gt;</code> types.</p>
          </div>
        </div>
`;

updatePage(
  'java8theory.html',
  'Java 8 Core Theory',
  'Functional interfaces, Lambda syntax, default methods, Stream API, and Method References.',
  'Advanced Functional Java, Streams Internals &amp; Asynchronous Pipelines (2026)',
  'Stream Spliterators and Sink pipeline execution, ForkJoin common pool hazards, Collectors.teeing, invokedynamic bytecode, and CompletableFuture pipelines.',
  java8Questions
);

// ============================================================================
// 9. hibernate.html
// ============================================================================
const hibernateQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Performance &bull; Query Optimization</span>
            <h3 class="text-dark font-weight-bold mb-3">1. Solving the N+1 Select Problem: JOIN FETCH vs JPA EntityGraph vs <code>@BatchSize</code>.</h3>
            <p>The <strong>N+1 Query Problem</strong> occurs when loading 1 parent entity query triggers $N$ additional sub-queries to fetch lazy child associations (e.g., 100 orders trigger 100 separate queries for customer details).</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Strategy</th>
                    <th>Mechanism</th>
                    <th>Pros</th>
                    <th>Cons &amp; Pitfalls</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong><code>JOIN FETCH</code></strong></td>
                    <td>Generates a single SQL query using an inner/left join in JPQL</td>
                    <td>Single database roundtrip</td>
                    <td>Cannot fetch multiple <code>List</code> collections simultaneously (Cartesian Product / <code>MultipleBagFetchException</code>)</td>
                  </tr>
                  <tr>
                    <td><strong>JPA <code>@EntityGraph</code></strong></td>
                    <td>Declarative graph of attributes to fetch eagerly at runtime</td>
                    <td>Dynamic: can use different fetch plans for different repository methods</td>
                    <td>Same Cartesian product limitation if multiple subgraphs are eagerly fetched</td>
                  </tr>
                  <tr>
                    <td><strong><code>@BatchSize(size=50)</code></strong></td>
                    <td>Executes sub-queries using <code>WHERE id IN (?, ?, ...)</code></td>
                    <td><strong>Safely handles multiple collections without Cartesian explosion</strong></td>
                    <td>Requires multiple SQL statements (1 parent query + $\\lceil N/50 \\rceil$ batch queries)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Caching Architecture &bull; Second-Level</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Hibernate Multi-Level Caching: First-Level, Second-Level (Redis/Hazelcast), and Query Cache.</h3>
            <ul class="list-styled pl-4">
              <li><strong>First-Level Cache (Session Cache):</strong> Mandatory and tied to the lifecycle of the current <code>EntityManager</code> / <code>Session</code>. Acts as an Identity Map and dirty-checking buffer. Automatically discarded when transaction ends.</li>
              <li><strong>Second-Level Cache (SessionFactory Cache):</strong> Shared across all sessions and application nodes (using Redis via Redisson, or Hazelcast). Stores <em>dehydrated entity state</em> (arrays of primitive values, not managed entity objects).</li>
              <li><strong>Query Cache:</strong> Stores query parameter hashes mapping to <em>entity primary keys</em> (IDs). <strong>Production Warning:</strong> Any insert, update, or delete on the target table invalidates the entire query cache region! Only use for read-heavy, almost static tables.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Concurrency &bull; Data Integrity</span>
            <h3 class="text-dark font-weight-bold mb-3">3. Optimistic Locking (<code>@Version</code>) vs Pessimistic Locking (<code>PESSIMISTIC_WRITE</code>) in Financial Workflows.</h3>
            <p>When multiple concurrent transactions update the same entity (e.g. deducting account balance or purchasing warehouse stock), concurrency control is mandatory:</p>
            <ul class="list-styled pl-4">
              <li><strong>Optimistic Locking (<code>@Version</code>):</strong> Adds an integer/timestamp column. Updates execute: <code>UPDATE account SET balance = ?, version = version + 1 WHERE id = ? AND version = ?</code>. If another transaction updated the row first, 0 rows are affected and Hibernate throws <code>OptimisticLockException</code>.
                <br/><em>Best for:</em> High-concurrency reads with low conflict rates; clients retry on failure.
              </li>
              <li><strong>Pessimistic Locking (<code>LockModeType.PESSIMISTIC_WRITE</code>):</strong> Issues a database-level row lock: <code>SELECT ... FOR UPDATE</code>. All other transactions reading or writing the row block until the transaction commits.
                <br/><em>Best for:</em> High-contention financial transactions where retries are too expensive. Must use lock timeouts (e.g. <code>javax.persistence.lock.timeout = 3000</code>) to prevent distributed database deadlocks.
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot 3 &bull; Hibernate 6.x</span>
            <h3 class="text-dark font-weight-bold mb-3">4. Hibernate 6.x Architectural Evolution: Semantic Query Model (SQM) &amp; Performance Boosts.</h3>
            <p>Hibernate 6 (the foundation of Spring Boot 3 / Spring Data JPA 3) represents the biggest internal rewrite in Hibernate history:</p>
            <ul class="list-styled pl-4">
              <li><strong>Semantic Query Model (SQM):</strong> Completely replaced the ancient ANTLR 2 HQL parser. HQL and Criteria queries now compile to a single unified semantic tree (SQM), allowing identical optimizations and native SQL tree translation.</li>
              <li><strong>Direct JDBC Read/Write:</strong> Bypasses legacy reflection and object array boxing during result set hydration. Queries read typed columns directly from JDBC <code>ResultSet</code>, boosting query execution performance by 15-30%.</li>
              <li><strong>Native JSON and Array Types:</strong> Native support for PostgreSQL/MySQL JSON and Array columns via <code>@JdbcTypeCode(SqlTypes.JSON)</code> without needing external third-party Hibernate Types libraries.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">High Volume &bull; Batch Processing</span>
            <h3 class="text-dark font-weight-bold mb-3">5. Processing 500,000 Records Without OutOfMemoryError: JDBC Batching vs <code>StatelessSession</code>.</h3>
            <p>Inserting or updating 500,000 records using standard <code>repository.save()</code> crashes the JVM with <code>OutOfMemoryError</code> because Hibernate's First-Level Cache retains every entity in memory for dirty checking.</p>
            <h5 class="font-weight-bold text-dark mt-3">Production Strategies:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Strategy A: Flush &amp; Clear in Batches:</strong>
                <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>for (int i = 0; i &lt; items.size(); i++) {
    entityManager.persist(items.get(i));
    if (i % 50 == 0) {
        entityManager.flush(); // Sends JDBC batch to database
        entityManager.clear(); // Empties first-level cache to reclaim heap!
    }
}</pre>
                Enable in <code>application.properties</code>: <code>spring.jpa.properties.hibernate.jdbc.batch_size=50</code> and <code>spring.jpa.properties.hibernate.order_inserts=true</code>.
              </li>
              <li><strong>Strategy B: Hibernate <code>StatelessSession</code>:</strong> A lightweight, command-oriented session that bypasses the First-Level Cache, dirty-checking, cascades, and interceptors completely. Streams raw JDBC operations directly with near-zero heap overhead.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Transactions &bull; Common Traps</span>
            <h3 class="text-dark font-weight-bold mb-3">6. Subtle Traps of <code>@Transactional</code>: Self-invocation, Checked Exception rollbacks, and Connection Pool exhaustion.</h3>
            <ul class="list-styled pl-4">
              <li><strong>Self-Invocation Proxy Bypass:</strong> Spring manages <code>@Transactional</code> via CGLIB dynamic proxies. Calling a <code>@Transactional</code> method from another method <em>within the same class</em> calls <code>this.method()</code> directly, bypassing the Spring proxy! Transaction boundaries are ignored and no transaction is opened.</li>
              <li><strong>Checked Exception Rollback Defaults:</strong> By default, Spring rolls back transactions <em>only on <code>RuntimeException</code> and <code>Error</code></em>! If a method throws a checked exception (e.g. <code>IOException</code>, <code>SQLException</code>), Spring commits the transaction! Fix: always specify <code>@Transactional(rollbackFor = Exception.class)</code>.</li>
              <li><strong><code>Propagation.REQUIRES_NEW</code> Pool Exhaustion:</strong> When a method with <code>REQUIRES_NEW</code> is called from an existing transaction, Spring suspends the first transaction (holding its database connection) and borrows a <strong>second database connection</strong> from HikariCP. Under high concurrent load, this causes mutual connection starvation and application deadlock.</li>
            </ul>
          </div>
        </div>
`;

updatePage(
  'hibernate.html',
  'Hibernate &amp; JPA Fundamentals',
  'ORM architecture, Hibernate Configuration, Session &amp; SessionFactory, Entity lifecycle, and HQL basics.',
  'Advanced Hibernate, Caching &amp; Performance Engineering (2026)',
  'N+1 query solutions, Second-Level caching with Redis, Optimistic vs Pessimistic locking, Hibernate 6 SQM architecture, batching, and @Transactional pitfalls.',
  hibernateQuestions
);

// ============================================================================
// 10. designp.html
// ============================================================================
const designPatternsQuestions = `
        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Cloud-Native &bull; Event Sourcing</span>
            <h3 class="text-dark font-weight-bold mb-3">1. CQRS (Command Query Responsibility Segregation) &amp; Event Sourcing Architecture.</h3>
            <p>In high-scale enterprise systems, traditional CRUD models where the same relational schema handles both complex business writes and reporting queries suffer from contention, indexing trade-offs, and lock saturation.</p>
            <h5 class="font-weight-bold text-dark mt-3">CQRS + Event Sourcing Architecture:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Command Model (Write Side):</strong> Optimized for business logic invariants. Validates domain rules and appends immutable events (e.g. <code>OrderCreatedEvent</code>, <code>ItemAddedEvent</code>) to an append-only <strong>Event Store</strong>. Current state is never overwritten; it is reconstructed by replaying events.</li>
              <li><strong>Query Model (Read Side):</strong> Asynchronous event projectors consume events from the Event Store and populate denormalized, purpose-built read databases (e.g., Elasticsearch for text search, Redis for key-value lookups, PostgreSQL for relational views).</li>
              <li><strong>Trade-offs:</strong> Introduces <em>Eventual Consistency</em> (read models reflect writes with slight millisecond replication lag), event schema evolution challenges (upcasting), and snapshotting requirements for entities with thousands of events.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Resiliency Patterns &bull; Stability</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Defense-in-Depth Resiliency: Circuit Breaker, Bulkhead, Rate Limiter, and Retry Patterns.</h3>
            <p>Cascading failures in distributed systems happen when a slow or failing downstream dependency causes upstream callers to wait, exhausting threads and toppling the entire platform. Senior architects combine 4 orthogonal patterns:</p>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Pattern</th>
                    <th>Failure Mode Addressed</th>
                    <th>Core Mechanism</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Circuit Breaker</strong></td>
                    <td>Persistent downstream outage or high error rate</td>
                    <td>Fails fast immediately (State: OPEN) to protect downstream and preserve caller latency</td>
                  </tr>
                  <tr>
                    <td><strong>Bulkhead</strong></td>
                    <td>Slow downstream service consuming all server threads</td>
                    <td>Isolates thread pools or semaphores so Service A failure cannot exhaust threads needed for Service B</td>
                  </tr>
                  <tr>
                    <td><strong>Rate Limiter</strong></td>
                    <td>Traffic spikes, noisy neighbors, and DDoS attacks</td>
                    <td>Enforces maximum calls per time window, rejecting excess traffic with HTTP 429</td>
                  </tr>
                  <tr>
                    <td><strong>Retry with Backoff</strong></td>
                    <td>Transient network glitches and momentary blips</td>
                    <td>Retries failed requests using exponential backoff with randomized jitter to prevent thundering herds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring Boot Design &bull; Clean Code</span>
            <h3 class="text-dark font-weight-bold mb-3">3. Modern Strategy &amp; Factory Patterns via Spring Boot Dynamic Dependency Injection.</h3>
            <p>Senior Java developers eliminate brittle <code>switch-case</code> statements and <code>if-else</code> chains by leveraging Spring's built-in container injection:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>public interface PaymentStrategy {
    PaymentType getType();
    PaymentResponse pay(PaymentRequest request);
}

@Service
public class PaymentFactory {
    private final Map&lt;PaymentType, PaymentStrategy&gt; strategyMap;

    // Spring automatically injects ALL beans implementing PaymentStrategy!
    public PaymentFactory(List&lt;PaymentStrategy&gt; strategies) {
        this.strategyMap = strategies.stream()
            .collect(Collectors.toMap(PaymentStrategy::getType, Function.identity()));
    }

    public PaymentStrategy getStrategy(PaymentType type) {
        return Optional.ofNullable(strategyMap.get(type))
            .orElseThrow(() -&gt; new UnsupportedOperationException("No strategy for: " + type));
    }
}</pre>
            <p class="mt-2">Adding a new payment provider (e.g. ApplePay) requires creating a new <code>@Component</code> implementing <code>PaymentStrategy</code>. <strong>Zero modifications to existing classes (Pure Open/Closed Principle)</strong>.</p>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Kubernetes Patterns &bull; Mesh</span>
            <h3 class="text-dark font-weight-bold mb-3">4. Cloud-Native Pod Patterns: Sidecar, Ambassador, and Adapter Patterns in Kubernetes.</h3>
            <p>In containerized Kubernetes environments, multi-container pods implement three classic structural patterns:</p>
            <ul class="list-styled pl-4">
              <li><strong>Sidecar Pattern:</strong> Extends or enhances the main application container without modifying application source code. Example: Envoy proxy sidecar in Istio injecting mutual TLS (mTLS), Prometheus metric scraping, and distributed tracing headers.</li>
              <li><strong>Ambassador Pattern:</strong> Acts as a local proxy that abstracts connections to external services. The application talks to <code>localhost:6379</code>; the ambassador proxy handles sharding, failover, and routing to remote Redis clusters.</li>
              <li><strong>Adapter Pattern:</strong> Standardizes heterogeneous application interfaces. Example: an adapter container that reads proprietary log formats or metrics from the primary application container and exposes them in Prometheus standard format.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Reliable Messaging &bull; Kafka</span>
            <h3 class="text-dark font-weight-bold mb-3">5. Transactional Outbox Pattern &amp; Idempotent Consumer Pattern in Event-Driven Architecture.</h3>
            <p>Asynchronous microservice communication requires guaranteed delivery and processing without duplicates:</p>
            <ul class="list-styled pl-4">
              <li><strong>The Outbox Pattern:</strong> Eliminates the dual-write bug when saving to database and publishing to Apache Kafka. The event is persisted into an <code>outbox</code> database table inside the same local ACID transaction. A Debezium CDC pipeline tails the transaction log to stream messages to Kafka.</li>
              <li><strong>The Idempotent Consumer Pattern:</strong> Because network partitions cause brokers to deliver messages more than once (At-Least-Once delivery), consumers must be strictly idempotent:
                <br/>1. Unique message ID check against an <code>idempotency_keys</code> table.
                <br/>2. Conditional database updates (e.g. <code>UPDATE orders SET status = 'PAID' WHERE id = ? AND status = 'PENDING'</code>).
                <br/>3. Natural idempotency: setting a state rather than incrementing a balance.
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Legacy Migration &bull; Zero Downtime</span>
            <h3 class="text-dark font-weight-bold mb-3">6. The Strangler Fig Pattern: Incrementally Migrating Monoliths to Microservices Without Big-Bang Risk.</h3>
            <p>Big-Bang rewrites of multi-million-line legacy systems fail over 80% of the time. The <strong>Strangler Fig Pattern</strong> (inspired by the Australian strangler fig tree that envelops and replaces its host tree) migrates systems iteratively over 12-24 months:</p>
            <ol class="pl-4 text-secondary">
              <li><strong>Phase 1 (Interception):</strong> Place an API Gateway (Envoy/Kong) in front of the legacy monolith. All user traffic flows through the gateway to the monolith unchanged.</li>
              <li><strong>Phase 2 (Carve Out):</strong> Select a discrete business domain (e.g., Notification or Inventory). Build a modern microservice implementing this domain.</li>
              <li><strong>Phase 3 (Data Synchronization):</strong> Use CDC (Change Data Capture) or dual-writing to synchronize data bi-directionally between monolith and microservice databases.</li>
              <li><strong>Phase 4 (Traffic Shift):</strong> Route 5% &rarr; 50% &rarr; 100% of the target API path (e.g. <code>/api/notifications/*</code>) to the new microservice via the Gateway.</li>
              <li><strong>Phase 5 (Decommission):</strong> Once verified in production, delete the legacy code from the monolith. Repeat for the next domain until the monolith disappears.</li>
            </ol>
          </div>
        </div>
`;

updatePage(
  'designp.html',
  'Design Pattern Fundamentals',
  'Creational, Structural, and Behavioral Gang of Four (GoF) patterns with Java code examples.',
  'Advanced Design Patterns, Cloud-Native Architecture &amp; Enterprise Systems (2026)',
  'CQRS &amp; Event Sourcing, defense-in-depth resiliency, Spring dynamic Strategy factories, Kubernetes Sidecar/Ambassador patterns, and Strangler Fig migrations.',
  designPatternsQuestions
);

console.log('All 9 pages processed successfully!');
