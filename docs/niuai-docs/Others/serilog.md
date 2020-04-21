# Serilog

Serilog 做为 `结构化` 日志，它使得日志信息更加方便查询（不是只有 error message）。和一些老的日志类库相比（如log4net），在使用Serilog时，你需要做的最大改变就是思考日志事件 `[log events]`，而不是日志消息 `[log message]`。一条事件`[event]`由以下几个内容组成：

- 事件发生时的时间戳 `[timestamp]`
- 描述何时应该捕获事件的级别 `[level]`
- 记录事件的消息 `[message]`
- 描述事件的命名属性 `[properties]`
- 还可能有一个Exception对象

## 语法

1. 命名参数：

    ```csharp
    var itemNumber = 10;
    var itemCount = 999;

    Log.Debug("Processing item {ItemNumber} of {ItemCount}", itemNumber, itemCount);
    ```

    会在日志中添加两个属性 `ItemNumber`、`ItemCount`，并可执行类似查询（不需要正则）：`ItemNumber > 8`

    > 问：这与C#本身的字符串插值语法会不会冲突呢？比如：`$"Hello ${niuai}"`  
    > 答：Serilog 的 `Log` 提供了所有与 `ILogger` 接口相同的方法，所以可以不用 `$"{a}"` 语法

    ```JSON
    {
        "@t": "2017-11-20T11:33:01.22138",
        "@l": "Debug",
        "@m": "Processing item 10 of 999",
        "ItemNumber": 10,
        "ItemCount": 999
    }
    ```

2. 用 `@` 来表示对象：

    ```csharp
    var user = new { Name = "Nick", Id = "nblumhardt" };
    Log.Information("Logged on user {@User}", user);
    ```

    会将 `User` 表示为对象

    ```JSON
    {
        "@t": "2017-11-20T11:33:01.22138",
        "@m": "Logged on user {\"Name\": \"Nick\", \"Id\": \"nblumhardt\"}",
        "User": {"Name": "Nick", "Id": "nblumhardt"}
    }
    ```

## 其他

> VS 插件（分析C#中Log语法的合理性）：[Serilog Analyzer](https://marketplace.visualstudio.com/items?itemName=Suchiman.SerilogAnalyzer)  
> 相关Serilog文档：[Serilog Tutorial - 博客园](https://www.cnblogs.com/mq0036/p/8479956.html)
