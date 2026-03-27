import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-ink selection:text-paper">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-xl border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="font-medium tracking-tight text-2xl text-ink flex items-center gap-3">
              <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center text-sm font-bold rounded-sm">B</div>
              Bitenst.
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-ink/60 hover:text-ink transition-colors">Index</Link>
              <Link to="/workflow" className="text-sm font-medium text-ink/60 hover:text-ink transition-colors">Workflow</Link>
              <div className="relative group">
                <button className="text-sm font-medium text-ink/60 hover:text-ink transition-colors py-8 flex items-center gap-1">
                  Modules
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-paper border border-ink/10 p-6 w-[480px] shadow-2xl grid grid-cols-2 gap-x-8 gap-y-4 rounded-sm">
                    <Link to="/features/auth" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Authentication</Link>
                    <Link to="/features/repository" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Repository</Link>
                    <Link to="/features/version-control" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Version Control</Link>
                    <Link to="/features/docs" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Documentation</Link>
                    <Link to="/features/search" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Search</Link>
                    <Link to="/features/commits" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Commits</Link>
                    <Link to="/features/meetings" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Meetings</Link>
                    <Link to="/features/dashboard" className="text-sm text-ink/60 hover:text-ink transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ink/20"></span>Dashboard</Link>
                  </div>
                </div>
              </div>
              <Link to="/features/docs" className="text-sm font-medium text-ink/60 hover:text-ink transition-colors flex items-center gap-1">
                Documentation <ArrowUpRight size={14} />
              </Link>
              <div className="h-4 w-px bg-ink/20 mx-2"></div>
              <Link to="/auth" className="bg-ink text-paper px-6 py-2.5 text-sm font-medium hover:bg-ink/90 transition-colors rounded-sm shadow-sm">
                Initialize
              </Link>
            </nav>

            <button 
              className="md:hidden p-2 text-ink"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-paper border-b border-ink/10 px-4 py-8 flex flex-col gap-6 h-screen">
            <Link to="/" className="text-2xl font-medium text-ink">Index</Link>
            <Link to="/workflow" className="text-2xl font-medium text-ink">Workflow</Link>
            <Link to="/features/docs" className="text-2xl font-medium text-ink flex items-center gap-2">Documentation <ArrowUpRight size={20} /></Link>
            
            <div className="h-px bg-ink/10 my-4" />
            
            <p className="font-mono text-xs text-ink/40 uppercase tracking-widest">Modules</p>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/features/auth" className="text-ink/80">Authentication</Link>
              <Link to="/features/repository" className="text-ink/80">Repository</Link>
              <Link to="/features/version-control" className="text-ink/80">Version Control</Link>
              <Link to="/features/docs" className="text-ink/80">Documentation</Link>
              <Link to="/features/search" className="text-ink/80">Search</Link>
              <Link to="/features/commits" className="text-ink/80">Commits</Link>
              <Link to="/features/meetings" className="text-ink/80">Meetings</Link>
              <Link to="/features/dashboard" className="text-ink/80">Dashboard</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/10 bg-paper pt-32 pb-12 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-24">
            <div className="lg:col-span-2">
              <Link to="/" className="font-medium tracking-tight text-4xl text-ink flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center text-lg font-bold rounded-sm">B</div>
                Bitenst.
              </Link>
              <p className="text-ink/60 font-light max-w-sm mb-8 leading-relaxed text-lg">
                Professional repository management and AI-driven codebase intelligence for modern engineering teams.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-sm hover:-translate-y-1">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-sm hover:-translate-y-1">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-sm hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="lg:col-start-4">
              <h4 className="font-mono text-xs text-ink/40 uppercase tracking-widest mb-8">Product</h4>
              <ul className="space-y-4 text-base text-ink/80 font-light">
                <li><Link to="/features/repository" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Repositories</Link></li>
                <li><Link to="/features/docs" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">AI Documentation</Link></li>
                <li><Link to="/features/search" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Code Search</Link></li>
                <li><Link to="/workflow" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Workflow</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-xs text-ink/40 uppercase tracking-widest mb-8">Resources</h4>
              <ul className="space-y-4 text-base text-ink/80 font-light">
                <li><Link to="/features/docs" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Documentation</Link></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">API Reference</a></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Changelog</a></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-mono text-xs text-ink/40 uppercase tracking-widest mb-8">Company</h4>
              <ul className="space-y-4 text-base text-ink/80 font-light">
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">About Us</a></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-ink hover:translate-x-1 transition-transform inline-block">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-ink/40 font-mono">
            <p>&copy; {new Date().getFullYear()} Bitenst Systems. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-ink transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
