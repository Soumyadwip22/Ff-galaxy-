import React from 'react';
import { Bundle, BundleCategory } from '../types';
import { BundleCard } from './BundleCard';
import { Shuffle, Sparkles, AlertCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface BundleGridProps {
  bundles: Bundle[];
  activeCategory: BundleCategory;
  searchQuery: string;
  onClaimBundle: (bundle: Bundle) => void;
  onInspectBundle: (bundle: Bundle) => void;
  onShuffle: () => void;
  onResetFilters: () => void;
}

export const BundleGrid: React.FC<BundleGridProps> = ({
  bundles,
  activeCategory,
  searchQuery,
  onClaimBundle,
  onInspectBundle,
  onShuffle,
  onResetFilters,
}) => {
  return (
    <section id="bundles-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-gaming font-extrabold text-white tracking-wide">
              AVAILABLE RARE BUNDLES
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
              {bundles.length} ACTIVE
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-sub mt-1">
            Tap “Claim Free” on any desired bundle to begin instant UID mailbox dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onShuffle();
            }}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-zinc-300 hover:text-white text-xs font-sub font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>Shuffle Bundles</span>
          </button>
        </div>
      </div>

      {/* Bundles Grid */}
      {bundles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {bundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onClaim={onClaimBundle}
              onInspect={onInspectBundle}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 max-w-lg mx-auto">
          <AlertCircle className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
          <h3 className="text-lg font-gaming font-bold text-white mb-1">No Bundles Found</h3>
          <p className="text-xs text-zinc-400 mb-4">
            No rare bundle matched your search "{searchQuery}" or selected category filter.
          </p>
          <button
            onClick={() => {
              sound.playClick();
              onResetFilters();
            }}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-black font-gaming font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
