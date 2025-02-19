import { defineStore } from 'pinia'

export const useChallengeStore = defineStore('challenge', {
  state: () => ({
    challenges: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchChallenges() {
      this.loading = true
      try {
        const response = await fetch('/challenges.json')
        if (!response.ok) {
          throw new Error('Failed to load challenges')
        }
        this.challenges = await response.json()
      } catch (error) {
        console.error('Error loading challenges:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    firstChallenge: (state) => state.challenges[0] || null,
  },
})
