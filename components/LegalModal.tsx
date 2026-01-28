import React from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020806]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-[#0a120e] w-full max-w-2xl max-h-[85vh] rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-500/20">
        <div className="px-12 py-10 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter leading-none mb-2">{title}</h2>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Protocol Version 1.0.4</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 text-emerald-400 rounded-2xl transition-all active:scale-95 border border-white/5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-12 py-12 overflow-y-auto text-emerald-100/60 text-[14px] font-medium leading-relaxed whitespace-pre-line custom-scrollbar">
          {content}
        </div>
        <div className="p-10 bg-white/5 border-t border-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-12 py-5 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/50 active:scale-95 border border-emerald-400/20"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;