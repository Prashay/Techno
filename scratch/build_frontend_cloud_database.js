const fs = require('fs');
const { createStandardPage } = require('./page_template_helper');

// ============================================================================
// 1. REACTJS.HTML
// ============================================================================
const reactPart1 = `
      <div class="col-12 mb-4">
        <h3>1. What is the Virtual DOM and how does React's Reconciliation process work?</h3>
        <p>The <strong>Virtual DOM</strong> is an in-memory representation of the real DOM kept in sync with the real UI by React (via the ReactDOM library). When a component's state or props change, React creates a new Virtual DOM tree and runs its diffing algorithm (Reconciliation) to compute the minimum set of real DOM mutations required.</p>
        <p><strong>Diffing Heuristics:</strong> 1) Two elements of different types produce different trees (rebuilds subtree from scratch); 2) Developers hint at child stability across renders using the <code>key</code> prop.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. What is JSX and how does the compiler transform it?</h3>
        <p>JSX (JavaScript XML) is a syntax extension for JavaScript that allows writing HTML-like markup inside JS. It is compiled by Babel or SWC into <code>React.createElement()</code> (or modern JSX runtime <code>_jsx('div', props)</code>).</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Props vs State: Core differences and unidirectional data flow</h3>
        <div class="poly">
          <table>
            <thead><tr><th>Aspect</th><th>Props</th><th>State</th></tr></thead>
            <tbody>
              <tr><td><strong>Mutability</strong></td><td>Read-only (immutable) passed from parent</td><td>Mutable by the component via setter (<code>useState</code>)</td></tr>
              <tr><td><strong>Ownership</strong></td><td>Owned by the parent component</td><td>Owned and encapsulated by the current component</td></tr>
              <tr><td><strong>Trigger</strong></td><td>Parent re-render causes new props</td><td>Calling <code>setState</code> triggers a re-render</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 mb-4">
        <h3>4. Explain <code>useEffect</code> dependency array and cleanup functions</h3>
        <p><code>useEffect(effectFn, deps)</code> handles component side effects (subscriptions, timers, API calls). The returned cleanup function executes before the effect re-runs or when the component unmounts, preventing memory leaks and dangling event listeners.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>5. Why is using an array index as a <code>key</code> an anti-pattern in lists?</h3>
        <p>If items are reordered, filtered, or inserted at the beginning, using array indexes tricks React into associating the wrong component state with the DOM node, causing UI glitches, broken input values, and unnecessary re-renders. Always use stable, unique entity IDs.</p>
      </div>
`;

const reactPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">React 19 &bull; Server Components</span>
          <h3 class="text-dark font-weight-bold mb-3">1. React Server Components (RSC) vs Traditional Client SSR: Wire Format &amp; Bundle Size.</h3>
          <p>Traditional SSR renders HTML on the server, but still sends the <em>entire JavaScript bundle</em> to the client to hydrate the DOM. <strong>React Server Components (RSC)</strong> execute exclusively on the server and stream a JSON-like virtual tree payload (RSC wire format) to the client:</p>
          <ul class="list-styled pl-4">
            <li><strong>Zero Client-Side Bundle:</strong> Server-only dependencies (e.g., Markdown parsers, database drivers, crypto libraries) never ship to the browser, shrinking client JS bundles by 30-70%.</li>
            <li><strong>Direct Data Layer Access:</strong> Server Components can directly <code>await db.query()</code> without boilerplate REST endpoints or API tokens exposed to the client.</li>
            <li><strong>Preserved Client State:</strong> When an RSC re-renders on the server and streams updates, client components preserve their local focus, form state, and DOM state without full-page reloads.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">React 19 &bull; Actions &amp; Optimistic UI</span>
          <h3 class="text-dark font-weight-bold mb-3">2. React 19 Actions: <code>useActionState</code>, <code>useOptimistic</code>, and Form Transitions.</h3>
          <p>React 19 natively manages async state transitions and forms without requiring third-party libraries:</p>
          <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>function LikeButton({ initialLikes, postId }) {
    const [likes, setOptimisticLikes] = useOptimistic(
        initialLikes,
        (current, update) =&gt; current + update
    );

    async function formAction() {
        setOptimisticLikes(1); // UI updates instantly (&lt;1ms)!
        await updateLikesOnServer(postId);
    }

    return (
        &lt;form action={formAction}&gt;
            &lt;button&gt;Likes: {likes}&lt;/button&gt;
        &lt;/form&gt;
    );
}</pre>
          <p class="mt-2"><strong>Tech Lead Advantage:</strong> If the server action rejects with a network error, React automatically rolls back the optimistic state without manual error catch rollback boilerplate.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Concurrent React &bull; Scheduling</span>
          <h3 class="text-dark font-weight-bold mb-3">3. Concurrent Rendering, <code>useTransition</code>, and Fiber Priority Lanes.</h3>
          <p>In React 18 &amp; 19, rendering is no longer blocking or synchronous. React's <strong>Fiber Reconciler</strong> assigns tasks to priority lanes (Immediate, UserBlocking, Normal, Idle):</p>
          <ul class="list-styled pl-4">
            <li><strong><code>useTransition</code>:</strong> Marks state updates as non-urgent (transitions). If a user types into an input while a heavy list filter is calculating, React yields execution back to the browser to keep the input responsive (eliminates INP - Interaction to Next Paint latency).</li>
            <li><strong>Time-Slicing:</strong> Fiber divides work into 5ms chunks, checking <code>scheduler.shouldYield()</code> to ensure high-priority microtasks and paints are never blocked.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">State Architecture &bull; 2026 Matrix</span>
          <h3 class="text-dark font-weight-bold mb-3">4. Modern State Management: Zustand vs Redux Toolkit vs TanStack Query (React Query).</h3>
          <div class="poly">
            <table>
              <thead><tr><th>Tool</th><th>Category</th><th>Re-render Strategy</th><th>Ideal Use Case</th></tr></thead>
              <tbody>
                <tr><td><strong>TanStack Query</strong></td><td>Server State (Async/Cache)</td><td>Automatic cache invalidation &amp; background refetch</td><td>REST/GraphQL API fetching, polling, mutations</td></tr>
                <tr><td><strong>Zustand</strong></td><td>Client UI State</td><td>Selector-based subscriber model (no context wrapper)</td><td>Global modal state, client filters, user preferences</td></tr>
                <tr><td><strong>Redux Toolkit (RTK)</strong></td><td>Complex Enterprise State</td><td>Selector memoization (Reselect)</td><td>Time-travel debugging, strictly audited workflows</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Performance &bull; React Compiler</span>
          <h3 class="text-dark font-weight-bold mb-3">5. React Compiler (Forget): Automating <code>useMemo</code> and <code>useCallback</code>.</h3>
          <p>The <strong>React Compiler</strong> analyzes JavaScript semantics and automatically memoizes component outputs and function references at build time. It eliminates manual <code>useMemo</code>, <code>useCallback</code>, and <code>React.memo()</code> boilerplate while avoiding common dependency array bugs.</p>
        </div>
      </div>
`;

const reactCards = `
      <div class="col-lg-4 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-2.jpg" alt="Angular">
          <div class="card-body">
            <h4 class="card-title">Angular</h4>
            <p class="card-text mb-4">Angular 17-19 Signals, Standalone Components &amp; SSR.</p>
            <a href="angular.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-single-2.jpg" alt="Frontend Hub">
          <div class="card-body">
            <h4 class="card-title">Frontend Engineering</h4>
            <p class="card-text mb-4">Core browser rendering, Web Vitals, and Micro-Frontends.</p>
            <a href="frontend.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
