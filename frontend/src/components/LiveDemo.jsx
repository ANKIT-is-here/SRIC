import { useState, useRef } from "react";

// ── Sample data ────────────────────────────────────────────────────────────────
const SAMPLES = [
  { id:"fin",  name:"Q3_Financials.pdf",
    preview:"Q3 Revenue: $4.2M\nEBITDA margin: 18.3%\nNet profit: $760K\nForecast revised upward",
    keywords:["revenue","profit","EBITDA","quarterly","forecast","audit","balance","equity"] },
  { id:"enc",  name:"Encryption_RFC.pdf",
    preview:"AES block cipher in CBC mode\nKey derivation via PBKDF2\nNonce generation requirements\nPadding scheme: PKCS7",
    keywords:["encryption","cipher","AES","key","nonce","block","padding","IV"] },
  { id:"med",  name:"Medical_Records.pdf",
    preview:"Patient ID: 00482-B\nDiagnosis: Type 2 Diabetes\nMedication: Metformin 500mg\nBlood glucose: 126 mg/dL",
    keywords:["patient","diagnosis","medication","dosage","blood","pressure","glucose","allergy"] },
  { id:"proj", name:"Project_Phoenix.pdf",
    preview:"Sprint 4 Milestone Review\nBacklog items: 14 open\nStakeholder sign-off pending\nBudget utilisation: 67%",
    keywords:["milestone","sprint","backlog","stakeholder","deliverable","roadmap","budget","risk"] },
  { id:"res",  name:"Research_Paper.pdf",
    preview:"Novel methodology for dataset analysis\nHypothesis confirmed at p<0.05\nCitation count: 42\nPeer review: accepted",
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
  return [...new Set([...fromName,...sorted])].slice(0,6);
}

// ── Icon components ────────────────────────────────────────────────────────────
function DocIcon({size=14}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#ffd208" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}
function ClientIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#ffd208" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}
function ServerIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  );
}

// ── Fluid pipeline animation ───────────────────────────────────────────────────
// One continuous scene per run (upload or search). Every element is on the
// stage at once and *moves/morphs* via CSS keyframes — nothing is swapped
// out as a discrete "slide". Re-mounting via `key` is what restarts a run.

const UPLOAD_DUR = 9;     // seconds, total upload choreography
const SEARCH_DUR = 6.4;   // seconds, total search choreography

