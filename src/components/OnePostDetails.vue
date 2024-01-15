<!-- affichage des infos d'un article -->
<template>
  <article class="article section post id-2">
    <h3>{{ post.titre }}</h3>
    <p>{{ post.contenu }}</p>
    <!-- pour le pseudo, usage de la computed -->
    <p class="auteur">Auteur : {{ auteur.pseudo }}</p>
    <!-- utilisaton d'un filtre du main.js -->
    <time datetime="" class="publish-date">Publié le {{ $filters.dateFr(post._created) }}</time>
  </article>
  <hr />
  <!-- si comments n'est pas string  et qu'il y a au moins un comment -->
  <div v-if="typeof(post.comments) != 'string' && post.comments.length > 0">
    <h3>Commentaires :</h3>
    <ul class="comments">
    <!-- utilisation d'un composant pour afficher un comment -->
        <ShowOneComment :comment="comment" v-for="(comment, key) in post.comments" :key="key"></ShowOneComment>
    </ul>
</div>
  
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
//import du store
import { useBlogStore } from '@/stores/blog.js'
import { ref, computed } from 'vue'
import ShowOneComment from '@/components/ShowOneComment.vue'
const props = defineProps({
  post: {
    type: Object
  },
  index: {
    type: Number
  }
})
//activation du store
const blogStore = useBlogStore()

//recup de l'user en utilisant son _id
const auteur = computed(() => {
    return blogStore.userById(props.post.auteur)
})

//recupere data du Form pour new comment
const newComment = ref({
  label: '',
  _id: (props.post.comments.length) ? props.post.comments.length + 1 : 0
})
//définition d'un custom event
const emit = defineEmits(['addcomment'])
//custom event envoyé avec le new comment vers la view DetailsView
const addComment = () => {
  emit('addcomment', newComment.value)
}
</script>
<style>
.post {
  border-top: 1px solid black;
}
</style>
