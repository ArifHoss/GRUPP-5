<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const today = new Date()
const selectedDate = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

// Generate days in the current month
const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value, 1)
  const days = []
  while (date.getMonth() === currentMonth.value) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
})

// Handle date selection
const selectDate = (date) => {
  selectedDate.value = date.toDateString()
}
</script>

<template>
  <div class="archive-container">
    <h1 class="text-center">Kalender / Arkiv</h1>
    <p class="text-center">Välj ett datum för att se tidigare utmaningar</p>

    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="currentMonth--" class="btn btn-sm btn-outline-primary">❮</button>
        <h3>
          {{
            new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </h3>
        <button @click="currentMonth++" class="btn btn-sm btn-outline-primary">❯</button>
      </div>

      <div class="calendar-grid">
        <div
          v-for="day in daysInMonth"
          :key="day.toDateString()"
          class="calendar-day"
          @click="selectDate(day)"
        >
          {{ day.getDate() }}
        </div>
      </div>
    </div>

    <div v-if="selectedDate" class="selected-date">
      <h4>Utmaningar för: {{ selectedDate }}</h4>
      <p>Inga utmaningar ännu, lägg till i backend</p>
    </div>

    <Navbar page="archive"></Navbar>
  </div>
</template>

<style scoped>
.archive-container {
  text-align: center;
  padding: 20px;
}

.calendar-container {
  max-width: 350px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f8f9fa;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.calendar-day:hover {
  background-color: #d4edda;
}

.selected-date {
  margin-top: 20px;
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 8px;
}
</style>

/** 🚀 Next Steps Fetch past challenges from JSON Server (/challenges?date=selectedDate). Highlight
today’s date differently. Make it fully responsive. */
