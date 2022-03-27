/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import TextChunk,{TextButtonChunk} from './text-chunk';
import Tag from '../tag/tag';
import './music-chunk.css'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import list_data from '../nav/api';
import { Link } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import VolumeControls from '../music/VolumeBar';
import BetterScroll from 'better-scroll';

const classNames = require('classnames');

const music_tag = [
  {
    id: 1,
    name: '周杰伦',
    color: 'yellow'
  },
  {
    id: 2,
    name: '七里香',
    color: 'green'
  },
  {
    id: 3,
    name: '仙剑奇侠传',
    color: 'yellow'
  },
  {
    id: 4,
    name: '米兰的小铁匠',
    color: 'green'
  },
  {
    id: 5,
    name: '乱舞春秋',
    color: 'blue'
  },
  {
    id: 6,
    name: '印第安老斑鸠',
    color: 'purple'
  },
  {
    id: 7,
    name: '任然',
    color: 'pink'
  },
  {
    id: 8,
    name: '以父之名',
    color: 'red'
  },
  {
    id: 9,
    name: '花海',
    color: 'brown'
  },
  {
    id: 10,
    name: '依然范特西',
    color: 'yellow'
  },
  {
    id: 11,
    name: '一路向北',
    color: 'blue'
  },
  {
    id: 12,
    name: '11月的萧邦',
    color: 'green'
  },
]

/**
 * 音乐列表项目 组件
 * @param {Array} data 数据
 * @return {ReactComponent}
 */

function MusicListItem(props) {
  const context = React.useContext(Context);
  const data = props.data ? props.data : [];

  return <>
    <a className='music-list-thead-detial'>
            <li>
              <TextChunk alpha={.9}>
              <svg t="1647442124461" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="56930" width="200" height="200"><path d="M818.655 971.545h-613.312c-84.303 0-152.886-66.343-152.886-147.89v-623.306c0-81.549 68.585-147.89 152.886-147.89h613.312c84.303 0 152.886 66.342 152.886 147.89v623.306c0 81.548-68.585 147.89-152.886 147.89zM205.345 123.155c-45.318 0-82.19 34.628-82.19 77.191v623.306c0 42.564 36.869 77.191 82.19 77.191h613.312c45.318 0 82.19-34.627 82.19-77.191v-623.306c0-42.563-36.869-77.191-82.19-77.191h-613.312z" fill="#e6e6e6" p-id="56931"></path></svg>
              </TextChunk>
            </li>
          
            <li>
              {data.songName}
            </li>

            <li>
              {data.artist}
            </li>
            {context.music_unfold ? <><li>
              {data.albumName}
            </li>
            <li>
              <TextButtonChunk Class='music-list-control-com' alpha={.9} title='播放/暂停'>
              <svg t="1647442732953" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1357" width="200" height="200"><path d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#e6e6e6" p-id="1358"></path><path d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z" fill="#e6e6e6" p-id="1359"></path><path d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z" fill="#e6e6e6" p-id="1360"></path></svg>
          </TextButtonChunk>
          <TextButtonChunk Class='music-list-control-com' alpha={.9} title='添加到播放列表'>
          <svg t="1647499523490" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2222" width="200" height="200"><path d="M511.5 957.9C264.9 957.9 65 758.2 65 511.9s199.9-446 446.5-446S958 265.6 958 511.9c0.1 246.3-199.8 446-446.5 446zM509 149.1c-200.4 0-355.8 162.2-355.8 362.3 0 200.1 155.4 356.8 355.8 356.8s362.9-156.7 362.9-356.8c0-200.1-162.5-362.3-362.9-362.3zM690.5 556h-134v133.8c0 24.6-20 44.6-44.6 44.6h-0.1c-24.6 0-44.6-19.9-44.6-44.6V556h-134c-24.7 0-44.6-19.9-44.6-44.5v-0.1c0-24.6 20-44.6 44.6-44.6h134V333c0-24.6 20-44.6 44.6-44.6h0.1c24.7 0 44.6 19.9 44.6 44.6v133.8h134c24.7 0 44.6 19.9 44.6 44.6v0.1c0 24.6-19.9 44.5-44.6 44.5z m0 0" p-id="2223" fill="#dbdbdb"></path></svg>
          </TextButtonChunk>
          <TextButtonChunk Class='music-list-control-com' alpha={.9} title='下载'>
          <svg t="1647499587115" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3807" width="200" height="200"><path d="M925.6 337.9c-22.6-53.3-54.8-101.2-96-142.3-41.1-41.1-89-73.4-142.3-96C632.1 76.2 573.5 64.4 513 64.4S393.9 76.2 338.7 99.6c-53.3 22.6-101.2 54.8-142.3 96-41.1 41.1-73.4 89-96 142.3C77 393.1 65.2 451.8 65.2 512.2c0 60.4 11.8 119.1 35.2 174.3 22.6 53.3 54.8 101.2 96 142.3 41.1 41.1 89 73.4 142.3 96C393.9 948.2 452.6 960 513 960s119.1-11.8 174.3-35.2c53.3-22.6 101.2-54.8 142.3-96 41.1-41.1 73.4-89 96-142.3 23.4-55.2 35.2-113.9 35.2-174.3 0-60.4-11.8-119.1-35.2-174.3zM513 879.1c-202.3 0-366.9-164.6-366.9-366.9S310.7 145.3 513 145.3c202.3 0 366.9 164.6 366.9 366.9S715.4 879.1 513 879.1z" p-id="3808" fill="#dbdbdb"></path><path d="M664.7 520.8c-17.6-15.6-44.7-13.9-60.3 3.7l-49.2 55.7V368.5c0-1.3-0.1-2.7-0.2-4 0.1-1.4 0.2-2.9 0.2-4.4v-30.3c0-23.2-19-42.2-42.2-42.2-23.2 0-42.2 19-42.2 42.2v30.3c0 1.6 0.1 3.1 0.3 4.7-0.1 1.2-0.2 2.4-0.2 3.7v211.6l-49.2-55.6c-15.6-17.6-42.7-19.3-60.3-3.7-17.6 15.6-19.3 42.7-3.7 60.3L481 720.5c4.1 4.7 9 8.2 14.4 10.6 0.1 0 0.2 0.1 0.3 0.1l1.5 0.6c0.2 0.1 0.4 0.2 0.6 0.2 0.4 0.2 0.8 0.3 1.2 0.4 0.3 0.1 0.6 0.2 0.8 0.3 0.3 0.1 0.7 0.2 1 0.3s0.7 0.2 1 0.3 0.6 0.2 0.9 0.2c0.4 0.1 0.8 0.2 1.1 0.3 0.3 0.1 0.6 0.1 0.8 0.2 0.4 0.1 0.8 0.2 1.2 0.2 0.3 0 0.5 0.1 0.8 0.1 0.4 0.1 0.8 0.1 1.2 0.2 0.3 0 0.6 0.1 0.8 0.1 0.4 0 0.8 0.1 1.2 0.1 0.3 0 0.6 0 0.9 0.1h4.2c0.3 0 0.6 0 0.9-0.1 0.4 0 0.8-0.1 1.2-0.1 0.3 0 0.6-0.1 0.8-0.1 0.4 0 0.8-0.1 1.2-0.2 0.3 0 0.5-0.1 0.8-0.1 0.4-0.1 0.8-0.1 1.2-0.2 0.3-0.1 0.6-0.1 0.8-0.2 0.4-0.1 0.8-0.2 1.1-0.3s0.6-0.1 0.9-0.2c0.3-0.1 0.7-0.2 1-0.3s0.7-0.2 1-0.3 0.6-0.2 0.8-0.3c0.4-0.1 0.8-0.3 1.2-0.4 0.2-0.1 0.4-0.2 0.6-0.2l1.5-0.6c0.1 0 0.2-0.1 0.3-0.1 5.3-2.4 10.3-5.9 14.4-10.6L668 581.1c16-17.6 14.3-44.8-3.3-60.3z" p-id="3809" fill="#dbdbdb"></path></svg>
              </TextButtonChunk>
            </li>
            </> : <></>}
        </a>
  </>
}

