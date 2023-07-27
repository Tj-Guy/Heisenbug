<!-- 用户查询-->

<template>
  <UserTable class="mt20"></UserTable>
</template>

<script>
export default {
components: {
    UserTable: () => import(/* webpackChunkName: "components/UserTable" */ "@/components/UserTable")
  },
}
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
}
</style>