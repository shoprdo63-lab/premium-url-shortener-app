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
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-[8px] uppercase font-bold tracking-[0.3em] text-emerald-500/20 mb-2">{label}</span>
      <div className={`
        relative bg-emerald-950/20 backdrop-blur-md border border-dashed border-emerald-500/20 rounded-2xl 
        flex items-center justify-center overflow-hidden transition-all hover:border-emerald-500/40
        ${isVertical ? 'w-[140px] h-full min-h-[400px]' : 'w-full h-[80px]'}
      `}>
        <div className={`text-emerald-500/10 font-black text-[9px] uppercase tracking-[0.5em] ${isVertical ? 'rotate-90' : ''}`}>
          Sponsored
        </div>
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-500/20"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-500/20"></div>
      </div>
    </div>
  );
};

export default AdPlaceholder;