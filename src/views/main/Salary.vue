<template>
    <div id="myChart"></div>
</template>

<script>
  import axios from 'axios'
  import * as echarts from 'echarts'	// 引入echarts
  export default {
      name: 'Salary',
      data () {
          return {
              emptable1:[],
              myChart: {},
              a: 0,
              echartsOption: {	// echarts选项，所有绘图数据和样式都在这里设置
                  title: {
                      text: '员工薪水在各个区间的分布',
                      left: 'center',
                  },
                  xAxis: {
                      type: 'category',
                      data: ['1-3000', '3001-5000', '5001-8000', '8001-无上限'],   // x轴数据
                      name: '薪水',   // x轴名称
                      nameTextStyle: {	// x轴名称样式
                          // fontWeight: 100,
                          fontSize: 15
                      }
                  },
                  yAxis: {
                    type: 'value',
                    name: '员工数量',   // y轴名称
                    nameTextStyle: {	// y轴名称样式
                        // fontWeight: 600,
                        fontSize: 15
                    }
                  },
                  tooltip: {   //鼠标放到图上的数据展示样式
                      trigger: 'axis'
                  },
                  series: [{  //series中加入每个bar的数据
                    name: '员工数量',
                    type: 'bar',
                    barWidth: '25%',
                    data: [0, 0, 0, 0],
                }],
              }
          }
      },
      activated(){
        // this.draw()
        //  this.$forceUpdate();
      },
      created(){
        // this.draw()
        // myChar.clear()
        //  this.$forceUpdate();
      },
      watch:{
        // a(val, oldVal){
        //     // if()
        //     this.draw();
        // },
        
      },
      mounted () {
        // this.echartsOption.series[0].data[0]=0
        this.draw()
        // this.$nextTick(() => {
        //             setInterval(this.draw, 2000);
        //         })
      },
      destroyed(){
        // this.a=1;
        // this.myChart.resize();
        // console.log(this.myChart);
        // this.echartsOption.series[0].data=[0,0,0,0];
        // console.log(this.echartsOption.series[0].data);
      },
      methods: {
        async draw() {
          //  this.$forceUpdate();
          await axios.post("http://localhost:8088/staffManage/getempAll").then(res => {
            this.echartsOption.series[0].data=[0,0,0,0];
            this.emptable1 = res.data.map((item) => {
              return item;

            });
            localStorage.setItem('emptable',JSON.stringify(this.emptable1));
          })
          let obj = JSON.parse(localStorage.getItem('emptable'));
          for(let i=0; i<obj.length; i++){
            if(obj[i].salary>0 && obj[i].salary<3000){
              this.echartsOption.series[0].data[0]+=1;
            }else if(obj[i].salary>3000 && obj[i].salary<5000){
              this.echartsOption.series[0].data[1]+=1;
            }else if(obj[i].salary>5000 && obj[i].salary<8000){
              this.echartsOption.series[0].data[2]+=1;
            }else{
              this.echartsOption.series[0].data[3]+=1;
            }
            
          }
          this.myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
          this.myChart.setOption(this.echartsOption,true)	// echarts设置选项
      
        }
      }
  }
</script>

<style>
#myChart{
  width: 100%;
  height: 500px;
  margin: 0 auto;
  margin-top: 5%;
}
</style>