import { createPinia } from 'pinia';
export const pinia = createPinia();

export { useElectronStore } from './useElectronStore';
export { useWindowStore } from './useWindowStore';
export { useUserStore } from './useUserStore';
