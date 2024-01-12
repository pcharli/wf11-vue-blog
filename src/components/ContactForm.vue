<template>
  <div class="contact-form">
    <form action="" @submit.prevent="formuler">
      <label for="">Nom:</label>
      <input type="text" v-model="newContact.name" />
      <label for="">Email:</label>
      <input type="email" v-model="newContact.email" />
      <button>Envoyer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const newContact = ref({
  name: '',
  email: ''
})
const emit = defineEmits(['soumettre'])
const formuler = () => {
  //alert('test')
  emit('soumettre', newContact.value)
}
</script>

<style scoped></style>
