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
        <span className="inline-block w-[3px] h-[0.8em] bg-emerald-500 ml-1 animate-pulse align-middle shadow-[0_0_10px_#10b981]"></span>
      )}
    </span>
  );
};

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'about' | 'contact' | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getModalTitle = () => {
    switch (legalType) {
      case 'terms': return 'Terms of Service';
      case 'privacy': return 'Privacy Policy';
      case 'about': return 'About The LinkVibe';
      case 'contact': return 'Contact Support';
      default: return '';
    }
  };

  const legalContent = {
    terms: `1. ACCEPTANCE OF TERMS
By accessing and using The LinkVibe Premium, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our infrastructure.

2. PERMITTED USE
The LinkVibe is designed for legitimate URL optimization. Users are strictly prohibited from shortening links that point to:
• Malware, phishing sites, or malicious software.
• Content that violates copyright or intellectual property laws.
• Illegal substances or prohibited regulated goods.
• Spam or deceptive marketing materials.

3. SERVICE AVAILABILITY
While we strive for 99.9% uptime for our redirection engine, The LinkVibe is provided "as is". We reserve the right to modify or terminate the service for any reason, without notice, at any time.

4. USER RESPONSIBILITY
You are solely responsible for the destination of the links you create. The LinkVibe does not vet destination URLs in real-time and assumes no liability for the content found at shortened addresses.

5. REDIRECTION POLICY
We reserve the right to disable any link that receives excessive traffic which may destabilize our global network or violates our safety protocols.`,
    privacy: `1. DATA COLLECTION ARCHITECTURE
The LinkVibe is built with a "Privacy First" philosophy. We do not require account creation for standard shortening, and we do not collect Personally Identifiable Information (PII) during the shortening process.

2. LOCAL STORAGE USAGE
Your link history is stored exclusively in your browser's Local Storage. This data never leaves your device and is not synced to our servers. Clearing your browser cache will remove this history.

3. TELEMETRY AND ANALYTICS
We may collect anonymous metadata regarding redirection events (e.g., timestamp, general geographic region) to improve our global routing efficiency. This data cannot be traced back to individual users.

4. THIRD-PARTY PARTNERS
Our platform features sponsored slots from premium partners. These partners may use cookies to provide relevant advertising. Please refer to their respective privacy policies for more information.

5. SECURITY PROTOCOLS
All redirections are processed through secure, encrypted tunnels to ensure that your destination remains untampered with during the transit process.`,
    about: `OUR MISSION
The LinkVibe was engineered to bridge the gap between complex digital infrastructure and simple user experience. We believe that sharing information should be instantaneous, secure, and beautiful.

THE TECHNOLOGY
Built on a distributed edge network, The LinkVibe utilizes advanced caching algorithms to ensure your links load faster than industry standards. Our "Neural Shortening" protocol optimizes path routing to minimize latency globally.

THE VISION
In a world of cluttered data, we provide clarity. The LinkVibe is not just a tool; it is a statement of efficiency. We are dedicated to maintaining a clutter-free, ad-optimized ecosystem that respects user time and attention.`,
    contact: `GET IN TOUCH
We value open channels of communication with our user base. Whether you have technical inquiries, partnership proposals, or feedback on our routing architecture, our team is ready to assist.

OFFICIAL SUPPORT CHANNEL
For all inquiries, please contact our support desk directly via email. We aim to respond to all valid tickets within 24 hours.

Email: shoprdo63@gmail.com

OPERATING HOURS
Our automated systems run 24/7. Human support is available Monday through Friday, 9:00 AM - 5:00 PM (EST).`
  };

  return (
    <div className="min-h-screen bg-[#020806] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Premium Cinematic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-teal-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-emerald-600/5 rounded-full blur-[100px] animate-pulse delay-2000 duration-[10s]"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <Navbar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20 items-start justify-center">
        {/* Changed items-center to items-start for the grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[200px_1fr_200px] gap-8 items-start w-full">
          
          {/* Ad Left - Sticky & High */}
          <aside className={`hidden xl:flex flex-col items-center sticky top-32 transition-all duration-1000 ease-out ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <AdPlaceholder orientation="vertical" label="Partner A" className="h-[600px] hover:scale-[1.02] duration-500" />
          </aside>

          {/* Main Stage */}
          <main className="flex flex-col items-center justify-center text-center relative">
            
            {/* New Top Banner Ad */}
            <div className={`w-full max-w-4xl mb-10 transition-all duration-1000 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
               <AdPlaceholder orientation="horizontal" label="Premium Sponsor" className="w-full h-[100px] hover:scale-[1.01] duration-500" />
            </div>

            {/* Background Glow for Main Stage */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-3xl space-y-10 relative z-10">
              <div className="space-y-6">
                {/* Intro Badge */}
                <div className={`group cursor-default inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 mx-auto transition-all duration-1000 ${isStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/70 group-hover:text-emerald-400 transition-colors">Advanced Neural Shortening</span>
                </div>
                
                {/* Typewriter Heading */}
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none min-h-[1.1em] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <Typewriter 
                    text="The Link" 
                    speed={80} 
                    delay={600} 
                  />
                  <Typewriter 
                    text="Vibe" 
                    speed={120} 
                    delay={1300} 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic"
                    onComplete={() => setShowSubtitle(true)}
                  />
                </h1>

                {/* Subtitle Fade */}
                <div className={`transition-all duration-1000 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                   <p className="text-emerald-100/40 font-medium tracking-wide text-lg max-w-xl mx-auto leading-relaxed">
                    Optimize your links with a single click. High performance, 
                    <span className="text-emerald-400/80 decoration-emerald-500/30 underline underline-offset-4 decoration-2"> global reach</span>, and absolute privacy.
                  </p>
                </div>
              </div>

              {/* Form Entrance */}
              <div className={`w-full transition-all duration-1000 delay-300 ${showSubtitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onTransitionEnd={() => setShowForm(true)}>
                <ShortenerForm />
              </div>

              {/* Educational Content Section */}
              <div className={`w-full text-left space-y-12 py-16 px-6 md:px-10 transition-all duration-1000 delay-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight leading-tight">
                    Why URL Shortening is Essential for Modern Digital Strategy
                  </h2>
                  <p className="text-emerald-100/60 leading-relaxed font-medium text-lg">
                    In the fast-paced world of digital communication, the way we share information is just as important as the information itself. Long, cluttered URLs can be intimidating, difficult to share, and often break when sent via messaging apps or social media. This is where <span className="text-emerald-400 font-bold">The LinkVibe</span> steps in, transforming complex web addresses into sleek, manageable, and high-performing assets.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Enhanced User Experience",
                      content: "First impressions matter. A long URL filled with tracking parameters and cryptic symbols looks unprofessional. By using a premium shortener, you provide a clean, \"vibe-checked\" link that encourages clicks and builds immediate trust."
                    },
                    {
                      title: "Advanced Tracking & Analytics",
                      content: "Every click tells a story. Know where in the world your traffic is coming from, understand device preferences, and identify which platforms drive the most engagement for your brand."
                    },
                    {
                      title: "Maximizing Character Real Estate",
                      content: "On platforms where every character counts—such as X (Twitter) or SMS marketing—long links are a liability. Shortening URLs gives you more space to craft your message and engage your followers."
                    },
                    {
                      title: "Security and Privacy First",
                      content: "In an era of digital uncertainty, security is non-negotiable. Our \"Advanced Neural Shortening\" technology ensures that your links are processed through secure protocols, protecting both the creator and the end-user."
                    },
                    {
                        title: "Branding and Professionalism",
                        content: "Whether you are a freelance developer or a growing enterprise, the tools you use reflect your brand's quality. The LinkVibe is designed for those who don't settle for \"basic.\"",
                        fullWidth: true
                    }
                  ].map((item, idx) => (
                    <div key={idx} className={`group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300 ${item.fullWidth ? 'md:col-span-2' : ''}`}>
                      <h3 className="text-xl font-black text-emerald-400 mb-4 group-hover:text-emerald-300 tracking-tight flex items-center">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 text-xs mr-3 border border-emerald-500/20">{idx + 1}</span>
                        {item.title}
                      </h3>
                      <p className="text-sm text-emerald-100/50 leading-relaxed font-medium">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Marketplace Ad */}
              <div className={`w-full pt-8 transition-all duration-1000 delay-700 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <AdPlaceholder orientation="horizontal" label="Global Marketplace" className="max-w-xl mx-auto hover:scale-[1.02] duration-500" />
              </div>
            </div>
          </main>

          {/* Ad Right - Sticky & High */}
          <aside className={`hidden xl:flex flex-col items-center sticky top-32 transition-all duration-1000 ease-out ${showForm ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <AdPlaceholder orientation="vertical" label="Partner B" className="h-[600px] hover:scale-[1.02] duration-500" />
          </aside>
        </div>
      </div>

      <Footer onOpenLegal={(type) => setLegalType(type)} />

      <LegalModal 
        isOpen={legalType !== null} 
        onClose={() => setLegalType(null)} 
        title={getModalTitle()}
        content={legalType ? legalContent[legalType] : ''}
      />
    </div>
  );
};

export default App;