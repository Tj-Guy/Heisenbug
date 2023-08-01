import Vue from 'vue'
import hCore, { store } from "@hsui/core";
import "./reset.css";

//import h_ui
import h_ui from 'h_ui'
import "h_ui/dist/h_ui.min.css"
import { registerButterflyComponents } from './flowchart.js';
Vue.use(h_ui)

// 注册 Butterfly 组件
registerButterflyComponents(Vue);


const app = hCore({
  extraModelOptions: {
    store,
  },
});
app.start();
