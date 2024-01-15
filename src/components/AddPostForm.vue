<template>
  <h2>Ajouter un article</h2>
  <form action="" @submit.prevent="addPost">
    <div class="field">
      <label for="" class="label">Titre</label>
      <div class="control">
        <input type="text" class="input" v-model.lazy.trim="newPost.titre" />
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Contenu</label>
      <div class="control">
        <textarea class="textarea" v-model.lazy.trim="newPost.contenu"></textarea>
      </div>
    </div>
    <div class="field">
      <button class="button">Ajouter l'article</button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  post: {
    type: Object
  },
  index: {
    type: Number
  }
})

const emit = defineEmits(['addPost'])
const newPost = ref({
  titre: '',
  contenu: ''
})

const addPost = () => {
  emit('addPost', newPost.value)
}
</script>
<style>
.post {
  border-top: 1px solid black;
}
</style>
