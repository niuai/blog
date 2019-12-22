const path = require('path')
const fs = require('fs')

/**
 * 遍历获取某一文件夹下的所有文件
 * @param {*} startPath 起始目录文件夹路径
 * @returns {Array}
 */
function findSync(startPath) {
    let result = []
    function finder(innerPath) {
        fs.readdirSync(innerPath).forEach((file, index) => {
            let fPath = path.join(innerPath, file)
            let stats = fs.statSync(fPath)

            if (stats.isDirectory()) finder(fPath)
            if (stats.isFile()) result.push(fPath)
        })
    }
    finder(startPath)
    return result
}

let docs = findSync(path.resolve(__dirname + '/../niuai-docs/'))
    .filter(filePath => !filePath.endsWith('README.md'))
    .map(filePath => filePath.substring(filePath.indexOf('niuai-docs') - 1).replace(/\\/g, '/'))

module.exports = {
    title: '牛艾的博客',
    description: '牛艾的博客',
    base: '/blog/',
    head: [
        ['link', { rel: 'icon', href: '/assets/favicon.ico' }]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@': '../.vuepress',
                '@assets': './public/assets',
                '@public': './public',
            }
        }
    },
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
            { text: 'Guide', link: '/guide/' },
            { text: 'Docs', link: '/niuai-docs/' },
        ],
        sidebar: {
            '/guide/': [
                '',
            ],
            '/niuai-docs/': [
                '',
                {
                    title: '学习笔记',
                    collapsable: false,
                    children: docs,
                },
            ],
        }
    },
    plugins: [
        '@vuepress/last-updated',
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/google-analytics',
        { 'ga': 'UA-00000000-0' },
        '@vuepress/medium-zoom',
        '@vuepress/nprogress'
    ]
}