const fs = require('fs');
const path = require('path');

const mediaPath = 'C:/Users/prashant jha/.gemini/antigravity/brain/59dc1e0d-b201-4c26-a111-58df0d4b8905/.user_uploaded/media_1793606042689_deb40af6.html';
const raw = fs.readFileSync(mediaPath, 'utf8');

const styleEnd = raw.indexOf('</style>');
const bodyAndScript = raw.substring(styleEnd + 8); // after </style>

const responsiveCss = `
:root{--bg:#f5f7fb;--paper:#ffffff;--ink:#17253b;--muted:#64748b;--accent:#2563eb;--accent-light:#eff6ff;--line:#e2e8f0;--card-shadow:0 2px 10px rgba(15,23,42,0.04);--hover-shadow:0 8px 24px rgba(37,99,235,0.09);--header-h:70px}
body.dark{--bg:#0c1424;--paper:#142137;--ink:#ecf2ff;--muted:#9baecb;--accent:#77a9ff;--accent-light:#1e293b;--line:#30425b;--card-shadow:0 2px 10px rgba(0,0,0,0.25);--hover-shadow:0 8px 24px rgba(0,0,0,0.4)}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.65 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;min-height:100vh;overflow-x:hidden;transition:background-color .25s ease,color .25s ease}
header{position:sticky;top:0;z-index:100;background:var(--paper);border-bottom:1px solid var(--line);padding:12px 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;box-shadow:0 2px 12px rgba(15,23,42,0.03);transition:background-color .25s ease,border-color .25s ease}
header>div{min-width:0;flex:0 1 auto}
header strong{font-size:18px;font-weight:700;letter-spacing:-.01em;color:var(--ink);display:inline-block;line-height:1.3}
header small{color:var(--muted);font-size:12.5px;display:inline-block;white-space:nowrap}
input,select,button{font:inherit;border:1px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink);padding:9px 14px;outline:none;transition:all .2s ease}
input[type="search"]{min-width:180px;flex:1 1 260px;max-width:480px;height:42px;font-size:14px}
input[type="search"]::placeholder{color:var(--muted);opacity:.8}
input[type="search"]:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,0.15)}
button{cursor:pointer;user-select:none;font-weight:500;font-size:13.5px;height:42px;display:inline-flex;align-items:center;justify-content:center;padding:0 16px;white-space:nowrap;flex-shrink:0}
button:hover{border-color:var(--accent);color:var(--accent)}
button:active{transform:scale(0.98)}
#theme{background:var(--bg)}
.layout{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:calc(100vh - var(--header-h));max-width:1440px;margin:0 auto}
aside{padding:24px 16px;border-right:1px solid var(--line);background:var(--paper);position:sticky;top:67px;height:calc(100vh - 67px);overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
aside::-webkit-scrollbar{width:5px}
aside::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px}
aside button{display:flex;align-items:center;width:100%;text-align:left;margin:5px 0;border:1px solid transparent;background:transparent;padding:10px 14px;border-radius:10px;color:var(--ink);font-size:14px;font-weight:500;height:auto;white-space:normal;word-break:break-word}
aside button:hover{background:var(--bg);color:var(--accent)}
aside button.active{background:var(--accent);color:#fff;font-weight:600;border-color:var(--accent);box-shadow:0 4px 12px rgba(37,99,235,0.28)}
main{max-width:1050px;width:100%;padding:28px 32px;margin:0 auto;box-sizing:border-box;min-width:0}
.intro{margin-bottom:22px}
.intro h1{margin:0 0 8px;font-size:clamp(22px,3.2vw,30px);line-height:1.25;font-weight:800;letter-spacing:-.02em;color:var(--ink)}
.intro p{color:var(--muted);margin:0;font-size:clamp(13.5px,1.8vw,15px);line-height:1.6}
.stats{color:var(--muted);font-size:13px;font-weight:500;margin:16px 0 20px;padding:8px 14px;background:var(--paper);border:1px solid var(--line);border-radius:10px;display:inline-block;max-width:100%}
.entry{background:var(--paper);border:1px solid var(--line);border-radius:14px;margin:14px 0;overflow:hidden;box-shadow:var(--card-shadow);transition:border-color .2s ease,box-shadow .2s ease}
.entry:hover{border-color:var(--accent);box-shadow:var(--hover-shadow)}
.entry summary{cursor:pointer;padding:16px 20px;list-style:none;display:flex;gap:14px;justify-content:space-between;align-items:flex-start;user-select:none;transition:background .15s ease}
.entry summary:hover{background:var(--bg)}
.entry summary::-webkit-details-marker{display:none}
.entry summary b{font-size:clamp(15px,2vw,17px);line-height:1.35;color:var(--ink);word-break:break-word;font-weight:700}
.entry summary span{font-size:11.5px;color:var(--muted);white-space:nowrap;flex-shrink:0;padding:3px 8px;background:var(--bg);border:1px solid var(--line);border-radius:6px;margin-top:2px}
.content{border-top:1px solid var(--line);padding:22px;background:var(--paper);overflow-x:auto}
.content p{margin:0 0 14px;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;font-size:14.5px;line-height:1.7}
.content p:last-child{margin-bottom:0}
.content img{display:block;max-width:100%;height:auto;border-radius:10px;border:1px solid var(--line);margin:0 auto;box-shadow:0 4px 16px rgba(0,0,0,0.06)}
.pill{display:inline-flex;align-items:center;font-size:11px;font-weight:600;border:1px solid var(--line);border-radius:20px;padding:2px 9px;margin-bottom:8px;color:var(--muted);background:var(--bg);letter-spacing:.02em;text-transform:uppercase}
.highlight{background:#fef08a;color:#17253b;padding:1px 3px;border-radius:3px}
body.dark .highlight{background:#ca8a04;color:#fff}
.empty{padding:60px 20px;text-align:center;color:var(--muted);font-size:15px;background:var(--paper);border:1px dashed var(--line);border-radius:14px;margin:20px 0}
@media(max-width:900px){.layout{grid-template-columns:220px minmax(0,1fr)}main{padding:22px 20px}}
@media(max-width:768px){
header{padding:12px 16px;gap:10px}
header>div{flex:1 1 auto}
header strong{font-size:17px}
header small{font-size:11.5px}
input[type="search"]{order:3;width:100%;min-width:100%;max-width:100%;height:40px;font-size:14px;margin-top:4px}
button{height:38px;padding:0 12px;font-size:12.5px}
.layout{display:block}
aside{position:sticky;top:0;z-index:90;height:auto;display:flex;overflow-x:auto;overflow-y:hidden;gap:8px;border-right:0;border-bottom:1px solid var(--line);padding:10px 14px;background:var(--paper);-webkit-overflow-scrolling:touch;scrollbar-width:none}
aside::-webkit-scrollbar{display:none}
aside button{white-space:nowrap;width:auto;flex-shrink:0;padding:7px 16px;border-radius:999px;font-size:13px;margin:0;border:1px solid var(--line);background:var(--bg)}
aside button.active{background:var(--accent);color:#fff;border-color:var(--accent)}
main{padding:18px 14px}
.intro{margin-bottom:16px}
.entry summary{padding:14px 16px;gap:10px}
.content{padding:16px}
}
@media(max-width:480px){
header{padding:10px 12px;gap:8px}
header strong{font-size:16px}
header small{white-space:normal;display:block;line-height:1.3}
button{padding:0 10px;font-size:12px;height:36px}
main{padding:14px 10px}
.entry{border-radius:12px;margin:10px 0}
.entry summary{padding:12px 12px}
.content{padding:12px}
.content p{font-size:14px;line-height:1.65}
.stats{font-size:12px;padding:6px 10px;margin:12px 0 14px}
}
@media print{
header,aside,.stats{display:none!important}
.layout{display:block}
main{max-width:none;padding:0}
.entry{break-inside:avoid;box-shadow:none;border-color:#ccc}
details .content{display:block!important}
body{background:#fff!important;color:#000!important}
}
`;

const newPageHtml = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Interview Notes | Java, DevOps & AI</title><style>' + responsiveCss.trim() + '</style>' + bodyAndScript;

fs.writeFileSync('personal-notes.html', newPageHtml, 'utf8');
console.log('Successfully generated personal-notes.html, size:', fs.statSync('personal-notes.html').size);

