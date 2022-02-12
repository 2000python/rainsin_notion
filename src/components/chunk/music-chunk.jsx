/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { Input, Select } from 'antd';
import TextChunk from './text-chunk';
import Tag from '../tag/tag';
import antiShake from '../../api/antiShake';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './music-chunk.css'

const { Search } = Input;
const { Option } = Select;

function MusicListItem(props) {
  const data = props.data ? props.data : [];
  const [palyId, setId] = useState();
  let clickNode = React.createRef();
  const paly = antiShake((e) => {
    e.stopPropagation();
    PubSub.publish('palyNow', e.target.dataset);
    setId(e.target.dataset.id)
  }) 
  const mouseUp = (e) => {
    const node = e.target.parentNode.childNodes[0].childNodes[0];
    if (e.target.dataset.id === palyId) {
      node.innerHTML = ' <svg t="1644672311744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1286" width="26" height="26"><path d="M512 160c194.4 0 352 157.6 352 352s-157.6 352-352 352S160 706.4 160 512 317.6 160 512 160z m0 64a288 288 0 1 0 0 576 288 288 0 0 0 0-576z m-96 128a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0v-256a32 32 0 0 1 32-32z m192 0a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0v-256a32 32 0 0 1 32-32z" p-id="1287"></path></svg>';
    } else {
      node.innerHTML = ' <svg t="1644672347931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1442" width="26" height="26"><path d="M512 160c194.4 0 352 157.6 352 352s-157.6 352-352 352S160 706.4 160 512 317.6 160 512 160z m0 64a288 288 0 1 0 0 576 288 288 0 0 0 0-576z m-31.936 151.232a64 64 0 0 1 31.744 8.416l127.488 72.864a64 64 0 0 1 0 111.136l-127.488 72.864a64 64 0 0 1-95.744-55.552v-145.728a64 64 0 0 1 64-64z m0 64v145.728l127.488-72.864-127.488-72.864z" p-id="1443"></path></svg>';
    }
    
  }
  const mouseOut = (e) => {
    const node = e.target.parentNode.childNodes[0].childNodes[0];
    node.innerHTML = ' <svg t="1644665432787" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1110" width="26" height="26"><path d="M512 160a32 32 0 0 1 0 64 288 288 0 1 0 288 288 286.496 286.496 0 0 0-38.144-143.328 32 32 0 0 1 55.488-31.904A350.496 350.496 0 0 1 864 512c0 194.4-157.6 352-352 352S160 706.4 160 512 317.6 160 512 160z m160 0a96 96 0 0 1 96 96 32 32 0 0 1-63.776 3.744L704 256a32 32 0 0 0-63.776-3.744L640 256v256a128 128 0 1 1-63.968-110.848L576 256a96 96 0 0 1 96-96z m-160 288a64 64 0 1 0 0 128 64 64 0 0 0 0-128z" p-id="1111"></path></svg>';
  }
  return (
    <ul className='music-list'>
      {data.map((item, index) => {
        let pre = '';
        const cotarray = (arr) => {
            arr.forEach(e => {
            pre += ' ' + e.name;
            });
            return pre
        }
        const artists = cotarray(item.artists,index)
        return <li ref={clickNode} key={index} className='music-list-item' data-id={item.id} data-provider={item.provider}>
          <div className='music-list-item-index'>
            <span>
            <svg t="1644665432787" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1110" width="26" height="26"><path d="M512 160a32 32 0 0 1 0 64 288 288 0 1 0 288 288 286.496 286.496 0 0 0-38.144-143.328 32 32 0 0 1 55.488-31.904A350.496 350.496 0 0 1 864 512c0 194.4-157.6 352-352 352S160 706.4 160 512 317.6 160 512 160z m160 0a96 96 0 0 1 96 96 32 32 0 0 1-63.776 3.744L704 256a32 32 0 0 0-63.776-3.744L640 256v256a128 128 0 1 1-63.968-110.848L576 256a96 96 0 0 1 96-96z m-160 288a64 64 0 1 0 0 128 64 64 0 0 0 0-128z" p-id="1111"></path></svg>
            </span>
          </div>
          <div className='music-list-item-detail'>
            <span className='item-detail-singlename'>
              {item.name}
            </span>
            <span className='item-detail-artname'>
              演唱: {artists} | 专辑: {item.album.name}
            </span>
          </div>
          <div className='music-list-item-album'>
          
          </div>
          <div className='shade-music' data-id={item.id} data-provider={item.provider} data-index={index} onDoubleClick={paly} onMouseOver={mouseUp} onMouseOut={mouseOut}></div>
        </li>
      })}
    </ul>
  )
}

function MusicChunk() {
  const [list, setList] = useState();
  const [now, setNow] = useState('https://rainsin-1305486451.file.myqcloud.com/music/%E4%B9%B1%E8%88%9E%E6%98%A5%E7%A7%8B%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3');
  const [searchProvider, setSearchProvider] = useState('kugou');
  const nowPaly = (_, data) => {
    (async function (data) {
      const getMusic = await axios.get(`http://127.0.0.1:7001/getmusic?id=${data.id}&provider=${data.provider}`);
      setNow(getMusic.data.url)
    })(data);
  }
  async function getListMethod(value='故长安'){
    const getMusicList = await axios.get(`http://127.0.0.1:7001/music?name=${value}&provider=${searchProvider}`);
    setList(getMusicList.data);
  }
  useEffect(() => {
    const token = PubSub.subscribe('palyNow', nowPaly);
  })
  const onSearch = value => {
    getListMethod(value)
  }
  function handleChange(value) {
    setSearchProvider(value)
  }
  useEffect(() => {
    getListMethod();
  }, [])
    return <div className='music-chunk'>
       <AudioPlayer
          autoPlay
          src={now}
      />
      <div className='input-search-music'>
        <Select defaultValue="kugou" style={{ width: 90 }} onChange={handleChange}>
          <Option value="kugou">酷狗</Option>
          <Option value="netease">网易云</Option>
        </Select>
      <Search placeholder="歌名/歌手" onSearch={onSearch}  />
      </div>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>周杰伦</Tag></TextChunk>
      <TextChunk fontSize={17} lineheight='_'><Tag color='yellow'>任然</Tag></TextChunk>
      <MusicListItem data={list}>
      </MusicListItem>
      
  </div>;
}

export default MusicChunk;