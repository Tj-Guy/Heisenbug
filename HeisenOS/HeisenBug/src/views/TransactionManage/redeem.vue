<!-- 赎回-->
<template>
    <div class="function-body">
        <h-card style="margin-top:10%;background-color:rgb(240, 240, 240);" shadow="true">
            <p slot="title">基金赎回</p>
        <h-form label-position="left" :label-width="100">
            <h-form-item label="用户内部识别码" style="margin-top:50px">
                <h-row>
                    <h-col offset="0" span="6">
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

            <h-form-item label="赎回基金代码" style="margin-top:50px">
                <h-row>
                    <h-col offset="0" span="6">
                        <h-input v-model='inputInfo.f_input_id' @on-change="getfundInAccount"></h-input>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="success" show-icon v-if="fundInAccount.f_name!=''">
                            <p>基金代码：{{fundInAccount.f_id}}</p>
                            <p>基金名：{{fundInAccount.f_name}}</p>
                        </h-alert>
                        <h-alert type="warning" show-icon v-else>
                            <p>该用户未购买此基金！</p>
                        </h-alert>
                    </h-col>
                </h-row>
            </h-form-item>

            <h-form-item label="赎回银行卡号" style="margin-top:50px">
               <h-row>
                <h-col offset="0" span="6">
                    <h-select v-model="inputInfo.c_input_card_id">
                        <h-option
                        v-for="item in cInfo.c_card_list"
                        :value="item"
                        :key="item"
                        >{{ item }}</h-option>
                    </h-select>
                </h-col>
               </h-row>
            </h-form-item>

            <h-form-item label="赎回基金份额" style="margin-top:50px">
                <h-row>
                    <h-col offset="0" span="6">
                        <h-input v-model='inputInfo.f_portion'></h-input>
                        <h-tool-bottom placement="bottom">
                            <div slot="content">
                                <p>可赎回份额:{{ fundInAccount.f_portion }}</p>
                            </div>
                        </h-tool-bottom>
                    </h-col>
                    <h-col offset="1" span="8">
                        <h-alert type="error" show-icon v-if="checkPortion">持仓份额不足</h-alert>
                        <h-alert type="error" show-icon v-else-if="checkMin">赎回金额需大于两倍最小赎回数(最少赎回200份)</h-alert>
                    </h-col>
                </h-row>
            </h-form-item>
        </h-form>   

        <h-row style="margin-top:50px" >
            <h-col offset="10" span="2">
                <h-button style="margin-left:40px" type="primary" shape="circle" icon="search" @click.native="showMsgBox" v-if="ableSubmit">提交信息</h-button>
                <h-button type="primary" shape="circle" icon="search" v-else title="有条件未满足，请检查错误信息" disabled>提交信息</h-button>
            </h-col>
        </h-row>

            <h-msg-box
            title="交易明细展示"
            @on-ok="confirm_transaction"
            @on-cancel="cancel"
            width="500px"
            top="150"
            canDrag=false
            isOriginal=true
            v-model="showDetail"
            scrollable=true
            height=400>

            <div class="receipt" v-for="(index,item) in fundInAccount" :key="index">
                <p>用户内部识别码:  {{ item.c_inner_ID }}</p>
                <p>用户姓名:    {{ cInfo.c_name }}</p>
                <p>赎回基金代码:    {{ item.f_id }}</p>
                <p>赎回基金名:  {{ fundInAccount.f_name }}</p>
                <p>申购银行卡:  {{ inputInfo.c_input_card_id }}</p>
                <p>赎回份额:    {{ item.f_redeem_portion}}</p>
                <br><br><br>
            </div>

            </h-msg-box>
        </h-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
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
            'c_input_card':'',
            'f_input_portion':0,
        },
        cInfo:{ 
            'c_inner_ID' : '123',
            'c_name':'小黑子',
            'c_card_list':['987654321','53425834','4327479807'],
            'f_id':'666',
            'c_risk_level':3 //我们好像还没有对用户分级作出约束
        },//伪数据 用户信息
        cardInfo:{
            'c_card':'987654321',
            'card_amount':99999,
        },//伪数据 银行卡信息
        fundInAccount:{
            'f_id':'987',
            'c_inner_id':'123',
            'c_card':'53425834',
            'f_name':'塔姆塔基金',//另外再查fund的表;是否需要这项功能
            'f_portion':2000
        },//伪数据 基金信息
    }
    },
    methods:{
        getCustomerInfo(c_input_inner_ID){
            //在此处向后端数据库发送请求 以获取用户信息
        },
        getfundInAccount(f_id){
            //在此处向后端数据库发送请求 以获取基金信息
        },
        //确认交易 向后端post数据
        confirm_transaction(){
            alert('已经向后端发送请求')
        },
        //展示详情框
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
        }
    },
    components: {},
    computed:{
        //获取当前时间
        getCurrentTime(){
            return new Date()
        },
        //计算可用份额 无用
        calPortion(){
            let portionPossesed=0
            for(let item in this.fundInAccount){
                if(item.f_id==this.inputInfo.f_input_id)
                    this.portionPossesed+=item.f_portion
            }
            return this.portionPossesed
        },
        //提交的清单
        submitlist(){
            let tempPortion=this.inputInfo.f_input_portion
            let list=new Array()
            for(let item in this.fundInAccount){
                if(item.f_id==this.inputInfo.f_input_id)
                    if(tempPortion>item.f_portion){
                        tempPortion-=item.f_portion
                        item.f_portion=0;//等下写个函数处理掉这些持仓份额为0的基金
                        list.append({
                            'c_inner_id':item.c_inner_ID,
                            'c_card':item.c_card,
                            'f_redeem_portion':item.f_portion

                        })
                    }
                    if(tempPortion<=item.f_portion){
                        item.f_portion-=tempPortion
                        tempPortion=0
                        list.push({
                            'c_inner_id':item.c_inner_ID,
                            'c_card':item.c_card,
                            'f_redeem_portion':tempPortion
                        })
                    }

            }
            return list

        },
        //检查输入金额是否小于可用金额
        checkMin(){
            return (this.inputInfo.f_input_portion<2*this.leastRedeemPortion)
        },
        checkPortion(){
            return (this.fundInAccount.f_portion<this.inputInfo.f_input_portion)
        },
        ableSubmit(){
            return (!this.checkMin&!this.checkPortion)
        }
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