function PipelineStyles() {
  return (
    <style>{`
      @keyframes fp-doc {
        0%   { opacity:0; transform:translate(-50%,-50%) scale(.92); box-shadow:0 0 0 rgba(255,210,8,0); }
        10%  { opacity:1; transform:translate(-50%,-50%) scale(1); box-shadow:0 0 0 rgba(255,210,8,0); }
        32%  { box-shadow:0 0 28px rgba(255,210,8,.16); }
        58%  { opacity:1; box-shadow:0 0 28px rgba(255,210,8,.16); }
        66%  { opacity:.5; box-shadow:0 0 0 rgba(255,210,8,0); }
        100% { opacity:.5; box-shadow:0 0 0 rgba(255,210,8,0); }
      }
      @keyframes fp-chip {
        0%   { left:13%; top:33%; opacity:0; transform:translate(-50%,-50%) scale(.5); }
        14%  { left:17%; top:47%; opacity:1; transform:translate(-50%,-50%) scale(1); }
        42%  { left:36%; top:55%; opacity:1; transform:translate(-50%,-50%) scale(1); }
        72%  { left:66%; top:68%; opacity:1; transform:translate(-50%,-50%) scale(1); }
        92%  { left:87%; top:78%; opacity:1; transform:translate(-50%,-50%) scale(.82); }
        100% { left:90%; top:78%; opacity:0; transform:translate(-50%,-50%) scale(.3); }
      }
      @keyframes fp-chip-glow {
        0%, 36% { box-shadow:none; }
        46%     { box-shadow:0 0 10px rgba(255,210,8,.45); }
        100%    { box-shadow:0 0 4px rgba(255,210,8,.2); }
      }
      @keyframes fp-txt-a { 0%{opacity:0} 14%{opacity:1} 36%{opacity:1} 46%{opacity:0} 100%{opacity:0} }
      @keyframes fp-txt-b { 0%{opacity:0} 36%{opacity:0} 46%{opacity:1} 100%{opacity:1} }
      @keyframes fp-server {
        0%, 58% { box-shadow:none; border-color:#1a1a1a; }
        70%     { box-shadow:0 0 22px rgba(255,210,8,.22); border-color:rgba(255,210,8,.4); }
        100%    { box-shadow:0 0 14px rgba(255,210,8,.12); border-color:rgba(255,210,8,.3); }
      }
      @keyframes fp-stored { 0%, 70% { opacity:0; transform:translate(-50%,4px); } 82%, 100% { opacity:1; transform:translate(-50%,0); } }
      @keyframes fp-caption { 0%{opacity:0; transform:translateY(3px);} 10%{opacity:1; transform:translateY(0);} 88%{opacity:1;} 100%{opacity:0; transform:translateY(-3px);} }

      @keyframes fp-query {
        0%   { left:11%; top:30%; opacity:0; transform:translate(-50%,-50%) scale(.7); }
        9%   { left:11%; top:30%; opacity:1; transform:translate(-50%,-50%) scale(1); }
        33%  { left:11%; top:30%; opacity:1; }
        50%  { left:50%; top:50%; opacity:1; }
        70%  { left:50%; top:50%; opacity:1; }
        88%  { left:88%; top:78%; opacity:1; }
        100% { left:92%; top:78%; opacity:0; transform:translate(-50%,-50%) scale(.4); }
      }
      @keyframes fp-qtxt-a { 0%{opacity:0} 9%{opacity:1} 28%{opacity:1} 36%{opacity:0} 100%{opacity:0} }
      @keyframes fp-qtxt-b { 0%{opacity:0} 28%{opacity:0} 36%{opacity:1} 100%{opacity:1} }
      @keyframes fp-cell {
        0%, 52% { background:#1a1a1a; box-shadow:none; }
        60%     { background:#ffd208; box-shadow:0 0 8px rgba(255,210,8,.7); }
        100%    { background:rgba(255,210,8,.5); box-shadow:0 0 3px rgba(255,210,8,.3); }
      }
      @keyframes fp-server-hit {
        0%, 78% { box-shadow:none; border-color:#1a1a1a; }
        86%     { box-shadow:0 0 20px rgba(74,222,128,.3); border-color:rgba(74,222,128,.5); }
        100%    { box-shadow:0 0 12px rgba(74,222,128,.18); border-color:rgba(74,222,128,.4); }
      }
      @keyframes fp-server-miss {
        0%, 78% { box-shadow:none; border-color:#1a1a1a; }
        86%     { box-shadow:0 0 18px rgba(248,113,113,.22); border-color:rgba(248,113,113,.4); }
        100%    { box-shadow:0 0 10px rgba(248,113,113,.12); border-color:rgba(248,113,113,.3); }
      }
      @keyframes fp-result { 0%, 86% { opacity:0; transform:translate(-50%,4px); } 96%, 100% { opacity:1; transform:translate(-50%,0); } }
    `}</style>
  );
}

function Captions({ stage }) {
  const upload = [
    { t:"reading document", at: 0 },
    { t:"extracting keywords", at: UPLOAD_DUR*0.16 },
    { t:"hashing into tokens", at: UPLOAD_DUR*0.42 },
    { t:"sending to server", at: UPLOAD_DUR*0.68 },
  ];
  const search = [
    { t:"hashing query", at: 0 },
    { t:"checking index", at: SEARCH_DUR*0.34 },
    { t:"fetching result", at: SEARCH_DUR*0.80 },
  ];
  const items = stage === "upload" ? upload : search;
  const dur = stage === "upload" ? UPLOAD_DUR : SEARCH_DUR;
  return (
    <div style={{position:"absolute", left:16, top:14, fontFamily:"Space Mono,monospace", fontSize:10, color:"#666", letterSpacing:".04em", height:14}}>
      {items.map((it,i)=>{
        const next = items[i+1] ? items[i+1].at : dur;
        const segDur = Math.max(next - it.at, 0.4);
        return (
          <span key={it.t} style={{
            position:"absolute", left:0, top:0, whiteSpace:"nowrap",
            opacity:0, animation:`fp-caption ${segDur}s ease ${it.at}s forwards`,
          }}>{it.t}</span>
        );
      })}
    </div>
  );
}

