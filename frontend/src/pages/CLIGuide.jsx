import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal, Download, Cpu, Shield,
  ArrowLeft, Copy, Check, ExternalLink,
  Code2, Zap, Database, Github
} from 'lucide-react';



export default function CLIGuide() {
  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const commands = [
    {
      cmd: "node server.js init",
      desc: "Initialize a brand new local repository in your current working directory. This creates the necessary tracking structures.",
      usage: "node server.js init"
    },
    {
      cmd: "node server.js add <file>",
      desc: "Stage specific files for your next commit. This tells Bitnest which changes you want to track.",
      usage: "node server.js add index.js"
    },
    {
      cmd: "node server.js commit <message>",
      desc: "Create a permanent snapshot of your staged changes with a descriptive message and unique ID.",
      usage: "node server.js commit \"Initial project structure\""
    },
    {
      cmd: "node server.js push <repoId>",
      desc: "Upload your local commits to the cloud database. Requires the ID of the target repository.",
      usage: "node server.js push 65a2b...90c"
    },
    {
      cmd: "node server.js pull",
      desc: "Fetch the latest version of your code from the remote server and merge it into your local workspace.",
      usage: "node server.js pull"
    },
    {
      cmd: "node server.js revert <commitId>",
      desc: "Time travel back to a previous stable state. Replaces your current files with the ones from the target commit.",
      usage: "node server.js revert a1b2c3d4"
    }
  ];

  return (
    <div className="min-h-screen bg-paper font-sans selection:bg-indigo-100">



      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32 border-b border-ink/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(99,102,241,0.03)_0%,rgba(255,255,255,0)_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-ink/50 font-bold uppercase tracking-widest mb-8 group hover:text-ink transition-colors">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8 text-ink">
              How to Install <br /> BitNest.
            </h1>
            <p className="text-xl md:text-2xl text-ink/60 font-light leading-relaxed mb-12">
              Bitnest CLI brings the power of our version control system directly into your terminal. Manage repositories, track changes, and sync with the cloud using a familiar, Git-like experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/Lakshaydang47/BitNest/tree/main/backend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-4 text-sm font-medium hover:bg-ink/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-ink/10"
              >
                <Github size={18} />
                Download Core Files
              </a>
              <a
                href="#setup"
                className="inline-flex items-center gap-2 border border-ink/20 px-8 py-4 text-sm font-medium hover:bg-ink/5 transition-colors"
              >
                Setup Guide
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <section id="setup" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Cpu size={12} /> Step 01: Setup
            </div>
            <h2 className="text-4xl font-medium tracking-tight text-ink mb-6">Local Environment Configuration</h2>
            <p className="text-lg text-ink/60 font-light leading-relaxed mb-8">
              To use the Bitnest CLI, you need to set up the backend server locally. This allows the CLI to communicate with your database and handle file transfers.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-sm">1</div>
                <div>
                  <h4 className="font-bold text-ink mb-1">Clone & Install</h4>
                  <p className="text-sm text-ink/60">Download the repository and run <code>npm install</code> in the root directory.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-sm">2</div>
                <div>
                  <h4 className="font-bold text-ink mb-1">Configure .env</h4>
                  <p className="text-sm text-ink/60">Create a <code>.env</code> file in the backend folder with your MongoDB URI and desired port.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center font-mono text-sm">3</div>
                <div>
                  <h4 className="font-bold text-ink mb-1">Link Global Command</h4>
                  <p className="text-sm text-ink/60">Run <code>npm link</code> in the backend directory to use the <code>bitnest</code> command anywhere.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-ink rounded-3xl p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-4 right-4 text-paper/20 group-hover:text-paper/40 transition-colors">
              <Terminal size={40} />
            </div>
            <h3 className="text-paper font-mono text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Terminal Quickstart
            </h3>

            <div className="space-y-8">
              <div>
                <p className="text-paper/40 text-xs font-mono mb-2"># Install dependencies</p>
                <div className="flex items-center justify-between group/code cursor-pointer" onClick={() => copyToClipboard("npm install", "inst")}>
                  <code className="text-paper font-mono text-lg">npm install</code>
                  {copied === "inst" ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-paper/20 group-hover/code:text-paper/60" />}
                </div>
              </div>

              <div>
                <p className="text-paper/40 text-xs font-mono mb-2"># Set environment variables</p>
                <pre className="text-indigo-300 font-mono text-sm bg-paper/5 p-4 rounded-xl border border-paper/10 overflow-x-auto">
                  MONGO_DB=mongodb://yourusername:yourpassword@host:port/bitnest<br />
                  PORT=3002
                </pre>
              </div>

              <div className="pt-4">
                <p className="text-paper/40 text-xs font-mono mb-4 italic">// You are now ready to use "bitnest" command globally.</p>
                <div className="flex items-center gap-3 text-emerald-400 font-mono">
                  <Zap size={16} />
                  <span>Bitnest CLI Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Reference */}
      <section className="bg-ink/5 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-medium tracking-tighter text-ink mb-6">The Six Core Commands</h2>
            <p className="text-lg text-ink/60 font-light max-w-2xl mx-auto">
              Everything you need to manage your code history, from initialization to remote synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commands.map((c, i) => (
              <div
                key={i}
                className="bg-paper p-8 border border-ink/5 hover:border-ink/20 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center font-mono text-xl mb-6 group-hover:scale-110 transition-transform">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-ink font-mono mb-4">{c.cmd}</h3>
                <p className="text-ink/60 font-light text-sm leading-relaxed mb-6">
                  {c.desc}
                </p>
                <div className="mt-auto bg-ink/5 p-3 rounded font-mono text-xs text-ink/40 border border-ink/5">
                  $ {c.usage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VS Code Integration */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[3rem] p-12 md:p-20 text-paper relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-20"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-medium tracking-tighter mb-8 leading-tight">
                Seamless Integration with VS Code.
              </h2>
              <div className="space-y-6 text-paper/80 font-light text-lg">
                <p>
                  Our CLI is designed to work perfectly within the VS Code integrated terminal. No extra extensions required.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 flex-shrink-0" size={20} />
                    <span>Real-time feedback directly in your editor's terminal.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 flex-shrink-0" size={20} />
                    <span>Automatic directory tracking—no need to switch contexts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 flex-shrink-0" size={20} />
                    <span>Securely handle sensitive credentials via workspace .env.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl border border-white/10 p-6 shadow-2xl">
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/50"></div>
              </div>
              <div className="font-mono text-sm md:text-base space-y-2">
                <p className="text-emerald-400">$ bitnest commit "Fixed auth bug"</p>
                <p className="text-white/60">[main a1b2c3d] Fixed auth bug</p>
                <p className="text-white/60"> 2 files changed, 14 insertions(+)</p>
                <p className="text-emerald-400 mt-4">$ bitnest push 65a2b...90c</p>
                <p className="text-white/60">Uploading objects: 100% (3/3), done.</p>
                <p className="text-emerald-400">Successfully pushed to cloud.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-ink/10 bg-ink text-paper py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-8">Ready to deploy?</h2>
          <p className="text-xl text-paper/60 font-light mb-12 max-w-2xl mx-auto">
            Join professional teams using Bitenst to manage repositories and leverage automation for better codebases.
          </p>
          <Link to="/auth" className="inline-block bg-paper text-ink px-8 py-4 text-sm font-medium hover:bg-paper/90 transition-colors">
            Initialize Workspace
          </Link>
        </div>
      </section>

    </div>
  );
}
