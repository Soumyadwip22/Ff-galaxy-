import React from 'react';
import { Sparkles, Zap, Eye, CheckCircle2 } from 'lucide-react';
import { Bundle } from '../types';
import { BundleArtwork } from './BundleArtwork';
import { sound } from '../utils/audio';

interface BundleCardProps {
  bundle: Bundle;
  onClaim: (bundle: Bundle) => void;
  onInspect: (bundle: Bundle) => void;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle, onClaim, onInspect }) => {
  const getBadgeStyle = (rarity: string) => {
    switch (rarity) {
      case 'MYTHIC':
        return 'bg-red-600/30 text-red-400 border-red-500/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]';
      case 'LIMITED':
        return 'bg-pink-600/30 text-pink-400 border-pink-500/60 shadow-[0_0_12px_rgba(236,72,153,0.4)]';
      case 'LEGENDARY':
        return 'bg-amber-600/30 text-amber-400 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.4)]';
      default:
        return 'bg-cyan-600/30 text-cyan-400 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.4)]';
    }
  };

  const isLowStock = bundle.remainingQuota <= 20;

  return (
    <div
      className="group relative rounded-2xl bg-gradient-to-b from-[#16161f]/90 via-[#0e0e14]/90 to-[#09090d]/95 border border-zinc-800/80 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(239,68,68,0.25)] flex flex-col justify-between overflow-hidden backdrop-blur-md"
      onMouseEnter={() => sound.playHover()}
    >
      {/* Top Rarity Glow Header */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header with Badges */}
      <div className="p-4 pb-2 flex items-center justify-between gap-2 z-10">
        <span
          className={`px-2.5 py-0.5 rounded text-[11px] font-gaming font-extrabold tracking-wider uppercase border ${getBadgeStyle(
            bundle.rarity
          )}`}
        >
          {bundle.badgeText}
        </span>

        <button
          onClick={() => {
            sound.playClick();
            onInspect(bundle);
          }}
          className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/50 transition-colors flex items-center gap-1 text-[11px] font-sub"
          title="Inspect Bundle Items"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Inspect</span>
        </button>
      </div>

      {/* Bundle Artwork Render */}
      <div className="px-4 py-2 relative flex-1 flex flex-col items-center justify-center">
        <BundleArtwork bundle={bundle} size="md" />
      </div>

      {/* Bundle Info Section */}
      <div className="p-4 pt-2 flex flex-col gap-2.5 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-gaming font-extrabold text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors truncate">
              {bundle.name}
            </h3>
          </div>
          <p className="text-xs text-zinc-400 font-sub truncate">{bundle.subtitle}</p>
        </div>

        {/* Included Items Pills summary */}
        <div className="flex items-center gap-1.5 text-[11px] font-sub text-zinc-300 bg-zinc-950/70 p-2 rounded-lg border border-zinc-800/80">
          <span className="text-amber-400 font-bold">{bundle.itemsIncluded.length} Items:</span>
          <span className="truncate text-zinc-400">
            {bundle.itemsIncluded.map((i) => i.name.split(' ')[0]).join(' • ')}
          </span>
        </div>

        {/* Quota Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-sub font-semibold">
            <span className="text-zinc-400">Claim Allocation</span>
            <span className={isLowStock ? 'text-red-400 font-bold animate-pulse' : 'text-emerald-400'}>
              {bundle.remainingQuota} / {bundle.initialStock} remaining
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                isLowStock ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'
              }`}
              style={{
                width: `${((bundle.initialStock - bundle.remainingQuota) / bundle.initialStock) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Large "Claim Free" Action Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClaim(bundle);
          }}
          className="cyber-btn cyber-cut w-full py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 active:scale-98 text-black font-gaming font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all cursor-pointer mt-1"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>CLAIM FREE</span>
        </button>
      </div>
    </div>
  );
};
