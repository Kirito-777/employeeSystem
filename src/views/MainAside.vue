<template>
  <el-col class="aside">
    <el-menu
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      close=""
      >
      <el-menu-item index="Home" @click="TabBtn1">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="Management" @click="TabBtn2" >
        <i class="el-icon-s-check"></i>
        <span slot="title">员工信息</span>
      </el-menu-item>
      <el-menu-item index="UploadFile" @click="TabBtn4" v-if="trueFalse">
        <i class="el-icon-upload" ></i>
        <span slot="title">批量上传</span>
      </el-menu-item>
      <el-menu-item index="Dept" @click="TabBtnDept" v-if="trueFalse">
        <i class="el-icon-notebook-2" ></i>
        <span slot="title">部门管理</span>
      </el-menu-item>
      <el-menu-item index="Notice" @click="TabBtnNotice">
        <i class="el-icon-s-comment" ></i>
        <span slot="title">系统公告</span>
      </el-menu-item>
      <el-menu-item index="Users" @click="TabBtnUsers" v-if="trueFalse" >
        <i class="el-icon-s-custom" ></i>
        <span slot="title">系统用户</span>
      </el-menu-item>
      <el-menu-item index="Personal" @click="TabBtnPer">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name: 'MainAside',
    data() {
      return {
        trueFalse: sessionStorage.getItem("trueFalse") == "true",
      }
     
    },
    Create() {
      this.btn1()
    },
    methods: {
      TabBtn1() {
        this.$router.push("/Home");
      },
      TabBtn2() {
        this.$router.push("/Management");
      },
      TabBtnPer() {
        this.$router.push("/Personal");
      },
      TabBtn4() {
        this.$router.push("/UploadFile");
      },
      TabBtnUsers() {
        this.$router.push("/Users");
      },
      TabBtnDept() {
        this.$router.push("/Dept");
      },
      TabBtnNotice() {
        this.$router.push("/Notice");
      }
    }
  }
</script>

<style>
  .aside {
    width: 100%;
    height: 100%;
  }
</style>