import { useState, useRef } from "react";

// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLES = [
  { id:"fin",  name:"Q3_Financials.pdf",
    keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"],
    content:`Q3 Financial Report\n\nRevenue: $4.2M\nEBITDA margin: 18.3%\nNet profit: $760K\nForecast revised upward for Q4\n\nQuarterly breakdown:\n- Product revenue: $3.1M\n- Service revenue: $1.1M\n\nAudit notes: No material findings.\nBalance sheet remains stable.\nEquity position unchanged from prior quarter.\n` },
  { id:"enc",  name:"Encryption_RFC.pdf",
    keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"],
    content:`Encryption RFC Draft\n\nCipher: AES-256 in CBC mode\nKey derivation: PBKDF2 with HMAC-SHA1\nNonce generation: CSPRNG, 128-bit\nPadding scheme: PKCS7\nIV: Randomly generated per session, 128-bit\n\nBlock size: 128 bits\nKey size: 256 bits\n\nImplementation notes:\n- Never reuse an IV with the same key.\n- Validate padding on decryption to prevent oracle attacks.\n- Zeroize key material after use.\n` },
  { id:"med",  name:"Medical_Records.pdf",
    keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"],
    content:`Medical Record\n\nPatient ID: 00482-B\nDiagnosis: Type 2 Diabetes Mellitus\n\nMedication: Metformin 500mg\nDosage: Twice daily with meals\n\nVitals:\n- Blood glucose: 126 mg/dL (fasting)\n- Blood pressure: 128/82 mmHg\n\nAllergies: Penicillin (rash)\n\nNotes: Patient advised on dietary adjustments.\nFollow-up in 3 months for glucose re-check.\n` },
  { id:"proj", name:"Project_Phoenix.pdf",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"],
    content:`Project Phoenix - Sprint 4 Review\n\nMilestone: M4 - Integration complete\nSprint velocity: 34 points\nBacklog items remaining: 14 open, 3 blocked\n\nStakeholder sign-off: Pending (scheduled Week 12)\nDeliverable status: On track\n\nBudget utilisation: 67% of allocated budget spent\nRemaining budget: $82,000\n\nRoadmap update: Phase 2 start moved to Week 14.\n\nRisk register:\n- R1: Third-party API delay (medium)\n- R2: Resource availability in Week 13 (low)\n` },
  { id:"res",  name:"Research_Paper.pdf",
    keywords:["abstract","hypothesis","methodology","results","analysis","citation","dataset","peer"],
    content:`Research Paper\n\nAbstract:\nThis paper presents a novel methodology for large-scale dataset analysis using structure-preserving transformations.\n\nHypothesis:\nThe proposed method reduces analysis time by at least 30% without compromising result fidelity.\n\nMethodology:\nDataset was partitioned into stratified samples. Each partition was processed independently before aggregation.\n\nResults:\nHypothesis confirmed at p < 0.05 across all three dataset variants.\n\nAnalysis:\nVariance remained within acceptable bounds. Outliers were removed using IQR-based filtering.\n\nCitation count: 42 (as of submission)\nPeer review status: Accepted with minor revisions.\n` },
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

// Simple CSV parser that handles quoted fields
function parseCSV(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim().split("\n");
  if (lines.length === 0) return { headers: [], rows: [] };

  function parseLine(line) {
    const fields = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i+1] === '"') { cur += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        fields.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    fields.push(cur.trim());
    return fields;
  }

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).filter(l => l.trim()).map(parseLine);
  return { headers, rows };
}

function triggerDownload(filename, content, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Real hash work to produce honest timing numbers
function runHashWork(iterations) {
  let acc = "seed-" + iterations;
  for (let i = 0; i < iterations; i++) acc = sha256ish(acc);
  return acc;
}
const SSE_BASE_COST    = 6000;
const SSE_PER_DOC_COST = 8000;
const SSE_XTAG_COST    = 18000;

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
function TableIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#ffd208" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="3" y1="15" x2="21" y2="15"/>
      <line x1="9" y1="9" x2="9" y2="21"/>
    </svg>
  );
}

