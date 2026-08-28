import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Flame,
  Zap,
  Globe,
  UserCheck,
  KeyRound,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Bundle, ClaimStep, ServerRegion, ClaimSubmission } from '../types';
import { SERVER_REGIONS } from '../data/bundles';
import { BundleArtwork } from './BundleArtwork';
import { sound } from '../utils/audio';

interface ClaimModalProps {
  bundle: Bundle | null;
  isOpen: boolean;
  onClose: () => void;
  onClaimSuccess: (claim: ClaimSubmission) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  bundle,
  isOpen,
  onClose,
  onClaimSuccess,
}) => {
  if (!isOpen || !bundle) return null;

  const [step, setStep] = useState<ClaimStep>('BOT_VERIFICATION');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{ email: string; name: string } | null>(null);

  // UID Form state
  const [uid, setUid] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<ServerRegion>(SERVER_REGIONS[0]);
  const [uidError, setUidError] = useState('');
  const [isValidatingUid, setIsValidatingUid] = useState(false);
  const [playerProfile, setPlayerProfile] = useState<{ nickname: string; level: number; rank: string } | null>(null);

  // Final Claim state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimReceipt, setClaimReceipt] = useState<ClaimSubmission | null>(null);
  const [hasCopiedId, setHasCopiedId] = useState(false);

  // Step 1: Automated Anti-bot verification simulator
  useEffect(() => {
    if (step === 'BOT_VERIFICATION') {
      sound.playScan();
      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('AUTH_CHOICE');
            }, 400);
            return 100;
          }
          return prev + 25;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [step]);

  // Handle Provider OAuth Selection
  const handleSelectAuthProvider = (providerName: string) => {
    sound.playClick();
    setSelectedProvider(providerName);
    setIsAuthenticating(true);

    // Simulate legitimate OAuth redirect/handshake delay
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthenticatedUser({
        name: `Player_${Math.floor(1000 + Math.random() * 9000)}`,
        email: `player.${providerName.toLowerCase()}@auth-verified.net`,
      });
      sound.playSuccess();
      setStep('UID_INPUT');
    }, 1600);
  };

  // Validate Free Fire UID
  const handleValidateUid = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    setUidError('');

    const cleanUid = uid.trim();
    if (!cleanUid) {
      setUidError('Please enter your Free Fire UID.');
      return;
    }

    if (!/^\d{8,12}$/.test(cleanUid)) {
      setUidError('Invalid UID format. Free Fire UID must be 8 to 12 digits (numbers only).');
      return;
    }

    setIsValidatingUid(true);
    sound.playScan();

    // Simulate backend player profile lookup via UID ping
    setTimeout(() => {
      setIsValidatingUid(false);
      const generatedNicknames = [
        'Viper_Strike',
        'Demon_Hunter',
        'Phantom_FF',
        'Cyber_King',
        'Shadow_Ninja',
        'Apex_Sniper',
        'Vortex_77',
      ];
      const randomNick = generatedNicknames[Math.floor(Math.random() * generatedNicknames.length)];
      const randomLevel = Math.floor(45 + Math.random() * 35); // Lv 45 - 80

      setPlayerProfile({
        nickname: `${randomNick}_${cleanUid.slice(-3)}`,
        level: randomLevel,
        rank: 'Heroic IV',
      });
      sound.playSuccess();
      setStep('CONFIRM_CLAIM');
    }, 1200);
  };

  // Step 5: Final Submission and Delivery Dispatch
  const handleFinalClaim = () => {
    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const txId = `FF-CLAIM-${Math.floor(100000 + Math.random() * 900000)}-${bundle.id.toUpperCase().slice(0, 4)}`;

      const newSubmission: ClaimSubmission = {
        transactionId: txId,
        bundle,
        uid,
        nickname: playerProfile?.nickname || 'FreeFire_Hero',
        level: playerProfile?.level || 62,
        region: selectedRegion.name,
        authProvider: selectedProvider || 'Google Auth',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'PENDING_MAIL_DISPATCH',
        estimatedHours: '2 - 24 Hours',
      };

      setClaimReceipt(newSubmission);
      onClaimSuccess(newSubmission);
      sound.playSuccess();

      // Launch Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
        });
      } catch {
        // Confetti fallback
      }

      setStep('SUCCESS_PENDING');
    }, 1800);
  };

  const handleCopyTransaction = () => {
    if (!claimReceipt) return;
    navigator.clipboard.writeText(claimReceipt.transactionId);
    setHasCopiedId(true);
    sound.playClick();
    setTimeout(() => setHasCopiedId(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-xl bg-gradient-to-b from-[#181824] via-[#101018] to-[#0a0a0f] border border-red-500/40 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.3)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-800/80 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h2 className="font-gaming font-bold text-sm sm:text-base text-white tracking-wide uppercase">
              {step === 'SUCCESS_PENDING' ? 'CLAIM REQUEST REGISTERED' : 'CLAIM BUNDLE VERIFICATION'}
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

        {/* Step Progression Visual Dots */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-zinc-800/40 flex items-center justify-between text-[11px] font-sub">
          <div className={`flex items-center gap-1.5 ${step === 'BOT_VERIFICATION' ? 'text-amber-400 font-bold' : 'text-emerald-400'}`}>
            <span>1. Anti-Bot</span>
            {step !== 'BOT_VERIFICATION' && <CheckCircle2 className="w-3 h-3" />}
          </div>
          <span className="text-zinc-600">→</span>
          <div className={`flex items-center gap-1.5 ${step === 'AUTH_CHOICE' ? 'text-amber-400 font-bold' : ['UID_INPUT', 'CONFIRM_CLAIM', 'SUCCESS_PENDING'].includes(step) ? 'text-emerald-400' : 'text-zinc-500'}`}>
            <span>2. Auth Check</span>
            {['UID_INPUT', 'CONFIRM_CLAIM', 'SUCCESS_PENDING'].includes(step) && <CheckCircle2 className="w-3 h-3" />}
          </div>
          <span className="text-zinc-600">→</span>
          <div className={`flex items-center gap-1.5 ${step === 'UID_INPUT' ? 'text-amber-400 font-bold' : ['CONFIRM_CLAIM', 'SUCCESS_PENDING'].includes(step) ? 'text-emerald-400' : 'text-zinc-500'}`}>
            <span>3. UID Link</span>
            {['CONFIRM_CLAIM', 'SUCCESS_PENDING'].includes(step) && <CheckCircle2 className="w-3 h-3" />}
          </div>
          <span className="text-zinc-600">→</span>
          <div className={`flex items-center gap-1.5 ${step === 'SUCCESS_PENDING' ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
            <span>4. In-Game Mail</span>
          </div>
        </div>

        {/* Modal Body with Step Transitions */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {/* STEP 1: BOT VERIFICATION / SECURITY SCAN */}
          {step === 'BOT_VERIFICATION' && (
            <div className="text-center py-6 space-y-4">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-500 flex items-center justify-center glow-red">
                  <ShieldCheck className="w-8 h-8 text-amber-400 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-gaming font-bold text-white">
                  Verifying Giveaway Quota & Anti-Bot
                </h3>
                <p className="text-xs text-zinc-400 font-sub mt-1">
                  Establishing encrypted session for <strong className="text-white">{bundle.name}</strong>...
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto space-y-1">
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${verificationProgress}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono text-zinc-400">{verificationProgress}% Secure Handshake Complete</p>
              </div>
            </div>
          )}

          {/* STEP 2: LEGITIMATE AUTHORIZED AUTHENTICATION */}
          {step === 'AUTH_CHOICE' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-base sm:text-lg font-gaming font-bold text-white">
                  Account Ownership Verification
                </h3>
                <p className="text-xs text-zinc-300 font-sub">
                  Select your linked account provider to authenticate your giveaway eligibility.
                </p>
              </div>

              {/* Strict Security Policy Notice */}
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2.5">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <div className="space-y-1">
                  <p className="font-bold">Legitimate Authentication Guarantee:</p>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                    This platform uses standard authorized single-sign-on (SSO). We <strong>never ask for, view, or store</strong> your Garena password, OTP, or secret recovery credentials.
                  </p>
                </div>
              </div>

              {/* Provider Options */}
              {isAuthenticating ? (
                <div className="text-center py-8 space-y-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                  <p className="text-xs font-gaming font-bold text-white">
                    Connecting to {selectedProvider} Secure OAuth...
                  </p>
                  <p className="text-[11px] text-zinc-400">Verifying session token without password disclosure...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleSelectAuthProvider('Google')}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 hover:border-zinc-500 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-red-400">
                        G
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-400">Google Account</p>
                        <p className="text-[10px] text-zinc-400">Linked Free Fire ID</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => handleSelectAuthProvider('Facebook')}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 hover:border-zinc-500 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center font-bold text-blue-400">
                        f
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-400">Facebook Login</p>
                        <p className="text-[10px] text-zinc-400">Linked Free Fire ID</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => handleSelectAuthProvider('Twitter (X)')}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 hover:border-zinc-500 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-zinc-200">
                        𝕏
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-400">Twitter / X</p>
                        <p className="text-[10px] text-zinc-400">Linked Free Fire ID</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => handleSelectAuthProvider('Apple ID')}
                    className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/70 hover:border-zinc-500 flex items-center justify-between text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-zinc-200">
                        
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-400">Apple ID</p>
                        <p className="text-[10px] text-zinc-400">iOS Free Fire ID</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                  </button>
                </div>
              )}

              {/* Official External Link for transparency */}
              <div className="pt-2 text-center">
                <a
                  href="https://account.garena.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-amber-400 transition-colors"
                >
                  <span>Open Official Garena Portal in separate tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* STEP 3: FREE FIRE UID INPUT & SERVER REGION */}
          {step === 'UID_INPUT' && (
            <form onSubmit={handleValidateUid} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-emerald-500/30">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-gaming font-bold text-white">Auth Token Verified</p>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    Provider: {selectedProvider} • Status: Handshake OK
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-gaming font-bold text-zinc-200 mb-1.5">
                  ENTER YOUR FREE FIRE UID (USER ID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={12}
                    placeholder="e.g. 1029384756"
                    value={uid}
                    onChange={(e) => {
                      setUid(e.target.value.replace(/\D/g, ''));
                      setUidError('');
                    }}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 rounded-xl text-white font-mono text-base tracking-widest placeholder-zinc-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                  <div className="absolute right-3 top-3 text-[11px] font-mono text-zinc-500">
                    {uid.length}/12 Digits
                  </div>
                </div>
                {uidError && <p className="text-xs text-red-400 font-sub mt-1 flex items-center gap-1">⚠️ {uidError}</p>}
                <p className="text-[10px] text-zinc-400 mt-1">
                  How to find UID: Open Free Fire &gt; Tap your avatar in the top-left &gt; Copy the numeric UID.
                </p>
              </div>

              {/* Server Region Selector */}
              <div>
                <label className="block text-xs font-gaming font-bold text-zinc-200 mb-1.5">
                  SELECT YOUR SERVER REGION *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SERVER_REGIONS.map((region) => (
                    <button
                      type="button"
                      key={region.code}
                      onClick={() => {
                        sound.playClick();
                        setSelectedRegion(region);
                      }}
                      className={`p-2 rounded-lg border text-left flex items-center gap-2 text-xs transition-all ${
                        selectedRegion.code === region.code
                          ? 'bg-amber-600/20 border-amber-500 text-amber-300 font-bold'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-base">{region.flag}</span>
                      <div className="truncate">
                        <p className="truncate">{region.name}</p>
                        <p className="text-[9px] text-zinc-500">{region.ping}ms</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isValidatingUid}
                className="cyber-btn cyber-cut w-full py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-gaming font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isValidatingUid ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Pinging {selectedRegion.name} Server...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>VALIDATE UID & CONTINUE</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 4: CONFIRM CLAIM & SELECTED BUNDLE DETAILS */}
          {step === 'CONFIRM_CLAIM' && playerProfile && (
            <div className="space-y-4">
              {/* Profile Verification Badge */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-500/40 flex items-center justify-center font-gaming text-amber-400 font-bold">
                    FF
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-gaming font-bold text-white">{playerProfile.nickname}</p>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {playerProfile.rank}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-mono">
                      UID: {uid} • Lv. {playerProfile.level} • {selectedRegion.name}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-sub font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                    VERIFIED
                  </span>
                </div>
              </div>

              {/* Selected Bundle Summary Card */}
              <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center gap-3">
                <div className="w-16 h-16 shrink-0 rounded-lg bg-black/80 border border-red-500/30 flex items-center justify-center overflow-hidden">
                  <BundleArtwork bundle={bundle} size="sm" />
                </div>
                <div className="flex-1">
                  <span className="px-2 py-0.2 rounded text-[9px] font-gaming font-bold bg-red-600/30 text-red-400 border border-red-500/40">
                    {bundle.badgeText}
                  </span>
                  <h4 className="font-gaming font-bold text-sm text-white mt-0.5">{bundle.name}</h4>
                  <p className="text-[11px] text-zinc-400">{bundle.itemsIncluded.length} Items included in vault delivery</p>
                </div>
              </div>

              {/* Quota Hold Warning */}
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Giveaway quota is reserved for your UID for the next 04:59 minutes.</span>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setStep('UID_INPUT');
                  }}
                  className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-sub font-semibold text-xs border border-zinc-700"
                >
                  Back
                </button>

                <button
                  onClick={handleFinalClaim}
                  disabled={isSubmitting}
                  className="cyber-btn cyber-cut flex-1 py-3 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-black font-gaming font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching to Vault...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-black" />
                      <span>CONFIRM CLAIM & DISPATCH</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CLAIM SUCCESS & PENDING VERIFICATION STATUS */}
          {step === 'SUCCESS_PENDING' && claimReceipt && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto glow-green">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-gaming font-extrabold text-white">
                  CLAIM REQUEST SUBMITTED!
                </h3>
                <p className="text-xs text-zinc-300 font-sub">
                  Your bundle allocation is successfully queued for in-game system mail delivery.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 font-sub">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Claim Tracking ID:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-amber-300">{claimReceipt.transactionId}</span>
                    <button
                      onClick={handleCopyTransaction}
                      className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      title="Copy ID"
                    >
                      {hasCopiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">REWARD BUNDLE</span>
                    <span className="text-white font-bold">{claimReceipt.bundle.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">FREE FIRE UID</span>
                    <span className="text-amber-400 font-mono font-bold">{claimReceipt.uid}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">PLAYER NICKNAME</span>
                    <span className="text-zinc-200">{claimReceipt.nickname}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">SERVER REGION</span>
                    <span className="text-zinc-200">{claimReceipt.region}</span>
                  </div>
                </div>

                {/* Dispatch Status Timeline */}
                <div className="pt-2 border-t border-zinc-800 space-y-2">
                  <span className="text-[10px] font-gaming font-bold text-zinc-400 uppercase tracking-wider">
                    DELIVERY STATUS PIPELINE
                  </span>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 1. Anti-Bot Security Clearance
                      </span>
                      <span className="font-mono text-[10px]">APPROVED</span>
                    </div>

                    <div className="flex items-center justify-between text-emerald-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 2. Community Quota Lock
                      </span>
                      <span className="font-mono text-[10px]">RESERVED</span>
                    </div>

                    <div className="flex items-center justify-between text-amber-400">
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> 3. In-Game Mailbox Dispatch
                      </span>
                      <span className="font-mono text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded">
                        PROCESSING
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions on how to receive */}
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-blue-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>How to retrieve your bundle in Free Fire:</span>
                </div>
                <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-blue-200/90 pl-1">
                  <li>Launch the official <strong>Free Fire</strong> app on your device.</li>
                  <li>Tap the <strong>Mail / Envelope icon</strong> in the top-right corner of the lobby.</li>
                  <li>Open the <strong>System Gift</strong> message and tap <strong>"Claim All"</strong>.</li>
                  <li>Items will automatically be equipped or stored in your <strong>Vault</strong>.</li>
                </ol>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-gaming font-bold text-xs tracking-wider rounded-xl transition-all"
              >
                RETURN TO GIVEAWAY VAULT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
