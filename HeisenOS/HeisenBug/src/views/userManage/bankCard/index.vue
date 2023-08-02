<!-- 用户查询-->

<template>
<div>
  <CardTable class="mt20"/>
  <!-- <UserTable class="mt20"/> -->
</div>
</template>

<script>
export default {
components: {
    CardTable: () =>import(/* webpackChunkName: "components/CardTable" */ "@/components/CardTable"),
  },
}
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
  margin-left: 20px;
}
</style>