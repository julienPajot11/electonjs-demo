<script setup>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import router from "../router/index.js";

const username = ref('')
const password = ref('')

const message = ref({ text: '', type: '' })

onMounted(() => {
  const msg = localStorage.getItem('signupMessage')
  if (msg) {
    message.value = { text: msg, type: 'success' }
    localStorage.removeItem('signupMessage')
  }
})

const login = async (e) => {
  e.preventDefault()

  try {
    const response = await axios.post('http://localhost:3000/login', {
      email: username.value,
      password: password.value,
    })

    if (response.data.code === "200") {
      router.push('/Articles')
      localStorage.setItem('token', response.data.token)
    }
  } catch (error) {
    console.error('Erreur de connexion:', error)
    alert('Identifiants incorrects ou erreur serveur.')
  }
}
</script>

<template>
  <div
      class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light"
      data-uk-height-viewport
  >
    <div class="uk-position-cover uk-overlay-primary"></div>

    <div class="uk-position-bottom-center uk-position-small uk-visible@m uk-position-z-index">
      <span class="uk-text-small uk-text-muted">
        © 2025 Company Name -
        <a href="https://github.com/zzseba78/Kick-Off" target="_blank">Created by KickOff</a> |
        Built with
        <a href="http://getuikit.com" target="_blank" data-uk-tooltip>
          <span data-uk-icon="uikit"></span>
        </a>
      </span>
    </div>

    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">

      <div class="uk-text-center uk-margin">
        <img src="../../public/img/login-logo.svg" alt="Logo" />
      </div>

      <div v-if="message.text" :class="['uk-alert', message.type === 'error' ? 'uk-alert-danger' : 'uk-alert-success']" uk-alert>
        {{ message.text }}
      </div>
      <form v-if="!showRecover" @submit="login">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input
                  v-model="username"
                  class="uk-input uk-border-pill"
                  required
                  placeholder="Username"
                  type="text"
              />
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input
                  v-model="password"
                  class="uk-input uk-border-pill"
                  required
                  placeholder="Password"
                  type="password"
              />
            </div>
          </div>

          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
              LOG IN
            </button>
          </div>
          <div class="uk-text-center uk-margin-small-top">
            <router-link to="/Signup" class="uk-link-reset uk-text-small">
              Pas encore inscrit ? Créez un compte
            </router-link>
          </div>
        </fieldset>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>