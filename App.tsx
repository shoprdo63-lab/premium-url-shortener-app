import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdPlaceholder from './components/AdPlaceholder';

const Typewriter: React.FC<{ text: string; delay?: number; speed?: number; onComplete?: () => void; className?: string }> = ({ text, delay = 0, speed = 80, onComplete, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [displayText, isStarted, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {isStarted && displayText.length < text.length && (
        <span className="inline-block w-1 h-[0.8em] bg-emerald-500 ml-1 animate-pulse"></span>
      )}
    </span>
  );
};

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const legalContent = {
    terms: `1. ACCEPTANCE OF TERMS
By accessing and using The Link Vibe Premium, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our infrastructure.

2. PERMITTED USE
The Link Vibe is designed for legitimate URL optimization. Users are strictly prohibited from shortening links that point to:
• Malware, phishing sites, or malicious software.
• Content that violates copyright or intellectual property laws.
• Illegal substances or prohibited regulated goods.
• Spam or deceptive marketing materials.

3. SERVICE AVAILABILITY
While we strive for 99.9% uptime for our redirection engine, The Link Vibe is provided "as is". We reserve the right to modify or terminate the service for any reason, without notice, at any time.

4. USER RESPONSIBILITY
You are solely responsible for the destination of the links you create. The Link Vibe does not vet destination URLs in real-time and assumes no liability for the content found at shortened addresses.

5. REDIRECTION POLICY
We reserve the right to disable any link that receives excessive traffic which may destabilize our global network or violates our safety protocols.`,
    privacy: `1. DATA COLLECTION ARCHITECTURE
The Link Vibe is built with a "Privacy First" philosophy. We do not require account creation for standard shortening, and we do not collect Personally Identifiable Information (PII) during the shortening process.

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
    <div className="min-h-screen bg-[#020806] text-white flex flex-col font-sans relative">
      
      {/* Premium Cinematic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[100vw] h-[100vw] bg-emerald-600/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[80vw] h-[80vw] bg-teal-500/5 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <Navbar />
      
      {/* Main container with refined spacing */}
      <div className="flex-grow flex relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_200px] gap-8 items-center w-full">
          
          {/* Ad Left */}
          <aside className={`hidden xl:flex flex-col items-center transition-all duration-1000 ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <AdPlaceholder orientation="vertical" label="Ad Slot A" className="h-[500px]" />
          </aside>

          {/* Main Stage */}
          <main className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-2xl space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Secure Protocol Active</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none min-h-[1.2em]">
                  <Typewriter 
                    text="The Link " 
                    speed={100} 
                    delay={500} 
                  />
                  <Typewriter 
                    text="Vibe" 
                    speed={120} 
                    delay={1600} 
                    className="text-emerald-500 italic"
                    onComplete={() => setShowSubtitle(true)}
                  />
                </h1>

                <div className={`transition-all duration-1000 ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                   <p className="text-emerald-100/30 font-medium tracking-wide text-sm max-w-md mx-auto">
                    Elevate your digital presence with high-performance link optimization and real-time vibe checks.
                  </p>
                </div>
              </div>

              <div className={`w-full transition-all duration-1000 delay-500 ${showSubtitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onTransitionEnd={() => setShowForm(true)}>
                <ShortenerForm />
              </div>

              {/* Bottom Marketplace Ad - Spacing reduced to sit closer to content */}
              <div className={`w-full pt-4 transition-all duration-1000 delay-1000 ${showForm ? 'opacity-100' : 'opacity-0'}`}>
                <AdPlaceholder orientation="horizontal" label="Marketplace" className="max-w-md mx-auto" />
              </div>
            </div>
          </main>

          {/* Ad Right */}
          <aside className={`hidden xl:flex flex-col items-center transition-all duration-1000 ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <AdPlaceholder orientation="vertical" label="Ad Slot B" className="h-[500px]" />
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