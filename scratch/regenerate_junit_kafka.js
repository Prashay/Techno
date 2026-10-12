const fs = require('fs');
const path = require('path');
const { createStandardPage } = require('./page_template_helper');

// 1. KAFKA
const kafkaConfig = {
  title: 'Apache Kafka Interview Questions & Architecture Guide',
  bannerDesc: 'Event Streaming, Partitioning, Offsets, Consumer Groups & Distributed Logs in 2026.',
  track: 'Distributed Systems',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Apache Kafka Core Architecture & Primitives',
  part1Desc: 'Topics, Partitions, Consumer Groups, Offsets, and Log Compaction.',
  part2Heading: 'Advanced Distributed Streaming & 2026 Architectural Specs',
  part2Desc: 'KRaft metadata quorum (ZooKeeper-less), idempotent producers, and transactional semantics.',
  sections: [
    {
      type: 'basic',
      category: 'Kafka Fundamentals',
      question: 'Q1: Explain Kafka Architecture (Brokers, Topics, Partitions, Replicas)',
      answer: `<p>Apache Kafka is a distributed event store and stream-processing platform. Key primitives:</p>
<ul>
  <li><strong>Topic:</strong> Logical category or stream to which records are published.</li>
  <li><strong>Partition:</strong> An ordered, immutable commit log. Each partition provides strict ordering via 64-bit integer offset.</li>
  <li><strong>Broker:</strong> Stateless or KRaft-managed server node hosting partition replicas.</li>
  <li><strong>Leader & ISR (In-Sync Replicas):</strong> Each partition has one leader handling all reads/writes and multiple follower replicas replicating data.</li>
</ul>`
    },
    {
      type: 'basic',
      category: 'Kafka Fundamentals',
      question: 'Q2: How does Consumer Group Rebalancing work and what are the triggers?',
      answer: `<p>A consumer group distributes topic partitions among members such that each partition is processed by exactly one consumer within the group.</p>
<p><strong>Triggers for Rebalance:</strong></p>
<ol>
  <li>New consumer joins the group.</li>
  <li>Consumer crashes or misses heartbeat (<code>session.timeout.ms</code>).</li>
  <li>Consumer takes too long processing records before invoking poll (<code>max.poll.interval.ms</code>).</li>
  <li>New partitions added to the topic.</li>
</ol>`
    },
    {
      type: 'advance',
      category: 'Advanced Distributed Streaming (2026)',
      question: 'Advance Q1 (2026): ZooKeeper-less Kafka (KRaft Mode) & Metadata Quorum',
      answer: `<p>In modern Kafka, Apache ZooKeeper has been completely replaced by <strong>KRaft (Kafka Raft Metadata mode)</strong>:</p>
<ul>
  <li><strong>Consensus Quorum:</strong> A subset of brokers are designated as KRaft Controllers running Raft consensus directly on an internal metadata topic (<code>@metadata</code>).</li>
  <li><strong>Instant Cluster Recovery:</strong> Metadata replication happens in milliseconds; zero external ZK connection bottlenecks when managing 1,000,000+ partitions.</li>
  <li><strong>Simplified Security & Operations:</strong> Single binary, unified TLS/SASL security perimeter.</li>
</ul>`
    },
    {
      type: 'advance',
      category: 'Advanced Distributed Streaming (2026)',
      question: 'Advance Q2 (2026): Exactly-Once Semantics (EOS) with Transactional Producer & Idempotence',
      answer: `<p>How Kafka achieves end-to-end exactly-once delivery across consume-process-produce loops:</p>
<pre><code class="language-java">// Production-ready Idempotent & Transactional Producer configuration
Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka-broker:9092");
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true"); // enforces acks=all, retries=MAX, max.in.flight.requests=5
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "order-proc-tx-1");

Producer<String, String> producer = new KafkaProducer<>(props);
producer.initTransactions();

try {
    producer.beginTransaction();
    producer.send(new ProducerRecord<>("orders-processed", orderId, payload));
    producer.sendOffsetsToTransaction(consumerOffsets, consumerGroupId);
    producer.commitTransaction();
} catch (ProducerFencedException | OutOfOrderSequenceException e) {
    producer.close();
} catch (KafkaException e) {
    producer.abortTransaction();
}</code></pre>`
    }
  ]
};

