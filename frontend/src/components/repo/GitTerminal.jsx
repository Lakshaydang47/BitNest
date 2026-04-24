import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import axios from 'axios';

const COMMANDS_HELP = {
  init: "Initialize the repository",
  add: "Stage files — usage: add file1.js, file2.css",
  commit: "Commit staged files — usage: commit <message>",
  push: "Push commits to remote",
  pull: "Pull latest commits from remote",
  revert: "Revert to a commit — usage: revert <commitId>",
  status: "Show staging and commit info",
  help: "Show available commands",
  clear: "Clear terminal output",
};

export default function GitTerminal({ repoId }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'BitNest Terminal v1.0 — Type "help" for available commands.' }
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const API = `https://backend-szu2.onrender.com/git`;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLine = (type, text) => {
    setHistory(prev => [...prev, { type, text }]);
  };

  const handleCommand = async (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    addLine('input', `$ bitnest ${trimmed}`);
    setInput('');

    const parts = trimmed.split(/\s+/);
    const firstWord = parts[0].toLowerCase();
    const startIdx = firstWord === 'bitnest' ? 1 : 0;
    const cmd = (parts[startIdx] || '').toLowerCase();
    const args = parts.slice(startIdx + 1).join(' ');

    if (cmd === 'clear') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }]);
      return;
    }

    if (cmd === 'help') {
      Object.entries(COMMANDS_HELP).forEach(([name, desc]) => {
        addLine('info', `  ${name.padEnd(8)} — ${desc}`);
      });
      return;
    }

    if (!['init', 'add', 'commit', 'push', 'pull', 'revert', 'status'].includes(cmd)) {
      addLine('error', `Command not found: '${cmd}'. Type "help" for available commands.`);
      return;
    }

    setLoading(true);

    try {
      let res;

      switch (cmd) {
        case 'init':
          res = await axios.post(`${API}/init/${repoId}`);
          break;

        case 'add': {
          if (!args) {
            addLine('error', 'Usage: add file1.js, file2.css');
            setLoading(false);
            return;
          }
          const files = args.split(',').map(f => f.trim()).filter(f => f);
          res = await axios.post(`${API}/add/${repoId}`, { files });
          break;
        }

        case 'commit': {
          if (!args) {
            addLine('error', 'Usage: commit <message>');
            setLoading(false);
            return;
          }
          res = await axios.post(`${API}/commit/${repoId}`, { message: args });
          break;
        }

        case 'push':
          res = await axios.post(`${API}/push/${repoId}`);
          break;

        case 'pull':
          res = await axios.post(`${API}/pull/${repoId}`);
          if (res.data.commits && res.data.commits.length > 0) {
            addLine('success', res.data.message);
            res.data.commits.forEach(c => {
              addLine('info', `  [${c.commitId.substring(0, 8)}] ${c.message} (${c.files?.length || 0} files)`);
            });
            setLoading(false);
            return;
          }
          break;

        case 'revert': {
          if (!args) {
            addLine('error', 'Usage: revert <commitId>');
            setLoading(false);
            return;
          }
          res = await axios.post(`${API}/revert/${repoId}`, { commitId: args });
          break;
        }

        case 'status':
          res = await axios.get(`${API}/status/${repoId}`);
          if (res.data) {
            const d = res.data;
            addLine('info', `  Initialized: ${d.initialized ? 'Yes' : 'No'}`);
            addLine('info', `  Staged files: ${d.stagedCount}`);
            if (d.stagedFiles.length > 0) {
              d.stagedFiles.forEach(f => addLine('info', `    ✓ ${f}`));
            }
            addLine('info', `  Total commits: ${d.commitCount}`);
            setLoading(false);
            return;
          }
          break;

        default:
          break;
      }

      // Generic response handling
      if (res?.data?.message) {
        const lineType = res.data.status === 'success' ? 'success' : 'info';
        addLine(lineType, res.data.message);
      }

      if (res?.data?.stagedFiles && cmd === 'add') {
        addLine('info', `  Staged: ${res.data.stagedFiles.join(', ')}`);
      }

    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      addLine('error', `Error: ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleCommand(input);
    }
  };

  const lineColors = {
    system: '#94a3b8',
    input: '#a5b4fc',
    success: '#4ade80',
    error: '#f87171',
    info: '#cbd5e1',
  };

  return (
    <div
      className="bg-[#0f172a] rounded-xl border border-slate-700 overflow-hidden shadow-lg font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Header */}
      <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-emerald-400" />
          <span className="text-slate-300 font-semibold text-xs tracking-wider uppercase">BitNest Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 max-h-80 overflow-y-auto custom-scrollbar" style={{ minHeight: '200px' }}>
        {history.map((line, idx) => (
          <div key={idx} className="leading-relaxed whitespace-pre-wrap break-all" style={{ color: lineColors[line.type] || '#cbd5e1' }}>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input Row */}
      <div className="border-t border-slate-700 bg-[#1e293b] px-4 py-3 flex items-center gap-2">
        <ChevronRight size={16} className="text-emerald-400 shrink-0" />
        <span className="text-emerald-400 shrink-0 text-xs">bitnest ~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={loading ? "Running..." : "Type a command..."}
          disabled={loading}
          className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600 text-sm disabled:opacity-50"
          autoFocus
        />
      </div>
    </div>
  );
}
