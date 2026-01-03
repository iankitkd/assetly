export const APP_NAME = "Assetly";

export const roles = [
  { id: 'USER', title: 'User', desc: 'Shop and place orders' },
  { id: 'SELLER', title: 'Seller', desc: 'Sell products & manage orders' },
]

export const PRICE_MIN = 0;
export const PRICE_MAX = 9999;

export type SortTypes = "newest" | "popular" | "price-asc" | "price-desc";

export const sortItems: Record<SortTypes, {id: SortTypes, label: string}> = {
  "newest": {id: "newest", label: "Newest"},
  "popular": {id: "popular", label: "Popular"},
  "price-asc": {id: "price-asc", label: "Price: Low → High"},
  "price-desc": {id: "price-desc", label: "Price: High → Low"},
}