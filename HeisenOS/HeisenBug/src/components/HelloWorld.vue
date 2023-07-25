<template>
  <div>
    <h-table
      border
      :columns="columns4"
      :data="data1"
      @on-select="selectOne"
      @on-select-all="selectAll"
      @on-selection-change="selectChange"
      @on-select-cancel="selectCancel"
    ></h-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "年龄",
          key: "age",
        },
        {
          title: "地址",
          key: "address",
        },
      ],
      data1: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
        },
      ],
    };
  },
  methods: {
    selectOne(selection, row) {
      console.log("选中一条");
      console.log(selection);
      console.log(row);
    },
    selectCancel(selection, row) {
      console.log("取消一条");
      console.log(selection);
      console.log(row);
    },
    selectAll(selection) {
      console.log("全选");
      console.log(selection);
    },
    selectChange(selection) {
      console.log("CHANGE事件");
      console.log(selection);
    },
  },
};
</script>