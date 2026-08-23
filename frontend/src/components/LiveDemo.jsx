// Requires: python main.py running at http://localhost:8000
import { useState, useRef, useEffect } from "react";

// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLE_PDFS = [
  { id:"fin",  name:"Q3_Financials.pdf",
    keywords:["revenue","profit","ebitda","quarterly","forecast","audit","balance","equity"],
    content:`Q3 Financial Report\n\nRevenue 4.2M\nEBITDA margin 18.3\nNet profit 760K\nForecast revised upward for Q4\nAudit notes No material findings\nBalance sheet remains stable\nEquity position unchanged\n` },
  { id:"enc",  name:"Encryption_RFC.pdf",
    keywords:["encryption","cipher","block","keygen","nonce","padding","ivector","derivation"],
    content:`Encryption RFC Draft\n\nCipher AES-256 in CBC mode\nKey derivation PBKDF2 with HMAC-SHA1\nNonce generation CSPRNG 128-bit\nPadding scheme PKCS7\nIV randomly generated per session\nBlock size 128 bits\nKey size 256 bits\n` },
  { id:"med",  name:"Medical_Records.pdf",
    keywords:["patient","diagnosis","medication","dosage","glucose","pressure","allergy","treatment"],
    content:`Medical Record\n\nPatient ID 00482-B\nDiagnosis Type 2 Diabetes\nMedication Metformin 500mg\nDosage twice daily with meals\nBlood glucose 126 mg per dL\nBlood pressure 128 over 82 mmHg\nAllergy Penicillin rash\nTreatment dietary adjustment\n` },
  { id:"proj", name:"Project_Phoenix.pdf",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risks"],
    content:`Project Phoenix Sprint 4\n\nMilestone M4 Integration complete\nSprint velocity 34 points\nBacklog 14 open 3 blocked\nStakeholder sign-off pending\nDeliverable on track\nRoadmap Phase 2 start Week 14\nBudget utilisation 67 percent\nRisks third-party API delay medium\n` },
  { id:"res",  name:"Research_Paper.pdf",
    keywords:["abstract","hypothesis","methodology","results","analysis","citation","dataset","experiment"],
    content:`Research Paper\n\nAbstract novel methodology for dataset analysis\nHypothesis confirmed at p less than 0.05\nMethodology stratified sampling\nResults variance within acceptable bounds\nAnalysis outliers removed IQR filtering\nCitation count 42\nDataset partitioned into stratified samples\nExperiment peer review accepted minor revisions\n` },
  { id:"comb", name:"combined.pdf",
    keywords:["q3","financial","report","revenue","ebitda","margin","net","profit","forecast","revised","upward","for","q4","audit","notes","no","material","findings","balance","sheet","remains","stable","equity","position","unchanged","encryption","rfc","draft","cipher","aes","cbc","mode","key","derivation","pbkdf2","with","hmac","sha1","nonce","generation","csprng","padding","scheme","pkcs7","iv","randomly","generated","per","session","block","size","bits","medical","record","patient","id","diagnosis","type","diabetes","medication","metformin","dosage","twice","daily","meals","blood","glucose","pressure","allergy","penicillin","rash","treatment","dietary","adjustment","project","phoenix","sprint","milestone","m4","integration","complete","velocity","points","backlog","open","blocked","stakeholder","sign","off","pending","deliverable","on","track","roadmap","phase","start","week","budget","utilisation","percent","risks","third","party","api","delay","medium","research","paper","abstract","novel","methodology","dataset","analysis","hypothesis","confirmed","at","less","than","stratified","sampling","results","variance","within","acceptable","bounds","outliers","removed","iqr","filtering","citation","count","partitioned","into","samples","experiment","peer","review","accepted","minor","revisions"],
    content:`Combined Document\n\nQ3 Financial Report\nRevenue 4.2M\nEBITDA margin 18.3\nNet profit 760K\nForecast revised upward for Q4\nAudit notes No material findings\nBalance sheet remains stable\nEquity position unchanged\n\nEncryption RFC Draft\nCipher AES-256 in CBC mode\nKey derivation PBKDF2 with HMAC-SHA1\nNonce generation CSPRNG 128-bit\nPadding scheme PKCS7\nIV randomly generated per session\nBlock size 128 bits\nKey size 256 bits\n\nMedical Record\nPatient ID 00482-B\nDiagnosis Type 2 Diabetes\nMedication Metformin 500mg\nDosage twice daily with meals\nBlood glucose 126 mg per dL\nBlood pressure 128 over 82 mmHg\nAllergy Penicillin rash\nTreatment dietary adjustment\n\nProject Phoenix Sprint 4\nMilestone M4 Integration complete\nSprint velocity 34 points\nBacklog 14 open 3 blocked\nStakeholder sign-off pending\nDeliverable on track\nRoadmap Phase 2 start Week 14\nBudget utilisation 67 percent\nRisks third-party API delay medium\n\nResearch Paper\nAbstract novel methodology for dataset analysis\nHypothesis confirmed at p less than 0.05\nMethodology stratified sampling\nResults variance within acceptable bounds\nAnalysis outliers removed IQR filtering\nCitation count 42\nDataset partitioned into stratified samples\nExperiment peer review accepted minor revisions\n` },
];

const SAMPLE_CSVS = [
  { id:"emp", name:"employees.csv",
    content:`employee id,name,department,role,location
1,Alice Johnson,engineering,senior engineer,remote
2,Bob Smith,engineering,senior engineer,remote
3,Carol White,engineering,junior engineer,san francisco
4,David Brown,engineering,junior engineer,new york
5,Eve Davis,engineering,tech lead,remote
6,Frank Wilson,engineering,tech lead,austin
7,Grace Lee,engineering,backend developer,remote
8,Henry Clark,engineering,backend developer,chicago
9,Iris Moore,engineering,frontend developer,san francisco
10,Jack Turner,engineering,frontend developer,remote
11,Alice Johnson,marketing,campaign manager,new york
12,Bob Smith,marketing,campaign manager,chicago
13,Carol White,marketing,content strategist,remote
14,David Brown,marketing,brand manager,new york
15,Eve Davis,marketing,growth hacker,chicago
16,Frank Wilson,sales,account executive,chicago
17,Grace Lee,sales,account executive,new york
18,Henry Clark,sales,regional manager,new york
19,Iris Moore,sales,sales analyst,remote
20,Jack Turner,sales,enterprise account manager,chicago
21,Alice Johnson,hr,recruiter,new york
22,Bob Smith,hr,hr business partner,austin
23,Carol White,hr,recruiter,remote
24,David Brown,finance,financial analyst,austin
25,Eve Davis,finance,financial controller,new york
26,Frank Wilson,engineering,devops engineer,remote
27,Grace Lee,engineering,ml engineer,remote
28,Henry Clark,engineering,security engineer,chicago
29,Iris Moore,engineering,senior engineer,chicago
30,Jack Turner,engineering,junior engineer,remote` },
  { id:"emp2", name:"employee2.csv",
    content:`employee id,name,father name,mother name,blood group,address
1,Alice Johnson,John Johnson,Mary Johnson,A+,12 Elm Street New York
2,Bob Smith,James Smith,Patricia Smith,O+,45 Oak Avenue Boston
3,Carol White,Charles White,Linda White,B-,8 Pine Road San Francisco
4,David Brown,Richard Brown,Barbara Brown,AB+,99 Maple Lane Chicago
5,Eve Davis,Joseph Davis,Susan Davis,O-,23 Cedar Blvd Austin
6,Frank Wilson,Thomas Wilson,Margaret Wilson,A-,7 Birch Court Seattle
7,Grace Lee,Daniel Lee,Helen Lee,B+,34 Walnut Street Los Angeles
8,Henry Clark,Steven Clark,Dorothy Clark,AB+,56 Spruce Ave Denver
9,Iris Moore,Kevin Moore,Nancy Moore,O+,18 Ash Street Miami
10,Jack Turner,Brian Turner,Sandra Turner,A+,2 Willow Way Houston
11,Alice Johnson,Robert Johnson,Patricia Johnson,B-,88 Oak Street Chicago
12,Bob Smith,William Smith,Elizabeth Smith,A+,33 Pine Ave Seattle
13,Carol White,George White,Jennifer White,O+,14 Maple Rd Austin
14,David Brown,Christopher Brown,Jessica Brown,O-,61 Cedar Court Denver
15,Eve Davis,Michael Davis,Karen Davis,AB-,77 Elm Blvd New York
16,Frank Wilson,Mark Wilson,Betty Wilson,AB+,43 Spruce Street Boston
17,Grace Lee,Andrew Lee,Lisa Lee,A-,5 Birch Lane San Francisco
18,Henry Clark,Donald Clark,Helen Clark,O+,17 Willow Way Chicago
19,Iris Moore,Anthony Moore,Sarah Moore,B+,29 Walnut Drive Miami
20,Jack Turner,Paul Turner,Donna Turner,A+,92 Ash Avenue Houston
21,Alice Johnson,Gregory Johnson,Carol Johnson,O+,3 Spruce Blvd Atlanta
22,Bob Smith,Edward Smith,Ruth Smith,B-,55 Cedar Lane Portland
23,Carol White,Raymond White,Sharon White,AB+,21 Elm Ave Phoenix
24,David Brown,Lawrence Brown,Diane Brown,A+,68 Oak Street Dallas
25,Eve Davis,Scott Davis,Judith Davis,O+,14 Pine Court Nashville
26,Frank Wilson,Harold Wilson,Virginia Wilson,B+,37 Maple Way Denver
27,Grace Lee,Wayne Lee,Ann Lee,A-,9 Birch Street Minneapolis
28,Henry Clark,Arthur Clark,Carolyn Clark,AB-,48 Walnut Blvd Portland
29,Iris Moore,Eugene Moore,Janet Moore,O-,72 Spruce Road Seattle
30,Jack Turner,Carl Turner,Mildred Turner,B+,6 Cedar Ave Kansas City` },
  { id:"prod", name:"products.csv",
    content:`name,category,price_range,stock_status\nLaptop Pro,electronics,high,in stock\nWireless Mouse,electronics,low,in stock\nStanding Desk,furniture,high,out of stock\nOffice Chair,furniture,medium,in stock\nUSB Hub,electronics,low,in stock\nMonitor 27in,electronics,medium,in stock` },
  { id:"orders", name:"orders.csv",
    content:`customer,product,status,region\nAlice Johnson,Laptop Pro,completed,west\nBob Smith,Office Chair,pending,east\nCarol White,USB Hub,completed,west\nDavid Brown,Monitor 27in,processing,midwest\nEve Davis,Wireless Mouse,completed,west\nFrank Wilson,Standing Desk,pending,east` },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function sha256ish(str) {
  let h1=0xdeadbeef,h2=0x41c6ce57;
  for(let i=0;i<str.length;i++){const c=str.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677);}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return((4294967296*(2097151&h2)+h1)>>>0).toString(16).padStart(16,"0").toUpperCase();
}
function gibberish(seed,len=80){let s=seed;const c="ABCDEFabcdef0123456789";let o="";for(let i=0;i<len;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;o+=c[s%c.length];if(i%8===7)o+=" ";}return o;}

