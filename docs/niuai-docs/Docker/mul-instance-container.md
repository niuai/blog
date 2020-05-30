# 一个镜像（容器）中启动多个 Web 实例

通常情况下一个镜像只会运行一个Web实例，本文展示如何在一个镜像中运行多个实例

> 注意：不知道此种情况如果一个Web实例挂了，会不会使容器重启。。。慎用。也有类似的例子：[sebp/elk](https://hub.docker.com/r/sebp/elk)，同时有着三个服务

## 创建解决方案

创建带有两个 Web 项目的 .NET Core 解决方案，在项目根目录添加 Dockerfile 文件

```Dockerfile
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 8080
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src

COPY ["DotNetCore.Sample/DotNetCore.Sample.csproj", "DotNetCore.Sample/"]
RUN dotnet restore "DotNetCore.Sample/DotNetCore.Sample.csproj"

COPY ["DotNetCore.SubWeb/DotNetCore.SubWeb.csproj", "DotNetCore.SubWeb/"]
RUN dotnet restore "DotNetCore.SubWeb/DotNetCore.SubWeb.csproj"

COPY . .

WORKDIR "/src/DotNetCore.Sample"
RUN dotnet build "DotNetCore.Sample.csproj" -c Release -o /app/build

WORKDIR "/src/DotNetCore.SubWeb"
RUN dotnet build "DotNetCore.SubWeb.csproj" -c Release -o /app/build

WORKDIR "/src"
FROM build AS publish
RUN dotnet publish "DotNetCore.Sample/DotNetCore.Sample.csproj" -c Release -o /app/publish
RUN dotnet publish "DotNetCore.SubWeb/DotNetCore.SubWeb.csproj" -c Release -o /app/publish

COPY start.sh /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD [ "/app/start.sh" ]
```

## 准备脚本

通常情况下，从命令行启动 .NET Core 项目只能启动一个 Web 实例，即使在脚本中多行分别启动多个 Web，也只有第一个才会启动（此时如果 Ctrl + C 退出会启动下一个 Web）。因此需要以后台任务的方式来启动 Web 实例，利用 bash 中的 `&` 来开启一个新的任务（PowerShell 下开启新的任务是 Start-Process），类似的脚本如下

```bash
#!/bin/bash
dotnet ./DotNetCore.Sample.dll --urls http://0.0.0.0:80 &
dotnet ./DotNetCore.SubWeb.dll --urls http://0.0.0.0:8080
```

需要注意的是，在 Windows 系统下创建的 .sh 文件的编码格式可能与linux的不兼容，导致在容器中运行脚本的时候报错：bin/sh^M: bad interpreter: No such file or directory。可以通过 Git Bash 来修改文件的编码格式

1. 打开 Git Bash，运行 `vim start.sh` 来修改文件编码（可以看到此时文件的编码是 doc）
2. 执行 `:set ff=unix` 或 `:set fileformat=unix`（文件编码变为 unix）
3. `:wq` 保存退出

## 构建镜像、执行容器

运行以下命令来验证结果

```shell
docker build -t example -f Dockerfile .
docker run -it --name example -p 80:80 -p 8080:8080 example
```

代码仓库：<https://github.com/niuai/DotNetCore.Sample/tree/multiple-instance-one-image>
