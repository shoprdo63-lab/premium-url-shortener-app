
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  const legalContent = {
    terms: `1. Acceptance of Terms\nBy accessing Linkly, you agree to be bound by these Terms of Service. Linkly is provided for personal and professional link management.\n\n2. Description of Service\nWe provide real-time URL shortening via public API integrations. We do not store or monitor the content of the destination URLs.\n\n3. Prohibited Use\nUsers may not shorten links that point to malicious, illegal, or harmful content. Abuse of the service will result in permanent blacklisting.\n\n4. Limitation of Liability\nLinkly is an interface. We are not liable for any redirects or external content.\n\n5. Modifications\nTerms are subject to change without notice to ensure quality and compliance.`,
    privacy: `1. Data Collection\nWe do not store your personal information. We only process the URLs you provide to generate shortened versions.\n\n2. Cookies\nWe use localized browser storage (localStorage) to remember your recent links on this device only.\n\n3. Third-Party Services\nWe utilize public shortening APIs. These services may have their own privacy policies regarding redirected traffic.\n\n4. Security\nLinkly uses industry-standard encryption for all data transmissions.`
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020806] text-white selection:bg-emerald-500/30 selection:text-emerald-200 font-['Inter'] relative overflow-hidden">
      {/* Dynamic Background decor - Enhanced for Dark Mode */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-emerald-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-teal-900/15 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-emerald-500/5 rounded-full blur-[80px]"></div>
      </div>

      <Navbar />
      
      {/* Main Layout Container - 3 Columns on Desktop */}
      <div className="flex-grow flex items-center justify-center relative z-10 w-full px-4 md:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_200px] gap-8 w-full max-w-[1600px] items-center">
          
          {/* Ad Left - Visible only on Desktop XL */}
          <div className="hidden xl:flex justify-start">
            <AdPlaceholder orientation="vertical" label="Ad Space L" />
          </div>

          {/* Central Content */}
          <main className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-full max-w-4xl">
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-400">Enterprise Protocol</span>
              </div>

              <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  Minimalist links. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300">Fast. Pure. Simple.</span>
                </h1>
                
                <p className="max-w-md mx-auto text-[10px] md:text-xs text-emerald-100/40 font-bold uppercase tracking-[0.3em] mt-3 opacity-80">
                  Premium URL management. No ads, no accounts.
                </p>
              </div>

              {/* The Input - Centered in Viewport */}
              <div className="relative z-20">
                <ShortenerForm />
              </div>
            </div>
          </main>

          {/* Ad Right - Visible only on Desktop XL */}
          <div className="hidden xl:flex justify-end">
            <AdPlaceholder orientation="vertical" label="Ad Space R" />
          </div>

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
