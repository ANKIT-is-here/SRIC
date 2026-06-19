import React, { useState, useRef, useEffect } from "react";
import { 
  FileText, 
  FileCode, 
  ClipboardList, 
  FlaskConical, 
  Monitor, 
  Server, 
  Lock, 
  Unlock, 
  Cpu, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Upload, 
  Search, 
  ArrowRight,
  Database,
  Activity,
  ShieldCheck
} from "lucide-react";

// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLES = [
  { id:"fin",  name:"Q3_Financials.pdf",   icon:"📊", desc:"Quarterly earnings report",
    preview:"Q3 Revenue: $4.2M\nEBITDA margin: 18.3%\nNet profit after tax: $760K\nForecast revised upward...",
    keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"] },
  { id:"enc",  name:"Encryption_RFC.pdf",  icon:"📄", desc:"Cryptography specification",
    preview:"Abstract: This document specifies\nthe AES block cipher in CBC mode.\nKey derivation via PBKDF2...\nNonce generation requirements...",
    keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"] },
  { id:"med",  name:"Medical_Records.pdf", icon:"📋", desc:"Patient clinical data",
    preview:"Patient ID: 00482-B\nDiagnosis: Type 2 Diabetes\nMedication: Metformin 500mg\nBlood glucose: 126 mg/dL...",
    keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"] },
  { id:"proj", name:"Project_Phoenix.pdf", icon:"📝", desc:"Engineering project plan",
    preview:"Sprint 4 — Milestone Review\nBacklog items: 14 open\nStakeholder sign-off pending\nBudget utilisation: 67%...",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"] },
  { id:"res",  name:"Research_Paper.pdf",  icon:"🔬", desc:"Academic research draft",
    preview:"Abstract: We present a novel\nmethodology for dataset analysis.\nHypothesis confirmed at p<0.05\nCitation count: 42...",
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
function gibberish(seed, len = 200) {
  let s = seed; const chars = "ABCDEFabcdef0123456789+/=\n";
  let out = "";
  for (let i = 0; i < len; i++) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    out += chars[s % chars.length];
    if (i % 22 === 21) out += "\n";
  }
  return out;
}
function extractKeywordsFromText(text, name) {
  const stopwords = new Set(["the","and","for","that","this","with","from","are","was","were","have","has","been","will","not","but","they","their","what","when","which","who","how","its","can","may","our","your","all","any","one","two","per","via","also","into","more","over","some","than","then","each","both","such","even","much","most","only","very","just","been","said","use","used","after","before","about","above","below","first","last","next","new","old","own","same","other","these","those","like","well","back","here","there","where","make","made","come","came","take","took","time","year","way","day","man","get","got","see","saw","know","knew","find","found","give","gave","good","great","long","little","right","big","high","low","still","never","again","always","often","now","then","here","there","too","very","just","also"]);
  const words = text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/);
  const freq = {};
  words.forEach(w => { if (w.length > 4 && !stopwords.has(w)) freq[w] = (freq[w]||0)+1; });
  const fromName = name.replace(/\.[^.]+$/,"").split(/[_\-\s]+/).filter(w=>w.length>3).map(w=>w.toLowerCase());
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).map(e=>e[0]);
  const combined = [...new Set([...fromName, ...sorted])].slice(0, 8);
  return combined.length >= 4 ? combined : [...combined, "document","secure","private","data"].slice(0,8);
}

function getSampleIcon(id) {
  switch (id) {
    case "fin": return <FileText size={16} style={{ color: "var(--accent-cyan)" }} />;
    case "enc": return <FileCode size={16} style={{ color: "var(--accent-purple)" }} />;
    case "med": return <ClipboardList size={16} style={{ color: "var(--accent-cyan)" }} />;
    case "proj": return <FileText size={16} style={{ color: "var(--accent-purple)" }} />;
    case "res": return <FlaskConical size={16} style={{ color: "var(--accent-cyan)" }} />;
    default: return <FileText size={16} style={{ color: "var(--text-secondary)" }} />;
  }
}

// ── Animation Panel ────────────────────────────────────────────────────────────
function AnimPanel({ anim, searchAnim }) {
  const empty = !anim && !searchAnim;
  
  return (
    <div className={`glass-panel pipeline-panel ${anim ? "pipeline-panel-active" : searchAnim ? "pipeline-panel-searching" : ""}`} style={{ padding: "24px", minHeight: "480px" }}>
      {empty && (
        <div className="anim-empty-state">
          <Upload className="anim-empty-icon" size={32} />
          <div className="anim-empty-text">Upload a document to see the encryption pipeline in action</div>
        </div>
      )}

      {anim && (
        <>
          {/* Step 1: document preview */}
          <div className="anim-step">
            <div className={`anim-step-num ${anim.phase === "doc" ? "active" : "done"}`}>1</div>
            <div className="anim-step-content">
              <div className="anim-step-title">
                <FileText size={14} /> Document uploaded
              </div>
              {(anim.phase === "doc" || anim.docVisible) && (
                <div className="anim-doc-card">
                  <div className="anim-doc-card-header">
                    {getSampleIcon(anim.doc.id)}
                    <span className="anim-doc-name">{anim.doc.name}</span>
                  </div>
                  <pre className="anim-doc-preview">{anim.doc.preview || anim.doc.desc}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: keywords extracted */}
          {(anim.phase === "keywords" || anim.phase === "hash" || anim.phase === "send" || anim.phase === "done") && (
            <div className="anim-step">
              <div className={`anim-step-num ${anim.phase === "keywords" ? "active" : "done"}`}>2</div>
              <div className="anim-step-content">
                <div className="anim-step-title">
                  <Activity size={14} /> Keywords extracted
                </div>
                <div className="anim-kw-row">
                  {anim.visibleKws.map(kw => (
                    <span key={kw} className="anim-kw-chip">{kw}</span>
                  ))}
                  {anim.phase === "keywords" && anim.visibleKws.length < anim.doc.keywords.length && (
                    <span className="anim-kw-pulse">...</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: hashing */}
          {(anim.phase === "hash" || anim.phase === "send" || anim.phase === "done") && (
            <div className="anim-step">
              <div className={`anim-step-num ${anim.phase === "hash" ? "active" : "done"}`}>3</div>
              <div className="anim-step-content">
                <div className="anim-step-title">
                  <Lock size={14} /> Encrypted for server
                </div>
                <div className="anim-hash-row">
                  {/* hashed doc */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="anim-hash-label">Document hash</div>
                    <div className="anim-hash-box">
                      <pre className="anim-hash-text">{anim.docHash ? gibberish(parseInt(anim.docHash.slice(0,8),16)||1, 100) : ""}</pre>
                    </div>
                  </div>
                  {/* keyword tokens */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="anim-hash-label">Keyword tokens</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {anim.doc.keywords.map((kw, i) => (
                        <div key={kw} style={{ display: "flex", alignItems: "center", gap: 6, opacity: anim.encKws[i] ? 1 : 0.2, transition: "opacity 0.3s" }}>
                          <span className="anim-kw-small">{kw}</span>
                          <span style={{ color: "var(--accent-cyan)", fontSize: 10 }}>→</span>
                          <span className="anim-token-small">{xtoken(kw)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: sent to server */}
          {(anim.phase === "send" || anim.phase === "done") && (
            <div className="anim-step">
              <div className={`anim-step-num ${anim.phase === "send" ? "active" : "done"}`}>4</div>
              <div className="anim-step-content">
                <div className="anim-step-title">
                  <Database size={14} /> Sent to server
                </div>
                <div className="anim-transmit-row">
                  <div className="anim-node-box">
                    <Monitor size={14} style={{ color: "var(--accent-cyan)" }} />
                    <span>Client</span>
                  </div>
                  <div className="anim-track-wrap">
                    <div className="anim-track-line" />
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      left: anim.sent ? "calc(100% - 12px)" : "12px",
                      opacity: anim.sent ? 0 : 1,
                      transition: "left 1.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 1.3s",
                      zIndex: 2
                    }}>
                      <Lock size={14} style={{ color: "var(--accent-purple)" }} />
                    </div>
                    <div className="anim-track-label">
                      {anim.sent ? "delivered ✓" : "transmitting..."}
                    </div>
                  </div>
                  <div className="anim-node-box" style={{ borderColor: anim.sent ? "var(--accent-cyan)" : "var(--border-glass)" }}>
                    <Server size={14} style={{ color: anim.sent ? "var(--accent-cyan)" : "var(--text-muted)" }} />
                    <span>Server</span>
                  </div>
                </div>
                {anim.sent && (
                  <div className="anim-sent-note">
                    <ShieldCheck size={14} style={{ color: "var(--accent-cyan)" }} />
                    <span>Plaintext never left the client</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Step 5: search */}
      {searchAnim && (
        <div className="anim-step" style={{ borderLeftColor: "var(--accent-purple)", marginBottom: 0, paddingBottom: 0 }}>
          <div className={`anim-step-num ${searchAnim.done ? "done-search" : "active-search"}`}>5</div>
          <div className="anim-step-content">
            <div className="anim-step-title" style={{ color: "var(--accent-purple)" }}>
              <Search size={14} /> Blind search
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>

              <div className="search-row-status active">
                <span className="search-status-label">Keyword token</span>
                <span className="anim-token-small" style={{ color: "var(--accent-purple)" }}>{searchAnim.token}</span>
              </div>

              <div className={`search-row-status ${searchAnim.probing ? "active" : ""}`}>
                <span className="search-status-label">Matching on server</span>
                <span style={{ fontSize: 11, color: searchAnim.probing ? "var(--accent-purple)" : "var(--text-muted)" }}>
                  {searchAnim.probing ? "scanning encrypted index..." : "pending"}
                </span>
              </div>

              <div className={`search-row-status ${searchAnim.fetching ? "active" : ""}`}>
                <span className="search-status-label">Encrypted record fetched</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent-purple)" }}>
                  {searchAnim.fetching ? `0x${sha256ish(searchAnim.kw).slice(0, 16)}...` : "pending"}
                </span>
              </div>

              <div className={`search-row-status ${searchAnim.done ? "active" : ""}`}>
                <span className="search-status-label">Decrypted on client</span>
                {searchAnim.done && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: searchAnim.result.length ? "var(--accent-cyan)" : "var(--text-secondary)" }}>
                    {searchAnim.result.length ? searchAnim.result.join(", ") : "no match"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Server Panel doc card ──────────────────────────────────────────────────────
function ServerDoc({ doc }) {
  const seed = parseInt(sha256ish(doc.name).slice(0,8),16)||1;
  
  return (
    <div className="srv-doc-card">
      <div className="srv-doc-card-top">
        <Server size={16} style={{ color: "var(--accent-purple)" }} />
        <div>
          <div className="srv-doc-enc-name">{sha256ish(doc.name).slice(0, 18)}...</div>
          <div className="srv-doc-sub">encrypted document</div>
        </div>
      </div>
      <pre className="srv-gibberish">{gibberish(seed, 160)}</pre>
    </div>
  );
}

// ── Main App Component ──────────────────────────────────────────────────────────
export default function LiveDemo() {
  const [vault, setVault]         = useState([]);
  const [indexedKws, setIndexedKws] = useState({});
  const [anim, setAnim]           = useState(null);
  const [searchAnim, setSearchAnim] = useState(null);
  const [query, setQuery]         = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const [libOpen, setLibOpen]     = useState(true);
  const fileRef = useRef();

  // Seed with standard first document indexed by default to match screenshot and look visual immediately
  useEffect(() => {
    const defaultDoc = SAMPLES[0];
    setVault([defaultDoc]);
    setIndexedKws({
      revenue: [defaultDoc.name],
      profit: [defaultDoc.name],
      ebitda: [defaultDoc.name],
      quarterly: [defaultDoc.name],
      forecast: [defaultDoc.name],
      audit: [defaultDoc.name],
      balance: [defaultDoc.name],
      equity: [defaultDoc.name]
    });
  }, []);

  // ── run upload pipeline ──
  function runPipeline(doc) {
    setSearchAnim(null);
    setQueryResult(null);

    // phase: doc
    setAnim({ phase:"doc", doc, docVisible:true, visibleKws:[], encKws:[], docHash:"", sending:false, sent:false });

    const T = (ms, fn) => setTimeout(fn, ms);

    // phase: keywords — pop in one by one
    T(900, () => {
      setAnim(p => p ? {...p, phase:"keywords"} : p);
      doc.keywords.forEach((_, i) => {
        T(200 + i * 280, () => {
          setAnim(p => p ? {...p, visibleKws:[...p.visibleKws, doc.keywords[i]]} : p);
        });
      });
    });

    const afterKws = 900 + 200 + doc.keywords.length * 280 + 400;

    // phase: hash
    T(afterKws, () => {
      const dh = sha256ish(doc.name);
      setAnim(p => p ? {...p, phase:"hash", docHash:dh} : p);
      doc.keywords.forEach((kw, i) => {
        T(150 + i * 180, () => {
          setAnim(p => p ? {...p, encKws:[...p.encKws, xtoken(kw)]} : p);
        });
      });
    });

    const afterHash = afterKws + 150 + doc.keywords.length * 180 + 500;

    // phase: send
    T(afterHash, () => {
      setAnim(p => p ? {...p, phase:"send", sending:true} : p);
      T(1600, () => {
        setAnim(p => p ? {...p, sent:true, phase:"done"} : p);
        commitDoc(doc);
      });
    });
  }

  function commitDoc(doc) {
    setVault(prev => {
      if (prev.find(v => v.name === doc.name)) return prev;
      return [...prev, doc];
    });
    setIndexedKws(prev => {
      const next = {...prev};
      doc.keywords.forEach(kw => {
        const kwLower = kw.toLowerCase();
        if (!next[kwLower]) next[kwLower] = [];
        if (!next[kwLower].includes(doc.name)) next[kwLower].push(doc.name);
      });
      return next;
    });
  }

  // ── search ──
  function doSearch() {
    const q = query.trim().toLowerCase();
    if (!q || vault.length === 0) return;
    const token = xtoken(q);
    const matches = indexedKws[q] || [];
    setQueryResult({ q, matches });
    setSearchAnim({ kw:q, token, probing:false, fetching:false, done:false, result:matches });
    setTimeout(() => setSearchAnim(p => p ? {...p, probing:true}  : p), 400);
    setTimeout(() => setSearchAnim(p => p ? {...p, fetching:true} : p), 1300);
    setTimeout(() => setSearchAnim(p => p ? {...p, done:true}     : p), 2300);
  }

  // ── file handling ──
  function handleRealFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const keywords = extractKeywordsFromText(text, file.name);
      const preview = text.replace(/[^\x20-\x7E\n]/g," ").slice(0,200).trim();
      const lines = preview.split("\n").slice(0,5).join("\n");
      const doc = {
        id: file.name,
        name: file.name,
        icon: "📄",
        desc: "Uploaded document",
        preview: lines || "(binary content)",
        keywords,
      };
      runPipeline(doc);
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDropActive(false);
    const sampleId = e.dataTransfer.getData("sampleId");
    if (sampleId) {
      const doc = SAMPLES.find(s => s.id === sampleId);
      if (doc && !vault.find(v => v.name === doc.name)) runPipeline(doc);
      return;
    }
    const file = e.dataTransfer.files[0];
    if (file) handleRealFile(file);
  }

  return (
    <section id="demo" className="section-padding" style={{ background: "linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%)", position: "relative", zIndex: 5 }}>
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        
        {/* HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Interactive Sandbox</div>
          <h2 className="section-title">Live Cryptographic Search Demo</h2>
          <p className="subtitle">
            Query ciphertext using Searchable Symmetric Encryption. Watch data packets flow through the cryptographic pipeline.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="sandbox-grid">

          {/* ── Client Panel ── */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="panel-label">CLIENT</div>

            {/* Drop zone */}
            <div
              className={`dropzone-container ${dropActive ? "drag-active" : ""}`}
              onDragOver={e => { e.preventDefault(); setDropActive(true); }}
              onDragLeave={() => setDropActive(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
            >
              <input ref={fileRef} type="file" accept=".pdf,.txt" style={{display:"none"}}
                onChange={e => { if(e.target.files[0]) handleRealFile(e.target.files[0]); e.target.value=""; }} />
              <Upload className="upload-zone-icon" />
              <p className="upload-main-text">{dropActive ? "Drop to encrypt" : "Drop or click to upload"}</p>
              <p className="upload-sub-text">PDF or TXT</p>
            </div>

            {/* Sample library — collapsible */}
            <div className="lib-wrap">
              <button className="lib-toggle" onClick={() => setLibOpen(o => !o)}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>📁 Sample PDFs to upload</span>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{libOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
              </button>
              {libOpen && (
                <div className="lib-list">
                  {SAMPLES.map(s => {
                    const indexed = vault.some(v => v.name === s.name);
                    return (
                      <div
                        key={s.id}
                        draggable={!indexed}
                        onDragStart={e => e.dataTransfer.setData("sampleId", s.id)}
                        onClick={() => { if(!indexed) runPipeline(s); }}
                        className="lib-file"
                        style={{ opacity: indexed ? 0.4 : 1, cursor: indexed ? "default" : "pointer" }}
                      >
                        {getSampleIcon(s.id)}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="lib-file-name">
                            <span>{s.name}</span>
                            {indexed && <span className="indexed-tag">indexed</span>}
                          </div>
                          <div className="lib-file-desc">{s.desc}</div>
                          <div className="lib-kw-hint">{s.keywords.slice(0,4).join(", ")}...</div>
                        </div>
                        {!indexed && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>⠿ drag</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index */}
            {vault.length > 0 && (
              <div className="kw-index">
                <div className="kw-index-title">
                  <Database size={12} /> Keyword index
                </div>
                {vault.map(doc => (
                  <div key={doc.name} className="kw-index-row">
                    <div className="kw-index-doc">
                      {getSampleIcon(doc.id)}
                      <span className="kw-index-doc-name">{doc.name}</span>
                    </div>
                    <div className="kw-index-kws">
                      {doc.keywords.map(kw => (
                        <span
                          key={kw}
                          className={`kw-tag ${queryResult?.q === kw.toLowerCase() ? "kw-tag-hit" : ""}`}
                          onClick={() => { setQuery(kw); }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Search */}
            {vault.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className="panel-label">SEARCH</div>
                <div className="search-row">
                  <input
                    className="search-input"
                    placeholder="Type a keyword..."
                    value={query}
                    onChange={e => { setQuery(e.target.value); setQueryResult(null); }}
                    onKeyDown={e => e.key==="Enter" && doSearch()}
                  />
                  <button className="search-btn" onClick={doSearch}>
                    <Search size={16} />
                  </button>
                </div>
                {queryResult && (
                  <div className="search-result-display" style={{ borderColor: queryResult.matches.length ? "var(--accent-cyan)" : "var(--border-glass)" }}>
                    {queryResult.matches.length ? (
                      <div>
                        <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>Found</span> in {queryResult.matches.join(", ")}
                      </div>
                    ) : (
                      <span style={{ color: "var(--text-muted)" }}>No match found</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Animation Panel ── */}
          <AnimPanel anim={anim} searchAnim={searchAnim} />

          {/* ── Server Panel ── */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="panel-label" style={{ color: "var(--text-muted)" }}>SERVER</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Stores encrypted documents only. No plaintext.</div>
            {vault.length === 0 ? (
              <div className="server-empty">No documents stored yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {vault.map(doc => <ServerDoc key={doc.name} doc={doc} />)}
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        .sandbox-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1200px) {
          .sandbox-grid {
            grid-template-columns: 1fr;
          }
        }

        .panel-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        /* Dropzone styles */
        .dropzone-container {
          border: 2px dashed var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .dropzone-container:hover, .dropzone-container.drag-active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
          box-shadow: 0 0 15px rgba(0, 212, 255, 0.05);
        }
        .upload-zone-icon {
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          margin-bottom: 8px;
          transition: var(--transition-smooth);
        }
        .dropzone-container:hover .upload-zone-icon {
          color: var(--accent-cyan);
          filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.4));
        }
        .upload-main-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .upload-sub-text {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Collapsible Sample Library */
        .lib-wrap {
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.1);
        }
        .lib-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.02);
          border: none;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .lib-toggle:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .lib-list {
          background: transparent;
          border-top: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
        }
        .lib-file {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          user-select: none;
          transition: var(--transition-smooth);
        }
        .lib-file:last-child {
          border-bottom: none;
        }
        .lib-file:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .lib-file-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lib-file-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }
        .lib-kw-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-style: italic;
        }
        .indexed-tag {
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
          font-weight: 500;
        }

        /* Keyword Index styles */
        .kw-index {
          background: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          padding: 16px;
        }
        .kw-index-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .kw-index-row {
          margin-bottom: 14px;
        }
        .kw-index-row:last-child {
          margin-bottom: 0;
        }
        .kw-index-doc {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .kw-index-doc-name {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .kw-index-kws {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .kw-tag {
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .kw-tag:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
        }
        .kw-tag-hit {
          background: rgba(0, 212, 255, 0.1) !important;
          color: var(--accent-cyan) !important;
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }

        /* Search input & display */
        .search-row {
          display: flex;
          gap: 8px;
          margin-top: 4px;
        }
        .search-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 0.85rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          color: white;
          outline: none;
          transition: var(--transition-smooth);
        }
        .search-input:focus {
          border-color: var(--accent-cyan);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.15);
        }
        .search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 38px;
          background: var(--accent-cyan);
          border: none;
          border-radius: 8px;
          color: #050816;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .search-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 12px rgba(0, 212, 255, 0.4);
          background: var(--accent-blue);
        }
        .search-result-display {
          padding: 10px 14px;
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Middle Column Animation Panel */
        .pipeline-panel {
          position: relative;
          transition: var(--transition-smooth);
        }
        .pipeline-panel-active {
          border-color: rgba(0, 212, 255, 0.25) !important;
          box-shadow: 0 8px 32px 0 rgba(0, 212, 255, 0.05) !important;
        }
        .pipeline-panel-searching {
          border-color: rgba(123, 97, 255, 0.25) !important;
          box-shadow: 0 8px 32px 0 rgba(123, 97, 255, 0.05) !important;
        }
        .anim-empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          height: 100%;
        }
        .anim-empty-icon {
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .anim-empty-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-align: center;
          max-width: 200px;
        }
        .anim-step {
          display: flex;
          gap: 16px;
          padding-bottom: 24px;
          position: relative;
          padding-left: 8px;
        }
        .anim-step::before {
          content: '';
          position: absolute;
          left: 20px;
          top: 32px;
          bottom: 0;
          width: 2px;
          background: var(--border-glass);
        }
        .anim-step:last-child::before {
          display: none;
        }
        .anim-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          transition: var(--transition-smooth);
          z-index: 2;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-glass);
          color: var(--text-muted);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .anim-step-num.active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.1);
          color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }
        .anim-step-num.active-search {
          border-color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.1);
          color: var(--accent-purple);
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.3);
        }
        .anim-step-num.done {
          border-color: var(--accent-cyan);
          background: var(--accent-cyan);
          color: #050816;
          box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
        }
        .anim-step-num.done-search {
          border-color: var(--accent-purple);
          background: var(--accent-purple);
          color: white;
          box-shadow: 0 0 10px rgba(123, 97, 255, 0.2);
        }
        .anim-step-content {
          flex: 1;
          min-width: 0;
        }
        .anim-step-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .anim-doc-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          overflow: hidden;
          margin-top: 8px;
        }
        .anim-doc-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-glass);
        }
        .anim-doc-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .anim-doc-preview {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 10px 12px;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
          line-height: 1.5;
        }
        .anim-kw-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }
        .anim-kw-chip {
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 20px;
          background: rgba(0, 212, 255, 0.08);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 212, 255, 0.2);
          font-weight: 600;
        }
        .anim-kw-pulse {
          font-size: 0.75rem;
          color: var(--text-muted);
          padding: 3px 6px;
        }
        .anim-hash-row {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .anim-hash-row {
            flex-direction: column;
          }
        }
        .anim-hash-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
          letter-spacing: 0.05em;
        }
        .anim-hash-box {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 8px 10px;
          overflow: hidden;
        }
        .anim-hash-text {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin: 0;
          word-break: break-all;
          white-space: pre-wrap;
          line-height: 1.4;
        }
        .anim-kw-small {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          color: var(--text-secondary);
          border: 1px solid var(--border-glass);
        }
        .anim-token-small {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-cyan);
        }
        .anim-transmit-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }
        .anim-node-box {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 6px 12px;
          text-align: center;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .anim-track-wrap {
          flex: 1;
          position: relative;
          height: 24px;
        }
        .anim-track-line {
          height: 2px;
          background: var(--border-glass);
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }
        .anim-track-label {
          position: absolute;
          bottom: -14px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.65rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .anim-sent-note {
          margin-top: 14px;
          font-size: 0.75rem;
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.05);
          border: 1px solid rgba(0, 212, 255, 0.15);
          border-radius: 6px;
          padding: 6px 12px;
          text-align: center;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Search pipeline status elements */
        .search-row-status {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 8px 12px;
          opacity: 0.35;
          transition: var(--transition-smooth);
        }
        .search-row-status.active {
          opacity: 1;
          background: rgba(123, 97, 255, 0.05);
          border-color: rgba(123, 97, 255, 0.3);
        }
        .search-status-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Server Panel cards */
        .srv-doc-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          overflow: hidden;
          transition: var(--transition-smooth);
        }
        .srv-doc-card:hover {
          border-color: rgba(123, 97, 255, 0.25);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        .srv-doc-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-glass);
        }
        .srv-doc-enc-name {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-primary);
          margin-bottom: 2px;
        }
        .srv-doc-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .srv-gibberish {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
          padding: 12px;
          margin: 0;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-all;
          max-height: 80px;
          overflow-y: auto;
        }
        .server-empty {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          padding: 20px 0;
        }
      `}</style>
    </section>
  );
}
