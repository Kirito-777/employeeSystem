<template>
  <div class="person">
    <div class="person-main">
      <h2>个人中心</h2>
      <!-- <el-avatar icon="el-icon-user-solid" :size="50"></el-avatar> -->
      <!-- <i class="el-icon-user-solid"></i> -->
      <p>id：{{perform.id}}</p>
      <p>用户名：{{perform.username}}</p>
      <p>真实姓名：{{perform.realname}}</p>
      <p>性别：{{perform.sex}}</p>
      <el-row class="btn">
        <el-button type="primary" @click="infoBtn">编辑信息</el-button>
        <!-- <el-button type="primary" @click="passwordBtn">修改密码</el-button> -->
      </el-row>
    </div>
    <el-dialog
      :title="operateType === 'info' ? '修改用户信息' : '修改用户密码'"
      :visible.sync="isShow"
      :destroy-on-close="true"
      :show-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :before-close="cancelUser"
      class="dialog"
    >
      <el-form :inline="inline"  
                label-width="100px" 
                v-if="showPass" 
                :rules="rules"
                ref="userGet" 
                :model="userGet">
        <el-form-item label="原密码" prop="inputPassword">
          <el-input type="password" name="oldPWD" v-model="userGet.inputPassword"
            placeholder="输入原密码" show-password @blur="disabledCheck"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="inputNewpassword">
          <el-input type="password" name="newPWD" v-model="userGet.inputNewpassword"
            placeholder="输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelUser()">取消</el-button>
          <el-button type="primary" @click="submitPassword" :disabled="checkBtn">确定</el-button>
        </el-form-item>
      </el-form>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUser()">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div> -->
      <el-form :inline="inline"  
                label-width="100px" 
                v-if="showInfo" 
                :rules="rules"
                ref="perform" 
                :model="perform">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="perform.username" @keyup.native="onlyChianeseEn1"
            placeholder="输入新的用户名" ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input type="text" v-model="perform.realname" @keyup.native="onlyChianeseEn"
            placeholder="输入新的真实姓名" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <!-- <el-input type="text" v-model="perform.sex"
            placeholder="输入新的性别" ></el-input> -->
          <el-radio v-model="perform.sex" label="男" value="男" name="sex">男</el-radio>
          <el-radio v-model="perform.sex" label="女" value="女" name="sex">女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelUser">取消</el-button>
          <el-button type="primary" @click="submitInfo" >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
                        
  </div>
  
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Personal',
    data() {
      return {
        checkBtn: true,
        inline: false,
        operateType: 'info',
        isShow: false,
        showPass: false,
        showInfo: false,
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
          inputNewpassword:""        
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
          username: [
            { required: true, message: '请输入您的用户名', trigger: 'blur' },
            { min: 3, max: 40, message: '长度在 3 到 40 个字符' }
          ],
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 40, message: '长度在 2 到 40 个字符'}
          ],
        }
      }
    },
    methods: {
      //限制输入特殊字符和数字
      onlyChianeseEn(e) {
        e.target.value = e.target.value.replace(
          /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0123456789]/g,
          ""
        );
      },

      //限制输入特殊字符
      onlyChianeseEn1(e) {
        e.target.value = e.target.value.replace(
          /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
          ""
        );
      },
      //修改密码按钮
      passwordBtn() {
        this.isShow = true;
        this.showPass = true;
        this.showInfo = false;
        this.operateType = 'pass'
      },
      infoBtn() {
        this.isShow = true;
        this.showInfo = true;
        this.operateType = 'info'
      },
      cancelUser() {
        this.userGet = {};
        this.perform.username = sessionStorage.getItem("username");
        this.perform.realname = sessionStorage.getItem("realname");
        this.perform.sex = sessionStorage.getItem("sex");
        this.isShow = false;
        this.showPass = false;
        this.checkBtn = false;
      },
      //禁止表单提交
      disabledCheck() {
        //如果用户输入的原密码与登陆的密码不一致，不给提交
        if(this.perform.password != this.userGet.inputPassword){
          this.checkBtn = true;
          // alert("您输入的原密码与登陆密码不符...");
          this.$message({
            type:"error",
            message: "您输入的原密码与登陆密码不符...",
          });
          this.userGet.inputPassword = "";
          // this.userGet.inpuTNewpassword = "";
        }else{
          this.checkBtn = false;
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
        console.log(this.UserPost);
        //发送到接口
        
          axios.post('http://localhost:8088/staffManage/updatepwd', this.UserPost).then(res => {
            console.log(res.data)
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

      //修改用户信息的提交表单
      submitInfo(){
        //点击确定按钮，表单隐藏
        this.isShow = false;
        this.showInfo = false;        
        //发送到接口
          axios.post('http://localhost:8088/staffManage/updateinfo', this.perform).then(res => {
            console.log(res.data)
            this.isShow = false
            if(res.data.code == 200){ //代表添加成功
              this.$message({
                type: "success",
                message: "修改成功！",             
              });
              // this.$emit('data',this.perform.username);
              this.$store.state.username = this.perform.username;
              sessionStorage.setItem("username", this.perform.username);
              sessionStorage.setItem("realname", this.perform.realname);
              sessionStorage.setItem("sex", this.perform.sex);
            }else{
              this.$message({
                type: "warning",
                message: "修改失败!",             
              });
            }                                 
          })
      },
    }
  }
</script>

<style>
  .person {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f6f7f8 ;
  }
  .person-main {
    position: fixed;
    left:50%;
    top:52%;
    transform: translate(-50%,-50%);
    width: 30%;
    height: 60%;
    border-radius: 10%;
    text-align: center;
    background-color: #fff;
    box-shadow:0px 0px 15px #303642;
  }
  .person-main p {
    line-height: 35px;
    border-bottom:1px dashed #777;
    border-bottom-width:1px;
    transform: translateX(50%);
    margin-left: 6%;
    width: 200px;
  }
  .btn {
    position: fixed;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%,-50%);
  }

  /* 弹窗 */
  /* .dialog {
    position: fixed;
    left: 50%;
    bottom: 50%;
    transform: translate(50%,50%);
  } */
  .el-form-item__label {
    width:fit-content !important;
  }
  .el-form-item__content{
    margin-right: 10px !important;
  }
</style>