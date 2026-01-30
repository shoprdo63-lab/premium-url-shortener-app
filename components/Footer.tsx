import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy' | 'about' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="relative z-50 py-16 px-6 md:px-20 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-10 text-center xl:text-left">
        <div className="flex flex-col items-center xl:items-start space-y-2">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.5em]">The LinkVibe Global Network</p>
          <p className="text-emerald-100/20 text-[9px] font-medium tracking-widest uppercase">Redefining URL Optimization • © 2026</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 lg:space-x-16">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button 
              onClick={() => onOpenLegal('about')} 
              className="text-[10px] font-black text-emerald-100/30 hover:text-emerald-400 transition-all uppercase tracking-[0.4em]"
            >
              About
            </button>
             <button 
              onClick={() => onOpenLegal('contact')} 
              className="text-[10px] font-black text-emerald-100/30 hover:text-emerald-400 transition-all uppercase tracking-[0.4em]"
            >
              Contact
            </button>
            <button 
              onClick={() => onOpenLegal('terms')} 
              className="text-[10px] font-black text-emerald-100/30 hover:text-emerald-400 transition-all uppercase tracking-[0.4em]"
            >
              Terms
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="text-[10px] font-black text-emerald-100/30 hover:text-emerald-400 transition-all uppercase tracking-[0.4em]"
            >
              Privacy
            </button>
          </div>
          
          <div className="hidden md:block h-6 w-[1px] bg-emerald-500/10"></div>
          
          <div className="flex items-center space-x-4 px-4 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[9px] font-black text-emerald-400/80 tracking-[0.3em] uppercase">System Stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;