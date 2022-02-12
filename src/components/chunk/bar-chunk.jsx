/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useEffect, useState } from 'react'
import './bar-chunk.css'
import Tag from '../tag/tag';
import TextChunk from './text-chunk';
// {width?:string,class?:string}
export function TagBar(props) {
    const Color = props.Color ? props.Color : 'white', content = props.content ? props.content : '';
    const fontsize = props.fontsize ? props.fontsize : 24;
    useEffect(() => {
        console.log(Color);
    })
    return (
        <>
            <TextChunk ><Tag color={Color} content={content} fontsize={fontsize}></Tag></TextChunk>
        </>
  )
}
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
function ShowBarNav(props) {
    const Color = props.Color, content = props.content;
    return props.isTag ? <TagBar Color={Color} content={content} fontsize={ props.fontsize}/> : <TitleBar content={content} fontsize={props.fontsize}/>
}
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