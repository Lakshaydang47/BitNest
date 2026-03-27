import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Issue() {
  return (
    <div className="min-h-screen bg-paper py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors font-mono uppercase tracking-widest mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-medium tracking-tight text-ink mb-8">Issues</h1>
        <div className="bg-white border border-ink/10 p-8 shadow-sm text-center text-ink/60">
          Issue tracking module is currently under construction.
        </div>
      </div>
    </div>
  );
}
