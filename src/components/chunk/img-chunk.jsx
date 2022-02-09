/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './img-chunk.css'

function ImgChunk(props) {
    const Class = props.Class ? props.Class : ''
    const width = props.width ? props.width : '100%',height = props.height ? props.height : '100%';
    const alt = props.alt , fillmode = props.fillmode ? props.mode : 'none'
    const url = props.url ? props.url : 'https://rainsin-1305486451.file.myqcloud.com/img/poet.jpg'
    return <img className={`img-chunk ${Class}`} src={url} alt={alt} style={{objectFit:`${fillmode}`,width:`${width}`,height:`${height}`}}>
    </img>;
}

export default ImgChunk;