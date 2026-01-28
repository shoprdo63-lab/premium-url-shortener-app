
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 border border-emerald-50">
        <div className="px-10 py-8 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-1">{title}</h2>
            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Protocol Version 1.0.4</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-2xl transition-all shadow-sm border border-emerald-50 active:scale-95">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-10 py-10 overflow-y-auto text-gray-500 text-sm font-medium leading-loose whitespace-pre-line custom-scrollbar">
          {content}
        </div>
        <div className="p-8 bg-emerald-50/30 border-t border-emerald-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 active:scale-95"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
