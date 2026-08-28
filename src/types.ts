export type RarityType = 'MYTHIC' | 'LIMITED' | 'RARE' | 'LEGENDARY';

export type BundleCategory = 'ALL' | 'CRIMINAL' | 'MYTHIC' | 'LIMITED' | 'CLASSIC' | 'WARRIOR';

export interface BundleItemDetail {
  type: 'HEAD' | 'MASK' | 'TOP' | 'BOTTOM' | 'SHOES' | 'EMOTE' | 'EFFECT';
  name: string;
  rarity: string;
}

export interface Bundle {
  id: string;
  name: string;
  subtitle: string;
  category: BundleCategory;
  rarity: RarityType;
  badgeText: string;
  description: string;
  themeColor: string; // e.g. '#ef4444'
  bgGradient: string;
  accentColor: string;
  glowClass: string;
  rarityScore: number; // e.g. 99/100
  totalClaimed: number;
  remainingQuota: number;
  initialStock: number;
  seasonReleased: string;
  itemsIncluded: BundleItemDetail[];
  avatarStyle: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    iconSymbol: string;
    hoodieType: 'criminal' | 'cyber' | 'bunny' | 'rage' | 'ninja' | 'flame' | 'samurai';
  };
}

export type ClaimStep =
  | 'IDLE'
  | 'BOT_VERIFICATION'
  | 'AUTH_CHOICE'
  | 'UID_INPUT'
  | 'CONFIRM_CLAIM'
  | 'PROCESSING'
  | 'SUCCESS_PENDING';

export type AuthProviderType = 'google' | 'facebook' | 'twitter' | 'apple' | 'vk' | 'portal';

export interface ServerRegion {
  code: string;
  name: string;
  flag: string;
  ping: number;
}

export interface ClaimSubmission {
  transactionId: string;
  bundle: Bundle;
  uid: string;
  nickname: string;
  level: number;
  region: string;
  authProvider: string;
  timestamp: string;
  status: 'PENDING_MAIL_DISPATCH' | 'QUEUED_FOR_BATCH' | 'PROCESSING_VAULT_DEPOSIT';
  estimatedHours: string;
}

export interface LiveActivityItem {
  id: string;
  maskedUid: string;
  playerName: string;
  bundleName: string;
  region: string;
  timeAgo: string;
  badge: RarityType;
}

export interface LuckySpinPrize {
  id: string;
  name: string;
  icon: string;
  amount: string;
  type: 'DIAMONDS' | 'ROOM_CARD' | 'EVO_CRATE' | 'CUSTOM_CRATE' | 'BUNDLE_TOKEN';
  color: string;
  rarity: 'COMMON' | 'RARE' | 'MYTHIC';
}
