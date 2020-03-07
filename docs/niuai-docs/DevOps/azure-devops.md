# Azure DevOps

## 项目协作开发平台

Azure DevOps 提供了以下服务来支持团队的运维开发，其几乎涵盖了项目的整个生命周期，包括代码管理、任务跟踪、运维、文档介绍等等。

1. Azure Repos：代码管理（Git、TFS），可以存放代码、管理分支，且能够直接在页面上浏览、评审PR。可以设置角色，分支策略，维护代码的高质量。

2. Azure Pipelines：持续集成工具，你可以在这里布局部署计划，提供了可视化的配置工具，也支持自定义更丰富的yaml配置。包括两个概念，持续集成、持续部署。可以设置执行的时机（代码PR合并完成、定时触发等）

3. Azure Boards：任务项管理。每创建一个项目的时候会被要求选择项目的类型（默认是敏捷开发，则任务项会有Feature、User Story、Task、Bug），可以基于时间段创建一个冲刺（一般两周或者三周），安排任务给某些具体的成员（如果Azure DevOps与邮件或者Teams集成，则会推送消息到成员）。Azure DevOps 会自动生成一些报表（比如燃尽图、任务分配情况），方便管理人员查看项目运行情况。

3. Azure Artifacts：私有的nuget仓库，你可以创建自己的feed并分享给项目的其他成员。

## Azure DevOps 安装

Azure DevOps 分为托管的 Azure DevOps Service 和服务器部署的 Azure DevOps Server。Express版本（能支持5人及以下的成员）是免费的。

### Azure DevOps Service

可以 [注册新账号](https://azure.microsoft.com/en-us/services/devops/?nav=min) 或者用社交账号（比如Github）来登陆。

### Azure DevOps Server

官方地址：https://azure.microsoft.com/en-us/services/devops/server/  
> 破解版地址：https://shareappscrack.com/microsoft-team-foundation-server/?token=66582936

你可以在自己的Windows10或者Windows Server上安装配置他们，如果机器部署在域中，会自动集成。