import vue from 'vue'
import Vuex from 'vuex'
import perState from 'vuex-persistedstate'

vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    a: 1,
    tab: true,
    tab1: false,
    tabname: '收起菜单',
    username: sessionStorage.getItem("username"),
    amg: sessionStorage.getItem("amg"),
    img: "el-icon-s-fold",
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