<script setup>
import {ref} from "vue";
import log from 'electron-log/renderer'
const movies = ref([]);
  async function callApi(){
    log.info("callApi()");
    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

    const data = await res.json();
    movies.value = data;
  }
</script>

<template>
  <h1>Page 1</h1>
  <button @click="callApi()" class="uk-button uk-button-primary">Call Api</button>
  <div v-for="movie in movies" :key="movie.title">
    {{ movie.title }}
  </div>
</template>

<style scoped>

</style>