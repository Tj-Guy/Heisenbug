<template>
  <div>
    <h-table 
      border :columns="columns" :data="data" :display="flex" @on-select="selectOne" @on-select-all="selectAll"
      @on-selection-change="selectChange" @on-select-cancel="selectCancel"
      filterable
      filter-placeholder="搜索"
      @on-change="handleChange3"
      >
      <div :style="{ float: 'right', margin: '5px' }">
        <h-button type="ghost" size="small" @click="reloadMockData"
          >刷新</h-button
        >
      </div>
    </h-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
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
        {
          title: "操作",
          key: "action",
          fixed: "right",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      data: [
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