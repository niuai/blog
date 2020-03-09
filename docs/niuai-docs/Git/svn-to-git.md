# SVN迁移到Git

Git本身自带了 `git svn` 工具，方便将现有的svn代码迁移到Git。

> 参考链接：<https://docs.microsoft.com/en-us/azure/devops/repos/git/perform-migration-from-svn-to-git?view=azure-devops>

环境需求：Git、SVN Server（SVN命令行工具）

## 操作步骤

1. 获取svn提交的所有用户名（如果用户不全的话，后面的迁移会报错），该用户名单用于将svn提交信息映射到Git。执行以下PowerShell命令（windows）来获得svn的用户列表。最后的文件内容类似于 `jamal = Jamal Hartnett <jamal@fabrikam-fiber.com>`

    ```Powershell
    svn log --quiet | ? { $_ -notlike '-*' } | % { "{0} = {0} <{0}>" -f ($_ -split ' \| ')[1] } | Select-Object -Unique | Out-File 'authors-transform.txt'
    ```

2. 将svn中的内容迁移到Git。执行以下命令（如果svn仓库太大，该步骤可能耗时较长）

    ```Powershell
    git svn clone ["SVN repo URL"] --prefix=svn/ --no-metadata --trunk=/trunk --branches=/branches --tags=/tags  --authors-file "authors-transform.txt" c:\mytempdir
    ```

3. 将本地的Git推送到远端Git仓库

## 例子

1. git svn clone [svn url] --prefix=svn/ --no-metadata --authors-file "authors-transform.txt" "D:\~temp\migration\svn-git"

2. git remote add origin [git remote url]

3. git push origin master

4. git svn fetch （拉取svn上最新的代码）

5. git merge remotes/svn/git-svn （将更新合并到master分支）

6. git push origin master

## 其他

获取svn新提交的内容：`git svn fetch`, 将更新合并到Git的分支 `git merge ["remote branch name"]`
