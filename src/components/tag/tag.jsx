/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect} from 'react'
import { Color } from '../../api/color';
import './tag.css'

/**
 * 标签 组件
 * @param {Number} className 追加类名
 * @param {String} color 设置标签颜色
 * @param {Number} fontsize 设置字体大小
 * @return {ReactComponent}
 */

function Tag(props) {
  const color = Color;
  const className = props.className ? props.className : '';
  const inputColor = props.color ? props.color : 'white';
  const findColor = inputColor in color ? color[inputColor] : '255,255,255';
  const fontsize = props.fontsize ? props.fontsize : 14,lineheight = props.lineheight ? props.lineheight :fontsize + 8
  const style = {
    backgroundColor: `rgb(${findColor})`,
    fontSize: `${fontsize}px`,
    lineHeight: `${lineheight}px`
  }
  return (
    <span className={'tag ' + className} style={style}>
      { props.children}{props.content}
    </span>
  )
}

export default Tag