function UploadStage({ doc }) {
  const kws = doc.keywords.slice(0,6);
  return (
    <div style={{position:"absolute", inset:0}}>
      {/* connecting wire */}
      <div style={{position:"absolute", left:"14%", right:"14%", top:"78%", height:1,
        background:"repeating-linear-gradient(90deg,#222 0 6px,transparent 6px 12px)"}} />

      {/* client node */}
      <div style={{position:"absolute", left:"10%", top:"78%", transform:"translate(-50%,-50%)",
        width:40, height:40, borderRadius:8, background:"#111", border:"1px solid #2a2a2a",
        display:"flex", alignItems:"center", justifyContent:"center"}}>
        <ClientIcon />
      </div>

      {/* server node */}
      <div style={{position:"absolute", left:"90%", top:"78%", transform:"translate(-50%,-50%)",
        width:40, height:40, borderRadius:8, background:"#111", border:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", justifyContent:"center",
        animation:`fp-server ${UPLOAD_DUR}s ease forwards`}}>
        <ServerIcon />
      </div>
      <div style={{position:"absolute", left:"90%", top:"95%", transform:"translateX(-50%)",
        fontSize:9, color:"#4ade80", fontFamily:"Space Mono,monospace", letterSpacing:".05em",
        opacity:0, animation:`fp-stored ${UPLOAD_DUR}s ease forwards`}}>
        stored (encrypted)
      </div>

      {/* document card */}
      <div style={{position:"absolute", left:"10%", top:"24%", transform:"translate(-50%,-50%)",
        width:150, background:"#111", border:"1px solid #2a2a2a", borderRadius:8, overflow:"hidden",
        opacity:0, animation:`fp-doc ${UPLOAD_DUR}s ease forwards`}}>
        <div style={{background:"#1a1a1a", padding:"6px 10px", borderBottom:"1px solid #2a2a2a",
          display:"flex", alignItems:"center", gap:6}}>
          <DocIcon size={11} />
          <span style={{fontSize:9, color:"#aaa", fontFamily:"Space Mono,monospace",
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{doc.name}</span>
        </div>
        <div style={{padding:"8px 10px"}}>
          {doc.preview.split("\n").slice(0,4).map((line,i)=>(
            <div key={i} style={{height:6, borderRadius:3, marginBottom:5, background:"#222",
              width:`${60+((i*37)%30)}%`}} />
          ))}
        </div>
      </div>

      {/* keyword chips that morph into hash tokens mid-flight on their way to the server */}
      {kws.map((kw,i)=>{
        const delay = 1.0 + i*0.32;
        const dur = 5.2;
        return (
          <div key={kw} style={{
            position:"absolute", minWidth:92, padding:"5px 0", borderRadius:16,
            background:"#ffd20812", border:"1px solid #ffd20844", textAlign:"center",
            fontFamily:"Space Mono,monospace", fontSize:10, color:"#ffd208",
            opacity:0,
            animation:`fp-chip ${dur}s cubic-bezier(.4,0,.2,1) ${delay}s forwards, fp-chip-glow ${dur}s ease ${delay}s forwards`,
          }}>
            <div style={{position:"relative", height:13}}>
              <span style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                opacity:0, animation:`fp-txt-a ${dur}s linear ${delay}s forwards`}}>{kw}</span>
              <span style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                opacity:0, animation:`fp-txt-b ${dur}s linear ${delay}s forwards`}}>{xtoken(kw).slice(0,8)}</span>
            </div>
          </div>
        );
      })}

      <Captions stage="upload" />
    </div>
  );
}

