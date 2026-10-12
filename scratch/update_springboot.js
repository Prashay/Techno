const fs = require('fs');
const path = 'springboot.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Insert Part 1 Header if not already present
const part1Header = `        <!-- SECTION 1: BASIC & CORE -->
        <div class="col-12 mb-4">
          <div class="level-badge basic"><i class="ti-bookmark mr-1"></i> PART 1: CORE &amp; FOUNDATIONAL QUESTIONS</div>
          <h2 class="level-heading">Spring &amp; Spring Boot Fundamentals <span class="badge badge-primary font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Basic &bull; Developer</span></h2>
          <p class="text-secondary">Core annotations, component model, auto-configuration principles, and fundamental framework features.</p>
          <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
        </div>
`;

if (!content.includes('PART 1: CORE &amp; FOUNDATIONAL QUESTIONS')) {
  // Find course details row
  const marker = '<!-- course details -->';
  const rowIdx = content.indexOf('<div class="row">', content.indexOf(marker));
  if (rowIdx !== -1) {
    const insertPos = content.indexOf('>', rowIdx) + 1;
    content = content.slice(0, insertPos) + '\n' + part1Header + content.slice(insertPos);
  }
}

// 2. Insert Part 2 Advanced & Tech Lead Questions
const part2Content = `
        <!-- ========================================================================== -->
        <!-- SECTION 2: ADVANCED & TECH LEAD (2026 EDITION) -->
        <!-- ========================================================================== -->
        <div class="col-12 my-5 pt-4">
          <div class="level-badge advance mb-2"><i class="ti-star mr-1"></i> PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS</div>
          <h2 class="level-heading">Advanced, Architecture &amp; Lead Questions <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Senior &bull; Tech Lead &bull; 2026</span></h2>
          <p class="text-secondary">System internals, virtual threads, native compilation, resiliency, observability, and high-frequency 2026 senior technical interview discussions.</p>
          <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Architecture &bull; Concurrency</span>
            <h3 class="text-dark font-weight-bold mb-3">1. How do Java 21+ Virtual Threads integrate with Spring Boot 3.2+ and embedded Tomcat? What are the critical production pitfalls?</h3>
            <p>In <strong>Spring Boot 3.2+</strong>, virtual threads (Project Loom) can be enabled globally with a single configuration property:</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>spring.threads.virtual.enabled=true</pre>
            <p><strong>Under the Hood:</strong> Spring Boot automatically configures the embedded Tomcat protocol handler (or Jetty) to use <code>Executors.newVirtualThreadPerTaskExecutor()</code>. Instead of dedicating a heavyweight OS platform thread (typically ~1MB stack) per incoming HTTP connection, Tomcat dispatches each HTTP request on a lightweight Virtual Thread mounted on an underlying pool of <em>Carrier Threads</em> (ForkJoinPool worker threads equal to available CPU cores).</p>
            <h5 class="font-weight-bold text-dark mt-3">Critical Production Pitfalls:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Carrier Thread Pinning:</strong> When a virtual thread executes inside a synchronized block or calls native code (JNI) and blocks on I/O, it cannot unmount from its carrier thread. This pins the OS carrier thread, quickly starving the ForkJoinPool. <em>Mitigation:</em> Replace legacy <code>synchronized</code> blocks with <code>java.util.concurrent.locks.ReentrantLock</code> and monitor via <code>-Djdk.tracePinnedThreads=full</code>.</li>
              <li><strong>ThreadLocal Memory Leaks &amp; Overhead:</strong> Spawning millions of virtual threads that each inherit large <code>ThreadLocal</code> maps causes massive heap inflation and GC overhead. <em>Mitigation:</em> Migrate to <strong>Scoped Values</strong> (JEP 446) in Java 21+.</li>
              <li><strong>Database Connection Pool Saturation:</strong> Virtual threads allow concurrency from 200 requests up to 50,000+ requests simultaneously, but JDBC connection pools (HikariCP) are still limited by database connections (e.g., 50-100 max connections). Virtual threads will queue waiting on HikariCP connections. Use bounded semaphores to prevent connection pool exhaustion.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Performance &bull; Cloud-Native</span>
            <h3 class="text-dark font-weight-bold mb-3">2. Explain Spring Boot 3.x Ahead-Of-Time (AOT) engine and GraalVM Native Image: compilation lifecycle, benefits, and reflection/proxy limitations.</h3>
            <p>Spring Boot 3 introduced a first-class <strong>AOT (Ahead-of-Time)</strong> processing engine that translates dynamic runtime configurations into static, pre-computed code tailored for <strong>GraalVM Native Image</strong> compilation.</p>
            <h5 class="font-weight-bold text-dark mt-3">AOT Compilation Lifecycle:</h5>
            <ul class="list-styled pl-4">
              <li><strong>Build-Time Inspection:</strong> At build time (using <code>spring-boot-maven-plugin:process-aot</code>), Spring analyzes <code>@Configuration</code>, <code>@ComponentScan</code>, and condition evaluation (<code>@ConditionalOn...</code>) upfront.</li>
              <li><strong>Code Generation:</strong> It generates optimized Java source code that registers bean definitions programmatically without classpath scanning or dynamic runtime reflection.</li>
              <li><strong>Native Compilation:</strong> GraalVM compiles the generated code and JDK classes directly into a standalone binary (machine code) using closed-world analysis.</li>
            </ul>
            <h5 class="font-weight-bold text-dark mt-3">Key Benefits &amp; Trade-offs:</h5>
            <div class="poly">
              <table>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th>Standard JIT (JVM)</th>
                    <th>GraalVM Native Image (AOT)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Startup Time</strong></td>
                    <td>1.5s - 5.0s</td>
                    <td><strong>&lt; 50ms (Near instantaneous)</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Memory Footprint (RSS)</strong></td>
                    <td>350MB - 600MB</td>
                    <td><strong>30MB - 70MB (Ideal for serverless / scale-to-zero)</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Peak Throughput</strong></td>
                    <td>Higher (due to runtime C2 JIT optimization)</td>
                    <td>Slightly lower peak throughput without PGO (Profile-Guided Optimization)</td>
                  </tr>
                  <tr>
                    <td><strong>Dynamic Reflection &amp; Proxies</strong></td>
                    <td>Full runtime support</td>
                    <td>Requires explicit <code>RuntimeHints</code> or <code>@RegisterReflectionForBinding</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Spring 6 API &bull; HTTP Clients</span>
            <h3 class="text-dark font-weight-bold mb-3">3. What is Spring 6's <code>RestClient</code> and how does it compare against <code>RestTemplate</code>, <code>WebClient</code>, and Spring Cloud OpenFeign?</h3>
            <p>Introduced in <strong>Spring Framework 6.1 / Spring Boot 3.2</strong>, <code>RestClient</code> is a modern, synchronous HTTP client that provides the fluent, expressive API style of <code>WebClient</code> while backed by standard blocking HTTP libraries without requiring reactive dependencies (Project Reactor).</p>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'><span style='color: #38bdf8;'>RestClient</span> client = RestClient.builder()
    .baseUrl(<span style='color: #fde047;'>"https://api.inventory.service"</span>)
    .defaultHeader(<span style='color: #fde047;'>"Accept"</span>, MediaType.APPLICATION_JSON_VALUE)
    .requestInterceptor(authInterceptor)
    .build();

<span style='color: #38bdf8;'>ProductResponse</span> product = client.get()
    .uri(<span style='color: #fde047;'>"/products/{id}"</span>, productId)
    .retrieve()
    .body(ProductResponse.class);</pre>
            <h5 class="font-weight-bold text-dark mt-3">Architectural Comparison:</h5>
            <ul class="list-styled pl-4">
              <li><strong>vs RestTemplate:</strong> <code>RestTemplate</code> is in maintenance mode. <code>RestClient</code> is its modern replacement with clean chaining, better error handlers, and support for declarative HTTP interfaces (<code>@HttpExchange</code>).</li>
              <li><strong>vs WebClient:</strong> <code>WebClient</code> is non-blocking and reactive (requires <code>spring-boot-starter-webflux</code>). For standard servlet-based architectures, <code>RestClient</code> + Virtual Threads achieves massive concurrency without reactive complexity.</li>
              <li><strong>vs OpenFeign:</strong> Spring 6 now offers native declarative HTTP interfaces: you annotate an interface with <code>@GetExchange("/api/orders")</code>, and Spring automatically generates an implementation backed by <code>RestClient</code>, eliminating external Feign dependencies.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Fault Tolerance &bull; Production Resiliency</span>
            <h3 class="text-dark font-weight-bold mb-3">4. How do you implement production-grade Resiliency and Rate Limiting in Spring Boot using Resilience4j?</h3>
            <p><strong>Resilience4j</strong> provides modular fault tolerance primitives integrated with Spring Boot Actuator and Micrometer:</p>
            <ul class="list-styled pl-4">
              <li><strong>Circuit Breaker:</strong> Monitors downstream failures across a sliding window (count-based e.g. 100 calls, or time-based e.g. 60 seconds). Transitions:
                <br/><code>CLOSED</code> (normal) &rarr; failure rate &gt; threshold (e.g. 50%) &rarr; <code>OPEN</code> (fast-fail, immediate fallback without calling downstream) &rarr; wait duration elapsed (e.g. 10s) &rarr; <code>HALF_OPEN</code> (test probe calls) &rarr; success recovers to <code>CLOSED</code>.
              </li>
              <li><strong>RateLimiter:</strong> Enforces token-bucket rate limits per client or per endpoint (e.g., 100 requests per 10 seconds), returning HTTP 429 Too Many Requests when exceeded.</li>
              <li><strong>Bulkhead:</strong> Limits concurrent calls to a downstream service using isolated semaphores or thread pools, ensuring a slow third-party service cannot exhaust all Tomcat worker threads.</li>
            </ul>
            <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>@CircuitBreaker(name = <span style='color: #fde047;'>"paymentGateway"</span>, fallbackMethod = <span style='color: #fde047;'>"paymentFallback"</span>)
@RateLimiter(name = <span style='color: #fde047;'>"paymentRateLimit"</span>)
public PaymentResult processPayment(PaymentRequest request) {
    return paymentClient.charge(request);
}

public PaymentResult paymentFallback(PaymentRequest request, Throwable ex) {
    log.warn(<span style='color: #fde047;'>"Payment service degraded, queueing transaction: {}"</span>, ex.getMessage());
    return PaymentResult.queued(request.getTransactionId());
}</pre>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Observability &bull; OpenTelemetry</span>
            <h3 class="text-dark font-weight-bold mb-3">5. How does Spring Boot 3 Observability work with Micrometer, W3C TraceContext, and OpenTelemetry?</h3>
            <p>In Spring Boot 3, metrics, logs, and distributed tracing are unified under the <strong>Micrometer Observation API</strong>:</p>
            <ul class="list-styled pl-4">
              <li><strong>Unified Observation:</strong> Instead of writing separate code for metrics and distributed tracing, you wrap business operations in an <code>Observation</code> (or annotate methods with <code>@Observed</code>). Micrometer automatically records timers, counters, and spans concurrently.</li>
              <li><strong>W3C TraceContext Propagation:</strong> When an HTTP call is received, Spring extracts the W3C <code>traceparent</code> header (e.g., <code>00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01</code>). It injects the <code>traceId</code> and <code>spanId</code> into the logging MDC (Mapped Diagnostic Context) so every log line contains correlation IDs.</li>
              <li><strong>OTLP Exporters:</strong> Spring Boot can stream traces and metrics directly via OpenTelemetry Protocol (OTLP) to Prometheus, Grafana Tempo, Datadog, or Jaeger without requiring vendor-specific agents.</li>
            </ul>
          </div>
        </div>

        <div class="col-12 mb-4">
          <div class="interview-section-card advance-card">
            <span class="advance-tag">Distributed Systems &bull; API Design</span>
            <h3 class="text-dark font-weight-bold mb-3">6. How do you design Idempotent REST APIs and Transactional Outbox consumers in Spring Boot?</h3>
            <p>For financial transactions, checkout, and inventory mutation, network retries can duplicate requests unless strict idempotency is engineered:</p>
            <ul class="list-styled pl-4">
              <li><strong>Idempotency-Key Header:</strong> Clients send a unique UUID in the <code>Idempotency-Key</code> header on POST/PUT requests. A Spring filter / interceptor checks Redis:
                <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>Boolean acquired = redisTemplate.opsForValue()
    .setIfAbsent("idemp:" + key, "IN_PROGRESS", Duration.ofMinutes(10));
if (!acquired) {
    return fetchCachedResponseOrReject(key);
}</pre>
              </li>
              <li><strong>Database Deduplication:</strong> Maintain an <code>idempotency_keys</code> table with a primary key constraint on <code>(key, client_id)</code> inside the local ACID transaction.</li>
              <li><strong>Transactional Outbox Pattern:</strong> Never commit to the database and call <code>kafkaTemplate.send()</code> in the same method (dual-write hazard). Write the business entity AND an event record into an <code>outbox</code> table in the <strong>same database transaction</strong>. Use Debezium (CDC) or a transactional poller to stream outbox events to Kafka with at-least-once guarantee.</li>
            </ul>
          </div>
        </div>
`;

// Insert part2Content right before the end of course details row:
// We look for:
// </div>\s*</div>\s*</section>\s*<!-- /section -->
const regex = /(<\/div>\s*<\/div>\s*<\/section>\s*<!-- \/section -->)/;
if (regex.test(content)) {
  content = content.replace(regex, part2Content + '\n    $1');
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated springboot.html with Basic & Advance sections!');
} else {
  console.error('Could not find end of section in springboot.html');
}
