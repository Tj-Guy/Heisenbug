<template>
  <div>
    <div class="layout">
      <h-menu mode="horizontal" theme="dark" active-name="1">

        <div class="layout-logo"></div>
        <div class="layout-nav">
          <h-menu-item name="1">
            <h-icon name="mail"></h-icon>
            用户管理
          </h-menu-item>
          <h-menu-item name="2">
            <h-icon name="mail"></h-icon>
            产品管理
          </h-menu-item>
          <h-menu-item name="3">
            <h-icon name="mail"></h-icon>
            业务管理
          </h-menu-item>
          <h-menu-item name="4">
            <h-icon name="mail"></h-icon>
            我的账户
          </h-menu-item>
        </div>
      </h-menu>
      <h-menu mode="horizontal" active-name="1">
        <div class="layout-assistant">
          <h-menu-item name="1">二级导航</h-menu-item>
          <h-menu-item name="2">二级导航</h-menu-item>
          <h-menu-item name="3">二级导航</h-menu-item>
        </div>
      </h-menu>
      <div class="layout-content">
        <h-row>
          <h-col span="18">
            <div class="layout-content-main">内容区域</div>
          </h-col>
          <h-col span="6">
            <h-menu active-name="1-2" width="auto" :open-names="['1']">
              <h-submenu name="1">
                <template slot="title">
                  <h-icon name="mail"></h-icon>
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
                  <h-icon name="mail"></h-icon>
                  业务管理
                </template>
                <h-menu-item name="3-1">申购</h-menu-item>
                <h-menu-item name="3-2">赎回</h-menu-item>
                <h-menu-item name="3-2">清算</h-menu-item>
                <h-menu-item name="3-2">查询</h-menu-item>
              </h-submenu>
            </h-menu>
          </h-col>
        </h-row>
      </div>
      <div class="layout-copy">
        2017-2030 &copy; HUNDSUN
      </div>
    </div>
  </div>
</template>