<script setup></script>

<template>
  <main>
    <form action="" @submit.prevent="identification" class="login">
      <div class="field">
        <label for="" class="label">Pseudo</label>
        <div class="control">
          <input type="text" class="input" v-model.lazy="pseudo" />
        </div>
      </div>

      <div class="field has-text-centered">
        <button class="button is-danger">S'identifier</button>
      </div>
      <p class="message" v-if="errorUser">Erreur de login</p>
    </form>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
//import du store
import { useBlogStore } from '@/stores/blog.js'
// activation du store
const blogStore = useBlogStore()
//recup de pseudo tapé dans l'input
const pseudo = ref('')
//ecoute de errorUser (pour affichage du message d'erreur)
const errorUser = computed(() => {
  return blogStore.theErrorUser
})
//appel de l'action "identification" en passant le pseudo saisi
const identification = () => {
  blogStore.identUser(pseudo.value)
}
</script>
