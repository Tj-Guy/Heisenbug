<!-- <template>
  <div>
    <div class="header">
      <p class="item active" @click="jump('/home')">/home</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    jump(path) {
      this.$hCore.navigate(path);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}
.item {
  cursor: pointer;
  padding: 0 5px;
  text-decoration: underline;
  font-size: 12px;
  &.active {
    color: #047cf3;
  }
}
</style> -->

<template>
  <UserTable class="mt20"></UserTable>

</template>

<script>
export default {
  components: {
    UserTable: () => import(/* webpackChunkName: "components/UserTable" */ "@/components/UserTable")
  },
};
</script>

<style lang="less" scoped>
.pt60 {
  padding-top: 60px;
}

.mt20 {
  margin-top: 20px;
}

img {
  margin: 0 auto;
}
</style>