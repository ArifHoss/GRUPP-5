<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import DateDisplay from '@/components/dateDisplay.vue'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()
const today = new Date()
const selectedDate = ref(null)
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

// Get completed task from logged in user
const completedTasks = computed(() => {
  if (!userStore.currentUser || !selectedDate.value) return []
  return userStore.currentUser.completedTasks.filter(
    (task) => task.dateCompleted === selectedDate.value, // Ensure the formats match!
  )
})

// Function to remove a task from the list
// const removeTask = (taskId) => {
//   if (!userStore.currentUser) return

//   userStore.currentUser.completedTasks = userStore.currentUser.completedTasks.filter(
//     (task) => task.id !== taskId,
//   )

//   // Update the backend with the new task list
//   userStore.updateUserInBe(userStore.currentUser, userStore.currentUser.id)
// }

// Update the month while handling year changes
const changeMonth = (step) => {
  currentMonth.value += step
  if (currentMonth.value < 0) {
    currentMonth.value = 11 // Wrap to December
    currentYear.value -= 1 // Decrease year
  } else if (currentMonth.value > 11) {
    currentMonth.value = 0 // Wrap to January
    currentYear.value += 1 // Increase year
  }
}

// Generate days in the selected month
const daysInMonth = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days = []
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(currentYear.value, currentMonth.value, i))
  }
  return days
})

// Handle date selection
const selectDate = (date) => {
  selectedDate.value = date.toDateString()
}

// const selectDate = (date) => {
//   selectedDate.value = date.toISOString().split('T')[0] // Convert to 'YYYY-MM-DD'
// }

</script>

<template>
  <div class="archive-container">
    <div class="header">
      <h1 class="h1">Arkiverad utmaning</h1>
      <DateDisplay />
    </div>
    <!-- <main class="challenge-container"> -->
    <!-- <p class="text-center">Välj ett datum för att se tidigare utmaningar</p> -->

    <div class="calendar-container">
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
      <ul v-if="completedTasks.length > 0">
        <li v-for="task in completedTasks" :key="task.id">
          <strong>{{ task.title }}</strong
          >: {{ task.description }}
        </li>
      </ul>
      <p v-else>Inga utmaningar genomförda på detta datum.</p>
    </div>

    <Navbar page="archive"></Navbar>
    <!-- </main> -->
  </div>
</template>

<style scoped>
.archive-container {
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
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
