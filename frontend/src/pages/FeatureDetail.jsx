import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, Search, Play, Terminal, 
  Database, Server, GitBranch, Shield, ArrowRight 
} from 'lucide-react';
import { features } from '../data/features';

const AuthLayout = ({ feature }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 01</p>
      <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
      <p className="text-xl text-ink/60 font-light mb-8 leading-relaxed">{feature.fullDescription}</p>
      <div className="relative h-64 w-full overflow-hidden border border-ink/10 mt-12">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Cyber Security" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/20 mix-blend-multiply"></div>
      </div>
    </div>
    <div className="bg-ink text-[#00ff00] p-8 md:p-12 font-mono text-sm shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50"></div>
      <p className="mb-2 opacity-70">{`> Initiating secure connection...`}</p>
      <p className="mb-2 opacity-70">{`> Verifying credentials...`}</p>
      <p className="mb-6">{`> Access granted. Role: ADMIN`}</p>
      <div className="mt-8 border-t border-[#00ff00]/30 pt-6">
         <p className="mb-2">Token: ********************</p>
         <p className="mb-2">Session: Active</p>
         <p className="mb-2">Permissions: Read, Write, Execute</p>
         <p className="mt-6 text-[#00ff00] animate-pulse">_</p>
      </div>
    </div>
  </div>
);

const RepoLayout = ({ feature }) => (
  <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 02</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
        <p className="text-xl text-ink/60 font-light leading-relaxed">{feature.fullDescription}</p>
      </div>
      <div className="relative h-80 w-full overflow-hidden border border-ink/10">
        <img 
          src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop" 
          alt="Code Repository" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <div className="border border-ink/10 flex flex-col md:flex-row h-[500px] bg-white shadow-xl">
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-ink/10 p-6 font-mono text-sm text-ink/60 flex flex-col gap-3 overflow-y-auto">
        <div className="text-ink font-medium flex items-center gap-2"><span>📂</span> src</div>
        <div className="pl-6 flex items-center gap-2"><span>📄</span> main.tsx</div>
        <div className="pl-6 flex items-center gap-2"><span>📄</span> app.tsx</div>
        <div className="pl-6 text-ink font-medium flex items-center gap-2"><span>📂</span> components</div>
        <div className="pl-12 flex items-center gap-2 bg-ink/5 py-1 -mx-2 px-2 text-ink"><span>📄</span> layout.tsx</div>
        <div className="pl-12 flex items-center gap-2"><span>📄</span> button.tsx</div>
      </div>
      <div className="flex-1 p-6 md:p-12 font-mono text-sm md:text-base text-ink/80 bg-ink/5 overflow-y-auto">
        <p className="text-ink/40 mb-6">// Repository viewer active</p>
        <p className="mb-2"><span className="text-blue-600">import</span> React <span className="text-blue-600">from</span> 'react';</p>
        <p className="mb-6"><span className="text-blue-600">import</span> {'{'} Link {'}'} <span className="text-blue-600">from</span> 'react-router-dom';</p>
        <p className="mb-2"><span className="text-blue-600">export function</span> Layout() {'{'}</p>
        <p className="pl-8 mb-2"><span className="text-blue-600">return</span> (</p>
        <p className="pl-12 text-green-600">&lt;div className="system-active"&gt;</p>
        <p className="pl-16">System Active</p>
        <p className="pl-12 text-green-600">&lt;/div&gt;</p>
        <p className="pl-8 mb-2">);</p>
        <p>{'}'}</p>
      </div>
    </div>
  </div>
);

