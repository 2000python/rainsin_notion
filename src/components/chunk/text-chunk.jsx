/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{ useEffect, useState,useRef,useContext }from "react";
import { Context } from "../..";
import Tooltip from '@mui/material/Tooltip';
// import { Link } from "react-router-dom";
import './text-chunk.css'

/**
 * 锚点文本 组件
 * @param {String} Class 追加类名
 * @param {Number} fontSize 设置字体大小
 * @param {node} children 子元素
 * @param {Number} alpha  遮罩透明度(0-1)
 * @param {Number} width 盒子宽度
 * @param {*} content 文本内容
 * @param {String} target 跳转
 * @param {boolean} isPreventDefault 是否阻止默认事件
 * @param {function} onClick  点击事件
 * @param {function} dbClick  双击事件
 * @param {function} MouseOver  鼠标移到事件
 * @param {function} MouseOut  鼠标移出事件
 * @param {Number} svgwidth  svg宽
 * @param {Number} svgheight  svg高 默认与svgwidth相等
 * @param {Object} data  HTML元素的data Set属性
 * @param {Number} lineheight  _
 * @return {ReactComponent}
 */

export default function TextChunk(props) {
    const content = useContext(Context)
    const clickEvent = props.onClick ? props.onClick : null;
    const MouseOverEvent = props.MouseOver ? props.MouseOver : null;
    const MouseOutEvent = props.MouseOut ? props.MouseOut : null;
    const dbClickEvent = props.dbClick ? props.dbClick : null;
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
    
    const data = props.data ? props.data : {};
    let timer = null;

    const mouseBgcolor = (e) => {
        setAlpha(getalpha);
        return MouseOverEvent === null ? undefined : MouseOverEvent(e)
    }
    const mouseOutBgcolor = (e) => {
        setAlpha(0);
        return MouseOutEvent === null ? undefined : MouseOutEvent(e)
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
        if (dbClickEvent !== null) {
            clearTimeout(content.click_timer); 
        if (e.detail === 2)
            return ;  
            content.click_timer = setTimeout(function () { 
            return clickEvent === null ? undefined : clickEvent(e);
        }, 600); 
        } else {
            return clickEvent === null ? undefined : clickEvent(e);
        }
    }
    function dbClick(e) {
        clearTimeout(content.click_timer);
        return dbClickEvent === null ? undefined : dbClickEvent(e);
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
            <Tooltip title={title}>   
            <a href={url} {...data} onDoubleClick={dbClick} ref={ref} target={target} rel="noopener noreferrer" className={`text-chunk ${ClassName}`} style={style} onMouseEnter={mouseBgcolor} onMouseLeave={mouseOutBgcolor} onClick={click}>
                {Children}{props.content}
                </a>
                </Tooltip> 
         </>
    )
}