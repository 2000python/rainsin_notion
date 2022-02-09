/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import ImgChunk from './img-chunk';
import TextChunk from './text-chunk';
import './show-chunk.css'

function ShowChunk(props) {
    const width = props.width ? props.width : '100%', Class = props.Class ? props.Class : '';
    return <div className={'show-chunk ' + Class}>
        <div className='show-chunk-img' style={{width:`${width}`}}>
            <ImgChunk fillmode='cover' alt={props.title} />
            <TextChunk class='show-chunk-title' content={`${props.title}`} fontSize={16} width='100%' alpha={ .2}/>
        </div>
        
  </div>;
}

export default ShowChunk;
