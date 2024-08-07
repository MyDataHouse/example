import type { Component, App } from 'vue';
import SvgIcon from './SvgIcon/index.vue';
import HeaderCtrl from './HeaderCtrl/index.vue';
import Login from './Login/index.vue';
const components: { [key: string]: Component } = { SvgIcon, HeaderCtrl, Login };
export default {
  install(app: App) {
    for (const key in components) {
      app.component(key, components[key]);
    }
  }
};
