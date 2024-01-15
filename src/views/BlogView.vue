<template>
  <div class="blog">
    <h1>This is the blog page</h1>
    <OnePost v-for="(pos, key) in posts" :post="pos" :index="key" :key="key"></OnePost>
    <hr />
    <AddPostForm v-if="user.role == 'admin'" @addPost="addPost"></AddPostForm>
  </div>
</template>

<script setup>
import router from '@/router'
import { useBlogStore } from '@/stores/blog.js'
import routeur from '@/router/index.js'
import { ref, computed } from 'vue'
import OnePost from '@/components/OnePost.vue'
import AddPostForm from '@/components/AddPostForm.vue'

const blogStore = useBlogStore()
//secure
const user = ref(blogStore.theUser)
if (!user.value.pseudo) {
  router.push('/')
}
blogStore.postsGet()

const posts = computed(() => {
  return blogStore.allPosts
})

const addPost = (newPost) => {
  blogStore.addPost(newPost)
}
</script>
<style></style>