const VersionLayout = ({ feature }) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="lg:col-span-5 flex flex-col justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 03</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
        <p className="text-xl text-ink/60 font-light leading-relaxed mb-12">{feature.fullDescription}</p>
      </div>
      <div className="relative h-64 w-full overflow-hidden border border-ink/10">
        <img 
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop" 
          alt="Version Control" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <div className="lg:col-span-7 relative border-l border-ink/20 pl-12 space-y-16 py-8">
      {[
        { hash: 'a8f93b2', msg: 'Updated core modules', time: '2 hours ago' },
        { hash: 'c4d1e9f', msg: 'Fixed authentication bug', time: '5 hours ago' },
        { hash: 'b7a2c1d', msg: 'Initial commit', time: '2 days ago' }
      ].map((commit, i) => (
        <div key={i} className="relative group">
          <div className="absolute -left-[57px] top-1 w-4 h-4 rounded-full bg-paper border-2 border-ink group-hover:bg-ink transition-colors"></div>
          <div className="flex justify-between items-end mb-2">
            <p className="font-mono text-xs text-ink/40">Commit {commit.hash}</p>
            <p className="font-mono text-xs text-ink/40">{commit.time}</p>
          </div>
          <p className="text-2xl font-medium text-ink">{commit.msg}</p>
        </div>
      ))}
    </div>
  </div>
);

const SearchLayout = ({ feature }) => (
  <div className="flex flex-col items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="w-full text-center mb-16">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 05</p>
      <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
      <p className="text-xl text-ink/60 font-light max-w-2xl mx-auto">{feature.fullDescription}</p>
    </div>

    <div className="w-full h-64 mb-16 overflow-hidden border border-ink/10 relative">
      <img 
        src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop" 
        alt="Data Search" 
        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <div className="w-full max-w-3xl relative mb-16">
      <input 
        type="text" 
        value="function authenticateUser()" 
        readOnly 
        className="w-full text-2xl md:text-4xl p-6 border-b-2 border-ink bg-transparent outline-none font-mono text-ink placeholder-ink/20" 
      />
      <Search className="absolute right-6 top-8 text-ink/40" size={32} />
    </div>
    
    <div className="w-full max-w-3xl grid grid-cols-1 gap-4">
      <div className="border border-ink/10 p-6 hover:bg-ink/5 transition-colors cursor-pointer">
        <p className="font-mono text-xs text-ink/40 mb-3">src/auth/index.ts &bull; Line 42</p>
        <p className="text-lg font-mono text-ink">export const authenticateUser = async (credentials) =&gt; {'{'}</p>
      </div>
      <div className="border border-ink/10 p-6 hover:bg-ink/5 transition-colors cursor-pointer opacity-60">
        <p className="font-mono text-xs text-ink/40 mb-3">src/api/routes.ts &bull; Line 18</p>
        <p className="text-lg font-mono text-ink">router.post('/login', authenticateUser);</p>
      </div>
    </div>
  </div>
);

const CommitsLayout = ({ feature }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="lg:col-span-1 flex flex-col justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 06</p>
        <h1 className="text-5xl font-medium tracking-tighter mb-6">{feature.title}</h1>
        <p className="text-xl text-ink/60 font-light leading-relaxed mb-12">{feature.fullDescription}</p>
      </div>
      <div className="relative h-64 w-full overflow-hidden border border-ink/10">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="Team Collaboration" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        { tag: 'feat/auth', diff: '+42 -12', text: 'Implemented JWT token refresh rotation and added secure HTTP-only cookies.' },
        { tag: 'fix/ui', diff: '+18 -4', text: 'Resolved layout shift issue on mobile navigation menu.' },
        { tag: 'perf/db', diff: '+102 -89', text: 'Optimized database queries by adding composite indexes.' },
        { tag: 'docs/api', diff: '+200 -0', text: 'Generated comprehensive API documentation for the new endpoints.' }
      ].map((card, i) => (
        <div key={i} className="border border-ink/10 p-8 bg-white shadow-sm hover:shadow-xl transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <span className="font-mono text-xs bg-ink/5 px-3 py-1">{card.tag}</span>
            <span className="text-ink text-xs font-mono">{card.diff}</span>
          </div>
          <p className="text-base text-ink/80 leading-relaxed font-light">{card.text}</p>
        </div>
      ))}
    </div>
  </div>
);

