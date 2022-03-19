/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useState } from 'react'
import './bar-chunk.css'
import Tag from '../tag/tag';
import TextChunk from './text-chunk';

/**
 * 闩标签 组件
 * @param {String} Color 设置标签颜色
 * @param {String} content 设置标签内容
 * @return {ReactComponent}
 */

export function TagBar(props) {
    const Color = props.Color ? props.Color : 'white', content = props.content ? props.content : '';
    const fontsize = props.fontsize ? props.fontsize : 24;
    return (
        <>
            <TextChunk ><Tag color={Color} content={content} fontsize={fontsize}></Tag></TextChunk>
        </>
  )
}

/**
 * 闩标题 组件
 * @param {String} ClassName 追加类名
 * @param {Number} fontsize 设置字体大小
 * @return {ReactComponent}
 */

export function TitleBar(props) {
    const fontsize = props.fontsize ? props.fontsize : 40;
    const ClassName = props.ClassName ? props.ClassName : ''
    const style = {
        fontSize: `${fontsize}px`
    }
    return (
        <>
            <span className={`title-bar ${ClassName}`} style={style}>
                {props.content}
            </span>
        </>
    )
}

/**
 * 展示闩 组件
 * @param {String} Color 设置标签颜色
 * @param {String} content 设置内容
 * @return {ReactComponent}
 */

function ShowBarNav(props) {
    const Color = props.Color, content = props.content;
    return props.isTag ? <TagBar Color={Color} content={content} fontsize={ props.fontsize}/> : <TitleBar content={content} fontsize={props.fontsize}/>
}

/**
 * 闩 组件
 * @param {String} width 设置闩的宽度
 * @param {String} class 设置类名
 * @return {ReactComponent}
 */

function BarChunk(props) {
    const width = props.width ? props.width : '100%'  
    const ClassName = props.class ? props.class : '';
    const NavMode = props.isTag
    const [effectclass, setEffectclass] = useState('')
    const changeEffect = () => {
        setEffectclass('bar-chunk-effect')
    },
        recoverEffect = () => {
        setEffectclass('')
    }
    return (
        <div className={`bar-chunk ${ClassName}`}  style={{width:`${width}`}}>
            <nav className={`bar-chunk-nav ${effectclass}`} onMouseOver={changeEffect} onMouseOut={recoverEffect}>
                <ShowBarNav isTag={NavMode} content={props.content} fontsize={props.fontsize} />   
            </nav>
            {props.children}
        </div>
  )
}

export default BarChunk;