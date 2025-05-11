export interface OnePieceCard {
  gid: string // Global ID
  cid: string // Card ID
  n: string // Name
  t: string // Type ID
  col: string // Color ID(s)
  cs: string | null // Cost
  tr: string | null // Traits
  a: string // Attribute
  p: string | null // Power
  cp: string | null // Counter
  l: string | null // Life
  r: string // Rarity
  ar?: string | null // Optional artist
  iu: string // Image URL
  e: string | null // ✅ Effect text — now nullable
  al?: string | null // Optional alt art info
  intl?: string // Optional intl flag
  srcN: string // Set name
  srcD: string | null // Release date
}
