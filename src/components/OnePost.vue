<!-- utilsé pour afficher un post dans la liste du Blog -->
<template>
  <article class="article section post id-2">
    <h3>{{ post.titre }}</h3>
    <!-- utilisation d'un filtre "dateFr" défini dans main.js -->
    <time datetime="" class="publish-date">Publié le {{ $filters.dateFr(post._created) }}</time>
    <p class="suite">
    <!-- lien "lire la suite" vers la route "details" avec id de l'article -->
      <RouterLink :to="{ name: 'details', params: { idpost: index } }">Lire la suite</RouterLink>
    </p>
  </article>
</template>
<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  post: {
    type: Object
  },
  index: {
    type: Number
  }
})
</script>
<style>
.post {
  border-top: 1px solid black;
}
.suite {
  text-align: right;
  margin-right: 20rem;
}
</style>
