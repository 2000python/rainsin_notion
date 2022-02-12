/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from 'react'
import './textbox-chunk.css'

/**
 * 文本域 组件
 * @param {*} class 追加类名
 * @param {*} fontsize 设置字体大小
 * @param {*} children 子元素
 * @return {ReactComponent}
 */

function TextboxChunk(props) {
    const ClassName = props.class ? props.class : '';
    const fontsize = props.fontsize ? props.fontsize : 40;
    const style = {
        fontSize: `${fontsize}px`,
    }
    return (
        <>
            <span className={`textbox-chunk ${ClassName}`} style={style}>
                {props.children}
            </span>
      </>
    )
}

export default TextboxChunk