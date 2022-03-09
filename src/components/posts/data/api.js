/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
export const IsOpen = {
    open: setOpen => setOpen(true),
    close: setClose => setClose(false)
}

const artData = [
    {
        id: 1,
        url: 'https://rainsin-1305486451.file.myqcloud.com/img/webp/blog/note.webp',
        title: '⌨️ 🖥  前端技术',
        isTag: false,
        classrouter: '/blog/technology',
    },
    {
        id: 2,
        url: 'https://rainsin-1305486451.file.myqcloud.com/img/webp/blog/76419.webp',
        title: '🪢  ✍🏻 其他技术 🏸️',
        isTag: false,
        classrouter: '/blog/other',
    },
    {
        id: 3,
        url: 'https://goodstock.photos/wp-content/uploads/before-i-die-chalkboard-sign.jpg',
        title: '📖 随笔',
        isTag: false,
        classrouter: '/blog/notes',
    },
    {
        id: 4,
        url: 'https://rainsin-1305486451.file.myqcloud.com/img/webp/blog/JSECoin.-Javascript-embedded-cryptocurrency-20077.jpg',
        title: '🛸 奇奇怪怪 👽',
        isTag: false,
        classrouter: '/blog/curious'
    }
]
export default artData