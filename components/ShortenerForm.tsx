import React, { useState, useEffect, useCallback } from 'react';
import { ShortenedLink } from '../types';

const ShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ShortenedLink[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('linkly_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) { console.error(e); }
    }
  }, []);

  const shortenUrl = async (longUrl: string): Promise<string> => {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    const data = await response.json();
    if (data.errormessage) throw new Error(data.errormessage);
    return data.shorturl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl) return;
    if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;

    setIsShortening(true);
    setError(null);
    
    try {
      const shortened = await shortenUrl(targetUrl);
      const newLink: ShortenedLink = {
        id: Math.random().toString(36).substr(2, 9),
        original: targetUrl,
        short: shortened,
        createdAt: new Date(),
      };
      
      // Limit to exactly 3 items: add new one at the start, keep only first 3
      const updatedHistory = [newLink, ...history].slice(0, 3);
      setHistory(updatedHistory);
      localStorage.setItem('linkly_history', JSON.stringify(updatedHistory));
      setUrl('');
    } catch (err) {
      setError('Service is currently busy. Try again shortly.');
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
      <div className="relative w-full mb-12">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-center bg-[#f8faf9] rounded-[2.5rem] p-2 pr-3 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden"
        >
          <input
            type="text"
            required
            disabled={isShortening}
            placeholder="//paste.your.destination.link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow bg-transparent px-8 py-5 text-gray-800 font-bold placeholder-gray-400 focus:outline-none text-xl"
          />
          <button
            type="submit"
            disabled={isShortening}
            className="bg-[#249c71] hover:bg-[#1b8560] text-white px-10 py-5 rounded-[2rem] font-black text-[12px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
          >
            {isShortening ? 'PROCESSING' : 'SHORTEN'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-8 px-6 py-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
          <p className="text-rose-400 text-xs font-black uppercase tracking-widest">{error}</p>
        </div>
      )}

      {latestLink && (
        <div className="w-full mb-12">
           <div className="relative bg-white rounded-[2.8rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
              <div className="text-left w-full md:w-auto">
                 <div className="inline-flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-full mb-4">
                    <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Link Generated</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 </div>
                 <h3 className="text-4xl md:text-5xl font-black text-[#249c71] tracking-tight mb-2 truncate max-w-sm md:max-w-md">
                   {latestLink.short.replace('https://', '')}
                 </h3>
                 <p className="text-xs text-gray-400 truncate max-w-[250px] md:max-w-md font-semibold">{latestLink.original}</p>
              </div>
              <button
                onClick={() => handleCopy(latestLink.short, latestLink.id)}
                className={`flex items-center justify-center space-x-3 w-full md:w-auto px-10 py-6 rounded-[1.8rem] font-black text-[12px] uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
                  copyStatus === latestLink.id ? 'bg-emerald-100 text-emerald-700' : 'bg-[#249c71] text-white hover:bg-[#1b8560]'
                }`}
              >
                <span>{copyStatus === latestLink.id ? 'COPIED' : 'COPY LINK'}</span>
              </button>
           </div>
        </div>
      )}

      {previousLinks.length > 0 && (
        <div className="w-full max-w-2xl">
           <div className="flex items-center justify-center space-x-6 mb-8 opacity-20">
              <div className="h-[1px] flex-grow bg-emerald-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-100 shrink-0">HISTORY</span>
              <div className="h-[1px] flex-grow bg-emerald-500"></div>
           </div>
           <div className="space-y-4">
              {previousLinks.map((link) => (
                <div key={link.id} className="bg-emerald-500/[0.03] border border-emerald-500/10 rounded-2xl p-6 flex items-center justify-between group hover:bg-emerald-500/[0.08] transition-all">
                  <div className="text-left">
                    <p className="text-emerald-400 font-black text-sm">{link.short.replace('https://', '')}</p>
                    <p className="text-[10px] text-white/20 truncate max-w-[200px] md:max-w-sm">{link.original}</p>
                  </div>
                  <button onClick={() => handleCopy(link.short, link.id)} className="p-3 text-emerald-500/40 hover:text-emerald-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
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