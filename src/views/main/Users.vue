<template>
  <div class="users-table">
        <el-form inline label-width="80px" class="noform" >
          <el-form-item label="">
            <el-input type="text" v-model="username" placeholder="输入搜索条件"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"  @click="searchUser">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!--stripe	是否为斑马纹  v-loading在请求数据未返回的时间有个加载的图案,提高用户体验-->
        <el-table :data="table" height="100%"  stripe v-loading="config.loading">
            <!--第一行为序号 默认写死-->
            <el-table-column label="序号" >
                <!--slot-scope="scope" 这里取到当前单元格,scope.$index就是索引 默认从0开始这里从1开始-->
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ (config.page - 1) * 7 + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="id" sortable
              >
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名" sortable
              >
            </el-table-column>
            <el-table-column
              prop="realname" sortable
              label="真实姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别" sortable>
            </el-table-column>
            <el-table-column
              prop="power"
              label="权限" sortable>
            </el-table-column>
            <!--操作-->
            <el-table-column label="操作" min-width="180">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.power === pow1" size="min" type="primary" @click="addpower(scope.row)">设为管理员</el-button>
                    <el-button v-if="scope.row.power === pow2" size="min" type="warning" @click="addpower(scope.row)">设为用户</el-button>
                    <el-button size="min" type="danger" @click="Delete(scope.row)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination class="pager" layout="total, prev, pager, next, jumper" :total="config.total" :current-page.sync="config.page" @current-change="changePage" :page-size="7"></el-pagination>
        <!-- <el-button type="primary" v-show="isBack" style="margin-left:10% ; margin-top : 15px " @click="back">返回</el-button> -->
    </div>
</template>

<script>
  import axios from 'axios'
// import { delete } from 'vue/types/umd';
  export default {
    name: 'Users',
    mounted() {
      this.getAllusers();
    },
    data(){
      return {
        username: '',
        pow1: '用户',
        pow2: '管理员',
        table: [],
        config: {
          page: 1,
          total: 30,
          loading: false,
        },
        Label: [
          {
            prop: "id",
            label: "id",
          },
          {
            prop: "username",
            label: "用户名",
          },
          {
            prop: "realname",
            label: "真实姓名",
          },
          {
            prop: "sex",
            label: "性别",
          },
          {
            prop: "power",
            label: "权限",
          },
        ]
      }
    },
    methods: {
      reset() {
        this.username = '';
        this.getAllusers();
      },
      getAllusers() {
        let id=sessionStorage.getItem("id")
        // console.log(id);
        axios.post("http://localhost:8088/staffManage/getusers?id="+id).then(res => {
          // console.log(res.data.data.pageInfo.list[2].username);
          // this.table = res.data.data.pageInfo.list[1]
          // console.log(res);
          this.table = res.data.data.pageInfo.list.map((item) => {
                // console.log(item);
                // if(item.username == sessionStorage.getItem("username")){
                //   return ''
                // }
                return item;
              });
          this.config.total = res.data.data.pageInfo.total;
          this.config.loading = false;
        }).catch(res => {
          console.log("读取失败");
        })
      },
      changePage(page) {
        axios.post("http://localhost:8088/staffManage/getusers?page="+page).then(res => {
        
        this.table = res.data.data.pageInfo.list.map((item) => {
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
      Delete(row) {
        this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let id = row.id;
            // console.log(typeof id);
            axios({
              method: "post",
              url: "http://localhost:8088/staffManage/deleteuser?id=" + id,
              
            })
              .then((res) => {
                console.log(res.data);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.changePage(1);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      addpower(row) {
        if(row.power == "用户"){
          row.power = "管理员"
        }else {
          row.power = "用户"
        }
        // console.log(row);
        axios.post('http://localhost:8088/staffManage/updateinfo', row).then(res => {
            if(res.data.code == 200){ //代表添加成功
              this.$message({
                type: "success",
                message: "修改成功！",             
              });
            }else{
              this.$message({
                type: "warning",
                message: "修改失败!",             
              });
            }                                 
          })
      },
      searchUser() {
        // console.log(this.username);
        if(this.username !== '') {
          axios.post("http://localhost:8088/staffManage/getuser?username="+this.username).then(res => {
            this.table = res.data.data.pageInfo.list.map((item) => {
              return item;
            });
            this.config.total = res.data.data.pageInfo.total;
            this.config.loading = false;
          }).catch(res => {
            this.$message({
                type: "error",
                message: "没有找到该用户!",             
              });
          })
        }else{
          this.getAllusers();
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>
    .users-table {
        height: calc(92% - 82px);
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
    .el-table{
        height: 100% !important;
    }
</style>