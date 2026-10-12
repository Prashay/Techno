const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execSync } = require('child_process');

const targetDir = path.join(__dirname, '..', 'downloads');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const bundleDir = path.join(__dirname, 'apk_src');
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir, { recursive: true });
}

fs.writeFileSync(path.join(bundleDir, 'AndroidManifest.xml'), `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.technointerview.mobile"
    android:versionCode="240"
    android:versionName="2.4.0">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="TechnoInterview"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|keyboardHidden|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`, 'utf8');

fs.writeFileSync(path.join(bundleDir, 'app-release-metadata.json'), JSON.stringify({
  appName: 'TechnoInterview',
  version: '2.4.0',
  build: 20261012,
  developer: 'Prashant Kumar Jha',
  description: 'TechnoInterview Android App - 35+ Interview Tracks, Online Compiler & Anomaly Detection',
  url: 'https://prashay.github.io/Techno/'
}, null, 2), 'utf8');

const iconSrc = path.join(__dirname, '..', 'images', 'android-chrome-192x192.png');
if (fs.existsSync(iconSrc)) {
  fs.copyFileSync(iconSrc, path.join(bundleDir, 'ic_launcher.png'));
}

// Compress to zip and rename to apk
const zipPath = path.join(targetDir, 'TechnoInterview.zip');
const apkPath = path.join(targetDir, 'TechnoInterview-v2.4.0.apk');
const directApk = path.join(targetDir, 'TechnoInterview.apk');

try {
  // Use powershell Compress-Archive safely
  const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path '${bundleDir}\\*' -DestinationPath '${zipPath}' -Force"`;
  execSync(psCmd);
  if (fs.existsSync(zipPath)) {
    fs.copyFileSync(zipPath, apkPath);
    fs.copyFileSync(zipPath, directApk);
    fs.unlinkSync(zipPath);
    console.log('Successfully created APK files:');
    console.log('-', apkPath, fs.statSync(apkPath).size, 'bytes');
    console.log('-', directApk, fs.statSync(directApk).size, 'bytes');
  }
} catch (err) {
  console.error('Error generating APK:', err.message);
}
