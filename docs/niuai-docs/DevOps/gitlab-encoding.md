# GitLab不识别Unicode编码的文件

在将文件上传到GitLab上后，在文件预览、PR中有些文件无法查看，提示 `No preview for this file type`，经查验，发现是编码问题导致的。

> 问题发生于 On-Premiss GitLab  
> 最后发现 GitLab Online 版本（可以在域名后加 `/help` 来查看版本）可以识别这些文件，推测是新版本解决了这个问题

1. GitLab无法识别Unicode的文件（似乎只能识别UTF-8的）

    - <https://forum.gitlab.com/t/code-preview-not-working-for-some-files/1633>
    - <https://q.cnblogs.com/q/106816/>

2. 编码相关文档：[字符编码笔记：ASCII，Unicode 和 UTF-8 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

3. 批量将文件改为其他编码（Powershell）

    - [微软文档](https://docs.microsoft.com/zh-cn/archive/blogs/samdrey/determine-the-file-encoding-of-a-file-csv-file-with-french-accents-or-other-exotic-characters-that-youre-trying-to-import-in-powershell)
    - [Get Text File Encoding](https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/get-text-file-encoding)

方法步骤：

1. 获取文件编码：

    ```Powershell
    function Get-FileEncoding
    {
    param
    (
        [Parameter(Mandatory,ValueFromPipeline,ValueFromPipelineByPropertyName)]
        [Alias('FullName')]
        [string]
        $Path
    )

    process
    {
        $bom = New-Object -TypeName System.Byte[](4)

        $file = New-Object System.IO.FileStream($Path, 'Open', 'Read')

        $null = $file.Read($bom,0,4)
        $file.Close()
        $file.Dispose()

        $enc = 'ASCII'
        if ($bom[0] -eq 0x2b -and $bom[1] -eq 0x2f -and $bom[2] -eq 0x76)
        { $enc =  'UTF7' }
        if ($bom[0] -eq 0xff -and $bom[1] -eq 0xfe)
        { $enc =  'Unicode' }
        if ($bom[0] -eq 0xfe -and $bom[1] -eq 0xff)
        { $enc =  'BigEndianUnicode' }
        if ($bom[0] -eq 0x00 -and $bom[1] -eq 0x00 -and $bom[2] -eq 0xfe -and $bom[3] -eq 0xff)
        { $enc =  'UTF32'}
        if ($bom[0] -eq 0xef -and $bom[1] -eq 0xbb -and $bom[2] -eq 0xbf)
        { $enc =  'UTF8'}

        [String]$enc
    }
    }
    ```

2. 批量修改文件编码

    ```Powershell
    Get-ChildItem **/** | select FullName, @{n='Encoding';e={Get-FileEncoding $_.FullName}} | where {$_.Encoding -ne 'ASCII'} | foreach {(get-content $_.FullName) | set-content $_.FullName -Encoding ASCII}
    ```
