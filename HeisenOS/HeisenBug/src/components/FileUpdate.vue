<!-- 导入文件更新数据，待实现-->
<template>
  <div>
    <!-- <h-file-import @on-choose-file="getFile"> -->
      <h-button type="ghost" icon="activity">导入文件</h-button>
    <!-- </h-file-import> -->
    <h-table :data="data" :columns="columns" v-show="data.length">
    </h-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      data: [],
    };
  },
  methods: {
    getFile(data, columnsTitle) {
      let columns = [];
      let sheetData = Object.entries(data);
      if (sheetData && sheetData.length > 0 && columnsTitle[0].length > 0) {
        for (let item of columnsTitle[0]) {
          let columnsItem = {};
          columnsItem.title = item;
          columnsItem.key = item;
          columns.push(columnsItem);
        }
        this.columns = columns;
        // this.data = data[0]
        this.data = sheetData[0][1];
      } else {
        this.$hMessage.info("导入表格无数据");
      }
    },
  },
};
</script>