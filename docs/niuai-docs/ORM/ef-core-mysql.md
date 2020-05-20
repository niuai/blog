# EFCore 连 MySQL

## Nuget 安装

1. Microsoft.EntityFrameworkCore.Tools
2. 目前比较常用的有两个
    - MySql.Data.EntityFrameworkCore
    - Pomelo.EntityFrameworkCore.MySql

本文采用 `Pomelo.EntityFrameworkCore.MySql`，个人感觉这个对 MySQL 的支持更好（比如 `MySql.Data.EntityFrameworkCore` 对 Guid 的支持就不好，数据库映射时需要手动配置字段的类型为 `char(36)`，否则会匹配成 `binary`，导致数据存为乱码；而且需要手动去生成表 `__EFMigrationsHistory`），且 `Pomelo.EntityFrameworkCore.MySql` 在实时保持更新。

## 创建 DbContext、实体类

参考之前的文档：[EFCore 连 MySQL](./ef-core.md)，需要注意的是，`SampleContext` 只能留有一个带 `DbContextOptionsBuilder` 参数的构造函数（把之前空参数的构造函数删掉）

## 配置连接字符串、注入

```json
{
  "ConnectionStrings": {
    "Default": "server=127.0.0.1;user=root;database=sample;port=3306;password=123456;SslMode=None"
  }
}
```

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContextPool<SampleContext>(options => options
        .UseMySql(Configuration.GetConnectionString("Default"), mySqlOptions => mySqlOptions
            // replace with your Server Version and Type
            .ServerVersion(new Version(5, 6, 0), ServerType.MySql)
    ));
}
```

## 数据库迁移 Migration

基本和常规的操作一样，`Add-Migration [xxx]`，`Update-Database`
