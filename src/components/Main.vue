<template>
  <div class="container">
    <div class="header">
      <main-header />
    </div>
    <div class="item-container">
      <div class="aside">
        <main-aside />
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import MainHeader from '../views/MainHeader.vue'
  import MainAside from '../views/MainAside.vue'

  export default {
    name: 'Main',
    data() {
      return {
        
      }
    },
    components: {
      MainHeader,
      MainAside,
    },
    beforeCreate() {
      if (sessionStorage.getItem("username") == '') {
        this.$message({
          type: "error",
          message: "未登录，不能直接访问员工管理系统主页！",             
        });
        this.$router.push('/')
        }else{
           
        }       
    },
    // created() {
    //   if(this.$store.state.a == 1){
    //         this.$router.push("/Home"); 
    //         this.$store.state.a+=1;
    //       } 
    // },
    methods: {
      
    }
  }
</script>

<style >
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10%;
    background-color: #45464b;
    /* box-shadow: 0 1px solid grey; */
    color: white;
  }
  .item-container {
    position:fixed;
    top: 10%;
    left: 0;
    width: 100%;
    height: 90%;
  }
  .aside {
    position:fixed;
    left: 0;
    width: 13%;
    height: 90%;
    background-color: #545c64;
    color: white;
  }
  .main {
    position:fixed;
    right: 0;
    width: 87%;
    height: 90%;
  }
</style>