`;

fs.writeFileSync('reactjs.html', createStandardPage({
  title: 'React.js',
  metaDesc: 'React 18 & 19 Interview Questions for Developers and Tech Leads',
  activeNav: 'frontend',
  parentHref: 'frontend.html',
  parentTitle: 'Frontend Interview',
  subtitle: 'Component model, hooks, virtual DOM, React 19 Actions, Server Components, and Concurrent Mode.',
  part1Heading: 'React Fundamentals',
  part1Desc: 'Component lifecycle, Virtual DOM, JSX compilation, props vs state, and hook fundamentals.',
  part1Questions: reactPart1,
  part2Heading: 'Advanced React Architecture (2026)',
  part2Desc: 'React Server Components, Actions & useOptimistic, Fiber priority lanes, Zustand, and the React Compiler.',
  part2Questions: reactPart2,
  relatedCards: reactCards
}), 'utf8');
console.log('[SUCCESS] Created reactjs.html');

// ============================================================================
// 2. ANGULAR.HTML
// ============================================================================
const angularPart1 = `
      <div class="col-12 mb-4">
        <h3>1. What are Angular Components and Directives? Structural vs Attribute Directives.</h3>
        <p>A <strong>Component</strong> is a directive with an associated HTML template, encapsulated CSS, and a TypeScript controller class. Directives attach custom behavior to existing DOM elements: 1) <em>Structural Directives</em> alter DOM layout by adding or removing elements (<code>*ngIf</code>, <code>*ngFor</code>); 2) <em>Attribute Directives</em> change element appearance or behavior (<code>ngClass</code>, <code>ngStyle</code>).</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. What is Dependency Injection (DI) in Angular? Hierarchical Injectors.</h3>
        <p>Angular features a hierarchical DI framework. Injectors resolve dependencies at different levels: <code>root</code> (singleton across entire app via <code>@Injectable({providedIn: 'root'})</code>), Module level, and Component level (new instance per component instance).</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. One-Way vs Two-Way Data Binding in Angular</h3>
        <p>One-way binding pushes data from component to DOM (<code>{{interpolation}}</code>, <code>[property]="value"</code>) or from DOM to component via events (<code>(click)="handler()"</code>). Two-way binding (<code>[(ngModel)]="property"</code>) synchronizes both using the "banana-in-a-box" syntax.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>4. What are Pipes and Pure vs Impure Pipes?</h3>
        <p>Pipes transform data in templates (e.g., <code>date</code>, <code>currency</code>). A <em>Pure Pipe</em> re-executes only when its input reference changes. An <em>Impure Pipe</em> executes on every change detection cycle, which can degrade performance if not used cautiously.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>5. RxJS Observables vs Promises in Angular</h3>
        <p>A Promise resolves a single value asynchronously and cannot be cancelled. An <strong>Observable</strong> emits a stream of 0 to many values over time, supports cancellation via <code>unsubscribe()</code>, and offers powerful operators (<code>map</code>, <code>filter</code>, <code>switchMap</code>, <code>debounceTime</code>).</p>
      </div>
`;

const angularPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Angular 17-19 &bull; Signals Reactivity</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Angular Signals: Fine-Grained Reactivity and Zoneless Change Detection.</h3>
          <p>Historically, Angular relied on <strong>Zone.js</strong> to intercept browser async events and trigger global top-to-bottom change detection across the entire component tree. <strong>Angular Signals</strong> introduce fine-grained reactivity:</p>
          <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 14px; font-size: 13px; overflow: auto;'>const count = signal(0);
const double = computed(() =&gt; count() * 2); // Automatically tracks dependencies!

effect(() =&gt; {
    console.log(\`Count changed to: \${count()}\`);
});

count.update(c =&gt; c + 1);</pre>
          <ul class="list-styled pl-4 mt-2">
            <li><strong>Zoneless Execution:</strong> Angular can run without Zone.js (<code>provideExperimentalZonelessChangeDetection()</code>), reducing initial bundle size and eliminating monkey-patched browser API overhead.</li>
            <li><strong>Targeted DOM Updates:</strong> Only the exact DOM nodes reading the signal update, bypassing parent component re-evaluations.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Modern Syntax &bull; Built-in Control Flow</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Built-in Control Flow: <code>@if</code>, <code>@for</code>, and <code>@defer</code> (Deferrable Views).</h3>
          <p>Angular 17+ replaced legacy structural directives (<code>*ngIf</code>, <code>*ngFor</code>) with a compiled block syntax:</p>
          <ul class="list-styled pl-4">
            <li><strong>Mandatory Tracking:</strong> <code>@for (item of items; track item.id)</code> requires an explicit track expression, preventing collection rendering bugs.</li>
            <li><strong><code>@defer</code> Blocks:</strong> Lazy-loads and renders template chunks automatically based on triggers:
              <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 10px; font-size: 13px; overflow: auto;'>@defer (on viewport) {
    &lt;heavy-chart-widget /&gt;
} @placeholder {
    &lt;div&gt;Loading chart...&lt;/div&gt;
}</pre>
              The widget's JS code is not loaded until scrolled into the viewport!
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">State Architecture &bull; NgRx</span>
          <h3 class="text-dark font-weight-bold mb-3">3. NgRx SignalStore vs ComponentStore vs Global Redux Store.</h3>
          <p><strong>NgRx SignalStore</strong> provides a lightweight, modular reactive state container using native Angular Signals. Unlike traditional NgRx with verbose Actions/Reducers/Effects, SignalStore uses composable methods, state signals, and entities with 10x less boilerplate.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">SSR &bull; Non-Destructive Hydration</span>
          <h3 class="text-dark font-weight-bold mb-3">4. Non-Destructive Hydration in Angular SSR.</h3>
          <p>In older Angular SSR, the client destroyed server-rendered HTML and re-created DOM nodes from scratch, causing visible screen flickering. Modern Angular preserves the existing DOM nodes and attaches event listeners seamlessly without DOM destruction.</p>
        </div>
      </div>
`;

fs.writeFileSync('angular.html', createStandardPage({
  title: 'Angular',
  metaDesc: 'Angular 17-19 Interview Questions for Developers and Tech Leads',
  activeNav: 'frontend',
  parentHref: 'frontend.html',
  parentTitle: 'Frontend Interview',
  subtitle: 'Standalone components, Signals, Dependency Injection, RxJS, and deferrable views.',
  part1Heading: 'Angular Fundamentals',
  part1Desc: 'Components, Directives, Pipes, Dependency Injection, and RxJS Observables.',
  part1Questions: angularPart1,
  part2Heading: 'Advanced Angular Architecture (2026)',
  part2Desc: 'Signals fine-grained reactivity, Zoneless change detection, @defer blocks, and NgRx SignalStore.',
  part2Questions: angularPart2,
  relatedCards: reactCards
}), 'utf8');
console.log('[SUCCESS] Created angular.html');

