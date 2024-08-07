<template>
  <div v-if="isApp" class="header__ctrl--line flex justify-between content-center items-center h-full">
    <svg-icon @click="minimize" class="header__ctrl p-3 cursor-pointer no-drag transition-colors" name="zuixiaohuachuangkou" />
    <svg-icon @click="toggleMaximize" class="header__ctrl p-3 cursor-pointer no-drag transition-colors" :name="iconName" />
    <svg-icon @click="close" class="header__ctrl p-3 cursor-pointer no-drag hover:!text-red-500 transition-colors" name="guanbichuangkou" />
  </div>
</template>

<script setup lang="ts" name="HeaderCtrl">
import { useWindowStore } from '@renderer/store';
import { useDialog, NRadioGroup, NRadio, NCheckbox, NButton } from 'naive-ui';

onBeforeRouteUpdate((to, _, next) => {
  if (to.path === '/preview') windowId.value = 'preview';
  else windowId.value = 'main';
  next();
});

const windowId = ref<WinodwID>('main');
const theme = useWindowStore();
const isApp = ref(Boolean(window._3umapGisToolbox));
const iconName = ref<'zuidahuachuangkou' | 'windowreset'>('zuidahuachuangkou');
const dialog = useDialog();
const radiogroup = [
  { value: 'minimize', label: '最小化到系统托盘' },
  { value: 'exit', label: '退出应用' }
];

window._3umapGisToolbox?.onToggleMaximize((type) => {
  if (type === 'unmaximize') iconName.value = 'zuidahuachuangkou';
  else iconName.value = 'windowreset';
});

window._3umapGisToolbox?.htmlFullScreen((type) => {
  if (type === 'enter') isApp.value = false;
  else isApp.value = true;
});

const close = () => {
  if (theme.settings.closeTips) {
    const closeAction = ref(theme.settings.closeAction.valueOf() as 'minimize' | 'exit');
    const closeTips = ref(theme.settings.closeTips.valueOf());
    const info = dialog.info({
      content: () =>
        h('div', { class: ['ml-12'] }, [
          h('h4', { class: ['font-bold', '!text-sm'], style: { color: 'var(--font-color)' } }, '点击关闭按钮以后：'),
          h(
            NRadioGroup,
            {
              class: ['my-4'],
              value: closeAction.value,
              onUpdateValue: (res) => (closeAction.value = res),
              name: 'radiogroup'
            },
            () =>
              radiogroup.map((song) =>
                h(NRadio, { value: song.value, class: ['flex', 'py-0.5'] }, () =>
                  h('span', { style: { color: 'var(--sub-font-color)' } }, song.label)
                )
              )
          ),
          h(
            NCheckbox,
            {
              class: ['text-xs', 'flex'],
              checked: !closeTips.value,
              onUpdateChecked: (res) => (closeTips.value = !res)
            },
            () => h('span', { style: { color: 'var(--sub-font-color)' } }, '不在提示')
          )
        ]),
      action: () =>
        h('div', null, [
          h(NButton, { onClick: () => info.destroy(), class: ['px-10', 'h-auto', 'py-2', 'rounded-md', 'mr-2'] }, () => '取消'),
          h(
            NButton,
            {
              type: 'info',
              class: ['px-10', 'h-auto', 'py-2', 'rounded-md'],
              onClick: () => {
                sucess();
                info.destroy();
                if (closeAction.value === 'exit') window._3umapGisToolbox?.quit();
                else if (closeAction.value === 'minimize') window._3umapGisToolbox?.close(windowId.value);
              }
            },
            () => '确定'
          )
        ])
    });

    function sucess() {
      theme.setSettings({ closeAction: closeAction.value, closeTips: closeTips.value });
    }

    info.autoFocus = false;
    info.showIcon = false;
    info.class = 'p-12 py-4 !w-fit rounded-md';
    info.actionClass = '!justify-center';
    return;
  }
  window._3umapGisToolbox?.close(windowId.value);
};

const minimize = () => {
  window._3umapGisToolbox?.minimize();
};
const toggleMaximize = () => {
  window._3umapGisToolbox?.toggleMaximize();
};

window._3umapGisToolbox?.main.settings().then((json) => {
  iconName.value = json.maximum ? 'windowreset' : 'zuidahuachuangkou';
  theme.setTheme(json.theme as 'light' | 'dark');
  theme.setSystemTheme(json.themeSystem as boolean);
  theme.setSettings(json as any);
});
</script>
<style scoped lang="scss">
.header__ctrl--line {
  &::before {
    content: '';
    width: 1px;
    height: 20px;
    background-color: var(--dividing-line);
  }
}
.header__ctrl {
  border-radius: 6px;
  color: var(--bg1-icon-color);
  &:hover {
    color: var(--bg1-text-color);
    background-color: var(--bg1-icon-bg);
  }
}
</style>
