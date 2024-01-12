<template>
    <h1>Infos</h1>
    <p>Affichage du post n° {{ num_post }}</p>
    <p><a href="" @click.prevent="$router.go(-1)">Retour</a></p>
    <OnePostDetails :post="thepost"></OnePostDetails>
</template>

<script setup>
import { ref, computed } from 'vue'
import {useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog.js'
import OnePostDetails from '@/components/OnePostDetails.vue';
  const route = useRoute()
  const router = useRouter()
  //const router = useRouter()
  //affichage de l'idproduits, paramètre passé dans la route (url)
 const num_post = route.params.idpost
 console.log(num_post)

const blogStore = useBlogStore()
blogStore.postsGet()
const thepost = computed(() => {
  return blogStore.onePost(num_post) //getter avec attribut
})



</script>