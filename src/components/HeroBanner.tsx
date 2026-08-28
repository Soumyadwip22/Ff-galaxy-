import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShieldCheck, Zap, Sparkles, ChevronRight } from 'lucide-react';
import { BundleCategory } from '../types';
import { sound } from '../utils/audio';

interface HeroBannerProps {
  activeCategory: BundleCategory;
  onSelectCategory: (category: BundleCategory) => void;
  onScrollToBundles: () => void;
  totalBundlesCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeCategory,
  onSelectCategory,
  onScrollToBundles,
  totalBundlesCount,
}) => {
  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 38, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories: { id: BundleCategory; label: string; icon: string }[] = [
    { id: 'ALL', label: 'All Rare Bundles', icon: '🔥' },
    { id: 'CRIMINAL', label: 'Criminal Squad', icon: '🎭' },
    { id: 'MYTHIC', label: 'Mythic & Evo', icon: '⚡' },
    { id: 'CLASSIC', label: 'OG Season 1 & 2', icon: '👑' },
    { id: 'WARRIOR', label: 'Bushido Warriors', icon: '⚔️' },
    { id: 'LIMITED', label: 'Seasonal Limited', icon: '🎃' },
  ];

  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-12 border-b border-red-500/10 bg-gradient-to-b from-[#120508]/80 via-[#0a0a0f] to-[#070709]">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-red-600/15 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag & Event Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-gaming font-semibold tracking-wider glow-red">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>COMMUNITY CELEBRATION DROP</span>
          </div>

          {/* Live countdown badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-black/70 border border-amber-500/30 text-xs font-sub font-bold text-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-zinc-400 font-normal">Vault Reset in:</span>
            <span className="font-mono text-sm tracking-wider text-amber-200">
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        {/* Main Headline & Description */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-gaming tracking-tight uppercase leading-tight mb-3">
            <span className="block text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              CLAIM LEGENDARY &
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]">
              RARE FREE FIRE BUNDLES
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-sub font-medium leading-relaxed max-w-2xl mx-auto">
            Choose from authentic community giveaway allocations of high-tier bundles including <strong className="text-white">Cobra Rage</strong>, <strong className="text-white">Sakura S1</strong>, and the entire <strong className="text-white">Criminal Squad</strong>. Instant claim submission directly to your in-game UID mailbox.
          </p>

          {/* Call-to-action button */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onScrollToBundles();
              }}
              className="cyber-btn cyber-cut px-6 py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-gaming font-black text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>EXPLORE ALL {totalBundlesCount} BUNDLES</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto mb-8 text-left">
          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-gaming font-bold text-zinc-100">Zero Password</p>
              <p className="text-[10px] text-zinc-400">Never asks for credentials</p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-amber-950/80 border border-amber-500/30 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-gaming font-bold text-zinc-100">Instant UID Link</p>
              <p className="text-[10px] text-zinc-400">Automated profile verification</p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-red-950/80 border border-red-500/30 text-red-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-gaming font-bold text-zinc-100">Official Mail Drop</p>
              <p className="text-[10px] text-zinc-400">Delivered via In-Game Mail</p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800 backdrop-blur flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-purple-950/80 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-gaming font-bold text-zinc-100">Community Quota</p>
              <p className="text-[10px] text-zinc-400">Daily refreshed reward pool</p>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  onSelectCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`cyber-cut-sm px-3.5 py-2 rounded text-xs font-gaming font-bold tracking-wide whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-black shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-105'
                    : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
