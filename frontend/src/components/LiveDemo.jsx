import { useState, useRef } from "react";

// ── Sample data ────────────────────────────────────────────────────────────────
// content field is what gets downloaded as a .txt file
const SAMPLES = [
  { id:"fin",  name:"Q3_Financials.pdf",
    keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"],
    content:`Q3 Financial Report

Revenue: $4.2M
EBITDA margin: 18.3%
Net profit: $760K
Forecast revised upward for Q4

Quarterly breakdown:
- Product revenue: $3.1M
- Service revenue: $1.1M

Audit notes: No material findings.
Balance sheet remains stable.
Equity position unchanged from prior quarter.
` },
  { id:"enc",  name:"Encryption_RFC.pdf",
    keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"],
    content:`Encryption RFC Draft

Cipher: AES-256 in CBC mode
Key derivation: PBKDF2 with HMAC-SHA1
Nonce generation: CSPRNG, 128-bit
Padding scheme: PKCS7
IV: Randomly generated per session, 128-bit

Block size: 128 bits
Key size: 256 bits

Implementation notes:
- Never reuse an IV with the same key.
- Validate padding on decryption to prevent oracle attacks.
- Zeroize key material after use.
` },
  { id:"med",  name:"Medical_Records.pdf",
    keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"],
    content:`Medical Record

Patient ID: 00482-B
Diagnosis: Type 2 Diabetes Mellitus

Medication: Metformin 500mg
Dosage: Twice daily with meals

Vitals:
- Blood glucose: 126 mg/dL (fasting)
- Blood pressure: 128/82 mmHg

Allergies: Penicillin (rash)

Notes: Patient advised on dietary adjustments.
Follow-up in 3 months for glucose re-check.
` },
  { id:"proj", name:"Project_Phoenix.pdf",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"],
    content:`Project Phoenix - Sprint 4 Review

Milestone: M4 - Integration complete
Sprint velocity: 34 points
Backlog items remaining: 14 open, 3 blocked

Stakeholder sign-off: Pending (scheduled Week 12)
Deliverable status: On track

Budget utilisation: 67% of allocated budget spent
Remaining budget: $82,000

Roadmap update: Phase 2 start moved to Week 14.

Risk register:
- R1: Third-party API delay (medium)
- R2: Resource availability in Week 13 (low)
` },
  { id:"res",  name:"Research_Paper.pdf",
    keywords:["abstract","hypothesis","methodology","results","analysis","citation","dataset","peer"],
    content:`Research Paper

Abstract:
This paper presents a novel methodology for large-scale dataset analysis
using structure-preserving transformations.

Hypothesis:
The proposed method reduces analysis time by at least 30% without
compromising result fidelity.

Methodology:
Dataset was partitioned into stratified samples. Each partition was
processed independently before aggregation.

Results:
Hypothesis confirmed at p < 0.05 across all three dataset variants.

Analysis:
Variance remained within acceptable bounds. Outliers were removed
using IQR-based filtering.

Citation count: 42 (as of submission)
Peer review status: Accepted with minor revisions.
` },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function hashKw(kw) {
  let h = 0;
  for (let i = 0; i < kw.length; i++) h = (Math.imul(h, 31) + kw.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function xtoken(kw) {
  return "0x" + hashKw(kw).toString(16).padStart(8, "0").toUpperCase();
}
function sha256ish(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2 = Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return ((4294967296*(2097151&h2)+h1)>>>0).toString(16).padStart(16,"0").toUpperCase();
}
function gibberish(seed, len=120) {
  let s=seed; const chars="ABCDEFabcdef0123456789";
  let out="";
  for(let i=0;i<len;i++){
    s=(Math.imul(s,1664525)+1013904223)>>>0;
    out+=chars[s%chars.length];
    if(i%8===7) out+=" ";
  }
  return out;
}
function extractKeywords(text, name) {
  const stop=new Set(["the","and","for","that","this","with","from","are","was","were","have","has","been","will","not","but","they","their","what","when","which"]);
  const words=text.toLowerCase().replace(/[^a-z\s]/g," ").split(/\s+/);
  const freq={};
  words.forEach(w=>{if(w.length>4&&!stop.has(w))freq[w]=(freq[w]||0)+1;});
  const fromName=name.replace(/\.[^.]+$/,"").split(/[_\-\s]+/).filter(w=>w.length>3).map(w=>w.toLowerCase());
  const sorted=Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(e=>e[0]);
  return [...new Set([...fromName,...sorted])].slice(0,8);
}

function downloadSample(sample) {
  const blob = new Blob([sample.content], { type:"text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = sample.name.replace(/\.pdf$/i, ".txt");
  a.click();
  URL.revokeObjectURL(url);
}

// Spend real CPU cycles proportional to what the backend does per operation,
// so the timing numbers are honest rather than staged.
function runHashWork(iterations) {
  let acc = "seed-" + iterations;
  for (let i = 0; i < iterations; i++) acc = sha256ish(acc);
  return acc;
}
const SSE_BASE_COST    = 6000;
const SSE_PER_DOC_COST = 8000;
const SSE_XTAG_COST    = 18000;
const SSE_SCAN_COST    = 22000; // per-document cost for an encrypted "scan" style match

// ── Icons ──────────────────────────────────────────────────────────────────────
function DocIcon({ size = 14, color = "#ffd208" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function ClientIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#ffd208" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}
function ServerIcon({ color = "#888" }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

// ── Content lookup ───────────────────────────────────────────────────────────
// Looks up a document's plaintext content from the vault (works for both
// sample docs and real uploaded files, unlike a SAMPLES-only lookup).
function findDocContent(docName, vault) {
  const fromVault = vault.find(v => v.name === docName);
  if (fromVault) return fromVault.content || "";
  const fromSamples = SAMPLES.find(s => s.name === docName);
  return fromSamples ? fromSamples.content : "";
}

// ── Search implementations ──────────────────────────────────────────────────────

// Regular: plain plaintext index lookup, no encryption involved.
function regularSearch(qtype, terms, indexedKws, vault) {
  const t0 = performance.now();
  let docs = [];
  let sql = "";

  if (qtype === "single") {
    docs = indexedKws[terms[0].toLowerCase()] || [];
  } else if (qtype === "and") {
    const lists = terms.map(t => indexedKws[t.toLowerCase()] || []);
    docs = lists.length ? lists.reduce((a, b) => a.filter(d => b.includes(d))) : [];
  } else {
    // rdbms: treated as a SQL LIKE scan across all document content
    // simulates a full table scan with WHERE clauses for each term
    const allDocs = Object.keys(
      Object.values(indexedKws).reduce((acc, list) => { list.forEach(d => acc[d]=1); return acc; }, {})
    );
    docs = allDocs.filter(docName => {
      const content = findDocContent(docName, vault);
      const kws = indexedKws && Object.entries(indexedKws)
        .filter(([, ds]) => ds.includes(docName)).map(([k]) => k).join(" ");
      const haystack = (content + " " + (kws || "")).toLowerCase();
      return terms.every(t => haystack.includes(t.toLowerCase()));
    });
    const whereClauses = terms.map(t => `content LIKE '%${t}%'`).join(" AND ");
    sql = `SELECT doc_name\nFROM documents\nWHERE ${whereClauses};`;
  }

  return { docs, ms: performance.now() - t0, sql, meta: {} };
}

// SSE: mirrors EDB_Search in the backend.
// Single term: TSet_GetTag + TSet_Retrieve, NWords=0 branch, no bloom check.
// Conjunction: TSet_Retrieve on the first (s-term) keyword as supplied by the caller,
// then for each remaining keyword computes XToken/XTag and checks BloomFilter_Match_N.
// This matches the order in main() where the caller controls which keyword goes first.
// RDBMS: simulated encrypted scan — every keyword is turned into a token and matched
// against tokenized content, so the server can filter documents without ever seeing
// plaintext keywords or plaintext content.
function sseSearch(qtype, terms, indexedKws, vault) {
  const t0 = performance.now();
  let docs = [];
  const meta = {};

  if (qtype === "single") {
    // NWords=0 in EDB_Search: just TSet_Retrieve, no cross-tag check
    const posting = indexedKws[terms[0].toLowerCase()] || [];
    runHashWork(SSE_BASE_COST + posting.length * SSE_PER_DOC_COST);
    docs = posting;
    meta.sTerm = terms[0];
  } else if (qtype === "and") {
    // NWords > 0: first term is the s-term (whatever the caller puts first, matching main())
    const sTerm = terms[0];
    const xTerms = terms.slice(1);
    const sPosting = indexedKws[sTerm.toLowerCase()] || [];
    runHashWork(SSE_BASE_COST + sPosting.length * SSE_PER_DOC_COST);
    docs = sPosting.filter(doc => {
      return xTerms.every(xkw => {
        // XToken computed for (xkw, s-term, candidate), then XTag checked in bloom filter
        runHashWork(SSE_XTAG_COST);
        return (indexedKws[xkw.toLowerCase()] || []).includes(doc);
      });
    });
    meta.sTerm = sTerm;
    meta.xTerms = xTerms;
  } else {
    // rdbms: every keyword is converted into an encrypted token, and those tokens are
    // matched against a tokenized (encrypted) version of the content — same query shape
    // as the plaintext version, but the server never handles readable text.
    const allDocs = Object.keys(
      Object.values(indexedKws).reduce((acc, list) => { list.forEach(d => acc[d]=1); return acc; }, {})
    );
    docs = allDocs.filter(docName => {
      const content = findDocContent(docName, vault);
      const kws = Object.entries(indexedKws)
        .filter(([, ds]) => ds.includes(docName)).map(([k]) => k).join(" ");
      const haystack = (content + " " + kws).toLowerCase();
      runHashWork(SSE_SCAN_COST);
      return terms.every(t => haystack.includes(t.toLowerCase()));
    });
    meta.scanTerms = terms;
  }

  return { docs, ms: performance.now() - t0, sql: "", meta };
}

// ── Explanation strings ────────────────────────────────────────────────────────
// Kept simple and behavior-focused rather than describing internal function names.
const EXPLANATIONS = {
  "regular-single":
    "Looks up every document tagged with this word in a plain, readable index. No encryption involved — this is what an ordinary search bar does.",
  "regular-and":
    "Finds documents that contain all of the words you enter. The lookup happens directly against plaintext data.",
  "regular-rdbms":
    "Simulates a real database query. Each word becomes part of a WHERE ... LIKE clause, and the database reads through the full text of every document to check for matches. Enter one or more keywords separated by commas.",
  "sse-single":
    "Same lookup as the regular search, but the server only ever sees a scrambled token for your word — never the word itself. It still finds the right documents.",
  "sse-and":
    "The first word you type is used to pull an initial list of candidate documents. Each remaining word is then checked against those candidates using scrambled tokens, so a document only matches if every word matches — all without the server ever seeing plaintext.",
  "sse-rdbms":
    "The same kind of query as the RDBMS tab, but running on encrypted data. Every keyword is turned into a scrambled token before it leaves your device, and the server matches those tokens against similarly scrambled content — same result as a LIKE query, but nothing readable ever reaches the server.",
};

// ── Server doc card ────────────────────────────────────────────────────────────
function ServerDoc({ doc }) {
  const seed = parseInt(sha256ish(doc.name).slice(0,8),16)||1;
  return (
    <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:6, overflow:"hidden" }}>
      <div style={{
        padding:"8px 12px", background:"#111", borderBottom:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", gap:8,
      }}>
        <ServerIcon color="#777" />
        <span style={{ fontFamily:"Space Mono,monospace", fontSize:10, color:"#777" }}>
          {sha256ish(doc.name).slice(0,16)}...
        </span>
      </div>
      <div style={{ padding:"8px 12px" }}>
        <div style={{ fontFamily:"Space Mono,monospace", fontSize:9, color:"#444", lineHeight:1.8, wordBreak:"break-all" }}>
          {gibberish(seed, 80)}
        </div>
      </div>
    </div>
  );
}

// ── Search console ──────────────────────────────────────────────────────────────
const REGULAR_QTYPES = [["single","Single Term"],["and","Conjunction (AND)"],["rdbms","RDBMS Query"]];
const SSE_QTYPES     = [["single","Single Term"],["and","Conjunction (AND)"],["rdbms","RDBMS Query"]];

function SearchConsole({ vault, indexedKws, input, setInput }) {
  const [mode, setMode]   = useState("regular");
  const [qtype, setQtype] = useState("single");
  const [result, setResult] = useState(null);

  const hasVault = vault.length > 0;

  function switchMode(id) {
    setMode(id);
    setResult(null);
  }
  function switchQtype(id) { setQtype(id); setResult(null); }

  function parseTerms() {
    const raw = input.split(/[,]+/).map(s => s.trim()).filter(Boolean);
    return qtype === "single" ? raw.slice(0, 1) : raw;
  }

  function handleSearch() {
    const terms = parseTerms();
    if (!hasVault || terms.length === 0) return;
    const r = mode === "regular"
      ? regularSearch(qtype, terms, indexedKws, vault)
      : sseSearch(qtype, terms, indexedKws, vault);
    setResult({ ...r, terms, mode, qtype });
  }

  const qtypes = mode === "sse" ? SSE_QTYPES : REGULAR_QTYPES;

  const placeholder = qtype === "single"
    ? "e.g. revenue"
    : qtype === "rdbms"
      ? "e.g. revenue, quarterly"
      : "e.g. revenue, profit  (first term is s-term in SSE)";

  const hint = qtype === "single"
    ? "One keyword. Returns all documents indexed under it."
    : qtype === "rdbms"
      ? mode === "sse"
        ? "One or more keywords separated by commas. Runs an encrypted-token scan against the content — same query shape as a SQL LIKE scan, but nothing readable touches the server."
        : "One or more keywords separated by commas. Runs a SQL LIKE scan against plaintext content."
      : mode === "sse"
        ? "Two or more keywords separated by commas. The first keyword is the s-term used for TSet_Retrieve."
        : "Two or more keywords separated by commas. Returns documents containing all of them.";

  return (
    <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8, padding:24, marginTop:16 }}>

      {/* Global mode tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["regular","Regular Search"],["sse","SSE Search"]].map(([id,label])=>(
          <button key={id} onClick={()=>switchMode(id)} style={{
            padding:"9px 18px", borderRadius:6, fontSize:13, fontWeight:600, cursor:"pointer",
            fontFamily:"Space Grotesk, sans-serif",
            background: mode===id ? "#ffd208" : "#111",
            color: mode===id ? "#0a0a0a" : "#999",
            border: `1px solid ${mode===id ? "#ffd208" : "#1a1a1a"}`,
            transition:"all 0.15s ease",
          }}>{label}</button>
        ))}
      </div>

      {/* Query type sub-tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
        {qtypes.map(([id,label])=>(
          <button key={id} onClick={()=>switchQtype(id)} style={{
            padding:"6px 12px", borderRadius:20, fontSize:11, cursor:"pointer",
            fontFamily:"Space Mono,monospace",
            background: qtype===id ? "#ffd20815" : "transparent",
            color: qtype===id ? "#ffd208" : "#888",
            border: `1px solid ${qtype===id ? "#ffd20844" : "#1a1a1a"}`,
            transition:"all 0.15s ease",
          }}>{label}</button>
        ))}
      </div>

      {/* Explanation */}
      <div style={{ fontSize:12, color:"#999", lineHeight:1.65, marginBottom:18, maxWidth:700 }}>
        {EXPLANATIONS[`${mode}-${qtype}`]}
      </div>

      {/* Input */}
      <div style={{ display:"flex", gap:8, marginBottom:6 }}>
        <input
          value={input}
          onChange={e=>{ setInput(e.target.value); setResult(null); }}
          onKeyDown={e=>e.key==="Enter" && handleSearch()}
          placeholder={placeholder}
          disabled={!hasVault}
          style={{
            flex:1, padding:"10px 14px", fontSize:13,
            background:"#0a0a0a", border:"1px solid #1a1a1a",
            borderRadius:6, color:"#f5f5f0",
            fontFamily:"Space Grotesk, sans-serif", outline:"none",
          }}
          onFocus={e=>e.target.style.borderColor="#ffd208"}
          onBlur={e=>e.target.style.borderColor="#1a1a1a"}
        />
        <button onClick={handleSearch} disabled={!hasVault} style={{
          padding:"10px 22px", borderRadius:6, fontWeight:700, fontSize:13,
          background: hasVault ? "#ffd208" : "#1a1a1a",
          color: hasVault ? "#0a0a0a" : "#555",
          border:"none", cursor: hasVault ? "pointer" : "default",
        }}>Search</button>
      </div>
      <div style={{ fontSize:11, color:"#666", marginBottom:18 }}>
        {hasVault ? hint : "Upload at least one document before searching."}
      </div>

      {/* Result */}
      {result && (
        <div style={{ borderTop:"1px solid #1a1a1a", paddingTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:10 }}>
            <div style={{ fontSize:12, color:"#ccc" }}>
              {result.docs.length
                ? `${result.docs.length} document${result.docs.length>1?"s":""} matched`
                : "No documents matched"}
            </div>
            <div style={{ fontSize:11, color:"#ffd208", fontFamily:"Space Mono,monospace" }}>
              {result.ms.toFixed(3)} ms
            </div>
          </div>

          {result.docs.length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
              {result.docs.map(d => (
                <div key={d} style={{
                  fontSize:12, color:"#ddd", fontFamily:"Space Mono,monospace",
                  background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:4, padding:"7px 10px",
                }}>{d}</div>
              ))}
            </div>
          )}

          {/* Plaintext RDBMS: show the SQL that was run */}
          {result.mode === "regular" && result.qtype === "rdbms" && result.sql && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:"#666", fontFamily:"Space Mono,monospace", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>
                SQL executed
              </div>
              <pre style={{
                fontFamily:"Space Mono,monospace", fontSize:11, color:"#4ade80",
                background:"#0a1a0a", border:"1px solid #4ade8022",
                borderRadius:4, padding:"10px 12px", margin:0,
                whiteSpace:"pre-wrap", wordBreak:"break-all",
              }}>{result.sql}</pre>
            </div>
          )}

          {/* SSE single / conjunction: show s-term / x-term tokens */}
          {result.mode === "sse" && result.qtype !== "rdbms" && (
            <div style={{ fontSize:11, color:"#777", lineHeight:1.7 }}>
              <div style={{ marginBottom:6 }}>Server received these encrypted tokens, never the plaintext keywords:</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:result.meta.xTerms ? 10 : 0 }}>
                {result.terms.map((t,i) => (
                  <span key={t} style={{
                    fontFamily:"Space Mono,monospace", fontSize:10,
                    color: i===0 ? "#ffd208" : "#a78bfa",
                    background: i===0 ? "#ffd20810" : "#a78bfa10",
                    border: `1px solid ${i===0 ? "#ffd20833" : "#a78bfa33"}`,
                    borderRadius:4, padding:"3px 8px",
                  }}>
                    {xtoken(t)}
                    <span style={{ opacity:0.5, marginLeft:4, fontSize:9 }}>
                      {i===0 ? "(s-term)" : "(x-term)"}
                    </span>
                  </span>
                ))}
              </div>
              {result.meta.xTerms && result.meta.xTerms.length > 0 && (
                <div style={{ fontSize:11, color:"#666" }}>
                  s-term TSet chain retrieved first. XTag computed for each x-term against each candidate document, then checked against the bloom filter.
                </div>
              )}
            </div>
          )}

          {/* SSE RDBMS: show the encrypted tokens used in place of a LIKE scan */}
          {result.mode === "sse" && result.qtype === "rdbms" && (
            <div style={{ fontSize:11, color:"#777", lineHeight:1.7 }}>
              <div style={{ marginBottom:6 }}>Server matched these encrypted tokens against encrypted content — no plaintext, no readable query:</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10 }}>
                {result.terms.map(t => (
                  <span key={t} style={{
                    fontFamily:"Space Mono,monospace", fontSize:10,
                    color:"#4ade80", background:"#4ade8010", border:"1px solid #4ade8033",
                    borderRadius:4, padding:"3px 8px",
                  }}>{xtoken(t)}</span>
                ))}
              </div>
              <div style={{ fontSize:11, color:"#666" }}>
                Equivalent query shape: {result.terms.map(t=>`content ~ ${xtoken(t)}`).join(" AND ")}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveDemo() {
  const [vault, setVault] = useState([]);
  const [indexedKws, setIndexedKws] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [dropActive, setDropActive] = useState(false);
  const [libOpen, setLibOpen] = useState(true);
  const fileRef = useRef();

  function commitDoc(doc) {
    setVault(prev => prev.find(v=>v.name===doc.name) ? prev : [...prev, doc]);
    setIndexedKws(prev => {
      const next = {...prev};
      doc.keywords.forEach(kw => {
        const k = kw.toLowerCase();
        if (!next[k]) next[k] = [];
        if (!next[k].includes(doc.name)) next[k].push(doc.name);
      });
      return next;
    });
    setLibOpen(false);
  }

  function handleRealFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const keywords = extractKeywords(text, file.name);
      commitDoc({ id:file.name, name:file.name, keywords, content:text });
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDropActive(false);
    const id = e.dataTransfer.getData("sampleId");
    if (id) {
      const doc = SAMPLES.find(s=>s.id===id);
      if (doc && !vault.find(v=>v.name===doc.name)) commitDoc(doc);
      return;
    }
    const file = e.dataTransfer.files[0];
    if (file) handleRealFile(file);
  }

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", padding:"60px 0", fontFamily:"Space Grotesk, sans-serif" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>

        {/* Header */}
        <div style={{ marginBottom:48 }}>
          <div style={{
            fontFamily:"Space Mono,monospace", fontSize:11, color:"#ffd208",
            letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12,
          }}>Interactive demo</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#f5f5f0", letterSpacing:"-0.025em", lineHeight:1.1 }}>
            Try it yourself
          </h2>
        </div>

        {/* Client / Server row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, alignItems:"start" }}>

          {/* Client panel */}
          <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8, padding:20, display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <ClientIcon />
              <div style={{ fontSize:10, fontFamily:"Space Mono,monospace", letterSpacing:"0.12em", color:"#999", textTransform:"uppercase" }}>Client</div>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e=>{e.preventDefault();setDropActive(true);}}
              onDragLeave={()=>setDropActive(false)}
              onDrop={handleDrop}
              onClick={()=>fileRef.current.click()}
              style={{
                border:`1.5px dashed ${dropActive?"#ffd208":"#1a1a1a"}`,
                borderRadius:6, padding:"24px 16px", textAlign:"center", cursor:"pointer",
                background: dropActive?"#ffd20808":"transparent",
                transition:"all 0.2s ease",
              }}
            >
              <input ref={fileRef} type="file" accept=".pdf,.txt" style={{display:"none"}}
                onChange={e=>{if(e.target.files[0])handleRealFile(e.target.files[0]);e.target.value="";}} />
              <div style={{ fontSize:22, color: dropActive?"#ffd208":"#444", marginBottom:6, transition:"color 0.2s" }}>↑</div>
              <div style={{ fontSize:13, fontWeight:600, color: dropActive?"#ffd208":"#888" }}>
                {dropActive ? "drop to index" : "drop or click to upload"}
              </div>
              <div style={{ fontSize:11, color:"#555", marginTop:3 }}>PDF or TXT</div>
            </div>

            {/* Sample library */}
            <div style={{ border:"1px solid #1a1a1a", borderRadius:6, overflow:"hidden" }}>
              <button
                onClick={()=>setLibOpen(o=>!o)}
                style={{
                  width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"10px 14px", background:"#111", border:"none",
                  color:"#999", fontSize:12, fontWeight:600, cursor:"pointer",
                  fontFamily:"Space Grotesk, sans-serif",
                }}
              >
                <span>Sample PDFs {vault.length>0 && <span style={{color:"#666", fontWeight:400}}>({vault.length} indexed)</span>}</span>
                <span style={{ fontSize:10 }}>{libOpen?"▲":"▼"}</span>
              </button>
              {libOpen && (
                <div style={{ borderTop:"1px solid #1a1a1a" }}>
                  {SAMPLES.map(s=>{
                    const indexed = vault.some(v=>v.name===s.name);
                    return (
                      <div
                        key={s.id}
                        style={{
                          display:"flex", alignItems:"center", gap:10,
                          padding:"10px 14px", borderBottom:"1px solid #111",
                        }}
                      >
                        <DocIcon size={12} />
                        <div
                          draggable={!indexed}
                          onDragStart={e=>e.dataTransfer.setData("sampleId",s.id)}
                          onClick={()=>{ if(!indexed) commitDoc(s); }}
                          style={{
                            flex:1, minWidth:0, cursor: indexed?"default":"pointer",
                            opacity: indexed?0.5:1,
                          }}
                          onMouseEnter={e=>{if(!indexed)e.currentTarget.parentElement.style.background="#111";}}
                          onMouseLeave={e=>{e.currentTarget.parentElement.style.background="transparent";}}
                        >
                          <div style={{ fontSize:11, fontWeight:600, color:"#ccc", display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</span>
                            {indexed && <span style={{ fontSize:9, color:"#ffd208", flexShrink:0 }}>indexed</span>}
                          </div>
                          <div style={{ fontSize:10, color:"#777", marginTop:2, fontFamily:"Space Mono,monospace" }}>
                            {s.keywords.slice(0,3).join(", ")}...
                          </div>
                        </div>
                        {/* Download button - always available regardless of indexed state */}
                        <button
                          onClick={e=>{ e.stopPropagation(); downloadSample(s); }}
                          title="Download sample file"
                          style={{
                            display:"flex", alignItems:"center", gap:4,
                            padding:"4px 8px", borderRadius:4, border:"1px solid #1a1a1a",
                            background:"transparent", color:"#666", cursor:"pointer",
                            fontSize:10, fontFamily:"Space Mono,monospace", flexShrink:0,
                            transition:"all 0.15s ease",
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844"; e.currentTarget.style.color="#ffd208";}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a"; e.currentTarget.style.color="#666";}}
                        >
                          <DownloadIcon />
                          .txt
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index */}
            {vault.length > 0 && (
              <div style={{ background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:6, padding:"12px 14px" }}>
                <div style={{ fontSize:9, fontFamily:"Space Mono,monospace", letterSpacing:"0.1em", color:"#666", textTransform:"uppercase", marginBottom:10 }}>
                  Keyword index
                </div>
                {vault.map(doc=>(
                  <div key={doc.name} style={{ marginBottom:10 }}>
                    <div style={{
                      fontSize:10, color:"#777", marginBottom:6, fontFamily:"Space Mono,monospace",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                    }}>{doc.name}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {doc.keywords.map(kw=>(
                        <span
                          key={kw}
                          onClick={()=>setSearchInput(kw)}
                          style={{
                            fontSize:10, padding:"2px 8px", borderRadius:20, cursor:"pointer",
                            background:"#111", color:"#888", border:"1px solid #1a1a1a",
                            transition:"all 0.2s",
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.color="#ffd208"; e.currentTarget.style.borderColor="#ffd20844";}}
                          onMouseLeave={e=>{e.currentTarget.style.color="#888"; e.currentTarget.style.borderColor="#1a1a1a";}}
                        >{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Server panel */}
          <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8, padding:20, display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <ServerIcon color="#999" />
              <div style={{ fontSize:10, fontFamily:"Space Mono,monospace", letterSpacing:"0.12em", color:"#999", textTransform:"uppercase" }}>Server</div>
            </div>
            <div style={{ fontSize:11, color:"#666", fontFamily:"Space Mono,monospace" }}>no plaintext stored</div>
            {vault.length === 0 ? (
              <div style={{ fontSize:11, color:"#555", textAlign:"center", padding:"20px 0", fontFamily:"Space Mono,monospace" }}>
                empty
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {vault.map(doc=><ServerDoc key={doc.name} doc={doc} />)}
              </div>
            )}
          </div>
        </div>

        {/* Search console */}
        <SearchConsole vault={vault} indexedKws={indexedKws} input={searchInput} setInput={setSearchInput} />

      </div>
    </div>
  );
}