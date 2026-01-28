
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
      <span className="text-[8px] uppercase font-black tracking-[0.4em] text-emerald-500/20 mb-2">{label}</span>
      <div className={`
        relative bg-white/5 backdrop-blur-[2px] border border-dashed border-emerald-500/10 rounded-[1.5rem] 
        flex items-center justify-center overflow-hidden transition-all hover:bg-white/10 hover:border-emerald-500/30 group
        ${isVertical ? 'w-[120px] lg:w-[160px] h-[600px]' : 'w-full h-[100px]'}
      `}>
        <div className={`flex items-center justify-center gap-4 ${isVertical ? 'flex-col' : 'flex-row'}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 animate-pulse"></div>
            <div className={`text-emerald-500/10 font-black text-[9px] uppercase tracking-[0.5em] group-hover:text-emerald-400/30 transition-colors ${isVertical ? 'rotate-90 py-20' : ''}`}>
              Digital Space
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 animate-pulse"></div>
        </div>
        
        {/* Subtle corner accents */}
        <div className="absolute top-2 left-2 w-1 h-1 border-t border-l border-emerald-500/10"></div>
        <div className="absolute bottom-2 right-2 w-1 h-1 border-b border-r border-emerald-500/10"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
