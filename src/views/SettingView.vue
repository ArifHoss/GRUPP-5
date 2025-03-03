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
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="earth-image" />

    <h1>Förnamn Efternamn</h1>
    <h2>Email</h2>

    <button @click="Update - password" class="update-password-button">Uppdateara lösenord</button>

    <button @click="logout" class="Logout-button">Logga ut</button>

    <h2 class="delete-account">Radera konto</h2>

    <!-- Logout confirmation popup -->
    <div v-if="showLogoutPopup" class="modal-overlay">
      <div class="modal">
        <p>Är du säker på att du vill logga ut?</p>
        <div class="button-container">
          <button @click="confirmLogout" class="confirm-button">Ja</button>
          <button @click="cancelLogout" class="cancel-button">Nej</button>
        </div>
      </div>
    </div>
  </div>
  <Navbar id="navBar" page="setting"></Navbar>
</template>

<style scoped>
/* Base style */
.setting-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef7ee;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
}

/* Image - Logo */
.earth-image {
  width: 180px;
  margin-bottom: 0.5rem;
}

/* Font style */
h1 {
  font-size: 24px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #3f3d3d;
}

h2 {
  font-size: 16px;
  margin-bottom: 5rem;
  color: #3f3d3d;
}

.delete-account {
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}

/* Buttons */
.update-password-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 5rem;
  cursor: pointer;
  min-width: 200px;
  transition: background-color 0.3s ease;
}

.update-password-button:hover {
  background-color: #a5c261;
}

.Logout-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #ffbcb5;
  color: #3f3d3d;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  min-width: 200px;
  transition: background-color 0.3s ease;
}

.Logout-button:hover {
  background-color: #fbb3ab;
}

/* Popup */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #3f3d3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fef7ee;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal p {
  margin-bottom: 3rem;
  margin-top: 3rem;
}

/* Buttons in modal or popup */
.confirm-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #c2e07a;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  cursor: pointer;
  margin-bottom: 3rem;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.confirm-button:hover {
  background-color: #a5c261;
}

.cancel-button {
  font-size: 14px;
  font-family: 'Comfortaa', serif;
  font-weight: bold;
  background-color: #fbb3ab;
  color: #3f3d3d;
  border: none;
  border-radius: 20px;
  padding: 0.75rem;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  min-width: 80px;
}

.cancel-button:hover {
  background-color: #fbb3ab;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
