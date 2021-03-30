<template>
  <el-col class="aside">
    <el-button type="text" class="tabbtn" @click="tabbtn">
      <i :class="$store.state.img"></i>
      <span style="font-size: 15px">{{$store.state.tabname}}</span>
    </el-button>
    <el-menu
      :default-active="$route.name"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
      style="border-right: 0 !important"
      :collapse="isCollapse"
      >
      <el-menu-item index="Home" @click="TabBtn1">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span>员工管理</span>
        </template>
        <el-menu-item index="Management" @click="TabBtn2">员工信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2" v-if="trueFalse">
        <template slot="title">
          <i class="el-icon-upload"></i>
          <span>文件上传</span>
        </template>
        <el-menu-item index="UploadFile" @click="TabBtn4">员工信息上传</el-menu-item>
      </el-submenu>
      <el-submenu index="3" v-if="trueFalse">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>部门管理</span>
        </template>
        <el-menu-item index="Dept" @click="TabBtnDept">部门信息</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-comment"></i>
          <span>公告管理</span>
        </template>
        <el-menu-item index="Notice" @click="TabBtnNotice">系统公告</el-menu-item>
      </el-submenu>
      <el-submenu index="5" v-if="trueFalse">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>系统用户</span>
        </template>
        <el-menu-item index="Users" @click="TabBtnUsers">用户管理</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>个人设置</span>
        </template>
        <el-menu-item index="Personal" @click="TabBtnPer">个人中心</el-menu-item>
        <el-menu-item index="Password" @click="TabBtnPass">密码修改</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="Personal" @click="TabBtnPer">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item> -->
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name: 'MainAside',
    data() {
      return {
        isCollapse: false,
        trueFalse: sessionStorage.getItem("trueFalse") == "true",
        // img: this.$store.state.img,
      }
     
    },
    Create() {
      this.btn1();
      // sessionStorage.setItem("img","el-icon-s-fold");
    },
    methods: {
      tabbtn() {
        if(this.$store.state.img == "el-icon-s-fold") {
          this.isCollapse = true;
          this.$store.state.img = "el-icon-s-unfold";
          this.$store.state.tab = false;
          this.$store.state.tab1 = true;
          this.$store.state.tabname = '';
        }else{
          this.isCollapse = false;
          this.$store.state.img = "el-icon-s-fold";
          this.$store.state.tab = true;
          this.$store.state.tab1 = false;
          this.$store.state.tabname = '收起菜单';
        }
      },
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
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
      },
      TabBtnPass() {
        this.$router.push("/Password");
      }
    }
  }
</script>

<style>
  .aside {
    width: 100%;
    height: 100%;
    overflow-x:hidden
  }
  .tabbtn {
    /* position: fixed;
    right: 1%; */
    font-size: 20px;
    margin-left: 21px;
    /* background-color: white; */
    color: white;
  }
</style>