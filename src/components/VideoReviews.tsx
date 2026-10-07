"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

const reviews = [
  {
    id: 1,
    client: "Sarah & Mark",
    location: "Amalfi Coast, Italy",
    thumbnail: "https://images.unsplash.com/photo-1533681473435-021fa4eb384c?q=80&w=800&auto=format&fit=crop",
    quote: "The most magical experience of our lives."
  },
  {
    id: 2,
    client: "David R.",
    location: "Kyoto, Japan",
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    quote: "Flawless execution from start to finish."
  },
  {
    id: 3,
    client: "The Chen Family",
    location: "Serengeti, Tanzania",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    quote: "A bespoke safari that exceeded all dreams."
  },
  {
    id: 4,
    client: "Elena G.",
    location: "Santorini, Greece",
    thumbnail: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    quote: "Every detail was absolute perfection."
  }
];

export function VideoReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <section id="reviews" ref={containerRef} className="py-32 bg-[#050505] overflow-hidden border-y border-zinc-900 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-24 mb-20 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">Real Experiences.</h2>
        <p className="text-xl text-zinc-400 font-light">Watch our clients share their unscripted journeys.</p>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex gap-6 w-max px-6">
          {reviews.map((review) => (
            <div key={`r1-${review.id}`} className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer bg-zinc-900">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${review.thumbnail})` }} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-transform border border-white/30">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold tracking-wider uppercase text-amber-200 mb-1">{review.location}</p>
                <h3 className="text-xl font-medium text-white shadow-black drop-shadow-md">{review.client}</h3>
              </div>
            </div>
          ))}
          {reviews.map((review) => (
            <div key={`r1b-${review.id}`} className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer bg-zinc-900">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${review.thumbnail})` }} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-transform border border-white/30">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold tracking-wider uppercase text-amber-200 mb-1">{review.location}</p>
                <h3 className="text-xl font-medium text-white shadow-black drop-shadow-md">{review.client}</h3>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 (Moves opposite direction) */}
        <motion.div style={{ x: x2 }} className="flex gap-6 w-max px-6">
          {[...reviews].reverse().map((review) => (
            <div key={`r2-${review.id}`} className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer bg-zinc-900">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${review.thumbnail})` }} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-transform border border-white/30">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold tracking-wider uppercase text-amber-200 mb-1">{review.location}</p>
                <h3 className="text-xl font-medium text-white shadow-black drop-shadow-md">{review.client}</h3>
              </div>
            </div>
          ))}
          {[...reviews].reverse().map((review) => (
            <div key={`r2b-${review.id}`} className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer bg-zinc-900">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${review.thumbnail})` }} />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-90 group-hover:scale-110 transition-transform border border-white/30">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold tracking-wider uppercase text-amber-200 mb-1">{review.location}</p>
                <h3 className="text-xl font-medium text-white shadow-black drop-shadow-md">{review.client}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
