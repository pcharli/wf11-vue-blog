import { defineStore } from 'pinia'
import router from '@/router'
//définition du store
export const useBlogStore = defineStore({
  id: 'blog', //identification
  state: () => ({
    userDev: {//user pour dev (évite de devoir se reconnecter tout le temps. 0 renommer en 'user')
      _id: '10',
      pseudo: 'test',
      role: 'admin'
    },
    user: {}, //user connecté
    users: [], //liste des users
    //url de base de FireBase
    urlApi: 'https://ingrwf11-f226b-default-rtdb.europe-west1.firebasedatabase.app/',
    errorUser: false, //error si mauvais pseudo
    posts: null //liste des articles
  }),
  getters: {
    //recup des data user connecté
    theUser: (state) => {
      return state.user
    },
    //recup de l'erreur de connection
    theErrorUser: (state) => {
      return state.errorUser
    },
    //recup de tous les posts
    allPosts: (state) => {
      return state.posts
    },
    //recup d'un post sur son index array
    onePost: (state) => {
      return (index) => state.posts[index]
    },
    //recup d'un user sur son _id
    userById: (state) => {
      return (idP=0) => {
            let theAuteur = state.users.filter(user => user._id == idP)
            //console.log('store '+theAuteur[0].pseudo)
            return theAuteur[0]
        }
    }
  },
  actions: {
    //connexion de l'user sur base de son pseudo
    async identUser(login) {
      await fetch(this.urlApi + 'users.json')
        .then((resp) => resp.json())
        .then((resp) => {
          //crecup de tous les users (utilisés pour afficher le nom de l'auteur d'un post ou d'un comment)
          this.users = resp
          //recup d'un array des users correspondants au pseudo passé
          const theUser = resp.filter((user) => user.pseudo == login)
          //si au moins un user
          if (theUser.length > 0) {
            //on le mémorise dans le store
            this.user = theUser[0]
            //on redirige l'user vers le blog
            router.push('/blog')
          } else {
            //error de login
            this.errorUser = true
          }
        })
        .catch((err) => console.log(err))
    },
    //recup des articles venant de FireBase
    async postsGet() {
      await fetch(this.urlApi + 'posts.json')
        .then((resp) => resp.json())
        .then((resp) => {
          //stockage des articles dans le store

          this.posts = resp
        })
        .catch((err) => console.log(err))
    },
    //add new article
    addPost(newPost) {
      //on ajoute l'_id de l'user courant
      newPost.auteur = this.user._id
      //on ajoute la date du jour
      newPost._created = new Date().toLocaleDateString('en-US')
      //on pousse l'article dans l'array
      this.posts.push(newPost)
      //mise  à jour de FireBase
      this.updateApi()
    },
    //add new comment
    addComment(newComment, post_id) {
      //ajout de l'_id de l'user courant
      newComment.auteur = this.user._id
      //si commenst est de String et vaut "null"
      if(this.posts[post_id].comments == "null") {
        //on crée un array vide
        this.posts[post_id].comments = []
      }
      //on pousse le nouveau commentaire pour l'aticle actif
      this.posts[post_id].comments.push({ ...newComment })
      //actualisation de FireBase
      this.updateApi()
    },
    //mise à jour de FireBase en PUT pour écraser les data
    updateApi() {
      fetch(this.urlApi + 'posts.json', {
        method: 'put',
        body: JSON.stringify({ ...this.posts }),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err))
    }
  }
})
