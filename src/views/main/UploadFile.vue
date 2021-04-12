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
    <div class="table">
      <p>上传记录</p>
       <el-table :data="filetable" height="100%" border>
            <!--第一行为序号 默认写死-->
            <el-table-column label="序号" >
                <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ (config.page - 1) * 7 + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="filename"
              label="上传文件名" sortable
              >
            </el-table-column>
            <el-table-column
              prop="username" sortable
              label="上传人">
            </el-table-column>
            <el-table-column
              prop="date"
              label="上传日期" sortable>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination class="pager" layout="total, prev, pager, next, jumper" :total="config.total" :current-page.sync="config.page" @current-change="getfiles" :page-size="7"></el-pagination>
    </div>                
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'UploadFile',
    data(){
      return {
        filetable: [],
        table: [],
        file: {
          filename: '',
          username: '',
          date: '',
        },
        config: {
          page: 1,
          total: 30,
          loading: true,
        },
      }
    },
    methods: {
      // 文件上传
      goFile(){
        var formData = new FormData();
        var formObj = new FormData(document.getElementById("formFile"));
        // console.log(formObj.get("fileInput"));
        formData.append("file",formObj.get("fileInput"));
        formData.append("name",2);

        //拿到file对象
        // console.log(formData.get("file"));
        var value = formData.get("file");
        this.file.filename = value.name;
        var a=0;
        // var tal1 = parseInt(this.config.total/7) ;
        // var tal2 = this.config.total%7;
        // if(tal2 != 0){
        //   tal1+=1;
        // }
        // console.log(tal1);
        // for(var d=1; d<tal1; d++){
        //   this.getfiles(d);
          
        // }
        // console.log(this.table);
        
          // console.log(this.table);
        for(var i=0; i< this.table.length; i++){
            // console.log(this.table[i].filename);
            if(this.table[i].filename == value.name){
              // console.log(this.filetable[i].filename);
              alert("已经上传过重复的文件，请重新命名文件！");
              document.getElementById("formFile").reset();
              a=1;
            }
          }
        if(a!=1){
          axios({
          url: "http://localhost:8088/staffManage/readfile",
          method: "put",
          data: formData
        })
        .then((res) => {
          if(res.data.code==100){
            var str = res.data.msg+"\r\n"+res.data.data.msg;
            // alert(str);
            this.$alert(str, '提示', {
              confirmButtonText: '确定',    
            });       
          }else{
            var lenght = res.data.data.name.length;  
            if(lenght==0){                                    
              this.$message({
                type: "success",
                message: "数据插入成功",
              })
              this.postfile();
              document.getElementById("formFile").reset()
            }else{
              var strName = "";
              for(var i=0; i<lenght;i++){
                strName = strName + res.data.data.name[i] + ",";
              }
              strName += "已存在，以上数据插入失败！";
              // alert(strName);
              this.$alert(strName, '上传失败', {
              confirmButtonText: '确定',    
            });
              document.getElementById("formFile").reset()
            }
          }
                            
        }
        ).catch((reject) => {
          // this.$message({
          //   type: "error",
          //   message: "上传出错,请上传.xls文件！",
          // })
          this.$alert("请上传.xls文件！", '上传出错', {
              confirmButtonText: '确定',    
            });
          document.getElementById("formFile").reset()
        })  
        }
                            
      },
      postfile(){
        this.file.username =sessionStorage.getItem('username');
        this.file.date =sessionStorage.getItem('time');
        axios.post("http://localhost:8088/staffManage/addfile",this.file).then(res => {
          console.log("上传成功");
        }).catch(()=>{

        })
      },
      getfiles(page){
        axios.post("http://localhost:8088/staffManage/getfiles?page="+page).then(res => {
        this.filetable = res.data.data.pageInfo.list.map((item) => {  
          return item;
        });
        this.config.total = res.data.data.pageInfo.total;
        this.config.loading = false;
        // console.log(this.filetable[0]);
      }).catch(()=>{

      })
      }
    },
    mounted(){
      this.getfiles(1);
      axios.post("http://localhost:8088/staffManage/getfile?page=1").then(res => {
          // console.log(res.data.data.pageInfo);
            this.table = res.data.data.pageInfo.list.map((item) => {  
              return item;
            });
            // this.config.total = res.data.data.pageInfo.total;
            // this.config.loading = false;
            // console.log(this.filetable[0]);
          }).catch(()=>{

          })
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
   position: absolute;
   top: 15%;
   left: 5%;
   /* transform: translate(-50%,-50%); */
   /* transform: translateX(50%); */
   text-align: center;
   width: 40%;
   height: 60%;
   /* box-shadow:0px 0px 5px #303642; */
   background-color: white;
   /* border-radius: 3%; */
 }
 .table {
   position: absolute;
   top: 12%;
   left: 50%;
   /* transform: translate(-50%,-50%); */
   /* transform: translateX(50%); */
   text-align: center;
   width: 45%;
   height: 60%;
   /* box-shadow:0px 0px 5px #303642; */
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