// ============================================================================
// 3. FRONTEND.HTML (Hub Page update with its own questions)
// ============================================================================
const frontendContent = fs.readFileSync('frontend.html', 'utf8');
const frontendQuestions = `
      <!-- SECTION 1: BASIC & CORE -->
      <div class="col-12 mb-4">
        <div class="level-badge basic"><i class="ti-bookmark mr-1"></i> PART 1: CORE &amp; FOUNDATIONAL QUESTIONS</div>
        <h2 class="level-heading">Frontend Engineering Fundamentals <span class="badge badge-primary font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Basic &bull; Developer</span></h2>
        <p class="text-secondary">Core browser mechanisms, CSS layout models, DOM event handling, and HTTP security policies.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <h3>1. Critical Rendering Path: How browsers turn HTML/CSS/JS into pixels</h3>
        <p>The browser parses HTML to construct the <strong>DOM Tree</strong> and CSS to construct the <strong>CSSOM Tree</strong>. It combines them into a <strong>Render Tree</strong>, computes layout geometry (Layout/Reflow), and paints visual elements (Paint), followed by Compositing on the GPU.</p>
      </div>

      <div class="col-12 mb-4">
        <h3>2. Event Bubbling, Event Capturing, and Event Delegation</h3>
        <p>Events traverse in 3 phases: 1) Capturing (window down to target), 2) Target, 3) Bubbling (target up to window). <strong>Event Delegation</strong> attaches a single listener to a parent element to handle events from hundreds of dynamic child elements using <code>event.target</code>.</p>
      </div>

      <div class="col-12 mb-4">
        <h3>3. Core Web Vitals: LCP, INP, and CLS Explained</h3>
        <ul class="list-styled pl-4">
          <li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance (&le; 2.5s).</li>
          <li><strong>Interaction to Next Paint (INP):</strong> Replaced FID; measures responsiveness to user interactions (&le; 200ms).</li>
          <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability of elements during page load (&le; 0.1).</li>
        </ul>
      </div>

      <div class="col-12 mb-4">
        <h3>4. CORS (Cross-Origin Resource Sharing) and Preflight <code>OPTIONS</code> requests</h3>
        <p>Browsers enforce Same-Origin Policy. When making cross-origin requests with custom headers or non-simple HTTP methods (PUT/DELETE), the browser automatically sends an <code>OPTIONS</code> preflight request to verify server <code>Access-Control-Allow-Origin</code> and headers.</p>
      </div>

      <!-- SECTION 2: ADVANCED & TECH LEAD (2026 EDITION) -->
      <div class="col-12 my-5 pt-4">
        <div class="level-badge advance mb-2"><i class="ti-star mr-1"></i> PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS</div>
        <h2 class="level-heading">Advanced Frontend Architecture &amp; Lead Systems <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Senior &bull; Tech Lead &bull; 2026</span></h2>
        <p class="text-secondary">Micro-Frontends, Module Federation, Hydration vs Resumability, Web Workers, and browser memory leak profiling.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Micro-Frontends &bull; Module Federation</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Micro-Frontends Architecture: Webpack 5 Module Federation vs Iframes.</h3>
          <p><strong>Webpack Module Federation</strong> allows separate builds to dynamically share code and dependencies at runtime without rebuilding host applications:</p>
          <ul class="list-styled pl-4">
            <li><strong>Shared Dependencies:</strong> Deduplicates shared libraries (e.g. React 19) so the user does not download multiple framework instances.</li>
            <li><strong>Independent Deployment:</strong> Team Checkout deploys their micro-frontend independently without coordinating with Team Product Catalog.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Rendering Models &bull; Resumability</span>
          <h3 class="text-dark font-weight-bold mb-3">2. SSR vs SSG vs ISR vs Island Architecture &amp; Resumability.</h3>
          <div class="poly">
            <table>
              <thead><tr><th>Model</th><th>When HTML Generated</th><th>Trade-offs</th></tr></thead>
              <tbody>
                <tr><td><strong>SSG (Static Site Generation)</strong></td><td>Build time</td><td>Fastest TTFB via CDN; stale data requires rebuild</td></tr>
                <tr><td><strong>ISR (Incremental Static Regen)</strong></td><td>On-demand with TTL</td><td>Best of both: CDN caching + background re-validation</td></tr>
                <tr><td><strong>SSR (Server-Side Rendering)</strong></td><td>On every request</td><td>Always fresh data; higher server CPU cost</td></tr>
                <tr><td><strong>Resumability (Qwik / Astro Islands)</strong></td><td>Serialized into HTML</td><td><strong>Zero client hydration overhead!</strong> Resumes instantly on interaction</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Multi-Threading &bull; Web Workers</span>
          <h3 class="text-dark font-weight-bold mb-3">3. Offloading CPU-heavy computations via Web Workers and <code>SharedArrayBuffer</code>.</h3>
          <p>JavaScript is single-threaded on the main UI thread. Running heavy encryption, large CSV parsing, or image processing on the main thread freezes the browser. <strong>Web Workers</strong> execute scripts in background worker threads, communicating via <code>postMessage()</code> or high-throughput zero-copy <code>SharedArrayBuffer</code> with <code>Atomics</code> synchronization.</p>
        </div>
      </div>
`;

