<template>
    <article class="article section post id-2">
        <h3>{{ post.titre }}</h3>
        <p>{{  post.contenu }}</p>
        <p class="auteur">{{ post.auteur }}</p>
        <time datetime="" class="publish-date">Publié le {{ $filters.dateFr(post._created) }}</time>
    </article>
    <hr>
    <h3>Commentaires :</h3>
    <ul class="comments">
        <li v-for="(comment, key) in post.comments" class="comments-item" :key="key">{{ comment.label }} par {{ comment.auteur }}</li>
    </ul>
    <hr>
    <h3>Commenter</h3>
    <form action="" class="add-comment">
    <div class="field">
        <div class="control">
        <textarea class="textarea" id="" cols="30" rows="2"></textarea></div>
    </div>
    <div class="field">
    <button class="button">Ajouter</button></div>
    </form>
</template>
<script setup>
const props = defineProps({
    post: {
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