function SearchStage({ kw, matches }) {
  const positions = [hashKw(kw)%48, (hashKw(kw)*7)%48, (hashKw(kw)*13)%48];
  const hit = matches.length > 0;
  return (
    <div style={{position:"absolute", inset:0}}>
      <div style={{position:"absolute", left:"14%", right:"14%", top:"78%", height:1,
        background:"repeating-linear-gradient(90deg,#222 0 6px,transparent 6px 12px)"}} />

      <div style={{position:"absolute", left:"10%", top:"78%", transform:"translate(-50%,-50%)",
        width:40, height:40, borderRadius:8, background:"#111", border:"1px solid #2a2a2a",
        display:"flex", alignItems:"center", justifyContent:"center"}}>
        <ClientIcon />
      </div>

      <div style={{position:"absolute", left:"90%", top:"78%", transform:"translate(-50%,-50%)",
        width:40, height:40, borderRadius:8, background:"#111", border:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", justifyContent:"center",
        animation:`${hit ? "fp-server-hit" : "fp-server-miss"} ${SEARCH_DUR}s ease forwards`}}>
        <ServerIcon />
      </div>

      {/* bloom-filter style index, lights up the bits the query token touches */}
      <div style={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        display:"grid", gridTemplateColumns:"repeat(8,1fr)", gap:3}}>
        {Array.from({length:48},(_,i)=>{
          const isHit = positions.includes(i);
          return (
            <div key={i} style={{
              width:9, height:9, borderRadius:2, background:"#1a1a1a",
              animation: isHit ? `fp-cell ${SEARCH_DUR}s ease forwards` : undefined,
            }} />
          );
        })}
      </div>

      {/* query token: plaintext keyword morphs into its hash, travels client → index → server */}
      <div style={{position:"absolute", minWidth:110, padding:"6px 0", borderRadius:20, textAlign:"center",
        background:"#ffd20815", border:"1px solid #ffd20844",
        fontFamily:"Space Mono,monospace", fontSize:11, color:"#ffd208",
        opacity:0, animation:`fp-query ${SEARCH_DUR}s cubic-bezier(.4,0,.2,1) forwards`}}>
        <div style={{position:"relative", height:14}}>
          <span style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            opacity:0, animation:`fp-qtxt-a ${SEARCH_DUR}s linear forwards`}}>{kw}</span>
          <span style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            opacity:0, animation:`fp-qtxt-b ${SEARCH_DUR}s linear forwards`}}>{xtoken(kw)}</span>
        </div>
      </div>

      <div style={{position:"absolute", left:"50%", top:"93%", transform:"translateX(-50%)",
        fontFamily:"Space Mono,monospace", fontSize:11, whiteSpace:"nowrap",
        color: hit ? "#4ade80" : "#f87171",
        opacity:0, animation:`fp-result ${SEARCH_DUR}s ease forwards`}}>
        {hit ? matches.join(", ") : "no match"}
      </div>

      <Captions stage="search" />
    </div>
  );
}

function PipelineStage({ run }) {
  return (
    <div style={{
      background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:8,
      height:480, overflow:"hidden", position:"relative",
      borderColor: run ? "#ffd20833" : "#1a1a1a",
      transition:"border-color 0.4s ease",
    }}>
      <PipelineStyles />
      {!run ? (
        <div style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center",
          flexDirection:"column", gap:16}}>
          <div style={{width:48, height:48, borderRadius:8, background:"#111", border:"1px solid #1a1a1a",
            display:"flex", alignItems:"center", justifyContent:"center"}}>
            <DocIcon size={20} />
          </div>
          <div style={{fontSize:12, color:"#333", fontFamily:"Space Mono,monospace", textAlign:"center"}}>
            upload a document
          </div>
        </div>
      ) : run.type === "upload" ? (
        <UploadStage key={run.id} doc={run.doc} />
      ) : (
        <SearchStage key={run.id} kw={run.kw} matches={run.matches} />
      )}
    </div>
  );
}

