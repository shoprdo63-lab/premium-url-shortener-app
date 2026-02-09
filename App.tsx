
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import Blog from './components/Blog';

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

const RedirectScreen = () => (
  <div className="min-h-screen bg-[#020806] flex items-center justify-center flex-col space-y-8 relative overflow-hidden">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse-slow"></div>
     <div className="relative z-10 text-center">
       <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"></div>
       <h1 className="text-3xl font-black text-white tracking-tight mb-2">Securely Redirecting...</h1>
       <p className="text-emerald-100/50 font-medium text-sm uppercase tracking-widest">Verifying Destination Safety</p>
     </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'blog'>('home');
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'about' | 'contact' | 'abuse' | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const path = window.location.pathname.slice(1);
    const isShortLink = /^[a-zA-Z0-9]{1,6}$/.test(path);
    
    if (isShortLink) {
      setIsRedirecting(true);
      const originalUrl = localStorage.getItem(`lv_${path}`);
      
      if (originalUrl) {
        setTimeout(() => {
          window.location.replace(originalUrl);
        }, 1500);
      } else {
        setTimeout(() => {
          setIsRedirecting(false);
        }, 1000);
      }
    } else {
      const timer = setTimeout(() => setIsStarted(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNavigate = (view: 'home' | 'blog') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getModalTitle = () => {
    switch (legalType) {
      case 'terms': return 'Terms of Service';
      case 'privacy': return 'Privacy Policy';
      case 'about': return 'About The LinkVibe';
      case 'contact': return 'Contact Support';
      case 'abuse': return 'Report Abuse';
      default: return '';
    }
  };

  const legalContent = {
    terms: `1. ACCEPTANCE OF TERMS: By using The LinkVibe, you agree to comply with all applicable laws and these terms.
    2. PROHIBITED CONTENT: We strictly prohibit the shortening of links pointing to malicious software, phishing sites, or illegal content.
    3. SERVICE AVAILABILITY: While we strive for 99.9% uptime, the service is provided "as is" without warranty.`,
    privacy: `1. DATA COLLECTION: We collect aggregate, non-personal data (e.g., click counts, general geography).
    2. USER PRIVACY: We do not collect Personally Identifiable Information (PII) or track individual user behavior beyond anonymous click analytics.
    3. THIRD PARTIES: No data is sold or shared with third-party advertisers.`,
    about: `The LinkVibe is a premier digital infrastructure provider focused on link optimization and secure redirection. Our mission is to enhance digital trust through aesthetic and functional URL management.`,
    contact: `For support inquiries or enterprise solutions, please reach out to our team at magic.reviewsite@gmail.com. Response time is typically within 24 hours.`,
    abuse: `Safety is our top priority. If you encounter a LinkVibe URL that violates our policies, please report it immediately with the short code. We take action on verified abuse within one business day.`
  };

  if (isRedirecting) {
    return <RedirectScreen />;
  }

  return (
    <div className="min-h-screen bg-[#020806] text-white flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-teal-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      <div className="flex-grow flex flex-col relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 items-center justify-start">
        
          <main className="w-full">
            {currentView === 'home' ? (
              <div className="flex flex-col items-center justify-center text-center">
                <div className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[600px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="w-full max-w-4xl space-y-10 relative z-10">
                  <div className="space-y-6">
                    <div className={`group cursor-default inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 mx-auto transition-all duration-1000 ${isStarted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100/70">Advanced Neural Shortening</span>
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none min-h-[1.1em]">
                      <Typewriter text="The Link" speed={80} delay={600} />
                      <Typewriter 
                        text="Vibe" 
                        speed={120} 
                        delay={1300} 
                        className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 italic"
                        onComplete={() => setShowSubtitle(true)}
                      />
                    </h1>

                    <div className={`transition-all duration-1000 ease-out ${showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                       <p className="text-emerald-100/40 font-medium tracking-wide text-lg max-w-2xl mx-auto leading-relaxed">
                        Professional URL Optimization & Secure Redirection Infrastructure.
                        <br/>Redefining digital optimization for the modern web.
                      </p>
                    </div>
                  </div>

                  <div className={`w-full transition-all duration-1000 delay-300 ${showSubtitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onTransitionEnd={() => setShowForm(true)}>
                    <ShortenerForm />
                  </div>

                  {/* EXTENSIVE SEO CONTENT SECTION */}
                  <div className={`w-full text-left space-y-24 py-20 transition-all duration-1000 delay-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    
                    {/* Intro Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
                              The Evolution of Digital Links in a <span className="text-emerald-500">Globalized Economy</span>
                            </h2>
                            <p className="text-emerald-100/60 leading-relaxed font-medium text-lg">
                              In the fast-paced world of digital communication, the way we share information is just as important as the information itself. Long, cluttered URLs can be intimidating, difficult to share, and often break. 
                            </p>
                            <p className="text-emerald-100/40 leading-relaxed font-medium">
                              The LinkVibe transforms complex web addresses into sleek, manageable, and high-performing assets designed for the modern web. As digital landscapes become more crowded, the "Visual Trust" of a link has become a primary factor in click-through rates (CTR).
                            </p>
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-8 rounded-[2.5rem] relative group">
                            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 flex flex-col space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-white">Visual Trust Factor</h3>
                                <p className="text-sm text-emerald-100/50 leading-relaxed">
                                  A link that looks clean and secure is significantly more likely to be engaged with than a raw URL string filled with tracking parameters.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Why URL Shortening is Essential</h2>
                            <p className="text-emerald-100/30 font-medium">Core benefits of the LinkVibe protocol</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { num: "1", title: "Visual Integrity", desc: "First impressions matter. By using a premium shortener, you provide a clean, 'vibe-checked' link that encourages clicks." },
                                { num: "2", title: "Granular Analytics", desc: "Understand traffic with surgical precision. Insights into geography and device types while maintaining privacy." },
                                { num: "3", title: "Character Estate", desc: "Maximize your message space on platforms like X, Threads, or SMS where every character counts." },
                                { num: "4", title: "Neural Protection", desc: "Advanced technology ensures your links are processed through secure protocols, shielding from threats." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all group">
                                    <span className="text-4xl font-black text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors mb-4 block">{item.num}</span>
                                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-emerald-100/40 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Infrastructure Section */}
                    <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/10 rounded-[3rem] p-10 md:p-16 space-y-10">
                        <div className="max-w-3xl space-y-6">
                            <h2 className="text-4xl font-black text-white tracking-tight">Infrastructure Engineered for <span className="text-emerald-400 italic">Speed</span></h2>
                            <p className="text-emerald-100/60 leading-relaxed text-lg">
                                Built on high-performance edge computing and a distributed server architecture, The LinkVibe ensures that every redirect happens in milliseconds.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Global Load Balancing</h4>
                                <p className="text-sm text-emerald-100/40 leading-relaxed font-medium">
                                    By balancing server load and utilizing advanced caching mechanisms, we guarantee 99.9% uptime. Our infrastructure is designed to handle viral traffic spikes without compromising performance.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Neural Scanning Protocol</h4>
                                <p className="text-sm text-emerald-100/40 leading-relaxed font-medium">
                                    Our proprietary scanning engine uses machine learning to identify patterns associated with malicious websites. This proactive approach ensures harmful content is blocked before it reaches the end-user.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Use Cases */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Digital Marketers", desc: "Enhance aesthetics in bios and descriptions where professional appearance is mandatory." },
                            { title: "Developers & IT", desc: "Integrate shortened links into automated notifications or system alerts with clean logic." },
                            { title: "Content Creators", desc: "Maintain your brand's 'vibe'. Whether sharing an affiliate link or portfolio piece, look as good as your content." }
                        ].map((caseItem, i) => (
                            <div key={i} className="p-8 border-l border-emerald-500/20 space-y-4">
                                <h5 className="text-emerald-500 font-black uppercase tracking-widest text-[10px]">Case Study 0{i+1}</h5>
                                <h3 className="text-xl font-bold text-white">{caseItem.title}</h3>
                                <p className="text-sm text-emerald-100/40 leading-relaxed">{caseItem.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto space-y-12">
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-8">
                            {[
                                { q: "Is The LinkVibe free to use for commercial purposes?", a: "Yes. The LinkVibe is a premium service offered free of charge for both personal and professional use. We believe high-quality digital tools should be accessible to everyone." },
                                { q: "How do you ensure link security and prevent abuse?", a: "We utilize a proprietary 'Neural Scanning' protocol that analyzes destination URLs in real-time. We check for malware, phishing attempts, and low-reputation domains." },
                                { q: "Can I track performance without violating privacy?", a: "Absolutely. Our platform provides advanced, privacy-compliant analytics. We do not track individual users or collect Personally Identifiable Information (PII)." },
                                { q: "How do I report a malicious link?", a: "We take digital safety seriously. Report any violations via our Report Abuse page or email magic.reviewsite@gmail.com. We disable harmful links within 24 hours." }
                            ].map((faq, i) => (
                                <div key={i} className="group p-8 bg-white/5 border border-white/5 rounded-[2rem] hover:border-emerald-500/20 transition-all">
                                    <h4 className="text-lg font-bold text-emerald-400 mb-4">{faq.q}</h4>
                                    <p className="text-emerald-100/50 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              <Blog />
            )}
          </main>
      </div>

      <Footer onOpenLegal={(type) => setLegalType(type)} />

      <LegalModal 
        isOpen={legalType !== null} 
        onClose={() => setLegalType(null)} 
        title={getModalTitle()}
        content={legalType ? (legalContent as any)[legalType] : ''}
      />
    </div>
  );
};

export default App;
