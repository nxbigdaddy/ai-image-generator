# AI 图片生成器 - 桌面版

基于 Electron 和阿里云通义万相模型的 AI 图片生成桌面应用。

## 功能特点

- 桌面应用，无需浏览器
- 支持多种图片生成模型
- 一键保存图片到本地
- 深色主题界面
- 自动检测 API Key 配置

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 API Key

编辑 `.env` 文件，填入你的 API key：

```
DASHSCOPE_API_KEY=YOUR_SECRET
```

### 3. 启动应用

```bash
npm start
```

## 支持的模型

| 模型 | 说明 |
|------|------|
| qwen-image-2.0 | 千问图片生成基础版 |
| qwen-image-2.0-pro | 千问图片生成专业版 |
| wan2.7-image | 万相图片生成基础版 |
| wan2.7-image-pro | 万相图片生成专业版 |

## 项目结构

```
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本
├── renderer/
│   └── index.html       # 应用界面
├── .env                 # 环境配置
├── package.json         # 项目配置
└── README.md            # 说明文档
```

## 打包应用 (可选)

如需打包为可执行文件，可添加 electron-builder：

```bash
npm install electron-builder --save-dev
```

然后在 package.json 中添加打包脚本。
