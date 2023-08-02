<!-- 申购-->
<template>
    <div class="function-body">
      <h-card style="margin-top:5%;background-color:rgb(240, 240, 240);" shadow="true">
          <p slot="title">订单修改与查询</p>
        <div class="input-section" style="margin-top:20px display:inline">
          <h-form
        ref="inputInfo"
        :model="inputInfo"
        :label-width="100"
        :rules="ruleValidate">
            <h-form-item label="用户识别码" style="margin-top:50px" prop="c_input_inner_ID">
              <h-row>
                  <h-col offset="0" span="6">
                    <h-input v-model='inputInfo.c_input_inner_ID' @on-change="getCustomerInfo"></h-input>
                  </h-col>
                  <h-col offset="1" span="8">
                    <h-alert type="success" show-icon v-if="cInfo.c_name!=''">用户姓名：{{ cInfo.c_name }}</h-alert>
                    <h-alert type="warning" show-icon v-else>不存在此用户</h-alert>
                  </h-col>
              </h-row>
            </h-form-item>

            <h-form-item label="银行卡号" style="margin-top:50px" prop="c_input_card">
              <h-row>
                <h-col offset="0" span="6">
                    <h-select v-model="inputInfo.c_input_card_id">
                        <h-option
                        v-for="item in cInfo.c_card_list"
                        :value="item.cardId"
                        :key="item.cardId"
                        >{{ item.cardId }}</h-option>
                    </h-select>
                </h-col>
                <h-col offset="1" span="2">
                  <h-button type="primary" icon="search" size="large" @click="handleSubmit('inputInfo')">查询</h-button>
                </h-col>
               </h-row>
           </h-form-item>

          </h-form>
            
        </div>
        <br>
        <h-button type="primary" icon="document-file" size="large" @click="exportdata">导出查询数据</h-button>
        <div class="stream-table" v-if="showTable">
            <h-table
            ref="table"
            height="500"
            stripe
            border
            :columns="columns2"
            :data="transaction_stream"></h-table>
        </div>
      </h-card>
        <div class="confirmation">
                        <h-msg-box
                        title="撤单提示"
                        width="500px"
                        top="150"
                        canDrag=false
                        isOriginal=true
                        v-model="showDetail">
                            <p>操作员:{{ adminInfo.admin_name }}</p>
                            <p>用户内部识别码:{{ cInfo.c_inner_ID }}</p>
                            <p>基金代码:{{ withdrawInfo.f_id }}</p>
                            <p>用户姓名:{{ cInfo.c_name }}</p>
                            <p>操作时间:{{ withdrawInfo.time }}</p>
                            <p>撤单状态:已撤</p>
            </h-msg-box>
        </div>

        
    </div>

    

</template>

