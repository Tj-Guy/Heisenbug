import Vue from 'vue'
import hCore, { store } from "@hsui/core";
import "./reset.css";

//import h_ui
import h_ui from 'h_ui'
import "h_ui/dist/h_ui.min.css"

Vue.use(h_ui)

const app = hCore({
  extraModelOptions: {
    store,
  },
});

app.start();
