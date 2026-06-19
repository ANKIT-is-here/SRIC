import React, { useState } from 'react';
import { Terminal, Copy, Check, FileCode, Server } from 'lucide-react';

export default function Documentation() {
  const [activeTab, setActiveTab] = useState('python');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    python: `import httpx
from latticectrl import CryptClient

# 1. Initialize local cryptographic client
client = CryptClient(
    n_params="ntru_oqxt_610", 
    secret_key_path="./keys/private.key"
)

# 2. Local encryption of keywords to trapdoor hashes
query_string = "insulin diabetes patient"
tokens = client.generate_trapdoors(query_string)
# Output: ["8E7A4C9F", "A0F3D21E", "5C6D7E8F"]

# 3. Dispatch secure conjunctive search to cloud host
response = httpx.post(
    "https://api.latticectrypt.io/v1/conjunctive-search",
    json={"word_ids": tokens}
)

# 4. Decrypt matched document lists locally
results = response.json()
matched_docs = client.decrypt_results(results["output"])

print(f"Decrypted Matches: {matched_docs}")`,

    node: `const { CryptClient } = require('@latticectrypt/sdk');
const axios = require('axios');

// 1. Initialize local cryptographic client
const client = new CryptClient({
  keyPath: './keys/private.key'
});

async function runSecureSearch() {
  // 2. Local encryption of query strings
  const trapdoors = client.generateTrapdoors("machine learning");
  
  // 3. Dispatch blind search query
  const res = await axios.post('https://api.latticectrypt.io/v1/conjunctive-search', {
    word_ids: trapdoors
  });
  
  // 4. Decrypt ciphertext payload locally
  const matchedDocs = client.decryptResults(res.data.output);
  console.log("Decrypted Matches:", matchedDocs);
}

runSecureSearch();`,

    java: `import io.latticectrypt.CryptClient;
import io.latticectrypt.SearchResults;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.URI;

public class App {
    public static void main(String[] args) throws Exception {
        // 1. Load keys and client
        CryptClient client = new CryptClient("./keys/private.key");
        
        // 2. Encrypt search words locally
        String[] trapdoors = client.generateTrapdoors("revenue targets");
        
        // 3. Execute request
        String jsonPayload = String.format("{\\"word_ids\\": [\\"%s\\", \\"%s\\"]}", trapdoors[0], trapdoors[1]);
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.latticectrypt.io/v1/conjunctive-search"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();
            
        // 4. Parse results
        String responseBody = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString()).body();
        String[] matchedDocs = client.decryptResults(responseBody);
    }
}`,

    rest: `# Post-Quantum Inverted Index Setup Endpoint
POST /upload
Host: api.latticectrypt.io
Content-Type: multipart/form-data

files: [text_corpus.txt]

# Cryptographic Conjunctive Search Endpoint
POST /conjunctive-search
Host: api.latticectrypt.io
Content-Type: application/json

{
  "word_ids": ["8E7A4C9F", "A0F3D21E"],
  "words": ["machine", "learning"]
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="docs" className="section-padding">
      <div className="container">
        
        {/* HEADER */}
        <div className="text-center" style={{ marginBottom: 60 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16 }}>Developer Core</div>
          <h2 className="section-title">Developer Integration & SDKs</h2>
          <p className="subtitle">
            Integrate post-quantum secure searchable symmetric encryption into your app pipelines in minutes.
          </p>
        </div>

        {/* CODE WINDOW LAYOUT */}
        <div className="docs-layout-grid">
          
          {/* LEFT: EXPLANATORY GUIDE */}
          <div className="docs-text-guide">
            <div className="guide-step">
              <span className="step-num">01</span>
              <h4>Load Local Cryptographic Secrets</h4>
              <p className="text-secondary">
                SDKs operate strictly within client environments. Your private keys stay inside client RAM boundaries, keeping your cryptographic root of trust fully isolated from the host.
              </p>
            </div>
            
            <div className="guide-step">
              <span className="step-num">02</span>
              <h4>Generate Trapdoor Tokens</h4>
              <p className="text-secondary">
                Convert search strings into blind hex tokens locally. Host index query nodes match tokens without seeing the underlying search keywords.
              </p>
            </div>

            <div className="guide-step">
              <span className="step-num">03</span>
              <h4>Submit Blind Queries & Decrypt</h4>
              <p className="text-secondary">
                Query calculations compile in zero-knowledge. Results are returned in encrypted states, and decrypted on client hardware inside secure sandboxes.
              </p>
            </div>
          </div>

          {/* RIGHT: IDE CODE PANEL */}
          <div className="ide-panel">
            <div className="ide-header">
              <div className="ide-tabs">
                <button className={`ide-tab ${activeTab === 'python' ? 'active' : ''}`} onClick={() => setActiveTab('python')}>python</button>
                <button className={`ide-tab ${activeTab === 'node' ? 'active' : ''}`} onClick={() => setActiveTab('node')}>node.js</button>
                <button className={`ide-tab ${activeTab === 'java' ? 'active' : ''}`} onClick={() => setActiveTab('java')}>java</button>
                <button className={`ide-tab ${activeTab === 'rest' ? 'active' : ''}`} onClick={() => setActiveTab('rest')}>rest api</button>
              </div>

              <button className="ide-copy-btn" onClick={handleCopy}>
                {copied ? <Check size={14} className="green" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="ide-body">
              <pre className="ide-code text-mono">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>

            <div className="ide-footer">
              <span className="footer-status">● Sandbox API v1.0.0</span>
              <span className="footer-lang">{activeTab} environment ready</span>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .docs-layout-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .docs-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .docs-text-guide {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .guide-step {
          position: relative;
          padding-left: 50px;
        }

        .guide-step .step-num {
          position: absolute;
          left: 0;
          top: 0;
          font-family: var(--font-mono);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .guide-step h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .guide-step p {
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* IDE Panel */
        .ide-panel {
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          background: #060913;
          box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 480px;
        }

        .ide-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0c0f1d;
          border-bottom: 1px solid var(--border-glass);
          padding: 0 16px;
          height: 48px;
        }

        .ide-tabs {
          display: flex;
          gap: 4px;
          height: 100%;
        }

        .ide-tab {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0 16px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          height: 100%;
        }

        .ide-tab:hover {
          color: var(--text-primary);
        }

        .ide-tab.active {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.02);
        }

        .ide-copy-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 6px;
          padding: 6px 12px;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-smooth);
        }

        .ide-copy-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(0, 212, 255, 0.03);
        }

        .ide-body {
          flex-grow: 1;
          padding: 24px;
          overflow: auto;
        }

        .ide-code {
          color: #a5b4fc;
          font-size: 0.8rem;
          line-height: 1.5;
          text-align: left;
          white-space: pre;
        }

        .ide-footer {
          display: flex;
          justify-content: space-between;
          padding: 10px 16px;
          background: #090c17;
          border-top: 1px solid var(--border-glass);
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }

        .green {
          color: #10b981;
        }
      `}</style>
    </section>
  );
}
