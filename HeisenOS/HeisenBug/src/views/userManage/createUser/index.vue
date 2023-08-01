<!--开户 -->
<template>
<div>
  <OpenAccount class="mt20"/>
</div>
</template>

<script>
export default {
components: {
    OpenAccount: () =>import(/* webpackChunkName: "components/OpenAccount" */ "@/components/OpenAccount"),
  },
}
</script>

<style scoped>
.mt20 {
  margin-top: 20px;
  margin-left: 20px;
}
</style>