import { api } from "./Electron/preload";

declare global {
  // eslint-disable-next-line
  interface Window {
    api: typeof api;
  }
}
