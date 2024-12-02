export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export type ItemType = 'Weapon' | 'Consumable' | 'Material';

export interface SlotItem {
  id: string;
  type: ItemType;
  rarity: ItemRarity;
  name: string;
  count: number;
}

export interface RewardItem extends SlotItem {
  isSpinning: boolean;
}