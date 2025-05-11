<!-- src/views/HomeView.vue -->
<template>
    <main>
        <h1>My One Piece Cards</h1>

        <label for="set-select">Select a Set:</label>
        <select id="set-select" v-model="selectedSetId" @change="fetchCards">
            <option disabled value="">-- Choose a set --</option>
            <option v-for="set in sets" :key="set.set_id" :value="set.set_id">
                {{ set.set_name }}
            </option>
        </select>

        <div v-if="loading">Loading cards...</div>
        <CardList v-else :cards="cards" />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAllSets, getCardsFromSet } from '@/api/cards';
import type { Card } from '@/types/Card';
import CardList from '@/components/CardList.vue';

const sets = ref<{ set_id: string; set_name: string }[]>([]);
const selectedSetId = ref('');
const cards = ref<Card[]>([]);
const loading = ref(false);

async function fetchCards() {
    if (!selectedSetId.value) return;

    loading.value = true;
    cards.value = await getCardsFromSet(selectedSetId.value);
    loading.value = false;
}

onMounted(async () => {
    sets.value = await getAllSets();
    selectedSetId.value = sets.value[0]?.set_id ?? '';
    await fetchCards();
});
</script>

<style scoped>
select {
    margin: 1rem 0;
    padding: 0.5rem;
    font-size: 1rem;
}
</style>
