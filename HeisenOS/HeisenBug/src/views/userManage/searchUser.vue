<!-- 用户查询-->

<template>
<div>
  <SearchTable class="mt20"/>
  <UserTable class="mt20"/>
</div>
</template>

<script>
export default {
components: {
    SearchTable: () =>import(/* webpackChunkName: "components/SearchTable" */ "@/components/SearchTable"),
    UserTable: () => import(/* webpackChunkName: "components/UserTable" */ "@/components/UserTable"),
  },
}
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
}
</style>