type Fn<T extends any[]> = (...args: T) => void;

type Settings = {
  openAtLogin: boolean;
  /** 主题控制是否跟随系统主题 */
  themeSystem: boolean;
  theme: 'dark' | 'light';
  /** 关闭窗口是否提示，直接退出还是后台运行 */
  closeTips: boolean;
  closeAction: 'minimize' | 'exit';
  port: number;
  silentStartup: boolean;
  windowState: Record<
    string,
    { x: number; y: number; width: number; height: number; mode: (typeof import('./src/main/base/window'))['WindowMode'] } | undefined
  >;
};

type WinodwID = 'main' | 'preview';
