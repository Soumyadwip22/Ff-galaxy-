import React from 'react';
import { Bundle } from '../types';

interface BundleArtworkProps {
  bundle: Bundle;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const BundleArtwork: React.FC<BundleArtworkProps> = ({
  bundle,
  className = '',
  size = 'md',
}) => {
  const { id, themeColor, accentColor, avatarStyle } = bundle;

  const sizeClasses = {
    sm: 'w-24 h-28',
    md: 'w-full h-56 sm:h-64',
    lg: 'w-full h-72 sm:h-80',
    hero: 'w-72 h-80 sm:w-96 sm:h-96',
  }[size];

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl select-none ${sizeClasses} ${className}`}>
      {/* Dynamic Background Halo */}
      <div
        className="absolute inset-0 opacity-25 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at center, ${themeColor} 0%, ${accentColor} 40%, transparent 70%)`,
        }}
      />

      {/* Cyber Grid Lines in background */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`cyber-grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={themeColor} strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#cyber-grid-${id})`} />
      </svg>

      {/* Specific Graphic Character Render */}
      <svg
        viewBox="0 0 240 260"
        className="relative z-10 w-full h-full max-h-[92%] drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)] filter transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <linearGradient id={`grad-suit-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={avatarStyle.primaryColor} />
            <stop offset="50%" stopColor={avatarStyle.secondaryColor} />
            <stop offset="100%" stopColor="#0f0f14" />
          </linearGradient>

          <linearGradient id={`grad-glow-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={themeColor} stopOpacity="0.1" />
          </linearGradient>

          <filter id={`neon-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Aura Background Wings / Energy Effect */}
        <g opacity="0.85">
          {id.includes('criminal') && (
            <path
              d="M30 180 Q120 40 210 180 Q120 120 30 180 Z"
              fill={`url(#grad-glow-${id})`}
              filter={`url(#neon-glow-${id})`}
            />
          )}

          {id === 'cobra-rage' && (
            <g filter={`url(#neon-glow-${id})`}>
              {/* Cobra Hood */}
              <path d="M40 90 Q120 20 200 90 Q215 150 180 200 Q120 180 60 200 Q25 150 40 90 Z" fill="#991b1b" opacity="0.6" />
              <path d="M70 100 Q120 40 170 100 Q180 140 150 170 Q120 160 90 170 Q60 140 70 100 Z" fill="#dc2626" opacity="0.7" />
              <circle cx="95" cy="85" r="4" fill="#fbbf24" />
              <circle cx="145" cy="85" r="4" fill="#fbbf24" />
            </g>
          )}

          {id === 'sakura' && (
            <g>
              <circle cx="45" cy="70" r="14" fill="#f43f5e" opacity="0.4" filter={`url(#neon-glow-${id})`} />
              <circle cx="195" cy="60" r="18" fill="#f43f5e" opacity="0.4" filter={`url(#neon-glow-${id})`} />
              <path d="M35 140 Q45 120 60 135 Q50 155 35 140 Z" fill="#fb7185" opacity="0.7" />
              <path d="M190 130 Q205 115 215 130 Q205 150 190 130 Z" fill="#fb7185" opacity="0.7" />
              <path d="M110 30 Q120 15 130 30 Q120 45 110 30 Z" fill="#fb7185" opacity="0.8" />
            </g>
          )}

          {id === 'pumpkin-flames' && (
            <g filter={`url(#neon-glow-${id})`}>
              <path d="M50 160 Q80 80 120 100 Q160 80 190 160 Q120 130 50 160 Z" fill="#ea580c" opacity="0.6" />
              <polygon points="120,40 105,75 135,75" fill="#fb923c" />
            </g>
          )}

          {id === 'bunny-bundle' && (
            <g filter={`url(#neon-glow-${id})`}>
              {/* Bunny Ears */}
              <path d="M75 100 C60 10 90 0 100 80 Z" fill="#ca8a04" stroke="#facc15" strokeWidth="3" />
              <path d="M82 90 C72 25 90 20 95 80 Z" fill="#fef08a" opacity="0.8" />
              <path d="M165 100 C180 10 150 0 140 80 Z" fill="#ca8a04" stroke="#facc15" strokeWidth="3" />
              <path d="M158 90 C168 25 150 20 145 80 Z" fill="#fef08a" opacity="0.8" />
            </g>
          )}

          {id === 'hayato-longsword' && (
            <g>
              {/* Crossed Katanas */}
              <line x1="20" y1="50" x2="220" y2="210" stroke="#60a5fa" strokeWidth="4" filter={`url(#neon-glow-${id})`} />
              <line x1="220" y1="50" x2="20" y2="210" stroke="#60a5fa" strokeWidth="4" filter={`url(#neon-glow-${id})`} />
            </g>
          )}
        </g>

        {/* Torso / Tactical Armor Body */}
        <g>
          <path
            d="M65 170 L80 140 L160 140 L175 170 L195 240 L45 240 Z"
            fill={`url(#grad-suit-${id})`}
            stroke={themeColor}
            strokeWidth="2"
          />

          {/* Chest Rig / Armor Plates */}
          <path d="M88 155 L152 155 L144 195 L96 195 Z" fill="#18181b" stroke={accentColor} strokeWidth="1.5" />
          <line x1="120" y1="155" x2="120" y2="195" stroke={accentColor} strokeWidth="1.5" />

          {/* Tactical Collar */}
          <path d="M85 140 L120 160 L155 140 L140 125 L100 125 Z" fill="#27272a" stroke={themeColor} strokeWidth="1.5" />
        </g>

        {/* Head / Mask Architecture */}
        <g>
          {/* Criminal Series Iconic Clown Mask */}
          {id.includes('criminal') || id === 'golden-clown' ? (
            <g>
              {/* Hoodie Back */}
              <path d="M70 120 C60 50 180 50 170 120 C175 145 65 145 70 120 Z" fill={avatarStyle.primaryColor} />
              <path d="M78 120 C70 65 170 65 162 120 Z" fill="#09090b" />

              {/* White/Color Clown Face Base */}
              <ellipse cx="120" cy="105" rx="36" ry="42" fill="#f8fafc" stroke="#1e293b" strokeWidth="2" />

              {/* Menacing Clown Eyes with Sharp Diamonds */}
              <path d="M96 90 L106 100 L96 110 L86 100 Z" fill={themeColor} filter={`url(#neon-glow-${id})`} />
              <circle cx="96" cy="100" r="3" fill="#ffffff" />

              <path d="M144 90 L154 100 L144 110 L134 100 Z" fill={themeColor} filter={`url(#neon-glow-${id})`} />
              <circle cx="144" cy="100" r="3" fill="#ffffff" />

              {/* Clown Nose */}
              <circle cx="120" cy="112" r="7" fill={themeColor} filter={`url(#neon-glow-${id})`} />

              {/* Iconic Wicked Clown Grin */}
              <path
                d="M95 125 Q120 150 145 125 Q120 135 95 125 Z"
                fill={themeColor}
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              {/* Teeth */}
              <line x1="108" y1="128" x2="108" y2="135" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="120" y1="129" x2="120" y2="138" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="132" y1="128" x2="132" y2="135" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          ) : id === 'hip-hop' ? (
            /* Hip Hop Retro Cap + Pink Bandana */
            <g>
              {/* Backward Cap */}
              <path d="M80 80 C80 50 160 50 160 80 L180 85 L160 92 L80 92 Z" fill="#ec4899" stroke="#f43f5e" strokeWidth="2" />
              <circle cx="120" cy="55" r="4" fill="#38bdf8" />
              <rect x="95" y="70" width="50" height="14" rx="2" fill="#18181b" />
              <text x="120" y="80" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                S2 OG
              </text>

              {/* Head Base */}
              <ellipse cx="120" cy="98" rx="34" ry="32" fill="#e2e8f0" />
              {/* Cool Sunglasses */}
              <path d="M92 90 L114 90 L110 102 L96 102 Z" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
              <path d="M126 90 L148 90 L144 102 L130 102 Z" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="114" y1="94" x2="126" y2="94" stroke="#38bdf8" strokeWidth="2" />

              {/* Pink Skull Bandana Mask */}
              <path d="M86 106 L154 106 L120 148 Z" fill="#db2777" stroke="#ec4899" strokeWidth="2" />
              <circle cx="112" cy="118" r="4" fill="#09090b" />
              <circle cx="128" cy="118" r="4" fill="#09090b" />
              <path d="M110 130 Q120 138 130 130" stroke="#09090b" strokeWidth="2" fill="none" />
            </g>
          ) : id === 'sakura' ? (
            /* Sakura Kitsune Mask */
            <g>
              {/* Kitsune Mask Outline */}
              <path
                d="M75 110 C65 60 100 45 120 50 C140 45 175 60 165 110 C160 145 135 150 120 150 C105 150 80 145 75 110 Z"
                fill="#fff1f2"
                stroke="#f43f5e"
                strokeWidth="2.5"
              />
              {/* Kitsune Pointed Fox Ears */}
              <polygon points="80,70 70,30 100,55" fill="#f43f5e" />
              <polygon points="82,65 76,38 96,55" fill="#fbcfe8" />
              <polygon points="160,70 170,30 140,55" fill="#f43f5e" />
              <polygon points="158,65 164,38 144,55" fill="#fbcfe8" />

              {/* Red Eye Markings */}
              <path d="M88 95 Q105 85 114 98 Q102 108 88 95 Z" fill="#e11d48" filter={`url(#neon-glow-${id})`} />
              <path d="M152 95 Q135 85 126 98 Q138 108 152 95 Z" fill="#e11d48" filter={`url(#neon-glow-${id})`} />

              {/* Whisker Paint */}
              <line x1="82" y1="120" x2="104" y2="122" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="84" y1="130" x2="102" y2="134" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="158" y1="120" x2="136" y2="122" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="156" y1="130" x2="138" y2="134" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />

              {/* Black Snout & Smile */}
              <circle cx="120" cy="126" r="3.5" fill="#0f172a" />
              <path d="M112 136 Q120 142 128 136" stroke="#e11d48" strokeWidth="2.5" fill="none" />
            </g>
          ) : id === 'cobra-rage' ? (
            /* Cobra Rage Dynamic Visor Helmet */
            <g>
              <path d="M72 110 C70 50 170 50 168 110 L160 145 L80 145 Z" fill="#18181b" stroke="#ef4444" strokeWidth="2.5" />
              {/* Glowing Cobra Eye Visor */}
              <polygon points="84,95 120,112 156,95 144,82 120,92 96,82" fill="#ef4444" filter={`url(#neon-glow-${id})`} />
              <polygon points="90,95 120,108 150,95 142,86 120,94 98,86" fill="#fef08a" />
              {/* Fang Accents */}
              <polygon points="100,125 106,142 112,125" fill="#ffffff" />
              <polygon points="128,125 134,142 140,125" fill="#ffffff" />
            </g>
          ) : id === 'pumpkin-flames' ? (
            /* Fiery Jack-o-Lantern */
            <g>
              <circle cx="120" cy="100" r="38" fill="#ea580c" stroke="#7c2d12" strokeWidth="3" />
              {/* Segments */}
              <path d="M120 62 C100 75 100 125 120 138 C140 125 140 75 120 62 Z" fill="#f97316" />
              {/* Pumpkin Stem */}
              <rect x="114" y="50" width="12" height="15" rx="3" fill="#15803d" />
              {/* Glowing Eyes */}
              <polygon points="95,95 108,82 112,100" fill="#fef08a" filter={`url(#neon-glow-${id})`} />
              <polygon points="145,95 132,82 128,100" fill="#fef08a" filter={`url(#neon-glow-${id})`} />
              {/* Jagged Mouth */}
              <path
                d="M92 115 L100 125 L108 115 L116 125 L124 115 L132 125 L140 115 L148 125 L140 130 L120 134 L100 130 Z"
                fill="#fde047"
                filter={`url(#neon-glow-${id})`}
              />
            </g>
          ) : id === 'hayato-longsword' ? (
            /* Hayato Bushido Topknot + Face Scars */
            <g>
              {/* Topknot Hair */}
              <ellipse cx="120" cy="56" rx="14" ry="10" fill="#0f172a" />
              <rect x="116" y="52" width="8" height="6" fill="#3b82f6" />
              <path d="M80 80 C80 50 160 50 160 80 L155 135 L85 135 Z" fill="#0f172a" />
              {/* Face */}
              <polygon points="90,85 150,85 140,132 100,132" fill="#f8fafc" />
              {/* Fierce Eyes */}
              <polygon points="98,96 114,94 110,102 98,100" fill="#1e293b" />
              <circle cx="106" cy="98" r="2" fill="#3b82f6" />
              <polygon points="142,96 126,94 130,102 142,100" fill="#1e293b" />
              <circle cx="134" cy="98" r="2" fill="#3b82f6" />
              {/* Legendary Bushido Face Scar */}
              <line x1="102" y1="90" x2="114" y2="120" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
            </g>
          ) : (
            /* Cyber Tactical Visor General */
            <g>
              <ellipse cx="120" cy="100" rx="36" ry="38" fill="#18181b" stroke={themeColor} strokeWidth="2" />
              <rect x="86" y="90" width="68" height="18" rx="4" fill={themeColor} filter={`url(#neon-glow-${id})`} opacity="0.9" />
              <line x1="90" y1="99" x2="150" y2="99" stroke="#ffffff" strokeWidth="2" />
              <path d="M102 120 L138 120 L130 132 L110 132 Z" fill="#27272a" stroke={accentColor} strokeWidth="1.5" />
            </g>
          )}
        </g>

        {/* Embellished Corner Badges */}
        <g>
          <polygon points="12,12 36,12 12,36" fill={themeColor} opacity="0.8" />
          <polygon points="228,12 204,12 228,36" fill={themeColor} opacity="0.8" />
        </g>
      </svg>

      {/* Rarity Watermark */}
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-gaming font-bold tracking-wider bg-black/70 border border-white/10 text-zinc-300">
        {bundle.seasonReleased}
      </div>

      {/* Remaining Stock Badge */}
      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-sub font-semibold tracking-wide bg-black/80 border border-red-500/30 text-red-400 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        Only {bundle.remainingQuota} Left
      </div>
    </div>
  );
};