<script>
import {findBankCard, GetUserInfo,getFundInfo,cancelOrder } from '../../api/TransactionManage';
import { codeResult } from '../../utils/tools';
export default {
    data(){
        return{
          ruleValidate:{
            c_input_inner_ID: [{ required: true, message: "内部识别码不能为空", trigger: "blur" }],
            c_input_card: [{ required: true, message: "卡号不能为空", trigger: "blur" }],
        },
        showTable:false,
        subtmit:false,
        showDetail:false,
        withdrawInfo:{
            'tradetype':'',
            'f_trade_stream_id':'',
            'f_id':'',
            'time':'',
            'cardid':'',
            'cinnerid':'',
        },
        adminInfo:{
            'admin_name':'大味蕾',
            'admin_id' : '999',
        },
        inputInfo:{
            'c_input_inner_ID' : '',
            'c_input_card_id':'',
        },
        cInfo:{ 
            'c_inner_ID' : '',
            'c_name':'',
            'c_card_list':[],
            'f_id':'666',
            'c_risk_level':3 
        },//伪数据 用户信息
        cardInfo:{
            'c_card':'987654321',
            'card_amount':99999,
        },//伪数据 银行卡信息
        fundInfo:{
            'f_id':'',
            'f_name':'',
            'f_risk_level':0
        },//伪数据 基金信息
        transaction_stream:[
            {   
                'f_transaction_stream_id':2153684,
                'f_id':'987',
                'c_inner_ID':'123',
                'trade_type':'申购',
                'f_transaction_date':'2023-07-29T08:30:00',
                'f_portion':1000,
                'f_time_value':1.87,
                'f_total_value':0,
                'f_status':1,
                
            },
        ],
        columns2: [
        {
          title: "基金代码",
          key: "f_id",
        },
        {
          title: "用户内部识别码",
          key: "c_inner_ID",
        },
        {
          title: "交易类别",
          key: "trade_type",
        },
        {
          title: "交易时间",
          key: "f_transaction_date",
        },
        {
          title: "交易份额",
          key: "f_portion",
        },
        {
          title: "单位净值",
          key: "f_time_value",
        },        
        {
          title: "总净值",
          key: "f_total_value",
        },
        {
          title: "交易状态",
          key: "f_status",
        },
        {
          title: "撤单",
          key: "action",
          fixed: "right",
          render: (h, params) => {
            params.row.f_total_value=params.row.f_time_value*params.row.f_portion
            params.row.trade_type=this.calTradeType(params.row.trade_type)
            params.row.f_status=this.calTradeStatus(params.row.f_status)
            const canWithdraw = this.canWithdrawOrder(params.row.f_transaction_date);
            return h("div", [
              h(
                "h-button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled:!canWithdraw,
                  },
                  on: {
                    click: () => {
                        this.withdrawInfo.f_id=params.row.f_id
                        this.withdrawInfo.cardid=params.row.card
                        cancelOrder({
                          fTradeType:this.withdrawInfo.tradetype,
                          fTradeStreamId:this.withdrawInfo.f_trade_stream_id
                        }).then(res =>{
                        console.log(res);
            if(res.data.resultCode == 1 || res.data.resultCode == 2){
                //将数据写入到本地
                this.showDetail=true
            }
            else
                this.$hMessage.error(codeResult(res.data.resultCode))
      }); 
                    },
                },
                },
                "撤单"
              ),
            ]);
          },
        },
      ],
    }
    },
    methods:{
      getCustomerInfo(){
            //在此处向后端数据库发送请求 以获取用户信息
            GetUserInfo({
                account:this.inputInfo.c_input_inner_ID
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode == 1 || res.data.resultCode == 2){
                //将数据写入到本地
                this.cInfo.c_name=res.data.cName 
                this.cInfo.c_risk_level=res.data.cRiskLevel 
            }
            else
                this.$hMessage.error(codeResult(res.data.resultCode))
      }); 

            findBankCard({
                c_inner_ID:this.inputInfo.c_input_inner_ID
            }).then(res=>{
                console.log(res)
                if(res.data.resultCode == 1 || res.data.resultCode == 2){
                //将数据写入到本地
                for (const [key, item] of Object.entries(res.data.info)) {
                    const temp = {
                        c_card: item.cardId,
                        value: item.value
                    };    
                    this.cInfo.c_card_list.push(temp)
                    }
            }
            else
                this.$hMessage.error(codeResult(res.data.data.resultCode))
            })
        },
        getCustomoerFundInfo(){
            //在此处向后端数据库发送请求 以获取基金信息
            getFundInfo({
                value:this.inputInfo.f_input_id
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode == 1 || res.data.resultCode == 2){
                //将数据写入到本地
                this.fundInfo.f_id=res.data.f_id 
                this.fundInfo.f_name=res.data.f_name
                this.fundInfo.f_risk_level=res.data.f_risk_level
            
            }
            else
                this.$hMessage.error(codeResult(res.data.data.resultCode))
      }); 
        },
        showMsgBox(){
            this.showDetail=true
        },
        //判断能否撤单
        canWithdrawOrder(dateTime) {
            const date = new Date(dateTime); // 将传入的时间参数转换为Date对象
            const dayOfWeek = date.getDay(); // 获取日期对应的星期几

  // 获取今天的日期
            const today = new Date();//当前时间
            const hour = today.getHours(); // 获取日期对应的小时

  //获取上一个border
            const yesterday3PM = new Date(today);
            yesterday3PM.setHours(15, 0, 0, 0);
  
  //今日border
            const border=new Date(today)
            border.setHours(15,0,0,0)
            
            //交易窗口内
          if(hour<15){
            if(dayOfWeek==1){//周一
                yesterday3PM.setDate(yesterday3PM.getDate() - 3);//回溯到周五
            }else if(dayOfWeek==0){//周日
                yesterday3PM.setDate(yesterday3PM.getDate() - 2);//回溯到周五
            }else {//周六
                yesterday3PM.setDate(yesterday3PM.getDate() - 1);//回溯前一天的15:00
            }
            //BORDERS不变
          }else{
            yesterday3PM.setHours(15, 0, 0, 0);//当日的15点
          }


  // 判断是否在可以撤单的时间范围内
  if (date>=yesterday3PM&&date<today) {
    return true;
  } else {
    return false;
  }
},
    exportdata(){
      this.$refs.table.exportCsv({
          filename: this.cInfo.cName+' '+this.inputInfo.c_input_card_id,
        });
    },


    calTradeType(index){
          if(index==1){
            return '申购'
          }
          else{
            return '赎回'
          }
        },
        calTradeStatus(index){
          if(index==1){
            return '未成交'
          }else if(index==2){
            return '已撤单'
          }else{
            return '已成交'
          }
        },

    handleSubmit(name) {
      this.showTable=!this.showTable
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$hMessage.success("提交成功!");
        } else {
          this.$hMessage.error("请检查所填信息!");
        }
      });
    },


    },
    components: {},
    computed:{
        //获取当前时间
        getCurrentTime(){
            return new Date()
        },
    },
    watch: {
  },
};
</script>


<style scoped>
.function-body{
    margin-top: 2%;
    margin-left: 4%;
    display:block;
    width:90%;
}

.function-title{
    display: block;
    text-align: center;
    font-size: xx-large;
}
.input-label{
    font-family: “PingFang SC”;
    font-size: large;
}
</style>
