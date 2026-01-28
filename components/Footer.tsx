import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-10 px-10 md:px-20 pointer-events-none">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start opacity-30">
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.5em] mb-1">Architecture by Linkly Global</p>
          <p className="text-emerald-100/40 text-[9px] font-medium italic">High-performance link redirection.</p>
        </div>
        
        <div className="flex items-center space-x-12 pointer-events-auto">
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
          <div className="h-4 w-[1px] bg-white/5 hidden md:block"></div>
          <div className="flex items-center space-x-3 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[9px] font-black text-emerald-100 tracking-widest">v3.0.4 - STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;