// Replace empty row in frontend.html
const frontendRegex = /(<!-- course details -->\s*<div class="row">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
if (frontendRegex.test(frontendContent)) {
  const updatedFrontend = frontendContent.replace(frontendRegex, `$1\n${frontendQuestions}\n$3`);
  fs.writeFileSync('frontend.html', updatedFrontend, 'utf8');
  console.log('[SUCCESS] Updated frontend.html');
}

// ============================================================================
// 4. AWS.HTML
// ============================================================================
const awsPart1 = `
      <div class="col-12 mb-4">
        <h3>1. AWS S3 Storage Classes and Lifecycle Rules</h3>
        <p>Amazon S3 provides storage tiers: S3 Standard (frequent access), S3 Intelligent-Tiering (automatic cost optimization), S3 Standard-IA (infrequent access), S3 Glacier Instant Retrieval, Glacier Flexible, and Deep Archive (cold storage). Lifecycle rules automate transitioning objects between tiers and expiring them after a retention period.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. IAM Roles vs IAM Users vs IAM Policies</h3>
        <p>An <strong>IAM User</strong> represents a human with credentials. An <strong>IAM Role</strong> is an identity assumable by applications, AWS services (EC2, Lambda), or federated users via temporary STS credentials. An <strong>IAM Policy</strong> is a JSON document defining permissions (Allow/Deny, Actions, Resources, Conditions).</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Amazon RDS vs DynamoDB: Relational vs NoSQL Selection</h3>
        <div class="poly">
          <table>
            <thead><tr><th>Dimension</th><th>Amazon RDS (Aurora / Postgres)</th><th>Amazon DynamoDB</th></tr></thead>
            <tbody>
              <tr><td><strong>Data Model</strong></td><td>Relational SQL, ACID, complex JOINs</td><td>Key-Value / Document, flexible schema</td></tr>
              <tr><td><strong>Scaling</strong></td><td>Vertical scaling + read replicas</td><td><strong>Horizontal auto-partitioning (unlimited TPS)</strong></td></tr>
              <tr><td><strong>Latency</strong></td><td>Single to double-digit milliseconds</td><td><strong>Single-digit millisecond latency at any scale</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 mb-4">
        <h3>4. Amazon VPC Subnets: Public vs Private vs NAT Gateway</h3>
        <p>A Public Subnet has a route table directing <code>0.0.0.0/0</code> traffic to an Internet Gateway (IGW). A Private Subnet houses backend servers and databases; its outbound internet traffic flows securely through a NAT Gateway without exposing incoming ports to the public internet.</p>
      </div>
`;

const awsPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Kubernetes &bull; Autoscaling</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Amazon EKS Autoscaling: Karpenter vs Cluster Autoscaler.</h3>
          <p>Traditional <strong>Cluster Autoscaler</strong> operates on fixed EC2 Auto Scaling Groups (ASGs), taking 3-8 minutes to launch nodes during traffic spikes. <strong>Karpenter</strong> bypasses ASGs, evaluating pending Kubernetes pod requirements directly and launching right-sized EC2 spot/on-demand instances in under 45 seconds, slashing cloud compute waste by 30-50%.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">NoSQL Architecture &bull; DynamoDB</span>
          <h3 class="text-dark font-weight-bold mb-3">2. DynamoDB Single-Table Design and Global Tables Replication.</h3>
          <p>Instead of creating 10 different DynamoDB tables, <strong>Single-Table Design</strong> stores multiple entity types (Users, Orders, Items) in a single table using generic partition and sort keys (<code>PK: USER#123</code>, <code>SK: ORDER#456</code>) with Global Secondary Indexes (GSIs). Queries fetch related entities in a <em>single network query</em>.</p>
          <p class="mt-2"><strong>Global Tables:</strong> Fully managed multi-region active-active replication with automatic conflict resolution based on timestamp last-writer-wins.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Event-Driven &bull; Serverless</span>
          <h3 class="text-dark font-weight-bold mb-3">3. EventBridge, SQS FIFO, and SNS in Microservice Decoupling.</h3>
          <p><strong>Amazon EventBridge</strong> is an event bus supporting content-based filtering, schema registries, and cross-account routing. <strong>SQS FIFO</strong> guarantees strict message ordering and deduplication (Deduplication ID). <strong>SNS</strong> implements fan-out to multiple subscribers.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Security &bull; Governance</span>
          <h3 class="text-dark font-weight-bold mb-3">4. AWS Organizations and Service Control Policies (SCPs).</h3>
          <p>Enterprise multi-account landing zones use AWS Organizations. <strong>SCPs (Service Control Policies)</strong> set permission guardrails across all accounts (e.g., forbidding root user access, restricting regions to <code>us-east-1</code> and <code>ap-south-1</code>, and preventing deletion of CloudTrail logs).</p>
        </div>
      </div>
`;

const cloudCards = `
      <div class="col-lg-4 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-2.jpg" alt="AWS">
          <div class="card-body">
            <h4 class="card-title">AWS Cloud</h4>
            <p class="card-text mb-4">IAM, EKS, DynamoDB, Lambda, VPC, and multi-region resilience.</p>
            <a href="aws.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-3.jpg" alt="GCP">
          <div class="card-body">
            <h4 class="card-title">Google Cloud (GCP)</h4>
            <p class="card-text mb-4">GKE Autopilot, Cloud Run, BigQuery, Pub/Sub, and Spanner.</p>
            <a href="gcp.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-4.jpg" alt="Docker">
          <div class="card-body">
            <h4 class="card-title">Docker &amp; Containers</h4>
            <p class="card-text mb-4">Linux namespaces, cgroups v2, multi-stage builds, and security.</p>
            <a href="docker.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
`;

fs.writeFileSync('aws.html', createStandardPage({
  title: 'AWS Cloud',
  metaDesc: 'Amazon Web Services Interview Questions for Developers and Architects',
  activeNav: 'cloud',
  parentHref: 'cloud.html',
  parentTitle: 'Cloud Interview',
  subtitle: 'Compute, storage, networking, EKS, DynamoDB, serverless, and multi-region architecture.',
  part1Heading: 'AWS Cloud Fundamentals',
  part1Desc: 'S3 storage tiers, IAM identities and policies, RDS vs DynamoDB, and VPC networking.',
  part1Questions: awsPart1,
  part2Heading: 'Advanced AWS Cloud Architecture (2026)',
  part2Desc: 'Karpenter autoscaling, DynamoDB single-table design, EventBridge messaging, and Organizations governance.',
  part2Questions: awsPart2,
  relatedCards: cloudCards
}), 'utf8');
console.log('[SUCCESS] Created aws.html');

// ============================================================================
// 5. GCP.HTML
// ============================================================================
const gcpPart1 = `
      <div class="col-12 mb-4">
        <h3>1. Compute Engine vs Google Kubernetes Engine (GKE) vs Cloud Run</h3>
        <p><strong>Compute Engine:</strong> Infrastructure-as-a-Service (IaaS) raw virtual machines. <strong>GKE:</strong> Managed Kubernetes for complex, containerized multi-service clusters. <strong>Cloud Run:</strong> Fully managed Serverless container platform that automatically scales from zero to thousands of instances based on incoming HTTP requests.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Google Cloud Pub/Sub: Topics, Subscriptions, and Delivery Models</h3>
        <p>Cloud Pub/Sub is a globally distributed messaging service. Producers publish to <strong>Topics</strong>. Consumers receive messages via <strong>Pull Subscriptions</strong> or <strong>Push Subscriptions</strong> (delivers HTTP POST to webhooks). Offers at-least-once delivery with message retention up to 31 days.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Cloud Storage Storage Classes: Standard vs Nearline vs Coldline vs Archive</h3>
        <p>Standard (frequently accessed data), Nearline (data accessed less than once a month), Coldline (less than once a quarter), and Archive (long-term digital preservation). All classes offer identical 99.999999999% (11 9s) durability and low latency access.</p>
      </div>
`;

const gcpPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Distributed Databases &bull; Spanner</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Google Cloud Spanner TrueTime API and External Consistency.</h3>
          <p>Cloud Spanner is a globally distributed relational database providing <strong>strict serializability (External Consistency)</strong> without distributed lock freezes. It uses Google's <strong>TrueTime API</strong>, which combines atomic clocks and GPS receivers in every Google data center to bound clock drift uncertainty ($\epsilon \le 7\text{ms}$), guaranteeing atomic ordering of distributed transactions worldwide.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Analytics &bull; BigQuery</span>
          <h3 class="text-dark font-weight-bold mb-3">2. BigQuery Performance Engineering: Partitioning, Clustering, and Slot Reservations.</h3>
          <p>BigQuery uses a columnar storage architecture (Capacitor). Optimizing queries at petabyte scale requires:</p>
          <ul class="list-styled pl-4">
            <li><strong>Partitioning:</strong> Segments tables by date, timestamp, or integer range, eliminating full-table scans.</li>
            <li><strong>Clustering:</strong> Sorts data within partitions based on up to 4 high-cardinality columns (e.g. <code>customer_id</code>), skipping irrelevant blocks via block-level metadata.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Kubernetes &bull; Security</span>
          <h3 class="text-dark font-weight-bold mb-3">3. GKE Autopilot and Workload Identity Federation.</h3>
          <p><strong>Workload Identity</strong> eliminates the dangerous practice of storing service account private key JSON files inside containers. It maps Kubernetes Service Accounts directly to Google Cloud IAM Service Accounts, allowing pods to authenticate to GCP APIs via short-lived OIDC tokens automatically.</p>
        </div>
      </div>
`;

fs.writeFileSync('gcp.html', createStandardPage({
  title: 'Google Cloud (GCP)',
  metaDesc: 'Google Cloud Platform Interview Questions for Developers and Architects',
  activeNav: 'cloud',
  parentHref: 'cloud.html',
  parentTitle: 'Cloud Interview',
  subtitle: 'GKE Autopilot, Cloud Run, Spanner TrueTime, BigQuery analytics, and Pub/Sub.',
  part1Heading: 'Google Cloud Fundamentals',
  part1Desc: 'Compute Engine, Cloud Run, Pub/Sub, and Cloud Storage classes.',
  part1Questions: gcpPart1,
  part2Heading: 'Advanced GCP Architecture (2026)',
  part2Desc: 'Cloud Spanner TrueTime consistency, BigQuery slot optimization, and Workload Identity.',
  part2Questions: gcpPart2,
  relatedCards: cloudCards
}), 'utf8');
console.log('[SUCCESS] Created gcp.html');

// ============================================================================
// 6. DOCKER.HTML
// ============================================================================
const dockerPart1 = `
      <div class="col-12 mb-4">
        <h3>1. Docker Images vs Containers</h3>
        <p>A <strong>Docker Image</strong> is a read-only, immutable template with layers representing application code, libraries, and runtime dependencies. A <strong>Container</strong> is an isolated, runnable runtime instance of an image with a thin read-write layer added on top.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Dockerfile Instructions: RUN vs CMD vs ENTRYPOINT</h3>
        <div class="poly">
          <table>
            <thead><tr><th>Instruction</th><th>When Executed</th><th>Primary Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>RUN</strong></td><td>Build time</td><td>Installs packages and generates new image layers</td></tr>
              <tr><td><strong>ENTRYPOINT</strong></td><td>Container start time</td><td>Defines the fixed executable that will always run</td></tr>
              <tr><td><strong>CMD</strong></td><td>Container start time</td><td>Provides default arguments to ENTRYPOINT (can be overridden by CLI)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Docker Volumes vs Bind Mounts</h3>
        <p><strong>Volumes</strong> are managed by Docker in a dedicated host directory (<code>/var/lib/docker/volumes/</code>), isolated from host OS specifics. <strong>Bind Mounts</strong> map an exact host directory into the container, exposing file permissions directly.</p>
      </div>
`;

const dockerPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Linux Internals &bull; Kernel</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Container Isolation Internals: Linux Namespaces vs Control Groups (cgroups v2).</h3>
          <p>Containers are NOT virtual machines. A container is a standard Linux process isolated using two Linux kernel features:</p>
          <ul class="list-styled pl-4">
            <li><strong>Namespaces (What a container can see):</strong> <code>pid</code> (process tree), <code>net</code> (network interfaces/routing), <code>mnt</code> (filesystem mounts), <code>ipc</code>, <code>uts</code> (hostname), and <code>user</code> (UID/GID mapping).</li>
            <li><strong>cgroups v2 (How much a container can use):</strong> Enforces resource limits on CPU cycles, memory caps, block I/O throughput, and maximum PIDs to prevent fork-bomb attacks.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Security &bull; Image Optimization</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Multi-Stage Builds, Distroless Images, and Rootless Docker.</h3>
          <ul class="list-styled pl-4">
            <li><strong>Multi-Stage Builds:</strong> Uses a heavy build stage with Maven/JDK to compile code, and copies only the output JAR into a minimal runtime image, reducing image size from 800MB to 70MB.</li>
            <li><strong>Distroless Images:</strong> Contains <em>only your application and runtime dependencies</em>—no package managers (apt, apk), no shells (bash, sh). Prevents attackers from spawning interactive shells upon remote code execution (RCE).</li>
            <li><strong>Rootless Docker:</strong> Executes the Docker daemon and containers inside a non-root user namespace, preventing container-escape privilege escalation to host root.</li>
          </ul>
        </div>
      </div>
`;

fs.writeFileSync('docker.html', createStandardPage({
  title: 'Docker & Containers',
  metaDesc: 'Docker and Containerization Interview Questions for Developers and Leads',
  activeNav: 'cloud',
  parentHref: 'cloud.html',
  parentTitle: 'Cloud Interview',
  subtitle: 'Images, containers, multi-stage builds, cgroups v2, namespaces, and container security.',
  part1Heading: 'Docker Fundamentals',
  part1Desc: 'Images vs containers, Dockerfile RUN/CMD/ENTRYPOINT, volumes, and networking.',
  part1Questions: dockerPart1,
  part2Heading: 'Advanced Container Internals &amp; Security (2026)',
  part2Desc: 'Linux kernel namespaces, cgroups v2, distroless images, multi-stage builds, and rootless execution.',
  part2Questions: dockerPart2,
  relatedCards: cloudCards
}), 'utf8');
console.log('[SUCCESS] Created docker.html');

// ============================================================================
// 7. CLOUD.HTML (Hub Page update with its own questions)
// ============================================================================
const cloudContent = fs.readFileSync('cloud.html', 'utf8');
const cloudQuestions = `
      <!-- SECTION 1: BASIC & CORE -->
      <div class="col-12 mb-4">
        <div class="level-badge basic"><i class="ti-bookmark mr-1"></i> PART 1: CORE &amp; FOUNDATIONAL QUESTIONS</div>
        <h2 class="level-heading">Cloud &amp; DevOps Fundamentals <span class="badge badge-primary font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Basic &bull; Developer</span></h2>
        <p class="text-secondary">Core cloud computing models, virtualization, CI/CD automation, and cloud networking basics.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <h3>1. IaaS vs PaaS vs SaaS: Key differences and shared responsibility model</h3>
        <p><strong>IaaS (Infrastructure as a Service):</strong> Cloud provider manages hardware and virtualization; customer manages OS, runtime, and app (e.g. AWS EC2, GCP GCE). <strong>PaaS (Platform as a Service):</strong> Provider manages OS and runtime; customer manages app code (e.g. Cloud Run, Elastic Beanstalk). <strong>SaaS (Software as a Service):</strong> Fully managed end-user application (e.g. Gmail, Salesforce).</p>
      </div>

      <div class="col-12 mb-4">
        <h3>2. Virtual Machines (Hypervisors) vs Containers</h3>
        <p>Virtual Machines virtualize the hardware layer via a Hypervisor (Type 1 or Type 2), running a complete guest OS with separate kernel per VM. Containers share the host Linux kernel, isolating user space via namespaces and cgroups, booting in milliseconds with negligible overhead.</p>
      </div>

      <!-- SECTION 2: ADVANCED & TECH LEAD (2026 EDITION) -->
      <div class="col-12 my-5 pt-4">
        <div class="level-badge advance mb-2"><i class="ti-star mr-1"></i> PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS</div>
        <h2 class="level-heading">Advanced Cloud Architecture &amp; Enterprise DevOps <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Senior &bull; Tech Lead &bull; 2026</span></h2>
        <p class="text-secondary">Multi-region active-active disaster recovery, FinOps cost governance, Karpenter autoscaling, and Chaos Engineering.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">High Availability &bull; Disaster Recovery</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Multi-Region Active-Active Architecture: RPO, RTO, and Data Synchronization.</h3>
          <ul class="list-styled pl-4">
            <li><strong>RPO (Recovery Point Objective):</strong> Maximum acceptable data loss duration during an outage.</li>
            <li><strong>RTO (Recovery Time Objective):</strong> Maximum acceptable downtime duration to restore service.</li>
            <li><strong>Active-Active Architecture:</strong> Traffic routed to both regions via Anycast DNS (Route 53 latency-based routing or Cloudflare). Databases use multi-region active-active replication (Aurora Global Database or Cloud Spanner) with automatic conflict resolution.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Cloud Financial Engineering &bull; FinOps</span>
          <h3 class="text-dark font-weight-bold mb-3">2. FinOps: Cloud Cost Optimization and Unit Economics.</h3>
          <p>As a Tech Lead, managing cloud expenditure requires: 1) Utilizing Spot Instances / Preemptible VMs for stateless workloads; 2) Right-sizing container CPU/memory requests based on Prometheus P95 metrics; 3) Storage lifecycle policies transitioning S3/GCS to Glacier/Archive; 4) Purchasing Savings Plans for baseline continuous compute.</p>
        </div>
      </div>
