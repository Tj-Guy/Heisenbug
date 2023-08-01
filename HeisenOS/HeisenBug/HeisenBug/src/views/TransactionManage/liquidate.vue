<!-- 清算界面 -->
<template>
    <div class="body">
      <h-card style="margin-top: 2%;">
        <h-card>
          <p slot="title">当前清算日期：</p>
        </h-card>
      <div id="main" style="height:600px;width=1000px;margin-left: 19%;margin-top: 100px;"></div>
      <div class="date">
      </div>
      </h-card>
      <decision/>
    </div>

    
</template>

<script>
//import { Node, Edge } from './flowchart.js'; // 根据实际文件路径调整导入路径
import * as echarts from 'echarts';
export default{
  data(){
    return{
      IfInit:false,
      ReceiveCount:0,
      IfStopTransaction:false,
      DoData:0,
      ExportData:0,
      IfConfirm:false,
    }
  },
  methods:{
    drawChart(){
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      var IfInit=false;
      var ReceiveCount=false;
      var IfStopTransaction=false;
      var DoData=false;
      var ExportData=false;
      var IfConfirm=false;

var originalOption = {
  title: {
    text: '清算流程'
  },
  tooltip: {},
  animationDurationUpdate: 15,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'none',
      symbolSize: 80,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: 0,
      edgeLabel: {
        fontSize: 5
      },
      data: [
        {
          name: '日初始化',
          x: 450,
          y: 100,
          itemStyle:{
            color:'lightgrey'
          }
        },    
        {
          name: '接收行情',
          x: 450,
          y: 250,
          itemStyle:{
            color:'lightgrey'
          },
        },    
        {
          name: '停止当日交易',
          x: 600,
          y: 400,
          itemStyle:{
            color:'lightgrey'
          }
        },    
        {
          name: '导出申请数据',
          x: 600,
          y: 550,
          itemStyle:{
            color:'lightgrey'
          }
        },
        {
          name: '数据汇总',
          x: 450,
          y: 700,
          itemStyle:{
            color:'lightgrey'
          }
        },
        {
          name: '处理确认数据',
          x: 150,
          y: 400,
          itemStyle:{
            color:'lightgrey'
          }
        },
      ],
      // links: [],
      links: [
        {
          source: '日初始化',
          target: '接收行情'
        },
        {
          source: '接收行情',
          target: '停止当日交易'
        },
        {
          source: '停止当日交易',
          target: '导出申请数据'
        },
        {
          source: '导出申请数据',
          target: '数据汇总'
        },
        {
          source: '接收行情',
          target: '处理确认数据'
        },
        {
          source: '处理确认数据',
          target: '数据汇总'
        }
      ],
      lineStyle: {
        opacity: 0.7,
        width: 2,
        curveness: 0
      }
    }
  ]
};

option = JSON.parse(JSON.stringify(originalOption)); // 使用深拷贝保存初始配置
option && myChart.setOption(option);
// 监听节点的点击事件
myChart.on('click', function (params) {
      // 判断点击的是否是节点
      if (params.dataType === 'node') {
        // 执行点击的节点对应的函数
        
        if(params.name==='日初始化'){
          alert('进行日初始化！')
          IfInit=true
          option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
        }else if(params.name==='接收行情'){
          if(IfInit===true){
            alert('开始接收行情！')
            ReceiveCount=true
            option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
          }else{
            alert('请先完成日初始化！')
          }
        }else if(params.name==='处理确认数据'){
          if(ReceiveCount===true&&IfStopTransaction==true){
            alert('正在处理确认数据')
            DoData=true
        option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
          }else{
            alert('请先完成前置步骤(停止交易&接收行情）！')
          }
        }else if(params.name==='导出申请数据'){
          if(IfStopTransaction===true){
            alert('正在导出申请数据')
            ExportData+=1
            option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
          }else{
            alert('请先完成停止当日交易！')
          }
        }else if(params.name==='停止当日交易'){
          if(ReceiveCount===true){
            alert('暂停交易！')
            IfStopTransaction=true
        option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
          }else{
            alert('请先完成接收行情！')
          }
        }else if(params.name==='数据汇总'){
          if(ExportData==true&&DoData==true){
            alert('当日清算完成！')
            IfConfirm=true
            option.series[0].data.forEach(function (node) {
          node.itemStyle.color = node.name === params.data.name ? 'lightgreen' : node.itemStyle.color;
        });
         }else{
            alert('请先完成前置步骤（处理确认数据&导出申请数据）！')
          }
        }
        // 更新图表配置
        myChart.setOption(option);
      }
    });
  },
   
    dayinit(){
      alert('进行日初始化！')
      this.IfInit=true
    },
    receive(){
      if(this.ReceiveCount<3&&this.IfInit){
        alert('开始接受行情！')
        this.ReceiveCount+=1
      }
    },
    dodata(){
      if(this.DoData<3&&this.ReceiveCount>this.DoData){
        alert('正在处理确认数据')
        this.DoData+=1
      }
    },
    exportdata(){
      if(this.ExportData<3&&this.IfStopTransaction){
        alert('正在导出数据')
        this.ExportData+=1
      }
    },
    stoptransaction(){
      if(this.ReceiveCount==3){
      alert('暂停交易！')
      this.IfStopTransaction=true
    }
    },
    confirmdata(){
      if(this.ExportData==3&&this.DoData==3){
      alert('进行数据汇总！')
      this.IfConfirm=true
    }
    },

  },
  mounted(){
    this.drawChart()

  }
}

</script>

<style scoped>

.line{
  text-align: center;
  margin-top: 50px;
}

</style>