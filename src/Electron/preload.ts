/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

export const api = {
  action: (message: string, data?: any) => ipcRenderer.invoke(message, data),
  post: (channel: string, data: any) => ipcRenderer.send(channel, data),
  get: (channel: string, callback: (data: any) => void) =>
    ipcRenderer.once(channel, (_, data) => callback(data)),
};

contextBridge.exposeInMainWorld("api", api);
