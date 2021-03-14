import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

const Login = () => import('../components/Login')
const Register = () => import('../components/Register')
const Main = () => import('../components/Main')

const Home = () => import('../views/main/Home')
const Management = () => import('../views/main/Management')
const Personal = () => import('../views/main/Personal')
const UploadFile = () => import('../views/main/UploadFile')
const Users = () => import('../views/main/Users')
const Dept = () => import('../views/main/Dept')
const Notice = () => import('../views/main/Notice')

//2.创建路由对象
const routes = [
  {
    path:'/',
    redirect:'/Login'
  },
  {
    path:'/Login',
    component:Login
  },
  {
    path:'/Register',
    component:Register
  }
  ,
  {
    path:'/Main',
    component:Main,
    children: [{
      path:'/',
      name:'Home',
      component:Home
    },{
      path:'/Home',
      name:'Home',
      component:Home
    },{
      path:'/Management',
      name:'Management',
      component:Management
    },{
      path:'/Personal',
      name:'Personal',
      component:Personal
    },{
      path:'/UploadFile',
      name:'UploadFile',
      component:UploadFile
    },{
      path:'/Users',
      name:'Users',
      component:Users
    },{
      path:'/Dept',
      name:'Dept',
      component:Dept
    },{
      path:'/Notice',
      name:'Notice',
      component:Notice
    }]
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

//3.导出router 
export default router