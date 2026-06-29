import { useState, useRef } from "react";

// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLES = [
  { id:"fin",  name:"Q3_Financials.pdf",
    keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"] },
  { id:"enc",  name:"Encryption_RFC.pdf",
    keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"] },
  { id:"med",  name:"Medical_Records.pdf",
    keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"] },
  { id:"proj", name:"Project_Phoenix.pdf",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"] },
  { id:"res",  name:"Research_Paper.pdf",
    keywords:["abstract","hypothesis","methodology","results","analysis","citation","dataset","peer"] },
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

// Real (small scale) repeated hashing used to give the SSE path an honest,
// measurable cost instead of a fake delay. The iteration count below is
// chosen to roughly track the operations the backend performs per step:
// a TSet retrieval scans one chain entry per candidate id, and a
// conjunction check runs one XToken/XTag/Bloom check per candidate per
// extra keyword. We are not running the lattice math from the backend
// here, just spending comparable, real CPU time so the timer is genuine.
function runHashWork(iterations) {
  let acc = "seed-" + iterations;
  for (let i = 0; i < iterations; i++) {
    acc = sha256ish(acc);
  }
  return acc;
}

const SSE_BASE_COST      = 6000;   // TSet tag setup, paid once per keyword retrieved
const SSE_PER_DOC_COST   = 8000;   // cost of pulling one id out of a TSet chain
const SSE_CROSSTAG_COST  = 18000;  // cost of one XToken/XTag/Bloom check against a candidate

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

// ── Search implementations ──────────────────────────────────────────────────────
// "Regular" is a plain lookup against the plaintext keyword index, the same
// thing any ordinary database does. "SSE" mirrors the steps EDB_Search takes
// in the backend: retrieve the posting list for one keyword from the TSet,
// then, for a conjunction, check every remaining candidate against the
// encrypted index for each other keyword. Disjunction has no equivalent in
// the backend's OXT scheme, so it is built by repeating the single term
// retrieval for each keyword and unioning the results client side.

function regularSearch(qtype, terms, indexedKws) {
  const t0 = performance.now();
  let docs = [];

  if (qtype === "single") {
    docs = indexedKws[terms[0]] || [];
  } else if (qtype === "and") {
    const lists = terms.map(t => indexedKws[t] || []);
    docs = lists.length ? lists.reduce((a, b) => a.filter(d => b.includes(d))) : [];
  } else {
    const seen = new Set();
    terms.forEach(t => (indexedKws[t] || []).forEach(d => seen.add(d)));
    docs = [...seen];
  }

  return { docs, ms: performance.now() - t0, meta: {} };
}

function sseSearch(qtype, terms, indexedKws) {
  const t0 = performance.now();
  let docs = [];
  const meta = {};

  if (qtype === "single") {
    const posting = indexedKws[terms[0]] || [];
    runHashWork(SSE_BASE_COST + posting.length * SSE_PER_DOC_COST);
    docs = posting;
  } else if (qtype === "and") {
    const withList = terms.map(t => ({ term: t, list: indexedKws[t] || [] }));
    withList.sort((a, b) => a.list.length - b.list.length);
    const [anchor, ...rest] = withList;
    runHashWork(SSE_BASE_COST + anchor.list.length * SSE_PER_DOC_COST);
    docs = anchor.list.filter(doc => rest.every(r => {
      runHashWork(SSE_CROSSTAG_COST);
      return r.list.includes(doc);
    }));
    meta.anchor = anchor.term;
  } else {
    const seen = new Set();
    terms.forEach(t => {
      const posting = indexedKws[t] || [];
      runHashWork(SSE_BASE_COST + posting.length * SSE_PER_DOC_COST);
      posting.forEach(d => seen.add(d));
    });
    docs = [...seen];
  }

  return { docs, ms: performance.now() - t0, meta };
}

const EXPLANATIONS = {
  "regular-single": "Looks up every document tagged with this keyword in a plain index. Nothing is encrypted, this is what an ordinary search bar does.",
  "regular-and": "Looks up the documents for each keyword separately, then keeps only the documents that show up in every list.",
  "regular-or": "Looks up the documents for each keyword separately, then combines every list into one result.",
  "sse-single": "Retrieves the encrypted list of documents tagged with this keyword from the TSet, the same lookup TSet_Retrieve performs in the backend. There is only one keyword, so no cross tag check is needed.",
  "sse-and": "Picks the keyword with the smallest posting list as the anchor term, retrieves its encrypted entries from the TSet, then checks every candidate document against the encrypted index for each remaining keyword. A document only matches if every cross tag check passes, which mirrors the conjunction logic in EDB_Search.",
  "sse-or": "The encrypted scheme only supports conjunctive queries directly, there is no single cross tag check that means any of these. So the client retrieves each keyword's encrypted entries separately and unions the results.",
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
function SearchConsole({ vault, indexedKws, input, setInput }) {
  const [mode, setMode] = useState("regular");
  const [qtype, setQtype] = useState("single");
  const [result, setResult] = useState(null);

  const hasVault = vault.length > 0;

  function parseTerms() {
    const raw = input.split(/[,\s]+/).map(s => s.trim().toLowerCase()).filter(Boolean);
    return qtype === "single" ? raw.slice(0, 1) : raw;
  }

  function handleSearch() {
    const terms = parseTerms();
    if (!hasVault || terms.length === 0) return;
    const r = mode === "regular"
      ? regularSearch(qtype, terms, indexedKws)
      : sseSearch(qtype, terms, indexedKws);
    setResult({ ...r, terms, mode, qtype });
  }

  function switchMode(id) { setMode(id); setResult(null); }
  function switchQtype(id) { setQtype(id); setResult(null); }

  const hint = qtype === "single"
    ? "Enter one keyword."
    : qtype === "and"
      ? "Enter two or more keywords separated by commas. A document must contain all of them."
      : "Enter two or more keywords separated by commas. A document must contain at least one of them.";

  return (
    <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8, padding:24, marginTop:16 }}>

      {/* Global tabs: regular vs SSE */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
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

      {/* Sub tabs: query type */}
      <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
        {[["single","Single Term"],["and","Conjunction (AND)"],["or","Disjunction (OR)"]].map(([id,label])=>(
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

      {/* Explanation for the current tab */}
      <div style={{ fontSize:12, color:"#999", lineHeight:1.6, marginBottom:18, maxWidth:680 }}>
        {EXPLANATIONS[`${mode}-${qtype}`]}
      </div>

      {/* Input row */}
      <div style={{ display:"flex", gap:8, marginBottom:6 }}>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==="Enter" && handleSearch()}
          placeholder={qtype==="single" ? "e.g. revenue" : "e.g. revenue, profit"}
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
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
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
              <div>Server saw these tokens, never the plaintext keywords:</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:6 }}>
                {result.terms.map(t => (
                  <span key={t} style={{
                    fontFamily:"Space Mono,monospace", fontSize:10, color:"#ffd208",
                    background:"#ffd20810", border:"1px solid #ffd20833",
                    borderRadius:4, padding:"3px 8px",
                  }}>{xtoken(t)}</span>
                ))}
              </div>
              {result.qtype === "and" && result.meta.anchor && (
                <div style={{ marginTop:8 }}>
                  Anchor term used for the TSet lookup (smallest posting list): <span style={{ color:"#ffd208" }}>{result.meta.anchor}</span>
                </div>
              )}
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
      commitDoc({ id:file.name, name:file.name, keywords });
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

            {/* Sample library, collapses itself once something has been picked */}
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
                <span>Sample PDFs to upload {vault.length>0 && <span style={{color:"#666", fontWeight:400}}>({vault.length} indexed)</span>}</span>
                <span style={{ fontSize:10 }}>{libOpen?"▲":"▼"}</span>
              </button>
              {libOpen && (
                <div style={{ borderTop:"1px solid #1a1a1a" }}>
                  {SAMPLES.map(s=>{
                    const indexed = vault.some(v=>v.name===s.name);
                    return (
                      <div
                        key={s.id}
                        draggable={!indexed}
                        onDragStart={e=>e.dataTransfer.setData("sampleId",s.id)}
                        onClick={()=>{ if(!indexed) commitDoc(s); }}
                        style={{
                          display:"flex", alignItems:"center", gap:10,
                          padding:"10px 14px", borderBottom:"1px solid #111",
                          cursor: indexed?"default":"pointer",
                          opacity: indexed?0.4:1,
                          transition:"background 0.15s",
                        }}
                        onMouseEnter={e=>{if(!indexed)e.currentTarget.style.background="#111";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}
                      >
                        <DocIcon size={12} />
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:11, fontWeight:600, color:"#ccc", display:"flex", alignItems:"center", gap:6 }}>
                            <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</span>
                            {indexed && <span style={{ fontSize:9, color:"#ffd208", flexShrink:0 }}>indexed</span>}
                          </div>
                          <div style={{ fontSize:10, color:"#777", marginTop:2, fontFamily:"Space Mono,monospace" }}>
                            {s.keywords.slice(0,3).join(", ")}...
                          </div>
                        </div>
                        {!indexed && <span style={{ fontSize:10, color:"#555", flexShrink:0 }}>drag</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index, click a keyword to drop it into the search box below */}
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
                    }}>
                      {doc.name}
                    </div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                      {doc.keywords.map(kw=>(
                        <span
                          key={kw}
                          onClick={()=>setSearchInput(kw)}
                          style={{
                            fontSize:10, padding:"2px 8px", borderRadius:20, cursor:"pointer",
                            background:"#111", color:"#888",
                            border:"1px solid #1a1a1a",
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