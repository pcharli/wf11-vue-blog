<template>
  <div class="contact">
    <h1>This is the contact page</h1>
    <ContactForm @soumettre="newContact"></ContactForm>
  </div>
</template>

<script setup>
import ContactForm from '@/components/ContactForm.vue'

const newContact = (infos) => {
  console.log(infos.name)
}
</script>

<style></style>
