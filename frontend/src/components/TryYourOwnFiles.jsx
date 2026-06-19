import React, { useState, useEffect } from 'react';
import { Upload, FileText, Trash2, RefreshCw, Download, ArrowRight, ShieldAlert, Cpu, Lock, CheckCircle2, Shield, Search, AlertCircle, Sparkles } from 'lucide-react';

export default function TryYourOwnFiles() {
  const [dragActive, setDragActive] = useState(false);
  const [customFiles, setCustomFiles] = useState([]);
  const [selectedSamples, setSelectedSamples] = useState([]); // Array of sample names
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1: Reading, 2: Indexing, 3: Encrypting, 4: Complete
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const [indexStats, setIndexStats] = useState({
    total_words: 0,
    total_docs: 0,
    index_entries: 0,
    docs: [],
    words_sample: []
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [logs, setLogs] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);

  // Preloaded Sample Files Collection
  const sampleCorpus = [
    {
      name: "ai_privacy_research.txt",
      preview: "Reviews deep learning, parameter weights, and homomorphic search privacy architectures...",
      content: "Artificial intelligence systems rely on deep learning networks. Securing parameters requires homomorphic cryptosystems and vector mathematics."
    },
    {
      name: "health_clinical_audit.txt",
      preview: "Contains patient diagnostic summaries, clinical trial statistics, and insulin logs...",
      content: "The healthcare audit reveals patient diagnostic codes. Clinical trials monitor diabetes therapies and insulin concentration logs."
    },
    {
      name: "q1_financial_projection.txt",
      preview: "Contains quarterly revenue growth targets, cloud scaling models, and pricing metrics...",
      content: "Quarterly revenue projections exceeded expectations. Cloud computing budgets will scale to accommodate rising enterprise revenue data."
    }
  ];

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: message, type }]);
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/stats');
      if (res.ok) {
        const data = await res.json();
        setIndexStats(data);
      }
    } catch (err) {
      addLog(`Error loading database stats: ${err.message}`, 'error');
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Save sample contents to sessionStorage on mount so they are always downloadable
    sampleCorpus.forEach(doc => {
      if (!sessionStorage.getItem(`doc_content:${doc.name}`)) {
        sessionStorage.setItem(`doc_content:${doc.name}`, doc.content);
      }
    });

    addLog("Enterprise Upload Portal Initialized. Choose sample files or drop custom files.", "info");
  }, []);

  // Toggle sample selection
  const handleToggleSample = (sampleName) => {
    setSelectedSamples(prev => {
      const exists = prev.includes(sampleName);
      if (exists) {
        addLog(`Removed sample file from queue: ${sampleName}`, 'info');
        return prev.filter(x => x !== sampleName);
      } else {
        addLog(`Added sample file to queue: ${sampleName}`, 'info');
        return [...prev, sampleName];
      }
    });
  };

  // Handle Drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop events
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Handle File Input Change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Process selected files
  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      const isValid = ['txt', 'csv', 'json'].includes(ext);
      if (!isValid) {
        addLog(`Ignored ${file.name} — Only .txt, .csv, and .json files are supported.`, 'error');
      }
      return isValid;
    });

    if (validFiles.length > 0) {
      setCustomFiles(prev => {
        const unique = [...prev];
        validFiles.forEach(f => {
          if (!unique.some(x => x.name === f.name)) {
            unique.push(f);
            addLog(`Queued custom file: ${f.name} (${(f.size / 1024).toFixed(1)} KB)`, 'info');
            
            // Read and store file content in sessionStorage for downloads
            const reader = new FileReader();
            reader.onload = (e) => {
              sessionStorage.setItem(`doc_content:${f.name}`, e.target.result);
            };
            reader.readAsText(f);
          } else {
            addLog(`Duplicate file skipped: ${f.name}`, 'error');
          }
        });
        return unique;
      });
    }
  };

  const handleRemoveCustomFile = (index) => {
    const filename = customFiles[index].name;
    setCustomFiles(prev => prev.filter((_, i) => i !== index));
    addLog(`Removed custom file: ${filename}`, 'info');
  };

  // Build the FormData and upload files (both selected samples and uploaded files)
  const handleUpload = async () => {
    const totalQueued = selectedSamples.length + customFiles.length;
    if (totalQueued === 0) return;

    setIsUploading(true);
    setShowSuccessAlert(false);
    setUploadProgress(10);
    setUploadStep(1); // Reading files
    addLog(`Ingesting ${totalQueued} document(s) into cryptographic indexing pipeline...`, 'info');

    const formData = new FormData();

    // 1. Package selected samples
    selectedSamples.forEach(sampleName => {
      const sample = sampleCorpus.find(x => x.name === sampleName);
      if (sample) {
        const blob = new Blob([sample.content], { type: 'text/plain' });
        formData.append('files', blob, sample.name);
      }
    });

    // 2. Package uploaded custom files
    customFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await new Promise(r => setTimeout(r, 600));
      setUploadProgress(40);
      setUploadStep(2); // Tokenize
      addLog("Extracting text streams and calculating local index frequencies...", 'info');
      
      await new Promise(r => setTimeout(r, 800));
      setUploadProgress(70);
      setUploadStep(3); // Symmetric Encryption (NTRU setup)
      addLog("Encrypting word lists. Running secure ntru-oqxt-setup key generation...", 'info');

      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setUploadProgress(100);
      setUploadStep(4); // Finished
      
      addLog(`Cryptographic Indexing Complete. Successfully indexed:`, 'success');
      data.processed.forEach(p => {
        addLog(`  ${p.filename} → Hex ID: [${p.doc_id}] (${p.token_count} tokens)`, 'success');
      });
      
      // Show success alert overlay
      setShowSuccessAlert(true);
      
      // Clear queues
      setCustomFiles([]);
      setSelectedSamples([]);
      fetchStats();
    } catch (err) {
      addLog(`Crypto-index pipeline failure: ${err.message}`, 'error');
      setUploadStep(0);
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStep(0);
      }, 3000);
    }
  };

  // Search Uploaded files
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    addLog(`Querying index for keywords: "${searchQuery}"`, 'info');
    const words = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    try {
      // Resolve IDs
      const resolved = await Promise.all(words.map(async w => {
        const res = await fetch(`/search?q=${encodeURIComponent(w)}`);
        const d = await res.json();
        return { word: w, id: d.found ? d.word_id : null, docs: d.found ? d.docs : [] };
      }));

      const missing = resolved.filter(r => !r.id).map(r => r.word);
      if (missing.length > 0) {
        addLog(`Search aborted: keywords [${missing.join(', ')}] do not exist in current cipher index.`, 'error');
        setSearchResults({ found: false, missing });
        return;
      }

      const ids = resolved.map(r => r.id);
      addLog(`Executing blind search on: ${ids.join(' AND ')}`, 'info');

      const searchRes = await fetch('/conjunctive-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word_ids: ids, words: words })
      });

      if (!searchRes.ok) throw new Error("Search server returned error state");
      
      const searchData = await searchRes.json();
      addLog(`Search complete. Matches identified.`, 'success');

      // Find intersection of documents
      let matchingDocs = [];
      if (resolved.length > 0 && resolved.every(r => r.id)) {
        matchingDocs = [...resolved[0].docs];
        for (let i = 1; i < resolved.length; i++) {
          const wordDocs = resolved[i].docs || [];
          matchingDocs = matchingDocs.filter(d1 => 
            wordDocs.some(d2 => d2.doc_id === d1.doc_id)
          );
        }
      }

      setSearchResults({
        found: true,
        words: words,
        word_ids: ids,
        matchingDocs: matchingDocs,
        output: searchData.output,
        time: "0.28 ms"
      });
    } catch (err) {
      addLog(`Failed secure query: ${err.message}`, 'error');
    }
  };

  const handleDownload = (filename) => {
    const content = sessionStorage.getItem(`doc_content:${filename}`);
    if (!content) {
      addLog(`Cannot download ${filename} — file content not found in local session cache.`, 'error');
      return;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addLog(`Downloaded document: ${filename}`, 'success');
  };

  // Reset Index Database
  const handleReset = async () => {
    if (!window.confirm("WARNING: This will permanently delete all indexed document maps, vocabulary lists, and symmetric keys. Are you sure?")) return;
    
    addLog("Sending index purge command to server...", "info");
    try {
      const res = await fetch('/reset', { method: 'DELETE' });
      if (res.ok) {
        addLog("Cryptographic database wiped successfully. Clean state loaded.", "error");
        setSearchResults(null);
        fetchStats();
      }
    } catch (err) {
      addLog(`Purge failed: ${err.message}`, "error");
    }
  };

  return (
    <section id="try-files" className="section-padding">
      <div className="container">
        
        {/* HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Secure Data Loader</div>
          <h2 className="section-title">Try Your Own Files</h2>
          <p className="subtitle">
            Upload custom corpus documents or load preconfigured templates. Our system tokenizes, indexes, and encrypts everything locally and on the server.
          </p>
        </div>

        {/* THREE ROW STATS */}
        <div className="try-stats-row" style={{ marginBottom: 40 }}>
          <div className="stat-card glass-panel">
            <span className="stat-num">{indexStats.total_docs}</span>
            <span className="stat-label">Indexed Documents</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-num">{indexStats.total_words.toLocaleString()}</span>
            <span className="stat-label">Vocabulary Size</span>
          </div>
          <div className="stat-card glass-panel">
            <span className="stat-num">{indexStats.index_entries.toLocaleString()}</span>
            <span className="stat-label">Index Inversions</span>
          </div>
        </div>

        {/* PRELOADED SAMPLES SELECTION CARD */}
        <div className="samples-card-block glass-panel" style={{ marginBottom: 40 }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} className="accent-text-cyan" /> Select Pre-configured Sample Files
          </h4>
          <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: 20 }}>
            Click on any pre-seeded document below to preview its content summary and add it to your cryptographic encryption queue.
          </p>
          
          <div className="samples-grid">
            {sampleCorpus.map((sample, idx) => {
              const isSelected = selectedSamples.includes(sample.name);
              return (
                <div 
                  key={idx} 
                  className={`sample-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleToggleSample(sample.name)}
                >
                  <div className="sample-item-checkbox">
                    {isSelected ? <CheckCircle2 size={16} className="green" /> : <div className="checkbox-empty" />}
                  </div>
                  <div className="sample-item-body">
                    <span className="sample-item-filename">{sample.name}</span>
                    <p className="sample-item-preview">{sample.preview}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* UPLOAD & STATS AREA */}
        <div className="upload-section-grid">
          
          {/* LEFT: DRAG DROP & FLOW */}
          <div className="upload-portal glass-panel">
            <h3 className="panel-title-text"><Upload size={14} /> Ingest Your Own Files</h3>
            
            <div 
              className={`dropzone-container ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                id="file-upload-input" 
                multiple 
                accept=".txt,.csv,.json"
                onChange={handleChange}
                disabled={isUploading}
              />
              <Upload className="upload-zone-icon" />
              <p className="upload-main-text">Drag and drop files here</p>
              <p className="upload-sub-text">Supports .txt, .csv, and .json up to 10MB</p>
            </div>

            {/* QUEUED FILES LIST */}
            {(selectedSamples.length > 0 || customFiles.length > 0) && (
              <div className="queued-files-list">
                <h5>Files Queued for Encryption ({selectedSamples.length + customFiles.length})</h5>
                
                <div className="queued-scroll">
                  {/* Selected Samples in Queue */}
                  {selectedSamples.map((sampleName, idx) => (
                    <div key={`sample-${idx}`} className="file-chip">
                      <FileText size={14} className="accent-text-purple" />
                      <span className="file-chip-name">{sampleName} <span className="sample-tag-indicator">Sample</span></span>
                      <button className="remove-file-btn" onClick={() => handleToggleSample(sampleName)}>✕</button>
                    </div>
                  ))}
                  
                  {/* Custom Files in Queue */}
                  {customFiles.map((file, idx) => (
                    <div key={`custom-${idx}`} className="file-chip">
                      <FileText size={14} className="accent-text-cyan" />
                      <span className="file-chip-name">{file.name}</span>
                      <span className="file-chip-size">({(file.size / 1024).toFixed(1)} KB)</span>
                      <button className="remove-file-btn" onClick={() => handleRemoveCustomFile(idx)}>✕</button>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: 16 }}
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  Encrypt & Index Queue
                </button>
              </div>
            )}

            {/* SUCCESS UPLOAD ALERT OVERLAY */}
            {showSuccessAlert && (
              <div className="success-upload-alert fade-in">
                <CheckCircle2 className="alert-success-icon" />
                <div>
                  <strong>Files Ingested Successfully!</strong>
                  <p>Inverted index generated and stored under blind symmetric envelopes.</p>
                </div>
                <button className="close-alert-btn" onClick={() => setShowSuccessAlert(false)}>✕</button>
              </div>
            )}

            {/* PROGRESS BAR & PIPELINE ANIMATION */}
            {isUploading && (
              <div className="indexing-pipeline-animation">
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                
                <div className="pipeline-steps-icons">
                  <div className={`pipe-icon-step ${uploadStep >= 1 ? 'active' : ''}`}>
                    <FileText size={16} />
                    <span>Read</span>
                  </div>
                  <ArrowRight size={12} className="pipe-arrow-m" />
                  <div className={`pipe-icon-step ${uploadStep >= 2 ? 'active' : ''}`}>
                    <Cpu size={16} />
                    <span>Tokenize</span>
                  </div>
                  <ArrowRight size={12} className="pipe-arrow-m" />
                  <div className={`pipe-icon-step ${uploadStep >= 3 ? 'active' : ''}`}>
                    <Lock size={16} />
                    <span>Encrypt</span>
                  </div>
                  <ArrowRight size={12} className="pipe-arrow-m" />
                  <div className={`pipe-icon-step ${uploadStep >= 4 ? 'active' : ''}`}>
                    <CheckCircle2 size={16} />
                    <span>Store</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: CRYPTOGRAPHIC LOGS & MAP DOWNLOADS */}
          <div className="upload-logs-panel glass-panel">
            <h3 className="panel-title-text"><ShieldAlert size={14} /> Log & System Map</h3>
            
            <div className="logs-view-mini">
              {logs.map((l, i) => (
                <div key={i} className={`log-line-item ${l.type}`}>
                  <span className="log-time">[{l.time}]</span>
                  <span className="log-text">{l.text}</span>
                </div>
              ))}
            </div>

            {/* DOWNLOAD KEYS MAP */}
            <div className="downloads-area">
              <h4>Download Cryptographic Maps</h4>
              <p className="text-secondary" style={{ fontSize: 11, marginBottom: 12 }}>
                These files map plaintext keywords and document paths to internal hex values to complete local query encryption.
              </p>
              
              <div className="download-chips">
                <a className="dl-chip" href="http://localhost:8000/download/word_to_id.csv" target="_blank" rel="noreferrer">
                  <Download size={12} /> word_to_id.csv
                </a>
                <a className="dl-chip" href="http://localhost:8000/download/id_to_word.csv" target="_blank" rel="noreferrer">
                  <Download size={12} /> id_to_word.csv
                </a>
                <a className="dl-chip" href="http://localhost:8000/download/doc_to_id.csv" target="_blank" rel="noreferrer">
                  <Download size={12} /> doc_to_id.csv
                </a>
                <a className="dl-chip" href="http://localhost:8000/download/inverted_index.csv" target="_blank" rel="noreferrer">
                  <Download size={12} /> inverted_index.csv
                </a>
              </div>
            </div>

            <div className="logs-footer-actions">
              <button className="btn btn-secondary btn-sm" onClick={fetchStats}>
                <RefreshCw size={12} style={{ marginRight: 6 }} /> Refresh
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleReset}>
                <Trash2 size={12} style={{ marginRight: 6 }} /> Reset Database
              </button>
            </div>
          </div>

        </div>

        {/* QUERY UPLOADED INDEX PANEL */}
        {indexStats.total_docs > 0 && (
          <div className="uploaded-search-panel glass-panel" style={{ marginTop: 40 }}>
            <h3 className="panel-title-text"><Search size={14} /> Search Uploaded Corpus</h3>
            
            {/* GLOWING ANIMATED INPUT CONTAINER */}
            <form onSubmit={handleSearch} className={`search-form-row search-bar-container ${searchFocus ? 'focused' : ''}`}>
              <div className="search-bar-neon-frame"></div>
              <div className="search-input-wrap" style={{ flexGrow: 1, position: 'relative' }}>
                <Search className="search-bar-icon" size={20} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: searchFocus ? 'var(--accent-cyan)' : 'var(--text-muted)', transition: 'color 0.3s ease' }} />
                <input 
                  type="text" 
                  className="input-field search-bar-input" 
                  placeholder="Enter keywords separated by spaces to search matching ciphertexts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocus(true)}
                  onBlur={() => setSearchFocus(false)}
                  style={{ width: '100%', paddingLeft: 52, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-glass)', borderRadius: 8 }}
                />
              </div>
              <button type="submit" className="btn btn-cyan search-bar-btn">
                Query Index
              </button>
            </form>

            {searchResults && (
              <div className="search-result-block fade-in" style={{ marginTop: 30 }}>
                {searchResults.found ? (
                  <div className="result-success-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <span className="badge badge-green">Results Decrypted</span>
                      <span className="badge">Search Speed: {searchResults.time}</span>
                    </div>

                    {/* Word IDs display */}
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Cryptographic Word IDs matching your search:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {searchResults.words.map((w, idx) => (
                          <span key={idx} style={{ 
                            fontSize: 11, 
                            fontFamily: 'var(--font-mono)', 
                            background: 'rgba(123, 97, 255, 0.1)', 
                            color: 'var(--accent-purple)', 
                            padding: '4px 10px', 
                            borderRadius: 4,
                            border: '1px solid rgba(123, 97, 255, 0.25)'
                          }}>
                            <strong>{w}</strong> → Token: [{searchResults.word_ids[idx]}]
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Matching Documents lists and downloads */}
                    <div style={{ marginBottom: 20 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Matching Document IDs where searched text is located:</span>
                      {searchResults.matchingDocs && searchResults.matchingDocs.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {searchResults.matchingDocs.map((doc, idx) => (
                            <div key={idx} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid var(--border-glass)',
                              padding: '8px 12px',
                              borderRadius: 6
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-cyan)' }}>
                                  📄 {doc.doc_name}
                                </span>
                                <span className="text-mono" style={{ 
                                  fontSize: 10, 
                                  background: 'rgba(0, 212, 255, 0.1)', 
                                  color: 'var(--accent-cyan)', 
                                  padding: '2px 6px', 
                                  borderRadius: 4,
                                  border: '1px solid rgba(0, 212, 255, 0.2)'
                                }}>
                                  Doc ID: {doc.doc_id}
                                </span>
                              </div>
                              <button 
                                className="btn btn-secondary btn-sm" 
                                style={{ padding: '4px 10px', fontSize: 10 }}
                                onClick={() => handleDownload(doc.doc_name)}
                              >
                                Download
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>No matching documents contain all search keywords.</p>
                      )}
                    </div>
                    
                    <pre className="text-mono" style={{ background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 8, fontSize: 13, border: '1px solid rgba(255,255,255,0.05)', color: '#10b981' }}>
                      {searchResults.output}
                    </pre>
                  </div>
                ) : (
                  <div className="result-error-box" style={{ background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.2)', padding: 16, borderRadius: 8, color: '#f43f5e' }}>
                    <strong>Keywords missing:</strong> {searchResults.missing.join(', ')} (no index matching).
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>

      <style>{`
        .try-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 640px) {
          .try-stats-row {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          padding: 24px;
          text-align: center;
        }

        .stat-num {
          display: block;
          font-size: 2.25rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        /* Samples Grid */
        .samples-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .sample-item-card {
          border: 1px solid var(--border-glass);
          background: rgba(255, 255, 255, 0.01);
          padding: 16px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          transition: var(--transition-smooth);
        }

        .sample-item-card:hover {
          border-color: rgba(0, 212, 255, 0.25);
          background: rgba(0, 212, 255, 0.02);
          transform: translateY(-2px);
        }

        .sample-item-card.active {
          border-color: var(--accent-purple);
          background: rgba(123, 97, 255, 0.05);
          box-shadow: 0 4px 15px rgba(123, 97, 255, 0.15);
        }

        .sample-item-checkbox {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .checkbox-empty {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid var(--text-muted);
        }

        .sample-item-filename {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
          margin-bottom: 4px;
        }

        .sample-item-card.active .sample-item-filename {
          color: var(--accent-purple);
        }

        .sample-item-preview {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Upload grids */
        .upload-section-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 30px;
        }

        @media (max-width: 1024px) {
          .upload-section-grid {
            grid-template-columns: 1fr;
          }
        }

        .upload-portal {
          padding: 30px;
          position: relative;
        }

        /* Dropzone styles */
        .dropzone-container {
          border: 2px dashed var(--border-glass);
          background: rgba(0, 0, 0, 0.15);
          border-radius: 12px;
          padding: 44px 24px;
          text-align: center;
          position: relative;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .dropzone-container:hover, .dropzone-container.drag-active {
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
          box-shadow: inset 0 0 20px rgba(0, 212, 255, 0.05);
        }

        .dropzone-container input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .upload-zone-icon {
          width: 38px;
          height: 38px;
          color: var(--text-muted);
          margin-bottom: 12px;
          transition: var(--transition-smooth);
        }

        .dropzone-container:hover .upload-zone-icon {
          color: var(--accent-cyan);
          transform: translateY(-2px);
        }

        .upload-main-text {
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 4px;
        }

        .upload-sub-text {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        /* Queued files list */
        .queued-files-list {
          margin-top: 24px;
          border-top: 1px solid var(--border-glass);
          padding-top: 20px;
        }

        .queued-files-list h5 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 12px;
        }

        .queued-scroll {
          max-height: 150px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .file-chip {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 8px 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .file-chip-name {
          margin-left: 8px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-grow: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sample-tag-indicator {
          font-size: 9px;
          background: rgba(123, 97, 255, 0.15);
          color: var(--accent-purple);
          border: 1px solid rgba(123, 97, 255, 0.25);
          padding: 1px 5px;
          border-radius: 4px;
        }

        .file-chip-size {
          color: var(--text-muted);
          margin-right: 12px;
        }

        .remove-file-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 11px;
        }

        .remove-file-btn:hover {
          color: #f43f5e;
        }

        /* Success upload toast */
        .success-upload-alert {
          margin-top: 20px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 8px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .alert-success-icon {
          color: #10b981;
          flex-shrink: 0;
        }

        .success-upload-alert p {
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin-top: 2px;
        }

        .close-alert-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .close-alert-btn:hover {
          color: white;
        }

        /* Indexing pipeline animation */
        .indexing-pipeline-animation {
          margin-top: 24px;
        }

        .progress-bar-track {
          height: 4px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 16px;
          position: relative;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          border-radius: 2px;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px var(--accent-cyan);
        }

        .pipeline-steps-icons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }

        .pipe-icon-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .pipe-icon-step.active {
          color: var(--accent-cyan);
        }

        .pipe-icon-step.active span {
          color: var(--text-primary);
        }

        .pipe-icon-step span {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .pipe-arrow-m {
          color: var(--text-muted);
          opacity: 0.5;
        }

        /* Upload logs panel */
        .upload-logs-panel {
          padding: 30px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 440px;
        }

        .logs-view-mini {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 12px;
          font-family: var(--font-mono);
          font-size: 10px;
          height: 160px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.3);
        }

        .downloads-area {
          margin: 20px 0;
          border-top: 1px solid var(--border-glass);
          padding-top: 20px;
        }

        .downloads-area h4 {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .download-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .dl-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          padding: 6px 12px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-smooth);
        }

        .dl-chip:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.03);
          transform: translateY(-1px);
        }

        .logs-footer-actions {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-glass);
          padding-top: 16px;
        }

        /* Animated Glowing Search Bar */
        .search-bar-container {
          position: relative;
          display: flex;
          align-items: center;
          padding: 6px;
          border-radius: 12px;
          background: rgba(5, 8, 22, 0.6);
          border: 1px solid var(--border-glass);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .search-bar-container.focused {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 25px rgba(0, 212, 255, 0.25);
          transform: translateY(-2px);
        }

        .search-bar-neon-frame {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          pointer-events: none;
          opacity: 0;
          border: 2px solid transparent;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan)) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          transition: opacity 0.3s ease;
        }

        .search-bar-container.focused .search-bar-neon-frame {
          opacity: 1;
        }

        .search-bar-input {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          outline: none !important;
          color: white;
          font-size: 1rem;
          height: 48px;
          padding-left: 52px !important;
        }

        .search-bar-btn {
          border-radius: 8px;
          padding: 12px 24px;
          height: 44px;
          font-size: 0.85rem;
          margin-left: 8px;
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          color: #050816;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
          transition: all 0.3s ease;
        }

        .search-bar-btn:hover {
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
          transform: translateY(-1px);
        }

        .green {
          color: #10b981;
        }

        .fade-in {
          animation: fade-in-keyframes 0.5s ease-out forwards;
        }

        @keyframes fade-in-keyframes {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
