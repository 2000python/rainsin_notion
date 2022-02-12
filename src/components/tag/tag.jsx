/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useEffect} from 'react'
import { Color } from '../../api/color';
import './tag.css'

function Tag(props) {
  const color = Color;
  const inputColor = props.color ? props.color : 'white';
  const findColor = inputColor in color ? color[inputColor] : '255,255,255';
  const fontsize = props.fontsize ? props.fontsize : 14,lineheight = props.lineheight ? props.lineheight :fontsize + 8
  const style = {
    backgroundColor: `rgb(${findColor})`,
    fontSize: `${fontsize}px`,
    lineHeight: `${lineheight}px`
  }
  return (
    <span className='tag' style={style}>
      { props.children}{props.content}
    </span>
  )
}

export default Tag