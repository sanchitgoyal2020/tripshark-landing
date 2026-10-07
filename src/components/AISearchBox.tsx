"use client";

import { useState } from "react";
import { Search, Loader2, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AISearchBox() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to search");
      }
      
      setResults(data.results || []);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50">
      <form 
        onSubmit={handleSearch} 
        className="relative flex items-center w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl overflow-hidden transition-all focus-within:border-white/50 focus-within:bg-white/15"
      >
        <div className="pl-6 pr-2 flex items-center justify-center">
          <Sparkles className="text-amber-300 w-5 h-5 animate-pulse" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI: 'Romantic getaway in Europe under $2000...'"
          className="w-full bg-transparent text-white placeholder:text-zinc-400 px-4 py-4 md:py-5 text-sm md:text-base focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mr-2 p-3 md:p-4 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, pointerEvents: "none" }}
            className="absolute top-full left-0 right-0 mt-4 bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-6 shadow-2xl max-h-[60vh] overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 text-zinc-400">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
                <p>AI is scouring the globe for your perfect trip...</p>
              </div>
            ) : errorMsg ? (
              <div className="text-center py-10 text-red-400">
                <p className="font-semibold text-lg mb-2">Oops! Something went wrong.</p>
                <p className="text-sm bg-red-950/50 p-4 rounded-xl border border-red-900/50 inline-block">{errorMsg}</p>
                {errorMsg.toLowerCase().includes("key") && (
                  <p className="text-sm mt-4 text-zinc-400">Make sure your OPENAI_API_KEY is added to .env.local and you have restarted the server.</p>
                )}
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-medium text-white mb-2">We found {results.length} matches:</h3>
                {results.map((pkg, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-black/50 hover:bg-black/80 transition-colors border border-zinc-800/50 cursor-pointer group">
                    <div 
                      className="w-24 h-24 rounded-xl bg-cover bg-center shrink-0" 
                      style={{ backgroundImage: `url(${pkg.mainImage ? pkg.mainImage : 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format'})` }} 
                    />
                    <div className="flex flex-col justify-center flex-grow">
                      <h4 className="text-lg font-medium text-white group-hover:text-amber-300 transition-colors">{pkg.title}</h4>
                      <p className="text-zinc-400 text-sm flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {pkg.country} • {pkg.duration}</p>
                      {pkg.pricing && <p className="text-white font-semibold mt-2">${pkg.pricing}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-zinc-400">
                <Search className="w-10 h-10 mx-auto mb-4 opacity-50" />
                <p>No magical journeys found for this exact request.</p>
                <p className="text-sm mt-2">Make sure you have added packages in Sanity Studio!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
