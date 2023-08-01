import Node from './components/flowchart/node.js';
import Edge from './/components/flowchart/edge.js';


export function registerButterflyComponents(Vue) {
    // 注册 Node 组件
    Vue.component('butterfly-node', Node);
  
    // 注册 Edge 组件
    Vue.component('butterfly-edge', Edge);
  }