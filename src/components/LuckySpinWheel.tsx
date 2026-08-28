import React, { useState } from 'react';
import { X, Sparkles, Trophy, Loader2, Zap, Gift, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LUCKY_SPIN_PRIZES } from '../data/bundles';
import { LuckySpinPrize } from '../types';
import { sound } from '../utils/audio';

interface LuckySpinWheelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBundleToClaim?: () => void;
}

export const LuckySpinWheel: React.FC<LuckySpinWheelProps> = ({
  isOpen,
  onClose,
  onSelectBundleToClaim,
}) => {
  if (!isOpen) return null;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [wonPrize, setWonPrize] = useState<LuckySpinPrize | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(2);
  const [spinUid, setSpinUid] = useState('');
  const [isClaimedToUid, setIsClaimedToUid] = useState(false);

  const handleSpin = () => {
    if (isSpinning || spinsLeft <= 0) return;

    sound.playClick();
    setIsSpinning(true);
    setWonPrize(null);
    setIsClaimedToUid(false);

    // Pick random prize
    const prizeIndex = Math.floor(Math.random() * LUCKY_SPIN_PRIZES.length);
    const selectedPrize = LUCKY_SPIN_PRIZES[prizeIndex];

    // Calculate rotation angle
    const segmentAngle = 360 / LUCKY_SPIN_PRIZES.length;
    const extraRotations = 360 * 5; // 5 full spins
    const targetAngle = extraRotations + (360 - (prizeIndex * segmentAngle + segmentAngle / 2));

    setRotationDegree((prev) => prev + targetAngle);

    // Ticking audio loop
    let ticks = 0;
    const tickInterval = setInterval(() => {
      sound.playWheelTick();
      ticks++;
      if (ticks > 24) clearInterval(tickInterval);
    }, 140);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setSpinsLeft((prev) => Math.max(0, prev - 1));
      sound.playSuccess();

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }, 3800);
  };

  const handleClaimSpinPrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spinUid.trim()) return;
    sound.playSuccess();
    setIsClaimedToUid(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1c1424] via-[#120e18] to-[#0a080e] border border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
            <div>
              <h2 className="font-gaming font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">
                DAILY LUCKY VAULT ROULETTE
              </h2>
              <p className="text-[10px] text-amber-400 font-sub">Free Daily Bonus Spins Available: {spinsLeft}</p>
            </div>
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

        {/* Wheel Container */}
        <div className="p-6 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Glowing Neon Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-pulse pointer-events-none" />

            {/* Pointer / Flapper */}
            <div className="absolute -top-3 z-30 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>

            {/* Rotating SVG Wheel */}
            <div
              className="w-full h-full rounded-full transition-transform ease-out"
              style={{
                transform: `rotate(${rotationDegree}deg)`,
                transitionDuration: isSpinning ? '3.8s' : '0s',
                transitionTimingFunction: 'cubic-bezier(0.15, 0.9, 0.25, 1)',
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full rounded-full drop-shadow-xl">
                {LUCKY_SPIN_PRIZES.map((prize, idx) => {
                  const angle = 360 / LUCKY_SPIN_PRIZES.length;
                  const startAngle = idx * angle;
                  const endAngle = (idx + 1) * angle;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 100 + 98 * Math.cos(startRad);
                  const y1 = 100 + 98 * Math.sin(startRad);
                  const x2 = 100 + 98 * Math.cos(endRad);
                  const y2 = 100 + 98 * Math.sin(endRad);

                  const pathData = `M 100 100 L ${x1} ${y1} A 98 98 0 0 1 ${x2} ${y2} Z`;

                  const textRad = (((startAngle + endAngle) / 2 - 90) * Math.PI) / 180;
                  const textX = 100 + 64 * Math.cos(textRad);
                  const textY = 100 + 64 * Math.sin(textRad);

                  return (
                    <g key={prize.id}>
                      <path
                        d={pathData}
                        fill={idx % 2 === 0 ? '#181524' : '#241a32'}
                        stroke="#f59e0b"
                        strokeWidth="1.2"
                        strokeOpacity="0.5"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="#fef08a"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        dominantBaseline="central"
                        transform={`rotate(${(startAngle + endAngle) / 2}, ${textX}, ${textY})`}
                      >
                        {prize.icon} {prize.amount}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Spin Hub */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || spinsLeft <= 0}
              className="absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 via-amber-500 to-yellow-400 border-2 border-white/80 shadow-[0_0_20px_rgba(245,158,11,0.8)] flex flex-col items-center justify-center text-black font-gaming font-black text-xs hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSpinning ? (
                <Loader2 className="w-6 h-6 animate-spin text-black" />
              ) : (
                <>
                  <span>SPIN</span>
                  <span className="text-[9px] font-sub font-bold">{spinsLeft} Left</span>
                </>
              )}
            </button>
          </div>

          {/* Won Prize Display & UID Link */}
          {wonPrize && (
            <div className="w-full p-4 rounded-xl bg-zinc-950/90 border border-amber-500/50 space-y-3 animate-fade-in text-center">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-gaming font-bold text-base">
                <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
                <span>YOU WON: {wonPrize.name}!</span>
              </div>

              {!isClaimedToUid ? (
                <form onSubmit={handleClaimSpinPrize} className="space-y-2">
                  <p className="text-xs text-zinc-300 font-sub">
                    Enter your Free Fire UID to send this reward to your mailbox:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Free Fire UID"
                      value={spinUid}
                      onChange={(e) => setSpinUid(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      disabled={!spinUid.trim()}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-gaming font-bold text-xs rounded-lg uppercase transition-colors"
                    >
                      Send Gift
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Bonus dispatched to UID: {spinUid}! Check in-game mail.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
