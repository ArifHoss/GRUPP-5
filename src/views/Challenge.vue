<script setup>
import { onMounted } from 'vue'
import { useChallengeStore } from '@/stores/challengeStore'
import Navbar from '@/components/Navbar.vue'

const challengeStore = useChallengeStore()

onMounted(async () => {
  await challengeStore.fetchChallenges()
})
</script>

<template>
  <div class="challenge-container">
    <h1>Dagens utmaning</h1>
    <div v-if="challengeStore.firstChallenge" class="challenge">
      <h2>{{ challengeStore.firstChallenge.title }}</h2>
      <p>{{ challengeStore.firstChallenge.description }}</p>
    </div>
    <div v-else class="loading">
      <p>Laddar utmaning...</p>
    </div>
  </div>
  <Navbar />
</template>
