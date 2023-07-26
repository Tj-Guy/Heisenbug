<script>
import logo from "@/assets/logo.png";
export default {
  data() {
    return {
      logo
    };
  }
}
</script>

<template>
  <div class="block">
    <div class="layout">
      <h-menu class="header" mode="horizontal" theme="dark" active-name="1">
        <div>
          <div class="layout-logo">
            <img style="display:inline-block" width="50px" alt="Hundsun Design" :src="logo" />
          </div>
          <div class="layout-nav">
            <h-menu-item name="1">
              <h-icon name="person-stalker"></h-icon>
              <span>用户管理</span>
            </h-menu-item>
            <h-menu-item name="2">
              <h-icon name="mail"></h-icon>
              <span>产品管理</span>
            </h-menu-item>
            <h-menu-item name="3">
              <h-icon name="card"></h-icon>
              <span>业务管理</span>
            </h-menu-item>
            <h-menu-item name="4">
              <h-icon name="person"></h-icon>
              <span>我的账户</span>
            </h-menu-item>
          </div>
        </div>
      </h-menu>

      <!-- <h-menu mode="horizontal" active-name="1">
        <div class="layout-assistant">
          <h-menu-item name="1">用户管理</h-menu-item>
          <h-menu-item name="2">产品管理</h-menu-item>
          <h-menu-item name="3">业务管理</h-menu-item>
        </div>
      </h-menu> -->

      <div class="layout-content">
        <h-row class="block">
          <h-col span="6" class="block">
            <h-menu active-name="1-2" width="auto" :open-names="['1']" class="block">
              <h-submenu name="1">
                <template slot="title">
                  <h-icon name="person-stalker"></h-icon>
                  用户管理
                </template>
                <h-menu-item name="1-1">用户添加</h-menu-item>
                <h-menu-item name="1-2">用户查询</h-menu-item>
                <h-menu-item name="1-3">用户修改</h-menu-item>
              </h-submenu>
              <h-submenu name="2">
                <template slot="title">
                  <h-icon name="mail"></h-icon>
                  产品管理
                </template>
                <h-menu-item name="2-1">产品添加</h-menu-item>
                <h-menu-item name="2-2">产品查询</h-menu-item>
              </h-submenu>
              <h-submenu name="3">
                <template slot="title">
                  <h-icon name="card"></h-icon>
                  业务管理
                </template>
                <h-menu-item name="3-1">申购</h-menu-item>
                <h-menu-item name="3-2">赎回</h-menu-item>
                <h-menu-item name="3-2">清算</h-menu-item>
                <h-menu-item name="3-2">查询</h-menu-item>
              </h-submenu>
            </h-menu>
          </h-col>

          <h-col span="18" class="block">
            <div class="layout-content-main">
              <router-view></router-view>
              <!-- 内容区域 -->
            </div>
            <div class="layout-copy">
              2017-2030 &copy; HUNDSUN
            </div>
          </h-col>
        </h-row>
      </div>

    </div>
  </div>
</template>


<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .block{
    height: 100%;
  }
  .layout{
    display:flex;
    flex-direction: column;
    height:100%;
  }
  .layout-logo{
    display: inline-block;
    line-height: 0;
    vertical-align: middle;
    height: auto;
  }
  .layout-nav{
    display:inline-block;
    vertical-align: middle;
  }
  .layout-content{
    flex: 1;
    height:100%;
  }
  .layout-content-main{
    height: calc(100% - 60px);
    overflow: hidden;
  }
  .layout-copy{
    line-height: 60px;
    text-align: center;
    height: 60px;
  }
  
</style>

