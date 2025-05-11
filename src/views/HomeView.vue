<template>
    <main>
        <h1>My One Piece Cards</h1>

        <div class="filters">
            <label>Filter by Color:</label>
            <div class="checkbox-group">
                <label v-for="color in availableColors" :key="color">
                    <input type="checkbox" :value="color" v-model="selectedColors" />
                    {{ color }}
                </label>
            </div>

            <label>
                Filter by Type:
                <select v-model="selectedType">
                    <option value="">All</option>
                    <option v-for="(label, key) in typeMap" :key="key" :value="key">
                        {{ label }}
                    </option>
                </select>
            </label>
        </div>

        <div v-if="loading">Loading cards...</div>
        <CardList v-else :cards="filteredCards" />
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAllCards } from '@/api/cards';
import type { OnePieceCard } from '@/types/Card';
import CardList from '@/components/CardList.vue';

const cards = ref<OnePieceCard[]>([]);
const loading = ref(true);

const selectedColors = ref<string[]>([]);
const selectedType = ref<string>('');

// UI labels for filters
const availableColors = ['Red', 'Green', 'Blue', 'Purple', 'Black', 'Yellow'];

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

const filteredCards = computed(() =>
    cards.value.filter(card => {
        const cardColors = mapColor(card.col);
        const matchesColor =
            selectedColors.value.length === 0 ||
            cardColors.some(c => selectedColors.value.includes(c));

        const matchesType =
            selectedType.value === '' || card.t === selectedType.value;

        return matchesColor && matchesType;
    })
);

onMounted(async () => {
    cards.value = await getAllCards();
    loading.value = false;
});
</script>

<style scoped>
.filters {
    margin: 1rem 0;
}

.checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.5rem 0;
}
</style>
