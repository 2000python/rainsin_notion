/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react';
import ImgChunk from './img-chunk';
import './show-chunk.css'
/**
 * 展示 组件
 * @param {String} Class 追加类名
 * @param {Number} width 设置图片宽度
 * @param {Number} outwidth  外部盒子宽度
 * @param {String} title 替换文本
 * @param {*} children 子元素
 * @return {ReactComponent}
 */

function ShowChunk(props) {
    const width = props.width ? props.width : '100%', Class = props.Class ? props.Class : '';
    const outwidth = props.outwidth ? props.outwidth : '80%';
    const ImgClass = props.ImgClass ? props.ImgClass : '';
    return <div className={'show-chunk ' + Class} style={{width:`${outwidth}`}}>
        <div className={'show-chunk-img ' + ImgClass} style={{width:`${width}`}}>
            <ImgChunk fillmode='cover' alt={props.title} url={ props.url}/>
        </div>
        {props.children} 
  </div>;
}

export default ShowChunk;