`;

const cloudRegex = /(<!-- course details -->\s*<div class="row">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
if (cloudRegex.test(cloudContent)) {
  const updatedCloud = cloudContent.replace(cloudRegex, `$1\n${cloudQuestions}\n$3`);
  fs.writeFileSync('cloud.html', updatedCloud, 'utf8');
  console.log('[SUCCESS] Updated cloud.html');
}

// ============================================================================
// 8. SQL.HTML
// ============================================================================
const sqlPart1 = `
      <div class="col-12 mb-4">
        <h3>1. DDL vs DML vs DQL vs DCL vs TCL commands</h3>
        <p><strong>DDL (Data Definition):</strong> <code>CREATE, ALTER, DROP, TRUNCATE</code>.<br/>
        <strong>DML (Data Manipulation):</strong> <code>INSERT, UPDATE, DELETE</code>.<br/>
        <strong>DQL (Data Query):</strong> <code>SELECT</code>.<br/>
        <strong>TCL (Transaction Control):</strong> <code>COMMIT, ROLLBACK, SAVEPOINT</code>.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Difference between WHERE and HAVING clause</h3>
        <p><code>WHERE</code> filters individual rows <em>before</em> any grouping or aggregation takes place. <code>HAVING</code> filters grouped records <em>after</em> the <code>GROUP BY</code> aggregation has been computed.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. SQL JOIN Types: INNER vs LEFT vs RIGHT vs FULL OUTER</h3>
        <p>INNER JOIN returns records with matching keys in both tables. LEFT JOIN returns all records from left table and matched records from right table. FULL OUTER JOIN returns all rows when there is a match in either table.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>4. Window Functions: ROW_NUMBER() vs RANK() vs DENSE_RANK()</h3>
        <div class="poly">
          <table>
            <thead><tr><th>Function</th><th>Behavior on Duplicate Values</th><th>Sequence Example</th></tr></thead>
            <tbody>
              <tr><td><code>ROW_NUMBER()</code></td><td>Assigns strictly sequential integer without ties</td><td>1, 2, 3, 4, 5</td></tr>
              <tr><td><code>RANK()</code></td><td>Assigns identical rank to ties, skips subsequent rank</td><td>1, 2, 2, 4, 5</td></tr>
              <tr><td><code>DENSE_RANK()</code></td><td>Assigns identical rank to ties, does NOT skip next rank</td><td>1, 2, 2, 3, 4</td></tr>
            </tbody>
          </table>
        </div>
      </div>
