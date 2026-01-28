
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import AdPlaceholder from './components/AdPlaceholder';

const Typewriter: React.FC<{ text: string; delay?: number; speed?: number; onComplete?: () => void; className?: string }> = ({ text, delay = 0, speed = 70, onComplete, className }) => {
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
        <span className="inline-block w-[3px] h-[0.8em] bg-emerald-500 ml-1 animate-pulse align-middle"></span>
      )}
    </span>
  );
};

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // Added isStarted state to fix reference error on line 106 and trigger entrance animations
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Small delay to trigger the entrance transition after mount
    const timer = setTimeout(() => setIsStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        <div className="absolute top-[-20%] left-[-10%] w-[120vw] h-[120vw] bg-emerald-600/5 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[100vw] h-[100vw] bg-teal-500/5 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>
      </div>

      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex relative z-10 w-full max-w-7xl mx-auto px-6 pt-44 pb-20 items-center justify-center">
        <div className="grid grid-cols-1 xl:grid-cols-[180px_1fr_180px] gap-12 items-center w-full">
          
          {/* Ad Left - Entrance Animation */}
          <aside className={`hidden xl:flex flex-col items-center transition-all duration-1000 ease-out ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <AdPlaceholder orientation="vertical" label="Slot A" className="h-[600px]" />
          </aside>

          {/* Main Stage */}
          <main className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-3xl space-y-10">
              <div className="space-y-6">
                {/* Intro Badge */}
                <div className={`inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 mx-auto transition-all duration-1000 ${isStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Advanced Neural Shortening</span>
                </div>
                
                {/* Typewriter Heading */}
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none min-h-[1.1em] drop-shadow-2xl">
                  <Typewriter 
                    text="The Link " 
                    speed={80} 
                    delay={600} 
                  />
                  <Typewriter 
                    text="Vibe" 
                    speed={120} 
                    delay={1800} 
                    className="text-emerald-500 italic bg-clip-text"
                    onComplete={() => setShowSubtitle(true)}
                  />
                </h1>

                {/* Subtitle Fade */}
                <div className={`transition-all duration-1000 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                   <p className="text-emerald-100/30 font-medium tracking-wide text-lg max-w-xl mx-auto leading-relaxed">
                    Optimize your links with a single click. High performance, 
                    <span className="text-emerald-500/50"> global reach</span>, and absolute privacy.
                  </p>
                </div>
              </div>

              {/* Form Entrance */}
              <div className={`w-full transition-all duration-1000 delay-300 ${showSubtitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onTransitionEnd={() => setShowForm(true)}>
                <ShortenerForm />
              </div>

              {/* Bottom Marketplace Ad */}
              <div className={`w-full pt-8 transition-all duration-1000 delay-700 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <AdPlaceholder orientation="horizontal" label="Global Marketplace" className="max-w-xl mx-auto" />
              </div>
            </div>
          </main>

          {/* Ad Right - Entrance Animation */}
          <aside className={`hidden xl:flex flex-col items-center transition-all duration-1000 ease-out ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <AdPlaceholder orientation="vertical" label="Slot B" className="h-[600px]" />
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
