<template>
    <main>
        <h1>My One Piece Cards</h1>

        <!-- SET DROPDOWN -->
        <label for="set-select">Select a Set:</label>
        <select id="set-select" v-model="selectedSetId" @change="fetchCards">
            <option disabled value="">-- Choose a set --</option>
            <option v-for="set in sets" :key="set.set_id" :value="set.set_id">
                {{ set.set_name }}
            </option>
        </select>

        <!-- FILTERS -->
        <div class="filters">
            <div>
                <label>Filter by Color:</label>
                <div class="checkbox-group">
                    <label v-for="color in availableColors" :key="color">
                        <input type="checkbox" :value="color" v-model="selectedColors" />
                        {{ color }}
                    </label>
                </div>
            </div>



            <label>
                Filter by Type:
                <select v-model="selectedType">
                    <option value="">All</option>
                    <option v-for="type in availableTypes" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </label>
        </div>

        <!-- CARD LIST -->
        <div v-if="loading">Loading cards...</div>
        <CardList v-else :cards="filteredCards" />
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAllSets, getCardsFromSet } from '@/api/cards';
import type { Card, CardType } from '@/types/Card';
import CardList from '@/components/CardList.vue';

const sets = ref<{ set_id: string; set_name: string }[]>([]);
const selectedSetId = ref('');
const cards = ref<Card[]>([]);
const loading = ref(false);

const selectedColor = ref('');
const selectedColors = ref<string[]>([]);
const selectedType = ref<CardType | ''>('');

// Available filter options
const availableColors = ['Red', 'Blue', 'Green', 'Purple', 'Black', 'Yellow'];
const availableTypes: CardType[] = ['Character', 'Event', 'Stage', 'Leader'];

// Filtered cards based on dropdowns
const filteredCards = computed(() =>
    cards.value.filter(card => {
        const cardColors = card.card_color?.split(' ') || [];
        const matchesColor =
            selectedColors.value.length === 0 ||
            cardColors.some(c => selectedColors.value.includes(c));

        const matchesType =
            selectedType.value === '' || card.card_type === selectedType.value;

        return matchesColor && matchesType;
    })
);


// Load cards from API
async function fetchCards() {
    if (!selectedSetId.value) return;
    loading.value = true;
    cards.value = await getCardsFromSet(selectedSetId.value);
    loading.value = false;
}

// Initial load
onMounted(async () => {
    sets.value = await getAllSets();
    selectedSetId.value = sets.value[0]?.set_id ?? '';
    await fetchCards();
});
</script>

<style scoped>
select {
    margin: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
}

.filters {
    margin: 1rem 0;
}

.select[multiple] {
    height: auto;
    max-height: 120px;
    width: 180px;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    overflow-y: auto;
}
</style>
