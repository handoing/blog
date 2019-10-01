module.exports = {
    theme: 'vuepress-theme-yubisaki',
    base: "/",
    title: 'Handoing Blog',
    description: 'Handoing Blog',
    serviceWorker: true,
    evergreen: true,
    markdown: {
        anchor: { permalink: true },
        toc: { includeLevel: [1, 2] }
    },
    themeConfig: {
        background: `#fff`,
        github: 'handoing',
        per_page: 5,
        date_format: 'yyyy-MM-dd',
        footer: '钢铁般的回忆对你说句爱你三千遍',
        nav: [
            { text: '首页', link: '/' },
            { text: '标签', link: '/tag/' },
            { text: 'GITHUB', link: 'https://github.com/handoing' },
            { text: '关于我', link: '/about/' },
        ]
    }
}