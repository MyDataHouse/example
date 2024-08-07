/**--------------------------------------------------------------
 * 参考vscode项目而来，用于定义和初始化一些环境变量和平台信息
 * 这些变量和标志有助于确定应用程序的运行环境和配置
 *---------------------------------------------------------------*/

// 平台和环境标志
let _isWindows = false;
let _isMacintosh = false;
let _isLinux = false;
let _isLinuxSnap = false;
let _isNative = false;
let _isWeb = false;
let _isElectron = false;
let _isIOS = false;
let _isCI = false;
let _isMobile = false;
let _userAgent: string | undefined = undefined;

// 判断 Node.js 环境
// eslint-disable-next-line no-eq-null
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

// 判断 Web 环境
const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';

if (isNode) {
  // 判断平台
  const platform = process.platform;
  if (platform === 'win32') {
    _isWindows = true;
  } else if (platform === 'darwin') {
    _isMacintosh = true;
  } else if (platform === 'linux') {
    _isLinux = true;
    if (process.env.SNAP) {
      _isLinuxSnap = true;
    }
  }

  // 判断是否在 Electron 环境中运行
  if (process.versions.electron) {
    _isElectron = true;
  }

  // 判断是否在 CI 环境中运行
  if (process.env.CI) {
    _isCI = true;
  }
} else if (isBrowser) {
  _isWeb = true;
  _userAgent = navigator.userAgent;

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    _isMobile = true;
  }

  // 判断平台
  const platform = navigator.platform;
  if (platform.startsWith('Win')) {
    _isWindows = true;
  } else if (platform.startsWith('Mac')) {
    _isMacintosh = true;
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      _isIOS = true;
    }
  } else if (platform.startsWith('Linux')) {
    _isLinux = true;
  }
}

// 判断是否为原生环境（非 Web 环境）
_isNative = !_isWeb;

// 打印平台和环境信息
// console.log(`Running on Windows: ${_isWindows}`);
// console.log(`Running on macOS: ${_isMacintosh}`);
// console.log(`Running on Linux: ${_isLinux}`);
// console.log(`Running in Linux Snap environment: ${_isLinuxSnap}`);
// console.log(`Running in Electron environment: ${_isElectron}`);
// console.log(`Running in Web environment: ${_isWeb}`);
// console.log(`Running on iOS: ${_isIOS}`);
// console.log(`Running in CI environment: ${_isCI}`);
// console.log(`Running on Mobile: ${_isMobile}`);
// console.log(`User Agent: ${_userAgent}`);

export const isWindows = _isWindows;
export const isMacintosh = _isMacintosh;
export const isLinux = _isLinux;
export const isLinuxSnap = _isLinuxSnap;
export const isNative = _isNative;
export const isElectron = _isElectron;
export const isWeb = _isWeb;
export const isIOS = _isIOS;
export const isMobile = _isMobile;
export const isCI = _isCI;
export const userAgent = _userAgent;
