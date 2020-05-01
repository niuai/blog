# Node 环境配置

## 修改 npm 全局包的安装路径

```shell
npm config set prefix "D:/nodejs/npm_global"
npm config set cache "D:/nodejs/npm_cache"
```

再将 `D:/nodejs/npm_global` 添加到环境变量Path中

## npm 全局安装 yarn

```shell
npm install -g yarn
```

## 修改 yarn 全局包的安装路径

```shell
yarn config set global-folder "D:\nodejs\yarn\global"
yarn config set cache-folder "D:\nodejs\yarn\cache"
```

将 `D:\nodejs\yarn\global\node_modules\.bin` 添加到环境变量Path中
