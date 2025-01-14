// electron.mjs

import { app, BrowserWindow } from 'electron';
import path from 'node:path';

// 创建桌面程序
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 导出__dirname以供Electron应用程序使用
global.__dirname = __dirname;
const createBrowserWindow = () => {
    // 创建大小
    const ELEwin = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            // 开始使用node
            nodeIntegration: true,
            // 不开启上下隔离（如果想使用require就要这个关闭）
            contextIsolation: true,
            // 关闭web安全策略，允许加载本地资源
            webSecurity: false,
            // 可以便用remote方法
            enableRemoteModule: true,
            // ？
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // 读取链接
    ELEwin.loadURL("http://localhost:6719/log-lottery/")
    // 判断是否是开发者环境
    // ELEwin.loadURL(
    //     process.env.NODE_ENV === 'development'
    //         ? ' http://localhost:6719/log-lottery/'
    //         : `file://${path.join(__dirname, '../dist/index.html')}`)

    // 打开调试窗口
    if (process.env.NODE_ENV === 'development') {
        ELEwin.webContents.openDevTools()
    }

    //关闭调试窗口
    // ELEwin.webContents.closeDevTools()
}
// 调用方法
app.whenReady().then(createBrowserWindow)