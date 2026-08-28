import React, { useState, useMemo } from 'react';
import { RARE_BUNDLES } from './data/bundles';
import { Bundle, BundleCategory, ClaimSubmission } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { LiveActivityTicker } from './components/LiveActivityTicker';
import { BundleGrid } from './components/BundleGrid';
import { ClaimModal } from './components/ClaimModal';
import { BundleDetailModal } from './components/BundleDetailModal';
import { LuckySpinWheel } from './components/LuckySpinWheel';
import { StatusTrackerModal } from './components/StatusTrackerModal';
import { ParticleBackground } from './components/ParticleBackground';
import { Footer } from './components/Footer';

export default function App() {
  const [allBundles, setAllBundles] = useState<Bundle[]>(RARE_BUNDLES);
  const [activeCategory, setActiveCategory] = useState<BundleCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [claimBundle, setClaimBundle] = useState<Bundle | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  const [inspectBundle, setInspectBundle] = useState<Bundle | null>(null);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);

  const [isLuckySpinOpen, setIsLuckySpinOpen] = useState(false);
  const [isStatusTrackerOpen, setIsStatusTrackerOpen] = useState(false);

  // User Claims history & counter
  const [recentClaims, setRecentClaims] = useState<ClaimSubmission[]>([]);
  const [totalClaimedCount, setTotalClaimedCount] = useState(1482);

  // Filtered bundles
  const filteredBundles = useMemo(() => {
    return allBundles.filter((bundle) => {
      const matchesCategory =
        activeCategory === 'ALL' || bundle.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        bundle.name.toLowerCase().includes(q) ||
        bundle.subtitle.toLowerCase().includes(q) ||
        bundle.badgeText.toLowerCase().includes(q) ||
        bundle.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allBundles, activeCategory, searchQuery]);

  // Handlers
  const handleOpenClaim = (bundle: Bundle) => {
    setClaimBundle(bundle);
    setIsClaimModalOpen(true);
  };

  const handleOpenInspect = (bundle: Bundle) => {
    setInspectBundle(bundle);
    setIsInspectModalOpen(true);
  };

  const handleShuffle = () => {
    setAllBundles((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setSearchQuery('');
  };

  const handleClaimSuccess = (claim: ClaimSubmission) => {
    setRecentClaims((prev) => [claim, ...prev]);
    setTotalClaimedCount((prev) => prev + 1);

    // Decrement remaining quota for bundle
    setAllBundles((prev) =>
      prev.map((b) =>
        b.id === claim.bundle.id
          ? { ...b, remainingQuota: Math.max(0, b.remainingQuota - 1), totalClaimed: b.totalClaimed + 1 }
          : b
      )
    );
  };

  const scrollToBundles = () => {
    const grid = document.getElementById('bundles-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* Animated Fire Ember Background */}
      <ParticleBackground />

      {/* Cyber Grid Lines Overlay */}
      <div className="fixed inset-0 bg-hex-grid pointer-events-none z-0 opacity-40" />

      {/* Top Navbar */}
      <Navbar
        onOpenLuckySpin={() => setIsLuckySpinOpen(true)}
        onOpenStatusTracker={() => setIsStatusTrackerOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        totalClaimedCount={totalClaimedCount}
      />

      {/* Live Claims Activity Ticker */}
      <LiveActivityTicker />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <HeroBanner
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onScrollToBundles={scrollToBundles}
          totalBundlesCount={allBundles.length}
        />

        <BundleGrid
          bundles={filteredBundles}
          activeCategory={activeCategory}
          searchQuery={searchQuery}
          onClaimBundle={handleOpenClaim}
          onInspectBundle={handleOpenInspect}
          onShuffle={handleShuffle}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Modals */}
      <ClaimModal
        bundle={claimBundle}
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        onClaimSuccess={handleClaimSuccess}
      />

      <BundleDetailModal
        bundle={inspectBundle}
        isOpen={isInspectModalOpen}
        onClose={() => setIsInspectModalOpen(false)}
        onClaim={handleOpenClaim}
      />

      <LuckySpinWheel
        isOpen={isLuckySpinOpen}
        onClose={() => setIsLuckySpinOpen(false)}
      />

      <StatusTrackerModal
        isOpen={isStatusTrackerOpen}
        onClose={() => setIsStatusTrackerOpen(false)}
        recentClaims={recentClaims}
      />

      {/* Footer with Mandated Disclaimer */}
      <Footer />
    </div>
  );
}
