<template>
    <div class="card-list">
        <div v-for="(card, index) in cards" :key="card.cid + '-' + index" class="card">
            <img :src="card.iu" :alt="card.n" width="100" />
            <h3>{{ card.n }}</h3>
            <p>Cost: {{ card.cs }}</p>
            <p>Power: {{ card.p }}</p>
            <p>Effect: {{ card.e }}</p>
            <p>Color: {{ mapColor(card.col).join(', ') }}</p>
            <p>Type: {{ typeMap[card.t] || 'Unknown' }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OnePieceCard } from '@/types/Card';

const props = defineProps<{
    cards: OnePieceCard[];
}>();

const typeMap: Record<string, string> = {
    '1': 'Leader',
    '2': 'Character',
    '3': 'Event',
    '4': 'Stage'
};

const colorMap: Record<string, string> = {
    '1': 'Red',
    '2': 'Green',
    '3': 'Blue',
    '4': 'Purple',
    '5': 'Black',
    '6': 'Yellow'
};

function mapColor(code: string): string[] {
    return code?.split(/\s+/).map(c => colorMap[c] || c) || [];
}
</script>

<style scoped>
.card-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    width: 180px;
    text-align: center;
}
</style>
