/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import PubSub from 'pubsub-js';
import axios from 'axios';

export const tagdata = [
    {
        id: 1,
        content: '四大名著',
        color: 'blue',
    },
    {
        id: 2,
        content: '没事偷着乐',
        color: 'gray',
    },
    {
        id: 3,
        content: '海绵宝宝',
        color: 'yellow',
    },
    {
        id: 4,
        content: '伟大的卫国战争',
        color: 'pink',
    },
    {
        id: 5,
        content: '扬名立万',
        color: 'gray',
    },
    {
        id: 6,
        content: '舌尖上的中国',
        color: 'purple',
    },
    {
        id: 7,
        content: '火烈鸟的传说',
        color: 'green',
    },
    {
        id: 8,
        content: '来自远古星星的你',
        color: 'orange',
    },
    {
        id: 9,
        content: '活着',
        color: 'green',
    }
    ,{
        id: 10,
        content: '老友记',
        color: 'red',
    }
]
export const searchtype = [
    {
        id:1,
        mid: 'video',
        name: '视频',
    },
    {
        id: 2,
        mid: 'media_bangumi',
        name: '番剧'
    },
    {
        id:3,
        mid: 'media_ft',
        name: '影视'
    },
    // {
    //     live: 'live'
    // },
    // {live_room: 'live_room'},
    // {live_user: 'live_user'},
    // {article: 'article'},
    // {topic: 'topic'},
    // {bili_user: 'bili_user'},
    // {photo: 'photo'},
]
const bilidata = [];
export default bilidata