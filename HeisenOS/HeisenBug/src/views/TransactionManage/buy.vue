<!-- 申购-->

<template>
    <div class="function-body">
        <span class="function-title"> 用户申购界面 </span>
        <div class="input-section" style="margin-top:20px display:inline">
            <h-row style="margin-top:60px">
                <h-col span="6">
                    <span class="input-label">用户识别码:</span>
                </h-col>
                <h-col offset="1" span="8">
                    <h-input v-model='inputInfo.c_input_inner_ID' @on-change="getCustomerInfo"></h-input>
                </h-col>
                <h-col offset="1" span="4">
                    <h-alert type="success" show-icon v-if="cInfo.c_name!=''">用户姓名：{{ cInfo.c_name }}</h-alert>
                    <h-alert type="warning" show-icon v-else>不存在此用户</h-alert>
                </h-col>
            </h-row>

            <h-row style="margin-top:20px">
                <h-col span="6">
                    <span class="input-label">申购基金代码:</span>
                </h-col>
                <h-col offset="1" span="8">
                    <h-input v-model='inputInfo.f_input_id'></h-input>
                </h-col>
            </h-row>

            <h-row style="margin-top:20px">
                <h-col span="6">
                    <span class="input-label">申购银行卡卡号:</span>
                </h-col>
                <h-col offset="1" span="10">
                    <h-select v-model="inputInfo.c_input_card_id">
                        <h-option
                        v-for="item in cInfo.c_card_list"
                        :value="item"
                        :key="item"
                        >{{ item }}</h-option>
                    </h-select>
                </h-col>
            </h-row>

            <h-row style="margin-top:20px">
                <h-col span="6">
                    <span class="input-label">申购基金金额:</span>
                </h-col>
                <h-col offset="1" span="8">
                    <h-input v-model='inputInfo.f_input_buy_ammount'></h-input>
                </h-col>
                <h-col offset="1" span="4" v-if="invalidAmount">
                    <h-alert type="error" show-icon>申购金额大于可用</h-alert>
                </h-col>
            </h-row>

            <h-row style="margin-top:50px">
                <h-col offset="10" span="2">
                <h-button style="margin-left:40px" type="primary" shape="circle" icon="search" v-if="ableSubmit">提交信息</h-button>
                <h-button type="primary" shape="circle" icon="search" v-else title="有条件未满足，请检查错误信息" disabled>提交信息</h-button>
                </h-col>
            </h-row>

            <h-msg-box
            title="交易明细展示"
            @on-ok="confirm_transaction"
            @on-cancel="cancel"
            width="200"
            top="150"
            canDrag="false"
            isOriginal="true">

                <p>用户内部识别码:{{ cInfo.c_inner_ID }}</p>
                <p>用户姓名:{{ cInfo.c_name }}</p>
                <p>申购基金代码:{{ fundInfo.f_id }}</p>
                <p>申购基金代码:{{ fundInfo.f_name }}</p>
                <p>申购银行卡:{{ inputInfo.c_input_card_id }}</p>
                <p>申购金额:{{ inputInfo.c_input_card_id }}</p>
                <div class="risk-level">
                    <p>风险等级确认:</p>
                    <div class="confirmation" v-if="riskLevelWarning">
                        <h-alert type="warning" show-icon>需要进行风险确认留痕</h-alert>
                        <h-button type="error" @click="confirmation">确认操作</h-button>
                        <h-msg-box
                        title="风险交易确认"
                        @on-ok="confirm_risk"
                        @on-cancel="cancel"
                        width="200"
                        top="150"
                        canDrag="false"
                        isOriginal="true"
                        v-if="showConfirmation">
                            <p>操作员:{{ confirmInfo.admin_name }}</p>
                            <p>用户内部识别码:{{ confirmInfo.c_inner_ID }}</p>
                            <p>用户姓名:{{ cInfo.c_name }}</p>
                            <p>操作时间:{{ confirmInfo.time }}</p>
                        </h-msg-box>
                    </div>

                    <h-alert type="success" show-icon v-else>风险等级符合要求</h-alert>
                </div>
            
            </h-msg-box>


        </div>
    </div>

</template>

<script>
export default {
    data(){
        return{
        invalidAmount: true, //金额限制提示
        riskLevelWarning: false, //风险等级再次确认
        ableSubmit:false,   //是否满足所有限制条件
        showConfirmation:false,//展示确认界面
        adminInfo:{
            'admin_name':'大味蕾',
            'admin_id' : '123',
        },
        inputInfo:{
            'c_input_inner_ID' : '123',
            'c_input_card_id':'',
            'f_input_id':'',
            'f_input_buy_ammount':''
        },
        cInfo:{ 
            'c_inner_ID' : '123',
            'c_name':'',
            'c_card_list':['987654321','53425834','4327479807'],
            'f_id':'666',
            'f_input_buy_ammount':'10000',
            'c_risk_level':3 //我们好像还没有对用户分级作出约束
        },//伪数据 用户信息
        cardInfo:{
            'c_card':'',
            'card_amount':99999,
        },//伪数据 银行卡信息
        fundInfo:{
            'f_id':'987',
            'f_name':'塔姆塔基金',
            'f_risk_level':4
        },//伪数据 基金信息
        confirmInfo:{
            'admin_name':'',
            'admin_id':'',
            'c_inner_ID':'',
            'f_id':'',
            'f_input_buy_ammount':'',
            'time':'',
        }
    }
    },
    methods:{
        getCustomerInfo(c_input_inner_ID){
            //在此处向后端数据库发送请求 以获取用户信息
        },
        getFundInfo(f_id){
            //在此处向后端数据库发送请求 以获取基金信息
        },
        
        //检查输入金额是否小于可用金额
        checkBuyMount(input,assets){
            let inputA=parseInt(input)
            if (inputA>assets)
                this.invalidAmount=true
        },
        //检查基金风险等级与用户是否匹配
        checkRiskLevel(){
            if(this.cInfo.c_risk_level>this.fundInfo.f_risk_level)
                this.riskLevelWarning=true; //需要进行风险确认留痕
        },
        confirm_risk(){
            this.showConfirmation=true
            this.confirmInfo.admin_name=this.adminInfo.admin_name
            this.confirmInfo.admin_id=this.adminInfo.admin_id
            this.confirmInfo.c_inner_ID=this.cInfo.c_inner_ID
            this.confirmInfo.f_id=this.inputInfo.f_id
            this.confirmInfo.f_input_buy_ammount=this.inputInfo.f_input_buy_ammount
            this.confirmInfo.time=this.getCurrentTime()
        },
        //向后端post数据
        confirm(){
            alert()
        }
    },
    components: {},
    computed:{
        //获取当前时间
        getCurrentTime(){
            return new Date()
        },
    }
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
    font-family: PingFang SC;
    font-size: large;
}
</style>
