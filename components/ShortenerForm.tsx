import React, { useState, useCallback } from 'react';
import { ShortenedLink } from '../types';

const ShortenerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const shortenUrl = async (longUrl: string): Promise<string> => {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    if (!response.ok) throw new Error('NETWORK_ERROR');
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
      setLinks([newLink]); 
      setUrl('');
    } catch (err: any) {
      setError('Invalid URL or Service disruption.');
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
    <div className="w-full">
      <div className="relative group mb-10">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 rounded-[2.5rem] blur-2xl opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
        
        <form 
          onSubmit={handleSubmit}
          className="relative z-20 flex flex-col sm:flex-row gap-4 bg-[#0a120e]/60 backdrop-blur-[40px] p-3 rounded-[2.5rem] border border-white/5 shadow-2xl"
        >
          <input
            type="text"
            required
            disabled={isShortening}
            placeholder="Paste your link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow px-8 py-5 rounded-3xl text-white bg-transparent focus:outline-none placeholder-emerald-100/10 font-bold text-lg"
          />
          <button
            type="submit"
            disabled={isShortening}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[1.8rem] font-black transition-all shadow-xl shadow-emerald-900/40 active:scale-95 flex items-center justify-center uppercase tracking-[0.2em] text-[10px]"
          >
            {isShortening ? 'Processing...' : 'Shorten Now'}
          </button>
        </form>
      </div>

      {error && (
        <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{error}</p>
      )}

      {latestLink && !isShortening && (
        <div className="animate-in zoom-in-95 fade-in duration-500">
           <div className="bg-emerald-500/[0.03] backdrop-blur-3xl border border-emerald-500/10 p-8 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60 mb-2">Short Link Ready</p>
                 <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter">{latestLink.short}</h3>
              </div>
              <button
                onClick={() => handleCopy(latestLink.short, latestLink.id)}
                className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                  copyStatus === latestLink.id ? 'bg-emerald-500 text-white' : 'bg-white/5 text-emerald-400 hover:bg-white/10'
                }`}
              >
                {copyStatus === latestLink.id ? 'Copied!' : 'Copy Link'}
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ShortenerForm;