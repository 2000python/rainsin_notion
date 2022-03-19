/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import './img-chunk.css';

/**
 * 图片 组件
 * @param {Any} children 
 * @param {String} Class 追加类名
 * @param {String} width 设置组件宽度
 * @param {String} height 设置组件高度
 * @param {String} fillmode 设置图片填充模式
 * @param {String} alt 设置替换文本
 * @param {String} url 设置图片路径
 * @return {ReactComponent}
 */


function ImgChunk(props) {
    const Class = props.Class ? props.Class : ''
    const width = props.width ? props.width : '100%',height = props.height ? props.height : '100%';
    const alt = props.alt , fillmode = props.fillmode ? props.fillmode : 'none'
    const url = props.url ? props.url : 'https://rainsin-1305486451.file.myqcloud.com/img/poet.jpg'
    return <img className={`img-chunk ${Class}`} src={url} alt={alt} style={{objectFit:`${fillmode}`,width:`${width}`,height:`${height}`}}>
    </img>;
}

export default ImgChunk;