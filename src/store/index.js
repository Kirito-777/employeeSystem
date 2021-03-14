import vue from 'vue'
import Vuex from 'vuex'
import perState from 'vuex-persistedstate'

vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    a: 1,
    username: sessionStorage.getItem("username"),
    user: {
      id: '',
      username: '',
      password: '',
      realname: '',
      sex: ''
    }
  },
  mutations:{
    
  },
  actions:{

  },
  getters:{
    
  },
  modules:{
    
  },
  plugins: [perState ()]
})

export default store