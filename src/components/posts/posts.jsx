/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import ShowChunk from '../chunk/show-chunk'
import './posts.css'

function Posts() {
    return <>
        <div className='blog-posts'>
            <div className='left-posts-chunk'>
            </div>
            <ul className='right-posts-chunk'>
                <li><ShowChunk title='🪢 技术' Class='showchunk-grid' /></li>
                <li><ShowChunk title='🎮 🎬 🎧 资源' Class='showchunk-grid' /></li>
            </ul>
            <ul className='right-posts-chunk'>
                <li><ShowChunk title='📖 随笔' Class='showchunk-grid' /></li>
                <li><ShowChunk title='📌 想到再说' Class='showchunk-grid' /></li>
            </ul>
        </div>
  </>;
}

export default Posts;
