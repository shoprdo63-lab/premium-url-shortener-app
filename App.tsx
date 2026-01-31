import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ShortenerForm from './components/ShortenerForm';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';

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
     {/* Background effects */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full animate-pulse-slow"></div>
     
     <div className="relative z-10 text-center">
       <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]"></div>
       <h1 className="text-3xl font-black text-white tracking-tight mb-2">Securely Redirecting...</h1>
       <p className="text-emerald-100/50 font-medium text-sm uppercase tracking-widest">Verifying Destination Safety</p>
     </div>
  </div>
);

const App: React.FC = () => {
  const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'about' | 'contact' | 'abuse' | null>(null);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect Logic
  useEffect(() => {
    // Check path for short code (remove leading slash)
    const path = window.location.pathname.slice(1);
    
    // Validate format: 1 to 6 alphanumeric characters (Base62)
    // Updated to allow 1 char for shortest possible URLs
    const isShortLink = /^[a-zA-Z0-9]{1,6}$/.test(path);
    
    if (isShortLink) {
      setIsRedirecting(true);
      const originalUrl = localStorage.getItem(`lv_${path}`);
      
      if (originalUrl) {
        // Simulate "Security Scan" delay
        setTimeout(() => {
          window.location.replace(originalUrl);
        }, 1500);
      } else {
        // Link not found logic (just stay on home page but stop loading)
        setTimeout(() => {
          setIsRedirecting(false);
          // Optional: Show error toast here
        }, 1000);
      }
    } else {
      const timer = setTimeout(() => setIsStarted(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

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
    terms: `1. ACCEPTANCE OF TERMS
By accessing and using The LinkVibe, you agree to comply with these Terms of Service. This platform is strictly prohibited for use in any illegal activities.

2. PROHIBITED CONTENT
Users are strictly prohibited from shortening links that point to:
• Malware, phishing sites, or malicious software.
• Illegal substances, prohibited goods, or scams.
• Content that violates intellectual property laws.
• Hate speech, harassment, or explicit material.

3. ZERO TOLERANCE POLICY
We employ automated scanning and manual review. Any link found to be in violation of our policies will be disabled immediately, and the creating IP address may be banned from our infrastructure.

4. SERVICE AVAILABILITY
The LinkVibe is provided "as is". We strive for maximum uptime but reserve the right to modify or terminate the service for any reason without notice to maintain system integrity.`,
    
    privacy: `1. DATA PROTECTION
We take your privacy seriously. The LinkVibe does not sell, trade, or rent users' personal identification information to others.

2. DATA COLLECTION
We do not require account creation for standard shortening. We may collect non-personal analytics data (browser type, geographic region) solely to improve our routing infrastructure and user experience.

3. COOKIES
We use cookies strictly for essential site functionality and anonymous analytics. No tracking pixels for third-party ad retargeting are used on our core shortening engine.

4. SECURITY
We implement enterprise-grade security measures to protect against unauthorized access, alteration, or destruction of data stored on our systems.`,
    
    about: `OUR MISSION
The LinkVibe was engineered to bridge the gap between complex digital infrastructure and simple user experience. We believe that sharing information should be instantaneous, secure, and beautiful.

THE TECHNOLOGY
Built on a distributed edge network, The LinkVibe utilizes advanced caching algorithms to ensure your links load faster than industry standards. Our "Neural Shortening" protocol optimizes path routing to minimize latency globally.

THE VISION
In a world of cluttered data, we provide clarity. The LinkVibe is not just a tool; it is a statement of efficiency. We are dedicated to maintaining a clutter-free ecosystem that respects user time and attention.`,
    
    contact: `GET IN TOUCH
We value open channels of communication. For technical inquiries, partnership proposals, or general feedback, our team is ready to assist.

OFFICIAL SUPPORT
Email: magic.reviewsite@gmail.com

RESPONSE TIME
We aim to respond to all valid inquiries within 24-48 hours during business days (Mon-Fri).`,

    abuse: `REPORT ABUSE & SAFETY CENTER
The LinkVibe employs automated scanning to detect and disable links pointing to malware, phishing sites, or spam. However, community reporting is a vital part of our safety ecosystem.

HOW TO REPORT
If you encounter a suspicious link using our domain, please report it immediately so we can investigate and disable it.

CONTACT INFORMATION
Email: magic.reviewsite@gmail.com
Subject: Abuse Report - [Insert Short Link]

Please include:
1. The shortened URL (e.g., linkvibe.vercel.app/xyz)
2. The destination URL (if known)
3. Reason for reporting (Phishing, Malware, Spam, etc.)

Our Trust & Safety team investigates all reports within 24 hours.`
  };

  if (isRedirecting) {
    return <RedirectScreen />;
  }

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
      <div className="flex-grow flex flex-col relative z-10 w-full max-w-5xl mx-auto px-6 pt-32 pb-20 items-center justify-start">
        
          {/* Main Stage */}
          <main className="w-full flex flex-col items-center justify-center text-center relative">

            {/* Background Glow for Main Stage */}
            <div className="absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[600px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-4xl space-y-10 relative z-10">
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
                   <p className="text-emerald-100/40 font-medium tracking-wide text-lg max-w-2xl mx-auto leading-relaxed">
                    Professional URL Optimization & Secure Redirection Infrastructure.
                    <br/>Redefining digital optimization for the modern web.
                  </p>
                </div>
              </div>

              {/* Form Entrance */}
              <div className={`w-full transition-all duration-1000 delay-300 ${showSubtitle ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} onTransitionEnd={() => setShowForm(true)}>
                <ShortenerForm />
              </div>

              {/* Comprehensive Educational Content Section */}
              <div className={`w-full text-left space-y-24 py-16 transition-all duration-1000 delay-500 ${showForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                
                {/* The Evolution (Context) */}
                <div className="space-y-6 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                      The Evolution of Digital Links in a <span className="text-emerald-400">Globalized Economy</span>
                    </h2>
                    <p className="text-emerald-100/60 leading-relaxed font-medium text-lg">
                      In the fast-paced world of digital communication, the way we share information is just as important as the information itself. Long, cluttered URLs can be intimidating, difficult to share, and often break. <span className="text-emerald-400 font-bold">The LinkVibe</span> transforms complex web addresses into sleek, manageable, and high-performing assets designed for the modern web.
                    </p>
                    <p className="text-emerald-100/60 leading-relaxed font-medium text-lg">
                       As digital landscapes become more crowded, the "Visual Trust" of a link has become a primary factor in click-through rates (CTR). A link that looks clean and secure is significantly more likely to be engaged with than a raw URL string filled with tracking parameters.
                    </p>
                </div>

                {/* Why Essential */}
                <div className="space-y-10">
                  <div className="space-y-4 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Why URL Shortening is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Essential</span> for Modern Digital Strategy
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Enhanced User Experience and Visual Integrity",
                        content: "First impressions matter in every digital interaction. A long URL filled with UTM parameters and session IDs looks unprofessional. By using a premium shortener like The LinkVibe, you provide a clean, \"vibe-checked\" link that encourages clicks and builds immediate trust with your audience."
                      },
                      {
                        title: "Advanced Tracking & Granular Analytics",
                        content: "Understand your traffic with surgical precision. Every click tells a story. Our platform offers deep insights into geographic distribution, device types, and referral sources—all while maintaining a strict commitment to user privacy."
                      },
                      {
                        title: "Maximizing Character Real Estate",
                        content: "On platforms where every character counts—such as X (Twitter), Threads, or SMS marketing—long links are a significant liability. Shortening URLs gives you more space to craft your message and engage your followers effectively."
                      },
                      {
                        title: "Enterprise-Grade Security and Phishing Protection",
                        content: "In an era of increasing digital uncertainty, security is non-negotiable. Our \"Advanced Neural Shortening\" technology ensures that your links are processed through secure protocols. We shield both the creator and the end-user from potential threats."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="group p-8 md:p-10 rounded-[2rem] bg-white/5 border border-white/5 hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-300">
                        <h3 className="text-xl font-black text-emerald-400 mb-4 group-hover:text-emerald-300 tracking-tight flex items-start">
                          <span className="flex items-center justify-center min-w-[32px] h-8 rounded-full bg-emerald-500/10 text-emerald-400 text-xs mr-3 border border-emerald-500/20 mt-[-2px]">{idx + 1}</span>
                          {item.title}
                        </h3>
                        <p className="text-sm text-emerald-100/50 leading-relaxed font-medium">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Infrastructure Section */}
                <div className="relative bg-[#050f0b] rounded-[3rem] p-8 md:p-12 border border-emerald-500/10 overflow-hidden">
                   {/* Decorative background */}
                   <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                   
                   <div className="relative z-10 space-y-8">
                      <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                          The LinkVibe Infrastructure: <br/><span className="text-emerald-400">Engineered for Speed and Reliability</span>
                        </h2>
                        <p className="text-emerald-100/60 leading-relaxed font-medium text-lg">
                          Built on high-performance edge computing and a distributed server architecture, The LinkVibe ensures that every redirect happens in milliseconds. Our global network of nodes minimizes latency, providing a seamless experience for users regardless of their geographic location.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                         <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white flex items-center">
                              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              Global Load Balancing
                            </h3>
                            <p className="text-sm text-emerald-100/50 font-medium">
                              By balancing server load and utilizing advanced caching mechanisms, we guarantee 99.9% uptime for all shortened links. Our infrastructure is designed to handle viral traffic spikes without compromising performance.
                            </p>
                         </div>
                         <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white flex items-center">
                              <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                              Neural Scanning Protocol
                            </h3>
                            <p className="text-sm text-emerald-100/50 font-medium">
                              Our proprietary scanning engine uses machine learning to identify patterns associated with malicious websites. This proactive approach ensures that harmful content is blocked before it can reach the end-user.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Use Cases */}
                <div className="space-y-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight text-center md:text-left">Professional Use Cases for The LinkVibe</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        role: "Digital Marketers",
                        desc: "For those running multi-channel campaigns, link management is vital. Enhance aesthetics in bios and descriptions where a professional appearance is mandatory for high conversion rates."
                      },
                      {
                        role: "Developers & IT",
                        desc: "Integrate shortened links into automated notifications, system alerts, or documentation. Our clean redirection logic ensures technical links remain functional in restricted environments."
                      },
                      {
                        role: "Content Creators",
                        desc: "Maintain your brand's \"vibe\" across all platforms. Whether sharing an affiliate link or a new portfolio piece, The LinkVibe ensures your links look as good as your content."
                      }
                    ].map((uc, idx) => (
                      <div key={idx} className="bg-[#0a120e] p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
                           <span className="text-emerald-400 font-bold text-lg">{idx+1}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3">{uc.role}</h3>
                        <p className="text-emerald-100/40 text-sm font-medium leading-relaxed">{uc.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-8 border-t border-white/5 pt-16">
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      {
                        q: "Is The LinkVibe free to use for commercial purposes?",
                        a: "Yes. The LinkVibe is a premium service offered free of charge for both personal and professional use. We believe that high-quality digital tools should be accessible to everyone, supported by our robust and scalable global infrastructure."
                      },
                      {
                        q: "How do you ensure link security and prevent abuse?",
                        a: "We utilize a proprietary \"Neural Scanning\" protocol that analyzes destination URLs in real-time. This system checks for malware, phishing attempts, and low-reputation domains before a redirect occurs. We also maintain an active blacklist updated hourly."
                      },
                      {
                        q: "Can I track my link performance without violating privacy laws?",
                        a: "Absolutely. Our platform provides advanced, privacy-compliant analytics. You can gain insights into geographic distribution and device types. Our analytics are strictly aggregated and anonymous; we do not track individual users or collect Personally Identifiable Information (PII)."
                      },
                      {
                        q: "How do I report a malicious link or digital abuse?",
                        a: "At The LinkVibe, we take digital safety seriously. If you encounter a link created through our service that violates our safety policies, please report it immediately via our Report Abuse page or by emailing our support desk directly at magic.reviewsite@gmail.com. We investigate every report and disable harmful links within 24 hours."
                      },
                      {
                        q: "Does The LinkVibe support custom alphanumeric aliases?",
                        a: "Our system is engineered for maximum efficiency and security. Currently, we generate unique, high-reputation alphanumeric strings that ensure your links remain short, permanent, and functional across all browsers and devices."
                      },
                       {
                        q: "What happens if a destination URL changes?",
                        a: "To maintain the integrity of our redirection service, links are permanent once created. This ensures that historical data and shared content remain accessible. We recommend double-checking your destination URL before shortening."
                      }
                    ].map((faq, idx) => (
                      <div key={idx} className="bg-[#050f0b] rounded-2xl p-8 border border-white/5 hover:border-emerald-500/20 transition-colors">
                        <h3 className="text-lg font-bold text-emerald-400 mb-3">{faq.q}</h3>
                        <p className="text-emerald-100/60 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </main>
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