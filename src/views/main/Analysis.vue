<template>
  <div id="myChart"></div>
</template>

<script>
  import axios from 'axios';
  import * as echarts from 'echarts';	// 引入echarts
  export default {
    name: 'Analysis',
    data(){
      return {
        dept: [],
        emptable: [],
        total: 0,
        echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
                title: {
                    text: '部门的员工占比统计',
                    // subtext: '虚构数据',
                    left: 'center'
                },
                legend: {	//图表上方的图例
                    bottom: 10,
                    left: 'center',
                    data: []
                },
                tooltip: {   //鼠标放到图上的数据展示样式
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: [{
                  name: '部门的员工占比',
                  type: 'pie',
                  barWidth: '60%',
                  data: [	// 扇形图数据格式： {value, name}
                  ],
                }],
            },
            
      }
    },
    mounted () {
        if (sessionStorage.getItem("username") == null) {
        this.$message({
          type: "error",
          message: "未登录，不能直接访问员工管理系统！",             
        });
        this.$router.push('/')
        }else{
           
        };
        this.draw();
        // console.log(this.dept);
    },
    methods: {
      async draw(){
        await axios.post("http://localhost:8088/staffManage/getdeptsAll").then(async res => {
          // console.log(res.data);
          for (let item of res.data) {
            await axios({
              method: "post",
              url:
                "http://localhost:8088/staffManage/getemps?page=1",
              data: {
                id: '',
                name: '',
                salary: '',
                age: '',
                dept: {
                  dname: item.dname,
                },
              },
            }).then(res => {
                let js = {};        
                js.name = item.dname;
                js.value=res.data.data.employee.total;  
                this.dept.push(js);
            }).catch(res => {
              let js = {};        
                js.name = item.dname;
                js.value=0;  
                this.dept.push(js);
            });
          }
          localStorage.setItem('dept',JSON.stringify(this.dept));
        }).catch(res => {
          console.log("出错");
        });    
        
        this.ha()
      },
      ha(){
        let obj = JSON.parse(localStorage.getItem('dept'));
        for(let u=0; u<obj.length; u++){
          this.echartsOption.legend.data.push(obj[u].name);
          this.echartsOption.series[0].data.push(obj[u]);
        }
        let myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
        myChart.setOption(this.echartsOption)	// echarts设置选项
      }
    }
  }
</script>

<style>
  #myChart{
    position: absolute;
    width: 100%;
    height: 500px;
    /* margin: 0 auto; */
    margin-top: 5%;
    /* margin-left: 5%; */
  }
</style>