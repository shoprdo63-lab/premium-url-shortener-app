import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-emerald-400 to-emerald-700 w-11 h-11 rounded-xl flex items-center justify-center shadow-xl border border-white/10 overflow-hidden">
              <span className="text-white font-black text-2xl italic tracking-tighter drop-shadow-md transform -skew-x-6">LV</span>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/20 blur-sm rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-[-0.05em] text-white uppercase leading-none">
              The <span className="text-emerald-500">Link Vibe</span>
            </span>
            <div className="h-[2px] w-0 group-hover:w-full bg-emerald-500 transition-all duration-300"></div>
          </div>
        </div>
        <div className="hidden sm:block">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/50 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">Premium Protocol 2.1</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;