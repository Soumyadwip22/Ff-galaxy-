import React from 'react';
import { X, Zap, Sparkles, Shield, Eye, Check } from 'lucide-react';
import { Bundle } from '../types';
import { BundleArtwork } from './BundleArtwork';
import { sound } from '../utils/audio';

interface BundleDetailModalProps {
  bundle: Bundle | null;
  isOpen: boolean;
  onClose: () => void;
  onClaim: (bundle: Bundle) => void;
}

export const BundleDetailModal: React.FC<BundleDetailModalProps> = ({
  bundle,
  isOpen,
  onClose,
  onClaim,
}) => {
  if (!isOpen || !bundle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#181824] via-[#101018] to-[#0a0a0f] border border-zinc-700/80 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="font-gaming font-bold text-sm sm:text-base text-white tracking-wide uppercase">
              BUNDLE INSPECTION & VAULT ARCHIVE
            </h2>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Main Visual & Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
            <div className="bg-zinc-950/80 rounded-xl p-3 border border-zinc-800/80 flex items-center justify-center">
              <BundleArtwork bundle={bundle} size="lg" />
            </div>

            <div className="space-y-3">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-gaming font-bold bg-red-600/30 text-red-400 border border-red-500/50">
                  {bundle.badgeText}
                </span>
                <h3 className="text-xl sm:text-2xl font-gaming font-extrabold text-white mt-1.5">
                  {bundle.name}
                </h3>
                <p className="text-xs text-amber-400 font-sub font-semibold">{bundle.subtitle}</p>
              </div>

              <p className="text-xs text-zinc-300 font-sub leading-relaxed">
                {bundle.description}
              </p>

              {/* Rarity & Event Meta */}
              <div className="grid grid-cols-2 gap-2 text-xs font-sub pt-1">
                <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block">RARITY SCORE</span>
                  <span className="text-amber-400 font-mono font-bold text-sm">{bundle.rarityScore}/100</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] block">EVENT DEBUT</span>
                  <span className="text-zinc-200 font-medium truncate block">{bundle.seasonReleased}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Items Included in Bundle */}
          <div className="space-y-2">
            <h4 className="text-xs font-gaming font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Included Vault Pieces</span>
              <span className="text-zinc-500 font-mono">({bundle.itemsIncluded.length} Total)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bundle.itemsIncluded.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-gaming font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {item.type}
                    </span>
                    <span className="text-zinc-200 font-sub font-medium">{item.name}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-sub font-semibold">{item.rarity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-sub font-semibold text-xs border border-zinc-700"
            >
              Close
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onClaim(bundle);
              }}
              className="cyber-btn cyber-cut flex-1 py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-gaming font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>PROCEED TO CLAIM FREE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
