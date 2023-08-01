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
  <div class="center-in-center">
    <h-field-panel collapse>
      <span slot="title">用户登录</span>
      <h-form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <h-form-item prop="user" :showMessage="false">
        <h-input type="text" v-model="formInline.user" placeholder="Username">
          <h-icon name="android-person" slot="prepend"></h-icon>
        </h-input>
      </h-form-item>
      <h-form-item prop="password">
        <h-input type="password" v-model="formInline.password" placeholder="Password">
          <h-icon name="locked" slot="prepend"></h-icon>
        </h-input>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formInline')">登录</h-button >
      </h-form-item>
    </h-form>
      
    </h-field-panel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "admin",
        password: "",
      },
      ruleInline: {
        user: [
          { required: true, message: "请填写用户名", trigger: "blur" },
          {
            type: "string",
            pattern: "admin",
            message: "用户名错误",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$hMessage.success("登录成功!");
        } else {
          this.$hMessage.error("验证失败!");
        }
      });
    },
  },
};
</script>

<style scoped>
.center-in-center{   
    position: absolute;   
    top: 20%;   
    left: 20%;   
}   
</style>