const MeetingsLayout = ({ feature }) => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="bg-ink text-paper p-8 md:p-16 rounded-none shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop" 
          alt="Audio Waveform" 
          className="object-cover w-full h-full grayscale"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-widest text-paper/50 mb-6">Module 07</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
        <p className="text-xl text-paper/60 font-light mb-16 max-w-2xl leading-relaxed">{feature.fullDescription}</p>
        
        <div className="bg-paper/10 p-6 md:p-8 flex items-center gap-6 mb-12 border border-paper/10 backdrop-blur-sm">
          <div className="w-14 h-14 rounded-full bg-paper text-ink flex items-center justify-center flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"><Play size={24} className="ml-1"/></div>
          <div className="flex-1 h-12 flex items-center gap-1.5 overflow-hidden">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="w-1.5 bg-paper/40" style={{height: `${Math.max(20, Math.random() * 100)}%`}}></div>
            ))}
          </div>
        </div>
        
        <div className="space-y-8 font-light text-lg">
          <p className="flex gap-6"><span className="font-medium text-paper w-20 flex-shrink-0">Alex:</span> <span className="text-paper/80">So the repository structure needs to be updated.</span></p>
          <p className="flex gap-6"><span className="font-medium text-paper w-20 flex-shrink-0">Jordan:</span> <span className="text-paper/80">Agreed. Let's move the auth modules to the core directory to improve security.</span></p>
          <p className="flex gap-6"><span className="font-medium text-paper w-20 flex-shrink-0">Alex:</span> <span className="text-paper/80">I'll create a PR for that this afternoon.</span></p>
        </div>
      </div>
    </div>
  </div>
);

const DashboardLayout = ({ feature }) => (
  <div className="flex flex-col gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 08</p>
        <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-6">{feature.title}</h1>
        <p className="text-xl text-ink/60 font-light leading-relaxed">{feature.fullDescription}</p>
      </div>
      <div className="relative h-64 w-full overflow-hidden border border-ink/10">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
          alt="Data Dashboard" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
      <div className="md:col-span-2 border border-ink/10 p-8 bg-ink/5 flex flex-col justify-between relative overflow-hidden group">
         <p className="font-mono text-xs uppercase text-ink/50 relative z-10">Activity Overview</p>
         <div className="absolute inset-0 top-1/2 border-t border-ink/10"></div>
         <div className="absolute inset-0 top-1/4 border-t border-ink/5"></div>
         <div className="absolute inset-0 top-3/4 border-t border-ink/5"></div>
         <div className="h-32 relative z-10 mt-auto">
           <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 200 100">
             <path d="M0,80 Q25,20 50,60 T100,40 T150,70 T200,30" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink"/>
           </svg>
         </div>
      </div>
      <div className="border border-ink/10 p-8 bg-ink text-paper flex flex-col justify-between shadow-2xl">
         <p className="font-mono text-xs uppercase text-paper/50">System Health</p>
         <p className="text-7xl font-light tracking-tighter">99<span className="text-4xl">%</span></p>
      </div>
      <div className="border border-ink/10 p-8 flex flex-col justify-between bg-white">
         <p className="font-mono text-xs uppercase text-ink/50">Active Users</p>
         <p className="text-5xl font-medium tracking-tighter">1,204</p>
      </div>
      <div className="md:col-span-2 border border-ink/10 p-8 flex flex-col justify-between bg-white">
         <p className="font-mono text-xs uppercase text-ink/50 mb-6">Recent Commits</p>
         <div className="space-y-4 mt-auto">
           <div className="h-8 bg-ink/5 w-full flex items-center px-4"><div className="h-2 w-3/4 bg-ink/20"></div></div>
           <div className="h-8 bg-ink/5 w-full flex items-center px-4"><div className="h-2 w-1/2 bg-ink/20"></div></div>
           <div className="h-8 bg-ink/5 w-full flex items-center px-4"><div className="h-2 w-5/6 bg-ink/20"></div></div>
         </div>
      </div>
    </div>
  </div>
);