`;

const sqlPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Performance &bull; Query Plans</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Reading EXPLAIN and EXPLAIN ANALYZE: Sequential Scan vs Index Scan vs Bitmap Scan.</h3>
          <ul class="list-styled pl-4">
            <li><strong>Seq Scan (Table Scan):</strong> Reads every database block sequentially on disk. Acceptable for small tables or when fetching &gt;30% of rows.</li>
            <li><strong>Index Scan:</strong> Traverses the B-Tree index to find row pointers (TIDs) and fetches heap pages individually. Fast for high-selectivity queries (&lt;5% rows).</li>
            <li><strong>Bitmap Index Scan:</strong> Scans the index to build an in-memory bitmap of pages containing matching rows, then visits heap pages in physical disk order, preventing random I/O thrashing.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Indexing &bull; Leftmost Prefix Rule</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Composite Indexing and the Leftmost Prefix Rule.</h3>
          <p>When creating a composite index on <code>(tenant_id, status, created_at)</code>, the database can use the index for queries filtering on:</p>
          <ul class="list-styled pl-4">
            <li><code>tenant_id</code> (Yes)</li>
            <li><code>tenant_id AND status</code> (Yes)</li>
            <li><code>tenant_id AND status AND created_at</code> (Yes)</li>
            <li><code>status AND created_at</code> (<strong>NO!</strong> Violates leftmost prefix; triggers a full scan or loose index scan).</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Recursion &bull; CTE</span>
          <h3 class="text-dark font-weight-bold mb-3">3. Recursive Common Table Expressions (WITH RECURSIVE) for Hierarchies.</h3>
          <p>Querying organizational hierarchies (employee managers) or graph relationships without multiple nested self-joins:</p>
          <pre style='background: #1e293b; color: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; overflow: auto;'>WITH RECURSIVE OrgChart AS (
    SELECT emp_id, manager_id, 1 as level FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.emp_id, e.manager_id, o.level + 1
    FROM employees e INNER JOIN OrgChart o ON e.manager_id = o.emp_id
)
SELECT * FROM OrgChart ORDER BY level;</pre>
        </div>
      </div>
`;

const dbCards = `
      <div class="col-lg-3 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-2.jpg" alt="SQL">
          <div class="card-body">
            <h4 class="card-title">SQL</h4>
            <p class="card-text mb-4">Queries, Window Functions, Indexing, and EXPLAIN plans.</p>
            <a href="sql.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-5.jpg" alt="PostgreSQL">
          <div class="card-body">
            <h4 class="card-title">PostgreSQL</h4>
            <p class="card-text mb-4">MVCC, Vacuum, JSONB, GIN/BRIN indexes, and PgBouncer.</p>
            <a href="postgresql.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-3.jpg" alt="MongoDB">
          <div class="card-body">
            <h4 class="card-title">MongoDB</h4>
            <p class="card-text mb-4">Replica sets, Sharding, WiredTiger, and Aggregations.</p>
            <a href="mongodb.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 mb-5">
        <div class="card p-0 border-primary rounded-0 hover-shadow">
          <img class="card-img-top rounded-0" src="images/courses/course-6.jpg" alt="Elasticsearch">
          <div class="card-body">
            <h4 class="card-title">Elasticsearch</h4>
            <p class="card-text mb-4">Inverted index, Lucene segments, ILM, and search_after.</p>
            <a href="elasticsearch.html" class="btn btn-primary btn-sm">Visit Track</a>
          </div>
        </div>
      </div>
`;

fs.writeFileSync('sql.html', createStandardPage({
  title: 'SQL',
  metaDesc: 'SQL Query and Database Optimization Interview Questions',
  activeNav: 'database',
  parentHref: 'database.html',
  parentTitle: 'Database Interview',
  subtitle: 'Query design, Window Functions, Indexing, EXPLAIN query plans, and CTEs.',
  part1Heading: 'SQL Fundamentals',
  part1Desc: 'DDL vs DML, JOIN types, WHERE vs HAVING, and Window Functions.',
  part1Questions: sqlPart1,
  part2Heading: 'Advanced SQL &amp; Query Optimization (2026)',
  part2Desc: 'EXPLAIN execution plans, composite indexes, CTEs, and deadlock resolution.',
  part2Questions: sqlPart2,
  relatedCards: dbCards
}), 'utf8');
console.log('[SUCCESS] Created sql.html');

// ============================================================================
// 9. MONGODB.HTML
// ============================================================================
const mongoPart1 = `
      <div class="col-12 mb-4">
        <h3>1. MongoDB Document Model: BSON format and schema flexibility</h3>
        <p>MongoDB stores data as <strong>BSON (Binary JSON)</strong> documents inside collections. BSON supports rich data types not native to JSON (Date, ObjectId, 64-bit Int, Binary, Regex). Documents within the same collection can have flexible, evolving schemas.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Embedded Documents vs Normalized References</h3>
        <p><strong>Embedding (Denormalization):</strong> Preferred when data has a 1-to-1 or bounded 1-to-few relationship and is read together (e.g., Order items inside an Order). Eliminates JOIN operations.<br/>
        <strong>Referencing (Normalization):</strong> Preferred for 1-to-many unbounded relationships (e.g., User logs) or many-to-many relationships to avoid hitting the 16MB BSON document size limit.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Aggregation Pipeline: $match, $group, $project, and $lookup</h3>
        <p>Data flows through a multi-stage pipeline. <code>$match</code> filters documents early to leverage indexes, <code>$group</code> aggregates metrics, <code>$project</code> shapes fields, and <code>$lookup</code> performs left outer joins across collections.</p>
      </div>
`;

const mongoPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">High Availability &bull; Replica Sets</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Replica Sets, Raft Consensus, and Write Concerns (w: "majority").</h3>
          <p>MongoDB Replica Sets maintain high availability with 1 Primary and multiple Secondaries:</p>
          <ul class="list-styled pl-4">
            <li><strong>Write Concern:</strong> <code>{ w: "majority", j: true }</code> ensures that a write is committed to the disk journal and acknowledged by a majority of replica set nodes before returning success to the client, preventing rollback on failover.</li>
            <li><strong>Read Concern:</strong> <code>readConcern: "majority"</code> guarantees reading data committed by a majority of nodes, preventing dirty reads of uncommitted primary writes.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Horizontal Scaling &bull; Sharding</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Sharding Architecture: Mongos Routers, Config Servers, and Shard Key Selection.</h3>
          <p>MongoDB scales horizontally by distributing collection chunks across Shards:</p>
          <ul class="list-styled pl-4">
            <li><strong>Shard Key Selection:</strong> Must have high cardinality, low frequency, and non-monotonically increasing values. Choosing an auto-incrementing ID or timestamp creates a <strong>hotspotting anti-pattern</strong> where all writes hit only the last shard! Use hashed shard keys or compound keys for uniform distribution.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Storage Engine &bull; WiredTiger</span>
          <h3 class="text-dark font-weight-bold mb-3">3. WiredTiger Storage Engine: Cache eviction and document-level concurrency.</h3>
          <p>WiredTiger provides document-level concurrency control via lock-free algorithms and optimistic concurrency. By default, it allocates 50% of available RAM minus 1GB for its working cache, compressing data in RAM using snappy or zlib to minimize disk I/O.</p>
        </div>
      </div>
