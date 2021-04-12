<template>
  <!--是否行内表单-->
  <el-form
    :inline="inline"
    :model="form"
    :rules="rules"
    ref="form"
    label-width="100px"
  >
    <!--标签显示名称-->
    <el-form-item
      v-for="item in formLabel"
      :key="item.model"
      :label="item.label"
      :prop="item.model"
    >
      <!--根据type来显示是什么标签-->
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'userName'"
        class="test" 
      ></el-input>
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'userAge'"
        @keyup.native="onlyInteger"
         class="test"
      ></el-input>
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'userId'"
         class="test"
      ></el-input>
      <!-- <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'select' && item.model == 'keyword'"
         class="test"
      ></el-input> -->
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'userSalary'"
        @keyup.native="onlyNum"
         class="test"
      ></el-input>
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'name'"
        
        minlength="3"
        maxlength="40"
      ></el-input>
      <el-input
        v-model.number="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'age'"
        @keyup.native="onlyInteger"
        minlength="1"
        maxlength="2"
      ></el-input>
      <el-input
        v-model="form[item.model]"
        :placeholder="'请输入' + item.label"
        v-if="item.type === 'input' && item.model == 'salary'"
        @keyup.native="onlyNum"
        maxlength="8"
      ></el-input>
      <el-select
        v-model="form[item.model]"
        placeholder="请选择"
        v-if="item.type === 'add'"
        class="test"
      >
        <!--如果是select或者checkbox 、Radio就还需要选项信息-->
        <el-option
          v-for="item in item.opts"
          :key="item.dname"
          :label="item.dname"
          :value="item.did"
        ></el-option>
      </el-select>
      <el-select
        v-model="form[item.model]"
        placeholder="请选择"
        v-if="item.type === 'search'"
        class="test"
      >
        <!--如果是select或者checkbox 、Radio就还需要选项信息-->
        <el-option
          v-for="item in item.opts"
          :key="item.dname"
          :label="item.dname"
          :value="item.dname"
        ></el-option>
      </el-select>
      <!-- <el-switch v-model="form[item.model]" v-if="item.type === 'switch'"></el-switch>
            <el-date-picker v-model="form[item.model]" type="date" placeholder="选择日期" v-if="item.type === 'date'" value-format="yyyy-MM-dd"> </el-date-picker> -->
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  //inline 属性可以让表单域变为行内的表单域
  //form 表单数据 formLabel 是标签数据
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array,
  },
  data() {
        var regNum = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0123456789]/g;
        var regSp = /^\s+$/g;
        var regString = /[^\d]/g;
        var checkAge = (rule, value, callback) => {
            if (!value) {
                callback(new Error('年龄不能为空'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('年龄必须为数字'));
            }
            if (value < 0) {
                callback(new Error('年龄不能为负数'));
            }
            callback()
        };
        var checkName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('姓名不能为空'))
            }
            if (regSp.test(value)) {
                callback(new Error('姓名不能为空'));
            }
            if (regNum.test(value)) {
                callback(new Error('姓名不能输入数字或特殊字符'));
            }
            if(value.length<2){
              callback(new Error('姓名长度至少为 2 位'))
            }
            callback()
        };
        var checkDept = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择一个部门'))
            }
                        callback()

        };
        var checkSalary = (rule, value, callback) => {
            if (!value) {
                callback(new Error('薪水不能为空'))
            }
            if (value < 0) {
                callback(new Error('薪水不能为负数'))
            }
            if ((parseFloat(value).toString() == "NaN")) {
                callback(new Error('薪水必须为数字'))
            }
                        callback()

        };
        return {
            rules: {
                age: [
                    { validator: checkAge, required: true }
                ],
                name: [
                    { required: true, validator: checkName }
                ],
                did: [
                    { required: true, validator: checkDept }
                ],
                salary: [
                    { required: true, validator: checkSalary },

                ]
            },
        }
    },
        methods:{
            
            //限制输入特殊字符和数字
            onlyChianeseEn(e){
                e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、0123456789]/g,"");
                e.target.value = e.target.value.replace(/^\s+$/g,"");
            },
            //只能输入浮点型
            onlyNum(e){
               e.target.value = e.target.value.replace(/[^\d.]/g, "").replace(/\.{2,}/g, '.').replace(/^\./g,"").replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
            },
            //只能输入数字
            onlyInteger(e){
                e.target.value = e.target.value.replace(/[^\d]/g,"");
            },
                
        }
};
</script>
<style lang="scss">
.el-form-item__label {
  width:fit-content !important;
}
.el-form-item__content{
  margin-right: 25px;
}
.test{
  width: 120px !important;
}
</style>