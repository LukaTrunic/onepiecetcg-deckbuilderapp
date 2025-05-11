<!-- src/views/HomeView.vue -->
<template>
    <main>
        <h1>My One Piece Cards</h1>

        <div v-if="loading">Loading cards...</div>
        <CardList v-else :cards="cards" />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCardsFromSet } from '@/api/cards';
import type { Card } from '@/types/Card';
import CardList from '@/components/CardList.vue';

const cards = ref<Card[]>([]);
const loading = ref(true);

// Load cards when the view mounts
onMounted(async () => {
    cards.value = await getCardsFromSet('OP-01'); // you can change to OP02 etc.
    loading.value = false;
});
</script>