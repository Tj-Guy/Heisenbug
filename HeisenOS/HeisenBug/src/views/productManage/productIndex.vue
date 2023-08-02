<!-- 进入产品模块界面的首界面，上方为搜索框，下方为产品列表。当搜索框没有输入时，产品列表显示所有产品。如何实现每次跳转到该界面向数据库请求得到所有产品信息？ -->
<!-- 主要使用simple table，可以加双击点击的事件——跳转至产品详细信息 -->
<template>
  <div class="container">
    <!-- 搜索产品，但还没处理好逻辑 名称搜索和代码搜索应该调用不同后端函数-->
    <h-input v-model="searchKey">
      <h-button slot="append" icon="search" @click="searchProduct"></h-button>
    </h-input>
    <!-- 表格展示产品信息 -->
    <h-simple-table
      style="margin-top: 8px"
      :loading="loading"
      :row-class-name="rowClassName"
      :columns="columnsBig1"
      :data="bigData2"
      no-data-text="暂无数据"
      :show-header="true"
      :highlight-row="true"
      :disabled-hover="true"
      @on-current-change="currentchange"
      @on-row-dblclick="dbclick"
    ></h-simple-table>
    <!-- 加了一个回到顶部按钮 -->
    <h-backtop></h-backtop>
  </div>
</template>
<script>
import { searchIndex } from "../../api/ProductManage";
import { codeResult } from "../../utils/tools";
import { searchDetail } from "../../api/ProductManage";

export default {
  data() {
    return {
      bigData2: [],
      columnsBig1: [],
      searchKey: "",
      loading: false,
    };
  },
  methods: {
    currentchange(data, query) {
      console.log(data);
      console.log(query);
      //   这个应该是没啥用了
    },
    rowClassName(row, index) {
      if (index === 1) {
        return "demo-table-info-row";
      } else if (index === 3) {
        return "demo-table-error-row";
      }
      return "";
    },

    dbclick(row, obj) {
      searchDetail({
        f_id: row.fId,
      }).then((res) => {
        console.log(res);
        if (res.data.resultCode == 0) {
          this.$hMessage.success("详情搜索成功！");
        } else this.$hMessage.error(codeResult(res.data.resultCode));
        // 将后端返回的数据保存到变量中;
        this.$store.dispatch("product/setProductDetail", res.data);
        //上面感觉不对，我的productList.json文件里应该是已经存了所有产品列表的详细信息，直接按照行号去取就可以吧？
        this.$hCore.navigate("/productManage/productDetail");
      });
    },
    searchProduct() {
      this.loading = true;
      searchIndex({
        fragment: this.searchKey,
      })
        .then(async (res) => {
          if (res.data.resultCode == 1) {
            this.$hMessage.success("搜索成功，存在类似产品。");
            // 解构获取基金代码数组
            const fundCodes = res.data.info;

            // 定义一个数组用于存储所有基金的信息
            const fundInfoArray = [];
            //console.log(fundCodes);
            // 使用Promise.all处理多个并行的异步请求
            await Promise.all(
              fundCodes.map(async (fundCode) => {
                // 对每个基金代码再次发起异步请求，获取基金信息
                return searchDetail({
                  f_id: fundCode.fId,
                }).then((res1) => {
                  console.log(res1);
                  if (res1.data.resultCode == 0) {
                    this.$hMessage.success("详情搜索成功！");
                  } else this.$hMessage.error(codeResult(res1.data.resultCode));
                  // 解构获取基金信息
                  const { data: fundInfo } = res1;

                  // 将基金信息添加到数组中
                  fundInfoArray.push(fundInfo);
                });
              })
            );
            //只取四个属性展示在列表
            const filteredData = fundInfoArray.map((obj) => {
              const { fId, fName, fMonitor, fCompany } = obj;
              return { fId, fName, fMonitor, fCompany };
            });

            // 将 productList 转换为 JSON 字符串
            const jsonString = JSON.stringify(filteredData);

            // // 创建一个 Blob 对象，用于保存 JSON 字符串为文件
            // const blob = new Blob([jsonString], { type: 'application/json' });

            // // 创建一个下载链接
            // const downloadLink = document.createElement('a');
            // downloadLink.href = URL.createObjectURL(blob);
            // downloadLink.download = 'productList.json';

            // // 触发点击事件下载 JSON 文件
            // downloadLink.click();

            // //重新给表格数据赋值，不知道有没有用，能否刷新？
            // let tmpjsonData = [];
            // let tmpData = require("./productList.json");
            // tmpjsonData = tmpjsonData.concat(tmpData);

            // 将 JSON 字符串转换为对象数组
            const jsonData = JSON.parse(jsonString);

            // 将 jsonData 赋值给 bigData2
            this.bigData2 = jsonData;
          } else this.$hMessage.error(codeResult(res.data.resultCode));
        })
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.searchProduct();
  },
  mounted() {
    this.columnsBig1 = [
      {
        title: "产品代码",
        key: "fId",
        algin: "center",
        sortType: "asc",
      },
      {
        title: "产品名称",
        key: "fName",
        algin: "center",
      },
      {
        title: "产品经理",
        key: "fMonitor",
        algin: "center",
      },
      {
        title: "产品公司",
        key: "fCompany",
        algin: "center",
      },
    ];
  },
};
</script>
<style scoped>
.container {
  padding: 16px;
}
.h-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}

.h-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}

.h-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}

.h-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}

.h-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}

.h-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>
