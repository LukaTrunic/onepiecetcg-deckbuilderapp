export type CardType = 'Character' | 'Event' | 'Stage' | 'Leader'

export interface Card {
  card_set_id: string
  card_name: string
  card_cost: string
  card_power: string
  card_color: string
  card_type: CardType
  card_text?: string
  rarity: string
  set_name: string
  set_id: string
  counter_amount?: number
  attribute?: string
  sub_types?: string
  imageUrl?: string // API might not provide this, so fallback if needed
}
