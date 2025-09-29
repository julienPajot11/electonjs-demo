<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Header from "./Header.vue";
import router from "../router/index.js";

const route = useRoute()
const article = ref(null)
const loading = ref(true)
const error = ref('')
const editing = ref(false)
const message = ref('')

const editForm = ref({
  title: '',
  desc: '',
  author: '',
})

const showDeleteModal = ref(false)

const fetchArticleDetail = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/articles/${route.params.id}`)

    if (response.data.code === "200") {
      article.value = response.data.data
      editForm.value.title = article.value.title
      editForm.value.desc = article.value.desc
      editForm.value.imgPath = article.value.imgPath
    } else {
      error.value = 'Impossible de récupérer cet article.'
    }
  } catch (err) {
    console.error('Erreur API:', err)
    error.value = 'Une erreur est survenue.'
  } finally {
    loading.value = false
  }
}

const saveArticle = async () => {
  try {
    const response = await axios.post('http://localhost:3000/articles/save', {
      id: article.value.id,
      title: editForm.value.title,
      desc: editForm.value.desc,
      author: article.value.author,
      imgPath: article.value.imgPath
    })

    if (response.data.code === "200") {
      article.value = response.data.data
      editing.value = false
      message.value = "Article mis à jour avec succès !"
    } else {
      message.value = response.data.message || "Erreur lors de la sauvegarde"
    }
  } catch (err) {
    console.error('Erreur API:', err)
    message.value = "Erreur serveur"
  }
}

const confirmDeleteArticle = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/articles/${article.value.id}`)

    if (response.data.code === "200") {
      showDeleteModal.value = false
      await router.push('/Articles')
    } else {
      message.value = response.data.message || "Erreur lors de la suppression"
    }
  } catch (err) {
    console.error('Erreur API:', err)
    message.value = "Erreur serveur"
  }
}

onMounted(fetchArticleDetail)
</script>

<template>
  <Header />
  <div class="uk-container uk-container-small uk-margin-large-top">


    <div v-if="loading" class="uk-text-center uk-margin-large">
      <span data-uk-spinner="ratio: 2"></span>
      <p>Chargement de l'article...</p>
    </div>

    <div v-if="error" class="uk-alert-danger uk-padding-small" uk-alert>
      {{ error }}
    </div>

    <div v-if="message" class="uk-alert-success uk-padding-small" uk-alert>
      {{ message }}
    </div>

    <div v-if="article" class="article-detail">

      <div class="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom">
        <h1 class="uk-text-bold">{{ article.title }}</h1>
        <div>
          <button class="uk-button uk-button-default uk-margin-small-right" @click="editing = !editing">
            <span uk-icon="icon: pencil"></span>
          </button>

          <button class="uk-button uk-button-danger" @click="showDeleteModal = true">
            <span uk-icon="icon: trash"></span>
          </button>
        </div>
      </div>

      <div v-if="editing" class="uk-margin">
        <div class="uk-margin-small">
          <input v-model="editForm.title" class="uk-input" placeholder="Titre de l'article" />
        </div>
        <div class="uk-margin-small">
          <textarea v-model="editForm.desc" class="uk-textarea" rows="5" placeholder="Description"></textarea>
        </div>
        <div class="uk-margin-small">
          <textarea v-model="editForm.author" class="uk-input" placeholder="Author"></textarea>
        </div>
        <div>
          <button class="uk-button uk-button-primary uk-margin-small-right" @click="saveArticle">Enregistrer</button>
          <button class="uk-button uk-button-default" @click="editing = false">Annuler</button>
        </div>
      </div>

      <div v-else>
        <div class="uk-flex uk-flex-center uk-margin">
          <img :src="article.imgPath" :alt="article.title" class="article-image" />
        </div>

        <div class="uk-margin">
          <p class="uk-text-lead uk-text-justify">{{ article.desc }}</p>
        </div>

        <div class="uk-text-right uk-text-muted uk-margin-top">
          <em>Écrit par {{ article.author }}</em>
        </div>
      </div>

    </div>
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Supprimer l'article</h3>
        <p>Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.</p>
        <div class="uk-flex uk-flex-right uk-margin-top">
          <button class="uk-button uk-button-default uk-margin-small-right" @click="showDeleteModal = false">Annuler</button>
          <button class="uk-button uk-button-danger" @click="confirmDeleteArticle">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-image {
  max-width: 100%;
  height: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin: 0 0 10px;
}

.modal-content p {
  margin-bottom: 20px;
}
</style>
