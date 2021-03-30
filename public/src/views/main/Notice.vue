<template>
  <div class="notice">
    <el-form inline label-width="80px" class="noform" ref="searchnotice" :model="searchnotice">
      <el-form-item >
        <el-button type="primary" @click="addnotice" :disabled="trueFalse">添加</el-button>
      </el-form-item>
      <el-form-item label="公告id" prop="nid" >
        <el-input type="text" v-model="searchnotice.nid" class="inp" placeholder="请输入公告id"></el-input>
      </el-form-item>
      <el-form-item label="发布人" prop="username">
        <el-input type="text" v-model="searchnotice.username" class="inp" placeholder="请输入发布人"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input type="text" v-model="searchnotice.title" class="inp" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="text" v-model="searchnotice.content" class="inp" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" prop="time">
        <el-date-picker
          v-model="searchnotice.time"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions" class="inp">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="notice"
    height="100%"
    stripe 
    style="width: 100%"
    v-loading="config.loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div >
            <el-card class="box-card">
              <div slot="header" >
                <span style="font-size: 20px; text-align: center">{{props.row.title}}</span><br>
                <span style="font-size: 5px">{{props.row.time}}</span>
              </div>
              <div class="text item">
                <span>&nbsp;&nbsp;&nbsp;{{props.row.content}}</span>
              </div>
            </el-card>
          </div>
          <!-- <el-form label-position="left"  class="demo-table-expand">
            <el-form-item label="公告id">
              <span>{{ props.row.nid }}</span>
            </el-form-item>
            <el-form-item label="发布人">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.time }}</span>
            </el-form-item>
          </el-form> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="nid"
        label="公告id" sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="username"
        label="发布人" sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="title" sortable
        label="标题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="content" show-overflow-tooltip
        label="内容" sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="time" sortable
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="min" type="info" @click="editNotice(scope.row)" :disabled="trueFalse">编辑</el-button>
          <el-button size="min" type="danger" @click="deleteNotice(scope.row)" :disabled="trueFalse">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!--分页-->
  <el-pagination class="pager" layout="total, prev, pager, next, jumper" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="7"></el-pagination>
    <!-- <div v-for="item in notice" :key="item.value" class="con">
      <el-card class="box-card">
        <div slot="header" >
          <p>{{item.title}}</p>
          <span style="font-size: 5px">{{item.time}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <div  class="text item">
          <span>{{item.content}}</span>
        </div>
      </el-card>
    </div> -->
    <el-dialog
        :title="title"
        :visible.sync="isShow"
        :destroy-on-close="true"
        :show-close="true"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :before-close="cancel"
        class="dialog"
      >
        <el-form 
                  label-width="100px" 
                  ref="noticetable" 
                  :model="noticetable">
          <el-form-item label="标题" prop="title">
            <el-input type="text"  v-model="noticetable.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" :rows="5" v-model="noticetable.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submitNotice">确定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    
  </div>
  
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Notice',
    data() {
      return {
        // inline: false,
        trueFalse: sessionStorage.getItem("trueFalse") == "false",
        title: '',
        isShow: false,
        data: '',
        notice: [],
        config: {
          page: 1,
          total: 30,
          loading: false,
        },
        noticetable: {
          nid: '',
          username: '',
          title: '',
          nId: '',
          content: '',
          time: '',
        },
        searchnotice: {
          nid: '',
          username: '',
          title: '',
          nId: '',
          content: '',
          time: '',
          // user: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },      
      }
    },
    mounted() {
      this.getnotices();
    },
    methods: {
      getnotices() {
        axios.post("http://localhost:8088/staffManage/getnotices").then(res => {
          // console.log(res.data);
          this.notice = res.data.data.pageInfo.list.map((item) => {  
            // item.time.setTime(timestamp3 * 1000).toDateString();
            return item;
          });
          this.config.total = res.data.data.pageInfo.total;
          this.config.loading = false;    
        }).catch(res => {
          console.log("读取失败");
        })
      },
      editNotice(row) {
        this.title = '修改公告';
        this.isShow = true;
        this.noticetable = row;
      },
      cancel() {
        this.isShow = false;
        this.getnotices();
        // this.noticetable = "";
      },
      submitNotice() {
        console.log(this.noticetable);
        if(this.title == '修改公告') {
          axios.post("http://localhost:8088/staffManage/updatenotice",this.noticetable).then(res => {
            // console.log("修改成功");
            this.isShow = false;
            this.getnotices();
          }).catch(res => {
            // console.log("修改失败");
          })
        }else {
          this.noticetable.username =sessionStorage.getItem('username');
          this.noticetable.nId =sessionStorage.getItem('id');
          this.noticetable.time =sessionStorage.getItem('time');
          axios.post("http://localhost:8088/staffManage/addnotice",this.noticetable).then(res => {
            console.log("添加成功");
            this.isShow = false;
            this.getnotices();
          }).catch(res => {
            console.log("添加失败");
          })
        } 
      },
      deleteNotice(row) {
        this.noticetable = row;
        this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("http://localhost:8088/staffManage/deletenotice",this.noticetable).then(res => {
            // console.log("删除成功");
            this.getnotices();
          }).catch(res => {
            // console.log("删除失败");
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      addnotice() {
        this.title = '添加公告';
        this.isShow = true;
        this.noticetable = {};
      },
      search(){
        // console.log(this.searchnotice.time);
        axios.post("http://localhost:8088/staffManage/searchnotice",this.searchnotice).then(res => {
          this.notice = res.data.data.pageInfo.list.map((item) => {  
            return item;
          });
          this.config.total = res.data.data.pageInfo.total;
          this.config.loading = false;
          if(this.config.total == 0){
            this.$message({
            type: 'warning',
            message: '没有该公告'
            }); 
          }
          }).catch(res => {
            
          })
      },
      changePage(page) {
        axios.post("http://localhost:8088/staffManage/getnotices?page="+page).then(res => {
        
        this.notice = res.data.data.pageInfo.list.map((item) => {
              // console.log(item);
              // if(item.username==sessionStorage.getItem("username")) {
              //   // this.$delete(item) ;
              //   return null
              // }else{
              //   return item;
              // }
              return item;
            });
        this.config.total = res.data.data.pageInfo.total;
        this.config.loading = false;
      }).catch(res => {
        console.log("读取失败");
      })
      },
    }
  }
</script>

<style lang="scss" scoped>
    .notice {
        height: calc(91.5% - 82px);
        margin: 10px 10px;
        position: relative;
        .pager {
            margin-top: 15px;
            position: absolute;
            left: 50%;
            height: 10% !important;
            // transform: translate(-50%,-50%);
            margin-left: -320px;
        }
    }
  /* .in {
    left: 150px;
  }
  .bt {
    margin-left: 150px;
  } */
  .demo-table-expand {
    font-size: 20px;
    margin-left: 40%;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  /* .demo-table-expand .el-form-item {
    margin-right: 50%;
    margin-bottom: 0;
    width: 50%;
  } */
  .inp{
    width: 130px !important;
  }
</style>