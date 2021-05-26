# Node 环境配置

## npm 全局安装 yarn

```shell
npm install -g yarn
```

## 修改全局包的安装路径

```shell
# npm（将 `D:/nodejs/npm_global` 添加到环境变量Path中）

npm config set prefix "D:/nodejs/npm_global"
npm config set cache "D:/nodejs/npm_cache"

# yarn（将 `D:\nodejs\yarn\global\node_modules\.bin` 添加到环境变量Path中）

yarn config set global-folder "D:\nodejs\yarn\global"
yarn config set cache-folder "D:\nodejs\yarn\cache"
```

## 配置仓库镜像

```shell
# yarn

yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

## 其他（nuget 包下载路径修改）

> *原文参考：<https://www.cnblogs.com/gl1573/p/11896045.html>*

默认情况下，NuGet会将包下载到 `C:\Users\用户名\.nuget\packages`。可以通过修改配置指定自定义的路径。

配置文件默认位置为：`C:\Users\用户名\AppData\Roaming\NuGet\NuGet.Config`，在根节点下添加以下配置：

```xml
<config>
  <add key="globalPackagesFolder" value="D:\packages" />
</config>
```

如果该文件不存在，可以先用 VS restore 一下，待该文件被创建之后再修改配置。也可以在 `C:\Program Files (x86)\NuGet\Config` 目录下新建一个 `NuGet.Config`，将该文件夹中的 `Microsoft.VisualStudio.Offline.config` 文件的内容复制到新建的 `NuGet.Config` 中，再在其中添加上述的节点。
