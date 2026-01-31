import React, { useState, useEffect, useCallback } from 'react';
import { ShortenedLink } from '../types';

const ShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ShortenedLink[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('linkvibe_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) { console.error(e); }
    }
  }, []);

  // Professional Base62 generator - Optimized for 6 characters
  // מחולל מקצועי - מיועד ל-6 תווים למראה נקי
  const generateShortId = (length: number = 6) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const shortenUrl = async (longUrl: string): Promise<{ short: string, id: string }> => {
    // Simulate network delay for "processing" feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // WORLD-CLASS SHORTENING LOGIC:
    // We use a 6-character ID which is the industry standard (like Bitly).
    // This is short enough for Ads but unique enough to avoid collisions.
    let code = generateShortId(6);
    
    // Ensure unique ID by checking localStorage
    while (localStorage.getItem(`lv_${code}`)) {
      code = generateShortId(6);
    }
    
    // Store the mapping in "Database" (localStorage)
    localStorage.setItem(`lv_${code}`, longUrl);
    
    // Construct local URL with the cleanest path (no query parameters)
    const shortUrl = `${window.location.origin}/${code}`;
    return { short: shortUrl, id: code };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl) return;
    
    // Ensure protocol exists
    if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

    setIsShortening(true);
    setError(null);
    
    try {
      const { short, id } = await shortenUrl(targetUrl);
      
      const newLink: ShortenedLink = {
        id: id,
        original: targetUrl,
        short: short,
        createdAt: new Date(),
      };
      
      const updatedHistory = [newLink, ...history].slice(0, 5); // Keep last 5
      setHistory(updatedHistory);
      localStorage.setItem('linkvibe_history', JSON.stringify(updatedHistory));
      setUrl('');
    } catch (err) {
      setError('System busy. Please try again.');
    } finally {
      setIsShortening(false);
    }
  };

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  }, []);

  const latestLink = history[0];
  const previousLinks = history.slice(1);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Input Area */}
      <div className="relative w-full mb-12 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.8rem] opacity-30 group-hover:opacity-60 blur-md transition duration-500"></div>
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#f8faf9] rounded-[2.5rem] p-2 pr-3 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/50 focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all duration-300"
        >
          <div className="pl-6 text-emerald-500/40">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          </div>
          <input
            type="text"
            required
            disabled={isShortening}
            placeholder="Paste your destination link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow bg-transparent px-4 py-5 text-gray-800 font-bold placeholder-gray-400 focus:outline-none text-xl tracking-tight"
          />
          <button
            type="submit"
            disabled={isShortening}
            className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white px-10 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isShortening ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Processing</span>
              </span>
            ) : 'Shorten'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-8 px-6 py-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center space-x-3 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p className="text-rose-400 text-xs font-black uppercase tracking-widest">{error}</p>
        </div>
      )}

      {latestLink && (
        <div className="w-full mb-12 animate-in fade-in zoom-in-95 duration-500">
           <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-[2.8rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/5 ring-1 ring-emerald-500/10 group overflow-hidden">
             
             {/* Shine effect */}
             <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
             
             <div className="text-left w-full md:w-auto relative z-10">
                 <div className="inline-flex items-center space-x-2 bg-emerald-100/50 px-3 py-1.5 rounded-full mb-4 border border-emerald-200">
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Link Generated</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 </div>
                 <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#10b981] to-[#047857] tracking-tight mb-2 truncate max-w-sm md:max-w-md drop-shadow-sm">
                   {latestLink.short.replace(/^https?:\/\//, '')}
                 </h3>
                 <p className="text-xs text-gray-400 truncate max-w-[250px] md:max-w-md font-semibold font-mono bg-gray-100 px-2 py-1 rounded inline-block">{latestLink.original}</p>
              </div>
              <button
                onClick={() => handleCopy(latestLink.short, latestLink.id)}
                className={`relative z-10 flex items-center justify-center space-x-3 w-full md:w-auto px-10 py-6 rounded-[1.8rem] font-black text-[12px] uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  copyStatus === latestLink.id 
                    ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500/20' 
                    : 'bg-[#10b981] text-white hover:bg-[#059669] shadow-emerald-500/30'
                }`}
              >
                 {copyStatus === latestLink.id ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                 )}
                <span>{copyStatus === latestLink.id ? 'COPIED!' : 'COPY LINK'}</span>
              </button>
           </div>
        </div>
      )}

      {previousLinks.length > 0 && (
        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="flex items-center justify-center space-x-6 mb-8 opacity-40">
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-100 shrink-0 text-shadow">Recent History</span>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
           </div>
           <div className="space-y-4">
              {previousLinks.map((link, idx) => (
                <div 
                  key={link.id} 
                  className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 flex items-center justify-between group hover:bg-emerald-900/30 hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="text-left flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /></svg>
                    </div>
                    <div>
                        <p className="text-emerald-400 font-black text-sm group-hover:text-emerald-300 transition-colors">{link.short.replace(/^https?:\/\//, '')}</p>
                        <p className="text-[10px] text-emerald-100/30 truncate max-w-[200px] md:max-w-sm font-medium">{link.original}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy(link.short, link.id)} 
                    className={`p-3 rounded-xl transition-all ${copyStatus === link.id ? 'bg-emerald-500/20 text-emerald-400' : 'text-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/10'}`}
                  >
                    {copyStatus === link.id ? (
                        <span className="text-[10px] font-bold">COPIED</span>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                    )}
                  </button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;