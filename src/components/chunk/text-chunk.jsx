/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{ useEffect, useState,useRef }from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import './text-chunk.css'

//传入参数：fontSize-字体大小；content-展示内容
/**
 * 锚点文本 组件
 * @param {String} Class 追加类名
 * @param {Number} fontSize 设置字体大小
 * @param {*} children 子元素
 * @param {Number} alpha  遮罩透明度(0-1)
 * @param {Number} width 盒子宽度
 * @param {*} content 文本内容
 * @param {String} target 跳转
 * @param {boolean} isPreventDefault 是否阻止默认事件
 * @return {ReactComponent}
 */

export default function TextChunk(props) {
    const clickEvent = props.onClick ? props.onClick : null;
    const chunkStyle = props.fontSize ? props : {
        fontSize: 18,
    };
    const title = props.title ? props.title : '';

    const url = props.url ? props.url : '#';
    const Children = props.children ? props.children : '';
    //设置字体大小
    const heightValue = chunkStyle.fontSize + 10;

    const lineheight = props.lineheight ? props.lineheight : heightValue;
    //追加类名
    const ClassName = props.Class ? props.Class : '';
    //设置背景透明
    const getalpha = props.alpha ? props.alpha : 0.08, [alpha, setAlpha] = useState(0);
    
    const widthsize = props.width ? props.width : 'auto';
    const target = props.target ? props.target : '';
    //是否阻止默认事件
    const isPreventDefault = props.isPreventDefault ? props.isPreventDefault : false;
    
    const svgwidth = props.svgwidth ? props.svgwidth : 18, svgheight = props.svgheight ? props.svgheight : svgwidth;
    
    const mouseBgcolor = (e) => {
        setAlpha(getalpha)
    }
    const mouseOutBgcolor = (e) => {
        setAlpha(0)
    }
    const style = {
        fontSize: `${chunkStyle.fontSize}px`,
        width: `${widthsize}`,
        height: `${heightValue}px`,
        lineHeight: `${lineheight}px`,
        backgroundColor: `rgba(55,53,47,${alpha})`
    }
    function click(e) {
        if (isPreventDefault) {
            e.preventDefault()
        }
        return clickEvent === null ? undefined : clickEvent(e);
    }
    const ref = useRef();
  useEffect(() => {
        if (ref.current.firstChild.nodeName === 'svg') {
            ref.current.firstChild.style.width = `${svgwidth}px`;
            ref.current.firstChild.style.height = `${svgheight}px`;
        }
    })
    return(
        <>   
            <Link to={`${url}`} ref={ref} title={title} target={target} className={`text-chunk ${ClassName}`} style={style} onMouseOver={mouseBgcolor} onMouseOut={mouseOutBgcolor} onClick={click}>
                {Children}{props.content}
            </Link>
         </>
    )
}