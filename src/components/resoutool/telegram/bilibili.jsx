/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useState,useEffect} from 'react'
import TextChunk from "../../chunk/text-chunk";
import BilibiliSearchList from "./biliList"
import { Pagination, Input } from 'antd';
import PubSub from 'pubsub-js';
import axios from 'axios';
import Tag from "../../tag/tag";
import './bilibili.css'
import {tagdata,searchtype} from './api'
const { Search } = Input;

function SearchTag(props) {
    const tag = tagdata;
    const onSearch = props.search;

    const searchTag = e => {
        e.preventDefault();
        onSearch(e.target.textContent)
    }

    return (
        <>
            {tag.map((item, index) => {
                return (
                    <TextChunk fontSize={17} key={item.id} lineheight='_' onClick={searchTag}><Tag color={item.color}>{ item.content}</Tag></TextChunk>
                )
            })}
        </>
    )
}

// export default function Bilibili() {
//     const [searchListdata, setListData] = useState();
//     const [searching, setSearching] = useState('西游记');
//     const [searchtype, setSearchtype] = useState('video');
//     const [total, setTotal] = useState()

//     const pagechange = (e, t) => {
//         PubSub.publish('isBiliLoad', true);
//         (async function () {
//             const getvalue = await axios.get(`http://rainsin.yicp.top/biliapi/search/type?search_type=${searchtype}&keyword=${searching}&page=${e}`);
//             setListData(getvalue);
//             let total = getvalue.data.data.pageinfo[searchtype].total
//             setTotal(total)
//             PubSub.publish('isBiliLoad', false)
//         })()
//     }
//     //搜索逻辑
//     const onValueSearch = q => {
//         PubSub.publish('isBiliLoad', true);
//         setSearching(q);
//         let data;
//         (async function (q) {
//             const getvalue = await axios.get(`http://rainsin.yicp.top/biliapi/search?keyword=${q}`);
//             setListData(getvalue);
//             data = getvalue;
//             let total = data.data.data.pageinfo[searchtype].total
//             setTotal(total)
//             PubSub.publish('isBiliLoad', false)
//         })(q);
//     }
//     //页码搜索
//     const onPageSearch = (_, page) => {
//         PubSub.publish('isBiliLoad', true);
//         (async function (searchtype, searching, page) {
//             const getvalue = await axios.get(`http://rainsin.yicp.top/biliapi/search/type?search_type=${searchtype}&keyword=${searching}&page=${page}`);
//             setListData(getvalue);
//             let total = getvalue.data.data.pageinfo[searchtype].total
//             setTotal(total)
//             PubSub.publish('isBiliLoad', false)
//         })(searchtype, searching, page);
//     }
//     //类型搜索
//     const onTypeSearch =(_, data) => {
//         PubSub.publish('isBiliLoad', true);
//         setSearchtype(data);
//         (async function (q) {
//             const getvalue = await axios.get(`http://rainsin.yicp.top/biliapi/search?keyword=${q}`);
//             setListData(getvalue);
//             let total = getvalue.data.data.pageinfo[searchtype].total
//             setTotal(total)
//             PubSub.publish('isBiliLoad', false)
//         })(searching);
//     }


//     //订阅
//     useEffect(() => {
//         //改变页码
//         const pagechange = PubSub.subscribe('change_page', onPageSearch);
//         //改变类型
//         const typechange = PubSub.subscribe('change_type', onTypeSearch);
//     }, [])


//     useEffect(() => {
//         console.log('@sss', total);
//         console.log('type', searchtype );
//     })

//         return <div className='Telegram-search'>
//             <Search placeholder="电影/电视剧/番剧" onSearch={onValueSearch} />
//             {/* <Pagination total={500} /> */}
//             <div className='search-bili-tag'>
//                 <SearchTag search={onValueSearch}></SearchTag>
//             </div>
//             <BilibiliSearchList data={searchListdata}></BilibiliSearchList>
//             <div className='pagination-center'>
//             <Pagination defaultPageSize={20} showSizeChanger={false} total={total} onChange={pagechange} />
//             </div>
//         </div>
// }
