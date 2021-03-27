# EFCore 的简单使用

## 安装 nuget 包（MSSQL DB first）

```shell
Install-Package Microsoft.EntityFrameworkCore
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Tools
```

## 创建实体、DBContext

```csharp
public class SampleContext : DbContext
{
    public SampleContext() : base() { }

    public SampleContext(DbContextOptions<SampleContext> options) : base(options)
    {

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("NetCoreSample"); // 不用默认的 [dbo] Schema，而是自定义该值

        base.OnModelCreating(modelBuilder);
    }
}
```

## 连接字符串

Windows验证，位于 `appsettings.json` 配置文件的根节点的 `ConnectionStrings` 节点下

```json
{
  "ConnectionStrings": {
    "Default": "Server=localhost\\SQLEXPRESS;Database=NetCoreSample;Trusted_Connection=True;"
  }
}
```

## 在 Startup.cs 类中的 `ConfigureServices` 方法里注入该 DBContext

```csharp
services.AddDbContext<SampleContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));
```

## 添加数据库迁移文件

打开程序包管理控制台，选择正确的默认项目，敲入 `add-migration [description]`，此时会自动生成迁移代码，再敲入 `update-database`，就可以将代码中的数据库结构反映到数据库（MSSQL、MySQL）中

- 自动生成的代码

    ![migrations](./assets/images/ef-migration.png)

- 数据库

    ![ef-database](./assets/images/ef-database.png)

## 使用

在代码中注入 `SampleContext`，就可以对该数据库增删改查了

## 其他

1. 将 Migration 生成SQL脚本而不是直接实施于数据库（在生产环境时，常常并不能直接操作数据库，而是通过CI、CD执行SQL脚本）

    ```shell
    Script-Migration -From 0
    ```

    0表示包括所有的迁移，如果是比如 Init，就从 Init 之后的（不包括），也可以用 -To 来获取到哪个

2. 值转换（Value Conversions），属性与数据库字段不是完全匹配的时候，而是具有函数关系时

    > 参考：<https://docs.microsoft.com/en-us/ef/core/modeling/value-conversions>

    ```csharp
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .Entity<Rider>()
            .Property(e => e.Mount)
            .HasConversion(
                v => v.ToString(), // 属性到数据库的映射
                v => (EquineBeast)Enum.Parse(typeof(EquineBeast), v)); // 数据库到属性的映射
    }
    ```

3. 表拆分，如果一个实体的属性太多，想将部分属性聚合成一个新实体属性，但仍想要存在一张表里，就可以用 [Table Splitting](https://docs.microsoft.com/en-us/ef/core/modeling/table-splitting) 来实现

    ```csharp
    public class Order
    {
        public int Id { get; set; }
        public OrderStatus? Status { get; set; }
        public DetailedOrder DetailedOrder { get; set; }
    }
    ```

    ```csharp
    public class DetailedOrder
    {
        public int Id { get; set; }
        public OrderStatus? Status { get; set; }
        public string BillingAddress { get; set; }
        public string ShippingAddress { get; set; }
        public byte[] Version { get; set; }
    }
    ```

    ```csharp
    modelBuilder.Entity<DetailedOrder>(dob =>
    {
        dob.ToTable("Orders");
        dob.Property(o => o.Status).HasColumnName("Status");
    });

    modelBuilder.Entity<Order>(ob =>
    {
        ob.ToTable("Orders");
        ob.Property(o => o.Status).HasColumnName("Status");
        ob.HasOne(o => o.DetailedOrder).WithOne()
            .HasForeignKey<DetailedOrder>(o => o.Id);
    });
    ```

4. 计算列，如果想将实体的一组字段组合起来存到数据库（并将被组合的字段标为 `NotMapped`），可以通过以下方式实现（`set` 属性是必需的，尽管什么都不做，否则数据库无法生成该属性对应的字段）

    > 注意：自增的整形ID无法映射到该字段之中，估计是因为ID的自增发生在数据库，所以计算列中的ID始终为0

    ```csharp
    using ConsoleApp.Enums;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace ConsoleApp.DataAccess.Entities
    {
        public class User
        {
            public int Id { get; set; }

            public string Name { get; set; }

            [NotMapped]
            public UserType UserType { get; set; }

            public string DisplayName
            {
                get => $"{UserType}-{Id}-{Name}";
                private set { }
            }
        }
    }
    ```
