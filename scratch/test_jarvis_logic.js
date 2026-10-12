// Mock browser globals for Node test
global.window = {};
global.document = {
  readyState: 'complete',
  getElementById: () => null,
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {}, addEventListener: () => {} }),
  body: { appendChild: () => {} }
};

require('../js/jarvis-ai.js');

console.log('Testing Jarvis search:');
const q1 = global.window.JarvisAI.search('kafka kraft');
console.log('Q1 Kafka match:', q1.length > 0 ? q1[0].title : 'None');

const q2 = global.window.JarvisAI.search('react 19 actions');
console.log('Q2 React match:', q2.length > 0 ? q2[0].title : 'None');

const q3 = global.window.JarvisAI.search('second highest java 8 stream');
console.log('Q3 Java 8 match:', q3.length > 0 ? q3[0].title : 'None');

console.log('\nTesting Jarvis Anomaly Detector:');
const badCode = `
public void test() {
    ThreadLocal<String> tl = new ThreadLocal<>();
    tl.set("leak");
    list.parallelStream().forEach(x -> {
        try { Thread.sleep(100); } catch(Exception e){}
    });
}
`;

const scan = global.window.JarvisAI.scan(badCode);
console.log('Anomaly Score:', scan.score + '/100');
console.log('Detected anomalies:');
scan.detected.forEach(d => console.log(' - [' + d.severity + '] ' + d.title));

const cleanCode = `
public int binarySearch(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == target) return m;
        if (arr[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}
`;
const cleanScan = global.window.JarvisAI.scan(cleanCode);
console.log('\nClean Code Anomaly Score:', cleanScan.score + '/100 (Clean: ' + cleanScan.isClean + ')');
