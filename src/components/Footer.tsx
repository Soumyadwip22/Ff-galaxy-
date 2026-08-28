import React, { useState } from 'react';
import { ShieldCheck, Flame, HelpCircle, ChevronDown, ChevronUp, Lock, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    sound.playClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How are rare bundles delivered to my Free Fire account?',
      a: 'Once your UID and authorization are verified against daily community giveaway allocations, the bundle package is queued for automatic transmission directly to your in-game mailbox (top-right envelope in Free Fire lobby).',
    },
    {
      q: 'Is this platform safe? Do you ever ask for my game password?',
      a: '100% Safe. We NEVER ask for, record, or store passwords, OTPs, or two-factor recovery keys. Authentications use official OAuth protocols, and deliveries strictly rely on your public numeric UID.',
    },
    {
      q: 'How long does in-game mail dispatch take?',
      a: 'Batch processing runs continuously. Depending on server region load, claims are delivered within 2 to 24 hours. You can track your status anytime with your Claim ID.',
    },
    {
      q: 'Is there a limit on how many bundles I can claim?',
      a: 'To ensure fair distribution for all players, each unique Free Fire UID is permitted to claim one rare bundle per giveaway cycle.',
    },
  ];

  return (
    <footer className="mt-16 bg-[#060608] border-t border-zinc-800/80 text-zinc-400 font-sub">
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-gaming font-bold text-amber-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GIVEAWAY FAQ & TRANSPARENCY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-gaming font-extrabold text-white">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-gaming font-bold text-sm text-zinc-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-zinc-400 font-medium leading-relaxed border-t border-zinc-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety & Anti-Scam Shield Banner */}
      <div className="bg-zinc-950 border-y border-zinc-800/80 py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-gaming font-bold text-white mb-0.5">Zero Account Risk</h5>
              <p className="text-[11px] text-zinc-400">
                No passwords, PINs, or recovery codes are ever collected. Safe for all players.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-gaming font-bold text-white mb-0.5">Encrypted Handshake</h5>
              <p className="text-[11px] text-zinc-400">
                All UID submission payloads are validated through secure SSL endpoints.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-950 border border-red-500/30 text-red-400 shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h5 className="font-gaming font-bold text-white mb-0.5">Fair Allocation</h5>
              <p className="text-[11px] text-zinc-400">
                Anti-bot verification ensures genuine community players receive limited bundle allocations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4 text-center">
        {/* Exact user-mandated disclaimer highlighted */}
        <div className="max-w-3xl mx-auto p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-zinc-300 text-xs sm:text-sm font-sub leading-relaxed">
          <p className="font-bold text-amber-400 uppercase tracking-wider mb-1">Official Platform Disclaimer</p>
          <p className="text-zinc-300">
            “This website is an independent giveaway platform and is not affiliated with or endorsed by Garena or Free Fire unless explicitly stated.”
          </p>
          <p className="text-[11px] text-zinc-500 mt-2">
            Free Fire is a registered trademark of Garena International. All game titles, character names, and trade references belong to their respective copyright holders. Rewards are subject to daily promotional quotas and backend verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 pt-2">
          <span>© 2026 Community Bundle Vault</span>
          <span>•</span>
          <span>Terms of Giveaway</span>
          <span>•</span>
          <span>Privacy & Anti-Phishing Policy</span>
          <span>•</span>
          <span>UID Dispatch Status</span>
        </div>
      </div>
    </footer>
  );
};
