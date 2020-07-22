# Hangfire Dashboard

> 参考链接：[Using Dashboard](https://docs.hangfire.io/en/latest/configuration/using-dashboard.html)、[Hangfire.Dashboard.BasicAuthorization](https://github.com/yuzd/Hangfire.Dashboard.BasicAuthorization)

## 权限验证

通常情况下，Dashboard 并不验证访问者身份，容易导致信息泄露和数据破坏。Hangfire 提供了 [Configuring Authorization](https://docs.hangfire.io/en/latest/configuration/using-dashboard.html#configuring-authorization) `IDashboardAuthorizationFilter` 接口来实现身份验证功能，可以继承该接口来自定义验证功能。

## 基本身份验证

GitHub 上的 [Hangfire.Dashboard.BasicAuthorization](https://github.com/yuzd/Hangfire.Dashboard.BasicAuthorization) 提供了简单的用户名+密码的实现，可以通过 NuGet 安装包到本地项目

```shell
Install-Package Hangfire.Dashboard.BasicAuthorization
```

## 使用

```csharp
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    Authorization = new[]
    {
        new BasicAuthAuthorizationFilter(new BasicAuthAuthorizationFilterOptions
        {
            RequireSsl = false,
            SslRedirect = false,
            LoginCaseSensitive = true,
            Users = new [] { new BasicAuthAuthorizationUser { Login = "admin", PasswordClear =  "test" } }
        })
    }
});
```

也可以通过 [只读 Dashboard](https://docs.hangfire.io/en/latest/configuration/using-dashboard.html#read-only-view) 来达到数据保护的目的

```csharp
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    IsReadOnlyFunc = (DashboardContext context) => true
});
```
