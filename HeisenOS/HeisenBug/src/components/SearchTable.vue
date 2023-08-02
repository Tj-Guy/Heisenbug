<template>
  <div class="mt20">
    <!-- 使用穿梭表格展示用户信息和银行卡持仓余额信息 -->
    <!-- 功能：查询（模糊搜索，证件号或名称），修改，删除 -->
    <!-- 添加了loading刷新特效 -->
    <!-- hiderTable,hideOperations可以选择隐藏右边表格和操作按钮 -->
    <h-transfer-table
      ref="transferTable"
      :lColumns="leftColumns"
      :rColumns="rightColumns"
      :lData="leftData"
      :rData="rightData"
      :option="riskLevelOptions"
      :operations="['用户', '银行卡', 'all left', 'all right']"
      :lWidth=450
      :rWidth=450
      :height=500
      :hiderTable="false" 
      :hideOperations="false"
      lTitle="用户基本信息"
      rTitle="用户银行卡信息"
      :border="true"
      :loading="loading"
      :stripe="true"
      filterable
      :filterMethod="filterMethod"
      @on-change="handleChange3"
    >
    <div :style="{ float: 'right', margin: '10px' }">
        <h-button type="primary" size="small" @click="reloadData">刷新</h-button>
        <h-button type="error" size="small" @click="deleteData">删除</h-button>
        <h-button type="success" size="small" @click.native="saveData">保存</h-button>
    </div>
    </h-transfer-table>
    <h-msg-box v-model="modal1" width="360">
      <div style="text-align: center;">
        <p>是否继续删除？</p>
      </div>
      <p slot="footer">
        <h-button @click="cancelMethod">取消</h-button>
        <h-button type="error" @click="confirmMethod">确定</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
var leftData = [];

var rightData = [];

var leftColumn = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "text",
    title: "用户名称",
    key: "cName",
    width: 90,
    rule: { required: true, message: "姓名不能为空" },
    typeWidth: 80,
    noEdit:true,
  },
  {
    type: "text",
    title: "证件号",
    width: 160,
    key: "cId",
    hiddenCol: false,
    rule: { required: true, message: "年龄不能为空" },
    typeWidth: 100,
    noEdit:true,
  },
  {
    type: "textArea",
    rows: 2,
    width: 200,
    title: "地址",
    key: "cAddress",
    rule: { required: true, message: "地址不能为空" },
  },
  {
    type: "text",
    width: 160,
    title: "邮箱",
    key: "cEmail",
    rule: { required: true, message: "地址不能为空" },
  },
  {
    type: "text",
    width: 160,
    title: "电话",
    key: "cTel",
    rule: { required: true, message: "地址不能为空" },
  },
  {
    type: "select",
    title: "适应风险",
    width: 200,
    key: "cRiskLevel",
    multiple: false,
    transfer: true,
    rule: { required: true, message: "请选择等级", trigger: "blur,change" },
  },
];

var rightColumn = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "text",
    title: "用户名称",
    key: "cName",
    width: 80,
    rule: { required: true, message: "姓名不能为空" },
    typeWidth: 60,
    noEdit:true,
  },
  {
    type: "card",
    title: "卡号",
    key: "cardId",
    width: 160,
    rule: { required: true, message: "卡号不能为空" },
    noEdit:true,
  },
  {
    type: "money",
    title: "余额",
    width: 120,
    integerNum: 14,
    suffixNum: 3,
    // suffixNum: 2,
    bigTips: true,
    key: "money",
    rule: { required: true, message: "金额不能为空" },
  },
  {
    type: "text",
    title: "持仓",
    width: 200,
    key: "asset",
    showCheckbox: false,
    checkStrictly: false,
    transfer: true,
    noEdit:true,
  },
];

import {getInnerId, getUserInfo, delUser, changeUserInfo, findBankCard} from '../api/UserManage'
export default {
  data() {
    return {
      leftColumns: leftColumn,
      rightColumns: rightColumn,
      leftData: leftData,
      rightData: rightData,
      modal1: false,
      loading: {
        left: true,
        right: true,
      },
      riskLevelOptions: [],
      selections: [],
    };
  },

  methods: {
    handleChange3(rightData, direction, moveData) {
      console.log("rightData:");
      console.log(rightData);
      console.log("direction:");
      console.log(direction);
      console.log("moveData:");
      console.log(moveData);
    },
    cancelMethod() {
      //关闭弹窗
      this.modal1 = false;
    },
    confirmMethod() {
      this.modal1 = false;
      //console.log(this.selections);
      //this.leftData = this.leftData.filter(t => !this.selections.some(s => s.c_ID == t.c_ID));
      delUser({c_inner_ID:this.leftData[0].cInnerId});
      this.leftData.splice(0,1);
    },
    getAllUserInfo(){
      let userData = []; 
      getInnerId({fragment: "1"}).then(respond => {
        for (var i = 0; i < respond.data.infoNums; i++) {
          let id = respond.data.info[i].cInnerId;
          getUserInfo({ account: id}).then(res => {
            let newData = {
              cInnerId: id,
              cName: res.data.cName,
              cId: res.data.cId,
              cAddress: res.data.cAddress,
              cEmail: res.data.cEmail,
              cTel: res.data.cTel,
              cRiskLevel: res.data.cRiskLevel,
              money: "0.0",
              cardId: "-",
              asset: "易方达基金",
            };
            userData.push(newData);
          });
          findBankCard({c_inner_ID: id}).then(res =>{
            if(res.data.infoNums > 0){
              userData[i].cardId=res.data.info[0].cardId;
              userData[i].money=res.data.info[0].value;
            }
          });
        }
      });
      console.log("getUserData:")
      console.log(userData);
      return userData;
    },
    reloadData(){
      //leftData=getAllUserInfo();
      console.log("reloadData");
      this.sleep(200);
      this.resetLoading();
      this.leftData = this.getAllUserInfo();
      return 0;
    },
    deleteData(){
      this.modal1 = true;
    },
    saveData(){
      console.log("saveData:");
      this.leftData = this.$refs.transferTable.getAlldata().leftData;
      console.log(this.leftData);
      for (var i = 0; i < this.leftData.length; i++) {
        changeUserInfo({
        c_inner_ID: this.leftData[i].cInnerId,
        c_risk_level: this.leftData[i].cRiskLevel,
        c_address: this.leftData[i].cAddress,
        c_email: this.leftData[i].cEmail,
        c_tel: this.leftData[i].cTel,
        c_represent_ID_type: 0,
        c_represent_ID: "",
        }).then(res =>{console.log(res)});
      }
      return 0;
    },
    filterMethod(data, query) {
      if(data.cId.indexOf(query) > 0)
          return data.cId.indexOf(query);
      else
          return data.cName.indexOf(query) > -1;
    },
    resetLoading() {
      this.loading.left = !this.loading.left
      this.loading.right = !this.loading.right
    },
    sleep(ms) { 
      var unixtime_ms = new Date().getTime();
      while(new Date().getTime() < unixtime_ms + ms) {}
    },
  },

  mounted() {
    this.riskLevelOptions[6] = [
      { value: 1, label: "低风险" },
      { value: 2, label: "中风险" },
      { value: 3, label: "高风险" },
    ];
  },
};
</script>