# Docker 常用命令

1. 杀死所有正在运行的容器：
    - `docker kill $(docker ps -a -q)`

2. 删除所有已经停止的容器：
    - `docker rm $(docker ps -a -q)`

3. 删除所有未打 dangling 标签的镜像（中间过程无用的镜像）：
    - `docker rmi $(docker images -q -f dangling=true)`

4. 删除所有镜像：
    - `docker rmi $(docker images -q)`

5. 以交互方式创建容器，并在退出该交互命令窗口后容器自动销毁：
    - `docker run -it --rm -p 8080:8080 -v D:\~temp:/temp php:latest`
