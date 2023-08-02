<!-- 申购-->
<template>
    <div class="function-body">
        <h-card style="margin-top:10%;background-color:rgb(240, 240, 240);">
            <p slot="title">基金申购</p>
        <h-form label-position="left" 
        ref="inputInfo"
        :model="inputInfo"
        :label-width="100"
        :rules="ruleValidate">
            <h-form-item label="用户识别码" style="margin-top:50px" prop="c_input_inner_ID">
                <h-row>
                    <h-col offset="0" span="8">
                        <h-input v-model='inputInfo.c_input_inner_ID' @on-change="getCustomerInfo"></h-input>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="success" show-icon v-if="cInfo.c_name!=''">
                            <p>用户姓名：{{ cInfo.c_name }}</p>
                        </h-alert>
                        <h-alert type="warning" show-icon v-else>不存在此用户</h-alert>
                    </h-col>
                </h-row>
            </h-form-item>

            <h-form-item label="申购基金代码" style="margin-top:50px" prop="f_input_id">
                <h-row>
                    <h-col offset="0" span="8">
                        <h-input v-model='inputInfo.f_input_id' @on-change="getCustomerFundInfo"></h-input>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="success" show-icon v-if="fundInfo.f_name!=''">
                            <p>基金代码：{{fundInfo.f_id}}</p>
                            <p>基金名：{{fundInfo.f_name}}</p>
                            <p>风险等级：{{fund_risk}}</p>
                        </h-alert>
                        <h-alert type="warning" show-icon v-else>
                            <p>不存在此基金</p>
                        </h-alert>
                    </h-col>
                </h-row>
            </h-form-item>

            <h-form-item label="申购银行卡号" style="margin-top:50px" prop="c_input_card">
               <h-row>
                <h-col offset="0" span="8">
                    <h-select v-model="inputInfo.c_input_card_id">
                        <h-option
                        v-for="(item,index) in cInfo.c_card_list"
                        :value="item.cardId"
                        :key="item.cardId"
                        >{{ item.cardId }}</h-option>
                    </h-select>
                </h-col>
               </h-row>
            </h-form-item>

            <h-form-item label="申购基金金额" style="margin-top:50px" prop="f_input_buy_amount">
                <h-row>
                    <h-col offset="0" span="8">
                        <h-input v-model='inputInfo.f_input_buy_amount' @on-change="checkAmount"></h-input>
                    </h-col>
                    <h-col offset="1" span="8" v-if="limits.invalidAmount">
                        <h-alert type="error" show-icon>申购金额大于可用</h-alert>
                    </h-col>
                </h-row>
            </h-form-item>
        </h-form>   

          <h-row style="margin-top:50px" >
            <h-col offset="10" span="2">
                <h-button style="margin-left:40px" type="primary" shape="circle" icon="search" @click="handleSubmit('inputInfo')">提交信息</h-button>
            </h-col>
        </h-row>

            <h-msg-box
            title="交易明细展示"
            @on-ok="confirm_transaction"
            width="500px"
            height="600px"
            top="150"
            v-model="showDetail">

                <p>用户内部识别码:  {{ cInfo.c_inner_ID }}</p>
                <p>用户姓名:       {{ cInfo.c_name }}</p>
                <p>申购基金代码:    {{ fundInfo.f_id }}</p>
                <p>申购基金代码:    {{ fundInfo.f_name }}</p>
                <p>申购银行卡:      {{ inputInfo.c_input_card_id }}</p>
                <p>申购金额:        {{ inputInfo.f_input_buy_amount}}</p>

                <div class="risk-level">
                    <p>风险等级确认:</p>
                    <div class="confirmation" v-if="limits.riskLevelWarning&&showDetail">
                        <h-alert type="warning" show-icon>需要进行风险确认留痕</h-alert>
                        <h-button type="error" @click="goConfirmation">确认操作</h-button>
                        <h-msg-box
                        title="风险交易确认"
                        @on-ok="confirm_risk"
                        @on-cancel="cancel"
                        width="500px"
                        top="150"
                        v-model="showConfirmation">
                            <p>操作员:{{ adminInfo.admin_name }}</p>
                            <p>用户内部识别码:{{ inputInfo.c_input_inner_ID }}</p>
                            <p>基金代码:{{ fundInfo.f_id }}</p>
                            <p>用户姓名:{{ cInfo.c_name }}</p>
                            <p>操作时间:{{ getCurrentTime }}</p>
                        </h-msg-box>
                    </div>

                    <h-alert type="success" show-icon v-else>风险等级符合要求</h-alert>
                </div>
            
            </h-msg-box>
        </h-card>
    </div>

</template>

