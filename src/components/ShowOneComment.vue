<!-- utilisé pour afficher un comment et son auteur -->
<template>
    <li  class="comments-item" >
    <!-- auteur est la computed -->
    {{ comment.label }} <span v-if="auteur">par {{ auteur.pseudo }}</span></li>
</template>
<script setup>
//import du store
import { useBlogStore } from '@/stores/blog.js'
import { computed } from 'vue'
//activation du store
const blogStore = useBlogStore()

//recup de l'auteur du comment affiché
const auteur = computed(() => {
    return blogStore.userById(props.comment.auteur)
})
const props = defineProps({
  comment: {
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
</style>
