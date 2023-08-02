<template>
  <div>
    <h-form :model="bankForm" :label-width="80">
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
        <h-input v-model="bankForm.cardId" placeholder="请输入"></h-input>
      </h-form-item>

      <!-- 根据用户类型显示问题与选项 -->
      <div v-if= "formItem1.operation == 3">
        <h-form-item label="充值金额" required>
        <h-input v-model="bankForm.value" placeholder="请输入"></h-input>
      </h-form-item>
      </div>

      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px;" @click="handleReset('formItem1')">取消</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>

<script>
import { codeResult } from '../utils/tools'
import {getInnerId, bindBankCard, dismissBankCard, rechargeCard} from '../api/UserManage'
export default {
  data() {
    return {
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
    //验证申请
    handleSubmit(name) {
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