import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Search, Play } from 'lucide-react';
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

const DocsLayout = ({ feature }) => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
    <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">Module 04</p>
    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-8 leading-[0.9]">{feature.title}</h1>
    <p className="text-2xl text-ink/60 font-light leading-relaxed mb-16 max-w-3xl mx-auto">{feature.fullDescription}</p>
    
    <div className="w-full h-96 mb-24 overflow-hidden border border-ink/10 relative">
      <img 
        src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2070&auto=format&fit=crop" 
        alt="Documentation" 
        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className="text-left border-t border-ink/10 pt-16 columns-1 md:columns-2 gap-16 text-ink/80 font-serif text-lg leading-relaxed">
      <p className="mb-6"><span className="float-left text-6xl font-medium leading-none pr-4 pt-2">D</span>ocumentation generation is one of the strongest AI features. The system can inspect code structure and produce a readable explanation of the project. This helps new developers understand the project faster and reduces the burden of writing documentation manually.</p>
      <p className="mb-6">By analyzing the abstract syntax tree and the commit history, the AI engine synthesizes a comprehensive overview of the architecture. It identifies key components, their responsibilities, and how they interact with each other.</p>
      <p>This living document evolves alongside your codebase, ensuring that your team always has access to accurate, up-to-date technical references without the overhead of manual maintenance.</p>
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

export default function FeatureDetail() {
  const { id } = useParams();
  const feature = features.find(f => f.id === id);

  if (!feature) {
    return <Navigate to="/" replace />;
  }

  const renderLayout = () => {
    switch(id) {
      case 'auth': return <AuthLayout feature={feature} />;
      case 'repository': return <RepoLayout feature={feature} />;
      case 'version-control': return <VersionLayout feature={feature} />;
      case 'docs': return <DocsLayout feature={feature} />;
      case 'search': return <SearchLayout feature={feature} />;
      case 'commits': return <CommitsLayout feature={feature} />;
      case 'meetings': return <MeetingsLayout feature={feature} />;
      case 'dashboard': return <DashboardLayout feature={feature} />;
      default: return <DocsLayout feature={feature} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors font-mono uppercase tracking-widest">
          <ArrowLeft size={16} /> Back to Index
        </Link>
      </div>
      {renderLayout()}
    </div>
  );
}

