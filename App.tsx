import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  const legalContent = {
    terms: "Linkly Terms: Use our service for legal URLs only. We provide safe, high-speed redirects.",
    privacy: "Linkly Privacy: No PII collected. Local history only. Ad-supported via premium partners."
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020806] text-white font-sans relative overflow-hidden">
      
      {/* Premium Cinematic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[100vw] h-[100vw] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[80vw] h-[80vw] bg-teal-500/5 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <Navbar />
      
      <div className="flex-grow flex relative z-10 w-full max-w-7xl mx-auto px-6 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_200px] gap-8 items-center w-full">
          
          {/* Ad Left */}
          <aside className="hidden xl:flex flex-col items-center">
            <AdPlaceholder orientation="vertical" label="Partner A" className="h-[500px]" />
          </aside>

          {/* Main Stage */}
          <main className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-full max-w-2xl space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Secure Protocol Active</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
                  Linkly <span className="text-emerald-500 italic">Premium</span>
                </h1>
                <p className="text-emerald-100/30 font-medium tracking-wide text-sm">
                  The professional standard for link optimization.
                </p>
              </div>

              <div className="w-full">
                <ShortenerForm />
              </div>

              <div className="w-full pt-4">
                <AdPlaceholder orientation="horizontal" label="Marketplace" className="max-w-md mx-auto" />
              </div>
            </div>
          </main>

          {/* Ad Right */}
          <aside className="hidden xl:flex flex-col items-center">
            <AdPlaceholder orientation="vertical" label="Partner B" className="h-[500px]" />
          </aside>
        </div>
      </div>

      <Footer onOpenLegal={(type) => setLegalType(type)} />

      <LegalModal 
        isOpen={legalType !== null} 
        onClose={() => setLegalType(null)} 
        title={legalType === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
        content={legalType ? legalContent[legalType] : ''}
      />
    </div>
  );
};

export default App;