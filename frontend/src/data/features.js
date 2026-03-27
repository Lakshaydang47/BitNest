import {
  ShieldCheck,
  FolderTree,
  GitCommit,
  FileText,
  Search,
  MessageSquare,
  Mic,
  LayoutDashboard
} from 'lucide-react';

export const features = [
  {
    id: 'auth',
    title: 'Authentication and Access Control',
    icon: ShieldCheck,
    shortDescription: 'Secure your project data with robust access control and role management.',
    fullDescription: 'The system begins with user authentication. Users must log in before they can manage repositories or use AI services. Access control protects sensitive project data and ensures that only approved users can edit or view a repository. In a team environment, roles may be separated into owner, collaborator, and viewer.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'repository',
    title: 'Repository Management',
    icon: FolderTree,
    shortDescription: 'Create projects, organize files, and maintain a structured codebase.',
    fullDescription: 'Repository management is the foundation of the platform. Users can create projects, organize files, upload code, and maintain a structured codebase. The repository acts as the main place where project assets are stored and organized.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    image: 'https://images.unsplash.com/photo-1618401471353-b98a5233c591?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'version-control',
    title: 'Version Control and Commit Tracking',
    icon: GitCommit,
    shortDescription: 'Keep a history of changes and recover earlier versions when needed.',
    fullDescription: 'Version control keeps a history of changes. Every commit represents a meaningful update to the project. This makes it possible to see what changed, when it changed, and why it changed. It also helps teams recover earlier versions when needed.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'docs',
    title: 'Automatic Documentation Generation',
    icon: FileText,
    shortDescription: 'Produce readable explanations of your project automatically using AI.',
    fullDescription: 'Documentation generation is one of the strongest AI features. The system can inspect code structure and produce a readable explanation of the project. This helps new developers understand the project faster and reduces the burden of writing documentation manually.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'search',
    title: 'Codebase Search',
    icon: Search,
    shortDescription: 'Locate files, classes, functions, and technical references quickly.',
    fullDescription: 'Codebase search helps users locate files, classes, functions, and technical references quickly. Instead of manually opening many files, a developer can search for a concept and receive relevant results in a short time.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'commits',
    title: 'Commit Summary Generation',
    icon: MessageSquare,
    shortDescription: 'Turn a list of technical updates into simple language.',
    fullDescription: 'Commit summaries turn a list of technical updates into simple language. This is helpful when the project has many commits and team members want a fast overview of progress without reading every raw change.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'meetings',
    title: 'Meeting Transcription and Search',
    icon: Mic,
    shortDescription: 'Convert meeting speech into text and search through important decisions.',
    fullDescription: 'Meetings often contain important decisions that are forgotten later. The transcription module converts meeting speech into text, and the search module allows users to revisit those notes when necessary.',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'dashboard',
    title: 'Collaboration Dashboard',
    icon: LayoutDashboard,
    shortDescription: 'A central place to review documents, search code, and monitor activity.',
    fullDescription: 'The collaboration dashboard brings the main project knowledge together. It gives the team a central place to review documents, search code, and monitor project activity.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000'
  }
];
