# stylelint-config-win

团队内部的stylelint配置


## 安装

```shell
yarn add @winner-fed/stylelint-config-win -D
```  

##  依赖版本
```bash
stylelint ^13.6.1
```
*Tips*：如果项目中没有安装此依赖包或者版本不一致，请安装或者升级。 

## 使用

- 在你的项目的根目录下创建一个 `stylelint.config.js` 文件，并将以下内容复制进去：

```javascript
{
  extends: "@winner-fed/stylelint-config-win"
}
``` 

- 项目目录下的 `package.json` 添加检测指令，举个例子

```diff
{
 ...
 "scripts": {
+    "lint:style": "stylelint \"src/**/*.{vue,less,postcss,css,scss}\" --fix --cache --cache-location node_modules/.cache/stylelint/",
 }
 ...
}
``` 

## 引用

- [https://stylelint.io/](https://stylelint.io/)
- [http://stylelint.cn/user-guide/rules/](http://stylelint.cn/user-guide/rules/)
- [stylelint-config-moresec](https://github.com/MoresecFE/stylelint-config-moresec)
- [css-order](https://github.com/cklwblove/note-css-order)


## 环境

> Node.js >= 8

> stylelint >= 13.5.0
