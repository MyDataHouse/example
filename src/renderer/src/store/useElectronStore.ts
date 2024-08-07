export const useElectronStore = defineStore('Electron', () => {
  /** 主窗口id */
  const mainId = ref(0);
  /** 设置主窗口id */
  function setMainId(id: number) {
    mainId.value = id;
  }

  return { setMainId, mainId };
});
