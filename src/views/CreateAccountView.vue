<script setup>
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers();
  getCurrentDate()
})

let testUser = {
  firstName: null,
  lastName: null,
  mail: null,
  password: null,
  profilePicUrl: null,
  ecoPoints: 0,
  completedTasks: [],
  registrationDate: null
}

const getCurrentDate = () => {
  let today = new Date().toDateString();
  testUser.registrationDate = today
}

function addTestUser() {
  userStore.addUser(testUser)
}

</script>

<template>
  <h1>createAccount</h1>
  <RouterLink to="onboarding">Lägg in länk till onboarding screen här</RouterLink>
  <input id='firstname' type="text" placeholder="firstname" v-model="testUser.firstName">
  <input id='lastname' type="text" placeholder="lastname" v-model="testUser.lastName">
  <input id='email' type="text" placeholder="email" v-model="testUser.mail">
  <input id='password' type="text" placeholder="password" v-model="testUser.password">
  <button @click="addTestUser">AddUser</button>

</template>
