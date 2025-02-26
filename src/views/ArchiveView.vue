<script setup>
import Navbar from '@/components/Navbar.vue';
import DateDisplay from '@/components/dateDisplay.vue';





</script>

<template>
  <main class="challenge-container">
    <div class="header">
      <h1 class="h1">Arkiverad utmaning</h1>
      <DateDisplay />
    </div>
   
    <div>
      <VCalendar 
        is-expanded
        :attributes="calendarAttributes"
        v-model="selectedDate"
      />
    </div>
  <Navbar page="archive"></Navbar>
  </main>
</template>

<style scoped>
.archived-container {
  background-color: #fdfaf4;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

.date-button {
  background: #fff;
  border: 1px solid #ddd;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}

.calendar-wrapper {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}
</style>