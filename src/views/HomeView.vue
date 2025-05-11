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
    "1": "Red",
    "2": "Green",
    "3": "Blue",
    "4": "Purple",
    "5": "Black",
    "6": "Yellow",
    "7": "Green",   // Special code used in multi-color
    "10": "Red"     // Another special code
};


const reverseColorMap: Record<string, string[]> = {
    Red: ["1", "10"],
    Green: ["2", "7"],
    Blue: ["3"],
    Purple: ["4"],
    Black: ["5"],
    Yellow: ["6"]
};




function mapColor(code: string | null): string[] {
    return (code ?? "")
        .trim()
        .split(/\s+/)
        .map(c => colorMap[c] || `Unknown (${c})`);
}


const filteredCards = computed(() =>
    cards.value.filter(card => {
        const cardColorCodes = card.col?.split(/\s+/) ?? [];
        const selectedColorCodes = selectedColors.value
            .flatMap(label => reverseColorMap[label] || []);

        const matchesColor =
            selectedColors.value.length === 0 ||
            cardColorCodes.some(code => selectedColorCodes.includes(code));

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
