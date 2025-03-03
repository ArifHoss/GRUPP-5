<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

// Modal - confirmation popup
const showLogoutPopup = ref(false)
const router = useRouter()

// Popup showup when click
const logout = () => {
  showLogoutPopup.value = true
}

// If confirm to logout push to login page
const confirmLogout = () => {
  showLogoutPopup.value = false
  router.push('/')
}

// If not stay remaining to current page
const cancelLogout = () => {
  showLogoutPopup.value = false
}
</script>

<template>
  <div class="setting-container">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="photo" />

    <h1>Förnamn Efternamn</h1>
    <h2>Email</h2>

    <button @click="Update - password" class="update-password-button">Uppdateara lösenord</button>

    <button @click="logout" class="Logout-button">Logga ut</button>

    <p class="delete-account">Radera konto</p>

    <!-- Logout confirmation popup -->
    <div v-if="showLogoutPopup" class="modal-overlay">
      <div class="modal">
        <p>Är du säker på att du vill logga ut?</p>
        <button @click="confirmLogout" class="confirm-button">Ja</button>
        <button @click="cancelLogout" class="cancel-button">Nej</button>
      </div>
    </div>
  </div>
  <Navbar id="navBar" page="setting"></Navbar>
</template>
<style scoped></style>
