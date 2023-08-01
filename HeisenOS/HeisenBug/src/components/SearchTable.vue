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
      rTitle="用户银行卡管理"
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
        <!-- slot内可以放任意自定义内容 -->
        <!-- 点击取消和确定按钮时可实现自己的业务逻辑 -->
        <h-button @click="cancelMethod">取消</h-button>
        <h-button type="error" @click="confirmMethod">确定</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
var leftData = [
  {
    c_name: "王小明",
    c_ID: "440602200309081218",
    address: "北京市朝阳区芍药居",
    cRiskLevel: "低风险",
    money: "120.00",
    cardId: "6223 5678 1234 5678",
    asset: "易方达基金",
    // _highlight: true//默认选择当前项
  },
  {
    c_name: "张小刚",
    c_ID: "440602300309081218",
    address: "北京市海淀区西二旗",
    cRiskLevel: "中风险",
    money: "130.00",
    cardId: "6223 5678 1234 5678",
    asset: "持仓",
  },
  {
    c_name: "李小红",
    c_ID: "330602200309081218",
    address: "上海市浦东新区世纪大道",
    cRiskLevel: "低风险",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    asset: "持仓",
  },
  {
    c_name: "周小伟",
    c_ID: "42360220030908101X",
    address: "深圳市南山区深南大道",
    cRiskLevel: "高风险",
    money: "150.00",
    cardId: "6223 5678 1234 5678",
    asset: "持仓", 
  },
];

var rightData = [];

var leftColumn = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "text",
    title: "用户名称",
    key: "c_name",
    width: 90,
    rule: { required: true, message: "姓名不能为空" },
    typeWidth: 80,
  },
  {
    type: "text",
    title: "证件号",
    width: 160,
    key: "c_ID",
    hiddenCol: false,
    rule: { required: true, message: "年龄不能为空" },
    typeWidth: 100,
  },
  {
    type: "textArea",
    rows: 2,
    width: 200,
    title: "地址",
    key: "address",
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
    key: "c_name",
    width: 80,
    rule: { required: true, message: "姓名不能为空" },
    typeWidth: 60,
  },
  {
    type: "card",
    title: "卡号",
    key: "cardId",
    width: 160,
    rule: { required: true, message: "卡号不能为空" },
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
      // 可以关闭弹窗 关闭弹窗把modal置为false即可
      this.modal1 = false;
      // 可以实现自己的取消业务逻辑 可以不关闭弹窗
    },
    confirmMethod() {
      this.modal1 = false;
      //console.log(this.selections);
      //this.leftData = this.leftData.filter(t => !this.selections.some(s => s.c_ID == t.c_ID));
      this.leftData.splice(0,1);
    },
    reloadData(){
      this.sleep(200);
      this.resetLoading();
      return 0;
    },
    deleteData(){
      this.modal1 = true;
    },
    saveData(){
      data=this.$refs.data.getAlldata();
      return 0;
    },
    filterMethod(data, query) {
      if(data.c_ID.indexOf(query) > 0)
          return data.c_ID.indexOf(query);
      else
          return data.c_name.indexOf(query) > -1;
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