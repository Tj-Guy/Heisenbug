import hCore, { store } from "@hsui/core";
import "./reset.css";

const app = hCore({
  extraModelOptions: {
    store,
  },
});

app.start();
