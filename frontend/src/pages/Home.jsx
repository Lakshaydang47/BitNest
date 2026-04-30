import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { features } from '../data/features';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-8">System v1.0 &mdash; Active</p>
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-10 text-ink">
            The structured <br className="hidden md:block" /> codebase platform.
          </h1>
          <p className="text-xl md:text-2xl text-ink/60 max-w-2xl font-light leading-relaxed mb-12">
            Bitnest combines robust version control with automatic documentation, commit summaries, and meeting transcriptions. Built for professional engineering teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/workflow" className="bg-ink text-paper px-8 py-4 text-sm font-medium hover:bg-ink/80 transition-colors text-center">
              Explore Workflow
            </Link>
            <Link to="/cli-guide" className="border border-ink text-ink px-8 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-all text-center">
              How to Install
            </Link>
            <a href="#modules" className="border border-ink/10 px-8 py-4 text-sm font-medium hover:bg-ink/5 transition-colors text-center">
              View Modules
            </a>
          </div>
        </div>
      </section>

      {/* Stats / Trust Section */}
      <section className="border-y border-ink/10 bg-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/10 border-x border-ink/10">
            <div className="p-8 text-center">
              <p className="text-4xl font-light text-ink mb-2">99.9%</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">Uptime</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-light text-ink mb-2">10x</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">Faster Docs</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-light text-ink mb-2">6</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">Simplest CLi Commands</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-light text-ink mb-2">Zero</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">Lost Files</p>
            </div>
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

      {/* Features List */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h2 className="text-4xl font-medium tracking-tight text-ink mb-4">Functional Modules</h2>
            <p className="text-lg text-ink/60 font-light max-w-xl">
              Everything you need to manage repositories, collaborate effectively, and leverage automation.
            </p>
          </div>
        </div>

        <div className="border-t border-ink/10">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              to={`/features/${feature.id}`}
              className="group block border-b border-ink/10 py-8 hover:bg-ink/5 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center px-4 -mx-4">
                <div className="md:col-span-1 font-mono text-sm text-ink/40">
                  0{index + 1}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium text-ink group-hover:translate-x-2 transition-transform">
                    {feature.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-ink/60 font-light text-lg">
                    {feature.shortDescription}
                  </p>
                </div>
                <div className="md:col-span-1 text-right opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                  <ArrowRight className="inline text-ink" size={24} />
                </div>
              </div>
            </Link>
          ))}
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
