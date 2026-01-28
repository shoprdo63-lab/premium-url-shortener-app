import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-10 backdrop-blur-sm bg-[#020806]/10 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 group cursor-pointer">
          <div className="relative">
            {/* Logo Glow */}
            <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            {/* Logo Icon */}
            <div className="relative bg-gradient-to-br from-[#064e3b] to-[#022c22] w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-500/20 transform group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              {/* Vibe sparkle */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full blur-[2px] animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white uppercase leading-none">
              The <span className="text-emerald-500 italic drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">LinkVibe</span>
            </span>
            <div className="h-[2px] w-0 group-hover:w-full bg-emerald-500/50 transition-all duration-500 mt-1"></div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
           <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Premium Protocol</span>
              <span className="text-[8px] font-medium text-emerald-500/40 uppercase tracking-widest mt-0.5">EST. 2024 • STABLE V2.1</span>
           </div>
           <div className="w-10 h-[1px] bg-emerald-500/20 rotate-90"></div>
           <button className="px-6 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400 transition-all hover:scale-105 active:scale-95">
             API Access
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;