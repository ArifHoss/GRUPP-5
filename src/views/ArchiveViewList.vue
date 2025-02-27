<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

// Get completed tasks from the logged-in user
const completedTasks = computed(() => {
  if (!userStore.currentUser) return []
  return userStore.currentUser.completedTasks
})

// Function to remove a task from the list
const removeTask = (taskId) => {
  if (!userStore.currentUser) return

  userStore.currentUser.completedTasks = userStore.currentUser.completedTasks.filter(
    (task) => task.id !== taskId,
  )

  // Update the backend with the new task list
  userStore.updateUserInBe(userStore.currentUser, userStore.currentUser.id)
}
</script>

<template>
  <div class="archive-container">
    <h1 class="text-center">Slutförda Utmaningar</h1>

    <div v-if="completedTasks.length > 0" class="task-list">
      <div v-for="task in completedTasks" :key="task.id" class="task-item">
        <img :src="task.image" :alt="task.title" class="task-image" />
        <div class="task-details">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <p><strong>Datum:</strong> {{ task.dateCompleted }}</p>
        </div>
        <button @click="removeTask(task.id)" class="btn btn-danger">Ta bort</button>
      </div>
    </div>

    <p v-else class="no-tasks">Inga slutförda utmaningar ännu.</p>

    <Navbar page="archive"></Navbar>
  </div>
</template>

<style scoped>
.archive-container {
  text-align: center;
  padding: 20px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.task-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 5px;
}

.task-details {
  flex: 1;
  text-align: left;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}

.no-tasks {
  font-size: 16px;
  color: #666;
}
</style>
