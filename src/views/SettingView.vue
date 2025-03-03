<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="setting-container">
    <img src="@/assets/images/happy-earth.png" alt="Happy Planet" class="success-icon" />

    <h1>Förnamn Efternamn</h1>
    <h2>Email</h2>

    <button @click="Update - password" class="update-password-button">Uppdateara lösenord</button>

    <button @click="Logout" class="Logout-button">Logga ut</button>

    <p>Radera konto</p>
  </div>
  <Navbar id="navBar" page="setting"></Navbar>
</template>
<style scoped></style>
