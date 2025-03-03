<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userEmail = ref('')
const firstName = ref('')
const lastName = ref('')
const errorMessages = ref([])
// Regex för att validera namn (kan vara bokstäver och mellanslag)
const namePattern = /^[a-zA-Z\s]{2,}$/
// Regex för att validera email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emailError = ref(false)
const firstNameError = ref(false)
const lastNameError = ref(false)
// Validering för förnamn, efternamn och email
watch([userEmail, firstName, lastName], ([email, first, last]) => {
  emailError.value = !emailPattern.test(email) && email.length > 0
  firstNameError.value = !namePattern.test(first) && first.length > 0
  lastNameError.value = !namePattern.test(last) && last.length > 0
  errorMessages.value = []
  if (!email || !first || !last) {
    errorMessages.value.push('Vänligen fyll i alla rutor')
  }
  if (!emailPattern.test(email) && email.length > 0) {
    errorMessages.value.push('Ange en giltig e-postadress')
  }
  if (!namePattern.test(first) && first.length > 0) {
    errorMessages.value.push('Förnamnet kan endast innehålla bokstäver och mellanslag')
  }
  if (!namePattern.test(last) && last.length > 0) {
    errorMessages.value.push('Efternamnet kan endast innehålla bokstäver och mellanslag')
  }
})
// Uppdatera användarens namn i JSON-server
async function updateName() {
  if (errorMessages.value.length > 0) return
  try {
    // Hitta användaren via e-post
    const response = await fetch(`http://localhost:3000/users?mail=${userEmail.value}`)
    const users = await response.json()
    if (users.length === 0) {
      errorMessages.value.push('Fel e-postadress')
      emailError.value = true
      return
    }
    const userId = users[0].id
    // Uppdatera användarens namn i JSON-server
    const updateResponse = await fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName.value, lastName: lastName.value }),
    })
    // Om uppdatering lyckas, navigera till en success-sida
    if (updateResponse.ok) {
      router.push('/successNameChange')
    } else {
      errorMessages.value.push('Misslyckades med att uppdatera namn')
    }
  } catch (error) {
    console.error('Error updating name:', error)
    errorMessages.value.push('Något gick fel. Försök igen!')
  }
}
</script>

<template>
  <div class="name-change-app">
    <img src="@/assets/images/happy-earth.png" alt="Happy Earth" class="earth-image" />

    <div class="form-container">
      <!-- Ändra namn -->
      <h1>Ändra namn</h1>

      <!-- E-postadress -->
      <label :class="{ 'label-error': emailError }" for="email">E-postadress</label>
      <input
        id="email"
        v-model="userEmail"
        type="email"
        placeholder="Ange e-post"
        :class="{ 'input-error': emailError }"
      />

      <!-- Förnamn -->
      <label :class="{ 'label-error': firstNameError }" for="firstName">Förnamn</label>
      <input
        id="firstName"
        v-model="firstName"
        type="text"
        placeholder="Ange förnamn"
        :class="{ 'input-error': firstNameError }"
      />

      <!-- Efternamn -->
      <label :class="{ 'label-error': lastNameError }" for="lastName">Efternamn</label>
      <input
        id="lastName"
        v-model="lastName"
        type="text"
        placeholder="Ange efternamn"
        :class="{ 'input-error': lastNameError }"
      />

      <!-- Visa upp felmeddelanden som en lista -->
      <ul v-if="errorMessages.length" class="error-message">
        <li v-for="(message, index) in errorMessages" :key="index">{{ message }}</li>
      </ul>

      <!-- Skicka namnändring -->
      <button @click="updateName" :disabled="errorMessages.length > 0" class="confirm-button">
        Ändra namn
      </button>
    </div>
    <RouterLink to="/" class="links">Har du redan konto? Logga in</RouterLink>
  </div>
</template>

<style scoped>
/* Basstil */
.name-change-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fef7ee;
  color: #3f3d3d;
  font-family: 'Comfortaa', serif;
}
/* Bild - Logo */
.earth-image {
  width: 180px;
  margin-bottom: 0.5rem;
}
/* Fontstil */
h1 {
  font-size: 36px;
  color: #3f3d3d;
}
/* Formstil */
.form-container {
  width: 100%;
  max-width: 300px;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
}
.form-container label {
  margin-bottom: 0.25rem;
  margin-top: 1rem;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}
.form-container input {
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid #f4dec3;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
/* Fokusera när du klickar */
.form-container input:focus {
  border-color: #c2e07a;
  box-shadow: 0 0 0 2px rgba(194, 224, 122, 0.3);
}
/* Understruken länk */
.links {
  display: block;
  margin-top: 2rem;
  font-size: 14px;
  color: #3f3d3d;
  text-decoration: underline;
}
/* Knapp */
.confirm-button {
  font-family: 'Comfortaa', serif;
  background-color: #c2e07a;
  color: #3f3d3d;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 39px;
  padding: 0.75rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}
.confirm-button:hover {
  background-color: #a5c261;
}
/* Fel */
.label-error {
  color: red;
}
.input-error {
  border-color: red;
}
.input-error:focus {
  border-color: red !important;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
/* Felmeddelande */
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
}
</style>