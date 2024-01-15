import { defineStore } from 'pinia'
import router from '@/router'

export const useBlogStore = defineStore({
  id: 'blog',
  state: () => ({
    userDev: {
      _id: '10',
      pseudo: 'test',
      role: 'admin'
    },
    user: {},
    users: [
      {
        _id: 1,
        pseudo: 'Pierre'
      },
      {
        _id: 2,
        pseudo: 'Marcel'
      },
      {
        _id: 3,
        pseudo: 'Fabi'
      }
    ],
    urlApi: 'https://ingrwf11-f226b-default-rtdb.europe-west1.firebasedatabase.app/',
    errorUser: false,
    posts: null
  }),
  getters: {
    theUser: (state) => {
      return state.user
    },
    theErrorUser: (state) => {
      return state.errorUser
    },
    allPosts: (state) => {
      return state.posts
    },
    onePost: (state) => {
      return (index) => state.posts[index]
    },
    userById: (state) => {
      return (idP=0) => {
            let theAuteur = state.users.filter(user => user._id == idP)
            //console.log('store '+theAuteur[0].pseudo)
            return theAuteur[0]
        }
    }
  },
  actions: {
    async identUser(login) {
      await fetch(this.urlApi + 'users.json')
        .then((resp) => resp.json())
        .then((resp) => {
          //console.log(resp)
          this.users = resp
          const theUser = resp.filter((user) => user.pseudo == login)
          if (theUser.length > 0) {
            this.user = theUser[0]
            router.push('/blog')
          } else {
            this.errorUser = true
          }
        })
        .catch((err) => console.log(err))
    },
    async postsGet() {
      await fetch(this.urlApi + 'posts.json')
        .then((resp) => resp.json())
        .then((resp) => {
          //console.log(resp)
          this.posts = resp
        })
        .catch((err) => console.log(err))
    },
    addPost(newPost) {
      newPost.auteur = this.user._id
      newPost._created = new Date().toLocaleDateString('en-US')
      this.posts.push(newPost)
      this.updateApi()
    },
    addComment(newComment, post_id) {
      newComment.auteur = this.user._id
      if(this.posts[post_id].comments == "null") {
        this.posts[post_id].comments = []
      }
      this.posts[post_id].comments.push({ ...newComment })
      this.updateApi()
    },
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
