<template>
  <p><a href="" @click.prevent="$router.go(-1)">Retour</a></p>
  <OnePostDetails @addcomment="addComment" :post="thepost"></OnePostDetails>
</template>

<script setup>
// appel des fonctions du router
import { useRoute, useRouter } from 'vue-router'
//intégration du store
import { useBlogStore } from '@/stores/blog.js'

import OnePostDetails from '@/components/OnePostDetails.vue'
//activation des fonctions du router
const route = useRoute()
const router = useRouter()

//affichage de l'id du post, paramètre passé dans la route (url)
const num_post = route.params.idpost
//console.log(num_post)

// activation du store
const blogStore = useBlogStore()

// recup des Articles
//blogStore.postsGet()

//recup de l'article qui corresponde à l'id dans l'url
const thepost = blogStore.onePost(num_post) //getter avec attribut

//add comment en récup de commet et passant l'index du post
const addComment = (newComment) => {
  blogStore.addComment(newComment, num_post)
}
</script>
