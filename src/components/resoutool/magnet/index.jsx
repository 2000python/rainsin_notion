/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useState, useEffect,useContext } from "react";
import PubSub from "pubsub-js";
import copy from "copy-to-clipboard"
import TextChunk from "../../chunk/text-chunk";
import Tag from "../../tag/tag";
import axios from "axios";
import magnetParam from '../../../api/magnet'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

import './index.css'

function MagnetSelectUI(props) {
    const select = useContext(Context)
    useEffect(() => {
        console.log(select);
    })
    const change = (event,newValue) => {
        select.select_magnet_value(newValue.param);
        console.log(select.magnet_param);
    }
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 150 }}
      onChange={change}
      options={magnetParam}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="选择平台"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
const MagnetSelect = observer(MagnetSelectUI);
function CustomizedInputBase(props) {
    const search = props.onSearch;
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
    );
  }
function Search(props) {
    const search = props.onSearch;
    return<></>
}
function Empty() {
    return<></>
}
function Spin() {
    return<></>
}
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

/**
 * 磁力搜索列表 组件
 * @param {Boolean} isLoading 设置列表数据
 * @param {Array} list 设置hint组件宽度
 * @return {ReactComponent}
 */

function MagnetList(props) {
    return props.isLoading ? <div className="show-magnet-list magnet-center-empty"><Spin  /></div> :
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
            const getvalue = await axios.get(`http://rainsin.yicp.top/getmagnet?s=${s}&q=${q}&p=${p}`)
            getSearchvalue(getvalue.data.data instanceof Array ? getvalue.data.data : [])
            PubSub.publish('isLoad', false)
        })(s, q, p)
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
            <MagnetSelect />
            <CustomizedInputBase onSearch={onSearch}></CustomizedInputBase>
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