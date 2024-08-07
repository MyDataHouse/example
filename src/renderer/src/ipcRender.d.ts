interface Window {
  _3umapGisToolbox:
    | {
        quit: Fn;
        close: Fn<[WinodwID]>;
        minimize: Fn;
        toggleMaximize: Fn;
        onToggleMaximize: Fn<[(type: string) => void]>;
        htmlFullScreen: Fn<[(type: 'enter' | 'leave') => void]>;
        main: {
          settings: () => Promise<Settings & { maximum: boolean }>;
          updateSetteings: (tar: Settings | boolean) => void;
          onUpdateSettings: Fn<[(event: any, param: Settings) => void]>;
        };
      }
    | undefined;
}
