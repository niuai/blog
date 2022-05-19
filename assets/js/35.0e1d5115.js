(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{412:function(t,s,a){"use strict";a.r(s);var r=a(45),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"svn迁移到git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#svn迁移到git"}},[t._v("#")]),t._v(" SVN迁移到Git")]),t._v(" "),a("p",[t._v("Git本身自带了 "),a("code",[t._v("git svn")]),t._v(" 工具，方便将现有的svn代码迁移到Git。")]),t._v(" "),a("blockquote",[a("p",[t._v("参考链接："),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/azure/devops/repos/git/perform-migration-from-svn-to-git?view=azure-devops",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://docs.microsoft.com/en-us/azure/devops/repos/git/perform-migration-from-svn-to-git?view=azure-devops"),a("OutboundLink")],1)])]),t._v(" "),a("p",[t._v("环境需求：Git、SVN Server（SVN命令行工具）")]),t._v(" "),a("h2",{attrs:{id:"操作步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤"}},[t._v("#")]),t._v(" 操作步骤")]),t._v(" "),a("ol",[a("li",[a("p",[t._v("获取svn提交的所有用户名（如果用户不全的话，后面的迁移会报错），该用户名单用于将svn提交信息映射到Git。执行以下PowerShell命令（windows）来获得svn的用户列表。最后的文件内容类似于 "),a("code",[t._v("jamal = Jamal Hartnett <jamal@fabrikam-fiber.com>")])]),t._v(" "),a("div",{staticClass:"language-Powershell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-powershell"}},[a("code",[t._v("svn log "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("quiet "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" ? "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$_")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-notlike")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'-*'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{0} = {0} <{0}>"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("f "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$_")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("split "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("' \\| '")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Select-Object")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("Unique "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Out-File")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'authors-transform.txt'")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("将svn中的内容迁移到Git。执行以下命令（如果svn仓库太大，该步骤可能耗时较长）")]),t._v(" "),a("div",{staticClass:"language-Powershell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-powershell"}},[a("code",[t._v("git svn clone "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"SVN repo URL"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("prefix=svn"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("no"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("metadata "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("trunk="),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("trunk "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("branches="),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("branches "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("tags="),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("tags  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("authors"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("file "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"authors-transform.txt"')]),t._v(" c:\\mytempdir\n")])])])]),t._v(" "),a("li",[a("p",[t._v("将本地的Git推送到远端Git仓库")])])]),t._v(" "),a("h2",{attrs:{id:"例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#例子"}},[t._v("#")]),t._v(" 例子")]),t._v(" "),a("ol",[a("li",[a("p",[t._v('git svn clone [svn url] --prefix=svn/ --no-metadata --authors-file "authors-transform.txt" "D:~temp\\migration\\svn-git"')])]),t._v(" "),a("li",[a("p",[t._v("git remote add origin [git remote url]")])]),t._v(" "),a("li",[a("p",[t._v("git push origin master")])]),t._v(" "),a("li",[a("p",[t._v("git svn fetch （拉取svn上最新的代码）")])]),t._v(" "),a("li",[a("p",[t._v("git merge remotes/svn/git-svn （将更新合并到master分支）")])]),t._v(" "),a("li",[a("p",[t._v("git push origin master")])])]),t._v(" "),a("h2",{attrs:{id:"其他"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他")]),t._v(" "),a("p",[t._v("获取svn新提交的内容："),a("code",[t._v("git svn fetch")]),t._v(", 将更新合并到Git的分支 "),a("code",[t._v('git merge ["remote branch name"]')])])])}),[],!1,null,null,null);s.default=e.exports}}]);