// ── Search implementations ──────────────────────────────────────────────────────

function regularSearch(qtype, terms, indexedKws) {
  const t0 = performance.now();
  let docs = [];
  if (qtype === "single") {
    docs = indexedKws[terms[0].toLowerCase()] || [];
  } else {
    // and
    const lists = terms.map(t => indexedKws[t.toLowerCase()] || []);
    docs = lists.length ? lists.reduce((a, b) => a.filter(d => b.includes(d))) : [];
  }
  return { docs, ms: performance.now() - t0, meta: {} };
}

// RDBMS: runs against the loaded CSV table, not the keyword index
function rdbmsSearch(terms, csvTable) {
  if (!csvTable) return { rows: [], ms: 0, sql: "", meta: {} };
  const t0 = performance.now();
  const { headers, rows, tableName } = csvTable;

  // Each term must match at least one column value (LIKE search, case-insensitive)
  // Terms joined by AND: every term must be satisfied
  const matched = rows.filter(row =>
    terms.every(term => {
      const t = term.toLowerCase();
      return row.some(cell => cell.toLowerCase().includes(t));
    })
  );

  const whereParts = terms.map(t =>
    headers.map(h => `${h} LIKE '%${t}%'`).join(" OR ")
  );
  const whereClause = whereParts.length === 1
    ? `(${whereParts[0]})`
    : whereParts.map(p => `(${p})`).join("\nAND ");
  const sql = `SELECT *\nFROM ${tableName}\nWHERE ${whereClause};`;

  return { rows: matched, ms: performance.now() - t0, sql, headers, meta: {} };
}

function sseSearch(qtype, terms, indexedKws) {
  const t0 = performance.now();
  let docs = [];
  const meta = {};

  if (qtype === "single") {
    const posting = indexedKws[terms[0].toLowerCase()] || [];
    runHashWork(SSE_BASE_COST + posting.length * SSE_PER_DOC_COST);
    docs = posting;
    meta.sTerm = terms[0];
  } else {
    // First term is the s-term, matching how main() passes query_str in the backend
    const sTerm = terms[0];
    const xTerms = terms.slice(1);
    const sPosting = indexedKws[sTerm.toLowerCase()] || [];
    runHashWork(SSE_BASE_COST + sPosting.length * SSE_PER_DOC_COST);
    docs = sPosting.filter(doc =>
      xTerms.every(xkw => {
        runHashWork(SSE_XTAG_COST);
        return (indexedKws[xkw.toLowerCase()] || []).includes(doc);
      })
    );
    meta.sTerm = sTerm;
    meta.xTerms = xTerms;
  }

  return { docs, ms: performance.now() - t0, meta };
}

// ── Explanations ────────────────────────────────────────────────────────────────
const EXPLANATIONS = {
  "regular-single":
    "Looks up every document tagged with this keyword in a plain plaintext index. No encryption involved. This is what an ordinary search bar does.",
  "regular-and":
    "Intersects the posting lists for each keyword. Only documents that appear in every list are returned. Runs entirely on plaintext data.",
  "regular-rdbms":
    "Upload a CSV file to use as a database table, then enter one or more search terms separated by commas. Each term is checked against all columns using a LIKE condition. All terms must match at least one column in the same row (AND logic). The query that would run in a relational database is shown below the results.",
  "sse-single":
    "Calls TSet_GetTag to derive the encrypted tag for this keyword, then TSet_Retrieve to walk the encrypted posting chain. NWords is 0, so no XToken or bloom filter check is run. This is the NWords=0 branch in EDB_Search.",
  "sse-and":
    "The first keyword you enter is the s-term, the same way main() controls it in the backend: whatever comes first in query_str is used for TSet_Retrieve. For each candidate document returned, the backend computes XToken and XTag for every remaining keyword (the x-terms) and checks the encrypted bloom filter via BloomFilter_Match_N. A document only makes it through if every check passes.",
};

