<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="hero is-primary">
    <div class="hero-content">
      <nav class="navbar">
        <RouterLink to="/" class="navbar-item">Home</RouterLink>
        <RouterLink to="/blog" class="navbar-item">Blog</RouterLink>
        <RouterLink to="/contact" class="navbar-item">Contact</RouterLink>
      </nav>
    </div>
  </header>

  <section class="section">
    <RouterView key="base"/>
  </section>
</template>

<style scoped lang="scss"></style>
