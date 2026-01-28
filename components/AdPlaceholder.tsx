import React from 'react';

interface AdProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const AdPlaceholder: React.FC<AdProps> = ({ 
  label = "Premium Slot", 
  className = "", 
  orientation = 'horizontal' 
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`flex flex-col items-center justify-center animate-in fade-in duration-1000 ${className}`}>
      <span className="text-[9px] uppercase font-black tracking-[0.4em] text-emerald-500/15 mb-3">{label}</span>
      <div className={`
        relative bg-[#050c09]/40 backdrop-blur-[8px] border border-dashed border-emerald-500/10 rounded-[2rem] 
        flex items-center justify-center overflow-hidden transition-all hover:bg-emerald-500/[0.03] hover:border-emerald-500/30 group
        ${isVertical ? 'w-[140px] lg:w-[180px] h-[650px]' : 'w-full h-[120px]'}
      `}>
        {/* Subtle motion background */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent"></div>
        </div>

        <div className={`flex items-center justify-center gap-6 ${isVertical ? 'flex-col' : 'flex-row'}`}>
            <div className="w-1 h-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/60 transition-colors animate-pulse"></div>
            <div className={`text-emerald-500/10 font-black text-[10px] uppercase tracking-[0.6em] group-hover:text-emerald-400/40 transition-all duration-700 ${isVertical ? 'rotate-90 py-24' : ''}`}>
              Sponsorship Space
            </div>
            <div className="w-1 h-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/60 transition-colors animate-pulse"></div>
        </div>
        
        {/* Modern Corner markers */}
        <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-emerald-500/10 group-hover:border-emerald-500/40 transition-colors"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-emerald-500/10 group-hover:border-emerald-500/40 transition-colors"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;