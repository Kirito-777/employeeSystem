<template>
  <div class="home-con">
    <h2 class="home-label">欢迎用户  {{username}}、</h2>
    <h2 class="sys">进入员工管理系统!</h2>
    <div class="d-label">
      <h3>系统运用技术的介绍：</h3>
      <p class="p1">前端：主要使用vue搭配element-ui</p>
      <p class="p1">后端：主要使用ssm框架</p>
      <p class="p1">数据库：mysql</p>
    </div>
    <img src="@/assets/home-img.jpg" alt="" class="h-img">
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        username: sessionStorage.getItem("username")
      }
    }
  }
</script>

<style>
  .home-con {
    position: relative;
    width: 100%;
    height: 100%;
    /* width: 200px; */
  }
  .home-label {
    position: absolute;
    top: 3%;
    left: 5%;
  }
  .sys{
    position: absolute;
    top: 10%;
    left: 8%;
    /* color: red; */
  }
  .d-label {
    position: absolute;
    top: 25%;
    left: 5%;
    width: 30%;
  }
  .p1 {
    margin-left: 8%;
  }
  .h-img {
    position: absolute;
    right: -10%;
    width: 80%;
    height: 100%;
  }
</style>