/**
 * 音乐列表 组件
 * @return {ReactComponent}
 */

function MusicList() {
  const context = React.useContext(Context);
  React.useEffect(() => {
    context.set_search_data_list(list_data);
    context.set_music_list()
  },[])
  return <>
    <div className='music-list'>
      <ul className='music-list-thead-first'>
        <li>
        <TextButtonChunk alpha={0.9} Class='music-list-font-color music-list-search-list-box' svgwidth={18} title='添加到播放列表'>
            <svg t="1647439329902" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="55804" width="200" height="200"><path d="M842 62H182c-66 0-120 54-120 120v660c0 66 54 120 120 120h660c66 0 120-54 120-120V182c0-66-54-120-120-120z m30 750c0 33-27 60-60 60H212c-33 0-60-27-60-60V212c0-33 27-60 60-60h600c33 0 60 27 60 60v600z" fill="#e6e6e6" p-id="55805"></path><path d="M737 467H557V287c0-24.8-20.2-45-45-45s-45 20.2-45 45v180H287c-24.8 0-45 20.2-45 45s20.2 45 45 45h180v180c0 24.8 20.2 45 45 45s45-20.2 45-45V557h180c24.8 0 45-20.2 45-45s-20.2-45-45-45z" fill="#e6e6e6" p-id="55806"></path></svg>
            {context.music_unfold ? '添加到' : ''}
        </TextButtonChunk>
        </li>
        <div>
        <li>
              <TextButtonChunk alpha={0.9} Class='music-list-font-color music-list-search-list-box' svgwidth={24} content='搜索列表'>
              <svg t="1647313946609" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1186" width="200" height="200"><path d="M736 352a32 32 0 0 1 31.264 25.088c4.384 18.816 9.792 32.256 15.232 39.712l2.336 3.008c0.8 0.896 1.088 1.024 1.28 1.024 46.624 0 65.76 39.68 65.088 101.024a32 32 0 0 1-64-0.704c0.192-16.32-1.344-28.16-3.776-34.944l-0.608-1.504-1.92-0.032a65.088 65.088 0 0 1-12.896-2.24V736c0 57.824-66.816 96-144 96S480 793.824 480 736s66.816-96 144-96c29.184 0 56.864 5.44 80.032 15.36L704 384.704c0-1.408 0.032-2.816 0.192-4.224L704 384a32 32 0 0 1 32-32zM416 704a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h192z m208 0c-46.528 0-80 19.136-80 32s33.472 32 80 32 80-19.136 80-32-33.472-32-80-32zM544 448a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h320z m256-256a32 32 0 0 1 0 64H224a32 32 0 1 1 0-64h576z" p-id="1187" fill="#e6e6e6"></path></svg>
              </TextButtonChunk>
            </li>
            <li>
              <TextButtonChunk alpha={0.9} Class='music-list-font-color' content='播放列表' svgwidth={24}>
              <svg t="1647313903483" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="980" width="200" height="200"><path d="M608.352 442.176a64 64 0 0 1 33.92 9.728l163.648 102.272a64 64 0 0 1 0 108.544l-163.648 102.272a64 64 0 0 1-97.92-54.272v-204.544a64 64 0 0 1 64-64zM448 704a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h224z m160.352-197.824v204.544l163.648-102.272-163.648-102.272zM448 448a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h224z m352-256a32 32 0 0 1 0 64H224a32 32 0 1 1 0-64h576z" p-id="981" fill="#dbdbdb"></path></svg>
              </TextButtonChunk>
            </li>
        </div>
          </ul> 
        <div className='music-list-thead'>  
          <ul className='music-list-thead-detial'>
            <li>
              <TextButtonChunk>
              <svg t="1647062973284" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3143" width="200" height="200"><path d="M818.655 971.545h-613.312c-84.303 0-152.886-66.343-152.886-147.89v-623.306c0-81.549 68.585-147.89 152.886-147.89h613.312c84.303 0 152.886 66.342 152.886 147.89v623.306c0 81.548-68.585 147.89-152.886 147.89zM205.345 123.155c-45.318 0-82.19 34.628-82.19 77.191v623.306c0 42.564 36.869 77.191 82.19 77.191h613.312c45.318 0 82.19-34.627 82.19-77.191v-623.306c0-42.563-36.869-77.191-82.19-77.191h-613.312z" fill="#515151" p-id="3144"></path></svg>
              </TextButtonChunk>
            </li>
          
            <li>
              歌曲
            </li>

            <li>
              歌手
            </li>
            {context.music_unfold ? <>
              <li>专辑</li>
              <li>操作</li>
            </>
              
              :
              <></>
            }
          </ul>
          
        </div>
        <div className='music-list-tbody'>
        {context.music.list_data.map((item,index) => <MusicListItem index={index} cid={item.copyrightId} data={item}></MusicListItem>)}
        </div>
      </div>
  </>
}

