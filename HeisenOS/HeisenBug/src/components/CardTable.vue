<template>
<!-- 银行卡管理，功能为绑卡，解绑与充值 -->
  <div>
    <h-form
      ref="bankForm"
      :model="bankForm"
      :label-width="100"
      errorFocus
      cols="1"
    >
      <h-form-item label="用户名" required>
        <h-input v-model="bankForm.cName" placeholder="请输入"></h-input>
      </h-form-item>

      <h-form-item label="证件号" required>
        <h-input v-model="bankForm.cId" placeholder="请输入"></h-input>
      </h-form-item>

      <h-form-item label="操作类型" prop="operation" required>
        <h-radio-group v-model="bankForm.operation">
          <h-radio label= 1>绑卡</h-radio>
          <h-radio label= 2>解绑</h-radio>
          <h-radio label= 3>充值</h-radio>
        </h-radio-group>
      </h-form-item>

      <h-form-item label="卡号" required>
        <h-typefield  type="cardNo" v-model="bankForm.cardId" placeholder="请输入"></h-typefield>
      </h-form-item>

      <!-- 根据用户类型显示问题与选项 -->
      <div v-if= "bankForm.operation == 3">
        <h-form-item label="充值金额" required>
        <h-typefield  type="money" v-model="bankForm.value" placeholder="请输入"></h-typefield>
      </h-form-item>
      </div>

      <h-form-item>
        <h-button type="primary" @click="modal1 = true">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px;" @click="handleReset('bankForm')">取消</h-button>
      </h-form-item>
    </h-form>
    <!-- 确认框 -->
    <h-msg-box v-model="modal1" width="360">
      <div style="text-align: center;">
        <p>是否确认提交</p>
      </div>
      <p slot="footer">
        <h-button @click="cancelMethod">取消</h-button>
        <h-button type="error" @click="confirmMethod">确定</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
import { codeResult } from '../utils/tools'
import {getInnerId, bindBankCard, dismissBankCard, rechargeCard} from '../api/UserManage'
export default {
  data() {
    return {
      model1:"",
      modal1: false,
      changeform: false,
      bankForm: {
        cName: "",
        cId:"",
        operation:1,
        cardId: "",
        value:0,
      },
    };
  },
  methods:{
    cancelMethod() {
      //关闭弹窗
      this.modal1 = false;
    },
    confirmMethod(){
      this.modal1 = false;
      //提交表单
      this.handleSubmit();
    },
    //验证申请
    handleSubmit() {
      getInnerId({fragment: bankForm.cId}).then(respond =>{
        let c_inner_id=respond.data.info[0].cInnerId;
        switch(bankForm.operation){
          //绑卡
          case 1:
            bindBankCard({
              c_inner_ID: c_inner_id,
              card_id:bankForm.cardId,
            }).then(res =>{
              if(res.status==200&&res.data.resultCode==1)
                this.$hMessage.success("提交成功!");
              else
                this.$hMessage.error(codeResult(res.data.resultCode));
            });
            break;
          //解绑
          case 2:
            dismissBankCard({
              c_inner_ID: c_inner_id,
              card_id:bankForm.cardId,
            }).then(res =>{
              if(res.status==200&&res.data.resultCode==1)
                this.$hMessage.success("提交成功!");
              else
                this.$hMessage.error(codeResult(res.data.resultCode));
            });
            break;
          //充值
          case 3:
            rechargeCard({
              card_id:bankForm.cardId,
              amount: bankForm.value,
            }).then(res =>{
              if(res.status==200&&res.data.resultCode==1)
                this.$hMessage.success("提交成功!");
              else
                this.$hMessage.error(codeResult(res.data.resultCode));
            })
            break;
        }
      })
    },
    //表单重置
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  }
};
</script>