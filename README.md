# Heisenbug
恒生电子科技暑期训练营-基金销售系统项目
## 小组成员
from: Tju SE
## 注意事项
随时添加
### GitHub
主分支为master，开发分支为dev，写自己代码前先pull下来dev分支，自己在本地建本地分支feature-xxx去开发，开发好并测试没问题后，你应该在本地回到dev分支，先pull最新dev远程仓库，再将其与你的本地feature合并，解决冲突后，再测试一次，没问题后将其push到dev分支。**注意：每次push前一定要先pull，把一些公共文件的冲突（别人写的东西比如app.vue里的import）解决了，运行没问题了，再去push！**
master分支等到dev集齐各个功能能跑通了，比较完善了，再merge到master里，相当于master里只放稳定版本。
注意，feature分支我们就不往github上放了，你自己本地管理就好，所以相当于远程仓库只有master和dev，集中式工作流，因为我们这个项目时间紧，工程量不是特别大，就不采用功能分支工作流了。
### 前端
hui：
	npm install @hsui/cli -gd
	hui create --app
	详情阅读hui网站文档：快速上手 | HUI (hs.net)
VSCode:
Volar（注意一定别用vetur！关掉vetur拓展）
	ESLint：是一种规范，还没太懂，总之就是帮你找问题
			npm install --save-dev eslint eslint-plugin-vue

组件名命名方案（建议）：一个单词——首字母大写；两个单词——CamelCase写法
其他变量命名：驼峰
### 后端
（启航定）