// ── Server doc card ────────────────────────────────────────────────────────────
function ServerDoc({ doc }) {
  const seed = parseInt(sha256ish(doc.name).slice(0,8),16)||1;
  return (
    <div style={{
      background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:6, overflow:"hidden",
    }}>
      <div style={{
        padding:"8px 12px", background:"#111", borderBottom:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", gap:8,
      }}>
        <ServerIcon />
        <span style={{fontFamily:"Space Mono,monospace", fontSize:10, color:"#444"}}>
          {sha256ish(doc.name).slice(0,16)}...
        </span>
      </div>
      <div style={{padding:"8px 12px"}}>
        <div style={{fontFamily:"Space Mono,monospace", fontSize:9, color:"#2a2a2a", lineHeight:1.8, wordBreak:"break-all"}}>
          {gibberish(seed, 80)}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function LiveDemo() {
  const [vault, setVault] = useState([]);
  const [indexedKws, setIndexedKws] = useState({});
  const [anim, setAnim] = useState(null);
  const [searchAnim, setSearchAnim] = useState(null);
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const [libOpen, setLibOpen] = useState(true);
  const fileRef = useRef();

  function runPipeline(doc) {
    setAnim({ doc, id: Date.now() });
    setSearchAnim(null);
    setQueryResult(null);
    setLibOpen(false); // tidy up the sample list once something's been picked
    setTimeout(() => commitDoc(doc), UPLOAD_DUR*1000 - 100);
  }

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
  }

  function doSearch() {
    const q = query.trim().toLowerCase();
    if (!q || vault.length === 0) return;
    const matches = indexedKws[q] || [];
    setQueryResult({ q, matches });
    setAnim(null);
    setSearchAnim({ kw:q, matches, id: Date.now() });
  }

  function handleRealFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target.result;
      const keywords = extractKeywords(text, file.name);
      const preview = text.replace(/[^\x20-\x7E\n]/g," ").slice(0,150).trim();
      runPipeline({ id:file.name, name:file.name, preview, keywords });
    };
    reader.readAsText(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDropActive(false);
    const id = e.dataTransfer.getData("sampleId");
    if (id) {
      const doc = SAMPLES.find(s=>s.id===id);
      if (doc && !vault.find(v=>v.name===doc.name)) runPipeline(doc);
      return;
    }
    const file = e.dataTransfer.files[0];
    if (file) handleRealFile(file);
  }

  const currentRun = anim
    ? { type:"upload", doc: anim.doc, id: anim.id }
    : searchAnim
      ? { type:"search", kw: searchAnim.kw, matches: searchAnim.matches, id: searchAnim.id }
      : null;

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0a0a",
      padding:"60px 0",
      fontFamily:"Space Grotesk, sans-serif",
    }}>
      <div style={{maxWidth:1200, margin:"0 auto", padding:"0 32px"}}>

        {/* Header */}
        <div style={{marginBottom:48}}>
          <div style={{
            fontFamily:"Space Mono,monospace", fontSize:11, color:"#ffd208",
            letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12,
          }}>Interactive demo</div>
          <h2 style={{fontSize:"clamp(28px,4vw,44px)", fontWeight:700, color:"#f5f5f0", letterSpacing:"-0.025em", lineHeight:1.1}}>
            Try it yourself
          </h2>
        </div>

        {/* 3-col grid */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 320px 1fr", gap:16, alignItems:"start"}}>

          {/* Client panel */}
          <div style={{
            background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8,
            padding:20, display:"flex", flexDirection:"column", gap:14,
          }}>
            <div style={{fontSize:10, fontFamily:"Space Mono,monospace", letterSpacing:"0.12em", color:"#444", textTransform:"uppercase"}}>Client</div>

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
              <div style={{fontSize:22, color: dropActive?"#ffd208":"#2a2a2a", marginBottom:6, transition:"color 0.2s"}}>↑</div>
              <div style={{fontSize:13, fontWeight:600, color: dropActive?"#ffd208":"#555"}}>
                {dropActive ? "drop to encrypt" : "drop or click to upload"}
              </div>
              <div style={{fontSize:11, color:"#333", marginTop:3}}>PDF or TXT</div>
            </div>

            {/* Sample library — collapses itself once a sample has been picked */}
            <div style={{border:"1px solid #1a1a1a", borderRadius:6, overflow:"hidden"}}>
              <button
                onClick={()=>setLibOpen(o=>!o)}
                style={{
                  width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"10px 14px", background:"#111", border:"none",
                  color:"#888", fontSize:12, fontWeight:600, cursor:"pointer",
                  fontFamily:"Space Grotesk, sans-serif",
                }}
              >
                <span>Sample PDFs to upload {vault.length>0 && <span style={{color:"#444", fontWeight:400}}>({vault.length} indexed)</span>}</span>
                <span style={{fontSize:10}}>{libOpen?"▲":"▼"}</span>
              </button>
              {libOpen && (
                <div style={{borderTop:"1px solid #1a1a1a"}}>
                  {SAMPLES.map(s=>{
                    const indexed = vault.some(v=>v.name===s.name);
                    return (
                      <div
                        key={s.id}
                        draggable={!indexed}
                        onDragStart={e=>e.dataTransfer.setData("sampleId",s.id)}
                        onClick={()=>{ if(!indexed) runPipeline(s); }}
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
                        <div style={{flex:1, minWidth:0}}>
                          <div style={{fontSize:11, fontWeight:600, color:"#ccc", display:"flex", alignItems:"center", gap:6}}>
                            <span style={{overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{s.name}</span>
                            {indexed && <span style={{fontSize:9, color:"#ffd208", flexShrink:0}}>indexed</span>}
                          </div>
                          <div style={{fontSize:10, color:"#444", marginTop:2, fontFamily:"Space Mono,monospace"}}>
                            {s.keywords.slice(0,3).join(", ")}...
                          </div>
                        </div>
                        {!indexed && <span style={{fontSize:10, color:"#333", flexShrink:0}}>drag</span>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Keyword index */}
            {vault.length > 0 && (
              <div style={{background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:6, padding:"12px 14px"}}>
                <div style={{fontSize:9, fontFamily:"Space Mono,monospace", letterSpacing:"0.1em", color:"#333", textTransform:"uppercase", marginBottom:10}}>
                  Keyword index
                </div>
                {vault.map(doc=>(
                  <div key={doc.name} style={{marginBottom:10}}>
                    <div style={{fontSize:10, color:"#444", marginBottom:6, fontFamily:"Space Mono,monospace",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
                      {doc.name}
                    </div>
                    <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
                      {doc.keywords.map(kw=>(
                        <span
                          key={kw}
                          onClick={()=>setQuery(kw)}
                          style={{
                            fontSize:10, padding:"2px 8px", borderRadius:20, cursor:"pointer",
                            background: queryResult?.q===kw.toLowerCase() ? "#ffd20815" : "#111",
                            color: queryResult?.q===kw.toLowerCase() ? "#ffd208" : "#555",
                            border: `1px solid ${queryResult?.q===kw.toLowerCase() ? "#ffd20844" : "#1a1a1a"}`,
                            transition:"all 0.2s",
                          }}
                        >{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Search */}
            {vault.length > 0 && (
              <div style={{display:"flex", flexDirection:"column", gap:8}}>
                <div style={{display:"flex", gap:6}}>
                  <input
                    value={query}
                    onChange={e=>{setQuery(e.target.value);setQueryResult(null);}}
                    onKeyDown={e=>e.key==="Enter"&&doSearch()}
                    placeholder="type a keyword..."
                    style={{
                      flex:1, padding:"8px 12px", fontSize:12,
                      background:"#0d0d0d", border:"1px solid #1a1a1a",
                      borderRadius:6, color:"#f5f5f0",
                      fontFamily:"Space Grotesk, sans-serif", outline:"none",
                    }}
                    onFocus={e=>e.target.style.borderColor="#ffd208"}
                    onBlur={e=>e.target.style.borderColor="#1a1a1a"}
                  />
                  <button
                    onClick={doSearch}
                    style={{
                      width:38, background:"#ffd208", border:"none",
                      borderRadius:6, color:"#0a0a0a", cursor:"pointer",
                      fontSize:16, fontWeight:700, transition:"all 0.2s",
                    }}
                    onMouseEnter={e=>e.target.style.background="#ffe040"}
                    onMouseLeave={e=>e.target.style.background="#ffd208"}
                  >→</button>
                </div>
                {queryResult && (
                  <div style={{
                    padding:"8px 12px", borderRadius:6, fontSize:12,
                    border:`1px solid ${queryResult.matches.length?"#ffd20844":"#2a2a2a"}`,
                    color: queryResult.matches.length?"#ffd208":"#444",
                    background: queryResult.matches.length?"#ffd20808":"transparent",
                    fontFamily:"Space Mono,monospace",
                  }}>
                    {queryResult.matches.length ? queryResult.matches.join(", ") : "no match"}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Animation panel */}
          <PipelineStage run={currentRun} />

          {/* Server panel */}
          <div style={{
            background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:8,
            padding:20, display:"flex", flexDirection:"column", gap:12,
          }}>
            <div style={{fontSize:10, fontFamily:"Space Mono,monospace", letterSpacing:"0.12em", color:"#333", textTransform:"uppercase"}}>Server</div>
            <div style={{fontSize:11, color:"#333", fontFamily:"Space Mono,monospace"}}>no plaintext stored</div>
            {vault.length === 0 ? (
              <div style={{fontSize:11, color:"#222", textAlign:"center", padding:"20px 0", fontFamily:"Space Mono,monospace"}}>
                empty
              </div>
            ) : (
              <div style={{display:"flex", flexDirection:"column", gap:8}}>
                {vault.map(doc=><ServerDoc key={doc.name} doc={doc} />)}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}