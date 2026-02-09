
import React from 'react';

interface NavbarProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 md:py-8 px-6 md:px-10 backdrop-blur-md bg-[#020806]/40 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-4 group cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-[#064e3b] to-[#022c22] w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-500/20 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tight text-white uppercase leading-none">
              The <span className="text-emerald-500 italic">LinkVibe</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all ${currentView === 'home' ? 'text-emerald-400' : 'text-emerald-100/40 hover:text-emerald-200'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('blog')}
            className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] transition-all ${currentView === 'blog' ? 'text-emerald-400' : 'text-emerald-100/40 hover:text-emerald-200'}`}
          >
            Blog
          </button>
          <div className="hidden lg:flex flex-col items-end border-l border-white/10 pl-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Premium Protocol</span>
              <span className="text-[8px] font-medium text-emerald-500/40 uppercase tracking-widest mt-0.5">EST. 2024 • SYSTEM STABLE</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
