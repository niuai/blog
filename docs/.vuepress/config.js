const path = require('path')
const fs = require('fs')

let docGroups = ['']
let tempDocGroups = findDoc(path.resolve(__dirname + '/../niuai-docs/'))

for (let index in tempDocGroups) {
    if (tempDocGroups[index].length > 0) {
        docGroups.push({
            title: index,
            collapsable: true,
            children: tempDocGroups[index].map(filePath => filePath.substring(filePath.indexOf('niuai-docs') - 1).replace(/\\/g, '/')),
        })
    }
}

module.exports = {
    title: '牛艾的博客',
    description: '牛艾的博客',
    base: '/blog/',
    head: [
        ['link', { rel: 'icon', href: '/assets/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/assets/user-logo.jpg',
        navbar: true,
        sidebar: 'auto',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        repo: 'niuai/blog',
        repoLabel: 'GitHub',
        smoothScroll: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/niuai-docs/' },
        ],
        sidebar: {
            '/niuai-docs/': docGroups,
        }
    },
}

/**
 * 遍历获取某一文件夹下的所有文件，返回结果为二维数组：文件夹名称及其下的文件
 * @param {*} startPath 起始目录文件夹路径
 * @returns {Array}
 */
function findDoc(startPath) {
    let result = new Array()
    function finder(innerPath) {
        let folder = innerPath.replace(/\\/g, '/').split('/').pop()
        result[folder] = new Array()

        fs.readdirSync(innerPath).forEach((file, index) => {
            let fPath = path.join(innerPath, file)
            let stats = fs.statSync(fPath)

            if (stats.isDirectory() && !fPath.endsWith('assets')) finder(fPath)
            if (stats.isFile() && fPath.endsWith('.md') && !fPath.endsWith('README.md')) result[folder].push(fPath)
        })
    }
    finder(startPath)
    return result
}