import React, { useState, useEffect } from 'react';
import { INITIAL_LIVE_ACTIVITIES } from '../data/bundles';
import { LiveActivityItem } from '../types';
import { Flame, ShieldCheck, Sparkles } from 'lucide-react';

export const LiveActivityTicker: React.FC = () => {
  const [activities, setActivities] = useState<LiveActivityItem[]>(INITIAL_LIVE_ACTIVITIES);

  // Periodic random live claim addition
  useEffect(() => {
    const bundlesSample = [
      'Sakura Bundle',
      'Cobra Rage Bundle',
      'Green Criminal Bundle',
      'Hip Hop Bundle',
      'Blue Criminal Bundle',
      'Pumpkin Flames Bundle',
      'Bunny Bundle',
    ];
    const regions = ['IND', 'SG', 'BR', 'ID', 'EU', 'NA', 'MENA'];
    const prefixes = ['Ninja', 'Viper', 'Ghost', 'Ace', 'Demon', 'Frost', 'Sniper', 'Titan'];

    const interval = setInterval(() => {
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomNum = Math.floor(10 + Math.random() * 89);
      const randomUid = `${Math.floor(1000 + Math.random() * 8999)}****${Math.floor(10 + Math.random() * 89)}`;
      const randomBundle = bundlesSample[Math.floor(Math.random() * bundlesSample.length)];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];

      const newActivity: LiveActivityItem = {
        id: `act-${Date.now()}`,
        maskedUid: randomUid,
        playerName: `${randomPrefix}_${randomNum}`,
        bundleName: randomBundle,
        region: randomRegion,
        timeAgo: 'Just now',
        badge: 'MYTHIC',
      };

      setActivities((prev) => [newActivity, ...prev.slice(0, 7)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md flex items-center gap-3 overflow-hidden">
        {/* Ticker Title Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-gaming font-bold shrink-0">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">LIVE CLAIMS:</span>
          <span className="sm:hidden">LIVE:</span>
        </div>

        {/* Scrolling or Dynamic Stream of Recent Claims */}
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-none whitespace-nowrap text-xs font-sub">
          {activities.map((act) => (
            <div
              key={act.id}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 transition-all hover:border-zinc-700 shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-zinc-400">{act.maskedUid}</span>
              <span className="text-zinc-500 font-bold">•</span>
              <span className="font-bold text-white">{act.playerName}</span>
              <span className="text-zinc-400">claimed</span>
              <span className="text-amber-400 font-semibold">{act.bundleName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
                [{act.region}]
              </span>
              <span className="text-[10px] text-zinc-500">{act.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
