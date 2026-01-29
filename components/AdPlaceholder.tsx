import React from 'react';

interface AdProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

const AdPlaceholder: React.FC<AdProps> = ({ 
  label = "Slot", 
  className = "", 
  orientation = 'horizontal' 
}) => {
  const isVertical = orientation === 'vertical';

  return (
    <div className={`flex flex-col items-center ${className} group`}>
      <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-emerald-500/20 mb-2 group-hover:text-emerald-500/40 transition-colors">{label}</span>
      <div className={`
        relative bg-emerald-950/20 backdrop-blur-md rounded-2xl 
        flex items-center justify-center overflow-hidden transition-all 
        ${isVertical ? 'w-[140px] h-full min-h-[400px]' : 'w-full h-[80px]'}
      `}>
        {/* Animated Dashed Border */}
        <div className="absolute inset-0 rounded-2xl border border-dashed border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(16,185,129,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_linear]"></div>

        <div className={`relative z-10 text-emerald-500/10 font-black text-[9px] uppercase tracking-[0.5em] group-hover:text-emerald-500/20 transition-colors ${isVertical ? 'rotate-90' : ''}`}>
          Sponsored
        </div>
        
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors"></div>
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors opacity-0 group-hover:opacity-100"></div>
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;