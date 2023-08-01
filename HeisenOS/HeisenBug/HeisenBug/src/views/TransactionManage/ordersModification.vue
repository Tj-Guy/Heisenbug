<!-- 申购-->
<template>
    <div class="function-body">
      <h-card style="margin-top:5%;background-color:rgb(240, 240, 240);" shadow="true">
          <p slot="title">订单修改与查询</p>
        <div class="input-section" style="margin-top:20px display:inline">
          <h-form>
            <h-form-item label="用户内部识别码" style="margin-top:50px">
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
          </h-form>
            
        </div>

        <h-button type="primary" icon="document-file" size="large" @click="exportdata">导出选中数据</h-button>
        <div class="stream-table">
            <h-table
            height="500"
            stripe
            border
            @on-select="selectOne"
            @on-select-all="selectAll"
            @on-selection-change="selectChange"
            @on-select-cancel="selectCancel"
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
export default {
    data(){
        return{
        subtmit:false,
        showDetail:false,
        withdrawInfo:{
            'f_id':'',
            'time':'',
        },
        adminInfo:{
            'admin_name':'大味蕾',
            'admin_id' : '999',
        },
        inputInfo:{
            'c_input_inner_ID' : '123',
            'f_input_id':'',
        },
        cInfo:{ 
            'c_inner_ID' : '123',
            'c_name':'小黑子',
            'c_card_list':['987654321','53425834','4327479807'],
            'f_id':'666',
            'c_risk_level':3 
        },//伪数据 用户信息
        cardInfo:{
            'c_card':'987654321',
            'card_amount':99999,
        },//伪数据 银行卡信息
        fundInfo:{
            'f_id':'987',
            'f_name':'塔姆塔基金',
            'f_risk_level':1
        },//伪数据 基金信息
        transaction_stream:[
            {   
                'f_transaction_stream_id':2153684,
                'f_id':'987',
                'c_inner_ID':'123',
                'transaction_status':'申购',
                'f_transaction_date':'2023-07-29T08:30:00',
                'f_portion':1000,
                'f_time_value':1.87,
                'f_total_value':0,
                
            },
            {   
                'f_transaction_stream_id':2153685,
                'f_id':'954387',
                'c_inner_ID':'123',
                'transaction_status':'申购',
                'f_transaction_date':'2023-07-18T15:30:00',
                'f_portion':13000,
                'f_time_value':27,
                'f_total_value':0,
                
            },
            {   
                'f_transaction_stream_id':2153686,
                'f_id':'91387',
                'c_inner_ID':'123',
                'transaction_status':'赎回',
                'f_transaction_date':'22023-07-10T18:30:00',
                'f_portion':1060,
                'f_time_value':6.8,
                'f_total_value':0,
                
            },
            {   
                'f_transaction_stream_id':2153687,
                'f_id':'981797',
                'c_inner_ID':'123',
                'transaction_status':'申购',
                'f_transaction_date':'2023-07-19T06:30:00',
                'f_portion':2000,
                'f_time_value':2.7,
                'f_total_value':0,
            },
        ],
        columns2: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
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
          key: "transaction_status",
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
          title: "操作",
          key: "action",
          fixed: "right",
          render: (h, params) => {
            params.row.f_total_value=params.row.f_time_value*params.row.f_portion
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
                        this.showDetail=true
                        this.withdrawInfo.f_id=params.row.f_id
                        alert('已经向后端发送撤单数据')
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
        getCustomerInfo(c_input_inner_ID){
            //在此处向后端数据库发送请求 以获取用户信息
        },
        getFundInfo(f_id){
            //在此处向后端数据库发送请求 以获取基金信息
        },
        //检查基金风险等级与用户是否匹配
        checkRiskLevel(){
            if(this.cInfo.c_risk_level>this.fundInfo.f_risk_level)
                this.riskLevelWarning=true; //需要进行风险确认留痕
        },
        //确认交易 向后端post数据
        confirm_transaction(){
            alert('已经向后端发送请求')
        },
        showMsgBox(){
            this.showDetail=true
        },
        checkBuyMount(input,assets){
            let inputA=parseInt(input)
            if (inputA>assets)
                this.invalidAmount=true
        },
        goConfirmation(){
            this.showConfirmation=true
        },
        //判断能否撤单
        canWithdrawOrder(dateTime) {
            const date = new Date(dateTime); // 将传入的时间参数转换为Date对象
            const dayOfWeek = date.getDay(); // 获取日期对应的星期几
            const hour = date.getHours(); // 获取日期对应的小时

  // 获取今天的日期
            const today = new Date();
            today.setHours(0, 0, 0, 0); // 将时间部分设置为00:00:00

  //获取上一个border
            const yesterday3PM = new Date(today);
            yesterday3PM.setHours(15, 0, 0, 0);
            
            if(dayOfWeek==1){//周一
                yesterday3PM.setDate(yesterday3PM.getDate() - 3);//回溯到周五
            }else if(dayOfWeek==0){//周日
                yesterday3PM.setDate(yesterday3PM.getDate() - 2);//回溯到周五
            }else {//周六
                yesterday3PM.setDate(yesterday3PM.getDate() - 1);//回溯前一天的15:00
            }


  // 判断是否在可以撤单的时间范围内
  if (
    // 上一个工作日直到当日
    (date > yesterday3PM && date <= today)
  ) {
    return true;
  } else {
    return false;
  }
},
    cancel(){
        this.showDetail=false
    },
    exportdata(selection){
      alert(selection[0])
      this.$refs.table.exportCsv({
          filename: "选择的数据",
          data:selection
        });
    }
    },
    components: {},
    computed:{
        //获取当前时间
        getCurrentTime(){
            return new Date()
        },
        ableSubmit(){
            
            return true
        },
    calculatedTransactions() {
      return this.transaction_stream.map((transaction) => {
        return {
          ...transaction, // 复制原始对象的属性
          f_total_value: transaction.f_portion * transaction.f_time_value, // 计算f_total_value
        };
      });
    },
    },
    watch: {
    // 监听calculatedTransactions的变化
    calculatedTransactions(newVal) {
      // 在监听回调中更新原始数组
      console.log(newVal)
      this.transaction_stream = newVal;
    },
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
