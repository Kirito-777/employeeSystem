<template>
  <div class="abc">
    <form action="" id="formFile" class="up">
      <h2 class="sp">批量上传员工数据</h2>
      <el-button>
        <input type="file" name="fileInput" ref="refFile" style="background-color: #fff">
      </el-button> <br> <br>
      <el-button type="primary" class="bt" size="medium" @click="goFile" >上传<i class="el-icon-upload el-icon--right"></i></el-button> <br> <br><br> <br>
      <span>提示：只支持上传.xls文件</span>                    
    </form>                 
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'UploadFile',
    methods: {
      // 文件上传
      goFile(){
        var formData = new FormData();
        var formObj = new FormData(document.getElementById("formFile"));
        // console.log(formObj.get("fileInput"));
        formData.append("file",formObj.get("fileInput"));
        formData.append("name",2);

        //拿到file对象
        //    console.log(formData.get("file"));
        var value = formData.get("file");
        // console.log(value);
        axios({
          url: "http://localhost:8088/staffManage/readfile",
          method: "put",
          data: formData
        })
        .then((res) => {
          // console.log(res.data);
          // console.log(res.data);
          if(res.data.code==100){
            var str = res.data.msg+"\r\n"+res.data.data.msg;
            alert(str);       
          }else{
            var lenght = res.data.data.name.length;  
            if(lenght==0){                                    
              this.$message({
                type: "success",
                message: "数据插入成功",
              })
              document.getElementById("formFile").reset()
            }else{
              var strName = "";
              for(var i=0; i<lenght;i++){
                strName = strName + res.data.data.name[i] + ",";
              }
              strName += "已存在，以上数据插入失败！";
              alert(strName);
              document.getElementById("formFile").reset()
            }
          }
                            
        }
        ).catch((reject) => {
          this.$message({
            type: "error",
            message: "上传出错,请上传.xls文件！",
          })
          document.getElementById("formFile").reset()
        })             
      }
    }
  }
</script>

<style>
 .abc {
   position: relative;
   width: 100%;
   height: 100%;
   /* top: 3%; */
   /* left: 50%; */
   /* transform: translateX(50%); */
   /* text-align: center; */
   background-color: #f6f7f8 !important;
   /* box-shadow:0px 0px 2px #303642; */
 }
 .up {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   /* transform: translateX(50%); */
   text-align: center;
   width: 40%;
   height: 45%;
   box-shadow:0px 0px 5px #303642;
   background-color: white;
   /* border-radius: 3%; */
 }
 /* .in {
   background-color: #fff !important;
 } */
 .bt {
   top: 3%;
 }
</style>