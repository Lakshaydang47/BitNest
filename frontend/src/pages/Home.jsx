import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
            Bitenst combines robust version control with automatic documentation, commit summaries, and meeting transcriptions. Built for professional engineering teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/workflow" className="bg-ink text-paper px-8 py-4 text-sm font-medium hover:bg-ink/80 transition-colors text-center">
              Explore Workflow
            </Link>
            <a href="#modules" className="border border-ink/20 px-8 py-4 text-sm font-medium hover:bg-ink/5 transition-colors text-center">
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
              <p className="text-4xl font-light text-ink mb-2">24/7</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">AI Assistance</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl font-light text-ink mb-2">Zero</p>
              <p className="font-mono text-xs text-ink/50 uppercase tracking-widest">Lost Meetings</p>
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