// 2. JUNIT 5 & TESTING
const junitConfig = {
  title: 'JUnit 5 & Mockito Interview Questions & Best Practices',
  bannerDesc: 'Modern Unit Testing, Assertions, Parameterized Suites & Integration Tests with Testcontainers.',
  track: 'Test Engineering',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'JUnit 5 & Mockito Core Testing Foundations',
  part1Desc: 'Lifecycle annotations, assertions, parameterized tests, and Mockito stubbing.',
  part2Heading: 'Modern Test Engineering & Architecture Verification (2026)',
  part2Desc: 'Testcontainers integration testing with dynamic service connections and static mocking.',
  sections: [
    {
      type: 'basic',
      category: 'JUnit 5 & Mockito Core',
      question: 'Q1: Key differences between JUnit 4 and JUnit 5 (Jupiter)',
      answer: `<p>JUnit 5 is composed of three sub-projects: <code>JUnit Platform</code> (engine execution), <code>JUnit Jupiter</code> (programming model), and <code>JUnit Vintage</code> (backward compatibility).</p>
<table class="table table-bordered">
  <thead><tr><th>Feature</th><th>JUnit 4</th><th>JUnit 5 (Jupiter)</th></tr></thead>
  <tbody>
    <tr><td>Lifecycle</td><td>@Before, @After, @BeforeClass</td><td>@BeforeEach, @AfterEach, @BeforeAll</td></tr>
    <tr><td>Extensions</td><td>@RunWith, @Rule, @ClassRule</td><td>Unified @ExtendWith(MockitoExtension.class)</td></tr>
    <tr><td>Assertions</td><td>Assert.assertEquals</td><td>Assertions.assertAll(), assertThrows()</td></tr>
    <tr><td>Tagging</td><td>@Category</td><td>@Tag("integration"), @Tag("smoke")</td></tr>
  </tbody>
</table>`
    },
    {
      type: 'basic',
      category: 'JUnit 5 & Mockito Core',
      question: 'Q2: Difference between @Mock, @Spy, and @InjectMocks in Mockito',
      answer: `<p><strong>@Mock:</strong> Creates a dummy stub implementation where all non-stubbed methods return default values (null, 0, false).</p>
<p><strong>@Spy:</strong> Wraps a real object instance. Non-stubbed methods invoke the actual production code logic, while allowing specific methods to be mocked.</p>
<p><strong>@InjectMocks:</strong> Automatically creates an instance of the class under test and injects mocks and spies created via <code>@Mock</code> or <code>@Spy</code> into its constructor or fields.</p>`
    },
    {
      type: 'advance',
      category: 'Modern Testing Engineering (2026)',
      question: 'Advance Q1 (2026): Integration Testing with Testcontainers & Spring Boot @ServiceConnection',
      answer: `<p>In 2026, embedded databases (H2, Embedded Kafka) are obsolete due to SQL dialect mismatches. Modern enterprise tests use Testcontainers with dynamic service connections.</p>
<pre><code class="language-java">import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
class OrderServiceIntegrationTest {

    @Container
    @ServiceConnection // Automatically wires spring.datasource.url/username/password
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @Test
    void shouldPersistOrderWithinRealPostgres() {
        // Real PostgreSQL execution verifying dialect, constraints, and JSONB fields
    }
}</code></pre>`
    }
  ]
};

[
  { file: 'kafka.html', config: kafkaConfig },
  { file: 'junit.html', config: junitConfig }
].forEach(item => {
  const filePath = path.join(__dirname, '..', item.file);
  const html = createStandardPage(item.config);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Regenerated ' + item.file + ' (Size: ' + fs.statSync(filePath).size + ' bytes)');
});