function openDocInNewWindow(name, content, docObj) {
  const win = window.open("", "_blank");
  if (!win) return;

  const rawFile = docObj?.rawFile || (content instanceof Blob ? content : null);
  const isPdf = name.toLowerCase().endsWith(".pdf") || (rawFile && rawFile.type === "application/pdf");

  if (isPdf && rawFile) {
    const pdfUrl = URL.createObjectURL(rawFile);
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Document Viewer - ${name}</title>
          <style>
            html, body { background: #0a0a0a; color: #e5e5e5; font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif; margin: 0; padding: 0; height: 100vh; overflow: hidden; display: flex; flex-direction: column; }
            .header { background: #111; border-bottom: 1px solid #222; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; height: 54px; box-sizing: border-box; }
            h1 { font-size: 16px; color: #ffd208; margin: 0; font-family: 'Space Mono', monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .badge { background: rgba(255, 210, 8, 0.1); border: 1px solid rgba(255, 210, 8, 0.3); color: #ffd208; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-family: monospace; }
            .pdf-frame { flex: 1; width: 100%; height: calc(100vh - 54px); border: none; background: #1e1e1e; }
          </style>
        </head>
        <body>
          <div class="header">
            <div style="display: flex; align-items: center; gap: 16px;">
              <button onclick="window.close()" style="background: #ffd208; border: none; color: #0a0a0a; font-weight: 700; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-family: sans-serif; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 0 15px rgba(255, 210, 8, 0.3);">
                ← Back to Site
              </button>
              <h1>📄 ${name}</h1>
            </div>
            <span class="badge">SSE Encrypted PDF Document</span>
          </div>
          <iframe class="pdf-frame" src="${pdfUrl}#toolbar=1" type="application/pdf"></iframe>
        </body>
      </html>
    `);
    win.document.close();
    return;
  }

  // Text document view fallback
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Document Viewer - ${name}</title>
        <style>
          body { background: #0a0a0a; color: #e5e5e5; font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif; padding: 40px; margin: 0; }
          .header { border-bottom: 1px solid #222; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          h1 { font-size: 22px; color: #ffd208; margin: 0; font-family: 'Space Mono', monospace; }
          .badge { background: rgba(255, 210, 8, 0.1); border: 1px solid rgba(255, 210, 8, 0.3); color: #ffd208; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-family: monospace; }
          pre { background: #111111; padding: 24px; border-radius: 8px; border: 1px solid #222; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #d4d4d4; font-family: 'Space Mono', monospace; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; gap: 16px;">
            <button onclick="window.close()" style="background: #ffd208; border: none; color: #0a0a0a; font-weight: 700; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-family: sans-serif; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 0 15px rgba(255, 210, 8, 0.3); transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
              ← Back to Site
            </button>
            <h1>📄 ${name}</h1>
          </div>
          <span class="badge">SSE Encrypted Document Source</span>
        </div>
        <pre id="doc-content">${(content || 'Reading document content...').replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
      </body>
    </html>
  `);
  win.document.close();

  if (rawFile && !content && !isPdf) {
    const reader = new FileReader();
    reader.onload = e => {
      const el = win.document.getElementById("doc-content");
      if (el) el.textContent = e.target.result;
    };
    reader.readAsText(rawFile);
  }
}

function openCSVInNewWindow(name, headers, rows) {
  const win = window.open("", "_blank");
  if (!win) return;
  const headerHtml = (headers || []).map(h => `<th>${h}</th>`).join("");
  const rowsHtml = (rows || []).map(r => `<tr>${r.map(cell => `<td>${cell}</td>`).join("")}</tr>`).join("");
  win.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Table Viewer - ${name}</title>
        <style>
          body { background: #0a0a0a; color: #e5e5e5; font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif; padding: 32px; margin: 0; }
          .header { border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          h1 { font-size: 22px; color: #4ade80; margin: 0; font-family: 'Space Mono', monospace; }
          .meta { font-size: 12px; color: #888; font-family: monospace; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-family: 'Space Mono', monospace; font-size: 13px; }
          th { background: #161616; color: #ffd208; text-align: left; padding: 12px; border: 1px solid #262626; font-weight: 600; }
          td { padding: 10px 12px; border: 1px solid #222; color: #ccc; }
          tr:nth-child(even) { background: #0d0d0d; }
        </style>
      </head>
      <body>
        <div class="header">
          <div style="display: flex; align-items: center; gap: 16px;">
            <button onclick="window.close()" style="background: #ffd208; border: none; color: #0a0a0a; font-weight: 700; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-family: sans-serif; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 0 15px rgba(255, 210, 8, 0.3); transition: transform 0.15s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
              ← Back to Site
            </button>
            <div>
              <h1>📊 ${name}</h1>
              <div class="meta">${(rows || []).length} rows | ${(headers || []).length} columns</div>
            </div>
          </div>
          <span style="background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.3); color: #4ade80; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-family: monospace;">RDBMS Encrypted Table</span>
        </div>
        <table>
          <thead><tr>${headerHtml}</tr></thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body>
    </html>
  `);
  win.document.close();
}

const STOP_WORDS = new Set(["the","and","for","that","this","with","from","are","was","were","have","has","been","will","not","but","they","their","what","when","which","you","your","can","its","our","all","any","also","more","than","such","each","into"]);

// Filter backend's full token list down to meaningful display keywords
function filterDisplayKeywords(tokens) {
  return (tokens || [])
    .filter(w => w.length > 4 && !STOP_WORDS.has(w) && !/^\d+$/.test(w) && /^[a-z]/.test(w))
    .slice(0, 10);
}

// Fallback for offline mode (TXT files only)
function extractKeywordsFromText(text, name) {
  const words = text.toLowerCase().replace(/[^a-z\s]/g," ").split(/\s+/);
  const freq = {};
  words.forEach(w => { if(w.length>4&&!STOP_WORDS.has(w)) freq[w]=(freq[w]||0)+1; });
  const fromName = name.replace(/\.[^.]+$/,"").split(/[_\-\s]+/).filter(w=>w.length>4).map(w=>w.toLowerCase());
  return [...new Set([...fromName,...Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(e=>e[0])])].slice(0,8);
}

function parseCSV(text){
  const lines=text.replace(/\r\n/g,"\n").replace(/\r/g,"\n").trim().split("\n");
  if(!lines.length)return{headers:[],rows:[]};
  function pl(line){const f=[];let cur="",inQ=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(inQ&&line[i+1]==='"'){cur+='"';i++;}else inQ=!inQ;}else if(ch===','&&!inQ){f.push(cur.trim());cur="";}else cur+=ch;}f.push(cur.trim());return f;}
  return{headers:pl(lines[0]),rows:lines.slice(1).filter(l=>l.trim()).map(pl)};
}
function triggerDownload(filename, content, mime="text/plain"){
  // Check if it's already a File/Blob, otherwise wrap it in one
  const b = content instanceof Blob ? content : new Blob([content], {type: mime});
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(u);
}
function rowsToCSV(headers,rows){
  const esc=v=>(String(v).includes(",")||String(v).includes('"'))?`"${String(v).replace(/"/g,'""')}"`:String(v);
  return[headers.join(","),...rows.map(r=>r.map(esc).join(","))].join("\n");
}

// ── Backend API ────────────────────────────────────────────────────────────────
// main.py endpoints used:
//   GET  /stats
//   POST /upload        multipart "files"  → {status, processed:[{filename,keywords}], setup, setup_error}
//   GET  /search?q=word                    → {found, word, word_id, docs:[{doc_id,doc_name}], time_taken}
//   POST /conjunctive-search {word_ids,words} → {command, exit_code, output, word_ids, words, time_taken}
//   GET  /download/word_to_id.csv          → CSV of word → hex_id
//
// The binary's stdout (in "output" field) looks like:
//   Searching for  00000001 00000002
//   N IDs TSet: 1
//   Nmatch: 0
//   Search time = 76370 micro-seconds

// Each search type's backend is its own standalone repo/process, so each
// gets its own port. single/and/rdbms all still run on :8000 exactly as
// before - only "or" (disjunction, odxt-cli) is new. Adjust ports here if
// your actual deployment differs; nothing else in the file needs to change.
const BACKEND_PORTS = { single: 8000, and: 8000, rdbms: 8000, or: 8001 };
// single/and/rdbms all resolve to the same physical backend today, so they
// share one status/index cache under this key; "or" gets its own.
const BACKEND_KEY_FOR_QTYPE = { single: "primary", and: "primary", rdbms: "primary", or: "or" };

const getBackendUrl = (port, envVar) => {
  if (import.meta.env && import.meta.env[envVar]) {
    let url = String(import.meta.env[envVar]).trim().replace(/\/+$/, "");
    if (typeof window !== "undefined" && window.location.protocol === "https:" && url.startsWith("http:")) {
      url = url.replace(/^http:/, "https:");
    }
    return url;
  }
  const hostname = typeof window !== "undefined" ? window.location.hostname : "localhost";
  const protocol = typeof window !== "undefined" ? window.location.protocol : "http:";
  // Handle remote proxies/Codespaces (e.g., ports 3000/8000 mapped to subdomains)
  if (hostname.includes("-3000.")) {
    return `${protocol}//${hostname.replace("-3000.", `-${port}.`)}`;
  }
  if (hostname.includes("3000-")) {
    return `${protocol}//${hostname.replace("3000-", `${port}-`)}`;
  }
  return `http://${hostname}:${port}`;
};

// key -> backend base URL, e.g. {primary: "http://host:8000", or: "http://host:8001"}
const BACKENDS = { 
  primary: getBackendUrl(BACKEND_PORTS.single, "VITE_AND_BACKEND_URL"), 
  or:      getBackendUrl(BACKEND_PORTS.or, "VITE_OR_BACKEND_URL") 
};

async function checkBackend(backendUrl) {
  try {
    const r = await fetch(`${backendUrl}/stats`, {signal: AbortSignal.timeout(2000)});
    return r.ok;
  } catch { return false; }
}

// Download word_to_id.csv from backend and parse into a {word: hexId} map.
// Caching this client-side means SSE searches can resolve word_ids locally
// without revealing plaintext keywords to the server during search time.
async function fetchWordToId(backendUrl) {
  try {
    const res = await fetch(`${backendUrl}/download/word_to_id.csv`);
    if (!res.ok) return {};
    const text = await res.text();
    const map = {};
    text.split("\n").slice(1).forEach(line => {
      const comma = line.indexOf(",");
      if (comma < 0) return;
      const word = line.slice(0, comma).trim();
      const id   = line.slice(comma + 1).trim();
      if (word && id) map[word] = id;
    });
    return map;
  } catch { return {}; }
}

// Upload a single file to backend. fileOrContent can be a File object (binary
// preserved, PyPDF2 extracts text server-side) or a string (for sample PDFs).
async function uploadOneFile(backendUrl, name, fileOrContent) {
  const fd = new FormData();
  if (fileOrContent instanceof File) {
    fd.append("files", fileOrContent, name);
  } else {
    // text string (sample PDFs) - backend falls back to text decode if PyPDF2 fails
    fd.append("files", new Blob([fileOrContent], {type:"text/plain"}), name);
  }
  const res = await fetch(`${backendUrl}/upload`, {method:"POST", body:fd});
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `upload failed: ${res.status}`);
  }
  return res.json();
}

// Fan a single file out to every backend in parallel, since each backend is
// an independent process with its own index - a doc uploaded while on the
// "and" tab still needs to reach the "or" backend so switching tabs later
// doesn't require re-uploading everything.
async function uploadToAllBackends(name, fileOrContent) {
  const entries = Object.entries(BACKENDS);
  const settled = await Promise.allSettled(
    entries.map(([, url]) => uploadOneFile(url, name, fileOrContent))
  );
  const byKey = {};
  entries.forEach(([key], i) => {
    const r = settled[i];
    byKey[key] = r.status === "fulfilled" ? {ok:true, data:r.value} : {ok:false, error:r.reason?.message||String(r.reason)};
  });
  return byKey;
}

// SSE search:
// 1. Resolve word_ids from the LOCAL wordToId cache (no keyword sent to server)
// 2. Call /conjunctive-search with those IDs to run ntru-oqxt-search binary
// 3. Parse binary stdout for real timing
// 4. Compute matched doc names from JS index (client-side knowledge, for display)
async function sseSearch(backendUrl, qtype, terms, wordToId, indexedKws) {
  const resolved = terms.map(t => ({
    word:   t.toLowerCase().trim(),
    wordId: wordToId[t.toLowerCase().trim()] || null,
  }));
  const found    = resolved.filter(r => r.wordId);
  const notFound = resolved.filter(r => !r.wordId).map(r => r.word);

  if (!found.length) {
    return {ok:true, wordIds:[], words:[], matchedDocNames:[], timingUs:null,
            timeTakenMs:null, nmatch:0, ntset:0, output:"terms not in indexed vocabulary", notFound};
  }

  const wordIds = found.map(r => r.wordId);
  const words   = found.map(r => r.word);

  // Client-side preview of the expected result set (client knows this in
  // plaintext): intersection for and/single, union for or.
  const lists = words.map(w => indexedKws[w] || []);
  const matchedDocNames = !lists.length ? []
    : qtype === "or" ? [...new Set(lists.flat())]
    : lists.reduce((a,b) => a.filter(d => b.includes(d)));

  const conjRes = await fetch(`${backendUrl}/conjunctive-search`, {
    method:  "POST",
    headers: {"Content-Type":"application/json"},
    body:    JSON.stringify({word_ids: wordIds, words}),
  });

  if (!conjRes.ok) {
    const err = await conjRes.json().catch(() => ({}));
    throw new Error(err.detail || `conjunctive-search failed: ${conjRes.status}`);
  }

  const conjData = await conjRes.json();
  if (!conjData || typeof conjData !== "object") {
    throw new Error("Unexpected response from conjunctive-search");
  }

  const output      = conjData.output || "";
  const timeMatch   = output.match(/Search time = (\d+) micro-seconds/);
  const nmatchMatch = output.match(/Nmatch: (\d+)/);
  const ntsetMatch  = output.match(/N IDs TSet: (\d+)/);

  return {
    ok: true,
    wordIds,
    words,
    notFound,
    matchedDocNames,
    timingUs:    timeMatch   ? parseInt(timeMatch[1])   : null,
    timeTakenMs: conjData.time_taken ?? null,
    nmatch:      nmatchMatch ? parseInt(nmatchMatch[1]) : null,
    ntset:       ntsetMatch  ? parseInt(ntsetMatch[1])  : null,
    output,
  };
}

// Regular JS search (plaintext, instant, no backend call needed)
function regularSearch(qtype, terms, indexedKws) {
  const t0 = performance.now();
  let docs = [];
  if (qtype === "single") {
    docs = indexedKws[terms[0].toLowerCase()] || [];
  } else if (qtype === "or") {
    const lists = terms.map(t => indexedKws[t.toLowerCase()] || []);
    docs = [...new Set(lists.flat())];
  } else {
    const lists = terms.map(t => indexedKws[t.toLowerCase()] || []);
    docs = lists.length ? lists.reduce((a,b) => a.filter(d => b.includes(d))) : [];
  }
  return {docs, ms: performance.now() - t0};
}

// ── Inverted index port for RDBMS tab ─────────────────────────────────────────
// Direct JS port of inverted_index.py: TCVMap, TRMap, build_and_persist,
// conjunctive_search_python. Input is [{name,headers,rows}] from CSV files.
function normalise(v){if(v===null||v===undefined)return"__null__";return String(v).trim().toLowerCase();}
class TCVMap{constructor(){this._t=new Map();this._f=new Map();this._c=1;}
  getOrCreate(tbl,col,val){const k=`${tbl}\0${col}\0${val}`;if(!this._t.has(k)){const id=(this._c++).toString(16).padStart(8,"0");this._t.set(k,id);this._f.set(id,{tbl,col,val});}return this._t.get(k);}
  lookup(tbl,col,val){return this._t.get(`${tbl}\0${col}\0${val}`);}
  label(id){const e=this._f.get(id);return e?`(${e.tbl},${e.col},'${e.val}')`:id;}}
class TRMap{constructor(){this._t=new Map();this._f=new Map();this._c=1;}
  // rowData stores the full row array so we can access employee_id for cross-table joins
  getOrCreate(tbl,ri,rowData){const k=`${tbl}\0${ri}`;if(!this._t.has(k)){const id=(this._c++).toString(16).padStart(8,"0");this._t.set(k,id);this._f.set(id,{tbl,ri,rowData:rowData||[]});}return this._t.get(k);}
  resolve(id){return this._f.get(id)||null;}}
function buildIndex(tables){
  const tcv=new TCVMap(),tr=new TRMap(),idx=new Map();
  for(const{name,headers,rows}of tables)for(let ri=0;ri<rows.length;ri++){
    const trid=tr.getOrCreate(name,ri,rows[ri]);
    for(let ci=0;ci<headers.length;ci++){const val=normalise(rows[ri][ci]);const tcvId=tcv.getOrCreate(name,headers[ci],val);if(!idx.has(tcvId))idx.set(tcvId,new Set());idx.get(tcvId).add(trid);}
  }
  return{tcv,tr,idx};
}

// Resolve a set of TR IDs to full row objects
function resolveTrIds(trIdSet,tr){return [...trIdSet].map(id=>{const r=tr.resolve(id);return r?{trid:id,...r}:null;}).filter(Boolean);}

// Cross-table conjunctive search using employee_id as the primary key.
// Groups filters by table, finds candidate rows per table, then joins on the
// primary key (first column named "employee id" / "employee_id" / "id").
function rdbmsConjSearch(tcvIds,idx,tr,tableData,activeFilters){
  if(!tcvIds.length)return{hits:[],missing:[]};
  const missing=tcvIds.filter(id=>!idx.has(id));
  if(missing.length)return{hits:[],missing};

  // Detect whether this is a cross-table query
  const tables=[...new Set((activeFilters||[]).map(f=>f.table).filter(Boolean))];
  const isCrossTable=tables.length>1;

  if(!isCrossTable){
    // Same-table: plain TR-ID intersection
    let result=new Set(idx.get(tcvIds[0]));
    for(let i=1;i<tcvIds.length;i++){
      const next=idx.get(tcvIds[i]);
      for(const id of [...result])if(!next.has(id))result.delete(id);
    }
    return{hits:resolveTrIds(result,tr),missing:[]};
  }

  // Cross-table: for each table, intersect only the filters that belong to it,
  // then join across tables on employee_id (primary key = first column).
  // Build map: tableName -> Set of matching TR IDs
  const perTableHits={};
  for(const tbl of tables){
    const tblFilters=(activeFilters||[]).filter(f=>f.table===tbl);
    const tblTcvIds=tblFilters.map(f=>idx.has(tcvIds[(activeFilters||[]).indexOf(f)])?tcvIds[(activeFilters||[]).indexOf(f)]:null).filter(Boolean);
    if(!tblTcvIds.length){perTableHits[tbl]=new Set();continue;}
    let s=new Set(idx.get(tblTcvIds[0]));
    for(let i=1;i<tblTcvIds.length;i++){const nx=idx.get(tblTcvIds[i]);for(const id of [...s])if(!nx.has(id))s.delete(id);}
    perTableHits[tbl]=s;
  }

  // Extract primary-key values (employee id) from each table's matching rows
  function getPkVal(trid,tbl){
    const resolved=tr.resolve(trid);
    if(!resolved)return null;
    const td=tableData?.[tbl];
    if(!td)return null;
    // Primary key column: first column whose name contains "employee id" / "employee_id" / "id"
    const pkCol=td.headers.findIndex(h=>/(employee.?id|^id$)/i.test(h));
    if(pkCol<0)return null;
    return normalise(resolved.rowData[pkCol]);
  }

  // Find the common primary-key values across all tables
  const pkSets=tables.map(tbl=>new Set([...perTableHits[tbl]].map(id=>getPkVal(id,tbl)).filter(Boolean)));
  let commonPks=pkSets[0];
  for(let i=1;i<pkSets.length;i++)commonPks=new Set([...commonPks].filter(pk=>pkSets[i].has(pk)));

  if(!commonPks.size)return{hits:[],missing:[]};

  // Collect all matching rows from ALL tables whose employee_id is in the common set
  const hits=[];
  for(const tbl of tables){
    for(const trid of perTableHits[tbl]){
      const pk=getPkVal(trid,tbl);
      if(pk&&commonPks.has(pk)){
        const r=tr.resolve(trid);
        if(r)hits.push({trid,...r});
      }
    }
  }
  return{hits,missing:[]};
}

// ── Explanations ───────────────────────────────────────────────────────────────
const EXP = {
  "regular-single": "Looks up every document tagged with this keyword in a plain plaintext index. No encryption. Timing is real JS set lookup time.",
  "regular-and":    "Intersects posting lists for each keyword. Only documents present in every list are returned. Timing is real JS intersection time.",
  "regular-or":     "Unions posting lists for each keyword. Any document present in at least one list is returned. Timing is real JS union time.",
  "regular-rdbms-and": "Conjunctive (AND) query over relational CSV tables in plaintext. Matches rows satisfying all filter conditions.",
  "regular-rdbms-or":  "Disjunctive (OR) query over relational CSV tables in plaintext. Matches rows satisfying any filter condition.",
  "sse-single":     "TSet_GetTag derives the encrypted tag. TSet_Retrieve walks the encrypted posting chain. NWords=0, so no XToken or bloom filter check runs. This is the NWords=0 branch in EDB_Search. Word IDs are resolved from a local cache so the server never sees plaintext keywords. Timing is from ntru-oqxt-search stdout.",
  "sse-and":        "First keyword is the s-term, matching how main() passes query_str. TSet_Retrieve runs on the s-term first. For each candidate, XToken and XTag are computed for every x-term and checked via BloomFilter_Match_N. Word IDs resolved locally. Timing is from ntru-oqxt-search stdout.",
  "sse-or":         "Runs on a separate ODXT backend. Every keyword ID is bucketized into ODXT's meta-keywords (mkws). Within each bucket, the mkw with the fewest prior updates is retrieved first via TSet_Retrieve, then results are unioned across all buckets - i.e. across all queried keywords - giving disjunctive (OR) semantics. Word IDs resolved locally. Timing is from odxt-cli stdout.",
  "sse-rdbms-and":  "Runs compiled C++ SSE binary (ntru-oqxt-search) on Port 8000 over the encrypted TSet/XSet index built from the relational CSV posting list (TCV -> TR).",
  "sse-rdbms-or":   "Runs compiled C++ ODXT SSE binary (odxt-cli search) on Port 8001 over the encrypted index built from the relational CSV posting list (TCV -> TR).",
};

// ── Icons ──────────────────────────────────────────────────────────────────────
function DocIcon({size=14,color="#ffd208"}){return(<svg width={size}height={size}viewBox="0 0 24 24"fill="none"stroke={color}strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);}
function CsvIcon(){return(<svg width={14}height={14}viewBox="0 0 24 24"fill="none"stroke="#4ade80"strokeWidth="2"><rect x="3"y="3"width="18"height="18"rx="2"/><line x1="3"y1="9"x2="21"y2="9"/><line x1="3"y1="15"x2="21"y2="15"/><line x1="9"y1="9"x2="9"y2="21"/></svg>);}
function ClientIcon(){return(<svg width={16}height={16}viewBox="0 0 24 24"fill="none"stroke="#ffd208"strokeWidth="2"><rect x="2"y="3"width="20"height="14"rx="2"/><line x1="8"y1="21"x2="16"y2="21"/><line x1="12"y1="17"x2="12"y2="21"/></svg>);}
function ServerIcon({color="#888"}){return(<svg width={16}height={16}viewBox="0 0 24 24"fill="none"stroke={color}strokeWidth="2"><rect x="2"y="2"width="20"height="8"rx="2"/><rect x="2"y="14"width="20"height="8"rx="2"/><line x1="6"y1="6"x2="6.01"y2="6"/><line x1="6"y1="18"x2="6.01"y2="18"/></svg>);}
function DownloadIcon(){return(<svg width={11}height={11}viewBox="0 0 24 24"fill="none"stroke="currentColor"strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12"y1="15"x2="12"y2="3"/></svg>);}

// ── Backend status banner ──────────────────────────────────────────────────────
function BackendBanner({status, uploadStatus}) {
  const cfg = {
    checking: {bg:"#0d0d0d", border:"#1a1a1a",     dot:"#555",     text:"Checking backend at localhost:8000..."},
    offline:  {bg:"#1a0a0a", border:"#f8717133",   dot:"#f87171",  text:"Backend offline. Run: python main.py    SSE timing unavailable until connected."},
    online:   {bg:"#0a1a0a", border:"#4ade8033",   dot:"#4ade80",
      text: uploadStatus==="uploading" ? "Backend online. Indexing document and running setup binary..." :
            uploadStatus==="done"      ? "Backend online. Index ready. SSE searches use real binary timing." :
            uploadStatus==="error"     ? "Backend online but index build failed. Check backend logs." :
                                         "Backend online. Upload a document to enable SSE search."},
  };
  const c = cfg[status] || cfg.checking;
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:c.bg,border:`1px solid ${c.border}`,borderRadius:6,marginBottom:16,fontSize:11,fontFamily:"Space Mono,monospace",color:"#999"}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:c.dot,flexShrink:0,boxShadow:`0 0 6px ${c.dot}`}}/>
      {c.text}
    </div>
  );
}

// ── Server doc card ────────────────────────────────────────────────────────────
function ServerDoc({doc}){
  const seed=parseInt(sha256ish(doc.name).slice(0,8),16)||1;
  return(
    <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
      <div style={{padding:"8px 12px",background:"#111",borderBottom:"1px solid #1a1a1a",display:"flex",alignItems:"center",gap:8}}>
        <ServerIcon color="#777"/>
        <span style={{fontFamily:"Space Mono,monospace",fontSize:10,color:"#777"}}>{sha256ish(doc.name).slice(0,16)}...</span>
      </div>
      <div style={{padding:"8px 12px"}}>
        <div style={{fontFamily:"Space Mono,monospace",fontSize:9,color:"#444",lineHeight:1.8,wordBreak:"break-all"}}>{gibberish(seed,80)}</div>
      </div>
    </div>
  );
}

// ── Doc result row with optional download button ───────────────────────────────
function DocResult({docName, vaultMap}){
  const doc = vaultMap[docName];
  const content = doc?.content || doc?.rawContent || null;
  const rawFile = doc?.rawFile || null;
  const canDownload = content || rawFile;

  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:4,padding:"7px 10px",marginBottom:6}}>
      <span style={{fontSize:12,color:"#ddd",fontFamily:"Space Mono,monospace"}}>{docName}</span>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        <button onClick={() => openDocInNewWindow(docName, content, doc)}
          style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:4,border:"1px solid #1a1a1a",background:"transparent",color:"#ffd208",cursor:"pointer",fontSize:10,fontFamily:"Space Mono,monospace",flexShrink:0,transition:"all 0.15s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="#ffd20815";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
          👁️ view
        </button>
        {canDownload && (
          <button onClick={() => rawFile ? triggerDownload(docName, rawFile, rawFile.type) : triggerDownload(docName.replace(/\.pdf$/i,".txt"), content)}
            style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",borderRadius:4,border:"1px solid #1a1a1a",background:"transparent",color:"#666",cursor:"pointer",fontSize:10,fontFamily:"Space Mono,monospace",flexShrink:0,transition:"all 0.15s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}>
            <DownloadIcon/> download
          </button>
        )}
      </div>
    </div>
  );
}

// ── RDBMS filter row ───────────────────────────────────────────────────────────
function FilterRow({filter,idx,schema,tableData,onUpdate,onRemove}){
  const tables=Object.keys(schema);
  const columns=filter.table?(schema[filter.table]||[]):[];
  const values=(filter.table&&filter.column&&tableData[filter.table])
    ?[...new Set(tableData[filter.table].rows.map(r=>{const ci=tableData[filter.table].headers.indexOf(filter.column);return ci>=0?normalise(r[ci]):"";}).filter(Boolean))].sort():[];
  const sel={flex:1,padding:"6px 8px",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:4,color:"#ccc",fontSize:11,fontFamily:"Space Mono,monospace"};
  return(
    <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
      <select value={filter.table} onChange={e=>onUpdate(idx,{...filter,table:e.target.value,column:"",value:""})} style={sel}>
        <option value="">table</option>{tables.map(t=><option key={t}value={t}>{t}</option>)}
      </select>
      <select value={filter.column} onChange={e=>onUpdate(idx,{...filter,column:e.target.value,value:""})} disabled={!filter.table} style={sel}>
        <option value="">column</option>{columns.map(c=><option key={c}value={c}>{c}</option>)}
      </select>
      <select value={filter.value} onChange={e=>onUpdate(idx,{...filter,value:e.target.value})} disabled={!filter.column} style={sel}>
        <option value="">value</option>{values.map(v=><option key={v}value={v}>{v}</option>)}
      </select>
      <button onClick={()=>onRemove(idx)} style={{padding:"4px 8px",background:"transparent",border:"1px solid #1a1a1a",borderRadius:4,color:"#666",cursor:"pointer",fontSize:12,lineHeight:1}}
        onMouseEnter={e=>{e.currentTarget.style.color="#f87171";e.currentTarget.style.borderColor="#f8717144";}}
        onMouseLeave={e=>{e.currentTarget.style.color="#666";e.currentTarget.style.borderColor="#1a1a1a";}}>x</button>
    </div>
  );
}

// ── RDBMS panel ────────────────────────────────────────────────────────────────
function RDBMSPanel({mode,tableData,dbIndex}){
  const [rdbmsSubtype,setRdbmsSubtype]=useState("and");
  const [filters,setFilters]=useState([{table:"",column:"",value:""}]);
  const [result,setResult]=useState(null);
  const [busy,setBusy]=useState(false);

  const schema=Object.fromEntries(Object.entries(tableData).map(([n,{headers}])=>[n,headers]));
  const hasTables=Object.keys(tableData).length>0;

  function updateFilter(i,f){const fs=[...filters];fs[i]=f;setFilters(fs);}
  function removeFilter(i){setFilters(filters.filter((_,j)=>j!==i));}

  async function handleSearch(){
    if(!dbIndex||!hasTables)return;
    const active=filters.filter(f=>f.table&&f.column&&f.value);
    if(!active.length)return;

    const tcvPairs=active.map(f=>({f,id:dbIndex.tcv.lookup(f.table,f.column,normalise(f.value))}));
    const tcvIds=tcvPairs.map(p=>p.id).filter(Boolean);
    const resolvedFilters=tcvPairs.filter(p=>p.id).map(p=>p.f);

    if(!tcvIds.length){
      setResult({hits:[],ms:0,tcvIds:[],wordLabels:[],missing:active});
      return;
    }

    if(mode==="regular"){
      const t0=performance.now();
      let hits=[],missing=[];
      if(rdbmsSubtype==="and"){
        const res=rdbmsConjSearch(tcvIds,dbIndex.idx,dbIndex.tr,tableData,resolvedFilters);
        hits=res.hits; missing=res.missing;
      } else {
        const unionTrIds=new Set();
        for(const id of tcvIds){
          if(dbIndex.idx.has(id)){
            for(const trid of dbIndex.idx.get(id))unionTrIds.add(trid);
          }
        }
        hits=resolveTrIds(unionTrIds,dbIndex.tr);
      }
      const ms=performance.now()-t0;
      const hydrated=hits.map(h=>{const td=tableData[h.tbl];return td?{...h,headers:td.headers,rowData:h.rowData||td.rows[h.ri]||[]}:h;});
      setResult({
        hits:hydrated,
        ms,
        timingUs: Math.round(ms * 1000),
        tcvIds,
        wordLabels:resolvedFilters.map(f=>`(${f.table},${f.column},'${f.value}')`),
        missing,
        binaryOutput:null
      });
    } else {
      setBusy(true);
      setResult(null);
      const port=rdbmsSubtype==="or"?BACKEND_PORTS.or:BACKEND_PORTS.single;
      const backendUrl=rdbmsSubtype==="or"?BACKENDS.or:BACKENDS.primary;

      try{
        const wordLabels=resolvedFilters.map(f=>`(${f.table},${f.column},'${f.value}')`);
        const conjRes=await fetch(`${backendUrl}/conjunctive-search`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({word_ids:tcvIds,words:wordLabels}),
        });

        if(!conjRes.ok){
          const err=await conjRes.json().catch(()=>({}));
          throw new Error(err.detail||`SSE search failed on port ${port}: ${conjRes.status}`);
        }

        const conjData=await conjRes.json();
        const output=conjData.output||"";
        const timeMatch=output.match(/Search time = (\d+) micro-seconds/);
        const timingUs=timeMatch?parseInt(timeMatch[1]):null;
        const timingMs=timingUs?timingUs/1000:(conjData.time_taken??0);

        let hits=[];
        if(rdbmsSubtype==="and"){
          const res=rdbmsConjSearch(tcvIds,dbIndex.idx,dbIndex.tr,tableData,resolvedFilters);
          hits=res.hits;
        } else {
          const unionTrIds=new Set();
          for(const id of tcvIds){
            if(dbIndex.idx.has(id)){
              for(const trid of dbIndex.idx.get(id))unionTrIds.add(trid);
            }
          }
          hits=resolveTrIds(unionTrIds,dbIndex.tr);
        }

        const hydrated=hits.map(h=>{const td=tableData[h.tbl];return td?{...h,headers:td.headers,rowData:h.rowData||td.rows[h.ri]||[]}:h;});

        setResult({
          hits:hydrated,
          ms:timingMs,
          timingUs,
          tcvIds,
          wordLabels,
          missing:[],
          binaryOutput:output,
          port
        });
      }catch(e){
        setResult({error:e.message,hits:[],ms:0,tcvIds:[],wordLabels:[],missing:[]});
      }finally{
        setBusy(false);
      }
    }
  }

  const canSearch=dbIndex&&filters.some(f=>f.table&&f.column&&f.value)&&!busy;

  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[["and","Conjunction (AND) - Port 8000"],["or","Disjunction (OR) - Port 8001"]].map(([subId,label])=>(
          <button key={subId} onClick={()=>{setRdbmsSubtype(subId);setResult(null);}}
            style={{
              padding:"7px 14px",
              borderRadius:20,
              fontSize:11,
              fontFamily:"Space Mono,monospace",
              cursor:"pointer",
              background:rdbmsSubtype===subId?"#ffd20815":"transparent",
              color:rdbmsSubtype===subId?"#ffd208":"#888",
              border:`1px solid ${rdbmsSubtype===subId?"#ffd20844":"#1a1a1a"}`,
              transition:"all 0.15s"
            }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{fontSize:12,color:"#999",lineHeight:1.65,marginBottom:14,maxWidth:700}}>
        {EXP[`${mode}-rdbms-${rdbmsSubtype}`]||EXP[`${mode}-rdbms`]}
      </div>

      {/* Permanent RDBMS Query Skeleton Box */}
      <div style={{
        margin: "14px 0 20px 0",
        padding: "12px 16px",
        background: "#050505",
        border: "1px solid #1f1f1f",
        borderRadius: 6,
        fontFamily: "Space Mono, monospace",
        fontSize: 11
      }}>
        <div style={{ color: "#ffd208", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
          <span>Query Skeleton</span>
          <span style={{ color: "#888", fontWeight: 400 }}>({rdbmsSubtype === "and" ? "Conjunction AND" : "Disjunction OR"})</span>
        </div>
        <div style={{ color: "#4ade80", wordBreak: "break-all", lineHeight: 1.5 }}>
          {(() => {
            const valid = filters.filter(f => f.table && f.column && f.value);
            if (!valid.length) {
              return rdbmsSubtype === "and"
                ? "SELECT * FROM [Table] WHERE (Table.Column1 = 'Val1') AND (Table.Column2 = 'Val2')  [(Table.Column1 = 'Val1') + (Table.Column2 = 'Val2')]"
                : "SELECT * FROM [Table] WHERE (Table.Column1 = 'Val1') OR (Table.Column2 = 'Val2')   [(Table.Column1 = 'Val1') | (Table.Column2 = 'Val2')]";
            }
            const targetTables = [...new Set(valid.map(f => f.table))].join(", ");
            const clauses = valid.map(f => `(${f.table}.${f.column} = '${f.value}')`);
            return rdbmsSubtype === "and"
              ? `SELECT * FROM ${targetTables} WHERE ${clauses.join(" AND ")}   [ ${clauses.join(" + ")} ]`
              : `SELECT * FROM ${targetTables} WHERE ${clauses.join(" OR ")}    [ ${clauses.join(" | ")} ]`;
          })()}
        </div>
      </div>

      {!hasTables?(
        <div style={{fontSize:12,color:"#555",fontFamily:"Space Mono,monospace",padding:"16px 0"}}>Load a CSV from the sample list or upload one above.</div>
      ):(
        <>
          {dbIndex&&(
            <div style={{display:"flex",gap:20,marginBottom:14,padding:"10px 14px",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:6}}>
              {[["tables",dbIndex.stats.tables],["unique TCV IDs",dbIndex.stats.uniqueTCV],["unique TR IDs",dbIndex.stats.uniqueTR],["index entries",dbIndex.stats.entries]].map(([k,v])=>(
                <div key={k} style={{fontFamily:"Space Mono,monospace",fontSize:10}}>
                  <div style={{color:"#ffd208",fontWeight:600}}>{v}</div>
                  <div style={{color:"#555",marginTop:2}}>{k}</div>
                </div>
              ))}
            </div>
          )}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:9,color:"#666",fontFamily:"Space Mono,monospace",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>
              Filters (table, column, value) — Mode: {rdbmsSubtype==="and"?"Conjunction (AND)":"Disjunction (OR)"}
            </div>
            {filters.map((f,i)=><FilterRow key={i} filter={f} idx={i} schema={schema} tableData={tableData} onUpdate={updateFilter} onRemove={removeFilter}/>)}
            <button onClick={()=>setFilters([...filters,{table:"",column:"",value:""}])}
              style={{padding:"5px 12px",background:"transparent",border:"1px solid #1a1a1a",borderRadius:4,color:"#666",cursor:"pointer",fontSize:10,fontFamily:"Space Mono,monospace",transition:"all 0.15s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}>+ add filter</button>
          </div>
          <button onClick={handleSearch} disabled={!canSearch}
            style={{
              padding:"10px 22px",
              borderRadius:6,
              fontWeight:700,
              fontSize:13,
              background:canSearch?"#ffd208":"#1a1a1a",
              color:canSearch?"#0a0a0a":"#555",
              border:"none",
              cursor:canSearch?"pointer":"default",
              marginBottom:result?16:0
            }}>
            {busy?"Executing SSE Binary Search...":`Run ${rdbmsSubtype.toUpperCase()} Query (${mode.toUpperCase()})`}
          </button>
        </>
      )}

      {result&&result.error&&(
        <div style={{fontSize:11,color:"#f87171",fontFamily:"Space Mono,monospace",marginTop:16,padding:"8px 12px",background:"#1a0a0a",border:"1px solid #f8717133",borderRadius:4}}>
          Error: {result.error}
        </div>
      )}

      {result&&!result.error&&(
        <div style={{borderTop:"1px solid #1a1a1a",paddingTop:16,marginTop:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
            <div style={{fontSize:12,color:"#ccc"}}>
              {result.hits.length?`${result.hits.length} row${result.hits.length>1?"s":""} matched`:"No rows matched"}
              {result.port&&<span style={{fontSize:10,color:"#666",marginLeft:8,fontFamily:"Space Mono,monospace"}}>(backend port :{result.port})</span>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:11,color:"#ffd208",fontFamily:"Space Mono,monospace"}}>
                {result.timingUs != null ? `${result.timingUs.toLocaleString()} µs` : `${Math.round(result.ms * 1000)} µs`}
              </div>
              {result.hits.length>0&&(
                <button onClick={()=>{
                  const g={};result.hits.forEach(h=>{if(!g[h.tbl])g[h.tbl]=[];g[h.tbl].push(h);});
                  triggerDownload("rdbms_results.csv",Object.entries(g).map(([t,rows])=>`## ${t}\n`+rowsToCSV(rows[0].headers||[],rows.map(r=>r.rowData||[]))).join("\n\n"),"text/csv");
                }}
                  style={{display:"flex",alignItems:"center",gap:4,padding:"4px 8px",borderRadius:4,border:"1px solid #1a1a1a",background:"transparent",color:"#666",cursor:"pointer",fontSize:10,fontFamily:"Space Mono,monospace",transition:"all 0.15s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}>
                  <DownloadIcon/> download results
                </button>
              )}
            </div>
          </div>

          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {result.tcvIds.map((id,i)=>(
              <span key={id} style={{fontFamily:"Space Mono,monospace",fontSize:10,color:"#ffd208",background:"#ffd20810",border:"1px solid #ffd20833",borderRadius:4,padding:"3px 8px"}}>
                {id}<span style={{opacity:0.5,marginLeft:4,fontSize:9}}>{result.wordLabels[i]}</span>
              </span>
            ))}
          </div>




          {result.hits.length>0&&(()=>{
            const groups={};
            result.hits.forEach(h=>{if(!groups[h.tbl])groups[h.tbl]=[];groups[h.tbl].push(h);});
            const TABLE_COLORS={employees:"#ffd208",employee2:"#4ade80",products:"#60a5fa",orders:"#f97316"};
            const getColor=tbl=>TABLE_COLORS[tbl]||(Object.values(TABLE_COLORS)[Object.keys(groups).indexOf(tbl)%4]||"#a78bfa");
            return(
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                {Object.entries(groups).map(([tbl,rows])=>(
                  <div key={tbl} style={{overflowX:"auto",border:`1px solid ${getColor(tbl)}22`,borderRadius:6}}>
                    <div style={{padding:"6px 12px",background:`${getColor(tbl)}11`,borderBottom:`1px solid ${getColor(tbl)}33`,fontFamily:"Space Mono,monospace",fontSize:10,color:getColor(tbl),fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>
                      📋 {tbl} — {rows.length} row{rows.length>1?"s":""}
                    </div>
                    <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,fontFamily:"Space Mono,monospace"}}>
                      <thead><tr>
                        <th style={{padding:"6px 10px",textAlign:"left",background:"#111",color:"#555",border:"1px solid #1a1a1a",fontSize:10}}>row #</th>
                        {(rows[0]?.headers||[]).map(h=>(
                          <th key={h} style={{padding:"6px 10px",textAlign:"left",background:"#111",color:getColor(tbl),border:"1px solid #1a1a1a",whiteSpace:"nowrap",fontSize:10,opacity:0.85}}>{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {rows.map((hit,ri)=>(
                          <tr key={hit.trid}>
                            <td style={{padding:"6px 10px",color:"#555",border:"1px solid #1a1a1a",background:ri%2===0?"#0a0a0a":"#0d0d0d",fontSize:10}}>{hit.ri}</td>
                            {(hit.rowData||[]).map((cell,ci)=>(
                              <td key={ci} style={{padding:"6px 10px",color:"#ccc",border:"1px solid #1a1a1a",background:ri%2===0?"#0a0a0a":"#0d0d0d"}}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}


// ── Search console ──────────────────────────────────────────────────────────────
const QTYPES = [["single","Single Term"],["and","Conjunction (AND)"],["or","Disjunction (OR)"],["rdbms","RDBMS Query"]];

function SearchConsole({vault,indexedKws,vaultMap,tableData,dbIndex,backendStatus,uploadStatus,wordToId,qtype,setQtype,backendUrl}){
  const [mode,setMode]     = useState("regular");
  const [input,setInput]   = useState("");
  const [result,setResult] = useState(null);
  const [busy,setBusy]     = useState(false);
  const [searchCountdown,setSearchCountdown] = useState(4);

  const hasVault  = vault.length > 0;
  const sseReady  = backendStatus==="online" && uploadStatus==="done";

  async function handleSearch(){
    const terms = input.split(/,/).map(s=>s.trim()).filter(Boolean);
    const t = qtype==="single" ? terms.slice(0,1) : terms;
    if(!hasVault||!t.length) return;

    if(mode==="regular"){
      setResult({type:"regular",qtype,...regularSearch(qtype,t,indexedKws),terms:t});
    } else {
      setBusy(true); setResult(null);
      setSearchCountdown(4);
      const interval = setInterval(() => {
        setSearchCountdown(prev => (prev > 1 ? prev - 1 : 1));
      }, 1000);
      try {
        const r = await sseSearch(backendUrl, qtype, t, wordToId, indexedKws);
        setResult({type:"sse",qtype,...r,terms:t});
      } catch(e) {
        setResult({type:"sse",qtype,ok:false,error:e.message,terms:t});
      } finally {
        clearInterval(interval);
        setBusy(false);
      }
    }
  }

  const placeholder = qtype==="single" ? "e.g. revenue" : "e.g. revenue, profit";
  const hint = qtype==="single" ? "One keyword. Any word from the uploaded documents works."
    : qtype==="or" ? (mode==="sse"
        ? "Two or more keywords separated by commas. Each is bucketized and searched independently, then results are unioned."
        : "Two or more keywords separated by commas. Returns documents containing any of them.")
    : mode==="sse" ? "Two or more keywords separated by commas. The first is the s-term for TSet_Retrieve."
    : "Two or more keywords separated by commas. Returns documents containing all of them.";

  return(
    <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:8,padding:24,marginTop:16}}>
      <BackendBanner status={backendStatus} uploadStatus={uploadStatus}/>

      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[["regular","Regular Search"],["sse","SSE Search"]].map(([id,label])=>(
          <button key={id} onClick={()=>{setMode(id);setResult(null);}}
            style={{padding:"9px 18px",borderRadius:6,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif",background:mode===id?"#ffd208":"#111",color:mode===id?"#0a0a0a":"#999",border:`1px solid ${mode===id?"#ffd208":"#1a1a1a"}`,transition:"all 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      <div style={{display:"flex",gap:6,marginBottom:18,flexWrap:"wrap"}}>
        {QTYPES.map(([id,label])=>(
          <button key={id} onClick={()=>{setQtype(id);setResult(null);}}
            style={{padding:"6px 12px",borderRadius:20,fontSize:11,cursor:"pointer",fontFamily:"Space Mono,monospace",background:qtype===id?"#ffd20815":"transparent",color:qtype===id?"#ffd208":"#888",border:`1px solid ${qtype===id?"#ffd20844":"#1a1a1a"}`,transition:"all 0.15s"}}>
            {label}
          </button>
        ))}
      </div>

      {qtype==="rdbms" ? (
        <RDBMSPanel mode={mode} tableData={tableData} dbIndex={dbIndex}/>
      ) : (
        <>
          <div style={{fontSize:12,color:"#999",lineHeight:1.65,marginBottom:18,maxWidth:700}}>{EXP[`${mode}-${qtype}`]}</div>

          {mode==="sse"&&!sseReady&&(
            <div style={{fontSize:11,color:"#f87171",fontFamily:"Space Mono,monospace",marginBottom:14,padding:"8px 10px",background:"#1a0a0a",border:"1px solid #f8717133",borderRadius:4}}>
              {backendStatus!=="online"
                ? "Backend must be running to use SSE search. Run: python main.py"
                : "Waiting for setup binary to finish building the encrypted index."}
            </div>
          )}

          <div style={{display:"flex",gap:8,marginBottom:6}}>
            <input value={input} onChange={e=>{setInput(e.target.value);setResult(null);}} onKeyDown={e=>e.key==="Enter"&&handleSearch()}
              placeholder={placeholder} disabled={!hasVault||(mode==="sse"&&!sseReady)||busy}
              style={{flex:1,padding:"10px 14px",fontSize:13,background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:6,color:"#f5f5f0",fontFamily:"Space Grotesk, sans-serif",outline:"none"}}
              onFocus={e=>e.target.style.borderColor="#ffd208"} onBlur={e=>e.target.style.borderColor="#1a1a1a"}/>
            <button onClick={handleSearch} disabled={!hasVault||(mode==="sse"&&!sseReady)||busy}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding:"10px 22px",
                borderRadius:6,
                fontWeight:700,
                fontSize:13,
                background:(hasVault&&!(mode==="sse"&&!sseReady)&&!busy)?"#ffd208":busy?"#ffd20822":"#1a1a1a",
                color:(hasVault&&!(mode==="sse"&&!sseReady)&&!busy)?"#0a0a0a":busy?"#ffd208":"#555",
                border:"none",
                cursor: busy ? "wait" : (hasVault&&!(mode==="sse"&&!sseReady)) ? "pointer" : "default",
                transition: "all 0.15s"
              }}>
              {busy ? (
                <>
                  <div className="spinner" style={{
                    width: 14,
                    height: 14,
                    border: "2px solid #ffd20822",
                    borderTop: "2px solid #ffd208",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                  }} />
                  <span>Searching (Running ntru-oqxt-search C++ binary... ~{searchCountdown}s)</span>
                </>
              ) : "Search"}
            </button>
          </div>
          <div style={{fontSize:11,color:"#666",marginBottom:18}}>{!hasVault?"Upload at least one document before searching.":hint}</div>

          {result&&(
            <div style={{borderTop:"1px solid #1a1a1a",paddingTop:16}}>
              {/* Regular */}
              {result.type==="regular"&&(
                <>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
                    <div style={{fontSize:12,color:"#ccc"}}>{result.docs.length?`${result.docs.length} document${result.docs.length>1?"s":""} matched`:"No documents matched"}</div>
                    <div style={{fontSize:11,color:"#ffd208",fontFamily:"Space Mono,monospace"}}>{Math.round(result.ms * 1000)} µs</div>
                  </div>
                  {result.docs.map(n=><DocResult key={n} docName={n} vaultMap={vaultMap}/>)}
                </>
              )}

              {/* SSE */}
              {result.type==="sse"&&(
                result.ok===false ? (
                  <div style={{fontSize:11,color:"#f87171",fontFamily:"Space Mono,monospace",padding:"8px 10px",background:"#1a0a0a",border:"1px solid #f8717133",borderRadius:4}}>
                    Search failed: {result.error}
                  </div>
                ) : (
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10}}>
                      <div style={{fontSize:12,color:"#ccc"}}>
                        {result.matchedDocNames?.length ? `${result.matchedDocNames.length} document${result.matchedDocNames.length>1?"s":""} matched` : "No documents matched"}
                      </div>
                      <div style={{fontSize:11,color:"#ffd208",fontFamily:"Space Mono,monospace"}}>
                        {result.timingUs != null ? `${result.timingUs.toLocaleString()} µs` : result.timeTakenMs != null ? `${result.timeTakenMs} ms` : "-"}
                      </div>
                    </div>

                    {/* Matched doc names with download, or no-match notice */}
                    {result.matchedDocNames?.length > 0 ? (
                      <div style={{marginBottom:14}}>
                        {result.matchedDocNames.map(n=><DocResult key={n} docName={n} vaultMap={vaultMap}/>)}
                      </div>
                    ) : (
                      <div style={{marginBottom:14,padding:"10px 14px",background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:6,fontFamily:"Space Mono,monospace",fontSize:12,color:"#666"}}>
                        No documents matched your query.
                      </div>
                    )}

                    {result.notFound?.length > 0 && (
                      <div style={{fontSize:11,color:"#666",marginTop:8,fontFamily:"Space Mono,monospace"}}>
                        Not in vocabulary: {result.notFound.join(", ")}
                      </div>
                    )}
                  </>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveDemo(){
  const [vault,setVault]                   = useState([]);
  const [indexedKws,setIndexedKws]         = useState({});
  // Keyed by backend key ("primary" for single/and/rdbms, "or" for
  // disjunction) since each is an independent backend process/repo with its
  // own word_to_id assignment - ids are NOT interchangeable across backends.
  const [wordToIdByKey,setWordToIdByKey]       = useState({primary:{}, or:{}});
  const [tableData,setTableData]           = useState({});
  const [dbIndex,setDbIndex]               = useState(null);
  const [backendStatusByKey,setBackendStatusByKey] = useState({primary:"checking", or:"checking"});
  const [uploadStatusByKey,setUploadStatusByKey]   = useState({primary:"idle", or:"idle"});
  const [uploadCountdown,setUploadCountdown] = useState(15);
  const [dropActive,setDropActive]         = useState(false);
  const [libOpen,setLibOpen]               = useState(true);
  const [qtype,setQtype]                   = useState("single");
  const fileRef    = useRef();
  const isRdbms    = qtype === "rdbms";
  const vaultMap   = Object.fromEntries(vault.map(d => [d.name, d]));
  const backendKey     = BACKEND_KEY_FOR_QTYPE[qtype] || "primary";
  const backendStatus  = backendStatusByKey[backendKey];
  const uploadStatus   = uploadStatusByKey[backendKey];
  const wordToId        = wordToIdByKey[backendKey];

  useEffect(()=>{
    Object.entries(BACKENDS).forEach(([key, url]) => {
      checkBackend(url).then(ok => setBackendStatusByKey(prev => ({...prev, [key]: ok ? "online" : "offline"})));
    });
  },[]);

  // Refresh the wordToId cache for one backend (called after every upload to that backend)
  async function refreshWordToId(key) {
    const map = await fetchWordToId(BACKENDS[key]);
    if (Object.keys(map).length) setWordToIdByKey(prev => ({...prev, [key]: map}));
  }

  // Add doc to vault and JS keyword index
  function commitDoc(doc) {
    setVault(prev => prev.find(v=>v.name===doc.name) ? prev : [...prev, doc]);
    setIndexedKws(prev=>{
      const next={...prev};
      (doc.keywords||[]).forEach(kw=>{const k=kw.toLowerCase();if(!next[k])next[k]=[];if(!next[k].includes(doc.name))next[k].push(doc.name);});
      return next;
    });
    setLibOpen(false);
  }

  // Core upload function: sends file/content to backend, commits to vault with
  // keywords from the response, then refreshes the local wordToId cache.
  // fileOrContent: File object (real PDF/TXT from disk) or string (sample content).
  async function uploadAndCommit(name, fileOrContent, fallbackKeywords, storedContent) {
    setUploadStatusByKey(prev => Object.fromEntries(Object.keys(prev).map(k => [k, "uploading"])));
    setUploadCountdown(15);
    const interval = setInterval(() => {
      setUploadCountdown(prev => (prev > 1 ? prev - 1 : 1));
    }, 1000);
    try {
      // Fan out to every backend - each is an independent process/index, so
      // a doc uploaded on one tab needs to land in all of them for the
      // other tabs to find it later without a re-upload.
      const results = await uploadToAllBackends(name, fileOrContent);
      const primary  = results.primary;
      const proc     = primary?.ok ? primary.data.processed?.[0] : null;
      const kws      = proc ? filterDisplayKeywords(proc.keywords) : (fallbackKeywords || []);
      commitDoc({
        id: name, 
        name, 
        keywords: kws, 
        content: storedContent || null,
        rawFile: fileOrContent instanceof File ? fileOrContent : null
      });
      await Promise.all(Object.keys(results).map(refreshWordToId));
      setUploadStatusByKey(
        Object.fromEntries(Object.entries(results).map(([k,r]) => [k, r.ok ? "done" : "error"]))
      );
      const anyFailed = Object.values(results).some(r => !r.ok);
      if (anyFailed) console.error("upload error on some backends:", results);
    } catch(e) {
      console.error("upload error:", e);
      // Fall back to adding with provided keywords so UI still works offline
      commitDoc({
        id: name, 
        name, 
        keywords: fallbackKeywords || [], 
        content: storedContent || null,
        rawFile: fileOrContent instanceof File ? fileOrContent : null
      });
      setUploadStatusByKey(prev => Object.fromEntries(Object.keys(prev).map(k => [k, "error"])));
    } finally {
      clearInterval(interval);
    }
  }

  // Sample PDF: send text content to backend (falls back to text decode if PyPDF2 fails)
  async function addSamplePDF(sample) {
    if (vault.find(v=>v.name===sample.name)) return;
    if (backendStatus !== "online") {
      // Offline: just add with pre-defined keywords
      commitDoc(sample);
      return;
    }
    await uploadAndCommit(sample.name, sample.content, sample.keywords, sample.content);
  }

  // Real file from disk
  async function addRealFile(file) {
    if (isRdbms) {
      if (!file.name.toLowerCase().endsWith(".csv")) { alert("Only CSV files in RDBMS mode."); return; }
      const reader = new FileReader();
      reader.onload = e => loadCSV(file.name, e.target.result);
      reader.readAsText(file);
      return;
    }

    if (backendStatus !== "online") {
      if (file.name.toLowerCase().endsWith(".pdf")) {
        alert("PDF text extraction requires the backend. Run: python main.py");
        return;
      }
      // TXT file offline: read as text and extract keywords client-side
      const reader = new FileReader();
      reader.onload = e => {
        const text = e.target.result;
        commitDoc({id:file.name, name:file.name, keywords:extractKeywordsFromText(text, file.name), content:text});
      };
      reader.readAsText(file);
      return;
    }

    // Backend online: POST the File object directly - binary preserved,
    // PyPDF2 extracts text server-side, keywords come back in the response.
    await uploadAndCommit(file.name, file, [], null);
  }

  function loadCSV(name, rawContent) {
    const parsed    = parseCSV(rawContent);
    const tableName = name.replace(/\.csv$/i,"");
    const next      = {...tableData, [tableName]: {...parsed, rawName:name, rawContent}};
    setTableData(next);
    const tables = Object.entries(next).map(([n,{headers,rows}])=>({name:n,headers,rows}));
    const built  = buildIndex(tables);
    setDbIndex({...built, stats:{tables:tables.length, uniqueTCV:built.tcv._c-1, uniqueTR:built.tr._c-1, entries:built.idx.size}});
    setLibOpen(false);
  }

  function handleDrop(e){
    e.preventDefault(); setDropActive(false);
    const pdfId = e.dataTransfer.getData("samplePdfId");
    if(pdfId){ const s=SAMPLE_PDFS.find(x=>x.id===pdfId); if(s)addSamplePDF(s); return; }
    const csvId = e.dataTransfer.getData("sampleCsvId");
    if(csvId){ const s=SAMPLE_CSVS.find(x=>x.id===csvId); if(s&&!tableData[s.name.replace(/\.csv$/i,"")])loadCSV(s.name,s.content); return; }
    const file = e.dataTransfer.files[0];
    if(file) addRealFile(file);
  }

  return(
    <div style={{minHeight:"100vh",background:"#0a0a0a",padding:"60px 0",fontFamily:"Space Grotesk, sans-serif"}}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px"}}>
        <div style={{marginBottom:32}}>
          <div style={{fontFamily:"Space Mono,monospace",fontSize:11,color:"#ffd208",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>Interactive demo</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)",fontWeight:700,color:"#f5f5f0",letterSpacing:"-0.025em",lineHeight:1.1}}>Try it yourself</h2>
          
          <div style={{
            marginTop: 20,
            padding: "16px 22px",
            background: "rgba(255, 210, 8, 0.06)",
            border: "1px solid rgba(255, 210, 8, 0.3)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 15, color: "#f5f5f0", lineHeight: 1.4 }}>
                <strong style={{ color: "#ffd208", fontWeight: 700 }}>Notice:</strong> If server says offline, wait for 1-2 min and refresh.
              </div>
            </div>
            <button
              onClick={() => {
                setVault([]);
                setIndexedKws({});
                setWordToIdByKey({primary:{}, or:{}});
                setTableData({});
                setDbIndex(null);
                setBackendStatusByKey({primary:"checking", or:"checking"});
                setUploadStatusByKey({primary:"idle", or:"idle"});
                checkBackend(BACKENDS.primary).then(ok => setBackendStatusByKey(prev => ({...prev, primary: ok ? "online" : "offline"})));
                checkBackend(BACKENDS.or).then(ok => setBackendStatusByKey(prev => ({...prev, or: ok ? "online" : "offline"})));
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "Space Grotesk, sans-serif",
                background: "rgba(244, 63, 94, 0.12)",
                border: "1px solid rgba(244, 63, 94, 0.35)",
                color: "#f43f5e",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(244, 63, 94, 0.25)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(244, 63, 94, 0.12)"; }}
            >
              Reset Demo 🔄
            </button>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,alignItems:"start"}}>
          {/* Client panel */}
          <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:8,padding:20,display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <ClientIcon/>
              <div style={{fontSize:10,fontFamily:"Space Mono,monospace",letterSpacing:"0.12em",color:"#999",textTransform:"uppercase"}}>Client</div>
            </div>

            <div onDragOver={e=>{e.preventDefault();setDropActive(true);}} onDragLeave={()=>setDropActive(false)} onDrop={handleDrop} onClick={() => uploadStatus !== "uploading" && fileRef.current.click()}
              style={{
                border: `1.5px dashed ${uploadStatus === "uploading" ? "#ffd208" : dropActive ? "#ffd208" : "#1a1a1a"}`,
                borderRadius: 6,
                padding: "24px 16px",
                textAlign: "center",
                cursor: uploadStatus === "uploading" ? "wait" : "pointer",
                background: uploadStatus === "uploading" || dropActive ? "#ffd20808" : "transparent",
                transition: "all 0.2s ease",
                position: "relative"
              }}>
              <input ref={fileRef} type="file" accept={isRdbms?".csv":".pdf,.txt"} multiple={isRdbms} style={{display:"none"}}
                onChange={e=>{[...e.target.files].forEach(addRealFile);e.target.value="";}} disabled={uploadStatus === "uploading"}/>
              {uploadStatus === "uploading" ? (
                <div>
                  <div className="spinner" style={{
                    width: 24,
                    height: 24,
                    border: "2px solid #ffd20822",
                    borderTop: "2px solid #ffd208",
                    borderRadius: "50%",
                    margin: "0 auto 12px",
                    animation: "spin 0.8s linear infinite"
                  }} />
                  <div style={{fontSize: 13, fontWeight: 600, color: "#ffd208", fontFamily: "Space Grotesk, sans-serif"}}>Uploading & Indexing...</div>
                  <div style={{fontSize: 11, color: "#999", marginTop: 4, fontFamily: "Space Mono, monospace"}}>
                    Uploading document and making it ready for SSE search
                  </div>
                  <div style={{
                    width: "80%",
                    height: 4,
                    background: "#1a1a1a",
                    borderRadius: 2,
                    margin: "12px auto 0",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%",
                      background: "#ffd208",
                      width: `${((15 - uploadCountdown) / 15) * 100}%`,
                      transition: "width 1s linear"
                    }} />
                  </div>
                </div>
              ) : (
                <>
                  <div style={{fontSize:22,color:dropActive?"#ffd208":"#444",marginBottom:6,transition:"color 0.2s"}}>↑</div>
                  <div style={{fontSize:13,fontWeight:600,color:dropActive?"#ffd208":"#888"}}>{dropActive?"drop to load":"drop or click to upload"}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:3}}>{isRdbms?"CSV only, each file becomes a table":"PDF or TXT"}</div>
                </>
              )}
            </div>

            {/* Sample list switches based on active tab */}
            <div style={{border:"1px solid #1a1a1a",borderRadius:6,overflow:"hidden"}}>
              <button onClick={()=>setLibOpen(o=>!o)}
                style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#111",border:"none",color:"#999",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif"}}>
                <span>{isRdbms?"Sample CSV files":"Sample PDFs"} {(isRdbms?Object.keys(tableData).length:vault.length)>0&&<span style={{color:"#666",fontWeight:400}}>({isRdbms?Object.keys(tableData).length:vault.length} loaded)</span>}</span>
                <span style={{fontSize:10}}>{libOpen?"▲":"▼"}</span>
              </button>
              {libOpen&&(
                <div style={{borderTop:"1px solid #1a1a1a"}}>
                  {(isRdbms?SAMPLE_CSVS:SAMPLE_PDFS).map(s=>{
                    const loaded = isRdbms ? !!tableData[s.name.replace(/\.csv$/i,"")] : vault.some(v=>v.name===s.name);
                    return(
                      <div key={s.id} draggable={!loaded}
                        onDragStart={e=>e.dataTransfer.setData(isRdbms?"sampleCsvId":"samplePdfId",s.id)}
                        onClick={()=>{ if(loaded)return; isRdbms?loadCSV(s.name,s.content):addSamplePDF(s); }}
                        style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:"1px solid #111",cursor:loaded?"default":"pointer",opacity:loaded?0.5:1,transition:"background 0.15s"}}
                        onMouseEnter={e=>{if(!loaded)e.currentTarget.style.background="#111";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
                        {isRdbms?<CsvIcon/>:<DocIcon size={12}/>}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:11,fontWeight:600,color:"#ccc",display:"flex",alignItems:"center",gap:6}}>
                            <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.name}</span>
                            {loaded&&<span style={{fontSize:9,color:isRdbms?"#4ade80":"#ffd208",flexShrink:0}}>loaded</span>}
                            <button
                              onClick={(e)=>{ e.stopPropagation(); isRdbms ? openCSVInNewWindow(s.name, parseCSV(s.content).headers, parseCSV(s.content).rows) : openDocInNewWindow(s.name, s.content); }}
                              style={{ marginLeft: "auto", background: "transparent", border: "1px solid #222", color: "#ffd208", borderRadius: 4, padding: "2px 6px", fontSize: 9, cursor: "pointer", fontFamily: "Space Mono, monospace" }}
                              onMouseEnter={e=>{e.currentTarget.style.background="#ffd20815";}}
                              onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}
                            >
                              👁️ view
                            </button>
                          </div>
                          <div style={{fontSize:10,color:"#777",marginTop:2,fontFamily:"Space Mono,monospace"}}>
                            {isRdbms?parseCSV(s.content).headers.join(", "):`${s.keywords.slice(0,3).join(", ")}...`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index */}
            {!isRdbms&&vault.length>0&&(
              <div style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:6,padding:"12px 14px"}}>
                <div style={{fontSize:9,fontFamily:"Space Mono,monospace",letterSpacing:"0.1em",color:"#666",textTransform:"uppercase",marginBottom:10}}>Keyword index</div>
                {vault.map(doc=>(
                  <div key={doc.name} style={{marginBottom:10}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:10,color:"#ffd208",fontFamily:"Space Mono,monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{doc.name}</span>
                      <button
                        onClick={() => openDocInNewWindow(doc.name, doc.content || doc.rawContent, doc)}
                        style={{ background: "transparent", border: "1px solid #222", color: "#ffd208", borderRadius: 4, padding: "2px 6px", fontSize: 9, cursor: "pointer", fontFamily: "Space Mono, monospace", flexShrink: 0, marginLeft: 6 }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#ffd20815";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}
                      >
                        👁️ view
                      </button>
                    </div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      {(doc.keywords||[]).length===0
                        ? <span style={{fontSize:10,color:"#555",fontFamily:"Space Mono,monospace"}}>uploading...</span>
                        : (doc.keywords||[]).map(kw=>(
                            <span key={kw} style={{fontSize:10,padding:"2px 8px",borderRadius:20,background:"#111",color:"#888",border:"1px solid #1a1a1a"}}>{kw}</span>
                          ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loaded tables (RDBMS mode) */}
            {isRdbms&&Object.keys(tableData).length>0&&(
              <div style={{background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:6,padding:"12px 14px"}}>
                <div style={{fontSize:9,fontFamily:"Space Mono,monospace",letterSpacing:"0.1em",color:"#666",textTransform:"uppercase",marginBottom:10}}>Loaded tables</div>
                {Object.entries(tableData).map(([name,td])=>(
                  <div key={name} style={{marginBottom:8,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{flex:1,minWidth:0,marginRight:8}}>
                      <div style={{fontSize:10,color:"#4ade80",fontFamily:"Space Mono,monospace",marginBottom:2}}>{name}</div>
                      <div style={{fontSize:10,color:"#666",fontFamily:"Space Mono,monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{td.headers.join(", ")}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                      <span style={{fontSize:10,color:"#555",fontFamily:"Space Mono,monospace"}}>{td.rows.length} rows</span>
                      <button
                        onClick={() => openCSVInNewWindow(name, td.headers, td.rows)}
                        style={{ background: "transparent", border: "1px solid #222", color: "#4ade80", borderRadius: 4, padding: "2px 6px", fontSize: 9, cursor: "pointer", fontFamily: "Space Mono, monospace" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#4ade8015";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}
                      >
                        👁️ view
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Server panel */}
          <div style={{background:"#0d0d0d",border:"1px solid #1a1a1a",borderRadius:8,padding:20,display:"flex",flexDirection:"column",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <ServerIcon color="#999"/>
              <div style={{fontSize:10,fontFamily:"Space Mono,monospace",letterSpacing:"0.12em",color:"#999",textTransform:"uppercase"}}>Server</div>
            </div>
            <div style={{fontSize:11,color:"#666",fontFamily:"Space Mono,monospace"}}>no plaintext stored</div>
            {vault.length===0
              ? <div style={{fontSize:11,color:"#555",textAlign:"center",padding:"20px 0",fontFamily:"Space Mono,monospace"}}>empty</div>
              : <div style={{display:"flex",flexDirection:"column",gap:8}}>{vault.map(doc=><ServerDoc key={doc.name} doc={doc}/>)}</div>
            }
          </div>
        </div>

        <SearchConsole
          vault={vault} indexedKws={indexedKws} vaultMap={vaultMap}
          tableData={tableData} dbIndex={dbIndex}
          backendStatus={backendStatus} uploadStatus={uploadStatus}
          wordToId={wordToId} backendUrl={BACKENDS[backendKey]}
          qtype={qtype} setQtype={setQtype}
        />
      </div>
    </div>
  );
}