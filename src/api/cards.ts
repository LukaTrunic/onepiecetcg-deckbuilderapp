// src/api/cards.ts
import axios from 'axios'
import type { Card } from '@/types/Card'

const API_BASE = 'https://optcgapi.com'

export async function getAllSets() {
  const res = await axios.get(`${API_BASE}/api/allSets/`)
  return res.data
}

export async function getCardsFromSet(setId: string): Promise<Card[]> {
  const res = await axios.get(`${API_BASE}/api/sets/${setId}/`)
  return res.data
}
