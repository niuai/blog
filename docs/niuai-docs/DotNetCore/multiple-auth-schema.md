# 使用多重认证架构（Mutliple Authentication Schemes）

> 原文：[ASP.NET Core - Using Mutliple Authentication Schemes](https://www.abhith.net/blog/aspnet-core-using-multiple-authentication-schemes/)

参考文档：

- [Creating And Validating JWT Tokens In ASP.NET Core](https://dotnetcoretutorials.com/2020/01/15/creating-and-validating-jwt-tokens-in-asp-net-core/)

在某些情况下，你可能想让控制器方法具有多种认证方式。比如：我既想通过 `Identity Server` 来鉴权，也想通过自定义的方法来鉴权（最终需要两者都验证通过或者某一项验证通过才行）。要想实现这点，就需要创建自己的 `AuthenticationScheme`、自定义 schema（类似JwtBearer）以及配置一个 `Policy`。

## 自定义 AuthenticationScheme

创建一个自定义的 authentication scheme，它将服务于标记了 `[Authorize]` 特性的控制器方法。

为了创建一个自定义的 authentication scheme，你需要定义以下内容，

- CustomAuthenticationDefaults
- CustomAuthenticationHandler
- CustomAuthenticationOptions

首先，定义 `CustomAuthenticationDefaults`

```csharp
public static class CustomAuthenticationDefaults
{
    public const string AuthenticationScheme = "Custom";
}
```
