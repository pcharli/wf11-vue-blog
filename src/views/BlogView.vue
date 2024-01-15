<template>
  <div class="blog">
    <h1>This is the blog page</h1>
    <!-- boucle sur les articles -->
    <OnePost v-for="(pos, key) in posts" :post="pos" :index="key" :key="key"></OnePost>
    <hr />
    <!-- si admin, insert du form pour créer un article -->
    <AddPostForm v-if="user.role == 'admin'" @addPost="addPost"></AddPostForm>
  </div>
</template>

<script setup>
//import du router 
import router from '@/router'
//import du store
import { useBlogStore } from '@/stores/blog.js'
//import routeur from '@/router/index.js'
//import de ref et computed
import { ref, computed } from 'vue'
//import des composants
import OnePost from '@/components/OnePost.vue'
import AddPostForm from '@/components/AddPostForm.vue'

//activation du store
const blogStore = useBlogStore()

//recupération d el'utilisateur connecté
const user = ref(blogStore.theUser)
//redirection si pas de pseudo pour le user connecté
if (!user.value.pseudo) {
  router.push('/')
}

//récupération des articlesdans le stores venant de Firebase via une action asynchrone
blogStore.postsGet()

//récupération des articles venant du store
const posts = computed(() => {
  return blogStore.allPosts
})

//appel d'une action pour ajouter un post suite à un cistom event
const addPost = (newPost) => {
  //création de la propriété "comments" pour qu'elle existe dans FireBase
  newPost.comments = "null"
  //appel de l'action addPost du store en lui passant le nouvel article
  blogStore.addPost(newPost)
}
</script>
<style></style>