`;

fs.writeFileSync('mongodb.html', createStandardPage({
  title: 'MongoDB',
  metaDesc: 'MongoDB NoSQL Architecture and Performance Interview Questions',
  activeNav: 'database',
  parentHref: 'database.html',
  parentTitle: 'Database Interview',
  subtitle: 'Document modeling, Replica Sets, Sharding, WiredTiger, and Aggregation pipelines.',
  part1Heading: 'MongoDB Fundamentals',
  part1Desc: 'BSON format, embedding vs referencing, and Aggregation pipeline stages.',
  part1Questions: mongoPart1,
  part2Heading: 'Advanced MongoDB Architecture (2026)',
  part2Desc: 'Replica Set consensus, Shard key hotspotting prevention, and WiredTiger cache eviction.',
  part2Questions: mongoPart2,
  relatedCards: dbCards
}), 'utf8');
console.log('[SUCCESS] Created mongodb.html');

// ============================================================================
// 10. POSTGRESQL.HTML
// ============================================================================
const pgPart1 = `
      <div class="col-12 mb-4">
        <h3>1. Why is PostgreSQL the premier relational database for modern architectures?</h3>
        <p>PostgreSQL is an open-source object-relational database renowned for strict SQL standards compliance, rich extensibility, rock-solid ACID guarantees, native JSONB support, and an ecosystem of powerful extensions (e.g. PostGIS, pgvector for AI embeddings, TimescaleDB).</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Native JSONB vs JSON in PostgreSQL</h3>
        <p><code>JSON</code> stores exact text (preserves whitespace and duplicate keys), requiring re-parsing on every query. <strong><code>JSONB</code></strong> decomposes JSON into a binary decomposed format: slightly slower on insert, but <strong>dramatically faster on reads and supports GIN indexing</strong> for fast sub-property search.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Views vs Materialized Views</h3>
        <p>A standard <code>VIEW</code> is a stored query executed dynamically on every call. A <code>MATERIALIZED VIEW</code> persists the query results physically on disk, offering instant reads for complex aggregations. Refreshed via <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</p>
      </div>
`;

const pgPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Storage Internals &bull; MVCC</span>
          <h3 class="text-dark font-weight-bold mb-3">1. PostgreSQL MVCC, Dead Tuples, and Autovacuum Tuning.</h3>
          <p>In PostgreSQL, when a row is updated, it does NOT overwrite the old row in place. It marks the old row as a <strong>dead tuple</strong> (using <code>xmin</code> / <code>xmax</code> transaction IDs) and inserts a new row version:</p>
          <ul class="list-styled pl-4">
            <li><strong>VACUUM:</strong> Reclaims disk space occupied by dead tuples so future inserts can reuse those pages.</li>
            <li><strong>Table Bloat:</strong> If Autovacuum runs too slowly on high-write tables, dead tuples accumulate, causing severe table and index bloat.</li>
            <li><strong>Transaction ID Wraparound:</strong> PostgreSQL transaction IDs are 32-bit integers. If not frozen by autovacuum before 2 billion transactions, the database enters emergency read-only mode to prevent catastrophic data loss!</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Specialized Indexes &bull; Search &amp; AI</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Index Types: B-Tree vs GIN vs GiST vs BRIN vs pgvector HNSW.</h3>
          <div class="poly">
            <table>
              <thead><tr><th>Index Type</th><th>Internal Structure</th><th>Ideal Use Case</th></tr></thead>
              <tbody>
                <tr><td><strong>B-Tree</strong></td><td>Self-balancing search tree</td><td>Standard scalar equality and range queries (<code>=, &lt;, &gt;</code>)</td></tr>
                <tr><td><strong>GIN (Generalized Inverted)</strong></td><td>Inverted index mapping elements to tuples</td><td><strong>JSONB containment (<code>@&gt;</code>), arrays, and full-text search</strong></td></tr>
                <tr><td><strong>BRIN (Block Range)</strong></td><td>Stores min/max values per disk block range</td><td>Massive time-series tables (billions of rows) with 99% smaller index size</td></tr>
                <tr><td><strong>HNSW (pgvector)</strong></td><td>Hierarchical Navigable Small World graph</td><td><strong>AI Vector Embeddings similarity search</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Connection Pooling &bull; Scaling</span>
          <h3 class="text-dark font-weight-bold mb-3">3. Scaling Connection Limits: Why PostgreSQL requires PgBouncer.</h3>
          <p>PostgreSQL allocates a dedicated OS process (forking ~5MB to 10MB memory) per connected client. Exceeding 300-500 connections degrades performance due to CPU process context switching and lock contention. <strong>PgBouncer</strong> acts as a lightweight connection proxy in transaction pooling mode, enabling 10,000 application threads to share 50 backend PostgreSQL connections.</p>
        </div>
      </div>
`;

fs.writeFileSync('postgresql.html', createStandardPage({
  title: 'PostgreSQL',
  metaDesc: 'PostgreSQL Architecture and Performance Tuning Interview Questions',
  activeNav: 'database',
  parentHref: 'database.html',
  parentTitle: 'Database Interview',
  subtitle: 'MVCC, VACUUM tuning, JSONB, GIN/BRIN indexing, PgBouncer, and replication.',
  part1Heading: 'PostgreSQL Fundamentals',
  part1Desc: 'Object-relational features, JSONB vs JSON, Views, and Foreign Keys.',
  part1Questions: pgPart1,
  part2Heading: 'Advanced PostgreSQL Architecture (2026)',
  part2Desc: 'MVCC dead tuples, index taxonomy (GIN, BRIN, pgvector), and connection pool scaling with PgBouncer.',
  part2Questions: pgPart2,
  relatedCards: dbCards
}), 'utf8');
console.log('[SUCCESS] Created postgresql.html');

// ============================================================================
// 11. ELASTICSEARCH.HTML
// ============================================================================
const esPart1 = `
      <div class="col-12 mb-4">
        <h3>1. How does the Inverted Index work in Elasticsearch / Apache Lucene?</h3>
        <p>A traditional database maps Document ID &rarr; Words. An <strong>Inverted Index</strong> parses documents and maps <strong>Words &rarr; Posting List of Document IDs</strong> (along with term frequency and byte offsets). This enables sub-millisecond full-text searching across billions of documents.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>2. Cluster Architecture: Nodes, Indices, Shards, and Replicas</h3>
        <p>An <strong>Index</strong> is a logical namespace partitioned into one or more physical <strong>Primary Shards</strong> (individual Lucene instances). Each primary shard has zero or more <strong>Replica Shards</strong> for high availability and read throughput.</p>
      </div>
      <div class="col-12 mb-4">
        <h3>3. Text vs Keyword Data Types: Analysis Pipeline</h3>
        <div class="poly">
          <table>
            <thead><tr><th>Field Type</th><th>Analyzed?</th><th>Use Case</th></tr></thead>
            <tbody>
              <tr><td><strong><code>text</code></strong></td><td>Yes: Tokenized, lowercased, stemmed by Analyzer</td><td>Full-text search (e.g. blog post body, product description)</td></tr>
              <tr><td><strong><code>keyword</code></strong></td><td>No: Indexed exactly as a single verbatim token</td><td>Exact match filtering, sorting, and aggregations (e.g. status, tags, UUID)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
`;

