
import React from 'react';

interface AdProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const AdPlaceholder: React.FC<AdProps> = ({ 
  label = "Advertisement", 
  className = "", 
  orientation = 'horizontal' 
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`flex flex-col items-center justify-center animate-in fade-in duration-1000 ${className}`}>
      <span className="text-[8px] uppercase font-black tracking-[0.4em] text-emerald-600/30 mb-2">{label}</span>
      <div className={`
        relative bg-emerald-50/10 backdrop-blur-[2px] border border-dashed border-emerald-200/40 rounded-[1.5rem] 
        flex items-center justify-center overflow-hidden transition-all hover:bg-emerald-50/20 hover:border-emerald-300/40 group
        ${isVertical ? 'w-[120px] lg:w-[160px] h-[600px]' : 'w-full h-[100px]'}
      `}>
        <div className={`flex items-center justify-center gap-4 ${isVertical ? 'flex-col' : 'flex-row'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200/50 animate-pulse"></div>
            <div className={`text-emerald-300/40 font-black text-[9px] uppercase tracking-[0.5em] group-hover:text-emerald-400/60 transition-colors ${isVertical ? 'rotate-90 py-20' : ''}`}>
              Digital Space
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-200/50 animate-pulse"></div>
        </div>
        
        {/* Subtle corner accents */}
        <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-emerald-200/30"></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-emerald-200/30"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
