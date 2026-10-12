const fs = require('fs');
const path = require('path');
const { createStandardPage } = require('./page_template_helper');

// 1. JAVA 8 PROGRAMS
const java8programsConfig = {
  title: 'Java 8 Coding Programs & Stream API Practice',
  bannerTitle: 'Java 8 Coding Programs',
  bannerDesc: 'Real-world Stream API, Collectors, Lambdas & Functional Programming Interview Solutions.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Master modern Java engineering tracks from foundational functional programming to cloud-native microservices.',
  sections: [
    {
      type: 'basic',
      category: 'Java 8 Functional Programming & Streams',
      question: 'Program 1: Find Frequency of Each Character in a String using Streams',
      answer: `<p>A classic Java 8 coding question testing <code>chars()</code>, boxed streams, and <code>Collectors.groupingBy()</code> with <code>Collectors.counting()</code>.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.Collectors;

public class CharacterFrequency {
    public static void main(String[] args) {
        String input = "technointerview2026";
        
        Map<Character, Long> frequencyMap = input.chars()
            .mapToObj(c -> (char) c)
            .collect(Collectors.groupingBy(
                c -> c,
                LinkedHashMap::new,
                Collectors.counting()
            ));
            
        frequencyMap.forEach((k, v) -> System.out.println("'" + k + "' -> " + v));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Java 8 Functional Programming & Streams',
      question: 'Program 2: Find the First Non-Repeated Character in a String',
      answer: `<p>Utilizes <code>LinkedHashMap</code> with <code>Collectors.groupingBy()</code> to preserve insertion order, followed by stream filtering for count == 1.</p>
<pre><code class="language-java">import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class FirstNonRepeated {
    public static void main(String[] args) {
        String input = "swiss";
        
        Character result = input.chars()
            .mapToObj(c -> (char) c)
            .collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting()))
            .entrySet().stream()
            .filter(entry -> entry.getValue() == 1L)
            .map(Map.Entry::getKey)
            .findFirst()
            .orElse(null);
            
        System.out.println("First non-repeated character in '" + input + "' is: " + result);
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Java 8 Functional Programming & Streams',
      question: 'Program 3: Find the Second Highest Number from an Integer List',
      answer: `<p>Uses <code>distinct()</code>, <code>sorted(Comparator.reverseOrder())</code>, <code>skip(1)</code>, and <code>findFirst()</code>.</p>
<pre><code class="language-java">import java.util.*;

public class SecondHighest {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(42, 19, 87, 87, 56, 94, 94, 63);
        
        Integer secondHighest = numbers.stream()
            .distinct()
            .sorted(Comparator.reverseOrder())
            .skip(1)
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("List does not have at least 2 distinct numbers"));
            
        System.out.println("Second highest number: " + secondHighest);
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Java 8/17/21 Advanced Stream Engineering',
      question: 'Advance Q1 (2026): Custom Collector for Moving Average & Sliding Window',
      answer: `<p>In modern high-throughput streaming systems, implementing custom <code>Collector&lt;T, A, R&gt;</code> is asked to test deep mastery beyond standard out-of-the-box collectors.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.*;

public class SlidingWindowCollector {
    public static void main(String[] args) {
        List<Double> stockPrices = List.of(100.0, 102.5, 101.0, 105.0, 107.5, 110.0);
        int windowSize = 3;
        
        List<Double> movingAverages = IntStream.range(0, stockPrices.size() - windowSize + 1)
            .mapToObj(i -> stockPrices.subList(i, i + windowSize))
            .map(sub -> sub.stream().mapToDouble(Double::doubleValue).average().orElse(0.0))
            .collect(Collectors.toList());
            
        System.out.println("Moving Averages (Window 3): " + movingAverages);
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Java 8/17/21 Advanced Stream Engineering',
      question: 'Advance Q2 (2026): Parallel Stream Pitfalls with ForkJoinPool.commonPool() vs Java 21 Virtual Threads',
      answer: `<p>Parallel streams by default consume the shared global <code>ForkJoinPool.commonPool()</code>. If any pipeline executes blocking I/O (database, external REST call), it exhausts CPU threads for all parallel streams across the JVM.</p>
<pre><code class="language-java">import java.util.concurrent.*;
import java.util.*;

public class VirtualThreadStreamDemo {
    public static void main(String[] args) throws Exception {
        List<String> endpoints = List.of("svc-auth", "svc-order", "svc-payment", "svc-catalog");
        
        // In Java 21+: Prefer structured concurrency or executor per task with Virtual Threads
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<String>> futures = endpoints.stream()
                .map(ep -> executor.submit(() -> {
                    Thread.sleep(50); // Simulate non-blocking carrier thread unmount
                    return "Response from " + ep + " on " + Thread.currentThread();
                }))
                .toList();
                
            for (Future<String> f : futures) {
                System.out.println(f.get());
            }
        }
    }
}</code></pre>`
    }
  ]
};

// 2. NUMBER PROGRAMS
const numberprogramsConfig = {
  title: 'Number Programming & Algorithmic Interview Solutions',
  bannerTitle: 'Number Programming Interview Questions',
  bannerDesc: 'Core Math, Number Theory, Bitwise Tricks & Algorithmic Logic in Java 8 / 17 / 21.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Sharpen your analytical problem-solving foundation with comprehensive data structure and algorithmic coding.',
  sections: [
    {
      type: 'basic',
      category: 'Number Algorithms & Logic',
      question: 'Program 1: Check if a Number is Prime (O(sqrt(N)) Optimization)',
      answer: `<p>Efficient prime checking checking divisibility up to <code>Math.sqrt(n)</code> and skipping even multiples after checking 2 and 3.</p>
<pre><code class="language-java">public class PrimeChecker {
    public static boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        int[] testNumbers = {2, 17, 27, 49, 97, 100};
        for (int num : testNumbers) {
            System.out.println(num + " is prime? " + isPrime(num));
        }
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Number Algorithms & Logic',
      question: 'Program 2: Reverse an Integer with 32-bit Signed Overflow Guard',
      answer: `<p>Standard interview solution that guards against integer overflow (LeetCode 7).</p>
<pre><code class="language-java">public class ReverseInteger {
    public static int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE / 10 || (rev == Integer.MAX_VALUE / 10 && pop > 7)) return 0;
            if (rev < Integer.MIN_VALUE / 10 || (rev == Integer.MIN_VALUE / 10 && pop < -8)) return 0;
            rev = rev * 10 + pop;
        }
        return rev;
    }

    public static void main(String[] args) {
        System.out.println("Reversed 12345: " + reverse(12345));
        System.out.println("Reversed -9876: " + reverse(-9876));
        System.out.println("Reversed overflow (1534236469): " + reverse(1534236469));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Advanced Bitwise & Mathematical Logic',
      question: 'Advance Q1 (2026): Find Single Non-Duplicate in Array where every other element appears K times',
      answer: `<p>Bit-level frequency counter modulo K. For K=2, XOR is sufficient. For general K (e.g. K=3), count bit frequencies across all 32 bits.</p>
<pre><code class="language-java">public class SingleNumberII {
    public static int singleNumber(int[] nums) {
        int ones = 0, twos = 0;
        for (int n : nums) {
            ones = (ones ^ n) & ~twos;
            twos = (twos ^ n) & ~ones;
        }
        return ones;
    }

    public static void main(String[] args) {
        int[] nums = {4, 7, 4, 4, 9, 7, 7}; // 9 appears once, others 3 times
        System.out.println("Unique element: " + singleNumber(nums));
    }
}</code></pre>`
    }
  ]
};

// 3. STRING PROGRAMS
const stringprogramsConfig = {
  title: 'String Algorithms & Manipulation Interview Solutions',
  bannerTitle: 'String Programming Interview Questions',
  bannerDesc: 'Master Anagrams, Substrings, Palindromes, Two-Pointers, and Sliding Windows in Java.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Deepen your coding skills with algorithmic problem solving, pattern matching, and runtime optimization.',
  sections: [
    {
      type: 'basic',
      category: 'Core String Algorithms',
      question: 'Program 1: Group Anagrams using Hash Frequency Map',
      answer: `<p>Classic interview question (LeetCode 49) solving grouping of strings that are permutations of each other.</p>
<pre><code class="language-java">import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }

    public static void main(String[] args) {
        String[] words = {"eat", "tea", "tan", "ate", "nat", "bat"};
        System.out.println("Grouped Anagrams: " + groupAnagrams(words));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Core String Algorithms',
      question: 'Program 2: Longest Substring Without Repeating Characters (Sliding Window)',
      answer: `<p>Sliding window with <code>Map&lt;Character, Integer&gt;</code> to track last seen positions in O(N) time.</p>
<pre><code class="language-java">import java.util.*;

public class LongestUniqueSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int maxLen = 0;
        Map<Character, Integer> charIndexMap = new HashMap<>();
        
        for (int left = 0, right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (charIndexMap.containsKey(c)) {
                left = Math.max(left, charIndexMap.get(c) + 1);
            }
            charIndexMap.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        String test = "abcabcbb";
        System.out.println("Longest unique substring length in '" + test + "': " + lengthOfLongestSubstring(test));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Advanced String Parsing & Pattern Matching',
      question: 'Advance Q1 (2026): Longest Palindromic Substring via Expand Around Center (O(1) Space)',
      answer: `<p>Expanding around potential single and double character centers avoids O(N^2) space complexity of dynamic programming.</p>
<pre><code class="language-java">public class LongestPalindrome {
    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private static int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }

    public static void main(String[] args) {
        System.out.println("LPS of 'babad': " + longestPalindrome("babad"));
        System.out.println("LPS of 'cbbd': " + longestPalindrome("cbbd"));
    }
}</code></pre>`
    }
  ]
};

// 4. TOPIC-WISE PROGRAM
const topicwiseprogramConfig = {
  title: 'Topic-wise Coding Interview Challenges & Data Structures',
  bannerTitle: 'Topic-wise Coding Programs',
  bannerDesc: 'Comprehensive Data Structures: LinkedList, LRU Cache, Trees & Dynamic Programming in Java.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Systematic study paths across fundamental algorithms and modern scalable architecture.',
  sections: [
    {
      type: 'basic',
      category: 'LinkedList & Pointers',
      question: 'Program 1: Detect and Find Start of Cycle in a Linked List (Floyd\'s Tortoise & Hare)',
      answer: `<p>Standard interview problem (LeetCode 142) detecting cycle entry point in O(N) time and O(1) memory.</p>
<pre><code class="language-java">public class LinkedListCycle {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int x) { val = x; }
    }

    public static ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                ListNode finder = head;
                while (finder != slow) {
                    finder = finder.next;
                    slow = slow.next;
                }
                return finder;
            }
        }
        return null;
    }

    public static void main(String[] args) {
        ListNode n1 = new ListNode(3);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(0);
        ListNode n4 = new ListNode(-4);
        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2; // cycle back to n2
        
        ListNode cycleStart = detectCycle(n1);
        System.out.println("Cycle entry node value: " + (cycleStart != null ? cycleStart.val : "No cycle"));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Custom Data Structures & Memory Caching',
      question: 'Advance Q1 (2026): Production-Ready LRU Cache with O(1) Get and Put',
      answer: `<p>Implements Doubly Linked List + HashMap combination for strict O(1) recency eviction.</p>
<pre><code class="language-java">import java.util.*;

public class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0), tail = new Node(0, 0);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(tail.prev);
        }
        insert(new Node(key, value));
    }

    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insert(Node node) {
        map.put(node.key, node);
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }

    public static void main(String[] args) {
        LRUCache lru = new LRUCache(2);
        lru.put(1, 100);
        lru.put(2, 200);
        System.out.println("Get 1: " + lru.get(1)); // returns 100
        lru.put(3, 300); // evicts key 2
        System.out.println("Get 2 (evicted): " + lru.get(2)); // returns -1
        System.out.println("Get 3: " + lru.get(3)); // returns 300
    }
}</code></pre>`
    }
  ]
};

// 5. APACHE KAFKA
const kafkaConfig = {
  title: 'Apache Kafka Interview Questions & Architecture Guide',
  bannerTitle: 'Apache Kafka Interview Questions',
  bannerDesc: 'Event Streaming, Partitioning, Offsets, Consumer Groups & Distributed Logs in 2026.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Design resilient event-driven architectures with high-throughput distributed message streaming.',
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

// 6. JUNIT 5 & TESTING
const junitConfig = {
  title: 'JUnit 5 & Mockito Interview Questions & Best Practices',
  bannerTitle: 'JUnit 5 & Mockito Testing Guide',
  bannerDesc: 'Modern Unit Testing, Assertions, Parameterized Suites & Integration Tests with Testcontainers.',
  activeNav: 'Courses',
  relatedCategory: 'Backend Development',
  relatedDescription: 'Write robust, regression-free code using modern testing frameworks and architectural verification.',
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

// Generate files
const pages = [
  { file: 'java8programs.html', config: java8programsConfig },
  { file: 'numberprograms.html', config: numberprogramsConfig },
  { file: 'Stringprograms.html', config: stringprogramsConfig },
  { file: 'topicwiseprogram.html', config: topicwiseprogramConfig },
  { file: 'kafka.html', config: kafkaConfig },
  { file: 'junit.html', config: junitConfig }
];

pages.forEach(p => {
  const filePath = path.join(__dirname, '..', p.file);
  const html = createStandardPage(p.config);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Created and populated ' + p.file + ' (Size: ' + fs.statSync(filePath).size + ' bytes)');
});
