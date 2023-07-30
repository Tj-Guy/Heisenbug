<template>
  <div class="mt20">
    <h-transfer-table
      :lColumns="leftColumns"
      :rColumns="rightColumns"
      :lData="leftData"
      :rData="rightData"
      lTitle="用户基本信息"
      rTitle="用户银行卡管理"
      :border="true"
      :loading="loading"
      :stripe="true"
      filterable
      :filterMethod="filterMethod"
      :filter-placeholder="搜索"
    >
    <div :style="{ float: 'right', margin: '5px' }">
        <h-button type="ghost" size="small" @click="reloadData">刷新</h-button>
        <h-button type="ghost" size="small" @click.native="saveData">保存</h-button>
    </div>
    </h-transfer-table>
  </div>
</template>

<script>
var leftData = [
  {
    name: "王小明",
    id: "440602200309081218",
    address: "北京市朝阳区芍药居",
    money: "120.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
    // _highlight: true//默认选择当前项
  },
  {
    name: "张小刚",
    id: "440602300309081218",
    address: "北京市海淀区西二旗",
    money: "130.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
  },
  {
    name: "李小红",
    id: "330602200309081218",
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
  },
  {
    name: "周小伟",
    id: "755602200309081218",
    address: "深圳市南山区深南大道",
    money: "150.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
  },
  {
    name: "王小明",
    id: "44060220030908121X",
    address: "北京市朝阳区芍药居",
    money: "120.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
    // _highlight: true//默认选择当前项
  },
  {
    name: "张小刚",
    id: "20060227730908121X",
    address: "北京市海淀区西二旗",
    money: "130.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
  },
  {
    name: "李小红",
    id: "44060221130908121X",
    address: "上海市浦东新区世纪大道",
    money: "140.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
  },
  {
    name: "周小伟",
    id: "42360220030908101X",
    address: "深圳市南山区深南大道",
    money: "150.00",
    cardId: "6223 5678 1234 5678",
    city: "北京",
    dating: "2018-03-07",
    timing: "16:00:00.00",
    tree1: "leaf1",
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
    title: "姓名",
    key: "name",
    width: 90,
    rule: { required: true, message: "姓名不能为空" },
    typeWidth: 80,
  },
  {
    type: "text",
    title: "证件号",
    width: 160,
    key: "id",
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
    title: "地区",
    width: 200,
    key: "city",
    multiple: false,
    transfer: true,
    rule: { required: true, message: "请选择城市", trigger: "blur,change" },
  },
  {
    type: "date",
    title: "日期",
    width: 200,
    key: "dating",
    dateType: "date",
    format: "yyyy-MM-dd",
    transfer: true,
    rule: { required: true, message: "请选择日期", trigger: "blur,change" },
  },
  {
    type: "time",
    title: "时间",
    width: 200,
    key: "timing",
    dateType: "time",
    format: "HH:mm:ss",
    steps: [2, 2, 2],
    transfer: true,
    rule: { required: true, message: "请选择时间", trigger: "blur,change" },
  },
  {
    type: "selectTree",
    title: "下拉树",
    width: 200,
    key: "tree1",
    transfer: true,
    treeData: [
      {
        expand: true,
        title: "parent 1",
        children: [
          {
            title: "parent 1-0",
            expand: true,
            children: [
              {
                title: "leaf1",
                disableCheckbox: true,
              },
              {
                title: "leaf2",
              },
            ],
          },
          {
            title: "parent 1-1",
            expand: true,
            checked: true,
            children: [
              {
                title: "leaf3",
              },
            ],
          },
        ],
      },
    ],
    showCheckbox: false,
    checkStrictly: false,
    rule: { required: true, message: "请选择子节点", trigger: "blur,change" },
  },
];

var rightColumn = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "text",
    title: "名称",
    key: "name",
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
    title: "金额",
    width: 120,
    integerNum: 14,
    suffixNum: 3,
    // suffixNum: 2,
    bigTips: true,
    key: "money",
    rule: { required: true, message: "金额不能为空" },
  },
];

export default {
  data() {
    return {
      leftColumns: leftColumn,
      rightColumns: rightColumn,
      leftData: leftData,
      rightData: rightData,
      loading: {
        left: true,
        right: true,
      }
    };
  },
  methods: {
    reloadData(){
        this.sleep(200);
        this.resetLoading();
        return 0;
    },
    saveData(){
        return 0;
    },
    filterMethod(data, query) {
        if(data.name.indexOf(query) > 0)
            return data.name.indexOf(query);
        else
            return data.id.indexOf(query) > -1;
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
};
</script>