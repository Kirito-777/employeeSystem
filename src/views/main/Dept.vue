<template>
  <div class="de">
    <el-button type="primary" class="add" @click="addDept">添加</el-button>
    <el-table
    :data="dept"
    border
    style="width: 100%">
      <el-table-column
        prop="did"
        label="部门号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="dname"
        label="部门"
        width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="fId"
        label="部门号">
      </el-table-column> -->
      <el-table-column
        prop="manage"
        label="主管">
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="min" type="info" @click="editDept(scope.row)">编辑</el-button>
          <el-button size="min" type="danger" @click="delDept(scope.row)" >删除</el-button>
        </template>
      </el-table-column>
  </el-table>

  <el-dialog
      :title="title"
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
                ref="deptinfo" 
                :model="deptinfo">
        <!-- <el-form-item label="id" prop="did">
          <el-input type="text"  v-model="deptinfo.did"
            placeholder="输入部门"></el-input>
        </el-form-item> -->
        <el-form-item label="部门" prop="dname">
          <el-input type="text"  v-model="deptinfo.dname"
            placeholder="输入部门"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门号" prop="fId">
          <el-input type="text"  v-model="deptinfo.fId"
            placeholder="输入部门号"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="主管" prop="manage">
          <el-input type="text"  v-model="deptinfo.manage"
            placeholder="输入主管"></el-input>
        </el-form-item> -->
        <el-form-item label="主管">
          <el-select
            v-model="deptinfo.manage"
            placeholder="请选择"
          >
            <!--如果是select或者checkbox 、Radio就还需要选项信息-->
            <el-option
              v-for="item in emptable"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelUser">取消</el-button>
          <el-button type="primary" @click="submitDept">确定</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Dept',
    data(){
      return {
        title: '',
        inline: false,
        dept: [],
        isShow: false,
        deptinfo: {
          did: '',
          dname: '',
          fId: '',
          manage: '',
        },
        emp: {
          name: '',
          id: '',
          salary: '',
          age: '',
          dept: {
            dname: '',
          },
        },
        emptable: []
      }
    },
    mounted() {
      this.getDept();
      axios.post("http://localhost:8088/staffManage/getempAll").then(res => {
        // console.log(res);
        this.emptable = res.data.map((item) => {
          return item;
        });
      })
    },
    methods: {
      getDept() {
        axios.post("http://localhost:8088/staffManage/getdepts").then(res => {
        this.dept = res.data.map((item) => {  
          return item;
        });
        }).catch(res => {
          console.log("读取失败");
        })
      },
      editDept(row) {
        this.isShow = true;
        this.deptinfo = row;
        this.title = "修改部门信息";
      },
      submitDept() {
        if(this.title == "修改部门信息"){
          axios.post("http://localhost:8088/staffManage/updatedept?page=1",this.deptinfo).then(res => {
            // console.log("修改成功");
            this.isShow = false;
            this.getDept();
          }).catch(res => {
            // console.log("修改失败");
          })
        }else {
          axios.post("http://localhost:8088/staffManage/adddept",this.deptinfo).then(res => {
            // console.log("添加成功");
            this.getDept();
            this.isShow = false;
          }).catch(res => {
            // console.log("添加失败");
          })
        }
        
      },
      cancelUser() {
        this.isShow = false;
      },
      delDept(row) {
        this.deptinfo = row;
        this.$confirm('此操作将永久删除该部门和该部门下的员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post("http://localhost:8088/staffManage/deletedept",this.deptinfo).then(res => {
            this.getDept();
          }).catch(res => {
            
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
      addDept() {
        this.deptinfo = {};
        this.title = "添加部门";
        this.isShow = true;
      }
    }
  }
</script>

<style>
  .de {
    margin: 10px 10px;
  }
  .add{
    margin-bottom: 5px;
  }
</style>