/**
 * 音乐搜索 组件
 * @param {String} Class 追加类名
 * @param {Number} fontSize 设置字体大小
 * @return {ReactComponent}
 */

function MusicSearch() {
  return <>
    
  </>
}
function VolumeBoxUI() {
  const context = React.useContext(Context);
  return <>
      {context.music.volume === 0 ? 
           <svg t="1648036398059" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="892" width="200" height="200"><path d="M542.72 853.333333h-10.24c-23.893333 0-47.786667-10.24-68.266667-23.893333l-201.386666-143.36c-13.653333-10.24-20.48-30.72-6.826667-47.786667 10.24-17.066667 30.72-20.48 47.786667-6.826666l204.8 146.773333c10.24 6.826667 17.066667 10.24 23.893333 10.24h10.24c20.48 0 34.133333-13.653333 34.133333-34.133333V273.066667c0-20.48-13.653333-34.133333-34.133333-34.133334h-6.826667c-10.24 0-17.066667 3.413333-23.893333 10.24l-204.8 174.08c-17.066667 13.653333-37.546667 20.48-58.026667 20.48h-13.653333c-20.48 0-34.133333 13.653333-34.133333 34.133334v170.666666c0 20.48-13.653333 34.133333-34.133334 34.133334s-34.133333-13.653333-34.133333-34.133334v-170.666666c0-58.026667 44.373333-102.4 102.4-102.4h13.653333c6.826667 0 13.653333-3.413333 20.48-6.826667l197.973334-170.666667c17.066667-17.066667 44.373333-27.306667 71.68-27.306666h6.826666c58.026667 0 102.4 44.373333 102.4 102.4v477.866666c-3.413333 58.026667-47.786667 102.4-105.813333 102.4z m351.573333-365.226666l23.893334-23.893334c13.653333-13.653333 13.653333-34.133333 0-47.786666s-34.133333-13.653333-47.786667 0l-23.893333 23.893333c-13.653333 13.653333-13.653333 34.133333 0 47.786667 6.826667 6.826667 17.066667 10.24 23.893333 10.24s17.066667-3.413333 23.893333-10.24z m-122.88 119.466666l23.893334-23.893333c13.653333-13.653333 13.653333-34.133333 0-47.786667s-34.133333-13.653333-47.786667 0l-23.893333 23.893334c-13.653333 13.653333-13.653333 34.133333 0 47.786666 6.826667 6.826667 17.066667 10.24 23.893333 10.24s20.48-3.413333 23.893333-10.24z m27.306667-119.466666c13.653333-13.653333 13.653333-34.133333 0-47.786667l-23.893333-23.893333c-13.653333-13.653333-34.133333-13.653333-47.786667 0s-13.653333 34.133333 0 47.786666l23.893333 23.893334c6.826667 6.826667 17.066667 10.24 23.893334 10.24s17.066667-3.413333 23.893333-10.24z m119.466667 119.466666c13.653333-13.653333 13.653333-34.133333 0-47.786666l-23.893334-23.893334c-13.653333-13.653333-34.133333-13.653333-47.786666 0s-13.653333 34.133333 0 47.786667l23.893333 23.893333c6.826667 6.826667 17.066667 10.24 23.893333 10.24s17.066667-3.413333 23.893334-10.24z" fill="#e6e6e6" p-id="893"></path></svg>
            :
             context.music.volume <= 0.5 ? 
             <svg t="1648036444347" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1098" width="200" height="200"><path d="M587.093333 853.333333h-10.24c-23.893333 0-47.786667-10.24-68.266666-23.893333L307.2 686.08c-13.653333-10.24-20.48-30.72-6.826667-47.786667 10.24-17.066667 30.72-20.48 47.786667-6.826666l204.8 146.773333c10.24 6.826667 17.066667 10.24 23.893333 10.24h10.24c20.48 0 34.133333-13.653333 34.133334-34.133333V273.066667c0-20.48-13.653333-34.133333-34.133334-34.133334H580.266667c-10.24 0-17.066667 3.413333-23.893334 10.24l-204.8 174.08c-17.066667 13.653333-37.546667 20.48-58.026666 20.48h-13.653334c-20.48 0-34.133333 13.653333-34.133333 34.133334v170.666666c0 20.48-13.653333 34.133333-34.133333 34.133334s-34.133333-13.653333-34.133334-34.133334v-170.666666c0-58.026667 44.373333-102.4 102.4-102.4h13.653334c6.826667 0 13.653333-3.413333 20.48-6.826667l197.973333-170.666667c17.066667-17.066667 40.96-27.306667 68.266667-27.306666h6.826666c58.026667 0 102.4 44.373333 102.4 102.4v477.866666c0 58.026667-44.373333 102.4-102.4 102.4z m221.866667-208.213333c47.786667-27.306667 75.093333-78.506667 75.093333-133.12s-30.72-105.813333-75.093333-133.12c-17.066667-10.24-37.546667-3.413333-47.786667 13.653333-10.24 17.066667-3.413333 37.546667 13.653334 47.786667 27.306667 13.653333 40.96 44.373333 40.96 71.68s-17.066667 58.026667-40.96 71.68c-17.066667 10.24-20.48 30.72-13.653334 47.786667 6.826667 10.24 17.066667 17.066667 30.72 17.066666 6.826667 0 10.24 0 17.066667-3.413333z" fill="#e6e6e6" p-id="1099"></path></svg>
              :
              <svg t="1648036469497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1304" width="200" height="200"><path d="M498.346667 853.333333h-10.24c-23.893333 0-47.786667-10.24-68.266667-23.893333l-170.666667-146.773333c-13.653333-13.653333-17.066667-34.133333-3.413333-47.786667 13.653333-13.653333 34.133333-17.066667 47.786667-3.413333l170.666666 146.773333c6.826667 6.826667 13.653333 6.826667 23.893334 6.826667h10.24c20.48 0 34.133333-13.653333 34.133333-34.133334V273.066667c0-20.48-13.653333-34.133333-34.133333-34.133334h-6.826667c-10.24 0-17.066667 3.413333-23.893333 10.24l-167.253334 170.666667-3.413333 3.413333c-17.066667 13.653333-37.546667 20.48-61.44 20.48h-10.24c-20.48 0-34.133333 13.653333-34.133333 34.133334v170.666666c0 20.48-13.653333 34.133333-34.133334 34.133334s-34.133333-13.653333-34.133333-34.133334v-170.666666c0-58.026667 44.373333-102.4 102.4-102.4H238.933333c6.826667 0 13.653333 0 17.066667-3.413334L419.84 204.8c17.066667-23.893333 44.373333-34.133333 71.68-34.133333h6.826667c58.026667 0 102.4 44.373333 102.4 102.4v477.866666c0 58.026667-47.786667 102.4-102.4 102.4z m221.866666-208.213333c47.786667-27.306667 75.093333-78.506667 75.093334-133.12s-30.72-105.813333-75.093334-133.12c-17.066667-10.24-37.546667-3.413333-47.786666 13.653333-10.24 17.066667-3.413333 37.546667 13.653333 47.786667 27.306667 13.653333 40.96 44.373333 40.96 71.68s-17.066667 58.026667-40.96 71.68c-17.066667 10.24-20.48 30.72-13.653333 47.786667 6.826667 10.24 17.066667 17.066667 30.72 17.066666 3.413333 0 10.24 0 17.066666-3.413333z m105.813334 109.226667c71.68-58.026667 116.053333-146.773333 116.053333-242.346667s-40.96-180.906667-116.053333-242.346667c-13.653333-10.24-37.546667-10.24-47.786667 3.413334-10.24 13.653333-10.24 37.546667 3.413333 47.786666 58.026667 47.786667 88.746667 116.053333 88.746667 187.733334s-34.133333 143.36-88.746667 187.733333c-13.653333 10.24-17.066667 34.133333-3.413333 47.786667 6.826667 6.826667 17.066667 13.653333 27.306667 13.653333 6.826667 3.413333 13.653333 0 20.48-3.413333z" fill="#e6e6e6" p-id="1305"></path></svg>
           }
  </>
}
const VolumeBox = observer(VolumeBoxUI)
//播放器控件
export const MusicControl = observer({
  //控件展开类名
  musicControlUnfoldClass: {
    music: 'music-box-unfold',
    music_palyer: 'music-palyer-box-unfold',
    play_box_state: 'play-state-box-unfold',
    play_box_progress_bar: "play-progress-box-unfold",
    music_list_table:'music-list-table-unfold',
  },
  //控件收缩类名
  musicControlShrinkClass: {
    music: 'music-box-shrink',
    music_palyer: 'music-palyer-box-shrink',
    play_box_state: 'play-state-box-shrink',
    play_box_progress_bar: "play-progress-box-shrink",
    music_list_table:'music-list-table-shrink',
  },
  //播放状态组件

  /**
   * 播放器播放状态控件 组件
   * @return {ReactComponent}
   */

  PlayState: observer((props) => {
    const context = React.useContext(Context);
    const onPlay = () => {
      context.change_nav_music_paly(context.Player)
    }
    return <>
      <div className={"music-transition " + context.music_control_class.play_box_state}>
        <TextChunk title='上一曲' isPreventDefault={true} fontSize={42} svgwidth={40}>
        <svg t="1648028061648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1769" width="200" height="200"><path d="M699.8 788.7c-55.5 37.6-120.4 57.4-187.7 57.4-184.8 0-335.2-150.4-335.2-335.2 0-66.4 19.4-130.6 56-185.6 7.5-11.2 4.4-26.4-6.8-33.9s-26.4-4.4-33.9 6.8c-42 63.1-64.2 136.6-64.2 212.7 0 211.8 172.3 384 384.1 384 77.1 0 151.5-22.8 215.1-65.9 11.2-7.6 14.1-22.8 6.5-33.9-7.6-11.1-22.8-14-33.9-6.4zM512.1 126.9c-82 0-160.3 25.5-226.3 73.7-10.9 8-13.3 23.2-5.3 34.1 8 10.9 23.2 13.3 34.1 5.3 57.6-42.1 125.9-64.3 197.5-64.3 184.8 0 335.2 150.4 335.2 335.2 0 71.6-22.2 139.8-64.3 197.4-8 10.9-5.6 26.2 5.3 34.1 4.3 3.2 9.4 4.7 14.4 4.7 7.5 0 15-3.5 19.7-10 48.2-66 73.7-144.3 73.7-226.2 0-211.7-172.3-384-384-384z" fill="#e6e6e6" p-id="1770"></path><path d="M429.1 617.9v-81.7L607.2 639c3.8 2.2 8 3.3 12.2 3.3s8.4-1.1 12.2-3.3c7.5-4.4 12.2-12.5 12.2-21.2V398.1c0-8.8-4.6-16.8-12.2-21.2-7.5-4.4-16.8-4.4-24.4 0L429.1 479.8v-81.7c0-13.5-10.9-24.4-24.4-24.4s-24.4 10.9-24.4 24.4v219.7c0 13.5 10.9 24.4 24.4 24.4s24.4-10.9 24.4-24.3zM478 508l117-67.6v135.1L478 508z" fill="#e6e6e6" p-id="1771"></path></svg>
        </TextChunk>
        <TextChunk title="播放/暂停" onClick={onPlay} isPreventDefault={true} fontSize={42} svgwidth={40}>
          {context.music_paly ? <svg t="1648028033718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1548" width="200" height="200"><path d="M700 789.1c-55.4 37.6-120.3 57.4-187.6 57.4-184.7 0-334.9-150.2-334.9-334.9 0-66.3 19.4-130.5 56-185.4 7.5-11.2 4.4-26.4-6.8-33.8-11.2-7.4-26.4-4.4-33.8 6.8-42 63-64.2 136.5-64.2 212.5 0 211.6 172.2 383.7 383.7 383.7 77.1 0 151.4-22.8 214.9-65.8 11.2-7.6 14.1-22.7 6.5-33.9-7.5-11.3-22.7-14.1-33.8-6.6zM512.4 127.8c-81.9 0-160.1 25.5-226.1 73.6-10.9 8-13.3 23.2-5.3 34.1 7.9 10.9 23.2 13.3 34.1 5.3 57.6-42 125.8-64.2 197.3-64.2 184.7 0 334.9 150.2 334.9 334.9 0 71.5-22.2 139.7-64.2 197.3-8 10.9-5.6 26.2 5.3 34.1 4.3 3.2 9.4 4.7 14.4 4.7 7.5 0 15-3.5 19.7-10 48.2-66 73.6-144.1 73.6-226.1 0.1-211.5-172.1-383.7-383.7-383.7z" fill="#e6e6e6" p-id="1549"></path><path d="M471.2 618.4V404.8c0-18-14.6-32.5-32.5-32.5s-32.5 14.6-32.5 32.5v213.6c0 18 14.6 32.5 32.5 32.5s32.5-14.6 32.5-32.5zM618.8 618.4V404.8c0-18-14.6-32.5-32.5-32.5-18 0-32.5 14.6-32.5 32.5v213.6c0 18 14.6 32.5 32.5 32.5s32.5-14.6 32.5-32.5z" fill="#e6e6e6" p-id="1550"></path></svg> :
          <svg t="1648028001985" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1301" width="200" height="200"><path d="M513.1 895.6c-210.3 0-381.4-171.1-381.4-381.3 0-75.5 22-148.6 63.8-211.2 7.4-11.1 22.5-14.2 33.6-6.7 11.1 7.4 14.2 22.5 6.7 33.6-36.4 54.6-55.6 118.4-55.6 184.3 0 183.5 149.3 332.8 332.9 332.8 66.9 0 131.3-19.7 186.4-57.1 11.1-7.5 26.2-4.6 33.7 6.5 7.5 11.1 4.6 26.2-6.5 33.7-63.1 42.8-137 65.4-213.6 65.4zM801.7 748.9c-5 0-10-1.5-14.3-4.7-10.8-7.9-13.2-23.1-5.3-33.9 41.8-57.2 63.8-125 63.8-196.1 0-183.5-149.3-332.9-332.8-332.9-71.1 0-138.9 22.1-196.1 63.8-10.8 7.9-26 5.5-33.9-5.3-7.9-10.8-5.5-26 5.3-33.9 65.6-47.9 143.2-73.2 224.7-73.2 210.3 0 381.3 171.1 381.3 381.4 0 81.4-25.3 159.1-73.2 224.7-4.6 6.7-12 10.1-19.5 10.1z" fill="#e6e6e6" p-id="1302"></path><path d="M439 667c-4.2 0-8.4-1.1-12.1-3.3-7.5-4.3-12.1-12.3-12.1-21v-254c0-8.7 4.6-16.7 12.1-21 7.5-4.3 16.7-4.3 24.3 0l219.9 127c7.5 4.3 12.1 12.3 12.1 21s-4.6 16.7-12.1 21l-219.9 127c-3.8 2.3-8 3.3-12.2 3.3z m24.3-236.2v169.9l147.2-85-147.2-84.9z" fill="#e6e6e6" p-id="1303"></path></svg>
          }
        </TextChunk>
        <TextChunk title="下一曲" isPreventDefault={true} fontSize={42} svgwidth={40}>
        <svg t="1648028078240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1990" width="200" height="200"><path d="M699.8 788.7c-55.5 37.6-120.4 57.4-187.7 57.4-184.8 0-335.2-150.4-335.2-335.2 0-66.4 19.4-130.6 56-185.6 7.5-11.2 4.4-26.4-6.8-33.9s-26.4-4.4-33.9 6.8c-42 63.1-64.2 136.6-64.2 212.7 0 211.8 172.3 384 384.1 384 77.1 0 151.5-22.8 215.1-65.9 11.2-7.6 14.1-22.8 6.5-33.9-7.6-11.1-22.8-14-33.9-6.4zM512.1 126.9c-82 0-160.3 25.5-226.3 73.7-10.9 8-13.3 23.2-5.3 34.1 8 10.9 23.2 13.3 34.1 5.3 57.6-42.1 125.9-64.3 197.5-64.3 184.8 0 335.2 150.4 335.2 335.2 0 71.6-22.2 139.8-64.3 197.4-8 10.9-5.6 26.2 5.3 34.1 4.3 3.2 9.4 4.7 14.4 4.7 7.5 0 15-3.5 19.7-10 48.2-66 73.7-144.3 73.7-226.2 0-211.7-172.3-384-384-384z" fill="#e6e6e6" p-id="1991"></path><path d="M619.4 642.2c13.5 0 24.4-10.9 24.4-24.4V398.1c0-13.5-10.9-24.4-24.4-24.4-13.5 0-24.4 10.9-24.4 24.4v81.7L416.9 376.9c-7.6-4.4-16.9-4.4-24.4 0-7.6 4.4-12.2 12.4-12.2 21.2v219.7c0 8.7 4.7 16.8 12.2 21.2 3.8 2.2 8 3.3 12.2 3.3 4.2 0 8.4-1.1 12.2-3.3L595 536.2v81.7c0 13.4 10.9 24.3 24.4 24.3z m-190.3-66.7V440.4l117 67.6-117 67.5z" fill="#e6e6e6" p-id="1992"></path></svg>
        </TextChunk>
      </div>
    </>
  }),
  //播放进度条

  /**
   * 播放器进度条控件 组件
   * @return {ReactComponent}
   */

  ProgressBar: observer((props) => {
    // const [loaded, setloaded] = useState();
    const context = React.useContext(Context);
    useEffect(() => {
      console.log(context.Player);
    })
    return <>
      <div className={context.music_control_class.play_box_progress_bar}>
      <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={30} />
     </Box>
      </div>
    </>
  }),

  /**
   * 播放器循环播放控件 组件
   * @return {ReactComponent}
   */

  LoopState: observer((props) => {
    const context = React.useContext(Context);
    return <>
      <div className=''>
        <TextChunk title={context.music.loop_mode} fontSize={42} svgwidth={40}>
          <svg t="1648018309747" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3424" width="200" height="200"><path d="M606.896 387.536H408c-92.784 0-168 75.216-168 168 0 92.8 75.216 168 168 168h224c87.2 0 158.88-66.416 167.2-151.424l0.16-1.808a16 16 0 0 1 15.936-14.768h17.344a14.832 14.832 0 0 1 14.784 15.904c-8.144 111.872-101.472 200.096-215.424 200.096h-224c-119.296 0-216-96.704-216-216s96.704-216 216-216h194.144l-29.456-29.456a16 16 0 0 1-4.688-11.312v-28.304a14.464 14.464 0 0 1 24.688-10.24l97.824 97.824a11.136 11.136 0 0 1 0 15.744l-97.824 97.808a14.464 14.464 0 0 1-24.688-10.24v-28.288a16 16 0 0 1 4.688-11.312l34.208-34.224z" p-id="3425" fill="#e6e6e6"></path></svg>
        </TextChunk>
      </div>
    </>
  }),
  DownState: (props) => {
    const context = React.useContext(Context);
    return <>
      <div className=''>

      </div>
    </>
  },
  VolumeState: observer((props) => {
    const context = React.useContext(Context);
    const is_change_volume = () => {
      if (context.music.volume === 0) {
        
        context.set_music_volume(context.music.last_volume);
      } else {
        context.set_last_volume(0.3)
        context.set_music_volume(0);
      }
      console.log(context.Player.volume);
    }
    const show_music_volume = () => {
      context.set_music_volume_show()
    }
    return <>
      <div>
        
        <TextChunk title="音量" isPreventDefault={true} onClick={is_change_volume} MouseOver={show_music_volume} MouseOut={show_music_volume} fontSize={40} lineheight=' _'  svgwidth={38}>
          <VolumeBox></VolumeBox>
          {context.music.is_volume_show ? <>
          <div className='music-volume-box'>
            
          </div>
        </> : <></>}
        </TextChunk>
        
      </div>
    </>
  })
})
//播放器组件
  /**
   * 音乐播放器 组件
   * @return {ReactComponent}
   */

