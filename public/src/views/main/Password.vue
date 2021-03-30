<template>
  <div class="pass">
    <div class="passfrom">
      <el-form :inline="inline" class="from"
                label-width="100px" 
                :rules="rules"
                ref="userGet" 
                :model="userGet">
                <!-- <h3>密码的修改</h3> -->
        <el-form-item label="原密码" prop="inputPassword" >
          <el-input type="password" name="oldPWD" v-model="userGet.inputPassword" class="in"
            placeholder="输入原密码" show-password @blur="disabledCheck"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="inputNewpassword">
          <el-input type="password" name="newPWD" v-model="userGet.inputNewpassword" class="in"
            placeholder="输入新密码" show-password ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="inputTestpassword"> 
          <el-input type="password" name="testPWD" v-model="userGet.inputTestpassword" class="in"
            placeholder="输入确认密码" show-password @blur="testPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelUser()">取消</el-button>
          <el-button type="primary" @click="submitPassword" :disabled="checkBtn">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Password',
    data() {
      return {
        inline: false,
        checkBtn: true,
        perform: {
          id: sessionStorage.getItem("id"),
          username: sessionStorage.getItem("username"),
          password: sessionStorage.getItem("password"),
          realname: sessionStorage.getItem("realname"),
          sex: sessionStorage.getItem("sex"),
        },
        userGet:{
          inputUsername:"",
          inputPassword:"",          
          inputNewpassword:"",
          inputTestpassword:""       
        },
        UserPost:{
          username:"",
          password:"",                 
        },
        rules: {
          inputPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' },
          ],
          inputNewpassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 3, max: 60, message: '长度在 3 到 60 个字符' }
          ],
          inputTestpassword: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { min: 3, max: 60, message: '长度在 3 到 60 个字符' }
          ],
        }
      }
    },
    methods: {
      //禁止表单提交
      disabledCheck() {
        //如果用户输入的原密码与登陆的密码不一致，不给提交
        if(this.perform.password != this.userGet.inputPassword){
          this.checkBtn = true;
          // alert("您输入的原密码与登陆密码不符...");
          this.$message({
            type:"error",
            message: "您输入的原密码与登陆密码不符！",
          });
          this.userGet.inputPassword = "";
          // this.userGet.inpuTNewpassword = "";
        }else{
          this.checkBtn = false;
        }          
      },
      testPass() {
        if(this.userGet.inputNewpassword != this.userGet.inputTestpassword) {
          this.$message({
            type:"error",
            message: "两次输入密码不一样！",
          });
        }
      },
      //修改密码的提交表单
      submitPassword(){
        //点击确定按钮，表单隐藏
        this.isShow = false;
        this.showPass = false;        
        //给待传输数据赋值
        this.UserPost.username = this.perform.username; 
        this.UserPost.password = this.userGet.inputNewpassword; 
        // console.log(this.UserPost);
        //发送到接口
        
          axios.post('http://localhost:8088/staffManage/updatepwd', this.UserPost).then(res => {
            // console.log(res.data)
            this.isShow = false
            if(res.data.code == 200){ //代表添加成功
              this.$message({
                type: "success",
                message: "修改成功！",             
              });
              sessionStorage.setItem("password", this.UserPost.password);
            }else{
              this.$message({
                type: "warning",
                message: "修改失败,修改密码和原密码相同",             
              });
            }                                 
          })
        
        // 清空表单内容
        this.userGet.inputUsername = "";
        this.userGet.inputPassword = "";
        this.userGet.inputNewpassword = "";
      },
    }
  }
</script>

<style>
  .pass {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f6f7f8 ! important;
  }
  .passfrom {
    position: fixed;
    left:55%;
    top:50%;
    height: 50%;
    background-color: white;
    transform: translate(-50%,-50%);
    width: 60%;
    /* text-align: center; */
  }
  .from {
    margin: 7% 10% 7% 25%;
  }
  .in{
    width: 250px !important;
  }
</style>