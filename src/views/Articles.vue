<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Header from "./Header.vue";

const articles = ref([])
const showAddForm = ref(false)
const newArticle = ref({
  title: '',
  desc: '',
  imgPath: '',
  author: ''
})
const successMessage = ref('')

const fetchArticles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/articles')

    console.log('Réponse API:', response.data)

    if (response.data.code === "200") {
      articles.value = response.data.data
    } else {
      showMessage(response.data.message || 'Erreur lors de la récupération', 'error')
    }
  } catch (error) {
    console.error('Erreur API:', error)
    showMessage(response.data.message || 'Erreur lors de la récupération', 'error')
  }
}

const showMessage = (message, type = 'success') => {
  successMessage.value = { text: message, type }

  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
}

const addArticle = async () => {
  try {
    const response = await axios.post('http://localhost:3000/articles/save', {
      title: newArticle.value.title,
      desc: newArticle.value.desc,
      imgPath: newArticle.value.imgPath,
      author: newArticle.value.author
    })

    if (response.data.code === "200") {
      showMessage('Article ajouté avec succès !', 'success')
      showAddForm.value = false
      newArticle.value = { title: '', desc: '', imgPath: '', author: '' }
      fetchArticles()
    } else {
      showMessage(response.data.message || 'Erreur lors de la création', 'error')
    }
  } catch (error) {
    console.error('Erreur API:', error)
    showMessage('Erreur serveur lors de la création', 'error');
  }
}
onMounted(fetchArticles)
</script>

<template>
  <div>
    <Header />
    <div class="spacer uk-margin"></div>
    <div v-if="successMessage" class="uk-container uk-margin">
      <div
          class="uk-alert"
          :class="{
          'uk-alert-success': successMessage.type === 'success',
          'uk-alert-danger': successMessage.type === 'error'
        }"
          uk-alert
      >
        <a class="uk-alert-close" uk-close></a>
        <p>{{ successMessage.text }}</p>
      </div>
    </div>
    <button
        class="uk-button uk-button-primary uk-margin-bottom"
        @click="showAddForm = !showAddForm"
    >
      {{ showAddForm ? 'Fermer le formulaire' : 'Ajouter un article' }}
    </button>


    <div v-if="showAddForm" class="uk-card uk-card-default uk-card-body uk-margin-bottom">
      <h3 class="uk-card-title">Nouvel Article</h3>
      <form @submit.prevent="addArticle">
        <div class="uk-margin">
          <input
              class="uk-input"
              type="text"
              v-model="newArticle.title"
              placeholder="Titre"
              required
          />
        </div>
        <div class="uk-margin">
            <textarea
                class="uk-textarea"
                v-model="newArticle.desc"
                placeholder="Description"
                required
            ></textarea>
        </div>
        <div class="uk-margin">
          <input
              class="uk-input"
              type="text"
              v-model="newArticle.imgPath"
              placeholder="URL de l'image"
              required
          />
        </div>
        <div class="uk-margin">
          <input
              class="uk-input"
              type="text"
              v-model="newArticle.author"
              placeholder="Auteur"
              required
          />
        </div>
        <button type="submit" class="uk-button uk-button-primary">Créer</button>
      </form>
    </div>
    <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
      <div class="uk-container uk-container-expand uk-margin-large-bottom">

        <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-grid-match" data-uk-grid>
          <router-link v-for="article in articles" :key="article.id"
               class="clickable-card" :to="`/Articles/${article.id}`">
            <div class="uk-card uk-card-small uk-card-default">

              <div class="uk-card-header">
                <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                  <div class="uk-width-expand">
                    <span class="cat-txt">Article</span>
                  </div>
                  <div class="uk-width-auto uk-text-right uk-text-muted">
                    <span data-uk-icon="icon:clock; ratio: 0.8"></span> 3 min.
                  </div>
                </div>
              </div>

              <div class="uk-card-media">
                <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
                  <img
                      class="lazy"
                      :src="article.imgPath"
                      :alt="article.title"
                  >
                </div>
              </div>

              <div class="uk-card-body">
                <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">
                  {{ article.title }}
                </h6>
                <p class="uk-text-small uk-text-muted">{{ article.desc }}</p>
              </div>

              <div class="uk-card-footer">
                <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                  <div class="uk-width-expand uk-text-small">
                    {{ article.author }}
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <div v-if="articles.length === 0" class="uk-text-center uk-margin-large">
          <p>Aucun article disponible.</p>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>

</style>