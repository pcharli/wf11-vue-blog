<template>
  <article class="article section post id-2">
    <h3>{{ post.titre }}</h3>
    <p>{{ post.contenu }}</p>
    <p class="auteur">Auteur : {{ auteur.pseudo }}</p>
    <time datetime="" class="publish-date">Publié le {{ $filters.dateFr(post._created) }}</time>
  </article>
  <hr />
  <h3>Commentaires :</h3>
  <ul class="comments">
    <li v-for="(comment, key) in post.comments" class="comments-item" :key="key">
      {{ comment.label }} par 
    </li>
  </ul>
  <hr />
  <h3>Commenter</h3>
  <form action="" @submit.prevent="addComment" class="add-comment">
    <div class="field">
      <div class="control">
        <textarea
          class="textarea"
          id=""
          cols="30"
          rows="2"
          v-model.lazy="newComment.label"
        ></textarea>
      </div>
    </div>
    <div class="field">
      <button class="button">Ajouter</button>
    </div>
  </form>
</template>
<script setup>
import { useBlogStore } from '@/stores/blog.js'
import { ref, computed } from 'vue'
const props = defineProps({
  post: {
    type: Object
  },
  index: {
    type: Number
  }
})
const blogStore = useBlogStore()
//console.log(props.post.auteur)
//à faire
const auteur = computed(() => {
    return blogStore.userById(props.post.auteur)
})

//add comment
const newComment = ref({
  label: '',
  _id: props.post.comments.length + 1
})
const emit = defineEmits(['addcomment'])
const addComment = () => {
  emit('addcomment', newComment.value)
}
</script>
<style>
.post {
  border-top: 1px solid black;
}
</style>
