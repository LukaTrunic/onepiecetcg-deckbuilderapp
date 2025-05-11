<!-- src/components/CardList.vue -->
<template>
    <div class="card-list">
        <div v-for="(card, index) in cards" :key="card.card_set_id + '-' + index" class="card">
            <h3>{{ card.card_name }}</h3>
            <p>Cost: {{ card.card_cost }}</p>
            <p>Power: {{ card.card_power || '-' }}</p>
            <p>Type: {{ card.card_type }}</p>
            <p>Color: {{ card.card_color }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Card } from '@/types/Card';

const props = defineProps<{
    cards: Card[];
}>();
</script>

<style scoped>
.card-list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    width: 150px;
    text-align: center;
}
</style>
