# 使用多重认证架构（Mutliple Authentication Schemes）

> 原文：[ASP.NET Core - Using Mutliple Authentication Schemes](https://www.abhith.net/blog/aspnet-core-using-multiple-authentication-schemes/)

参考文档：

- [Creating And Validating JWT Tokens In ASP.NET Core](https://dotnetcoretutorials.com/2020/01/15/creating-and-validating-jwt-tokens-in-asp-net-core/)

在某些情况下，你可能想让控制器方法具有多种认证方式。比如：我既想通过 `Identity Server` 来鉴权，也想通过自定义的方法来鉴权（最终需要两者都验证通过或者某一项验证通过才行）。要想实现这点，就需要创建自己的 `AuthenticationScheme`、自定义 schema（类似JwtBearer）以及配置一个 `Policy`。

***Tips: 最终是需要都验证通过，还是某一个验证通过就可以？***

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

然后 `AuthenticationSchemeOptions`，该类充当的角色类似配置

```csharp
using Microsoft.AspNetCore.Authentication;
public class CustomAuthOptions : AuthenticationSchemeOptions
{
    public string UserInfoEndpoint { get; set; }
}
```

定义自定义认证逻辑 [`CustomAuthenticationHandler`](https://github.com/niuai/AgileConfig/blob/a24b2fd22dbab631bfb5559da2bef5b83d372d3b/AgileConfig.Server.Apisite/Auth/AgileConfigAuthenticationHandler.cs)

在 `ConfigureServices` 方法中注册该服务 `services.AddCustomAuthentication(Configuration);`

```csharp
public static IServiceCollection AddCustomAuthentication(this IServiceCollection services, IConfiguration configuration)
{
    // Identity Server Configuration
    var identityUrl = configuration.GetValue<string>("Authentication:IdentityServerBaseUrl");
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(options =>
    {
        options.Authority = identityUrl;
        options.RequireHttpsMetadata = false;
        options.Audience = "your_api";
    });

    // Custom Authentication configuration
    services.AddAuthentication(CustomAuthenticationDefaults.AuthenticationScheme)
        .AddScheme<CustomAuthOptions, CustomAuthenticationHandler>(CustomAuthenticationDefaults.AuthenticationScheme,
        o => o.UserInfoEndpoint = configuration.GetValue<string>("Authentication:Custom:UserInfoEndpoint"));

    // we define policies here where we configure which scheme or combinations we need for each of our policies.
    services.AddAuthorization(options =>
    {
        // authorize using custom auth scheme only
        options.AddPolicy("UserRole", policy =>
        {
            policy.AuthenticationSchemes.Add(CustomAuthenticationDefaults.AuthenticationScheme);
            policy.RequireRole("User");
        });

        // authorize using custom auth scheme as well as identity server
        options.AddPolicy("OrdersWrite", policy =>
        {
            policy.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
            policy.AuthenticationSchemes.Add(CustomAuthenticationDefaults.AuthenticationScheme);
            policy.RequireClaim("scope", "orders:write");
        });
    });

    return services;
}
```

接下来是如何使用该验证逻辑，在控制器方法上增加特性

```csharp
[Authorize(Policy = "OrdersWrite")]
public async Task<ActionResult<OrderResult>> CreateOrder(OrderRequest orderRequest)
{
    var clientIdClaim = HttpContext.User.FindFirst("client_id"); // identity server client
    var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier); // user authenticated using custom auth handler.
    ...
}
```

现在，我们就可以在Http请求头中加入身份标识来请求资源了

```shell
Authorization: <type> <credentials>
```

Identity Server 的

```shell
Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

自定义的

```shell
Authorization: custom abcasdjasdjlaksdjlasjdlasjd
```
