import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldCheck, Flame, Gift, Sparkles, Search, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  onOpenLuckySpin: () => void;
  onOpenStatusTracker: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  totalClaimedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLuckySpin,
  onOpenStatusTracker,
  onSearchChange,
  searchQuery,
  totalClaimedCount,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const toggleAudio = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0a0a0e]/85 border-b border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top micro-ticker bar */}
      <div className="bg-gradient-to-r from-red-950/80 via-black to-amber-950/80 px-4 py-1 text-[11px] font-sub font-semibold tracking-wider text-zinc-300 border-b border-white/5 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-bold uppercase">GIVEAWAY POOL ACTIVE</span>
          <span className="text-zinc-500">|</span>
          <span className="text-amber-400">Total Bundles Claimed Today: <strong className="text-white font-mono">{totalClaimedCount.toLocaleString()}</strong></span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Free & No Passwords Requested
          </span>
          <span className="hidden sm:inline text-zinc-500">•</span>
          <span className="hidden sm:inline">Direct In-Game Mail Dispatch</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-amber-600 p-0.5 glow-red shadow-lg shadow-red-950/50">
            <div className="w-full h-full bg-black/80 rounded-[7px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-gaming font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-200">
                FREE FIRE
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-gaming font-bold bg-red-600/30 text-red-400 border border-red-500/40 rounded">
                VAULT
              </span>
            </div>
            <p className="text-[10px] font-sub font-medium tracking-widest text-zinc-400 uppercase -mt-0.5">
              Rare Bundle Giveaway
            </p>
          </div>
        </div>

        {/* Search Bar on Desktop & Tablet */}
        <div className="hidden md:flex flex-1 max-w-xs relative items-center">
          <Search className="w-4 h-4 absolute left-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search bundles (e.g. Cobra, Criminal)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-zinc-900/90 border border-zinc-700/60 rounded-full text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/50 transition-all font-sub tracking-wide"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Lucky Spin Mini Game Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLuckySpin();
            }}
            className="cyber-btn cyber-cut-sm relative px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-amber-600/30 to-yellow-500/20 hover:from-amber-600/50 hover:to-yellow-500/40 text-amber-300 border border-amber-500/50 rounded text-xs font-gaming font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span className="hidden xs:inline">LUCKY SPIN</span>
            <span className="xs:hidden">SPIN</span>
          </button>

          {/* Track Claim Status */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStatusTracker();
            }}
            className="cyber-btn cyber-cut-sm px-2.5 sm:px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/60 hover:border-zinc-500 rounded text-xs font-sub font-semibold tracking-wide flex items-center gap-1.5 transition-all"
          >
            <Gift className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Check Claim</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleAudio}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-zinc-900/80 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                : 'bg-red-950/40 border-red-500/40 text-amber-400 hover:bg-red-950/60'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search input */}
      <div className="md:hidden px-3 pb-2 pt-1 border-t border-white/5">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search bundles (Sakura, Hip Hop, Criminals)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-4 py-1 text-xs bg-zinc-900/90 border border-zinc-700/60 rounded-full text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/80 transition-all font-sub tracking-wide"
          />
        </div>
      </div>
    </header>
  );
};
