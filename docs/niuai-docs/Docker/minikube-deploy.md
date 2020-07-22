# Minikube 部署应用

> 参考文档：[Minikube Registries](https://minikube.sigs.k8s.io/docs/handbook/registry/)

## Docker 环境

首先需要明确的是，Minikube 的 Docker 环境是独立的，即如果本地还安装了 Docker Desktop for Windows，那么该 Docker 环境与 Minikube 的 Docker 环境是分开的，并不能互相引用。

平时默认打开的是 Docker for Windows 的环境，如果想打开 Minikube 的 Docker 环境，需要以管理员权限运行 `& minikube -p minikube docker-env | Invoke-Expression`（该命令可以通过运行 `minikube docker-env` 得到），即在该命令窗口中进入了 Minikube 的 Docker 环境，在该环境下 build 的镜像可以被 Minikube（kubectl） 引用。

## 创建基于 Minikube 的 registry

如果平时想在 Docker for Windows 下构建镜像，且部署于 Minikube 的环境，则可以在 Minikube 下搭建私有的 registry，再将 Docker for Windows 下构建的镜像推送上去（也可以在 Docker for Windows 下搭建 registry，Minikube 去拉取镜像部署）。

以管理员运行 `minikube addons enable registry`，Minikube 会自动去拉取镜像并搭建 registry。之后，需要运行 `kubectl get pod -n kube-system` 来找到运行中的 registry pod（比如：*registry-dx8jf*），再运行 `kubectl port-forward --namespace kube-system registry-dx8jf 5000:5000` 来将 registry 的端口映射到 Host 机器上。此时访问 <http://localhost:5000/v2/_catalog> 可以看到镜像库信息。

也可以通过 `kubectl create -f` 的方式搭建私有 registry，参考文档：[Sharing a local registry with minikube](https://hasura.io/blog/sharing-a-local-registry-for-minikube-37c7240d0615/)，yaml 文件：[gist on github](https://gist.github.com/coco98/b750b3debc6d517308596c248daf3bb1)

> *注意：运行 `minikube addons enable registry` 后会创建两个 pod（比如：registry-dx8jf、registry-proxy-87gm7），要保证这两个 pod 都正常运行才行，通常因为网络不通，需要改变镜像仓库（比如：先拉取 `registry.cn-hangzhou.aliyuncs.com/google_containers/kube-registry-proxy:0.4` 再打标签 `gcr.io/google_containers/kube-registry-proxy:0.4`，然后重新启动 pod：`kubectl get pod registry-proxy-87gm7 -n kube-system -o yaml | kubectl replace --force -f -`）*

## 推送镜像到 registry

此时还不能在 Docker for Windows 下直接推送镜像到 registry，需要运行以下命令来将 docker vm 的5000端口与 Host 的5000端口做一个映射

```shell
docker run -it --name forward-registry --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:host.docker.internal:5000"
```

然后就可以将镜像推送到私有的 registry 了，此时再访问 <http://localhost:5000/v2/_catalog> 就可以看到新推送镜像的名字了。运行 `kubectl apply -f` 也能够生成 k8s 资源。

## 查看生成服务的链接

首先需要确定 k8s cluster 的 IP，通过运行 `kubectl cluster-info` 得到相对应的 Host IP，再通过 `kubectl get svc` 来查看服务对外的端口，NodePort 的话在 30000~32767，然后就可以在主机上的浏览器访问 Host IP + NodePort（比如：<http://192.168.42.199:30021/>）来查看应用了。

> 也可以直接运行 `minikube service [svc] --url` 来获取服务在 Host 环境下的地址

## 其他注意事项

1. 在 k8s 环境中，通常以 volume pod 的形式来持久化数据，挂载磁盘时（windows），比如在 `D:\~temp\kubernetes\kube-registry\registry`，要写成 `/host_mnt/d/~temp/kubernetes/kube-registry/registry`（/host_mnt/ 表示了windows 下对于虚拟机的根的映射，但似乎不起作用。。有待研究），可以参考例子：[kube-registry.yaml](./assets/kube-registry.yaml)