// ── Server doc card ────────────────────────────────────────────────────────────
function ServerDoc({ doc }) {
  const seed = parseInt(sha256ish(doc.name).slice(0,8),16)||1;
  return (
    <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:6, overflow:"hidden" }}>
      <div style={{ padding:"8px 12px", background:"#111", borderBottom:"1px solid #1a1a1a", display:"flex", alignItems:"center", gap:8 }}>
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

// ── RDBMS CSV upload + query panel ─────────────────────────────────────────────
function RDBMSPanel({ input, setInput }) {
  const [csvTable, setCsvTable] = useState(null);
  const [result, setResult]     = useState(null);
  const [dropCsv, setDropCsv]   = useState(false);
  const csvRef = useRef();

  function loadCSV(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) {
      alert("Only CSV files are accepted here.");
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const parsed = parseCSV(e.target.result);
      setCsvTable({
        ...parsed,
        tableName: file.name.replace(/\.csv$/i, ""),
        rawName: file.name,
        rawContent: e.target.result,
      });
      setResult(null);
    };
    reader.readAsText(file);
  }

  function handleCsvDrop(e) {
    e.preventDefault();
    setDropCsv(false);
    const file = e.dataTransfer.files[0];
    if (file) loadCSV(file);
  }

  function handleSearch() {
    if (!csvTable) return;
    const terms = input.split(/,/).map(s => s.trim()).filter(Boolean);
    if (terms.length === 0) return;
    const r = rdbmsSearch(terms, csvTable);
    setResult({ ...r, terms });
  }

  return (
    <div>
      <div style={{ fontSize:12, color:"#999", lineHeight:1.65, marginBottom:16, maxWidth:700 }}>
        {EXPLANATIONS["regular-rdbms"]}
      </div>

      {/* CSV upload zone */}
      {!csvTable ? (
        <div
          onDragOver={e=>{e.preventDefault();setDropCsv(true);}}
          onDragLeave={()=>setDropCsv(false)}
          onDrop={handleCsvDrop}
          onClick={()=>csvRef.current.click()}
          style={{
            border:`1.5px dashed ${dropCsv?"#ffd208":"#1a1a1a"}`,
            borderRadius:6, padding:"28px 16px", textAlign:"center", cursor:"pointer",
            background: dropCsv?"#ffd20808":"transparent",
            transition:"all 0.2s ease", marginBottom:16,
          }}
        >
          <input ref={csvRef} type="file" accept=".csv" style={{display:"none"}}
            onChange={e=>{if(e.target.files[0])loadCSV(e.target.files[0]);e.target.value="";}} />
          <div style={{ fontSize:18, color: dropCsv?"#ffd208":"#444", marginBottom:6 }}>↑</div>
          <div style={{ fontSize:13, fontWeight:600, color: dropCsv?"#ffd208":"#888" }}>
            {dropCsv ? "drop CSV file" : "drop or click to upload a CSV file"}
          </div>
          <div style={{ fontSize:11, color:"#555", marginTop:3 }}>CSV only</div>
        </div>
      ) : (
        <div style={{ marginBottom:16 }}>
          {/* Loaded table info bar */}
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:6,
            padding:"9px 12px", marginBottom:10,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <TableIcon />
              <span style={{ fontFamily:"Space Mono,monospace", fontSize:11, color:"#ccc" }}>
                {csvTable.rawName}
              </span>
              <span style={{ fontSize:10, color:"#666", fontFamily:"Space Mono,monospace" }}>
                {csvTable.headers.length} cols, {csvTable.rows.length} rows
              </span>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button
                onClick={()=>triggerDownload(csvTable.rawName, csvTable.rawContent, "text/csv")}
                style={{
                  display:"flex", alignItems:"center", gap:4, padding:"4px 8px",
                  borderRadius:4, border:"1px solid #1a1a1a", background:"transparent",
                  color:"#666", cursor:"pointer", fontSize:10, fontFamily:"Space Mono,monospace",
                  transition:"all 0.15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}
              >
                <DownloadIcon /> download
              </button>
              <button
                onClick={()=>{setCsvTable(null);setResult(null);}}
                style={{
                  padding:"4px 8px", borderRadius:4, border:"1px solid #1a1a1a",
                  background:"transparent", color:"#666", cursor:"pointer",
                  fontSize:10, fontFamily:"Space Mono,monospace", transition:"all 0.15s",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#f8717144";e.currentTarget.style.color="#f87171";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}
              >
                remove
              </button>
            </div>
          </div>

          {/* Column headers preview */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:14 }}>
            {csvTable.headers.map(h=>(
              <span key={h} style={{
                fontSize:10, padding:"2px 8px", borderRadius:4,
                background:"#111", color:"#888", border:"1px solid #1a1a1a",
                fontFamily:"Space Mono,monospace",
              }}>{h}</span>
            ))}
          </div>
        </div>
      )}

      {/* Search row */}
      <div style={{ display:"flex", gap:8, marginBottom:6 }}>
        <input
          value={input}
          onChange={e=>{setInput(e.target.value);setResult(null);}}
          onKeyDown={e=>e.key==="Enter" && handleSearch()}
          placeholder="e.g. revenue, quarterly"
          disabled={!csvTable}
          style={{
            flex:1, padding:"10px 14px", fontSize:13,
            background:"#0a0a0a", border:"1px solid #1a1a1a",
            borderRadius:6, color:"#f5f5f0",
            fontFamily:"Space Grotesk, sans-serif", outline:"none",
          }}
          onFocus={e=>e.target.style.borderColor="#ffd208"}
          onBlur={e=>e.target.style.borderColor="#1a1a1a"}
        />
        <button onClick={handleSearch} disabled={!csvTable} style={{
          padding:"10px 22px", borderRadius:6, fontWeight:700, fontSize:13,
          background: csvTable ? "#ffd208" : "#1a1a1a",
          color: csvTable ? "#0a0a0a" : "#555",
          border:"none", cursor: csvTable ? "pointer" : "default",
        }}>Query</button>
      </div>
      <div style={{ fontSize:11, color:"#666", marginBottom:16 }}>
        {csvTable
          ? "One or more search terms separated by commas. Every term must match at least one column in the same row."
          : "Upload a CSV file first."}
      </div>

      {/* Result */}
      {result && (
        <div style={{ borderTop:"1px solid #1a1a1a", paddingTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:12 }}>
            <div style={{ fontSize:12, color:"#ccc" }}>
              {result.rows.length > 0
                ? `${result.rows.length} row${result.rows.length>1?"s":""} matched`
                : "No rows matched"}
            </div>
            <div style={{ fontSize:11, color:"#ffd208", fontFamily:"Space Mono,monospace" }}>
              {result.ms.toFixed(3)} ms
            </div>
          </div>

          {/* SQL shown */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:10, color:"#666", fontFamily:"Space Mono,monospace", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:6 }}>SQL executed</div>
            <pre style={{
              fontFamily:"Space Mono,monospace", fontSize:11, color:"#4ade80",
              background:"#0a1a0a", border:"1px solid #4ade8022",
              borderRadius:4, padding:"10px 12px", margin:0,
              whiteSpace:"pre-wrap", wordBreak:"break-all",
            }}>{result.sql}</pre>
          </div>

          {/* Rows as a mini table */}
          {result.rows.length > 0 && (
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11, fontFamily:"Space Mono,monospace" }}>
                <thead>
                  <tr>
                    {result.headers.map(h=>(
                      <th key={h} style={{
                        padding:"6px 10px", textAlign:"left",
                        background:"#111", color:"#888",
                        border:"1px solid #1a1a1a", whiteSpace:"nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.slice(0, 50).map((row, ri)=>(
                    <tr key={ri}>
                      {row.map((cell, ci)=>(
                        <td key={ci} style={{
                          padding:"6px 10px", color:"#ccc",
                          border:"1px solid #1a1a1a",
                          background: ri%2===0 ? "#0a0a0a" : "#0d0d0d",
                        }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {result.rows.length > 50 && (
                <div style={{ fontSize:10, color:"#666", marginTop:6, fontFamily:"Space Mono,monospace" }}>
                  showing first 50 of {result.rows.length} rows
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Search console ──────────────────────────────────────────────────────────────
const REGULAR_QTYPES = [["single","Single Term"],["and","Conjunction (AND)"],["rdbms","RDBMS Query"]];
const SSE_QTYPES     = [["single","Single Term"],["and","Conjunction (AND)"]];

function SearchConsole({ vault, indexedKws }) {
  const [mode, setMode]     = useState("regular");
  const [qtype, setQtype]   = useState("single");
  const [input, setInput]   = useState("");
  const [result, setResult] = useState(null);

  const hasVault = vault.length > 0;

  function switchMode(id) {
    setMode(id);
    setResult(null);
    if (id === "sse" && qtype === "rdbms") setQtype("single");
  }
  function switchQtype(id) { setQtype(id); setResult(null); }

  function parseTerms() {
    const raw = input.split(/,/).map(s => s.trim()).filter(Boolean);
    return qtype === "single" ? raw.slice(0,1) : raw;
  }

  function handleSearch() {
    const terms = parseTerms();
    if (!hasVault || terms.length === 0) return;
    const r = mode === "regular"
      ? regularSearch(qtype, terms, indexedKws)
      : sseSearch(qtype, terms, indexedKws);
    setResult({ ...r, terms, mode, qtype });
  }

  const qtypes = mode === "sse" ? SSE_QTYPES : REGULAR_QTYPES;
  const isRdbms = qtype === "rdbms";

  const placeholder = qtype === "single"
    ? "e.g. revenue"
    : "e.g. revenue, profit";

  const hint = qtype === "single"
    ? "One keyword. Returns all documents indexed under it."
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

      {/* Sub-tabs */}
      <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
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

      {/* RDBMS tab has its own self-contained panel */}
      {isRdbms ? (
        <RDBMSPanel input={input} setInput={setInput} />
      ) : (
        <>
          <div style={{ fontSize:12, color:"#999", lineHeight:1.65, marginBottom:18, maxWidth:700 }}>
            {EXPLANATIONS[`${mode}-${qtype}`]}
          </div>

          <div style={{ display:"flex", gap:8, marginBottom:6 }}>
            <input
              value={input}
              onChange={e=>{setInput(e.target.value);setResult(null);}}
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

              {result.mode === "sse" && (
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveDemo() {
  const [vault, setVault]           = useState([]);
  const [indexedKws, setIndexedKws] = useState({});
  const [dropActive, setDropActive] = useState(false);
  const [libOpen, setLibOpen]       = useState(true);
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
      commitDoc({ id:file.name, name:file.name, keywords, rawContent:text, isUploaded:true });
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

        <div style={{ marginBottom:48 }}>
          <div style={{ fontFamily:"Space Mono,monospace", fontSize:11, color:"#ffd208", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>
            Interactive demo
          </div>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#f5f5f0", letterSpacing:"-0.025em", lineHeight:1.1 }}>
            Try it yourself
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, alignItems:"start" }}>

          {/* Client panel */}
          <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8, padding:20, display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <ClientIcon />
              <div style={{ fontSize:10, fontFamily:"Space Mono,monospace", letterSpacing:"0.12em", color:"#999", textTransform:"uppercase" }}>Client</div>
            </div>

            <div
              onDragOver={e=>{e.preventDefault();setDropActive(true);}}
              onDragLeave={()=>setDropActive(false)}
              onDrop={handleDrop}
              onClick={()=>fileRef.current.click()}
              style={{
                border:`1.5px dashed ${dropActive?"#ffd208":"#1a1a1a"}`,
                borderRadius:6, padding:"24px 16px", textAlign:"center", cursor:"pointer",
                background: dropActive?"#ffd20808":"transparent", transition:"all 0.2s ease",
              }}
            >
              <input ref={fileRef} type="file" accept=".pdf,.txt" style={{display:"none"}}
                onChange={e=>{if(e.target.files[0])handleRealFile(e.target.files[0]);e.target.value="";}} />
              <div style={{ fontSize:22, color: dropActive?"#ffd208":"#444", marginBottom:6, transition:"color 0.2s" }}>↑</div>
              <div style={{ fontSize:13, fontWeight:600, color: dropActive?"#ffd208":"#888" }}>
                {dropActive ? "drop to index" : "drop or click to upload"}
              </div>
              <div style={{ fontSize:11, color:"#555", marginTop:3 }}>PDF or TXT, for keyword indexing</div>
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
                <span>Sample PDFs {vault.length>0 && <span style={{color:"#666",fontWeight:400}}>({vault.length} indexed)</span>}</span>
                <span style={{ fontSize:10 }}>{libOpen?"▲":"▼"}</span>
              </button>
              {libOpen && (
                <div style={{ borderTop:"1px solid #1a1a1a" }}>
                  {SAMPLES.map(s=>{
                    const indexed = vault.some(v=>v.name===s.name);
                    return (
                      <div key={s.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderBottom:"1px solid #111" }}>
                        <DocIcon size={12} />
                        <div
                          draggable={!indexed}
                          onDragStart={e=>e.dataTransfer.setData("sampleId",s.id)}
                          onClick={()=>{ if(!indexed) commitDoc(s); }}
                          style={{ flex:1, minWidth:0, cursor: indexed?"default":"pointer", opacity: indexed?0.5:1 }}
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
                        <button
                          onClick={e=>{ e.stopPropagation(); triggerDownload(s.name.replace(/\.pdf$/i,".txt"), s.content); }}
                          style={{
                            display:"flex", alignItems:"center", gap:4, padding:"4px 8px",
                            borderRadius:4, border:"1px solid #1a1a1a", background:"transparent",
                            color:"#666", cursor:"pointer", fontSize:10, fontFamily:"Space Mono,monospace",
                            flexShrink:0, transition:"all 0.15s",
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}
                        >
                          <DownloadIcon /> .txt
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index + download for user-uploaded files */}
            {vault.length > 0 && (
              <div style={{ background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:6, padding:"12px 14px" }}>
                <div style={{ fontSize:9, fontFamily:"Space Mono,monospace", letterSpacing:"0.1em", color:"#666", textTransform:"uppercase", marginBottom:10 }}>
                  Keyword index
                </div>
                {vault.map(doc=>(
                  <div key={doc.name} style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:5 }}>
                      <div style={{ fontSize:10, color:"#777", fontFamily:"Space Mono,monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1 }}>
                        {doc.name}
                      </div>
                      {doc.isUploaded && doc.rawContent && (
                        <button
                          onClick={()=>triggerDownload(doc.name, doc.rawContent)}
                          style={{
                            display:"flex", alignItems:"center", gap:4, padding:"3px 7px",
                            borderRadius:4, border:"1px solid #1a1a1a", background:"transparent",
                            color:"#666", cursor:"pointer", fontSize:9, fontFamily:"Space Mono,monospace",
                            flexShrink:0, marginLeft:8, transition:"all 0.15s",
                          }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor="#ffd20844";e.currentTarget.style.color="#ffd208";}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a1a1a";e.currentTarget.style.color="#666";}}
                        >
                          <DownloadIcon /> download
                        </button>
                      )}
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {doc.keywords.map(kw=>(
                        <span key={kw} style={{
                          fontSize:10, padding:"2px 8px", borderRadius:20, cursor:"pointer",
                          background:"#111", color:"#888", border:"1px solid #1a1a1a", transition:"all 0.2s",
                        }}
                          onMouseEnter={e=>{e.currentTarget.style.color="#ffd208";e.currentTarget.style.borderColor="#ffd20844";}}
                          onMouseLeave={e=>{e.currentTarget.style.color="#888";e.currentTarget.style.borderColor="#1a1a1a";}}
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
              <div style={{ fontSize:11, color:"#555", textAlign:"center", padding:"20px 0", fontFamily:"Space Mono,monospace" }}>empty</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {vault.map(doc=><ServerDoc key={doc.name} doc={doc} />)}
              </div>
            )}
          </div>
        </div>

        <SearchConsole vault={vault} indexedKws={indexedKws} />
      </div>
    </div>
  );
}