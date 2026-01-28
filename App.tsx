import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  const legalContent = {
    terms: `1. Acceptance of Terms\nBy accessing Linkly, you agree to be bound by these Terms of Service. Linkly is provided for personal and professional link management.\n\n2. Description of Service\nWe provide real-time URL shortening via public API integrations. We do not store or monitor the content of the destination URLs.\n\n3. Prohibited Use\nUsers may not shorten links that point to malicious, illegal, or harmful content.\n\n4. Limitation of Liability\nLinkly is an interface. We are not liable for external content.`,
    privacy: `1. Privacy First\nLinkly is a stateless URL shortening interface. We do not collect, store, or sell personal identifiable information (PII).\n\n2. Local Storage\nWe use localized browser storage (localStorage) exclusively to maintain your recent link history for your convenience.\n\n3. No Tracking\nWe do not utilize tracking cookies or cross-site fingerprinting technologies.`
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#020806] text-white selection:bg-emerald-500/30 selection:text-emerald-200 font-['Inter'] relative overflow-x-hidden">
      {/* Premium Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-600/10 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[70vw] h-[70vw] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] bg-emerald-400/5 rounded-full blur-[100px]"></div>
      </div>

      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center relative z-10 w-full pt-28 pb-40 px-6">
        <main className="flex flex-col items-center justify-center text-center w-full max-w-5xl">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/80">System Live • Optimized</span>
          </div>

          {/* Main Headline */}
          <div className="mb-14">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              Clean <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-emerald-200 to-teal-400">Connections.</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-xs md:text-sm text-emerald-100/30 font-bold uppercase tracking-[0.4em] mt-8 leading-relaxed">
              Premium URL management. <span className="text-emerald-400/50">Stateless & Secure.</span>
            </p>
          </div>

          {/* Shortener Form */}
          <div className="w-full max-w-3xl">
            <ShortenerForm />
          </div>
        </main>
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