import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, 
  Cpu, 
  Cloud, 
  Layout, 
  RotateCcw, 
  ArrowRight,
  Database,
  Shield,
  Search,
  Activity,
  GitBranch
} from 'lucide-react';

export default function Workflow() {
  const phases = [
    {
      id: 1,
      name: 'Local Environment Setup',
      icon: <Terminal className="w-6 h-6" />,
      tagline: 'Developer machine initialization',
      details: [
        {
          title: 'Repository Initialization (init)',
          description: 'Triggers the Node.js File System (fs) module to create a hidden .bitnestGit directory, acting as the local database for metadata and staging.'
        },
        {
          title: 'Tracking & Staging (add)',
          description: 'Copies file state into the staging area and updates the local tracker for the next snapshot.'
        }
      ]
    },
    {
      id: 2,
      name: 'The Versioning Engine',
      icon: <Cpu className="w-6 h-6" />,
      tagline: 'Immutable snapshot generation',
      details: [
        {
          title: 'UUID Generation',
          description: 'Every commit is assigned a Universally Unique Identifier for absolute tracking and integrity.'
        },
        {
          title: 'Metadata Snapshot',
          description: 'Creates a config.json containing author details, timestamps, commit messages, and file hashes.'
        },
        {
          title: 'Physical Blobs',
          description: 'Stores a compressed physical snapshot of staged files mapped to the specific UUID.'
        }
      ]
    },
    {
      id: 3,
      name: 'Cloud Synchronization',
      icon: <Cloud className="w-6 h-6" />,
      tagline: 'The bridge to the backend',
      details: [
        {
          title: 'Data Transmission (push)',
          description: 'Uses Axios to send multi-part requests to the Express.js server, handling both metadata and file blobs.'
        },
        {
          title: 'Authentication & Security',
          description: 'Every push is validated via JWT. The backend ensures correct permissions and sufficient user credits.'
        }
      ]
    },
    {
      id: 4,
      name: 'Web Management',
      icon: <Layout className="w-6 h-6" />,
      tagline: 'Visualization & Analytics',
      details: [
        {
          title: 'Command Center',
          description: 'React-based dashboard rendering file trees, heatmaps, and social features like starring repositories.'
        },
        {
          title: 'AI Audit (Optional)',
          description: 'LangChain-powered code reviews sent to LLMs for automated quality reports and issue creation.'
        }
      ]
    },
    {
      id: 5,
      name: 'Recovery & Sync',
      icon: <RotateCcw className="w-6 h-6" />,
      tagline: 'Collaboration and restoration',
      details: [
        {
          title: 'Project Retrieval (pull)',
          description: 'Fetches the latest remote version to synchronize the local development environment.'
        },
        {
          title: 'Restoration (revert)',
          description: 'Restores a previous state by fetching a specific UUID snapshot and overwriting the project root.'
        }
      ]
    }
  ];

  const summary = [
    { step: 1, component: 'CLI', tech: 'Node.js (fs)', task: 'Initialize .bitnestGit and track files.' },
    { step: 2, component: 'Versioning', tech: 'UUID / JSON', task: 'Create immutable snapshots with metadata.' },
    { step: 3, component: 'Network', tech: 'Axios / Express', task: 'Securely transfer blobs and data to cloud.' },
    { step: 4, component: 'Database', tech: 'MongoDB Atlas', task: 'Persist commit history and update analytics.' },
    { step: 5, component: 'UI/UX', tech: 'React / Tailwind', task: 'Visualize code, heatmaps, and AI reviews.' }
  ];

  return (
    <div className="min-h-screen bg-paper py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-24 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 mb-8">
            <Activity size={14} className="text-ink/60" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">System Lifecycle</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-ink mb-10">
            Working Process
          </h1>
          <p className="text-2xl text-ink/60 font-light leading-relaxed">
            BitNest integrates a high-performance CLI, a MERN-based dashboard, 
            and a custom versioning engine to bridge local development with cloud persistence.
          </p>
        </div>

        {/* Phases Section */}
        <div className="space-y-32">
          {phases.map((phase) => (
            <div key={phase.id} className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Phase Info */}
                <div className="lg:col-span-4 sticky top-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-ink text-paper flex items-center justify-center">
                      {phase.icon}
                    </div>
                    <div>
                      <p className="font-mono text-xs text-ink/40 uppercase tracking-widest">Phase 0{phase.id}</p>
                      <h2 className="text-3xl font-medium text-ink tracking-tight">{phase.name}</h2>
                    </div>
                  </div>
                  <p className="text-ink/50 text-lg font-light italic mb-8 border-l-2 border-ink/10 pl-4">
                    "{phase.tagline}"
                  </p>
                </div>

                {/* Phase Steps */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {phase.details.map((detail, idx) => (
                    <div key={idx} className="p-8 rounded-3xl border border-ink/10 bg-ink/[0.02] hover:bg-ink/[0.04] transition-colors group">
                      <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center mb-6 group-hover:border-ink transition-colors">
                        <span className="font-mono text-xs">{idx + 1}</span>
                      </div>
                      <h3 className="text-xl font-medium text-ink mb-4">{detail.title}</h3>
                      <p className="text-ink/60 font-light leading-relaxed">
                        {detail.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Table Section */}
        <div className="mt-48">
          <div className="mb-12">
            <h2 className="text-4xl font-medium tracking-tight text-ink mb-4">Architecture Summary</h2>
            <p className="text-ink/50 font-light">The foundational stack powering the BitNest ecosystem.</p>
          </div>
          
          <div className="overflow-x-auto border border-ink/10 rounded-3xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ink/[0.02] border-b border-ink/10">
                  <th className="px-8 py-6 font-mono text-xs uppercase tracking-widest text-ink/40">Step</th>
                  <th className="px-8 py-6 font-mono text-xs uppercase tracking-widest text-ink/40">Component</th>
                  <th className="px-8 py-6 font-mono text-xs uppercase tracking-widest text-ink/40">Technology</th>
                  <th className="px-8 py-6 font-mono text-xs uppercase tracking-widest text-ink/40">Primary Task</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {summary.map((row) => (
                  <tr key={row.step} className="hover:bg-ink/[0.01] transition-colors">
                    <td className="px-8 py-6 font-mono text-sm font-medium">0{row.step}</td>
                    <td className="px-8 py-6 font-medium text-ink">{row.component}</td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full bg-ink/5 text-ink/70 text-xs font-mono border border-ink/10">
                        {row.tech}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-ink/60 font-light">{row.task}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-32 pt-12 border-t border-ink/10 flex justify-between items-center">
          <Link to="/cli-guide" className="group inline-flex items-center gap-2 text-ink font-medium transition-opacity">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Return to How to Install
          </Link>
          <div className="text-ink/30 font-mono text-[10px] tracking-widest uppercase">
            BitNest Protocol &copy; 2026
          </div>
        </div>
      </div>
    </div>
  );
}
