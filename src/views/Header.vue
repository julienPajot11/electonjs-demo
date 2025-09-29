<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumb = computed(() => {
  const crumbs = [{ name: 'Home', path: '/Articles' }]

  if (route.name === 'ArticleDetail' && route.params.id) {
    crumbs.push({ name: 'Articles', path: '/Articles' })
    crumbs.push({ name: route.meta.articleTitle || 'Article', path: '' })
  }

  return crumbs
})
</script>

<template>
  <header id="site-head" class="uk-background-muted uk-padding-small">
    <div class="uk-container uk-container-expand">
      <div class="uk-grid uk-grid-medium uk-flex uk-flex-middle" data-uk-grid>

        <div class="uk-width-auto">
          <a href="#" class="uk-logo" title="">
            <img src="../../public/img/logo.svg" alt="Logo">
          </a>
        </div>

        <div class="uk-width-expand">
          <nav class="breadcrumb">
          <span v-for="(crumb, index) in breadcrumb" :key="index">
            <router-link v-if="crumb.path" :to="crumb.path">{{ crumb.name }}</router-link>
            <span v-else>{{ crumb.name }}</span>
            <span v-if="index < breadcrumb.length - 1" class="breadcrumb-separator"> > </span>
          </span>
          </nav>
        </div>

      </div>
    </div>
  </header>
</template>

<style scoped>
.breadcrumb {
  font-size: 0.95rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.breadcrumb a {
  text-decoration: none;
  color: #007BFF;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.3rem;
  color: #888;
}
</style>