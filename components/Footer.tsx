
import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#020806]/20 backdrop-blur-sm border-t border-white/5 py-6">
      <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-[9px] font-black text-emerald-400/30 uppercase tracking-[0.4em] mb-1">Architecture by Linkly Global</p>
          <p className="text-emerald-100/20 text-[10px] font-medium italic">© 2026. Enterprise-ready link management.</p>
        </div>
        
        <div className="flex items-center space-x-10">
          <button 
            onClick={() => onOpenLegal('terms')} 
            className="text-[10px] font-black text-emerald-100/40 hover:text-emerald-400 transition-all uppercase tracking-[0.2em]"
          >
            Terms
          </button>
          <button 
            onClick={() => onOpenLegal('privacy')} 
            className="text-[10px] font-black text-emerald-100/40 hover:text-emerald-400 transition-all uppercase tracking-[0.2em]"
          >
            Privacy
          </button>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40"></div>
            <span className="text-[10px] font-black text-emerald-100/30 uppercase tracking-widest">v3.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
