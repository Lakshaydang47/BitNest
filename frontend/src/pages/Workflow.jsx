import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      id: 1,
      title: 'Authentication',
      description: 'The user first enters the platform and logs in securely. Access control protects sensitive project data and ensures that only approved users can edit or view a repository.',
    },
    {
      id: 2,
      title: 'Repository Setup',
      description: 'After authentication, the user either creates a new repository or opens an existing one. The repository acts as the main place where project assets are stored and organized.',
    },
    {
      id: 3,
      title: 'Code Management',
      description: 'The user can then upload code, modify files, or review earlier versions. Version control keeps a history of changes, making it possible to see what changed, when, and why.',
    },
    {
      id: 4,
      title: 'Versioned Actions',
      description: 'When the user performs a change, the system stores the update as a versioned action. Every commit represents a meaningful update to the project.',
    },
    {
      id: 5,
      title: 'AI Analysis',
      description: 'AI-based services analyze the code and generate supporting output such as documentation or commit summaries. This reduces the burden of writing documentation manually.',
    },
    {
      id: 6,
      title: 'Intelligent Search',
      description: 'If the user wants to search for a function or check a meeting note, the query is sent to the intelligent search layer. Codebase search helps users locate technical references quickly.',
    },
    {
      id: 7,
      title: 'Final Output',
      description: 'The final result appears in a format that is easier to read and use on the collaboration dashboard. It gives the team a central place to review documents and monitor activity.',
    }
  ];

  return (
    <div className="min-h-screen bg-paper py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-6">System Architecture</p>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-ink mb-8">
            Working Process
          </h1>
          <p className="text-xl text-ink/60 font-light leading-relaxed">
            The working process of the system is simple from the user's point of view but structured internally. Follow the pipeline from authentication to final output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {steps.map((step) => (
            <div key={step.id} className="border-t border-ink/20 pt-6 group">
              <div className="font-mono text-sm text-ink/40 mb-6 flex justify-between items-center">
                <span>Phase 0{step.id}</span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
              </div>
              <h3 className="text-2xl font-medium text-ink mb-4">{step.title}</h3>
              <p className="text-ink/60 font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 pt-12 border-t border-ink/10">
          <Link to="/" className="inline-flex items-center gap-2 text-ink font-medium hover:opacity-70 transition-opacity">
            &larr; Return to Index
          </Link>
        </div>
      </div>
    </div>
  );
}
