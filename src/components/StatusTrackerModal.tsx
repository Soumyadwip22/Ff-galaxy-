import React, { useState } from 'react';
import { X, Search, CheckCircle2, Loader2, ShieldCheck, Mail, AlertCircle, Clock } from 'lucide-react';
import { ClaimSubmission } from '../types';
import { sound } from '../utils/audio';

interface StatusTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentClaims: ClaimSubmission[];
}

export const StatusTrackerModal: React.FC<StatusTrackerModalProps> = ({
  isOpen,
  onClose,
  recentClaims,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [searchedClaim, setSearchedClaim] = useState<ClaimSubmission | null>(
    recentClaims.length > 0 ? recentClaims[0] : null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const clean = query.trim().toUpperCase();
    if (!clean) return;

    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      setIsSearching(false);
      const found = recentClaims.find(
        (c) => c.transactionId.toUpperCase().includes(clean) || c.uid.includes(clean)
      );

      if (found) {
        setSearchedClaim(found);
      } else {
        // Generate simulated active queue status for standard valid search
        if (/^\d{8,12}$/.test(clean) || clean.startsWith('FF-CLAIM')) {
          setSearchedClaim({
            transactionId: clean.startsWith('FF-CLAIM') ? clean : `FF-CLAIM-${Math.floor(100000 + Math.random() * 900000)}-SAKU`,
            bundle: {
              id: 'sakura',
              name: 'Sakura Bundle (Genesis S1)',
              subtitle: 'Elite Pass Season 1',
              category: 'CLASSIC',
              rarity: 'LIMITED',
              badgeText: 'GENESIS S1',
              description: '',
              themeColor: '#f43f5e',
              bgGradient: '',
              accentColor: '#fb7185',
              glowClass: 'glow-red',
              rarityScore: 100,
              totalClaimed: 195,
              remainingQuota: 5,
              initialStock: 200,
              seasonReleased: 'Season 1',
              itemsIncluded: [],
              avatarStyle: { primaryColor: '#f43f5e', secondaryColor: '#881337', accentColor: '#fde047', iconSymbol: '🌸', hoodieType: 'samurai' }
            },
            uid: clean.startsWith('FF-CLAIM') ? '1029384812' : clean,
            nickname: 'GhostWarrior_92',
            level: 68,
            region: 'Singapore / Asia',
            authProvider: 'Google Auth Verified',
            timestamp: 'Today at 02:40 PM',
            status: 'PENDING_MAIL_DISPATCH',
            estimatedHours: '4 - 12 Hours',
          });
        } else {
          setNotFound(true);
          setSearchedClaim(null);
        }
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#181824] via-[#101018] to-[#0a0a0f] border border-zinc-700/80 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            <h2 className="font-gaming font-bold text-sm sm:text-base text-white tracking-wide uppercase">
              CLAIM STATUS & DISPATCH TRACKER
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

        {/* Search input form */}
        <div className="p-4 sm:p-6 space-y-4">
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-sub font-semibold text-zinc-300">
              Enter your Free Fire UID or Claim Tracking ID:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. 1029384756 or FF-CLAIM-..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-gaming font-bold text-xs rounded-xl uppercase transition-all flex items-center gap-1.5"
              >
                {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Track</span>
              </button>
            </div>
          </form>

          {/* Results View */}
          {searchedClaim ? (
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4 font-sub animate-fade-in">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Tracking Reference</span>
                  <span className="font-mono text-xs font-bold text-amber-300">{searchedClaim.transactionId}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                  IN BATCH QUEUE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px]">REWARD</span>
                  <span className="text-white font-bold">{searchedClaim.bundle.name}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">FREE FIRE UID</span>
                  <span className="text-amber-400 font-mono font-bold">{searchedClaim.uid}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">PLAYER NICKNAME</span>
                  <span className="text-zinc-200">{searchedClaim.nickname}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">SERVER REGION</span>
                  <span className="text-zinc-200">{searchedClaim.region}</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 1. Anti-Bot Security Handshake
                  </span>
                  <span className="text-[10px] font-mono">COMPLETE</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2. UID Profile Binding
                  </span>
                  <span className="text-[10px] font-mono">MATCHED</span>
                </div>
                <div className="flex items-center justify-between text-xs text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> 3. Mailbox Dispatch Processing
                  </span>
                  <span className="text-[10px] font-mono">EST. 2-24H</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/30 text-[11px] text-blue-200 flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Items are transmitted directly via Free Fire In-Game System Mail. Once received, open your mailbox in the top-right corner to claim into your Vault.
                </span>
              </div>
            </div>
          ) : notFound ? (
            <div className="text-center py-6 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 space-y-2">
              <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-xs font-gaming font-bold text-white">No active claim record found</p>
              <p className="text-[11px] text-zinc-400">
                Please ensure you entered the exact numeric UID or Claim Reference ID.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
