<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="theme.theme === 'dark' ? darkTheme : lightTheme"
    :locale="zhCN"
    :data-locale="dateZhCN"
  >
    <n-message-provider>
      <n-dialog-provider>
        <router-view></router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme, lightTheme, zhCN, dateZhCN } from 'naive-ui'
import { useWindowStore } from '@renderer/store'

const theme = useWindowStore()
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1765f3',
    primaryColorHover: 'rgba(23, 101, 243, 0.8)',
    primaryColorSuppl: 'rgba(23, 101, 243, 0.8)',
    infoColor: '#1765f3'
  }
}
</script>
