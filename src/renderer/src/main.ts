import '@icon-park/vue-next/styles/index.css';
import 'virtual:svg-icons-register'; //这是虚拟模块的引入方式，用于给脚手架插件在打包和开发时做相应的处理
import Globalcomponents from '@renderer/components';
import router from '@renderer/router';
import { pinia } from '@renderer/store';
import { createApp } from 'vue';
import App from './App.vue';

import '@renderer/assets/style/variable.css';
import '@renderer/assets/style/tailwind.css';

createApp(App)
  .use(pinia)
  .use(Globalcomponents as any)
  .use(router)
  .mount('#app');
