# eslint-config-win

此规则适用于 JavaScript/Vue 项目的 ESLint 配置规范。

**目前已支持 Vue 3.0，需要指定 extends 配置vue3**

## 安装


```bash
yarn add @winner-fed/eslint-config-win -D
```

##  依赖版本
```bash
eslint ^7.32.0
babel-eslint ^10.1.0
vue-eslint-parser ^7.11.0
eslint-plugin-vue ^7.20.0
```
*Tips*：如果项目中没有安装此依赖包或者版本不一致，请安装或者升级。 

## 用法
- 在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: [
        '@winner-fed/win',
    ],
    env: {
        // 你的环境变量（包含多个预定义的全局变量）
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // 你的全局变量（设置为 false 表示它不允许被重新赋值）
        //
        // myGlobal: false
    },
    rules: {
        // 自定义你的规则
    }
};
```

- 项目目录下的 `package.json` 添加检测指令，举个例子
```diff
{
 ...
 "scripts": {
+    "lint:es": "eslint \"src/**/*.{vue,js,jsx}\" --fix",
 }
 ...
}
```

### Vue

```bash
npm install --save-dev eslint babel-eslint vue-eslint-parser eslint-plugin-vue @winner-fed/eslint-config-win
```

在你的项目的根目录下创建一个 `.eslintrc.js` 文件，并将以下内容复制进去：

```js
module.exports = {
    extends: [
        '@winner-fed/win',
        // 这里是针对 vue2 的配置
        '@winner-fed/win/vue', 
        // 如果是 vue3 的项目工程，则推荐下面配置
        // '@winner-fed/win/vue3',
    ],
    env: {
        // 你的环境变量（包含多个预定义的全局变量）
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // 你的全局变量（设置为 false 表示它不允许被重新赋值）
        //
        // myGlobal: false
    },
    rules: {
        // 自定义你的规则
    }
};
```

## Vue3 新增规则
| rule                                                         | 规则描述                                             |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| [vue/custom-event-name-casing ](https://eslint.vuejs.org/rules/custom-event-name-casing.html) | 自定义事件名必须用 kebab-case 风格                   |
| [vue/no-arrow-functions-in-watch](https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html) | watch 中禁止使用箭头函数                             |
| [vue/no-custom-modifiers-on-v-model](https://eslint.vuejs.org/rules/no-custom-modifiers-on-v-model.html) | 禁止自定义的 v-modal 修饰语                          |
| [vue/no-deprecated-data-object-declaration ](https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html) | 禁止在 data 中使用已废弃的对象定义                   |
| [vue/no-deprecated-destroyed-lifecycle](https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html) | 禁止使用已废弃的 destroyed 和 beforeDestroy 生命周期 |
| [vue/no-deprecated-dollar-listeners-api](https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html) | 禁止使用已废弃的 $listeners                          |
| [vue/no-deprecated-dollar-scopedslots-api ](https://eslint.vuejs.org/rules/no-deprecated-dollar-scopedslots-api.html) | 禁止使用已废弃的 $scopedSlots                        |
| [vue/no-deprecated-events-api ](https://eslint.vuejs.org/rules/no-deprecated-events-api.html) | 禁止使用已废弃的 events 接口                         |
| [vue/no-deprecated-filter ](https://eslint.vuejs.org/rules/no-deprecated-filter.html) | 禁止使用已废弃的 filters 语法                        |
| [vue/no-deprecated-functional-template](https://eslint.vuejs.org/rules/no-deprecated-functional-template.html) | 禁止使用已废弃的 functional 模版                     |
| [vue/no-deprecated-html-element-is](https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html) | 禁止使用已废弃的 is 属性                             |
| [vue/no-deprecated-inline-template](https://eslint.vuejs.org/rules/no-deprecated-inline-template.html) | 禁止使用已废弃的 inline-template 属性                |
| [vue/no-deprecated-props-default-this ](https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html) | 禁止使用已废弃的 this                                |
| [vue/no-deprecated-v-bind-sync](https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html) | 禁止在 v-bind 指令中使用已废弃的 .sync 修饰符        |
| [vue/no-deprecated-v-on-native-modifier](https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html) | 禁止使用已废弃的 .native 修饰符                      |
| [vue/no-deprecated-v-on-number-modifiers ](https://eslint.vuejs.org/rules/no-deprecated-v-on-number-modifiers.html) | 禁止使用已废弃的数字修饰符                           |
| [vue/no-deprecated-vue-config-keycodes](https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html) | 禁止使用已废弃的 Vue.config.keyCodes                 |
| [vue/no-dupe-v-else-if ](https://eslint.vuejs.org/rules/no-dupe-v-else-if.html) | 禁止在 v-if 和 v-else-if 中出现重复的测试表达式      |
| [vue/no-duplicate-attr-inheritance](https://eslint.vuejs.org/rules/no-duplicate-attr-inheritance.html) | 使用 v-bind="$attrs" 时 inheritAttrs 必须是 false    |
| [vue/no-empty-component-block](https://eslint.vuejs.org/rules/no-empty-component-block.html) | 禁止 `<template> <script> <style>` 为空                |
| [vue/no-invalid-model-keys](https://eslint.vuejs.org/rules/no-invalid-model-keys.html) | 禁止 model 中出现错误的属性                          |
| [vue/no-lifecycle-after-await](https://eslint.vuejs.org/rules/no-lifecycle-after-await.html) | 禁止异步注册生命周期                                 |
| [vue/no-lone-template ](https://eslint.vuejs.org/rules/no-lone-template.html) | 禁止出现没必要的 `<template>`                          |
| [vue/no-multiple-objects-in-class](https://eslint.vuejs.org/rules/no-multiple-objects-in-class.html) | 禁止 class 中出现复数的对象                          |
| [vue/no-multiple-slot-args](https://eslint.vuejs.org/rules/no-multiple-slot-args.html) | 禁止给 scoped slots 传递多个参数                     |
| [vue/no-multiple-template-root ](https://eslint.vuejs.org/rules/no-multiple-template-root.html) | 禁止模版中有多个根节点                               |
| [vue/no-mutating-props ](https://eslint.vuejs.org/rules/no-mutating-props.html) | 禁止修改组件的 props                                 |
| [vue/no-ref-as-operand ](https://eslint.vuejs.org/rules/no-ref-as-operand.html) | 禁止直接使用由 ref 生成的变量，必须使用它的 value    |
| [vue/no-setup-props-destructure](https://eslint.vuejs.org/rules/no-setup-props-destructure.html) | 禁止对 setup 中的 props 解构                         |
| [vue/no-sparse-arrays ](https://eslint.vuejs.org/rules/no-sparse-arrays.html) | 禁止在数组中出现连续的逗号                           |
| [vue/no-useless-concat ](https://eslint.vuejs.org/rules/no-useless-concat.html) | 禁止没必要的字符拼接                                 |
| [vue/no-useless-mustaches ](https://eslint.vuejs.org/rules/no-useless-mustaches.html) | 禁止出现无用的 mustache 字符串                       |
| [vue/no-useless-v-bind ](https://eslint.vuejs.org/rules/no-useless-v-bind.html) | 禁止出现无用的 v-bind                                |
| [vue/no-v-for-template-key ](https://eslint.vuejs.org/rules/no-v-for-template-key.html) | 禁止 template 有 v-for 属性时又有 key 属性           |
| [vue/no-v-for-template-key-on-child ](https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html) | 禁止 template v-for 属性的子节点有 key 属性          |
| [vue/no-watch-after-await ](https://eslint.vuejs.org/rules/no-watch-after-await.html) | 禁止在 await 之后调用 watch                          |
| [vue/one-component-per-file ](https://eslint.vuejs.org/rules/one-component-per-file.html) | 一个文件必须仅包含一个组件                           |
| [vue/order-in-components ](https://eslint.vuejs.org/rules/order-in-components.html) | 组件的属性必须为一定的顺序                           |
| [vue/require-explicit-emits](https://eslint.vuejs.org/rules/require-explicit-emits.html) | emits 属性必须包含 $emit() 中的值                    |
| [vue/require-slots-as-functions ](https://eslint.vuejs.org/rules/require-slots-as-functions.html) | this.$slots.default 必须被当作方法使用               |
| [vue/require-toggle-inside-transition](https://eslint.vuejs.org/rules/require-toggle-inside-transition.html) | transition 内部必须有条件指令                        |
| [vue/return-in-emits-validator](https://eslint.vuejs.org/rules/this-in-template.html) | emits 中的方法必须有返回值                           |
| [vue/v-on-event-hyphenation](https://eslint.vuejs.org/rules/v-on-event-hyphenation.html) | 禁止在 v-on 的事件名使用横杠                         | 
| [vue/valid-v-is ](https://eslint.vuejs.org/rules/valid-v-is.html) | v-is 指令必须合法                                    | 

## 参考

- [ESlint Code Guide](http://eslint.org/docs/user-guide/configuring)
- [ESlint Shareable Config](http://eslint.org/docs/developer-guide/shareable-configs)
- [eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)

## 开发维护
- 以测试开发驱动，config/rules/*.json 文件都是根据 test/ 文件夹对应的生成的


