/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect} from 'react';
import TextChunk from '../chunk/text-chunk';
// import mrak from './detail.md'
import './title.css'
import Markdown from '../markdown/markdown';

function Title(props) {
    const detailInfo = props.detail ? props.detail : ' 坚持梦想是一件“知易行难”的事，一个没有期限的梦想只是一个梦，给梦想加一个“截止日期”。';
    const icon = props.icon ? props.icon : '🧠';
    const title = props.Ititle ? props.Ititle : '解忧杂货店';
    return (<div className='banner-title'>
        <div className='banner-title-flex'>
            <div className='banner-title-main'>
                <TextChunk Class='banner-title-icon' fontSize={100} content={icon} url='#' alpha={.1} >
                    
                </TextChunk>
                <span>{title}</span>
                <div className='banner-title-detail'>
                    {detailInfo}
                </div>
                
            </div>
            <div className='banner-title-minor'>
                
            </div>
      </div>
  </div>);
}

export default Title;
