const fs = require('fs');
const path = require('path');

const openComment = false;
let comment = {};

if (openComment) {
  const commentDataPath = path.join(__dirname, './comment.json');
  const commentExist = fs.existsSync(commentDataPath);
  if (commentExist) {
    const commentKeys = fs.readFileSync(commentDataPath, 'utf-8');
    comment = {
        comment: {
            repo: "blog",
            owner: "handoing",
            locale: "zh",
            perPage: 5,
            ...JSON.parse(commentKeys)
        }
    }
  }
}

module.exports = {
    theme: 'vuepress-theme-yubisaki',
    base: "/",
    title: 'Hank Blog',
    description: 'Hank Blog',
    serviceWorker: true,
    evergreen: true,
    markdown: {
        anchor: {
            permalink: true
        },
        toc: {
            includeLevel: [1, 2]
        }
    },
    themeConfig: {
        background: `#fff`,
        github: 'handoing',
        per_page: 5,
        date_format: 'yyyy-MM-dd',
        footer: '钢铁般的回忆对你说句爱你三千遍',
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '标签',
                link: '/tag/'
            },
            {
                text: '关于我',
                link: '/about/'
            },
            {
                text: 'GITHUB',
                link: 'https://github.com/handoing'
            },
        ],
        ...comment
    }
}