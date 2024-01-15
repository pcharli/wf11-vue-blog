<template>
    <li  class="comments-item" >
    {{ comment.label }} <span v-if="auteurC">par {{ auteurC.pseudo }}</span></li>
</template>
<script setup>
import { useBlogStore } from '@/stores/blog.js'
import { computed } from 'vue'
const blogStore = useBlogStore()

const auteurC = computed(() => {
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