const esPart2 = `
      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Storage Internals &bull; Lucene</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Lucene Segment Immutability, Merge Policies, and Refresh vs Flush.</h3>
          <ul class="list-styled pl-4">
            <li><strong>Immutable Segments:</strong> Once written to disk, Lucene segments are never modified. Deletes write a bit to a <code>.del</code> file. This enables lock-free search and OS page-cache caching.</li>
            <li><strong>Refresh (Near Real-Time):</strong> Every 1 second (default), documents in the memory buffer are written to a new in-memory Lucene segment and opened for search (Searchable, but not yet fsynced to disk).</li>
            <li><strong>Flush:</strong> Fsyncs segments to disk and truncates the translog (transaction log) every 30 minutes or when translog hits 512MB, ensuring crash recovery.</li>
            <li><strong>Segment Merging:</strong> Background threads merge smaller segments into larger ones and purge deleted documents.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Deep Pagination &bull; High Scale</span>
          <h3 class="text-dark font-weight-bold mb-3">2. Deep Pagination: Why <code>from + size</code> is dangerous and how <code>search_after</code> fixes it.</h3>
          <p>Using <code>from: 10000, size: 10</code> requires every shard to score and return 10,010 documents across the network to the coordinator node, which sorts <code>10,010 * N_shards</code> in memory before discarding 10,000 rows. Capped by <code>index.max_result_window</code> (10,000).</p>
          <p class="mt-2"><strong>The <code>search_after</code> Solution:</strong> A stateless, cursor-based pagination that passes the sort values of the last document, executing with $O(1)$ memory on subsequent pages.</p>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Lifecycle &bull; Hot-Warm Architecture</span>
          <h3 class="text-dark font-weight-bold mb-3">3. Index Lifecycle Management (ILM): Hot, Warm, Cold, and Frozen Tiering.</h3>
          <ul class="list-styled pl-4">
            <li><strong>Hot Tier:</strong> High-speed NVMe SSDs; handles indexing and active searches.</li>
            <li><strong>Warm Tier:</strong> Read-only indices; force-merged down to 1 segment per shard; cheaper SSDs.</li>
            <li><strong>Cold / Frozen Tier:</strong> Searchable snapshots mounted directly from cheap cloud object storage (S3/GCS), slashing storage costs by 80%.</li>
          </ul>
        </div>
      </div>
`;

fs.writeFileSync('elasticsearch.html', createStandardPage({
  title: 'Elasticsearch',
  metaDesc: 'Elasticsearch Architecture and Full-Text Search Interview Questions',
  activeNav: 'database',
  parentHref: 'database.html',
  parentTitle: 'Database Interview',
  subtitle: 'Inverted index, Lucene segments, mapping, ILM tiers, and search_after deep pagination.',
  part1Heading: 'Elasticsearch Fundamentals',
  part1Desc: 'Inverted index mechanics, cluster topology, and text vs keyword fields.',
  part1Questions: esPart1,
  part2Heading: 'Advanced Elasticsearch Architecture (2026)',
  part2Desc: 'Lucene segment immutability, search_after deep pagination, and Index Lifecycle Management (ILM).',
  part2Questions: esPart2,
  relatedCards: dbCards
}), 'utf8');
console.log('[SUCCESS] Created elasticsearch.html');

// ============================================================================
// 12. DATABASE.HTML (Hub Page update with its own questions & updated cards)
// ============================================================================
const databaseContent = fs.readFileSync('database.html', 'utf8');
const databaseQuestions = `
      <!-- SECTION 1: BASIC & CORE -->
      <div class="col-12 mb-4">
        <div class="level-badge basic"><i class="ti-bookmark mr-1"></i> PART 1: CORE &amp; FOUNDATIONAL QUESTIONS</div>
        <h2 class="level-heading">Database Systems Fundamentals <span class="badge badge-primary font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Basic &bull; Developer</span></h2>
        <p class="text-secondary">Core relational principles, NoSQL models, ACID transactions, and indexing basics.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <h3>1. Relational (SQL) vs NoSQL: Architectural Decision Matrix</h3>
        <p><strong>Relational (PostgreSQL/MySQL):</strong> Best for structured data, multi-table transactions, strict foreign-key integrity, and financial ledgers.<br/>
        <strong>NoSQL (MongoDB/DynamoDB):</strong> Best for flexible unstructured document schemas, horizontal partition scaling, high-frequency IoT streaming, and rapid schema evolution.</p>
      </div>

      <div class="col-12 mb-4">
        <h3>2. The ACID Properties in Database Transactions</h3>
        <ul class="list-styled pl-4">
          <li><strong>Atomicity:</strong> All operations in a transaction succeed, or the entire transaction rolls back.</li>
          <li><strong>Consistency:</strong> The database transitions from one valid state to another, upholding all constraints.</li>
          <li><strong>Isolation:</strong> Concurrent transactions execute without interfering with each other (Read Committed, Repeatable Read, Serializable).</li>
          <li><strong>Durability:</strong> Once committed, updates persist permanently even during sudden power failure (via Write-Ahead Log).</li>
        </ul>
      </div>

      <!-- SECTION 2: ADVANCED & TECH LEAD (2026 EDITION) -->
      <div class="col-12 my-5 pt-4">
        <div class="level-badge advance mb-2"><i class="ti-star mr-1"></i> PART 2: ADVANCED &amp; 2026 INTERVIEW SPECS</div>
        <h2 class="level-heading">Advanced Database Architecture &amp; Distributed Systems <span class="badge badge-success font-weight-normal text-white" style="font-size: 13px; vertical-align: middle;">Senior &bull; Tech Lead &bull; 2026</span></h2>
        <p class="text-secondary">Sharding, Read Replicas, CAP/PACELC theorems, Connection Pooling, and Zero-Downtime Schema Migrations.</p>
        <div class="border-bottom border-primary mb-4" style="opacity: 0.25;"></div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Scalability &bull; High Availability</span>
          <h3 class="text-dark font-weight-bold mb-3">1. Database Sharding vs Read Replication: Trade-offs &amp; Pitfalls.</h3>
          <ul class="list-styled pl-4">
            <li><strong>Read Replication:</strong> One master node handles writes and streams logs to multiple read replicas. <em>Pitfall:</em> Replication Lag causes dirty reads (user saves profile, refreshes immediately, and sees old data). Solution: Route writes and reads-after-write to the primary node for 5 seconds.</li>
            <li><strong>Sharding:</strong> Horizontally partitions data rows across multiple independent database servers based on a shard key. <em>Pitfall:</em> Cross-shard transactions and cross-shard queries become slow and complex.</li>
          </ul>
        </div>
      </div>

      <div class="col-12 mb-4">
        <div class="interview-section-card advance-card">
          <span class="advance-tag">Distributed Systems &bull; Theory</span>
          <h3 class="text-dark font-weight-bold mb-3">2. CAP Theorem vs PACELC Theorem in Modern Distributed Data Stores.</h3>
          <p>The CAP Theorem (Consistency, Availability, Partition Tolerance) only describes behavior <em>during network partitions</em>. The <strong>PACELC Theorem</strong> extends it to describe normal operating latency:</p>
          <p class="font-italic text-secondary">"If there is a <strong>Partition (P)</strong>, trade off <strong>Availability (A)</strong> vs <strong>Consistency (C)</strong>; <strong>Else (E)</strong>, trade off <strong>Latency (L)</strong> vs <strong>Consistency (C)</strong>."</p>
          <p>Examples: MongoDB is <code>PC/EC</code> (prefers consistency in both partition and normal states); DynamoDB is <code>PA/EL</code> (prefers availability and low latency over strict consistency).</p>
        </div>
      </div>
`;

// Update database.html with questions & all 4 related database cards
let updatedDb = databaseContent.replace(/(<!-- course details -->\s*<div class="row">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/, `$1\n${databaseQuestions}\n$3`);
updatedDb = updatedDb.replace(/(<div class="row justify-content-center">)([\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>\s*<!-- \/related course -->)/, `$1\n${dbCards}\n$3`);
fs.writeFileSync('database.html', updatedDb, 'utf8');
console.log('[SUCCESS] Updated database.html with questions and all 4 database cards (SQL, Postgres, Mongo, Elastic)!');

console.log('All frontend, cloud, and database pages processed successfully!');
