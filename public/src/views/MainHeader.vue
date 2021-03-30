<template>
  <div class="head">
    <p class="time">{{nowTime}}</p>
    <p class="date">{{nowDate}}</p>
    <h2 class="main-name">员工管理系统</h2>
    <!-- <p class="user-name" @click="go"><i class="el-icon-user-solid"></i>  用户名：{{$store.state.username}}
    <i class="el-icon-arrow-down"></i></p> -->
    <el-popover
      placement="top-start"
      title=""
      width="150"
      trigger="hover"
      @show="show"
      @hide="hide"
      >
      <el-menu class="elmenu">
        <el-menu-item @click="goPer" class="elitem" aria-label="个人中心" >
          个人中心
        </el-menu-item>
        <el-menu-item @click="goPass" class="elitem">
          修改密码
        </el-menu-item>
      </el-menu>
      <el-button type="text" slot="reference" class="user-name">用户名：{{$store.state.username}}<i :class="$store.state.amg"></i></el-button>
    </el-popover>
    <!-- <el-menu class="user-name " background-color="#45464b"
  text-color="#fff">
      <el-submenu index="1" class="user-name el-menu-demo">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户名：{{$store.state.username}}</span>
        </template>
        <el-menu-item index="Users" @click="go">个人中心</el-menu-item>
      </el-submenu>
    </el-menu> -->
    <p class="log-out" @click="logout"><i class="el-icon-switch-button"></i>退出系统</p>
  </div>
</template>

<script>
  export default {
    name: 'MainHeader',
    destroyed() {
      this.clear()
    },
    mounted() {
      this.nowTimes();
    },
    beforeCreate() {
      sessionStorage.setItem("amg","el-icon-caret-bottom")
    },
    data() {
      return {
        // username: sessionStorage.getItem("username")
        nowTime: '',
        nowDate: '',
        amg: sessionStorage.getItem("amg")
      }
    },
    methods: {
      show() {
        this.$store.state.amg = "el-icon-caret-top";
        sessionStorage.setItem("amg","el-icon-caret-top")
      },
      hide() {
        this.$store.state.amg = "el-icon-caret-bottom";
        sessionStorage.setItem("amg","el-icon-caret-bottom")
      },
      goPer() {
        this.$router.push("/Personal");
      },
      goPass(){
        this.$router.push("/Password");
      },
      logout() {
        
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功退出系统!'
          });
          // this.$store.state.username = '';
          sessionStorage.setItem("trueFalse",false);
          this.$router.push("Login");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      },

      //显示当前时间（年月日时分秒）
    timeFormate(timeStamp) {
      // console.log(new Date());
      const date = new Date(timeStamp);
      let year = date.getFullYear();
      let month = date.getMonth() +1;
      month = month < 10 ? "0" + month : month;
      let day =date.getDate();
      day = day < 10? "0" + day : day;
      let hh =date.getHours();
      hh = hh < 10? "0" + hh : hh;
      let mm =date.getMinutes();
      mm = mm < 10? "0" + mm : mm;
      let ss =date.getSeconds();
      ss = ss < 10? "0" + ss : ss;
      this.nowTime = hh+":"+mm+':'+ss;
      this.nowDate = year + "年" + month + "月" + day +"日" ;
      sessionStorage.setItem("time",year+'-'+month+'-'+day)
    },
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,1000);
      this.clear()
    },
    clear(){
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    }
    }
  }
</script>

<style>
  .head {
    position: relative;
  }
  .time {
    position: absolute;
    /* top: 2px; */
    left: 4%;
    font-size: 15px;
  }
  .date {
    position: absolute;
    top: 20px;
    left: 2%;
    font-size: 15px;
    /* transform: translate(-50%,-50%); */
    /* color: white; */
  }
  .main-name {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translate(-50%,-50%);
    /* color: white; */
  }
  .user-name {
    position: fixed;
    font-size: 20px;
    color: white;
    /* background-color: #45464b; */
    right: 8%;
    top: 1.8%;
  }
  .log-out {
    position: fixed;
    right: 1%;
    top: 1.3%;
    padding: 2px 2px;
    font-size: 15px;
    /* border:1px solid #fff; */
    /* border-style:solid; */
  }
  .elmenu {
    border-right: 0 ! important;
    /* width: 10px ! important;
    padding: 0 0 ! important;
    border-right: none; */
  }
  /* .el-header {
    padding: 0  !important;
  } */
  .elitem {
    height: 30px;
    line-height: 30px;
    width: 100px ! important;
    margin: 0 25px ! important;
  }
</style>