<script>
import {findBankCard, GetUserInfo,getFundInfo ,buyFund} from '../../api/TransactionManage';
export default {
    data(){
        return{
        ruleValidate:{
            c_input_inner_ID: [{ required: true, message: "内部识别码不能为空", trigger: "blur"}],
            f_input_id: [{ required: true, message: "基金代码不能为空", trigger: "blur" }],
            c_input_card_id: [{ required: true, message: "购买卡号不能为空", trigger: "blur" }],
            f_input_buy_amount:[{ required: true, message: "购买金额不能为空", trigger: "blur" }],
        },
        showConfirmation:false,
        subtmit:true,
        showDetail:false,
        cardInfo:{},
        limits:{
            invalidAmount: false, //金额限制提示
            riskLevelWarning: false, //风险等级再次确认
        },//本页面所有的限制条件
        adminInfo:{
            'admin_name':'大味蕾',
            'admin_id' : '999',
        },
        inputInfo:{
            'c_input_inner_ID' : '',
            'c_input_card_id':'',
            'f_input_id':'',
            'f_input_buy_amount':0,
        },
        cInfo:{ 
            'c_inner_ID' : '',
            'c_name':'',
            'c_card_list':[],
            'card_amount':0,
            'c_risk_level':0 //我们好像还没有对用户分级作出约束
        },//伪数据 用户信息
        fundInfo:{
            'f_id':'',
            'f_name':'',
            'f_risk_level':0,
        },//伪数据 基金信息
        confirmInfo:{
            'admin_name':'',
            'admin_id':'',
            'c_inner_ID':'',
            'f_id':'',
            'f_input_buy_amount':'',
            'time':'',
            'c_input_card_id':''
        },
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
      }); 

            findBankCard({
                c_inner_ID:this.inputInfo.c_input_inner_ID
            }).then(res=>{
                console.log(res)
                if(res.data.resultCode == 1 || res.data.resultCode == 2){
                this.cInfo.c_card_list=res.data.info
            }
            })
        },
        getCustomerFundInfo(){
            //在此处向后端数据库发送请求 以获取基金信息
            getFundInfo({
                f_id:this.inputInfo.f_input_id
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode>-1){
                //将数据写入到本地
                this.fundInfo.f_id=res.data.fId 
                this.fundInfo.f_name=res.data.fName
                this.fundInfo.f_risk_level=res.data.fRiskLevel

            //检查风险等级匹配情况
            if(this.cInfo.c_risk_level<this.fundInfo.f_risk_level)
                this.limits.riskLevelWarning=true; //需要进行风险确认留痕
            }
      });   
        },
        //风险留痕
        confirm_risk(){
            // this.confirmInfo.admin_name=this.adminInfo.admin_name
            // this.confirmInfo.admin_id=this.adminInfo.admin_id
            // this.confirmInfo.c_inner_ID=this.inputInfo.c_input_inner_ID
            // this.confirmInfo.f_id=this.inputInfo.f_input_id
            // this.confirmInfo.f_input_buy_amount=this.inputInfo.f_input_buy_amount
            // this.confirmInfo.c_input_card_id=this.inputInfo.c_input_card_id
            // this.confirmInfo.time=this.getCurrentTime()
            this.$hMessage.success('留痕成功！')
            this.limits.riskLevelWarning=false
            //post operation
        },
        //确认交易 向后端post数据
        confirm_transaction(){
            if(this.limits.riskLevelWarning==false){
            this.confirmInfo.admin_name=this.adminInfo.admin_name
            this.confirmInfo.admin_id=this.adminInfo.admin_id
            this.confirmInfo.c_inner_ID=this.inputInfo.c_input_inner_ID
            this.confirmInfo.f_id=this.inputInfo.f_input_id
            this.confirmInfo.f_input_buy_amount=this.inputInfo.f_input_buy_amount
            this.confirmInfo.c_input_card_id=this.inputInfo.c_input_card_id
            this.confirmInfo.time=this.getCurrentTime
            console.log(this.confirmInfo)

            buyFund({
                f_id:this.confirmInfo.f_id,
                card_id:this.confirmInfo.c_input_card_id,
                c_inner_ID:this.confirmInfo.c_inner_ID,
                amount:this.confirmInfo.f_input_buy_amount
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode == 1 || res.data.resultCode == 2){
                this.$hMessage.success('申购成功！')
            }
      }); 
    }else{
        this.$hMessage.error('请先完成留痕操作！！')
    }
        },
        goConfirmation(){
            this.showConfirmation=true
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
            this.showDetail=true
        if (valid&&!limits.invalidAmount) {
            this.showDetail=true
        } else {
            this.showDetail=false
          this.$hMessage.error("请检查所填信息!");
        }
      });
    },
    checkAmount(){
        let amount=-1
        for (let i=0;i<this.cInfo.c_card_list.length;i++){
            if(this.inputInfo.c_input_card_id==this.cInfo.c_card_list[i].cardId){
                amount=this.cInfo.c_card_list[i].value
                break
            }
        }
        console.log(amount)
        this.limits.invalidAmount=(this.inputInfo.f_input_buy_amoun>amount)
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
        fund_risk(){
            if(this.fundInfo.f_risk_level===1)
                return '低风险'

            if(this.fundInfo.f_risk_level===2)
                return '中风险'
            
            if(this.fundInfo.f_risk_level===3)
                return '高风险'
        }
        //检查输入金额是否小于可用金额
    }
};
</script>


<style scoped>
.function-body{
    margin-top: 2%;
    margin-left: 4%;
    display:block;
    width:90%;
    background-color: gray;
}
.input{
    width: 300px;
}
</style>
