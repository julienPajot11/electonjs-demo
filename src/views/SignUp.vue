<script setup>
import { ref } from 'vue'
import axios from 'axios'
import router from "../router/index.js"

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const pseudo = ref('')
const cityCode = ref('')
const city = ref('')
const phone = ref('')
const message = ref({ text: '', type: '' })

const signup = async (e) => {
  e.preventDefault()

  if (password.value !== passwordConfirm.value) {
    message.value = { text: "Les mots de passe ne correspondent pas", type: 'error' }
    return
  }

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      pseudo: pseudo.value,
      cityCode: cityCode.value,
      city: city.value,
      phone: phone.value
    })

    if (response.data.code === "200") {
      localStorage.setItem('signupMessage', 'Inscription réussie ! Vous pouvez maintenant vous connecter.')
      router.push('/')

    } else {
      message.value = { text: response.data.message || "Erreur lors de l'inscription", type: 'error' }
    }
  } catch (error) {
    console.error('Erreur inscription:', error)
    message.value = { text: "Erreur serveur ou données invalides", type: 'error' }
  }
}
</script>

<template>
  <div class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light">

    <div class="uk-position-cover uk-overlay-primary"></div>

    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">

      <div class="uk-text-center uk-margin">
        <img src="../../public/img/login-logo.svg" alt="Logo" />
      </div>

      <form @submit="signup">
        <fieldset class="uk-fieldset">

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input v-model="pseudo" class="uk-input uk-border-pill" required placeholder="Pseudo" type="text"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="email"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input v-model="passwordConfirm" class="uk-input uk-border-pill" required placeholder="Confirmez le mot de passe" type="password"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: location"></span>
              <input v-model="city" class="uk-input uk-border-pill" required placeholder="Ville" type="text"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: hashtag"></span>
              <input v-model="cityCode" class="uk-input uk-border-pill" required placeholder="Code postal" type="text"/>
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: receiver"></span>
              <input v-model="phone" class="uk-input uk-border-pill" required placeholder="Téléphone" type="text"/>
            </div>
          </div>

          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
              S'INSCRIRE
            </button>
          </div>

          <div class="uk-text-center uk-margin-small-top">
            <router-link to="/" class="uk-link-reset uk-text-small">
              Déjà inscrit ? Connectez-vous
            </router-link>
          </div>

        </fieldset>
      </form>

    </div>
  </div>
</template>

<style scoped>
.uk-position-z-index {
  position: relative;
  z-index: 10;
}
</style>
