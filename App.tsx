
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  const legalContent = {
    terms: `1. Acceptance of Terms\nBy accessing Linkly, you agree to be bound by these Terms of Service. Linkly is provided for personal and professional link management.\n\n2. Description of Service\nWe provide real-time URL shortening via public API integrations. We do not store or monitor the content of the destination URLs.\n\n3. Prohibited Use\nUsers may not shorten links that point to malicious, illegal, or harmful content. Abuse of the service will result in permanent blacklisting.\n\n4. Limitation of Liability\nLinkly is an interface. We are not liable for any redirects or external content.\n\n5. Modifications\nTerms are subject to change without notice to ensure quality and compliance.`,
    privacy: `1. Data Collection\nWe do not store your personal information. We only process the URLs you provide to generate shortened versions.\n\n2. Cookies\nWe use localized browser storage (localStorage) to remember your recent links on this device only.\n\n3. Third-Party Services\nWe utilize public shortening APIs. These services may have their own privacy policies regarding redirected traffic.\n\n4. Security\nLinkly uses industry-standard encryption for all data transmissions.`
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#FDFDFD] selection:bg-emerald-100 selection:text-emerald-900 font-['Inter'] relative overflow-hidden">
      {/* Dynamic Background decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-50/40 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] bg-teal-50/30 rounded-full blur-[140px]"></div>
      </div>

      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-6 relative z-10 pt-12">
        <div className="w-full max-w-4xl text-center">
          {/* Status Badge - Pushed higher and smaller */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-100/60 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-700">Global Ready</span>
          </div>

          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Minimalist links. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Fast. Pure. Simple.</span>
            </h1>
            
            <p className="max-w-md mx-auto text-xs md:text-sm text-gray-400 font-bold uppercase tracking-widest mt-2 opacity-60">
              Premium URL management. No ads, no accounts.
            </p>
          </div>

          {/* This part will now be perfectly centered */}
          <div className="relative z-20">
            <ShortenerForm />
          </div>
        </div>
      </main>

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
