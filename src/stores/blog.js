import { defineStore } from 'pinia'
import router from '@/router'

export const useBlogStore = defineStore({
    id: 'blog',
    state: () => ({
        userDev: {
            "_id": "10",
            "pseudo": "test",
            "role": "admin"
        },
        user: {},
        urlApi: "https://ingrwf11-f226b-default-rtdb.europe-west1.firebasedatabase.app/",
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
        }
    },
    actions: {
        async identUser(login) {
            await fetch(this.urlApi+'users.json')
            .then(resp => resp.json())
            .then(resp => {
                //console.log(resp)
                const theUser = resp.filter(user => user.pseudo == login)
                if(theUser.length > 0) {
                    this.user = theUser[0]
                    router.push('/blog')
                } else {
                    this.errorUser = true
                }
            })
            .catch(err => console.log(err))
        },
        async postsGet() {
            await fetch(this.urlApi+'posts.json')
            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                this.posts = resp
            })
            .catch(err => console.log(err))
        },
        addPost(newPost) {
            newPost.auteur = this.user._id
            newPost._created = new Date().toLocaleDateString('en-US')
            this.posts.push(newPost)
            this.updateApi()
        },
        updateApi() {
            fetch(this.urlApi + 'posts.json', {
                method: "put",
                body: JSON.stringify({ ...this.posts}),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(resp => resp.json())
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
        }
    }

})
