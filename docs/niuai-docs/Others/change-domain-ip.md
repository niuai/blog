# 本地修改域名的指向IP

## 通过修改 host 文件的方式

找到文件 `C:\Windows\System32\drivers\etc\hosts`，添加以下解析记录，就可以在本地通过在浏览器输入 `www.baidu.com` 来访问 `202.105.96.196` 的效果

    ```txt
    202.105.96.196 www.baidu.com
    ```

## 通过 Fiddler 修改 rule 的方式

打开 Fiddler -> Rules -> Customize Rules...，在 `OnBeforeRequest` 方法中添加以下代码，保存

    ```csharp
    if (oSession.HostnameIs("www.baidu.com")) {
        oSession.bypassGateway = true;                   // Prevent this request from going through an upstream proxy
        oSession["x-overrideHost"] = "202.105.96.196";  // DNS name or IP address of target server
    }
    // 或者
    if (oSession.host.toLowerCase() == "webserver:8888") oSession.host = "webserver:80";
    ```
