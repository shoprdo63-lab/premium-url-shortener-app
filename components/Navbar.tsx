
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-emerald-400 rounded-xl blur-[8px] opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <span className="text-white font-black text-xl leading-none italic">L</span>
              </div>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">LINKLY</span>
          </div>
          
          <div className="flex items-center space-x-8">
            <span className="text-[10px] font-black text-emerald-600 tracking-[0.3em] uppercase hidden md:block opacity-60">Engine V3.0</span>
            <div className="h-8 w-[1px] bg-emerald-100 hidden md:block"></div>
            <button className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-emerald-600 transition-colors">API Access</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
