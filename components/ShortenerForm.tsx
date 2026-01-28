
import React, { useState, useCallback, useRef } from 'react';
import { ShortenedLink } from '../types';

const ShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const shortenUrl = async (longUrl: string): Promise<string> => {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    
    if (!response.ok) {
      throw new Error('NETWORK_ERROR');
    }

    const data = await response.json();
    
    if (data.errormessage) {
      throw new Error(data.errormessage);
    }

    return data.shorturl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl) return;

    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

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
      
      setLinks([newLink]); 
      setUrl('');
    } catch (err: any) {
      console.error('Shortening error:', err);
      if (err.message && err.message.includes('invalid')) {
        setError('Invalid URL provided.');
      } else {
        setError('Service error. Try again.');
      }
    } finally {
      setIsShortening(false);
    }
  };

  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  }, []);

  const latestLink = links[0];

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      {/* Input Group */}
      <div className="relative group mb-3">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[1.8rem] blur opacity-15 pointer-events-none group-focus-within:opacity-30 transition duration-1000"></div>
        
        <form 
          onSubmit={handleSubmit}
          className="relative z-20 flex flex-col sm:flex-row gap-2 bg-white/95 backdrop-blur-3xl p-1.5 rounded-[1.8rem] shadow-2xl border border-white/50"
        >
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              required
              autoFocus
              disabled={isShortening}
              placeholder="Enter your URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-5 py-3 md:py-3.5 rounded-2xl text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 font-bold text-base"
            />
          </div>
          <button
            type="submit"
            disabled={isShortening}
            className="sm:w-auto w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 disabled:text-gray-300 text-white px-8 md:px-10 py-3 rounded-2xl font-black transition-all shadow-xl shadow-emerald-200 active:scale-95 flex items-center justify-center uppercase tracking-widest text-[10px] min-w-[120px]"
          >
            {isShortening ? '...' : 'Shorten'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mb-3 px-4 py-2 bg-rose-50 text-rose-600 text-[9px] font-black uppercase tracking-widest rounded-xl animate-in fade-in slide-in-from-top-2 text-center border border-rose-100">
          {error}
        </div>
      )}

      {/* Result Area - Compact for single screen */}
      {latestLink && !isShortening && (
        <div className="animate-in zoom-in-95 fade-in duration-500 slide-in-from-bottom-2">
           <div className="relative bg-white/70 backdrop-blur-3xl border border-white/80 p-3 md:p-4 rounded-[1.4rem] shadow-xl overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                 <div className="text-left overflow-hidden">
                    <p className="text-[8px] font-black uppercase tracking-widest text-emerald-600 mb-0.5 opacity-70">Ready to use</p>
                    <h3 className="text-lg md:text-2xl font-black text-emerald-800 tracking-tighter truncate">{latestLink.short}</h3>
                 </div>
                 
                 <button
                   onClick={() => handleCopy(latestLink.short, latestLink.id)}
                   className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all duration-300 active:scale-95 whitespace-nowrap ${
                     copyStatus === latestLink.id 
                       ? 'bg-emerald-600 text-white' 
                       : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100'
                   }`}
                 >
                   {copyStatus === latestLink.id ? 'Copied' : 'Copy'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;
