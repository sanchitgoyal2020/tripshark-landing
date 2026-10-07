"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, Compass, Map, Star, Quote, ChevronDown, Shield, ThumbsUp, Headphones, Plane, Globe, Award, Play } from "lucide-react";
import { AISearchBox } from "@/components/AISearchBox";
import { VideoReviews } from "@/components/VideoReviews";

gsap.registerPlugin(ScrollTrigger);

const tabData = {
  Asia: [
    { title: "Bali", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop" },
    { title: "Thailand", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop" },
    { title: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop" },
    { title: "Dubai", img: "https://images.unsplash.com/photo-1512453979436-5a5331779956?q=80&w=800&auto=format&fit=crop" }
  ],
  India: [
    { title: "Kashmir", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800&auto=format&fit=crop" },
    { title: "Himachal", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop" },
    { title: "Ladakh", img: "https://images.unsplash.com/photo-1581793739928-8740c06a3e2f?q=80&w=800&auto=format&fit=crop" },
    { title: "Andaman", img: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800&auto=format&fit=crop" }
  ],
  Europe: [
    { title: "Switzerland", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop" },
    { title: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop" },
    { title: "Greece", img: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop" },
    { title: "Turkey", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop" }
  ]
};

const faqs = [
  { q: "How does the custom planning process work?", a: "We begin with a deep-dive consultation to understand your pace, preferences, and expectations. From there, our travel designers craft a completely bespoke itinerary for your review, refining it until it is perfect." },
  { q: "Do you handle flights and visas?", a: "Yes, our concierge team handles end-to-end logistics, including premium class flights, visa assistance, and private airport transfers, ensuring a seamless door-to-door experience." },
  { q: "Is there a minimum budget for a Tripshark journey?", a: "Our custom itineraries typically start at $5,000 per person. This ensures we can provide the level of luxury, exclusivity, and 24/7 on-ground support our clients expect." },
  { q: "Can you accommodate dietary restrictions?", a: "Absolutely. We coordinate directly with head chefs at all your accommodations and reserved restaurants to ensure your dietary requirements are flawlessly met." }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Scrollytelling Refs
  const scrollyHeroRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLVideoElement>(null);
  const bg2Ref = useRef<HTMLVideoElement>(null);
  const bg3Ref = useRef<HTMLVideoElement>(null);
  const bg4Ref = useRef<HTMLVideoElement>(null);
  const bg5Ref = useRef<HTMLVideoElement>(null);
  
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const text4Ref = useRef<HTMLHeadingElement>(null);
  const text5Ref = useRef<HTMLHeadingElement>(null);
  const text6Ref = useRef<HTMLDivElement>(null);
  
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageRevealInnerRef = useRef<HTMLDivElement>(null);
  const processSectionRef = useRef<HTMLDivElement>(null);
  const processLeftRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"Asia" | "India" | "Europe">("Asia");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. SCROLLYTELLING HERO
      if (scrollyHeroRef.current) {
        const segments = [
          { bg: bg1Ref, text: text2Ref },
          { bg: bg2Ref, text: text3Ref },
          { bg: bg3Ref, text: text4Ref },
          { bg: bg4Ref, text: text5Ref },
          { bg: bg5Ref, text: text6Ref },
        ];

        ScrollTrigger.create({
          trigger: scrollyHeroRef.current,
          start: "top top",
          end: "+=500%", // 5x viewport height for 5 videos
          pin: true,
          scrub: 1.5,
          onUpdate: (self) => {
            const p = self.progress;

            // 1. Fade out the "Scroll to explore" text very quickly (0 to 0.02)
            if (text1Ref.current) {
              text1Ref.current.style.opacity = Math.max(0, 1 - (p * 50)).toString();
            }

            // 2. Handle the 5 segments
            segments.forEach((seg, i) => {
              const start = i * 0.2;
              const end = (i + 1) * 0.2;
              
              if (p >= start && p <= end) {
                // Local progress within this segment (0 to 1)
                const localP = (p - start) / 0.2;
                
                // Opacity fades in (0 to 0.1) and fades out (0.9 to 1)
                let opacity = 1;
                if (localP < 0.1) opacity = localP * 10;
                else if (localP > 0.9 && i < segments.length - 1) opacity = (1 - localP) * 10;
                
                if (seg.bg.current) seg.bg.current.style.opacity = opacity.toString();
                if (seg.text.current) {
                  seg.text.current.style.opacity = opacity.toString();
                  seg.text.current.style.transform = `translateY(${(1 - opacity) * 20}px)`;
                }

                // Scrub the video
                if (seg.bg.current && seg.bg.current.duration) {
                  // Map the middle 80% of the segment to the full video duration
                  const scrubP = Math.max(0, Math.min(1, (localP - 0.1) / 0.8));
                  seg.bg.current.currentTime = scrubP * seg.bg.current.duration;
                }
              } else {
                if (seg.bg.current) seg.bg.current.style.opacity = "0";
                if (seg.text.current) seg.text.current.style.opacity = "0";
              }
            });
          }
        });
      }

      // 2. Image Scale Reveal
      if (imageRevealRef.current && imageRevealInnerRef.current) {
        gsap.fromTo(
          imageRevealInnerRef.current,
          { width: "40%", height: "50vh", borderRadius: "2rem" },
          {
            width: "100%",
            height: "100vh",
            borderRadius: "0rem",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: imageRevealRef.current,
              start: "top center",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // 3. Process Pinned Section
      if (processSectionRef.current && processLeftRef.current) {
        ScrollTrigger.create({
          trigger: processSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: processLeftRef.current,
          pinSpacing: false,
        });
      }

      // 4. Horizontal Scroll
      if (horizontalSectionRef.current && horizontalScrollRef.current) {
        const getScrollAmount = () => {
          let windowWidth = window.innerWidth;
          let scrollWidth = horizontalScrollRef.current!.offsetWidth;
          return -(scrollWidth - windowWidth);
        };

        const tween = gsap.to(horizontalScrollRef.current, {
          x: getScrollAmount,
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const iconicDestinations = [
    { title: "Bali", subtitle: "Island of the Gods", region: "Asia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop" },
    { title: "Switzerland", subtitle: "Alpine Majesty", region: "Europe", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop" },
    { title: "Kashmir", subtitle: "Paradise on Earth", region: "India", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop" },
    { title: "France", subtitle: "Art & Elegance", region: "Europe", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop" },
  ];



  return (
    <main ref={containerRef} className="bg-[#050505] text-white selection:bg-white selection:text-black font-sans overflow-hidden">
      
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-6 bg-gradient-to-b from-black/90 to-transparent">
        <div className="text-2xl font-bold tracking-tighter">TRIPSHARK.</div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-300">
          <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
          <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>
        <a href="#contact" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
          Start Planning
        </a>
      </header>

      {/* 1. SCROLLYTELLING HERO SECTION */}
      <section ref={scrollyHeroRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
        <div className="absolute inset-0 w-full h-full bg-black">
          <video ref={bg1Ref} className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline preload="auto">
            <source src="/videos/mountains.mp4" type="video/mp4" />
          </video>
          <video ref={bg2Ref} className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline preload="auto">
            <source src="/videos/beach.mp4" type="video/mp4" />
          </video>
          <video ref={bg3Ref} className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline preload="auto">
            <source src="/videos/family.mp4" type="video/mp4" />
          </video>
          <video ref={bg4Ref} className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline preload="auto">
            <source src="/videos/solo.mp4" type="video/mp4" />
          </video>
          <video ref={bg5Ref} className="absolute inset-0 w-full h-full object-cover opacity-0" muted playsInline preload="auto">
            <source src="/videos/plans_for_all.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 pointer-events-none" />
        </div>

        <div className="relative z-10 flex items-center justify-center w-full h-full px-4 text-center">
          <h1 ref={text1Ref} className="absolute text-3xl md:text-5xl font-light tracking-wide text-zinc-300">
            Scroll to explore <br/> <ArrowRight className="inline-block mt-6 rotate-90 opacity-60" size={32} />
          </h1>
          <h2 ref={text2Ref} className="absolute opacity-0 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Some crave the stillness<br/><span className="italic text-zinc-300 font-light">of the mountains.</span>
          </h2>
          <h2 ref={text3Ref} className="absolute opacity-0 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Some chase the warmth<br/><span className="italic text-amber-100 font-light">of the coast.</span>
          </h2>
          <h2 ref={text4Ref} className="absolute opacity-0 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Some travel to bond<br/><span className="italic text-blue-100 font-light">with family.</span>
          </h2>
          <h2 ref={text5Ref} className="absolute opacity-0 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
            Some journey far<br/><span className="italic text-zinc-400 font-light">to find themselves.</span>
          </h2>
          <div ref={text6Ref} className="absolute opacity-0 flex flex-col items-center mt-10">
            <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-none mb-8">
              However you explore,<br/>we craft the escape.
            </h2>
            <p className="text-lg md:text-2xl text-zinc-300 font-light tracking-wide max-w-3xl">
              Welcome to Tripshark. Curated for discerning private clients to create bespoke, unforgettable holidays.
            </p>
            <div className="w-full mt-12">
              <AISearchBox />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-zinc-950 py-10 border-y border-zinc-900 flex justify-center overflow-hidden">
        <p className="text-sm uppercase tracking-widest text-zinc-500 font-semibold flex gap-12 items-center opacity-70">
          <span>Trusted by discerning travelers worldwide</span>
          <span className="w-2 h-2 rounded-full bg-zinc-700 hidden md:block"></span>
          <span className="hidden md:block">5-Star Rated Concierge</span>
          <span className="w-2 h-2 rounded-full bg-zinc-700 hidden lg:block"></span>
          <span className="hidden lg:block">Exclusive Partner Networks</span>
        </p>
      </section>

      {/* 2. IMAGE GRID */}
      <section className="relative bg-[#050505] py-32 px-4 lg:px-10">
        <div className="max-w-[1400px] mx-auto mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Curated Masterpieces.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[1400px] mx-auto">
          <div className="col-span-2 row-span-2 aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden group">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop")' }} />
          </div>
          <div className="col-span-1 row-span-1 aspect-square rounded-3xl overflow-hidden group">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop")' }} />
          </div>
          <div className="col-span-1 row-span-2 aspect-[1/2] rounded-3xl overflow-hidden group">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800&auto=format&fit=crop")' }} />
          </div>
          <div className="col-span-1 row-span-1 aspect-square rounded-3xl overflow-hidden group">
            <div className="w-full h-full bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop")' }} />
          </div>
        </div>
      </section>

      {/* 3. IMAGE SCALE REVEAL */}
      <section ref={imageRevealRef} className="relative w-full h-[150vh] bg-[#050505] flex justify-center items-start pt-10">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <div ref={imageRevealInnerRef} className="relative overflow-hidden bg-zinc-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=2000&auto=format&fit=crop")' }} />
            <div className="absolute inset-0 bg-black/40" />
            <h2 className="relative z-10 text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl text-center px-4">
              Explore the<br/>Unseen.
            </h2>
          </div>
        </div>
      </section>

      {/* 4. THE PROCESS */}
      <section id="methodology" ref={processSectionRef} className="relative w-full bg-zinc-950 flex flex-col md:flex-row">
        <div ref={processLeftRef} className="w-full md:w-1/2 h-screen flex flex-col justify-center px-8 lg:px-24">
          <span className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Our Methodology</span>
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">The Art of<br/>Curation.</h2>
          <p className="text-xl text-zinc-400 font-light max-w-md">
            Every journey we design is deeply personal. We take the time to understand your rhythm, your tastes, and your expectations.
          </p>
        </div>
        
        <div className="w-full md:w-1/2 py-32 px-8 lg:px-24 flex flex-col gap-32 pb-[30vh]">
          <div className="flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <MessageCircle className="text-zinc-400" size={28} />
            </div>
            <h3 className="text-4xl font-medium tracking-tight">01. The Consultation</h3>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              It starts with a conversation. We learn about your travel style, dietary preferences, pace, and the kinds of memories you want to create.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Map className="text-zinc-400" size={28} />
            </div>
            <h3 className="text-4xl font-medium tracking-tight">02. The Blueprint</h3>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              Our travel designers craft a bespoke itinerary. We leverage our global network to secure exclusive access and hidden gems not found in guidebooks.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <Compass className="text-zinc-400" size={28} />
            </div>
            <h3 className="text-4xl font-medium tracking-tight">03. The Journey</h3>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              You travel with total peace of mind. Our on-ground concierges and 24/7 support ensure every transition is seamless.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TABBED REGIONS */}
      <section id="destinations" className="bg-[#0a0a0a] py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter">Destinations</h2>
            <div className="flex gap-4 p-2 bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-800">
              {(["Asia", "India", "Europe"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {tabData[activeTab].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900"
                >
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-2xl font-semibold">{item.title}</h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* MID-PAGE CTA BANNER */}
      <section className="relative w-full py-24 px-6 lg:px-24 bg-[#0a0a0a] border-y border-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900/20 to-black z-0" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 bg-zinc-900/50 p-8 md:p-12 rounded-[2rem] border border-zinc-800">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter mb-4">
              Let us know your requirements.
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl font-light">
              Our experts will curate the perfect itinerary tailored exactly to your pace, preferences, and lifestyle.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-end">
            <a href="#contact" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform flex items-center gap-2">
              Start Planning <Plane size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. HORIZONTAL SCROLL DESTINATIONS */}
      <section ref={horizontalSectionRef} className="relative h-screen flex flex-col justify-center bg-[#050505] overflow-hidden">
        <div className="absolute top-20 left-6 lg:left-24 z-10 mix-blend-difference">
          <h2 className="text-5xl lg:text-7xl font-semibold tracking-tighter">Iconic Escapes.</h2>
          <p className="text-xl mt-4 max-w-md text-zinc-300 font-light">Handpicked locales tailored to your exquisite taste.</p>
        </div>
        <div ref={horizontalScrollRef} className="flex gap-10 px-6 lg:px-24 h-[65vh] items-center w-max mt-20">
          {iconicDestinations.map((dest, i) => (
            <div key={i} className="relative w-[320px] md:w-[500px] lg:w-[700px] h-[55vh] md:h-[70vh] rounded-[2rem] overflow-hidden group shrink-0">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[2.5s] group-hover:scale-110" style={{ backgroundImage: `url(${dest.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-3">{dest.region}</p>
                <h3 className="text-5xl md:text-6xl font-medium tracking-tight mb-2">{dest.title}</h3>
                <p className="text-xl text-zinc-300 font-light italic">{dest.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US? */}
      <section className="bg-[#050505] py-32 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-center mb-24">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-amber-500">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">Tailor-made Packages</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                We craft bespoke itineraries matched precisely to your unique travel style and desires.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-blue-400">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">World Class Service</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Enjoy unparalleled luxury, exclusive access, and VIP treatment at every step of your journey.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-emerald-400">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">Best Price Guarantee</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Premium experiences procured through our elite partner network, ensuring unmatched value.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-6 text-purple-400">
                <Headphones size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">24/7 Support</h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Your dedicated on-ground concierge is available around the clock to handle any request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLIENT VIDEO REVIEWS */}
      <VideoReviews />

      {/* 8. OUR BLOGS */}
      <section className="bg-[#0a0a0a] py-32 px-6 lg:px-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter">Our Stories</h2>
            <a href="#" className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest font-semibold transition-colors">
              View All <ArrowRight size={16} />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Ultimate Guide to Bali's Hidden Beaches", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800", date: "Oct 12, 2026" },
              { title: "Experiencing the Northern Lights in Luxury", img: "https://images.unsplash.com/photo-1531366936337-77b5d13ba585?q=80&w=800", date: "Sep 28, 2026" },
              { title: "Culinary Secrets of the Amalfi Coast", img: "https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800", date: "Sep 15, 2026" }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${blog.img})` }} />
                </div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">{blog.date}</p>
                <h3 className="text-2xl font-medium leading-snug group-hover:text-zinc-300 transition-colors">{blog.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section id="faq" className="bg-[#050505] py-32 px-6 lg:px-24 border-y border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-semibold tracking-tighter mb-16 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-800 transition-colors hover:border-zinc-700 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="p-6 md:p-8 flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-medium">{faq.q}</h3>
                  <motion.div animate={{ rotate: openFaq === idx ? 180 : 0 }}>
                    <ChevronDown className="text-zinc-400" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 font-light"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ADVANTAGES & RATINGS */}
      <section className="bg-zinc-950 py-20 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 flex flex-col md:flex-row justify-around items-center gap-12">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-3xl font-bold">
              4.9 <Star className="fill-amber-400 text-amber-400" size={24} />
            </div>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Google Reviews</p>
          </div>
          <div className="w-px h-16 bg-zinc-800 hidden md:block" />
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-3xl font-bold">
              5.0 <Star className="fill-amber-400 text-amber-400" size={24} />
            </div>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Facebook Reviews</p>
          </div>
          <div className="w-px h-16 bg-zinc-800 hidden md:block" />
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-3xl font-bold text-emerald-400">
              <ThumbsUp size={28} />
            </div>
            <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">Trustpilot Verified</p>
          </div>
        </div>
      </section>

      {/* 11. LEAD CAPTURE FORM / CONTACT */}
      <section id="contact" className="relative z-20 bg-black py-32 px-6 lg:px-24 flex justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8 leading-[1.1]">
              Ready for the<br/>extraordinary?
            </h2>
            <p className="text-xl text-zinc-400 font-light mb-12 max-w-lg">
              Leave your details to request a custom itinerary. Our travel designers will reach out within 24 hours to begin crafting your perfect escape.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">WhatsApp</p>
                  <p className="text-lg">+91 77956 86740</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center">
                  <Star size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 uppercase tracking-widest">Service</p>
                  <p className="text-lg">24/7 Concierge Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-zinc-800 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6">Start Planning</h3>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-white transition-colors" />
                <input type="text" placeholder="Last Name" className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-white transition-colors" />
              </div>
              <input type="email" placeholder="Email Address" className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-white transition-colors" />
              <input type="tel" placeholder="Phone Number" className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-white transition-colors" />
              
              <select defaultValue="" className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 focus:outline-none focus:border-white transition-colors text-zinc-300 appearance-none">
                <option value="" disabled>Where do you want to go?</option>
                <option value="asia">Asia (Bali, Maldives, Thailand)</option>
                <option value="europe">Europe (Switzerland, France)</option>
                <option value="india">India (Kashmir, Ladakh)</option>
                <option value="undecided">Undecided - Inspire me</option>
              </select>
              
              <button className="w-full bg-white text-black font-semibold rounded-xl py-5 mt-4 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                Request Itinerary <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 12. COMPREHENSIVE FOOTER */}
      <footer className="bg-black py-20 px-6 lg:px-24 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tighter mb-6">TRIPSHARK.</h3>
            <p className="text-zinc-500 text-sm leading-relaxed pr-8">
              Curating extraordinary journeys for discerning travelers worldwide. Experience the pinnacle of bespoke travel.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-zinc-200">Destinations</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Asia Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Europe Escapes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Incredible India</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Private Islands</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-zinc-200">Company</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#methodology" className="hover:text-white transition-colors">Our Method</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Client Reviews</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6 text-zinc-200">Connect</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <span>WhatsApp:</span> <span className="text-white">+91 77956 86740</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <span>Email:</span> <span className="text-white">hello@tripshark.in</span>
              </li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Tripshark. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