// --- THIS IS THE MASSIVE DOCUMENTATION LAYOUT WE CREATED ---
const DocsLayout = ({ feature }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    {/* Header Section */}
    <div className="text-center mb-24">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Official Documentation</p>
      <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">System Manual</h1>
      <p className="text-2xl text-ink/60 font-light leading-relaxed mb-16 max-w-4xl mx-auto">
        A comprehensive, step-by-step guide to initializing, tracking, and synchronizing your codebase using our custom Node.js Version Control System.
      </p>
      
      <div className="w-full h-[400px] overflow-hidden border border-ink/10 relative">
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop" 
          alt="Server Architecture" 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-ink/10 mix-blend-multiply"></div>
      </div>
    </div>

    {/* Table of Contents */}
    <div className="bg-ink/5 border border-ink/10 p-8 mb-24">
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-ink mb-6 flex items-center gap-2">
        <Terminal size={18} /> Quick Navigation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-sm text-ink/70">
        <a href="#step-1" className="hover:text-indigo-600 transition-colors">01. Booting the Server</a>
        <a href="#step-2" className="hover:text-indigo-600 transition-colors">02. Initializing Repo</a>
        <a href="#step-3" className="hover:text-indigo-600 transition-colors">03. Staging Files</a>
        <a href="#step-4" className="hover:text-indigo-600 transition-colors">04. Committing</a>
        <a href="#step-5" className="hover:text-indigo-600 transition-colors">05. Pushing to Remote</a>
        <a href="#step-6" className="hover:text-indigo-600 transition-colors">06. Pulling Changes</a>
        <a href="#step-7" className="hover:text-indigo-600 transition-colors">07. Reverting States</a>
      </div>
    </div>

    {/* Step 1: Server */}
    <div id="step-1" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <Server className="text-indigo-600" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 01: Boot Server</h2>
        </div>
        <p className="text-ink/70 leading-relaxed mb-6 font-light text-lg">
          Before performing any remote operations (push, pull), the central Express server must be online. This server connects to MongoDB and opens Socket.io channels for real-time collaboration.
        </p>
        <ul className="space-y-3 font-mono text-sm text-ink/60 mb-6">
          <li className="flex items-center gap-2"><ArrowRight size={14}/> Requires <span className="text-ink font-bold">.env</span> with MONGO_DB URI</li>
          <li className="flex items-center gap-2"><ArrowRight size={14}/> Runs on default PORT 3000</li>
          <li className="flex items-center gap-2"><ArrowRight size={14}/> Accepts Socket connections on "joinRoom"</li>
        </ul>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <div className="flex gap-2 mb-4 border-b border-slate-800 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js start
<span className="text-slate-500"># OR if using the CLI tool directly:</span>
<span className="text-emerald-400">$</span> node server.js start

<span className="text-blue-400">[INFO]</span> Booting Express API...
<span className="text-blue-400">[INFO]</span> Attempting database connection...
<span className="text-green-400">[SUCCESS]</span> MongoDB connected!
<span className="text-green-400">[SUCCESS]</span> CRUD operations called
<span className="text-green-400">[SUCCESS]</span> Server is running on PORT 3000
        </pre>
      </div>
    </div>

    {/* Step 2: Init */}
    <div id="step-2" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <Database className="text-indigo-600" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 02: Init Repo</h2>
        </div>
        <p className="text-ink/70 leading-relaxed mb-6 font-light text-lg">
          Initialize a brand new local repository in your current working directory. This creates the hidden tracking folders required to monitor your file changes.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js init

<span className="text-slate-500"># System Output:</span>
Initialized empty local repository in /current/path/.repo
        </pre>
      </div>
    </div>

    {/* Step 3: Add */}
    <div id="step-3" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="text-indigo-600" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 03: Add Files</h2>
        </div>
        <p className="text-ink/70 leading-relaxed font-light text-lg">
          Move your created or modified files into the staging area. The <span className="font-mono text-sm bg-ink/10 px-1 py-0.5 rounded">add &lt;file&gt;</span> command calculates changes and prepares the file blobs to be committed to the tree.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js add index.js
<span className="text-emerald-400">$</span> node server.js add package.json

<span className="text-slate-500"># System Output:</span>
Added index.js to staging area.
Added package.json to staging area.
        </pre>
      </div>
    </div>

    {/* Step 4: Commit */}
    <div id="step-4" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="text-indigo-600" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 04: Commit</h2>
        </div>
        <p className="text-ink/70 leading-relaxed font-light text-lg">
          Take a permanent snapshot of the staging area. This generates a unique <span className="font-mono text-sm text-indigo-600">commitId</span> that you can later use to push to the cloud or revert your local environment.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js commit "Initial project setup"

<span className="text-slate-500"># System Output:</span>
[main <span className="text-yellow-400">a1b2c3d</span>] Initial project setup
 2 files changed, 45 insertions(+)
        </pre>
      </div>
    </div>

    {/* Step 5: Push */}
    <div id="step-5" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <ArrowRight className="text-indigo-600 rotate-[-45deg]" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 05: Push Remote</h2>
        </div>
        <p className="text-ink/70 leading-relaxed font-light text-lg">
          Upload your local commits to the MongoDB server. You must provide the specific <span className="font-mono text-sm bg-ink/10 px-1 py-0.5 rounded">commitId</span> you wish to push. The Express router handles the binary transfer.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js push a1b2c3d

<span className="text-slate-500"># System Output:</span>
Connecting to http://localhost:3000...
Uploading objects: 100% (5/5), done.
Writing objects: 100% (5/5), 1.2 KiB | 1.20 MiB/s, done.
<span className="text-green-400">Successfully pushed commit a1b2c3d to remote database.</span>
        </pre>
      </div>
    </div>

    {/* Step 6: Pull */}
    <div id="step-6" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <ArrowRight className="text-indigo-600 rotate-[135deg]" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 06: Pull Changes</h2>
        </div>
        <p className="text-ink/70 leading-relaxed font-light text-lg">
          Fetch the latest state from the remote database and merge it into your local directory. Useful when collaborating with a team or switching machines.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js pull

<span className="text-slate-500"># System Output:</span>
Fetching from remote...
Updating current workspace...
Fast-forward
 src/main.js | 15 <span className="text-green-400">++++++++</span><span className="text-red-400">---</span>
 1 file changed, 12 insertions(+), 3 deletions(-)
        </pre>
      </div>
    </div>

    {/* Step 7: Revert */}
    <div id="step-7" className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16 items-start border-l border-ink/20 pl-8 lg:pl-12 relative">
      <div className="absolute -left-3 top-0 w-6 h-6 bg-paper border-4 border-ink rounded-full"></div>
      <div className="lg:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <Play className="text-red-500 rotate-180" size={24} />
          <h2 className="text-3xl font-medium tracking-tight">Step 07: Revert</h2>
        </div>
        <p className="text-ink/70 leading-relaxed font-light text-lg">
          Made a mistake? Time travel back to a previous, stable state by passing the target <span className="font-mono text-sm bg-ink/10 px-1 py-0.5 rounded">commitID</span>.
        </p>
      </div>
      <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 shadow-xl border border-slate-800">
        <pre className="font-mono text-sm text-slate-300 overflow-x-auto whitespace-pre-wrap">
<span className="text-emerald-400">$</span> node server.js revert a1b2c3d

<span className="text-slate-500"># System Output:</span>
<span className="text-yellow-400">HEAD is now at a1b2c3d Initial project setup.</span>
Workspace reverted successfully. 
Unstaged changes have been discarded.
        </pre>
      </div>
    </div>

  </div>
);

// --- MAIN COMPONENT ---
export default function FeatureDetail() {
  const { id } = useParams();
  
  // Safe fallback if the feature ID doesn't exist in your features.js data
  const feature = features?.find(f => f.id === id) || { 
    title: "System Documentation", 
    fullDescription: "Viewing technical specifications." 
  };

  const renderLayout = () => {
    switch(id) {
      case 'auth': return <AuthLayout feature={feature} />;
      case 'repository': return <RepoLayout feature={feature} />;
      case 'version-control': return <VersionLayout feature={feature} />;
      case 'search': return <SearchLayout feature={feature} />;
      case 'commits': return <CommitsLayout feature={feature} />;
      case 'meetings': return <MeetingsLayout feature={feature} />;
      case 'dashboard': return <DashboardLayout feature={feature} />;
      case 'docs': return <DocsLayout feature={feature} />;
      default: return <DocsLayout feature={feature} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link to="/cli-guide" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors font-mono uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to How to Install
        </Link>
      </div>
      {renderLayout()}
    </div>
  );
}