const fs = require('fs');
const path = require('path');
const { createStandardPage } = require('./page_template_helper');

// ============================================================================
// 1. STRING PROGRAMS (Stringprograms.html)
// ============================================================================
const stringProgramsConfig = {
  title: 'String Programming Interview Questions',
  bannerDesc: 'Real-World String Manipulation, Sliding Windows, Palindromes & Anagrams in Java.',
  track: 'Interview Coding',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Core String Algorithms Asked in Tech Interviews',
  part1Desc: 'Foundational string manipulation, frequency mapping, and two-pointer interview programs.',
  part2Heading: 'Advanced String Algorithms & Complex Optimizations (2026)',
  part2Desc: 'Sliding window string matching, in-place compression, and expand-around-center algorithms.',
  sections: [
    {
      type: 'basic',
      category: 'Anagrams & Frequency',
      question: 'Program 1: Group Anagrams using Hash Frequency Map (LeetCode 49)',
      answer: `<p>A high-frequency interview question across Amazon, Microsoft, and Google. Groups words that are anagrams of each other.</p>
<pre><code class="language-java">import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] strs) {
        if (strs == null || strs.length == 0) return new ArrayList<>();
        Map<String, List<String>> map = new HashMap<>();
        
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = String.valueOf(chars);
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
      category: 'Two-Pointer & Palindrome',
      question: 'Program 2: Valid Palindrome with Alphanumeric Filtering (LeetCode 125)',
      answer: `<p>Verifies if a phrase is a palindrome considering only alphanumeric characters and ignoring cases in O(N) time and O(1) space.</p>
<pre><code class="language-java">public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        if (s == null) return false;
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        String s1 = "A man, a plan, a canal: Panama";
        String s2 = "race a car";
        System.out.println("'" + s1 + "' is palindrome? " + isPalindrome(s1));
        System.out.println("'" + s2 + "' is palindrome? " + isPalindrome(s2));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Common Prefix',
      question: 'Program 3: Longest Common Prefix across Array of Strings (LeetCode 14)',
      answer: `<p>Horizontal scanning reducing prefix length in O(S) where S is the sum of characters across all strings.</p>
<pre><code class="language-java">public class LongestCommonPrefix {
    public static String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        String prefix = strs[0];
        
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }

    public static void main(String[] args) {
        String[] arr1 = {"flower", "flow", "flight"};
        String[] arr2 = {"dog", "racecar", "car"};
        System.out.println("LCP of arr1: " + longestCommonPrefix(arr1));
        System.out.println("LCP of arr2: " + longestCommonPrefix(arr2));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'In-Place Modification',
      question: 'Program 4: String Compression in O(1) Auxiliary Space (LeetCode 443)',
      answer: `<p>Compresses consecutive repeated characters in-place inside a char array, returning new compressed length.</p>
<pre><code class="language-java">import java.util.Arrays;

public class StringCompression {
    public static int compress(char[] chars) {
        int write = 0, anchor = 0;
        for (int read = 0; read < chars.length; read++) {
            if (read + 1 == chars.length || chars[read + 1] != chars[read]) {
                chars[write++] = chars[anchor];
                int count = read - anchor + 1;
                if (count > 1) {
                    for (char c : Integer.toString(count).toCharArray()) {
                        chars[write++] = c;
                    }
                }
                anchor = read + 1;
            }
        }
        return write;
    }

    public static void main(String[] args) {
        char[] chars = {'a', 'a', 'b', 'b', 'c', 'c', 'c'};
        int newLength = compress(chars);
        System.out.println("Compressed length: " + newLength);
        System.out.print("Compressed array: ");
        for (int i = 0; i < newLength; i++) System.out.print(chars[i] + " ");
        System.out.println();
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Sliding Window',
      question: 'Advance Q1 (2026): Longest Substring Without Repeating Characters (LeetCode 3)',
      answer: `<p>Optimal sliding window using character index map achieving strict O(N) runtime and O(min(m, n)) space.</p>
<pre><code class="language-java">import java.util.*;

public class LongestUniqueSubstring {
    public static int lengthOfLongestSubstring(String s) {
        int maxLen = 0;
        Map<Character, Integer> lastSeen = new HashMap<>();
        
        for (int left = 0, right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c)) {
                left = Math.max(left, lastSeen.get(c) + 1);
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        String[] tests = {"abcabcbb", "bbbbb", "pwwkew"};
        for (String t : tests) {
            System.out.println("Longest unique in '" + t + "': " + lengthOfLongestSubstring(t));
        }
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Dynamic Programming & Centers',
      question: 'Advance Q2 (2026): Longest Palindromic Substring via Expand Around Center (LeetCode 5)',
      answer: `<p>Expands around $2N - 1$ centers in $O(N^2)$ time with zero additional dynamic programming matrix allocation ($O(1)$ space).</p>
<pre><code class="language-java">public class LongestPalindrome {
    public static String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        
        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);     // Odd length centers (e.g. "aba")
            int len2 = expand(s, i, i + 1); // Even length centers (e.g. "abba")
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private static int expand(String s, int left, int right) {
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
    },
    {
      type: 'advance',
      category: 'Two-Pointer Greed',
      question: 'Advance Q3 (2026): Valid Palindrome II with at most One Deletion (LeetCode 680)',
      answer: `<p>Frequently asked in Meta and Uber interviews. Checks whether string can be a palindrome after deleting at most one character.</p>
<pre><code class="language-java">public class ValidPalindromeII {
    public static boolean validPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return isSubPalindrome(s, left + 1, right) || isSubPalindrome(s, left, right - 1);
            }
            left++;
            right--;
        }
        return true;
    }

    private static boolean isSubPalindrome(String s, int i, int j) {
        while (i < j) {
            if (s.charAt(i++) != s.charAt(j--)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println("'aba' valid? " + validPalindrome("aba"));
        System.out.println("'abca' valid? " + validPalindrome("abca")); // delete 'c' -> "aba"
        System.out.println("'abc' valid? " + validPalindrome("abc"));
    }
}</code></pre>`
    }
  ]
};

// ============================================================================
// 2. NUMBER PROGRAMS (numberprograms.html)
// ============================================================================
const numberProgramsConfig = {
  title: 'Number Programming Interview Questions',
  bannerDesc: 'Number Theory, Bitwise Tricks, Primes & Algorithmic Math in Java 8 / 17 / 21.',
  track: 'Interview Coding',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Core Number Theory & Mathematical Algorithms',
  part1Desc: 'Essential math, prime factorization, digit extraction, and 32-bit overflow guards.',
  part2Heading: 'Advanced Bitwise Manipulation & Algorithmic Math (2026)',
  part2Desc: 'Bit frequency masks, cycle detection in numbers, and factorial prime factor counting.',
  sections: [
    {
      type: 'basic',
      category: 'Primality & Factoring',
      question: 'Program 1: Prime Number Verification in O(sqrt(N))',
      answer: `<p>Skips multiples of 2 and 3 and iterates only $6k \pm 1$ numbers up to $\sqrt{N}$.</p>
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
        int[] numbers = {2, 17, 29, 49, 97, 100};
        for (int n : numbers) {
            System.out.println(n + " is prime? " + isPrime(n));
        }
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Overflow Guard',
      question: 'Program 2: Reverse 32-bit Signed Integer with Overflow Guard (LeetCode 7)',
      answer: `<p>Prevents 32-bit signed overflow when reversing an integer.</p>
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
        System.out.println("Reverse 12345: " + reverse(12345));
        System.out.println("Reverse -9876: " + reverse(-9876));
        System.out.println("Reverse overflow (1534236469): " + reverse(1534236469));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'HashMap Complement',
      question: 'Program 3: Two Sum in O(N) using Single-Pass HashMap (LeetCode 1)',
      answer: `<p>The #1 most frequently asked interview question worldwide. Looks up complement in $O(1)$ time.</p>
<pre><code class="language-java">import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution found");
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] res = twoSum(nums, target);
        System.out.println("Indices for target " + target + ": [" + res[0] + ", " + res[1] + "]");
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Bitwise Logic',
      question: 'Program 4: Check if Number is Power of Two without Loops',
      answer: `<p>Uses the fundamental property that a power of two has exactly one set bit: <code>(n > 0) && ((n & (n - 1)) == 0)</code>.</p>
<pre><code class="language-java">public class PowerOfTwo {
    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) {
        int[] testValues = {1, 2, 16, 18, 64, 100, 1024};
        for (int v : testValues) {
            System.out.println(v + " is power of 2? " + isPowerOfTwo(v));
        }
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Bitwise Mastery',
      question: 'Advance Q1 (2026): Find Single Number where other elements appear 3 times (LeetCode 137)',
      answer: `<p>Tracks bit frequencies using two 32-bit registers (<code>ones</code> and <code>twos</code>) modulo 3 without additional array memory.</p>
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
        int[] arr = {2, 2, 3, 2};
        System.out.println("Single unique number: " + singleNumber(arr));
        int[] arr2 = {0, 1, 0, 1, 0, 1, 99};
        System.out.println("Single unique number in arr2: " + singleNumber(arr2));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Cycle Detection in Math',
      question: 'Advance Q2 (2026): Happy Number via Floyd\'s Tortoise & Hare (LeetCode 202)',
      answer: `<p>Detects number cycles in $O(1)$ space without requiring a HashSet by applying fast & slow pointer cycle detection.</p>
<pre><code class="language-java">public class HappyNumber {
    public static boolean isHappy(int n) {
        int slow = n;
        int fast = getNext(n);
        while (fast != 1 && slow != fast) {
            slow = getNext(slow);
            fast = getNext(getNext(fast));
        }
        return fast == 1;
    }

    private static int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int d = n % 10;
            n /= 10;
            sum += d * d;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println("19 is happy number? " + isHappy(19)); // true (19 -> 82 -> 68 -> 100 -> 1)
        System.out.println("2 is happy number? " + isHappy(2));   // false (falls into cycle)
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Combinatorics & Factors',
      question: 'Advance Q3 (2026): Count Trailing Zeroes in Factorial of N in O(log5(N)) (LeetCode 172)',
      answer: `<p>Avoids calculating the astronomically large factorial by counting the total factors of 5: $\lfloor N/5 \rfloor + \lfloor N/25 \rfloor + \lfloor N/125 \rfloor + \dots$</p>
<pre><code class="language-java">public class FactorialTrailingZeroes {
    public static int trailingZeroes(int n) {
        int count = 0;
        while (n >= 5) {
            count += n / 5;
            n /= 5;
        }
        return count;
    }

    public static void main(String[] args) {
        int[] inputs = {5, 10, 25, 100, 1000};
        for (int n : inputs) {
            System.out.println("Trailing zeroes in " + n + "! = " + trailingZeroes(n));
        }
    }
}</code></pre>`
    }
  ]
};

// ============================================================================
// 3. JAVA 8 PROGRAMS (java8programs.html)
// ============================================================================
const java8ProgramsConfig = {
  title: 'Java 8 Coding Programs & Stream API Practice',
  bannerDesc: 'Real-world Stream API, Collectors, Lambdas & Functional Programming Interview Solutions.',
  track: 'Interview Coding',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Core Stream API & Functional Programming Solutions',
  part1Desc: 'Mastering character frequency, sorting, partitioning, and reduction with Java 8 Streams.',
  part2Heading: 'Advanced Stream Engineering & Java 21 Modern Concurrency',
  part2Desc: 'Custom collectors, flatMap transformations, multi-field object comparators, and Virtual Threads.',
  sections: [
    {
      type: 'basic',
      category: 'Streams & GroupingBy',
      question: 'Program 1: Find Frequency of Each Character in a String using Streams',
      answer: `<p>Uses <code>chars()</code>, boxed characters, and <code>Collectors.groupingBy()</code> with <code>Collectors.counting()</code>.</p>
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
      category: 'Order Preservation',
      question: 'Program 2: Find First Non-Repeated Character in a String',
      answer: `<p>Utilizes <code>LinkedHashMap</code> to maintain order, followed by stream filtering for count == 1.</p>
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
      category: 'Deduplication & Sorting',
      question: 'Program 3: Find Second Highest Number in an Integer List',
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
            .orElseThrow(() -> new IllegalArgumentException("List needs at least 2 distinct values"));
            
        System.out.println("Second highest number: " + secondHighest);
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Partitioning Streams',
      question: 'Program 4: Partition List of Numbers into Even and Odd Lists',
      answer: `<p>Demonstrates <code>Collectors.partitioningBy(n -> n % 2 == 0)</code> partitioning into a <code>Map&lt;Boolean, List&lt;Integer&gt;&gt;</code>.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.Collectors;

public class PartitionEvenOdd {
    public static void main(String[] args) {
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        Map<Boolean, List<Integer>> partitioned = nums.stream()
            .collect(Collectors.partitioningBy(n -> n % 2 == 0));
            
        System.out.println("Even Numbers: " + partitioned.get(true));
        System.out.println("Odd Numbers: " + partitioned.get(false));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'FlatMap Transformation',
      question: 'Advance Q1 (2026): Flatten Nested Lists (List<List<String>>) and Deduplicate',
      answer: `<p>Demonstrates <code>flatMap(List::stream)</code> flattening multi-dimensional collections into a single stream.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.Collectors;

public class FlatMapDemo {
    public static void main(String[] args) {
        List<List<String>> techStacks = Arrays.asList(
            Arrays.asList("Java", "Spring Boot", "Kafka"),
            Arrays.asList("PostgreSQL", "Docker", "Java"),
            Arrays.asList("React", "Kubernetes", "Kafka")
        );
        
        List<String> uniqueSkills = techStacks.stream()
            .flatMap(Collection::stream)
            .distinct()
            .sorted()
            .collect(Collectors.toList());
            
        System.out.println("Flattened Unique Skills: " + uniqueSkills);
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Multi-Field Comparator',
      question: 'Advance Q2 (2026): Sort Custom Employee Objects by Department, then Salary Descending',
      answer: `<p>Uses <code>Comparator.comparing().thenComparing(reverseOrder)</code> for clean functional composition.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.Collectors;

public class EmployeeSorter {
    static class Employee {
        String name;
        String department;
        double salary;
        Employee(String n, String d, double s) { name = n; department = d; salary = s; }
        @Override
        public String toString() { return name + " (" + department + ", $" + salary + ")"; }
    }

    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Prashant", "Engineering", 145000),
            new Employee("Aarav", "Cloud", 125000),
            new Employee("Sneha", "Engineering", 155000),
            new Employee("Rohan", "Cloud", 140000)
        );

        List<Employee> sorted = employees.stream()
            .sorted(Comparator.comparing((Employee e) -> e.department)
                .thenComparing(Comparator.comparingDouble((Employee e) -> e.salary).reversed()))
            .collect(Collectors.toList());

        sorted.forEach(System.out::println);
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Parallel Streams vs Virtual Threads',
      question: 'Advance Q3 (2026): Parallel Stream Pitfalls vs Java 21 Loom Virtual Threads',
      answer: `<p>Parallel streams consume the shared global <code>ForkJoinPool.commonPool()</code>. In Java 21+, prefer structured concurrency or Virtual Threads for I/O operations.</p>
<pre><code class="language-java">import java.util.concurrent.*;
import java.util.*;

public class VirtualThreadExecution {
    public static void main(String[] args) throws Exception {
        List<String> services = List.of("Auth", "Payment", "Inventory", "Notification");
        
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            List<Future<String>> results = services.stream()
                .map(svc -> executor.submit(() -> {
                    Thread.sleep(50); // Simulating non-blocking I/O
                    return "Handled " + svc + " on " + Thread.currentThread();
                }))
                .toList();
                
            for (Future<String> f : results) {
                System.out.println(f.get());
            }
        }
    }
}</code></pre>`
    }
  ]
};

// ============================================================================
// 4. TOPIC-WISE PROGRAM (topicwiseprogram.html)
// ============================================================================
const topicwiseProgramsConfig = {
  title: 'Topic-wise Coding Challenges & Data Structures',
  bannerDesc: 'LinkedList, Trees, Binary Search, Stacks, LRU Cache & Dynamic Programming in Java.',
  track: 'Interview Coding',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Essential Data Structure Coding Programs',
  part1Desc: 'Cycle detection, valid parentheses with stacks, binary search, and linked lists.',
  part2Heading: 'Advanced Algorithms & System Coding (2026)',
  part2Desc: 'Production LRU Cache design, Binary Tree BFS/LCA, and Dynamic Programming.',
  sections: [
    {
      type: 'basic',
      category: 'LinkedList & Pointers',
      question: 'Program 1: Detect and Return Cycle Entry Node in LinkedList (Floyd\'s Algorithm)',
      answer: `<p>Detects if a linked list has a cycle and locates the exact entry point in $O(N)$ time and $O(1)$ memory (LeetCode 142).</p>
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
        n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2; // cycle to n2
        
        ListNode start = detectCycle(n1);
        System.out.println("Cycle entry node value: " + (start != null ? start.val : "No cycle"));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Stack Evaluation',
      question: 'Program 2: Valid Parentheses Evaluation using Stack (LeetCode 20)',
      answer: `<p>Verifies bracket syntax matching for <code>()</code>, <code>{}</code>, and <code>[]</code> in $O(N)$ time.</p>
<pre><code class="language-java">import java.util.*;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("()[]{} valid? " + isValid("()[]{}"));
        System.out.println("([)] valid? " + isValid("([)]"));
        System.out.println("{[]} valid? " + isValid("{[]}"));
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Tree Breadth-First Search',
      question: 'Program 3: Binary Tree Level Order Traversal (BFS via Queue) (LeetCode 102)',
      answer: `<p>Traverses tree level-by-level using a FIFO queue in $O(N)$ time.</p>
<pre><code class="language-java">import java.util.*;

public class LevelOrderTraversal {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }

    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);
        
        System.out.println("Level Order Traversal: " + levelOrder(root));
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Cache System Design',
      question: 'Advance Q1 (2026): Production-Ready LRU Cache with O(1) Get and Put (LeetCode 146)',
      answer: `<p>Combines a Doubly Linked List with a HashMap to guarantee strict $O(1)$ recency promotion and eviction.</p>
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
        System.out.println("Get 1: " + lru.get(1)); // 100
        lru.put(3, 300); // evicts key 2
        System.out.println("Get 2 (evicted): " + lru.get(2)); // -1
        System.out.println("Get 3: " + lru.get(3)); // 300
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Dynamic Programming',
      question: 'Advance Q2 (2026): Coin Change Problem - Minimum Coins via Bottom-Up DP (LeetCode 322)',
      answer: `<p>Solves fewest number of coins to make total amount in $O(A \times C)$ where $A$ is amount and $C$ is coin denomination count.</p>
<pre><code class="language-java">import java.util.Arrays;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        int amount = 11;
        System.out.println("Min coins for amount " + amount + ": " + coinChange(coins, amount)); // 3 (5+5+1)
    }
}</code></pre>`
    }
  ]
};

// ============================================================================
// 5. INTERVIEW PROGRAMS HUB (programmin.html)
// ============================================================================
const programminHubConfig = {
  title: 'Interview Programs & Coding Mastery',
  bannerDesc: 'Real-World Technical Interview Coding Challenges Asked Across Top Tech Companies.',
  track: 'Interview Programs Hub',
  target: 'Developer &bull; Lead 2026',
  part1Heading: 'Core Coding Foundations Asked in Tech Interviews',
  part1Desc: 'Essential algorithms, string manipulation, number theory, and functional streams with live runnable code.',
  part2Heading: 'Recently Asked Interview Programs & System Coding (2026)',
  part2Desc: 'High-frequency complex interview programs asked in recent FAANG and Tier-1 tech interviews with time & space complexity analysis.',
  sections: [
    {
      type: 'basic',
      category: 'String & Array',
      question: 'Program 1: Two Sum with Optimal One-Pass Hash Lookup',
      answer: `<p>Finds two numbers in an array that add up to a target sum in $O(N)$ time.</p>
<pre><code class="language-java">import java.util.*;

public class TwoSumRunner {
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.println("Found match: index " + map.get(complement) + " and " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}</code></pre>`
    },
    {
      type: 'basic',
      category: 'Java 8 Streams',
      question: 'Program 2: Grouping & Frequency Counting with Java 8 Streams',
      answer: `<p>Counts occurrences of each element in a collection cleanly using streams.</p>
<pre><code class="language-java">import java.util.*;
import java.util.stream.Collectors;

public class StreamCounter {
    public static void main(String[] args) {
        List<String> items = Arrays.asList("apple", "banana", "apple", "orange", "banana", "apple");
        Map<String, Long> countMap = items.stream()
            .collect(Collectors.groupingBy(item -> item, Collectors.counting()));
        System.out.println("Frequencies: " + countMap);
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Concurrency & Virtual Threads',
      question: 'Advance Q1 (2026): Java 21 High-Concurrency Virtual Thread Pool',
      answer: `<p>Spawns millions of lightweight virtual threads for high-throughput microservices without carrier thread starvation.</p>
<pre><code class="language-java">import java.util.concurrent.*;

public class LoomSandbox {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 5; i++) {
                final int id = i;
                executor.submit(() -> {
                    System.out.println("Task #" + id + " executed on " + Thread.currentThread());
                    return id;
                });
            }
        }
    }
}</code></pre>`
    },
    {
      type: 'advance',
      category: 'Data Structure Design',
      question: 'Advance Q2 (2026): Production-Ready LRU Cache Implementation',
      answer: `<p>Doubly LinkedList + HashMap implementation providing strict $O(1)$ operations.</p>
<pre><code class="language-java">import java.util.*;

public class LRUSandbox {
    public static void main(String[] args) {
        LinkedHashMap<Integer, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry<Integer, String> eldest) {
                return size() > 3; // Evict if size exceeds 3
            }
        };
        cache.put(1, "A"); cache.put(2, "B"); cache.put(3, "C");
        cache.get(1); // Access 1 to make it most recently used
        cache.put(4, "D"); // Evicts key 2
        System.out.println("Remaining in LRU cache: " + cache.keySet());
    }
}</code></pre>`
    }
  ]
};

// Write files
const outputs = [
  { file: 'Stringprograms.html', config: stringProgramsConfig },
  { file: 'numberprograms.html', config: numberProgramsConfig },
  { file: 'java8programs.html', config: java8ProgramsConfig },
  { file: 'topicwiseprogram.html', config: topicwiseProgramsConfig },
  { file: 'programmin.html', config: programminHubConfig }
];

outputs.forEach(item => {
  const filePath = path.join(__dirname, '..', item.file);
  const html = createStandardPage(item.config);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Successfully written ' + item.file + ' (Size: ' + fs.statSync(filePath).size + ' bytes)');
});
