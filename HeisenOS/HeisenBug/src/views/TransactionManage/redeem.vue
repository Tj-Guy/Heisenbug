<!-- 赎回-->
<template>
    <div class="function-body">
        <h-card style="margin-top:10%;background-color:rgb(240, 240, 240);">
            <p slot="title">基金赎回</p>
        <h-form label-position="left" 
        ref="inputInfo"
        :model="inputInfo"
        :label-width="100"
        :rules="ruleValidate"
        >
            <h-form-item label="用户识别码" style="margin-top:50px" prop="c_input_inner_ID">
                <h-row>
                    <h-col offset="2" span="6">
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

            <h-form-item label="赎回银行卡号" style="margin-top:50px" prop="c_input_card_id">
               <h-row>
                <h-col offset="2" span="8">
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

            <h-form-item label="赎回基金代码" style="margin-top:50px" prop="f_input_id">
                <h-row>
                    <h-col offset="2" span="6">
                        <h-input v-model='inputInfo.f_input_id' @on-change="getfundInAccount"></h-input>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="success" show-icon v-if="cInfo.f_name!=''">
                            <p>基金名：{{cInfo.f_name}}</p>
                        </h-alert>
                        <h-alert type="warning" show-icon v-else>
                            <p>该用户未购买此基金！</p>
                        </h-alert>
                    </h-col>
                </h-row>
            </h-form-item>


            <h-form-item label="赎回基金份额" style="margin-top:50px" prop="f_input_portion">
                <h-row>
                    <h-col offset="2" span="6">
                        <h-input v-model='inputInfo.f_input_portion'></h-input>
                        <span>
                            <div slot="content">
                                <p>可赎回份额:{{ cInfo.f_portion }}</p>
                            </div>
                        </span>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="error" show-icon v-if="!checkPortion">持仓份额不足</h-alert>
                        <h-alert type="error" show-icon v-else-if="!checkMin">赎回金额需大于两倍最小赎回数(最少赎回200份)</h-alert>
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
            top="150"
            v-model="showDetail"
            height=400>

            <div class="receipt">
                <p>用户内部识别码:  {{ cInfo.c_inner_ID }}</p>
                <p>用户姓名:    {{ cInfo.c_name }}</p>
                <p>赎回基金代码:    {{ inputInfo.f_input_id }}</p>
                <p>申购银行卡:  {{ inputInfo.c_input_card_id }}</p>
                <p>赎回份额:    {{ inputInfo.f_input_portion}}</p>
                <br><br><br>
            </div>

            </h-msg-box>
        </h-card>
    </div>
</template>

<script>
import { findBankCard, GetUserInfo,getFundInfo,getUserAccount,buyFund, sellFund } from '../../api/TransactionManage';
import { codeResult } from '../../utils/tools';
export default {
    data(){
        return{
        ruleValidate:{
            c_input_inner_ID: [{ required: true, message: "内部识别码不能为空", trigger: "blur" }],
            f_input_id: [{ required: true, message: "基金代码不能为空", trigger: "blur" }],
            c_input_card: [{ required: true, message: "购买卡号不能为空", trigger: "blur" }],
            f_input_portion:[{ required: true, message: "赎回份额不能为空", trigger: "blur" }],
        },
        showDetail:false,
        leastRedeemPortion:100,//最少赎回份额
        portionPossesed:2000,//持有该基金的份额
        limits:{
            invalidAmount: false, //金额限制提示
            riskLevelWarning: true, //风险等级再次确认
        },//本页面所有的限制条件
        adminInfo:{
            'admin_name':'大味蕾',
            'admin_id' : '999',
        },
        inputInfo:{
            'c_input_inner_ID' : '',
            'f_input_id':'',
            'c_input_card_id':'',
            'f_input_portion':0,
        },
        cInfo:{ 
            'c_inner_ID' : '',
            'c_name':'',
            'c_card_list':[],
            'f_id':'',
            'f_name':'',
            'c_risk_level':0, //我们好像还没有对用户分级作出约束
            'f_portion':0,
        },//伪数据 用户信息
        cardInfo:{
            'c_card':'987654321',
            'card_amount':99999,
        },//伪数据 银行卡信息
        fundInAccount:[],
        
        
        temp:{
            'f_id':'',
            'c_inner_id':'',
            'c_card':'',
            'f_name':'',//另外再查fund的表;是否需要这项功能
            'f_portion':0
        },//伪数据 基金信息
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
                //将数据写入到本地
                this.cInfo.c_card_list=res.data.info
            }
            }
            )
        },
        getfundInAccount(){
            //在此处向后端数据库发送请求 以获取基金信息
            getUserAccount({
                card_id:this.inputInfo.c_input_card_id,
                c_inner_ID:this.inputInfo.c_input_inner_ID
            }).then(res=>{
                console.log(res)
                if(res.data.resultCode >-1){
                //将数据写入到本地
                this.fundInAccount=res.data.info
                getFundInfo({
                f_id:this.inputInfo.f_input_id
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode >-1){
                //将数据写入到本地
                this.cInfo.f_name=res.data.fName
                for (let i=0;i<this.fundInAccount.length;i++){
            if(this.inputInfo.f_input_id==this.fundInAccount[i].fId){
                this.cInfo.f_portion=this.fundInAccount[i].fPortion
                console.log(this.cInfo.f_portion)
                break
            }
        }
            }
      }); 
            }
            })
        },
        //确认交易 向后端post数据
        confirm_transaction(){
            sellFund({
                f_id:this.inputInfo.f_input_id,
                card_id:this.inputInfo.c_input_card_id,
                c_inner_ID:this.inputInfo.c_input_inner_ID,
                portion:this.inputInfo.f_input_portion
            }).then(res =>{
            console.log(res);
            if(res.data.resultCode >-1){
                //将数据写入到本地
                this.$hMessage.success('赎回成功！')
            }
      }); 
        },

        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                let validportion=this.checkPortion
                let min=this.checkMin
                console.log(validportion)
                console.log(min)
        if (valid) {
            this.showDetail=true
        } else {
          this.$hMessage.error("请检查所填信息!");
        }
      });
    },
        
        goConfirmation(){
            this.showConfirmation=true
        }
    },
    components: {},
    computed:{
        //获取当前时间
        getCurrentTime(){
            return new Date()
        },

        //检查输入金额是否小于可用金额
        checkMin(){
            return (this.inputInfo.f_input_portion>=200)
        },
        checkPortion(){
            return (this.cInfo.f_portion>=this.inputInfo.f_input_portion)
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
