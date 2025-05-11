// src/api/cards.ts
import type { OnePieceCard } from '@/types/Card'
import cards from '@/data/cards.json'

export async function getAllCards(): Promise<OnePieceCard[]> {
  return cards
}
