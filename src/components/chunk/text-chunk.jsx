/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{ useEffect, useState }from "react";
// import { Link } from "react-router-dom";
import './text-chunk.css'

//传入参数：fontSize-字体大小；content-展示内容

export default function TextChunk(props) {
    const chunkStyle = props.fontSize ? props : {
        fontSize: 18,
    };
    const Children = props.children ? props.children : '';
    //设置字体大小
    const heightValue = chunkStyle.fontSize + 10;
    //追加类名
    const ClassName = props.class ? props.class : '';
    //设置背景透明
    const getalpha = props.alpha ? props.alpha : 0.08, [alpha, setAlpha] = useState(0);
    
    const widthsize = props.width ? props.width : 'auto';
    const mouseBgcolor = (e) => {
        setAlpha(getalpha)
    }
    const mouseOutBgcolor = (e) => {
        setAlpha(0)
    }
    // useEffect(() => {
        
    // },[])
    return(
        <>   
            <a href="#" className={`text-chunk ${ClassName}`} style={{ fontSize:`${chunkStyle.fontSize}px`,width:`${widthsize}`,height:`${heightValue}px`,lineHeight:`${heightValue}px`,backgroundColor:`rgba(55,53,47,${alpha})`}} onMouseOver={mouseBgcolor} onMouseOut={mouseOutBgcolor}>
                {Children}{props.content}
            </a>
         </>
    )
}