
import React from 'react';

interface AdProps {
  label?: string;
  className?: string;
}

const AdPlaceholder: React.FC<AdProps> = ({ label = "Advertisement", className = "" }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <span className="text-[9px] uppercase font-black tracking-[0.4em] text-emerald-600/40 mb-3">{label}</span>
      <div className="w-full max-w-4xl h-[80px] md:h-[100px] bg-emerald-50/20 backdrop-blur-sm border border-dashed border-emerald-200/50 rounded-[2rem] flex items-center justify-center overflow-hidden transition-all hover:bg-emerald-50/40 hover:border-emerald-300/50 group">
        <div className="flex items-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></div>
            <div className="text-emerald-300 font-black text-[10px] uppercase tracking-[0.5em] group-hover:text-emerald-400 transition-colors">Digital Placement</div>
            <div className="w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
