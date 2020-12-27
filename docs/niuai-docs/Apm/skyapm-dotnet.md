# 源码阅读之 skyapm-dotnet 总结

> 源码：[SkyAPM/SkyAPM-dotnet](https://github.com/SkyAPM/SkyAPM-dotnet)

## 1. IHostingStartup 托管程序集

作用：在 .Net Core 启动时从外部程序集添加增强功能，附加配置（Configuration）和服务（service）。`skyapm-dotnet` 就是通过这种方式来给 web 应用程序带来（代码）无侵入式的跟踪功能

参考文章：

- [在ASP.NET Core中使用托管启动（hosting startup）程序集，实现批量注册service](https://www.cnblogs.com/wangyfb/p/11765688.html)
- [asp.net core 3.x 模块化开发之HostingStartup](https://www.cnblogs.com/jionsoft/archive/2020/01/12/12183471.html)

*注意：另一个名字十分相似的接口 `IHostedService`，是用来额外启动应用的（StartAsync、StopAsync），常常配合 `Timer` 来执行定时（循环）任务*

## 2. C# 观察者模式

由 C# 原生实现的观察者模式。主题（`IObservable<T>`）和观察者（`IObserver<T>`），主题实现 `Subscribe` 方法添加观察者，观察者实现 `OnNext` 方法接收主题的通知

参考文章：

- [C# IObservable与IObserver观察者模式](https://www.cnblogs.com/chenyishi/p/13530026.html)
