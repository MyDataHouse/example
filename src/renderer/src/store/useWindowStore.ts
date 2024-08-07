export const useWindowStore = defineStore('Window', () => {
  const media = window.matchMedia('(prefers-color-scheme:dark)');
  /** 是否跟随系统颜色主题 */
  const systemTheme = ref(false);
  const setSystemTheme = (val: boolean) => {
    systemTheme.value = val;
    if (val) {
      setTheme(media.matches ? 'dark' : 'light');
      media.onchange = (e) => {
        setTheme(e.matches ? 'dark' : 'light');
      };
    } else media.onchange = null;
  };

  /** 颜色模式 */
  const theme = ref<'light' | 'dark'>('light');
  /** 设置主窗口id */
  function setTheme(type: 'light' | 'dark') {
    theme.value = type;
    if (type === 'dark') {
      window.document.documentElement.classList.add('dark');
    } else window.document.documentElement.classList.remove('dark');
  }

  /** 系统配置 */
  const settings = reactive<Settings>(Object.create(null));
  const setSettings = (data: Partial<Settings>, isUpdateLocal = true) => {
    // eslint-disable-next-line no-eq-null
    if (data == null || typeof data !== 'object') throw Error('系统配置设置错误');
    for (const k in data) {
      // eslint-disable-next-line no-eq-null
      if (data[k] == null) throw Error('系统配置设置错误');
    }
    Object.assign(settings, data);
    isUpdateLocal && window._3umapGisToolbox?.main.updateSetteings(toRaw(settings));
  };

  return { setTheme, theme, systemTheme, setSystemTheme, setSettings, settings };
});
