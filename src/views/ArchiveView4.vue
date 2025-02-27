<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const today = new Date()
const selectedDate = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const showYearView = ref(false)

const changeMonth = (step) => {
  currentMonth.value += step
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value -= 1
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value += 1
  }
}

const daysInMonth = computed(() => {
  if (showYearView.value) return []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days = []
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(currentYear.value, currentMonth.value, i))
  }
  return days
})

const selectDate = (date) => {
  selectedDate.value = date.toDateString()
}

const toggleYearView = () => {
  showYearView.value = !showYearView.value
}
</script>

<template>
  <div class="archive-container">
    <h1 class="text-center year-title" @click="toggleYearView">{{ currentYear }}</h1>

    <div v-if="showYearView" class="year-grid">
      <div
        v-for="month in 12"
        :key="month"
        class="month-grid"
        @click="
          () => {
            showYearView = false
            currentMonth = month - 1
          }
        "
      >
        <h3>
          {{ new Date(currentYear, month - 1).toLocaleString('default', { month: 'short' }) }}
        </h3>
        <div class="calendar-grid">
          <div
            v-for="day in new Date(currentYear, month, 0).getDate()"
            :key="day"
            class="calendar-day"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>

    <div v-else class="calendar-container">
      <div class="calendar-header">
        <button @click="changeMonth(-1)" class="btn btn-sm btn-outline-primary">❮</button>
        <h3>
          {{
            new Date(currentYear, currentMonth).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })
          }}
        </h3>
        <button @click="changeMonth(1)" class="btn btn-sm btn-outline-primary">❯</button>
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

.year-title {
  font-size: 28px;
  cursor: pointer;
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 5px;
  margin-top: 20px;
  justify-content: center;
}

.month-grid {
  /* background: #f8f9fa; */
  padding: 5px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  font-size: 10px;
}

.calendar-container {
  max-width: 100%;
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
  /* padding-bottom: 10px; */
}

.calendar-grid {
  background: white;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  width: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #ddd;
  /* border-radius: 5px; */
  cursor: pointer;
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
