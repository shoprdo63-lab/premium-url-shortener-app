import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdPlaceholder from './components/AdPlaceholder';

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);

  const legalContent = {
    terms: `1. ACCEPTANCE OF TERMS
By accessing and using Linkly Premium, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our infrastructure.

2. PERMITTED USE
Linkly is designed for legitimate URL optimization. Users are strictly prohibited from shortening links that point to:
• Malware, phishing sites, or malicious software.
• Content that violates copyright or intellectual property laws.
• Illegal substances or prohibited regulated goods.
• Spam or deceptive marketing materials.

3. SERVICE AVAILABILITY
While we strive for 99.9% uptime for our redirection engine, Linkly is provided "as is". We reserve the right to modify or terminate the service for any reason, without notice, at any time.

4. USER RESPONSIBILITY
You are solely responsible for the destination of the links you create. Linkly does not vet destination URLs in real-time and assumes no liability for the content found at shortened addresses.

5. REDIRECTION POLICY
We reserve the right to disable any link that receives excessive traffic which may destabilize our global network or violates our safety protocols.`,
    privacy: `1. DATA COLLECTION ARCHITECTURE
Linkly is built with a "Privacy First" philosophy. We do not require account creation for standard shortening, and we do not collect Personally Identifiable Information (PII) during the shortening process.

2. LOCAL STORAGE USAGE
Your link history is stored exclusively in your browser's Local Storage. This data never leaves your device and is not synced to our servers. Clearing your browser cache will remove this history.

3. TELEMETRY AND ANALYTICS
We may collect anonymous metadata regarding redirection events (e.g., timestamp, general geographic region) to improve our global routing efficiency. This data cannot be traced back to individual users.

4. THIRD-PARTY PARTNERS
Our platform features sponsored slots from premium partners. These partners may use cookies to provide relevant advertising. Please refer to their respective privacy policies for more information.

5. SECURITY PROTOCOLS
All redirections are processed through secure, encrypted tunnels to ensure that your destination remains untampered with during the transit process.`
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020806] text-white font-sans relative overflow-hidden">
      
      {/* Premium Cinematic Background Effects */}
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