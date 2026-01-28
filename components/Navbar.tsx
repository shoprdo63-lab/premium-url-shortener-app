import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-8 px-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <span className="text-white font-black text-xl italic">L</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">LINKLY</span>
        </div>
        <div className="hidden sm:block">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500/40">Premium Tier 1.0</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;