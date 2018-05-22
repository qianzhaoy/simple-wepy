# 小程序 -- 基于 wepy 框架

## 开发前准备

开发前请先熟悉[wepy文档](https://tencent.github.io/wepy/document.html#/)

再认真阅读<a href="./CONTRIBUTING.md">开发指南</a>

### 模板下载

``` bash
# 先全局安装 wepy
npm i wepy-cli -g

# 推荐 （wepy-cli 版本 1.7.0 及以上）
wepy init qianzhaoy/simple-wepy project-name

# or

git clone https://github.com/qianzhaoy/simple-wepy.git
```

模板下载完成后

``` bash
# 项目使用minui做组件库，故需先全局安装min-cli
npm install -g @mindev/min-cli

# 进入项目文件夹安装模块依赖
npm install

# 编译 min-ui 组件
min build
```

## Build Setup

``` bash
# watch file change
npm run dev

# build for production with minification
npm run build
```
