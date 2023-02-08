import components from "./src";
export * from "./src";
import { App } from "vue";
export default {
  install: (app: App) => {
    components.forEach(component => app.use(component));
  }
};
