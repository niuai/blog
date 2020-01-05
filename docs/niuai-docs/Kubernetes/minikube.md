# Minikube

# Minikube 安装（Windows 10 Pro + Hyper-V）

> 自己已安装好 Docker

1. 下载 Minikube：<https://github.com/kubernetes/minikube/releases>

2. 下载 kubectl（kubernetes 的客户端）：<https://storage.googleapis.com/kubernetes-release/release/v1.9.0/bin/windows/amd64/kubectl.exe>

3. 将以上两个工具的路径加到环境变量 Path 中

4. 打开 Hyper-V 管理器创建一个外部虚拟交换机

    > 注意：外部网络这里可能要多试几个，并非所有都是可行的，最好选名字带有 Wireless 的

    ![虚拟交换机](./assets/images/virtual-switch.png)  
    ![新建虚拟交换机](./assets/images/new-switch.png)  
    ![配置](./assets/images/config-switch.png)

5. 以管理员身份打开命令行，并键入以下命令来创建基于 Hyper-V 的 Kubernetes 测试环境（如果之前 #4 中的“外部网络”没有选好，敲入命令后可能会一直卡在创建虚拟机的步骤）

    ```powershell
    minikube start --image-mirror-country cn `
        --iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.6.0.iso `
        --registry-mirror=https://registry.docker-cn.com `
        --vm-driver="hyperv" `
        --hyperv-virtual-switch="MinikubeSwitch" `
        --memory=2048
    ```

6. 然后就可以用以下命令来查看安装状态（minikube 命令需要管理员权限）：
    - `minikube status`：安装状态
    - `minikube dashboard`：打开 kubernetes 状态面板（浏览器）
    - `kubectl cluster-info`：查看 kubernetes 主节点状态

    ![管理界面](./assets/images/minikube-dashboard.png)

> 参考文章：  
> <https://www.cnblogs.com/shanyou/p/8503839.html>  
> <https://yq.aliyun.com/articles/221687>
