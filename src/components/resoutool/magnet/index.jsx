/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";
import copy from "copy-to-clipboard"
import TextChunk from "../../chunk/text-chunk";
import Tag from "../../tag/tag";
import axios from "axios";
import { Select,Input,Empty,Spin  } from 'antd';
import magnetParam from '../../../api/magnet'
import { LoadingOutlined } from '@ant-design/icons';

import './index.css'

const { Option } = Select;
const { Search } = Input;

function ListItem(props) {
    const onCopy = () => {
        copy(props.magnet);
        alert('链接成功复制！')
    }
    return (
        <div className="show-magnet-list-item"  onClick={onCopy} title='单击复制链接'>
            <span className="show-magnet-list-item-title">{props.title}</span>
            <div className="show-magnet-list-down">
                <span className="show-magnet-list-item-time">添加时间:<Tag color='pink'>{ props.time}</Tag></span>
                <span className="show-magnet-list-item-size">文件大小:<Tag color='green'>{props.size}</Tag></span>
            </div>

        </div>
    )
}
function MagnetList(props) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(() => {
        console.log(props.list);
    },[])
    return props.isLoading ? <div className="show-magnet-list magnet-center-empty"><Spin indicator={antIcon} /></div> :
    props.list && props.list.length === 0 ? <div className="show-magnet-list magnet-center-empty"><Empty description='没有数据' /></div> :
        <div className="show-magnet-list">
            {props.list.map((item,index) => {
                return (
                    <ListItem key={index} title={item.title} size={item.size} magnet={item.magnet} time={item.time}></ListItem>
                )
            })}
        </div>
    
}

function Magnet() {
    //平台
    const [searchPlat, setPlat] = useState('u3c3')
    const [searchValue, getSearchvalue] = useState([])
    const [isLoading,setLoading] = useState(false)
    //发起搜索请求
    const onSearch = value => {
        PubSub.publish('isLoad', true);
        let s = searchPlat, q = value,p = 1;
        (async function (s = 'btsow', q, p = 1) {
            const getvalue = await axios.get(`http://127.0.0.1:7001/getmagnet?s=${s}&q=${q}&p=${p}`)
            getSearchvalue(getvalue.data.data)
            PubSub.publish('isLoad', false)
        })(s, q, p)
    }
    //改变搜索平台
    const changePalt = value => {
        setPlat(value)
    }
    //点击标签搜索
    const searchTag = e => {
        e.preventDefault();
        onSearch(e.target.textContent)
    }
    const Loading = (_,data) => {
        if (data) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }
    useEffect(() => {
        const ss = PubSub.subscribe('isLoad', Loading)
    })

    return(
        <>
            <div className="input-search-magnet">
                <Select defaultValue='u3c3' style={{ width: 150 }} onChange={changePalt}>
                    {magnetParam.map((item,index)=>{
                        return (
                        <Option key={item.id} value={item.param}>{ item.name}</Option>
                        )
                    })}
            </Select>
            <Search placeholder="电影/电视剧/神秘代码" onSearch={onSearch}  />
            </div>
            <div className="magnet-suggest">
            <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='purple'>活宝三人组</Tag></TextChunk>
                <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='orange'>明里紬</Tag></TextChunk>
                <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='brown'>山岸逢花</Tag></TextChunk>
                <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='green'>安斋拉拉</Tag></TextChunk>
                <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='blue'>希岛爱理</Tag></TextChunk>
                <TextChunk fontSize={17} lineheight='_' onClick={searchTag}><Tag color='red'>MIAA-525</Tag></TextChunk>
            </div>
            <MagnetList list={searchValue} isLoading={isLoading}>
            </MagnetList> 
         </>
    )
}

export default Magnet