function ReactAudioPlayer(props) {
  const context = React.useContext(Context)
  const player = useRef();
  useEffect(() => {
    context.get_player(player.current);
    context.Player.addEventListener('loadedmetadata', (event) => {
      context.set_audio_time()
    })
    
  },[])
  return <>
      <audio {...props} ref={player}>
      </audio>
    {context.music_unfold ? <>
      <div className='react-player-unfold-contorl'>
        <MusicControl.PlayState /> 
        <MusicControl.ProgressBar />
        <MusicControl.LoopState />
        
      </div> 
        </>
          : 
      <>
        <div className='react-player-shrink-contorl'>
          <div className='react-player-shrink-progress-bar'>
          <MusicControl.ProgressBar />
          </div>
          <div className='react-player-shrink-down-box'>
            <MusicControl.LoopState />
             <MusicControl.PlayState />
            <MusicControl.VolumeState />
          </div>
          <VolumeControls audio={context.Player}/>
            
        </div>
        </>}
  </>
}

  /**
   * 音乐块 组件
   * @return {ReactComponent}
   */

function MusicChunk(props) {
  const onUnfold = props.onUnfold ? props.onUnfold : null;
  const methods = React.useContext(Context);
  const search_tag = (e, key, limit = 30, offset = 1, type = 2) => {
    (async function () {
      const data = await axios(`http://rainsin.yicp.top/music?key=${e.target.textContent}&limit=${limit}&offset=${offset}&type=${type}`)
    })(methods, axios, limit, offset, type);
  }
  // useEffect(() => {
  //   let limit=20, offset=1, type=2,key='周杰伦'
  //   (async function () {
  //     const data = await axios(`http://rainsin.yicp.top/music?key=${key}&limit=${limit}&offset=${offset}&type=${type}`)
  //     setListData(data.data.data.musics)
  //   })(methods, axios,limit=20, offset=1, type=2,key);
  // },[])
  const isPlay = () => {
    methods.change_music_paly();
  }
  const isPause = () => {
    methods.change_music_paly();
  }
  useEffect(() => {
    (
      async function () {
        const color = await axios.get(`http://rainsin.yicp.top/getImg?url=${methods.music.album_img_url}`);
        methods.music.album_main_color = `rgb(${color.data.join()})`
      }
    )()
  }, []);
  useEffect(() => {
    console.log(methods.music.album_main_color);
  })
  return <>
    <div className={'music-chunk ' + methods.music_unfold_class.border_radius_init}>
      <div className='music-chunk-meck' style={{backgroundImage:'url('+ methods.music.album_img_url +')'}}></div>
      <div className={'music-chunk-content ' + methods.music_control_class.music} >
        <div className='music-chunk-content-unfold'>
        <TextChunk fontSize={24} svgwidth={24} onClick={onUnfold} isPreventDefault={true}>
            {methods.music_unfold ? <svg t="1647265752395" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4166" width="200" height="200"><path d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z" p-id="4167" fill="#e6e6e6"></path><path d="M368.896 192a32 32 0 0 0-32 32v105.888H224a32 32 0 0 0 0 64h144.896a32 32 0 0 0 32-32V224a32 32 0 0 0-32-32zM784.864 329.888H672V224a32 32 0 1 0-64 0v137.888a32 32 0 0 0 32 32h144.864a32 32 0 1 0 0-64zM368.896 640H224a32 32 0 1 0 0 64h112.896v105.92a32 32 0 1 0 64 0V672a32 32 0 0 0-32-32zM784.864 640H640a32 32 0 0 0-32 32v137.92a32 32 0 1 0 64 0V704h112.864a32 32 0 1 0 0-64z" p-id="4168" fill="#e6e6e6"></path></svg> :
            <svg t="1647264250312" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2203" width="200" height="200"><path d="M368.896 192H224a32 32 0 0 0-32 32v137.888a32 32 0 0 0 64 0V256h112.896a32 32 0 0 0 0-64zM784.864 192H640a32 32 0 1 0 0 64h112.864v105.888a32 32 0 1 0 64 0V224a32 32 0 0 0-32-32zM368.896 777.92H256V672a32 32 0 1 0-64 0v137.92a32 32 0 0 0 32 32h144.896a32 32 0 1 0 0-64zM784.864 640a32 32 0 0 0-32 32v105.92H640a32 32 0 1 0 0 64h144.864a32 32 0 0 0 32-32V672a32 32 0 0 0-32-32z" p-id="2204" fill="#e6e6e6"></path><path d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z" p-id="2205" fill="#e6e6e6"></path></svg>}
        </TextChunk>
        </div>
      <div className='music-chunk-tag'>
        {music_tag.map((item, index) => {
          return <TextChunk onClick={search_tag} key={index} isPreventDefault={true} fontSize={17} lineheight='_'><Tag color={item.color}>{item.name}</Tag></TextChunk>
        })}
        </div>
          <div className={'album-list-box ' + + methods.music_unfold_class.music_list_table}>
            <MusicList></MusicList>
          {methods.music_unfold ? <>
            <div className='music-album-box'>

            </div>
            </>
            :
            <></>}
        </div>
        <div className={'react-audio-player-box ' + methods.music_control_class.music_palyer}>
        <ReactAudioPlayer
        className='react-audio-player'
        src={'https://freetyst.nf.migu.cn/public%2FproductBe%2FproductB03%2F2019%2F10%2F0718%2F2010%E5%B9%B402%E6%9C%8823%E6%97%A5%E6%B5%B7%E8%9D%B6%E5%94%B1%E7%89%87%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F60058622750.mp3?Key=e4633b47217f7a7d&Tim=1646982862719&channelid=01&msisdn=d25e212158894859841ef2ff719add06'}
        autoPlay={false}
        onPlay={isPlay}
        onPause={isPause}
        header='反方向的钟'
      />
        </div> 
      </div>
      
      </div>
      
  </>
}

export default MusicChunk;